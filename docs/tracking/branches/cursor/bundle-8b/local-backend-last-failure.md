# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45913849134 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45913849134
- Commit: `29778bceac92aa9a24b32160f7618dd50c2a57fc`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-27T00:28:01.023Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 15` · failure-crawl-member-account.spec.ts › FAILURE CRAWL — the member's account pages (DEC-459 c) › FCR-34 /settings as member: loads clean and says every failed read — Error: /settings rpc has_password (malformed): the read failed and the screen said nothing (no failure notice)

## Flaky bodies (DEC-078)

### failure-crawl-member-account.spec.ts › FAILURE CRAWL — the member's account pages (DEC-459 c) › FCR-34 /settings as member: loads clean and says every failed read

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: /settings rpc has_password (malformed): the read failed and the screen said nothing (no failure notice)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "/settings rpc has_password (malformed): the read failed and the screen said nothing (no failure notice)",
+ ]
--- further error 1 ---
Error: /settings rpc has_password (malformed): the read failed and the screen said nothing (no failure notice)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "/settings rpc has_password (malformed): the read failed and the screen said nothing (no failure notice)",
+ ]

   at helpers/failure-crawl-tests.ts:44

  42 |         contentType: "application/json",
  43 |       });
> 44 |       expect(result.problems, result.problems.join("\n")).toEqual([]);
     |                                                           ^
  45 |     },
  46 |   };
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: the server responded with a status of 503 (Service Unavailable)
[client-error] HTTP 503 POST https://127.0.0.1:31321/rest/v1/rpc/has_password ({"code":"PGRST000","details":"could not translate host name \"supabase_db_ethio-ci-local\" to address: Name does not resolve\n","hint":null,"message":"Database connection error."})
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET https://127.0.0.1:31321/auth/v1/user ({"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET https://127.0.0.1:31321/auth/v1/user ({"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"})
[client-error] HTTP 500 GET https://127.0.0.1:31321/auth/v1/user ({"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"})
```

Context:

```text
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
            - link "Terms" [ref=e292] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e293]:
            - link "Privacy" [ref=e294] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 8, shard 11 |
| `categories wrongFile` (quiet) | 4 | shard 8, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 5, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 5, shard 8 |
| `categories file too large` (quiet) | 2 | shard 8 |
| `categories nulByte` (quiet) | 2 | shard 8 |
| `categories unknownColumn` (quiet) | 2 | shard 8 |
| `countries badHeader` (quiet) | 2 | shard 8 |
| `countries nulByte` (quiet) | 2 | shard 8 |
| `countries tooManyRows` (quiet) | 2 | shard 8 |
| `countries unknownColumn` (quiet) | 2 | shard 8 |
| `countries wrongFile` (quiet) | 2 | shard 8 |
| `definitions nulByte` (quiet) | 2 | shard 8 |
| `definitions tooManyRows` (quiet) | 2 | shard 8 |
| `definitions unknownColumn` (quiet) | 2 | shard 8 |
| `links unknownColumn` (quiet) | 2 | shard 8 |
| `locations badHeader` (quiet) | 2 | shard 8 |
| `locations file too large` (quiet) | 2 | shard 8 |
| `locations nulByte` (quiet) | 2 | shard 8 |
| `locations unknownColumn` (quiet) | 2 | shard 8 |
| `locations wrongFile` (quiet) | 2 | shard 8 |
| `strings badHeader` (quiet) | 2 | shard 8 |
| `strings emptyFile` (quiet) | 2 | shard 8 |
| `strings nulByte` (quiet) | 2 | shard 8 |
| `strings tooManyRows` (quiet) | 2 | shard 8 |
| `strings unknownColumn` (quiet) | 2 | shard 8 |
| `strings wrongFile` (quiet) | 2 | shard 8 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-27T00:00:57.679Z | 7.2 min |
| email | 2026-11-26T23:59:56.031Z | 0.3 min |
| webkit | 2026-11-27T00:00:49.801Z | 10.1 min |
| shard 1 | 2026-11-27T00:00:29.804Z | 12.0 min |
| shard 2 | 2026-11-27T00:01:24.969Z | 11.8 min |
| shard 3 | 2026-11-27T00:00:26.577Z | 8.7 min |
| shard 4 | 2026-11-26T23:59:59.397Z | 7.2 min |
| shard 5 | 2026-11-27T00:01:14.831Z | 18.3 min |
| shard 6 | 2026-11-27T00:00:55.889Z | 19.4 min |
| shard 7 | 2026-11-27T00:02:07.786Z | 15.9 min |
| shard 8 | 2026-11-27T00:01:04.254Z | 12.2 min |
| shard 9 | 2026-11-27T00:01:52.060Z | 8.0 min |
| shard 10 | 2026-11-26T23:59:53.911Z | 17.8 min |
| shard 11 | 2026-11-27T00:01:57.199Z | 25.8 min |
| shard 12 | 2026-11-27T00:06:07.371Z | 14.9 min |
| shard 13 | 2026-11-27T00:01:01.570Z | 11.7 min |
| shard 14 | 2026-11-27T00:00:09.731Z | 18.5 min |
| shard 15 | 2026-11-27T00:00:27.879Z | 17.2 min |
| shard 16 | 2026-11-27T00:03:45.903Z | 13.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.0 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.6 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.3 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.2 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.7 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 17.3 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 15.7 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.0 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.9 min | shard 10 |
| `admin-monetisation.spec.ts` | 34 | 13.1 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.6 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 11.4 min | shard 13 |
| `failure-crawl-admin-content.spec.ts` | 18 | 9.6 min | shard 2 |
| `legal-doors.spec.ts` | 34 | 9.6 min | smoke, shard 1 |
| `shell.spec.ts` | 234 | 9.3 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 7.4 min | shard 11 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 3 |
| `failure-crawl-admin-people.spec.ts` | 14 | 7.1 min | shard 5 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.0 min | shard 4 |
| `admin-countries.spec.ts` | 18 | 6.9 min | shard 8 |
| `auth-signout.spec.ts` | 44 | 6.3 min | webkit, shard 5 |
| `admin-translations-governance.spec.ts` | 20 | 6.1 min | smoke, shard 1 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `dialogs.spec.ts` | 36 | 5.3 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 5.2 min | webkit, shard 9 |
| `admin-guides.spec.ts` | 14 | 4.8 min | shard 2 |
| `ad-page.spec.ts` | 104 | 4.8 min | webkit, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.8 min | shard 16 |
| `admin-users.spec.ts` | 28 | 4.6 min | shard 13 |
| `admin-screening-reject.spec.ts` | 10 | 4.5 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 15 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.3 min | shard 7 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 3 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7 |
| `mfa-stepup.spec.ts` | 28 | 3.4 min | webkit, shard 15 |
| `post-wizard-category.spec.ts` | 54 | 3.2 min | webkit, shard 13 |
| `my-listings-ad.spec.ts` | 38 | 2.8 min | shard 8 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 4 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 12 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 9 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 16 |
| `choice-lists.spec.ts` | 96 | 2.4 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 10 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 6 |
| `failure-crawl-member-account.spec.ts` | 16 | 2.1 min | shard 15 |
| `admin-services.spec.ts` | 10 | 2.0 min | shard 1 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.4 min | smoke, shard 8 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 4 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 13 |
| `press.spec.ts` | 22 | 1.0 min | shard 16 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.9 min | shard 6 |
| `staff-gate.spec.ts` | 4 | 0.8 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 7 |
| `user-guides.spec.ts` | 18 | 0.7 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.6 min | shard 10 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 9 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `settings.spec.ts` | 16 | 0.5 min | shard 7 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 6 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 13 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 3 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 2 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 12 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 15 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 15 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 7 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 3 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 9 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 278.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 134.5 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 102.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 77.8 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 71.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 70.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 69.5 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 69.3 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 68.8 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 67.7 s |
| `failure-crawl-admin-content.spec.ts` › FCR-71 /admin/listings as staff: loads clean and says every failed read | mobile-360 | 62.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 60.1 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 59.9 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.6 s |
