# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41217044558
- Commit: `3033041c84421789ec460300981fbf2cd30971fa`
- Attempt: 1
- Written (UTC): 2026-10-31T16:13:22.937Z
- Passed: 2576 · Skipped: 365 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 15` · sage-bands.spec.ts › Sage bands at 1440, light › SGB-5 current tab and crumb share the location raised segment (1440, light) — Error: background-color

## Flaky bodies (DEC-078)

### sage-bands.spec.ts › Sage bands at 1440, light › SGB-5 current tab and crumb share the location raised segment (1440, light)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.999979 -0.00000644592 0.0000017634)"
Received: "oklch(1 0 89.9)"
--- further error 1 ---
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.999979 -0.00000644592 0.0000017634)"
Received: "oklch(1 0 89.9)"

  219 |             "font-weight",
  220 |           ])
> 221 |             expect(await style(segment, property), property).toBe(await style(chosen, property));
      |                                                              ^
  222 |         }
  223 |         const track = page.getByTestId("location-track");
  224 |         for (const id of ["panel-track", "breadcrumb-track"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-bands.spec.ts:221:62
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
```

Context:

```text
          - listitem [ref=e333]:
            - generic [ref=e334]: About
          - listitem [ref=e335]:
            - generic [ref=e336]: Contact
      - navigation "Help" [ref=e337]:
        - heading "Help" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - generic [ref=e341]: Safety
      - navigation "Legal" [ref=e342]:
        - heading "Legal" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - link "Terms" [ref=e346] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e347]:
            - link "Privacy" [ref=e348] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e350]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 9 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 9
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-51 the first photo is in the server's page at its signed link, loads at once  ×1 · AP-52 an ad without photos loads its category picture at once with high priority ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-31T15:56:50.883Z | 12.5 min |
| email | 2026-10-31T15:56:46.772Z | 0.3 min |
| shard 1 | 2026-10-31T15:56:55.546Z | 12.1 min |
| shard 2 | 2026-10-31T16:00:50.188Z | 12.1 min |
| shard 3 | 2026-10-31T15:57:36.076Z | 11.2 min |
| shard 4 | 2026-10-31T15:59:16.444Z | 9.0 min |
| shard 5 | 2026-10-31T15:58:10.184Z | 11.3 min |
| shard 6 | 2026-10-31T15:57:26.179Z | 12.4 min |
| shard 7 | 2026-10-31T15:57:20.120Z | 3.4 min |
| shard 8 | 2026-10-31T15:56:55.675Z | 7.5 min |
| shard 9 | 2026-10-31T15:56:55.201Z | 10.7 min |
| shard 10 | 2026-10-31T15:58:11.095Z | 13.2 min |
| shard 11 | 2026-10-31T15:57:28.169Z | 11.4 min |
| shard 12 | 2026-10-31T16:00:15.915Z | 10.1 min |
| shard 13 | 2026-10-31T15:57:02.123Z | 9.5 min |
| shard 14 | 2026-10-31T15:57:17.709Z | 11.4 min |
| shard 15 | 2026-10-31T15:57:30.319Z | 3.0 min |
| shard 16 | 2026-10-31T15:57:11.631Z | 7.1 min |
| repeat | 2026-10-31T15:58:02.168Z | 8.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.2 min | smoke, shard 8, shard 16 |
| `post-wizard-pricing.spec.ts` | 156 | 10.1 min | shard 6, shard 14, repeat |
| `auth-signout.spec.ts` | 68 | 6.3 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.4 min | shard 5, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.2 min | shard 1, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 4.8 min | shard 3, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `import-security.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.2 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 6, shard 14 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 3.9 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 8, shard 16 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `admin-categories-console.spec.ts` | 34 | 3.8 min | shard 1, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 3.7 min | shard 1, shard 9 |
| `admin-screening.spec.ts` | 52 | 3.5 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.5 min | shard 5, shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.2 min | shard 2, shard 10 |
| `choice-lists.spec.ts` | 96 | 3.2 min | shard 3, shard 11 |
| `sage-bands.spec.ts` | 76 | 3.1 min | shard 7, shard 15 |
| `admin-listings.spec.ts` | 62 | 3.1 min | shard 2, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 2.9 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.7 min | shard 5, shard 13 |
| `ad-page.spec.ts` | 78 | 2.6 min | shard 1, shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 6, shard 14 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 2.1 min | shard 4, shard 12 |
| `admin-countries.spec.ts` | 18 | 2.0 min | shard 2, shard 10 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.6 min | shard 5, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 9 |
| `press.spec.ts` | 24 | 1.2 min | shard 7, shard 15, repeat |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2, shard 11 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 11 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `submenu.spec.ts` | 14 | 0.2 min | shard 8, shard 16 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `dark-cards.spec.ts` | 12 | 0.2 min | shard 3, shard 11, repeat |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.3 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41217044558-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41217044558-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41217044558-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41217044558-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41217044558-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 2, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 41217044558-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 2, fresh 13)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41217044558-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41217044558-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41217044558-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41217044558-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 41217044558-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 27 (pool 2, fresh 25)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 32 user(s) owned by process 41217044558-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41217044558-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 1, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41217044558-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-repeat
```

## sage-bands.spec.ts › Sage bands at 360, dark › SGB-5 current tab and crumb share the location raised segment (360, dark)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.309872 -0.0184747 0.00548847)"
Received: "oklch(0.312 0.019 163.4)"
--- further error 1 ---
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.309872 -0.0184747 0.00548847)"
Received: "oklch(0.312 0.019 163.4)"

  219 |             "font-weight",
  220 |           ])
> 221 |             expect(await style(segment, property), property).toBe(await style(chosen, property));
      |                                                              ^
  222 |         }
  223 |         const track = page.getByTestId("location-track");
  224 |         for (const id of ["panel-track", "breadcrumb-track"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-bands.spec.ts:221:62
```

Context:

```text
          - listitem [ref=e252]:
            - generic [ref=e253]: About
          - listitem [ref=e254]:
            - generic [ref=e255]: Contact
      - navigation "Help" [ref=e256]:
        - heading "Help" [level=2] [ref=e257]
        - list [ref=e258]:
          - listitem [ref=e259]:
            - generic [ref=e260]: Safety
      - navigation "Legal" [ref=e261]:
        - heading "Legal" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - link "Terms" [ref=e265] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e266]:
            - link "Privacy" [ref=e267] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e269]: © 2026 ethio.com — All rights reserved.
```
```

## sage-bands.spec.ts › Sage bands at 390, light › SGB-5 current tab and crumb share the location raised segment (390, light)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.997046 -0.000897127 0.000245426)"
Received: "oklch(1 0 89.9)"
--- further error 1 ---
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.997046 -0.000897127 0.000245426)"
Received: "oklch(1 0 89.9)"

  219 |             "font-weight",
  220 |           ])
> 221 |             expect(await style(segment, property), property).toBe(await style(chosen, property));
      |                                                              ^
  222 |         }
  223 |         const track = page.getByTestId("location-track");
  224 |         for (const id of ["panel-track", "breadcrumb-track"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-bands.spec.ts:221:62
```

Context:

```text
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
            - link "Terms" [ref=e269] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e270]:
            - link "Privacy" [ref=e271] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e273]: © 2026 ethio.com — All rights reserved.
```
```

## sage-bands.spec.ts › Sage bands at 390, dark › SGB-5 current tab and crumb share the location raised segment (390, dark)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.309869 -0.0184751 0.00548856)"
Received: "oklch(0.312 0.019 163.4)"
--- further error 1 ---
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.309869 -0.0184751 0.00548856)"
Received: "oklch(0.312 0.019 163.4)"

  219 |             "font-weight",
  220 |           ])
> 221 |             expect(await style(segment, property), property).toBe(await style(chosen, property));
      |                                                              ^
  222 |         }
  223 |         const track = page.getByTestId("location-track");
  224 |         for (const id of ["panel-track", "breadcrumb-track"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-bands.spec.ts:221:62
```

Context:

```text
          - listitem [ref=e252]:
            - generic [ref=e253]: About
          - listitem [ref=e254]:
            - generic [ref=e255]: Contact
      - navigation "Help" [ref=e256]:
        - heading "Help" [level=2] [ref=e257]
        - list [ref=e258]:
          - listitem [ref=e259]:
            - generic [ref=e260]: Safety
      - navigation "Legal" [ref=e261]:
        - heading "Legal" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - link "Terms" [ref=e265] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e266]:
            - link "Privacy" [ref=e267] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e269]: © 2026 ethio.com — All rights reserved.
```
```

## sage-bands.spec.ts › Sage bands at 834, light › SGB-5 current tab and crumb share the location raised segment (834, light)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.999173 -0.000251032 0.0000686747)"
Received: "oklch(1 0 89.9)"
--- further error 1 ---
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.999173 -0.000251032 0.0000686747)"
Received: "oklch(1 0 89.9)"

  219 |             "font-weight",
  220 |           ])
> 221 |             expect(await style(segment, property), property).toBe(await style(chosen, property));
      |                                                              ^
  222 |         }
  223 |         const track = page.getByTestId("location-track");
  224 |         for (const id of ["panel-track", "breadcrumb-track"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-bands.spec.ts:221:62
```

Context:

```text
          - listitem [ref=e333]:
            - generic [ref=e334]: About
          - listitem [ref=e335]:
            - generic [ref=e336]: Contact
      - navigation "Help" [ref=e337]:
        - heading "Help" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - generic [ref=e341]: Safety
      - navigation "Legal" [ref=e342]:
        - heading "Legal" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - link "Terms" [ref=e346] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e347]:
            - link "Privacy" [ref=e348] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e350]: © 2026 ethio.com — All rights reserved.
```
```

## sage-bands.spec.ts › Sage bands at 834, dark › SGB-5 current tab and crumb share the location raised segment (834, dark)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.311402 -0.018283 0.00544505)"
Received: "oklch(0.312 0.019 163.4)"
--- further error 1 ---
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.311402 -0.018283 0.00544505)"
Received: "oklch(0.312 0.019 163.4)"

  219 |             "font-weight",
  220 |           ])
> 221 |             expect(await style(segment, property), property).toBe(await style(chosen, property));
      |                                                              ^
  222 |         }
  223 |         const track = page.getByTestId("location-track");
  224 |         for (const id of ["panel-track", "breadcrumb-track"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-bands.spec.ts:221:62
```

Context:

```text
          - listitem [ref=e329]:
            - generic [ref=e330]: About
          - listitem [ref=e331]:
            - generic [ref=e332]: Contact
      - navigation "Help" [ref=e333]:
        - heading "Help" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Safety
      - navigation "Legal" [ref=e338]:
        - heading "Legal" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - link "Terms" [ref=e342] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e343]:
            - link "Privacy" [ref=e344] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e346]: © 2026 ethio.com — All rights reserved.
```
```

## sage-bands.spec.ts › Sage bands at 1440, dark › SGB-5 current tab and crumb share the location raised segment (1440, dark)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.311398 -0.0182835 0.00544516)"
Received: "oklch(0.312 0.019 163.4)"
--- further error 1 ---
Error: background-color

expect(received).toBe(expected) // Object.is equality

Expected: "oklab(0.311398 -0.0182835 0.00544516)"
Received: "oklch(0.312 0.019 163.4)"

  219 |             "font-weight",
  220 |           ])
> 221 |             expect(await style(segment, property), property).toBe(await style(chosen, property));
      |                                                              ^
  222 |         }
  223 |         const track = page.getByTestId("location-track");
  224 |         for (const id of ["panel-track", "breadcrumb-track"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-bands.spec.ts:221:62
```

Context:

```text
          - listitem [ref=e329]:
            - generic [ref=e330]: About
          - listitem [ref=e331]:
            - generic [ref=e332]: Contact
      - navigation "Help" [ref=e333]:
        - heading "Help" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Safety
      - navigation "Legal" [ref=e338]:
        - heading "Legal" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - link "Terms" [ref=e342] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e343]:
            - link "Privacy" [ref=e344] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e346]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

```text
[client-error] console.error: [client-error] gate fetch threw ×2
console.error: [client-error] gate fetch threw ×2
```

## Server errors: shard 15

No `[ssr-error]` lines in the `shard 15` log (or no log was uploaded).

## Client errors: shard 15

```text
[client-error] console.error: [client-error] gate fetch threw ×6
console.error: [client-error] gate fetch threw ×6
```
