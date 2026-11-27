# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46000329861 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46000329861
- Commit: `743261a80183b10040da77d0d479e49fe5a917cd`
- Attempt: 2
- Repeat: 40 of 60 tests repeated — specs directly changed 1/1, importers of a changed helper 5/7; budget 793 s; the time cap left 80 test runs
- Written (UTC): 2026-11-27T14:54:13.698Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): repeat (2)

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 14` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 14`
- Project: `desktop-1280`

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
            - listitem [ref=e330]:
              - generic [ref=e331]: Safety
        - navigation "Legal" [ref=e332]:
          - heading "Legal" [level=2] [ref=e333]
          - list [ref=e334]:
            - listitem [ref=e335]:
              - link "Terms" [ref=e336] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e337]:
              - link "Privacy" [ref=e338] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e340]: © 2026 ethio.com — All rights reserved.
  - region "e2e-post-local-14-2-4k8mfg" [ref=e341]:
    - list [ref=e342]:
      - listitem [ref=e343]:
        - link "e2e-post-local-14-2-ru7j6a" [ref=e344] [cursor=pointer]:
          - /url: /c/e2e-post-local-14-2-ru7j6a
          - img [ref=e346]
          - generic [ref=e350]: e2e-post-local-14-2-ru7j6a
```
```

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 913s for the test suite to run
(no place given)
```

```text
Timed out waiting 913s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-27T12:41:53.707Z | 7.0 min |
| email | 2026-11-27T12:42:50.055Z | 0.4 min |
| webkit | 2026-11-27T12:41:53.580Z | 10.7 min |
| shard 1 | 2026-11-27T12:42:12.772Z | 11.8 min |
| shard 2 | 2026-11-27T12:45:19.048Z | 10.6 min |
| shard 3 | 2026-11-27T12:42:09.453Z | 9.2 min |
| shard 4 | 2026-11-27T12:42:37.622Z | 7.5 min |
| shard 5 | 2026-11-27T12:41:51.808Z | 17.7 min |
| shard 6 | 2026-11-27T12:41:39.948Z | 18.9 min |
| shard 7 | 2026-11-27T12:42:06.839Z | 17.0 min |
| shard 8 | 2026-11-27T12:43:36.167Z | 12.7 min |
| shard 9 | 2026-11-27T12:42:03.891Z | 7.4 min |
| shard 10 | 2026-11-27T14:35:38.199Z | 18.2 min |
| shard 11 | 2026-11-27T12:42:43.627Z | 26.0 min |
| shard 12 | 2026-11-27T12:44:54.852Z | 15.7 min |
| shard 13 | 2026-11-27T12:42:28.923Z | 11.2 min |
| shard 14 | 2026-11-27T12:44:35.155Z | 19.1 min |
| shard 15 | 2026-11-27T12:42:05.279Z | 16.1 min |
| shard 16 | 2026-11-27T12:42:14.755Z | 12.4 min |
| repeat | 2026-11-27T12:42:04.051Z | 15.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.2 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.1 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.8 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.0 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.3 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 17.0 min | shard 6 |
| `failure-crawl-admin-content.spec.ts` | 54 | 16.9 min | shard 2, repeat |
| `admin-attributes-links.spec.ts` | 34 | 16.0 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.3 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.6 min | shard 10 |
| `failure-crawl-admin-catalog.spec.ts` | 54 | 14.0 min | shard 4, repeat |
| `admin-monetisation.spec.ts` | 34 | 13.5 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.7 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 11.3 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 9.5 min | smoke, shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 11 |
| `shell.spec.ts` | 234 | 9.0 min | shard 1 |
| `failure-crawl-member-listings.spec.ts` | 30 | 7.3 min | shard 3, repeat |
| `admin-attributes-safety.spec.ts` | 18 | 7.1 min | shard 11 |
| `failure-crawl-admin-people.spec.ts` | 42 | 6.8 min | shard 5, repeat |
| `admin-countries.spec.ts` | 18 | 6.8 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 5.8 min | smoke, shard 1 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 7 |
| `photo-pipeline.spec.ts` | 74 | 5.0 min | webkit, shard 12 |
| `dialogs.spec.ts` | 36 | 4.9 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 9 |
| `admin-guides.spec.ts` | 14 | 4.6 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 15 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 9 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 13 |
| `admin-screening-reject.spec.ts` | 10 | 4.1 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 4.1 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 3 |
| `mfa-stepup.spec.ts` | 28 | 3.2 min | webkit, shard 15 |
| `post-wizard-category.spec.ts` | 54 | 3.0 min | webkit, shard 13 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 3 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 4 |
| `my-listings-ad.spec.ts` | 38 | 2.9 min | shard 8 |
| `failure-crawl-public.spec.ts` | 26 | 2.8 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 2.4 min | smoke, shard 8 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 6 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 16 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.7 min | shard 11 |
| `admin-services.spec.ts` | 10 | 1.7 min | shard 1 |
| `failure-crawl-member-account.spec.ts` | 48 | 1.7 min | shard 15, repeat |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 13 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `breadcrumbs.spec.ts` | 6 | 1.0 min | shard 10 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 12 |
| `press.spec.ts` | 22 | 0.9 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 11 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 9 |
| `settings.spec.ts` | 16 | 0.6 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `sage-shell.spec.ts` | 80 | 0.5 min | shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 12 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 7 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 5 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `staff-gate.spec.ts` | 4 | 0.3 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 3 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 15 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 8 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 2 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 12 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 15 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `error-reports.spec.ts` | 12 | 0.1 min | shard 15, repeat |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 3 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 2 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 7 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `offline.spec.ts` | 2 | 0.1 min | shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 6 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 281.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 136.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 122.2 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.9 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 106.8 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 98.9 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 75.3 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 70.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 68.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 67.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.5 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 66.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 65.9 s |
