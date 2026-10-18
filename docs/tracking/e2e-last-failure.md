# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39158966306
- Commit: `a40e124742b8b1c0219c14155d8b94a30f26b6e8`
- PLATFORM-ORIGIN? the head commit's subject is `Lovable update` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-10-18T20:40:31.686Z
- Passed: 1944 · Skipped: 143 · Failed: 14
- Gating failures: 14 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › corner-block grid › the rail collapses to icons, shows a tooltip, and remembers the choice — Error: locator.hover: Error: strict mode violation: getByTestId('app-rail').getByRole('link', { name: 'Home' }) resolved to 2 elements:
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans — Error: PW-30: no place was chosen

## Flaky bodies (DEC-078)

### shell.spec.ts › corner-block grid › the rail collapses to icons, shows a tooltip, and remembers the choice

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: locator.hover: Error: strict mode violation: getByTestId('app-rail').getByRole('link', { name: 'Home' }) resolved to 2 elements:
    1) <a href="/" aria-label="Home" aria-current="page" data-state="closed" data-status="active" data-testid="rail-category-all" class="flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 bg-nav-active font-semibold text-primary active">…</a> aka getByTestId('rail-category-all')
    2) <a data-state="closed" href="/c/home-garden" aria-label="Home & Garden" data-testid="rail-category-home-garden" class="flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground">…</a> aka getByTestId('rail-category-home-garden')

Call log:
  - waiting for getByTestId('app-rail').getByRole('link', { name: 'Home' })

--- further error 1 ---
Error: locator.hover: Error: strict mode violation: getByTestId('app-rail').getByRole('link', { name: 'Home' }) resolved to 2 elements:
    1) <a href="/" aria-label="Home" aria-current="page" data-state="closed" data-status="active" data-testid="rail-category-all" class="flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 bg-nav-active font-semibold text-primary active">…</a> aka getByTestId('rail-category-all')
    2) <a data-state="closed" href="/c/home-garden" aria-label="Home & Garden" data-testid="rail-category-home-garden" class="flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground">…</a> aka getByTestId('rail-category-home-garden')

Call log:
  - waiting for getByTestId('app-rail').getByRole('link', { name: 'Home' })


  738 |     expect(Math.abs(narrow.width - 64)).toBeLessThanOrEqual(1);
  739 |     await expect(rail.getByTestId("rail-category-all").locator("svg")).toBeVisible();
> 740 |     await rail.getByRole("link", { name: en["nav.home"] }).hover();
      |                                                            ^
  741 |     const tip = page.getByTestId("rail-tooltip");
  742 |     await expect(tip).toBeVisible();
  743 |     await expect(tip).toContainText(en["nav.home"]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:740:60
```

Context:

```text
        - heading "Company" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: About
          - listitem [ref=e208]:
            - generic [ref=e209]: Contact
      - navigation "Help" [ref=e210]:
        - heading "Help" [level=2] [ref=e211]
        - list [ref=e212]:
          - listitem [ref=e213]:
            - generic [ref=e214]: Safety
      - navigation "Legal" [ref=e215]:
        - heading "Legal" [level=2] [ref=e216]
        - list [ref=e217]:
          - listitem [ref=e218]:
            - generic [ref=e219]: Terms
          - listitem [ref=e220]:
            - generic [ref=e221]: Privacy
    - paragraph [ref=e223]: © 2026 ethio.com — All rights reserved.
```
```

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: apiRequestContext.post: Request context disposed.
Call log:
  - → POST http://127.0.0.1:4173/api/listings/photos/8b2c88da-50e9-457e-8393-342281e1010d
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - Authorization: Bearer [redacted-jwt]
    - content-length: 30


   at helpers/photos.ts:136

  134 |     verb === "delete"
  135 |       ? await page.request.delete(url, { headers })
> 136 |       : await page.request.post(url, {
      |                            ^
  137 |           headers,
  138 |           data: verb === "move" ? { action: "move", position } : { action: "cover" },
  139 |         });
```

Context:

```text
        - heading "Company" [level=2] [ref=e87]
        - list [ref=e88]:
          - listitem [ref=e89]:
            - generic [ref=e90]: About
          - listitem [ref=e91]:
            - generic [ref=e92]: Contact
      - navigation "Help" [ref=e93]:
        - heading "Help" [level=2] [ref=e94]
        - list [ref=e95]:
          - listitem [ref=e96]:
            - generic [ref=e97]: Safety
      - navigation "Legal" [ref=e98]:
        - heading "Legal" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Terms
          - listitem [ref=e103]:
            - generic [ref=e104]: Privacy
    - paragraph [ref=e106]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-30: no place was chosen
PW-30 step timings: signed in @ 9374 ms | category and specifications seeded @ 10024 ms | step 3 reached @ 13745 ms | specifications answered @ 14100 ms | step 6 open @ 19768 ms | tree served @ 20489 ms

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-where-chosen')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - PW-30: no place was chosen
PW-30 step timings: signed in @ 9374 ms | category and specifications seeded @ 10024 ms | step 3 reached @ 13745 ms | specifications answered @ 14100 ms | step 6 open @ 19768 ms | tree served @ 20489 ms with timeout 20000ms
  - waiting for getByTestId('post-where-chosen')
    24 × locator resolved to <ul data-count="0" class="space-y-1" data-testid="post-where-chosen"></ul>
       - unexpected value "0"

--- further error 1 ---
Error: PW-30: no place was chosen
PW-30 step timings: signed in @ 9374 ms | category and specifications seeded @ 10024 ms | step 3 reached @ 13745 ms | specifications answered @ 14100 ms | step 6 open @ 19768 ms | tree served @ 20489 ms

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-where-chosen')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - PW-30: no place was chosen
PW-30 step timings: signed in @ 9374 ms | category and specifications seeded @ 10024 ms | step 3 reached @ 13745 ms | specifications answered @ 14100 ms | step 6 open @ 19768 ms | tree served @ 20489 ms with timeout 20000ms
  - waiting for getByTestId('post-where-chosen')
    24 × locator resolved to <ul data-count="0" class="space-y-1" data-testid="post-where-chosen"></ul>
       - unexpected value "0"


  780 |       page.getByTestId("post-where-chosen"),
  781 |       why("PW-30: no place was chosen"),
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 18 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

110 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ol<n>ty<n>: e<n>e_par_etgngk → e<n>e_chi_lg<n>m<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tz<n>w<n>b: e<n>e_par_se<n>hgz → e<n>e_chi_spkajw` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ol<n>ty<n>: e<n>e_par_etgngk → e<n>e_chi_lg<n>m<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tz<n>w<n>b: e<n>e_par_se<n>hgz → e<n>e_chi_spkajw ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×2 · Sign out is in the account menu at the top right @private-identity ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×1

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
| smoke | 2026-10-18T19:51:20.259Z | 19.6 min |
| email | 2026-10-18T19:51:18.599Z | 0.2 min |
| shard 1 | 2026-10-18T19:51:19.083Z | 48.8 min |
| shard 2 | 2026-10-18T19:51:23.900Z | 42.9 min |
| shard 3 | 2026-10-18T19:51:22.647Z | 39.3 min |
| shard 4 | 2026-10-18T19:51:15.787Z | 48.3 min |
| shard 5 | 2026-10-18T19:51:16.517Z | 44.8 min |
| shard 6 | 2026-10-18T19:51:19.324Z | 37.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 30.2 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 66 | 28.2 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 26.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 372 | 24.3 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 20.9 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 20.9 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 80 | 20.1 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 18.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 16.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 16.3 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 14.7 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 14.0 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 13.5 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 13.3 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 12.9 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 12.4 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 12.1 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 32 | 11.2 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 10.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 10.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.6 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 9.1 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 8.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.1 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.9 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.8 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.4 min | shard 1, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.7 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.4 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.9 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.7 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.6 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.0 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 10 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 116.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 81.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 74.0 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 72.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 69.3 s |
| `admin-categories-console.spec.ts` › CT-8 every verb is reachable from the editor with no horizontal scroll | desktop-1280 | 67.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 65.2 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 55.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 54.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 54.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 54.0 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | mobile-360 | 52.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | desktop-1280 | 51.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 49.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 48.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39158966306-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39158966306-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39158966306-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39158966306-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39158966306-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39158966306-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39158966306-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39158966306-6
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

  3060 |     expect(sizes.length).toBeGreaterThan(0);
  3061 |     for (const size of sizes) {
> 3062 |       expect(Math.abs(size.width - expected)).toBeLessThanOrEqual(1);
       |                                               ^
  3063 |       expect(Math.abs(size.height - expected)).toBeLessThanOrEqual(1);
  3064 |     }
  3065 |   };
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3062:47)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3071:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e455]
        - list [ref=e456]:
          - listitem [ref=e457]:
            - generic [ref=e458]: About
          - listitem [ref=e459]:
            - generic [ref=e460]: Contact
      - navigation "Help" [ref=e461]:
        - heading "Help" [level=2] [ref=e462]
        - list [ref=e463]:
          - listitem [ref=e464]:
            - generic [ref=e465]: Safety
      - navigation "Legal" [ref=e466]:
        - heading "Legal" [level=2] [ref=e467]
        - list [ref=e468]:
          - listitem [ref=e469]:
            - generic [ref=e470]: Terms
          - listitem [ref=e471]:
            - generic [ref=e472]: Privacy
    - paragraph [ref=e474]: © 2026 ethio.com — All rights reserved.
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

  3060 |     expect(sizes.length).toBeGreaterThan(0);
  3061 |     for (const size of sizes) {
> 3062 |       expect(Math.abs(size.width - expected)).toBeLessThanOrEqual(1);
       |                                               ^
  3063 |       expect(Math.abs(size.height - expected)).toBeLessThanOrEqual(1);
  3064 |     }
  3065 |   };
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3062:47)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3075:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e392]
        - list [ref=e393]:
          - listitem [ref=e394]:
            - generic [ref=e395]: About
          - listitem [ref=e396]:
            - generic [ref=e397]: Contact
      - navigation "Help" [ref=e398]:
        - heading "Help" [level=2] [ref=e399]
        - list [ref=e400]:
          - listitem [ref=e401]:
            - generic [ref=e402]: Safety
      - navigation "Legal" [ref=e403]:
        - heading "Legal" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: Terms
          - listitem [ref=e408]:
            - generic [ref=e409]: Privacy
    - paragraph [ref=e411]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › top band law (bundle 21 turn 2) › TB-1 the corner and the band line up

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    4
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    4

  2974 |           expect(
  2975 |             Math.abs((await bounds(mark)).x - (await bounds(row.locator("[data-cut-text]"))).x),
> 2976 |           ).toBeLessThanOrEqual(2);
       |             ^
  2977 |         }
  2978 |         if (width === 1280) {
  2979 |           const word = page.getByTestId("topbar-wordmark");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2976:13
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
        - heading "Company" [level=2] [ref=e428]
        - list [ref=e429]:
          - listitem [ref=e430]:
            - generic [ref=e431]: About
          - listitem [ref=e432]:
            - generic [ref=e433]: Contact
      - navigation "Help" [ref=e434]:
        - heading "Help" [level=2] [ref=e435]
        - list [ref=e436]:
          - listitem [ref=e437]:
            - generic [ref=e438]: Safety
      - navigation "Legal" [ref=e439]:
        - heading "Legal" [level=2] [ref=e440]
        - list [ref=e441]:
          - listitem [ref=e442]:
            - generic [ref=e443]: Terms
          - listitem [ref=e444]:
            - generic [ref=e445]: Privacy
    - paragraph [ref=e447]: © 2026 ethio.com — All rights reserved.
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


  3171 |     await gotoReady(page, "/");
  3172 |     const menu = page.getByTestId("rail-menu");
> 3173 |     await expect(menu).toBeVisible({ timeout: 2000 });
       |                        ^
  3174 |     expect(await menu.evaluate((el) => el.contains(document.activeElement))).toBe(false);
  3175 |     await expect(menu).toBeHidden({ timeout: 5000 });
  3176 |     expect(await page.evaluate(() => sessionStorage.getItem("ethio.peek"))).toBe("seen");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3173:24
```

Context:

```text
        - heading "Company" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
      - navigation "Legal" [ref=e247]:
        - heading "Legal" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Terms
          - listitem [ref=e252]:
            - generic [ref=e253]: Privacy
    - paragraph [ref=e255]: © 2026 ethio.com — All rights reserved.
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


  3135 |     expect(childIcon.x - rootIcon.x).toBeGreaterThanOrEqual(14);
  3136 |     await gotoReady(page, "/c/smartphones");
> 3137 |     await expect(rail.getByTestId("rail-menu-back")).toHaveText("Electronics");
       |                                                      ^
  3138 |     await expect(rail.getByTestId("rail-category-smartphones")).toHaveAttribute(
  3139 |       "aria-current",
  3140 |       "page",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3137:54
```

Context:

```text
        - heading "Company" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - generic [ref=e312]: About
          - listitem [ref=e313]:
            - generic [ref=e314]: Contact
      - navigation "Help" [ref=e315]:
        - heading "Help" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - generic [ref=e319]: Safety
      - navigation "Legal" [ref=e320]:
        - heading "Legal" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Terms
          - listitem [ref=e325]:
            - generic [ref=e326]: Privacy
    - paragraph [ref=e328]: © 2026 ethio.com — All rights reserved.
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
        - heading "ድርጅት" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: ስለ እኛ
          - listitem [ref=e357]:
            - generic [ref=e358]: ያግኙን
      - navigation "እገዛ" [ref=e359]:
        - heading "እገዛ" [level=2] [ref=e360]
        - list [ref=e361]:
          - listitem [ref=e362]:
            - generic [ref=e363]: ደህንነት
      - navigation "ሕጋዊ" [ref=e364]:
        - heading "ሕጋዊ" [level=2] [ref=e365]
        - list [ref=e366]:
          - listitem [ref=e367]:
            - generic [ref=e368]: ውሎች
          - listitem [ref=e369]:
            - generic [ref=e370]: ግላዊነት
    - paragraph [ref=e372]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
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

  3060 |     expect(sizes.length).toBeGreaterThan(0);
  3061 |     for (const size of sizes) {
> 3062 |       expect(Math.abs(size.width - expected)).toBeLessThanOrEqual(1);
       |                                               ^
  3063 |       expect(Math.abs(size.height - expected)).toBeLessThanOrEqual(1);
  3064 |     }
  3065 |   };
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3062:47)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3071:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e455]
        - list [ref=e456]:
          - listitem [ref=e457]:
            - generic [ref=e458]: About
          - listitem [ref=e459]:
            - generic [ref=e460]: Contact
      - navigation "Help" [ref=e461]:
        - heading "Help" [level=2] [ref=e462]
        - list [ref=e463]:
          - listitem [ref=e464]:
            - generic [ref=e465]: Safety
      - navigation "Legal" [ref=e466]:
        - heading "Legal" [level=2] [ref=e467]
        - list [ref=e468]:
          - listitem [ref=e469]:
            - generic [ref=e470]: Terms
          - listitem [ref=e471]:
            - generic [ref=e472]: Privacy
    - paragraph [ref=e474]: © 2026 ethio.com — All rights reserved.
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
        - heading "Company" [level=2] [ref=e428]
        - list [ref=e429]:
          - listitem [ref=e430]:
            - generic [ref=e431]: About
          - listitem [ref=e432]:
            - generic [ref=e433]: Contact
      - navigation "Help" [ref=e434]:
        - heading "Help" [level=2] [ref=e435]
        - list [ref=e436]:
          - listitem [ref=e437]:
            - generic [ref=e438]: Safety
      - navigation "Legal" [ref=e439]:
        - heading "Legal" [level=2] [ref=e440]
        - list [ref=e441]:
          - listitem [ref=e442]:
            - generic [ref=e443]: Terms
          - listitem [ref=e444]:
            - generic [ref=e445]: Privacy
    - paragraph [ref=e447]: © 2026 ethio.com — All rights reserved.
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


  3171 |     await gotoReady(page, "/");
  3172 |     const menu = page.getByTestId("rail-menu");
> 3173 |     await expect(menu).toBeVisible({ timeout: 2000 });
       |                        ^
  3174 |     expect(await menu.evaluate((el) => el.contains(document.activeElement))).toBe(false);
  3175 |     await expect(menu).toBeHidden({ timeout: 5000 });
  3176 |     expect(await page.evaluate(() => sessionStorage.getItem("ethio.peek"))).toBe("seen");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3173:24
```

Context:

```text
        - heading "Company" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
      - navigation "Legal" [ref=e247]:
        - heading "Legal" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Terms
          - listitem [ref=e252]:
            - generic [ref=e253]: Privacy
    - paragraph [ref=e255]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table')


  531 |         const cardTwin = width < TWIN_BOUNDARY;
  532 |         const twin = cardTwin ? page.getByTestId("data-table-cards") : page.getByRole("table");
> 533 |         await expect(twin).toBeVisible({ timeout: 20000 });
      |                            ^
  534 |         await page.getByTestId("category-search").fill(slug);
  535 |         await expect(
  536 |           cardTwin
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:533:28
```

Context:

```text
        - heading "Company" [level=2] [ref=e1576]
        - list [ref=e1577]:
          - listitem [ref=e1578]:
            - generic [ref=e1579]: About
          - listitem [ref=e1580]:
            - generic [ref=e1581]: Contact
      - navigation "Help" [ref=e1582]:
        - heading "Help" [level=2] [ref=e1583]
        - list [ref=e1584]:
          - listitem [ref=e1585]:
            - generic [ref=e1586]: Safety
      - navigation "Legal" [ref=e1587]:
        - heading "Legal" [level=2] [ref=e1588]
        - list [ref=e1589]:
          - listitem [ref=e1590]:
            - generic [ref=e1591]: Terms
          - listitem [ref=e1592]:
            - generic [ref=e1593]: Privacy
    - paragraph [ref=e1595]: © 2026 ethio.com — All rights reserved.
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

  3060 |     expect(sizes.length).toBeGreaterThan(0);
  3061 |     for (const size of sizes) {
> 3062 |       expect(Math.abs(size.width - expected)).toBeLessThanOrEqual(1);
       |                                               ^
  3063 |       expect(Math.abs(size.height - expected)).toBeLessThanOrEqual(1);
  3064 |     }
  3065 |   };
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3062:47)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3075:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e392]
        - list [ref=e393]:
          - listitem [ref=e394]:
            - generic [ref=e395]: About
          - listitem [ref=e396]:
            - generic [ref=e397]: Contact
      - navigation "Help" [ref=e398]:
        - heading "Help" [level=2] [ref=e399]
        - list [ref=e400]:
          - listitem [ref=e401]:
            - generic [ref=e402]: Safety
      - navigation "Legal" [ref=e403]:
        - heading "Legal" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: Terms
          - listitem [ref=e408]:
            - generic [ref=e409]: Privacy
    - paragraph [ref=e411]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › top band law (bundle 21 turn 2) › TB-1 the corner and the band line up

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    4
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    4

  2974 |           expect(
  2975 |             Math.abs((await bounds(mark)).x - (await bounds(row.locator("[data-cut-text]"))).x),
> 2976 |           ).toBeLessThanOrEqual(2);
       |             ^
  2977 |         }
  2978 |         if (width === 1280) {
  2979 |           const word = page.getByTestId("topbar-wordmark");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2976:13
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


  3135 |     expect(childIcon.x - rootIcon.x).toBeGreaterThanOrEqual(14);
  3136 |     await gotoReady(page, "/c/smartphones");
> 3137 |     await expect(rail.getByTestId("rail-menu-back")).toHaveText("Electronics");
       |                                                      ^
  3138 |     await expect(rail.getByTestId("rail-category-smartphones")).toHaveAttribute(
  3139 |       "aria-current",
  3140 |       "page",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3137:54
```

Context:

```text
        - heading "Company" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - generic [ref=e312]: About
          - listitem [ref=e313]:
            - generic [ref=e314]: Contact
      - navigation "Help" [ref=e315]:
        - heading "Help" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - generic [ref=e319]: Safety
      - navigation "Legal" [ref=e320]:
        - heading "Legal" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Terms
          - listitem [ref=e325]:
            - generic [ref=e326]: Privacy
    - paragraph [ref=e328]: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-tz4w5b: e2e_par_se3hgz → e2e_chi_spkajw
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
