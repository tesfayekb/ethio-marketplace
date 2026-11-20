# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44659370909 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44659370909
- Commit: `a30b6aa4dc09c4748e10b827e0d5d427acf97043`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-81ef93bb6927… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-20T02:30:13.581Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-attributes-library.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN — Error: expect(locator).toContainText(expected) failed

## Flaky bodies (DEC-078)

### admin-attributes-library.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_pv00ik-card')
Expected substring: "ኢ2ኢ 9yq4gj"
Received string:    "e2e_attr_pv00ike2e_attr_pv00ikTextNot used by any category yet.—"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_pv00ik-card')
    14 × locator resolved to <div class="min-w-0 space-y-1" data-testid="attribute-row-e2e_attr_pv00ik-card">…</div>
       - unexpected value "e2e_attr_pv00ike2e_attr_pv00ikTextNot used by any category yet.—"

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_pv00ik-card')
Expected substring: "ኢ2ኢ 9yq4gj"
Received string:    "e2e_attr_pv00ike2e_attr_pv00ikTextNot used by any category yet.—"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_pv00ik-card')
    14 × locator resolved to <div class="min-w-0 space-y-1" data-testid="attribute-row-e2e_attr_pv00ik-card">…</div>
       - unexpected value "e2e_attr_pv00ike2e_attr_pv00ikTextNot used by any category yet.—"


  714 |         timeout: 20000,
  715 |       });
> 716 |       await expect(row).toContainText(marker);
      |                         ^
  717 |
  718 |       // THE FALLBACK: remove the approved row and the EN name answers again.
```

Context:

```text
          - listitem [ref=e372]:
            - generic [ref=e373]: About
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Help" [ref=e376]:
        - heading "Help" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Safety
      - navigation "Legal" [ref=e381]:
        - heading "Legal" [level=2] [ref=e382]
        - list [ref=e383]:
          - listitem [ref=e384]:
            - link "Terms" [ref=e385] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e386]:
            - link "Privacy" [ref=e387] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e389]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

64 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 8 |
| `categories file too large` (quiet) | 2 | shard 4 |
| `categories nulByte` (quiet) | 2 | shard 4 |
| `categories unknownColumn` (quiet) | 2 | shard 4 |
| `countries badHeader` (quiet) | 2 | shard 4 |
| `countries nulByte` (quiet) | 2 | shard 4 |
| `countries tooManyRows` (quiet) | 2 | shard 4 |
| `countries unknownColumn` (quiet) | 2 | shard 4 |
| `countries wrongFile` (quiet) | 2 | shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 4 |
| `definitions tooManyRows` (quiet) | 2 | shard 4 |
| `definitions unknownColumn` (quiet) | 2 | shard 4 |
| `links unknownColumn` (quiet) | 2 | shard 4 |
| `locations badHeader` (quiet) | 2 | shard 4 |
| `locations file too large` (quiet) | 2 | shard 4 |
| `locations nulByte` (quiet) | 2 | shard 4 |
| `locations unknownColumn` (quiet) | 2 | shard 4 |
| `locations wrongFile` (quiet) | 2 | shard 4 |
| `rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>` | 2 | shard 2 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>

- Count: 2 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-7 the draft dial refuses by name once the ceiling is reached ×2 · PR-8 no bearer is 401 on every posting route ×2

```text
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-20T03:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-20T02:18:42.570Z | 4.6 min |
| email | 2026-11-20T02:21:25.005Z | 0.3 min |
| webkit | 2026-11-20T02:18:26.409Z | 8.3 min |
| shard 1 | 2026-11-20T02:18:02.106Z | 5.4 min |
| shard 2 | 2026-11-20T02:19:24.119Z | 6.3 min |
| shard 3 | 2026-11-20T02:21:35.306Z | 7.7 min |
| shard 4 | 2026-11-20T02:18:41.501Z | 7.5 min |
| shard 5 | 2026-11-20T02:20:34.132Z | 6.1 min |
| shard 6 | 2026-11-20T02:20:36.200Z | 7.0 min |
| shard 7 | 2026-11-20T02:20:33.566Z | 5.3 min |
| shard 8 | 2026-11-20T02:18:58.159Z | 7.2 min |
| shard 9 | 2026-11-20T02:22:29.664Z | 5.4 min |
| shard 10 | 2026-11-20T02:23:03.797Z | 5.4 min |
| shard 11 | 2026-11-20T02:19:12.807Z | 5.6 min |
| shard 12 | 2026-11-20T02:19:59.949Z | 5.7 min |
| shard 13 | 2026-11-20T02:22:48.178Z | 4.9 min |
| shard 14 | 2026-11-20T02:22:35.490Z | 5.2 min |
| shard 15 | 2026-11-20T02:18:40.206Z | 6.8 min |
| shard 16 | 2026-11-20T02:19:04.174Z | 5.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `import-security.spec.ts` | 36 | 6.7 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.4 min | shard 3 |
| `admin-attributes-library.spec.ts` | 42 | 6.3 min | shard 2 |
| `admin-listings.spec.ts` | 78 | 6.0 min | webkit, shard 10 |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | smoke, shard 8 |
| `admin-locations.spec.ts` | 38 | 5.4 min | shard 6 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `admin-screening.spec.ts` | 58 | 4.6 min | webkit, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 4.3 min | shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 4.2 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.2 min | shard 15 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-translations-governance.spec.ts` | 20 | 3.5 min | smoke, shard 16 |
| `sage-bands.spec.ts` | 76 | 3.4 min | shard 6 |
| `post-wizard-category.spec.ts` | 52 | 3.4 min | webkit, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 3.1 min | shard 3 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 2 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.6 min | shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 2.6 min | shard 8 |
| `dialogs.spec.ts` | 20 | 2.4 min | webkit, shard 10 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 2.0 min | webkit, shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.9 min | webkit, shard 2 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 1.7 min | webkit, shard 11 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.5 min | shard 3 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 8 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `my-listings-page.spec.ts` | 20 | 0.8 min | webkit, shard 10 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.0 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 52.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 52.3 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.5 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 51.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 35.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 34.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 32.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 32.0 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 31.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.8 s |
