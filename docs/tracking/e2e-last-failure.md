# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39163320324
- Commit: `05959c4d789a041efdde97a62c9b97b3689c59e7`
- Attempt: 1
- Written (UTC): 2026-10-18T21:33:27.997Z
- Passed: 1972 · Skipped: 144 · Failed: 13
- Gating failures: 13 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 7
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface — Error: expect(page).toHaveURL(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-home.spec.ts › Bundle 7 category doors › CT-41 the admin's own client cannot write the eight door tables; the doors still can — Error: Timeout 20000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused — Test timeout of 60000ms exceeded.

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
        - heading "Company" [level=2] [ref=e314]
        - list [ref=e315]:
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
            - generic [ref=e329]: Terms
          - listitem [ref=e330]:
            - generic [ref=e331]: Privacy
    - paragraph [ref=e333]: © 2026 ethio.com — All rights reserved.
```
```

### admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - heading "Company" [level=2] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - generic [ref=e313]: About
          - listitem [ref=e314]:
            - generic [ref=e315]: Contact
      - navigation "Help" [ref=e316]:
        - heading "Help" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Safety
      - navigation "Legal" [ref=e321]:
        - heading "Legal" [level=2] [ref=e322]
        - list [ref=e323]:
          - listitem [ref=e324]:
            - generic [ref=e325]: Terms
          - listitem [ref=e326]:
            - generic [ref=e327]: Privacy
    - paragraph [ref=e329]: © 2026 ethio.com — All rights reserved.
```
```

### posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - heading "Company" [level=2] [ref=e242]
        - list [ref=e243]:
          - listitem [ref=e244]:
            - generic [ref=e245]: About
          - listitem [ref=e246]:
            - generic [ref=e247]: Contact
      - navigation "Help" [ref=e248]:
        - heading "Help" [level=2] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - generic [ref=e252]: Safety
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

### admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - heading "Company" [level=2] [ref=e390]
        - list [ref=e391]:
          - listitem [ref=e392]:
            - generic [ref=e393]: About
          - listitem [ref=e394]:
            - generic [ref=e395]: Contact
      - navigation "Help" [ref=e396]:
        - heading "Help" [level=2] [ref=e397]
        - list [ref=e398]:
          - listitem [ref=e399]:
            - generic [ref=e400]: Safety
      - navigation "Legal" [ref=e401]:
        - heading "Legal" [level=2] [ref=e402]
        - list [ref=e403]:
          - listitem [ref=e404]:
            - generic [ref=e405]: Terms
          - listitem [ref=e406]:
            - generic [ref=e407]: Privacy
    - paragraph [ref=e409]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-home.spec.ts › Bundle 7 category doors › CT-41 the admin's own client cannot write the eight door tables; the doors still can

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

  312 |       await page.getByTestId("category-delete-submit").click();
  313 |       await stepUpIfPrompted(page, secret);
> 314 |       await expect.poll(async () => await readCategory(slug), { timeout: 20000 }).toBeNull();
      |       ^
  315 |     } finally {
  316 |       if (slug) await destroyCategory(slug);
  317 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-home.spec.ts:314:7
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```

Context:

```text
        - heading "Company" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: About
          - listitem [ref=e325]:
            - generic [ref=e326]: Contact
      - navigation "Help" [ref=e327]:
        - heading "Help" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Safety
      - navigation "Legal" [ref=e332]:
        - heading "Legal" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Terms
          - listitem [ref=e337]:
            - generic [ref=e338]: Privacy
    - paragraph [ref=e340]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-5-my_listings-the-search-the-filters-and-the-renew-setting-the-counts-follow-them-D181-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-68d07-he-counts-follow-them-D181--desktop-1280`; this run carried 20 context file(s); of the same spec: none

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - heading "Company" [level=2] [ref=e325]
        - list [ref=e326]:
          - listitem [ref=e327]:
            - generic [ref=e328]: About
          - listitem [ref=e329]:
            - generic [ref=e330]: Contact
      - navigation "Help" [ref=e331]:
        - heading "Help" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Safety
      - navigation "Legal" [ref=e336]:
        - heading "Legal" [level=2] [ref=e337]
        - list [ref=e338]:
          - listitem [ref=e339]:
            - generic [ref=e340]: Terms
          - listitem [ref=e341]:
            - generic [ref=e342]: Privacy
    - paragraph [ref=e344]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hqxdyo: e<n>e_par_i<n>afjo → e<n>e_chi_kxhdgy` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wy<n>jj<n>: e<n>e_par_ly<n>ra → e<n>e_chi_gu<n>f<n>l` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hqxdyo: e<n>e_par_i<n>afjo → e<n>e_chi_kxhdgy ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wy<n>jj<n>: e<n>e_par_ly<n>ra → e<n>e_chi_gu<n>f<n>l ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · admin panel is absent for a normal signed-in user ×1 · PW-10 pricing: currency comes before the amount, a locked period shows no line,  ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-18T20:41:49.988Z | 21.5 min |
| email | 2026-10-18T20:41:56.057Z | 0.3 min |
| shard 1 | 2026-10-18T20:41:50.423Z | 46.7 min |
| shard 2 | 2026-10-18T20:41:44.887Z | 40.9 min |
| shard 3 | 2026-10-18T20:41:44.558Z | 37.3 min |
| shard 4 | 2026-10-18T20:41:53.606Z | 51.2 min |
| shard 5 | 2026-10-18T20:41:45.983Z | 44.4 min |
| shard 6 | 2026-10-18T20:41:56.355Z | 43.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 66 | 29.6 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 29.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 27.3 min | shard 2, shard 5 |
| `shell.spec.ts` | 396 | 26.4 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 20.2 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 19.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 80 | 19.4 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 18.3 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.6 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 15.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.2 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 14.9 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 13.2 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 13.1 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 13.1 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.9 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.7 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 12.5 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 12.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 11.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 11.0 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.2 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 8.9 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.3 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 48 | 8.3 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.3 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.8 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.9 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.9 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 5.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 4.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.6 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 12 | 2.0 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 1.9 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 112.8 s |
| `posting-routes-catalog.spec.ts` › PR-40 a removed question or option is let go once, then the same body is refused | desktop-1280 | 93.5 s |
| `admin-categories-home.spec.ts` › CT-41 the admin's own client cannot write the eight door tables; the doors still can | desktop-1280 | 89.0 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 87.4 s |
| `posting-routes.spec.ts` › PR-21 step 7: private columns are owner-only, through my_listing_private | mobile-360 | 86.9 s |
| `admin-categories-console.spec.ts` › CT-7 step-up: the server refuses the write until AAL2 is proven | desktop-1280 | 85.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 60.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-36 a created leaf gets its secondary parents and the undo removes both pointers | mobile-360 | 60.5 s |
| `photo-pipeline.spec.ts` › PP-16 a photo dropped on the step is added like a picked one | mobile-360 | 60.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 60.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 60.1 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 59.6 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 55.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 54.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39163320324-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39163320324-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39163320324-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39163320324-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39163320324-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39163320324-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39163320324-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39163320324-6
```

## shell.spec.ts › RM-4 the row icons use the approved rail and phone sizes

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    8
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    8

  3209 |     expect(sizes.length).toBeGreaterThan(0);
  3210 |     for (const size of sizes) {
> 3211 |       expect(Math.abs(size.width - expected)).toBeLessThanOrEqual(1);
       |                                               ^
  3212 |       expect(Math.abs(size.height - expected)).toBeLessThanOrEqual(1);
  3213 |     }
  3214 |   };
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3211:47)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3220:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e456]
        - list [ref=e457]:
          - listitem [ref=e458]:
            - generic [ref=e459]: About
          - listitem [ref=e460]:
            - generic [ref=e461]: Contact
      - navigation "Help" [ref=e462]:
        - heading "Help" [level=2] [ref=e463]
        - list [ref=e464]:
          - listitem [ref=e465]:
            - generic [ref=e466]: Safety
      - navigation "Legal" [ref=e467]:
        - heading "Legal" [level=2] [ref=e468]
        - list [ref=e469]:
          - listitem [ref=e470]:
            - generic [ref=e471]: Terms
          - listitem [ref=e472]:
            - generic [ref=e473]: Privacy
    - paragraph [ref=e475]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › RM-4 the row icons use the approved rail and phone sizes

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    4
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    4

  3209 |     expect(sizes.length).toBeGreaterThan(0);
  3210 |     for (const size of sizes) {
> 3211 |       expect(Math.abs(size.width - expected)).toBeLessThanOrEqual(1);
       |                                               ^
  3212 |       expect(Math.abs(size.height - expected)).toBeLessThanOrEqual(1);
  3213 |     }
  3214 |   };
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3211:47)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3224:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e312]
        - list [ref=e313]:
          - listitem [ref=e314]:
            - generic [ref=e315]: About
          - listitem [ref=e316]:
            - generic [ref=e317]: Contact
      - navigation "Help" [ref=e318]:
        - heading "Help" [level=2] [ref=e319]
        - list [ref=e320]:
          - listitem [ref=e321]:
            - generic [ref=e322]: Safety
      - navigation "Legal" [ref=e323]:
        - heading "Legal" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Terms
          - listitem [ref=e328]:
            - generic [ref=e329]: Privacy
    - paragraph [ref=e331]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › corner-block grid › every rail row carries a leading icon on one gutter

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  688 |     const rows = rail.locator("li > a, li > button, li > span[aria-disabled]");
  689 |     const count = await rows.count();
> 690 |     expect(count).toBeGreaterThan(0);
      |                   ^
  691 |
  692 |     const starts = new Set<number>();
  693 |     for (let i = 0; i < count; i += 1) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:690:19
```

Context:

```text
        - heading "Company" [level=2] [ref=e134]
        - list [ref=e135]:
          - listitem [ref=e136]:
            - generic [ref=e137]: About
          - listitem [ref=e138]:
            - generic [ref=e139]: Contact
      - navigation "Help" [ref=e140]:
        - heading "Help" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Safety
      - navigation "Legal" [ref=e145]:
        - heading "Legal" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - generic [ref=e149]: Terms
          - listitem [ref=e150]:
            - generic [ref=e151]: Privacy
    - paragraph [ref=e153]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › B21SC-1 SC-1 the phone drills down and a leaf folds into the strip

- Source: `smoke`
- Project: `mobile-360`

```text
Error: hamburger never became interactive

expect(locator).toBeEnabled() failed

Locator: getByRole('button', { name: /^(Open menu|ዝርዝሩን ክፈት)$/ })
Expected: enabled
Timeout: 15000ms
Error: element(s) not found

Call log:
  - hamburger never became interactive with timeout 15000ms
  - waiting for getByRole('button', { name: /^(Open menu|ዝርዝሩን ክፈት)$/ })

--- further error 1 ---
Error: hamburger never became interactive

expect(locator).toBeEnabled() failed

Locator: getByRole('button', { name: /^(Open menu|ዝርዝሩን ክፈት)$/ })
Expected: enabled
Timeout: 15000ms
Error: element(s) not found

Call log:
  - hamburger never became interactive with timeout 15000ms
  - waiting for getByRole('button', { name: /^(Open menu|ዝርዝሩን ክፈት)$/ })


   at helpers/ui.ts:287

  285 |     // catalogs — an Amharic shell must reach the same control.
  286 |     const hamburger = page.getByRole("button", { name: openMenuPattern() });
> 287 |     await expect(hamburger, "hamburger never became interactive").toBeEnabled({ timeout: 15000 });
      |                                                                   ^
```

Context:

```text
        - heading "Company" [level=2] [ref=e456]
        - list [ref=e457]:
          - listitem [ref=e458]:
            - generic [ref=e459]: About
          - listitem [ref=e460]:
            - generic [ref=e461]: Contact
      - navigation "Help" [ref=e462]:
        - heading "Help" [level=2] [ref=e463]
        - list [ref=e464]:
          - listitem [ref=e465]:
            - generic [ref=e466]: Safety
      - navigation "Legal" [ref=e467]:
        - heading "Legal" [level=2] [ref=e468]
        - list [ref=e469]:
          - listitem [ref=e470]:
            - generic [ref=e471]: Terms
          - listitem [ref=e472]:
            - generic [ref=e473]: Privacy
    - paragraph [ref=e475]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › PK-1 the forced peek opens without focus, folds, and does not repeat

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('rail-menu')
Expected: visible
Timeout: 2000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 2000ms
  - waiting for getByTestId('rail-menu')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('rail-menu')
Expected: visible
Timeout: 2000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 2000ms
  - waiting for getByTestId('rail-menu')


  3320 |     await gotoReady(page, "/");
  3321 |     const menu = page.getByTestId("rail-menu");
> 3322 |     await expect(menu).toBeVisible({ timeout: 2000 });
       |                        ^
  3323 |     expect(await menu.evaluate((el) => el.contains(document.activeElement))).toBe(false);
  3324 |     await expect(menu).toBeHidden({ timeout: 5000 });
  3325 |     expect(await page.evaluate(() => sessionStorage.getItem("ethio.peek"))).toBe("seen");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3322:24
```

Context:

```text
        - heading "Company" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: About
          - listitem [ref=e258]:
            - generic [ref=e259]: Contact
      - navigation "Help" [ref=e260]:
        - heading "Help" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Safety
      - navigation "Legal" [ref=e265]:
        - heading "Legal" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Terms
          - listitem [ref=e270]:
            - generic [ref=e271]: Privacy
    - paragraph [ref=e273]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › B21SC-2 SC-2 the persistent rail follows the URL and folds to main categories

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('app-rail').getByTestId('rail-menu-back')
Expected: "Electronics"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-menu-back')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('app-rail').getByTestId('rail-menu-back')
Expected: "Electronics"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-menu-back')


  3284 |     expect(childIcon.x - rootIcon.x).toBeGreaterThanOrEqual(14);
  3285 |     await gotoReady(page, "/c/smartphones");
> 3286 |     await expect(rail.getByTestId("rail-menu-back")).toHaveText("Electronics");
       |                                                      ^
  3287 |     await expect(rail.getByTestId("rail-category-smartphones")).toHaveAttribute(
  3288 |       "aria-current",
  3289 |       "page",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3286:54
```

Context:

```text
        - heading "Company" [level=2] [ref=e277]
        - list [ref=e278]:
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
            - generic [ref=e292]: Terms
          - listitem [ref=e293]:
            - generic [ref=e294]: Privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

## i18n-coverage.spec.ts › B21SC-3 SC-3 the phone category level and Main menu are Amharic

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: SC-3 category level: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "gaming => \"Gaming & Consoles\"",
+   "printers-office => \"Printers & Office Electronics\"",
+   "electronics-accessories => \"Accessories & Parts\"",
+ ]
--- further error 1 ---
Error: SC-3 category level: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "gaming => \"Gaming & Consoles\"",
+   "printers-office => \"Printers & Office Electronics\"",
+   "electronics-accessories => \"Accessories & Parts\"",
+ ]

  188 |     english.map((row) => `${row.slug} => "${row.label}"`),
  189 |     `${where}: category labels still in English`,
> 190 |   ).toEqual([]);
      |     ^
  191 | }
  192 |
```

Context:

```text
        - heading "ድርጅት" [level=2] [ref=e352]
        - list [ref=e353]:
          - listitem [ref=e354]:
            - generic [ref=e355]: ስለ እኛ
          - listitem [ref=e356]:
            - generic [ref=e357]: ያግኙን
      - navigation "እገዛ" [ref=e358]:
        - heading "እገዛ" [level=2] [ref=e359]
        - list [ref=e360]:
          - listitem [ref=e361]:
            - generic [ref=e362]: ደህንነት
      - navigation "ሕጋዊ" [ref=e363]:
        - heading "ሕጋዊ" [level=2] [ref=e364]
        - list [ref=e365]:
          - listitem [ref=e366]:
            - generic [ref=e367]: ውሎች
          - listitem [ref=e368]:
            - generic [ref=e369]: ግላዊነት
    - paragraph [ref=e371]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › RM-4 the row icons use the approved rail and phone sizes

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    8
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    8

  3209 |     expect(sizes.length).toBeGreaterThan(0);
  3210 |     for (const size of sizes) {
> 3211 |       expect(Math.abs(size.width - expected)).toBeLessThanOrEqual(1);
       |                                               ^
  3212 |       expect(Math.abs(size.height - expected)).toBeLessThanOrEqual(1);
  3213 |     }
  3214 |   };
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3211:47)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3220:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e456]
        - list [ref=e457]:
          - listitem [ref=e458]:
            - generic [ref=e459]: About
          - listitem [ref=e460]:
            - generic [ref=e461]: Contact
      - navigation "Help" [ref=e462]:
        - heading "Help" [level=2] [ref=e463]
        - list [ref=e464]:
          - listitem [ref=e465]:
            - generic [ref=e466]: Safety
      - navigation "Legal" [ref=e467]:
        - heading "Legal" [level=2] [ref=e468]
        - list [ref=e469]:
          - listitem [ref=e470]:
            - generic [ref=e471]: Terms
          - listitem [ref=e472]:
            - generic [ref=e473]: Privacy
    - paragraph [ref=e475]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › B21SC-1 SC-1 the phone drills down and a leaf folds into the strip

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: hamburger never became interactive

expect(locator).toBeEnabled() failed

Locator: getByRole('button', { name: /^(Open menu|ዝርዝሩን ክፈት)$/ })
Expected: enabled
Timeout: 15000ms
Error: element(s) not found

Call log:
  - hamburger never became interactive with timeout 15000ms
  - waiting for getByRole('button', { name: /^(Open menu|ዝርዝሩን ክፈት)$/ })

--- further error 1 ---
Error: hamburger never became interactive

expect(locator).toBeEnabled() failed

Locator: getByRole('button', { name: /^(Open menu|ዝርዝሩን ክፈት)$/ })
Expected: enabled
Timeout: 15000ms
Error: element(s) not found

Call log:
  - hamburger never became interactive with timeout 15000ms
  - waiting for getByRole('button', { name: /^(Open menu|ዝርዝሩን ክፈት)$/ })


   at helpers/ui.ts:287

  285 |     // catalogs — an Amharic shell must reach the same control.
  286 |     const hamburger = page.getByRole("button", { name: openMenuPattern() });
> 287 |     await expect(hamburger, "hamburger never became interactive").toBeEnabled({ timeout: 15000 });
      |                                                                   ^
```

Context:

```text
        - heading "Company" [level=2] [ref=e456]
        - list [ref=e457]:
          - listitem [ref=e458]:
            - generic [ref=e459]: About
          - listitem [ref=e460]:
            - generic [ref=e461]: Contact
      - navigation "Help" [ref=e462]:
        - heading "Help" [level=2] [ref=e463]
        - list [ref=e464]:
          - listitem [ref=e465]:
            - generic [ref=e466]: Safety
      - navigation "Legal" [ref=e467]:
        - heading "Legal" [level=2] [ref=e468]
        - list [ref=e469]:
          - listitem [ref=e470]:
            - generic [ref=e471]: Terms
          - listitem [ref=e472]:
            - generic [ref=e473]: Privacy
    - paragraph [ref=e475]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › PK-1 the forced peek opens without focus, folds, and does not repeat

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('rail-menu')
Expected: visible
Timeout: 2000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 2000ms
  - waiting for getByTestId('rail-menu')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('rail-menu')
Expected: visible
Timeout: 2000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 2000ms
  - waiting for getByTestId('rail-menu')


  3320 |     await gotoReady(page, "/");
  3321 |     const menu = page.getByTestId("rail-menu");
> 3322 |     await expect(menu).toBeVisible({ timeout: 2000 });
       |                        ^
  3323 |     expect(await menu.evaluate((el) => el.contains(document.activeElement))).toBe(false);
  3324 |     await expect(menu).toBeHidden({ timeout: 5000 });
  3325 |     expect(await page.evaluate(() => sessionStorage.getItem("ethio.peek"))).toBe("seen");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3322:24
```

Context:

```text
        - heading "Company" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: About
          - listitem [ref=e258]:
            - generic [ref=e259]: Contact
      - navigation "Help" [ref=e260]:
        - heading "Help" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Safety
      - navigation "Legal" [ref=e265]:
        - heading "Legal" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Terms
          - listitem [ref=e270]:
            - generic [ref=e271]: Privacy
    - paragraph [ref=e273]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › RM-4 the row icons use the approved rail and phone sizes

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    4
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    4

  3209 |     expect(sizes.length).toBeGreaterThan(0);
  3210 |     for (const size of sizes) {
> 3211 |       expect(Math.abs(size.width - expected)).toBeLessThanOrEqual(1);
       |                                               ^
  3212 |       expect(Math.abs(size.height - expected)).toBeLessThanOrEqual(1);
  3213 |     }
  3214 |   };
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3211:47)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3224:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e312]
        - list [ref=e313]:
          - listitem [ref=e314]:
            - generic [ref=e315]: About
          - listitem [ref=e316]:
            - generic [ref=e317]: Contact
      - navigation "Help" [ref=e318]:
        - heading "Help" [level=2] [ref=e319]
        - list [ref=e320]:
          - listitem [ref=e321]:
            - generic [ref=e322]: Safety
      - navigation "Legal" [ref=e323]:
        - heading "Legal" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Terms
          - listitem [ref=e328]:
            - generic [ref=e329]: Privacy
    - paragraph [ref=e331]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › corner-block grid › every rail row carries a leading icon on one gutter

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  688 |     const rows = rail.locator("li > a, li > button, li > span[aria-disabled]");
  689 |     const count = await rows.count();
> 690 |     expect(count).toBeGreaterThan(0);
      |                   ^
  691 |
  692 |     const starts = new Set<number>();
  693 |     for (let i = 0; i < count; i += 1) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:690:19
```

Context:

```text
        - heading "Company" [level=2] [ref=e134]
        - list [ref=e135]:
          - listitem [ref=e136]:
            - generic [ref=e137]: About
          - listitem [ref=e138]:
            - generic [ref=e139]: Contact
      - navigation "Help" [ref=e140]:
        - heading "Help" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Safety
      - navigation "Legal" [ref=e145]:
        - heading "Legal" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - generic [ref=e149]: Terms
          - listitem [ref=e150]:
            - generic [ref=e151]: Privacy
    - paragraph [ref=e153]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › B21SC-2 SC-2 the persistent rail follows the URL and folds to main categories

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('app-rail').getByTestId('rail-menu-back')
Expected: "Electronics"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-menu-back')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('app-rail').getByTestId('rail-menu-back')
Expected: "Electronics"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-menu-back')


  3284 |     expect(childIcon.x - rootIcon.x).toBeGreaterThanOrEqual(14);
  3285 |     await gotoReady(page, "/c/smartphones");
> 3286 |     await expect(rail.getByTestId("rail-menu-back")).toHaveText("Electronics");
       |                                                      ^
  3287 |     await expect(rail.getByTestId("rail-category-smartphones")).toHaveAttribute(
  3288 |       "aria-current",
  3289 |       "page",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3286:54
```

Context:

```text
        - heading "Company" [level=2] [ref=e277]
        - list [ref=e278]:
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
            - generic [ref=e292]: Terms
          - listitem [ref=e293]:
            - generic [ref=e294]: Privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 2

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

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
