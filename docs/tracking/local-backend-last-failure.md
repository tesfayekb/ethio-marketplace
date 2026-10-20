# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39504890888 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39504890888
- Commit: `54dbf7ad3f573f92870033d3044cdc9e19287965`
- Attempt: 1
- Written (UTC): 2026-10-20T22:21:05.043Z
- Post-test warnings: 39
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eoznnvmepunzvnikccknbedzetuaorerjqscvdywuozyouzp","furthestElement":"breadcrumb-ad","crumbHeight":20}

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eoznnvmepunzvnikccknbedzetuaorerjqscvdywuozyouzp","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eoznnvmepunzvnikccknbedzetuaorerjqscvdywuozyouzp","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: Contact
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
      - navigation "Legal" [ref=e262]:
        - heading "Legal" [level=2] [ref=e263]
        - list [ref=e264]:
          - listitem [ref=e265]:
            - link "Terms" [ref=e266] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e267]:
            - link "Privacy" [ref=e268] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e270]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (13 of 13 results files read, 13 of 13 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

118 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 19 | shard 1, shard 3, shard 7, shard 9 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `listing not found` | 6 | shard 5, shard 6, shard 11 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-hfyx<n>: e<n>e_par_z<n>b<n>rq → e<n>e_chi_c<n>pjd<n>` (quiet) | 1 | shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-k<n>tgex: e<n>e_par_s<n>fesc → e<n>e_chi_s<n>w` (quiet) | 1 | shard 1 |

Quiet (allowlisted): too many previews ×19 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-hfyx<n>: e<n>e_par_z<n>b<n>rq → e<n>e_chi_c<n>pjd<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-k<n>tgex: e<n>e_par_s<n>fesc → e<n>e_chi_s<n>w ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-188 a list that hangs under another answer offers its shared Other last under ×1

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
| smoke | 2026-10-20T22:03:06.268Z | 10.7 min |
| shard 1 | 2026-10-20T22:03:54.969Z | 16.7 min |
| shard 2 | 2026-10-20T22:03:51.542Z | 14.6 min |
| shard 3 | 2026-10-20T22:03:40.702Z | 9.5 min |
| shard 4 | 2026-10-20T22:03:22.903Z | 8.8 min |
| shard 5 | 2026-10-20T22:03:35.171Z | 11.2 min |
| shard 6 | 2026-10-20T22:03:18.932Z | 8.1 min |
| shard 7 | 2026-10-20T22:03:34.018Z | 12.8 min |
| shard 8 | 2026-10-20T22:03:42.842Z | 16.1 min |
| shard 9 | 2026-10-20T22:03:33.529Z | 10.9 min |
| shard 10 | 2026-10-20T22:03:29.729Z | 10.2 min |
| shard 11 | 2026-10-20T22:03:41.135Z | 11.7 min |
| shard 12 | 2026-10-20T22:03:35.411Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 17.3 min | smoke, shard 6, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 7 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 4, shard 10 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 8 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 3, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 5, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 4.3 min | shard 5, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 2, shard 8 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 1, shard 7 |
| `auth-signout.spec.ts` | 56 | 4.0 min | smoke, shard 3, shard 9 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 1, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 1, shard 8 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 6, shard 12 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 5, shard 11 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 5, shard 11 |
| `admin-listings.spec.ts` | 62 | 3.2 min | shard 2, shard 8 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 7 |
| `photo-pipeline.spec.ts` | 66 | 3.1 min | shard 4, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 4, shard 10 |
| `ad-page.spec.ts` | 68 | 2.8 min | shard 1, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 5, shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 7 |
| `import-security.spec.ts` | 36 | 2.4 min | shard 3, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 8 |
| `post-wizard-category.spec.ts` | 48 | 2.2 min | shard 4, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 6, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 8 |
| `admin-translations-data.spec.ts` | 8 | 1.6 min | shard 2, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 1.3 min | shard 4, shard 10 |
| `legal-admin.spec.ts` | 28 | 1.1 min | shard 3, shard 9 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `legal-certify.spec.ts` | 26 | 1.1 min | shard 3, shard 9 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 8 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 4, shard 10 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 4, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `legal-doors.spec.ts` | 32 | 0.6 min | shard 4, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 5, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 5, shard 11 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 5, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 4, shard 10 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 6, shard 12 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 3, shard 9 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 9 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 3, shard 9 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 6, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 9 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 5, shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `legal-pages.spec.ts` | 6 | 0.1 min | shard 4, shard 10 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.6 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.5 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 26.2 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 26.1 s |
