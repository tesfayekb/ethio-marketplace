# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38115748403
- Commit: `6694c76b96837f00536de6ec84f33306f098adc6`
- Attempt: 1
- Written (UTC): 2026-10-11T06:16:55.154Z
- Passed: 1556 · Skipped: 124 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 14 changed · 0 retired · 0 reactivated · 0 deleted · 139 unchanged · 0 refused

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 14 changed · 0 retired · 0 reactivated · 0 deleted · 139 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 14,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 14 changed · 0 retired · 0 reactivated · 0 deleted · 139 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 14,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }

  862 |       { adds, changes, retires, reactivations, deletes, refused },
  863 |       `CT-18 the round trip was not a no-op: ${await counts.textContent()}`,
> 864 |     ).toEqual({ adds: 0, changes: 0, retires: 0, reactivations: 0, deletes: 0, refused: 0 });
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [active] [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 14 changed · 0 retired · 0 reactivated · 0 deleted · 139 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

105 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 2, shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-aah<n>oq: e<n>e_par_f<n>n<n> → e<n>e_chi_tow<n>ey` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tb<n>jnq: e<n>e_par_tvyv<n>c → e<n>e_chi_k<n>b<n>j<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-aah<n>oq: e<n>e_par_f<n>n<n> → e<n>e_chi_tow<n>ey ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tb<n>jnq: e<n>e_par_tvyv<n>c → e<n>e_chi_k<n>b<n>j<n> ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 2, shard 3, shard 6

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
| smoke | 2026-10-11T05:45:27.084Z | 15.8 min |
| email | 2026-10-11T05:45:31.249Z | 0.2 min |
| shard 1 | 2026-10-11T05:45:29.629Z | 28.5 min |
| shard 2 | 2026-10-11T05:45:33.027Z | 27.6 min |
| shard 3 | 2026-10-11T05:45:25.523Z | 24.6 min |
| shard 4 | 2026-10-11T05:45:30.800Z | 31.1 min |
| shard 5 | 2026-10-11T05:45:25.910Z | 22.4 min |
| shard 6 | 2026-10-11T05:45:32.667Z | 25.4 min |
| changed | 2026-10-11T05:45:29.200Z | 8.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 25.0 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.2 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 15.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 15.5 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 52 | 13.4 min | shard 1, shard 4, changed |
| `admin-categories-lifecycle.spec.ts` | 48 | 12.8 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 52 | 12.2 min | shard 1, shard 4, changed |
| `admin-attributes-library.spec.ts` | 42 | 11.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 46 | 10.9 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 10.7 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 10.4 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 10.2 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 10.1 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.1 min | smoke, shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 9.9 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 9.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 28 | 9.2 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.7 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 8.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.0 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 30 | 6.5 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 16 | 5.7 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.6 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 4.9 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 4.8 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.2 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.9 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 2.6 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.9 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `shell-table-law.spec.ts` | 2 | 1.3 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 50.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.2 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 46.2 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 45.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 45.4 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 45.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 43.9 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 43.0 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 42.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.1 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 42.0 s |
| `post-wizard-resets.spec.ts` › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold | desktop-1280 | 41.4 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 39.7 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | desktop-1280 | 39.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38115748403-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38115748403-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 38115748403-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 36 user(s) owned by process 38115748403-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 38115748403-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 6, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38115748403-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38115748403-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 38115748403-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 38115748403-changed
```

## shell-table-law.spec.ts › shell table law › admin tables never overflow horizontally

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  locator('table')
Expected: visible
Received: hidden
Timeout:  15000ms

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('table')
    19 × locator resolved to <table class="w-full text-start text-sm table-fixed">…</table>
       - unexpected value "hidden"

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator:  locator('table')
Expected: visible
Received: hidden
Timeout:  15000ms

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('table')
    19 × locator resolved to <table class="w-full text-start text-sm table-fixed">…</table>
       - unexpected value "hidden"


  51 |     await page.setViewportSize({ width: 768, height: 1024 });
  52 |     await waitForHydration(page);
> 53 |     await expect(page.locator("table")).toBeVisible({ timeout: 15000 });
     |                                         ^
  54 |     await expectFits(page);
  55 |
```

Context:

```text
          - listitem [ref=e985]:
            - generic [ref=e986]: About
          - listitem [ref=e987]:
            - generic [ref=e988]: How it works
      - navigation "Help" [ref=e989]:
        - heading "Help" [level=2] [ref=e990]
        - list [ref=e991]:
          - listitem [ref=e992]:
            - generic [ref=e993]: Safety
          - listitem [ref=e994]:
            - generic [ref=e995]: Contact
      - navigation "Legal" [ref=e996]:
        - heading "Legal" [level=2] [ref=e997]
        - list [ref=e998]:
          - listitem [ref=e999]:
            - generic [ref=e1000]: Terms
          - listitem [ref=e1001]:
            - generic [ref=e1002]: Privacy
    - paragraph [ref=e1004]: © 2026 ethio.com — All rights reserved.
```
```

## feed-index.spec.ts › FEED INDEX › FE-13 the daily check writes its counts

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: {"code": "57014", "details": null, "hint": null, "message": "canceling statement due to statement timeout"}
--- further error 1 ---
Error: expect(received).toBeNull()

Received: {"code": "57014", "details": null, "hint": null, "message": "canceling statement due to statement timeout"}

  425 |     expect(before.error).toBeNull();
  426 |     const { data, error } = await adminClient().rpc("feed_index_check_sweep");
> 427 |     expect(error).toBeNull();
      |                   ^
  428 |     const result = data as Record<string, number>;
  429 |     for (const key of [
  430 |       "active_listings",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:427:19
```

Context: context file not found for `feed-index-FEED-INDEX-FE-13-the-daily-check-writes-its-counts-desktop-1280`

## shell-table-law.spec.ts › shell table law › admin tables never overflow horizontally

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator:  locator('table')
Expected: visible
Received: hidden
Timeout:  15000ms

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('table')
    19 × locator resolved to <table class="w-full text-start text-sm table-fixed">…</table>
       - unexpected value "hidden"

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator:  locator('table')
Expected: visible
Received: hidden
Timeout:  15000ms

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('table')
    19 × locator resolved to <table class="w-full text-start text-sm table-fixed">…</table>
       - unexpected value "hidden"


  51 |     await page.setViewportSize({ width: 768, height: 1024 });
  52 |     await waitForHydration(page);
> 53 |     await expect(page.locator("table")).toBeVisible({ timeout: 15000 });
     |                                         ^
  54 |     await expectFits(page);
  55 |
```

Context:

```text
          - listitem [ref=e985]:
            - generic [ref=e986]: About
          - listitem [ref=e987]:
            - generic [ref=e988]: How it works
      - navigation "Help" [ref=e989]:
        - heading "Help" [level=2] [ref=e990]
        - list [ref=e991]:
          - listitem [ref=e992]:
            - generic [ref=e993]: Safety
          - listitem [ref=e994]:
            - generic [ref=e995]: Contact
      - navigation "Legal" [ref=e996]:
        - heading "Legal" [level=2] [ref=e997]
        - list [ref=e998]:
          - listitem [ref=e999]:
            - generic [ref=e1000]: Terms
          - listitem [ref=e1001]:
            - generic [ref=e1002]: Privacy
    - paragraph [ref=e1004]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:33571:25) at http://127.0.0.1:4173/assets/index-BBkQXhSd.js:33603:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BBkQXhSd.js:6025:5) ×2
console.error: [client-error] gate fetch threw
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

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
