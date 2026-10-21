# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39576858991 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39576858991
- Commit: `5ef9101a22b815c7661aa7bfcc609e7a6477c232`
- Attempt: 1
- Written (UTC): 2026-10-21T09:40:41.392Z
- Post-test warnings: 42
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row — Error: expect(received).not.toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 11` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range — Error: PW-153: the review did not show the range

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "pending"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "pending"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  314 |         const outcome = async (first: string, second: string) => {
  315 |           let result = "pending" as "inverted" | "notARoot" | "pending";
> 316 |           await expect
      |           ^
  317 |             .poll(
  318 |               async () => {
  319 |                 if (await inverted(first, second)) result = "inverted";
    at outcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:316:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:330:14
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"code":"P0001","details":null,"hint":null,"message":"notARoot"})
```

Context:

```text
          - generic [ref=e57]: 13. Pets & Animals
          - button "Move up" [ref=e58] [cursor=pointer]: ↑
          - button "Move down" [ref=e59] [cursor=pointer]: ↓
        - listitem [ref=e60]:
          - generic [ref=e61]: 14. Babies & Kids
          - button "Move up" [ref=e62] [cursor=pointer]: ↑
          - button "Move down" [ref=e63] [cursor=pointer]: ↓
        - listitem [ref=e64]:
          - generic [ref=e65]: 15. Commercial Equipment
          - button "Move up" [ref=e66] [cursor=pointer]: ↑
          - button "Move down" [disabled]: ↓
      - alert [ref=e67]: That could not be saved.
      - paragraph [ref=e68]: "Reason: [object Object]"
      - generic [ref=e69]:
        - button "Reset order" [ref=e70] [cursor=pointer]
        - button "Save order" [ref=e71] [cursor=pointer]
    - button "Close" [ref=e72] [cursor=pointer]:
      - img [ref=e73]
      - generic [ref=e76]: Close
```
```

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: PW-153: the review did not show the range

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792575258849_14pmfy_mah"]')
Expected: "4,056–4,288 mAh"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-153: the review did not show the range with timeout 20000ms
  - waiting for getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792575258849_14pmfy_mah"]')

--- further error 1 ---
Error: PW-153: the review did not show the range

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792575258849_14pmfy_mah"]')
Expected: "4,056–4,288 mAh"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-153: the review did not show the range with timeout 20000ms
  - waiting for getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792575258849_14pmfy_mah"]')


  1950 |       page.getByTestId("post-review-preview").locator(`[data-key="${battery}"]`),
  1951 |       "PW-153: the review did not show the range",
> 1952 |     ).toHaveText("4,056–4,288 mAh", { timeout: 20_000 });
       |       ^
  1953 |     await page.getByTestId("post-preview-open").click();
  1954 |     await expect(
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--26bb2--buyer-sheet-show-the-range-desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (14 of 14 results files read, 14 of 14 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

111 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 15 | shard 3, shard 7, shard 9 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 7 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 7, shard 8 |
| `listing not found` | 3 | shard 5, shard 6, shard 11 |
| `categories file too large` (quiet) | 2 | shard 3, shard 9 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 9 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 8 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 9 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 9 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 9 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 9 |
| `locations file too large` (quiet) | 2 | shard 3, shard 9 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 9 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 5, shard 11 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 9 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 9 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 9 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-bs<n>y<n>d: e<n>e_par_<n>bgqg → e<n>e_chi_r<n>hcgc` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-wa<n>l<n>: e<n>e_par_yuykrv → e<n>e_chi_aerpha` (quiet) | 1 | shard 7 |

Quiet (allowlisted): too many previews ×15 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-bs<n>y<n>d: e<n>e_par_<n>bgqg → e<n>e_chi_r<n>hcgc ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-wa<n>l<n>: e<n>e_par_yuykrv → e<n>e_chi_aerpha ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 5, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2 · PW-145 an over-limit options read says so under its control, and a second open l ×1 · PW-6 the AI assist fills the title and description from the entered details, and ×1

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-21T09:28:22.648Z | 11.9 min |
| email | 2026-10-21T09:28:01.320Z | 0.2 min |
| shard 1 | 2026-10-21T09:28:33.409Z | 10.0 min |
| shard 2 | 2026-10-21T09:29:10.682Z | 9.7 min |
| shard 3 | 2026-10-21T09:28:45.628Z | 4.7 min |
| shard 4 | 2026-10-21T09:28:05.246Z | 5.4 min |
| shard 5 | 2026-10-21T09:28:20.425Z | 7.0 min |
| shard 6 | 2026-10-21T09:28:12.727Z | 5.5 min |
| shard 7 | 2026-10-21T09:28:00.926Z | 7.4 min |
| shard 8 | 2026-10-21T09:28:14.297Z | 8.8 min |
| shard 9 | 2026-10-21T09:28:21.140Z | 6.4 min |
| shard 10 | 2026-10-21T09:28:25.037Z | 7.3 min |
| shard 11 | 2026-10-21T09:28:48.565Z | 8.9 min |
| shard 12 | 2026-10-21T09:28:09.066Z | 4.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.2 min | smoke, shard 6, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 6.5 min | shard 5, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.4 min | shard 4, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.8 min | shard 1, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 5.3 min | shard 5, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.9 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 3, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 8 |
| `auth-signout.spec.ts` | 56 | 4.5 min | smoke, shard 3, shard 9 |
| `admin-screening.spec.ts` | 52 | 4.4 min | shard 2, shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.4 min | shard 1, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 4.4 min | shard 5, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 1, shard 7 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 8 |
| `post-wizard-pricing.spec.ts` | 52 | 4.2 min | shard 5, shard 11 |
| `photo-pipeline.spec.ts` | 66 | 4.2 min | shard 4, shard 10 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 2, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 6, shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 1, shard 8 |
| `admin-attributes-editor.spec.ts` | 36 | 3.7 min | shard 1, shard 7 |
| `admin-listings.spec.ts` | 62 | 3.7 min | shard 2, shard 8 |
| `my-listings-ad.spec.ts` | 36 | 3.6 min | shard 4, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 3.5 min | shard 5, shard 11 |
| `ad-page.spec.ts` | 68 | 3.0 min | shard 1, shard 7 |
| `post-wizard-category.spec.ts` | 48 | 3.0 min | shard 4, shard 10 |
| `admin-countries.spec.ts` | 18 | 2.9 min | shard 2, shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 1, shard 7 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 6, shard 11 |
| `import-security.spec.ts` | 36 | 2.5 min | shard 3, shard 9 |
| `legal-certify.spec.ts` | 40 | 2.0 min | shard 3, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 2, shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 1, shard 7 |
| `legal-admin.spec.ts` | 30 | 1.8 min | shard 3, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 1, shard 8 |
| `admin-translations-data.spec.ts` | 8 | 1.7 min | shard 2, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.6 min | shard 4, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 4, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2, shard 8 |
| `admin-coverage.spec.ts` | 16 | 0.9 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 4, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 5, shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 5, shard 11 |
| `legal-doors.spec.ts` | 32 | 0.8 min | shard 4, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.7 min | shard 5, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.7 min | shard 5, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 4, shard 10 |
| `posting-routes-dials.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 1, shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `legal-accept.spec.ts` | 8 | 0.5 min | shard 3, shard 9 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 6, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 3, shard 9 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 9 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 4, shard 10 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 8 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 3, shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 3, shard 9 |
| `settings.spec.ts` | 4 | 0.3 min | shard 6 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 5, shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 5, shard 11 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 9 |
| `auth-signup.spec.ts` | 4 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-countries.spec.ts` › CO-6 rail order: two roots are stored in position order, and the reset removes every row | mobile-360 | 41.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 38.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 30.9 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 30.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 29.9 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 26.3 s |
