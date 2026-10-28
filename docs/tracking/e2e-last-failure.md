# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40610714870 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40610714870
- Commit: `8cb2201dfa9cb07eafb851cbceeccf7731f1b0fb`
- Attempt: 1
- Written (UTC): 2026-10-28T01:02:12.258Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 13` · on-demand-failure.spec.ts › ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911) › ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads — Error: "route.fetch: Target page, context or browser has been closed" while running route callback.

## Flaky bodies (DEC-078)

### on-demand-failure.spec.ts › ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911) › ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: "route.fetch: Target page, context or browser has been closed" while running route callback.
Consider awaiting `await page.unrouteAll({ behavior: 'ignoreErrors' })`
before the end of the test to ignore remaining routes in flight.
--- further error 1 ---
Error: "route.fetch: Target page, context or browser has been closed" while running route callback.
Consider awaiting `await page.unrouteAll({ behavior: 'ignoreErrors' })`
before the end of the test to ignore remaining routes in flight.

   at helpers/on-demand.ts:27

  25 |     "**/*.js",
  26 |     whilePageLives(async (route) => {
> 27 |       const response = await route.fetch();
     |                                    ^
  28 |       if (refuse(route.request().url(), await response.text())) await route.abort("failed");
  29 |       else await route.fulfill({ response });
  30 |     }),
    at handler (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/on-demand.ts:27:36)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/route-guard.ts:38:13
--- further error 2 ---
Error: browserContext.close: Test ended.
Browser logs:

[pid=7824][err] 
[pid=7824][err] If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component.
[pid=7824][err] 
[pid=7824][err] For more information, see https://radix-ui.com/primitives/docs/components/dialog", source: http://127.0.0.1:4173/assets/overlays-impl-DU1q18mc.js (345)
[pid=7824][err] [1028/004928.676416:INFO:CONSOLE:356] "Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.", source: http://127.0.0.1:4173/assets/overlays-impl-DU1q18mc.js (356)
[pid=7824][err] [1028/004931.731819:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2293)
[pid=7824][err] [1028/004931.809363:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2130)
[pid=7824][err] [1028/004932.302259:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2293)
[pid=7824][err] [1028/004932.327602:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2130)
[pid=7824][err] [1028/004934.319817:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2293)
[pid=7824][err] [1028/004934.377135:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2130)
[pid=7824][err] [1028/004934.926465:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2293)
[pid=7824][err] [1028/004934.926515:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2130)
[pid=7824][err] [1028/004936.707067:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2293)
[pid=7824][err] [1028/004936.792258:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2130)
[pid=7824][err] [1028/004937.268201:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2293)
[pid=7824][err] [1028/004937.273205:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-CNu4a8BS.js (2130)
```

Context:

```text
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - link "Terms" [ref=e263] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e264]:
            - link "Privacy" [ref=e265] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-10-28T00:48:08.310Z | 12.8 min |
| email | 2026-10-28T00:47:19.319Z | 0.4 min |
| shard 1 | 2026-10-28T00:47:33.441Z | 9.2 min |
| shard 2 | 2026-10-28T00:47:12.586Z | 14.3 min |
| shard 3 | 2026-10-28T00:47:39.594Z | 11.7 min |
| shard 4 | 2026-10-28T00:48:29.865Z | 8.0 min |
| shard 5 | 2026-10-28T00:47:39.026Z | 6.8 min |
| shard 6 | 2026-10-28T00:47:19.079Z | 8.4 min |
| shard 7 | 2026-10-28T00:50:45.158Z | 5.8 min |
| shard 8 | 2026-10-28T00:47:30.331Z | 8.1 min |
| shard 9 | 2026-10-28T00:47:31.325Z | 8.7 min |
| shard 10 | 2026-10-28T00:47:20.989Z | 12.1 min |
| shard 11 | 2026-10-28T00:47:53.821Z | 12.8 min |
| shard 12 | 2026-10-28T00:47:16.685Z | 8.1 min |
| shard 13 | 2026-10-28T00:47:26.999Z | 7.2 min |
| shard 14 | 2026-10-28T00:47:26.272Z | 9.3 min |
| shard 15 | 2026-10-28T00:47:12.968Z | 5.4 min |
| shard 16 | 2026-10-28T00:51:02.594Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 18.7 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 68 | 6.3 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.9 min | shard 6, shard 14 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.2 min | shard 3, shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.2 min | shard 7, shard 15 |
| `admin-roles.spec.ts` | 26 | 4.1 min | shard 2, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `post-wizard-place.spec.ts` | 38 | 3.7 min | shard 6, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.4 min | shard 7, shard 15 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 76 | 2.9 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 2.9 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.2 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 2.0 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `posting-routes.spec.ts` | 80 | 1.9 min | shard 7, shard 15 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `posting-routes-dials.spec.ts` | 18 | 0.3 min | shard 7, shard 15 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.0 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
