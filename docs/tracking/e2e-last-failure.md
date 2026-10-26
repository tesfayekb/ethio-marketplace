# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40392505916 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40392505916
- Commit: `cd3e00ddcdcfc4868008b4f4de11c1bae04b42e8`
- Attempt: 1
- Written (UTC): 2026-10-26T20:45:31.306Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 5` · on-demand-failure.spec.ts › ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911) › ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads — Error: "route.fetch: Target page, context or browser has been closed

## Flaky bodies (DEC-078)

### on-demand-failure.spec.ts › ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911) › ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: "route.fetch: Target page, context or browser has been closed
Call log:
  - → GET http://127.0.0.1:4173/assets/dist-CP8Qbop9.js
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - accept-language: en-US
    - origin: http://127.0.0.1:4173
    - sec-ch-ua: "Not:A-Brand";v="99", "HeadlessChrome";v="145", "Chromium";v="145"
    - sec-ch-ua-mobile: ?0
    - sec-ch-ua-platform: "Windows"
  - ← 200 OK
    - cache-control: public, max-age=31536000, immutable
    - date: Mon, 26 Oct 2026 20:34:29 GMT
    - content-length: 716955
    - content-type: text/javascript; charset=utf-8
    - etag: "af09b-egzklGXgSBzlH7NoOAC/8Xmyryo"
    - last-modified: Mon, 26 Oct 2026 20:28:33 GMT
    - vary: Accept-Encoding
" while running route callback.
Consider awaiting `await page.unrouteAll({ behavior: 'ignoreErrors' })`
before the end of the test to ignore remaining routes in flight.
--- further error 1 ---
Error: "route.fetch: Target page, context or browser has been closed
Call log:
  - → GET http://127.0.0.1:4173/assets/dist-CP8Qbop9.js
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - accept-language: en-US
    - origin: http://127.0.0.1:4173
    - sec-ch-ua: "Not:A-Brand";v="99", "HeadlessChrome";v="145", "Chromium";v="145"
    - sec-ch-ua-mobile: ?0
    - sec-ch-ua-platform: "Windows"
  - ← 200 OK
    - cache-control: public, max-age=31536000, immutable
    - date: Mon, 26 Oct 2026 20:34:29 GMT
    - content-length: 716955
    - content-type: text/javascript; charset=utf-8
    - etag: "af09b-egzklGXgSBzlH7NoOAC/8Xmyryo"
    - last-modified: Mon, 26 Oct 2026 20:28:33 GMT
    - vary: Accept-Encoding
" while running route callback.
--- further error 2 ---
Error: browserContext.close: Target page, context or browser has been closed
```

Context:

```text
          - listitem [ref=e112]:
            - generic [ref=e113]: About
          - listitem [ref=e114]:
            - generic [ref=e115]: Contact
      - navigation "Help" [ref=e116]:
        - heading "Help" [level=2] [ref=e117]
        - list [ref=e118]:
          - listitem [ref=e119]:
            - generic [ref=e120]: Safety
      - navigation "Legal" [ref=e121]:
        - heading "Legal" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - link "Terms" [ref=e125] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e126]:
            - link "Privacy" [ref=e127] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e129]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-26T20:29:16.865Z | 13.4 min |
| email | 2026-10-26T20:28:34.982Z | 0.4 min |
| shard 1 | 2026-10-26T20:28:38.639Z | 10.6 min |
| shard 2 | 2026-10-26T20:28:44.903Z | 13.9 min |
| shard 3 | 2026-10-26T20:28:19.563Z | 10.2 min |
| shard 4 | 2026-10-26T20:28:32.712Z | 7.9 min |
| shard 5 | 2026-10-26T20:29:09.177Z | 8.2 min |
| shard 6 | 2026-10-26T20:34:13.342Z | 10.4 min |
| shard 7 | 2026-10-26T20:29:08.079Z | 6.5 min |
| shard 8 | 2026-10-26T20:29:13.383Z | 6.0 min |
| shard 9 | 2026-10-26T20:28:59.831Z | 11.7 min |
| shard 10 | 2026-10-26T20:31:49.160Z | 12.7 min |
| shard 11 | 2026-10-26T20:28:09.618Z | 12.8 min |
| shard 12 | 2026-10-26T20:28:55.997Z | 8.5 min |
| shard 13 | 2026-10-26T20:28:45.631Z | 7.5 min |
| shard 14 | 2026-10-26T20:29:07.713Z | 10.6 min |
| shard 15 | 2026-10-26T20:28:55.640Z | 7.1 min |
| shard 16 | 2026-10-26T20:30:48.902Z | 6.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 18.9 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 64 | 6.1 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.8 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 7, shard 15 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.3 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 68 | 4.3 min | shard 5, shard 13 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 9, shard 16 |
| `admin-screening.spec.ts` | 52 | 3.9 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.8 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.7 min | shard 5, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7, shard 15 |
| `admin-users.spec.ts` | 28 | 3.6 min | shard 3, shard 11 |
| `admin-listings.spec.ts` | 62 | 3.5 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 76 | 3.3 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.7 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 42 | 2.0 min | shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | shard 5, shard 13 |
| `legal-certify.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 1.0 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.8 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.8 min | shard 3, shard 11 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 5, shard 13 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 3, shard 11 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 38.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.5 s |
