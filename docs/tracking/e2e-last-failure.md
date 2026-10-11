# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38147645440
- Commit: `dfd6555a8dbd6011d3b55f1d7bccc7765a434745`
- Attempt: 1
- Written (UTC): 2026-10-11T15:06:09.396Z
- Passed: 1594 · Skipped: 124 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 2235 stable+own rows against a 2236-row expectation

## Flaky bodies (DEC-078)

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: the CSV export was page-scoped: 2235 stable+own rows against a 2236-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2236
Received: 2235
--- further error 1 ---
Error: the CSV export was page-scoped: 2235 stable+own rows against a 2236-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2236
Received: 2235

  784 |         exportedRows,
  785 |         `the CSV export was page-scoped: ${exportedRows} stable+own rows against a ${expectedRows}-row expectation`,
> 786 |       ).toBe(expectedRows);
      |         ^
  787 |       expect(ownLines.length, `TR-29 exported ${ownLines.length} lines for ${key}`).toBe(1);
  788 |
  789 |       // The operator's edit, expressed as the file they would send back.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:786:9
```

Context:

```text
          - listitem [ref=e802]:
            - generic [ref=e803]: About
          - listitem [ref=e804]:
            - generic [ref=e805]: How it works
      - navigation "Help" [ref=e806]:
        - heading "Help" [level=2] [ref=e807]
        - list [ref=e808]:
          - listitem [ref=e809]:
            - generic [ref=e810]: Safety
          - listitem [ref=e811]:
            - generic [ref=e812]: Contact
      - navigation "Legal" [ref=e813]:
        - heading "Legal" [level=2] [ref=e814]
        - list [ref=e815]:
          - listitem [ref=e816]:
            - generic [ref=e817]: Terms
          - listitem [ref=e818]:
            - generic [ref=e819]: Privacy
    - paragraph [ref=e821]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 6 | shard 4, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>cno<n>: e<n>e_par_<n>xgs<n>p → e<n>e_chi_zlhsyf` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vyyj<n>i: e<n>e_par_<n>d<n>b → e<n>e_chi_aytntt` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>cno<n>: e<n>e_par_<n>xgs<n>p → e<n>e_chi_zlhsyf ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vyyj<n>i: e<n>e_par_<n>d<n>b → e<n>e_chi_aytntt ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 4, shard 8

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
| smoke | 2026-10-11T14:36:32.079Z | 18.9 min |
| email | 2026-10-11T14:36:35.203Z | 0.2 min |
| shard 1 | 2026-10-11T14:36:36.891Z | 25.2 min |
| shard 2 | 2026-10-11T14:36:26.499Z | 24.7 min |
| shard 3 | 2026-10-11T14:36:41.412Z | 28.8 min |
| shard 4 | 2026-10-11T14:36:43.264Z | 29.2 min |
| shard 5 | 2026-10-11T14:36:28.246Z | 22.1 min |
| shard 6 | 2026-10-11T14:36:39.776Z | 26.6 min |
| shard 7 | 2026-10-11T14:36:25.548Z | 26.3 min |
| shard 8 | 2026-10-11T14:36:31.394Z | 28.7 min |
| changed | 2026-10-11T14:36:36.948Z | 15.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 84 | 57.7 min | shard 2, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 32.8 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 24.8 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 20.7 min | smoke, shard 4, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 17.6 min | shard 4, shard 8 |
| `admin-screening.spec.ts` | 30 | 16.5 min | shard 2, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 16.3 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 15.3 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 48 | 14.0 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 13.9 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 13.2 min | shard 1, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 12.7 min | shard 3, shard 7 |
| `post-wizard-pricing.spec.ts` | 50 | 12.6 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 10.8 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.6 min | smoke, shard 2, shard 6 |
| `posting-routes.spec.ts` | 50 | 10.3 min | shard 4, shard 8 |
| `admin-attributes-editor.spec.ts` | 34 | 10.1 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.1 min | shard 2, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 9.9 min | shard 1, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 9.6 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.8 min | shard 4, shard 8 |
| `photo-pipeline.spec.ts` | 20 | 8.2 min | shard 3, shard 7 |
| `admin-users.spec.ts` | 26 | 8.1 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 40 | 7.8 min | shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 7.3 min | shard 3, shard 7 |
| `admin-attributes-safety.spec.ts` | 14 | 6.6 min | shard 1, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.6 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 5.4 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 5.2 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 28 | 5.0 min | shard 2, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 4.3 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 3.6 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 3.2 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.2 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 3.1 min | shard 3, shard 7 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.9 min | shard 4, shard 8 |
| `admin-shell.spec.ts` | 10 | 2.8 min | shard 2, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 1.9 min | shard 1, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 4, shard 8 |
| `settings.spec.ts` | 4 | 0.6 min | shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.5 min | shard 3, shard 7 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 6 |
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
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | mobile-360 | 147.3 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | desktop-1280 | 146.5 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | desktop-1280 | 145.1 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | mobile-360 | 64.6 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 62.5 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 59.3 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | desktop-1280 | 59.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 58.6 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 58.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 58.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 57.8 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | mobile-360 | 57.5 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | desktop-1280 | 57.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 57.5 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | desktop-1280 | 56.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38147645440-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38147645440-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38147645440-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 19 (pool 7, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 38147645440-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38147645440-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38147645440-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38147645440-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 7, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 38147645440-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38147645440-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38147645440-8
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 8, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38147645440-changed
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "E2E admin listing x byccpaew"
Received: undefined

  418 |     expect(await noticeRows(target.id)).toEqual([]);
  419 |     expect(await revisionRows(target.id, "edit")).toEqual([]);
> 420 |     expect((await listingTruth(target.id))?.["title"]).toBe(target.title);
      |                                                        ^
  421 |   });
  422 |
  423 |   test("AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:420:56
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-3-Edit-refuses-the-person-who-may-not-edit-no-permission-a-reviewer-no-second-factor-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "E2E admin listing changed zxetzytw"
Received: undefined

  418 |     expect(await noticeRows(target.id)).toEqual([]);
  419 |     expect(await revisionRows(target.id, "edit")).toEqual([]);
> 420 |     expect((await listingTruth(target.id))?.["title"]).toBe(target.title);
      |                                                        ^
  421 |   });
  422 |
  423 |   test("AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:420:56
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-3-Edit-refuses-the-person-who-may-not-edit-no-permission-a-reviewer-no-second-factor-mobile-360`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "E2E admin listing changed yajffhej"
Received: undefined

  418 |     expect(await noticeRows(target.id)).toEqual([]);
  419 |     expect(await revisionRows(target.id, "edit")).toEqual([]);
> 420 |     expect((await listingTruth(target.id))?.["title"]).toBe(target.title);
      |                                                        ^
  421 |   });
  422 |
  423 |   test("AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:420:56
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-3-Edit-refuses-the-person-who-may-not-edit-no-permission-a-reviewer-no-second-factor-desktop-1280`

## Server errors: shard 6

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
