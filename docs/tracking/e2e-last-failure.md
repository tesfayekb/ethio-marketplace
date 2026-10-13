# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38407106478
- Commit: `5753740e45030a26f726cc833f80c5a274711e53`
- Attempt: 1
- Written (UTC): 2026-10-13T14:16:44.128Z
- Passed: 1643 · Skipped: 127 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kyxjqr: e<n>e_par_h<n>a<n>gw → e<n>e_chi_<n>h<n>c<n>s` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ptb<n>cm: e<n>e_par_rqb<n>a<n> → e<n>e_chi_ejrw<n>e` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kyxjqr: e<n>e_par_h<n>a<n>gw → e<n>e_chi_<n>h<n>c<n>s ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ptb<n>cm: e<n>e_par_rqb<n>a<n> → e<n>e_chi_ejrw<n>e ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): language toggle renders Amharic (Ge'ez path) ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-28 transition_listing counts against the revise dial ×1 · PR-42 the door reads a padded answer as the value it stores ×1 · primitives render their loading state ×1

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
| smoke | 2026-10-13T13:45:22.672Z | 16.2 min |
| email | 2026-10-13T13:45:15.369Z | 0.3 min |
| shard 1 | 2026-10-13T13:45:13.107Z | 29.5 min |
| shard 2 | 2026-10-13T13:45:34.527Z | 30.8 min |
| shard 3 | 2026-10-13T13:45:10.413Z | 26.7 min |
| shard 4 | 2026-10-13T13:45:22.518Z | 31.0 min |
| shard 5 | 2026-10-13T13:45:15.572Z | 30.4 min |
| shard 6 | 2026-10-13T13:45:07.890Z | 20.7 min |
| changed | 2026-10-13T13:45:18.545Z | 7.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-category.spec.ts` | 96 | 25.9 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 21.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.3 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.8 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 14.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 14.1 min | shard 3, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.0 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 10.2 min | smoke, shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.1 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 9.8 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 9.6 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 26 | 9.3 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 9.0 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 8.6 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 8.2 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.3 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 34 | 6.9 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 6.9 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.6 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 5.8 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.6 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 5.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.6 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 2.1 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 14 | 1.9 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-users.spec.ts` › AU-12 edit: a reserved name needs a reason of ten characters | desktop-1280 | 76.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 52.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 50.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 48.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 45.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 44.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 43.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 40.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 39.0 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 38.7 s |
| `admin-users.spec.ts` › AU-12 edit: a reserved name needs a reason of ten characters | mobile-360 | 38.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 38.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.9 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | desktop-1280 | 37.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 37.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38407106478-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38407106478-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38407106478-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38407106478-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38407106478-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38407106478-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38407106478-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38407106478-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 38407106478-changed
```

## admin-users.spec.ts › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "This name needs a reason before it can be set."
Received: "That seller alias is already taken."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is already taken.</p>
       - unexpected value "That seller alias is already taken."

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "This name needs a reason before it can be set."
Received: "That seller alias is already taken."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is already taken.</p>
       - unexpected value "That seller alias is already taken."


  473 |       await page.getByTestId("edit-save").click();
  474 |       await stepUpIfPrompted(page, secret);
> 475 |       await expect(page.getByTestId("edit-error")).toHaveText(
      |                                                    ^
  476 |         en["admin.users.edit.errorAliasReason"],
  477 |         { timeout: 15000 },
```

Context:

```text
          - listitem [ref=e293]:
            - generic [ref=e294]: About
          - listitem [ref=e295]:
            - generic [ref=e296]: How it works
      - navigation "Help" [ref=e297]:
        - heading "Help" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Safety
          - listitem [ref=e302]:
            - generic [ref=e303]: Contact
      - navigation "Legal" [ref=e304]:
        - heading "Legal" [level=2] [ref=e305]
        - list [ref=e306]:
          - listitem [ref=e307]:
            - generic [ref=e308]: Terms
          - listitem [ref=e309]:
            - generic [ref=e310]: Privacy
    - paragraph [ref=e312]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 5

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

## Client errors: shard 5

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:34085:25) at http://127.0.0.1:4173/assets/index-D1UBfzgg.js:34117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
[client-error] HTTP 409 POST /rest/v1/rpc/admin_update_profile ({"code":"23505","details":null,"hint":null,"message":"seller alias already taken"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:34085:25) at http://127.0.0.1:4173/assets/index-D1UBfzgg.js:34117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
[client-error] HTTP 409 POST /rest/v1/rpc/admin_update_profile ({"code":"23505","details":null,"hint":null,"message":"seller alias already taken"})
```
