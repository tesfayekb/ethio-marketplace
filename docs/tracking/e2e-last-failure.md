# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39385861632 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39385861632
- Commit: `7464c799de3a7efbe0f3f2d837aa3b437ea607c8`
- Attempt: 1
- Written (UTC): 2026-10-20T08:40:27.495Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 5
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface — Error: expect(page).toHaveURL(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: FV-1 vehicles level in the menu and the strip
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: FV-1 vehicles level in the menu and the strip
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-screening.spec.ts › ADMIN SCREENING › SC-11 the toolbar: Columns hides a column and remembers it; Filters settles on the ad's market — another market lists none, its own lists it, never an error — and its chip clears — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `changed` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: FV-1 vehicles level in the menu and the strip

## Flaky bodies (DEC-078)

### auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/auth"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/auth"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/auth"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/auth"


  59 |
  60 | async function expectSignedOutMarketplace(page: Page) {
> 61 |   await expect(page).toHaveURL(/\/$/);
     |                      ^
  62 |   await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  63 |   await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);
  64 |   await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toHaveCount(0);
    at expectSignedOutMarketplace (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:61:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:101:11
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `smoke`
- Project: `mobile-360`

```text
Error: FV-1 vehicles level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 vehicles level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3853 |         .toBeLessThanOrEqual(1);
  3854 |       for (const mainSlug of mainSlugs) {
> 3855 |         await expect
       |         ^
  3856 |           .poll(
  3857 |             () =>
  3858 |               gapY(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3855:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3878:3
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

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: FV-1 vehicles level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 vehicles level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3853 |         .toBeLessThanOrEqual(1);
  3854 |       for (const mainSlug of mainSlugs) {
> 3855 |         await expect
       |         ^
  3856 |           .poll(
  3857 |             () =>
  3858 |               gapY(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3855:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3871:3
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

### admin-screening.spec.ts › ADMIN SCREENING › SC-11 the toolbar: Columns hides a column and remembers it; Filters settles on the ad's market — another market lists none, its own lists it, never an error — and its chip clears

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('admin-screening-filter-country-US')
    - locator resolved to <button type="button" aria-pressed="false" data-testid="admin-screening-filter-country-US" class="inline-flex h-10 min-w-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input bg-card font-medium text-foreground shadow-xs hover:bg-accent">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying


  588 |     await page.getByTestId("admin-screening-filters").click();
  589 |     await expect(country("US")).toHaveCount(1);
> 590 |     await country("US").click();
      |                         ^
  591 |     await page.keyboard.press("Escape");
  592 |     await expect(page.getByTestId("admin-screening-filters-count")).toHaveText("1");
  593 |     await expect(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:590:25
```

Context:

```text
          - listitem [ref=e363]:
            - generic [ref=e364]: About
          - listitem [ref=e365]:
            - generic [ref=e366]: Contact
      - navigation "Help" [ref=e367]:
        - heading "Help" [level=2] [ref=e368]
        - list [ref=e369]:
          - listitem [ref=e370]:
            - generic [ref=e371]: Safety
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - link "Terms" [ref=e376] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e377]:
            - link "Privacy" [ref=e378] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `changed`
- Project: `mobile-360`

```text
Error: FV-1 vehicles level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 vehicles level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3853 |         .toBeLessThanOrEqual(1);
  3854 |       for (const mainSlug of mainSlugs) {
> 3855 |         await expect
       |         ^
  3856 |           .poll(
  3857 |             () =>
  3858 |               gapY(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3855:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3875:3
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

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

113 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 3 | shard 1, shard 3 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-s<n>kj<n>: e<n>e_par_<n>rj<n> → e<n>e_chi_sba<n>cp` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wqzja<n>: e<n>e_par_gbd<n>g<n> → e<n>e_chi_x<n>c<n>kq` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-s<n>kj<n>: e<n>e_par_<n>rj<n> → e<n>e_chi_sba<n>cp ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wqzja<n>: e<n>e_par_gbd<n>g<n> → e<n>e_chi_x<n>c<n>kq ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · admin tables never overflow horizontally ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 3 · Sources: shard 1, shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): LS-11 picking a second market renders its own tree and saves its own node ×2 · PR-53 a seller or business name one letter off a protected organisation's name i ×2 · AL-7 Remove, then Restore: back to Waiting, never straight to live; each move lo ×1 · LT-3 create chain: region → city → sub-city are born retired with their ancestry ×1

```text
[WebServer] [ssr-error] /api/categories/tree Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T07:49:37.849Z | 20.6 min |
| email | 2026-10-20T07:49:39.674Z | 0.2 min |
| shard 1 | 2026-10-20T07:49:37.938Z | 42.2 min |
| shard 2 | 2026-10-20T07:49:42.210Z | 47.2 min |
| shard 3 | 2026-10-20T07:49:36.768Z | 34.5 min |
| shard 4 | 2026-10-20T07:49:45.128Z | 50.3 min |
| shard 5 | 2026-10-20T07:49:44.839Z | 49.2 min |
| shard 6 | 2026-10-20T07:49:37.961Z | 36.9 min |
| changed | 2026-10-20T07:49:39.589Z | 13.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 636 | 40.0 min | smoke, shard 3, shard 6, changed |
| `ad-page.spec.ts` | 68 | 28.5 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 24.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.5 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 18.0 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 17.1 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 16.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 16.1 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 15.7 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.9 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 14.9 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 13.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 13.6 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 13.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.1 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.9 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.6 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.2 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 56 | 11.0 min | shard 2, shard 5, changed |
| `post-wizard-where.spec.ts` | 32 | 10.8 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 28 | 10.2 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.3 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 26 | 9.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 9.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.6 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.6 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.5 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 7.3 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 7.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.5 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.3 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `legal-accept.spec.ts` | 16 | 4.3 min | shard 2, shard 5, changed |
| `admin-audit.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.3 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 12 | 2.0 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.5 min | shard 1, shard 4 |
| `legal-history.spec.ts` | 6 | 1.5 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-11 the toolbar: Columns hides a column and remembers it; Filters settles on the ad's market — another market lists none, its own lists it, never an error — and its chip clears | desktop-1280 | 76.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 53.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 51.0 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 49.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 49.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 49.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 49.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 49.0 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | desktop-1280 | 48.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 46.5 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 46.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.2 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 46.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 45.9 s |
