# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39441214257
- Commit: `17e867e2e28f169f11c2436dd4cbc4a4db316a7c`
- Attempt: 1
- Written (UTC): 2026-10-20T15:25:51.082Z
- Passed: 1925 · Skipped: 148 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): smoke, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12
- Sources without results: shard 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) — Error: expect(locator).toHaveValue(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 10` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) — Error: expect(locator).toHaveValue(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 10` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed

## Flaky bodies (DEC-078)

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "[account id]"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "[account id]"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1130 |       await page.locator('[data-testid="post-review-edit"][data-step="6"]').click();
  1131 |       await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
> 1132 |       await expect(page.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
       |                                                         ^
  1133 |       // The free plan allows one city: the seller changes the ad's place (INC-642).
  1134 |       await page.getByTestId("post-where-region").selectOption(second.region.id as string);
  1135 |       await page.getByTestId("post-where-city").selectOption(second.city.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1132:57
```

Context:

```text
          - listitem [ref=e279]:
            - generic [ref=e280]: About
          - listitem [ref=e281]:
            - generic [ref=e282]: Contact
      - navigation "Help" [ref=e283]:
        - heading "Help" [level=2] [ref=e284]
        - list [ref=e285]:
          - listitem [ref=e286]:
            - generic [ref=e287]: Safety
      - navigation "Legal" [ref=e288]:
        - heading "Legal" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - link "Terms" [ref=e292] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e293]:
            - link "Privacy" [ref=e294] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "[account id]"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "[account id]"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1296 |     await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
  1297 |     const city = page.getByTestId("post-where-city");
> 1298 |     await expect(city).toHaveValue(A.cityId, { timeout: 15000 });
       |                        ^
  1299 |
  1300 |     // Another region, no city chosen: Save changes is drawn closed.
  1301 |     await page.getByTestId("post-where-region").selectOption(second.region.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1298:24
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('listing-places-maps')
Expected pattern: /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-places-maps')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('listing-places-maps')
Expected pattern: /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-places-maps')


  1256 |     await toggle.click();
  1257 |     await expect(toggle).toHaveAttribute("aria-expanded", "false");
> 1258 |     await expect(page.getByTestId("listing-places-maps")).toHaveAttribute(
       |                                                           ^
  1259 |       "href",
  1260 |       /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/,
  1261 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1258:59
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: About
          - listitem [ref=e318]:
            - generic [ref=e319]: Contact
      - navigation "Help" [ref=e320]:
        - heading "Help" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Safety
      - navigation "Legal" [ref=e325]:
        - heading "Legal" [level=2] [ref=e326]
        - list [ref=e327]:
          - listitem [ref=e328]:
            - link "Terms" [ref=e329] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e330]:
            - link "Privacy" [ref=e331] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e333]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "[account id]"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "[account id]"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1130 |       await page.locator('[data-testid="post-review-edit"][data-step="6"]').click();
  1131 |       await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
> 1132 |       await expect(page.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
       |                                                         ^
  1133 |       // The free plan allows one city: the seller changes the ad's place (INC-642).
  1134 |       await page.getByTestId("post-where-region").selectOption(second.region.id as string);
  1135 |       await page.getByTestId("post-where-city").selectOption(second.city.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1132:57
```

Context:

```text
          - listitem [ref=e348]:
            - generic [ref=e349]: About
          - listitem [ref=e350]:
            - generic [ref=e351]: Contact
      - navigation "Help" [ref=e352]:
        - heading "Help" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: Safety
      - navigation "Legal" [ref=e357]:
        - heading "Legal" [level=2] [ref=e358]
        - list [ref=e359]:
          - listitem [ref=e360]:
            - link "Terms" [ref=e361] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e362]:
            - link "Privacy" [ref=e363] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e365]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "[account id]"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "[account id]"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1296 |     await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
  1297 |     const city = page.getByTestId("post-where-city");
> 1298 |     await expect(city).toHaveValue(A.cityId, { timeout: 15000 });
       |                        ^
  1299 |
  1300 |     // Another region, no city chosen: Save changes is drawn closed.
  1301 |     await page.getByTestId("post-where-region").selectOption(second.region.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1298:24
```

Context:

```text
          - listitem [ref=e337]:
            - generic [ref=e338]: About
          - listitem [ref=e339]:
            - generic [ref=e340]: Contact
      - navigation "Help" [ref=e341]:
        - heading "Help" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Safety
      - navigation "Legal" [ref=e346]:
        - heading "Legal" [level=2] [ref=e347]
        - list [ref=e348]:
          - listitem [ref=e349]:
            - link "Terms" [ref=e350] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e351]:
            - link "Privacy" [ref=e352] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e354]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (12 of 13 results files read, 13 of 13 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

105 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 12 | shard 3, shard 7, shard 9 |
| `digest mismatch` (quiet) | 11 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `listing not found` | 5 | shard 5, shard 6, shard 10, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 7 |
| `categories badHeader` (quiet) | 3 | shard 3, shard 8, shard 9 |
| `categories wrongFile` (quiet) | 3 | shard 3, shard 8, shard 9 |
| `preview_failed permission denied` (quiet) | 3 | shard 1, shard 7, shard 8 |
| `categories file too large` (quiet) | 2 | shard 3, shard 9 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 9 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 9 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 9 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 9 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 9 |
| `locations file too large` (quiet) | 2 | shard 3, shard 9 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 9 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 5, shard 11 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 9 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 9 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 9 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>wazcs: e<n>e_par_hi<n>tff → e<n>e_chi_luqyrw` (quiet) | 1 | shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-wfdjb<n>: e<n>e_par_dcbjvw → e<n>e_chi_su<n>old` (quiet) | 1 | shard 1 |
| `commit_failed step-up required: no verified factor` (quiet) | 1 | shard 8 |

Quiet (allowlisted): too many previews ×12 · digest mismatch ×11 · category-images: no GEMINI_API_KEY — fake mode ×5 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×3 · categories wrongFile ×3 · preview_failed permission denied ×3 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>wazcs: e<n>e_par_hi<n>tff → e<n>e_chi_luqyrw ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-wfdjb<n>: e<n>e_par_dcbjvw → e<n>e_chi_su<n>old ×1 · commit_failed step-up required: no verified factor ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 5, shard 6, shard 10, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-5 the specification form is generated, its options load on the first tap, and ×2 · PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) ×1 · PP-28 a refused edit keeps the editor open with its reason and the photo as it w ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 5, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: shard 1

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T14:42:34.345Z | 12.0 min |
| shard 2 | 2026-10-20T14:42:15.914Z | 14.3 min |
| shard 3 | 2026-10-20T14:41:57.545Z | 8.7 min |
| shard 4 | 2026-10-20T14:42:29.615Z | 9.7 min |
| shard 5 | 2026-10-20T14:42:29.152Z | 11.4 min |
| shard 6 | 2026-10-20T14:42:19.798Z | 9.1 min |
| shard 7 | 2026-10-20T14:41:57.485Z | 14.6 min |
| shard 8 | 2026-10-20T14:42:25.015Z | 16.6 min |
| shard 9 | 2026-10-20T14:41:59.596Z | 9.5 min |
| shard 10 | 2026-10-20T14:43:11.604Z | 10.8 min |
| shard 11 | 2026-10-20T14:41:48.605Z | 10.8 min |
| shard 12 | 2026-10-20T14:42:07.555Z | 7.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.7 min | smoke, shard 6, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.5 min | shard 4, shard 10 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 8 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 5, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.5 min | shard 3, shard 9 |
| `admin-screening.spec.ts` | 52 | 4.2 min | shard 2, shard 8 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 8 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 5, shard 11 |
| `auth-signout.spec.ts` | 56 | 4.1 min | smoke, shard 3, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 6, shard 12 |
| `admin-listings.spec.ts` | 62 | 3.6 min | shard 2, shard 8 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 5, shard 11 |
| `admin-users.spec.ts` | 28 | 3.5 min | shard 3, shard 9 |
| `photo-pipeline.spec.ts` | 66 | 3.3 min | shard 4, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 5, shard 11 |
| `admin-attributes-library.spec.ts` | 21 | 3.0 min | shard 7 |
| `my-listings-ad.spec.ts` | 36 | 2.9 min | shard 4, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 4, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 5, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 11 |
| `admin-categories-console.spec.ts` | 17 | 2.4 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 8 |
| `admin-attributes-links.spec.ts` | 17 | 2.1 min | shard 7 |
| `admin-categories-lifecycle.spec.ts` | 26 | 2.0 min | shard 8 |
| `import-security.spec.ts` | 36 | 1.9 min | shard 3, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 2, shard 9 |
| `admin-attributes-editor.spec.ts` | 18 | 1.7 min | shard 7 |
| `ad-page.spec.ts` | 34 | 1.6 min | shard 7 |
| `admin-translations-data.spec.ts` | 8 | 1.6 min | shard 2, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.3 min | shard 4, shard 10 |
| `admin-attributes-safety.spec.ts` | 9 | 1.3 min | shard 7 |
| `admin-attributes-import.spec.ts` | 20 | 1.1 min | shard 7 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 4, shard 10 |
| `legal-certify.spec.ts` | 26 | 0.9 min | shard 3, shard 9 |
| `legal-admin.spec.ts` | 28 | 0.9 min | shard 3, shard 9 |
| `admin-categories-home.spec.ts` | 5 | 0.9 min | shard 8 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 4, shard 10 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 8 |
| `admin-audit.spec.ts` | 7 | 0.7 min | shard 7 |
| `legal-doors.spec.ts` | 32 | 0.7 min | shard 4, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 4, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 5, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 6, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 3, shard 9 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 9 |
| `ad-page-doors.spec.ts` | 15 | 0.3 min | shard 7 |
| `admin-categories-images.spec.ts` | 1 | 0.2 min | shard 8 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 3, shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 3, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 3, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5, shard 11 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 5, shard 11 |
| `legal-pages.spec.ts` | 6 | 0.1 min | shard 4, shard 10 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `account-saved.spec.ts` | 2 | 0.1 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 2 | 0.0 min | shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 31.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 29.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 24.6 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 24.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 22.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-localproof: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 23 (pool 2, fresh 21)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 2, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-7: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-8: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 2, fresh 16)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-9: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-10: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-11: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39441214257-local-12: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## legal-certify.spec.ts › Legal certification › LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [render-leak] gotoReady(/admin/listings/[account id]) rendered “undefined” at listing-history-what < listing-history-entry-0 < listing-history (p): “Status: undefined → Waiting for review”
Skip to content
ethio.com
EN
Listings
All listings
Screening queue
Users
Roles & Permissions
Audit & Security
Locations
Places
Countries
Coverage
Catalog
Categories
Attributes
Images
Translations
Legal
Services
AI
Home
Admin
Listings
All listings
e2e certify f0upjb
All listings
e2e certify f0upjb
Waiting for review
Edit
Remove
View as seller
As buyers see it
e2e certify f0upjb

100 ETB

eseller_xnqzqhus

--- further error 1 ---
Error: [render-leak] gotoReady(/admin/listings/[account id]) rendered “undefined” at listing-history-what < listing-history-entry-0 < listing-history (p): “Status: undefined → Waiting for review”
Skip to content
ethio.com
EN
Listings
All listings
Screening queue
Users
Roles & Permissions
Audit & Security
Locations
Places
Countries
Coverage
Catalog
Categories
Attributes
Images
Translations
Legal
```

Context:

```text
          - listitem [ref=e370]:
            - generic [ref=e371]: About
          - listitem [ref=e372]:
            - generic [ref=e373]: Contact
      - navigation "Help" [ref=e374]:
        - heading "Help" [level=2] [ref=e375]
        - list [ref=e376]:
          - listitem [ref=e377]:
            - generic [ref=e378]: Safety
      - navigation "Legal" [ref=e379]:
        - heading "Legal" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - link "Terms" [ref=e383] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e384]:
            - link "Privacy" [ref=e385] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e387]: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-local-1-1-wfdjb4: e2e_par_dcbjvw → e2e_chi_su0old
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

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

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘   53 [mobile-360] › e2e/ad-page.spec.ts:1798:3 › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width (3.6s)
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node ([e-mail])
  ✓  162 [mobile-360] › e2e/admin-categories-console.spec.ts:827:3 › C2 categories console › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes (22.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node ([e-mail])
  ✓  163 [mobile-360] › e2e/admin-categories-console.spec.ts:1074:3 › C2 categories console › CT-43 the row's actions: Edit, a red Delete only when retired, the menu's verbs, a dialog that closes back to the table (26.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node ([e-mail])
  ✓  164 [mobile-360] › e2e/admin-categories-home.spec.ts:75:3 › Bundle 7 category doors › CT-38 a retired category with a child is not deleted until the child moves away (20.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node ([e-mail])
  ✓  165 [mobile-360] › e2e/admin-categories-home.spec.ts:112:3 › Bundle 7 category doors › CT-39 the badge sits on the home path, and Make primary moves it (15.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node ([e-mail])
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-local-1-1-wfdjb4: e2e_par_dcbjvw → e2e_chi_su0old
```
