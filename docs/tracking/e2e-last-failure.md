# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37137801437
- Commit: `92e1690e5821ee9b6ffb6c65ee5a9ad2a0f033b2`
- Attempt: 1
- Written (UTC): 2026-10-03T17:03:31.347Z
- Passed: 806 · Skipped: 70 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: shard 1, shard 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e824]:
            - generic [ref=e825]: About
          - listitem [ref=e826]:
            - generic [ref=e827]: How it works
      - navigation "Help" [ref=e828]:
        - heading "Help" [level=2] [ref=e829]
        - list [ref=e830]:
          - listitem [ref=e831]:
            - generic [ref=e832]: Safety
          - listitem [ref=e833]:
            - generic [ref=e834]: Contact
      - navigation "Legal" [ref=e835]:
        - heading "Legal" [level=2] [ref=e836]
        - list [ref=e837]:
          - listitem [ref=e838]:
            - generic [ref=e839]: Terms
          - listitem [ref=e840]:
            - generic [ref=e841]: Privacy
    - paragraph [ref=e843]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

104 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

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
| `listing not found` | 4 | shard 3, shard 6 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 3, shard 4, shard 5, shard 6, changed · unavailable: shard 1, shard 2

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-03T16:43:32.080Z | 14.3 min |
| email | 2026-10-03T16:43:32.919Z | 0.2 min |
| shard 3 | 2026-10-03T16:43:34.893Z | 15.9 min |
| shard 4 | 2026-10-03T16:43:37.813Z | 19.6 min |
| shard 5 | 2026-10-03T16:43:25.477Z | 15.7 min |
| shard 6 | 2026-10-03T16:43:35.036Z | 13.5 min |
| changed | 2026-10-03T16:43:29.545Z | 11.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 17.1 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 62 | 16.4 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 54 | 15.9 min | shard 5, changed |
| `post-wizard-where.spec.ts` | 28 | 8.8 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 33 | 7.7 min | shard 5, changed |
| `post-wizard-pricing.spec.ts` | 32 | 7.1 min | shard 3, shard 5 |
| `auth-signout.spec.ts` | 33 | 6.6 min | smoke, shard 5 |
| `posting-routes.spec.ts` | 38 | 6.3 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 20 | 5.5 min | shard 4 |
| `admin-categories-lifecycle.spec.ts` | 20 | 4.3 min | shard 4 |
| `admin-attributes-editor.spec.ts` | 17 | 4.3 min | shard 4 |
| `post-wizard-category.spec.ts` | 20 | 4.2 min | shard 5 |
| `admin-categories-console.spec.ts` | 16 | 4.2 min | shard 4 |
| `admin-attributes-links.spec.ts` | 11 | 3.3 min | shard 4 |
| `admin-attributes-import.spec.ts` | 16 | 3.0 min | shard 4 |
| `import-security.spec.ts` | 17 | 2.9 min | shard 5 |
| `admin-locations.spec.ts` | 17 | 2.9 min | shard 4 |
| `admin-users.spec.ts` | 11 | 2.9 min | shard 5 |
| `photo-pipeline.spec.ts` | 10 | 2.5 min | shard 5 |
| `admin-translations-console.spec.ts` | 18 | 2.3 min | shard 4 |
| `admin-roles.spec.ts` | 12 | 2.2 min | shard 4 |
| `admin-audit.spec.ts` | 5 | 1.5 min | shard 4 |
| `admin-countries.spec.ts` | 8 | 1.4 min | shard 4 |
| `admin-translations-governance.spec.ts` | 4 | 1.2 min | shard 5 |
| `admin-translations-data.spec.ts` | 4 | 1.2 min | shard 5 |
| `mfa-stepup.spec.ts` | 9 | 1.1 min | shard 5 |
| `post-wizard-finder.spec.ts` | 4 | 1.0 min | shard 5 |
| `admin-coverage.spec.ts` | 7 | 0.7 min | shard 4 |
| `post-wizard-details.spec.ts` | 2 | 0.7 min | shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 5 |
| `admin-shell.spec.ts` | 5 | 0.5 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-image-routes.spec.ts` | 5 | 0.5 min | shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 1 | 0.4 min | shard 4 |
| `i18n-bundle.spec.ts` | 2 | 0.3 min | shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `i18n-coverage.spec.ts` | 4 | 0.3 min | shard 5 |
| `category-nav.spec.ts` | 5 | 0.2 min | shard 5 |
| `layout.spec.ts` | 5 | 0.2 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `geo.spec.ts` | 5 | 0.0 min | shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place | desktop-1280 | 50.6 s |
| `post-wizard-where.spec.ts` › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place | mobile-360 | 47.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 40.2 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 38.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 35.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 34.3 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 33.2 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 32.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 32.7 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 32.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 31.5 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | desktop-1280 | 31.4 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | desktop-1280 | 31.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37137801437-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37137801437-email
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37137801437-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37137801437-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37137801437-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37137801437-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37137801437-changed
```

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-83: a lone city offered Remove

expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-where-remove')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - PW-83: a lone city offered Remove with timeout 10000ms
  - waiting for getByTestId('post-where-remove')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-83-the-ad-s-places-new-heading-the-single-city-box-ticked-the-ticked-node-is-the-item-place-mobile-360`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-83: a lone city offered Remove

expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-where-remove')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - PW-83: a lone city offered Remove with timeout 10000ms
  - waiting for getByTestId('post-where-remove')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-83-the-ad-s-places-new-heading-the-single-city-box-ticked-the-ticked-node-is-the-item-place-desktop-1280`

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
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
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓  162 [mobile-360] › e2e/admin-translations-console.spec.ts:261:3 › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts (7.3s)
  ✓  161 [mobile-360] › e2e/admin-shell.spec.ts:278:3 › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one (15.8s)
[e2e:l4c] get_my_translator_languages for pooled f2f0128b-8914-4c52-be0d-653045f34cd5: []
  ✓  163 [mobile-360] › e2e/admin-translations-console.spec.ts:285:3 › U4b translations console › TR-7b sync after a step-up prompt still reports its counts @private-identity (11.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37137801437-1-3059-3-cskaei@ethio-e2e.invalid)
  ✓  164 [mobile-360] › e2e/admin-translations-console.spec.ts:316:3 › U4b translations console › TR-8 save then approve moves a string through the status machine (13.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37137801437-1-3059-3-cskaei@ethio-e2e.invalid)
  ✓  165 [mobile-360] › e2e/admin-translations-console.spec.ts:339:3 › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge (3.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37137801437-1-3059-3-cskaei@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  162 [mobile-360] › e2e/post-wizard-place.spec.ts:1250:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (11.6s)
  ✓  163 [mobile-360] › e2e/post-wizard-place.spec.ts:1283:3 › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line (13.6s)
  ✓  164 [mobile-360] › e2e/post-wizard-place.spec.ts:1317:3 › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point (17.3s)
  ✓  165 [mobile-360] › e2e/post-wizard-place.spec.ts:1354:3 › POSTING WIZARD › PW-40 removing the pin clears all four columns (13.4s)
  ✓  166 [mobile-360] › e2e/post-wizard-place.spec.ts:1378:3 › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling (15.9s)
  ✓  167 [mobile-360] › e2e/post-wizard-place.spec.ts:1416:3 › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) (17.8s)
  ✓  168 [mobile-360] › e2e/post-wizard-place.spec.ts:1600:3 › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336) (9.6s)
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
```

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
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
```
