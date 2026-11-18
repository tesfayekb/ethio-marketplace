# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44285456312 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44285456312
- Commit: `e8d992b6c6092629bd7840f97a2a4c4cde0a1583`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-51b5e8c84fbb… (0 read)
- Repeat: 0 of 52 tests repeated — specs directly changed 0/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-18T10:46:05.701Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 8` · one-line-slots.spec.ts › OLS-4 a category heading beside the star stays one line — Error: the switcher lists the public languages

## Flaky bodies (DEC-078)

### one-line-slots.spec.ts › OLS-4 a category heading beside the star stays one line

- Source: `shard 8`
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

  42 |   await page.keyboard.press("Escape");
  43 |   await expect(page.getByRole("menu")).toHaveCount(0);
> 44 |   expect(languages, "the switcher lists the public languages").toContain("en");
     |                                                                ^
  45 |   return languages;
  46 | }
  47 |
    at publicLanguages (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/one-line-slots.spec.ts:44:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/one-line-slots.spec.ts:135:21
```

Context:

```text
          - listitem [ref=e205]:
            - generic [ref=e206]: About
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Help" [ref=e209]:
        - heading "Help" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Safety
      - navigation "Legal" [ref=e214]:
        - heading "Legal" [level=2] [ref=e215]
        - list [ref=e216]:
          - listitem [ref=e217]:
            - link "Terms" [ref=e218] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e219]:
            - link "Privacy" [ref=e220] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e222]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 19 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `gate fetch threw upstream ssr language gate timed out after <n>ms` | 1 | shard 8 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### gate fetch threw upstream ssr language gate timed out after <n>ms

- Count: 1 · Sources: shard 8
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-20 a real-export round trip is a no-op ×1 · TR-1 gating: a permissionless user is refused; a super admin sees the roster ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-18T10:32:56.328Z | 3.6 min |
| email | 2026-11-18T10:34:01.780Z | 0.3 min |
| webkit | 2026-11-18T10:33:48.420Z | 10.2 min |
| shard 1 | 2026-11-18T10:39:35.841Z | 5.4 min |
| shard 2 | 2026-11-18T10:37:31.591Z | 5.2 min |
| shard 3 | 2026-11-18T10:30:57.391Z | 7.4 min |
| shard 4 | 2026-11-18T10:30:49.609Z | 6.3 min |
| shard 5 | 2026-11-18T10:30:44.011Z | 6.1 min |
| shard 6 | 2026-11-18T10:30:16.772Z | 5.8 min |
| shard 7 | 2026-11-18T10:30:51.139Z | 7.4 min |
| shard 8 | 2026-11-18T10:30:41.217Z | 6.2 min |
| shard 9 | 2026-11-18T10:30:25.328Z | 5.6 min |
| shard 10 | 2026-11-18T10:31:01.383Z | 6.0 min |
| shard 11 | 2026-11-18T10:30:44.240Z | 7.1 min |
| shard 12 | 2026-11-18T10:30:39.864Z | 6.7 min |
| shard 13 | 2026-11-18T10:31:15.511Z | 6.4 min |
| shard 14 | 2026-11-18T10:33:43.701Z | 5.2 min |
| shard 15 | 2026-11-18T10:30:58.603Z | 6.3 min |
| shard 16 | 2026-11-18T10:35:17.133Z | 5.8 min |
| repeat | 2026-11-18T10:28:12.143Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.2 min | shard 3 |
| `admin-listings.spec.ts` | 78 | 5.9 min | webkit, shard 10 |
| `ad-page.spec.ts` | 156 | 5.9 min | webkit, shard 13, repeat |
| `import-security.spec.ts` | 36 | 5.6 min | shard 4 |
| `admin-categories-console.spec.ts` | 34 | 5.6 min | shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 5.2 min | shard 11 |
| `admin-translations-console.spec.ts` | 46 | 5.1 min | smoke, shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 12 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 4.8 min | shard 13 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 6 |
| `admin-screening.spec.ts` | 58 | 4.5 min | webkit, shard 14 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 9 |
| `photo-pipeline.spec.ts` | 74 | 4.5 min | webkit, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 4.3 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `choice-lists.spec.ts` | 96 | 3.9 min | shard 7 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.6 min | shard 8 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `post-wizard-category.spec.ts` | 52 | 3.4 min | webkit, shard 4 |
| `auth-signout.spec.ts` | 36 | 3.2 min | shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `dialogs.spec.ts` | 20 | 3.2 min | webkit, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 3.1 min | shard 3 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `legal-admin.spec.ts` | 44 | 2.8 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.7 min | webkit, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 2.0 min | shard 8 |
| `mfa-stepup.spec.ts` | 22 | 1.9 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `press.spec.ts` | 22 | 1.2 min | shard 12 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `my-listings-page.spec.ts` | 20 | 1.1 min | webkit, shard 10 |
| `sage-cards.spec.ts` | 40 | 1.1 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.7 min | smoke, shard 8 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 7 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 36.3 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 36.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.0 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 33.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-1280 | 31.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.3 s |
