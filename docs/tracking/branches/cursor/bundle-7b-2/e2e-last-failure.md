# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45736662097
- Commit: `e8a71284973c65aaacf8e4250b31ae6a2a6da3ff`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-da1841007b67… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-26T02:18:48.425Z
- Passed: 2612 · Skipped: 360 · Failed: 6
- Gating failures: 6 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Gating failures

### admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-foreground"></p>
       - unexpected value ""

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-foreground"></p>
       - unexpected value ""


  263 |     await page.getByTestId("admin-screening-confirm-go").click();
  264 |     await stepUpIfPrompted(page, secret);
> 265 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  266 |       en["admin.screening.rejected"],
  267 |       { timeout: 20000 },
```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - alertdialog "Reject this ad?" [ref=e2]:
    - generic [ref=e4]:
      - img [ref=e6]
      - generic [ref=e8]:
        - heading "Reject this ad?" [level=2] [ref=e9]
        - paragraph [ref=e10]: It stays off the site.
    - generic [ref=e12]:
      - generic [ref=e13]:
        - img [ref=e17]
        - generic [ref=e24]:
          - paragraph [ref=e25]: e2e-screen-local-14-cdvhlj
          - paragraph [ref=e26]: —
          - paragraph [ref=e27]: e2e-loc-local-14-1-ls-city-2u5cpi
      - alert [ref=e28]: Something went wrong
    - generic [ref=e29]:
      - button "Cancel" [ref=e30] [cursor=pointer]
      - button "Reject" [ref=e31] [cursor=pointer]
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-14 Reject at the foot of the preview closes it and keeps the ad off

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-foreground"></p>
       - unexpected value ""

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-foreground"></p>
       - unexpected value ""


  712 |     await page.getByTestId("admin-screening-confirm-go").click();
  713 |     await stepUpIfPrompted(page, secret);
> 714 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  715 |       en["admin.screening.rejected"],
  716 |       { timeout: 20000 },
```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - alertdialog "Reject this ad?" [ref=e2]:
    - generic [ref=e4]:
      - img [ref=e6]
      - generic [ref=e8]:
        - heading "Reject this ad?" [level=2] [ref=e9]
        - paragraph [ref=e10]: It stays off the site.
    - generic [ref=e12]:
      - generic [ref=e13]:
        - img [ref=e17]
        - generic [ref=e24]:
          - paragraph [ref=e25]: e2e-screen-local-14-el1mlw
          - paragraph [ref=e26]: —
          - paragraph [ref=e27]: e2e-loc-local-14-3-ls-city-9m4ako
      - alert [ref=e28]: Something went wrong
    - generic [ref=e29]:
      - button "Cancel" [ref=e30] [cursor=pointer]
      - button "Reject" [ref=e31] [cursor=pointer]
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "/admin/screening"
Received: "/admin/listings/[account id]/edit"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "/admin/screening"
Received: "/admin/listings/[account id]/edit"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1450 |     await page.getByTestId("post-edit-confirm-go").click();
  1451 |     await stepUpIfPrompted(page, secret);
> 1452 |     await expect
       |     ^
  1453 |       .poll(() => new URL(page.url()).pathname, { timeout: 20000 })
  1454 |       .toBe("/admin/screening");
  1455 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:1452:5
```

Context:

```text
          - listitem [ref=e459]:
            - generic [ref=e460]: About
          - listitem [ref=e461]:
            - generic [ref=e462]: Contact
      - navigation "Help" [ref=e463]:
        - heading "Help" [level=2] [ref=e464]
        - list [ref=e465]:
          - listitem [ref=e466]:
            - generic [ref=e467]: Safety
      - navigation "Legal" [ref=e468]:
        - heading "Legal" [level=2] [ref=e469]
        - list [ref=e470]:
          - listitem [ref=e471]:
            - link "Terms" [ref=e472] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e473]:
            - link "Privacy" [ref=e474] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e476]: © 2026 ethio.com — All rights reserved.
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-foreground"></p>
       - unexpected value ""

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-foreground"></p>
       - unexpected value ""


  263 |     await page.getByTestId("admin-screening-confirm-go").click();
  264 |     await stepUpIfPrompted(page, secret);
> 265 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  266 |       en["admin.screening.rejected"],
  267 |       { timeout: 20000 },
```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - alertdialog "Reject this ad?" [ref=e2]:
    - generic [ref=e4]:
      - img [ref=e6]
      - generic [ref=e8]:
        - heading "Reject this ad?" [level=2] [ref=e9]
        - paragraph [ref=e10]: It stays off the site.
    - generic [ref=e12]:
      - generic [ref=e13]:
        - img [ref=e17]
        - generic [ref=e24]:
          - paragraph [ref=e25]: e2e-screen-local-14-itps5s
          - paragraph [ref=e26]: —
          - paragraph [ref=e27]: e2e-loc-local-14-9-ls-city-1oemrm
      - alert [ref=e28]: Something went wrong
    - generic [ref=e29]:
      - button "Cancel" [ref=e30] [cursor=pointer]
      - button "Reject" [ref=e31] [cursor=pointer]
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-14 Reject at the foot of the preview closes it and keeps the ad off

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-foreground"></p>
       - unexpected value ""

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-foreground"></p>
       - unexpected value ""


  712 |     await page.getByTestId("admin-screening-confirm-go").click();
  713 |     await stepUpIfPrompted(page, secret);
> 714 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  715 |       en["admin.screening.rejected"],
  716 |       { timeout: 20000 },
```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - alertdialog "Reject this ad?" [ref=e2]:
    - generic [ref=e4]:
      - img [ref=e6]
      - generic [ref=e8]:
        - heading "Reject this ad?" [level=2] [ref=e9]
        - paragraph [ref=e10]: It stays off the site.
    - generic [ref=e12]:
      - generic [ref=e13]:
        - img [ref=e17]
        - generic [ref=e24]:
          - paragraph [ref=e25]: e2e-screen-local-14-v21a6u
          - paragraph [ref=e26]: —
          - paragraph [ref=e27]: e2e-loc-local-14-11-ls-city-bb3b4l
      - alert [ref=e28]: Something went wrong
    - generic [ref=e29]:
      - button "Cancel" [ref=e30] [cursor=pointer]
      - button "Reject" [ref=e31] [cursor=pointer]
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "/admin/screening"
Received: "/admin/listings/[account id]/edit"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "/admin/screening"
Received: "/admin/listings/[account id]/edit"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1450 |     await page.getByTestId("post-edit-confirm-go").click();
  1451 |     await stepUpIfPrompted(page, secret);
> 1452 |     await expect
       |     ^
  1453 |       .poll(() => new URL(page.url()).pathname, { timeout: 20000 })
  1454 |       .toBe("/admin/screening");
  1455 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:1452:5
```

Context:

```text
          - listitem [ref=e447]:
            - generic [ref=e448]: About
          - listitem [ref=e449]:
            - generic [ref=e450]: Contact
      - navigation "Help" [ref=e451]:
        - heading "Help" [level=2] [ref=e452]
        - list [ref=e453]:
          - listitem [ref=e454]:
            - generic [ref=e455]: Safety
      - navigation "Legal" [ref=e456]:
        - heading "Legal" [level=2] [ref=e457]
        - list [ref=e458]:
          - listitem [ref=e459]:
            - link "Terms" [ref=e460] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e461]:
            - link "Privacy" [ref=e462] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e464]: © 2026 ethio.com — All rights reserved.
```
```

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 7` · legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish

- Source: `shard 7`
- Project: `mobile-360`

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
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:977:23)
    at staffSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:122:19)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:152:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:1107:7
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-26T01:55:37.616Z | 7.0 min |
| email | 2026-11-26T01:52:39.869Z | 0.3 min |
| webkit | 2026-11-26T01:53:17.048Z | 10.2 min |
| shard 1 | 2026-11-26T01:53:09.894Z | 6.2 min |
| shard 2 | 2026-11-26T01:52:56.643Z | 12.7 min |
| shard 3 | 2026-11-26T01:52:42.922Z | 7.5 min |
| shard 4 | 2026-11-26T01:52:42.165Z | 11.8 min |
| shard 5 | 2026-11-26T01:52:46.505Z | 9.2 min |
| shard 6 | 2026-11-26T01:52:46.013Z | 15.3 min |
| shard 7 | 2026-11-26T01:52:54.306Z | 24.7 min |
| shard 8 | 2026-11-26T01:53:30.223Z | 21.6 min |
| shard 9 | 2026-11-26T01:53:28.002Z | 11.2 min |
| shard 10 | 2026-11-26T01:52:38.855Z | 21.1 min |
| shard 11 | 2026-11-26T01:53:25.760Z | 7.3 min |
| shard 12 | 2026-11-26T01:53:37.752Z | 8.0 min |
| shard 13 | 2026-11-26T01:52:31.821Z | 12.2 min |
| shard 14 | 2026-11-26T01:53:27.528Z | 23.4 min |
| shard 15 | 2026-11-26T01:53:46.965Z | 15.1 min |
| shard 16 | 2026-11-26T01:52:50.015Z | 6.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.3 min | webkit, shard 10 |
| `admin-screening.spec.ts` | 64 | 24.2 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 21.7 min | shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 21.6 min | shard 15 |
| `admin-translations-console.spec.ts` | 46 | 19.4 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.9 min | shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 17.0 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 15.9 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 15.2 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 15.2 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 13.2 min | smoke, shard 10 |
| `import-security.spec.ts` | 36 | 11.6 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 11.1 min | shard 9 |
| `shell.spec.ts` | 234 | 10.7 min | shard 1 |
| `legal-doors.spec.ts` | 34 | 9.0 min | smoke, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 8.8 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 7.2 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.9 min | shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 5.8 min | shard 12 |
| `auth-signout.spec.ts` | 44 | 5.8 min | webkit, shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 5.6 min | smoke, shard 16 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `admin-guides.spec.ts` | 14 | 4.8 min | shard 3 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 3 |
| `post-wizard-where.spec.ts` | 32 | 4.6 min | shard 11 |
| `dialogs.spec.ts` | 36 | 4.6 min | webkit, shard 10 |
| `admin-users.spec.ts` | 28 | 4.5 min | shard 16 |
| `my-listings-ad.spec.ts` | 38 | 4.3 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-translations-data.spec.ts` | 10 | 3.9 min | shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 3.8 min | shard 8 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 4 |
| `mfa-stepup.spec.ts` | 28 | 3.0 min | webkit, shard 15 |
| `name-check-queue.spec.ts` | 8 | 2.9 min | smoke, shard 9 |
| `post-wizard-category.spec.ts` | 54 | 2.7 min | webkit, shard 4 |
| `admin-services.spec.ts` | 10 | 2.4 min | shard 2 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `choice-lists.spec.ts` | 96 | 2.4 min | shard 7 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 2 |
| `legal-certify.spec.ts` | 44 | 2.1 min | shard 14 |
| `admin-audit.spec.ts` | 16 | 2.1 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 11 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 2 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.4 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `house-style.spec.ts` | 18 | 1.2 min | shard 12 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 13 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 8 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `overlays.spec.ts` | 8 | 0.9 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.9 min | shard 11 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 16 |
| `user-guides.spec.ts` | 18 | 0.7 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 14 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `primitives-law.spec.ts` | 24 | 0.7 min | shard 1 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 6 |
| `settings.spec.ts` | 16 | 0.5 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 13 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 9 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 9 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 7 |
| `shell-bands.spec.ts` | 16 | 0.4 min | smoke, shard 11 |
| `submenu.spec.ts` | 14 | 0.4 min | smoke, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 1 |
| `staff-gate.spec.ts` | 4 | 0.3 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 15 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 7 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 10 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 5 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 4 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 1 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 10 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 9 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 8 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 7 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 2 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 15 |
| `rail-first-paint.spec.ts` | 4 | 0.1 min | shard 1 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 88.5 s |
| `admin-screening.spec.ts` › SC-14 Reject at the foot of the preview closes it and keeps the ad off | desktop-1280 | 86.0 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | desktop-1280 | 85.7 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | mobile-360 | 85.7 s |
| `admin-screening.spec.ts` › SC-14 Reject at the foot of the preview closes it and keeps the ad off | mobile-360 | 85.2 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | mobile-360 | 79.1 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | desktop-1280 | 79.1 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 69.3 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 59.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.0 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 58.9 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 54.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45736662097-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45736662097-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45736662097-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 26 (pool 2, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45736662097-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 30 user(s) owned by process 45736662097-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45736662097-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 19 (pool 4, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45736662097-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45736662097-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45736662097-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 3, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45736662097-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45736662097-local-16
```

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

```text
[client-error] console.error: [screening] decision failed ReaderError: badValue:reason at readFailed (http://127.0.0.1:4173/assets/reader-failure-qX-PblX3.js:207:48) at decideListing (http://127.0.0.1:4173/assets/use-screening-D4_YrvRg.js:199:19) at async http://127.0.0.1:4173/assets/step-up-gate-BmlOO1Wz.js:76:12 at async decide (http://127.0.0.1:4173/assets/admin.listings_._listingId_.edit-B-Ynv7H1.js:64:4)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_review_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "badValue:reason", "refusals": [{"detail": "reason", "reason": "badValue"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed ReaderError: badValue:reason at readFailed (http://127.0.0.1:4173/assets/reader-failure-qX-PblX3.js:207:48) at decideListing (http://127.0.0.1:4173/assets/use-screening-D4_YrvRg.js:199:19) at async http://127.0.0.1:4173/assets/admin.screening-Be2to7Bv.js:1378:7 at async http://127.0.0.1:4173/assets/step-up-gate-BmlOO1Wz.js:76:12 at async decide (http://127.0.0.1:4173/assets/admin.screening-Be2to7Bv.js:1376:5)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_review_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "badValue:reason", "refusals": [{"detail": "reason", "reason": "badValue"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed ReaderError: badValue:reason at readFailed (http://127.0.0.1:4173/assets/reader-failure-qX-PblX3.js:207:48) at decideListing (http://127.0.0.1:4173/assets/use-screening-D4_YrvRg.js:199:19) at async http://127.0.0.1:4173/assets/admin.screening-Be2to7Bv.js:1378:7 at async http://127.0.0.1:4173/assets/step-up-gate-BmlOO1Wz.js:76:12 at async decide (http://127.0.0.1:4173/assets/admin.screening-Be2to7Bv.js:1376:5)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_review_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "badValue:reason", "refusals": [{"detail": "reason", "reason": "badValue"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed ReaderError: badValue:reason at readFailed (http://127.0.0.1:4173/assets/reader-failure-qX-PblX3.js:207:48) at decideListing (http://127.0.0.1:4173/assets/use-screening-D4_YrvRg.js:199:19) at async http://127.0.0.1:4173/assets/admin.screening-Be2to7Bv.js:1378:7 at async http://127.0.0.1:4173/assets/step-up-gate-BmlOO1Wz.js:76:12 at async decide (http://127.0.0.1:4173/assets/admin.screening-Be2to7Bv.js:1376:5)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_review_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "badValue:reason", "refusals": [{"detail": "reason", "reason": "badValue"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed ReaderError: badValue:reason at readFailed (http://127.0.0.1:4173/assets/reader-failure-qX-PblX3.js:207:48) at decideListing (http://127.0.0.1:4173/assets/use-screening-D4_YrvRg.js:199:19) at async http://127.0.0.1:4173/assets/admin.screening-Be2to7Bv.js:1378:7 at async http://127.0.0.1:4173/assets/step-up-gate-BmlOO1Wz.js:76:12 at async decide (http://127.0.0.1:4173/assets/admin.screening-Be2to7Bv.js:1376:5)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_review_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "badValue:reason", "refusals": [{"detail": "reason", "reason": "badValue"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed ReaderError: badValue:reason at readFailed (http://127.0.0.1:4173/assets/reader-failure-qX-PblX3.js:207:48) at decideListing (http://127.0.0.1:4173/assets/use-screening-D4_YrvRg.js:199:19) at async http://127.0.0.1:4173/assets/step-up-gate-BmlOO1Wz.js:76:12 at async decide (http://127.0.0.1:4173/assets/admin.listings_._listingId_.edit-B-Ynv7H1.js:64:4)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_review_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "badValue:reason", "refusals": [{"detail": "reason", "reason": "badValue"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed ReaderError: badValue:reason at readFailed (http://127.0.0.1:4173/assets/reader-failure-qX-PblX3.js:207:48) at decideListing (http://127.0.0.1:4173/assets/use-screening-D4_YrvRg.js:199:19) at async http://127.0.0.1:4173/assets/step-up-gate-BmlOO1Wz.js:76:12 at async decide (http://127.0.0.1:4173/assets/admin.listings_._listingId_.edit-B-Ynv7H1.js:64:4)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_review_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "badValue:reason", "refusals": [{"detail": "reason", "reason": "badValue"}]})
```
