# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36825601323
- Commit: `5278b8da9af3a7421b05f96f9942f54c73a312ff`
- Attempt: 1
- Written (UTC): 2026-10-01T08:05:07.846Z
- Passed: 925 · Skipped: 48 · Failed: 3
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

102 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `new row for relation <q> violates check constraint <q>` (quiet) | 3 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `listing not found` | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · new row for relation <q> violates check constraint <q> ×3 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1

Off the allowlist:

### listing not found

- Count: 2 · Sources: full

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-01T06:37:18.435Z | 0.6 min |
| full | 2026-10-01T06:37:55.287Z | 87.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 126 | 6.2 min | full |
| `admin-attributes-library.spec.ts` | 40 | 5.6 min | full |
| `post-wizard-specs.spec.ts` | 52 | 4.5 min | full |
| `post-wizard-place.spec.ts` | 34 | 4.2 min | full |
| `admin-translations-console.spec.ts` | 38 | 4.2 min | full |
| `admin-translations-governance.spec.ts` | 20 | 4.2 min | full |
| `admin-locations.spec.ts` | 34 | 4.0 min | full |
| `admin-categories-console.spec.ts` | 32 | 3.8 min | full |
| `admin-roles.spec.ts` | 24 | 3.8 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 3.4 min | full |
| `admin-categories-lifecycle.spec.ts` | 38 | 3.3 min | full |
| `post-wizard-category.spec.ts` | 40 | 3.0 min | full |
| `admin-attributes-links.spec.ts` | 22 | 3.0 min | full |
| `post-wizard-where.spec.ts` | 22 | 2.9 min | full |
| `admin-users.spec.ts` | 22 | 2.7 min | full |
| `admin-categories-images.spec.ts` | 4 | 2.6 min | full |
| `import-security.spec.ts` | 34 | 2.4 min | full |
| `post-wizard-pricing.spec.ts` | 26 | 2.2 min | full |
| `admin-countries.spec.ts` | 16 | 1.9 min | full |
| `post-wizard-resets.spec.ts` | 18 | 1.9 min | full |
| `auth-signout.spec.ts` | 22 | 1.8 min | full |
| `admin-translations-data.spec.ts` | 8 | 1.7 min | full |
| `admin-attributes-import.spec.ts` | 32 | 1.5 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | full |
| `photo-pipeline.spec.ts` | 20 | 1.3 min | full |
| `admin-audit.spec.ts` | 10 | 1.2 min | full |
| `posting-routes.spec.ts` | 36 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `admin-coverage.spec.ts` | 14 | 0.7 min | full |
| `admin-shell.spec.ts` | 10 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.5 min | nightly |
| `post-wizard-finder.spec.ts` | 6 | 0.5 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.3 min | full |
| `post-wizard-details.spec.ts` | 4 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `category-nav.spec.ts` | 10 | 0.2 min | full |
| `settings.spec.ts` | 4 | 0.2 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | full |
| `rbac.spec.ts` | 6 | 0.1 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `category-image-routes.spec.ts` | 10 | 0.1 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-images.spec.ts` › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state | desktop-1280 | 120.4 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 83.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.0 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.6 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 31.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.8 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 25.1 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 24.8 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 21.1 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 20.6 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | desktop-1280 | 20.4 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | desktop-1280 | 20.4 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 36825601323-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 521 user(s) owned by process 36825601323-nightly
```

## auth-resend-exhaustion.spec.ts › A-3: three resends exhaust the per-visit limit

- Source: `nightly`
- Project: `nightly-mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Check your email' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Check your email' })

```

Context: context file not found for `auth-resend-exhaustion-A-3-three-resends-exhaust-the-per-visit-limit-nightly-mobile-360`

## admin-categories-images.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e230]:
            - generic [ref=e231]: About
          - listitem [ref=e232]:
            - generic [ref=e233]: How it works
      - navigation "Help" [ref=e234]:
        - heading "Help" [level=2] [ref=e235]
        - list [ref=e236]:
          - listitem [ref=e237]:
            - generic [ref=e238]: Safety
          - listitem [ref=e239]:
            - generic [ref=e240]: Contact
      - navigation "Legal" [ref=e241]:
        - heading "Legal" [level=2] [ref=e242]
        - list [ref=e243]:
          - listitem [ref=e244]:
            - generic [ref=e245]: Terms
          - listitem [ref=e246]:
            - generic [ref=e247]: Privacy
    - paragraph [ref=e249]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-6')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-6')

```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-desktop-1280`

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_bp_check" ×2
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
