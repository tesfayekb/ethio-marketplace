# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45915473124 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45915473124
- Commit: `1b2c6bc74d83ccdfff2f5328870e06366485da2b`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-4a3c9d6d1285… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-27T00:59:15.353Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 14` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:171:3)
    at holder (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2121:7)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2155:5
```

Context:

```text
          - listitem [ref=e306]:
            - generic [ref=e307]: About
          - listitem [ref=e308]:
            - generic [ref=e309]: Contact
      - navigation "Help" [ref=e310]:
        - heading "Help" [level=2] [ref=e311]
        - list [ref=e312]:
          - listitem [ref=e313]:
            - generic [ref=e314]: Safety
      - navigation "Legal" [ref=e315]:
        - heading "Legal" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - link "Terms" [ref=e319] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e320]:
            - link "Privacy" [ref=e321] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e323]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-11-27T00:32:12.364Z | 6.9 min |
| email | 2026-11-27T00:32:11.023Z | 0.3 min |
| webkit | 2026-11-27T00:32:40.962Z | 14.8 min |
| shard 1 | 2026-11-27T00:32:18.254Z | 11.7 min |
| shard 2 | 2026-11-27T00:32:03.920Z | 10.9 min |
| shard 3 | 2026-11-27T00:32:36.744Z | 9.4 min |
| shard 4 | 2026-11-27T00:32:02.781Z | 7.5 min |
| shard 5 | 2026-11-27T00:32:48.118Z | 17.8 min |
| shard 6 | 2026-11-27T00:32:16.880Z | 18.2 min |
| shard 7 | 2026-11-27T00:32:29.195Z | 17.1 min |
| shard 8 | 2026-11-27T00:32:45.903Z | 13.2 min |
| shard 9 | 2026-11-27T00:32:13.520Z | 8.0 min |
| shard 10 | 2026-11-27T00:31:51.492Z | 18.0 min |
| shard 11 | 2026-11-27T00:32:20.099Z | 25.9 min |
| shard 12 | 2026-11-27T00:33:07.001Z | 14.9 min |
| shard 13 | 2026-11-27T00:34:09.653Z | 11.5 min |
| shard 14 | 2026-11-27T00:33:04.873Z | 19.7 min |
| shard 15 | 2026-11-27T00:34:35.986Z | 17.1 min |
| shard 16 | 2026-11-27T00:32:40.625Z | 14.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.6 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.1 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.9 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.3 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.3 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 16.7 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 16.1 min | shard 16 |
| `admin-locations.spec.ts` | 44 | 15.1 min | shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 15.1 min | shard 10 |
| `admin-monetisation.spec.ts` | 34 | 12.5 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.8 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 10.9 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 9.6 min | smoke, shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.2 min | shard 11 |
| `shell.spec.ts` | 234 | 9.0 min | shard 1 |
| `failure-crawl-admin-content.spec.ts` | 18 | 8.9 min | shard 2 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.5 min | shard 3 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.3 min | shard 4 |
| `admin-countries.spec.ts` | 18 | 7.1 min | shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 11 |
| `failure-crawl-admin-people.spec.ts` | 14 | 6.8 min | shard 5 |
| `dialogs.spec.ts` | 36 | 6.7 min | webkit, shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 5.6 min | smoke, shard 1 |
| `auth-signout.spec.ts` | 44 | 5.6 min | webkit, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 5.4 min | shard 16 |
| `ad-page.spec.ts` | 104 | 5.3 min | webkit, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 7 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `feed-screens.spec.ts` | 40 | 5.2 min | webkit, shard 9 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 15 |
| `admin-guides.spec.ts` | 14 | 4.9 min | shard 2 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 13 |
| `admin-screening-reject.spec.ts` | 10 | 4.4 min | shard 2 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 14 |
| `photo-pipeline.spec.ts` | 74 | 3.9 min | webkit, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 3 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 7 |
| `post-wizard-category.spec.ts` | 54 | 3.6 min | webkit, shard 13 |
| `mfa-stepup.spec.ts` | 28 | 3.6 min | webkit, shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 8 |
| `choice-lists.spec.ts` | 96 | 3.4 min | shard 3 |
| `posting-routes.spec.ts` | 80 | 3.0 min | shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 4 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 12 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 2.4 min | webkit, shard 6 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 10 |
| `failure-crawl-member-public.spec.ts` | 14 | 2.1 min | shard 14 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 14 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.9 min | shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.7 min | smoke, shard 8 |
| `admin-categories-images.spec.ts` | 6 | 1.7 min | smoke, webkit, shard 15 |
| `admin-services.spec.ts` | 10 | 1.7 min | shard 1 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 4 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `press.spec.ts` | 22 | 1.2 min | shard 16 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 13 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 8 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 7 |
| `house-style.spec.ts` | 18 | 0.9 min | shard 14 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 7 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 11 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `staff-gate.spec.ts` | 4 | 0.8 min | shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 9 |
| `settings.spec.ts` | 16 | 0.6 min | shard 7 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `breadcrumbs.spec.ts` | 6 | 0.6 min | shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 16 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 5 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.3 min | shard 4 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 6 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 3 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 14 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 2 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 13 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 15 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 4 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 7 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 5 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 9 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 284.7 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 136.6 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 107.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 101.3 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 77.2 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 70.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 69.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 68.5 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 67.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.9 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.0 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 59.9 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 59.8 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.4 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 59.3 s |
