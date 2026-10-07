# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37558981676 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37558981676
- Commit: `7d0a6a001b9040515c82cd70adb71c5d176da367`
- Attempt: 1
- Written (UTC): 2026-10-07T02:15:52.365Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow

- Source: `shard 4`
- Project: `desktop-1280`

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

  88 |     // pagination total must name the number of market rows the service client
  89 |     // counts, and it is read BEFORE any needle narrows the roster.
> 90 |     await expect
     |     ^
  91 |       .poll(
  92 |         async () => {
  93 |           const text = await page.getByTestId("country-pagination").innerText();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:90:5
```

Context:

```text
          - listitem [ref=e819]:
            - generic [ref=e820]: About
          - listitem [ref=e821]:
            - generic [ref=e822]: How it works
      - navigation "Help" [ref=e823]:
        - heading "Help" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Safety
          - listitem [ref=e828]:
            - generic [ref=e829]: Contact
      - navigation "Legal" [ref=e830]:
        - heading "Legal" [level=2] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]:
            - generic [ref=e834]: Terms
          - listitem [ref=e835]:
            - generic [ref=e836]: Privacy
    - paragraph [ref=e838]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

105 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 2, shard 3, shard 6 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 2, shard 3, shard 6

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
| smoke | 2026-10-07T01:50:53.283Z | 15.6 min |
| email | 2026-10-07T01:50:57.129Z | 0.3 min |
| shard 1 | 2026-10-07T01:51:05.244Z | 24.5 min |
| shard 2 | 2026-10-07T01:50:54.122Z | 22.8 min |
| shard 3 | 2026-10-07T01:50:49.735Z | 19.0 min |
| shard 4 | 2026-10-07T01:50:55.339Z | 23.2 min |
| shard 5 | 2026-10-07T01:51:00.567Z | 22.8 min |
| shard 6 | 2026-10-07T01:50:53.910Z | 21.0 min |
| changed | 2026-10-07T01:50:46.396Z | 14.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 25.4 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 68 | 24.7 min | shard 3, shard 6, changed |
| `post-wizard-where.spec.ts` | 60 | 20.9 min | shard 3, shard 6, changed |
| `post-wizard-bundle2.spec.ts` | 60 | 18.6 min | shard 2, shard 5 |
| `shell.spec.ts` | 252 | 17.6 min | smoke, shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 12.6 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 11.4 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 40 | 11.0 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 10.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.0 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.9 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 9.3 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 8.2 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 24 | 8.1 min | shard 3, shard 6, changed |
| `import-security.spec.ts` | 34 | 6.8 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 6.8 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 6.2 min | shard 1, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 16 | 4.2 min | shard 2, shard 5, changed |
| `admin-countries.spec.ts` | 16 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.2 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 4 | 1.3 min | shard 3, shard 6, changed |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 2 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 61.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 53.1 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 49.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 44.2 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 43.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 42.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 42.3 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | desktop-1280 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 39.6 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 39.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 39.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 38.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 38.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | desktop-1280 | 38.3 s |
