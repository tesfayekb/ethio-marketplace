# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40333117660 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40333117660
- Commit: `c1b6b4e5edada0c66524eed2fd79c7eec6a65fc0`
- Attempt: 1
- Written (UTC): 2026-10-26T14:05:38.263Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 9` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width (DEC-192, drawings v13) — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width (DEC-192, drawings v13)

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  958 |         for (const item of row) {
  959 |           expect(near(item.y, details.y, 1)).toBe(true);
> 960 |           expect(near(item.height, details.height, 1)).toBe(true);
      |                                                        ^
  961 |           expect(near(item.width, third, 2)).toBe(true);
  962 |         }
  963 |         expect(near(safety.width, article.width, 1)).toBe(true);
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:960:56)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:971:23
```

Context:

```text
          - listitem [ref=e329]:
            - generic [ref=e330]: About
          - listitem [ref=e331]:
            - generic [ref=e332]: Contact
      - navigation "Help" [ref=e333]:
        - heading "Help" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Safety
      - navigation "Legal" [ref=e338]:
        - heading "Legal" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - link "Terms" [ref=e342] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e343]:
            - link "Privacy" [ref=e344] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e346]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-10-26T13:52:33.002Z | 12.1 min |
| email | 2026-10-26T13:46:40.080Z | 0.3 min |
| shard 1 | 2026-10-26T13:47:24.556Z | 8.4 min |
| shard 2 | 2026-10-26T13:47:39.794Z | 15.0 min |
| shard 3 | 2026-10-26T13:47:08.526Z | 11.9 min |
| shard 4 | 2026-10-26T13:46:06.755Z | 6.6 min |
| shard 5 | 2026-10-26T13:46:29.979Z | 6.6 min |
| shard 6 | 2026-10-26T13:46:46.146Z | 10.6 min |
| shard 7 | 2026-10-26T13:48:23.340Z | 7.4 min |
| shard 8 | 2026-10-26T13:46:43.991Z | 7.6 min |
| shard 9 | 2026-10-26T13:46:13.922Z | 8.4 min |
| shard 10 | 2026-10-26T13:46:30.802Z | 13.1 min |
| shard 11 | 2026-10-26T13:45:49.064Z | 11.5 min |
| shard 12 | 2026-10-26T13:48:25.829Z | 8.0 min |
| shard 13 | 2026-10-26T13:46:34.286Z | 7.2 min |
| shard 14 | 2026-10-26T13:46:07.249Z | 8.6 min |
| shard 15 | 2026-10-26T13:54:34.191Z | 7.0 min |
| shard 16 | 2026-10-26T13:46:15.542Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 428 | 17.9 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 60 | 5.8 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 6, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 5.2 min | shard 7, shard 15 |
| `admin-attributes-library.spec.ts` | 42 | 5.1 min | shard 1, shard 9 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.4 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 2, shard 10 |
| `import-security.spec.ts` | 36 | 4.1 min | shard 4, shard 12 |
| `admin-roles.spec.ts` | 26 | 4.1 min | shard 2, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 4.0 min | shard 6, shard 14 |
| `admin-screening.spec.ts` | 52 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.8 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 7, shard 15 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 3.7 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 3, shard 11 |
| `admin-listings.spec.ts` | 62 | 3.5 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 2.9 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 2, shard 10 |
| `ad-page.spec.ts` | 76 | 2.6 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `posting-routes-dials.spec.ts` | 18 | 0.9 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.8 min | shard 3, shard 11 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `supabase-door.spec.ts` | 10 | 0.4 min | shard 8, shard 16 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 1, shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 4, shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
