# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37768908534
- Commit: `f4bae5857b8a347429486f6803a0b128c67a5500`
- Attempt: 1
- Written (UTC): 2026-10-08T11:59:42.404Z
- Passed: 1486 · Skipped: 180 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 2, shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ce<n>y<n>u: e<n>e_par_eb<n>rn<n> → e<n>e_chi_a<n>xnun` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fpadn<n>: e<n>e_par_wznq<n>s → e<n>e_chi_u<n>osu` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ce<n>y<n>u: e<n>e_par_eb<n>rn<n> → e<n>e_chi_a<n>xnun ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fpadn<n>: e<n>e_par_wznq<n>s → e<n>e_chi_u<n>osu ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 2, shard 3, shard 6

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
| smoke | 2026-10-08T11:17:08.049Z | 13.2 min |
| email | 2026-10-08T11:17:07.941Z | 0.2 min |
| shard 1 | 2026-10-08T11:17:21.661Z | 24.4 min |
| shard 2 | 2026-10-08T11:17:15.763Z | 19.3 min |
| shard 3 | 2026-10-08T11:17:08.410Z | 15.7 min |
| shard 4 | 2026-10-08T11:17:18.590Z | 19.8 min |
| shard 5 | 2026-10-08T11:23:19.522Z | 35.9 min |
| shard 6 | 2026-10-08T11:17:20.723Z | 16.6 min |
| changed | 2026-10-08T11:17:07.004Z | 7.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 498 | 26.5 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 19.0 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 17.0 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 12.5 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 11.5 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 10.8 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 9.5 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.4 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 9.4 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 9.2 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 30 | 8.6 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 8.5 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 24 | 8.2 min | shard 1, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 7.6 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 7.0 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 6.7 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 5.6 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 32 | 5.2 min | shard 2, shard 5, changed |
| `admin-translations-console.spec.ts` | 38 | 5.1 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 4.9 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.5 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 4.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 20 | 3.1 min | shard 1, shard 4, changed |
| `admin-countries.spec.ts` | 16 | 2.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.4 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.3 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.7 min | shard 3, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.9 min | shard 2, shard 5 |
| `house-style.spec.ts` | 10 | 0.8 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.8 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.6 min | shard 3, shard 5 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.5 min | smoke, shard 4, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 2 | 0.5 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.4 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `geo.spec.ts` | 10 | 0.1 min | shard 2, shard 5 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `phone-frame.spec.ts` › account and post at every width | desktop-1280 | 130.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 59.2 s |
| `post-wizard-pricing.spec.ts` › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) | desktop-1280 | 55.7 s |
| `phone-frame.spec.ts` › admin categories at every width | desktop-1280 | 52.1 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | desktop-1280 | 50.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 46.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.0 s |
| `phone-frame.spec.ts` › signed out home at every width | desktop-1280 | 41.6 s |
| `admin-users.spec.ts` › AU-1 permission: moderator is refused, admin sees the list | desktop-1280 | 41.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 40.6 s |
| `admin-users.spec.ts` › AU-12 edit: a reserved name needs a reason of ten characters | desktop-1280 | 40.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 38.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 38.5 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 36.0 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | desktop-1280 | 35.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37768908534-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37768908534-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37768908534-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 37768908534-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37768908534-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37768908534-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37768908534-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37768908534-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37768908534-changed
```

## phone-frame.spec.ts › width walk (C2g.4) › account and post at every width

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: app never declared ready — SSR marker absent, likely client crash; see [client-error] lines

   at helpers/ui.ts:124

  122 |       .then((n) => (n > 0 ? "present" : "absent"))
  123 |       .catch(() => "absent");
> 124 |     throw new Error(
      |           ^
  125 |       `app never declared ready — SSR marker ${ssrMarker}, likely client crash; see [client-error] lines`,
  126 |     );
  127 |   }
    at waitForHydration (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:124:11)
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:162:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/phone-frame.spec.ts:180:9
```

Context:

```text
          - listitem [ref=e110]:
            - generic [ref=e111]: About
          - listitem [ref=e112]:
            - generic [ref=e113]: How it works
      - navigation "Help" [ref=e114]:
        - heading "Help" [level=2] [ref=e115]
        - list [ref=e116]:
          - listitem [ref=e117]:
            - generic [ref=e118]: Safety
          - listitem [ref=e119]:
            - generic [ref=e120]: Contact
      - navigation "Legal" [ref=e121]:
        - heading "Legal" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Terms
          - listitem [ref=e126]:
            - generic [ref=e127]: Privacy
    - paragraph [ref=e129]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-58: 150 is not refused in words

expect(locator).toHaveText(expected) failed

Locator:  locator('[role="alert"][data-field="post-price-commission"]')
Expected: "Enter a commission between 0.01% and 100%."
Received: "Enter your commission percentage."
Timeout:  10000ms

Call log:
  - PW-58: 150 is not refused in words with timeout 10000ms
  - waiting for locator('[role="alert"][data-field="post-price-commission"]')
    13 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="post-field-refusal" data-field="post-price-commission">Enter your commission percentage.</p>
       - unexpected value "Enter your commission percentage."

--- further error 1 ---
Error: PW-58: 150 is not refused in words

expect(locator).toHaveText(expected) failed

Locator:  locator('[role="alert"][data-field="post-price-commission"]')
Expected: "Enter a commission between 0.01% and 100%."
Received: "Enter your commission percentage."
Timeout:  10000ms

Call log:
  - PW-58: 150 is not refused in words with timeout 10000ms
  - waiting for locator('[role="alert"][data-field="post-price-commission"]')
    13 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="post-field-refusal" data-field="post-price-commission">Enter your commission percentage.</p>
       - unexpected value "Enter your commission percentage."


  501 |     for (const typed of ["0", "150"]) {
  502 |       await box.fill(typed);
> 503 |       await expect(said, `PW-58: ${typed} is not refused in words`).toHaveText(
      |                                                                     ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-desktop-1280`

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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
Error: app never declared ready — SSR marker absent, likely client crash; see [client-error] lines
125 |       `app never declared ready — SSR marker ${ssrMarker}, likely client crash; see [client-error] lines`,
```
