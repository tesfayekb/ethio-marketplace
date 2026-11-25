# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45527306417
- Commit: `0f50473551fad57105d767a27efd3527467c8fab`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-8b239db74489… (0 read)
- Repeat: 34 of 1494 tests repeated — specs directly changed 3/37, importers of a changed helper 0/77; budget 646 s; the time cap left 40 test runs
- Written (UTC): 2026-11-25T02:09:06.340Z
- Passed: 2671 · Skipped: 436 · Failed: 6
- Gating failures: 6 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Gating failures

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"

--- further error 1 ---
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"


  161 |     await expect(page.getByTestId("role-permissions")).toHaveCount(0);
  162 |     await expect(roleRow(page, "admin")).toHaveCount(0);
> 163 |     await expect(page).not.toHaveURL(/\/admin\/roles\//);
      |                            ^
  164 |   });
  165 |
  166 |   test("RP-2 create: a super admin creates a custom role through step-up", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:163:28
```

Context:

```text
          - listitem [ref=e609]:
            - generic [ref=e610]: About
          - listitem [ref=e611]:
            - generic [ref=e612]: Contact
      - navigation "Help" [ref=e613]:
        - heading "Help" [level=2] [ref=e614]
        - list [ref=e615]:
          - listitem [ref=e616]:
            - generic [ref=e617]: Safety
      - navigation "Legal" [ref=e618]:
        - heading "Legal" [level=2] [ref=e619]
        - list [ref=e620]:
          - listitem [ref=e621]:
            - link "Terms" [ref=e622] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e623]:
            - link "Privacy" [ref=e624] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e626]: © 2026 ethio.com — All rights reserved.
```
```

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"

--- further error 1 ---
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"


  161 |     await expect(page.getByTestId("role-permissions")).toHaveCount(0);
  162 |     await expect(roleRow(page, "admin")).toHaveCount(0);
> 163 |     await expect(page).not.toHaveURL(/\/admin\/roles\//);
      |                            ^
  164 |   });
  165 |
  166 |   test("RP-2 create: a super admin creates a custom role through step-up", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:163:28
```

Context:

```text
          - listitem [ref=e614]:
            - generic [ref=e615]: About
          - listitem [ref=e616]:
            - generic [ref=e617]: Contact
      - navigation "Help" [ref=e618]:
        - heading "Help" [level=2] [ref=e619]
        - list [ref=e620]:
          - listitem [ref=e621]:
            - generic [ref=e622]: Safety
      - navigation "Legal" [ref=e623]:
        - heading "Legal" [level=2] [ref=e624]
        - list [ref=e625]:
          - listitem [ref=e626]:
            - link "Terms" [ref=e627] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e628]:
            - link "Privacy" [ref=e629] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e631]: © 2026 ethio.com — All rights reserved.
```
```

### breadcrumbs.spec.ts › breadcrumbs — the seller's and the account's pages (D198) › BR-3 the admin's listing Edit: … › All listings › <title> › Edit

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('breadcrumbs').getByTestId('breadcrumb-admin-listing')
Expected: "E2E breadcrumbs ad local-x bannvsqo"
Received: "—"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('breadcrumbs').getByTestId('breadcrumb-admin-listing')
    24 × locator resolved to <a data-tick="" aria-current="page" data-status="active" data-testid="breadcrumb-admin-listing" href="/admin/listings/[account id]" class="transition-colors hover:text-foreground data-[pressed]:bg-card data-[pressed]:text-nav-ink data-[pressed]:shadow-segment data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex h-7 shrink items-center rou…>…</a>
       - unexpected value "—"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('breadcrumbs').getByTestId('breadcrumb-admin-listing')
Expected: "E2E breadcrumbs ad local-x bannvsqo"
Received: "—"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('breadcrumbs').getByTestId('breadcrumb-admin-listing')
    24 × locator resolved to <a data-tick="" aria-current="page" data-status="active" data-testid="breadcrumb-admin-listing" href="/admin/listings/[account id]" class="transition-colors hover:text-foreground data-[pressed]:bg-card data-[pressed]:text-nav-ink data-[pressed]:shadow-segment data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex h-7 shrink items-center rou…>…</a>
       - unexpected value "—"


  211 |     // The step-up gate may hold the page's body: the trail is read regardless.
  212 |     const adCrumb = trail.getByTestId("breadcrumb-admin-listing");
> 213 |     await expect(adCrumb).toHaveText(ad.title, { timeout: 20000 });
      |                           ^
  214 |     expect(await adCrumb.evaluate((node) => node.tagName)).toBe("A");
  215 |     await expect(adCrumb).toHaveAttribute("href", new RegExp(`/admin/listings/${ad.id}$`));
```

Context:

```text
          - listitem [ref=e455]:
            - generic [ref=e456]: About
          - listitem [ref=e457]:
            - generic [ref=e458]: Contact
      - navigation "Help" [ref=e459]:
        - heading "Help" [level=2] [ref=e460]
        - list [ref=e461]:
          - listitem [ref=e462]:
            - generic [ref=e463]: Safety
      - navigation "Legal" [ref=e464]:
        - heading "Legal" [level=2] [ref=e465]
        - list [ref=e466]:
          - listitem [ref=e467]:
            - link "Terms" [ref=e468] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e469]:
            - link "Privacy" [ref=e470] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e472]: © 2026 ethio.com — All rights reserved.
```
```

### breadcrumbs.spec.ts › breadcrumbs — the seller's and the account's pages (D198) › BR-3 the admin's listing Edit: … › All listings › <title> › Edit

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('breadcrumbs').getByTestId('breadcrumb-admin-listing')
Expected: "E2E breadcrumbs ad local-x ffukbsou"
Received: "—"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('breadcrumbs').getByTestId('breadcrumb-admin-listing')
    24 × locator resolved to <a data-tick="" aria-current="page" data-status="active" data-testid="breadcrumb-admin-listing" href="/admin/listings/[account id]" class="transition-colors hover:text-foreground data-[pressed]:bg-card data-[pressed]:text-nav-ink data-[pressed]:shadow-segment data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex h-7 shrink items-center rou…>…</a>
       - unexpected value "—"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('breadcrumbs').getByTestId('breadcrumb-admin-listing')
Expected: "E2E breadcrumbs ad local-x ffukbsou"
Received: "—"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('breadcrumbs').getByTestId('breadcrumb-admin-listing')
    24 × locator resolved to <a data-tick="" aria-current="page" data-status="active" data-testid="breadcrumb-admin-listing" href="/admin/listings/[account id]" class="transition-colors hover:text-foreground data-[pressed]:bg-card data-[pressed]:text-nav-ink data-[pressed]:shadow-segment data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex h-7 shrink items-center rou…>…</a>
       - unexpected value "—"


  211 |     // The step-up gate may hold the page's body: the trail is read regardless.
  212 |     const adCrumb = trail.getByTestId("breadcrumb-admin-listing");
> 213 |     await expect(adCrumb).toHaveText(ad.title, { timeout: 20000 });
      |                           ^
  214 |     expect(await adCrumb.evaluate((node) => node.tagName)).toBe("A");
  215 |     await expect(adCrumb).toHaveAttribute("href", new RegExp(`/admin/listings/${ad.id}$`));
```

Context:

```text
          - listitem [ref=e442]:
            - generic [ref=e443]: About
          - listitem [ref=e444]:
            - generic [ref=e445]: Contact
      - navigation "Help" [ref=e446]:
        - heading "Help" [level=2] [ref=e447]
        - list [ref=e448]:
          - listitem [ref=e449]:
            - generic [ref=e450]: Safety
      - navigation "Legal" [ref=e451]:
        - heading "Legal" [level=2] [ref=e452]
        - list [ref=e453]:
          - listitem [ref=e454]:
            - link "Terms" [ref=e455] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e456]:
            - link "Privacy" [ref=e457] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e459]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-23 an importer without step-up is refused at the preview and writes nothing

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+ ]
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+ ]

  1940 |         .eq("actor_id", importer.id);
  1941 |       expect(audit.error).toBeNull();
> 1942 |       expect(audit.data ?? []).toEqual([]);
       |                                ^
  1943 |       const meters = await adminClient()
```

Context:

```text
          - listitem [ref=e156]:
            - generic [ref=e157]: About
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Help" [ref=e160]:
        - heading "Help" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Safety
      - navigation "Legal" [ref=e165]:
        - heading "Legal" [level=2] [ref=e166]
        - list [ref=e167]:
          - listitem [ref=e168]:
            - link "Terms" [ref=e169] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e170]:
            - link "Privacy" [ref=e171] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e173]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-23 an importer without step-up is refused at the preview and writes nothing

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 68

- Array []
+ Array [
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 68

- Array []
+ Array [
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
+     "action": "profile.preferred_language",
+   },
+   Object {
```

Context:

```text
          - listitem [ref=e183]:
            - generic [ref=e184]: About
          - listitem [ref=e185]:
            - generic [ref=e186]: Contact
      - navigation "Help" [ref=e187]:
        - heading "Help" [level=2] [ref=e188]
        - list [ref=e189]:
          - listitem [ref=e190]:
            - generic [ref=e191]: Safety
      - navigation "Legal" [ref=e192]:
        - heading "Legal" [level=2] [ref=e193]
        - list [ref=e194]:
          - listitem [ref=e195]:
            - link "Terms" [ref=e196] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e197]:
            - link "Privacy" [ref=e198] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e200]: © 2026 ethio.com — All rights reserved.
```
```

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 7` · legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 13` · admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish

- Source: `shard 7`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx7-n5wcf-1-m-card-global').getByTestId('legal-view-inforce')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx7-n5wcf-1-m-card-global').getByTestId('legal-view-inforce')


  1104 |       await gotoReady(page, "/admin/legal");
  1105 |       const translatedCard = page.getByTestId(`legal-doc-${kind}-global`);
> 1106 |       await expect(translatedCard.getByTestId("legal-view-inforce")).toBeVisible();
       |                                                                      ^
  1107 |       // J6 — another worker's scratch language may still be offered; nothing this test wrote,
  1108 |       // and no language the product ships, is. The control names every missing language.
  1109 |       const translate = translatedCard.getByTestId("legal-translate-inforce");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:1106:70
```

Context:

```text
          - listitem [ref=e139]:
            - generic [ref=e140]: About
          - listitem [ref=e141]:
            - generic [ref=e142]: Contact
      - navigation "Help" [ref=e143]:
        - heading "Help" [level=2] [ref=e144]
        - list [ref=e145]:
          - listitem [ref=e146]:
            - generic [ref=e147]: Safety
      - navigation "Legal" [ref=e148]:
        - heading "Legal" [level=2] [ref=e149]
        - list [ref=e150]:
          - listitem [ref=e151]:
            - link "Terms" [ref=e152] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e153]:
            - link "Privacy" [ref=e154] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e156]: © 2026 ethio.com — All rights reserved.
```
```

### admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
--- further error 1 ---
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

   at global-setup.ts:255

  253 |   const text = await response.text();
  254 |   if (!response.ok) {
> 255 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  256 |   }
  257 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  258 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:255:11)
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:975:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1112:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:785:24
```

Context: context file not found for `admin-attributes-links-C3-attributes-console-AT-59-the-link-editor-s-Save-reflects-change-saved-and-error-desktop-1280` — Playwright's name `admin-attributes-links-C3--ebac8-ects-change-saved-and-error-desktop-1280`; this run carried 13 context file(s); of the same spec: none

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 766s for the test suite to run
(no place given)
```

```text
Timed out waiting 766s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 8 |
| `categories file too large` (quiet) | 2 | shard 4 |
| `categories nulByte` (quiet) | 2 | shard 4 |
| `categories unknownColumn` (quiet) | 2 | shard 4 |
| `countries badHeader` (quiet) | 2 | shard 4 |
| `countries nulByte` (quiet) | 2 | shard 4 |
| `countries tooManyRows` (quiet) | 2 | shard 4 |
| `countries unknownColumn` (quiet) | 2 | shard 4 |
| `countries wrongFile` (quiet) | 2 | shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 4 |
| `definitions tooManyRows` (quiet) | 2 | shard 4 |
| `definitions unknownColumn` (quiet) | 2 | shard 4 |
| `links unknownColumn` (quiet) | 2 | shard 4 |
| `locations badHeader` (quiet) | 2 | shard 4 |
| `locations file too large` (quiet) | 2 | shard 4 |
| `locations nulByte` (quiet) | 2 | shard 4 |
| `locations unknownColumn` (quiet) | 2 | shard 4 |
| `locations wrongFile` (quiet) | 2 | shard 4 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-25T01:43:13.889Z | 7.4 min |
| email | 2026-11-25T01:42:32.462Z | 0.3 min |
| webkit | 2026-11-25T01:43:26.852Z | 10.2 min |
| shard 1 | 2026-11-25T01:43:14.386Z | 6.2 min |
| shard 2 | 2026-11-25T01:43:09.449Z | 12.0 min |
| shard 3 | 2026-11-25T01:43:00.630Z | 7.2 min |
| shard 4 | 2026-11-25T01:48:25.783Z | 12.1 min |
| shard 5 | 2026-11-25T01:43:08.162Z | 8.8 min |
| shard 6 | 2026-11-25T01:42:44.141Z | 14.8 min |
| shard 7 | 2026-11-25T01:43:14.463Z | 24.9 min |
| shard 8 | 2026-11-25T01:43:12.091Z | 20.3 min |
| shard 9 | 2026-11-25T01:42:33.607Z | 12.1 min |
| shard 10 | 2026-11-25T01:44:36.099Z | 21.1 min |
| shard 11 | 2026-11-25T01:44:18.625Z | 6.4 min |
| shard 12 | 2026-11-25T01:43:07.616Z | 6.0 min |
| shard 13 | 2026-11-25T01:43:10.643Z | 12.5 min |
| shard 14 | 2026-11-25T01:42:28.333Z | 20.1 min |
| shard 15 | 2026-11-25T01:46:37.041Z | 15.6 min |
| shard 16 | 2026-11-25T01:45:05.577Z | 6.1 min |
| repeat | 2026-11-25T01:43:23.071Z | 12.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-attributes-editor.spec.ts` | 108 | 27.2 min | shard 14, repeat |
| `admin-listings.spec.ts` | 82 | 26.3 min | webkit, shard 10 |
| `legal-admin.spec.ts` | 44 | 21.7 min | shard 7 |
| `admin-screening.spec.ts` | 64 | 21.3 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 20.9 min | shard 15 |
| `admin-translations-console.spec.ts` | 46 | 19.3 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.4 min | shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 16.7 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 15.6 min | shard 13 |
| `admin-locations.spec.ts` | 44 | 14.7 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 13.0 min | smoke, shard 10 |
| `admin-roles.spec.ts` | 28 | 11.9 min | shard 9 |
| `import-security.spec.ts` | 36 | 11.9 min | shard 4 |
| `shell.spec.ts` | 234 | 10.7 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.0 min | shard 7 |
| `legal-doors.spec.ts` | 34 | 9.0 min | smoke, shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 7.1 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 6.8 min | shard 6 |
| `admin-translations-governance.spec.ts` | 20 | 6.5 min | smoke, shard 16 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `admin-guides.spec.ts` | 14 | 4.7 min | shard 3 |
| `dialogs.spec.ts` | 36 | 4.6 min | webkit, shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.4 min | shard 3 |
| `ad-page.spec.ts` | 104 | 4.4 min | webkit, shard 13 |
| `post-wizard-place.spec.ts` | 40 | 4.2 min | shard 11 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-categories-home.spec.ts` | 10 | 4.0 min | shard 4 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 16 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 16 |
| `admin-translations-data.spec.ts` | 10 | 3.7 min | shard 5 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 12 |
| `choice-lists.spec.ts` | 96 | 3.4 min | shard 7 |
| `mfa-stepup.spec.ts` | 28 | 3.1 min | webkit, shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `post-wizard-category.spec.ts` | 54 | 2.6 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.2 min | shard 6 |
| `admin-services.spec.ts` | 10 | 2.2 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 2.2 min | smoke, shard 9 |
| `posting-routes.spec.ts` | 80 | 1.9 min | shard 2 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `breadcrumbs.spec.ts` | 6 | 1.6 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 2 |
| `my-listings-doors.spec.ts` | 28 | 1.3 min | shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.2 min | webkit, shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 1.1 min | shard 16 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.0 min | shard 15 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 3 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `ad-page-doors.spec.ts` | 90 | 0.9 min | shard 5, repeat |
| `posting-routes-dials.spec.ts` | 14 | 0.9 min | shard 15 |
| `overlays.spec.ts` | 8 | 0.9 min | shard 11 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.8 min | shard 12 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 16 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 14 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 1 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 13 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 6 |
| `settings.spec.ts` | 16 | 0.5 min | shard 4 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 7 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 3 |
| `staff-gate.spec.ts` | 4 | 0.4 min | shard 4 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 9 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-units.spec.ts` | 4 | 0.4 min | shard 1 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 5 |
| `post-wizard-details.spec.ts` | 8 | 0.3 min | shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 10 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `page-head.spec.ts` | 4 | 0.3 min | shard 3 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 7 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 8 |
| `shell-table-law.spec.ts` | 6 | 0.2 min | shard 16, repeat |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 10 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 13 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 5 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 10 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 14 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 15 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 8 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 8 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `locale-format.spec.ts` | 2 | 0.0 min | shard 2 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 88.9 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 68.2 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 60.0 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 58.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 58.7 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 58.5 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 55.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 49.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 46.8 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 46.7 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 46.1 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 45.5 s |
| `admin-monetisation.spec.ts` › MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark | mobile-360 | 45.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45527306417-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45527306417-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45527306417-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 26 (pool 2, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45527306417-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 30 user(s) owned by process 45527306417-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45527306417-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 19 (pool 4, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45527306417-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45527306417-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45527306417-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 3, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45527306417-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45527306417-local-16
```

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).
