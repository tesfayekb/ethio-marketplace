# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43059972427
- Commit: `2b11a9d2943114859f22ac14cfc9ccf9f589ac54`
- Attempt: 1
- Written (UTC): 2026-11-11T21:55:13.567Z
- Passed: 2457 · Skipped: 336 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `gate fetch threw upstream ssr language gate timed out after <n>ms` | 1 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### gate fetch threw upstream ssr language gate timed out after <n>ms

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-27 edit_my_listing counts against the revise dial ×1 · PR-28 transition_listing counts against the revise dial ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-11-11T17:06:52.199Z | 0.6 min |
| full | 2026-11-11T17:07:29.722Z | 287.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 11.1 min | full |
| `admin-listings.spec.ts` | 76 | 10.9 min | full |
| `photo-pipeline.spec.ts` | 68 | 10.3 min | full |
| `post-wizard-specs.spec.ts` | 82 | 9.2 min | full |
| `ad-page.spec.ts` | 78 | 9.1 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 9.0 min | full |
| `admin-screening.spec.ts` | 54 | 8.4 min | full |
| `import-security.spec.ts` | 36 | 8.1 min | full |
| `post-wizard-place.spec.ts` | 40 | 6.7 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.5 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 6.3 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 6.1 min | full |
| `posting-routes.spec.ts` | 80 | 6.1 min | full |
| `my-listings-ad.spec.ts` | 38 | 5.8 min | full |
| `post-wizard-where.spec.ts` | 32 | 5.7 min | full |
| `feed-screens.spec.ts` | 36 | 5.7 min | full |
| `admin-translations-governance.spec.ts` | 20 | 5.6 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.5 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.4 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.3 min | full |
| `admin-locations.spec.ts` | 38 | 5.2 min | full |
| `admin-users.spec.ts` | 28 | 5.0 min | full |
| `post-wizard-category.spec.ts` | 48 | 5.0 min | full |
| `admin-roles.spec.ts` | 28 | 5.0 min | full |
| `legal-certify.spec.ts` | 44 | 4.9 min | full |
| `sage-bands.spec.ts` | 76 | 4.8 min | full |
| `viewing-place.spec.ts` | 22 | 4.7 min | full |
| `post-wizard-resets.spec.ts` | 34 | 4.6 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.5 min | full |
| `auth-signout.spec.ts` | 36 | 4.4 min | full |
| `admin-monetisation.spec.ts` | 34 | 4.2 min | full |
| `choice-lists.spec.ts` | 96 | 4.1 min | full |
| `legal-admin.spec.ts` | 44 | 3.5 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.4 min | full |
| `my-listings-doors.spec.ts` | 28 | 3.1 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.1 min | full |
| `ad-page-doors.spec.ts` | 30 | 3.0 min | full |
| `my-listings-levels.spec.ts` | 28 | 2.9 min | full |
| `my-listings-page.spec.ts` | 16 | 2.5 min | full |
| `sage-ad-page.spec.ts` | 18 | 2.4 min | full |
| `admin-countries.spec.ts` | 18 | 2.4 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.3 min | full |
| `sage-tiers.spec.ts` | 40 | 2.3 min | full |
| `admin-categories-images.spec.ts` | 4 | 2.1 min | full |
| `press.spec.ts` | 22 | 2.1 min | full |
| `legal-doors.spec.ts` | 34 | 2.0 min | full |
| `dialogs.spec.ts` | 14 | 2.0 min | full |
| `admin-audit.spec.ts` | 14 | 2.0 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.0 min | full |
| `user-guides.spec.ts` | 18 | 2.0 min | full |
| `my-listings-promote.spec.ts` | 10 | 1.9 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 1.8 min | full |
| `mfa-stepup.spec.ts` | 20 | 1.8 min | full |
| `feed-index.spec.ts` | 30 | 1.6 min | full |
| `admin-shell.spec.ts` | 12 | 1.5 min | full |
| `name-check-queue.spec.ts` | 8 | 1.5 min | full |
| `feed-route.spec.ts` | 22 | 1.5 min | full |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | full |
| `i18n-sign-in-language.spec.ts` | 12 | 1.2 min | full |
| `admin-guides.spec.ts` | 14 | 1.2 min | full |
| `posting-routes-dials.spec.ts` | 14 | 1.1 min | full |
| `phone-frame.spec.ts` | 18 | 1.0 min | full |
| `locations-tree.spec.ts` | 8 | 1.0 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.0 min | full |
| `auth-caller-gates.spec.ts` | 8 | 0.9 min | full |
| `supabase-door.spec.ts` | 12 | 0.9 min | full |
| `sage-cards.spec.ts` | 28 | 0.9 min | full |
| `post-wizard-details.spec.ts` | 8 | 0.9 min | full |
| `sage-shell.spec.ts` | 80 | 0.8 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.8 min | full |
| `legal-accept.spec.ts` | 12 | 0.8 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `one-line-slots.spec.ts` | 10 | 0.6 min | full |
| `door-refusals.spec.ts` | 12 | 0.6 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.5 min | nightly |
| `posting-routes-identity.spec.ts` | 4 | 0.5 min | full |
| `account-saved.spec.ts` | 4 | 0.5 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.5 min | full |
| `house-style.spec.ts` | 12 | 0.5 min | full |
| `admin-services.spec.ts` | 10 | 0.4 min | full |
| `legal-history.spec.ts` | 6 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `page-head.spec.ts` | 4 | 0.4 min | full |
| `category-image-routes.spec.ts` | 10 | 0.4 min | full |
| `settings.spec.ts` | 9 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `shell-bands.spec.ts` | 16 | 0.4 min | full |
| `legal-pages.spec.ts` | 10 | 0.4 min | full |
| `submenu.spec.ts` | 14 | 0.4 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `submenu-look.spec.ts` | 12 | 0.2 min | full |
| `seller-name-hidden.spec.ts` | 2 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `menu-rows.spec.ts` | 6 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `overlays.spec.ts` | 8 | 0.2 min | full |
| `locale-format.spec.ts` | 2 | 0.2 min | full |
| `ad-page-layout.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `overlay-shift.spec.ts` | 6 | 0.1 min | full |
| `i18n-layers.spec.ts` | 6 | 0.1 min | full |
| `submenu-touch.spec.ts` | 8 | 0.1 min | full |
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
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 147.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 53.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 52.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 52.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.7 s |
| `admin-categories-images.spec.ts` › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state | desktop-1280 | 51.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.8 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.6 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 39.8 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | mobile-360 | 38.2 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | desktop-1280 | 38.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 33.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.1 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43059972427-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 84 (pool 2, fresh 82)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 130 user(s) owned by process 43059972427-nightly
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

Context: context file not found for `auth-resend-exhaustion-A-3-three-resends-exhaust-the-per-visit-limit-nightly-mobile-360` — Playwright's name `auth-resend-exhaustion-A-3-52f91-exhaust-the-per-visit-limit-nightly-mobile-360`; this run carried 1 context file(s); of the same spec: none

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `full`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":12,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":660,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-e2e-cat-nightly-1-lx3pzk:32\",\"rail-category-e2e-cat-local-5-2tysel-k13:32\",\"rail-category-e2e-cat-local-5-2tysel-k1:32\",\"rail-category-e2e-cat-local-5-2tysel-k4:32\",\"rail-category-e2e-cat-local-5-2tysel-k9:32\",\"rail-category-e2e-cat-local-5-2tysel-k11:32\",\"rail-category-e2e-cat-local-5-2tysel-k12:32\",\"rail-category-e2e-cat-local-5-2tysel-k14:32\",\"rail-category-e2e-cat-local-5-2tysel-k6:32\",\"rail-category-e2e-cat-local-5-2tysel-k8:32\",\"rail-category-e2e-cat-nightly-6-3jr3xg:32\",\"rail-category-e2e-cat-local-5-2tysel-k7:32\",\"rail-category-e2e-cat-local-5-2tysel-k2:32\",\"rail-category-e2e-cat-local-5-2tysel-k10:32\",\"rail-category-e2e-cat-local-5-2tysel-r:32\",\"rail-category-e2e-cat-local-5-2tysel-k3:32\",\"rail-category-e2e-cat-local-5-2tysel-k5:32\",\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-cat-nightly-0-fejch3:32\",\"rail-category-e2e-cat-nightly-7-zx191d:32\",\"rail-category-e2e-cat-nightly-7-tuyfqd:32\",\"rail-category-e2e-cat-nightly-7-z6v2z1:32\",\"rail-category-e2e-post-local-1-qik6kb:32\",\"rail-category-e2e-post-local-0-69x7cd:32\",\"rail-category-e2e-post-local-1-prjujr:32\",\"rail-category-e2e-post-local-2-tcvpp3:32\",\"rail-category-e2e-post-nightly-13-un2d1m:32\",\"rail-category-e2e-post-local-0-vvrhkd:32\",\"rail-category-e2e-post-nightly-17-vy70rh:32\",\"rail-category-e2e-post-nightly-8-ulthia:32\",\"rail-category-e2e-post-local-2-v0wo1h:32\",\"rail-category-e2e-post-local-0-m9gq3j:32\",\"rail-category-e2e-post-local-1-floae6:32\",\"rail-category-e2e-post-local-3-pl04e8:32\",\"rail-category-e2e-post-local-0-ub7aq1:32\",\"rail-category-e2e-post-nightly-7-mevtgw:32\",\"rail-category-e2e-post-local-1-3ojbtv:32\",\"rail-category-e2e-post-local-1-28pcks:32\",\"rail-category-e2e-post-local-0-xsg5ke:32\",\"rail-category-e2e-post-local-2-gvr9xv:32\",\"rail-category-e2e-post-local-17-afddnu:32\",\"rail-category-e2e-post-local-0-r9z1f7:32\",\"rail-category-e2e-post-local-4-pxwuat:32\",\"rail-category-e2e-post-nightly-8-48jjod:32\",\"rail-category-e2e-post-local-1-7frrri:32\",\"rail-category-e2e-post-local-4-w2jpvx:32\",\"rail-category-e2e-post-local-2-2kqk36:32\",\"rail-category-e2e-post-local-1-z4f47a:32\",\"rail-category-e2e-post-local-6-gs59i1:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":648,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":12},\"rows\":[\"strip-category-e2e-cat-nightly-1-lx3pzk:32\",\"strip-category-e2e-cat-local-5-2tysel-k13:32\",\"strip-category-e2e-cat-local-5-2tysel-k1:32\",\"strip-category-e2e-cat-local-5-2tysel-k4:32\",\"strip-category-e2e-cat-local-5-2tysel-k9:32\",\"strip-category-e2e-cat-local-5-2tysel-k11:32\",\"strip-category-e2e-cat-local-5-2tysel-k12:32\",\"strip-category-e2e-cat-local-5-2tysel-k14:32\",\"strip-category-e2e-cat-local-5-2tysel-k6:32\",\"strip-category-e2e-cat-local-5-2tysel-k8:32\",\"strip-category-e2e-cat-nightly-6-3jr3xg:32\",\"strip-category-e2e-cat-local-5-2tysel-k7:32\",\"strip-category-e2e-cat-local-5-2tysel-k2:32\",\"strip-category-e2e-cat-local-5-2tysel-k10:32\",\"strip-category-e2e-cat-local-5-2tysel-r:32\",\"strip-category-e2e-cat-local-5-2tysel-k3:32\",\"strip-category-e2e-cat-local-5-2tysel-k5:32\",\"strip-category-vehicles:32\",\"strip-category-electronics:32\",\"strip-category-fashion:32\",\"strip-category-home-garden:32\",\"strip-category-beauty-personal-care:32\",\"strip-category-real-estate:32\",\"strip-category-services:32\",\"strip-category-sports-leisure:32\",\"strip-category-construction:32\",\"strip-category-travel:32\",\"strip-category-agriculture-farming:32\",\"strip-category-pets-animals:32\",\"strip-category-babies-kids:32\",\"strip-category-commercial-equipment:32\",\"strip-category-e2e-cat-nightly-0-fejch3:32\",\"strip-category-e2e-cat-nightly-7-zx191d:32\",\"strip-category-e2e-cat-nightly-7-tuyfqd:32\",\"strip-category-e2e-cat-nightly-7-z6v2z1:32\",\"strip-category-e2e-post-local-1-qik6kb:32\",\"strip-category-e2e-post-local-0-69x7cd:32\",\"strip-category-e2e-post-local-1-prjujr:32\",\"strip-category-e2e-post-local-2-tcvpp3:32\",\"strip-category-e2e-post-nightly-13-un2d1m:32\",\"strip-category-e2e-post-local-0-vvrhkd:32\",\"strip-category-e2e-post-nightly-17-vy70rh:32\",\"strip-category-e2e-post-nightly-8-ulthia:32\",\"strip-category-e2e-post-local-2-v0wo1h:32\",\"strip-category-e2e-post-local-0-m9gq3j:32\",\"strip-category-e2e-post-local-1-floae6:32\",\"strip-category-e2e-post-local-3-pl04e8:32\",\"strip-category-e2e-post-local-0-ub7aq1:32\",\"strip-category-e2e-post-nightly-7-mevtgw:32\",\"strip-category-e2e-post-local-1-3ojbtv:32\",\"strip-category-e2e-post-local-1-28pcks:32\",\"strip-category-e2e-post-local-0-xsg5ke:32\",\"strip-category-e2e-post-local-2-gvr9xv:32\",\"strip-category-e2e-post-local-17-afddnu:32\",\"strip-category-e2e-post-local-0-r9z1f7:32\",\"strip-category-e2e-post-local-4-pxwuat:32\",\"strip-category-e2e-post-nightly-8-48jjod:32\",\"strip-category-e2e-post-local-1-7frrri:32\",\"strip-category-e2e-post-local-4-w2jpvx:32\",\"strip-category-e2e-post-local-2-2kqk36:32\",\"strip-category-e2e-post-local-1-z4f47a:32\",\"strip-category-e2e-post-local-6-gs59i1:32\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":12,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":660,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-e2e-cat-nightly-1-lx3pzk:32\",\"rail-category-e2e-cat-local-5-2tysel-k13:32\",\"rail-category-e2e-cat-local-5-2tysel-k1:32\",\"rail-category-e2e-cat-local-5-2tysel-k4:32\",\"rail-category-e2e-cat-local-5-2tysel-k9:32\",\"rail-category-e2e-cat-local-5-2tysel-k11:32\",\"rail-category-e2e-cat-local-5-2tysel-k12:32\",\"rail-category-e2e-cat-local-5-2tysel-k14:32\",\"rail-category-e2e-cat-local-5-2tysel-k6:32\",\"rail-category-e2e-cat-local-5-2tysel-k8:32\",\"rail-category-e2e-cat-nightly-6-3jr3xg:32\",\"rail-category-e2e-cat-local-5-2tysel-k7:32\",\"rail-category-e2e-cat-local-5-2tysel-k2:32\",\"rail-category-e2e-cat-local-5-2tysel-k10:32\",\"rail-category-e2e-cat-local-5-2tysel-r:32\",\"rail-category-e2e-cat-local-5-2tysel-k3:32\",\"rail-category-e2e-cat-local-5-2tysel-k5:32\",\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-cat-nightly-0-fejch3:32\",\"rail-category-e2e-cat-nightly-7-zx191d:32\",\"rail-category-e2e-cat-nightly-7-tuyfqd:32\",\"rail-category-e2e-cat-nightly-7-z6v2z1:32\",\"rail-category-e2e-post-local-1-qik6kb:32\",\"rail-category-e2e-post-local-0-69x7cd:32\",\"rail-category-e2e-post-local-1-prjujr:32\",\"rail-category-e2e-post-local-2-tcvpp3:32\",\"rail-category-e2e-post-nightly-13-un2d1m:32\",\"rail-category-e2e-post-local-0-vvrhkd:32\",\"rail-category-e2e-post-nightly-17-vy70rh:32\",\"rail-category-e2e-post-nightly-8-ulthia:32\",\"rail-category-e2e-post-local-2-v0wo1h:32\",\"rail-category-e2e-post-local-0-m9gq3j:32\",\"rail-category-e2e-post-local-1-floae6:32\",\"rail-category-e2e-post-local-3-pl04e8:32\",\"rail-category-e2e-post-local-0-ub7aq1:32\",\"rail-category-e2e-post-nightly-7-mevtgw:32\",\"rail-category-e2e-post-local-1-3ojbtv:32\",\"rail-category-e2e-post-local-1-28pcks:32\",\"rail-category-e2e-post-local-0-xsg5ke:32\",\"rail-category-e2e-post-local-2-gvr9xv:32\",\"rail-category-e2e-post-local-17-afddnu:32\",\"rail-category-e2e-post-local-0-r9z1f7:32\",\"rail-category-e2e-post-local-4-pxwuat:32\",\"rail-category-e2e-post-nightly-8-48jjod:32\",\"rail-category-e2e-post-local-1-7frrri:32\",\"rail-category-e2e-post-local-4-w2jpvx:32\",\"rail-category-e2e-post-local-2-2kqk36:32\",\"rail-category-e2e-post-local-1-z4f47a:32\",\"rail-category-e2e-post-local-6-gs59i1:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":648,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":12},\"rows\":[\"strip-category-e2e-cat-nightly-1-lx3pzk:32\",\"strip-category-e2e-cat-local-5-2tysel-k13:32\",\"strip-category-e2e-cat-local-5-2tysel-k1:32\",\"strip-category-e2e-cat-local-5-2tysel-k4:32\",\"strip-category-e2e-cat-local-5-2tysel-k9:32\",\"strip-category-e2e-cat-local-5-2tysel-k11:32\",\"strip-category-e2e-cat-local-5-2tysel-k12:32\",\"strip-category-e2e-cat-local-5-2tysel-k14:32\",\"strip-category-e2e-cat-local-5-2tysel-k6:32\",\"strip-category-e2e-cat-local-5-2tysel-k8:32\",\"strip-category-e2e-cat-nightly-6-3jr3xg:32\",\"strip-category-e2e-cat-local-5-2tysel-k7:32\",\"strip-category-e2e-cat-local-5-2tysel-k2:32\",\"strip-category-e2e-cat-local-5-2tysel-k10:32\",\"strip-category-e2e-cat-local-5-2tysel-r:32\",\"strip-category-e2e-cat-local-5-2tysel-k3:32\",\"strip-category-e2e-cat-local-5-2tysel-k5:32\",\"strip-category-vehicles:32\",\"strip-category-electronics:32\",\"strip-category-fashion:32\",\"strip-category-home-garden:32\",\"strip-category-beauty-personal-care:32\",\"strip-category-real-estate:32\",\"strip-category-services:32\",\"strip-category-sports-leisure:32\",\"strip-category-construction:32\",\"strip-category-travel:32\",\"strip-category-agriculture-farming:32\",\"strip-category-pets-animals:32\",\"strip-category-babies-kids:32\",\"strip-category-commercial-equipment:32\",\"strip-category-e2e-cat-nightly-0-fejch3:32\",\"strip-category-e2e-cat-nightly-7-zx191d:32\",\"strip-category-e2e-cat-nightly-7-tuyfqd:32\",\"strip-category-e2e-cat-nightly-7-z6v2z1:32\",\"strip-category-e2e-post-local-1-qik6kb:32\",\"strip-category-e2e-post-local-0-69x7cd:32\",\"strip-category-e2e-post-local-1-prjujr:32\",\"strip-category-e2e-post-local-2-tcvpp3:32\",\"strip-category-e2e-post-nightly-13-un2d1m:32\",\"strip-category-e2e-post-local-0-vvrhkd:32\",\"strip-category-e2e-post-nightly-17-vy70rh:32\",\"strip-category-e2e-post-nightly-8-ulthia:32\",\"strip-category-e2e-post-local-2-v0wo1h:32\",\"strip-category-e2e-post-local-0-m9gq3j:32\",\"strip-category-e2e-post-local-1-floae6:32\",\"strip-category-e2e-post-local-3-pl04e8:32\",\"strip-category-e2e-post-local-0-ub7aq1:32\",\"strip-category-e2e-post-nightly-7-mevtgw:32\",\"strip-category-e2e-post-local-1-3ojbtv:32\",\"strip-category-e2e-post-local-1-28pcks:32\",\"strip-category-e2e-post-local-0-xsg5ke:32\",\"strip-category-e2e-post-local-2-gvr9xv:32\",\"strip-category-e2e-post-local-17-afddnu:32\",\"strip-category-e2e-post-local-0-r9z1f7:32\",\"strip-category-e2e-post-local-4-pxwuat:32\",\"strip-category-e2e-post-nightly-8-48jjod:32\",\"strip-category-e2e-post-local-1-7frrri:32\",\"strip-category-e2e-post-local-4-w2jpvx:32\",\"strip-category-e2e-post-local-2-2kqk36:32\",\"strip-category-e2e-post-local-1-z4f47a:32\",\"strip-category-e2e-post-local-6-gs59i1:32\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1252 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1253 |     await expect(menuRow).toBeVisible();
> 1254 |     await expect
       |     ^
  1255 |       .poll(() => rowPair(menuRow, row, "y"), {
  1256 |         message: "RM-1 the menu row level with the strip row",
  1257 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1254:5
```

Context:

```text
          - listitem [ref=e1196]:
            - generic [ref=e1197]: About
          - listitem [ref=e1198]:
            - generic [ref=e1199]: Contact
      - navigation "Help" [ref=e1200]:
        - heading "Help" [level=2] [ref=e1201]
        - list [ref=e1202]:
          - listitem [ref=e1203]:
            - generic [ref=e1204]: Safety
      - navigation "Legal" [ref=e1205]:
        - heading "Legal" [level=2] [ref=e1206]
        - list [ref=e1207]:
          - listitem [ref=e1208]:
            - link "Terms" [ref=e1209] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1210]:
            - link "Privacy" [ref=e1211] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1213]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```

## Server errors: full

```text
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
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
