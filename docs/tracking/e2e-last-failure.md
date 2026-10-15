# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38707307020
- Commit: `590ff1b89ca37f321269d70d623b6c3fe841e859`
- Attempt: 1
- Written (UTC): 2026-10-15T10:03:54.217Z
- Passed: 1881 · Skipped: 126 · Failed: 10
- Gating failures: 10 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 6
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-14 Send back to review: Other needs a note, and the note reaches the audit and the seller — Error: [e2e:al] seeding failed: no row
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-5 assist answers from the facts alone, within the field caps — Error: [e2e:pool] reaping e2e-pool-s3a-010@ethio-e2e.invalid (base role) failed: Internal server error.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover — Error: PP-8: two photos were uploaded
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 — Error: [e2e:a2c] reading regions of ET failed: Internal server error.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2) — Error: [e2e:pool] reaping e2e-pool-s5a-010@ethio-e2e.invalid (alias history) failed: <!DOCTYPE html>

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-14 Send back to review: Other needs a note, and the note reaches the audit and the seller

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:al] seeding failed: no row
--- further error 1 ---
Error: [e2e:al] seeding failed: no row

  274 |       .select("id,title")
  275 |       .single();
> 276 |     if (error || !data) throw new Error(`[e2e:al] seeding failed: ${error?.message ?? "no row"}`);
      |                               ^
  277 |     const located = await adminClient()
  278 |       .from("listing_locations")
  279 |       .insert({ listing_id: data.id, location_id: seller.cityId, position: 1 });
    at seed (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:276:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1019:18
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-14-Send-back-to-review-Other-needs-a-note-and-the-note-reaches-the-audit-and-the-seller-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-2390a-es-the-audit-and-the-seller-mobile-360`; this run carried 4 context file(s); of the same spec: none

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:ml] listing 44f4d471-564a-4d18-bf97-baed6bd3fd86 not found

  172 |     .maybeSingle();
  173 |   if (error) throw new Error(`[e2e:ml] listing read failed: ${error.message}`);
> 174 |   if (!data) throw new Error(`[e2e:ml] listing ${listingId} not found`);
      |                    ^
  175 |   return data as unknown as Row;
  176 | }
  177 |
    at listingTruth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:174:20)
    at snapshot (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:180:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1025:14
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-12-edit_my_listing-refuses-what-a-box-may-not-change-an-ad-it-may-not-edit-and-another-seller-s-and-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-db191-seller-s-and-writes-nothing-mobile-360`; this run carried 4 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › PR-5 assist answers from the facts alone, within the field caps

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s3a-010@ethio-e2e.invalid (base role) failed: Internal server error.
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s3a-010@ethio-e2e.invalid (base role) failed: Internal server error.

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:272:33)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:81:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:447:23
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-5-assist-answers-from-the-facts-alone-within-the-field-caps-mobile-360` — Playwright's name `posting-routes-POSTING-ROU-f9c7f-alone-within-the-field-caps-mobile-360`; this run carried 4 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PP-8: two photos were uploaded

expect(received).toHaveLength(expected)

Expected length: 2
Received length: 1
Received array:  [{"bytes": 48626, "exif_stripped": true, "height": 240, "id": "cefaa49d-8cc3-4e00-8cb8-cdb496037275", "listing_id": "20a6a644-3033-45f6-a977-ee4a1d647fcf", "paths": {"card": {"key": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/card.jpg", "partition": "default"}, "cover": {"key": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/cover.png", "partition": "default"}, "original": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/cover.png", "thumb": {"key": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/thumb.jpg", "partition": "default"}}, "storage_path": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/cover.png", "width": 320}]
--- further error 1 ---
Error: PP-8: two photos were uploaded

expect(received).toHaveLength(expected)

Expected length: 2
Received length: 1
Received array:  [{"bytes": 48626, "exif_stripped": true, "height": 240, "id": "cefaa49d-8cc3-4e00-8cb8-cdb496037275", "listing_id": "20a6a644-3033-45f6-a977-ee4a1d647fcf", "paths": {"card": {"key": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/card.jpg", "partition": "default"}, "cover": {"key": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/cover.png", "partition": "default"}, "original": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/cover.png", "thumb": {"key": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/thumb.jpg", "partition": "default"}}, "storage_path": "default/9dac02e1-cdf4-44a3-9550-873013dd59e0/20a6a644-3033-45f6-a977-ee4a1d647fcf/cefaa49d-8cc3-4e00-8cb8-cdb496037275/cover.png", "width": 320}]

  319 |
  320 |     const rows = await photoRowsOf(listingId);
> 321 |     expect(rows, "PP-8: two photos were uploaded").toHaveLength(2);
      |                                                    ^
  322 |     const keys = ["cover", "card", "thumb"].map((variant) =>
  323 |       keyOf(rows[1]!, variant as "cover" | "card" | "thumb"),
  324 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:321:52
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34136:25) at http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5)
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-8-DELETE-removes-the-row-and-the-objects-POST-makes-a-photo-the-cover-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86a2e-OST-makes-a-photo-the-cover-desktop-1280`; this run carried 4 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] reading regions of ET failed: Internal server error.
--- further error 1 ---
Error: [e2e:a2c] reading regions of ET failed: Internal server error.

   at helpers/posting.ts:266

  264 |     .not("slug", "like", "e2e%");
  265 |   if (regionError) {
> 266 |     throw new Error(`[e2e:a2c] reading regions of ${countryCode} failed: ${regionError.message}`);
      |           ^
  267 |   }
  268 |   const regionIds = (regions ?? []).map((row) => row.id);
  269 |   if (regionIds.length === 0) throw new Error(`[e2e:a2c] ${countryCode} has no active region`);
    at activeCityOf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:266:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:824:18
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-114-a-second-phone-appears-on-request-and-is-stored-as-phone2-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-c0b86-est-and-is-stored-as-phone2-desktop-1280`; this run carried 4 context file(s); of the same spec: none

### post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5a-010@ethio-e2e.invalid (alias history) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 502: Bad gateway</title>
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
                <span class="inline-block">Bad gateway</span>
                <span class="code-label">Error code 502</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_502&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-15 10:00:55 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s5a-010@ethio-e2e.invalid (alias history) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 502: Bad gateway</title>
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

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-33-a-region-alone-never-lists-itself-its-city-does-W6-R2-desktop-1280` — Playwright's name `post-wizard-place-POSTING--775f8-itself-its-city-does-W6-R2--desktop-1280`; this run carried 4 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

120 line(s), 42 message(s): 5 off the allowlist, 37 allowlisted.

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
| `upstream returned an HTML error page (<n>)` | 2 | shard 4 |
| `ai gate photo_screen: Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 5 |
| `auth upstream unavailable (<n>)` | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>xtrun: e<n>e_par_yvsuyg → e<n>e_chi_<n>lj<n>w` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ad<n>e<n>y: e<n>e_par_vtg<n>p<n> → e<n>e_chi_lyr<n>y` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-fdykzv: e<n>e_par_<n>belt → e<n>e_chi_<n>dglhz` (quiet) | 1 | changed |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-kwm<n>e: e<n>e_par_v<n>o<n>c → e<n>e_chi_izstow` (quiet) | 1 | changed |
| `Project not specified.` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>xtrun: e<n>e_par_yvsuyg → e<n>e_chi_<n>lj<n>w ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ad<n>e<n>y: e<n>e_par_vtg<n>p<n> → e<n>e_chi_lyr<n>y ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-fdykzv: e<n>e_par_<n>belt → e<n>e_chi_<n>dglhz ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-kwm<n>e: e<n>e_par_v<n>o<n>c → e<n>e_chi_izstow ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · /settings shows the Account context, and returning shows categories ×1 · admin tables never overflow horizontally ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### upstream returned an HTML error page (<n>)

- Count: 2 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-76b the link editor refuses a condition on the upper question naming the lowe ×2 · IMP-2 dual-actor audit: start and end are both recorded @private-identity ×2

```text
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (502)
```

### ai gate photo_screen: Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-8 DELETE removes the row and the objects; POST makes a photo the cover ×1 · PW-186 a pin saved while the directions save is unanswered keeps both ×1

```text
[WebServer] [ssr-error] /api/upload/photo ai gate photo_screen: Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### auth upstream unavailable (<n>)

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-8 an unreachable save keeps the answers, says so, and retries ×1 · PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clear ×1

```text
[WebServer] [ssr-error] /api/listings/draft auth upstream unavailable (502)
```

### Project not specified.

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): TR-40 sync follows a changed Amharic text no person wrote, and keeps one a perso ×1

```text
[WebServer] [ssr-error] /api/categories/tree Project not specified.
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T09:20:01.394Z | 18.9 min |
| email | 2026-10-15T09:19:50.417Z | 0.2 min |
| shard 1 | 2026-10-15T09:19:53.926Z | 37.9 min |
| shard 2 | 2026-10-15T09:19:50.902Z | 39.5 min |
| shard 3 | 2026-10-15T09:20:17.063Z | 39.5 min |
| shard 4 | 2026-10-15T09:19:59.921Z | 39.8 min |
| shard 5 | 2026-10-15T09:19:56.955Z | 43.5 min |
| shard 6 | 2026-10-15T09:20:04.968Z | 35.0 min |
| changed | 2026-10-15T09:20:08.140Z | 38.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 120 | 52.4 min | shard 1, shard 4, changed |
| `my-listings-doors.spec.ts` | 52 | 32.7 min | shard 2, shard 5, changed |
| `my-listings-ad.spec.ts` | 56 | 30.8 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 80 | 28.2 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 22.9 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 22.6 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 21.2 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.6 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 28 | 16.1 min | shard 2, shard 5, changed |
| `admin-attributes-safety.spec.ts` | 36 | 16.0 min | shard 1, shard 4, changed |
| `post-wizard-place.spec.ts` | 38 | 15.3 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 14.9 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.7 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 44 | 13.7 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 13.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 13.1 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 12.6 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 11.4 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 11.3 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 10.3 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 9.9 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.7 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 8.2 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.1 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.5 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.4 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.6 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 6.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 5.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.7 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.8 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.5 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 154.3 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 142.4 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | mobile-360 | 121.5 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4) | mobile-360 | 89.3 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4) | mobile-360 | 88.6 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 81.4 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 75.9 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4) | desktop-1280 | 73.3 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 73.1 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4) | desktop-1280 | 72.5 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 66.2 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 59.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 55.6 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 55.1 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 55.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38707307020-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38707307020-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38707307020-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38707307020-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38707307020-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38707307020-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38707307020-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 1 (by method: PATCH 1; by code: UND_ERR_SOCKET 1; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38707307020-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 1 (by method: GET 1; by code: UND_ERR_SOCKET 1; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38707307020-changed
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/76469d54-acfb-4aa1-886a-99e83c3ef519"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/76469d54-acfb-4aa1-886a-99e83c3ef519"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/76469d54-acfb-4aa1-886a-99e83c3ef519"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/76469d54-acfb-4aa1-886a-99e83c3ef519"


  1003 |     await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
  1004 |     await copy.click();
> 1005 |     await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
       |                        ^
  1006 |     const N = new URL(page.url()).pathname.split("/")[2]!;
  1007 |     expect(N).not.toBe(S);
  1008 |     listingIds.push(N);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1005:24
```

Context:

```text
          - listitem [ref=e198]:
            - generic [ref=e199]: About
          - listitem [ref=e200]:
            - generic [ref=e201]: How it works
      - navigation "Help" [ref=e202]:
        - heading "Help" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Safety
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Terms
          - listitem [ref=e214]:
            - generic [ref=e215]: Privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "residencyUnknown"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "residencyUnknown"

  1067 |
  1068 |     const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
> 1069 |     expect(copied.error).toBeNull();
       |                          ^
  1070 |     const answer = copied.data as Row;
  1071 |     expect(answer["ok"]).toBe(true);
  1072 |     const N = answer["listing_id"] as string;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1069:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--mobile-360`; this run carried 4 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: apiRequestContext.get: Target page, context or browser has been closed
Call log:
  - → GET http://127.0.0.1:4173/api/geo/search?q=bole-fc3630ec-60
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Authorization: Bearer [redacted-jwt]


  1452 |     for (let attempt = 1; attempt <= ceiling + 2; attempt += 1) {
  1453 |       // A DISTINCT QUERY EVERY TIME, so the cache can never stand in for the dial.
> 1454 |       const response = await page.request.get(
       |                                           ^
  1455 |         `/api/geo/search?q=${encodeURIComponent(`bole-${user.id.slice(0, 8)}-${attempt}`)}`,
  1456 |         { headers: { Authorization: `Bearer ${bearer}` } },
  1457 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1454:43
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-41-the-geocode-route-spends-a-dial-and-refuses-the-call-past-its-ceiling-mobile-360` — Playwright's name `post-wizard-place-POSTING--b12f0-s-the-call-past-its-ceiling-mobile-360`; this run carried 4 context file(s); of the same spec: none

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/f58ad44c-511d-4829-b485-2b81dc90052f"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/f58ad44c-511d-4829-b485-2b81dc90052f"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/f58ad44c-511d-4829-b485-2b81dc90052f"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/f58ad44c-511d-4829-b485-2b81dc90052f"


  1003 |     await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
  1004 |     await copy.click();
> 1005 |     await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
       |                        ^
  1006 |     const N = new URL(page.url()).pathname.split("/")[2]!;
  1007 |     expect(N).not.toBe(S);
  1008 |     listingIds.push(N);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1005:24
```

Context:

```text
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "residencyUnknown"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "residencyUnknown"

  1067 |
  1068 |     const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
> 1069 |     expect(copied.error).toBeNull();
       |                          ^
  1070 |     const answer = copied.data as Row;
  1071 |     expect(answer["ok"]).toBe(true);
  1072 |     const N = answer["listing_id"] as string;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1069:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--desktop-1280`; this run carried 4 context file(s); of the same spec: none

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/cc7946e5-2618-4dc6-a538-cec6ad970abd"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/cc7946e5-2618-4dc6-a538-cec6ad970abd"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/cc7946e5-2618-4dc6-a538-cec6ad970abd"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/cc7946e5-2618-4dc6-a538-cec6ad970abd"


  1003 |     await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
  1004 |     await copy.click();
> 1005 |     await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
       |                        ^
  1006 |     const N = new URL(page.url()).pathname.split("/")[2]!;
  1007 |     expect(N).not.toBe(S);
  1008 |     listingIds.push(N);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1005:24
```

Context:

```text
          - listitem [ref=e198]:
            - generic [ref=e199]: About
          - listitem [ref=e200]:
            - generic [ref=e201]: How it works
      - navigation "Help" [ref=e202]:
        - heading "Help" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Safety
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Terms
          - listitem [ref=e214]:
            - generic [ref=e215]: Privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/cc994456-c580-41a2-b883-b870c2de52f2"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/cc994456-c580-41a2-b883-b870c2de52f2"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/cc994456-c580-41a2-b883-b870c2de52f2"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/cc994456-c580-41a2-b883-b870c2de52f2"


  1003 |     await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
  1004 |     await copy.click();
> 1005 |     await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
       |                        ^
  1006 |     const N = new URL(page.url()).pathname.split("/")[2]!;
  1007 |     expect(N).not.toBe(S);
  1008 |     listingIds.push(N);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1005:24
```

Context:

```text
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: ML-12 nothing changed

expect(received).toBe(expected) // Object.is equality

Expected: "nothing changed"
Received: "listing not found"

  1022 |       const count = await revisionCount(ad.id);
  1023 |       const refused = await me.rpc("edit_my_listing", { p_listing_id: ad.id, p_changes: changes });
> 1024 |       expect(refused.error, `ML-12 ${message}`).toBe(message);
       |                                                 ^
  1025 |       expect(await snapshot(ad.id)).toEqual(before);
  1026 |       expect(await revisionCount(ad.id)).toBe(count);
  1027 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1024:49
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-12-edit_my_listing-refuses-what-a-box-may-not-change-an-ad-it-may-not-edit-and-another-seller-s-and-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-db191-seller-s-and-writes-nothing-mobile-360`; this run carried 4 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "residencyUnknown"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "residencyUnknown"

  1067 |
  1068 |     const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
> 1069 |     expect(copied.error).toBeNull();
       |                          ^
  1070 |     const answer = copied.data as Row;
  1071 |     expect(answer["ok"]).toBe(true);
  1072 |     const N = answer["listing_id"] as string;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1069:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--mobile-360`; this run carried 4 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "residencyUnknown"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "residencyUnknown"

  1067 |
  1068 |     const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
> 1069 |     expect(copied.error).toBeNull();
       |                          ^
  1070 |     const answer = copied.data as Row;
  1071 |     expect(answer["ok"]).toBe(true);
  1072 |     const N = answer["listing_id"] as string;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1069:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--desktop-1280`; this run carried 4 context file(s); of the same spec: none

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
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×8
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/upload/photo ai gate photo_screen: Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/listings/draft auth upstream unavailable (502)
```

## Client errors: shard 5

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34136:25) at http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5)
console.error: [client-error] gate fetch threw
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-changed-0-fdykzv: e2e_par_76belt → e2e_chi_6dglhz
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-changed-5-kwm37e: e2e_par_v5o90c → e2e_chi_izstow
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34136:25) at http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34136:25) at http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34136:25) at http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
```
