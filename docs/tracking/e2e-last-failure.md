# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37576776314
- Commit: `9a44e0836edf789f384eb25c10fb4f8f742c5113`
- Attempt: 1
- Written (UTC): 2026-10-07T05:58:01.399Z
- Passed: 1323 · Skipped: 77 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 39 message(s): 6 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 2, shard 4, shard 5, changed |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 2, shard 3, shard 6 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `undo_failed admin.categories.error.delete_has_children:<n>` | 4 | shard 1, shard 4 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jfmvg<n>: e<n>e_par_xw<n>gvs → e<n>e_chi_<n>kb<n>b<n>` | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>fwat: e<n>e_par_syinsz → e<n>e_chi_gjnp<n>o` | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-<n>g<n>arg: e<n>e_par_d<n>x<n>jt → e<n>e_chi_k<n>svef` | 1 | changed |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-j<n>cdld: e<n>e_par_qakm<n>v → e<n>e_chi_p<n>w` | 1 | changed |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 2, shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### undo_failed admin.categories.error.delete_has_children:<n>

- Count: 4 · Sources: shard 1, shard 4

```text
[WebServer] [ssr-error] /api/admin/categories/import undo_failed admin.categories.error.delete_has_children:1
```

### commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jfmvg<n>: e<n>e_par_xw<n>gvs → e<n>e_chi_<n>kb<n>b<n>

- Count: 1 · Sources: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-jfmvg1: e2e_par_xw9gvs → e2e_chi_7kb8b2
```

### commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>fwat: e<n>e_par_syinsz → e<n>e_chi_gjnp<n>o

- Count: 1 · Sources: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-r6fwat: e2e_par_syinsz → e2e_chi_gjnp6o
```

### commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-<n>g<n>arg: e<n>e_par_d<n>x<n>jt → e<n>e_chi_k<n>svef

- Count: 1 · Sources: changed

```text
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-changed-1-6g3arg: e2e_par_d5x6jt → e2e_chi_k3svef
```

### commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-j<n>cdld: e<n>e_par_qakm<n>v → e<n>e_chi_p<n>w

- Count: 1 · Sources: changed

```text
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-changed-3-j2cdld: e2e_par_qakm6v → e2e_chi_p2752w
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-07T05:33:22.490Z | 14.4 min |
| email | 2026-10-07T05:33:19.210Z | 0.2 min |
| shard 1 | 2026-10-07T05:33:40.672Z | 23.9 min |
| shard 2 | 2026-10-07T05:33:23.092Z | 22.3 min |
| shard 3 | 2026-10-07T05:33:27.228Z | 20.5 min |
| shard 4 | 2026-10-07T05:33:29.389Z | 22.5 min |
| shard 5 | 2026-10-07T05:33:15.384Z | 19.2 min |
| shard 6 | 2026-10-07T05:33:32.779Z | 19.3 min |
| changed | 2026-10-07T05:33:40.442Z | 6.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 24.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 17.4 min | smoke, shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 68 | 15.7 min | shard 1, shard 4, changed |
| `post-wizard-resets.spec.ts` | 34 | 14.0 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 14.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.7 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 10.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 10.5 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 40 | 10.3 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 30 | 10.0 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 50 | 9.7 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.1 min | smoke, shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 8.1 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 20 | 7.7 min | shard 1, shard 4, changed |
| `admin-attributes-import.spec.ts` | 40 | 7.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 7.2 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.3 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.8 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 5.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.2 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 16 | 5.1 min | shard 1, shard 4, changed |
| `admin-roles.spec.ts` | 24 | 4.8 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 12 | 3.8 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 3.2 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.0 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.1 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.6 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 2 | 0.5 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 46.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 44.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 43.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 39.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 38.8 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | mobile-360 | 37.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 37.8 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 37.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.2 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 37.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 36.9 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 36.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 35.6 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 34.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37576776314-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37576776314-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37576776314-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37576776314-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37576776314-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37576776314-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37576776314-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37576776314-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37576776314-changed
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"error":"server error","message":"admin.categories.error.delete_has_children:1"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
--- further error 1 ---
Error: {"error":"server error","message":"admin.categories.error.delete_has_children:1"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  1806 |
  1807 |       const undo = await importPost(page, token, { mode: "undo", batchId });
> 1808 |       expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
       |                                                         ^
  1809 |       expect(await readCategory(grandchildSlug), "CT-26 undo left the grandchild").toBeNull();
  1810 |       expect(await readCategory(childSlug), "CT-26 undo left the child").toBeNull();
  1811 |       expect(await readCategory(rootSlug), "CT-26 undo left the root").toBeNull();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1808:57
```

Context:

```text
          - listitem [ref=e780]:
            - generic [ref=e781]: About
          - listitem [ref=e782]:
            - generic [ref=e783]: How it works
      - navigation "Help" [ref=e784]:
        - heading "Help" [level=2] [ref=e785]
        - list [ref=e786]:
          - listitem [ref=e787]:
            - generic [ref=e788]: Safety
          - listitem [ref=e789]:
            - generic [ref=e790]: Contact
      - navigation "Legal" [ref=e791]:
        - heading "Legal" [level=2] [ref=e792]
        - list [ref=e793]:
          - listitem [ref=e794]:
            - generic [ref=e795]: Terms
          - listitem [ref=e796]:
            - generic [ref=e797]: Privacy
    - paragraph [ref=e799]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: {"error":"server error","message":"admin.categories.error.delete_has_children:1"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
--- further error 1 ---
Error: {"error":"server error","message":"admin.categories.error.delete_has_children:1"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  1806 |
  1807 |       const undo = await importPost(page, token, { mode: "undo", batchId });
> 1808 |       expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
       |                                                         ^
  1809 |       expect(await readCategory(grandchildSlug), "CT-26 undo left the grandchild").toBeNull();
  1810 |       expect(await readCategory(childSlug), "CT-26 undo left the child").toBeNull();
  1811 |       expect(await readCategory(rootSlug), "CT-26 undo left the root").toBeNull();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1808:57
```

Context:

```text
          - listitem [ref=e1184]:
            - generic [ref=e1185]: About
          - listitem [ref=e1186]:
            - generic [ref=e1187]: How it works
      - navigation "Help" [ref=e1188]:
        - heading "Help" [level=2] [ref=e1189]
        - list [ref=e1190]:
          - listitem [ref=e1191]:
            - generic [ref=e1192]: Safety
          - listitem [ref=e1193]:
            - generic [ref=e1194]: Contact
      - navigation "Legal" [ref=e1195]:
        - heading "Legal" [level=2] [ref=e1196]
        - list [ref=e1197]:
          - listitem [ref=e1198]:
            - generic [ref=e1199]: Terms
          - listitem [ref=e1200]:
            - generic [ref=e1201]: Privacy
    - paragraph [ref=e1203]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-jfmvg1: e2e_par_xw9gvs → e2e_chi_7kb8b2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import undo_failed admin.categories.error.delete_has_children:1 ×2
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-r6fwat: e2e_par_syinsz → e2e_chi_gjnp6o
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import undo_failed admin.categories.error.delete_has_children:1 ×2
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
