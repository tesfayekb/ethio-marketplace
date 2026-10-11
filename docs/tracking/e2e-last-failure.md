# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38177021983
- Commit: `98b0841bc7c938f243cbf40ecf273d5818f1bd0f`
- Attempt: 1
- Written (UTC): 2026-10-11T22:07:30.970Z
- Passed: 1657 · Skipped: 124 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

105 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 5 | shard 4, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fh<n>lf<n>: e<n>e_par_<n>r<n>c<n> → e<n>e_chi_blr<n>hg` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gnepi<n>: e<n>e_par_hjwd<n> → e<n>e_chi_lkiiyv` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fh<n>lf<n>: e<n>e_par_<n>r<n>c<n> → e<n>e_chi_blr<n>hg ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gnepi<n>: e<n>e_par_hjwd<n> → e<n>e_chi_lkiiyv ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 4, shard 8

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
| smoke | 2026-10-11T21:37:16.199Z | 19.8 min |
| email | 2026-10-11T21:37:08.646Z | 0.2 min |
| shard 1 | 2026-10-11T21:37:03.726Z | 28.7 min |
| shard 2 | 2026-10-11T21:37:02.277Z | 22.2 min |
| shard 3 | 2026-10-11T21:37:02.166Z | 28.0 min |
| shard 4 | 2026-10-11T21:37:10.625Z | 30.0 min |
| shard 5 | 2026-10-11T21:37:03.697Z | 29.3 min |
| shard 6 | 2026-10-11T21:37:10.575Z | 23.2 min |
| shard 7 | 2026-10-11T21:37:11.665Z | 29.1 min |
| shard 8 | 2026-10-11T21:37:03.672Z | 29.0 min |
| changed | 2026-10-11T21:37:01.962Z | 18.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 100 | 43.6 min | shard 1, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 32.6 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 27.0 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 20.9 min | smoke, shard 4, shard 8 |
| `admin-screening.spec.ts` | 30 | 17.6 min | shard 2, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 17.5 min | shard 3, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 17.3 min | shard 4, shard 8 |
| `admin-translations-console.spec.ts` | 84 | 16.7 min | shard 2, shard 6, changed |
| `post-wizard-where.spec.ts` | 32 | 15.5 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 48 | 14.8 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 14.0 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 13.7 min | shard 1, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 12.2 min | shard 3, shard 7 |
| `post-wizard-pricing.spec.ts` | 50 | 12.0 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 11.6 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 11.6 min | smoke, shard 2, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 10.5 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.2 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 9.6 min | shard 1, shard 5 |
| `admin-users.spec.ts` | 26 | 9.6 min | shard 2, shard 6 |
| `posting-routes.spec.ts` | 50 | 9.4 min | shard 4, shard 8 |
| `photo-pipeline.spec.ts` | 20 | 9.1 min | shard 3, shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 9.0 min | shard 4, shard 8 |
| `feed-index.spec.ts` | 28 | 8.9 min | shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 7.9 min | shard 3, shard 7 |
| `admin-attributes-editor.spec.ts` | 34 | 7.4 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.3 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.7 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 6.0 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 5.0 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.6 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 3.6 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 10 | 3.4 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 3.1 min | shard 3, shard 7 |
| `admin-translations-data.spec.ts` | 8 | 3.1 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.1 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.9 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.1 min | shard 1, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.8 min | shard 2, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 8 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 5 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.7 min | shard 2, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 4, shard 8 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 70.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 67.8 s |
| `admin-listings.spec.ts` › AL-23 Edit changes a specification: a refusal under its control, then the answer saved | desktop-1280 | 64.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 64.6 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | desktop-1280 | 63.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 62.0 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 60.9 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 60.1 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 56.5 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 55.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 53.9 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 53.2 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | desktop-1280 | 51.3 s |
| `feed-screens.spec.ts` › FS-9 four listings in the chosen place: no invitation | desktop-1280 | 50.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 48.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38177021983-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38177021983-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38177021983-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 38177021983-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38177021983-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38177021983-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38177021983-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 5, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 38177021983-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38177021983-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38177021983-8
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 38177021983-changed
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-23 Edit changes a specification: a refusal under its control, then the answer saved

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-notice')
Expected: "Saved. The seller is told what changed: Specifications."
Received: "Saved. The seller is told what changed: Specifications, Title."
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-notice')
    21 × locator resolved to <p role="status" aria-live="polite" data-testid="listing-notice" class="text-sm text-foreground">Saved. The seller is told what changed: Specifica…</p>
       - unexpected value "Saved. The seller is told what changed: Specifications, Title."

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-notice')
Expected: "Saved. The seller is told what changed: Specifications."
Received: "Saved. The seller is told what changed: Specifications, Title."
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-notice')
    21 × locator resolved to <p role="status" aria-live="polite" data-testid="listing-notice" class="text-sm text-foreground">Saved. The seller is told what changed: Specifica…</p>
       - unexpected value "Saved. The seller is told what changed: Specifications, Title."


  1626 |     await control(spec.text.attrKey).fill("second answer");
  1627 |     await form.getByTestId("listing-edit-save").click();
> 1628 |     await expect(page.getByTestId("listing-notice")).toHaveText(
       |                                                      ^
  1629 |       en["admin.listings.edit.done"].replace("{fields}", en["admin.listings.history.field.specs"]),
  1630 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e342]:
            - generic [ref=e343]: About
          - listitem [ref=e344]:
            - generic [ref=e345]: How it works
      - navigation "Help" [ref=e346]:
        - heading "Help" [level=2] [ref=e347]
        - list [ref=e348]:
          - listitem [ref=e349]:
            - generic [ref=e350]: Safety
          - listitem [ref=e351]:
            - generic [ref=e352]: Contact
      - navigation "Legal" [ref=e353]:
        - heading "Legal" [level=2] [ref=e354]
        - list [ref=e355]:
          - listitem [ref=e356]:
            - generic [ref=e357]: Terms
          - listitem [ref=e358]:
            - generic [ref=e359]: Privacy
    - paragraph [ref=e361]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-5-1-gnepi5: e2e_par_hjwd00 → e2e_chi_lkiiyv
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).
