# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39477384441 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39477384441
- Commit: `99e4e619758701da59bb6caaccc7acaddaf95548`
- Attempt: 1
- Written (UTC): 2026-10-20T19:44:48.512Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 18
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2) — Error: [e2e:pool] reaping e2e-pool-s1a-011@ethio-e2e.invalid (impersonation (target_id)) failed: <!DOCTYPE html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the wizard's Review; Post similar opens a new draft (D194, D182 4) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2) — Test timeout of 60000ms exceeded while running "afterEach" hook.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-142 the pin, street and directions go when the city changes, not when the sub-city does (bundle 4 step 17, INC-393) — Error: Timeout 20000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-44 a business with its name and no first or last name publishes (INC-423) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through the header's Import and the undo puts it back — Error: Timeout 30000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-screening.spec.ts › ADMIN SCREENING › SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-4 No longer available keeps the days left; Reopen gives them back (D174 2) — Test timeout of 60000ms exceeded while running "afterEach" hook.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) — Test timeout of 60000ms exceeded while running "afterEach" hook.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-14 a photo removed while it uploads, or while it waits its turn, never comes back — Error: PP-14: the photo removed on its way was left on the listing
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-14 the draft door's answer names the currency it stored (INC-321) — Test timeout of 60000ms exceeded while running "afterEach" hook.

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e354]:
            - generic [ref=e355]: About
          - listitem [ref=e356]:
            - generic [ref=e357]: Contact
      - navigation "Help" [ref=e358]:
        - heading "Help" [level=2] [ref=e359]
        - list [ref=e360]:
          - listitem [ref=e361]:
            - generic [ref=e362]: Safety
      - navigation "Legal" [ref=e363]:
        - heading "Legal" [level=2] [ref=e364]
        - list [ref=e365]:
          - listitem [ref=e366]:
            - link "Terms" [ref=e367] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e368]:
            - link "Privacy" [ref=e369] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e371]: © 2026 ethio.com — All rights reserved.
```
```

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s1a-011@ethio-e2e.invalid (impersonation (target_id)) failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-20 19:31:29 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s1a-011@ethio-e2e.invalid (impersonation (target_id)) failed: <!DOCTYPE html>
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

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the wizard's Review; Post similar opens a new draft (D194, D182 4)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e223]:
            - generic [ref=e224]: About
          - listitem [ref=e225]:
            - generic [ref=e226]: Contact
      - navigation "Help" [ref=e227]:
        - heading "Help" [level=2] [ref=e228]
        - list [ref=e229]:
          - listitem [ref=e230]:
            - generic [ref=e231]: Safety
      - navigation "Legal" [ref=e232]:
        - heading "Legal" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - link "Terms" [ref=e236] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e237]:
            - link "Privacy" [ref=e238] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e240]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: ML-12 coverage must be a list

expect(received).toBe(expected) // Object.is equality

Expected: "coverage must be a list"
Received: "listing not found"

  1038 |     for (const [ad, changes, message] of cases) {
  1039 |       const refused = await me.rpc("edit_my_listing", { p_listing_id: ad.id, p_changes: changes });
> 1040 |       expect(refused.error, `ML-12 ${message}`).toBe(message);
       |                                                 ^
  1041 |     }
  1042 |     expect(await truth()).toEqual(beforeAll);
  1043 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1040:49
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-12-edit_my_listing-refuses-what-a-box-may-not-change-an-ad-it-may-not-edit-and-another-seller-s-and-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-db191-seller-s-and-writes-nothing-mobile-360`; this run carried 8 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
--- further error 1 ---
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

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-26-a-refused-edit-leaves-the-old-photo-as-it-was-a-photo-not-on-the-listing-is-gone-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2112b-he-listing-is-gone-D154-B2--mobile-360`; this run carried 8 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-142 the pin, street and directions go when the city changes, not when the sub-city does (bundle 4 step 17, INC-393)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

   at helpers/locations.ts:482

  480 | export async function waitForTreeSlug(page: Page, countryCode: string, slug: string) {
  481 |   let seen: string[] = [];
> 482 |   await expect
      |   ^
  483 |     .poll(
  484 |       async () => {
  485 |         seen = await treeSlugs(page, countryCode);
    at waitForTreeSlug (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:482:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1275:5
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-142-the-pin-street-and-directions-go-when-the-city-changes-not-when-the-sub-city-does-bundle-4-step-17-INC-393-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-9e3bc-s-bundle-4-step-17-INC-393--mobile-360`; this run carried 8 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-mobile-360` — Playwright's name `post-wizard-specs-POSTING--25a96-y-when-its-condition-is-met-mobile-360`; this run carried 8 context file(s); of the same spec: none

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-84-a-new-post-opens-on-the-seller-s-own-last-post-never-another-seller-s-mobile-360` — Playwright's name `post-wizard-where-POSTING--f3e54-post-never-another-seller-s-mobile-360`; this run carried 8 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › PR-44 a business with its name and no first or last name publishes (INC-423)

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-44-a-business-with-its-name-and-no-first-or-last-name-publishes-INC-423-mobile-360` — Playwright's name `posting-routes-POSTING-ROU-21e7f-ast-name-publishes-INC-423--mobile-360`; this run carried 8 context file(s); of the same spec: `posting-routes-POSTING-ROU-508cf-currency-it-stored-INC-321--desktop-1280`

### shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-mobile-360` — Playwright's name `shell-L4b-location-picker--83294-ated-metro-wins-by-geometry-mobile-360`; this run carried 8 context file(s); of the same spec: none

- admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through the header's Import and the undo puts it back · `desktop-1280` · source `shard 4` — body omitted: cap
- admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2) · `desktop-1280` · source `shard 4` — body omitted: cap
- admin-screening.spec.ts › ADMIN SCREENING › SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written · `desktop-1280` · source `shard 4` — body omitted: cap
- my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-4 No longer available keeps the days left; Reopen gives them back (D174 2) · `desktop-1280` · source `shard 5` — body omitted: cap
- my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) · `desktop-1280` · source `shard 5` — body omitted: cap
- photo-pipeline.spec.ts › PHOTO PIPELINE › PP-14 a photo removed while it uploads, or while it waits its turn, never comes back · `desktop-1280` · source `shard 5` — body omitted: cap
- post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved · `desktop-1280` · source `shard 5` — body omitted: cap
- posting-routes.spec.ts › POSTING ROUTES › PR-14 the draft door's answer names the currency it stored (INC-321) · `desktop-1280` · source `shard 6` — body omitted: cap

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

117 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 3 | shard 2, shard 3 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>kdwq<n>: e<n>e_par_<n>uyywq → e<n>e_chi_<n>xxzea` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qw<n>dzs: e<n>e_par_m<n>k<n>lu → e<n>e_chi_<n>e<n>lqc` (quiet) | 1 | shard 1 |
| `name_folds_rebuild: canceling statement due to statement timeout` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>kdwq<n>: e<n>e_par_<n>uyywq → e<n>e_chi_<n>xxzea ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qw<n>dzs: e<n>e_par_m<n>k<n>lu → e<n>e_chi_<n>e<n>lqc ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-177 a question removed while the form is open never blocks the next edits ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · /settings shows the Account context, and returning shows categories ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 3 · Sources: shard 2, shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): FS-12 on a phone three cards share a row and the invitation is the size of a car ×2 · LAC-3 the exempt pages stay; other pages redirect; Decline, sign out records not ×2 · PW-137 Pieces per Pack shows with per pack and goes, with its value, on another  ×1 · PW-41 the geocode route spends a dial and refuses the call past its ceiling ×1

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### name_folds_rebuild: canceling statement due to statement timeout

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-7 transfer: the markets file round-trips through the header's Import and the  ×2

```text
[WebServer] [ssr-error] /api/admin/locations/import name_folds_rebuild: canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T18:46:30.852Z | 20.7 min |
| email | 2026-10-20T18:46:28.577Z | 0.2 min |
| shard 1 | 2026-10-20T18:47:50.937Z | 52.4 min |
| shard 2 | 2026-10-20T18:46:44.934Z | 53.5 min |
| shard 3 | 2026-10-20T18:55:20.349Z | 43.4 min |
| shard 4 | 2026-10-20T18:46:32.745Z | 52.4 min |
| shard 5 | 2026-10-20T18:47:42.033Z | 56.7 min |
| shard 6 | 2026-10-20T18:47:41.585Z | 39.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 30.6 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 29.0 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 28.7 min | shard 1, shard 4 |
| `shell.spec.ts` | 424 | 28.3 min | smoke, shard 3, shard 6 |
| `ad-page.spec.ts` | 68 | 27.0 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 22.5 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 22.3 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 80 | 22.1 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 21.7 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 19.4 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 19.2 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 17.9 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 17.3 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 15.2 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 14.2 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 13.3 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 12.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.5 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.4 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 10.0 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 26 | 9.7 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 16 | 9.7 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.9 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.8 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 7.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.3 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.2 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 7.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 7.0 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 6.6 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.9 min | shard 2, shard 5 |
| `legal-admin.spec.ts` | 28 | 5.8 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.9 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.7 min | shard 3, shard 6 |
| `legal-accept.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.6 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.7 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `legal-history.spec.ts` | 6 | 1.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 1.0 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 177.1 s |
| `my-listings-doors.spec.ts` › ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) | desktop-1280 | 149.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 136.0 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the wizard's Review; Post similar opens a new draft (D194, D182 4) | mobile-360 | 127.1 s |
| `my-listings-ad.spec.ts` › MLA-4 No longer available keeps the days left; Reopen gives them back (D174 2) | desktop-1280 | 118.1 s |
| `photo-pipeline.spec.ts` › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2) | mobile-360 | 110.8 s |
| `photo-pipeline.spec.ts` › PP-14 a photo removed while it uploads, or while it waits its turn, never comes back | desktop-1280 | 107.9 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written | desktop-1280 | 107.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | desktop-1280 | 103.1 s |
| `admin-listings.spec.ts` › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2) | mobile-360 | 101.5 s |
| `post-wizard-bundle2.spec.ts` › PW-142 the pin, street and directions go when the city changes, not when the sub-city does (bundle 4 step 17, INC-393) | mobile-360 | 99.5 s |
| `admin-countries.spec.ts` › CO-7 transfer: the markets file round-trips through the header's Import and the undo puts it back | desktop-1280 | 99.2 s |
| `admin-listings.spec.ts` › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2) | desktop-1280 | 98.5 s |
| `posting-routes.spec.ts` › PR-14 the draft door's answer names the currency it stored (INC-321) | desktop-1280 | 98.3 s |
| `admin-screening.spec.ts` › SC-16 a reviewer without a fresh second factor cannot decide | mobile-360 | 95.3 s |
