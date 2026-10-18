# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39145637321
- Commit: `8a51af34beaab5b84bb39929515881429f8ac3a9`
- Attempt: 1
- Written (UTC): 2026-10-18T17:22:20.474Z
- Passed: 1925 · Skipped: 130 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 · scratch 2: e2e-cat-4-0-n9j1xi@1, e2e-cat-4-0-g3v4b4@2
[ct18-dump] now: roots: real 16 at 0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 · scratch 2: e2e-cat-4-0-n9j1xi@1, e2e-cat-4-0-g3v4b4@2
[ct18-dump] preview: 15 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":10}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,10,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,12,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":14}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,14,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,16,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":12}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,12,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,14,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":4}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,4,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,6,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":13}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,13,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,15,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":8}
[ct18-dump]   sent: commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump]   now:  commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump] electronics · display_order · file {"display_order":1}
[ct18-dump]   sent: electronics,electronics,,Electronics,ኤሌክትሮኒክስ,1,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump]   now:  electronics,electronics,,Electronics,ኤሌክትሮኒክስ,3,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump] fashion · display_order · file {"display_order":2}
[ct18-dump]   sent: babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump]   now:  babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump] home-garden · display_order · file {"display_order":3}
[ct18-dump]   sent: home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,3,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump]   now:  home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,5,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump] jobs · display_order · file {"display_order":15}
[ct18-dump]   sent: jobs,jobs,,Jobs,ስራዎች,15,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump]   now:  jobs,jobs,,Jobs,ስራዎች,17,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump] (5 more changed rows not printed)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 · scratch 2: e2e-cat-4-0-n9j1xi@1, e2e-cat-4-0-g3v4b4@2
[ct18-dump] now: roots: real 16 at 0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 · scratch 2: e2e-cat-4-0-n9j1xi@1, e2e-cat-4-0-g3v4b4@2
[ct18-dump] preview: 15 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":10}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,10,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,12,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":14}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,14,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,16,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":12}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,12,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,14,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":4}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,4,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,6,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":13}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,13,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,15,true,false,false,true,,once,true,,Factory,,,,,0,
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

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-bwwfcf: e<n>e_par_ghp<n>ee → e<n>e_chi_ajd<n>lu` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>y<n>g: e<n>e_par_mnjjwm → e<n>e_chi_pq<n>kl` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-bwwfcf: e<n>e_par_ghp<n>ee → e<n>e_chi_ajd<n>lu ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>y<n>g: e<n>e_par_mnjjwm → e<n>e_chi_pq<n>kl ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · /settings shows the Account context, and returning shows categories ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

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
| smoke | 2026-10-18T16:36:01.276Z | 17.7 min |
| email | 2026-10-18T16:36:00.303Z | 0.2 min |
| shard 1 | 2026-10-18T16:36:03.266Z | 45.9 min |
| shard 2 | 2026-10-18T16:36:04.031Z | 43.6 min |
| shard 3 | 2026-10-18T16:36:06.848Z | 36.7 min |
| shard 4 | 2026-10-18T16:36:00.809Z | 45.0 min |
| shard 5 | 2026-10-18T16:35:59.831Z | 34.1 min |
| shard 6 | 2026-10-18T16:36:07.182Z | 35.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 66 | 26.0 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 25.8 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.7 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.5 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 76 | 17.4 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 17.0 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.2 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.9 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 13.0 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 12.7 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 12.3 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.7 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.4 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 10.8 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 10.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.2 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 9.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.4 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.2 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.8 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.0 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 6.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.6 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.2 min | shard 1, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 1.7 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.6 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 82.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 71.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 63.5 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 59.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 52.6 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 51.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 49.6 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 49.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 48.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 46.3 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 45.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 44.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 44.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 44.5 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 43.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39145637321-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39145637321-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39145637321-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 37 (pool 4, fresh 33)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 39145637321-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39145637321-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39145637321-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39145637321-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39145637321-6
```

## posting-routes.spec.ts › POSTING ROUTES › PR-57 a country's name beside an institution word is the claim refusal; a two-letter code is never a country (R5)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]

  1610 |
  1611 |   function expectPasses(answer: { reasons: string[]; raw: string }) {
> 1612 |     for (const reason of NAME_REFUSALS) expect(answer.reasons, answer.raw).not.toContain(reason);
       |                                                                                ^
  1613 |   }
  1614 |
  1615 |   test("PR-54 claim words and lure words refuse in every country; an ordinary name with a lure word inside passes (R1, R3, DEC-203)", async ({
    at expectPasses (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1612:80)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1665:7
```

Context:

```text
          - listitem [ref=e261]:
            - generic [ref=e262]: About
          - listitem [ref=e263]:
            - generic [ref=e264]: How it works
      - navigation "Help" [ref=e265]:
        - heading "Help" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Safety
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Legal" [ref=e272]:
        - heading "Legal" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Terms
          - listitem [ref=e277]:
            - generic [ref=e278]: Privacy
    - paragraph [ref=e280]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-57 a country's name beside an institution word is the claim refusal; a two-letter code is never a country (R5)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]

  1610 |
  1611 |   function expectPasses(answer: { reasons: string[]; raw: string }) {
> 1612 |     for (const reason of NAME_REFUSALS) expect(answer.reasons, answer.raw).not.toContain(reason);
       |                                                                                ^
  1613 |   }
  1614 |
  1615 |   test("PR-54 claim words and lure words refuse in every country; an ordinary name with a lure word inside passes (R1, R3, DEC-203)", async ({
    at expectPasses (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1612:80)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1665:7
```

Context:

```text
          - listitem [ref=e282]:
            - generic [ref=e283]: About
          - listitem [ref=e284]:
            - generic [ref=e285]: How it works
      - navigation "Help" [ref=e286]:
        - heading "Help" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Safety
          - listitem [ref=e291]:
            - generic [ref=e292]: Contact
      - navigation "Legal" [ref=e293]:
        - heading "Legal" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Terms
          - listitem [ref=e298]:
            - generic [ref=e299]: Privacy
    - paragraph [ref=e301]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
