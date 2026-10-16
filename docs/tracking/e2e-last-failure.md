# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38898025836
- Commit: `a4bd00b28d46259f1879bd595002d4515fd21dc8`
- Attempt: 1
- Written (UTC): 2026-10-16T12:52:37.603Z
- Passed: 1911 · Skipped: 126 · Failed: 53
- Gating failures: 53 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-screening.spec.ts › ADMIN SCREENING › SC-20 Preview as buyer lists the ad's photos view-only and links to the ad's page, where Edit removes one with a reason and the seller is told (D154 B4, D169) — Error: [e2e:setup] POST /logout?scope=global failed (502): <html>

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 1: e2e-cat-4-5-jyylm5@16
[ct18-dump] now: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 2: e2e-cat-4-5-jyylm5@16, e2e-cat-1-9-hotour-r@2000000
[ct18-dump] preview: 15 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":11}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,10,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":15}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,14,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":13}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,12,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":5}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,4,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":14}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,13,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":9}
[ct18-dump]   sent: commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump]   now:  commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump] electronics · display_order · file {"display_order":2}
[ct18-dump]   sent: electronics,electronics,,Electronics,ኤሌክትሮኒክስ,2,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump]   now:  electronics,electronics,,Electronics,ኤሌክትሮኒክስ,1,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump] fashion · display_order · file {"display_order":3}
[ct18-dump]   sent: babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump]   now:  babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump] home-garden · display_order · file {"display_order":4}
[ct18-dump]   sent: home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,4,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump]   now:  home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,3,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump] jobs · display_order · file {"display_order":16}
[ct18-dump]   sent: jobs,jobs,,Jobs,ስራዎች,16,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump]   now:  jobs,jobs,,Jobs,ስራዎች,15,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump] (5 more changed rows not printed)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 1: e2e-cat-4-5-jyylm5@16
[ct18-dump] now: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 2: e2e-cat-4-5-jyylm5@16, e2e-cat-1-9-hotour-r@2000000
[ct18-dump] preview: 15 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":11}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,10,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":15}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,14,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":13}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,12,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":5}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,4,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":14}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,13,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":9}
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [active] [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-20 Preview as buyer lists the ad's photos view-only and links to the ad's page, where Edit removes one with a reason and the seller is told (D154 B4, D169)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /logout?scope=global failed (502): <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:setup] POST /logout?scope=global failed (502): <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:378:3)
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-20-Preview-as-buyer-lists-the-ad-s-photos-view-only-and-links-to-the-ad-s-page-where-Edit-removes-one-with-a-reason-and-the-seller-is-told-D154-B4-D169-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-ca0e1-eller-is-told-D154-B4-D169--mobile-360`; this run carried 91 context file(s); of the same spec: `admin-screening-ADMIN-SCRE-a4571-e-opened-preview-D194-D188--mobile-360-retry1`, `admin-screening-ADMIN-SCRE-a4571-e-opened-preview-D194-D188--mobile-360`, `admin-screening-ADMIN-SCRE-a4571-e-opened-preview-D194-D188--desktop-1280-retry1`, `admin-screening-ADMIN-SCRE-a4571-e-opened-preview-D194-D188--desktop-1280`

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

94 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 12 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `digest mismatch` (quiet) | 4 | shard 1, shard 4 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mll<n>h: e<n>e_par_jv<n>kyw → e<n>e_chi_u<n>asn` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>djkj: e<n>e_par_<n>zt<n>ev → e<n>e_chi_rdq<n>sy` (quiet) | 1 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · digest mismatch ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mll<n>h: e<n>e_par_jv<n>kyw → e<n>e_chi_u<n>asn ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>djkj: e<n>e_par_<n>zt<n>ev → e<n>e_chi_rdq<n>sy ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · exactly one collapse toggle, and the wordmark moves into the bar when collapsed ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

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
| smoke | 2026-10-16T12:06:03.753Z | 17.5 min |
| email | 2026-10-16T12:06:11.102Z | 0.3 min |
| shard 1 | 2026-10-16T12:06:04.365Z | 46.1 min |
| shard 2 | 2026-10-16T12:06:18.364Z | 38.5 min |
| shard 3 | 2026-10-16T12:06:05.216Z | 35.0 min |
| shard 4 | 2026-10-16T12:06:05.181Z | 40.7 min |
| shard 5 | 2026-10-16T12:06:05.678Z | 45.6 min |
| shard 6 | 2026-10-16T12:05:59.231Z | 28.1 min |
| changed | 2026-10-16T12:06:02.376Z | 35.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 120 | 51.9 min | shard 1, shard 4, changed |
| `admin-screening.spec.ts` | 100 | 36.6 min | shard 1, shard 4, changed |
| `photo-pipeline.spec.ts` | 66 | 25.6 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 60 | 25.4 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 80 | 22.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 20.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.2 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 17.0 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 78 | 15.5 min | smoke, shard 2, shard 5, changed |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.5 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 14.3 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 28 | 13.9 min | shard 2, shard 5, changed |
| `posting-routes.spec.ts` | 62 | 13.4 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 13.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 13.1 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 13.1 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.5 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.2 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 10.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.3 min | shard 1, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.8 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.4 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.4 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.9 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.7 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 6.2 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 5.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 5.2 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 4.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision | desktop-1280 | 109.5 s |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | mobile-360 | 86.7 s |
| `admin-listings.spec.ts` › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision | mobile-360 | 85.8 s |
| `admin-listings.spec.ts` › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision | mobile-360 | 84.7 s |
| `admin-listings.spec.ts` › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision | desktop-1280 | 82.9 s |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | desktop-1280 | 81.5 s |
| `admin-listings.spec.ts` › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit | mobile-360 | 79.1 s |
| `admin-users.spec.ts` › AU-1 permission: moderator is refused, admin sees the list | desktop-1280 | 78.7 s |
| `my-listings-ad.spec.ts` › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177) | mobile-360 | 77.6 s |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | mobile-360 | 75.1 s |
| `admin-attributes-library.spec.ts` › AT-1 gating: a plain user is refused; the library renders for an admin | mobile-360 | 74.9 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | mobile-360 | 74.2 s |
| `admin-attributes-library.spec.ts` › AT-1 gating: a plain user is refused; the library renders for an admin | desktop-1280 | 74.2 s |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | desktop-1280 | 73.5 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 72.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38898025836-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38898025836-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 38898025836-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 55 user(s) owned by process 38898025836-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38898025836-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38898025836-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 58 user(s) owned by process 38898025836-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38898025836-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38898025836-changed
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e343]:
            - generic [ref=e344]: About
          - listitem [ref=e345]:
            - generic [ref=e346]: How it works
      - navigation "Help" [ref=e347]:
        - heading "Help" [level=2] [ref=e348]
        - list [ref=e349]:
          - listitem [ref=e350]:
            - generic [ref=e351]: Safety
          - listitem [ref=e352]:
            - generic [ref=e353]: Contact
      - navigation "Legal" [ref=e354]:
        - heading "Legal" [level=2] [ref=e355]
        - list [ref=e356]:
          - listitem [ref=e357]:
            - generic [ref=e358]: Terms
          - listitem [ref=e359]:
            - generic [ref=e360]: Privacy
    - paragraph [ref=e362]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: About
          - listitem [ref=e291]:
            - generic [ref=e292]: How it works
      - navigation "Help" [ref=e293]:
        - heading "Help" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Safety
          - listitem [ref=e298]:
            - generic [ref=e299]: Contact
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Terms
          - listitem [ref=e305]:
            - generic [ref=e306]: Privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e302]:
            - generic [ref=e303]: About
          - listitem [ref=e304]:
            - generic [ref=e305]: How it works
      - navigation "Help" [ref=e306]:
        - heading "Help" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Safety
          - listitem [ref=e311]:
            - generic [ref=e312]: Contact
      - navigation "Legal" [ref=e313]:
        - heading "Legal" [level=2] [ref=e314]
        - list [ref=e315]:
          - listitem [ref=e316]:
            - generic [ref=e317]: Terms
          - listitem [ref=e318]:
            - generic [ref=e319]: Privacy
    - paragraph [ref=e321]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: How it works
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
          - listitem [ref=e277]:
            - generic [ref=e278]: Contact
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

## admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"


  1460 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
  1461 |     const newest = page.getByTestId("listing-history-entry-0");
> 1462 |     await expect(newest.getByTestId("listing-history-what")).toHaveText(
       |                                                              ^
  1463 |       en["admin.listings.history.edited"].replace(
  1464 |         "{fields}",
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')


  1553 |     // Do not change anything; go back.
  1554 |     await page.getByTestId("post-next").click();
> 1555 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
       |                                                   ^
  1556 |     await expect(page.getByTestId("post-edit-notice")).toHaveCount(0);
  1557 |     expect((await revisionRows(live.id, "edit")).length).toBe(revisionCountBefore);
  1558 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1555:51
```

Context:

```text
          - listitem [ref=e344]:
            - generic [ref=e345]: About
          - listitem [ref=e346]:
            - generic [ref=e347]: How it works
      - navigation "Help" [ref=e348]:
        - heading "Help" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Safety
          - listitem [ref=e353]:
            - generic [ref=e354]: Contact
      - navigation "Legal" [ref=e355]:
        - heading "Legal" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: Terms
          - listitem [ref=e360]:
            - generic [ref=e361]: Privacy
    - paragraph [ref=e363]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e274]:
            - generic [ref=e275]: About
          - listitem [ref=e276]:
            - generic [ref=e277]: How it works
      - navigation "Help" [ref=e278]:
        - heading "Help" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Safety
          - listitem [ref=e283]:
            - generic [ref=e284]: Contact
      - navigation "Legal" [ref=e285]:
        - heading "Legal" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - generic [ref=e289]: Terms
          - listitem [ref=e290]:
            - generic [ref=e291]: Privacy
    - paragraph [ref=e293]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"


  1405 |     await stepUpIfPrompted(page, secret);
  1406 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
> 1407 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "true", {
       |                                                        ^
  1408 |       timeout: 20000,
  1409 |     });
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

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e241]:
            - generic [ref=e242]: About
          - listitem [ref=e243]:
            - generic [ref=e244]: How it works
      - navigation "Help" [ref=e245]:
        - heading "Help" [level=2] [ref=e246]
        - list [ref=e247]:
          - listitem [ref=e248]:
            - generic [ref=e249]: Safety
          - listitem [ref=e250]:
            - generic [ref=e251]: Contact
      - navigation "Legal" [ref=e252]:
        - heading "Legal" [level=2] [ref=e253]
        - list [ref=e254]:
          - listitem [ref=e255]:
            - generic [ref=e256]: Terms
          - listitem [ref=e257]:
            - generic [ref=e258]: Privacy
    - paragraph [ref=e260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e260]:
            - generic [ref=e261]: About
          - listitem [ref=e262]:
            - generic [ref=e263]: How it works
      - navigation "Help" [ref=e264]:
        - heading "Help" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Safety
          - listitem [ref=e269]:
            - generic [ref=e270]: Contact
      - navigation "Legal" [ref=e271]:
        - heading "Legal" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Terms
          - listitem [ref=e276]:
            - generic [ref=e277]: Privacy
    - paragraph [ref=e279]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e227]:
            - generic [ref=e228]: About
          - listitem [ref=e229]:
            - generic [ref=e230]: How it works
      - navigation "Help" [ref=e231]:
        - heading "Help" [level=2] [ref=e232]
        - list [ref=e233]:
          - listitem [ref=e234]:
            - generic [ref=e235]: Safety
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Legal" [ref=e238]:
        - heading "Legal" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Terms
          - listitem [ref=e243]:
            - generic [ref=e244]: Privacy
    - paragraph [ref=e246]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e267]:
            - generic [ref=e268]: About
          - listitem [ref=e269]:
            - generic [ref=e270]: How it works
      - navigation "Help" [ref=e271]:
        - heading "Help" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Safety
          - listitem [ref=e276]:
            - generic [ref=e277]: Contact
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

## import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e330]:
            - generic [ref=e331]: About
          - listitem [ref=e332]:
            - generic [ref=e333]: How it works
      - navigation "Help" [ref=e334]:
        - heading "Help" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - generic [ref=e338]: Safety
          - listitem [ref=e339]:
            - generic [ref=e340]: Contact
      - navigation "Legal" [ref=e341]:
        - heading "Legal" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Terms
          - listitem [ref=e346]:
            - generic [ref=e347]: Privacy
    - paragraph [ref=e349]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: How it works
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
          - listitem [ref=e264]:
            - generic [ref=e265]: Contact
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: Terms
          - listitem [ref=e271]:
            - generic [ref=e272]: Privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e248]:
            - generic [ref=e249]: About
          - listitem [ref=e250]:
            - generic [ref=e251]: How it works
      - navigation "Help" [ref=e252]:
        - heading "Help" [level=2] [ref=e253]
        - list [ref=e254]:
          - listitem [ref=e255]:
            - generic [ref=e256]: Safety
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
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

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e295]:
            - generic [ref=e296]: About
          - listitem [ref=e297]:
            - generic [ref=e298]: How it works
      - navigation "Help" [ref=e299]:
        - heading "Help" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Safety
          - listitem [ref=e304]:
            - generic [ref=e305]: Contact
      - navigation "Legal" [ref=e306]:
        - heading "Legal" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Terms
          - listitem [ref=e311]:
            - generic [ref=e312]: Privacy
    - paragraph [ref=e314]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e348]:
            - generic [ref=e349]: About
          - listitem [ref=e350]:
            - generic [ref=e351]: How it works
      - navigation "Help" [ref=e352]:
        - heading "Help" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: Safety
          - listitem [ref=e357]:
            - generic [ref=e358]: Contact
      - navigation "Legal" [ref=e359]:
        - heading "Legal" [level=2] [ref=e360]
        - list [ref=e361]:
          - listitem [ref=e362]:
            - generic [ref=e363]: Terms
          - listitem [ref=e364]:
            - generic [ref=e365]: Privacy
    - paragraph [ref=e367]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1024 |     await page.getByTestId("post-title").click();
  1025 |     await page.keyboard.type(`E2E corrected ${token()}`);
> 1026 |     await expect(refusal).toHaveCount(0);
       |                           ^
  1027 |   });
  1028 |
```

Context:

```text
          - listitem [ref=e232]:
            - generic [ref=e233]: About
          - listitem [ref=e234]:
            - generic [ref=e235]: How it works
      - navigation "Help" [ref=e236]:
        - heading "Help" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Safety
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Terms
          - listitem [ref=e248]:
            - generic [ref=e249]: Privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e340]:
            - generic [ref=e341]: About
          - listitem [ref=e342]:
            - generic [ref=e343]: How it works
      - navigation "Help" [ref=e344]:
        - heading "Help" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - generic [ref=e348]: Safety
          - listitem [ref=e349]:
            - generic [ref=e350]: Contact
      - navigation "Legal" [ref=e351]:
        - heading "Legal" [level=2] [ref=e352]
        - list [ref=e353]:
          - listitem [ref=e354]:
            - generic [ref=e355]: Terms
          - listitem [ref=e356]:
            - generic [ref=e357]: Privacy
    - paragraph [ref=e359]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e315]:
            - generic [ref=e316]: About
          - listitem [ref=e317]:
            - generic [ref=e318]: How it works
      - navigation "Help" [ref=e319]:
        - heading "Help" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Safety
          - listitem [ref=e324]:
            - generic [ref=e325]: Contact
      - navigation "Legal" [ref=e326]:
        - heading "Legal" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Terms
          - listitem [ref=e331]:
            - generic [ref=e332]: Privacy
    - paragraph [ref=e334]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e305]:
            - generic [ref=e306]: About
          - listitem [ref=e307]:
            - generic [ref=e308]: How it works
      - navigation "Help" [ref=e309]:
        - heading "Help" [level=2] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - generic [ref=e313]: Safety
          - listitem [ref=e314]:
            - generic [ref=e315]: Contact
      - navigation "Legal" [ref=e316]:
        - heading "Legal" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Terms
          - listitem [ref=e321]:
            - generic [ref=e322]: Privacy
    - paragraph [ref=e324]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e315]:
            - generic [ref=e316]: About
          - listitem [ref=e317]:
            - generic [ref=e318]: How it works
      - navigation "Help" [ref=e319]:
        - heading "Help" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Safety
          - listitem [ref=e324]:
            - generic [ref=e325]: Contact
      - navigation "Legal" [ref=e326]:
        - heading "Legal" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Terms
          - listitem [ref=e331]:
            - generic [ref=e332]: Privacy
    - paragraph [ref=e334]: © 2026 ethio.com — All rights reserved.
```
```

## admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"


  1460 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
  1461 |     const newest = page.getByTestId("listing-history-entry-0");
> 1462 |     await expect(newest.getByTestId("listing-history-what")).toHaveText(
       |                                                              ^
  1463 |       en["admin.listings.history.edited"].replace(
  1464 |         "{fields}",
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: How it works
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Legal" [ref=e400]:
        - heading "Legal" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Terms
          - listitem [ref=e405]:
            - generic [ref=e406]: Privacy
    - paragraph [ref=e408]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')


  1553 |     // Do not change anything; go back.
  1554 |     await page.getByTestId("post-next").click();
> 1555 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
       |                                                   ^
  1556 |     await expect(page.getByTestId("post-edit-notice")).toHaveCount(0);
  1557 |     expect((await revisionRows(live.id, "edit")).length).toBe(revisionCountBefore);
  1558 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1555:51
```

Context:

```text
          - listitem [ref=e396]:
            - generic [ref=e397]: About
          - listitem [ref=e398]:
            - generic [ref=e399]: How it works
      - navigation "Help" [ref=e400]:
        - heading "Help" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Safety
          - listitem [ref=e405]:
            - generic [ref=e406]: Contact
      - navigation "Legal" [ref=e407]:
        - heading "Legal" [level=2] [ref=e408]
        - list [ref=e409]:
          - listitem [ref=e410]:
            - generic [ref=e411]: Terms
          - listitem [ref=e412]:
            - generic [ref=e413]: Privacy
    - paragraph [ref=e415]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e338]:
            - generic [ref=e339]: About
          - listitem [ref=e340]:
            - generic [ref=e341]: How it works
      - navigation "Help" [ref=e342]:
        - heading "Help" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - generic [ref=e346]: Safety
          - listitem [ref=e347]:
            - generic [ref=e348]: Contact
      - navigation "Legal" [ref=e349]:
        - heading "Legal" [level=2] [ref=e350]
        - list [ref=e351]:
          - listitem [ref=e352]:
            - generic [ref=e353]: Terms
          - listitem [ref=e354]:
            - generic [ref=e355]: Privacy
    - paragraph [ref=e357]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e301]:
            - generic [ref=e302]: About
          - listitem [ref=e303]:
            - generic [ref=e304]: How it works
      - navigation "Help" [ref=e305]:
        - heading "Help" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - generic [ref=e309]: Safety
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Legal" [ref=e312]:
        - heading "Legal" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Terms
          - listitem [ref=e317]:
            - generic [ref=e318]: Privacy
    - paragraph [ref=e320]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"


  1405 |     await stepUpIfPrompted(page, secret);
  1406 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
> 1407 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "true", {
       |                                                        ^
  1408 |       timeout: 20000,
  1409 |     });
```

Context:

```text
          - listitem [ref=e419]:
            - generic [ref=e420]: About
          - listitem [ref=e421]:
            - generic [ref=e422]: How it works
      - navigation "Help" [ref=e423]:
        - heading "Help" [level=2] [ref=e424]
        - list [ref=e425]:
          - listitem [ref=e426]:
            - generic [ref=e427]: Safety
          - listitem [ref=e428]:
            - generic [ref=e429]: Contact
      - navigation "Legal" [ref=e430]:
        - heading "Legal" [level=2] [ref=e431]
        - list [ref=e432]:
          - listitem [ref=e433]:
            - generic [ref=e434]: Terms
          - listitem [ref=e435]:
            - generic [ref=e436]: Privacy
    - paragraph [ref=e438]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e294]:
            - generic [ref=e295]: About
          - listitem [ref=e296]:
            - generic [ref=e297]: How it works
      - navigation "Help" [ref=e298]:
        - heading "Help" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - generic [ref=e302]: Safety
          - listitem [ref=e303]:
            - generic [ref=e304]: Contact
      - navigation "Legal" [ref=e305]:
        - heading "Legal" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - generic [ref=e309]: Terms
          - listitem [ref=e310]:
            - generic [ref=e311]: Privacy
    - paragraph [ref=e313]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e329]:
            - generic [ref=e330]: About
          - listitem [ref=e331]:
            - generic [ref=e332]: How it works
      - navigation "Help" [ref=e333]:
        - heading "Help" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Safety
          - listitem [ref=e338]:
            - generic [ref=e339]: Contact
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - generic [ref=e344]: Terms
          - listitem [ref=e345]:
            - generic [ref=e346]: Privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e320]:
            - generic [ref=e321]: About
          - listitem [ref=e322]:
            - generic [ref=e323]: How it works
      - navigation "Help" [ref=e324]:
        - heading "Help" [level=2] [ref=e325]
        - list [ref=e326]:
          - listitem [ref=e327]:
            - generic [ref=e328]: Safety
          - listitem [ref=e329]:
            - generic [ref=e330]: Contact
      - navigation "Legal" [ref=e331]:
        - heading "Legal" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Terms
          - listitem [ref=e336]:
            - generic [ref=e337]: Privacy
    - paragraph [ref=e339]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: How it works
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
          - listitem [ref=e340]:
            - generic [ref=e341]: Contact
      - navigation "Legal" [ref=e342]:
        - heading "Legal" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - generic [ref=e346]: Terms
          - listitem [ref=e347]:
            - generic [ref=e348]: Privacy
    - paragraph [ref=e350]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:66

  64 | /** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
  65 | export async function fillUntilStable(input: Locator, value: string, fieldName: string) {
> 66 |   await expect(input, `${fieldName} field is not editable`).toBeEditable();
     |                                                             ^
```

Context:

```text
          - listitem [ref=e347]:
            - generic [ref=e348]: About
          - listitem [ref=e349]:
            - generic [ref=e350]: How it works
      - navigation "Help" [ref=e351]:
        - heading "Help" [level=2] [ref=e352]
        - list [ref=e353]:
          - listitem [ref=e354]:
            - generic [ref=e355]: Safety
          - listitem [ref=e356]:
            - generic [ref=e357]: Contact
      - navigation "Legal" [ref=e358]:
        - heading "Legal" [level=2] [ref=e359]
        - list [ref=e360]:
          - listitem [ref=e361]:
            - generic [ref=e362]: Terms
          - listitem [ref=e363]:
            - generic [ref=e364]: Privacy
    - paragraph [ref=e366]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e329]:
            - generic [ref=e330]: About
          - listitem [ref=e331]:
            - generic [ref=e332]: How it works
      - navigation "Help" [ref=e333]:
        - heading "Help" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Safety
          - listitem [ref=e338]:
            - generic [ref=e339]: Contact
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - generic [ref=e344]: Terms
          - listitem [ref=e345]:
            - generic [ref=e346]: Privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e324]:
            - generic [ref=e325]: About
          - listitem [ref=e326]:
            - generic [ref=e327]: How it works
      - navigation "Help" [ref=e328]:
        - heading "Help" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Safety
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Terms
          - listitem [ref=e340]:
            - generic [ref=e341]: Privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:66

  64 | /** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
  65 | export async function fillUntilStable(input: Locator, value: string, fieldName: string) {
> 66 |   await expect(input, `${fieldName} field is not editable`).toBeEditable();
     |                                                             ^
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e404]:
            - generic [ref=e405]: About
          - listitem [ref=e406]:
            - generic [ref=e407]: How it works
      - navigation "Help" [ref=e408]:
        - heading "Help" [level=2] [ref=e409]
        - list [ref=e410]:
          - listitem [ref=e411]:
            - generic [ref=e412]: Safety
          - listitem [ref=e413]:
            - generic [ref=e414]: Contact
      - navigation "Legal" [ref=e415]:
        - heading "Legal" [level=2] [ref=e416]
        - list [ref=e417]:
          - listitem [ref=e418]:
            - generic [ref=e419]: Terms
          - listitem [ref=e420]:
            - generic [ref=e421]: Privacy
    - paragraph [ref=e423]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: How it works
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
          - listitem [ref=e343]:
            - generic [ref=e344]: Contact
      - navigation "Legal" [ref=e345]:
        - heading "Legal" [level=2] [ref=e346]
        - list [ref=e347]:
          - listitem [ref=e348]:
            - generic [ref=e349]: Terms
          - listitem [ref=e350]:
            - generic [ref=e351]: Privacy
    - paragraph [ref=e353]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1024 |     await page.getByTestId("post-title").click();
  1025 |     await page.keyboard.type(`E2E corrected ${token()}`);
> 1026 |     await expect(refusal).toHaveCount(0);
       |                           ^
  1027 |   });
  1028 |
```

Context:

```text
          - listitem [ref=e293]:
            - generic [ref=e294]: About
          - listitem [ref=e295]:
            - generic [ref=e296]: How it works
      - navigation "Help" [ref=e297]:
        - heading "Help" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Safety
          - listitem [ref=e302]:
            - generic [ref=e303]: Contact
      - navigation "Legal" [ref=e304]:
        - heading "Legal" [level=2] [ref=e305]
        - list [ref=e306]:
          - listitem [ref=e307]:
            - generic [ref=e308]: Terms
          - listitem [ref=e309]:
            - generic [ref=e310]: Privacy
    - paragraph [ref=e312]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"


  1460 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
  1461 |     const newest = page.getByTestId("listing-history-entry-0");
> 1462 |     await expect(newest.getByTestId("listing-history-what")).toHaveText(
       |                                                              ^
  1463 |       en["admin.listings.history.edited"].replace(
  1464 |         "{fields}",
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')


  1553 |     // Do not change anything; go back.
  1554 |     await page.getByTestId("post-next").click();
> 1555 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
       |                                                   ^
  1556 |     await expect(page.getByTestId("post-edit-notice")).toHaveCount(0);
  1557 |     expect((await revisionRows(live.id, "edit")).length).toBe(revisionCountBefore);
  1558 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1555:51
```

Context:

```text
          - listitem [ref=e344]:
            - generic [ref=e345]: About
          - listitem [ref=e346]:
            - generic [ref=e347]: How it works
      - navigation "Help" [ref=e348]:
        - heading "Help" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Safety
          - listitem [ref=e353]:
            - generic [ref=e354]: Contact
      - navigation "Legal" [ref=e355]:
        - heading "Legal" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: Terms
          - listitem [ref=e360]:
            - generic [ref=e361]: Privacy
    - paragraph [ref=e363]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"


  1460 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
  1461 |     const newest = page.getByTestId("listing-history-entry-0");
> 1462 |     await expect(newest.getByTestId("listing-history-what")).toHaveText(
       |                                                              ^
  1463 |       en["admin.listings.history.edited"].replace(
  1464 |         "{fields}",
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: How it works
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Legal" [ref=e400]:
        - heading "Legal" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Terms
          - listitem [ref=e405]:
            - generic [ref=e406]: Privacy
    - paragraph [ref=e408]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')


  1553 |     // Do not change anything; go back.
  1554 |     await page.getByTestId("post-next").click();
> 1555 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
       |                                                   ^
  1556 |     await expect(page.getByTestId("post-edit-notice")).toHaveCount(0);
  1557 |     expect((await revisionRows(live.id, "edit")).length).toBe(revisionCountBefore);
  1558 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1555:51
```

Context:

```text
          - listitem [ref=e396]:
            - generic [ref=e397]: About
          - listitem [ref=e398]:
            - generic [ref=e399]: How it works
      - navigation "Help" [ref=e400]:
        - heading "Help" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Safety
          - listitem [ref=e405]:
            - generic [ref=e406]: Contact
      - navigation "Legal" [ref=e407]:
        - heading "Legal" [level=2] [ref=e408]
        - list [ref=e409]:
          - listitem [ref=e410]:
            - generic [ref=e411]: Terms
          - listitem [ref=e412]:
            - generic [ref=e413]: Privacy
    - paragraph [ref=e415]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"


  1405 |     await stepUpIfPrompted(page, secret);
  1406 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
> 1407 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "true", {
       |                                                        ^
  1408 |       timeout: 20000,
  1409 |     });
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

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"


  1405 |     await stepUpIfPrompted(page, secret);
  1406 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
> 1407 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "true", {
       |                                                        ^
  1408 |       timeout: 20000,
  1409 |     });
```

Context:

```text
          - listitem [ref=e419]:
            - generic [ref=e420]: About
          - listitem [ref=e421]:
            - generic [ref=e422]: How it works
      - navigation "Help" [ref=e423]:
        - heading "Help" [level=2] [ref=e424]
        - list [ref=e425]:
          - listitem [ref=e426]:
            - generic [ref=e427]: Safety
          - listitem [ref=e428]:
            - generic [ref=e429]: Contact
      - navigation "Legal" [ref=e430]:
        - heading "Legal" [level=2] [ref=e431]
        - list [ref=e432]:
          - listitem [ref=e433]:
            - generic [ref=e434]: Terms
          - listitem [ref=e435]:
            - generic [ref=e436]: Privacy
    - paragraph [ref=e438]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1024 |     await page.getByTestId("post-title").click();
  1025 |     await page.keyboard.type(`E2E corrected ${token()}`);
> 1026 |     await expect(refusal).toHaveCount(0);
       |                           ^
  1027 |   });
  1028 |
```

Context:

```text
          - listitem [ref=e232]:
            - generic [ref=e233]: About
          - listitem [ref=e234]:
            - generic [ref=e235]: How it works
      - navigation "Help" [ref=e236]:
        - heading "Help" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Safety
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Terms
          - listitem [ref=e248]:
            - generic [ref=e249]: Privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1024 |     await page.getByTestId("post-title").click();
  1025 |     await page.keyboard.type(`E2E corrected ${token()}`);
> 1026 |     await expect(refusal).toHaveCount(0);
       |                           ^
  1027 |   });
  1028 |
```

Context:

```text
          - listitem [ref=e293]:
            - generic [ref=e294]: About
          - listitem [ref=e295]:
            - generic [ref=e296]: How it works
      - navigation "Help" [ref=e297]:
        - heading "Help" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Safety
          - listitem [ref=e302]:
            - generic [ref=e303]: Contact
      - navigation "Legal" [ref=e304]:
        - heading "Legal" [level=2] [ref=e305]
        - list [ref=e306]:
          - listitem [ref=e307]:
            - generic [ref=e308]: Terms
          - listitem [ref=e309]:
            - generic [ref=e310]: Privacy
    - paragraph [ref=e312]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-1mll4h: e2e_par_jv4kyw → e2e_chi_u67asn
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×4
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×5
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×6
console.error: [client-error] gate fetch threw ×2
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×5
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/edit_my_listing ({"code":"P0001","details":null,"hint":null,"message":"an ad in review is edited once its review is done"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/edit_my_listing ({"code":"P0001","details":null,"hint":null,"message":"an ad in review is edited once its review is done"})
console.error: [client-error] gate fetch threw ×3
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-c3djkj: e2e_par_4zt1ev → e2e_chi_rdq2sy
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×9
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×4
console.error: [client-error] gate fetch threw ×2
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×7
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [client-error] gate fetch threw
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33476:25) at http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Dzt3n4YT.js:6027:5) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/edit_my_listing ({"code":"P0001","details":null,"hint":null,"message":"an ad in review is edited once its review is done"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/edit_my_listing ({"code":"P0001","details":null,"hint":null,"message":"an ad in review is edited once its review is done"})
console.error: [client-error] gate fetch threw ×5
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/edit_my_listing ({"code":"P0001","details":null,"hint":null,"message":"an ad in review is edited once its review is done"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/edit_my_listing ({"code":"P0001","details":null,"hint":null,"message":"an ad in review is edited once its review is done"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/edit_my_listing ({"code":"P0001","details":null,"hint":null,"message":"an ad in review is edited once its review is done"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/edit_my_listing ({"code":"P0001","details":null,"hint":null,"message":"an ad in review is edited once its review is done"})
```
