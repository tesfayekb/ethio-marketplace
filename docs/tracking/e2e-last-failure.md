# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38537394409 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38537394409
- Commit: `2f73df1b1f731c5380296e02672ffc0bb4e4b8c4`
- Attempt: 1
- Written (UTC): 2026-10-14T09:41:05.390Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-0-hic8cn')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-0-hic8cn')

[dialog-dump findRow(e2e-cat-4-0-hic8cn)] open dialogs: none
[roster-dump e2e-cat-4-0-hic8cn] page: reading=0 roster=159 shown=0 · db: row active=true pointers=1 · since create: 21.5 s
[dialog-dump createViaUi(e2e-cat-4-0-hic8cn) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-0-hic8cn')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-0-hic8cn')

[dialog-dump findRow(e2e-cat-4-0-hic8cn)] open dialogs: none
[roster-dump e2e-cat-4-0-hic8cn] page: reading=0 roster=159 shown=0 · db: row active=true pointers=1 · since create: 21.5 s
[dialog-dump createViaUi(e2e-cat-4-0-hic8cn) after create] open dialogs: none

   at helpers/categories.ts:401

  399 |     await findRow(page, slug, createdAt);
  400 |   } catch (error) {
> 401 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
```

Context:

```text
          - listitem [ref=e305]:
            - generic [ref=e306]: About
          - listitem [ref=e307]:
            - generic [ref=e308]: How it works
      - navigation "Help" [ref=e309]:
        - heading "Help" [level=2] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - generic [ref=e313]: Safety
          - listitem [ref=e314]:
            - generic [ref=e315]: Contact
      - navigation "Legal" [ref=e316]:
        - heading "Legal" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Terms
          - listitem [ref=e321]:
            - generic [ref=e322]: Privacy
    - paragraph [ref=e324]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-se<n>i<n>q: e<n>e_par_ow<n>k<n>c → e<n>e_chi_bwu<n>a<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yf<n>mdb: e<n>e_par_l<n>ymug → e<n>e_chi_kmq<n>nb` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-se<n>i<n>q: e<n>e_par_ow<n>k<n>c → e<n>e_chi_bwu<n>a<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yf<n>mdb: e<n>e_par_l<n>ymug → e<n>e_chi_kmq<n>nb ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · every rail row carries a leading icon on one gutter ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-145 an over-limit options read says so under its control, and a second open l ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1

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
| smoke | 2026-10-14T09:03:59.690Z | 15.8 min |
| email | 2026-10-14T09:04:01.077Z | 0.2 min |
| shard 1 | 2026-10-14T09:04:01.428Z | 33.0 min |
| shard 2 | 2026-10-14T09:04:08.465Z | 31.1 min |
| shard 3 | 2026-10-14T09:03:59.393Z | 28.8 min |
| shard 4 | 2026-10-14T09:04:21.261Z | 36.4 min |
| shard 5 | 2026-10-14T09:04:06.496Z | 31.9 min |
| shard 6 | 2026-10-14T09:04:02.626Z | 29.1 min |
| changed | 2026-10-14T09:04:07.891Z | 33.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 112 | 45.9 min | shard 1, shard 4, changed |
| `photo-pipeline.spec.ts` | 116 | 41.8 min | shard 2, shard 5, changed |
| `admin-screening.spec.ts` | 88 | 25.8 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 80 | 24.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 20.9 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.0 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 16.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 11.4 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.4 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.2 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 10.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 9.9 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 9.7 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.4 min | smoke, shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 8.8 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 7.9 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.5 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 7.0 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 6.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.8 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 5.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.5 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 4.0 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.9 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 16 | 1.2 min | shard 1, shard 4, changed |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 70.3 s |
| `admin-attributes-links.spec.ts` › AT-59 the link editor's Save reflects change, saved and error | desktop-1280 | 65.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 63.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 59.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 57.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 57.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 54.2 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 53.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 53.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 45.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 43.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 43.0 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 41.2 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | desktop-1280 | 41.1 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 40.5 s |
