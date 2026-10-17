# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39009703768
- Commit: `ee15261a3cda8bded7de5e16188b0ca459c37e65`
- Attempt: 1
- Written (UTC): 2026-10-17T07:18:14.132Z
- Passed: 1898 · Skipped: 128 · Failed: 12
- Gating failures: 12 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 10
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) — Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1227.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1263.5,"width":117,"height":135.75}}
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › the menu follows the active panel — Error: [e2e:pool] reaping e2e-pool-s3b-000@ethio-e2e.invalid (factors) failed: {}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-25 Edit refuses an enforcer without a second factor, and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1227.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1263.5,"width":117,"height":135.75}}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1227.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1263.5,"width":117,"height":135.75}}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  1962 |       firstBox !== null && secondBox !== null && Math.abs(firstBox.y - secondBox.y) < 2,
  1963 |       `the two photos are not on one row: ${JSON.stringify({ firstBox, secondBox })}`,
> 1964 |     ).toBe(true);
       |       ^
  1965 |     await expect(card.getByTestId("listing-photos-hint")).toHaveText(
  1966 |       en["admin.listings.photos.hint"],
  1967 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1964:7
```

Context:

```text
          - listitem [ref=e361]:
            - generic [ref=e362]: About
          - listitem [ref=e363]:
            - generic [ref=e364]: How it works
      - navigation "Help" [ref=e365]:
        - heading "Help" [level=2] [ref=e366]
        - list [ref=e367]:
          - listitem [ref=e368]:
            - generic [ref=e369]: Safety
          - listitem [ref=e370]:
            - generic [ref=e371]: Contact
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Terms
          - listitem [ref=e377]:
            - generic [ref=e378]: Privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  469 |
  470 |     release();
> 471 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  472 |     await expect(page.getByTestId("post-who-country-refusal")).toHaveCount(0);
  473 |   });
  474 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:471:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-129-Next-waits-for-the-identity-read-instead-of-refusing-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-a0549-ty-read-instead-of-refusing-mobile-360`; this run carried 11 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e221]:
            - generic [ref=e222]: About
          - listitem [ref=e223]:
            - generic [ref=e224]: How it works
      - navigation "Help" [ref=e225]:
        - heading "Help" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: Safety
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Legal" [ref=e232]:
        - heading "Legal" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Terms
          - listitem [ref=e237]:
            - generic [ref=e238]: Privacy
    - paragraph [ref=e240]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › mobile chrome › the menu follows the active panel

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s3b-000@ethio-e2e.invalid (factors) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s3b-000@ethio-e2e.invalid (factors) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:355:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1036:18
```

Context: context file not found for `shell-mobile-chrome-the-menu-follows-the-active-panel-mobile-360` — Playwright's name `shell-mobile-chrome-the-menu-follows-the-active-panel-mobile-360`; this run carried 11 context file(s); of the same spec: none

### admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  212 |         .poll(async () => (await readCountry(code))?.is_active, { timeout: 20000 })
  213 |         .toBe(false);
> 214 |       await expect
      |       ^
  215 |         .poll(async () => (await page.request.get(`/api/locations/${code}`)).status(), {
  216 |           timeout: 20000,
  217 |         })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:214:7
```

Context:

```text
          - listitem [ref=e346]:
            - generic [ref=e347]: About
          - listitem [ref=e348]:
            - generic [ref=e349]: How it works
      - navigation "Help" [ref=e350]:
        - heading "Help" [level=2] [ref=e351]
        - list [ref=e352]:
          - listitem [ref=e353]:
            - generic [ref=e354]: Safety
          - listitem [ref=e355]:
            - generic [ref=e356]: Contact
      - navigation "Legal" [ref=e357]:
        - heading "Legal" [level=2] [ref=e358]
        - list [ref=e359]:
          - listitem [ref=e360]:
            - generic [ref=e361]: Terms
          - listitem [ref=e362]:
            - generic [ref=e363]: Privacy
    - paragraph [ref=e365]: © 2026 ethio.com — All rights reserved.
```
```

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-25 Edit refuses an enforcer without a second factor, and writes nothing

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
SyntaxError: Unexpected token 'u', "upstream r"... is not valid JSON

   at helpers/session.ts:91

  89 |     body: JSON.stringify({ email, password }),
  90 |   });
> 91 |   const body = (await response.json()) as Record<string, unknown>;
     |                 ^
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
  93 |     throw new Error(
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:91:17)
    at asPerson (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:89:19)
    at refusedEdit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:425:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:461:5
--- further error 2 ---
Error: [e2e:reap] location aff3c680-b860-471d-9063-3424992e7fec failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

   at helpers/locations.ts:277

  275 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  276 |     if (deleted.error)
> 277 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  278 |   }
  279 | }
  280 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:277:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:202:43
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-25-Edit-refuses-an-enforcer-without-a-second-factor-and-writes-nothing-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-96cb2-d-factor-and-writes-nothing-desktop-1280`; this run carried 11 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--mobile-360`

### admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
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
  133 |
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:33479:25) at http://127.0.0.1:4173/assets/index-IqFaEmoG.js:33511:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6027:5)
```

Context:

```text
          - listitem [ref=e130]:
            - generic [ref=e131]: About
          - listitem [ref=e132]:
            - generic [ref=e133]: How it works
      - navigation "Help" [ref=e134]:
        - heading "Help" [level=2] [ref=e135]
        - list [ref=e136]:
          - listitem [ref=e137]:
            - generic [ref=e138]: Safety
          - listitem [ref=e139]:
            - generic [ref=e140]: Contact
      - navigation "Legal" [ref=e141]:
        - heading "Legal" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Terms
          - listitem [ref=e146]:
            - generic [ref=e147]: Privacy
    - paragraph [ref=e149]: © 2026 ethio.com — All rights reserved.
```
```

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: PP-13: no card link for the owner

expect(received).toMatch(expected)

Expected pattern: /\/storage\/v1\/object\/sign\/listing-photos\//
Received string:  ""

  557 |     const ownLinks = (own.payload["links"] ?? {}) as Record<string, Record<string, string>>;
  558 |     for (const variant of ["card", "thumb", "cover"]) {
> 559 |       expect(ownLinks[photoId]?.[variant] ?? "", `PP-13: no ${variant} link for the owner`).toMatch(
      |                                                                                             ^
  560 |         /\/storage\/v1\/object\/sign\/listing-photos\//,
  561 |       );
  562 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:559:93
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-13-photo-links-the-owner-and-staff-get-them-another-seller-and-no-session-do-not-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-desktop-1280`; this run carried 11 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  469 |
  470 |     release();
> 471 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  472 |     await expect(page.getByTestId("post-who-country-refusal")).toHaveCount(0);
  473 |   });
  474 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:471:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-129-Next-waits-for-the-identity-read-instead-of-refusing-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-a0549-ty-read-instead-of-refusing-desktop-1280`; this run carried 11 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e296]:
            - generic [ref=e297]: About
          - listitem [ref=e298]:
            - generic [ref=e299]: How it works
      - navigation "Help" [ref=e300]:
        - heading "Help" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Safety
          - listitem [ref=e305]:
            - generic [ref=e306]: Contact
      - navigation "Legal" [ref=e307]:
        - heading "Legal" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - generic [ref=e311]: Terms
          - listitem [ref=e312]:
            - generic [ref=e313]: Privacy
    - paragraph [ref=e315]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

122 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 21 | shard 2, shard 3, shard 5, shard 6, changed |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>w<n>w<n>z: e<n>e_par_rcn<n>v → e<n>e_chi_<n>ba<n>x<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-plgrj<n>: e<n>e_par_hegsli → e<n>e_chi_vm<n>plb` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>w<n>w<n>z: e<n>e_par_rcn<n>v → e<n>e_chi_<n>ba<n>x<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-plgrj<n>: e<n>e_par_hegsli → e<n>e_chi_vm<n>plb ×1

Off the allowlist:

### listing not found

- Count: 21 · Sources: shard 2, shard 3, shard 5, shard 6, changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-63 the pricing basis is asked on the price step, refused there when empty, an ×4 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-129 Next waits for the identity read instead of refusing ×2 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): VP-10 a browser pick saved before D106 (no time) loses to the account's place ×1 · VP-9 the account's newer pick wins over this browser's older one ×1

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T06:33:31.804Z | 16.4 min |
| email | 2026-10-17T06:33:33.292Z | 0.2 min |
| shard 1 | 2026-10-17T06:33:41.667Z | 44.2 min |
| shard 2 | 2026-10-17T06:33:32.946Z | 37.1 min |
| shard 3 | 2026-10-17T06:33:35.258Z | 35.0 min |
| shard 4 | 2026-10-17T06:33:37.899Z | 40.9 min |
| shard 5 | 2026-10-17T06:33:29.084Z | 37.1 min |
| shard 6 | 2026-10-17T06:33:39.526Z | 34.6 min |
| changed | 2026-10-17T06:33:32.293Z | 18.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-pricing.spec.ts` | 104 | 37.7 min | shard 3, shard 6, changed |
| `photo-pipeline.spec.ts` | 66 | 25.7 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 22.4 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 22.3 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 22.3 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 19.5 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 64 | 16.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 14.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 12.9 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 28 | 12.7 min | shard 1, shard 4, changed |
| `admin-attributes-library.spec.ts` | 42 | 12.3 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 11.7 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.7 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.1 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 10.8 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.6 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.4 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 10.1 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 9.7 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 28 | 9.7 min | shard 1, shard 4, changed |
| `feed-screens.spec.ts` | 30 | 9.4 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 8.7 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.1 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.5 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 30 | 7.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.8 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.7 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.1 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 5.5 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 5.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.4 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 4.2 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.2 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 3, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
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
| `admin-listings.spec.ts` › AL-25 Edit refuses an enforcer without a second factor, and writes nothing | desktop-1280 | 130.8 s |
| `photo-pipeline.spec.ts` › PP-13 photo links: the owner and staff get them; another seller and no session do not | desktop-1280 | 119.1 s |
| `photo-pipeline.spec.ts` › PP-13 photo links: the owner and staff get them; another seller and no session do not | mobile-360 | 111.8 s |
| `posting-routes.spec.ts` › PR-4 identity: the alias is saved, and a second seller cannot take it | mobile-360 | 111.6 s |
| `posting-routes.spec.ts` › PR-4 identity: the alias is saved, and a second seller cannot take it | desktop-1280 | 109.1 s |
| `post-wizard-bundle2.spec.ts` › PW-129 Next waits for the identity read instead of refusing | desktop-1280 | 105.2 s |
| `post-wizard-bundle2.spec.ts` › PW-129 Next waits for the identity read instead of refusing | mobile-360 | 104.1 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 98.3 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 92.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-20 action=retire and action=reactivate walk the state machine | mobile-360 | 90.4 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 87.0 s |
| `admin-locations.spec.ts` › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin | desktop-1280 | 84.4 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 83.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 77.7 s |
| `admin-locations.spec.ts` › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids | desktop-1280 | 73.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39009703768-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39009703768-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39009703768-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39009703768-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39009703768-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39009703768-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39009703768-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39009703768-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39009703768-changed
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


  32 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  33 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
> 34 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  35 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  36 |     await expect
```

Context:

```text
          - listitem [ref=e295]:
            - generic [ref=e296]: About
          - listitem [ref=e297]:
            - generic [ref=e298]: How it works
      - navigation "Help" [ref=e299]:
        - heading "Help" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Safety
          - listitem [ref=e304]:
            - generic [ref=e305]: Contact
      - navigation "Legal" [ref=e306]:
        - heading "Legal" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Terms
          - listitem [ref=e311]:
            - generic [ref=e312]: Privacy
    - paragraph [ref=e314]: © 2026 ethio.com — All rights reserved.
```
```

## feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -13,10 +13,11 @@
    "priceNegotiable",
    "pricePeriod",
    "priceUnit",
    "priceUnitText",
    "priceWas",
+   "publicId",
    "publishedAt",
    "reserved",
    "soldWord",
    "step",
    "tier",
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -13,10 +13,11 @@
    "priceNegotiable",
    "pricePeriod",
    "priceUnit",
    "priceUnitText",
    "priceWas",
+   "publicId",
    "publishedAt",
    "reserved",
    "soldWord",
    "step",
    "tier",

  241 |     ].sort();
  242 |     expect(r.body.cards.length).toBeGreaterThan(0);
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-mobile-360` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-mobile-360`; this run carried 11 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-13-photo-links-the-owner-and-staff-get-them-another-seller-and-no-session-do-not-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-mobile-360`; this run carried 11 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-next-unreachable')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-next-unreachable')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-next-unreachable')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-next-unreachable')


  836 |     await page.getByTestId("post-next").click();
  837 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
> 838 |     await expect(page.getByTestId("post-next-unreachable")).toBeVisible();
      |                                                             ^
  839 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
  840 |     // INC-679: the hook's successful retry clears the transport block before Back.
  841 |     await expect(page.getByTestId("post-next-unreachable")).toBeHidden();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:838:61
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 11 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `shard 4`
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


  32 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  33 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
> 34 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  35 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  36 |     await expect
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

## admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-4-6-lt7r-thd3cq')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-4-6-lt7r-thd3cq')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-4-6-lt7r-thd3cq')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-4-6-lt7r-thd3cq')


  731 |       // A second undo of the same batch is refused by name.
  732 |       await page.getByTestId("location-import-close").click();
> 733 |       await expect(locationRow(page, `${ANCHOR}/${regionSlug}`)).toBeVisible();
      |                                                                  ^
  734 |     } finally {
  735 |       await destroyLocation(regionSlug);
  736 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:733:66
```

Context:

```text
          - listitem [ref=e1003]:
            - generic [ref=e1004]: About
          - listitem [ref=e1005]:
            - generic [ref=e1006]: How it works
      - navigation "Help" [ref=e1007]:
        - heading "Help" [level=2] [ref=e1008]
        - list [ref=e1009]:
          - listitem [ref=e1010]:
            - generic [ref=e1011]: Safety
          - listitem [ref=e1012]:
            - generic [ref=e1013]: Contact
      - navigation "Legal" [ref=e1014]:
        - heading "Legal" [level=2] [ref=e1015]
        - list [ref=e1016]:
          - listitem [ref=e1017]:
            - generic [ref=e1018]: Terms
          - listitem [ref=e1019]:
            - generic [ref=e1020]: Privacy
    - paragraph [ref=e1022]: © 2026 ethio.com — All rights reserved.
```
```

## feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -13,10 +13,11 @@
    "priceNegotiable",
    "pricePeriod",
    "priceUnit",
    "priceUnitText",
    "priceWas",
+   "publicId",
    "publishedAt",
    "reserved",
    "soldWord",
    "step",
    "tier",
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -13,10 +13,11 @@
    "priceNegotiable",
    "pricePeriod",
    "priceUnit",
    "priceUnitText",
    "priceWas",
+   "publicId",
    "publishedAt",
    "reserved",
    "soldWord",
    "step",
    "tier",

  241 |     ].sort();
  242 |     expect(r.body.cards.length).toBeGreaterThan(0);
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-desktop-1280` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-desktop-1280`; this run carried 11 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 6`
- Project: `desktop-1280`

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

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 11 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `changed`
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


  32 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  33 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
> 34 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  35 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  36 |     await expect
```

Context:

```text
          - listitem [ref=e295]:
            - generic [ref=e296]: About
          - listitem [ref=e297]:
            - generic [ref=e298]: How it works
      - navigation "Help" [ref=e299]:
        - heading "Help" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Safety
          - listitem [ref=e304]:
            - generic [ref=e305]: Contact
      - navigation "Legal" [ref=e306]:
        - heading "Legal" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Terms
          - listitem [ref=e311]:
            - generic [ref=e312]: Privacy
    - paragraph [ref=e314]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `changed`
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


  32 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  33 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
> 34 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  35 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  36 |     await expect
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

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `changed`
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

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 11 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `changed`
- Project: `desktop-1280`

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

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 11 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-3-plgrj5: e2e_par_hegsli → e2e_chi_vm2plb
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-3-7w9w9z: e2e_par_rcn86v → e2e_chi_2ba4x1
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:33479:25) at http://127.0.0.1:4173/assets/index-IqFaEmoG.js:33511:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-IqFaEmoG.js:6027:5)
```

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×9
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
```
