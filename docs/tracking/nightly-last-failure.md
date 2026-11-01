# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41327085361
- Commit: `e3a6dfd22a19e15bbfd386d68e7b478a6af98f72`
- Attempt: 1
- Written (UTC): 2026-11-01T21:42:52.672Z
- Passed: 2308 · Skipped: 317 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-11-01T16:57:25.464Z | 0.6 min |
| full | 2026-11-01T16:58:04.291Z | 284.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 68 | 11.7 min | full |
| `shell.spec.ts` | 234 | 11.3 min | full |
| `post-wizard-specs.spec.ts` | 82 | 9.7 min | full |
| `ad-page.spec.ts` | 78 | 9.6 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 9.5 min | full |
| `import-security.spec.ts` | 36 | 9.0 min | full |
| `admin-screening.spec.ts` | 52 | 8.6 min | full |
| `admin-listings.spec.ts` | 62 | 8.4 min | full |
| `posting-routes.spec.ts` | 80 | 7.0 min | full |
| `admin-attributes-library.spec.ts` | 42 | 7.0 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 6.8 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 6.6 min | full |
| `post-wizard-place.spec.ts` | 38 | 6.6 min | full |
| `my-listings-ad.spec.ts` | 36 | 6.1 min | full |
| `post-wizard-where.spec.ts` | 32 | 5.9 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.8 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.8 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | full |
| `post-wizard-category.spec.ts` | 48 | 5.5 min | full |
| `feed-screens.spec.ts` | 36 | 5.5 min | full |
| `admin-locations.spec.ts` | 38 | 5.5 min | full |
| `admin-translations-governance.spec.ts` | 20 | 5.4 min | full |
| `legal-certify.spec.ts` | 42 | 5.4 min | full |
| `post-wizard-resets.spec.ts` | 34 | 5.3 min | full |
| `admin-users.spec.ts` | 28 | 5.3 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.9 min | full |
| `admin-roles.spec.ts` | 26 | 4.9 min | full |
| `viewing-place.spec.ts` | 22 | 4.8 min | full |
| `sage-bands.spec.ts` | 76 | 4.6 min | full |
| `choice-lists.spec.ts` | 96 | 4.6 min | full |
| `auth-signout.spec.ts` | 34 | 4.4 min | full |
| `legal-admin.spec.ts` | 42 | 3.7 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.6 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.6 min | full |
| `my-listings-doors.spec.ts` | 28 | 3.4 min | full |
| `ad-page-doors.spec.ts` | 30 | 3.2 min | full |
| `my-listings-page.spec.ts` | 16 | 2.6 min | full |
| `admin-countries.spec.ts` | 18 | 2.5 min | full |
| `legal-doors.spec.ts` | 34 | 2.4 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | full |
| `sage-tiers.spec.ts` | 40 | 2.3 min | full |
| `admin-audit.spec.ts` | 14 | 2.2 min | full |
| `dialogs.spec.ts` | 14 | 2.1 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.1 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 2.0 min | full |
| `mfa-stepup.spec.ts` | 20 | 2.0 min | full |
| `feed-index.spec.ts` | 30 | 1.8 min | full |
| `admin-shell.spec.ts` | 12 | 1.7 min | full |
| `press.spec.ts` | 16 | 1.5 min | full |
| `feed-route.spec.ts` | 22 | 1.5 min | full |
| `name-check-queue.spec.ts` | 8 | 1.5 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.3 min | full |
| `i18n-sign-in-language.spec.ts` | 12 | 1.3 min | full |
| `phone-frame.spec.ts` | 18 | 1.2 min | full |
| `admin-coverage.spec.ts` | 16 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.0 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.0 min | full |
| `supabase-door.spec.ts` | 12 | 1.0 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.0 min | full |
| `auth-caller-gates.spec.ts` | 8 | 0.9 min | full |
| `sage-cards.spec.ts` | 28 | 0.9 min | full |
| `sage-shell.spec.ts` | 80 | 0.9 min | full |
| `legal-accept.spec.ts` | 12 | 0.9 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.9 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.5 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.5 min | nightly |
| `post-wizard-units.spec.ts` | 4 | 0.5 min | full |
| `legal-history.spec.ts` | 6 | 0.5 min | full |
| `house-style.spec.ts` | 12 | 0.5 min | full |
| `admin-services.spec.ts` | 10 | 0.5 min | full |
| `primitives-law.spec.ts` | 24 | 0.5 min | full |
| `account-saved.spec.ts` | 4 | 0.5 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.5 min | full |
| `legal-pages.spec.ts` | 10 | 0.4 min | full |
| `settings.spec.ts` | 9 | 0.4 min | full |
| `shell-bands.spec.ts` | 16 | 0.4 min | full |
| `page-head.spec.ts` | 4 | 0.4 min | full |
| `submenu.spec.ts` | 14 | 0.4 min | full |
| `category-image-routes.spec.ts` | 10 | 0.4 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.3 min | full |
| `submenu-look.spec.ts` | 12 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `seller-name-hidden.spec.ts` | 2 | 0.2 min | full |
| `menu-rows.spec.ts` | 6 | 0.2 min | full |
| `ad-page-layout.spec.ts` | 2 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `locale-format.spec.ts` | 2 | 0.2 min | full |
| `overlays.spec.ts` | 8 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `overlay-shift.spec.ts` | 6 | 0.1 min | full |
| `submenu-touch.spec.ts` | 8 | 0.1 min | full |
| `i18n-layers.spec.ts` | 6 | 0.1 min | full |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | full |
| `dark-cards.spec.ts` | 4 | 0.1 min | full |
| `fonts.spec.ts` | 2 | 0.0 min | full |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 133.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 55.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 53.4 s |
| `admin-categories-images.spec.ts` › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state | desktop-1280 | 53.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 53.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 49.8 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.8 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | desktop-1280 | 34.8 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | mobile-360 | 34.7 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 34.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.5 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41327085361-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 84 (pool 2, fresh 82)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 118 user(s) owned by process 41327085361-nightly
```

## auth-resend-exhaustion.spec.ts › A-3: three resends exhaust the per-visit limit

- Source: `nightly`
- Project: `nightly-mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Check your email' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Check your email' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Check your email' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Check your email' })


  48 |   await signUpFresh(page, 103);
  49 |   await assertNoSignUpError(page);
> 50 |   await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
     |                                                                            ^
  51 |     timeout: 15000,
  52 |   });
  53 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/nightly/auth-resend-exhaustion.spec.ts:50:76
```

Context: context file not found for `auth-resend-exhaustion-A-3-three-resends-exhaust-the-per-visit-limit-nightly-mobile-360` — Playwright's name `auth-resend-exhaustion-A-3-52f91-exhaust-the-per-visit-limit-nightly-mobile-360`; this run carried 0 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332)

- Source: `full`
- Project: `desktop-1280`

```text
Error: PW-79: the tap on Next was lost — no refusal summary

expect(locator).toBeVisible() failed

Locator: getByTestId('post-refusal-summary')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-79: the tap on Next was lost — no refusal summary with timeout 20000ms
  - waiting for getByTestId('post-refusal-summary')

--- further error 1 ---
Error: PW-79: the tap on Next was lost — no refusal summary

expect(locator).toBeVisible() failed

Locator: getByTestId('post-refusal-summary')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-79: the tap on Next was lost — no refusal summary with timeout 20000ms
  - waiting for getByTestId('post-refusal-summary')


  1143 |       page.getByTestId("post-refusal-summary"),
  1144 |       "PW-79: the tap on Next was lost — no refusal summary",
> 1145 |     ).toBeVisible({ timeout: 20_000 });
       |       ^
  1146 |     await expect(page.getByTestId("post-step-5")).toBeVisible();
  1147 |     await expect(
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-79-clearing-the-title-and-tapping-Next-at-once-still-registers-the-tap-INC-332-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-f73f2--registers-the-tap-INC-332--desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
