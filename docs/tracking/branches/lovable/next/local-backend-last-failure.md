# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45911629824 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45911629824
- Commit: `9c2fe6878f389b9b73b4f5225c1ef2894751c2ba`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-27T00:03:10.256Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 2` · admin-guides.spec.ts › Admin › the Guide on every block (P-1c, D313) › AG-1 every admin section draws; every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not — Error: [e2e:ag] AG-1 /admin/places did not draw

## Flaky bodies (DEC-078)

### admin-guides.spec.ts › Admin › the Guide on every block (P-1c, D313) › AG-1 every admin section draws; every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: [e2e:ag] AG-1 /admin/places did not draw

expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-locations')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [e2e:ag] AG-1 /admin/places did not draw with timeout 20000ms
  - waiting for getByTestId('admin-section-locations')

--- further error 1 ---
Error: [e2e:ag] AG-1 /admin/places did not draw

expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-locations')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [e2e:ag] AG-1 /admin/places did not draw with timeout 20000ms
  - waiting for getByTestId('admin-section-locations')


  135 |         page.getByTestId(sectionFrame(section.id)),
  136 |         `${TAG} AG-1 ${section.path} did not draw`,
> 137 |       ).toBeVisible({ timeout: 20000 });
      |         ^
  138 |       const toolbars = page.getByTestId("data-table-toolbar");
  139 |       const guides = guideControls(page);
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_FAILED
```

Context:

```text
          - listitem [ref=e270]:
            - generic [ref=e271]: About
          - listitem [ref=e272]:
            - generic [ref=e273]: Contact
      - navigation "Help" [ref=e274]:
        - heading "Help" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Safety
      - navigation "Legal" [ref=e279]:
        - heading "Legal" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - link "Terms" [ref=e283] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e284]:
            - link "Privacy" [ref=e285] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e287]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-11-26T23:40:24.247Z | 7.1 min |
| email | 2026-11-26T23:37:31.090Z | 0.4 min |
| webkit | 2026-11-26T23:37:04.000Z | 10.6 min |
| shard 1 | 2026-11-26T23:37:30.632Z | 13.4 min |
| shard 2 | 2026-11-26T23:37:30.546Z | 11.7 min |
| shard 3 | 2026-11-26T23:36:50.260Z | 8.7 min |
| shard 4 | 2026-11-26T23:37:20.979Z | 7.3 min |
| shard 5 | 2026-11-26T23:36:52.107Z | 17.7 min |
| shard 6 | 2026-11-26T23:39:09.686Z | 18.4 min |
| shard 7 | 2026-11-26T23:36:39.371Z | 15.9 min |
| shard 8 | 2026-11-26T23:37:34.563Z | 12.9 min |
| shard 9 | 2026-11-26T23:37:07.820Z | 7.4 min |
| shard 10 | 2026-11-26T23:37:26.785Z | 18.4 min |
| shard 11 | 2026-11-26T23:37:05.304Z | 25.6 min |
| shard 12 | 2026-11-26T23:38:03.358Z | 15.5 min |
| shard 13 | 2026-11-26T23:37:31.769Z | 11.2 min |
| shard 14 | 2026-11-26T23:37:03.459Z | 18.7 min |
| shard 15 | 2026-11-26T23:39:09.737Z | 16.0 min |
| shard 16 | 2026-11-26T23:37:46.656Z | 14.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.0 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.0 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.4 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.4 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.2 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 16.9 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 15.9 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.4 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.7 min | shard 10 |
| `admin-monetisation.spec.ts` | 34 | 12.5 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.5 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 11.3 min | shard 13 |
| `shell.spec.ts` | 234 | 10.2 min | shard 1 |
| `failure-crawl-admin-content.spec.ts` | 18 | 9.5 min | shard 2 |
| `legal-doors.spec.ts` | 34 | 9.1 min | smoke, shard 1 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 11 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 3 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.1 min | shard 4 |
| `admin-translations-governance.spec.ts` | 20 | 7.0 min | smoke, shard 1 |
| `failure-crawl-admin-people.spec.ts` | 14 | 6.9 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 6.8 min | shard 8 |
| `auth-signout.spec.ts` | 44 | 5.5 min | webkit, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 5.4 min | shard 16 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `admin-guides.spec.ts` | 14 | 5.2 min | shard 2 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 9 |
| `dialogs.spec.ts` | 36 | 4.9 min | webkit, shard 9 |
| `photo-pipeline.spec.ts` | 74 | 4.5 min | webkit, shard 12 |
| `admin-screening-reject.spec.ts` | 10 | 4.4 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 15 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.3 min | shard 7 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 9 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 7 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 3 |
| `mfa-stepup.spec.ts` | 28 | 3.1 min | webkit, shard 15 |
| `posting-routes.spec.ts` | 80 | 3.0 min | shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 4 |
| `post-wizard-category.spec.ts` | 54 | 2.9 min | webkit, shard 13 |
| `failure-crawl-public.spec.ts` | 26 | 2.6 min | shard 12 |
| `choice-lists.spec.ts` | 96 | 2.4 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.2 min | shard 9 |
| `admin-services.spec.ts` | 10 | 2.0 min | shard 1 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 6 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `name-check-queue.spec.ts` | 8 | 1.8 min | smoke, shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.8 min | webkit, shard 2 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 15 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 14 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 10 |
| `press.spec.ts` | 22 | 1.2 min | shard 16 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 13 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 8 |
| `breadcrumbs.spec.ts` | 6 | 1.0 min | shard 10 |
| `sage-shell.spec.ts` | 80 | 0.9 min | shard 16 |
| `staff-gate.spec.ts` | 4 | 0.8 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 12 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 13 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 9 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 4 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 16 |
| `settings.spec.ts` | 16 | 0.5 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 3 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 13 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 6 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 2 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 8 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 6 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 15 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 4 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 5 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 7 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `locale-format.spec.ts` | 2 | 0.0 min | shard 3 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 277.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 133.4 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 109.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 99.6 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 76.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 71.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 71.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 70.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 69.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 67.7 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 64.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-71 /admin/listings as staff: loads clean and says every failed read | mobile-360 | 62.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 61.0 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 60.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 59.9 s |
