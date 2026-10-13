# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38335668624 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38335668624
- Commit: `6c0c2be57d8e431f29db34393552acf00eb52ed0`
- Attempt: 1
- Written (UTC): 2026-10-13T02:42:27.432Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow, on the agreed toolbar — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow, on the agreed toolbar

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  94 |     // pagination total must name the number of market rows the service client
  95 |     // counts, and it is read BEFORE any needle narrows the roster.
> 96 |     await expect
     |     ^
  97 |       .poll(
  98 |         async () => {
  99 |           const text = await page.getByTestId("country-pagination-range").innerText();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:96:5
```

Context:

```text
          - listitem [ref=e1118]:
            - generic [ref=e1119]: About
          - listitem [ref=e1120]:
            - generic [ref=e1121]: How it works
      - navigation "Help" [ref=e1122]:
        - heading "Help" [level=2] [ref=e1123]
        - list [ref=e1124]:
          - listitem [ref=e1125]:
            - generic [ref=e1126]: Safety
          - listitem [ref=e1127]:
            - generic [ref=e1128]: Contact
      - navigation "Legal" [ref=e1129]:
        - heading "Legal" [level=2] [ref=e1130]
        - list [ref=e1131]:
          - listitem [ref=e1132]:
            - generic [ref=e1133]: Terms
          - listitem [ref=e1134]:
            - generic [ref=e1135]: Privacy
    - paragraph [ref=e1137]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('lang-row-zzq-2801tr31')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('lang-row-zzq-2801tr31')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('lang-row-zzq-2801tr31')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('lang-row-zzq-2801tr31')


  1169 |       // Seed-before-navigate (J7): the roster must SHOW the row before the
  1170 |       // delete flow's assertions mean anything.
> 1171 |       await expect(langRow(page, code)).toBeVisible({ timeout: 20000 });
       |                                         ^
  1172 |
  1173 |       // U4i-5 (1) — the roster renders the delete control ONCE PER TWIN via the
  1174 |       // primitive's single rowActions slot (same law as INC-106b), so a bare
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:1171:41
```

Context:

```text
          - listitem [ref=e896]:
            - generic [ref=e897]: About
          - listitem [ref=e898]:
            - generic [ref=e899]: How it works
      - navigation "Help" [ref=e900]:
        - heading "Help" [level=2] [ref=e901]
        - list [ref=e902]:
          - listitem [ref=e903]:
            - generic [ref=e904]: Safety
          - listitem [ref=e905]:
            - generic [ref=e906]: Contact
      - navigation "Legal" [ref=e907]:
        - heading "Legal" [level=2] [ref=e908]
        - list [ref=e909]:
          - listitem [ref=e910]:
            - generic [ref=e911]: Terms
          - listitem [ref=e912]:
            - generic [ref=e913]: Privacy
    - paragraph [ref=e915]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qz<n>ei: e<n>e_par_iau<n>v<n> → e<n>e_chi_ekat<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ykmasd: e<n>e_par_pj<n>eo<n> → e<n>e_chi_oioef<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qz<n>ei: e<n>e_par_iau<n>v<n> → e<n>e_chi_ekat<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ykmasd: e<n>e_par_pj<n>eo<n> → e<n>e_chi_oioef<n> ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-13T02:12:18.315Z | 14.7 min |
| email | 2026-10-13T02:12:12.309Z | 0.2 min |
| shard 1 | 2026-10-13T02:12:12.467Z | 26.9 min |
| shard 2 | 2026-10-13T02:12:21.037Z | 24.2 min |
| shard 3 | 2026-10-13T02:12:18.884Z | 26.7 min |
| shard 4 | 2026-10-13T02:12:18.273Z | 29.8 min |
| shard 5 | 2026-10-13T02:12:23.924Z | 28.8 min |
| shard 6 | 2026-10-13T02:12:29.470Z | 24.5 min |
| changed | 2026-10-13T02:12:18.413Z | 1.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 22.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.7 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.5 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 14.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 12.8 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 11.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 52 | 10.9 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 10.8 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 9.3 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.7 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 7.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 7.6 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.9 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.9 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 34 | 6.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 16 | 5.9 min | shard 2, shard 5, changed |
| `admin-translations-console.spec.ts` | 42 | 5.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 5.4 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 5.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.1 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 2.7 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.7 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 47.8 s |
| `admin-translations-governance.spec.ts` › TR-31 a scratch language deletes with a typed confirm and leaves no rows | desktop-1280 | 45.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 43.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 41.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 40.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 39.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 39.0 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 38.7 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 38.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 38.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 37.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 37.0 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 36.5 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | desktop-1280 | 36.2 s |
