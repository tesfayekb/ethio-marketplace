# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37421084564
- Commit: `d74a1b7ab9daa35248e41c3e64e221cc500e2fa7`
- Attempt: 1
- Written (UTC): 2026-10-06T06:23:09.508Z
- Passed: 1280 · Skipped: 78 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-category.spec.ts › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71) — Test timeout of 60000ms exceeded while running "afterEach" hook.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-48 the library's coverage column reads n/N for a select definition — Error: [dialog-dump AT-48 coverage never rendered] open dialogs: none

## Flaky bodies (DEC-078)

### post-wizard-category.spec.ts › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-71-the-category-group-wears-the-soft-border-until-a-leaf-is-chosen-D71-mobile-360`

### admin-attributes-editor.spec.ts › C3 attributes console › AT-48 the library's coverage column reads n/N for a select definition

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-48 coverage never rendered] open dialogs: none

expect(locator).toHaveText(expected) failed

Locator: getByRole('table').getByTestId('attribute-coverage-e2e_attr_xylr8e')
Expected: "1/2"
Error: strict mode violation: getByRole('table').getByTestId('attribute-coverage-e2e_attr_xylr8e') resolved to 2 elements:
    1) <span data-incomplete="true" title="1 of 2 options have an Amharic label" data-testid="attribute-coverage-e2e_attr_xylr8e" class="block tabular-nums text-amber-600 dark:text-amber-400">1/2</span> aka getByTestId('attribute-coverage-e2e_attr_xylr8e').first()
    2) <span data-incomplete="true" title="1 of 2 options have an Amharic label" data-testid="attribute-coverage-e2e_attr_xylr8e" class="block tabular-nums text-amber-600 dark:text-amber-400">1/2</span> aka getByTestId('attribute-coverage-e2e_attr_xylr8e').nth(1)

Call log:
  - [dialog-dump AT-48 coverage never rendered] open dialogs: none with timeout 20000ms
  - waiting for getByRole('table').getByTestId('attribute-coverage-e2e_attr_xylr8e')

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

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

110 line(s), 35 message(s): 2 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 2, shard 3, shard 6, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `unknown step` | 2 | shard 5, changed |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 2, shard 3, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### unknown step

- Count: 2 · Sources: shard 5, changed

```text
[WebServer] [ssr-error] /api/listings/draft unknown step
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-06T05:58:11.621Z | 16.3 min |
| email | 2026-10-06T05:58:05.903Z | 0.2 min |
| shard 1 | 2026-10-06T05:58:12.382Z | 24.5 min |
| shard 2 | 2026-10-06T05:58:03.274Z | 21.3 min |
| shard 3 | 2026-10-06T05:58:37.605Z | 18.3 min |
| shard 4 | 2026-10-06T05:58:03.301Z | 21.9 min |
| shard 5 | 2026-10-06T05:58:02.411Z | 20.3 min |
| shard 6 | 2026-10-06T05:58:03.979Z | 18.1 min |
| changed | 2026-10-06T05:58:04.009Z | 12.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 26.1 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 92 | 22.9 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 252 | 17.8 min | smoke, shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 44 | 17.0 min | shard 3, shard 6, changed |
| `post-wizard-bundle2.spec.ts` | 60 | 16.5 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 13.3 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 11.5 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 11.5 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.2 min | smoke, shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 9.5 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 28 | 9.3 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 9.3 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.1 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 8.8 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 8.4 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 8.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 7.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 6.4 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 6.2 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 5.7 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 38 | 5.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.3 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 2.9 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.4 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.8 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-library.spec.ts` › AT-2 definitions: a scratch attribute is created and renamed (DB truth) | mobile-360 | 120.6 s |
| `admin-attributes-editor.spec.ts` › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells | mobile-360 | 120.5 s |
| `post-wizard-category.spec.ts` › PW-71 the category group wears the soft border until a leaf is chosen (D71) | mobile-360 | 84.2 s |
| `post-wizard-specs.spec.ts` › PW-22 a link's allowed options narrow the picker and its default prefills | mobile-360 | 80.2 s |
| `post-wizard-specs.spec.ts` › PW-22 a link's allowed options narrow the picker and its default prefills | desktop-1280 | 74.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 49.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 49.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 44.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 43.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 41.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 40.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 39.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 38.7 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 38.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37421084564-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37421084564-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37421084564-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37421084564-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37421084564-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37421084564-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37421084564-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 1 (by method: GET 1; by code: UND_ERR_SOCKET 1; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37421084564-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37421084564-changed
```

## admin-attributes-editor.spec.ts › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e112]:
            - generic [ref=e113]: About
          - listitem [ref=e114]:
            - generic [ref=e115]: How it works
      - navigation "Help" [ref=e116]:
        - heading "Help" [level=2] [ref=e117]
        - list [ref=e118]:
          - listitem [ref=e119]:
            - generic [ref=e120]: Safety
          - listitem [ref=e121]:
            - generic [ref=e122]: Contact
      - navigation "Legal" [ref=e123]:
        - heading "Legal" [level=2] [ref=e124]
        - list [ref=e125]:
          - listitem [ref=e126]:
            - generic [ref=e127]: Terms
          - listitem [ref=e128]:
            - generic [ref=e129]: Privacy
    - paragraph [ref=e131]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-attributes-library-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-22: the link's default did not return after a make reset

expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_3_1_bw0o89_unit"]')
Expected: "e2e_fold_3_1_bw0o89_pc"
Received: "e2e_fold_3_1_bw0o89_set"
Timeout:  20000ms

Call log:
  - PW-22: the link's default did not return after a make reset with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_3_1_bw0o89_unit"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="ready" data-testid="post-attr-control" data-attr="e2e_fold_3_1_bw0o89_unit" id="post-attr-e2e_fold_3_1_bw0o89_unit" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "e2e_fold_3_1_bw0o89_set"

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-22: the link's default did not return after a make reset

expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_6_1_92xc5s_unit"]')
Expected: "e2e_fold_6_1_92xc5s_pc"
Received: "e2e_fold_6_1_92xc5s_set"
Timeout:  20000ms

Call log:
  - PW-22: the link's default did not return after a make reset with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_6_1_92xc5s_unit"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="ready" data-testid="post-attr-control" data-attr="e2e_fold_6_1_92xc5s_unit" id="post-attr-e2e_fold_6_1_92xc5s_unit" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "e2e_fold_6_1_92xc5s_set"

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-desktop-1280`

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```
