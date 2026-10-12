# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38223982726
- Commit: `2fb73b85aa49a17ce379290e2d0cf14e3dd7f629`
- Attempt: 1
- Written (UTC): 2026-10-12T09:02:49.198Z
- Passed: 1609 · Skipped: 124 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 6 | shard 3, shard 4, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kpy<n>m: e<n>e_par_ddbl<n>v → e<n>e_chi_ajtihy` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-sk<n>hfy: e<n>e_par_aw<n>ud<n> → e<n>e_chi_g<n>ramj` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kpy<n>m: e<n>e_par_ddbl<n>v → e<n>e_chi_ajtihy ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-sk<n>hfy: e<n>e_par_aw<n>ud<n> → e<n>e_chi_g<n>ramj ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 4, shard 8

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
| smoke | 2026-10-12T08:31:56.802Z | 19.0 min |
| email | 2026-10-12T08:32:02.564Z | 0.3 min |
| shard 1 | 2026-10-12T08:31:48.074Z | 22.6 min |
| shard 2 | 2026-10-12T08:31:59.278Z | 25.7 min |
| shard 3 | 2026-10-12T08:31:56.464Z | 28.0 min |
| shard 4 | 2026-10-12T08:31:55.126Z | 27.6 min |
| shard 5 | 2026-10-12T08:32:03.907Z | 27.7 min |
| shard 6 | 2026-10-12T08:31:46.056Z | 19.6 min |
| shard 7 | 2026-10-12T08:31:50.019Z | 24.8 min |
| shard 8 | 2026-10-12T08:31:55.002Z | 30.5 min |
| changed | 2026-10-12T08:31:57.792Z | 5.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 30.1 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 23.2 min | shard 3, shard 7 |
| `admin-listings.spec.ts` | 54 | 23.2 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.4 min | smoke, shard 4, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 16.1 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.9 min | shard 1, shard 5 |
| `post-wizard-category.spec.ts` | 46 | 15.0 min | shard 3, shard 7 |
| `admin-roles.spec.ts` | 52 | 14.7 min | shard 2, shard 6, changed |
| `admin-screening.spec.ts` | 30 | 14.5 min | shard 2, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.9 min | shard 4, shard 8 |
| `feed-screens.spec.ts` | 28 | 13.2 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 12.7 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 12.7 min | shard 1, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 12.5 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 10.7 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.6 min | smoke, shard 2, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 9.9 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.9 min | shard 4, shard 8 |
| `admin-locations.spec.ts` | 38 | 9.4 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 9.4 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.7 min | shard 4, shard 8 |
| `admin-translations-console.spec.ts` | 42 | 7.9 min | shard 2, shard 6 |
| `admin-users.spec.ts` | 26 | 7.9 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 7.4 min | shard 4, shard 8 |
| `photo-pipeline.spec.ts` | 20 | 7.1 min | shard 3, shard 7 |
| `import-security.spec.ts` | 34 | 7.1 min | shard 3, shard 7 |
| `admin-attributes-editor.spec.ts` | 34 | 7.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 6.1 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 5.8 min | shard 1, shard 5 |
| `admin-audit.spec.ts` | 12 | 4.5 min | shard 1, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.3 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.2 min | shard 4, shard 8 |
| `feed-route.spec.ts` | 16 | 4.0 min | shard 2, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 3.5 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 3.1 min | shard 4, shard 8 |
| `admin-translations-data.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `admin-shell.spec.ts` | 10 | 3.0 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 3.0 min | shard 3, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.6 min | shard 3, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.1 min | shard 1, shard 5 |
| `settings.spec.ts` | 8 | 1.6 min | shard 4, changed |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.4 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `auth-reset.spec.ts` | 12 | 0.8 min | shard 2, changed |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 8 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 4, shard 8 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `viewing-place.spec.ts` › VP-11 with nothing saved here or on the account, the guess shows and nothing is saved | desktop-1280 | 97.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 66.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 63.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 58.0 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 54.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 54.4 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 53.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 52.7 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 50.5 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 48.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 47.8 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 47.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 47.1 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 47.1 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 46.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38223982726-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38223982726-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38223982726-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 38223982726-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38223982726-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38223982726-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38223982726-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 5, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 38223982726-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38223982726-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING failed to delete b62f214f-6399-4b03-a30c-59a5011db865: {} — deferred to the nightly sweep
[e2e:teardown] WARNING failed to delete 65cdf5a0-7e8b-461c-a450-2abda161d69c: {} — deferred to the nightly sweep
[e2e:teardown] WARNING failed to delete 2f49bc65-2d81-403b-ba57-e5e61a2598dd: {} — deferred to the nightly sweep
[e2e:teardown] deleted 1 user(s) owned by process 38223982726-8, 3 deferred to the nightly sweep
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38223982726-changed
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: the CSV export was page-scoped: 2252 stable+own rows against a 2251-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2251
Received: 2252
--- further error 1 ---
Error: the CSV export was page-scoped: 2252 stable+own rows against a 2251-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2251
Received: 2252

  791 |         exportedRows,
  792 |         `the CSV export was page-scoped: ${exportedRows} stable+own rows against a ${expectedRows}-row expectation`,
> 793 |       ).toBe(expectedRows);
      |         ^
  794 |       expect(ownLines.length, `TR-29 exported ${ownLines.length} lines for ${key}`).toBe(1);
  795 |
  796 |       // The operator's edit, expressed as the file they would send back.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:793:9
```

Context:

```text
          - listitem [ref=e982]:
            - generic [ref=e983]: About
          - listitem [ref=e984]:
            - generic [ref=e985]: How it works
      - navigation "Help" [ref=e986]:
        - heading "Help" [level=2] [ref=e987]
        - list [ref=e988]:
          - listitem [ref=e989]:
            - generic [ref=e990]: Safety
          - listitem [ref=e991]:
            - generic [ref=e992]: Contact
      - navigation "Legal" [ref=e993]:
        - heading "Legal" [level=2] [ref=e994]
        - list [ref=e995]:
          - listitem [ref=e996]:
            - generic [ref=e997]: Terms
          - listitem [ref=e998]:
            - generic [ref=e999]: Privacy
    - paragraph [ref=e1001]: © 2026 ethio.com — All rights reserved.
```
```

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-11 with nothing saved here or on the account, the guess shows and nothing is saved

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-11-with-nothing-saved-here-or-on-the-account-the-guess-shows-and-nothing-is-saved-desktop-1280`

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).
