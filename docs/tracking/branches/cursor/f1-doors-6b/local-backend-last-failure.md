# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44450591343
- Commit: `5cb117c198701ffcaa027d508e23aa6ef4bc2147`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-19T03:45:37.309Z
- Passed: 2533 · Skipped: 360 · Failed: 12
- Gating failures: 12 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · choice-lists.spec.ts › choice lists at 1440, light › CL-E10 the account menu's parts equal the other lists' (1440, light) — Error: expect(locator).toBeHidden() failed

## Flaky bodies (DEC-078)

### choice-lists.spec.ts › choice lists at 1440, light › CL-E10 the account menu's parts equal the other lists' (1440, light)

- Source: `shard 7`
- Project: `desktop-1280`

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

Context: context file not found for `choice-lists-choice-lists-at-1440-light-CL-E10-the-account-menu-s-parts-equal-the-other-lists-1440-light-desktop-1280` — Playwright's name `choice-lists-choice-lists--7bbbe-the-other-lists-1440-light--desktop-1280`; this run carried 20 context file(s); of the same spec: none

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
| smoke | 2026-11-19T03:27:11.210Z | 3.4 min |
| email | 2026-11-19T03:26:02.927Z | 0.3 min |
| webkit | 2026-11-19T03:37:52.666Z | 7.4 min |
| shard 1 | 2026-11-19T03:26:18.375Z | 5.5 min |
| shard 2 | 2026-11-19T03:25:45.092Z | 5.4 min |
| shard 3 | 2026-11-19T03:28:55.311Z | 5.5 min |
| shard 4 | 2026-11-19T03:24:43.948Z | 7.4 min |
| shard 5 | 2026-11-19T03:27:04.304Z | 6.1 min |
| shard 6 | 2026-11-19T03:29:06.500Z | 5.6 min |
| shard 7 | 2026-11-19T03:23:37.206Z | 6.8 min |
| shard 8 | 2026-11-19T03:27:25.021Z | 5.6 min |
| shard 9 | 2026-11-19T03:23:31.823Z | 5.9 min |
| shard 10 | 2026-11-19T03:26:14.850Z | 6.0 min |
| shard 11 | 2026-11-19T03:28:24.575Z | 5.9 min |
| shard 12 | 2026-11-19T03:22:48.350Z | 6.0 min |
| shard 13 | 2026-11-19T03:28:15.863Z | 4.9 min |
| shard 14 | 2026-11-19T03:31:29.965Z | 5.2 min |
| shard 15 | 2026-11-19T03:25:58.062Z | 6.2 min |
| shard 16 | 2026-11-19T03:28:09.373Z | 5.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `import-security.spec.ts` | 36 | 7.1 min | shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 2 |
| `admin-categories-console.spec.ts` | 34 | 5.2 min | shard 7 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-listings.spec.ts` | 78 | 4.8 min | webkit, shard 10 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-roles.spec.ts` | 28 | 4.7 min | shard 9 |
| `admin-screening.spec.ts` | 58 | 4.6 min | webkit, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 4.6 min | smoke, shard 10 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.6 min | shard 3 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 12 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `choice-lists.spec.ts` | 96 | 3.6 min | shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 12 |
| `post-wizard-category.spec.ts` | 52 | 3.3 min | webkit, shard 4 |
| `auth-signout.spec.ts` | 36 | 3.3 min | shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 2.9 min | smoke, shard 16 |
| `dialogs.spec.ts` | 20 | 2.6 min | webkit, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.5 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `admin-audit.spec.ts` | 16 | 1.8 min | shard 9 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 49.9 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 32.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44450591343-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44450591343-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44450591343-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44450591343-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44450591343-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44450591343-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44450591343-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44450591343-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44450591343-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44450591343-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44450591343-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44450591343-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44450591343-local-16
```

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-1 a seller can neither read nor change a switch, call the meter or read its tables

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  123 |
  124 |     const list = await pageDoor(page, "admin_ai_features", {});
> 125 |     expect(list.error).toBe("permission denied");
      |                        ^
  126 |     // Bundle 13 turn 14 — nor the spend by day.
  127 |     const days = await pageDoor(page, "admin_ai_spend_days", { p_days: 30 });
  128 |     expect(days.error).toBe("permission denied");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-services.spec.ts:125:24
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
      - navigation "Legal" [ref=e258]:
        - heading "Legal" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - link "Terms" [ref=e262] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e263]:
            - link "Privacy" [ref=e264] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
```
```

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-1 a seller can neither read nor change a switch, call the meter or read its tables

- Source: `shard 1`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  123 |
  124 |     const list = await pageDoor(page, "admin_ai_features", {});
> 125 |     expect(list.error).toBe("permission denied");
      |                        ^
  126 |     // Bundle 13 turn 14 — nor the spend by day.
  127 |     const days = await pageDoor(page, "admin_ai_spend_days", { p_days: 30 });
  128 |     expect(days.error).toBe("permission denied");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-services.spec.ts:125:24
```

Context:

```text
          - listitem [ref=e326]:
            - generic [ref=e327]: About
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Help" [ref=e330]:
        - heading "Help" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Safety
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - link "Terms" [ref=e339] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e340]:
            - link "Privacy" [ref=e341] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  588 |         })
  589 |       ).error,
> 590 |     ).toBe("permission denied");
      |       ^
  591 |     expect((await pageDoor(page, "admin_list_monetisation", {})).error).toBe("denied");
  592 |
  593 |     const viewer = await leaseUser();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:590:7
```

Context:

```text
          - listitem [ref=e148]:
            - generic [ref=e149]: About
          - listitem [ref=e150]:
            - generic [ref=e151]: Contact
      - navigation "Help" [ref=e152]:
        - heading "Help" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - generic [ref=e156]: Safety
      - navigation "Legal" [ref=e157]:
        - heading "Legal" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - link "Terms" [ref=e161] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e162]:
            - link "Privacy" [ref=e163] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e165]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "perks on reach"
Received: "perksOnReach"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "perks on reach"
Received: "perksOnReach"

  813 |         })
  814 |       ).error,
> 815 |     ).toBe("perks on reach");
      |       ^
  816 |     expect((await readProduct(key))?.max_photos).toBeNull();
  817 |   });
  818 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:815:7
```

Context:

```text
          - listitem [ref=e854]:
            - generic [ref=e855]: About
          - listitem [ref=e856]:
            - generic [ref=e857]: Contact
      - navigation "Help" [ref=e858]:
        - heading "Help" [level=2] [ref=e859]
        - list [ref=e860]:
          - listitem [ref=e861]:
            - generic [ref=e862]: Safety
      - navigation "Legal" [ref=e863]:
        - heading "Legal" [level=2] [ref=e864]
        - list [ref=e865]:
          - listitem [ref=e866]:
            - link "Terms" [ref=e867] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e868]:
            - link "Privacy" [ref=e869] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e871]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('monetisation-price-edit').getByTestId('monetisation-price-edit-error')
Expected: "This price has been used; end it and add a new one."
Received: "That could not be saved."
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('monetisation-price-edit').getByTestId('monetisation-price-edit-error')
    14 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="monetisation-price-edit-error">That could not be saved.</p>
       - unexpected value "That could not be saved."

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('monetisation-price-edit').getByTestId('monetisation-price-edit-error')
Expected: "This price has been used; end it and add a new one."
Received: "That could not be saved."
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('monetisation-price-edit').getByTestId('monetisation-price-edit-error')
    14 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="monetisation-price-edit-error">That could not be saved.</p>
       - unexpected value "That could not be saved."


  1145 |     await edit.getByTestId("monetisation-price-edit-save").click();
  1146 |     await awaitGuardedOutcome(page, secret, edit.getByTestId("monetisation-price-edit-error"));
> 1147 |     await expect(edit.getByTestId("monetisation-price-edit-error")).toHaveText(
       |                                                                     ^
  1148 |       en["admin.monetisation.error.priceInUse"],
  1149 |     );
```

Context:

```text
            - generic [ref=e44]: 19 Nov 2026
          - button "Clear date" [ref=e45]:
            - img [ref=e46]
      - generic [ref=e49]:
        - generic [ref=e50]:
          - generic [ref=e51]: Valid until
          - generic [ref=e52]: Optional
        - button "Valid until Optional" [ref=e55]:
          - img [ref=e56]
          - generic [ref=e58]: Choose date
        - paragraph [ref=e60]: Leave blank for no end.
      - alert [ref=e61]: That could not be saved.
      - paragraph [ref=e62]: "Reason: priceInUse"
      - generic [ref=e63]:
        - button "Cancel" [ref=e64] [cursor=pointer]
        - button "Save" [ref=e65] [cursor=pointer]
    - button "Close" [ref=e66] [cursor=pointer]:
      - img [ref=e67]
      - generic [ref=e70]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "launch bundle required"
Received: "launchRequired"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "launch bundle required"
Received: "launchRequired"

  1248 |         })
  1249 |       ).error,
> 1250 |     ).toBe("launch bundle required");
       |       ^
  1251 |     expect(await readMarket(market.code)).toBeNull();
  1252 |
  1253 |     await create.getByTestId("monetisation-market-create-launch-credits").fill("10");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1250:7
```

Context:

```text
        - checkbox "Paid levels" [checked] [ref=e22]
        - generic [ref=e23]: Paid levels
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: Launch credits
          - generic [ref=e27]: Optional
        - textbox "Launch credits Optional" [ref=e28]
      - generic [ref=e29]:
        - generic [ref=e30]:
          - generic [ref=e31]: Launch days
          - generic [ref=e32]: Optional
        - textbox "Launch days Optional" [ref=e33]
      - alert [ref=e34]: Turning paid levels on needs a launch bundle.
      - generic [ref=e35]:
        - button "Cancel" [ref=e36] [cursor=pointer]
        - button "Save" [active] [ref=e37] [cursor=pointer]
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: MON-13 signed-in: the console rpc answered

expect(received).toMatch(expected)

Expected pattern: /denied|not signed in|permission denied/
Received string:  "permissionDenied"
--- further error 1 ---
Error: MON-13 signed-in: the console rpc answered

expect(received).toMatch(expected)

Expected pattern: /denied|not signed in|permission denied/
Received string:  "permissionDenied"

  1388 |       ).toBe("42501");
  1389 |       const console = await client.rpc("admin_list_monetisation");
> 1390 |       expect(console.error?.message, `MON-13 ${who}: the console rpc answered`).toMatch(
       |                                                                                 ^
  1391 |         /denied|not signed in|permission denied/,
  1392 |       );
  1393 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1390:81
```

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-13-the-browser-roles-read-enabled-products-and-valid-prices-by-their-own-columns-never-created_by-or-updated_by-the-console-rpc-refuses-them-mobile-360` — Playwright's name `admin-monetisation-P-1b-Ad-852f2-he-console-rpc-refuses-them-mobile-360`; this run carried 20 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-4827e-dit-row-OFF-clears-the-mark-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-c2a47-e-doors-refuse-both-by-name-mobile-360`, `admin-monetisation-P-1b-Ad-e27d7-e-when-perks-are-sent-to-it-desktop-1280`, `admin-monetisation-P-1b-Ad-4827e-dit-row-OFF-clears-the-mark-mobile-360`, `admin-monetisation-P-1b-Ad-0bdae-erb-is-gone-while-End-stays-mobile-360-retry1`

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  588 |         })
  589 |       ).error,
> 590 |     ).toBe("permission denied");
      |       ^
  591 |     expect((await pageDoor(page, "admin_list_monetisation", {})).error).toBe("denied");
  592 |
  593 |     const viewer = await leaseUser();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:590:7
```

Context:

```text
          - listitem [ref=e182]:
            - generic [ref=e183]: About
          - listitem [ref=e184]:
            - generic [ref=e185]: Contact
      - navigation "Help" [ref=e186]:
        - heading "Help" [level=2] [ref=e187]
        - list [ref=e188]:
          - listitem [ref=e189]:
            - generic [ref=e190]: Safety
      - navigation "Legal" [ref=e191]:
        - heading "Legal" [level=2] [ref=e192]
        - list [ref=e193]:
          - listitem [ref=e194]:
            - link "Terms" [ref=e195] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e196]:
            - link "Privacy" [ref=e197] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e199]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "perks on reach"
Received: "perksOnReach"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "perks on reach"
Received: "perksOnReach"

  813 |         })
  814 |       ).error,
> 815 |     ).toBe("perks on reach");
      |       ^
  816 |     expect((await readProduct(key))?.max_photos).toBeNull();
  817 |   });
  818 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:815:7
```

Context:

```text
          - listitem [ref=e763]:
            - generic [ref=e764]: About
          - listitem [ref=e765]:
            - generic [ref=e766]: Contact
      - navigation "Help" [ref=e767]:
        - heading "Help" [level=2] [ref=e768]
        - list [ref=e769]:
          - listitem [ref=e770]:
            - generic [ref=e771]: Safety
      - navigation "Legal" [ref=e772]:
        - heading "Legal" [level=2] [ref=e773]
        - list [ref=e774]:
          - listitem [ref=e775]:
            - link "Terms" [ref=e776] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e777]:
            - link "Privacy" [ref=e778] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e780]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('monetisation-price-edit').getByTestId('monetisation-price-edit-error')
Expected: "This price has been used; end it and add a new one."
Received: "That could not be saved."
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('monetisation-price-edit').getByTestId('monetisation-price-edit-error')
    14 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="monetisation-price-edit-error">That could not be saved.</p>
       - unexpected value "That could not be saved."

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('monetisation-price-edit').getByTestId('monetisation-price-edit-error')
Expected: "This price has been used; end it and add a new one."
Received: "That could not be saved."
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('monetisation-price-edit').getByTestId('monetisation-price-edit-error')
    14 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="monetisation-price-edit-error">That could not be saved.</p>
       - unexpected value "That could not be saved."


  1145 |     await edit.getByTestId("monetisation-price-edit-save").click();
  1146 |     await awaitGuardedOutcome(page, secret, edit.getByTestId("monetisation-price-edit-error"));
> 1147 |     await expect(edit.getByTestId("monetisation-price-edit-error")).toHaveText(
       |                                                                     ^
  1148 |       en["admin.monetisation.error.priceInUse"],
  1149 |     );
```

Context:

```text
            - generic [ref=e44]: 19 Nov 2026
          - button "Clear date" [ref=e45]:
            - img [ref=e46]
      - generic [ref=e49]:
        - generic [ref=e50]:
          - generic [ref=e51]: Valid until
          - generic [ref=e52]: Optional
        - button "Valid until Optional" [ref=e55]:
          - img [ref=e56]
          - generic [ref=e58]: Choose date
        - paragraph [ref=e60]: Leave blank for no end.
      - alert [ref=e61]: That could not be saved.
      - paragraph [ref=e62]: "Reason: priceInUse"
      - generic [ref=e63]:
        - button "Cancel" [ref=e64] [cursor=pointer]
        - button "Save" [ref=e65] [cursor=pointer]
    - button "Close" [ref=e66] [cursor=pointer]:
      - img [ref=e67]
      - generic [ref=e70]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "launch bundle required"
Received: "launchRequired"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "launch bundle required"
Received: "launchRequired"

  1248 |         })
  1249 |       ).error,
> 1250 |     ).toBe("launch bundle required");
       |       ^
  1251 |     expect(await readMarket(market.code)).toBeNull();
  1252 |
  1253 |     await create.getByTestId("monetisation-market-create-launch-credits").fill("10");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1250:7
```

Context:

```text
        - checkbox "Paid levels" [checked] [ref=e22]
        - generic [ref=e23]: Paid levels
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: Launch credits
          - generic [ref=e27]: Optional
        - textbox "Launch credits Optional" [ref=e28]
      - generic [ref=e29]:
        - generic [ref=e30]:
          - generic [ref=e31]: Launch days
          - generic [ref=e32]: Optional
        - textbox "Launch days Optional" [ref=e33]
      - alert [ref=e34]: Turning paid levels on needs a launch bundle.
      - generic [ref=e35]:
        - button "Cancel" [ref=e36] [cursor=pointer]
        - button "Save" [active] [ref=e37] [cursor=pointer]
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: MON-13 signed-in: the console rpc answered

expect(received).toMatch(expected)

Expected pattern: /denied|not signed in|permission denied/
Received string:  "permissionDenied"
--- further error 1 ---
Error: MON-13 signed-in: the console rpc answered

expect(received).toMatch(expected)

Expected pattern: /denied|not signed in|permission denied/
Received string:  "permissionDenied"

  1388 |       ).toBe("42501");
  1389 |       const console = await client.rpc("admin_list_monetisation");
> 1390 |       expect(console.error?.message, `MON-13 ${who}: the console rpc answered`).toMatch(
       |                                                                                 ^
  1391 |         /denied|not signed in|permission denied/,
  1392 |       );
  1393 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1390:81
```

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-13-the-browser-roles-read-enabled-products-and-valid-prices-by-their-own-columns-never-created_by-or-updated_by-the-console-rpc-refuses-them-desktop-1280` — Playwright's name `admin-monetisation-P-1b-Ad-852f2-he-console-rpc-refuses-them-desktop-1280`; this run carried 20 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-4827e-dit-row-OFF-clears-the-mark-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-c2a47-e-doors-refuse-both-by-name-mobile-360`, `admin-monetisation-P-1b-Ad-e27d7-e-when-perks-are-sent-to-it-desktop-1280`, `admin-monetisation-P-1b-Ad-4827e-dit-row-OFF-clears-the-mark-mobile-360`, `admin-monetisation-P-1b-Ad-0bdae-erb-is-gone-while-End-stays-mobile-360-retry1`

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_ai_features ({"code":"P0D01","details":null,"hint":null,"message":"permissionDenied"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_ai_features ({"code":"P0D01","details":null,"hint":null,"message":"permissionDenied"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_ai_features ({"code":"P0D01","details":null,"hint":null,"message":"permissionDenied"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_ai_features ({"code":"P0D01","details":null,"hint":null,"message":"permissionDenied"})
```

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_market_settings ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "launchRequired", "refusals": [{"reason": "launchRequired"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_market_settings ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "launchRequired", "refusals": [{"reason": "launchRequired"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_save_listing_package ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_save_listing_package ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "perksOnReach", "refusals": [{"reason": "perksOnReach"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "perksOnReach", "refusals": [{"reason": "perksOnReach"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_package_price ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "priceInUse", "refusals": [{"reason": "priceInUse"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_package_price ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "priceInUse", "refusals": [{"reason": "priceInUse"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_market_settings ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "launchRequired", "refusals": [{"reason": "launchRequired"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_market_settings ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "launchRequired", "refusals": [{"reason": "launchRequired"}]})
```
