# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39429341330
- Commit: `643b49b6b89985e1db326ec638d2218b98762f52`
- Attempt: 1
- Written (UTC): 2026-10-20T13:38:11.396Z
- Passed: 2111 · Skipped: 154 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 7
- Post-test errors (DEC-059, non-gating): smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · legal-certify.spec.ts › Legal certification › LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so — Error: [render-leak] gotoReady(/admin/listings/[account id]) rendered “undefined”
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) — Error: expect(locator).toHaveValue(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 10` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) — Error: expect(locator).toHaveValue(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 10` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines

- Source: `shard 1`
- Project: `mobile-360`

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
          - listitem [ref=e262]:
            - generic [ref=e263]: About
          - listitem [ref=e264]:
            - generic [ref=e265]: Contact
      - navigation "Help" [ref=e266]:
        - heading "Help" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: Safety
      - navigation "Legal" [ref=e271]:
        - heading "Legal" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - link "Terms" [ref=e275] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e276]:
            - link "Privacy" [ref=e277] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e279]: © 2026 ethio.com — All rights reserved.
```
```

### legal-certify.spec.ts › Legal certification › LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [render-leak] gotoReady(/admin/listings/[account id]) rendered “undefined”
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
e2e certify yjg5nb
All listings
e2e certify yjg5nb
Waiting for review
Edit
Remove
View as seller
As buyers see it
e2e certify yjg5nb

100 ETB

eseller_ppqzlwyo

--- further error 1 ---
Error: [render-leak] gotoReady(/admin/listings/[account id]) rendered “undefined”
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

None: no results file lists one and no log's summary names one (13 of 13 results files read, 13 of 13 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

120 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 21 | shard 1, shard 3, shard 7, shard 9 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `listing not found` | 6 | shard 5, shard 6, shard 11 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 7 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 7, shard 8 |
| `categories file too large` (quiet) | 2 | shard 3, shard 9 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 9 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>qs<n>n: e<n>e_par_a<n>yg<n>p → e<n>e_chi_uvh<n>ts` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-v<n>c<n>e<n>: e<n>e_par_skaz<n> → e<n>e_chi_txfzvr` (quiet) | 1 | shard 7 |

Quiet (allowlisted): too many previews ×21 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>qs<n>n: e<n>e_par_a<n>yg<n>p → e<n>e_chi_uvh<n>ts ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-v<n>c<n>e<n>: e<n>e_par_skaz<n> → e<n>e_chi_txfzvr ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-5 the specification form is generated, its options load on the first tap, and ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1

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

Results read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T13:21:38.053Z | 11.9 min |
| shard 1 | 2026-10-20T13:21:17.972Z | 14.6 min |
| shard 2 | 2026-10-20T13:21:43.159Z | 14.9 min |
| shard 3 | 2026-10-20T13:21:24.312Z | 9.1 min |
| shard 4 | 2026-10-20T13:21:13.358Z | 8.0 min |
| shard 5 | 2026-10-20T13:21:26.013Z | 9.9 min |
| shard 6 | 2026-10-20T13:21:51.349Z | 8.9 min |
| shard 7 | 2026-10-20T13:21:38.249Z | 14.6 min |
| shard 8 | 2026-10-20T13:21:41.595Z | 16.1 min |
| shard 9 | 2026-10-20T13:21:56.351Z | 11.0 min |
| shard 10 | 2026-10-20T13:21:46.801Z | 11.1 min |
| shard 11 | 2026-10-20T13:21:23.034Z | 10.9 min |
| shard 12 | 2026-10-20T13:21:53.129Z | 6.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.1 min | smoke, shard 6, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 7 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 4, shard 10 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 3, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 8 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 2, shard 8 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 2, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 7 |
| `auth-signout.spec.ts` | 56 | 4.2 min | smoke, shard 3, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.1 min | shard 5, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 1, shard 7 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 6, shard 12 |
| `post-wizard-place.spec.ts` | 38 | 3.9 min | shard 5, shard 11 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 1, shard 8 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 5, shard 11 |
| `admin-listings.spec.ts` | 62 | 3.4 min | shard 2, shard 8 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 7 |
| `photo-pipeline.spec.ts` | 66 | 3.1 min | shard 4, shard 10 |
| `ad-page.spec.ts` | 68 | 2.9 min | shard 1, shard 7 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 5, shard 11 |
| `my-listings-ad.spec.ts` | 36 | 2.7 min | shard 4, shard 10 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 7 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 4, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 6, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 2, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 5, shard 11 |
| `import-security.spec.ts` | 36 | 2.2 min | shard 3, shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 1, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 8 |
| `admin-translations-data.spec.ts` | 8 | 1.6 min | shard 2, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 1.3 min | shard 4, shard 10 |
| `legal-certify.spec.ts` | 26 | 1.1 min | shard 3, shard 9 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `legal-admin.spec.ts` | 28 | 1.1 min | shard 3, shard 9 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 8 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 4, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 5, shard 11 |
| `legal-doors.spec.ts` | 32 | 0.6 min | shard 4, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 5, shard 11 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 4, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 5, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 6, shard 12 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 9 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 3, shard 9 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 9 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 3, shard 9 |
| `layout.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 5, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `legal-pages.spec.ts` | 6 | 0.1 min | shard 4, shard 10 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 26.0 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 24.9 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 24.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 23.5 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 22.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-localproof: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 2, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 23 (pool 2, fresh 21)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 2, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-7: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-8: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 2, fresh 16)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-9: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-10: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-11: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39429341330-local-12: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## legal-certify.spec.ts › Legal certification › LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: [render-leak] gotoReady(/admin/listings/[account id]) rendered “undefined”
Skip to content
ethio.com
M
A
R
K
E
T
P
L
A
C
E
Search listings
English
e2e+39429341330-local-9-7391-2-le9evv
Marketplace
Sign out
Marketplace
Seller Centre
Account
Home
Admin
Listings
All listings
e2e certify fbe68m
All listings
e2e certify fbe68m
Waiting for review
Edit
Remove
View as seller
As buyers see it
e2e certify fbe68m

100 ETB

eseller_qqqvqoqf

--- further error 1 ---
Error: [render-leak] gotoReady(/admin/listings/[account id]) rendered “undefined”
Skip to content
ethio.com
M
A
R
K
E
T
P
L
A
C
E
Search listings
English
e2e+39429341330-local-9-7391-2-le9evv
Marketplace
Sign out
Marketplace
```

Context:

```text
          - listitem [ref=e424]:
            - generic [ref=e425]: About
          - listitem [ref=e426]:
            - generic [ref=e427]: Contact
      - navigation "Help" [ref=e428]:
        - heading "Help" [level=2] [ref=e429]
        - list [ref=e430]:
          - listitem [ref=e431]:
            - generic [ref=e432]: Safety
      - navigation "Legal" [ref=e433]:
        - heading "Legal" [level=2] [ref=e434]
        - list [ref=e435]:
          - listitem [ref=e436]:
            - link "Terms" [ref=e437] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e438]:
            - link "Privacy" [ref=e439] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e441]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 9

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

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).
