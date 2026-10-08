# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37739830404
- Commit: `03f41795d62d92f681065aedbba3da01a6c4222c`
- Attempt: 1
- Written (UTC): 2026-10-08T07:20:43.921Z
- Passed: 1333 · Skipped: 110 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 6
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › mobile chrome › the strip sits under the fixed bar — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › mobile chrome › the bottom bar, signed in — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › the bottom bar, signed in — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused

## Flaky bodies (DEC-078)

### shell.spec.ts › mobile chrome › the strip sits under the fixed bar

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    30
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    30

  864 |     }
  865 |     const scroll = page.getByTestId("strip-scroll");
> 866 |     expect(await scroll.evaluate((el) => el.scrollHeight - el.clientHeight)).toBeLessThanOrEqual(1);
      |                                                                              ^
  867 |     const rows = await scroll
  868 |       .locator("li > a")
  869 |       .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:866:78
```

Context:

```text
          - listitem [ref=e232]:
            - generic [ref=e233]: About
          - listitem [ref=e234]:
            - generic [ref=e235]: How it works
      - navigation "Help" [ref=e236]:
        - heading "Help" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Safety
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Terms
          - listitem [ref=e248]:
            - generic [ref=e249]: Privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › mobile chrome › the bottom bar, signed in

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strip-item-ml-listings')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('strip-item-ml-listings')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strip-item-ml-listings')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('strip-item-ml-listings')


  1112 |     await expect(page.getByTestId("bottom-bar-account")).toHaveAttribute("aria-current", "page");
  1113 |     await page.getByTestId("bottom-bar-my-listings").click();
> 1114 |     await expect(page.getByTestId("strip-item-ml-listings")).toBeVisible({ timeout: 15000 });
       |                                                              ^
  1115 |     await expect(page.getByTestId("bottom-bar-my-listings")).toHaveAttribute(
  1116 |       "aria-current",
  1117 |       "page",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1114:62
```

Context:

```text
          - listitem [ref=e191]:
            - generic [ref=e192]: About
          - listitem [ref=e193]:
            - generic [ref=e194]: How it works
      - navigation "Help" [ref=e195]:
        - heading "Help" [level=2] [ref=e196]
        - list [ref=e197]:
          - listitem [ref=e198]:
            - generic [ref=e199]: Safety
          - listitem [ref=e200]:
            - generic [ref=e201]: Contact
      - navigation "Legal" [ref=e202]:
        - heading "Legal" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Terms
          - listitem [ref=e207]:
            - generic [ref=e208]: Privacy
    - paragraph [ref=e210]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1407 |       const mark = calls.length;
  1408 |       await page.getByTestId("post-next").click();
> 1409 |       await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                     ^
  1410 |       expect(calls.length - mark, `PW-144: pass ${pass} with nothing changed called identity`).toBe(
  1411 |         0,
  1412 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1409:53
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-mobile-360`

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 3`
- Project: `mobile-360`

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


  1020 |       await assertKept("before");
  1021 |       await nextThroughPhotos(page);
> 1022 |       await expect(page.getByTestId("post-step-4")).toBeVisible();
       |                                                     ^
  1023 |       for (const step of [2, 3]) {
  1024 |         await page.getByTestId("post-back").click();
  1025 |         await expect(page.getByTestId(`post-step-${step}`)).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:1022:53
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-mobile-360`

### shell.spec.ts › mobile chrome › the bottom bar, signed in

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strip-item-ml-listings')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('strip-item-ml-listings')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strip-item-ml-listings')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('strip-item-ml-listings')


  1112 |     await expect(page.getByTestId("bottom-bar-account")).toHaveAttribute("aria-current", "page");
  1113 |     await page.getByTestId("bottom-bar-my-listings").click();
> 1114 |     await expect(page.getByTestId("strip-item-ml-listings")).toBeVisible({ timeout: 15000 });
       |                                                              ^
  1115 |     await expect(page.getByTestId("bottom-bar-my-listings")).toHaveAttribute(
  1116 |       "aria-current",
  1117 |       "page",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1114:62
```

Context:

```text
          - listitem [ref=e191]:
            - generic [ref=e192]: About
          - listitem [ref=e193]:
            - generic [ref=e194]: How it works
      - navigation "Help" [ref=e195]:
        - heading "Help" [level=2] [ref=e196]
        - list [ref=e197]:
          - listitem [ref=e198]:
            - generic [ref=e199]: Safety
          - listitem [ref=e200]:
            - generic [ref=e201]: Contact
      - navigation "Legal" [ref=e202]:
        - heading "Legal" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Terms
          - listitem [ref=e207]:
            - generic [ref=e208]: Privacy
    - paragraph [ref=e210]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 16,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 16,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }

  855 |       { adds, changes, retires, reactivations, deletes, refused },
  856 |       `CT-18 the round trip was not a no-op: ${await counts.textContent()}`,
> 857 |     ).toEqual({ adds: 0, changes: 0, retires: 0, reactivations: 0, deletes: 0, refused: 0 });
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
      - status [ref=e8]: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

107 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 2, shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>wnb<n>: e<n>e_par_fl<n>idi → e<n>e_chi_dx<n>t<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-w<n>i<n>yp: e<n>e_par_<n>b<n>o → e<n>e_chi_tevfmp` (quiet) | 1 | shard 1 |
| `TimeoutError: The operation timed out.` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>wnb<n>: e<n>e_par_fl<n>idi → e<n>e_chi_dx<n>t<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-w<n>i<n>yp: e<n>e_par_<n>b<n>o → e<n>e_chi_tevfmp ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 2, shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### TimeoutError: The operation timed out.

- Count: 1 · Sources: shard 4

```text
[WebServer] [ssr-error] /api/i18n TimeoutError: The operation timed out.
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-08T06:52:24.140Z | 15.5 min |
| email | 2026-10-08T06:52:16.016Z | 0.2 min |
| shard 1 | 2026-10-08T06:52:11.934Z | 24.2 min |
| shard 2 | 2026-10-08T06:52:20.022Z | 19.5 min |
| shard 3 | 2026-10-08T06:52:20.831Z | 24.6 min |
| shard 4 | 2026-10-08T06:52:08.134Z | 22.7 min |
| shard 5 | 2026-10-08T06:52:30.867Z | 27.8 min |
| shard 6 | 2026-10-08T06:52:08.776Z | 15.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 24.9 min | shard 3, shard 6 |
| `shell.spec.ts` | 316 | 18.8 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 17.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 11.2 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 11.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 48 | 11.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 11.1 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 10.7 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 10.7 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 9.7 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.4 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.9 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.9 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.3 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.3 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 6.2 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 5.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.2 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.9 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 2.4 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 1.0 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `phone-frame.spec.ts` | 8 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 77.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.3 s |
| `post-wizard-bundle2.spec.ts` › PW-144 leaving the contact step makes one identity call, or none when nothing changed | mobile-360 | 53.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 53.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 50.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 50.4 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 49.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 47.2 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | desktop-1280 | 45.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 45.4 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 43.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 42.5 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 42.2 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 42.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37739830404-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37739830404-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37739830404-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 37739830404-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37739830404-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37739830404-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37739830404-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37739830404-6
```

## shell.spec.ts › app shell › footer columns are centred as a group and each is centred

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    16
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    16

  485 |       const startSlack = group.x + padding.start - 48;
  486 |       const endSlack = page_width - (group.x + group.width - padding.end);
> 487 |       expect(Math.abs(startSlack - endSlack)).toBeLessThanOrEqual(2);
      |                                               ^
  488 |     }
  489 |     // Each column centres its own content.
  490 |     const alignments = await columns
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:487:47
```

Context:

```text
          - listitem [ref=e109]:
            - generic [ref=e110]: About
          - listitem [ref=e111]:
            - generic [ref=e112]: How it works
      - navigation "Help" [ref=e113]:
        - heading "Help" [level=2] [ref=e114]
        - list [ref=e115]:
          - listitem [ref=e116]:
            - generic [ref=e117]: Safety
          - listitem [ref=e118]:
            - generic [ref=e119]: Contact
      - navigation "Legal" [ref=e120]:
        - heading "Legal" [level=2] [ref=e121]
        - list [ref=e122]:
          - listitem [ref=e123]:
            - generic [ref=e124]: Terms
          - listitem [ref=e125]:
            - generic [ref=e126]: Privacy
    - paragraph [ref=e128]: © 2026 ethio.com — All rights reserved.
```
```

## settings.spec.ts › S-3 (U-4): wrong current password is rejected; correct one rotates the password

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Account menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: 'Account menu' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Account menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: 'Account menu' })


  75 |   // Session intact: the header account menu (the shell's authenticated-branch
  76 |   // control, successor to the old header sign-out button) is still present.
> 77 |   await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toBeVisible();
     |                                                                             ^
  78 |
  79 |   // Correct current password: success feedback.
  80 |   await current.fill(user.password);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/settings.spec.ts:77:77
```

Context:

```text
          - listitem [ref=e205]:
            - generic [ref=e206]: About
          - listitem [ref=e207]:
            - generic [ref=e208]: How it works
      - navigation "Help" [ref=e209]:
        - heading "Help" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Safety
          - listitem [ref=e214]:
            - generic [ref=e215]: Contact
      - navigation "Legal" [ref=e216]:
        - heading "Legal" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Terms
          - listitem [ref=e221]:
            - generic [ref=e222]: Privacy
    - paragraph [ref=e224]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › footer columns are centred as a group and each is centred

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    16
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    16

  485 |       const startSlack = group.x + padding.start - 48;
  486 |       const endSlack = page_width - (group.x + group.width - padding.end);
> 487 |       expect(Math.abs(startSlack - endSlack)).toBeLessThanOrEqual(2);
      |                                               ^
  488 |     }
  489 |     // Each column centres its own content.
  490 |     const alignments = await columns
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:487:47
```

Context:

```text
          - listitem [ref=e109]:
            - generic [ref=e110]: About
          - listitem [ref=e111]:
            - generic [ref=e112]: How it works
      - navigation "Help" [ref=e113]:
        - heading "Help" [level=2] [ref=e114]
        - list [ref=e115]:
          - listitem [ref=e116]:
            - generic [ref=e117]: Safety
          - listitem [ref=e118]:
            - generic [ref=e119]: Contact
      - navigation "Legal" [ref=e120]:
        - heading "Legal" [level=2] [ref=e121]
        - list [ref=e122]:
          - listitem [ref=e123]:
            - generic [ref=e124]: Terms
          - listitem [ref=e125]:
            - generic [ref=e126]: Privacy
    - paragraph [ref=e128]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
```
