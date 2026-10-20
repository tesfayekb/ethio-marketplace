# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39376272679
- Commit: `7bdeb9feda28705fed4b4c53a7a64b348644fc9d`
- Attempt: 1
- Written (UTC): 2026-10-20T06:56:31.123Z
- Passed: 2150 · Skipped: 154 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › the menu opens in place — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused

## Flaky bodies (DEC-078)

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

  3840 |         const paintedBox = await strip.getByTestId(`strip-category-${mainSlug}`).boundingBox();
  3841 |         if (!menuBox || !paintedBox) throw new Error(`FV-1 missing ${mainSlug} bounds`);
> 3842 |         expect(Math.abs(menuBox.y - paintedBox.y)).toBeLessThanOrEqual(1);
       |                                                    ^
  3843 |       }
  3844 |       await page.getByTestId("rail-menu-close").click();
  3845 |     }
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3842:52)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3851:3
```

Context:

```text
          - listitem [ref=e417]:
            - generic [ref=e418]: About
          - listitem [ref=e419]:
            - generic [ref=e420]: Contact
      - navigation "Help" [ref=e421]:
        - heading "Help" [level=2] [ref=e422]
        - list [ref=e423]:
          - listitem [ref=e424]:
            - generic [ref=e425]: Safety
      - navigation "Legal" [ref=e426]:
        - heading "Legal" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - link "Terms" [ref=e430] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e431]:
            - link "Privacy" [ref=e432] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e434]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34.84375
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34.84375

  3840 |         const paintedBox = await strip.getByTestId(`strip-category-${mainSlug}`).boundingBox();
  3841 |         if (!menuBox || !paintedBox) throw new Error(`FV-1 missing ${mainSlug} bounds`);
> 3842 |         expect(Math.abs(menuBox.y - paintedBox.y)).toBeLessThanOrEqual(1);
       |                                                    ^
  3843 |       }
  3844 |       await page.getByTestId("rail-menu-close").click();
  3845 |     }
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3842:52)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3847:3
```

Context:

```text
          - listitem [ref=e417]:
            - generic [ref=e418]: About
          - listitem [ref=e419]:
            - generic [ref=e420]: Contact
      - navigation "Help" [ref=e421]:
        - heading "Help" [level=2] [ref=e422]
        - list [ref=e423]:
          - listitem [ref=e424]:
            - generic [ref=e425]: Safety
      - navigation "Legal" [ref=e426]:
        - heading "Legal" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - link "Terms" [ref=e430] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e431]:
            - link "Privacy" [ref=e432] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e434]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › mobile chrome › the menu opens in place

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2.046875
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2.046875

  1268 |     if (!rowBox || !stripBox) throw new Error("Missing aligned category rows");
  1269 |     expect(Math.abs(rowBox.y - stripBox.y)).toBeLessThanOrEqual(1);
> 1270 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
       |                                                       ^
  1271 |     expect(rowBox.height).toBeGreaterThanOrEqual(31);
  1272 |     expect(rowBox.height).toBeLessThanOrEqual(41);
  1273 |     const iconBox = await row.locator("svg:nth-of-type(1)").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1270:55
```

Context:

```text
          - listitem [ref=e423]:
            - generic [ref=e424]: About
          - listitem [ref=e425]:
            - generic [ref=e426]: Contact
      - navigation "Help" [ref=e427]:
        - heading "Help" [level=2] [ref=e428]
        - list [ref=e429]:
          - listitem [ref=e430]:
            - generic [ref=e431]: Safety
      - navigation "Legal" [ref=e432]:
        - heading "Legal" [level=2] [ref=e433]
        - list [ref=e434]:
          - listitem [ref=e435]:
            - link "Terms" [ref=e436] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e437]:
            - link "Privacy" [ref=e438] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e440]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 2: e2e-cat-4-0-c7ftwy@16, e2e-cat-1-0-jfg7c1@17
[ct18-dump] now: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 1: e2e-cat-1-0-jfg7c1@17
[ct18-dump] preview: 16 changed row(s) in its answer
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
[ct18-dump] (6 more changed rows not printed)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 2: e2e-cat-4-0-c7ftwy@16, e2e-cat-1-0-jfg7c1@17
[ct18-dump] now: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 · scratch 1: e2e-cat-1-0-jfg7c1@17
[ct18-dump] preview: 16 changed row(s) in its answer
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
                - link:
                  - /url: /privacy
                  - text: Privacy
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

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>zxm: e<n>e_par_nkc<n>u → e<n>e_chi_lp<n>wsa` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-h<n>wmmz: e<n>e_par_nod<n>zk → e<n>e_chi_liw<n>u` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>zxm: e<n>e_par_nkc<n>u → e<n>e_chi_lp<n>wsa ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-h<n>wmmz: e<n>e_par_nod<n>zk → e<n>e_chi_liw<n>u ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · location row is present on Marketplace and absent on Account ×1

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
| smoke | 2026-10-20T06:08:32.917Z | 23.3 min |
| email | 2026-10-20T06:08:25.940Z | 0.2 min |
| shard 1 | 2026-10-20T06:08:27.516Z | 47.8 min |
| shard 2 | 2026-10-20T06:08:25.739Z | 42.4 min |
| shard 3 | 2026-10-20T06:08:32.174Z | 36.9 min |
| shard 4 | 2026-10-20T06:08:32.235Z | 47.2 min |
| shard 5 | 2026-10-20T06:08:28.337Z | 46.3 min |
| shard 6 | 2026-10-20T06:08:30.750Z | 39.3 min |
| changed | 2026-10-20T06:08:27.514Z | 5.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 29.2 min | shard 1, shard 4 |
| `shell.spec.ts` | 424 | 27.3 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 26.8 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 22.5 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 19.6 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 18.6 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 17.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 15.8 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.0 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 14.5 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 14.3 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 14.1 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 13.6 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 12.9 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 12.9 min | shard 2, shard 5 |
| `legal-admin.spec.ts` | 56 | 12.6 min | shard 2, shard 5, changed |
| `admin-screening.spec.ts` | 52 | 12.0 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.2 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 26 | 9.1 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 9.0 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 16 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.4 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.5 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 7.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 6.8 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.6 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.0 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.3 min | shard 1, shard 4 |
| `legal-accept.spec.ts` | 16 | 4.3 min | shard 2, shard 5, changed |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.8 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.0 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 1.9 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.6 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 14 | 0.8 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.3 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 71.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 70.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 60.2 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 57.3 s |
| `legal-admin.spec.ts` › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail | mobile-360 | 56.7 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 52.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 50.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 50.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 49.9 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 49.8 s |
| `legal-admin.spec.ts` › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail | desktop-1280 | 48.0 s |
| `legal-admin.spec.ts` › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail | mobile-360 | 47.3 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 47.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 47.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 46.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39376272679-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39376272679-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39376272679-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39376272679-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39376272679-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39376272679-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39376272679-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39376272679-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39376272679-changed
```

## legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"

  558 |     const csv = await readFile(path, "utf8");
  559 |     const lines = csv.split("\n").filter((line) => line.trim() !== "");
> 560 |     expect(lines[0]).toBe(
      |                      ^
  561 |       "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
  562 |     );
  563 |     expect(lines.length).toBe(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:560:22
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"

  558 |     const csv = await readFile(path, "utf8");
  559 |     const lines = csv.split("\n").filter((line) => line.trim() !== "");
> 560 |     expect(lines[0]).toBe(
      |                      ^
  561 |       "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
  562 |     );
  563 |     expect(lines.length).toBe(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:560:22
```

Context:

```text
          - listitem [ref=e374]:
            - generic [ref=e375]: About
          - listitem [ref=e376]:
            - generic [ref=e377]: Contact
      - navigation "Help" [ref=e378]:
        - heading "Help" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: Safety
      - navigation "Legal" [ref=e383]:
        - heading "Legal" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - link "Terms" [ref=e387] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e388]:
            - link "Privacy" [ref=e389] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e391]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"

  558 |     const csv = await readFile(path, "utf8");
  559 |     const lines = csv.split("\n").filter((line) => line.trim() !== "");
> 560 |     expect(lines[0]).toBe(
      |                      ^
  561 |       "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
  562 |     );
  563 |     expect(lines.length).toBe(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:560:22
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"

  558 |     const csv = await readFile(path, "utf8");
  559 |     const lines = csv.split("\n").filter((line) => line.trim() !== "");
> 560 |     expect(lines[0]).toBe(
      |                      ^
  561 |       "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
  562 |     );
  563 |     expect(lines.length).toBe(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:560:22
```

Context:

```text
          - listitem [ref=e374]:
            - generic [ref=e375]: About
          - listitem [ref=e376]:
            - generic [ref=e377]: Contact
      - navigation "Help" [ref=e378]:
        - heading "Help" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: Safety
      - navigation "Legal" [ref=e383]:
        - heading "Legal" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - link "Terms" [ref=e387] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e388]:
            - link "Privacy" [ref=e389] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e391]: © 2026 ethio.com — All rights reserved.
```
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

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
