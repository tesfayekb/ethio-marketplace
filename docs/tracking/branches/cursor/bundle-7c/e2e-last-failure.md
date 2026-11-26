# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45772935453
- Commit: `f22bfee8ba06e379d96692840af5e6e3e174c9be`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-e5c4ed01579b… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-26T07:38:48.907Z
- Passed: 2589 · Skipped: 344 · Failed: 0
- Gating failures: 0 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: smoke
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · admin-locations.spec.ts › L2a locations console › LT-9a roster shape, table twin: the edit icon sits in the end column with pagination — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 6` · legal-doors.spec.ts › Legal doors › LG-10 admin_legal_documents lists a scratch document with each version's publisher and acceptance count, newest version first, after the real kinds — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 9` · mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 14` · admin-attributes-editor.spec.ts › C3 attributes console › AT-35 the options expansion reads as labels — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### admin-locations.spec.ts › L2a locations console › LT-9a roster shape, table twin: the edit icon sits in the end column with pagination

- Source: `shard 6`
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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:912:5
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-9a-roster-shape-table-twin-the-edit-icon-sits-in-the-end-column-with-pagination-desktop-1280` — Playwright's name `admin-locations-L2a-locati-90e56--end-column-with-pagination-desktop-1280`; this run carried 0 context file(s); of the same spec: none

### legal-doors.spec.ts › Legal doors › LG-10 admin_legal_documents lists a scratch document with each version's publisher and acceptance count, newest version first, after the real kinds

- Source: `shard 6`
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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:962:17
```

Context: context file not found for `legal-doors-Legal-doors-LG-10-admin_legal_documents-lists-a-scratch-document-with-each-version-s-publisher-and-acceptance-count-newest-version-first-after-the-real-kinds-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-mobile-360`; this run carried 0 context file(s); of the same spec: none

### mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 9`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('step-up-modal')


  119 |
  120 |       const modal = page.getByTestId("step-up-modal");
> 121 |       await expect(modal).toBeVisible({ timeout: 15000 });
      |                           ^
  122 |       await page.getByTestId("step-up-code").fill(wrongCode(secret));
  123 |       await page.getByTestId("step-up-submit").click();
  124 |       await expect(page.getByTestId("step-up-error")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:121:27
```

Context: context file not found for `mfa-stepup-U1f-step-up-authentication-MF-2-gate-wrong-code-refused-correct-code-lets-the-action-through-desktop-1280` — Playwright's name `mfa-stepup-U1f-step-up-aut-c3016-ode-lets-the-action-through-desktop-1280`; this run carried 0 context file(s); of the same spec: none

### admin-attributes-editor.spec.ts › C3 attributes console › AT-35 the options expansion reads as labels

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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:505:5
```

Context: context file not found for `admin-attributes-editor-C3-attributes-console-AT-35-the-options-expansion-reads-as-labels-desktop-1280` — Playwright's name `admin-attributes-editor-C3-d745f-s-expansion-reads-as-labels-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 19 results files read, 18 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

`smoke`: log unavailable.

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

Logs read: email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

`smoke`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-26T07:12:07.319Z | 0.3 min |
| webkit | 2026-11-26T07:13:01.289Z | 12.2 min |
| shard 1 | 2026-11-26T07:13:14.489Z | 6.5 min |
| shard 2 | 2026-11-26T07:13:35.525Z | 11.1 min |
| shard 3 | 2026-11-26T07:13:21.183Z | 7.3 min |
| shard 4 | 2026-11-26T07:13:09.801Z | 11.4 min |
| shard 5 | 2026-11-26T07:12:37.564Z | 20.5 min |
| shard 6 | 2026-11-26T07:13:08.761Z | 15.5 min |
| shard 7 | 2026-11-26T07:13:22.905Z | 10.1 min |
| shard 8 | 2026-11-26T07:12:38.898Z | 13.9 min |
| shard 9 | 2026-11-26T07:12:41.157Z | 12.5 min |
| shard 10 | 2026-11-26T07:13:49.360Z | 24.4 min |
| shard 11 | 2026-11-26T07:12:42.372Z | 5.8 min |
| shard 12 | 2026-11-26T07:12:46.661Z | 5.7 min |
| shard 13 | 2026-11-26T07:13:19.761Z | 12.4 min |
| shard 14 | 2026-11-26T07:14:39.521Z | 20.2 min |
| shard 15 | 2026-11-26T07:12:38.403Z | 15.2 min |
| shard 16 | 2026-11-26T07:14:59.443Z | 13.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.8 min | webkit, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 22.1 min | shard 15 |
| `admin-screening.spec.ts` | 64 | 20.9 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 20.5 min | shard 5 |
| `admin-translations-console.spec.ts` | 44 | 18.7 min | shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.7 min | shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 16.7 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 15.9 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 15.1 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 14.8 min | shard 6 |
| `admin-monetisation.spec.ts` | 30 | 12.4 min | shard 10 |
| `import-security.spec.ts` | 36 | 11.6 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 10.8 min | shard 9 |
| `shell.spec.ts` | 234 | 10.4 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 8.8 min | shard 7 |
| `legal-doors.spec.ts` | 32 | 8.8 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 6.8 min | shard 7 |
| `dialogs.spec.ts` | 36 | 5.4 min | webkit, shard 4 |
| `auth-signout.spec.ts` | 44 | 5.4 min | webkit, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.8 min | shard 3 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `post-wizard-place.spec.ts` | 40 | 4.7 min | shard 11 |
| `admin-guides.spec.ts` | 14 | 4.5 min | shard 3 |
| `mfa-stepup.spec.ts` | 28 | 4.5 min | webkit, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `admin-translations-data.spec.ts` | 10 | 4.1 min | shard 8 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `admin-translations-governance.spec.ts` | 8 | 3.8 min | shard 14 |
| `admin-screening-reject.spec.ts` | 10 | 3.6 min | shard 4 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 3.6 min | webkit, shard 16 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 6 |
| `post-wizard-category.spec.ts` | 54 | 2.8 min | webkit, shard 3 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 6 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `name-check-queue.spec.ts` | 6 | 2.4 min | shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 2 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 13 |
| `admin-services.spec.ts` | 10 | 1.6 min | shard 15 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 13 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.3 min | shard 2 |
| `admin-categories-images.spec.ts` | 4 | 1.2 min | webkit, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 1.1 min | shard 1 |
| `press.spec.ts` | 22 | 1.0 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 4 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 12 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 11 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 14 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5 |
| `staff-gate.spec.ts` | 4 | 0.7 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 16 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 15 |
| `page-head.spec.ts` | 4 | 0.6 min | shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 11 |
| `settings.spec.ts` | 16 | 0.5 min | shard 10 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 7 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 4 |
| `shell-bands.spec.ts` | 14 | 0.4 min | shard 1 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 3 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 8 |
| `post-wizard-details.spec.ts` | 8 | 0.3 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 15 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 2 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 13 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu.spec.ts` | 10 | 0.2 min | shard 11 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 2 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 6 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 12 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 11 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 4 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 15 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 1 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 10 |
| `menu-rows.spec.ts` | 2 | 0.1 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 5 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `offline.spec.ts` | 2 | 0.1 min | shard 3 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 15 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 6 | 0.1 min | shard 9 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `i18n-bundle.spec.ts` | 2 | 0.0 min | shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 7 |
| `submenu-look.spec.ts` | 2 | 0.0 min | shard 10 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 8 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `mfa-stepup.spec.ts` › MF-2 gate: wrong code refused, correct code lets the action through | desktop-1280 | 94.4 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 60.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 60.0 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.6 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 59.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.1 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 54.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 54.4 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 46.6 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 46.3 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 46.1 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 45.9 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 45.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 45.5 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45772935453-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45772935453-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45772935453-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45772935453-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45772935453-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45772935453-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 45772935453-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45772935453-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45772935453-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45772935453-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 3, fresh 33)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 51 user(s) owned by process 45772935453-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45772935453-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 45772935453-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45772935453-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45772935453-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45772935453-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45772935453-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45772935453-local-16
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

- Failed step: `door-guard` (outcome failure) — check-doors live FAIL: callee-code-missing admin_preview_location_import(jsonb,jsonb,text) unknownCountry — loc_import_plan(jsonb,jsonb,text) refuses unknownCountry, which the line lacks (live:98)

```text
Step door-guard: outcome failure
  check-doors self-test OK: 23 finding kinds fired on their planted fixtures, the clean pair fired nothing
  check-doors live FAIL: callee-code-missing admin_commit_attribute_import(jsonb,jsonb,text,text) unknownCategory — attr_import_plan(jsonb,jsonb,text) refuses unknownCategory, which the line lacks (live:18)
  check-doors live FAIL: callee-code-missing admin_commit_location_import(jsonb,jsonb,text,text) unknownCountry — loc_import_plan(jsonb,jsonb,text) refuses unknownCountry, which the line lacks (live:20)
  check-doors live FAIL: callee-code-missing admin_preview_location_import(jsonb,jsonb,text) unknownCountry — loc_import_plan(jsonb,jsonb,text) refuses unknownCountry, which the line lacks (live:98)
```

```text
(no log tail was uploaded for this source)
```
