# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38162307516 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38162307516
- Commit: `dfd6555a8dbd6011d3b55f1d7bccc7765a434745`
- Attempt: 1
- Written (UTC): 2026-10-11T20:42:59.117Z
- Post-test warnings: 6
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

175 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 76 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>nd<n>: e<n>e_par_a<n>x<n>n<n> → e<n>e_chi_m<n>ky<n>c` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-qvev<n>b: e<n>e_par_lt<n>p<n> → e<n>e_chi_h<n>geh` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>nd<n>: e<n>e_par_a<n>x<n>n<n> → e<n>e_chi_m<n>ky<n>c ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-qvev<n>b: e<n>e_par_lt<n>p<n> → e<n>e_chi_h<n>geh ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 76 · Sources: full

```text
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 2 · Sources: full

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-11T18:05:43.405Z | 3.5 min |
| full | 2026-10-11T18:09:15.308Z | 153.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 8.0 min | full |
| `post-wizard-bundle2.spec.ts` | 66 | 7.3 min | full |
| `shell.spec.ts` | 168 | 7.2 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.2 min | full |
| `post-wizard-place.spec.ts` | 38 | 6.1 min | full |
| `post-wizard-pricing.spec.ts` | 50 | 5.5 min | full |
| `post-wizard-where.spec.ts` | 32 | 5.5 min | full |
| `admin-locations.spec.ts` | 38 | 5.0 min | full |
| `admin-categories-lifecycle.spec.ts` | 48 | 5.0 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.0 min | full |
| `admin-translations-console.spec.ts` | 42 | 4.8 min | full |
| `post-wizard-category.spec.ts` | 46 | 4.7 min | full |
| `viewing-place.spec.ts` | 22 | 4.5 min | full |
| `admin-roles.spec.ts` | 26 | 4.4 min | full |
| `post-wizard-resets.spec.ts` | 34 | 4.4 min | full |
| `admin-listings.spec.ts` | 42 | 4.4 min | full |
| `admin-translations-governance.spec.ts` | 20 | 4.2 min | full |
| `admin-users.spec.ts` | 26 | 4.2 min | full |
| `admin-attributes-links.spec.ts` | 30 | 4.1 min | full |
| `feed-screens.spec.ts` | 28 | 3.9 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 3.7 min | full |
| `admin-screening.spec.ts` | 30 | 3.7 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `posting-routes.spec.ts` | 50 | 3.2 min | full |
| `admin-attributes-safety.spec.ts` | 14 | 2.9 min | full |
| `import-security.spec.ts` | 34 | 2.5 min | full |
| `admin-attributes-import.spec.ts` | 40 | 2.4 min | full |
| `admin-countries.spec.ts` | 18 | 2.2 min | full |
| `auth-signout.spec.ts` | 22 | 2.2 min | full |
| `photo-pipeline.spec.ts` | 20 | 2.1 min | full |
| `admin-categories-home.spec.ts` | 8 | 1.8 min | full |
| `admin-audit.spec.ts` | 12 | 1.8 min | full |
| `admin-translations-data.spec.ts` | 8 | 1.7 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 1.7 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | full |
| `feed-index.spec.ts` | 28 | 1.3 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.0 min | full |
| `admin-shell.spec.ts` | 10 | 0.9 min | full |
| `post-wizard-removed.spec.ts` | 4 | 0.9 min | full |
| `admin-coverage.spec.ts` | 14 | 0.9 min | full |
| `posting-routes-dials.spec.ts` | 14 | 0.8 min | full |
| `feed-route.spec.ts` | 16 | 0.8 min | full |
| `phone-frame.spec.ts` | 18 | 0.8 min | full |
| `post-wizard-details.spec.ts` | 8 | 0.7 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `category-image-routes.spec.ts` | 10 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.3 min | full |
| `settings.spec.ts` | 4 | 0.3 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.3 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.2 min | full |
| `category-nav.spec.ts` | 10 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.2 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 77.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 33.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 31.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 31.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 27.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 26.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 26.6 s |
