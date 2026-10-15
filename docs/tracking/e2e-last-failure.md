# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38697545936
- Commit: `92b359aa30ca261bf4aa16cb5365d9ea478c2272`
- Attempt: 1
- Written (UTC): 2026-10-15T08:33:45.648Z
- Passed: 1772 · Skipped: 126 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 · scratch 6: e2e-cat-4-1-6em532-r@20, e2e-cat-4-1-6em532-a@0, e2e-cat-1-0-kn62qa@2, e2e-cat-4-1-6em532-r2@19, e2e-cat-1-0-a6uoez@3, e2e-cat-4-1-6em532-r3@21
[ct18-dump] now: roots: real 16 at 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 · scratch 6: e2e-cat-4-1-6em532-r@18, e2e-cat-4-1-6em532-a@0, e2e-cat-4-1-6em532-r2@17, e2e-cat-1-0-kn62qa@20, e2e-cat-4-1-6em532-r3@19, e2e-cat-1-0-a6uoez@21
[ct18-dump] preview: 15 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":13}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,13,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":17}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,17,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":15}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,15,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":7}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,7,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":16}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,16,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":11}
[ct18-dump]   sent: commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump]   now:  commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump] electronics · display_order · file {"display_order":4}
[ct18-dump]   sent: electronics,electronics,,Electronics,ኤሌክትሮኒክስ,4,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump]   now:  electronics,electronics,,Electronics,ኤሌክትሮኒክስ,2,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump] fashion · display_order · file {"display_order":5}
[ct18-dump]   sent: babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump]   now:  babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump] home-garden · display_order · file {"display_order":6}
[ct18-dump]   sent: home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,6,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump]   now:  home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,4,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump] jobs · display_order · file {"display_order":18}
[ct18-dump]   sent: jobs,jobs,,Jobs,ስራዎች,18,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump]   now:  jobs,jobs,,Jobs,ስራዎች,16,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump] (5 more changed rows not printed)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 · scratch 6: e2e-cat-4-1-6em532-r@20, e2e-cat-4-1-6em532-a@0, e2e-cat-1-0-kn62qa@2, e2e-cat-4-1-6em532-r2@19, e2e-cat-1-0-a6uoez@3, e2e-cat-4-1-6em532-r3@21
[ct18-dump] now: roots: real 16 at 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 · scratch 6: e2e-cat-4-1-6em532-r@18, e2e-cat-4-1-6em532-a@0, e2e-cat-4-1-6em532-r2@17, e2e-cat-1-0-kn62qa@20, e2e-cat-4-1-6em532-r3@19, e2e-cat-1-0-a6uoez@21
[ct18-dump] preview: 15 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":13}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,13,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":17}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,17,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":15}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,15,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":7}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,7,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":16}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,16,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":11}
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:33431:25) at http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:33463:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5)
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

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

109 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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
| `ai meter background_removal: Project not specified.` | 1 | shard 2 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>q<n>ol<n>: e<n>e_par_tbq<n>vk → e<n>e_chi_<n>ijii<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yhdz<n>c: e<n>e_par_zmxi<n>v → e<n>e_chi_<n>j<n>vr<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>q<n>ol<n>: e<n>e_par_tbq<n>vk → e<n>e_chi_<n>ijii<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yhdz<n>c: e<n>e_par_zmxi<n>v → e<n>e_chi_<n>j<n>vr<n> ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · feed renders its empty state ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### ai meter background_removal: Project not specified.

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-30 Remove background is on the cover only; the preview lies on the house back ×1 · PW-118 a draft's own channel is never overwritten by the last post's ×1

```text
[WebServer] [ssr-error] /api/listings/background ai meter background_removal: Project not specified.
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T07:56:18.510Z | 16.9 min |
| email | 2026-10-15T07:56:09.806Z | 0.2 min |
| shard 1 | 2026-10-15T07:56:08.544Z | 32.8 min |
| shard 2 | 2026-10-15T07:56:08.858Z | 31.3 min |
| shard 3 | 2026-10-15T07:56:21.698Z | 32.5 min |
| shard 4 | 2026-10-15T07:56:08.631Z | 32.3 min |
| shard 5 | 2026-10-15T07:56:13.323Z | 37.2 min |
| shard 6 | 2026-10-15T07:56:16.414Z | 30.4 min |
| changed | 2026-10-15T07:56:17.784Z | 13.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 80 | 24.2 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 48 | 21.8 min | shard 2, shard 5, changed |
| `my-listings-page.spec.ts` | 28 | 21.8 min | shard 2, shard 5, changed |
| `photo-pipeline.spec.ts` | 62 | 20.3 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.0 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 18.4 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 58 | 17.7 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 15.4 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.8 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 12.4 min | shard 3, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 44 | 10.8 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 10.1 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.9 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 9.3 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 20 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.2 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.0 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 16 | 5.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.8 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.1 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-6 My listings on the table blocks: the header, the search, Filters with chips, Columns and each row's actions (D181) | desktop-1280 | 135.7 s |
| `my-listings-page.spec.ts` › MLP-6 My listings on the table blocks: the header, the search, Filters with chips, Columns and each row's actions (D181) | desktop-1280 | 131.5 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 72.3 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 70.5 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 61.2 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 60.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 60.4 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 58.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 58.6 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 56.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 56.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 54.5 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 53.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 51.3 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 51.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38697545936-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38697545936-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38697545936-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38697545936-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38697545936-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38697545936-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38697545936-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38697545936-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38697545936-changed
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-6 My listings on the table blocks: the header, the search, Filters with chips, Columns and each row's actions (D181)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('my-listings-filters-panel').getByTestId('my-listings-filter-mark-reserved')
    - locator resolved to <button type="button" aria-pressed="false" data-testid="my-listings-filter-mark-reserved" class="inline-flex h-10 min-w-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input bg-card font-medium text-foreground shadow-xs hover:bg-accent">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
  94 × retrying click action
       - waiting 500ms
```

Context:

```text
          - button "e2e-post-1-1-26iwxz" [ref=e389] [cursor=pointer]:
            - generic [ref=e390]: e2e-post-1-1-26iwxz
          - button "e2e-post-4-1-ize9op" [ref=e391] [cursor=pointer]:
            - generic [ref=e392]: e2e-post-4-1-ize9op
          - button "e2e-post-5-0-wwvziu" [ref=e393] [cursor=pointer]:
            - generic [ref=e394]: e2e-post-5-0-wwvziu
      - generic [ref=e395]:
        - generic [ref=e396]: Marks
        - group "Marks" [ref=e397]:
          - button "All" [pressed] [ref=e398] [cursor=pointer]:
            - img [ref=e399]
            - generic [ref=e401]: All
          - button "Reserved" [ref=e402] [cursor=pointer]:
            - generic [ref=e403]: Reserved
          - button "Price reduced" [ref=e404] [cursor=pointer]:
            - generic [ref=e405]: Price reduced
    - generic [ref=e406]:
      - button "Clear all" [disabled]
      - button "Show 2 results" [disabled]
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-6 My listings on the table blocks: the header, the search, Filters with chips, Columns and each row's actions (D181)

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('my-listings-filters-panel').getByTestId('my-listings-filter-mark-reserved')
    - locator resolved to <button type="button" aria-pressed="false" data-testid="my-listings-filter-mark-reserved" class="inline-flex h-10 min-w-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input bg-card font-medium text-foreground shadow-xs hover:bg-accent">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
  88 × retrying click action
       - waiting 500ms
```

Context:

```text
          - button "e2e-post-1-1-26iwxz" [ref=e389] [cursor=pointer]:
            - generic [ref=e390]: e2e-post-1-1-26iwxz
          - button "e2e-post-4-1-ize9op" [ref=e391] [cursor=pointer]:
            - generic [ref=e392]: e2e-post-4-1-ize9op
          - button "e2e-post-5-0-wwvziu" [ref=e393] [cursor=pointer]:
            - generic [ref=e394]: e2e-post-5-0-wwvziu
      - generic [ref=e395]:
        - generic [ref=e396]: Marks
        - group "Marks" [ref=e397]:
          - button "All" [pressed] [ref=e398] [cursor=pointer]:
            - img [ref=e399]
            - generic [ref=e401]: All
          - button "Reserved" [ref=e402] [cursor=pointer]:
            - generic [ref=e403]: Reserved
          - button "Price reduced" [ref=e404] [cursor=pointer]:
            - generic [ref=e405]: Price reduced
    - generic [ref=e406]:
      - button "Clear all" [disabled]
      - button "Show 2 results" [disabled]
```
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
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:33431:25) at http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:33463:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5)
[client-error] console.error: [recent-categories] read refused TypeError: Failed to fetch
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:33431:25) at http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:33463:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DjSz8ZEN.js:6027:5)
[client-error] console.error: [recent-categories] read refused TypeError: Failed to fetch
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch
```
