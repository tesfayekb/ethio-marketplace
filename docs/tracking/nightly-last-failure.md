# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36388203162
- Commit: `2ca54f6702f1118aa6da2e79448d6a52389b122b`
- Attempt: 1
- Written (UTC): 2026-09-28T09:23:26.200Z
- Passed: 620 · Skipped: 62 · Failed: 210
- Gating failures: 205 · Quarantined (@global-state, INC-117, non-gating): 5
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 36388203162-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 267 user(s) owned by process 36388203162-nightly
```

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `full`
- Project: `desktop-1280`

```text
Error: window target at 360

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 43
Received:    42.699554443359375
```

Context:

```text
        - generic [ref=e40]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [ref=e48] [cursor=pointer]
    - button "Close" [ref=e49] [cursor=pointer]:
      - img [ref=e50]
      - generic [ref=e53]: Close
```
```

## admin-categories-images.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e230]:
            - generic [ref=e231]: About
          - listitem [ref=e232]:
            - generic [ref=e233]: How it works
      - navigation "Help" [ref=e234]:
        - heading "Help" [level=2] [ref=e235]
        - list [ref=e236]:
          - listitem [ref=e237]:
            - generic [ref=e238]: Safety
          - listitem [ref=e239]:
            - generic [ref=e240]: Contact
      - navigation "Legal" [ref=e241]:
        - heading "Legal" [level=2] [ref=e242]
        - list [ref=e243]:
          - listitem [ref=e244]:
            - generic [ref=e245]: Terms
          - listitem [ref=e246]:
            - generic [ref=e247]: Privacy
    - paragraph [ref=e249]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic [ref=e40]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [ref=e48] [cursor=pointer]
    - button "Close" [ref=e49] [cursor=pointer]:
      - img [ref=e50]
      - generic [ref=e53]: Close
```
```

## admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import into Ethiopia" [ref=e2]:
    - heading "Import into Ethiopia" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import into Ethiopia
      - paragraph [ref=e6]: "A file is written whole or not at all: one refused row stops the entire import."
      - paragraph [ref=e7]: Start from a download so the columns match. Read-only columns are never applied.
      - status [ref=e8]: 3 added · 0 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused
      - status [ref=e9]: Import applied — 3 changes written
      - generic [ref=e10]:
        - button "Undo last import" [ref=e11] [cursor=pointer]
        - button "Close" [ref=e12] [cursor=pointer]
    - button "Close" [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

## admin-locations.spec.ts › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (520): <!DOCTYPE html>
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
            <div class="mt-3">2026-09-28 07:58:39 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-7b-the-editor-round-trips-a-row-without-dropping-a-stored-field-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 07:59:00 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-8-verb-reachability-every-verb-and-the-save-button-are-inside-the-viewport-CT-8-mirror-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-9a roster shape, table twin: the edit icon sits in the end column with pagination

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 07:59:20 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-9a-roster-shape-table-twin-the-edit-icon-sits-in-the-end-column-with-pagination-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 07:59:41 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-10-tones-retired-is-destructive-active-is-secondary-a-level-badge-is-outline-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:00:01 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-11-one-read-per-country-filtering-costs-no-request-switching-the-market-costs-exactly-one-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:00:22 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-12-transfer-scope-exports-and-the-import-title-follow-the-selected-country-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:00:42 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-13-all-countries-the-picker-opens-on-every-market-the-roster-spans-them-and-the-transfer-group-carries-no-scope-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-14 market state and whole-country parent follow the selected market

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:01:03 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-14-market-state-and-whole-country-parent-follow-the-selected-market-desktop-1280`

## admin-locations.spec.ts › L2a locations console › OV-1 overview totals, links and group breadcrumbs

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:01:23 UTC</div>
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
```

Context: context file not found for `admin-locations-L2a-locations-console-OV-1-overview-totals-links-and-group-breadcrumbs-desktop-1280`

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u2] moderator role unreadable: no row
```

Context: context file not found for `admin-roles-U2-roles-console-RP-1-gating-moderator-refused-admin-sees-the-list-signed-out-deep-link-redirects-desktop-1280`

## admin-shell.spec.ts › Admin shell (U0) › A-1 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-16-2-voropb@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-1-admin-fixture-gated-section-nav-section-page-breadcrumb-deep-link-desktop-1280`

## admin-shell.spec.ts › Admin shell (U0) › A-2 moderator fixture: exactly one section (audit), other deep links refused, admin tab still visible

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-17-2-shaufb@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-2-moderator-fixture-exactly-one-section-audit-other-deep-links-refused-admin-tab-still-visible-desktop-1280`

## admin-shell.spec.ts › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-18-2-gykwbg@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-4-admin-TAB-from-marketplace-navigates-to-admin-INC-071-desktop-1280`

## admin-shell.spec.ts › Admin shell (U0) › A-3 regular user: /admin still redirects home

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-19-2-86quik@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-3-regular-user-admin-still-redirects-home-desktop-1280`

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-20-2-i9glob@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-5-the-Categories-group-carries-its-sub-items-expands-on-a-sub-route-and-gates-each-one-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-1 gating: a permissionless user is refused; a super admin sees the roster

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-21-2-thxinc@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-1-gating-a-permissionless-user-is-refused-a-super-admin-sees-the-roster-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-2 roster shows every language including admin-only ones

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:04:07 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-2-roster-shows-every-language-including-admin-only-ones-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.36388203162-nightly-nightly-desktop-1280-23-tr3 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:04:27 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-3-the-strings-page-lists-keys-with-source-and-status-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.36388203162-nightly-nightly-desktop-1280-24-tr4 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:04:48 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-4-scope-a-translator-outside-the-language-is-refused-by-the-SERVER-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-5 filters live in the URL and survive a reload

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:05:08 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-5-filters-live-in-the-URL-and-survive-a-reload-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:05:28 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-6-coverage-gate-empty-and-incomplete-catalogs-both-refuse-publication-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:05:49 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-7-sync-imports-the-compiled-catalog-and-reports-its-counts-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-28-2-ol2eqf@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-7b-sync-after-a-step-up-prompt-still-reports-its-counts-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.36388203162-nightly-nightly-desktop-1280-29-tr8 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:06:30 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-8-save-then-approve-moves-a-string-through-the-status-machine-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:06:51 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-9-the-Amharic-runtime-still-renders-after-the-DB-bundle-merge-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:07:11 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-10-translator-card-proves-both-permission-states-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.36388203162-nightly-nightly-desktop-1280-32-tr11 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:07:32 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-11-per-row-AI-translate-writes-a-machine-row-and-captures-a-revision-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:07:52 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-12-bulk-AI-fill-translates-every-untranslated-scratch-key-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.36388203162-nightly-nightly-desktop-1280-34-tr13-break failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:08:13 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-13-the-placeholder-validator-flags-a-machine-write-too-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.36388203162-nightly-nightly-desktop-1280-35-tr23-kept failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:08:33 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-23-machine-translation-keeps-placeholders-and-the-editor-repairs-a-mangled-one-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-scope AI: a translator outside the language gets the structured refusal

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-36-2-sld1vl@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-scope-AI-a-translator-outside-the-language-gets-the-structured-refusal-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-25 the picker creates a language with a native name and countries

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:09:34 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-25-the-picker-creates-a-language-with-a-native-name-and-countries-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.36388203162-nightly-nightly-desktop-1280-38-tr16 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:10:14 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-16-the-History-drawer-lists-revisions-and-restores-one-as-a-new-edit-desktop-1280`

## admin-translations-console.spec.ts › U4b translations console › TR-33 an empty filter leaves export enabled and downloads the language

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:10:34 UTC</div>
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
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-33-an-empty-filter-leaves-export-enabled-and-downloads-the-language-desktop-1280`

## admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4d] no active region to parent onto: undefined
```

Context: context file not found for `admin-translations-data-U4b-translations-console-TR-14-the-Data-scope-edits-and-approves-a-location-name-desktop-1280`

## admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:11:15 UTC</div>
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
```

Context: context file not found for `admin-translations-data-U4b-translations-console-TR-24-the-Data-scope-machine-translates-one-row-and-then-every-untranslated-one-desktop-1280`

## admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxy-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:11:35 UTC</div>
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
```

Context: context file not found for `admin-translations-data-U4b-translations-console-TR-26-the-Data-scope-approves-every-machine-filled-content-name-desktop-1280`

## admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else

- Source: `full`
- Project: `desktop-1280`

```text
Error: TR-34 attribute seed failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:11:56 UTC</div>
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
```

Context: context file not found for `admin-translations-data-U4b-translations-console-TR-34-the-Data-roster-names-each-row-s-identity-and-changes-nothing-else-desktop-1280`

## admin-translations-governance.spec.ts › U4f — publication gate governs language choice › TR-17: switcher options equal the DB public list; a non-public ?lang falls back

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4f] public language read failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:12:16 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4f-publication-gate-governs-language-choice-TR-17-switcher-options-equal-the-DB-public-list-a-non-public-lang-falls-back-desktop-1280`

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxy-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:12:37 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4g-bulk-approval-order-and-orphans-TR-19-approve-all-approves-reviewed-rows-and-skips-flagged-ones-global-state-desktop-1280`

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:12:57 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4g-bulk-approval-order-and-orphans-TR-20-roster-order-is-operator-editable-and-persists-global-state-desktop-1280`

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:13:18 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4g-bulk-approval-order-and-orphans-TR-21-a-key-missing-from-the-synced-catalog-is-orphaned-and-excluded-desktop-1280`

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-22 a published DB-only language renders with no compiled catalog @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:13:39 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4g-bulk-approval-order-and-orphans-TR-22-a-published-DB-only-language-renders-with-no-compiled-catalog-global-state-desktop-1280`

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:13:59 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4g-bulk-approval-order-and-orphans-TR-29-the-catalog-exports-as-CSV-and-a-translated-CSV-imports-back-desktop-1280`

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:14:19 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4g-bulk-approval-order-and-orphans-TR-32-an-import-is-undoable-while-nothing-has-touched-the-rows-desktop-1280`

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:u4i4] TR-31 language create failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:14:39 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4g-bulk-approval-order-and-orphans-TR-31-a-scratch-language-deletes-with-a-typed-confirm-and-leaves-no-rows-desktop-1280`

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:15:00 UTC</div>
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
```

Context: context file not found for `admin-translations-governance-U4g-bulk-approval-order-and-orphans-TR-30-pseudo-localization-fills-zxa-with-stretched-machine-rows-that-can-never-be-published-global-state-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-53-2-gqgcnk@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-1-permission-moderator-is-refused-admin-sees-the-list-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-2 search and status filter

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-54-2-8vqtws@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-2-search-and-status-filter-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-55-2-9figpi@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-3-detail-reason-required-deactivate-audit-row-reactivate-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-56-2-uaegmm@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-7-crumb-Home-Admin-Users-name-Users-navigates-back-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-8 own row: status controls are not offered on your own record

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-57-2-eck3st@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-8-own-row-status-controls-are-not-offered-on-your-own-record-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-58-2-txhwjm@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-4-roles-assign-and-remove-super_admin-user-never-offered-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-59-2-qimbr0@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-5-seam-a-deactivated-account-cannot-write-a-listing-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-6 negative: a base user cannot call the status RPC

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-60-2-immjzj@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-6-negative-a-base-user-cannot-call-the-status-RPC-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-61-2-vloqfm@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-9-edit-staff-edits-display-name-and-alias-activity-records-it-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-62-2-g4tomp@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-10-edit-a-duplicate-alias-is-refused-inline-and-nothing-changes-desktop-1280`

## admin-users.spec.ts › U1 admin users › AU-11 own row: no edit form on your own record

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-63-2-n8lqsl@ethio-e2e.invalid: {}
```

Context: context file not found for `admin-users-U1-admin-users-AU-11-own-row-no-edit-form-on-your-own-record-desktop-1280`

## auth-signout.spec.ts › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-64-2-eqhgqy@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0j-sign-out-hard-reset-SO-1-admin-one-click-signs-out-and-resets-to-the-marketplace-desktop-1280`

## auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-65-2-0qabkj@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0j-sign-out-hard-reset-SO-2-settings-confirmed-sign-out-empties-the-gated-surface-desktop-1280`

## auth-signout.spec.ts › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-66-2-fm3lni@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0j-sign-out-hard-reset-SO-3-live-guard-a-same-tab-client-sign-out-evacuates-admin-desktop-1280`

## auth-signout.spec.ts › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-67-2-yoz2wt@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0j-sign-out-hard-reset-SO-3b-reload-path-a-cleared-token-means-admin-never-renders-on-mount-desktop-1280`

## auth-signout.spec.ts › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-68-2-ptrxhd@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0j-sign-out-hard-reset-SO-4-signed-out-marketplace-carries-no-gated-UI-desktop-1280`

## auth-signout.spec.ts › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-69-2-rrmcnm@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0k-session-policy-SP-1-idle-the-warning-appears-then-the-session-is-hard-reset-desktop-1280`

## auth-signout.spec.ts › U0k session policy › SP-2 stay signed in extends past the original deadline

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-70-2-bvmuxp@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0k-session-policy-SP-2-stay-signed-in-extends-past-the-original-deadline-desktop-1280`

## auth-signout.spec.ts › U0k session policy › SP-3 absolute: continuous activity does not save the session

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-71-2-jyqom4@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0k-session-policy-SP-3-absolute-continuous-activity-does-not-save-the-session-desktop-1280`

## auth-signout.spec.ts › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-72-2-ohej48@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0k-session-policy-SP-4-cross-tab-signing-out-in-one-tab-evacuates-the-other-desktop-1280`

## auth-signout.spec.ts › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-73-2-ckzffb@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0k-session-policy-SP-6-stale-stamps-from-a-previous-session-never-sign-the-new-one-out-desktop-1280`

## auth-signout.spec.ts › U0k session policy › SP-7 reload of a live session keeps its clocks (no silent extension)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-74-2-mun8km@ethio-e2e.invalid: {}
```

Context: context file not found for `auth-signout-U0k-session-policy-SP-7-reload-of-a-live-session-keeps-its-clocks-no-silent-extension-desktop-1280`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate returns a PNG payload and writes no storage object

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-75-2-uirpql@ethio-e2e.invalid: {}
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-returns-a-PNG-payload-and-writes-no-storage-object-desktop-1280`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2b unknown categoryId is an honest 404, never a 502

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-76-2-npcync@ethio-e2e.invalid: {}
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2b-unknown-categoryId-is-an-honest-404-never-a-502-desktop-1280`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-77-2-ccmaiq@ethio-e2e.invalid: {}
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-4b-stored-truth-generate-accept-and-the-reader-returns-assets-stamp-desktop-1280`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-78-2-eygjcm@ethio-e2e.invalid: {}
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-3-suggest-icon-returns-an-allowlisted-value-desktop-1280`

## category-nav.spec.ts › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:c2] reading e2e-cat-nightly-79-ih6yoo-r1 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:26:22 UTC</div>
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
```

Context: context file not found for `category-nav-category-selection-navigates-C-5-the-rail-follows-root-pointer-order-and-a-pointer-reorder-reaches-it-desktop-1280`

## i18n-bundle.spec.ts › STAB-I18N · cached translation bundle › IB-1 repeated GETs are identical, validated, and 304 on If-None-Match

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:stab-i18n] language zxb-ni80de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:26:43 UTC</div>
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
```

Context: context file not found for `i18n-bundle-STAB-I18N-cached-translation-bundle-IB-1-repeated-GETs-are-identical-validated-and-304-on-If-None-Match-desktop-1280`

## i18n-bundle.spec.ts › STAB-I18N · cached translation bundle › IB-2 publishing a fence language moves the version and the bundle

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:stab-i18n] language zxb-ni81de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:27:03 UTC</div>
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
```

Context: context file not found for `i18n-bundle-STAB-I18N-cached-translation-bundle-IB-2-publishing-a-fence-language-moves-the-version-and-the-bundle-desktop-1280`

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the admin shell renders no English fallback

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-82-2-k7v4hj@ethio-e2e.invalid: {}
```

Context: context file not found for `i18n-coverage-i18n-chrome-coverage-Amharic-the-admin-shell-renders-no-English-fallback-desktop-1280`

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-83-2-tm4txs@ethio-e2e.invalid: {}
```

Context: context file not found for `i18n-coverage-i18n-chrome-coverage-Amharic-the-roles-permission-matrix-renders-no-raw-English-vocabulary-desktop-1280`

## import-security.spec.ts › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:28:25 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-attributes-IG-1-attributes-malformed-foreign-oversized-and-unreadable-files-are-refused-whole-desktop-1280`

## import-security.spec.ts › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:28:46 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-attributes-IG-2-attributes-dangerous-cells-refuse-their-own-row-and-name-the-reason-desktop-1280`

## import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-86-2-jjxao2@ethio-e2e.invalid: {}
```

Context: context file not found for `import-security-IMPORT-GATE-attributes-private-identity-IG-3-attributes-a-changed-file-cannot-be-committed-and-previews-are-rate-limited-desktop-1280`

## import-security.spec.ts › IMPORT-GATE categories › IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:29:27 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-categories-IG-1-categories-malformed-foreign-oversized-and-unreadable-files-are-refused-whole-desktop-1280`

## import-security.spec.ts › IMPORT-GATE categories › IG-2 categories: dangerous cells refuse their own row and name the reason

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:29:48 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-categories-IG-2-categories-dangerous-cells-refuse-their-own-row-and-name-the-reason-desktop-1280`

## import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-89-2-3eynrk@ethio-e2e.invalid: {}
```

Context: context file not found for `import-security-IMPORT-GATE-categories-private-identity-IG-3-categories-a-changed-file-cannot-be-committed-and-previews-are-rate-limited-desktop-1280`

## import-security.spec.ts › IMPORT-GATE translations › IG-1 translations: malformed, foreign, oversized and unreadable files are refused whole

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:30:30 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-translations-IG-1-translations-malformed-foreign-oversized-and-unreadable-files-are-refused-whole-desktop-1280`

## import-security.spec.ts › IMPORT-GATE translations › IG-2 translations: dangerous cells refuse their own row and name the reason

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:30:51 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-translations-IG-2-translations-dangerous-cells-refuse-their-own-row-and-name-the-reason-desktop-1280`

## import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-92-2-adoxr6@ethio-e2e.invalid: {}
```

Context: context file not found for `import-security-IMPORT-GATE-translations-private-identity-IG-3-translations-a-changed-file-cannot-be-committed-and-previews-are-rate-limited-desktop-1280`

## import-security.spec.ts › IMPORT-GATE translations › IG-4 translations: XLIFF enters the same door and is judged by the same law

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:31:32 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-translations-IG-4-translations-XLIFF-enters-the-same-door-and-is-judged-by-the-same-law-desktop-1280`

## import-security.spec.ts › IMPORT-GATE locations-countries › IG-1 locations-countries: malformed, foreign, oversized and unreadable files are refused whole

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:31:53 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-locations-countries-IG-1-locations-countries-malformed-foreign-oversized-and-unreadable-files-are-refused-whole-desktop-1280`

## import-security.spec.ts › IMPORT-GATE locations-countries › IG-2 locations-countries: dangerous cells refuse their own row and name the reason

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:32:13 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-locations-countries-IG-2-locations-countries-dangerous-cells-refuse-their-own-row-and-name-the-reason-desktop-1280`

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-96-2-qdip5c@ethio-e2e.invalid: {}
```

Context: context file not found for `import-security-IMPORT-GATE-locations-countries-private-identity-IG-3-locations-countries-a-changed-file-cannot-be-committed-and-previews-are-rate-limited-desktop-1280`

## import-security.spec.ts › IMPORT-GATE locations-locations › IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:32:54 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-locations-locations-IG-1-locations-locations-malformed-foreign-oversized-and-unreadable-files-are-refused-whole-desktop-1280`

## import-security.spec.ts › IMPORT-GATE locations-locations › IG-2 locations-locations: dangerous cells refuse their own row and name the reason

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:33:15 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-locations-locations-IG-2-locations-locations-dangerous-cells-refuse-their-own-row-and-name-the-reason-desktop-1280`

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-99-2-nk8dvi@ethio-e2e.invalid: {}
```

Context: context file not found for `import-security-IMPORT-GATE-locations-locations-private-identity-IG-3-locations-locations-a-changed-file-cannot-be-committed-and-previews-are-rate-limited-desktop-1280`

## import-security.spec.ts › IMPORT-GATE attributes-links › IG-5 attributes-links: an undeclared column is refused by name and the declared cells are not

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:33:57 UTC</div>
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
```

Context: context file not found for `import-security-IMPORT-GATE-attributes-links-IG-5-attributes-links-an-undeclared-column-is-refused-by-name-and-the-declared-cells-are-not-desktop-1280`

## layout.spec.ts › LY-1 wide pages use most of the desktop content width

- Source: `full`
- Project: `desktop-1280`

```text
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

Context: context file not found for `layout-LY-1-wide-pages-use-most-of-the-desktop-content-width-desktop-1280`

## layout.spec.ts › LY-3 wizard actions are sticky only below md

- Source: `full`
- Project: `desktop-1280`

```text
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

Context: context file not found for `layout-LY-3-wizard-actions-are-sticky-only-below-md-desktop-1280`

## layout.spec.ts › LY-4 wizard aside is desktop-only

- Source: `full`
- Project: `desktop-1280`

```text
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

Context: context file not found for `layout-LY-4-wizard-aside-is-desktop-only-desktop-1280`

## layout.spec.ts › LY-5 Account tab opens the overview and profile card

- Source: `full`
- Project: `desktop-1280`

```text
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

Context: context file not found for `layout-LY-5-Account-tab-opens-the-overview-and-profile-card-desktop-1280`

## locations-tree.spec.ts › L1c · public per-country location tree › LR-1 the open market answers, anchor first, and honours If-None-Match

- Source: `full`
- Project: `desktop-1280`

```text
Error: first GET /api/locations/ET

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
```

Context: context file not found for `locations-tree-L1c-public-per-country-location-tree-LR-1-the-open-market-answers-anchor-first-and-honours-If-None-Match-desktop-1280`

## locations-tree.spec.ts › L1c · public per-country location tree › LR-2 a closed market is 404 and a malformed code is 400

- Source: `full`
- Project: `desktop-1280`

```text
Error: a closed market is never an empty 200

expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 502
```

Context: context file not found for `locations-tree-L1c-public-per-country-location-tree-LR-2-a-closed-market-is-404-and-a-malformed-code-is-400-desktop-1280`

## locations-tree.spec.ts › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:l1c] reading the ET anchor failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:36:22 UTC</div>
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
```

Context: context file not found for `locations-tree-L1c-public-per-country-location-tree-LR-3-a-row-disappears-when-an-ancestor-is-retired-and-the-version-moves-desktop-1280`

## locations-tree.spec.ts › L1c · public per-country location tree › LR-4 the payload carries the eleven read fields and nothing else

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
```

Context: context file not found for `locations-tree-L1c-public-per-country-location-tree-LR-4-the-payload-carries-the-eleven-read-fields-and-nothing-else-desktop-1280`

## mfa-stepup.spec.ts › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-109-2-kxqjll@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-U1f-step-up-authentication-MF-1-enroll-QR-secret-shown-a-generated-code-activates-the-factor-desktop-1280`

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-110-2-ewkclr@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-U1f-step-up-authentication-MF-2-gate-wrong-code-refused-correct-code-lets-the-action-through-desktop-1280`

## mfa-stepup.spec.ts › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-111-2-zko9x2@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-U1f-step-up-authentication-MF-3-no-factor-the-modal-explains-and-the-RPC-is-never-called-desktop-1280`

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-112-2-exjjpn@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-U1f-step-up-authentication-MF-4-server-permission-first-then-step-up-the-RPC-refuses-regardless-of-UI-desktop-1280`

## mfa-stepup.spec.ts › U1f step-up authentication › MF-5 unenroll requires a fresh verification

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-113-2-yixgfg@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-U1f-step-up-authentication-MF-5-unenroll-requires-a-fresh-verification-desktop-1280`

## mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-114-2-bun9ds@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-U1f-4-step-up-freshness-MF-6-unenrolling-the-only-factor-drops-the-stepped-up-state-desktop-1280`

## mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-7 a verification older than the window re-prompts

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-115-2-lq5vz9@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-U1f-4-step-up-freshness-MF-7-a-verification-older-than-the-window-re-prompts-desktop-1280`

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-116-2-odu7ip@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-FIX-SCAN-1-step-up-abort-MF-7b-cancelling-the-prompt-releases-the-caller-and-writes-nothing-desktop-1280`

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-117-2-oceidt@ethio-e2e.invalid: {}
```

Context: context file not found for `mfa-stepup-FIX-SCAN-1-step-up-abort-MF-7c-a-no-factor-identity-is-released-with-the-hint-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-118-2-crc4lm@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-119-2-m9tijz@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-2-a-PNG-and-a-WebP-carrying-metadata-chunks-are-stored-as-image-data-only-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-120-2-92vo0n@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-3-a-PDF-renamed-jpg-is-refused-unsupportedFormat-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-121-2-4aoufu@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-4-a-variant-over-its-size-dial-is-refused-by-name-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-122-2-wpqpnq@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-5-the-policy-pass-refuses-the-cover-and-stores-nothing-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-6 another seller's listing is a 403

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-123-2-v7gnxt@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-6-another-seller-s-listing-is-a-403-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-124-2-1gzdyq@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-7-the-eleventh-photo-is-refused-tooManyPhotos-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-125-2-nyaq7z@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-8-DELETE-removes-the-row-and-the-objects-POST-makes-a-photo-the-cover-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-126-2-emqpfs@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-9-the-upload-dial-refuses-once-the-seller-s-hourly-ceiling-is-reached-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-127-2-dcvxs9@ethio-e2e.invalid: {}
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-10-a-refusal-is-final-and-never-retried-a-5xx-is-retried-once-then-handed-over-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

```

Context:

```text
          - listitem [ref=e157]:
            - generic [ref=e158]: About
          - listitem [ref=e159]:
            - generic [ref=e160]: How it works
      - navigation "Help" [ref=e161]:
        - heading "Help" [level=2] [ref=e162]
        - list [ref=e163]:
          - listitem [ref=e164]:
            - generic [ref=e165]: Safety
          - listitem [ref=e166]:
            - generic [ref=e167]: Contact
      - navigation "Legal" [ref=e168]:
        - heading "Legal" [level=2] [ref=e169]
        - list [ref=e170]:
          - listitem [ref=e171]:
            - generic [ref=e172]: Terms
          - listitem [ref=e173]:
            - generic [ref=e174]: Privacy
    - paragraph [ref=e176]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-1 the shell renders one step of eight, Back and Next both closed

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-128-2-nplukd@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-1-the-shell-renders-one-step-of-eight-Back-and-Next-both-closed-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-129-2-cnhuja@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-2-search-to-leaf-chooses-a-category-and-creates-the-draft-at-once-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-52-a-category-with-an-icon-name-shows-its-glyph-one-without-shows-none-D38-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-53-Back-responds-after-typing-in-Find-a-category-INC-277-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:pw-62] seeding the rows failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 08:44:59 UTC</div>
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
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-62-a-level-follows-pointer-order-a-guest-follows-the-host-s-own-children-and-the-home-is-the-flagged-pointer-DEC-080-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-3-a-folder-is-browsable-and-never-selectable-its-leaf-is-D11-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-134-2-q8bqjk@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-4-a-photo-is-prepared-on-the-device-stored-stripped-and-removable-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-135-2-ezs9nn@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-7-a-draft-resumes-at-the-next-step-and-only-for-its-owner-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-136-2-byk0rb@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-137-2-cqfpkp@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-8-an-unreachable-save-keeps-the-answers-says-so-and-retries-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-138-2-zcwftc@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-139-2-h7wmtf@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-by-name-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-140-2-zpjv4o@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-6-the-AI-assist-fills-the-title-and-description-from-the-entered-details-and-both-stay-editable-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-141-2-yhrwc6@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-10-pricing-currency-comes-before-the-amount-a-locked-period-shows-no-line-and-free-hides-the-amount-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-142-2-awzqqt@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-143-2-0pniu4@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-56-an-hourly-basis-fixes-the-period-to-the-hour-and-a-changed-basis-moves-it-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-144-2-x5dell@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-145-2-wya6wu@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-146-2-fvvnfp@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-63-the-pricing-basis-is-asked-on-the-price-step-refused-there-when-empty-and-still-shapes-the-period-D62-2-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-147-2-7utqyw@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-148-2-uvb6qo@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-65-the-currency-list-opens-home-first-and-USD-second-with-symbols-D62-2-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-149-2-iwjnko@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-66-a-pre-D62-2-negotiable-price-type-saves-step-1-and-reaches-step-3-with-no-refusal-INC-309-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-150-2-apppyr@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-151-2-g5utsb@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-61-after-ten-seconds-the-Undo-is-gone-and-the-reset-stands-D59-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-152-2-19rrhg@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-153-2-ziqfla@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-154-2-saytv6@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-155-2-pozwf1@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-156-2-cwlgge@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-31-the-market-select-waits-for-the-prefill-chain-and-never-preselects-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-157-2-0brzfy@ethio-e2e.invalid: {}
```

Context:

```text
          - listitem [ref=e106]:
            - generic [ref=e107]: About
          - listitem [ref=e108]:
            - generic [ref=e109]: How it works
      - navigation "Help" [ref=e110]:
        - heading "Help" [level=2] [ref=e111]
        - list [ref=e112]:
          - listitem [ref=e113]:
            - generic [ref=e114]: Safety
          - listitem [ref=e115]:
            - generic [ref=e116]: Contact
      - navigation "Legal" [ref=e117]:
        - heading "Legal" [level=2] [ref=e118]
        - list [ref=e119]:
          - listitem [ref=e120]:
            - generic [ref=e121]: Terms
          - listitem [ref=e122]:
            - generic [ref=e123]: Privacy
    - paragraph [ref=e125]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-158-2-tanrg4@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-15-the-posting-entry-lives-in-My-Listings-not-in-Account-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-159-2-l97ljh@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-16-typing-is-saved-without-judgement-only-Next-asks-the-door-to-judge-the-step-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-160-2-x7a3jr@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-20-where-the-default-place-lists-itself-comes-back-and-the-plan-bounds-the-rest-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-161-2-p0tt8g@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-18-specifications-survive-a-step-Back-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-162-2-juj06p@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-19-the-seller-s-own-phrase-survives-into-the-suggestion-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-163-2-aocfth@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-17-the-currency-is-preselected-and-searchable-by-name-in-one-control-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-164-2-c6s5rk@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-21-a-child-detail-shows-only-the-chosen-parent-s-options-and-clears-on-change-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-165-2-wbt633@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-166-2-aeidbi@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-167-2-ohsjl3@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-168-2-yso9ns@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-9-an-option-s-facts-prefill-the-siblings-they-name-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-25-an-inherited-year-picker-is-bounded-by-the-model-chosen-three-levels-down-and-relative-bounds-resolve-as-the-door-does-INC-288-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-58 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-170-2-p1xxyh@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-58-under-Amharic-a-year-reads-with-its-Ethiopian-years-the-same-on-the-picker-and-the-review-D45-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-171-2-uo1n69@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-59-a-card-1-identity-change-restarts-the-form-Undo-restores-it-a-card-2-change-does-not-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-172-2-t3fiux@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-60-a-non-identity-fold-owner-change-clears-only-its-fold-child-the-identity-still-restarts-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-173-2-sq9ahf@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-174-2-7cxsil@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-34-a-colour-detail-offers-stemmed-swatches-and-an-unmapped-list-shows-no-tray-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-175-2-krtmfm@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-45-a-declared-swatch-renders-one-ink-a-two-tone-and-a-pattern-tile-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-176-2-j9sejn@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-35-a-model-s-single-allowed-answer-is-stored-not-rendered-and-the-review-shows-it-D44-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-36-a-category-surfaced-under-a-second-root-appears-under-it-in-the-tree-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-178-2-jnf4gg@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-46-a-category-created-with-a-secondary-parent-reaches-the-tree-inside-the-cache-window-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:d30] seeding e2e-post-nightly-179-gfto61 failed: no row
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-181-2-wis54f@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-33-a-further-place-is-added-under-a-place-already-listed-and-the-plan-refuses-the-second-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-182-2-vctmmn@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-183-2-fgtdve@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-38-a-place-search-moves-the-pin-and-fills-the-street-line-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-184-2-4jknch@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-185-2-odtpds@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-186-2-obmlga@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-41-the-geocode-route-spends-a-dial-and-refuses-the-call-past-its-ceiling-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-187-2-m3vyib@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-188-2-4mphvy@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-189-2-nmv8gt@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-190-2-tit8fs@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-49-a-prefill-only-fact-keeps-its-input-while-a-settled-one-does-not-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-191-2-rxec9a@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-51-a-dependent-detail-never-renders-above-the-answer-it-hangs-on-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-192-2-bv2dhf@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-1-the-draft-route-sets-the-observed-residency-from-the-edge-exactly-once-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-193-2-txlams@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-2-an-incomplete-step-is-the-door-s-own-refusal-at-status-200-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-194-2-dthd3q@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-10-a-pricing-basis-is-the-door-s-own-refusal-by-name-at-status-200-DEC-079-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-195-2-7vrdl8@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-11-negotiable-is-a-flag-stored-on-a-price-forced-off-on-contact-DEC-081-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-196-2-oo9wzh@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-12-the-draft-door-at-step-1-takes-negotiable-as-an-alias-fixed-flag-INC-309-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-197-2-ew4hqs@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-3-a-complete-draft-publishes-to-screening-and-never-to-active-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-198-2-aga9wd@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-4-identity-the-alias-is-saved-and-a-second-seller-cannot-take-it-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-5 assist answers from the facts alone, within the field caps

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-199-2-fl2oti@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-5-assist-answers-from-the-facts-alone-within-the-field-caps-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-6 the options route is ETag'd: a conditional repeat costs a 304

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] reading an attribute failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
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
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-09-28 09:09:13 UTC</div>
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
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-6-the-options-route-is-ETag-d-a-conditional-repeat-costs-a-304-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-201-2-6rbvkh@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-7-the-draft-dial-refuses-by-name-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the finder leaf failed: no row
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-9-catalog-finder-is-bounded-multilingual-and-rate-limited-desktop-1280`

## rbac.spec.ts › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-203-2-gbln9h@ethio-e2e.invalid: {}
```

Context: context file not found for `rbac-RBAC-client-seam-R-2-regular-user-no-Admin-tab-and-admin-redirects-home-desktop-1280`

## rbac.spec.ts › RBAC client seam › R-3 staff user: Admin tab appears and /admin renders

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-204-2-fxahdl@ethio-e2e.invalid: {}
```

Context: context file not found for `rbac-RBAC-client-seam-R-3-staff-user-Admin-tab-appears-and-admin-renders-desktop-1280`

## shell-table-law.spec.ts › shell table law › admin tables never overflow horizontally

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-205-2-bzszn5@ethio-e2e.invalid: {}
```

Context: context file not found for `shell-table-law-shell-table-law-admin-tables-never-overflow-horizontally-desktop-1280`

## shell.spec.ts › app shell › feed renders its empty state

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:shell] seeding the fence category failed: undefined
```

Context: context file not found for `shell-app-shell-feed-renders-its-empty-state-desktop-1280`

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - list:
              - listitem:
                - generic: Safety
              - listitem:
                - generic: Contact
          - navigation:
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - menuitem "English Set as this device's default language" [ref=e2]:
      - generic [ref=e3]: English
      - button "Set as this device's default language" [ref=e4]:
        - img [ref=e5]
```
```

## shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^=\'location-level-\']')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^=\'location-level-\']')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

Context: context file not found for `shell-app-shell-the-location-row-cascades-Country-Region-City-city-selectable-desktop-1280`

## shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:shell] seeding the fence category failed: undefined
```

Context: context file not found for `shell-app-shell-the-feed-body-is-centred-with-equal-left-and-right-gutters-desktop-1280`

## shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+36388203162-nightly-210-2-4bln7c@ethio-e2e.invalid: {}
```

Context: context file not found for `shell-panel-scoped-chrome-location-row-is-present-on-Marketplace-and-absent-on-Account-desktop-1280`

## Server errors: full

```text
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/categories/tree <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/categories/tree <!DOCTYPE html>
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/categories/tree <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 521
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree <!DOCTYPE html>
```

## Client errors: full

```text
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×3
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×3
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_ui_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/listings?select=id%2Ctitle%2Cprice_amount%2Cprice_currency%2Cprice_mode%2Cprice_bp%2Cprice_negotiable%2Ctier%2Cpublished_at%2Ccategory_id%2Clocations%28id%2Cname_en%2Cname_am%29&status=eq.active' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
```
