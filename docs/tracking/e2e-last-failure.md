# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39450658128 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39450658128
- Commit: `1a5b21bd789cf8edbd4ac303dcedd65e83d39304`
- Attempt: 1
- Written (UTC): 2026-10-20T16:29:23.571Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 3
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › SHELL — the phone page never widens (bundle 21 turn 10) › OVW-2 a 2000-px child never widens the page, and the sub-band still sticks — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1}
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band — Error: AP-37 seller at 96 ms: current description
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Extwmadxvxvwhlslhxiacnoeiloydvivekdlkvjxvlmlheay","furthestElement":"breadcrumb-ad","crumbHeight":20}

## Flaky bodies (DEC-078)

### shell.spec.ts › SHELL — the phone page never widens (bundle 21 turn 10) › OVW-2 a 2000-px child never widens the page, and the sub-band still sticks

- Source: `smoke`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  4199 |       expect(before.innerWidth, JSON.stringify(before)).toBe(390);
  4200 |       expect(before.scrollWidth, JSON.stringify(before)).toBeLessThanOrEqual(390);
> 4201 |       expect(Math.abs(before.bottomBar - 390), JSON.stringify(before)).toBeLessThanOrEqual(1);
       |                                                                        ^
  4202 |       await page.evaluate(() => window.scrollTo(0, 600));
  4203 |       await expect
  4204 |         .poll(() =>
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:4201:72
```

Context:

```text
          - listitem [ref=e108]:
            - generic [ref=e109]: About
          - listitem [ref=e110]:
            - generic [ref=e111]: Contact
      - navigation "Help" [ref=e112]:
        - heading "Help" [level=2] [ref=e113]
        - list [ref=e114]:
          - listitem [ref=e115]:
            - generic [ref=e116]: Safety
      - navigation "Legal" [ref=e117]:
        - heading "Legal" [level=2] [ref=e118]
        - list [ref=e119]:
          - listitem [ref=e120]:
            - link "Terms" [ref=e121] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e122]:
            - link "Privacy" [ref=e123] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e125]: © 2026 ethio.com — All rights reserved.
```
```

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AP-37 seller at 96 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]
--- further error 1 ---
Error: AP-37 seller at 96 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]

  1038 |           sample.current,
  1039 |           `AP-37 ${target} at ${sample.elapsed} ms: current ${sample.current.join(",") || "none"}`,
> 1040 |         ).toEqual([target]);
       |           ^
  1041 |       }
  1042 |     };
  1043 |     const sellerItem = bar.locator('[data-target="seller"]');
    at sampleScroll (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1040:11)
```

Context:

```text
          - listitem [ref=e340]:
            - generic [ref=e341]: About
          - listitem [ref=e342]:
            - generic [ref=e343]: Contact
      - navigation "Help" [ref=e344]:
        - heading "Help" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - generic [ref=e348]: Safety
      - navigation "Legal" [ref=e349]:
        - heading "Legal" [level=2] [ref=e350]
        - list [ref=e351]:
          - listitem [ref=e352]:
            - link "Terms" [ref=e353] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e354]:
            - link "Privacy" [ref=e355] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e357]: © 2026 ethio.com — All rights reserved.
```
```

### ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Extwmadxvxvwhlslhxiacnoeiloydvivekdlkvjxvlmlheay","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Extwmadxvxvwhlslhxiacnoeiloydvivekdlkvjxvlmlheay","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context:

```text
          - listitem [ref=e319]:
            - generic [ref=e320]: About
          - listitem [ref=e321]:
            - generic [ref=e322]: Contact
      - navigation "Help" [ref=e323]:
        - heading "Help" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Safety
      - navigation "Legal" [ref=e328]:
        - heading "Legal" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - link "Terms" [ref=e332] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e333]:
            - link "Privacy" [ref=e334] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e336]: © 2026 ethio.com — All rights reserved.
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>uwopl: e<n>e_par_xs<n> → e<n>e_chi_yws<n>hq` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ivifq<n>: e<n>e_par_<n>dl<n>e → e<n>e_chi_dds<n>zn` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>uwopl: e<n>e_par_xs<n> → e<n>e_chi_yws<n>hq ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ivifq<n>: e<n>e_par_<n>dl<n>e → e<n>e_chi_dds<n>zn ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · language toggle renders Amharic (Ge'ez path) ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1

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
| smoke | 2026-10-20T15:43:19.576Z | 21.2 min |
| email | 2026-10-20T15:43:10.910Z | 0.3 min |
| shard 1 | 2026-10-20T15:42:49.642Z | 46.2 min |
| shard 2 | 2026-10-20T15:44:58.637Z | 44.0 min |
| shard 3 | 2026-10-20T15:42:37.814Z | 40.6 min |
| shard 4 | 2026-10-20T15:42:26.704Z | 43.8 min |
| shard 5 | 2026-10-20T15:43:59.161Z | 44.7 min |
| shard 6 | 2026-10-20T15:44:17.304Z | 37.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 27.1 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 25.6 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 68 | 24.0 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 23.5 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 21.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 19.4 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 18.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 17.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.3 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 15.0 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 14.6 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.2 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 13.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.0 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.1 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.5 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 11.3 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.7 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 8.6 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 8.5 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.3 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.2 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 8.1 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 26 | 8.0 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.9 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 7.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.2 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.2 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 6.8 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.8 min | shard 1, shard 4 |
| `legal-doors.spec.ts` | 32 | 6.8 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.0 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 28 | 5.0 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 18 | 4.2 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.4 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 6 |
| `legal-accept.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 1.1 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 1.0 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 54.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 52.4 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 50.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 49.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 49.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 49.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 48.5 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 45.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 45.5 s |
| `post-wizard-pricing.spec.ts` › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) | desktop-1280 | 45.5 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 44.3 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 44.1 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | mobile-360 | 44.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 43.8 s |
| `post-wizard-pricing.spec.ts` › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) | mobile-360 | 43.8 s |
