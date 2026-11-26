# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45758262652 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45758262652
- Commit: `f50dcc72b5161ac2b3ec251ea38c259e57799790`
- Attempt: 1
- Repeat: 27 of 136 tests repeated — specs directly changed 4/7, importers of a changed helper 0/0; budget 656 s; the time cap left 32 test runs
- Written (UTC): 2026-11-26T05:27:12.532Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 4
- Errors outside any test (INC-589): repeat (2)

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 10` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 14` · admin-attributes-editor.spec.ts › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 14` · admin-attributes-editor.spec.ts › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 14` · admin-attributes-editor.spec.ts › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
--- further error 1 ---
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

   at global-setup.ts:255

  253 |   const text = await response.text();
  254 |   if (!response.ok) {
> 255 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  256 |   }
  257 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  258 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:255:11)
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:977:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1114:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1361:24
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-20-Edit-on-the-listing-s-page-the-title-and-the-price-with-a-reason-and-a-note-the-seller-is-told-a-price-prints-with-its-unit-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-b20b6--price-prints-with-its-unit-mobile-360`; this run carried 1 context file(s); of the same spec: none

### admin-attributes-editor.spec.ts › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
--- further error 1 ---
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

   at global-setup.ts:255

  253 |   const text = await response.text();
  254 |   if (!response.ok) {
> 255 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  256 |   }
  257 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  258 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:255:11)
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:977:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1114:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:804:24
```

Context: context file not found for `admin-attributes-editor-C3-attributes-console-AT-50-per-option-labels-aliases-and-the-inactive-switch-land-and-read-back-mobile-360` — Playwright's name `admin-attributes-editor-C3-c0c40-e-switch-land-and-read-back-mobile-360`; this run carried 1 context file(s); of the same spec: none

### admin-attributes-editor.spec.ts › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
--- further error 1 ---
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

   at global-setup.ts:255

  253 |   const text = await response.text();
  254 |   if (!response.ok) {
> 255 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  256 |   }
  257 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  258 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:255:11)
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:977:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1114:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:864:24
```

Context: context file not found for `admin-attributes-editor-C3-attributes-console-AT-51-the-bounds-picker-offers-a-co-linked-number-and-withholds-one-linked-nowhere-mobile-360` — Playwright's name `admin-attributes-editor-C3-2d4bf-ithholds-one-linked-nowhere-mobile-360`; this run carried 1 context file(s); of the same spec: none

### admin-attributes-editor.spec.ts › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
--- further error 1 ---
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

   at global-setup.ts:255

  253 |   const text = await response.text();
  254 |   if (!response.ok) {
> 255 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  256 |   }
  257 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  258 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:255:11)
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:977:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1114:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:864:24
```

Context: context file not found for `admin-attributes-editor-C3-attributes-console-AT-51-the-bounds-picker-offers-a-co-linked-number-and-withholds-one-linked-nowhere-desktop-1280` — Playwright's name `admin-attributes-editor-C3-2d4bf-ithholds-one-linked-nowhere-desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 776s for the test suite to run
(no place given)
```

```text
Timed out waiting 776s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 16 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 16 |
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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-26T05:02:17.935Z | 7.2 min |
| email | 2026-11-26T04:59:23.701Z | 0.3 min |
| webkit | 2026-11-26T04:59:07.591Z | 10.2 min |
| shard 1 | 2026-11-26T05:03:16.079Z | 5.6 min |
| shard 2 | 2026-11-26T05:00:53.017Z | 11.5 min |
| shard 3 | 2026-11-26T05:02:09.372Z | 7.1 min |
| shard 4 | 2026-11-26T04:59:17.012Z | 11.3 min |
| shard 5 | 2026-11-26T05:00:06.962Z | 21.0 min |
| shard 6 | 2026-11-26T04:59:13.453Z | 14.9 min |
| shard 7 | 2026-11-26T05:02:02.069Z | 10.5 min |
| shard 8 | 2026-11-26T04:59:31.071Z | 14.0 min |
| shard 9 | 2026-11-26T04:59:57.748Z | 10.8 min |
| shard 10 | 2026-11-26T05:01:46.211Z | 25.0 min |
| shard 11 | 2026-11-26T04:59:33.067Z | 6.8 min |
| shard 12 | 2026-11-26T04:59:22.796Z | 5.7 min |
| shard 13 | 2026-11-26T04:59:22.571Z | 12.3 min |
| shard 14 | 2026-11-26T04:59:10.796Z | 20.2 min |
| shard 15 | 2026-11-26T04:59:09.081Z | 15.1 min |
| shard 16 | 2026-11-26T04:59:07.857Z | 13.0 min |
| repeat | 2026-11-26T05:05:58.535Z | 12.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.4 min | webkit, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 22.0 min | shard 15 |
| `admin-screening.spec.ts` | 64 | 20.9 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 20.7 min | shard 5 |
| `admin-translations-console.spec.ts` | 46 | 19.4 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.6 min | shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 17.2 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 15.8 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 15.1 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 14.5 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 54 | 14.4 min | shard 5, repeat |
| `admin-monetisation.spec.ts` | 34 | 13.5 min | smoke, shard 10 |
| `import-security.spec.ts` | 36 | 11.8 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 11.0 min | shard 9 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 7 |
| `shell.spec.ts` | 234 | 9.1 min | shard 1 |
| `legal-doors.spec.ts` | 34 | 9.0 min | smoke, shard 6 |
| `admin-screening-reject.spec.ts` | 30 | 8.1 min | shard 4, repeat |
| `admin-translations-governance.spec.ts` | 20 | 7.4 min | smoke, shard 14 |
| `admin-countries.spec.ts` | 18 | 6.8 min | shard 7 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 9 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `admin-guides.spec.ts` | 14 | 4.6 min | shard 3 |
| `dialogs.spec.ts` | 36 | 4.5 min | webkit, shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.5 min | shard 3 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-where.spec.ts` | 32 | 4.3 min | shard 11 |
| `admin-translations-data.spec.ts` | 10 | 4.3 min | shard 8 |
| `ad-page.spec.ts` | 104 | 3.8 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 16 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 10 |
| `photo-pipeline.spec.ts` | 74 | 3.4 min | webkit, shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `mfa-stepup.spec.ts` | 28 | 2.8 min | webkit, shard 9 |
| `post-wizard-category.spec.ts` | 54 | 2.8 min | webkit, shard 3 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 2 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `name-check-queue.spec.ts` | 8 | 2.1 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 72 | 2.1 min | webkit, shard 10, repeat |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 13 |
| `admin-services.spec.ts` | 10 | 1.6 min | shard 15 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 13 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 6 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 15 |
| `press.spec.ts` | 22 | 1.3 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 2 |
| `my-listings-doors.spec.ts` | 28 | 1.1 min | shard 1 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 4 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 14 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 11 |
| `settings.spec.ts` | 16 | 0.8 min | shard 10 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 7 |
| `staff-gate.spec.ts` | 4 | 0.7 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 5 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `page-head.spec.ts` | 4 | 0.5 min | shard 5 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 7 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 4 |
| `auth-caller-gates.spec.ts` | 8 | 0.3 min | shard 8 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.3 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 15 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 13 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 2 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 9 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 1 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 10 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 10 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 8 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 13 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 6 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 14 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 4 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 5 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 4 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 1 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8 |
| `offline.spec.ts` | 6 | 0.1 min | shard 3, repeat |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 15 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 7 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 8 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 62.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 59.6 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 59.6 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.5 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 59.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 58.7 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 54.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 54.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 49.7 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 46.3 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 46.3 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 46.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 46.1 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 45.5 s |
