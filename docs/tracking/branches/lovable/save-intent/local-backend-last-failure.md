# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44194618990 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44194618990
- Commit: `41836919d4961cc67c7dc8218469f578ebed2eec`
- Attempt: 1
- Repeat: 0 of 52 tests repeated — specs directly changed 0/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-17T23:20:57.332Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 7` · choice-lists.spec.ts › choice lists at 360, light › CL-E10 the account menu's parts equal the other lists' (360, light) — Error: expect(locator).toBeHidden() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 7` · choice-lists.spec.ts › choice lists at 360, dark › CL-E10 the account menu's parts equal the other lists' (360, dark) — Error: expect(locator).toBeHidden() failed

## Flaky bodies (DEC-078)

### choice-lists.spec.ts › choice lists at 360, light › CL-E10 the account menu's parts equal the other lists' (360, light)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeHidden() failed

Locator:  getByTestId('style-row-1-menu')
Expected: hidden
Received: visible
Timeout:  10000ms

Call log:
  - Expect "toBeHidden" with timeout 10000ms
  - waiting for getByTestId('style-row-1-menu')
    14 × locator resolved to <div dir="ltr" role="menu" tabindex="-1" data-align="end" id="radix-_r_8_" data-state="open" data-side="bottom" data-radix-menu-content="" aria-orientation="vertical" data-orientation="vertical" aria-labelledby="radix-_r_7_" data-testid="style-row-1-menu" class="z-50 bg-popover text-popover-foreground rounded-menu p-1.5 shadow-menu max-w-[calc(100vw-2rem)] overflow-x-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[…>…</div>
       - unexpected value "visible"

--- further error 1 ---
Error: expect(locator).toBeHidden() failed

Locator:  getByTestId('style-row-1-menu')
Expected: hidden
Received: visible
Timeout:  10000ms

Call log:
  - Expect "toBeHidden" with timeout 10000ms
  - waiting for getByTestId('style-row-1-menu')
    14 × locator resolved to <div dir="ltr" role="menu" tabindex="-1" data-align="end" id="radix-_r_8_" data-state="open" data-side="bottom" data-radix-menu-content="" aria-orientation="vertical" data-orientation="vertical" aria-labelledby="radix-_r_7_" data-testid="style-row-1-menu" class="z-50 bg-popover text-popover-foreground rounded-menu p-1.5 shadow-menu max-w-[calc(100vw-2rem)] overflow-x-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[…>…</div>
       - unexpected value "visible"


  171 | async function closeMenu(page: Page, panel: Locator) {
  172 |   await page.keyboard.press("Escape");
> 173 |   await expect(panel).toBeHidden();
      |                       ^
  174 | }
  175 |
```

Context: context file not found for `choice-lists-choice-lists-at-360-light-CL-E10-the-account-menu-s-parts-equal-the-other-lists-360-light-mobile-360` — Playwright's name `choice-lists-choice-lists--e6a4d--the-other-lists-360-light--mobile-360`; this run carried 0 context file(s); of the same spec: none

### choice-lists.spec.ts › choice lists at 360, dark › CL-E10 the account menu's parts equal the other lists' (360, dark)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeHidden() failed

Locator:  getByTestId('style-row-1-menu')
Expected: hidden
Received: visible
Timeout:  10000ms

Call log:
  - Expect "toBeHidden" with timeout 10000ms
  - waiting for getByTestId('style-row-1-menu')
    14 × locator resolved to <div dir="ltr" role="menu" tabindex="-1" data-align="end" id="radix-_r_8_" data-state="open" data-side="bottom" data-radix-menu-content="" aria-orientation="vertical" data-orientation="vertical" aria-labelledby="radix-_r_7_" data-testid="style-row-1-menu" class="z-50 bg-popover text-popover-foreground rounded-menu p-1.5 shadow-menu max-w-[calc(100vw-2rem)] overflow-x-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[…>…</div>
       - unexpected value "visible"

--- further error 1 ---
Error: expect(locator).toBeHidden() failed

Locator:  getByTestId('style-row-1-menu')
Expected: hidden
Received: visible
Timeout:  10000ms

Call log:
  - Expect "toBeHidden" with timeout 10000ms
  - waiting for getByTestId('style-row-1-menu')
    14 × locator resolved to <div dir="ltr" role="menu" tabindex="-1" data-align="end" id="radix-_r_8_" data-state="open" data-side="bottom" data-radix-menu-content="" aria-orientation="vertical" data-orientation="vertical" aria-labelledby="radix-_r_7_" data-testid="style-row-1-menu" class="z-50 bg-popover text-popover-foreground rounded-menu p-1.5 shadow-menu max-w-[calc(100vw-2rem)] overflow-x-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[…>…</div>
       - unexpected value "visible"


  171 | async function closeMenu(page: Page, panel: Locator) {
  172 |   await page.keyboard.press("Escape");
> 173 |   await expect(panel).toBeHidden();
      |                       ^
  174 | }
  175 |
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
```

Context: context file not found for `choice-lists-choice-lists-at-360-dark-CL-E10-the-account-menu-s-parts-equal-the-other-lists-360-dark-mobile-360` — Playwright's name `choice-lists-choice-lists--e5a98-l-the-other-lists-360-dark--mobile-360`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 19 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-17T23:01:19.369Z | 3.5 min |
| email | 2026-11-17T23:04:58.508Z | 0.3 min |
| webkit | 2026-11-17T23:12:35.850Z | 8.0 min |
| shard 1 | 2026-11-17T23:03:38.587Z | 5.5 min |
| shard 2 | 2026-11-17T22:59:36.815Z | 5.9 min |
| shard 3 | 2026-11-17T22:59:09.368Z | 6.7 min |
| shard 4 | 2026-11-17T23:00:40.736Z | 5.4 min |
| shard 5 | 2026-11-17T22:58:47.572Z | 6.4 min |
| shard 6 | 2026-11-17T22:59:31.849Z | 6.2 min |
| shard 7 | 2026-11-17T22:59:05.176Z | 7.5 min |
| shard 8 | 2026-11-17T23:05:04.670Z | 5.6 min |
| shard 9 | 2026-11-17T23:01:21.062Z | 5.4 min |
| shard 10 | 2026-11-17T22:58:58.267Z | 6.0 min |
| shard 11 | 2026-11-17T23:02:13.105Z | 5.8 min |
| shard 12 | 2026-11-17T23:03:33.351Z | 5.8 min |
| shard 13 | 2026-11-17T23:06:33.620Z | 5.3 min |
| shard 14 | 2026-11-17T22:59:28.714Z | 7.3 min |
| shard 15 | 2026-11-17T23:07:03.014Z | 6.2 min |
| shard 16 | 2026-11-17T23:02:18.878Z | 5.3 min |
| repeat | 2026-11-17T22:56:14.947Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 2 |
| `admin-screening.spec.ts` | 58 | 5.8 min | webkit, shard 14 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 3 |
| `admin-listings.spec.ts` | 78 | 5.7 min | webkit, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 5.5 min | shard 7 |
| `admin-locations.spec.ts` | 38 | 4.9 min | shard 6 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `post-wizard-place.spec.ts` | 40 | 4.5 min | shard 11 |
| `ad-page.spec.ts` | 156 | 4.4 min | webkit, shard 13, repeat |
| `admin-attributes-editor.spec.ts` | 36 | 4.4 min | shard 14 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `choice-lists.spec.ts` | 96 | 4.3 min | shard 7 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `legal-admin.spec.ts` | 44 | 2.8 min | shard 7 |
| `dialogs.spec.ts` | 20 | 2.8 min | webkit, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 6 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 5 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 2 |
| `legal-certify.spec.ts` | 44 | 2.5 min | shard 14 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 7 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 32.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
