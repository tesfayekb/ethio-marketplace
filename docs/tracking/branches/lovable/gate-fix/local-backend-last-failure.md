# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44330082986 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44330082986
- Commit: `27a841e5412cec239c7945dd295e32135213ad74`
- Attempt: 2
- Repeat: 29 of 97 tests repeated — specs directly changed 2/4, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-18T15:41:37.571Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 13` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-save')
Expected: "saved"
Received: "unsaved"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to <button type="button" data-pressable="" aria-label="Save" data-state="unsaved" aria-pressed="false" data-testid="listing-save" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-v…>…</button>
       - unexpected value "unsaved"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-save')
Expected: "saved"
Received: "unsaved"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to <button type="button" data-pressable="" aria-label="Save" data-state="unsaved" aria-pressed="false" data-testid="listing-save" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-v…>…</button>
       - unexpected value "unsaved"


  533 |       return data;
  534 |     };
> 535 |     await expect(heart).toHaveAttribute("data-state", "saved");
      |                         ^
  536 |     await expect(heart).toHaveAttribute("aria-pressed", "true");
  537 |     await expect(page.getByTestId("listing-save-count")).toHaveText("Saved by 1");
```

Context:

```text
          - listitem [ref=e388]:
            - generic [ref=e389]: About
          - listitem [ref=e390]:
            - generic [ref=e391]: Contact
      - navigation "Help" [ref=e392]:
        - heading "Help" [level=2] [ref=e393]
        - list [ref=e394]:
          - listitem [ref=e395]:
            - generic [ref=e396]: Safety
      - navigation "Legal" [ref=e397]:
        - heading "Legal" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - link "Terms" [ref=e401] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e402]:
            - link "Privacy" [ref=e403] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e405]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-11-18T15:02:06.873Z | 4.1 min |
| email | 2026-11-18T15:02:01.253Z | 0.4 min |
| webkit | 2026-11-18T15:02:02.630Z | 10.5 min |
| shard 1 | 2026-11-18T15:06:17.715Z | 5.5 min |
| shard 2 | 2026-11-18T15:07:41.853Z | 5.3 min |
| shard 3 | 2026-11-18T15:01:51.363Z | 6.6 min |
| shard 4 | 2026-11-18T15:35:34.889Z | 5.5 min |
| shard 5 | 2026-11-18T15:02:16.239Z | 6.6 min |
| shard 6 | 2026-11-18T15:01:54.975Z | 6.2 min |
| shard 7 | 2026-11-18T15:28:12.106Z | 6.5 min |
| shard 8 | 2026-11-18T15:05:45.867Z | 5.5 min |
| shard 9 | 2026-11-18T15:02:14.387Z | 6.2 min |
| shard 10 | 2026-11-18T15:01:24.949Z | 5.5 min |
| shard 11 | 2026-11-18T15:10:10.442Z | 5.7 min |
| shard 12 | 2026-11-18T15:03:32.695Z | 6.8 min |
| shard 13 | 2026-11-18T15:10:23.631Z | 5.0 min |
| shard 14 | 2026-11-18T15:02:54.740Z | 5.3 min |
| shard 15 | 2026-11-18T15:02:20.647Z | 7.8 min |
| shard 16 | 2026-11-18T15:06:58.526Z | 5.3 min |
| repeat | 2026-11-18T15:02:05.415Z | 2.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 3 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `admin-listings.spec.ts` | 78 | 5.5 min | webkit, shard 10 |
| `feed-screens.spec.ts` | 40 | 5.2 min | webkit, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 12 |
| `admin-locations.spec.ts` | 38 | 5.0 min | shard 6 |
| `admin-categories-console.spec.ts` | 34 | 5.0 min | shard 7 |
| `import-security.spec.ts` | 36 | 5.0 min | shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.9 min | shard 15 |
| `admin-screening.spec.ts` | 58 | 4.9 min | webkit, shard 14 |
| `admin-roles.spec.ts` | 28 | 4.8 min | shard 9 |
| `ad-page.spec.ts` | 104 | 4.8 min | webkit, shard 13 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `post-wizard-place.spec.ts` | 40 | 4.5 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 4.3 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 4.2 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `my-listings-ad.spec.ts` | 38 | 3.8 min | shard 12 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `choice-lists.spec.ts` | 96 | 3.5 min | shard 7 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 11 |
| `auth-signout.spec.ts` | 36 | 3.4 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.3 min | smoke, shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `dialogs.spec.ts` | 20 | 3.0 min | webkit, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.9 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 6 |
| `mfa-stepup.spec.ts` | 22 | 2.5 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 2.4 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 1.9 min | shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `my-listings-doors.spec.ts` | 84 | 1.6 min | shard 3, repeat |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `ad-page-doors.spec.ts` | 90 | 1.5 min | shard 14, repeat |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `press.spec.ts` | 22 | 1.3 min | shard 12 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.2 min | shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `submenu.spec.ts` | 14 | 0.4 min | shard 15 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `feed-route.spec.ts` | 22 | 0.3 min | shard 9 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.3 min | shard 15 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
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
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 49.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.4 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 39.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.5 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 37.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 34.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.6 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 33.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.8 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 31.0 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 31.0 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
