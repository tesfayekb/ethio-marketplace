# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44489359011
- Commit: `93dcd6c182dc5bddb9bc669e3bb75bd2baa81f07`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-19T09:07:43.252Z
- Passed: 2463 · Skipped: 336 · Failed: 12
- Gating failures: 12 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: webkit (INFRA: install-chromium-s-system-libraries)
- Infrastructure: 1 lane(s) died before any test at install-chromium-s-system-libraries — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('entity-row-location-[account id]-name')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('entity-row-location-[account id]-name')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('entity-row-location-[account id]-name')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('entity-row-location-[account id]-name')


  309 |       await page.getByTestId("data-search").fill(one.name);
  310 |       const row = entityRow(page, `location-${one.id}-name`);
> 311 |       await expect(row).toBeVisible({ timeout: 20000 });
      |                         ^
  312 |       await expect(row.getByTestId(`entity-status-location-${one.id}-name`)).toHaveText(
  313 |         /untranslated/i,
  314 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:311:25
```

Context:

```text
          - listitem [ref=e311]:
            - generic [ref=e312]: About
          - listitem [ref=e313]:
            - generic [ref=e314]: Contact
      - navigation "Help" [ref=e315]:
        - heading "Help" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - generic [ref=e319]: Safety
      - navigation "Legal" [ref=e320]:
        - heading "Legal" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - link "Terms" [ref=e324] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e325]:
            - link "Privacy" [ref=e326] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e328]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 19 results files read, 18 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit

`webkit`: log unavailable.

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit

`webkit`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-19T08:47:40.925Z | 3.2 min |
| email | 2026-11-19T08:49:39.311Z | 0.3 min |
| shard 1 | 2026-11-19T08:45:51.949Z | 5.9 min |
| shard 2 | 2026-11-19T08:49:43.457Z | 5.1 min |
| shard 3 | 2026-11-19T08:48:53.313Z | 6.3 min |
| shard 4 | 2026-11-19T08:42:04.280Z | 5.4 min |
| shard 5 | 2026-11-19T08:43:45.400Z | 6.6 min |
| shard 6 | 2026-11-19T08:46:37.283Z | 5.7 min |
| shard 7 | 2026-11-19T08:48:52.803Z | 5.2 min |
| shard 8 | 2026-11-19T08:49:07.733Z | 5.5 min |
| shard 9 | 2026-11-19T08:47:56.407Z | 5.3 min |
| shard 10 | 2026-11-19T08:42:25.955Z | 6.3 min |
| shard 11 | 2026-11-19T08:42:31.898Z | 6.3 min |
| shard 12 | 2026-11-19T08:49:18.332Z | 5.8 min |
| shard 13 | 2026-11-19T08:49:20.634Z | 5.0 min |
| shard 14 | 2026-11-19T08:50:13.653Z | 5.4 min |
| shard 15 | 2026-11-19T08:45:37.274Z | 6.2 min |
| shard 16 | 2026-11-19T08:50:09.946Z | 5.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.0 min | shard 1 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.5 min | shard 3 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4 |
| `feed-screens.spec.ts` | 36 | 4.8 min | shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `admin-listings.spec.ts` | 76 | 4.6 min | shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `admin-screening.spec.ts` | 54 | 4.3 min | shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-monetisation.spec.ts` | 34 | 4.1 min | smoke, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 11 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `photo-pipeline.spec.ts` | 70 | 3.4 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `ad-page.spec.ts` | 82 | 3.0 min | shard 13 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 3 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `admin-translations-data.spec.ts` | 10 | 2.5 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 4 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 2 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `dialogs.spec.ts` | 16 | 1.8 min | shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 14 |
| `mfa-stepup.spec.ts` | 20 | 1.5 min | shard 15 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `my-listings-page.spec.ts` | 18 | 1.0 min | shard 10 |
| `sage-ad-page.spec.ts` | 18 | 1.0 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-tiers.spec.ts` | 40 | 0.9 min | shard 2 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `admin-categories-images.spec.ts` | 4 | 0.8 min | smoke, shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `locations-tree.spec.ts` | 8 | 0.7 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 10 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.9 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | desktop-1280 | 40.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44489359011-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44489359011-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44489359011-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44489359011-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44489359011-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44489359011-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44489359011-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44489359011-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44489359011-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44489359011-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44489359011-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44489359011-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44489359011-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44489359011-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44489359011-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44489359011-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44489359011-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44489359011-local-16
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

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-13-the-browser-roles-read-enabled-products-and-valid-prices-by-their-own-columns-never-created_by-or-updated_by-the-console-rpc-refuses-them-mobile-360` — Playwright's name `admin-monetisation-P-1b-Ad-852f2-he-console-rpc-refuses-them-mobile-360`; this run carried 21 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-4827e-dit-row-OFF-clears-the-mark-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-c2a47-e-doors-refuse-both-by-name-mobile-360`, `admin-monetisation-P-1b-Ad-e27d7-e-when-perks-are-sent-to-it-desktop-1280`, `admin-monetisation-P-1b-Ad-4827e-dit-row-OFF-clears-the-mark-mobile-360`, `admin-monetisation-P-1b-Ad-0bdae-erb-is-gone-while-End-stays-mobile-360-retry1`

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

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-13-the-browser-roles-read-enabled-products-and-valid-prices-by-their-own-columns-never-created_by-or-updated_by-the-console-rpc-refuses-them-desktop-1280` — Playwright's name `admin-monetisation-P-1b-Ad-852f2-he-console-rpc-refuses-them-desktop-1280`; this run carried 21 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-4827e-dit-row-OFF-clears-the-mark-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-c2a47-e-doors-refuse-both-by-name-mobile-360`, `admin-monetisation-P-1b-Ad-e27d7-e-when-perks-are-sent-to-it-desktop-1280`, `admin-monetisation-P-1b-Ad-4827e-dit-row-OFF-clears-the-mark-mobile-360`, `admin-monetisation-P-1b-Ad-0bdae-erb-is-gone-while-End-stays-mobile-360-retry1`

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

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

## webkit: no results file

webkit: no results file — the process failed outside test results (setup/teardown/preflight).

- Class: **infrastructure** (INC-1101) — died before any test at `install-chromium-s-system-libraries`; re-run the failed jobs, never a code finding
- Failed step: `install-chromium-s-system-libraries` (outcome failure) — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1

```text
Step install-chromium-s-system-libraries: outcome failure
  Get:83 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 liborc-0.4-0t64 amd64 1:0.4.38-1ubuntu0.1 [207 kB]
  Get:84 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgstreamer-plugins-base1.0-0 amd64 1.24.2-1ubuntu0.7 [863 kB]
  Ign:85 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 gstreamer1.0-libav amd64 1.24.1-1build1
  Ign:86 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libcdparanoia0 amd64 3.10.2+debian-14build3
  Ign:87 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libvisual-0.4-0 amd64 0.4.2-2build1
  Get:88 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 gstreamer1.0-plugins-base amd64 1.24.2-1ubuntu0.7 [721 kB]
  Get:89 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libaa1 amd64 1.4p5-51.1 [49.9 kB]
  Get:90 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libraw1394-11 amd64 2.1.2-2build3 [26.2 kB]
  Ign:91 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libavc1394-0 amd64 0.5.4-5build3
  Get:92 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libcaca0 amd64 0.99.beta20-4ubuntu0.2 [209 kB]
  Ign:93 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libdv4t64 amd64 1.0.0-17.1build1
  Ign:94 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgstreamer-plugins-good1.0-0 amd64 1.24.2-1ubuntu1.8
  Ign:95 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libiec61883-0 amd64 1.2.0-6build1
  Get:96 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libshout3 amd64 2.4.6-1build2 [50.3 kB]
  Ign:97 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libtag1v5-vanilla amd64 1.13.1-1build1
  Get:98 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libtag1v5 amd64 1.13.1-1build1 [11.7 kB]
  Ign:99 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libv4lconvert0t64 amd64 1.26.1-4build3
  Ign:100 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libv4l-0t64 amd64 1.26.1-4build3
  Get:101 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libwavpack1 amd64 5.6.0-1build1 [84.6 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
```

```text
(no log tail was uploaded for this source)
```
