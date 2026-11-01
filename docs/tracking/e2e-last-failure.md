# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 41260242855 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41260242855
- Commit: `6380598d88c0162e6f3d6dd525a7372801d93099`
- Attempt: 1
- Written (UTC): 2026-11-01T01:35:31.156Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 7` · press.spec.ts › The raised press (light) › PSP-1 a press raises each primitive at once and nothing moves (light) — Error: band segment: pressed ink

## Flaky bodies (DEC-078)

### press.spec.ts › The raised press (light) › PSP-1 a press raises each primitive at once and nothing moves (light)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: band segment: pressed ink

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 4.5
Received:    1.3276356459298722
--- further error 1 ---
Error: band segment: pressed ink

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 4.5
Received:    1.3276356459298722

  163 |             await contrast(page, during.ink, during.fill),
  164 |             `${name}: pressed ink`,
> 165 |           ).toBeGreaterThanOrEqual(4.5);
      |             ^
  166 |       }
  167 |
  168 |       // A list row: the language list's first option.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/press.spec.ts:165:13
```

Context:

```text
          - listitem [ref=e179]:
            - generic [ref=e180]: About
          - listitem [ref=e181]:
            - generic [ref=e182]: Contact
      - navigation "Help" [ref=e183]:
        - heading "Help" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Safety
      - navigation "Legal" [ref=e188]:
        - heading "Legal" [level=2] [ref=e189]
        - list [ref=e190]:
          - listitem [ref=e191]:
            - link "Terms" [ref=e192] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e193]:
            - link "Privacy" [ref=e194] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e196]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-11-01T01:19:11.413Z | 12.6 min |
| email | 2026-11-01T01:17:18.781Z | 0.3 min |
| shard 1 | 2026-11-01T01:17:49.764Z | 13.4 min |
| shard 2 | 2026-11-01T01:18:00.188Z | 16.2 min |
| shard 3 | 2026-11-01T01:18:06.715Z | 9.3 min |
| shard 4 | 2026-11-01T01:21:34.022Z | 9.6 min |
| shard 5 | 2026-11-01T01:18:06.397Z | 10.1 min |
| shard 6 | 2026-11-01T01:18:48.767Z | 11.3 min |
| shard 7 | 2026-11-01T01:19:00.615Z | 3.2 min |
| shard 8 | 2026-11-01T01:17:49.523Z | 8.1 min |
| shard 9 | 2026-11-01T01:18:39.181Z | 12.3 min |
| shard 10 | 2026-11-01T01:18:22.743Z | 16.3 min |
| shard 11 | 2026-11-01T01:18:47.028Z | 11.6 min |
| shard 12 | 2026-11-01T01:18:16.427Z | 9.5 min |
| shard 13 | 2026-11-01T01:20:37.943Z | 10.1 min |
| shard 14 | 2026-11-01T01:19:10.235Z | 13.2 min |
| shard 15 | 2026-11-01T01:18:21.248Z | 2.9 min |
| shard 16 | 2026-11-01T01:17:50.485Z | 7.9 min |
| repeat | 2026-11-01T01:18:34.722Z | 5.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.0 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 68 | 6.3 min | smoke, shard 3, shard 11 |
| `dialogs.spec.ts` | 84 | 6.3 min | shard 3, shard 11, repeat |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 5, shard 13 |
| `import-security.spec.ts` | 36 | 5.0 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 2, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 1, shard 10 |
| `admin-roles.spec.ts` | 26 | 4.4 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 6, shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-listings.spec.ts` | 62 | 3.8 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 68 | 3.4 min | shard 5, shard 13 |
| `choice-lists.spec.ts` | 96 | 3.3 min | shard 3, shard 11 |
| `ad-page.spec.ts` | 78 | 3.2 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 7, shard 15 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 5, shard 13 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 42 | 2.1 min | shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 1, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2, shard 11 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `press.spec.ts` | 16 | 0.8 min | shard 7, shard 15 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 11 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 9, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5, shard 12 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 35.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.0 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
