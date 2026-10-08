# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37850621757 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37850621757
- Commit: `2d5c4d8514f484eb30bc0075f9618dbcdc2ef40a`
- Attempt: 1
- Written (UTC): 2026-10-08T22:27:13.575Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1407 |       const mark = calls.length;
  1408 |       await page.getByTestId("post-next").click();
> 1409 |       await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                     ^
  1410 |       expect(calls.length - mark, `PW-144: pass ${pass} with nothing changed called identity`).toBe(
  1411 |         0,
  1412 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1409:53
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

103 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 3 | shard 3, shard 6 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-k<n>oem<n>: e<n>e_par_e<n>pyg → e<n>e_chi_qdo<n>p` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-phm<n>: e<n>e_par_i<n>s<n>ja → e<n>e_chi_muzwil` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-k<n>oem<n>: e<n>e_par_e<n>pyg → e<n>e_chi_qdo<n>p ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-phm<n>: e<n>e_par_i<n>s<n>ja → e<n>e_chi_muzwil ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-08T22:01:30.019Z | 16.1 min |
| email | 2026-10-08T22:01:38.541Z | 0.4 min |
| shard 1 | 2026-10-08T22:01:29.410Z | 22.8 min |
| shard 2 | 2026-10-08T22:01:19.140Z | 19.1 min |
| shard 3 | 2026-10-08T22:01:26.897Z | 22.5 min |
| shard 4 | 2026-10-08T22:01:43.125Z | 25.1 min |
| shard 5 | 2026-10-08T22:01:25.255Z | 24.1 min |
| shard 6 | 2026-10-08T22:01:28.840Z | 17.2 min |
| changed | 2026-10-08T22:01:19.833Z | 6.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 29.5 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 24.1 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 15.3 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 11.0 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 10.9 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.8 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 10.5 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 40 | 10.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 10.2 min | shard 3, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.9 min | smoke, shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 9.6 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.0 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.7 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.5 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 36 | 6.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.9 min | shard 1, shard 5 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.3 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.1 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 4.8 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.8 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 2.8 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 4 | 1.3 min | shard 3, shard 5, changed |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 6 | 1.1 min | smoke, shard 4, shard 6, changed |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-144 leaving the contact step makes one identity call, or none when nothing changed | mobile-360 | 51.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 47.8 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 47.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 46.0 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 45.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 44.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 44.8 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 43.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 38.6 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 37.9 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 37.9 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 37.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.9 s |
| `post-wizard-specs.spec.ts` › PW-6 the AI assist fills the title and description from the entered details, and both stay editable | desktop-1280 | 35.7 s |
