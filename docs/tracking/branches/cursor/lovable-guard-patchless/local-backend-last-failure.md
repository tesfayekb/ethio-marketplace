# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43867687998 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43867687998
- Commit: `7257246fd65567d0e10ebd5b4119fa7f60a07e55`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-16T12:46:12.663Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · one-line-slots-admin.spec.ts › OLS-9 the fourth admin tables stay one line — Error: the switcher lists the public languages

## Flaky bodies (DEC-078)

### one-line-slots-admin.spec.ts › OLS-9 the fourth admin tables stay one line

- Source: `shard 3`
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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/one-line-slots-admin.spec.ts:89:3
```

Context:

```text
          - listitem [ref=e1380]:
            - generic [ref=e1381]: About
          - listitem [ref=e1382]:
            - generic [ref=e1383]: Contact
      - navigation "Help" [ref=e1384]:
        - heading "Help" [level=2] [ref=e1385]
        - list [ref=e1386]:
          - listitem [ref=e1387]:
            - generic [ref=e1388]: Safety
      - navigation "Legal" [ref=e1389]:
        - heading "Legal" [level=2] [ref=e1390]
        - list [ref=e1391]:
          - listitem [ref=e1392]:
            - link "Terms" [ref=e1393] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1394]:
            - link "Privacy" [ref=e1395] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1397]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

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
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-16T12:37:55.431Z | 3.4 min |
| email | 2026-11-16T12:36:47.768Z | 0.3 min |
| webkit | 2026-11-16T12:37:24.406Z | 7.1 min |
| shard 1 | 2026-11-16T12:37:31.494Z | 5.5 min |
| shard 2 | 2026-11-16T12:37:40.668Z | 6.2 min |
| shard 3 | 2026-11-16T12:38:52.140Z | 6.9 min |
| shard 4 | 2026-11-16T12:37:59.389Z | 7.4 min |
| shard 5 | 2026-11-16T12:37:19.753Z | 6.1 min |
| shard 6 | 2026-11-16T12:37:45.665Z | 7.1 min |
| shard 7 | 2026-11-16T12:38:53.656Z | 5.3 min |
| shard 8 | 2026-11-16T12:37:00.241Z | 5.7 min |
| shard 9 | 2026-11-16T12:37:00.946Z | 5.4 min |
| shard 10 | 2026-11-16T12:38:26.585Z | 5.4 min |
| shard 11 | 2026-11-16T12:37:41.223Z | 6.7 min |
| shard 12 | 2026-11-16T12:37:19.863Z | 5.7 min |
| shard 13 | 2026-11-16T12:37:16.583Z | 5.0 min |
| shard 14 | 2026-11-16T12:37:17.243Z | 5.1 min |
| shard 15 | 2026-11-16T12:36:57.852Z | 6.2 min |
| shard 16 | 2026-11-16T12:36:44.826Z | 5.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `import-security.spec.ts` | 36 | 6.8 min | shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 6.1 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.8 min | shard 3 |
| `admin-locations.spec.ts` | 38 | 5.6 min | shard 6 |
| `admin-listings.spec.ts` | 78 | 5.2 min | webkit, shard 10 |
| `post-wizard-place.spec.ts` | 40 | 5.1 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.8 min | smoke, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `admin-screening.spec.ts` | 58 | 4.4 min | webkit, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 4.2 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `sage-bands.spec.ts` | 76 | 3.5 min | shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.4 min | smoke, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `post-wizard-category.spec.ts` | 52 | 3.3 min | webkit, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 3 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 2 |
| `admin-countries.spec.ts` | 18 | 2.7 min | shard 6 |
| `dialogs.spec.ts` | 20 | 2.6 min | webkit, shard 10 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.3 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 7 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `house-style.spec.ts` | 12 | 0.6 min | shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | shard 4 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 54.3 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 52.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 49.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.1 s |
