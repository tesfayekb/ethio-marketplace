# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37600492635 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37600492635
- Commit: `d1a4f475666c639214bcb67d395a1a2665124f26`
- Attempt: 1
- Written (UTC): 2026-10-07T09:56:10.636Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 8

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-34 removed held question is released by autosave and strict route save — Error: {"error":"not signed in"}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-77 an import whose end state asks a child first is refused whole at the commit — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-98 the item tick sits on the city line, fresh and prefilled — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

   at global-setup.ts:231

  229 |   const text = await response.text();
  230 |   if (!response.ok) {
> 231 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  232 |   }
  233 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  234 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:231:11)
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:705:17)
    at useJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:824:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-safety.spec.ts:287:5
```

Context: context file not found for `admin-attributes-safety-Bundle-7-attribute-safety-AT-75-the-import-preview-names-the-holders-of-an-unlinked-question-and-a-removed-answer-mobile-360`

### admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e146]:
            - generic [ref=e147]: About
          - listitem [ref=e148]:
            - generic [ref=e149]: How it works
      - navigation "Help" [ref=e150]:
        - heading "Help" [level=2] [ref=e151]
        - list [ref=e152]:
          - listitem [ref=e153]:
            - generic [ref=e154]: Safety
          - listitem [ref=e155]:
            - generic [ref=e156]: Contact
      - navigation "Legal" [ref=e157]:
        - heading "Legal" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - generic [ref=e161]: Terms
          - listitem [ref=e162]:
            - generic [ref=e163]: Privacy
    - paragraph [ref=e165]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: draft refused: {"error":"not signed in"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: undefined

  157 |       { token, country: "ET" },
  158 |     );
> 159 |     expect(draft.payload["ok"], `draft refused: ${JSON.stringify(draft.payload)}`).toBe(true);
      |                                                                                    ^
  160 |     const listingId = String(draft.payload["listing_id"] ?? "");
  161 |     expect(listingId, "no draft id").not.toBe("");
  162 |     objects.push({ userId, listingId });
    at openDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:159:84)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:520:5
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-148-Next-refuses-at-the-empty-name-box-public-name-first-and-last-for-a-person-business-name-for-a-business-bundle-4-step-22-INC-423-mobile-360`

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-34 removed held question is released by autosave and strict route save

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"error":"not signed in"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
--- further error 1 ---
Error: {"error":"not signed in"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401

  66 |   async function save(page: Page, token: string, body: Record<string, unknown>) {
  67 |     const answer = await postRoute(page, DRAFT, body, { token, country: "ET" });
> 68 |     expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
     |                                                           ^
  69 |     return answer.payload;
  70 |   }
  71 |   async function attrs(id: string) {
    at save (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:68:59)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:118:19
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-77 an import whose end state asks a child first is refused whole at the commit

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import attributes" [ref=e2]:
    - heading "Import attributes" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import attributes
      - paragraph [ref=e6]: Choose the two files you exported. Nothing is written until you confirm the preview.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 2 added · 0 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused
      - status [ref=e9]: Import applied — 2 changes written
      - generic [ref=e10]:
        - button "Undo last import" [disabled]
        - button "Close" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

### admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
--- further error 1 ---
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================

   at helpers/ui.ts:335

  333 |
  334 |   // 1. The route the auth screen navigates to on password success.
> 335 |   await page.waitForURL(/\/$/, { timeout: 15000 });
      |              ^
  336 |   // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  337 |   //    the authenticated branch of app-header (stable testid, no hover/open
  338 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:335:14)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:445:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:96:5
```

Context:

```text
          - listitem [ref=e256]:
            - generic [ref=e257]: About
          - listitem [ref=e258]:
            - generic [ref=e259]: How it works
      - navigation "Help" [ref=e260]:
        - heading "Help" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Safety
          - listitem [ref=e265]:
            - generic [ref=e266]: Contact
      - navigation "Legal" [ref=e267]:
        - heading "Legal" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - generic [ref=e271]: Terms
          - listitem [ref=e272]:
            - generic [ref=e273]: Privacy
    - paragraph [ref=e275]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save

- Source: `shard 5`
- Project: `desktop-1280`

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


  383 |     expect((await identityOf(user.id)).alias, "PW-130: checking claimed the name").toBe(before);
  384 |     await page.getByTestId("post-next").click();
> 385 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  386 |     expect((await identityOf(user.id)).alias, "PW-130: saving did not claim the name").toBe(picked);
  387 |   });
  388 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:385:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-130-a-refused-seller-name-offers-three-free-names-claimed-on-save-desktop-1280`

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-98 the item tick sits on the city line, fresh and prefilled

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-6')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-6')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-6')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-6')


  124 |     await gotoReady(page, `/post/${listingId}`);
  125 |     // D39 — a fresh visit opens at the first unfinished step: 5 is saved, so 6.
> 126 |     await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  127 |     return listingId;
  128 |   }
  129 |
    at openAtStep6 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:126:51)
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-98-the-item-tick-sits-on-the-city-line-fresh-and-prefilled-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 38 message(s): 2 off the allowlist, 36 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 5, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `not signed in {}` | 3 | shard 2, shard 3, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>re<n>t: e<n>e_par_qi<n>zqb → e<n>e_chi_<n>xts<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ssguom: e<n>e_par_<n>fsrq → e<n>e_chi_y<n>ql<n>j` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ttuzmj: e<n>e_par_<n>tadp<n> → e<n>e_chi_rlutzg` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>re<n>t: e<n>e_par_qi<n>zqb → e<n>e_chi_<n>xts<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ssguom: e<n>e_par_<n>fsrq → e<n>e_chi_y<n>ql<n>j ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ttuzmj: e<n>e_par_<n>tadp<n> → e<n>e_chi_rlutzg ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### not signed in {}

- Count: 3 · Sources: shard 2, shard 3, shard 5

```text
[WebServer] [ssr-error] /api/listings/draft not signed in {}
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-07T09:28:57.956Z | 16.9 min |
| email | 2026-10-07T09:29:02.887Z | 0.2 min |
| shard 1 | 2026-10-07T09:28:57.844Z | 26.9 min |
| shard 2 | 2026-10-07T09:29:04.015Z | 25.1 min |
| shard 3 | 2026-10-07T09:28:48.595Z | 19.1 min |
| shard 4 | 2026-10-07T09:29:21.062Z | 23.6 min |
| shard 5 | 2026-10-07T09:29:14.622Z | 26.2 min |
| shard 6 | 2026-10-07T09:28:54.714Z | 21.3 min |
| changed | 2026-10-07T09:29:24.131Z | 7.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 25.5 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 60 | 23.3 min | shard 3, shard 6, changed |
| `post-wizard-bundle2.spec.ts` | 60 | 19.6 min | shard 2, shard 5 |
| `shell.spec.ts` | 252 | 18.6 min | smoke, shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 13.9 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 12.4 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 11.2 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 11.2 min | smoke, shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 10.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 10.3 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 9.7 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.7 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 9.0 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 8.8 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 8.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 7.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 7.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 6.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 36 | 6.1 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 38 | 5.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.8 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 14 | 4.5 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.0 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 2.6 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 2.2 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.1 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 12 | 1.4 min | shard 2, shard 5, changed |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `posting-routes-identity.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.4 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 104.4 s |
| `post-wizard-bundle2.spec.ts` › PW-130 a refused seller name offers three free names, claimed on save | desktop-1280 | 92.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 90.4 s |
| `post-wizard-bundle2.spec.ts` › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423) | mobile-360 | 89.9 s |
| `admin-categories-console.spec.ts` › CT-1 gating: a plain user is refused; the section renders for an admin | desktop-1280 | 85.5 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | mobile-360 | 85.4 s |
| `admin-attributes-safety.spec.ts` › AT-77 an import whose end state asks a child first is refused whole at the commit | desktop-1280 | 83.7 s |
| `posting-routes-catalog.spec.ts` › PR-34 removed held question is released by autosave and strict route save | mobile-360 | 79.3 s |
| `post-wizard-specs.spec.ts` › PW-43 a fact prefills a sibling the same selection unhides | desktop-1280 | 70.6 s |
| `post-wizard-specs.spec.ts` › PW-158 a pointer to a category that is gone draws nothing and no braces | mobile-360 | 61.2 s |
| `admin-attributes-safety.spec.ts` › AT-75 the import preview names the holders of an unlinked question and a removed answer | mobile-360 | 60.7 s |
| `post-wizard-category.spec.ts` › PW-2 search-to-leaf chooses a category and creates the draft at once | mobile-360 | 50.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 50.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 50.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 50.0 s |
