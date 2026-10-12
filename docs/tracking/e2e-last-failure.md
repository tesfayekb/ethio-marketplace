# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38198364284 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38198364284
- Commit: `4913e366eb07a904b3eb6b9e9b7cd9e265b52e12`
- Attempt: 1
- Written (UTC): 2026-10-12T03:37:45.207Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves — Error: expect(received).toBeLessThan(expected)

## Flaky bodies (DEC-078)

### admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-fucuj2-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-fucuj2-card')

[dialog-dump findRow(e2e-cat-1-1-fucuj2)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-1-fucuj2) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-fucuj2-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-fucuj2-card')

[dialog-dump findRow(e2e-cat-1-1-fucuj2)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-1-fucuj2) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e267]:
            - generic [ref=e268]: About
          - listitem [ref=e269]:
            - generic [ref=e270]: How it works
      - navigation "Help" [ref=e271]:
        - heading "Help" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Safety
          - listitem [ref=e276]:
            - generic [ref=e277]: Contact
      - navigation "Legal" [ref=e278]:
        - heading "Legal" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Terms
          - listitem [ref=e283]:
            - generic [ref=e284]: Privacy
    - paragraph [ref=e286]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   5355
--- further error 1 ---
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   5355

  1929 |     ).toBe(false);
  1930 |     // SECONDARY (clock): unchanged budget.
> 1931 |     expect(elapsed).toBeLessThan(5000);
       |                     ^
  1932 |   });
  1933 | });
  1934 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1931:21
```

Context:

```text
          - listitem [ref=e324]:
            - generic [ref=e325]: About
          - listitem [ref=e326]:
            - generic [ref=e327]: How it works
      - navigation "Help" [ref=e328]:
        - heading "Help" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Safety
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Terms
          - listitem [ref=e340]:
            - generic [ref=e341]: Privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 7 | shard 3, shard 4, shard 7, shard 8 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>vq<n>fe: e<n>e_par_ym<n>alw → e<n>e_chi_cqnaby` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dqtuuo: e<n>e_par_s<n>r<n>j → e<n>e_chi_okip<n>t` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>vq<n>fe: e<n>e_par_ym<n>alw → e<n>e_chi_cqnaby ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dqtuuo: e<n>e_par_s<n>r<n>j → e<n>e_chi_okip<n>t ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T03:06:26.966Z | 18.5 min |
| email | 2026-10-12T03:06:20.101Z | 0.1 min |
| shard 1 | 2026-10-12T03:06:25.845Z | 24.5 min |
| shard 2 | 2026-10-12T03:06:24.706Z | 24.0 min |
| shard 3 | 2026-10-12T03:06:29.672Z | 28.7 min |
| shard 4 | 2026-10-12T03:06:33.465Z | 30.9 min |
| shard 5 | 2026-10-12T03:06:29.063Z | 28.4 min |
| shard 6 | 2026-10-12T03:06:29.963Z | 19.0 min |
| shard 7 | 2026-10-12T03:06:17.377Z | 25.3 min |
| shard 8 | 2026-10-12T03:06:28.790Z | 26.4 min |
| changed | 2026-10-12T03:06:28.819Z | 7.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 30.8 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 23.7 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 20.6 min | smoke, shard 4, shard 8 |
| `admin-listings.spec.ts` | 50 | 20.2 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 84 | 16.9 min | shard 2, shard 6, changed |
| `post-wizard-resets.spec.ts` | 34 | 16.8 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.7 min | shard 1, shard 5 |
| `post-wizard-category.spec.ts` | 46 | 15.3 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 14.4 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 14.0 min | shard 3, shard 7 |
| `admin-screening.spec.ts` | 30 | 13.9 min | shard 2, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.8 min | shard 4, shard 8 |
| `post-wizard-pricing.spec.ts` | 50 | 12.4 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 12.2 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 11.9 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 11.1 min | shard 1, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 10.7 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.3 min | smoke, shard 2, shard 6 |
| `posting-routes.spec.ts` | 50 | 9.8 min | shard 4, shard 8 |
| `admin-locations.spec.ts` | 38 | 8.9 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 8.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 8.0 min | shard 4, shard 8 |
| `photo-pipeline.spec.ts` | 20 | 7.8 min | shard 3, shard 7 |
| `admin-users.spec.ts` | 26 | 7.8 min | shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 7.7 min | shard 3, shard 7 |
| `admin-roles.spec.ts` | 26 | 6.6 min | shard 2, shard 6 |
| `feed-index.spec.ts` | 28 | 6.6 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.4 min | shard 1, shard 5 |
| `admin-translations-governance.spec.ts` | 16 | 6.1 min | shard 2, shard 6, changed |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 5.2 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 4.3 min | shard 2, shard 6 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 3.7 min | shard 4, shard 8 |
| `admin-categories-home.spec.ts` | 8 | 3.5 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.0 min | shard 3, shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 2.9 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 3, shard 7 |
| `admin-shell.spec.ts` | 10 | 2.8 min | shard 2, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.5 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.2 min | shard 1, shard 5 |
| `i18n-coverage.spec.ts` | 16 | 2.1 min | shard 3, shard 7, changed |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 8 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 4, shard 8 |
| `settings.spec.ts` | 4 | 0.6 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 67.3 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 64.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 61.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 59.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 56.6 s |
| `admin-listings.spec.ts` › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only | mobile-360 | 55.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 55.5 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 53.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 52.8 s |
| `feed-screens.spec.ts` › FS-10 nothing anywhere: the invitation card comes first, with the category and the place | mobile-360 | 52.7 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 49.5 s |
| `feed-screens.spec.ts` › FS-11 signing out keeps the place this browser chose (INC-532) | mobile-360 | 49.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 48.3 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 48.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 48.2 s |
