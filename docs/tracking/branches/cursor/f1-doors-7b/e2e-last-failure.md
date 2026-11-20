# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44703584986 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44703584986
- Commit: `b6ea0c5c3e74caef6d1fb270c37b804a20cc1ab4`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-ee2236758dc1… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-20T08:50:40.776Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 8` · admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states — Error: [e2e:setup] POST /token?grant_type=password failed (504): {"code":504,"error_code":"request_timeout","msg":"Processing this request timed out, please retry after a moment.","error_id":"[account id]"}

## Flaky bodies (DEC-078)

### admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): {"code":504,"error_code":"request_timeout","msg":"Processing this request timed out, please retry after a moment.","error_id":"[account id]"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): {"code":504,"error_code":"request_timeout","msg":"Processing this request timed out, please retry after a moment.","error_id":"[account id]"}

   at global-setup.ts:255

  253 |   const text = await response.text();
  254 |   if (!response.ok) {
> 255 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  256 |   }
  257 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  258 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:255:11)
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:934:17)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1076:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:438:24
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-10-translator-card-proves-both-permission-states-mobile-360` — Playwright's name `admin-translations-console-8cd8c-oves-both-permission-states-mobile-360`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

64 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>` | 2 | shard 2 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>

- Count: 2 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-7 the draft dial refuses by name once the ceiling is reached ×2 · PR-8 no bearer is 401 on every posting route ×2

```text
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-20T09:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-20T08:38:02.775Z | 3.7 min |
| email | 2026-11-20T08:37:41.636Z | 0.3 min |
| webkit | 2026-11-20T08:38:09.400Z | 6.9 min |
| shard 1 | 2026-11-20T08:38:07.584Z | 5.8 min |
| shard 2 | 2026-11-20T08:38:24.284Z | 7.3 min |
| shard 3 | 2026-11-20T08:37:51.171Z | 6.0 min |
| shard 4 | 2026-11-20T08:39:16.258Z | 5.9 min |
| shard 5 | 2026-11-20T08:38:22.012Z | 6.6 min |
| shard 6 | 2026-11-20T08:38:04.610Z | 5.6 min |
| shard 7 | 2026-11-20T08:37:56.927Z | 6.0 min |
| shard 8 | 2026-11-20T08:40:48.665Z | 6.6 min |
| shard 9 | 2026-11-20T08:37:36.558Z | 5.4 min |
| shard 10 | 2026-11-20T08:37:31.797Z | 5.3 min |
| shard 11 | 2026-11-20T08:38:26.782Z | 5.9 min |
| shard 12 | 2026-11-20T08:38:21.755Z | 5.9 min |
| shard 13 | 2026-11-20T08:39:30.731Z | 6.7 min |
| shard 14 | 2026-11-20T08:38:15.723Z | 5.2 min |
| shard 15 | 2026-11-20T08:37:37.356Z | 6.2 min |
| shard 16 | 2026-11-20T08:38:10.062Z | 6.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.0 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.9 min | shard 2 |
| `ad-page.spec.ts` | 104 | 5.5 min | webkit, shard 13 |
| `admin-translations-console.spec.ts` | 46 | 5.4 min | smoke, shard 8 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `import-security.spec.ts` | 36 | 5.3 min | shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 5.1 min | shard 13 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `photo-pipeline.spec.ts` | 74 | 4.9 min | webkit, shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.9 min | shard 7 |
| `admin-listings.spec.ts` | 78 | 4.8 min | webkit, shard 10 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `admin-screening.spec.ts` | 58 | 4.6 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `admin-users.spec.ts` | 28 | 4.4 min | shard 16 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 3.8 min | shard 8 |
| `admin-monetisation.spec.ts` | 34 | 3.6 min | smoke, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `posting-routes.spec.ts` | 80 | 3.4 min | shard 2 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `choice-lists.spec.ts` | 96 | 3.1 min | shard 7 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `post-wizard-category.spec.ts` | 52 | 3.0 min | webkit, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `dialogs.spec.ts` | 20 | 2.6 min | webkit, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `legal-admin.spec.ts` | 44 | 2.2 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.9 min | webkit, shard 2 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `sage-shell.spec.ts` | 80 | 0.9 min | shard 16 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `legal-doors.spec.ts` | 34 | 0.8 min | smoke, shard 8 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 13 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 8 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.3 min | shard 2 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 28.7 s |
