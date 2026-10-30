# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 41096998961 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41096998961
- Commit: `8c48bb2a2f1eaed45c35363f63c3ed47c5a93e2a`
- Attempt: 1
- Written (UTC): 2026-10-30T17:43:06.308Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 15` · shell-bands.spec.ts › D258 band rows, fine pointer › BND-E1 every band row is 40 px and the menu starts on its boundary (signed in) — Error: expect(received).toContain(expected) // indexOf

## Flaky bodies (DEC-078)

### shell-bands.spec.ts › D258 band rows, fine pointer › BND-E1 every band row is 40 px and the menu starts on its boundary (signed in)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected value: "panel-tabs"
Received array: ["panel-header", "shell-breadcrumb-row", "location-row"]
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected value: "panel-tabs"
Received array: ["panel-header", "shell-breadcrumb-row", "location-row"]

  61 |               expect.arrayContaining(["shell-breadcrumb-row", "location-row"]),
  62 |             );
> 63 |             if (signedIn) expect(ids).toContain("panel-tabs");
     |                                       ^
  64 |             for (const row of rows)
  65 |               expect(Math.abs(row.h - 40), `${label}: ${row.id} is 40 px`).toBeLessThanOrEqual(1);
  66 |             const bar = await box(page, "shell-band");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell-bands.spec.ts:63:39
```

Context:

```text
          - listitem [ref=e296]:
            - generic [ref=e297]: About
          - listitem [ref=e298]:
            - generic [ref=e299]: Contact
      - navigation "Help" [ref=e300]:
        - heading "Help" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Safety
      - navigation "Legal" [ref=e305]:
        - heading "Legal" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - link "Terms" [ref=e309] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e310]:
            - link "Privacy" [ref=e311] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e313]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-30T17:16:49.427Z | 12.8 min |
| email | 2026-10-30T17:18:25.073Z | 0.4 min |
| shard 1 | 2026-10-30T17:17:19.729Z | 9.6 min |
| shard 2 | 2026-10-30T17:19:53.270Z | 16.7 min |
| shard 3 | 2026-10-30T17:21:49.337Z | 8.3 min |
| shard 4 | 2026-10-30T17:16:33.324Z | 6.6 min |
| shard 5 | 2026-10-30T17:21:36.381Z | 9.9 min |
| shard 6 | 2026-10-30T17:16:36.194Z | 10.2 min |
| shard 7 | 2026-10-30T17:16:52.789Z | 9.3 min |
| shard 8 | 2026-10-30T17:17:41.429Z | 2.6 min |
| shard 9 | 2026-10-30T17:16:46.236Z | 8.1 min |
| shard 10 | 2026-10-30T17:17:11.205Z | 16.2 min |
| shard 11 | 2026-10-30T17:16:15.866Z | 10.4 min |
| shard 12 | 2026-10-30T17:17:55.388Z | 8.8 min |
| shard 13 | 2026-10-30T17:17:51.412Z | 10.8 min |
| shard 14 | 2026-10-30T17:17:17.607Z | 10.1 min |
| shard 15 | 2026-10-30T17:16:34.946Z | 7.8 min |
| shard 16 | 2026-10-30T17:17:12.328Z | 3.2 min |
| repeat | 2026-10-30T17:17:00.629Z | 5.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.3 min | smoke, shard 7, shard 15 |
| `auth-signout.spec.ts` | 68 | 5.9 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 5, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.1 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.9 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 26 | 4.4 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-screening.spec.ts` | 52 | 4.1 min | shard 2, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.1 min | shard 3, shard 11 |
| `import-security.spec.ts` | 36 | 4.1 min | shard 4, shard 12 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `photo-pipeline.spec.ts` | 68 | 3.9 min | shard 5, shard 13 |
| `admin-listings.spec.ts` | 62 | 3.8 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 3.7 min | shard 1, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `admin-users.spec.ts` | 28 | 3.4 min | shard 3, shard 11 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `admin-shell.spec.ts` | 36 | 3.2 min | shard 3, shard 11, repeat |
| `admin-attributes-editor.spec.ts` | 36 | 2.9 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 10 |
| `ad-page.spec.ts` | 78 | 2.5 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 2, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 7, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.6 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.6 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.3 min | shard 1, shard 9 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.9 min | shard 2, shard 10 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `submenu.spec.ts` | 42 | 0.8 min | shard 8, shard 16, repeat |
| `shell-bands.spec.ts` | 48 | 0.8 min | shard 7, shard 15, repeat |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `category-nav.spec.ts` | 30 | 0.6 min | shard 3, shard 11, repeat |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `submenu-look.spec.ts` | 36 | 0.6 min | shard 8, shard 16, repeat |
| `menu-rows.spec.ts` | 18 | 0.5 min | shard 8, shard 16, repeat |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 5, shard 13 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 3, shard 11 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `feed-index.spec.ts` | 30 | 0.1 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7, shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `ad-page-layout.spec.ts` | 2 | 0.0 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.4 s |
