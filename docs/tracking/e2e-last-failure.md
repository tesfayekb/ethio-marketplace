# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39018582328
- Commit: `15fa4a4a178ce122f435d2e28ee3b2421c42160f`
- Attempt: 1
- Written (UTC): 2026-10-17T09:38:20.708Z
- Passed: 1831 · Skipped: 126 · Failed: 16
- Gating failures: 16 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 5: e2e-cat-4-11-rgon57-r2@2000000, e2e-cat-4-11-rgon57-r3@2000000, e2e-cat-1-13-vubedb@2000000, e2e-cat-4-11-rgon57-r@2000000, e2e-cat-4-11-rgon57-a@0
[ct18-dump] now: roots: real 16 at 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 · scratch 4: e2e-cat-4-11-rgon57-r2@18, e2e-cat-4-11-rgon57-r3@17, e2e-cat-4-11-rgon57-r@20, e2e-cat-4-11-rgon57-a@0
[ct18-dump] preview: 16 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":10}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,10,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":14}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,14,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":12}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,12,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":4}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,4,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":13}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,13,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":8}
[ct18-dump]   sent: commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump]   now:  commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump] electronics · display_order · file {"display_order":1}
[ct18-dump]   sent: electronics,electronics,,Electronics,ኤሌክትሮኒክስ,1,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump]   now:  electronics,electronics,,Electronics,ኤሌክትሮኒክስ,2,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump] fashion · display_order · file {"display_order":2}
[ct18-dump]   sent: babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump]   now:  babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump] home-garden · display_order · file {"display_order":3}
[ct18-dump]   sent: home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,3,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump]   now:  home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,4,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump] jobs · display_order · file {"display_order":15}
[ct18-dump]   sent: jobs,jobs,,Jobs,ስራዎች,15,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump]   now:  jobs,jobs,,Jobs,ስራዎች,16,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump] (6 more changed rows not printed)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 5: e2e-cat-4-11-rgon57-r2@2000000, e2e-cat-4-11-rgon57-r3@2000000, e2e-cat-1-13-vubedb@2000000, e2e-cat-4-11-rgon57-r@2000000, e2e-cat-4-11-rgon57-a@0
[ct18-dump] now: roots: real 16 at 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 · scratch 4: e2e-cat-4-11-rgon57-r2@18, e2e-cat-4-11-rgon57-r3@17, e2e-cat-4-11-rgon57-r@20, e2e-cat-4-11-rgon57-a@0
[ct18-dump] preview: 16 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":10}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,10,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":14}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,14,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":12}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,12,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":4}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,4,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":13}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,13,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":8}
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
      - status [ref=e8]: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>l<n>lp: e<n>e_par_nfazny → e<n>e_chi_<n>a<n>d` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ywjzm: e<n>e_par_wy<n>em<n> → e<n>e_chi_eawtzd` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>l<n>lp: e<n>e_par_nfazny → e<n>e_chi_<n>a<n>d ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ywjzm: e<n>e_par_wy<n>em<n> → e<n>e_chi_eawtzd ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×3 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tra ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · location row is present on Marketplace and absent on Account ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T08:57:43.813Z | 14.0 min |
| email | 2026-10-17T08:57:53.930Z | 0.3 min |
| shard 1 | 2026-10-17T08:57:41.861Z | 35.2 min |
| shard 2 | 2026-10-17T08:57:49.985Z | 40.2 min |
| shard 3 | 2026-10-17T08:57:49.150Z | 36.0 min |
| shard 4 | 2026-10-17T08:57:50.424Z | 38.3 min |
| shard 5 | 2026-10-17T08:57:42.546Z | 31.3 min |
| shard 6 | 2026-10-17T08:57:47.571Z | 34.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 26.2 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.4 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 60 | 19.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 19.3 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.0 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.0 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 13.4 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 12.7 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 12.7 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.4 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 64 | 12.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.5 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.5 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 18 | 9.1 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 9.1 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.3 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.9 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 7.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.4 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.1 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 6.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 30 | 6.6 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.1 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.5 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 3, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
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
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | desktop-1280 | 131.0 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | mobile-360 | 127.0 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 95.4 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 91.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 62.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 56.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 54.6 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 53.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 50.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 48.0 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 47.3 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 46.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 46.1 s |
| `ad-page.spec.ts` › AP-18 the key-facts strip: ranked facts in rank order, the fallback when none, never a card fact | desktop-1280 | 45.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 45.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39018582328-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39018582328-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39018582328-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39018582328-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39018582328-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39018582328-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39018582328-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39018582328-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  203 |       const counted = await response;
  204 |       expect(counted.status()).toBe(200);
> 205 |       return counted.json();
      |                      ^
  206 |     }
  207 |     async function views() {
  208 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:205:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:215:12
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

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-18 the key-facts strip: ranked facts in rank order, the fallback when none, never a card fact

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AP-18 links: Could not find the 'fact_rank' column of 'category_attribute_links' in the schema cache
--- further error 1 ---
Error: AP-18 links: Could not find the 'fact_rank' column of 'category_attribute_links' in the schema cache

  283 |       { category_id: seller.leafId, attribute_id: textId, display_order: 3, is_filterable: false },
  284 |     ]);
> 285 |     if (links.error) throw new Error(`AP-18 links: ${links.error.message}`);
      |                            ^
  286 |     const ad = await seed(seller, "active", {
  287 |       attributes: { [selectKey]: "blue", [numberKey]: 42, [textKey]: "scratch" },
  288 |     });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:285:28
```

Context: context file not found for `ad-page-AD-PAGE-the-buyer-s-page-bundle-19-turn-5-AP-18-the-key-facts-strip-ranked-facts-in-rank-order-the-fallback-when-none-never-a-card-fact-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-buye-6c500-when-none-never-a-card-fact-mobile-360`; this run carried 25 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-buye-d974f--the-route-refuses-a-bad-id-mobile-360`, `ad-page-AD-PAGE-—-the-buye-d974f--the-route-refuses-a-bad-id-mobile-360-retry1`, `ad-page-AD-PAGE-—-the-buye-d974f--the-route-refuses-a-bad-id-desktop-1280`, `ad-page-AD-PAGE-—-the-buye-d974f--the-route-refuses-a-bad-id-desktop-1280-retry1`

## admin-attributes-editor.spec.ts › C3 attributes console › AT-83 the key-facts rank imports through the route: absent stands, blank clears, clash and 5 refuse, export last, undo restores

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"links":[{"key":"e2e_attr_9mols2","row":2,"slug":"e2e-cat-fact83-u7d7mk","action":"upsert","change":"none","link_id":"0113c194-749a-43e6-959e-3c9f8d50b02c","card_rank":null,"allowed_set":true,"category_id":"133034aa-f3b1-4f21-ac50-99a4eb80bd7f","default_set":true,"is_required":false,"attribute_id":"0f416793-42db-48a7-990d-003a52f47c4a","visible_when":null,"default_value":null,"display_order":"1","is_filterable":false,"allowed_options":null,"visible_when_set":false,"display_order_set":true},{"key":"e2e_attr_q9v7mr","row":3,"slug":"e2e-cat-fact83-u7d7mk","action":"upsert","change":"none","link_id":"5830a3f0-9f88-4b5c-96f6-5b22f9371412","card_rank":null,"allowed_set":true,"category_id":"133034aa-f3b1-4f21-ac50-99a4eb80bd7f","default_set":true,"is_required":false,"attribute_id":"41a1f27f-5a0b-4084-acb1-9960ad4677ae","visible_when":null,"default_value":null,"display_order":"2","is_filterable":false,"allowed_options":null,"visible_when_set":false,"display_order_set":true}],"counts":{"adds":0,"changes":0,"deletes":0,"unlinks":0,"refusals":0,"unchanged":2},"holders":[],"ignored":[],"refusals":[],"definitions":[],"digest":"da46eff5f43669f164979bb4499cb73be68432ed2e76642b4fcd0f7174c5d023"}

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
-   "changes": 2,
+   "changes": 0,
    "refusals": 0,
  }
--- further error 1 ---
Error: {"links":[{"key":"e2e_attr_9mols2","row":2,"slug":"e2e-cat-fact83-u7d7mk","action":"upsert","change":"none","link_id":"0113c194-749a-43e6-959e-3c9f8d50b02c","card_rank":null,"allowed_set":true,"category_id":"133034aa-f3b1-4f21-ac50-99a4eb80bd7f","default_set":true,"is_required":false,"attribute_id":"0f416793-42db-48a7-990d-003a52f47c4a","visible_when":null,"default_value":null,"display_order":"1","is_filterable":false,"allowed_options":null,"visible_when_set":false,"display_order_set":true},{"key":"e2e_attr_q9v7mr","row":3,"slug":"e2e-cat-fact83-u7d7mk","action":"upsert","change":"none","link_id":"5830a3f0-9f88-4b5c-96f6-5b22f9371412","card_rank":null,"allowed_set":true,"category_id":"133034aa-f3b1-4f21-ac50-99a4eb80bd7f","default_set":true,"is_required":false,"attribute_id":"41a1f27f-5a0b-4084-acb1-9960ad4677ae","visible_when":null,"default_value":null,"display_order":"2","is_filterable":false,"allowed_options":null,"visible_when_set":false,"display_order_set":true}],"counts":{"adds":0,"changes":0,"deletes":0,"unlinks":0,"refusals":0,"unchanged":2},"holders":[],"ignored":[],"refusals":[],"definitions":[],"digest":"da46eff5f43669f164979bb4499cb73be68432ed2e76642b4fcd0f7174c5d023"}

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
-   "changes": 2,
+   "changes": 0,
    "refusals": 0,
  }

  1919 |         { changes: counts.changes, refusals: counts.refusals },
  1920 |         JSON.stringify(preview.payload),
> 1921 |       ).toEqual({ changes: expected, refusals: 0 });
       |         ^
  1922 |       const commit = await importPost(page, token, {
  1923 |         mode: "commit",
  1924 |         links: text,
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  991 |         "attribute_key,label_en,label_am,type,options,depends_on,unit,min,max,decimals,format,preset,max_length,help_text_en,help_text_am,is_per_variant (read-only),direct_link_count (read-only),unit_am",
  992 |       );
> 993 |       expect(links.slice(1).split("\r\n")[0]).toBe(
      |                                               ^
  994 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  995 |       );
  996 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:993:47
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  1224 |       const links = texts.get(`${fixture.parentSlug}-links.csv`)!;
  1225 |       const lines = links.slice(1).split("\r\n").filter(Boolean);
> 1226 |       expect(lines[0]).toBe(
       |                        ^
  1227 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  1228 |       );
  1229 |       // ONLY the subtree: every data row's category_slug is parent or child.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1226:24
```

Context:

```text
          - listitem [ref=e368]:
            - generic [ref=e369]: About
          - listitem [ref=e370]:
            - generic [ref=e371]: How it works
      - navigation "Help" [ref=e372]:
        - heading "Help" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Safety
          - listitem [ref=e377]:
            - generic [ref=e378]: Contact
      - navigation "Legal" [ref=e379]:
        - heading "Legal" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - generic [ref=e383]: Terms
          - listitem [ref=e384]:
            - generic [ref=e385]: Privacy
    - paragraph [ref=e387]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-links.spec.ts › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-62 the export did not echo the order: e2e-cat-cond-dajv4a,e2e-cat-cond-dajv4a,e2e_attr_067vmy,false,false,,e2e-cat-cond-dajv4a,,,e2e_attr_c8tt1y=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-dajv4a,e2e-cat-cond-dajv4a,e2e_attr_067vmy,false,false,,e2e-cat-cond-dajv4a,,,e2e_attr_c8tt1y=pickup,7,"
--- further error 1 ---
Error: AT-62 the export did not echo the order: e2e-cat-cond-dajv4a,e2e-cat-cond-dajv4a,e2e_attr_067vmy,false,false,,e2e-cat-cond-dajv4a,,,e2e_attr_c8tt1y=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-dajv4a,e2e-cat-cond-dajv4a,e2e_attr_067vmy,false,false,,e2e-cat-cond-dajv4a,,,e2e_attr_c8tt1y=pickup,7,"

  1097 |         `${parentKey}=pickup`,
  1098 |       );
> 1099 |       expect(childRow, `AT-62 the export did not echo the order: ${childRow}`).toMatch(/,7$/);
       |                                                                                ^
  1100 |
  1101 |       // AND THE ROUND TRIP IS A NO-OP (IE-2b).
  1102 |       const preview = await importPost(page, token, { mode: "preview", links });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:1099:80
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1955 |     // D171 — no sideways scroll, the two photos on one row.
  1956 |     await expectNoHorizontalOverflow(page);
> 1957 |     await expect
       |     ^
  1958 |       .poll(() =>
  1959 |         items.evaluateAll((nodes) =>
  1960 |           nodes.every((n) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1957:5
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

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

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


  772 |       else {
  773 |         await page.getByTestId("post-back").click();
> 774 |         await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                       ^
  775 |         await page.getByTestId("post-back").click();
  776 |       }
  777 |       await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:774:55)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 25 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  203 |       const counted = await response;
  204 |       expect(counted.status()).toBe(200);
> 205 |       return counted.json();
      |                      ^
  206 |     }
  207 |     async function views() {
  208 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:205:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:215:12
```

Context:

```text
          - listitem [ref=e290]:
            - generic [ref=e291]: About
          - listitem [ref=e292]:
            - generic [ref=e293]: How it works
      - navigation "Help" [ref=e294]:
        - heading "Help" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - generic [ref=e298]: Safety
          - listitem [ref=e299]:
            - generic [ref=e300]: Contact
      - navigation "Legal" [ref=e301]:
        - heading "Legal" [level=2] [ref=e302]
        - list [ref=e303]:
          - listitem [ref=e304]:
            - generic [ref=e305]: Terms
          - listitem [ref=e306]:
            - generic [ref=e307]: Privacy
    - paragraph [ref=e309]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-18 the key-facts strip: ranked facts in rank order, the fallback when none, never a card fact

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AP-18 links: Could not find the 'fact_rank' column of 'category_attribute_links' in the schema cache
--- further error 1 ---
Error: AP-18 links: Could not find the 'fact_rank' column of 'category_attribute_links' in the schema cache

  283 |       { category_id: seller.leafId, attribute_id: textId, display_order: 3, is_filterable: false },
  284 |     ]);
> 285 |     if (links.error) throw new Error(`AP-18 links: ${links.error.message}`);
      |                            ^
  286 |     const ad = await seed(seller, "active", {
  287 |       attributes: { [selectKey]: "blue", [numberKey]: 42, [textKey]: "scratch" },
  288 |     });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:285:28
```

Context: context file not found for `ad-page-AD-PAGE-the-buyer-s-page-bundle-19-turn-5-AP-18-the-key-facts-strip-ranked-facts-in-rank-order-the-fallback-when-none-never-a-card-fact-desktop-1280` — Playwright's name `ad-page-AD-PAGE-—-the-buye-6c500-when-none-never-a-card-fact-desktop-1280`; this run carried 25 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-buye-d974f--the-route-refuses-a-bad-id-mobile-360`, `ad-page-AD-PAGE-—-the-buye-d974f--the-route-refuses-a-bad-id-mobile-360-retry1`, `ad-page-AD-PAGE-—-the-buye-d974f--the-route-refuses-a-bad-id-desktop-1280`, `ad-page-AD-PAGE-—-the-buye-d974f--the-route-refuses-a-bad-id-desktop-1280-retry1`

## admin-attributes-editor.spec.ts › C3 attributes console › AT-83 the key-facts rank imports through the route: absent stands, blank clears, clash and 5 refuse, export last, undo restores

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: {"links":[{"key":"e2e_attr_9azpwx","row":2,"slug":"e2e-cat-fact83-95198d","action":"upsert","change":"none","link_id":"1882fc69-0b04-4215-a551-5610c1baf90d","card_rank":null,"allowed_set":true,"category_id":"85683f97-ce0a-4d71-9922-ca07d9489639","default_set":true,"is_required":false,"attribute_id":"dde69fb7-675a-4160-a4ed-15b1cdcd6bcd","visible_when":null,"default_value":null,"display_order":"1","is_filterable":false,"allowed_options":null,"visible_when_set":false,"display_order_set":true},{"key":"e2e_attr_j4va8x","row":3,"slug":"e2e-cat-fact83-95198d","action":"upsert","change":"none","link_id":"afbf20a2-49ad-4ef9-8fd5-de716510a369","card_rank":null,"allowed_set":true,"category_id":"85683f97-ce0a-4d71-9922-ca07d9489639","default_set":true,"is_required":false,"attribute_id":"644a42a4-e7b9-4b5f-8ac9-ad3ace92e225","visible_when":null,"default_value":null,"display_order":"2","is_filterable":false,"allowed_options":null,"visible_when_set":false,"display_order_set":true}],"counts":{"adds":0,"changes":0,"deletes":0,"unlinks":0,"refusals":0,"unchanged":2},"holders":[],"ignored":[],"refusals":[],"definitions":[],"digest":"cf2f9088e296816a692a3f73f7a48364c89805e075b3eca73a0a69ffe1d1a518"}

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
-   "changes": 2,
+   "changes": 0,
    "refusals": 0,
  }
--- further error 1 ---
Error: {"links":[{"key":"e2e_attr_9azpwx","row":2,"slug":"e2e-cat-fact83-95198d","action":"upsert","change":"none","link_id":"1882fc69-0b04-4215-a551-5610c1baf90d","card_rank":null,"allowed_set":true,"category_id":"85683f97-ce0a-4d71-9922-ca07d9489639","default_set":true,"is_required":false,"attribute_id":"dde69fb7-675a-4160-a4ed-15b1cdcd6bcd","visible_when":null,"default_value":null,"display_order":"1","is_filterable":false,"allowed_options":null,"visible_when_set":false,"display_order_set":true},{"key":"e2e_attr_j4va8x","row":3,"slug":"e2e-cat-fact83-95198d","action":"upsert","change":"none","link_id":"afbf20a2-49ad-4ef9-8fd5-de716510a369","card_rank":null,"allowed_set":true,"category_id":"85683f97-ce0a-4d71-9922-ca07d9489639","default_set":true,"is_required":false,"attribute_id":"644a42a4-e7b9-4b5f-8ac9-ad3ace92e225","visible_when":null,"default_value":null,"display_order":"2","is_filterable":false,"allowed_options":null,"visible_when_set":false,"display_order_set":true}],"counts":{"adds":0,"changes":0,"deletes":0,"unlinks":0,"refusals":0,"unchanged":2},"holders":[],"ignored":[],"refusals":[],"definitions":[],"digest":"cf2f9088e296816a692a3f73f7a48364c89805e075b3eca73a0a69ffe1d1a518"}

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
-   "changes": 2,
+   "changes": 0,
    "refusals": 0,
  }

  1919 |         { changes: counts.changes, refusals: counts.refusals },
  1920 |         JSON.stringify(preview.payload),
> 1921 |       ).toEqual({ changes: expected, refusals: 0 });
       |         ^
  1922 |       const commit = await importPost(page, token, {
  1923 |         mode: "commit",
  1924 |         links: text,
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  991 |         "attribute_key,label_en,label_am,type,options,depends_on,unit,min,max,decimals,format,preset,max_length,help_text_en,help_text_am,is_per_variant (read-only),direct_link_count (read-only),unit_am",
  992 |       );
> 993 |       expect(links.slice(1).split("\r\n")[0]).toBe(
      |                                               ^
  994 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  995 |       );
  996 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:993:47
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  1224 |       const links = texts.get(`${fixture.parentSlug}-links.csv`)!;
  1225 |       const lines = links.slice(1).split("\r\n").filter(Boolean);
> 1226 |       expect(lines[0]).toBe(
       |                        ^
  1227 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  1228 |       );
  1229 |       // ONLY the subtree: every data row's category_slug is parent or child.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1226:24
```

Context:

```text
          - listitem [ref=e393]:
            - generic [ref=e394]: About
          - listitem [ref=e395]:
            - generic [ref=e396]: How it works
      - navigation "Help" [ref=e397]:
        - heading "Help" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Safety
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Legal" [ref=e404]:
        - heading "Legal" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Terms
          - listitem [ref=e409]:
            - generic [ref=e410]: Privacy
    - paragraph [ref=e412]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-links.spec.ts › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-62 the export did not echo the order: e2e-cat-cond-k7ytzz,e2e-cat-cond-k7ytzz,e2e_attr_rppwyp,false,false,,e2e-cat-cond-k7ytzz,,,e2e_attr_r9ag08=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-k7ytzz,e2e-cat-cond-k7ytzz,e2e_attr_rppwyp,false,false,,e2e-cat-cond-k7ytzz,,,e2e_attr_r9ag08=pickup,7,"
--- further error 1 ---
Error: AT-62 the export did not echo the order: e2e-cat-cond-k7ytzz,e2e-cat-cond-k7ytzz,e2e_attr_rppwyp,false,false,,e2e-cat-cond-k7ytzz,,,e2e_attr_r9ag08=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-k7ytzz,e2e-cat-cond-k7ytzz,e2e_attr_rppwyp,false,false,,e2e-cat-cond-k7ytzz,,,e2e_attr_r9ag08=pickup,7,"

  1097 |         `${parentKey}=pickup`,
  1098 |       );
> 1099 |       expect(childRow, `AT-62 the export did not echo the order: ${childRow}`).toMatch(/,7$/);
       |                                                                                ^
  1100 |
  1101 |       // AND THE ROUND TRIP IS A NO-OP (IE-2b).
  1102 |       const preview = await importPost(page, token, { mode: "preview", links });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:1099:80
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1955 |     // D171 — no sideways scroll, the two photos on one row.
  1956 |     await expectNoHorizontalOverflow(page);
> 1957 |     await expect
       |     ^
  1958 |       .poll(() =>
  1959 |         items.evaluateAll((nodes) =>
  1960 |           nodes.every((n) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1957:5
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

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')


  837 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
  838 |     // INC-682: the failed send is proven by the aborted poll above; the app's own retry clears the notice at once (INC-679), so its visibility is a race, not a behaviour.
> 839 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
      |                                                   ^
  840 |     // INC-679: the hook's successful retry clears the transport block before Back.
  841 |     await expect(page.getByTestId("post-next-unreachable")).toBeHidden();
  842 |     await toSpecs("back");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:839:51
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 25 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-11-55l5lp: e2e_par_nfazny → e2e_chi_9a813d
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-11-2ywjzm: e2e_par_wy6em2 → e2e_chi_eawtzd
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```
