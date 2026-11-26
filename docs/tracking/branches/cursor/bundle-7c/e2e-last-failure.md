# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45838095211
- Commit: `206720960c4aba8ef61ec25ab9c02f881f1254ad`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-43d85ed7955a… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-26T14:50:08.400Z
- Passed: 2629 · Skipped: 360 · Failed: 2
- Gating failures: 2 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Gating failures

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-77 an import whose end state asks a child first is refused whole at the commit

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-import-error-reason')
Expected substring: "Order refused in e2e-cat-local-5-0-pgjdek: e2e_par_cbmzuw → e2e_chi_ek8z0i: the second attribute depends on the first and is asked before it. Put the first one above it."
Received string:    "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."
Timeout: 20000ms

Call log:
  - Expect "toContainText" with timeout 20000ms
  - waiting for getByTestId('attribute-import-error-reason')
    24 × locator resolved to <p data-testid="attribute-import-error-reason" class="text-sm break-words text-muted-foreground">Reason: Order refused in {detail}: the second att…</p>
       - unexpected value "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-import-error-reason')
Expected substring: "Order refused in e2e-cat-local-5-0-pgjdek: e2e_par_cbmzuw → e2e_chi_ek8z0i: the second attribute depends on the first and is asked before it. Put the first one above it."
Received string:    "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."
Timeout: 20000ms

Call log:
  - Expect "toContainText" with timeout 20000ms
  - waiting for getByTestId('attribute-import-error-reason')
    24 × locator resolved to <p data-testid="attribute-import-error-reason" class="text-sm break-words text-muted-foreground">Reason: Order refused in {detail}: the second att…</p>
       - unexpected value "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."


  507 |       await page.getByTestId("attribute-import-confirm").click();
  508 |       await stepUpIfPrompted(page, secret);
> 509 |       await expect(page.getByTestId("attribute-import-error-reason")).toContainText(
      |                                                                       ^
  510 |         fill(en["admin.attributes.error.parentAfterChild"], {
  511 |           detail: `${leaf.slug}: ${parent} → ${child}`,
```

Context:

```text
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
    - generic [ref=e10]:
      - list "Import attributes" [ref=e11]:
        - listitem [ref=e12]:
          - img [ref=e14]
          - generic [ref=e16]: Preview changes
        - listitem [ref=e17]:
          - generic [ref=e18]: "2"
          - generic [ref=e19]: Confirm import
      - paragraph [ref=e20]: Choose the two files you exported. Nothing is written until you confirm the preview.
      - status [ref=e21]: 2 added · 0 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused
      - alert [ref=e22]: The import could not be completed.
      - paragraph [ref=e23]: "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."
    - generic [ref=e24]:
      - button "Discard" [ref=e25] [cursor=pointer]
      - button "Confirm import" [ref=e26] [cursor=pointer]
    - button "Close" [ref=e27] [cursor=pointer]:
      - img [ref=e28]
      - generic [ref=e31]: Close
```
```

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-77 an import whose end state asks a child first is refused whole at the commit

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-import-error-reason')
Expected substring: "Order refused in e2e-cat-local-5-4-keo4s1: e2e_par_wo3hba → e2e_chi_hikqqh: the second attribute depends on the first and is asked before it. Put the first one above it."
Received string:    "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."
Timeout: 20000ms

Call log:
  - Expect "toContainText" with timeout 20000ms
  - waiting for getByTestId('attribute-import-error-reason')
    24 × locator resolved to <p data-testid="attribute-import-error-reason" class="text-sm break-words text-muted-foreground">Reason: Order refused in {detail}: the second att…</p>
       - unexpected value "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-import-error-reason')
Expected substring: "Order refused in e2e-cat-local-5-4-keo4s1: e2e_par_wo3hba → e2e_chi_hikqqh: the second attribute depends on the first and is asked before it. Put the first one above it."
Received string:    "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."
Timeout: 20000ms

Call log:
  - Expect "toContainText" with timeout 20000ms
  - waiting for getByTestId('attribute-import-error-reason')
    24 × locator resolved to <p data-testid="attribute-import-error-reason" class="text-sm break-words text-muted-foreground">Reason: Order refused in {detail}: the second att…</p>
       - unexpected value "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."


  507 |       await page.getByTestId("attribute-import-confirm").click();
  508 |       await stepUpIfPrompted(page, secret);
> 509 |       await expect(page.getByTestId("attribute-import-error-reason")).toContainText(
      |                                                                       ^
  510 |         fill(en["admin.attributes.error.parentAfterChild"], {
  511 |           detail: `${leaf.slug}: ${parent} → ${child}`,
```

Context:

```text
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
    - generic [ref=e10]:
      - list "Import attributes" [ref=e11]:
        - listitem [ref=e12]:
          - img [ref=e14]
          - generic [ref=e16]: Preview changes
        - listitem [ref=e17]:
          - generic [ref=e18]: "2"
          - generic [ref=e19]: Confirm import
      - paragraph [ref=e20]: Choose the two files you exported. Nothing is written until you confirm the preview.
      - status [ref=e21]: 2 added · 0 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused
      - alert [ref=e22]: The import could not be completed.
      - paragraph [ref=e23]: "Reason: Order refused in {detail}: the second attribute depends on the first and is asked before it. Put the first one above it."
    - generic [ref=e24]:
      - button "Discard" [ref=e25] [cursor=pointer]
      - button "Confirm import" [ref=e26] [cursor=pointer]
    - button "Close" [ref=e27] [cursor=pointer]:
      - img [ref=e28]
      - generic [ref=e31]: Close
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-26T14:26:48.577Z | 7.0 min |
| email | 2026-11-26T14:24:36.175Z | 0.3 min |
| webkit | 2026-11-26T14:24:55.324Z | 10.4 min |
| shard 1 | 2026-11-26T14:24:54.841Z | 5.7 min |
| shard 2 | 2026-11-26T14:27:19.165Z | 12.3 min |
| shard 3 | 2026-11-26T14:25:19.849Z | 9.0 min |
| shard 4 | 2026-11-26T14:24:40.196Z | 11.4 min |
| shard 5 | 2026-11-26T14:25:01.808Z | 22.1 min |
| shard 6 | 2026-11-26T14:24:43.192Z | 15.4 min |
| shard 7 | 2026-11-26T14:25:34.814Z | 11.7 min |
| shard 8 | 2026-11-26T14:24:41.663Z | 13.9 min |
| shard 9 | 2026-11-26T14:25:31.812Z | 11.7 min |
| shard 10 | 2026-11-26T14:24:53.404Z | 24.3 min |
| shard 11 | 2026-11-26T14:24:36.566Z | 5.8 min |
| shard 12 | 2026-11-26T14:24:53.864Z | 6.4 min |
| shard 13 | 2026-11-26T14:24:59.811Z | 12.2 min |
| shard 14 | 2026-11-26T14:24:41.782Z | 20.2 min |
| shard 15 | 2026-11-26T14:24:56.382Z | 15.7 min |
| shard 16 | 2026-11-26T14:26:36.174Z | 14.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.8 min | webkit, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 22.0 min | shard 15 |
| `admin-screening.spec.ts` | 64 | 20.8 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 20.6 min | shard 5 |
| `admin-translations-console.spec.ts` | 46 | 19.0 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.6 min | shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 17.4 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 16.0 min | shard 13 |
| `admin-locations.spec.ts` | 44 | 15.1 min | shard 6 |
| `admin-attributes-editor.spec.ts` | 36 | 15.1 min | shard 14 |
| `admin-monetisation.spec.ts` | 34 | 13.7 min | smoke, shard 10 |
| `import-security.spec.ts` | 36 | 11.4 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 11.0 min | shard 9 |
| `shell.spec.ts` | 234 | 9.3 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.2 min | shard 7 |
| `legal-doors.spec.ts` | 34 | 8.8 min | smoke, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 8.5 min | shard 5 |
| `admin-translations-governance.spec.ts` | 20 | 7.3 min | smoke, shard 14 |
| `admin-countries.spec.ts` | 18 | 7.2 min | shard 7 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.2 min | shard 3 |
| `auth-signout.spec.ts` | 44 | 6.0 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 4.8 min | shard 12 |
| `dialogs.spec.ts` | 36 | 4.8 min | webkit, shard 4 |
| `admin-guides.spec.ts` | 14 | 4.7 min | shard 3 |
| `photo-pipeline.spec.ts` | 74 | 4.7 min | webkit, shard 16 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.4 min | shard 16 |
| `admin-translations-data.spec.ts` | 10 | 4.1 min | shard 8 |
| `choice-lists.spec.ts` | 96 | 4.0 min | shard 7 |
| `ad-page.spec.ts` | 104 | 3.9 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `post-wizard-category.spec.ts` | 54 | 3.8 min | webkit, shard 3 |
| `admin-screening-reject.spec.ts` | 10 | 3.7 min | shard 4 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 10 |
| `mfa-stepup.spec.ts` | 28 | 3.4 min | webkit, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 2 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `name-check-queue.spec.ts` | 8 | 1.9 min | smoke, shard 9 |
| `admin-services.spec.ts` | 10 | 1.8 min | shard 15 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 13 |
| `sage-tiers.spec.ts` | 52 | 1.7 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.5 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 13 |
| `admin-shell.spec.ts` | 12 | 1.5 min | shard 12 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 6 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 3 |
| `house-style.spec.ts` | 18 | 1.1 min | shard 7 |
| `staff-gate.spec.ts` | 4 | 1.1 min | shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.0 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 4 |
| `my-listings-doors.spec.ts` | 28 | 1.0 min | shard 1 |
| `my-listings-page.spec.ts` | 24 | 0.8 min | webkit, shard 10 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 11 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 7 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 14 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 14 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 11 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 7 |
| `settings.spec.ts` | 16 | 0.5 min | shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 16 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 2 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 9 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 8 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 4 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 13 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 12 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 2 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 11 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 16 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 1 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `overlays.spec.ts` | 8 | 0.2 min | shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 7 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 11 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 14 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 8 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 10 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 13 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 2 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 4 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 10 |
| `offline.spec.ts` | 2 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 1 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 16 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5 |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 3 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 15 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 7 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 8 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-safety.spec.ts` › AT-77 an import whose end state asks a child first is refused whole at the commit | mobile-360 | 74.0 s |
| `admin-attributes-safety.spec.ts` › AT-77 an import whose end state asks a child first is refused whole at the commit | desktop-1280 | 74.0 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 59.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 59.5 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.2 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 58.4 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 57.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 55.0 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 54.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 49.5 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 46.7 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 46.5 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 46.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45838095211-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45838095211-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45838095211-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45838095211-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45838095211-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45838095211-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45838095211-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 45838095211-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45838095211-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45838095211-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45838095211-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 3, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45838095211-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45838095211-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 45838095211-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45838095211-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45838095211-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45838095211-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45838095211-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45838095211-local-16
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 (Conflict)
[client-error] HTTP 409 POST /api/admin/attributes/import ({"error":"admin.attributes.error.parentAfterChild","detail":"e2e-cat-local-5-0-pgjdek: e2e_par_cbmzuw → e2e_chi_ek8z0i"})
[client-error] console.error: Failed to load resource: the server responded with a status of 409 (Conflict)
[client-error] HTTP 409 POST /api/admin/attributes/import ({"error":"admin.attributes.error.parentAfterChild","detail":"e2e-cat-local-5-2-y07sff: e2e_par_ggi4x1 → e2e_chi_aa7rpr"})
[client-error] console.error: Failed to load resource: the server responded with a status of 409 (Conflict)
[client-error] HTTP 409 POST /api/admin/attributes/import ({"error":"admin.attributes.error.parentAfterChild","detail":"e2e-cat-local-5-4-keo4s1: e2e_par_wo3hba → e2e_chi_hikqqh"})
[client-error] console.error: Failed to load resource: the server responded with a status of 409 (Conflict)
[client-error] HTTP 409 POST /api/admin/attributes/import ({"error":"admin.attributes.error.parentAfterChild","detail":"e2e-cat-local-5-5-wnnd3o: e2e_par_0t2fob → e2e_chi_1rdx8a"})
```
