# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40680789056 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40680789056
- Commit: `4658634311f0ee5b47c9d1102ab579513ced1c36`
- Attempt: 1
- Written (UTC): 2026-10-28T11:51:41.569Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 5` · on-demand-failure.spec.ts › ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911) › ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads — Error: route.fulfill: Fetch response has been disposed

## Flaky bodies (DEC-078)

### on-demand-failure.spec.ts › ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911) › ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: route.fulfill: Fetch response has been disposed
--- further error 1 ---
Error: route.fulfill: Fetch response has been disposed

   at helpers/on-demand.ts:29

  27 |       const response = await route.fetch();
  28 |       if (refuse(route.request().url(), await response.text())) await route.abort("failed");
> 29 |       else await route.fulfill({ response });
     |                        ^
  30 |     }),
  31 |   );
  32 | }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/on-demand.ts:29:24
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/route-guard.ts:83:7
--- further error 2 ---
Error: browserContext.close: Test ended.
Browser logs:

[pid=8024][err] If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component.
[pid=8024][err] 
[pid=8024][err] For more information, see https://radix-ui.com/primitives/docs/components/dialog", source: http://127.0.0.1:4173/assets/overlays-impl-DrVaPA-r.js (345)
[pid=8024][err] [1028/113741.336882:INFO:CONSOLE:356] "Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.", source: http://127.0.0.1:4173/assets/overlays-impl-DrVaPA-r.js (356)
[pid=8024][err] [1028/113744.332625:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2293)
[pid=8024][err] [1028/113744.387853:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2130)
[pid=8024][err] [1028/113744.896068:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2293)
[pid=8024][err] [1028/113744.916998:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2130)
[pid=8024][err] [1028/113746.825564:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2293)
[pid=8024][err] [1028/113746.889039:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2130)
[pid=8024][err] [1028/113747.398571:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2293)
[pid=8024][err] [1028/113747.408732:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2130)
[pid=8024][err] [1028/113749.122776:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2293)
[pid=8024][err] [1028/113749.226433:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2130)
[pid=8024][err] [1028/113749.699338:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2293)
[pid=8024][err] [1028/113749.699656:INFO:CONSOLE:2130] "[i18n] entity bundle fallback for en: entity bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2130)
[pid=8024][err] [1028/113751.110822:INFO:CONSOLE:2293] "[i18n] bundle fallback for en: bundle is empty", source: http://127.0.0.1:4173/assets/provider-BOo6l2w_.js (2293)
```

Context:

```text
          - listitem [ref=e199]:
            - generic [ref=e200]: About
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Help" [ref=e203]:
        - heading "Help" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Safety
      - navigation "Legal" [ref=e208]:
        - heading "Legal" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - link "Terms" [ref=e212] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e213]:
            - link "Privacy" [ref=e214] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e216]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-10-28T11:36:32.050Z | 13.5 min |
| email | 2026-10-28T11:38:05.371Z | 0.4 min |
| shard 1 | 2026-10-28T11:35:17.183Z | 9.2 min |
| shard 2 | 2026-10-28T11:35:52.684Z | 15.3 min |
| shard 3 | 2026-10-28T11:35:36.662Z | 11.6 min |
| shard 4 | 2026-10-28T11:36:01.583Z | 8.3 min |
| shard 5 | 2026-10-28T11:35:37.833Z | 6.7 min |
| shard 6 | 2026-10-28T11:36:26.458Z | 8.5 min |
| shard 7 | 2026-10-28T11:35:27.911Z | 5.8 min |
| shard 8 | 2026-10-28T11:36:54.343Z | 8.1 min |
| shard 9 | 2026-10-28T11:37:04.310Z | 10.1 min |
| shard 10 | 2026-10-28T11:35:15.713Z | 11.6 min |
| shard 11 | 2026-10-28T11:35:45.355Z | 12.1 min |
| shard 12 | 2026-10-28T11:35:39.494Z | 7.3 min |
| shard 13 | 2026-10-28T11:36:14.845Z | 6.2 min |
| shard 14 | 2026-10-28T11:35:48.060Z | 10.6 min |
| shard 15 | 2026-10-28T11:36:16.972Z | 6.8 min |
| shard 16 | 2026-10-28T11:35:39.762Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 19.1 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 68 | 6.4 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 6, shard 14 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 7, shard 15 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.4 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 6, shard 14 |
| `admin-screening.spec.ts` | 52 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-users.spec.ts` | 28 | 3.6 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `photo-pipeline.spec.ts` | 68 | 3.5 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 3.3 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.2 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 1, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 5, shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
