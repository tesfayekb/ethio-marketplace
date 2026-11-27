# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46045246757 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46045246757
- Commit: `c33104bcbc0b8af535026283513f326365d303fe`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-27T18:23:26.831Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 13` · one-line-slots-admin.spec.ts › OLS-10 the remaining admin tables stay one line — Error: the switcher lists the public languages
- FLAKY (passed on retry) · `mobile-360` · source `shard 15` · failure-crawl-member-account.spec.ts › FAILURE CRAWL — the member's account pages (DEC-459 c) › FCR-34 /settings as member: loads clean and says every failed read — Error: /settings rpc has_password (malformed): the read failed and the screen said nothing (no failure notice)

## Flaky bodies (DEC-078)

### one-line-slots-admin.spec.ts › OLS-10 the remaining admin tables stay one line

- Source: `shard 13`
- Project: `mobile-360`

```text
Error: the switcher lists the public languages

expect(received).toContain(expected) // indexOf

Expected value: "en"
Received array: []
--- further error 1 ---
Error: the switcher lists the public languages

expect(received).toContain(expected) // indexOf

Expected value: "en"
Received array: []

  38 |   await page.keyboard.press("Escape");
  39 |   await expect(page.getByRole("menu")).toHaveCount(0);
> 40 |   expect(languages, "the switcher lists the public languages").toContain("en");
     |                                                                ^
  41 |   return languages;
  42 | }
  43 |
    at publicLanguages (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/one-line-slots-admin.spec.ts:40:64)
    at walk (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/one-line-slots-admin.spec.ts:63:45)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/one-line-slots-admin.spec.ts:93:3
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - link:
                  - /url: /terms
                  - text: Terms
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - group [ref=e2]:
      - menuitemradio "English" [checked] [ref=e3]:
        - img [ref=e6]
        - generic [ref=e9]: English
      - menuitemradio "አማርኛ" [ref=e10]:
        - generic [ref=e13]: አማርኛ
```
```

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
| smoke | 2026-11-27T17:59:19.542Z | 7.0 min |
| email | 2026-11-27T17:57:03.281Z | 0.4 min |
| webkit | 2026-11-27T17:56:59.892Z | 11.8 min |
| shard 1 | 2026-11-27T17:56:27.588Z | 12.1 min |
| shard 2 | 2026-11-27T17:56:55.450Z | 11.1 min |
| shard 3 | 2026-11-27T17:57:54.157Z | 8.9 min |
| shard 4 | 2026-11-27T17:56:52.317Z | 7.1 min |
| shard 5 | 2026-11-27T17:56:44.027Z | 17.8 min |
| shard 6 | 2026-11-27T17:56:31.163Z | 19.0 min |
| shard 7 | 2026-11-27T17:57:09.299Z | 18.0 min |
| shard 8 | 2026-11-27T17:57:10.260Z | 12.8 min |
| shard 9 | 2026-11-27T17:56:39.556Z | 7.6 min |
| shard 10 | 2026-11-27T17:57:11.528Z | 18.4 min |
| shard 11 | 2026-11-27T17:57:10.504Z | 25.6 min |
| shard 12 | 2026-11-27T17:56:33.210Z | 14.5 min |
| shard 13 | 2026-11-27T17:56:50.269Z | 11.4 min |
| shard 14 | 2026-11-27T17:59:36.458Z | 18.6 min |
| shard 15 | 2026-11-27T17:57:47.979Z | 16.3 min |
| shard 16 | 2026-11-27T17:56:45.113Z | 12.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 25.7 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 20.9 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.6 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 18.9 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.4 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 17.2 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 15.6 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.1 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.5 min | shard 10 |
| `admin-monetisation.spec.ts` | 34 | 13.6 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.4 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 11.2 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 9.5 min | smoke, shard 1 |
| `shell.spec.ts` | 234 | 9.1 min | shard 1 |
| `failure-crawl-admin-content.spec.ts` | 18 | 8.9 min | shard 2 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 11 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.3 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 11 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 6.9 min | shard 4 |
| `failure-crawl-admin-people.spec.ts` | 14 | 6.8 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 6.7 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 6.1 min | smoke, shard 1 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.8 min | shard 7 |
| `dialogs.spec.ts` | 36 | 5.3 min | webkit, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 5 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 9 |
| `admin-guides.spec.ts` | 14 | 5.0 min | shard 2 |
| `admin-screening-reject.spec.ts` | 10 | 4.5 min | shard 2 |
| `ad-page.spec.ts` | 104 | 4.4 min | webkit, shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 15 |
| `admin-users.spec.ts` | 28 | 4.3 min | shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 4.1 min | shard 16 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 7 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 12 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 8 |
| `mfa-stepup.spec.ts` | 28 | 3.3 min | webkit, shard 15 |
| `post-wizard-category.spec.ts` | 54 | 3.2 min | webkit, shard 13 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.9 min | shard 10 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 3 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 4 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 12 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 16 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 9 |
| `admin-services.spec.ts` | 10 | 2.0 min | shard 1 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 6 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.9 min | shard 15 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.8 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.7 min | smoke, shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 10 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `my-listings-page.spec.ts` | 24 | 1.3 min | webkit, shard 10 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 7 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 8 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `my-listings-doors.spec.ts` | 28 | 1.0 min | shard 9 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 11 |
| `press.spec.ts` | 22 | 0.9 min | shard 16 |
| `settings.spec.ts` | 16 | 0.8 min | shard 7 |
| `staff-gate.spec.ts` | 4 | 0.8 min | shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.6 min | shard 10 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 7 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 3 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 13 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 5 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 8 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 3 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 15 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 2 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 15 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 12 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 7 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 2 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 15 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 3 |
| `offline.spec.ts` | 2 | 0.1 min | shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 6 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 281.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 136.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.3 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 99.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 75.2 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 69.5 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 66.9 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.9 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 66.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 65.8 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 60.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 60.0 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 60.0 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.3 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 58.0 s |
