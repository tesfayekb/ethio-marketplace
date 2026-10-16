# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38926883911
- Commit: `ae3ce4e00620004ec9ec6d770990998eb225f587`
- Attempt: 1
- Written (UTC): 2026-10-16T16:39:44.575Z
- Passed: 2021 · Skipped: 129 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-156 with no place, market or confirmed home, {country} reads the fallback words — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `changed` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed

## Flaky bodies (DEC-078)

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-156 with no place, market or confirmed home, {country} reads the fallback words

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
  154 |       // AUTO-ADVANCE: the leaf IS the answer; D39 — specifications open next.
  155 |       await expect(page.getByTestId("post-step-3")).toBeVisible();
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-156-with-no-place-market-or-confirmed-home-country-reads-the-fallback-words-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--f2ae2-ry-reads-the-fallback-words-desktop-1280`; this run carried 3 context file(s); of the same spec: none

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-where-region')
    - locator resolved to <select id="post-where-region" data-testid="post-where-region" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    124 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms


  1119 |       await expect(page.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
```

Context:

```text
          - listitem [ref=e260]:
            - generic [ref=e261]: About
          - listitem [ref=e262]:
            - generic [ref=e263]: How it works
      - navigation "Help" [ref=e264]:
        - heading "Help" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Safety
          - listitem [ref=e269]:
            - generic [ref=e270]: Contact
      - navigation "Legal" [ref=e271]:
        - heading "Legal" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Terms
          - listitem [ref=e276]:
            - generic [ref=e277]: Privacy
    - paragraph [ref=e279]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "0bc2e3f4-feca-45ad-849b-ac922f98f433"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "0bc2e3f4-feca-45ad-849b-ac922f98f433"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1283 |     await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
  1284 |     const city = page.getByTestId("post-where-city");
> 1285 |     await expect(city).toHaveValue(A.cityId, { timeout: 15000 });
       |                        ^
  1286 |
  1287 |     // Another region, no city chosen: Save changes is drawn closed.
  1288 |     await page.getByTestId("post-where-region").selectOption(second.region.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1285:24
```

Context:

```text
          - listitem [ref=e242]:
            - generic [ref=e243]: About
          - listitem [ref=e244]:
            - generic [ref=e245]: How it works
      - navigation "Help" [ref=e246]:
        - heading "Help" [level=2] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - generic [ref=e250]: Safety
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Legal" [ref=e253]:
        - heading "Legal" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Terms
          - listitem [ref=e258]:
            - generic [ref=e259]: Privacy
    - paragraph [ref=e261]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "d20f91a0-8901-4df7-9a54-0074c035dac0"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "d20f91a0-8901-4df7-9a54-0074c035dac0"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1283 |     await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
  1284 |     const city = page.getByTestId("post-where-city");
> 1285 |     await expect(city).toHaveValue(A.cityId, { timeout: 15000 });
       |                        ^
  1286 |
  1287 |     // Another region, no city chosen: Save changes is drawn closed.
  1288 |     await page.getByTestId("post-where-region").selectOption(second.region.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1285:24
```

Context:

```text
          - listitem [ref=e303]:
            - generic [ref=e304]: About
          - listitem [ref=e305]:
            - generic [ref=e306]: How it works
      - navigation "Help" [ref=e307]:
        - heading "Help" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - generic [ref=e311]: Safety
          - listitem [ref=e312]:
            - generic [ref=e313]: Contact
      - navigation "Legal" [ref=e314]:
        - heading "Legal" [level=2] [ref=e315]
        - list [ref=e316]:
          - listitem [ref=e317]:
            - generic [ref=e318]: Terms
          - listitem [ref=e319]:
            - generic [ref=e320]: Privacy
    - paragraph [ref=e322]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

125 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 25 | shard 3, shard 6, changed |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>pgfya: e<n>e_par_f<n>s<n> → e<n>e_chi_<n>sfefz` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-uw<n>vl: e<n>e_par_bawc<n> → e<n>e_chi_wwzbsp` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>pgfya: e<n>e_par_f<n>s<n> → e<n>e_chi_<n>sfefz ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-uw<n>vl: e<n>e_par_bawc<n> → e<n>e_chi_wwzbsp ×1

Off the allowlist:

### listing not found

- Count: 25 · Sources: shard 3, shard 6, changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×4 · PW-17 the currency is preselected and searchable by name in one control ×4 · PW-78 a big model list shows its required mark once the brand is chosen (INC-336 ×4 · LY-6 at 360 the open currency list is above the sticky action bar ×3 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-101 a phone number in a free-text answer is refused at its field ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=2 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=1 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=1 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-16T15:56:10.829Z | 17.5 min |
| email | 2026-10-16T15:56:11.576Z | 0.3 min |
| shard 1 | 2026-10-16T15:56:16.350Z | 43.1 min |
| shard 2 | 2026-10-16T15:56:09.693Z | 36.9 min |
| shard 3 | 2026-10-16T15:56:17.155Z | 40.5 min |
| shard 4 | 2026-10-16T15:56:13.388Z | 38.1 min |
| shard 5 | 2026-10-16T15:56:11.427Z | 38.3 min |
| shard 6 | 2026-10-16T15:56:22.371Z | 36.2 min |
| changed | 2026-10-16T15:56:18.228Z | 43.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 164 | 54.1 min | shard 3, shard 6, changed |
| `post-wizard-pricing.spec.ts` | 104 | 42.1 min | shard 3, shard 6, changed |
| `my-listings-ad.spec.ts` | 68 | 31.3 min | shard 2, shard 5, changed |
| `post-wizard-place.spec.ts` | 76 | 29.9 min | shard 3, shard 5, changed |
| `photo-pipeline.spec.ts` | 66 | 26.9 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 60 | 23.6 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 20.3 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.3 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 17.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 84 | 17.2 min | smoke, shard 2, shard 5, changed |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.5 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 15.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 62 | 14.9 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 14.1 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 12.3 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 10.8 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.6 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 8.2 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 7.9 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.8 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 7.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 6.9 min | shard 1, shard 5 |
| `import-security.spec.ts` | 36 | 6.7 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.4 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.3 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 5.2 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.3 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.9 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.4 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 1.2 min | smoke |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 1.0 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.9 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 130.4 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 113.9 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 107.6 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 95.5 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 79.1 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 68.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 66.2 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 65.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 62.4 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 58.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 58.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 56.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 56.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 55.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 53.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38926883911-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38926883911-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 38926883911-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38926883911-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38926883911-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38926883911-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 38926883911-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38926883911-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38926883911-changed
```

## a11y.spec.ts › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y

- Source: `smoke`
- Project: `mobile-360`

```text
Error: [a11y] wizard-5 mobile-360 serious=1 critical=0 serious:color-contrast×1

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1
--- further error 1 ---
Error: [a11y] wizard-5 mobile-360 serious=1 critical=0 serious:color-contrast×1

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1

  41 |   test.info().annotations.push({ type: "a11y", description: `${line}${rules ? ` ${rules}` : ""}` });
  42 |   // DEC-084 gating (2026-09-29): the counts are printed first, then judged.
> 43 |   expect(serious + critical, `${line}${rules ? ` ${rules}` : ""}`).toBe(0);
     |                                                                    ^
  44 | }
  45 |
  46 | test.describe("A11Y SMOKE (DEC-084, gating)", () => {
    at audit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/a11y.spec.ts:43:68)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/a11y.spec.ts:94:5
```

Context: context file not found for `a11y-A11Y-SMOKE-DEC-084-gating-A11Y-2-wizard-steps-1-3-and-5-for-a-scratch-seller-a11y-mobile-360` — Playwright's name `a11y-A11Y-SMOKE-DEC-084-ga-d312d-5-for-a-scratch-seller-a11y-mobile-360`; this run carried 3 context file(s); of the same spec: none

## a11y.spec.ts › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [a11y] wizard-5 desktop-1280 serious=1 critical=0 serious:color-contrast×1

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1
--- further error 1 ---
Error: [a11y] wizard-5 desktop-1280 serious=1 critical=0 serious:color-contrast×1

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1

  41 |   test.info().annotations.push({ type: "a11y", description: `${line}${rules ? ` ${rules}` : ""}` });
  42 |   // DEC-084 gating (2026-09-29): the counts are printed first, then judged.
> 43 |   expect(serious + critical, `${line}${rules ? ` ${rules}` : ""}`).toBe(0);
     |                                                                    ^
  44 | }
  45 |
  46 | test.describe("A11Y SMOKE (DEC-084, gating)", () => {
    at audit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/a11y.spec.ts:43:68)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/a11y.spec.ts:94:5
```

Context: context file not found for `a11y-A11Y-SMOKE-DEC-084-gating-A11Y-2-wizard-steps-1-3-and-5-for-a-scratch-seller-a11y-desktop-1280` — Playwright's name `a11y-A11Y-SMOKE-DEC-084-ga-d312d-5-for-a-scratch-seller-a11y-desktop-1280`; this run carried 3 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  831 |     });
  832 |     await page.getByTestId("post-next").click();
> 833 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
      |     ^
  834 |     await toSpecs("back");
  835 |     await judge("d");
  836 |     await page.unroute("**/api/listings/draft");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:833:5
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 3 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  831 |     });
  832 |     await page.getByTestId("post-next").click();
> 833 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
      |     ^
  834 |     await toSpecs("back");
  835 |     await judge("d");
  836 |     await page.unroute("**/api/listings/draft");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:833:5
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 3 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  831 |     });
  832 |     await page.getByTestId("post-next").click();
> 833 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
      |     ^
  834 |     await toSpecs("back");
  835 |     await judge("d");
  836 |     await page.unroute("**/api/listings/draft");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:833:5
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 3 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  831 |     });
  832 |     await page.getByTestId("post-next").click();
> 833 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
      |     ^
  834 |     await toSpecs("back");
  835 |     await judge("d");
  836 |     await page.unroute("**/api/listings/draft");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:833:5
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_NAME_NOT_RESOLVED
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×11
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
