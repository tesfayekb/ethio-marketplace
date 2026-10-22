# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39717831520 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39717831520
- Commit: `a413f9522d12ff20bd803a26db42e58620db1354`
- Attempt: 1
- Written (UTC): 2026-10-22T03:54:42.556Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 15` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range — Error: PW-153: the review did not show the range (stored model: e2e_settle_1792640522876_cxl1vk_m2)

## Flaky bodies (DEC-078)

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: PW-153: the review did not show the range (stored model: e2e_settle_1792640522876_cxl1vk_m2)

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792640522876_cxl1vk_mah"]')
Expected: "4,056–4,288 mAh"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-153: the review did not show the range (stored model: e2e_settle_1792640522876_cxl1vk_m2) with timeout 20000ms
  - waiting for getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792640522876_cxl1vk_mah"]')

--- further error 1 ---
Error: PW-153: the review did not show the range (stored model: e2e_settle_1792640522876_cxl1vk_m2)

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792640522876_cxl1vk_mah"]')
Expected: "4,056–4,288 mAh"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-153: the review did not show the range (stored model: e2e_settle_1792640522876_cxl1vk_m2) with timeout 20000ms
  - waiting for getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792640522876_cxl1vk_mah"]')


  1951 |       page.getByTestId("post-review-preview").locator(`[data-key="${battery}"]`),
  1952 |       `PW-153: the review did not show the range (stored model: ${storedModel})`,
> 1953 |     ).toHaveText("4,056–4,288 mAh", { timeout: 20_000 });
       |       ^
  1954 |     await page.getByTestId("post-preview-open").click();
  1955 |     await expect(
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--26bb2--buyer-sheet-show-the-range-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

123 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 24 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 6 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 11 |
| `listing not found` | 5 | shard 7, shard 14, shard 15 |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 9 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 2, shard 9, shard 10 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 2, shard 10 |
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
| `new row for relation <q> violates check constraint <q>` | 2 | shard 6, shard 14 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-exydpj: e<n>e_par_j<n>egl → e<n>e_chi_zcu<n>k<n>` (quiet) | 1 | shard 10 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-p<n>kunc: e<n>e_par_xg<n>aot → e<n>e_chi_v<n>woqz` (quiet) | 1 | shard 2 |

Quiet (allowlisted): too many previews ×24 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×6 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-exydpj: e<n>e_par_j<n>egl → e<n>e_chi_zcu<n>k<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-p<n>kunc: e<n>e_par_xg<n>aot → e<n>e_chi_v<n>woqz ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 7, shard 14, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-188 a list that hangs under another answer offers its shared Other last under ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 6, shard 14
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-22T03:40:01.199Z | 12.0 min |
| email | 2026-10-22T03:39:32.021Z | 0.2 min |
| shard 1 | 2026-10-22T03:39:18.373Z | 8.3 min |
| shard 2 | 2026-10-22T03:40:08.538Z | 13.0 min |
| shard 3 | 2026-10-22T03:39:21.533Z | 11.2 min |
| shard 4 | 2026-10-22T03:39:57.687Z | 6.1 min |
| shard 5 | 2026-10-22T03:39:31.748Z | 5.7 min |
| shard 6 | 2026-10-22T03:39:34.580Z | 8.3 min |
| shard 7 | 2026-10-22T03:41:10.545Z | 6.6 min |
| shard 8 | 2026-10-22T03:39:49.630Z | 7.1 min |
| shard 9 | 2026-10-22T03:39:51.052Z | 8.1 min |
| shard 10 | 2026-10-22T03:40:56.631Z | 13.2 min |
| shard 11 | 2026-10-22T03:40:06.189Z | 12.3 min |
| shard 12 | 2026-10-22T03:39:56.893Z | 6.5 min |
| shard 13 | 2026-10-22T03:40:06.157Z | 7.5 min |
| shard 14 | 2026-10-22T03:41:23.554Z | 6.7 min |
| shard 15 | 2026-10-22T03:40:05.858Z | 7.4 min |
| shard 16 | 2026-10-22T03:40:09.405Z | 6.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.3 min | smoke, shard 8, shard 16 |
| `post-wizard-specs.spec.ts` | 82 | 5.4 min | shard 7, shard 15 |
| `admin-attributes-library.spec.ts` | 42 | 5.0 min | shard 1, shard 9 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 2, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.4 min | shard 6, shard 13 |
| `admin-translations-console.spec.ts` | 44 | 4.3 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.1 min | shard 3, shard 11 |
| `auth-signout.spec.ts` | 56 | 4.1 min | smoke, shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-screening.spec.ts` | 52 | 3.9 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7, shard 15 |
| `post-wizard-place.spec.ts` | 38 | 3.7 min | shard 6, shard 14 |
| `admin-users.spec.ts` | 28 | 3.5 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 3.5 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.1 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 2.8 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 6, shard 14 |
| `photo-pipeline.spec.ts` | 66 | 2.8 min | shard 5, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 2, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.2 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 68 | 2.2 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 2.2 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 1, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 40 | 1.6 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 40 | 1.5 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.3 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `admin-shell.spec.ts` | 12 | 0.8 min | shard 3, shard 11 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-doors.spec.ts` | 34 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.3 min | shard 5, shard 13 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 4, shard 12 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 1, shard 9 |
| `legal-pages.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `auth-signup.spec.ts` | 4 | 0.1 min | email |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 36.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.3 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 27.7 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 27.5 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 25.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 24.5 s |
