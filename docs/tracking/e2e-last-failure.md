# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38528698170
- Commit: `d902d7356088b9aee706db000904a6d691b1eeec`
- Attempt: 2
- Written (UTC): 2026-10-14T08:25:02.106Z
- Passed: 1788 · Skipped: 127 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>v<n>: e<n>e_par_<n>gcn<n> → e<n>e_chi_yhkzna` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-mi<n>rm: e<n>e_par_<n>eqbr → e<n>e_chi_g<n>lyb` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>v<n>: e<n>e_par_<n>gcn<n> → e<n>e_chi_yhkzna ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-mi<n>rm: e<n>e_par_<n>eqbr → e<n>e_chi_g<n>lyb ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×2 · admin tables never overflow horizontally ×1 · every rail row carries a leading icon on one gutter ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-42 the door reads a padded answer as the value it stores ×1

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
| smoke | 2026-10-14T07:48:15.441Z | 17.5 min |
| email | 2026-10-14T07:48:16.171Z | 0.3 min |
| shard 1 | 2026-10-14T07:48:15.377Z | 36.4 min |
| shard 2 | 2026-10-14T07:48:30.975Z | 35.4 min |
| shard 3 | 2026-10-14T07:48:17.713Z | 33.3 min |
| shard 4 | 2026-10-14T07:48:12.182Z | 35.3 min |
| shard 5 | 2026-10-14T07:48:18.382Z | 29.5 min |
| shard 6 | 2026-10-14T07:48:07.341Z | 30.4 min |
| changed | 2026-10-14T07:48:23.418Z | 35.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 112 | 49.0 min | shard 1, shard 4, changed |
| `photo-pipeline.spec.ts` | 96 | 35.3 min | shard 2, shard 5, changed |
| `admin-screening.spec.ts` | 80 | 30.6 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 80 | 27.9 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 21.5 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.6 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 18.6 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.3 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 14.0 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.1 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.0 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 11.3 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 48 | 11.2 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.7 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.3 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.1 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 9.6 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.5 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.4 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.4 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 8.3 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.4 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 6.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.3 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.1 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 16 | 1.3 min | shard 1, shard 4, changed |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-20 Preview as buyer lists the ad's photos with Remove; one is removed with a reason and the seller is told (D154 B4) | mobile-360 | 88.2 s |
| `admin-screening.spec.ts` › SC-20 Preview as buyer lists the ad's photos with Remove; one is removed with a reason and the seller is told (D154 B4) | desktop-1280 | 69.9 s |
| `admin-screening.spec.ts` › SC-20 Preview as buyer lists the ad's photos with Remove; one is removed with a reason and the seller is told (D154 B4) | mobile-360 | 62.3 s |
| `admin-screening.spec.ts` › SC-20 Preview as buyer lists the ad's photos with Remove; one is removed with a reason and the seller is told (D154 B4) | desktop-1280 | 61.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 59.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 57.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 56.2 s |
| `admin-screening.spec.ts` › SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 55.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 54.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 50.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 50.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 49.5 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 48.7 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | desktop-1280 | 46.9 s |
| `admin-screening.spec.ts` › SC-16 a reviewer without a fresh second factor cannot decide | mobile-360 | 46.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38528698170-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38528698170-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38528698170-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38528698170-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38528698170-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38528698170-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38528698170-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38528698170-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38528698170-changed
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-20 Preview as buyer lists the ad's photos with Remove; one is removed with a reason and the seller is told (D154 B4)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Photo removed. The seller is told why."
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-foreground"></p>
       - unexpected value ""

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Photo removed. The seller is told why."
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-foreground"></p>
       - unexpected value ""


  957 |     await dialog.getByTestId("listing-photo-remove-confirm").click();
  958 |
> 959 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  960 |       en["admin.listings.photos.done"],
  961 |       { timeout: 20000 },
```

Context:

```text
              - img [ref=e12]
              - generic [ref=e14]: A photo
            - button "Misleading details" [ref=e15] [cursor=pointer]:
              - generic [ref=e16]: Misleading details
            - button "The site's rules" [ref=e17] [cursor=pointer]:
              - generic [ref=e18]: The site's rules
            - button "Other" [ref=e19] [cursor=pointer]:
              - generic [ref=e20]: Other
        - generic [ref=e21]:
          - generic [ref=e22]: Note for the seller
          - textbox "Note for the seller" [ref=e23]
          - paragraph [ref=e24]: Required when the reason is Other; at most 500 characters.
        - alert [ref=e25]: "The photo was not removed: the ad no longer meets today's rules for Price. Edit those first."
        - generic [ref=e26]:
          - button "Cancel" [ref=e27] [cursor=pointer]
          - button "Remove photo" [ref=e28] [cursor=pointer]
    - button "Close" [ref=e29] [cursor=pointer]:
      - img [ref=e30]
      - generic [ref=e33]: Close
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-20 Preview as buyer lists the ad's photos with Remove; one is removed with a reason and the seller is told (D154 B4)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Photo removed. The seller is told why."
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-foreground"></p>
       - unexpected value ""

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Photo removed. The seller is told why."
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-foreground"></p>
       - unexpected value ""


  957 |     await dialog.getByTestId("listing-photo-remove-confirm").click();
  958 |
> 959 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  960 |       en["admin.listings.photos.done"],
  961 |       { timeout: 20000 },
```

Context:

```text
              - img [ref=e12]
              - generic [ref=e14]: A photo
            - button "Misleading details" [ref=e15] [cursor=pointer]:
              - generic [ref=e16]: Misleading details
            - button "The site's rules" [ref=e17] [cursor=pointer]:
              - generic [ref=e18]: The site's rules
            - button "Other" [ref=e19] [cursor=pointer]:
              - generic [ref=e20]: Other
        - generic [ref=e21]:
          - generic [ref=e22]: Note for the seller
          - textbox "Note for the seller" [ref=e23]
          - paragraph [ref=e24]: Required when the reason is Other; at most 500 characters.
        - alert [ref=e25]: "The photo was not removed: the ad no longer meets today's rules for Price. Edit those first."
        - generic [ref=e26]:
          - button "Cancel" [ref=e27] [cursor=pointer]
          - button "Remove photo" [ref=e28] [cursor=pointer]
    - button "Close" [ref=e29] [cursor=pointer]:
      - img [ref=e30]
      - generic [ref=e33]: Close
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-20 Preview as buyer lists the ad's photos with Remove; one is removed with a reason and the seller is told (D154 B4)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Photo removed. The seller is told why."
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-foreground"></p>
       - unexpected value ""

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Photo removed. The seller is told why."
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-foreground"></p>
       - unexpected value ""


  957 |     await dialog.getByTestId("listing-photo-remove-confirm").click();
  958 |
> 959 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  960 |       en["admin.listings.photos.done"],
  961 |       { timeout: 20000 },
```

Context:

```text
              - img [ref=e12]
              - generic [ref=e14]: A photo
            - button "Misleading details" [ref=e15] [cursor=pointer]:
              - generic [ref=e16]: Misleading details
            - button "The site's rules" [ref=e17] [cursor=pointer]:
              - generic [ref=e18]: The site's rules
            - button "Other" [ref=e19] [cursor=pointer]:
              - generic [ref=e20]: Other
        - generic [ref=e21]:
          - generic [ref=e22]: Note for the seller
          - textbox "Note for the seller" [ref=e23]
          - paragraph [ref=e24]: Required when the reason is Other; at most 500 characters.
        - alert [ref=e25]: "The photo was not removed: the ad no longer meets today's rules for Price. Edit those first."
        - generic [ref=e26]:
          - button "Cancel" [ref=e27] [cursor=pointer]
          - button "Remove photo" [ref=e28] [cursor=pointer]
    - button "Close" [ref=e29] [cursor=pointer]:
      - img [ref=e30]
      - generic [ref=e33]: Close
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-20 Preview as buyer lists the ad's photos with Remove; one is removed with a reason and the seller is told (D154 B4)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Photo removed. The seller is told why."
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-foreground"></p>
       - unexpected value ""

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Photo removed. The seller is told why."
Received: ""
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="done" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-foreground"></p>
       - unexpected value ""


  957 |     await dialog.getByTestId("listing-photo-remove-confirm").click();
  958 |
> 959 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  960 |       en["admin.listings.photos.done"],
  961 |       { timeout: 20000 },
```

Context:

```text
              - img [ref=e12]
              - generic [ref=e14]: A photo
            - button "Misleading details" [ref=e15] [cursor=pointer]:
              - generic [ref=e16]: Misleading details
            - button "The site's rules" [ref=e17] [cursor=pointer]:
              - generic [ref=e18]: The site's rules
            - button "Other" [ref=e19] [cursor=pointer]:
              - generic [ref=e20]: Other
        - generic [ref=e21]:
          - generic [ref=e22]: Note for the seller
          - textbox "Note for the seller" [ref=e23]
          - paragraph [ref=e24]: Required when the reason is Other; at most 500 characters.
        - alert [ref=e25]: "The photo was not removed: the ad no longer meets today's rules for Price. Edit those first."
        - generic [ref=e26]:
          - button "Cancel" [ref=e27] [cursor=pointer]
          - button "Remove photo" [ref=e28] [cursor=pointer]
    - button "Close" [ref=e29] [cursor=pointer]:
      - img [ref=e30]
      - generic [ref=e33]: Close
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-mi41rm: e2e_par_38eqbr → e2e_chi_g88lyb
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-724v16: e2e_par_7gcn84 → e2e_chi_yhkzna
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [price-unit-labels] read failed TypeError: Failed to fetch
```
