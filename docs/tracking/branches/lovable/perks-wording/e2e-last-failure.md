# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44726913494 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44726913494
- Commit: `45166866181434cac7a8d6f65c6ef65df287ce70`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-91e2c1b917da… (0 read)
- Repeat: 15 of 15 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-20T11:43:27.615Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "edited:አዲስ አበባ 44726913494-local-5"
Received: "none:"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "edited:አዲስ አበባ 44726913494-local-5"
Received: "none:"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  209 |       });
  210 |
> 211 |       await expect
      |       ^
  212 |         .poll(
  213 |           async () => {
  214 |             const { data } = await supabase
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:211:7
```

Context:

```text
          - listitem [ref=e371]:
            - generic [ref=e372]: About
          - listitem [ref=e373]:
            - generic [ref=e374]: Contact
      - navigation "Help" [ref=e375]:
        - heading "Help" [level=2] [ref=e376]
        - list [ref=e377]:
          - listitem [ref=e378]:
            - generic [ref=e379]: Safety
      - navigation "Legal" [ref=e380]:
        - heading "Legal" [level=2] [ref=e381]
        - list [ref=e382]:
          - listitem [ref=e383]:
            - link "Terms" [ref=e384] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e385]:
            - link "Privacy" [ref=e386] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e388]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-20T12:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-20T11:25:27.580Z | 4.5 min |
| email | 2026-11-20T11:25:38.104Z | 0.4 min |
| webkit | 2026-11-20T11:25:37.219Z | 9.8 min |
| shard 1 | 2026-11-20T11:25:01.973Z | 5.5 min |
| shard 2 | 2026-11-20T11:25:38.840Z | 5.2 min |
| shard 3 | 2026-11-20T11:25:34.500Z | 7.8 min |
| shard 4 | 2026-11-20T11:25:26.350Z | 5.7 min |
| shard 5 | 2026-11-20T11:26:40.630Z | 6.2 min |
| shard 6 | 2026-11-20T11:25:26.008Z | 5.6 min |
| shard 7 | 2026-11-20T11:25:15.725Z | 5.6 min |
| shard 8 | 2026-11-20T11:26:25.533Z | 5.5 min |
| shard 9 | 2026-11-20T11:24:52.577Z | 5.4 min |
| shard 10 | 2026-11-20T11:25:15.884Z | 6.1 min |
| shard 11 | 2026-11-20T11:25:13.684Z | 5.7 min |
| shard 12 | 2026-11-20T11:26:01.753Z | 6.1 min |
| shard 13 | 2026-11-20T11:25:39.154Z | 6.3 min |
| shard 14 | 2026-11-20T11:25:39.486Z | 5.9 min |
| shard 15 | 2026-11-20T11:24:55.792Z | 6.3 min |
| shard 16 | 2026-11-20T11:25:43.821Z | 7.4 min |
| repeat | 2026-11-20T11:30:30.029Z | 12.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-monetisation.spec.ts` | 154 | 15.2 min | smoke, shard 10, repeat |
| `shell.spec.ts` | 234 | 9.7 min | shard 1 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.5 min | shard 3 |
| `admin-listings.spec.ts` | 78 | 6.5 min | webkit, shard 10 |
| `photo-pipeline.spec.ts` | 74 | 5.8 min | webkit, shard 16 |
| `ad-page.spec.ts` | 104 | 5.8 min | webkit, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `admin-screening.spec.ts` | 58 | 5.3 min | webkit, shard 14 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 4.7 min | shard 13 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 7 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-translations-governance.spec.ts` | 20 | 3.6 min | smoke, shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 15 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 14 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 12 |
| `post-wizard-resets.spec.ts` | 34 | 3.2 min | shard 3 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `dialogs.spec.ts` | 20 | 3.1 min | webkit, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 7 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `legal-admin.spec.ts` | 44 | 2.0 min | shard 7 |
| `mfa-stepup.spec.ts` | 22 | 2.0 min | webkit, shard 15 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `one-line-slots-admin.spec.ts` | 10 | 1.5 min | shard 3 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `sage-shell.spec.ts` | 80 | 1.1 min | shard 16 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `my-listings-page.spec.ts` | 20 | 1.1 min | webkit, shard 10 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `my-listings-levels.spec.ts` | 28 | 0.5 min | shard 4 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 47.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.8 s |
| `admin-translations-data.spec.ts` › TR-14 the Data scope edits and approves a location name | desktop-1280 | 38.9 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 36.2 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 32.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 30.9 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
