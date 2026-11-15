# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43736295761
- Commit: `ece9eae77491d6ed641e3a7f956b1ae96347bbb4`
- Attempt: 1
- Written (UTC): 2026-11-15T21:34:57.486Z
- Passed: 2470 · Skipped: 336 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
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
| nightly | 2026-11-15T16:42:25.488Z | 0.7 min |
| full | 2026-11-15T16:43:08.907Z | 291.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 70 | 10.8 min | full |
| `shell.spec.ts` | 234 | 10.7 min | full |
| `admin-listings.spec.ts` | 76 | 10.5 min | full |
| `ad-page.spec.ts` | 82 | 9.8 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 8.8 min | full |
| `post-wizard-specs.spec.ts` | 82 | 8.8 min | full |
| `import-security.spec.ts` | 36 | 8.8 min | full |
| `admin-screening.spec.ts` | 54 | 8.4 min | full |
| `post-wizard-place.spec.ts` | 40 | 6.8 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.7 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 6.3 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 6.3 min | full |
| `posting-routes.spec.ts` | 80 | 6.0 min | full |
| `my-listings-ad.spec.ts` | 38 | 5.9 min | full |
| `feed-screens.spec.ts` | 36 | 5.8 min | full |
| `post-wizard-where.spec.ts` | 32 | 5.7 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.6 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.5 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.5 min | full |
| `admin-locations.spec.ts` | 38 | 5.3 min | full |
| `admin-translations-governance.spec.ts` | 20 | 5.3 min | full |
| `post-wizard-category.spec.ts` | 48 | 5.1 min | full |
| `admin-roles.spec.ts` | 28 | 5.0 min | full |
| `legal-certify.spec.ts` | 44 | 5.0 min | full |
| `admin-users.spec.ts` | 28 | 5.0 min | full |
| `admin-monetisation.spec.ts` | 34 | 4.7 min | full |
| `viewing-place.spec.ts` | 22 | 4.7 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.6 min | full |
| `sage-bands.spec.ts` | 76 | 4.5 min | full |
| `post-wizard-resets.spec.ts` | 34 | 4.5 min | full |
| `auth-signout.spec.ts` | 36 | 4.3 min | full |
| `choice-lists.spec.ts` | 96 | 4.3 min | full |
| `legal-admin.spec.ts` | 44 | 3.6 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.5 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.3 min | full |
| `my-listings-doors.spec.ts` | 28 | 3.2 min | full |
| `ad-page-doors.spec.ts` | 30 | 3.2 min | full |
| `my-listings-levels.spec.ts` | 28 | 3.0 min | full |
| `my-listings-page.spec.ts` | 18 | 2.9 min | full |
| `admin-countries.spec.ts` | 18 | 2.4 min | full |
| `admin-audit.spec.ts` | 16 | 2.4 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | full |
| `sage-ad-page.spec.ts` | 18 | 2.3 min | full |
| `dialogs.spec.ts` | 16 | 2.2 min | full |
| `admin-categories-images.spec.ts` | 4 | 2.2 min | full |
| `legal-doors.spec.ts` | 34 | 2.2 min | full |
| `sage-tiers.spec.ts` | 40 | 2.2 min | full |
| `press.spec.ts` | 22 | 2.1 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.0 min | full |
| `user-guides.spec.ts` | 18 | 2.0 min | full |
| `my-listings-promote.spec.ts` | 10 | 2.0 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 1.8 min | full |
| `mfa-stepup.spec.ts` | 20 | 1.8 min | full |
| `feed-index.spec.ts` | 30 | 1.7 min | full |
| `admin-shell.spec.ts` | 12 | 1.6 min | full |
| `feed-route.spec.ts` | 22 | 1.5 min | full |
| `name-check-queue.spec.ts` | 8 | 1.4 min | full |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | full |
| `admin-guides.spec.ts` | 14 | 1.3 min | full |
| `i18n-sign-in-language.spec.ts` | 12 | 1.2 min | full |
| `phone-frame.spec.ts` | 18 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.0 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.0 min | full |
| `supabase-door.spec.ts` | 12 | 0.9 min | full |
| `auth-caller-gates.spec.ts` | 8 | 0.9 min | full |
| `posting-routes-dials.spec.ts` | 14 | 0.9 min | full |
| `post-wizard-details.spec.ts` | 8 | 0.9 min | full |
| `sage-cards.spec.ts` | 28 | 0.9 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.8 min | full |
| `legal-accept.spec.ts` | 12 | 0.8 min | full |
| `sage-shell.spec.ts` | 80 | 0.8 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.7 min | full |
| `door-refusals.spec.ts` | 12 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.5 min | nightly |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | full |
| `one-line-slots.spec.ts` | 10 | 0.5 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.5 min | full |
| `legal-history.spec.ts` | 6 | 0.5 min | full |
| `house-style.spec.ts` | 12 | 0.5 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.5 min | full |
| `account-saved.spec.ts` | 4 | 0.5 min | full |
| `admin-services.spec.ts` | 10 | 0.4 min | full |
| `page-head.spec.ts` | 4 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `category-image-routes.spec.ts` | 10 | 0.4 min | full |
| `settings.spec.ts` | 9 | 0.4 min | full |
| `legal-pages.spec.ts` | 10 | 0.4 min | full |
| `submenu.spec.ts` | 14 | 0.4 min | full |
| `shell-bands.spec.ts` | 16 | 0.3 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `submenu-look.spec.ts` | 12 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `menu-rows.spec.ts` | 6 | 0.2 min | full |
| `seller-name-hidden.spec.ts` | 2 | 0.2 min | full |
| `locale-format.spec.ts` | 2 | 0.2 min | full |
| `overlays.spec.ts` | 8 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `ad-page-layout.spec.ts` | 2 | 0.2 min | full |
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
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 124.0 s |
| `admin-categories-images.spec.ts` › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state | desktop-1280 | 56.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 55.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 53.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 52.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.6 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.9 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | desktop-1280 | 40.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.8 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | mobile-360 | 36.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 32.4 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43736295761-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 86 (pool 2, fresh 84)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 132 user(s) owned by process 43736295761-nightly
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

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```
