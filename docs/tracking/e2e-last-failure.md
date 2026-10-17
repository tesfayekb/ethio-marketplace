# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38998789278 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38998789278
- Commit: `732b933d1d262c1dfae50b66cd617e7996e94547`
- Attempt: 1
- Written (UTC): 2026-10-17T04:23:02.886Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 6
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids — Error: expect(locator).toContainText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-35 removed held option is released; a required strict question asks again — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-locations.spec.ts › L2a locations console › LT-15 an imported place name is in the name table after commit and gone after undo — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('location-import-counts')
Expected substring: "3"
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 30000ms
  - waiting for getByTestId('location-import-counts')

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('location-import-counts')
Expected substring: "3"
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 30000ms
  - waiting for getByTestId('location-import-counts')


  663 |       await uploadLocations(page, creates);
  664 |       await page.getByTestId("location-import-preview").click();
> 665 |       await expect(page.getByTestId("location-import-counts")).toContainText("3", {
      |                                                                ^
  666 |         timeout: 30000,
  667 |       });
  668 |       await expect(page.getByTestId("location-import-refusals")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:665:64
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 503 (Service Unavailable)
[client-error] HTTP 503 POST http://127.0.0.1:4173/api/admin/locations/import ({"error":"upstream unavailable"})
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import into Ethiopia" [ref=e2]:
    - heading "Import into Ethiopia" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import into Ethiopia
      - paragraph [ref=e6]: "A file is written whole or not at all: one refused row stops the entire import."
      - paragraph [ref=e7]: Start from a download so the columns match. Read-only columns are never applied.
      - generic [ref=e9]:
        - generic [ref=e10]: Places file
        - button "Places file" [ref=e11]
        - generic [ref=e12]:
          - button "Choose Places file…" [ref=e13] [cursor=pointer]
          - generic [ref=e14]: locations.csv
      - button "Preview changes" [ref=e15] [cursor=pointer]
      - alert [ref=e16]: The import could not be completed.
      - button "Discard" [ref=e18] [cursor=pointer]
    - button "Close" [ref=e19] [cursor=pointer]:
      - img [ref=e20]
      - generic [ref=e23]: Close
```
```

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/upload/photo ({"error":"x"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/upload/photo ({"error":"x"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/upload/photo ({"error":"x"})
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-10-a-refusal-is-final-and-never-retried-a-5xx-is-retried-once-then-handed-over-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-55ced-tried-once-then-handed-over-mobile-360`; this run carried 4 context file(s); of the same spec: none

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-35 removed held option is released; a required strict question asks again

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Array [
    Object {
-     "attr_key": "e2e_post_3_1_uu8vjx_select",
-     "reason": "required",
+     "field": "door",
+     "reason": "doorError",
    },
  ]

  173 |     expect
  174 |       .soft(required["refusals"], JSON.stringify(required))
> 175 |       .toEqual([{ attr_key: specs.select.attrKey, reason: "required" }]);
      |        ^
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

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listings-move-dialog')
Expected: 0
Received: 1

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for getByTestId('listings-move-dialog')
    8 × locator resolved to 1 element
      - unexpected value "1"


  947 |     if (note !== undefined) await dialog.getByTestId("listings-move-note").fill(note);
  948 |     await dialog.getByTestId("listings-move-confirm").click();
> 949 |     await expect(dialog).toHaveCount(0, { timeout: 20000 });
      |                          ^
  950 |   }
  951 |
  952 |   const moveAudits = async (listingId: string, action: string) =>
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_move_listing ({"code":"P0001","details":null,"hint":null,"message":"listing not found"})
```

Context:

```text
          - group "Reason" [ref=e10]:
            - button "Removed in error" [pressed] [ref=e11] [cursor=pointer]:
              - img [ref=e12]
              - generic [ref=e14]: Removed in error
            - button "Appeal accepted" [ref=e15] [cursor=pointer]:
              - generic [ref=e16]: Appeal accepted
            - button "Other" [ref=e17] [cursor=pointer]:
              - generic [ref=e18]: Other
        - generic [ref=e19]:
          - generic [ref=e20]: Note for the seller
          - textbox "Note for the seller" [ref=e21]
          - paragraph [ref=e22]: Required when the reason is Other; at most 500 characters.
        - alert [ref=e23]: This listing no longer exists.
        - generic [ref=e24]:
          - button "Cancel" [ref=e25] [cursor=pointer]
          - button "Restore" [ref=e26] [cursor=pointer]
    - button "Close" [ref=e27] [cursor=pointer]:
      - img [ref=e28]
      - generic [ref=e31]: Close
```
```

### admin-locations.spec.ts › L2a locations console › LT-15 an imported place name is in the name table after commit and gone after undo

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')


   at helpers/locations.ts:130

  128 | export async function selectMarket(page: Page, code: string) {
  129 |   const picker = page.getByTestId("location-country-filter");
> 130 |   await expect(picker).toBeVisible({ timeout: 20000 });
      |                        ^
  131 |   await picker.selectOption(code);
  132 | }
```

Context:

```text
          - listitem [ref=e1006]:
            - generic [ref=e1007]: About
          - listitem [ref=e1008]:
            - generic [ref=e1009]: How it works
      - navigation "Help" [ref=e1010]:
        - heading "Help" [level=2] [ref=e1011]
        - list [ref=e1012]:
          - listitem [ref=e1013]:
            - generic [ref=e1014]: Safety
          - listitem [ref=e1015]:
            - generic [ref=e1016]: Contact
      - navigation "Legal" [ref=e1017]:
        - heading "Legal" [level=2] [ref=e1018]
        - list [ref=e1019]:
          - listitem [ref=e1020]:
            - generic [ref=e1021]: Terms
          - listitem [ref=e1022]:
            - generic [ref=e1023]: Privacy
    - paragraph [ref=e1025]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--desktop-1280`; this run carried 4 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

113 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 3, shard 6 |
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
| `auth upstream unavailable (<n>)` | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>l<n>: e<n>e_par_whaj<n> → e<n>e_chi_z<n>otez` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rlf<n>d<n>: e<n>e_par_<n>t<n>a → e<n>e_chi_<n>tblrm` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>l<n>: e<n>e_par_whaj<n> → e<n>e_chi_z<n>otez ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rlf<n>d<n>: e<n>e_par_<n>t<n>a → e<n>e_chi_<n>tblrm ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-27 edit_listing counts against the revise dial ×1 · PR-35 removed held option is released; a required strict question asks again ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AL-8 Restore: not by the owner, not without a second factor; a severe removal by ×1 · LT-7 import round trip: a three-row file previews, commits, exports, deletes and ×1

```text
[WebServer] [ssr-error] /api/admin/locations/import auth upstream unavailable (504)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T03:42:27.403Z | 15.9 min |
| email | 2026-10-17T03:42:27.128Z | 0.2 min |
| shard 1 | 2026-10-17T03:42:27.080Z | 38.1 min |
| shard 2 | 2026-10-17T03:42:29.853Z | 35.6 min |
| shard 3 | 2026-10-17T03:42:35.531Z | 34.6 min |
| shard 4 | 2026-10-17T03:42:33.370Z | 34.0 min |
| shard 5 | 2026-10-17T03:42:32.876Z | 40.2 min |
| shard 6 | 2026-10-17T03:42:25.380Z | 31.0 min |
| changed | 2026-10-17T03:42:31.862Z | 0.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 25.4 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 24.5 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 22.2 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.4 min | smoke, shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 17.8 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.0 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 16.0 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 15.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.9 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 13.3 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.6 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 64 | 12.3 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 11.0 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 10.9 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.2 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 9.2 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.8 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 7.8 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.7 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.5 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.5 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.3 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 7.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 5.7 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.0 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.3 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 3.0 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.6 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 2.0 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 3, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.3 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `ad-page-routes.spec.ts` | 8 | 0.0 min | shard 1, shard 4, changed |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 106.2 s |
| `admin-listings.spec.ts` › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only | mobile-360 | 88.3 s |
| `posting-routes-catalog.spec.ts` › PR-35 removed held option is released; a required strict question asks again | mobile-360 | 83.0 s |
| `photo-pipeline.spec.ts` › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over | mobile-360 | 82.9 s |
| `admin-listings.spec.ts` › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review | desktop-1280 | 82.1 s |
| `admin-locations.spec.ts` › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids | mobile-360 | 74.3 s |
| `my-listings-ad.spec.ts` › MLA-16 a closed ad's Edit offers Photos coming soon; the tick saves and clears through the door (INC-666) | desktop-1280 | 70.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 67.7 s |
| `admin-locations.spec.ts` › LT-15 an imported place name is in the name table after commit and gone after undo | desktop-1280 | 62.4 s |
| `post-wizard-bundle2.spec.ts` › PW-113 directions are saved, survive a pin move, and refuse a phone number | mobile-360 | 61.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 59.8 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 58.6 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | desktop-1280 | 58.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 58.5 s |
| `posting-routes.spec.ts` › PR-3 a complete draft publishes to screening and never to active | desktop-1280 | 57.6 s |
