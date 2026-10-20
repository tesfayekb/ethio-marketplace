# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39411681777
- Commit: `78b96e259c820ab45786cb34a34d8b7b69da4792`
- Attempt: 1
- Written (UTC): 2026-10-20T11:19:31.825Z
- Passed: 2081 · Skipped: 154 · Failed: 30
- Gating failures: 30 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 8
- Post-test errors (DEC-059, non-gating): smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-import.spec.ts › C3 attributes console › AT-70 a direct rank held twice in the end state is refused as rankClash — Error: {"error":"tooManyRequests"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-import.spec.ts › C3 attributes console › AT-71 removing an option value still in use is refused as optionInUse — Error: {"error":"tooManyRequests"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · admin-attributes-import.spec.ts › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies — Error: {"error":"tooManyRequests"}
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

### admin-attributes-import.spec.ts › C3 attributes console › AT-70 a direct rank held twice in the end state is refused as rankClash

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429
--- further error 1 ---
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429

  1558 |       const clash = `${LINK_HEADER}\r\n${linkRow(keys[1], "3")}\r\n`;
  1559 |       const preview = await importPost(page, token, { mode: "preview", links: clash });
> 1560 |       expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
       |                                                               ^
  1561 |       const refused = refusalsOf(preview.payload);
  1562 |       expect(refused, `AT-70 (a) preview: ${JSON.stringify(preview.payload)}`).toHaveLength(1);
  1563 |       expect(refused[0]).toMatchObject({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1560:63
```

Context:

```text
          - listitem [ref=e1337]:
            - generic [ref=e1338]: About
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Contact
      - navigation "Help" [ref=e1341]:
        - heading "Help" [level=2] [ref=e1342]
        - list [ref=e1343]:
          - listitem [ref=e1344]:
            - generic [ref=e1345]: Safety
      - navigation "Legal" [ref=e1346]:
        - heading "Legal" [level=2] [ref=e1347]
        - list [ref=e1348]:
          - listitem [ref=e1349]:
            - link "Terms" [ref=e1350] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1351]:
            - link "Privacy" [ref=e1352] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1354]: © 2026 ethio.com — All rights reserved.
```
```

### admin-attributes-import.spec.ts › C3 attributes console › AT-71 removing an option value still in use is refused as optionInUse

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429
--- further error 1 ---
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429

  1696 |         `${slug},${slug},${keyD},false,false,,${slug},,,${keyP}=a\r\n`;
  1697 |       const b = await importPost(page, token, { mode: "preview", definitions: dropB, links });
> 1698 |       expect(b.status, JSON.stringify(b.payload)).toBe(200);
       |                                                   ^
  1699 |       expect(refusalsOf(b.payload), `AT-71 (b) refused: ${JSON.stringify(b.payload)}`).toHaveLength(
  1700 |         0,
  1701 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1698:51
```

Context:

```text
          - listitem [ref=e1337]:
            - generic [ref=e1338]: About
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Contact
      - navigation "Help" [ref=e1341]:
        - heading "Help" [level=2] [ref=e1342]
        - list [ref=e1343]:
          - listitem [ref=e1344]:
            - generic [ref=e1345]: Safety
      - navigation "Legal" [ref=e1346]:
        - heading "Legal" [level=2] [ref=e1347]
        - list [ref=e1348]:
          - listitem [ref=e1349]:
            - link "Terms" [ref=e1350] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1351]:
            - link "Privacy" [ref=e1352] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1354]: © 2026 ethio.com — All rights reserved.
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

### admin-attributes-import.spec.ts › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429
--- further error 1 ---
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429

  1464 |
  1465 |       const preview = await importPost(page, token, { mode: "preview", links });
> 1466 |       expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
       |                                                               ^
  1467 |       expect((preview.payload["counts"] as Record<string, number>).changes).toBe(1);
  1468 |       const ignored = (preview.payload["ignored"] ?? []) as { row: number; column: string }[];
  1469 |       expect(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1466:63
```

Context:

```text
          - listitem [ref=e1268]:
            - generic [ref=e1269]: About
          - listitem [ref=e1270]:
            - generic [ref=e1271]: Contact
      - navigation "Help" [ref=e1272]:
        - heading "Help" [level=2] [ref=e1273]
        - list [ref=e1274]:
          - listitem [ref=e1275]:
            - generic [ref=e1276]: Safety
      - navigation "Legal" [ref=e1277]:
        - heading "Legal" [level=2] [ref=e1278]
        - list [ref=e1279]:
          - listitem [ref=e1280]:
            - link "Terms" [ref=e1281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1282]:
            - link "Privacy" [ref=e1283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1285]: © 2026 ethio.com — All rights reserved.
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

116 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 15 | shard 1, shard 3, shard 7, shard 9 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `listing not found` | 8 | shard 5, shard 6, shard 11 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-ddr<n>wt: e<n>e_par_<n>h<n>v<n> → e<n>e_chi_<n>fsx<n>n` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-snr<n>j<n>: e<n>e_par_jkk<n> → e<n>e_chi_<n>yhcvw` (quiet) | 1 | shard 7 |

Quiet (allowlisted): too many previews ×15 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-ddr<n>wt: e<n>e_par_<n>h<n>v<n> → e<n>e_chi_<n>fsx<n>n ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-snr<n>j<n>: e<n>e_par_jkk<n> → e<n>e_chi_<n>yhcvw ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2

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
| smoke | 2026-10-20T11:00:54.143Z | 10.6 min |
| shard 1 | 2026-10-20T11:01:06.515Z | 18.0 min |
| shard 2 | 2026-10-20T11:01:14.824Z | 15.1 min |
| shard 3 | 2026-10-20T11:00:52.891Z | 8.4 min |
| shard 4 | 2026-10-20T11:00:59.303Z | 15.0 min |
| shard 5 | 2026-10-20T11:01:13.172Z | 11.2 min |
| shard 6 | 2026-10-20T11:01:08.551Z | 8.6 min |
| shard 7 | 2026-10-20T11:01:25.366Z | 16.9 min |
| shard 8 | 2026-10-20T11:00:58.961Z | 14.7 min |
| shard 9 | 2026-10-20T11:00:56.616Z | 9.6 min |
| shard 10 | 2026-10-20T11:00:46.813Z | 15.6 min |
| shard 11 | 2026-10-20T11:01:11.254Z | 11.6 min |
| shard 12 | 2026-10-20T11:01:16.929Z | 6.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 17.4 min | smoke, shard 6, shard 12 |
| `photo-pipeline.spec.ts` | 66 | 16.2 min | shard 4, shard 10 |
| `ad-page.spec.ts` | 68 | 5.9 min | shard 1, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.8 min | shard 1, shard 7 |
| `feed-screens.spec.ts` | 36 | 5.3 min | shard 3, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 5.1 min | shard 2, shard 8 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 8 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.5 min | shard 4, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 1, shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 5, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 1, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 5, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.1 min | shard 2, shard 8 |
| `admin-screening.spec.ts` | 52 | 4.0 min | shard 2, shard 8 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 6, shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 3.7 min | shard 5, shard 11 |
| `auth-signout.spec.ts` | 56 | 3.7 min | smoke, shard 3, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 1, shard 8 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 5, shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 1, shard 7 |
| `admin-users.spec.ts` | 28 | 3.3 min | shard 3, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.2 min | shard 2, shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 5, shard 11 |
| `my-listings-ad.spec.ts` | 36 | 2.3 min | shard 4, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 8 |
| `post-wizard-category.spec.ts` | 48 | 2.1 min | shard 4, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.0 min | shard 1, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 8 |
| `import-security.spec.ts` | 36 | 1.6 min | shard 3, shard 9 |
| `admin-translations-data.spec.ts` | 8 | 1.6 min | shard 2, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 1.2 min | shard 4, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 0.8 min | shard 2, shard 8 |
| `legal-admin.spec.ts` | 28 | 0.8 min | shard 3, shard 9 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 4, shard 10 |
| `legal-certify.spec.ts` | 26 | 0.7 min | shard 3, shard 9 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.6 min | shard 4, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 5, shard 11 |
| `legal-doors.spec.ts` | 32 | 0.5 min | shard 4, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 5, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 6, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 4, shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 6, shard 12 |
| `legal-accept.spec.ts` | 8 | 0.2 min | shard 3, shard 9 |
| `house-style.spec.ts` | 12 | 0.2 min | shard 3, shard 9 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 8 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 3, shard 9 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 3, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `layout.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `feed-index.spec.ts` | 30 | 0.1 min | shard 3, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 5, shard 11 |
| `legal-history.spec.ts` | 6 | 0.1 min | shard 4, shard 10 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5, shard 11 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 3, shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `legal-pages.spec.ts` | 6 | 0.1 min | shard 4, shard 10 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2) | desktop-1280 | 120.6 s |
| `photo-pipeline.spec.ts` › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) | mobile-360 | 120.6 s |
| `photo-pipeline.spec.ts` › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) | desktop-1280 | 120.6 s |
| `photo-pipeline.spec.ts` › PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2) | mobile-360 | 120.6 s |
| `photo-pipeline.spec.ts` › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) | desktop-1280 | 46.6 s |
| `photo-pipeline.spec.ts` › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) | mobile-360 | 46.6 s |
| `photo-pipeline.spec.ts` › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer | desktop-1280 | 45.2 s |
| `photo-pipeline.spec.ts` › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer | mobile-360 | 45.0 s |
| `photo-pipeline.spec.ts` › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session | desktop-1280 | 44.4 s |
| `photo-pipeline.spec.ts` › PP-12 a stored photo is drawn on the photo step through a link that expires | mobile-360 | 44.3 s |
| `photo-pipeline.spec.ts` › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session | mobile-360 | 44.3 s |
| `photo-pipeline.spec.ts` › PP-12 a stored photo is drawn on the photo step through a link that expires | desktop-1280 | 44.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-localproof: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 2, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 23 (pool 2, fresh 21)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 2, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-7: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-8: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 2, fresh 16)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-9: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-10: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-11: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39411681777-local-12: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  57 |     await expect(page.getByTestId("listing-safety-line")).toHaveCount(4);
  58 |     await expect(page.getByTestId("listing-detail-sold-badge")).toHaveCount(0);
> 59 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  60 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  61 |     await expect
```

Context:

```text
          - listitem [ref=e246]:
            - generic [ref=e247]: About
          - listitem [ref=e248]:
            - generic [ref=e249]: Contact
      - navigation "Help" [ref=e250]:
        - heading "Help" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Safety
      - navigation "Legal" [ref=e255]:
        - heading "Legal" [level=2] [ref=e256]
        - list [ref=e257]:
          - listitem [ref=e258]:
            - link "Terms" [ref=e259] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e260]:
            - link "Privacy" [ref=e261] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e263]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-19 the share image and the structured data

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /^https:\/\//
Received string:  "http://127.0.0.1:54321/storage/v1/object/sign/listing-photos/e2e-local-1/ad-page-uigwetcz.jpg?token=[masked JWT]"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /^https:\/\//
Received string:  "http://127.0.0.1:54321/storage/v1/object/sign/listing-photos/e2e-local-1/ad-page-uigwetcz.jpg?token=[masked JWT]"

  362 |     expect(photo.status()).toBe(302);
  363 |     const location = photo.headers()["location"];
> 364 |     expect(location).toMatch(/^https:\/\//);
      |                      ^
  365 |     const image = await page.request.get(location);
  366 |     expect(image.status()).toBe(200);
  367 |     expect(image.headers()["content-type"]).toMatch(/^image\//);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:364:22
```

Context: context file not found for `ad-page-AD-PAGE-the-buyer-s-page-bundle-19-turn-5-AP-19-the-share-image-and-the-structured-data-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-buye-ce835-age-and-the-structured-data-mobile-360`; this run carried 36 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-buye-d3e32-est-for-its-photos-DEC-195--mobile-360`, `ad-page-AD-PAGE-—-the-buye-33e92-width-DEC-192-drawings-v13--mobile-360`, `ad-page-AD-PAGE-—-the-buye-33e92-width-DEC-192-drawings-v13--mobile-360-retry1`, `ad-page-AD-PAGE-—-the-buye-92827-cal-address-server-rendered-mobile-360-retry1`, `ad-page-AD-PAGE-—-the-buye-d3e32-est-for-its-photos-DEC-195--mobile-360-retry1`

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width (DEC-192, drawings v13)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 10000ms exceeded while waiting on the predicate

  841 |       await page.evaluate(() => window.scrollTo(0, 0));
  842 |       await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
> 843 |       await expect
      |       ^
  844 |         .poll(() =>
  845 |           page
  846 |             .getByTestId("gallery-main")
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:843:7)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:965:23
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

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-49 the feed's first page asks no second request for its photos (DEC-195)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /^https:\/\//
Received string:  "http://127.0.0.1:54321/storage/v1/object/sign/listing-photos/e2e-local-1/ad-page-bdbbnaqj.jpg?token=[masked JWT]"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /^https:\/\//
Received string:  "http://127.0.0.1:54321/storage/v1/object/sign/listing-photos/e2e-local-1/ad-page-bdbbnaqj.jpg?token=[masked JWT]"

  1602 |     expect(Object.keys(body.coverLinks ?? {})).toHaveLength(3);
  1603 |     for (const links of Object.values(body.coverLinks ?? {})) {
> 1604 |       expect(links.card).toMatch(/^https:\/\//);
       |                          ^
  1605 |       expect(links.thumb).toMatch(/^https:\/\//);
  1606 |     }
  1607 |     await expect(page.getByTestId("listing-card")).toHaveCount(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1604:26
```

Context:

```text
          - listitem [ref=e299]:
            - generic [ref=e300]: About
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Help" [ref=e303]:
        - heading "Help" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Safety
      - navigation "Legal" [ref=e308]:
        - heading "Legal" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - link "Terms" [ref=e312] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e313]:
            - link "Privacy" [ref=e314] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e316]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-48 the thumbnails' arrows (INC-717, INC-720)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumbs').getByTestId('gallery-thumb')
Expected: 10
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumbs').getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumbs').getByTestId('gallery-thumb')
Expected: 10
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumbs').getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  1714 |     await gotoReady(page, (await address(ad)).canonical);
  1715 |     const strip = page.getByTestId("gallery-thumbs");
> 1716 |     await expect(strip.getByTestId("gallery-thumb")).toHaveCount(10);
       |                                                      ^
  1717 |
  1718 |     if (testInfo.project.name === "desktop-1280") {
```

Context:

```text
          - listitem [ref=e246]:
            - generic [ref=e247]: About
          - listitem [ref=e248]:
            - generic [ref=e249]: Contact
      - navigation "Help" [ref=e250]:
        - heading "Help" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Safety
      - navigation "Legal" [ref=e255]:
        - heading "Legal" [level=2] [ref=e256]
        - list [ref=e257]:
          - listitem [ref=e258]:
            - link "Terms" [ref=e259] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e260]:
            - link "Privacy" [ref=e261] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e263]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-import.spec.ts › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429
--- further error 1 ---
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429

  1464 |
  1465 |       const preview = await importPost(page, token, { mode: "preview", links });
> 1466 |       expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
       |                                                               ^
  1467 |       expect((preview.payload["counts"] as Record<string, number>).changes).toBe(1);
  1468 |       const ignored = (preview.payload["ignored"] ?? []) as { row: number; column: string }[];
  1469 |       expect(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1466:63
```

Context:

```text
          - listitem [ref=e1337]:
            - generic [ref=e1338]: About
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Contact
      - navigation "Help" [ref=e1341]:
        - heading "Help" [level=2] [ref=e1342]
        - list [ref=e1343]:
          - listitem [ref=e1344]:
            - generic [ref=e1345]: Safety
      - navigation "Legal" [ref=e1346]:
        - heading "Legal" [level=2] [ref=e1347]
        - list [ref=e1348]:
          - listitem [ref=e1349]:
            - link "Terms" [ref=e1350] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1351]:
            - link "Privacy" [ref=e1352] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1354]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('data-table-cards').getByTestId('lang-public-om')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('lang-public-om')
    13 × locator resolved to <button value="on" type="button" role="switch" aria-checked="false" data-state="unchecked" data-testid="lang-public-om" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-prim…>…</button>
       - unexpected value "enabled"

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('data-table-cards').getByTestId('lang-public-om')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('lang-public-om')
    13 × locator resolved to <button value="on" type="button" role="switch" aria-checked="false" data-state="unchecked" data-testid="lang-public-om" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-prim…>…</button>
       - unexpected value "enabled"


  305 |     try {
  306 |       await gotoReady(page, "/admin/translations");
> 307 |       await expect(publicSwitch).toBeDisabled();
      |                                  ^
  308 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
  309 |       expect(await flipOm()).toMatch(/not fully approved/i);
```

Context:

```text
          - listitem [ref=e534]:
            - generic [ref=e535]: About
          - listitem [ref=e536]:
            - generic [ref=e537]: Contact
      - navigation "Help" [ref=e538]:
        - heading "Help" [level=2] [ref=e539]
        - list [ref=e540]:
          - listitem [ref=e541]:
            - generic [ref=e542]: Safety
      - navigation "Legal" [ref=e543]:
        - heading "Legal" [level=2] [ref=e544]
        - list [ref=e545]:
          - listitem [ref=e546]:
            - link "Terms" [ref=e547] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e548]:
            - link "Privacy" [ref=e549] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e551]: © 2026 ethio.com — All rights reserved.
```
```

## feed-screens.spec.ts › FEED SCREENS › FS-15 the card's ribbon and the old price (D173, D175 1, D180)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture')
Expected: "photo"
Received: "none"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture')
    14 × locator resolved to <div role="img" data-picture="none" aria-label="No photo yet" data-testid="listing-card-picture" class="@container relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-muted  ">…</div>
       - unexpected value "none"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture')
Expected: "photo"
Received: "none"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture')
    14 × locator resolved to <div role="img" data-picture="none" aria-label="No photo yet" data-testid="listing-card-picture" class="@container relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-muted  ">…</div>
       - unexpected value "none"


  733 |     for (const id of [r, p, s]) {
  734 |       const picture = card(id).getByTestId("listing-card-picture");
> 735 |       await expect(picture).toHaveAttribute("data-picture", "photo");
      |                             ^
  736 |       const image = picture.locator("img");
  737 |       await expect(image).toBeVisible();
```

Context:

```text
          - listitem [ref=e330]:
            - generic [ref=e331]: About
          - listitem [ref=e332]:
            - generic [ref=e333]: Contact
      - navigation "Help" [ref=e334]:
        - heading "Help" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - generic [ref=e338]: Safety
      - navigation "Legal" [ref=e339]:
        - heading "Legal" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - link "Terms" [ref=e343] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e344]:
            - link "Privacy" [ref=e345] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e347]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-12 a stored photo is drawn on the photo step through a link that expires

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: PP-12: the stored photo has no signed link

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-photo-stored').locator('img')
Expected pattern: /^https:\/\/.+\/storage\/v1\/object\/sign\/listing-photos\/.+token=/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-12: the stored photo has no signed link with timeout 20000ms
  - waiting for getByTestId('post-photo-stored').locator('img')

--- further error 1 ---
Error: PP-12: the stored photo has no signed link

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-photo-stored').locator('img')
Expected pattern: /^https:\/\/.+\/storage\/v1\/object\/sign\/listing-photos\/.+token=/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-12: the stored photo has no signed link with timeout 20000ms
  - waiting for getByTestId('post-photo-stored').locator('img')


  513 |     await expect(page.getByTestId("post-step-2")).toBeVisible();
  514 |     const image = page.getByTestId("post-photo-stored").locator("img");
> 515 |     await expect(image, "PP-12: the stored photo has no signed link").toHaveAttribute(
      |                                                                       ^
  516 |       "src",
  517 |       /^https:\/\/.+\/storage\/v1\/object\/sign\/listing-photos\/.+token=/,
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-12-a-stored-photo-is-drawn-on-the-photo-step-through-a-link-that-expires-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-18dfa-through-a-link-that-expires-mobile-360`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture').locator('img')
Expected pattern: /\/object\/sign\/listing-photos\//
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture').locator('img')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture').locator('img')
Expected pattern: /\/object\/sign\/listing-photos\//
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture').locator('img')


  1117 |     await gotoReady(page, `/c/${leaf.slug}`);
  1118 |     const card = page.locator(`[data-testid="listing-card"][data-listing="${listingId}"]`);
> 1119 |     await expect(card.getByTestId("listing-card-picture").locator("img")).toHaveAttribute(
       |                                                                           ^
  1120 |       "src",
  1121 |       /\/object\/sign\/listing-photos\//,
  1122 |       { timeout: 20_000 },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1119:75
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-21-a-published-ad-s-cover-photo-reaches-the-feed-card-signed-for-a-visitor-without-a-session-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1b301-a-visitor-without-a-session-mobile-360`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: PP-22: no counter on the photo

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-count')
Expected: "1 / 3"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-22: no counter on the photo with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-count')

--- further error 1 ---
Error: PP-22: no counter on the photo

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-count')
Expected: "1 / 3"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-22: no counter on the photo with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-count')


  1166 |
  1167 |     // The cover first, at its card size; every photo a thumbnail at its thumb size.
> 1168 |     await expect(count, "PP-22: no counter on the photo").toHaveText("1 / 3", { timeout: 20_000 });
       |                                                           ^
  1169 |     await expect(main.locator("img")).toHaveAttribute("src", inLink(keyOf(rows[0]!, "card")));
  1170 |     await expect(main.locator("img")).toHaveAttribute("srcset", inLink(keyOf(rows[0]!, "cover")));
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-22-the-buyer-s-preview-is-a-gallery-thumbnails-arrows-a-swipe-and-a-full-screen-viewer-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-5eb1a-pe-and-a-full-screen-viewer-mobile-360`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613)

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: PP-23: the page does not offer the middle size

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-main').locator('img')
Expected pattern: /default\/[account id]\/[account id]\/[account id]\/mid\.webp/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-23: the page does not offer the middle size with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-main').locator('img')

--- further error 1 ---
Error: PP-23: the page does not offer the middle size

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-main').locator('img')
Expected pattern: /default\/[account id]\/[account id]\/[account id]\/mid\.webp/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-23: the page does not offer the middle size with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-main').locator('img')


  1287 |     const main = gallery.getByTestId("gallery-main");
  1288 |     const image = main.locator("img");
> 1289 |     await expect(image, "PP-23: the page does not offer the middle size").toHaveAttribute(
       |                                                                           ^
  1290 |       "srcset",
  1291 |       inLink(midKeys[0]!),
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-23-the-gallery-draws-the-middle-size-and-on-a-computer-a-wide-photo-s-top-meets-the-first-thumbnail-D162-INC-613-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-63be5-rst-thumbnail-D162-INC-613--mobile-360`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2)

- Source: `shard 4`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-photo-stored').nth(1).getByTestId('post-photo-edit')
    - locator resolved to <button disabled type="button" title="Edit photo" aria-label="Edit photo" data-testid="post-photo-edit" class="inline-flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-md border border-input px-1 text-[11px] font-medium leading-tight text-foreground hover:bg-accent disabled:opacity-40">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-27-Edit-turns-a-photo-and-crops-the-cover-each-saved-in-its-place-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-24fb0-saved-in-its-place-D154-B2--mobile-360`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2)

- Source: `shard 4`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-photo-stored').getByTestId('post-photo-edit')
    - locator resolved to <button disabled type="button" title="Edit photo" aria-label="Edit photo" data-testid="post-photo-edit" class="inline-flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-md border border-input px-1 text-[11px] font-medium leading-tight text-foreground hover:bg-accent disabled:opacity-40">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    3 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  108 × retrying click action
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-28-a-refused-edit-keeps-the-editor-open-with-its-reason-and-the-photo-as-it-was-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-cb41c-he-photo-as-it-was-D154-B2--mobile-360`; this run carried 36 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PW-162 (d) the Price Next moved on after a failed send — {"label":"d","ui":{"url":"http://127.0.0.1:4173/post/[account id]","steps":["post-step-5"],"loading":false,"saveCaption":"Saved","next":{"present":true,"closed":null,"disabled":false},"unreachable":false},"draft":[{"id":"[account id]","draft_step":4,"status":"draft"}],"sends":[{"step":2,"outcome":"sent"},{"step":4,"outcome":"aborted"},{"step":4,"outcome":"sent"},{"step":4,"outcome":"sent"}]}
--- further error 1 ---
Error: PW-162 (d) the Price Next moved on after a failed send — {"label":"d","ui":{"url":"http://127.0.0.1:4173/post/[account id]","steps":["post-step-5"],"loading":false,"saveCaption":"Saved","next":{"present":true,"closed":null,"disabled":false},"unreachable":false},"draft":[{"id":"[account id]","draft_step":4,"status":"draft"}],"sends":[{"step":2,"outcome":"sent"},{"step":4,"outcome":"aborted"},{"step":4,"outcome":"sent"},{"step":4,"outcome":"sent"}]}

  878 |       await expect(page.getByTestId("post-step-4")).toBeVisible();
  879 |     } catch (error) {
> 880 |       throw new Error(
      |             ^
  881 |         `PW-162 (d) the Price Next moved on after a failed send — ${await diagnose("d")}`,
  882 |         { cause: error },
  883 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:880:13
[cause]: Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 36 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  57 |     await expect(page.getByTestId("listing-safety-line")).toHaveCount(4);
  58 |     await expect(page.getByTestId("listing-detail-sold-badge")).toHaveCount(0);
> 59 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  60 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  61 |     await expect
```

Context:

```text
          - listitem [ref=e298]:
            - generic [ref=e299]: About
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Help" [ref=e302]:
        - heading "Help" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Safety
      - navigation "Legal" [ref=e307]:
        - heading "Legal" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - link "Terms" [ref=e311] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e312]:
            - link "Privacy" [ref=e313] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e315]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-19 the share image and the structured data

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /^https:\/\//
Received string:  "http://127.0.0.1:54321/storage/v1/object/sign/listing-photos/e2e-local-7/ad-page-fiibjamb.jpg?token=[masked JWT]"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /^https:\/\//
Received string:  "http://127.0.0.1:54321/storage/v1/object/sign/listing-photos/e2e-local-7/ad-page-fiibjamb.jpg?token=[masked JWT]"

  362 |     expect(photo.status()).toBe(302);
  363 |     const location = photo.headers()["location"];
> 364 |     expect(location).toMatch(/^https:\/\//);
      |                      ^
  365 |     const image = await page.request.get(location);
  366 |     expect(image.status()).toBe(200);
  367 |     expect(image.headers()["content-type"]).toMatch(/^image\//);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:364:22
```

Context: context file not found for `ad-page-AD-PAGE-the-buyer-s-page-bundle-19-turn-5-AP-19-the-share-image-and-the-structured-data-desktop-1280` — Playwright's name `ad-page-AD-PAGE-—-the-buye-ce835-age-and-the-structured-data-desktop-1280`; this run carried 36 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-buye-d3e32-est-for-its-photos-DEC-195--mobile-360`, `ad-page-AD-PAGE-—-the-buye-33e92-width-DEC-192-drawings-v13--mobile-360`, `ad-page-AD-PAGE-—-the-buye-33e92-width-DEC-192-drawings-v13--mobile-360-retry1`, `ad-page-AD-PAGE-—-the-buye-92827-cal-address-server-rendered-mobile-360-retry1`, `ad-page-AD-PAGE-—-the-buye-d3e32-est-for-its-photos-DEC-195--mobile-360-retry1`

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width (DEC-192, drawings v13)

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 10000ms exceeded while waiting on the predicate

  841 |       await page.evaluate(() => window.scrollTo(0, 0));
  842 |       await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
> 843 |       await expect
      |       ^
  844 |         .poll(() =>
  845 |           page
  846 |             .getByTestId("gallery-main")
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:843:7)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:965:23
```

Context:

```text
          - listitem [ref=e322]:
            - generic [ref=e323]: About
          - listitem [ref=e324]:
            - generic [ref=e325]: Contact
      - navigation "Help" [ref=e326]:
        - heading "Help" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Safety
      - navigation "Legal" [ref=e331]:
        - heading "Legal" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - link "Terms" [ref=e335] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e336]:
            - link "Privacy" [ref=e337] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e339]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-50 the seller card fills the right column

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 10000ms exceeded while waiting on the predicate

  1551 |     await seedPhotos(ad.id);
  1552 |     await gotoReady(page, (await address(ad)).canonical);
> 1553 |     await expect
       |     ^
  1554 |       .poll(() =>
  1555 |         page
  1556 |           .getByTestId("gallery-main")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1553:5
```

Context:

```text
          - listitem [ref=e325]:
            - generic [ref=e326]: About
          - listitem [ref=e327]:
            - generic [ref=e328]: Contact
      - navigation "Help" [ref=e329]:
        - heading "Help" [level=2] [ref=e330]
        - list [ref=e331]:
          - listitem [ref=e332]:
            - generic [ref=e333]: Safety
      - navigation "Legal" [ref=e334]:
        - heading "Legal" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - link "Terms" [ref=e338] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e339]:
            - link "Privacy" [ref=e340] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e342]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-49 the feed's first page asks no second request for its photos (DEC-195)

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /^https:\/\//
Received string:  "http://127.0.0.1:54321/storage/v1/object/sign/listing-photos/e2e-local-7/ad-page-jwcpaamr.jpg?token=[masked JWT]"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /^https:\/\//
Received string:  "http://127.0.0.1:54321/storage/v1/object/sign/listing-photos/e2e-local-7/ad-page-jwcpaamr.jpg?token=[masked JWT]"

  1602 |     expect(Object.keys(body.coverLinks ?? {})).toHaveLength(3);
  1603 |     for (const links of Object.values(body.coverLinks ?? {})) {
> 1604 |       expect(links.card).toMatch(/^https:\/\//);
       |                          ^
  1605 |       expect(links.thumb).toMatch(/^https:\/\//);
  1606 |     }
  1607 |     await expect(page.getByTestId("listing-card")).toHaveCount(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1604:26
```

Context:

```text
          - listitem [ref=e230]:
            - generic [ref=e231]: About
          - listitem [ref=e232]:
            - generic [ref=e233]: Contact
      - navigation "Help" [ref=e234]:
        - heading "Help" [level=2] [ref=e235]
        - list [ref=e236]:
          - listitem [ref=e237]:
            - generic [ref=e238]: Safety
      - navigation "Legal" [ref=e239]:
        - heading "Legal" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - link "Terms" [ref=e243] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e244]:
            - link "Privacy" [ref=e245] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e247]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-48 the thumbnails' arrows (INC-717, INC-720)

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumbs').getByTestId('gallery-thumb')
Expected: 10
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumbs').getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumbs').getByTestId('gallery-thumb')
Expected: 10
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumbs').getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  1714 |     await gotoReady(page, (await address(ad)).canonical);
  1715 |     const strip = page.getByTestId("gallery-thumbs");
> 1716 |     await expect(strip.getByTestId("gallery-thumb")).toHaveCount(10);
       |                                                      ^
  1717 |
  1718 |     if (testInfo.project.name === "desktop-1280") {
```

Context:

```text
          - listitem [ref=e298]:
            - generic [ref=e299]: About
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Help" [ref=e302]:
        - heading "Help" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Safety
      - navigation "Legal" [ref=e307]:
        - heading "Legal" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - link "Terms" [ref=e311] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e312]:
            - link "Privacy" [ref=e313] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e315]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByRole('table').getByTestId('lang-public-om')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('lang-public-om')
    13 × locator resolved to <button value="on" type="button" role="switch" aria-checked="false" data-state="unchecked" data-testid="lang-public-om" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-prim…>…</button>
       - unexpected value "enabled"

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator:  getByRole('table').getByTestId('lang-public-om')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('lang-public-om')
    13 × locator resolved to <button value="on" type="button" role="switch" aria-checked="false" data-state="unchecked" data-testid="lang-public-om" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-prim…>…</button>
       - unexpected value "enabled"


  305 |     try {
  306 |       await gotoReady(page, "/admin/translations");
> 307 |       await expect(publicSwitch).toBeDisabled();
      |                                  ^
  308 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
  309 |       expect(await flipOm()).toMatch(/not fully approved/i);
```

Context:

```text
          - listitem [ref=e536]:
            - generic [ref=e537]: About
          - listitem [ref=e538]:
            - generic [ref=e539]: Contact
      - navigation "Help" [ref=e540]:
        - heading "Help" [level=2] [ref=e541]
        - list [ref=e542]:
          - listitem [ref=e543]:
            - generic [ref=e544]: Safety
      - navigation "Legal" [ref=e545]:
        - heading "Legal" [level=2] [ref=e546]
        - list [ref=e547]:
          - listitem [ref=e548]:
            - link "Terms" [ref=e549] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e550]:
            - link "Privacy" [ref=e551] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e553]: © 2026 ethio.com — All rights reserved.
```
```

## feed-screens.spec.ts › FEED SCREENS › FS-15 the card's ribbon and the old price (D173, D175 1, D180)

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture')
Expected: "photo"
Received: "none"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture')
    14 × locator resolved to <div role="img" data-picture="none" aria-label="No photo yet" data-testid="listing-card-picture" class="@container relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-muted  ">…</div>
       - unexpected value "none"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture')
Expected: "photo"
Received: "none"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture')
    14 × locator resolved to <div role="img" data-picture="none" aria-label="No photo yet" data-testid="listing-card-picture" class="@container relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-muted  ">…</div>
       - unexpected value "none"


  733 |     for (const id of [r, p, s]) {
  734 |       const picture = card(id).getByTestId("listing-card-picture");
> 735 |       await expect(picture).toHaveAttribute("data-picture", "photo");
      |                             ^
  736 |       const image = picture.locator("img");
  737 |       await expect(image).toBeVisible();
```

Context:

```text
          - listitem [ref=e261]:
            - generic [ref=e262]: About
          - listitem [ref=e263]:
            - generic [ref=e264]: Contact
      - navigation "Help" [ref=e265]:
        - heading "Help" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Safety
      - navigation "Legal" [ref=e270]:
        - heading "Legal" [level=2] [ref=e271]
        - list [ref=e272]:
          - listitem [ref=e273]:
            - link "Terms" [ref=e274] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e275]:
            - link "Privacy" [ref=e276] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e278]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-12 a stored photo is drawn on the photo step through a link that expires

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: PP-12: the stored photo has no signed link

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-photo-stored').locator('img')
Expected pattern: /^https:\/\/.+\/storage\/v1\/object\/sign\/listing-photos\/.+token=/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-12: the stored photo has no signed link with timeout 20000ms
  - waiting for getByTestId('post-photo-stored').locator('img')

--- further error 1 ---
Error: PP-12: the stored photo has no signed link

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-photo-stored').locator('img')
Expected pattern: /^https:\/\/.+\/storage\/v1\/object\/sign\/listing-photos\/.+token=/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-12: the stored photo has no signed link with timeout 20000ms
  - waiting for getByTestId('post-photo-stored').locator('img')


  513 |     await expect(page.getByTestId("post-step-2")).toBeVisible();
  514 |     const image = page.getByTestId("post-photo-stored").locator("img");
> 515 |     await expect(image, "PP-12: the stored photo has no signed link").toHaveAttribute(
      |                                                                       ^
  516 |       "src",
  517 |       /^https:\/\/.+\/storage\/v1\/object\/sign\/listing-photos\/.+token=/,
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-12-a-stored-photo-is-drawn-on-the-photo-step-through-a-link-that-expires-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-18dfa-through-a-link-that-expires-desktop-1280`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture').locator('img')
Expected pattern: /\/object\/sign\/listing-photos\//
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture').locator('img')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture').locator('img')
Expected pattern: /\/object\/sign\/listing-photos\//
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"]').getByTestId('listing-card-picture').locator('img')


  1117 |     await gotoReady(page, `/c/${leaf.slug}`);
  1118 |     const card = page.locator(`[data-testid="listing-card"][data-listing="${listingId}"]`);
> 1119 |     await expect(card.getByTestId("listing-card-picture").locator("img")).toHaveAttribute(
       |                                                                           ^
  1120 |       "src",
  1121 |       /\/object\/sign\/listing-photos\//,
  1122 |       { timeout: 20_000 },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1119:75
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-21-a-published-ad-s-cover-photo-reaches-the-feed-card-signed-for-a-visitor-without-a-session-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1b301-a-visitor-without-a-session-desktop-1280`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: PP-22: no counter on the photo

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-count')
Expected: "1 / 3"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-22: no counter on the photo with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-count')

--- further error 1 ---
Error: PP-22: no counter on the photo

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-count')
Expected: "1 / 3"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-22: no counter on the photo with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-count')


  1166 |
  1167 |     // The cover first, at its card size; every photo a thumbnail at its thumb size.
> 1168 |     await expect(count, "PP-22: no counter on the photo").toHaveText("1 / 3", { timeout: 20_000 });
       |                                                           ^
  1169 |     await expect(main.locator("img")).toHaveAttribute("src", inLink(keyOf(rows[0]!, "card")));
  1170 |     await expect(main.locator("img")).toHaveAttribute("srcset", inLink(keyOf(rows[0]!, "cover")));
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-22-the-buyer-s-preview-is-a-gallery-thumbnails-arrows-a-swipe-and-a-full-screen-viewer-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-5eb1a-pe-and-a-full-screen-viewer-desktop-1280`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613)

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: PP-23: the page does not offer the middle size

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-main').locator('img')
Expected pattern: /default\/[account id]\/[account id]\/[account id]\/mid\.webp/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-23: the page does not offer the middle size with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-main').locator('img')

--- further error 1 ---
Error: PP-23: the page does not offer the middle size

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-main').locator('img')
Expected pattern: /default\/[account id]\/[account id]\/[account id]\/mid\.webp/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PP-23: the page does not offer the middle size with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-gallery').getByTestId('gallery-main').locator('img')


  1287 |     const main = gallery.getByTestId("gallery-main");
  1288 |     const image = main.locator("img");
> 1289 |     await expect(image, "PP-23: the page does not offer the middle size").toHaveAttribute(
       |                                                                           ^
  1290 |       "srcset",
  1291 |       inLink(midKeys[0]!),
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-23-the-gallery-draws-the-middle-size-and-on-a-computer-a-wide-photo-s-top-meets-the-first-thumbnail-D162-INC-613-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-63be5-rst-thumbnail-D162-INC-613--desktop-1280`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2)

- Source: `shard 10`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-photo-stored').nth(1).getByTestId('post-photo-edit')
    - locator resolved to <button disabled type="button" title="Edit photo" aria-label="Edit photo" data-testid="post-photo-edit" class="inline-flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-md border border-input px-1 text-[11px] font-medium leading-tight text-foreground hover:bg-accent disabled:opacity-40">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-27-Edit-turns-a-photo-and-crops-the-cover-each-saved-in-its-place-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-24fb0-saved-in-its-place-D154-B2--desktop-1280`; this run carried 36 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2)

- Source: `shard 10`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-photo-stored').getByTestId('post-photo-edit')
    - locator resolved to <button disabled type="button" title="Edit photo" aria-label="Edit photo" data-testid="post-photo-edit" class="inline-flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-md border border-input px-1 text-[11px] font-medium leading-tight text-foreground hover:bg-accent disabled:opacity-40">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-28-a-refused-edit-keeps-the-editor-open-with-its-reason-and-the-photo-as-it-was-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-cb41c-he-photo-as-it-was-D154-B2--desktop-1280`; this run carried 36 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: PW-162 (d) the Price Next moved on after a failed send — {"label":"d","ui":{"url":"http://127.0.0.1:4173/post/[account id]","steps":["post-step-5"],"loading":false,"saveCaption":"Saved","next":{"present":true,"closed":null,"disabled":false},"unreachable":false},"draft":[{"id":"[account id]","draft_step":4,"status":"draft"}],"sends":[{"step":2,"outcome":"sent"},{"step":4,"outcome":"aborted"},{"step":4,"outcome":"sent"},{"step":4,"outcome":"sent"}]}
--- further error 1 ---
Error: PW-162 (d) the Price Next moved on after a failed send — {"label":"d","ui":{"url":"http://127.0.0.1:4173/post/[account id]","steps":["post-step-5"],"loading":false,"saveCaption":"Saved","next":{"present":true,"closed":null,"disabled":false},"unreachable":false},"draft":[{"id":"[account id]","draft_step":4,"status":"draft"}],"sends":[{"step":2,"outcome":"sent"},{"step":4,"outcome":"aborted"},{"step":4,"outcome":"sent"},{"step":4,"outcome":"sent"}]}

  878 |       await expect(page.getByTestId("post-step-4")).toBeVisible();
  879 |     } catch (error) {
> 880 |       throw new Error(
      |             ^
  881 |         `PW-162 (d) the Price Next moved on after a failed send — ${await diagnose("d")}`,
  882 |         { cause: error },
  883 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:880:13
[cause]: Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 36 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews ×4
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-local-1-15-ddr3wt: e2e_par_1h5v71 → e2e_chi_5fsx3n
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"code":"P0001","details":null,"hint":null,"message":"catalog empty — sync keys before publishing a language"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"code":"P0001","details":null,"hint":null,"message":"catalog empty — sync keys before publishing a language"})
```

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

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 7

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-local-7-14-snr5j4: e2e_par_jkk057 → e2e_chi_1yhcvw
```

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 8

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 8

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"code":"P0001","details":null,"hint":null,"message":"catalog empty — sync keys before publishing a language"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"code":"P0001","details":null,"hint":null,"message":"catalog empty — sync keys before publishing a language"})
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

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: shard 11

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 11

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```
