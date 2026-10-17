# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39025730003
- Commit: `6a0a74f1efd638661c6d5d7ab1827027b878e38a`
- Attempt: 1
- Written (UTC): 2026-10-17T11:40:29.753Z
- Passed: 1837 · Skipped: 126 · Failed: 20
- Gating failures: 20 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422) — Error: PW-147: leaving the name boxes offered no names built from them
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back — Error: PW-173: a touch did not replace the place

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-147: leaving the name boxes offered no names built from them

expect(received).toContain(expected) // indexOf

Expected substring: "abebe"
Received string:    "eepostqgtc_shop,eepostqgtc_shop1,eepostqgtc_shop2"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-147: leaving the name boxes offered no names built from them

expect(received).toContain(expected) // indexOf

Expected substring: "abebe"
Received string:    "eepostqgtc_shop,eepostqgtc_shop1,eepostqgtc_shop2"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  622 |     await page.getByTestId("post-who-last").blur();
  623 |     const offered = page.getByTestId("post-who-alias-suggestion");
> 624 |     await expect
      |     ^
  625 |       .poll(async () => (await offered.allTextContents()).join(","), {
  626 |         message: "PW-147: leaving the name boxes offered no names built from them",
  627 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:624:5
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-147-an-empty-seller-name-box-offers-three-names-from-the-typed-names-a-saved-name-offers-none-until-cleared-bundle-4-step-21-INC-422-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-657a0-d-bundle-4-step-21-INC-422--mobile-360`; this run carried 17 context file(s); of the same spec: none

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 · scratch 1: e2e-cat-1-11-940ifi@1
[ct18-dump] now: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 2: e2e-cat-4-15-gh18lq@17, e2e-cat-1-11-940ifi@16
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
[ct18-dump] at export: roots: real 16 at 0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 · scratch 1: e2e-cat-1-11-940ifi@1
[ct18-dump] now: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 2: e2e-cat-4-15-gh18lq@17, e2e-cat-1-11-940ifi@16
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

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-173: a touch did not replace the place

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "ad77b440-b50b-4678-b7de-1ab4a05abb36",
+   "3a5d79fc-581f-4af1-8b19-c1a62437d49c",
  ]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-173: a touch did not replace the place

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "ad77b440-b50b-4678-b7de-1ab4a05abb36",
+   "3a5d79fc-581f-4af1-8b19-c1a62437d49c",
  ]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1050 |
  1051 |     await page.getByTestId("post-where-subcity").selectOption(b.subCity.id);
> 1052 |     await expect
       |     ^
  1053 |       .poll(async () => (await coverageOf(listingId)).placeIds, {
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-173-a-draft-placed-in-another-market-opens-there-on-resume-and-after-Back-desktop-1280` — Playwright's name `post-wizard-where-POSTING--7bfec-re-on-resume-and-after-Back-desktop-1280`; this run carried 17 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

116 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 15 | shard 3, shard 6 |
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
| `catalog_find_refresh: canceling statement due to statement timeout` | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vm<n>wsy: e<n>e_par_<n>lqind → e<n>e_chi_ktx<n>a` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-whhfwg: e<n>e_par_<n>pcmfz → e<n>e_chi_e<n>ma<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vm<n>wsy: e<n>e_par_<n>lqind → e<n>e_chi_ktx<n>a ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-whhfwg: e<n>e_par_<n>pcmfz → e<n>e_chi_e<n>ma<n> ×1

Off the allowlist:

### listing not found

- Count: 15 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### catalog_find_refresh: canceling statement due to statement timeout

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-8 geometry: nothing overflows and every verb is reachable in both twins ×1 · CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T10:59:28.822Z | 15.3 min |
| email | 2026-10-17T10:59:30.516Z | 0.3 min |
| shard 1 | 2026-10-17T10:59:24.314Z | 37.9 min |
| shard 2 | 2026-10-17T10:59:23.365Z | 34.9 min |
| shard 3 | 2026-10-17T10:59:25.745Z | 33.6 min |
| shard 4 | 2026-10-17T10:59:27.371Z | 40.7 min |
| shard 5 | 2026-10-17T10:59:24.632Z | 35.2 min |
| shard 6 | 2026-10-17T10:59:36.676Z | 35.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 25.3 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 22.9 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 20.2 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.9 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 18.4 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 18.4 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 15.5 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 64 | 13.2 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.3 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 11.8 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 11.7 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 11.6 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.5 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 10.5 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 9.8 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 20 | 8.7 min | shard 1, shard 4 |
| `ad-page.spec.ts` | 22 | 8.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 8.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 8.3 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 28 | 7.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.4 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 7.4 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.2 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 6.6 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 6.2 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 108.9 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 93.3 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 91.1 s |
| `ad-page-doors.spec.ts` › AP-22 a new account is held to five reveals its first day (D201 §6b) | desktop-1280 | 76.4 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 75.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | mobile-360 | 73.3 s |
| `post-wizard-bundle2.spec.ts` › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422) | mobile-360 | 70.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | desktop-1280 | 68.3 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | desktop-1280 | 68.2 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | mobile-360 | 63.9 s |
| `photo-pipeline.spec.ts` › PP-16 a photo dropped on the step is added like a picked one | mobile-360 | 59.8 s |
| `post-wizard-bundle2.spec.ts` › PW-130 a refused seller name offers three free names, claimed on save | desktop-1280 | 59.7 s |
| `photo-pipeline.spec.ts` › PP-12 a stored photo is drawn on the photo step through a link that expires | desktop-1280 | 59.3 s |
| `ad-page-doors.spec.ts` › AP-22 a new account is held to five reveals its first day (D201 §6b) | mobile-360 | 57.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 56.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39025730003-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39025730003-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 39025730003-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39025730003-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39025730003-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 39025730003-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39025730003-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39025730003-6
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-3 public_listing answers the public document of a live ad and nothing private

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }

  155 |     });
  156 |     expect((doc["places"] as Row)["street_address"]).toBe("E2E street");
> 157 |     expect(doc["counts"]).toEqual({ views: 0, shares: 0 });
      |                           ^
  158 |     const path = (doc["category"] as Row)["path"] as Row[];
  159 |     expect(Array.isArray(path)).toBe(true);
  160 |     expect(path.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:157:27
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-3-public_listing-answers-the-public-document-of-a-live-ad-and-nothing-private-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-ac4b9-live-ad-and-nothing-private-mobile-360`; this run carried 17 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-6 views count once per address and never for the owner; shares count by channel

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }

  279 |     const read = await anonymous.rpc("public_listing", { p_public_id: publicId });
  280 |     expect(read.error).toBeNull();
> 281 |     expect((read.data as Row)["counts"]).toEqual({ views: 2, shares: 2 });
      |                                          ^
  282 |
  283 |     const owner = await asPerson(seller);
  284 |     const counts = await owner.rpc("listing_counts", { p_listing_id: ad.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:281:42
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-6-views-count-once-per-address-and-never-for-the-owner-shares-count-by-channel-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-267c0-ner-shares-count-by-channel-mobile-360`; this run carried 17 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-22 a new account is held to five reveals its first day (D201 §6b)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }

  549 |     });
  550 |     expect(sixth.error).toBeNull();
> 551 |     expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
      |                        ^
  552 |     const resetsAt = new Date(String((sixth.data as Row)["resets_at"])).getTime();
  553 |     const midnight = new Date();
  554 |     midnight.setUTCHours(24, 0, 0, 0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:551:24
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-22-a-new-account-is-held-to-five-reveals-its-first-day-D201-6b-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6db67-als-its-first-day-D201-§6b--mobile-360`; this run carried 17 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-detail-counts')
Expected: "2 views"
Received: "2 views · 0 contacts"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-detail-counts')
    14 × locator resolved to <p data-state="ready" data-testid="listing-detail-counts" class="text-sm text-muted-foreground">…</p>
       - unexpected value "2 views · 0 contacts"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-detail-counts')
Expected: "2 views"
Received: "2 views · 0 contacts"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-detail-counts')
    14 × locator resolved to <p data-state="ready" data-testid="listing-detail-counts" class="text-sm text-muted-foreground">…</p>
       - unexpected value "2 views · 0 contacts"


  244 |     const count = page.getByTestId("listing-detail-counts");
  245 |     await expect(count).toHaveAttribute("data-state", "ready");
> 246 |     await expect(count).toHaveText(fill(en["feed.views"], { count: 2 }));
      |                         ^
  247 |     await expect(page.getByTestId("listing-detail")).toHaveAttribute("data-actor", "owner");
  248 |     for (const data of [{ publicId: "nope" }, {}]) {
```

Context:

```text
          - listitem [ref=e214]:
            - generic [ref=e215]: About
          - listitem [ref=e216]:
            - generic [ref=e217]: How it works
      - navigation "Help" [ref=e218]:
        - heading "Help" [level=2] [ref=e219]
        - list [ref=e220]:
          - listitem [ref=e221]:
            - generic [ref=e222]: Safety
          - listitem [ref=e223]:
            - generic [ref=e224]: Contact
      - navigation "Legal" [ref=e225]:
        - heading "Legal" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: Terms
          - listitem [ref=e230]:
            - generic [ref=e231]: Privacy
    - paragraph [ref=e233]: © 2026 ethio.com — All rights reserved.
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
Error: AT-62 the export did not echo the order: e2e-cat-cond-fwflgc,e2e-cat-cond-fwflgc,e2e_attr_vw1rmw,false,false,,e2e-cat-cond-fwflgc,,,e2e_attr_3yi6zp=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-fwflgc,e2e-cat-cond-fwflgc,e2e_attr_vw1rmw,false,false,,e2e-cat-cond-fwflgc,,,e2e_attr_3yi6zp=pickup,7,"
--- further error 1 ---
Error: AT-62 the export did not echo the order: e2e-cat-cond-fwflgc,e2e-cat-cond-fwflgc,e2e_attr_vw1rmw,false,false,,e2e-cat-cond-fwflgc,,,e2e_attr_3yi6zp=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-fwflgc,e2e-cat-cond-fwflgc,e2e_attr_vw1rmw,false,false,,e2e-cat-cond-fwflgc,,,e2e_attr_3yi6zp=pickup,7,"

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

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"

  545 |     const pPublicId = (await listingTruth(p.id))["public_id"] as string;
  546 |     const reached = await buyer.rpc("reveal_listing_contact", { p_public_id: pPublicId });
> 547 |     expect(reached.error).toBeNull();
      |                           ^
  548 |     expect((reached.data as Row)["ok"]).toBe(true);
  549 |
  550 |     const sold = await me.rpc("mark_sold", { p_listing_id: p.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:547:27
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--mobile-360`; this run carried 17 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7361 ms | category and specifications seeded @ 8000 ms | step 3 reached @ 9793 ms | specifications answered @ 10142 ms | step 6 open @ 15774 ms | tree served @ 16358 ms | place chosen @ 16551 ms | review open @ 20154 ms | review labels read @ 20176 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_no97d8_select"]')
Expected: "e2e_post_3_1_no97d8_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_no97d8_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_3_1_no97d8_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_3_1_no97d8 selecte2e_post_3_1_no97d8_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_3_1_no97d8_select">e2e_post_3_1_no97d8_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_3_1_no97d8_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7361 ms | category and specifications seeded @ 8000 ms | step 3 reached @ 9793 ms | specifications answered @ 10142 ms | step 6 open @ 15774 ms | tree served @ 16358 ms | place chosen @ 16551 ms | review open @ 20154 ms | review labels read @ 20176 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_no97d8_select"]')

--- further error 1 ---
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7361 ms | category and specifications seeded @ 8000 ms | step 3 reached @ 9793 ms | specifications answered @ 10142 ms | step 6 open @ 15774 ms | tree served @ 16358 ms | place chosen @ 16551 ms | review open @ 20154 ms | review labels read @ 20176 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_no97d8_select"]')
Expected: "e2e_post_3_1_no97d8_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_no97d8_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_3_1_no97d8_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_3_1_no97d8 selecte2e_post_3_1_no97d8_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_3_1_no97d8_select">e2e_post_3_1_no97d8_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_3_1_no97d8_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7361 ms | category and specifications seeded @ 8000 ms | step 3 reached @ 9793 ms | specifications answered @ 10142 ms | step 6 open @ 15774 ms | tree served @ 16358 ms | place chosen @ 16551 ms | review open @ 20154 ms | review labels read @ 20176 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_no97d8_select"]')


  825 |       buyer.locator(`[data-key="${spec.select.attrKey}"]`),
  826 |       why("PW-30: the buyer preview never rendered the select option's label"),
> 827 |     ).toHaveText(`${spec.optionValues[0]} label`, { timeout: 20_000 });
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 17 context file(s); of the same spec: none

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


  773 |         await page.getByTestId("post-back").click();
  774 |         try {
> 775 |           await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                         ^
  776 |         } catch (error) {
  777 |           const ui = await page.evaluate(() => {
  778 |             const next = document.querySelector('[data-testid="post-next"]');
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:775:57)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 17 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-3 public_listing answers the public document of a live ad and nothing private

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }

  155 |     });
  156 |     expect((doc["places"] as Row)["street_address"]).toBe("E2E street");
> 157 |     expect(doc["counts"]).toEqual({ views: 0, shares: 0 });
      |                           ^
  158 |     const path = (doc["category"] as Row)["path"] as Row[];
  159 |     expect(Array.isArray(path)).toBe(true);
  160 |     expect(path.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:157:27
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-3-public_listing-answers-the-public-document-of-a-live-ad-and-nothing-private-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-ac4b9-live-ad-and-nothing-private-desktop-1280`; this run carried 17 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-6 views count once per address and never for the owner; shares count by channel

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }

  279 |     const read = await anonymous.rpc("public_listing", { p_public_id: publicId });
  280 |     expect(read.error).toBeNull();
> 281 |     expect((read.data as Row)["counts"]).toEqual({ views: 2, shares: 2 });
      |                                          ^
  282 |
  283 |     const owner = await asPerson(seller);
  284 |     const counts = await owner.rpc("listing_counts", { p_listing_id: ad.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:281:42
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-6-views-count-once-per-address-and-never-for-the-owner-shares-count-by-channel-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-267c0-ner-shares-count-by-channel-desktop-1280`; this run carried 17 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-22 a new account is held to five reveals its first day (D201 §6b)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }

  549 |     });
  550 |     expect(sixth.error).toBeNull();
> 551 |     expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
      |                        ^
  552 |     const resetsAt = new Date(String((sixth.data as Row)["resets_at"])).getTime();
  553 |     const midnight = new Date();
  554 |     midnight.setUTCHours(24, 0, 0, 0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:551:24
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-22-a-new-account-is-held-to-five-reveals-its-first-day-D201-6b-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6db67-als-its-first-day-D201-§6b--desktop-1280`; this run carried 17 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-detail-counts')
Expected: "2 views"
Received: "2 views · 0 contacts"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-detail-counts')
    14 × locator resolved to <p data-state="ready" data-testid="listing-detail-counts" class="text-sm text-muted-foreground">…</p>
       - unexpected value "2 views · 0 contacts"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-detail-counts')
Expected: "2 views"
Received: "2 views · 0 contacts"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-detail-counts')
    14 × locator resolved to <p data-state="ready" data-testid="listing-detail-counts" class="text-sm text-muted-foreground">…</p>
       - unexpected value "2 views · 0 contacts"


  244 |     const count = page.getByTestId("listing-detail-counts");
  245 |     await expect(count).toHaveAttribute("data-state", "ready");
> 246 |     await expect(count).toHaveText(fill(en["feed.views"], { count: 2 }));
      |                         ^
  247 |     await expect(page.getByTestId("listing-detail")).toHaveAttribute("data-actor", "owner");
  248 |     for (const data of [{ publicId: "nope" }, {}]) {
```

Context:

```text
          - listitem [ref=e247]:
            - generic [ref=e248]: About
          - listitem [ref=e249]:
            - generic [ref=e250]: How it works
      - navigation "Help" [ref=e251]:
        - heading "Help" [level=2] [ref=e252]
        - list [ref=e253]:
          - listitem [ref=e254]:
            - generic [ref=e255]: Safety
          - listitem [ref=e256]:
            - generic [ref=e257]: Contact
      - navigation "Legal" [ref=e258]:
        - heading "Legal" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Terms
          - listitem [ref=e263]:
            - generic [ref=e264]: Privacy
    - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
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
Error: AT-62 the export did not echo the order: e2e-cat-cond-z959ln,e2e-cat-cond-z959ln,e2e_attr_hyurpz,false,false,,e2e-cat-cond-z959ln,,,e2e_attr_gbdc1g=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-z959ln,e2e-cat-cond-z959ln,e2e_attr_hyurpz,false,false,,e2e-cat-cond-z959ln,,,e2e_attr_gbdc1g=pickup,7,"
--- further error 1 ---
Error: AT-62 the export did not echo the order: e2e-cat-cond-z959ln,e2e-cat-cond-z959ln,e2e_attr_hyurpz,false,false,,e2e-cat-cond-z959ln,,,e2e_attr_gbdc1g=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-z959ln,e2e-cat-cond-z959ln,e2e_attr_hyurpz,false,false,,e2e-cat-cond-z959ln,,,e2e_attr_gbdc1g=pickup,7,"

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

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"

  545 |     const pPublicId = (await listingTruth(p.id))["public_id"] as string;
  546 |     const reached = await buyer.rpc("reveal_listing_contact", { p_public_id: pPublicId });
> 547 |     expect(reached.error).toBeNull();
      |                           ^
  548 |     expect((reached.data as Row)["ok"]).toBe(true);
  549 |
  550 |     const sold = await me.rpc("mark_sold", { p_listing_id: p.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:547:27
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--desktop-1280`; this run carried 17 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 6753 ms | category and specifications seeded @ 7916 ms | step 3 reached @ 10805 ms | specifications answered @ 11076 ms | step 6 open @ 16835 ms | tree served @ 17646 ms | place chosen @ 17842 ms | review open @ 23022 ms | review labels read @ 23050 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_ioo0sy_select"]')
Expected: "e2e_post_6_1_ioo0sy_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_ioo0sy_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_6_1_ioo0sy_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_6_1_ioo0sy selecte2e_post_6_1_ioo0sy_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_6_1_ioo0sy_select">e2e_post_6_1_ioo0sy_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_6_1_ioo0sy_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 6753 ms | category and specifications seeded @ 7916 ms | step 3 reached @ 10805 ms | specifications answered @ 11076 ms | step 6 open @ 16835 ms | tree served @ 17646 ms | place chosen @ 17842 ms | review open @ 23022 ms | review labels read @ 23050 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_ioo0sy_select"]')

--- further error 1 ---
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 6753 ms | category and specifications seeded @ 7916 ms | step 3 reached @ 10805 ms | specifications answered @ 11076 ms | step 6 open @ 16835 ms | tree served @ 17646 ms | place chosen @ 17842 ms | review open @ 23022 ms | review labels read @ 23050 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_ioo0sy_select"]')
Expected: "e2e_post_6_1_ioo0sy_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_ioo0sy_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_6_1_ioo0sy_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_6_1_ioo0sy selecte2e_post_6_1_ioo0sy_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_6_1_ioo0sy_select">e2e_post_6_1_ioo0sy_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_6_1_ioo0sy_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 6753 ms | category and specifications seeded @ 7916 ms | step 3 reached @ 10805 ms | specifications answered @ 11076 ms | step 6 open @ 16835 ms | tree served @ 17646 ms | place chosen @ 17842 ms | review open @ 23022 ms | review labels read @ 23050 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_ioo0sy_select"]')


  825 |       buyer.locator(`[data-key="${spec.select.attrKey}"]`),
  826 |       why("PW-30: the buyer preview never rendered the select option's label"),
> 827 |     ).toHaveText(`${spec.optionValues[0]} label`, { timeout: 20_000 });
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-desktop-1280`; this run carried 17 context file(s); of the same spec: none

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


  869 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
  870 |     // INC-682: the failed send is proven by the aborted poll above; the app's own retry clears the notice at once (INC-679), so its visibility is a race, not a behaviour.
> 871 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
      |                                                   ^
  872 |     // INC-679: the hook's successful retry clears the transport block before Back.
  873 |     await expect(page.getByTestId("post-next-unreachable")).toBeHidden();
  874 |     await toSpecs("back");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:871:51
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 17 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-11-vm4wsy: e2e_par_2lqind → e2e_chi_ktx82a
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-11-whhfwg: e2e_par_6pcmfz → e2e_chi_e61ma5
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

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

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×8
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```
