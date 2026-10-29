# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40847154298 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40847154298
- Commit: `bff5306966d56fe7a136c7f56f89da6396f491f8`
- Attempt: 1
- Written (UTC): 2026-10-29T09:36:52.067Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 8` · shell.spec.ts › mobile chrome › the bar and the band stay while the page scrolls — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### shell.spec.ts › mobile chrome › the bar and the band stay while the page scrolls

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 600
Received: 0

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 600
Received: 0

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1278 |     if (!before) throw new Error("Missing strip box");
  1279 |     await page.evaluate(() => window.scrollTo(0, 600));
> 1280 |     await expect
       |     ^
  1281 |       .poll(() => page.evaluate(() => Math.round(document.scrollingElement?.scrollTop ?? 0)))
  1282 |       .toBe(600);
  1283 |     const bar = await page.getByTestId("shell-topbar").locator("header").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1280:5
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

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-29T09:21:46.782Z | 12.8 min |
| email | 2026-10-29T09:21:55.257Z | 0.4 min |
| shard 1 | 2026-10-29T09:22:12.607Z | 9.6 min |
| shard 2 | 2026-10-29T09:21:25.696Z | 11.4 min |
| shard 3 | 2026-10-29T09:22:02.785Z | 14.0 min |
| shard 4 | 2026-10-29T09:22:23.242Z | 8.1 min |
| shard 5 | 2026-10-29T09:21:39.825Z | 6.0 min |
| shard 6 | 2026-10-29T09:21:55.674Z | 10.0 min |
| shard 7 | 2026-10-29T09:22:03.256Z | 6.7 min |
| shard 8 | 2026-10-29T09:21:54.107Z | 6.0 min |
| shard 9 | 2026-10-29T09:21:56.410Z | 11.9 min |
| shard 10 | 2026-10-29T09:21:50.627Z | 12.7 min |
| shard 11 | 2026-10-29T09:22:04.691Z | 13.1 min |
| shard 12 | 2026-10-29T09:21:28.436Z | 6.6 min |
| shard 13 | 2026-10-29T09:25:01.210Z | 7.6 min |
| shard 14 | 2026-10-29T09:21:31.159Z | 8.4 min |
| shard 15 | 2026-10-29T09:21:36.632Z | 5.7 min |
| shard 16 | 2026-10-29T09:21:50.203Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 18.6 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 68 | 6.3 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.9 min | shard 6, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 7, shard 15 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 3, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.5 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.4 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 3, shard 11 |
| `import-security.spec.ts` | 36 | 4.2 min | shard 4, shard 12 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `post-wizard-place.spec.ts` | 38 | 4.0 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.0 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 9, shard 16 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 68 | 3.6 min | shard 5, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 3.2 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.2 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.3 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 1, shard 9 |
| `legal-admin.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `legal-certify.spec.ts` | 42 | 1.4 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 8, shard 16 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 35.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 28.8 s |
