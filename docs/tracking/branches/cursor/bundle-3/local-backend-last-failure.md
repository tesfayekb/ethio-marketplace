# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45038904160 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45038904160
- Commit: `9e2c2d1c24db5a2fb93d5580d689f8180a72fd68`
- Attempt: 1
- Repeat: 34 of 1475 tests repeated — specs directly changed 1/1, importers of a changed helper 2/112; budget 643 s
- Written (UTC): 2026-11-22T15:47:49.483Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 11` · house-style.spec.ts › house style fixture › HS-6 the focus ring shows after keyboard use only — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### house-style.spec.ts › house style fixture › HS-6 the focus ring shows after keyboard use only

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('style-row-1-more-copy')
    - locator resolved to <div tabindex="-1" role="menuitem" data-orientation="vertical" data-radix-collection-item="" data-testid="style-row-1-more-copy" class="data-[pressed]:bg-nav-pill data-[pressed]:text-nav-ink data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none relative flex min-h-11 md:pointer-fine:min-h-10 md:pointer-fine:h-10 w-full min-w-0 cursor-default select-none items-center gap-2 roun…>…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    114 × waiting for element to be visible, enabled and stable
```

Context:

```text
          - list [ref=e1671]:
            - listitem [ref=e1672]:
              - generic [ref=e1673]: Safety
        - navigation "Legal" [ref=e1674]:
          - heading "Legal" [level=2] [ref=e1675]
          - list [ref=e1676]:
            - listitem [ref=e1677]:
              - link "Terms" [ref=e1678] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e1679]:
              - link "Privacy" [ref=e1680] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e1682]: © 2026 ethio.com — All rights reserved.
  - menu "Actions — Alpha" [active] [ref=e1684]:
    - menuitem "Copy" [ref=e1685]:
      - generic [ref=e1686]: Copy
    - separator [ref=e1687]
    - menuitem "Erase" [ref=e1688]:
      - generic [ref=e1689]: Erase
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-22T15:36:33.547Z | 4.1 min |
| email | 2026-11-22T15:36:50.078Z | 0.4 min |
| webkit | 2026-11-22T15:36:47.820Z | 8.8 min |
| shard 1 | 2026-11-22T15:36:54.464Z | 5.8 min |
| shard 2 | 2026-11-22T15:36:27.590Z | 5.3 min |
| shard 3 | 2026-11-22T15:37:34.051Z | 6.7 min |
| shard 4 | 2026-11-22T15:37:02.150Z | 8.1 min |
| shard 5 | 2026-11-22T15:40:49.649Z | 6.1 min |
| shard 6 | 2026-11-22T15:36:28.567Z | 5.7 min |
| shard 7 | 2026-11-22T15:36:46.174Z | 5.4 min |
| shard 8 | 2026-11-22T15:36:49.269Z | 6.2 min |
| shard 9 | 2026-11-22T15:38:12.162Z | 6.7 min |
| shard 10 | 2026-11-22T15:36:42.526Z | 5.7 min |
| shard 11 | 2026-11-22T15:36:41.079Z | 6.3 min |
| shard 12 | 2026-11-22T15:36:31.744Z | 5.9 min |
| shard 13 | 2026-11-22T15:37:00.783Z | 6.4 min |
| shard 14 | 2026-11-22T15:36:20.715Z | 5.4 min |
| shard 15 | 2026-11-22T15:37:13.266Z | 7.6 min |
| shard 16 | 2026-11-22T15:36:52.759Z | 7.0 min |
| repeat | 2026-11-22T15:38:46.580Z | 8.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-console.spec.ts` | 102 | 12.0 min | shard 7, repeat |
| `shell.spec.ts` | 234 | 10.0 min | shard 1 |
| `import-security.spec.ts` | 36 | 7.6 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 3 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 2 |
| `admin-listings.spec.ts` | 82 | 5.6 min | webkit, shard 10 |
| `auth-signout.spec.ts` | 44 | 5.5 min | webkit, shard 9 |
| `ad-page.spec.ts` | 104 | 5.3 min | webkit, shard 13 |
| `photo-pipeline.spec.ts` | 74 | 5.3 min | webkit, shard 16 |
| `admin-translations-console.spec.ts` | 46 | 5.1 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 64 | 4.9 min | webkit, shard 14 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 4.8 min | shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.8 min | shard 15 |
| `admin-roles.spec.ts` | 28 | 4.7 min | shard 9 |
| `admin-locations.spec.ts` | 44 | 4.6 min | shard 6 |
| `admin-users.spec.ts` | 28 | 4.6 min | shard 16 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `dialogs.spec.ts` | 28 | 3.7 min | webkit, shard 10 |
| `admin-monetisation.spec.ts` | 34 | 3.6 min | smoke, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 3.4 min | webkit, shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 16 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 3 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `mfa-stepup.spec.ts` | 24 | 2.7 min | webkit, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 8 |
| `legal-admin.spec.ts` | 44 | 1.9 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `sage-ad-page.spec.ts` | 30 | 1.7 min | webkit, shard 11 |
| `admin-audit.spec.ts` | 16 | 1.7 min | shard 9 |
| `house-style.spec.ts` | 14 | 1.6 min | shard 11 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `ad-page-doors.spec.ts` | 90 | 1.2 min | shard 14, repeat |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `my-listings-page.spec.ts` | 24 | 1.1 min | webkit, shard 10 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `legal-doors.spec.ts` | 34 | 0.7 min | smoke, shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 4, repeat |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | shard 4 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `overlays.spec.ts` | 8 | 0.3 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `house-style.spec.ts` › HS-6 the focus ring shows after keyboard use only | mobile-360 | 61.8 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 53.9 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 49.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.6 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 34.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.7 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 31.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 30.9 s |
