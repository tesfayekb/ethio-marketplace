# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37274430784
- Commit: `48d3c53bbfa8a729647e5b0b4e68af66c0bf6435`
- Attempt: 1
- Written (UTC): 2026-10-05T09:28:26.657Z
- Passed: 1080 · Skipped: 49 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

227 line(s), 36 message(s): 2 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 128 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 128 · Sources: full

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

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
| nightly | 2026-10-05T06:52:15.162Z | 3.6 min |
| full | 2026-10-05T06:55:53.680Z | 152.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 12.0 min | full |
| `post-wizard-bundle2.spec.ts` | 60 | 9.3 min | full |
| `post-wizard-place.spec.ts` | 38 | 7.9 min | full |
| `admin-attributes-library.spec.ts` | 40 | 7.2 min | full |
| `post-wizard-pricing.spec.ts` | 44 | 7.2 min | full |
| `shell.spec.ts` | 126 | 7.1 min | full |
| `admin-translations-governance.spec.ts` | 20 | 6.9 min | full |
| `post-wizard-category.spec.ts` | 42 | 6.4 min | full |
| `admin-locations.spec.ts` | 36 | 5.5 min | full |
| `admin-categories-lifecycle.spec.ts` | 42 | 5.4 min | full |
| `admin-categories-console.spec.ts` | 32 | 5.4 min | full |
| `admin-translations-console.spec.ts` | 40 | 5.4 min | full |
| `post-wizard-where.spec.ts` | 28 | 5.3 min | full |
| `posting-routes.spec.ts` | 50 | 5.2 min | full |
| `admin-attributes-links.spec.ts` | 30 | 5.1 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 5.0 min | full |
| `admin-users.spec.ts` | 24 | 4.8 min | full |
| `admin-roles.spec.ts` | 24 | 4.5 min | full |
| `import-security.spec.ts` | 34 | 4.2 min | full |
| `post-wizard-resets.spec.ts` | 20 | 4.0 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `photo-pipeline.spec.ts` | 20 | 3.4 min | full |
| `admin-attributes-import.spec.ts` | 34 | 3.0 min | full |
| `auth-signout.spec.ts` | 22 | 2.8 min | full |
| `admin-countries.spec.ts` | 16 | 2.3 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | full |
| `admin-audit.spec.ts` | 10 | 2.0 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | full |
| `admin-shell.spec.ts` | 10 | 1.3 min | full |
| `admin-coverage.spec.ts` | 14 | 1.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-details.spec.ts` | 4 | 0.6 min | full |
| `category-image-routes.spec.ts` | 10 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 4 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 220.1 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 206.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 31.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 31.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 28.3 s |
| `admin-categories-images.spec.ts` › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state | desktop-1280 | 28.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 28.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 27.0 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 26.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 26.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 26.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 26.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 24.6 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37274430784-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 69 (pool 3, fresh 66)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 96 user(s) owned by process 37274430784-nightly
```

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-mobile-360`

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/alias HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations/ET HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```
