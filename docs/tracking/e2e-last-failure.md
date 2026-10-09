# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37865593933
- Commit: `946d6e27463b69b36edea831b60f17efe16da73d`
- Attempt: 1
- Written (UTC): 2026-10-09T01:05:09.810Z
- Passed: 1473 · Skipped: 173 · Failed: 19
- Gating failures: 19 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-1-5ob0ng')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-1-5ob0ng')

[dialog-dump findRow(e2e-cat-4-1-5ob0ng)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-1-5ob0ng) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-1-5ob0ng')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-1-5ob0ng')

[dialog-dump findRow(e2e-cat-4-1-5ob0ng)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-1-5ob0ng) after create] open dialogs: none

   at helpers/categories.ts:336

  334 |     await findRow(page, slug);
  335 |   } catch (error) {
> 336 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: How it works
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
          - listitem [ref=e277]:
            - generic [ref=e278]: Contact
      - navigation "Legal" [ref=e279]:
        - heading "Legal" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Terms
          - listitem [ref=e284]:
            - generic [ref=e285]: Privacy
    - paragraph [ref=e287]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>fbmvn: e<n>e_par_r<n>sq<n> → e<n>e_chi_m<n>lo<n>z` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kybhjb: e<n>e_par_e<n>zk<n> → e<n>e_chi_kj<n>bcn` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>fbmvn: e<n>e_par_r<n>sq<n> → e<n>e_chi_m<n>lo<n>z ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kybhjb: e<n>e_par_e<n>zk<n> → e<n>e_chi_kj<n>bcn ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-09T00:37:42.238Z | 16.5 min |
| email | 2026-10-09T00:37:45.164Z | 0.2 min |
| shard 1 | 2026-10-09T00:37:45.357Z | 24.1 min |
| shard 2 | 2026-10-09T00:37:45.856Z | 19.7 min |
| shard 3 | 2026-10-09T00:37:45.441Z | 22.4 min |
| shard 4 | 2026-10-09T00:37:44.203Z | 23.4 min |
| shard 5 | 2026-10-09T00:37:48.126Z | 27.0 min |
| shard 6 | 2026-10-09T00:37:50.292Z | 18.5 min |
| changed | 2026-10-09T00:37:49.553Z | 8.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 36.9 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 22.6 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 16.5 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 11.6 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 11.4 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 11.3 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 10.8 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 10.4 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 30 | 10.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 9.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 9.6 min | shard 3, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.5 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 8.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.5 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.9 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.3 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 6.3 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 24 | 6.2 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.1 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 6.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.2 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 4.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.7 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 2.6 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.8 min | shard 3, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 4 | 1.8 min | shard 3, shard 5, changed |
| `admin-coverage.spec.ts` | 14 | 1.7 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `house-style.spec.ts` | 24 | 0.8 min | shard 2, shard 5, changed |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 4, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › the bar's current item carries the pill, light then dark (C2h.3) | mobile-360 | 120.4 s |
| `shell.spec.ts` › the bar's current item carries the pill, light then dark (C2h.3) | mobile-360 | 120.3 s |
| `shell.spec.ts` › the bar's current item carries the pill, light then dark (C2h.3) | mobile-360 | 120.2 s |
| `admin-attributes-links.spec.ts` › AT-59 the link editor's Save reflects change, saved and error | desktop-1280 | 55.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 46.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 44.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 42.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 38.3 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 38.0 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 37.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 36.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 36.7 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 36.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37865593933-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37865593933-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37865593933-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 37865593933-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37865593933-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37865593933-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37865593933-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37865593933-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37865593933-changed
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  215 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  216 |     await trigger.click();
> 217 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  218 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  219 |
  220 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:217:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - menuitem "Engli sh Set as this device's default language" [ref=e2]:
      - generic [ref=e3]:
        - generic [ref=e4]: Engli
        - generic [ref=e5]: sh
      - button "Set as this device's default language" [ref=e6]:
        - img [ref=e7]
    - menuitem "አማርኛ Set as this device's default language" [ref=e9]:
      - generic [ref=e11]: አማርኛ
      - button "Set as this device's default language" [ref=e12]:
        - img [ref=e13]
```
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  215 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  216 |     await trigger.click();
> 217 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  218 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  219 |
  220 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:217:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - menuitem "Engli sh Set as this device's default language" [ref=e2]:
      - generic [ref=e3]:
        - generic [ref=e4]: Engli
        - generic [ref=e5]: sh
      - button "Set as this device's default language" [ref=e6]:
        - img [ref=e7]
    - menuitem "አማርኛ Set as this device's default language" [ref=e9]:
      - generic [ref=e11]: አማርኛ
      - button "Set as this device's default language" [ref=e12]:
        - img [ref=e13]
```
```

## shell.spec.ts › mobile chrome › the bar's current item carries the pill, light then dark (C2h.3)

- Source: `smoke`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.evaluate: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('bottom-bar-account').locator('span.truncate')


  880 |       const weight = await account
  881 |         .locator("span.truncate")
> 882 |         .evaluate((el) => Number(getComputedStyle(el).fontWeight));
      |          ^
  883 |       expect(weight).toBeGreaterThanOrEqual(600);
  884 |     };
  885 |     await check();
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:882:10)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:885:5
```

Context: context file not found for `shell-mobile-chrome-the-bar-s-current-item-carries-the-pill-light-then-dark-C2h-3-mobile-360`

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `smoke`
- Project: `mobile-360`

```text
Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span') resolved to 3 elements:
    1) <span class="inline-flex min-w-0 max-w-full">…</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    2) <span class="shrink-0 whitespace-pre">e2e-c</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    3) <span class="min-w-0 overflow-hidden text-ellipsis whitespace-pre">at-tok-j4rmrk</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')

Call log:
  - waiting for getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span')

--- further error 1 ---
Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span') resolved to 3 elements:
    1) <span class="inline-flex min-w-0 max-w-full">…</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    2) <span class="shrink-0 whitespace-pre">e2e-c</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    3) <span class="min-w-0 overflow-hidden text-ellipsis whitespace-pre">at-tok-j4rmrk</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')

Call log:
  - waiting for getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span')


  1013 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
  1014 |     const iconBox = await row.locator("svg").boundingBox();
> 1015 |     const nameBox = await row.locator("span").boundingBox();
       |                                               ^
  1016 |     if (!iconBox || !nameBox) throw new Error("Missing menu row icon or name");
  1017 |     expect(
  1018 |       Math.abs(iconBox.y + iconBox.height / 2 - (nameBox.y + nameBox.height / 2)),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1015:47
```

Context:

```text
          - listitem [ref=e512]:
            - generic [ref=e513]: About
          - listitem [ref=e514]:
            - generic [ref=e515]: How it works
      - navigation "Help" [ref=e516]:
        - heading "Help" [level=2] [ref=e517]
        - list [ref=e518]:
          - listitem [ref=e519]:
            - generic [ref=e520]: Safety
          - listitem [ref=e521]:
            - generic [ref=e522]: Contact
      - navigation "Legal" [ref=e523]:
        - heading "Legal" [level=2] [ref=e524]
        - list [ref=e525]:
          - listitem [ref=e526]:
            - generic [ref=e527]: Terms
          - listitem [ref=e528]:
            - generic [ref=e529]: Privacy
    - paragraph [ref=e531]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › L4b location picker › long location names share one 32px line

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 47
Received:    -644
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 47
Received:    -644

  2288 |         expect(item.headLeft).toBeGreaterThanOrEqual(item.contentLeft - 1);
  2289 |         expect(item.headRight).toBeLessThanOrEqual(item.contentRight + 1);
> 2290 |         expect(item.headLeft).toBeGreaterThanOrEqual(item.rowLeft - 1);
       |                               ^
  2291 |         expect(item.headRight).toBeLessThanOrEqual(item.rowRight + 1);
  2292 |       }
  2293 |     };
    at assertNameHeads (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2290:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2294:5
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## house-style.spec.ts › house style fixture › HS-6 the focus ring shows after keyboard use only

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"

  157 |     await settled(page);
  158 |     await expect(more).toBeFocused();
> 159 |     expect(await more.evaluate((element) => getComputedStyle(element).boxShadow)).toBe(unfocused);
      |                                                                                   ^
  160 |     await page.keyboard.press("Tab");
  161 |     await page.keyboard.press("Shift+Tab");
  162 |     await settled(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/house-style.spec.ts:159:83
```

Context:

```text
              - generic [ref=e394]: How it works
        - navigation "Help" [ref=e395]:
          - heading "Help" [level=2] [ref=e396]
          - list [ref=e397]:
            - listitem [ref=e398]:
              - generic [ref=e399]: Safety
            - listitem [ref=e400]:
              - generic [ref=e401]: Contact
        - navigation "Legal" [ref=e402]:
          - heading "Legal" [level=2] [ref=e403]
          - list [ref=e404]:
            - listitem [ref=e405]:
              - generic [ref=e406]: Terms
            - listitem [ref=e407]:
              - generic [ref=e408]: Privacy
      - paragraph [ref=e410]: © 2026 ethio.com — All rights reserved.
  - generic [ref=e412]:
    - text: Actions
    - tooltip "Actions" [ref=e413]
```
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  215 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  216 |     await trigger.click();
> 217 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  218 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  219 |
  220 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:217:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - menuitem "Engli sh Set as this device's default language" [ref=e2]:
      - generic [ref=e3]:
        - generic [ref=e4]: Engli
        - generic [ref=e5]: sh
      - button "Set as this device's default language" [ref=e6]:
        - img [ref=e7]
    - menuitem "አማርኛ Set as this device's default language" [ref=e9]:
      - generic [ref=e11]: አማርኛ
      - button "Set as this device's default language" [ref=e12]:
        - img [ref=e13]
```
```

## shell.spec.ts › mobile chrome › the bar's current item carries the pill, light then dark (C2h.3)

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.evaluate: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('bottom-bar-account').locator('span.truncate')


  880 |       const weight = await account
  881 |         .locator("span.truncate")
> 882 |         .evaluate((el) => Number(getComputedStyle(el).fontWeight));
      |          ^
  883 |       expect(weight).toBeGreaterThanOrEqual(600);
  884 |     };
  885 |     await check();
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:882:10)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:885:5
```

Context: context file not found for `shell-mobile-chrome-the-bar-s-current-item-carries-the-pill-light-then-dark-C2h-3-mobile-360`

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span') resolved to 3 elements:
    1) <span class="inline-flex min-w-0 max-w-full">…</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    2) <span class="shrink-0 whitespace-pre">e2e-c</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    3) <span class="min-w-0 overflow-hidden text-ellipsis whitespace-pre">at-tok-j4rmrk</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')

Call log:
  - waiting for getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span')

--- further error 1 ---
Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span') resolved to 3 elements:
    1) <span class="inline-flex min-w-0 max-w-full">…</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    2) <span class="shrink-0 whitespace-pre">e2e-c</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    3) <span class="min-w-0 overflow-hidden text-ellipsis whitespace-pre">at-tok-j4rmrk</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')

Call log:
  - waiting for getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span')


  1013 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
  1014 |     const iconBox = await row.locator("svg").boundingBox();
> 1015 |     const nameBox = await row.locator("span").boundingBox();
       |                                               ^
  1016 |     if (!iconBox || !nameBox) throw new Error("Missing menu row icon or name");
  1017 |     expect(
  1018 |       Math.abs(iconBox.y + iconBox.height / 2 - (nameBox.y + nameBox.height / 2)),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1015:47
```

Context:

```text
          - listitem [ref=e512]:
            - generic [ref=e513]: About
          - listitem [ref=e514]:
            - generic [ref=e515]: How it works
      - navigation "Help" [ref=e516]:
        - heading "Help" [level=2] [ref=e517]
        - list [ref=e518]:
          - listitem [ref=e519]:
            - generic [ref=e520]: Safety
          - listitem [ref=e521]:
            - generic [ref=e522]: Contact
      - navigation "Legal" [ref=e523]:
        - heading "Legal" [level=2] [ref=e524]
        - list [ref=e525]:
          - listitem [ref=e526]:
            - generic [ref=e527]: Terms
          - listitem [ref=e528]:
            - generic [ref=e529]: Privacy
    - paragraph [ref=e531]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › L4b location picker › long location names share one 32px line

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 47
Received:    -584
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 47
Received:    -584

  2288 |         expect(item.headLeft).toBeGreaterThanOrEqual(item.contentLeft - 1);
  2289 |         expect(item.headRight).toBeLessThanOrEqual(item.contentRight + 1);
> 2290 |         expect(item.headLeft).toBeGreaterThanOrEqual(item.rowLeft - 1);
       |                               ^
  2291 |         expect(item.headRight).toBeLessThanOrEqual(item.rowRight + 1);
  2292 |       }
  2293 |     };
    at assertNameHeads (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2290:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2294:5
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## house-style.spec.ts › house style fixture › HS-6 the focus ring shows after keyboard use only

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"

  157 |     await settled(page);
  158 |     await expect(more).toBeFocused();
> 159 |     expect(await more.evaluate((element) => getComputedStyle(element).boxShadow)).toBe(unfocused);
      |                                                                                   ^
  160 |     await page.keyboard.press("Tab");
  161 |     await page.keyboard.press("Shift+Tab");
  162 |     await settled(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/house-style.spec.ts:159:83
```

Context:

```text
              - generic [ref=e426]: How it works
        - navigation "Help" [ref=e427]:
          - heading "Help" [level=2] [ref=e428]
          - list [ref=e429]:
            - listitem [ref=e430]:
              - generic [ref=e431]: Safety
            - listitem [ref=e432]:
              - generic [ref=e433]: Contact
        - navigation "Legal" [ref=e434]:
          - heading "Legal" [level=2] [ref=e435]
          - list [ref=e436]:
            - listitem [ref=e437]:
              - generic [ref=e438]: Terms
            - listitem [ref=e439]:
              - generic [ref=e440]: Privacy
      - paragraph [ref=e442]: © 2026 ethio.com — All rights reserved.
  - generic [ref=e444]:
    - text: Actions
    - tooltip "Actions" [ref=e445]
```
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  215 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  216 |     await trigger.click();
> 217 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  218 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  219 |
  220 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:217:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - menuitem "Engli sh Set as this device's default language" [ref=e2]:
      - generic [ref=e3]:
        - generic [ref=e4]: Engli
        - generic [ref=e5]: sh
      - button "Set as this device's default language" [ref=e6]:
        - img [ref=e7]
    - menuitem "አማርኛ Set as this device's default language" [ref=e9]:
      - generic [ref=e11]: አማርኛ
      - button "Set as this device's default language" [ref=e12]:
        - img [ref=e13]
```
```

## house-style.spec.ts › house style fixture › HS-6 the focus ring shows after keyboard use only

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"

  157 |     await settled(page);
  158 |     await expect(more).toBeFocused();
> 159 |     expect(await more.evaluate((element) => getComputedStyle(element).boxShadow)).toBe(unfocused);
      |                                                                                   ^
  160 |     await page.keyboard.press("Tab");
  161 |     await page.keyboard.press("Shift+Tab");
  162 |     await settled(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/house-style.spec.ts:159:83
```

Context:

```text
              - generic [ref=e394]: How it works
        - navigation "Help" [ref=e395]:
          - heading "Help" [level=2] [ref=e396]
          - list [ref=e397]:
            - listitem [ref=e398]:
              - generic [ref=e399]: Safety
            - listitem [ref=e400]:
              - generic [ref=e401]: Contact
        - navigation "Legal" [ref=e402]:
          - heading "Legal" [level=2] [ref=e403]
          - list [ref=e404]:
            - listitem [ref=e405]:
              - generic [ref=e406]: Terms
            - listitem [ref=e407]:
              - generic [ref=e408]: Privacy
      - paragraph [ref=e410]: © 2026 ethio.com — All rights reserved.
  - generic [ref=e412]:
    - text: Actions
    - tooltip "Actions" [ref=e413]
```
```

## house-style.spec.ts › house style fixture › HS-6 the focus ring shows after keyboard use only

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"

  157 |     await settled(page);
  158 |     await expect(more).toBeFocused();
> 159 |     expect(await more.evaluate((element) => getComputedStyle(element).boxShadow)).toBe(unfocused);
      |                                                                                   ^
  160 |     await page.keyboard.press("Tab");
  161 |     await page.keyboard.press("Shift+Tab");
  162 |     await settled(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/house-style.spec.ts:159:83
```

Context:

```text
              - generic [ref=e426]: How it works
        - navigation "Help" [ref=e427]:
          - heading "Help" [level=2] [ref=e428]
          - list [ref=e429]:
            - listitem [ref=e430]:
              - generic [ref=e431]: Safety
            - listitem [ref=e432]:
              - generic [ref=e433]: Contact
        - navigation "Legal" [ref=e434]:
          - heading "Legal" [level=2] [ref=e435]
          - list [ref=e436]:
            - listitem [ref=e437]:
              - generic [ref=e438]: Terms
            - listitem [ref=e439]:
              - generic [ref=e440]: Privacy
      - paragraph [ref=e442]: © 2026 ethio.com — All rights reserved.
  - generic [ref=e444]:
    - text: Actions
    - tooltip "Actions" [ref=e445]
```
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  215 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  216 |     await trigger.click();
> 217 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  218 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  219 |
  220 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:217:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - menuitem "Engli sh Set as this device's default language" [ref=e2]:
      - generic [ref=e3]:
        - generic [ref=e4]: Engli
        - generic [ref=e5]: sh
      - button "Set as this device's default language" [ref=e6]:
        - img [ref=e7]
    - menuitem "አማርኛ Set as this device's default language" [ref=e9]:
      - generic [ref=e11]: አማርኛ
      - button "Set as this device's default language" [ref=e12]:
        - img [ref=e13]
```
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  215 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  216 |     await trigger.click();
> 217 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  218 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  219 |
  220 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:217:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - menuitem "Engli sh Set as this device's default language" [ref=e2]:
      - generic [ref=e3]:
        - generic [ref=e4]: Engli
        - generic [ref=e5]: sh
      - button "Set as this device's default language" [ref=e6]:
        - img [ref=e7]
    - menuitem "አማርኛ Set as this device's default language" [ref=e9]:
      - generic [ref=e11]: አማርኛ
      - button "Set as this device's default language" [ref=e12]:
        - img [ref=e13]
```
```

## shell.spec.ts › mobile chrome › the bar's current item carries the pill, light then dark (C2h.3)

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.evaluate: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('bottom-bar-account').locator('span.truncate')


  880 |       const weight = await account
  881 |         .locator("span.truncate")
> 882 |         .evaluate((el) => Number(getComputedStyle(el).fontWeight));
      |          ^
  883 |       expect(weight).toBeGreaterThanOrEqual(600);
  884 |     };
  885 |     await check();
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:882:10)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:885:5
```

Context: context file not found for `shell-mobile-chrome-the-bar-s-current-item-carries-the-pill-light-then-dark-C2h-3-mobile-360`

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `changed`
- Project: `mobile-360`

```text
Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span') resolved to 3 elements:
    1) <span class="inline-flex min-w-0 max-w-full">…</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    2) <span class="shrink-0 whitespace-pre">e2e-c</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    3) <span class="min-w-0 overflow-hidden text-ellipsis whitespace-pre">at-tok-j4rmrk</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')

Call log:
  - waiting for getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span')

--- further error 1 ---
Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span') resolved to 3 elements:
    1) <span class="inline-flex min-w-0 max-w-full">…</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    2) <span class="shrink-0 whitespace-pre">e2e-c</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')
    3) <span class="min-w-0 overflow-hidden text-ellipsis whitespace-pre">at-tok-j4rmrk</span> aka getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-tok-j4rmrk')

Call log:
  - waiting for getByTestId('rail-menu').locator('[data-testid^="rail-category-"]').first().locator('span')


  1013 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
  1014 |     const iconBox = await row.locator("svg").boundingBox();
> 1015 |     const nameBox = await row.locator("span").boundingBox();
       |                                               ^
  1016 |     if (!iconBox || !nameBox) throw new Error("Missing menu row icon or name");
  1017 |     expect(
  1018 |       Math.abs(iconBox.y + iconBox.height / 2 - (nameBox.y + nameBox.height / 2)),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1015:47
```

Context:

```text
          - listitem [ref=e512]:
            - generic [ref=e513]: About
          - listitem [ref=e514]:
            - generic [ref=e515]: How it works
      - navigation "Help" [ref=e516]:
        - heading "Help" [level=2] [ref=e517]
        - list [ref=e518]:
          - listitem [ref=e519]:
            - generic [ref=e520]: Safety
          - listitem [ref=e521]:
            - generic [ref=e522]: Contact
      - navigation "Legal" [ref=e523]:
        - heading "Legal" [level=2] [ref=e524]
        - list [ref=e525]:
          - listitem [ref=e526]:
            - generic [ref=e527]: Terms
          - listitem [ref=e528]:
            - generic [ref=e529]: Privacy
    - paragraph [ref=e531]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › L4b location picker › long location names share one 32px line

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 47
Received:    -673
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 47
Received:    -673

  2288 |         expect(item.headLeft).toBeGreaterThanOrEqual(item.contentLeft - 1);
  2289 |         expect(item.headRight).toBeLessThanOrEqual(item.contentRight + 1);
> 2290 |         expect(item.headLeft).toBeGreaterThanOrEqual(item.rowLeft - 1);
       |                               ^
  2291 |         expect(item.headRight).toBeLessThanOrEqual(item.rowRight + 1);
  2292 |       }
  2293 |     };
    at assertNameHeads (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2290:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2294:5
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
