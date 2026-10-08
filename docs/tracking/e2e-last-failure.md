# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37696163167 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37696163167
- Commit: `858b21372d3667f97ca89227a27341a1785830ab`
- Attempt: 2
- Written (UTC): 2026-10-08T00:08:48.578Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · auth-reset.spec.ts › R-4: the reset request is throttled after one submit — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-library.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### auth-reset.spec.ts › R-4: the reset request is throttled after one submit

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /Resend in/i })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: /Resend in/i })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /Resend in/i })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: /Resend in/i })


  141 |   const cooldownPrefix = en["auth.resendCooldown"].split("{s}")[0]!.trim();
  142 |   const cooling = page.getByRole("button", { name: new RegExp(cooldownPrefix, "i") });
> 143 |   await expect(cooling).toBeVisible();
      |                         ^
  144 |   await expect(cooling).toBeDisabled();
  145 | });
  146 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-reset.spec.ts:143:25
```

Context:

```text
          - listitem [ref=e66]:
            - generic [ref=e67]: About
          - listitem [ref=e68]:
            - generic [ref=e69]: How it works
      - navigation "Help" [ref=e70]:
        - heading "Help" [level=2] [ref=e71]
        - list [ref=e72]:
          - listitem [ref=e73]:
            - generic [ref=e74]: Safety
          - listitem [ref=e75]:
            - generic [ref=e76]: Contact
      - navigation "Legal" [ref=e77]:
        - heading "Legal" [level=2] [ref=e78]
        - list [ref=e79]:
          - listitem [ref=e80]:
            - generic [ref=e81]: Terms
          - listitem [ref=e82]:
            - generic [ref=e83]: Privacy
    - paragraph [ref=e85]: © 2026 ethio.com — All rights reserved.
```
```

### admin-attributes-library.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-2-e1irnw')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-2-e1irnw')

[dialog-dump findRow(e2e-cat-4-2-e1irnw)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-2-e1irnw) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-2-e1irnw')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-2-e1irnw')

[dialog-dump findRow(e2e-cat-4-2-e1irnw)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-2-e1irnw) after create] open dialogs: none

   at helpers/categories.ts:336

  334 |     await findRow(page, slug);
  335 |   } catch (error) {
> 336 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e229]:
            - generic [ref=e230]: About
          - listitem [ref=e231]:
            - generic [ref=e232]: How it works
      - navigation "Help" [ref=e233]:
        - heading "Help" [level=2] [ref=e234]
        - list [ref=e235]:
          - listitem [ref=e236]:
            - generic [ref=e237]: Safety
          - listitem [ref=e238]:
            - generic [ref=e239]: Contact
      - navigation "Legal" [ref=e240]:
        - heading "Legal" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Terms
          - listitem [ref=e245]:
            - generic [ref=e246]: Privacy
    - paragraph [ref=e248]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 2, shard 3, shard 5, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ijs<n>y: e<n>e_par_<n>odz<n>x → e<n>e_chi_nsidyc` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qtejer: e<n>e_par_<n>v<n> → e<n>e_chi_dn<n>spp` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ijs<n>y: e<n>e_par_<n>odz<n>x → e<n>e_chi_nsidyc ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qtejer: e<n>e_par_<n>v<n> → e<n>e_chi_dn<n>spp ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 2, shard 3, shard 5, shard 6

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
| smoke | 2026-10-07T22:27:23.548Z | 13.0 min |
| email | 2026-10-08T00:08:17.063Z | 0.2 min |
| shard 1 | 2026-10-07T22:28:39.514Z | 23.1 min |
| shard 2 | 2026-10-07T22:27:34.268Z | 23.2 min |
| shard 3 | 2026-10-07T22:27:25.507Z | 16.4 min |
| shard 4 | 2026-10-07T22:27:32.756Z | 24.2 min |
| shard 5 | 2026-10-07T22:27:24.077Z | 19.9 min |
| shard 6 | 2026-10-07T22:27:41.337Z | 20.8 min |
| changed | 2026-10-07T22:27:25.156Z | 2.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 20.9 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 16.3 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 15.2 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.5 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 11.2 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 48 | 10.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 10.4 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 10.2 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.1 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 36 | 10.0 min | shard 3, shard 6, changed |
| `post-wizard-where.spec.ts` | 30 | 8.9 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.2 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 8.1 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 7.6 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 7.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 7.2 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 6.2 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.2 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.5 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.1 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.8 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.3 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `auth-reset.spec.ts` | 6 | 0.7 min | shard 2 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.5 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-callback.spec.ts` | 8 | 0.3 min | shard 2, changed |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-library.spec.ts` › AT-3 link manager: an attribute is linked to a scratch category and unlinked | desktop-1280 | 60.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 40.7 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 40.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 39.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 38.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 38.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 38.0 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 38.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 37.9 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 37.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.2 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 36.5 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 35.5 s |
