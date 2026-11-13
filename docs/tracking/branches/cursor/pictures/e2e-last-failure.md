# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43355488221 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43355488221
- Commit: `a9a48cf846f443ed08ed9ea0a9b8580c0e3fbece`
- Attempt: 1
- Lanes: ran — not docs-only: .github/workflows/ci.yml is not a record (60 of 77 paths; diff base 77cdacf62cfdb1c5e9eb4de4d6e167ffcdfe83b2, push base ea41af488bdf4fbcecfbf85e0497ca21aa527945)
- Repeat: 38 of 1443 tests repeated — specs directly changed 2/14, importers of a changed helper 5/99; budget 720 s
- Written (UTC): 2026-11-13T03:18:44.594Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · auth-signout.spec.ts › U0j sign-out hard reset › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271) — Error: no project's stored session is left on this device
- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › HM-3 the strip mirrors the menu's level; its back item returns it one level up — Error: expect(received).toBeGreaterThan(expected)

## Flaky bodies (DEC-078)

### auth-signout.spec.ts › U0j sign-out hard reset › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271)

- Source: `smoke`
- Project: `mobile-360`

```text
Error: no project's stored session is left on this device

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "[masked]",
+ ]
--- further error 1 ---
Error: no project's stored session is left on this device

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "[masked]",
+ ]

  240 |     await expect(page).toHaveURL(/\/$/);
  241 |     expect(loads, "no load is tried while offline").toBe(0);
> 242 |     expect(await sessionsIn(page), "no project's stored session is left on this device").toEqual(
      |                                                                                          ^
  243 |       [],
  244 |     );
  245 |     // The connection returns: the page loads afresh, still signed out.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:242:90
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › HM-3 the strip mirrors the menu's level; its back item returns it one level up

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThan(expected)

Expected: > 300
Received:   0
--- further error 1 ---
Error: expect(received).toBeGreaterThan(expected)

Expected: > 300
Received:   0

  4255 |     const { back: backBox, strip: stripBox } = await layoutBoxes({ back, strip });
  4256 |     expect(backBox.y - stripBox.y).toBeLessThanOrEqual(1);
> 4257 |     if (dir === "rtl") expect(stripBox.x).toBeGreaterThan(300);
       |                                           ^
  4258 |     else expect(stripBox.x).toBeLessThanOrEqual(1);
  4259 |     // The menu shows the same level.
  4260 |     let menu = await openRailScope(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:4257:43
```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: Contact
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
      - navigation "Legal" [ref=e221]:
        - heading "Legal" [level=2] [ref=e222]
        - list [ref=e223]:
          - listitem [ref=e224]:
            - link "Terms" [ref=e225] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e226]:
            - link "Privacy" [ref=e227] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e229]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-13T02:59:55.059Z | 13.3 min |
| email | 2026-11-13T02:59:05.395Z | 0.3 min |
| webkit | 2026-11-13T03:02:59.351Z | 8.4 min |
| shard 1 | 2026-11-13T02:59:48.051Z | 14.7 min |
| shard 2 | 2026-11-13T02:59:40.784Z | 18.3 min |
| shard 3 | 2026-11-13T02:59:48.316Z | 9.6 min |
| shard 4 | 2026-11-13T03:01:00.808Z | 10.1 min |
| shard 5 | 2026-11-13T03:00:24.318Z | 10.5 min |
| shard 6 | 2026-11-13T02:59:14.248Z | 10.9 min |
| shard 7 | 2026-11-13T02:59:00.653Z | 3.3 min |
| shard 8 | 2026-11-13T02:59:25.157Z | 8.3 min |
| shard 9 | 2026-11-13T03:00:03.672Z | 14.3 min |
| shard 10 | 2026-11-13T02:59:37.126Z | 16.8 min |
| shard 11 | 2026-11-13T02:59:36.387Z | 11.9 min |
| shard 12 | 2026-11-13T02:59:38.438Z | 13.0 min |
| shard 13 | 2026-11-13T02:59:42.804Z | 8.7 min |
| shard 14 | 2026-11-13T02:59:17.269Z | 11.5 min |
| shard 15 | 2026-11-13T02:59:06.257Z | 3.4 min |
| shard 16 | 2026-11-13T02:59:56.454Z | 7.9 min |
| repeat | 2026-11-13T03:01:01.583Z | 13.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.8 min | smoke, shard 8, shard 16 |
| `admin-screening.spec.ts` | 174 | 14.7 min | webkit, shard 2, shard 10, repeat |
| `auth-signout.spec.ts` | 72 | 6.7 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.4 min | shard 5, shard 13 |
| `admin-listings.spec.ts` | 78 | 5.3 min | webkit, shard 2, shard 10 |
| `ad-page.spec.ts` | 104 | 5.0 min | webkit, shard 1, shard 9 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 2, shard 11 |
| `admin-roles.spec.ts` | 28 | 4.6 min | shard 2, shard 10 |
| `import-security.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 74 | 4.3 min | webkit, shard 5, shard 13 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 6, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 4.2 min | shard 6, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-categories-images.spec.ts` | 12 | 3.7 min | webkit, shard 2, shard 10, repeat |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 4, shard 12 |
| `choice-lists.spec.ts` | 96 | 3.1 min | shard 3, shard 11 |
| `post-wizard-category.spec.ts` | 52 | 3.0 min | webkit, shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 6, shard 14 |
| `dialogs.spec.ts` | 16 | 2.6 min | webkit, shard 3, shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 7, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 6, shard 14 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 7, shard 15 |
| `legal-admin.spec.ts` | 44 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 1, shard 9 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 10 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 9 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 7, shard 15 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2, shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `press.spec.ts` | 22 | 0.9 min | shard 7, shard 15 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7, shard 15 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8, shard 16 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 12 | 0.6 min | shard 1, shard 9, repeat |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 7, shard 15 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 4, shard 12 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 6, shard 14 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 10 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 1, shard 9, repeat |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `shell-bands.spec.ts` | 16 | 0.2 min | shard 8, shard 15 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7, shard 15 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `fonts.spec.ts` | 6 | 0.1 min | shard 4, shard 12, repeat |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `auth-google.spec.ts` | 6 | 0.1 min | shard 3, repeat |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.3 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 33.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
