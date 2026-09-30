# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36781795077
- Commit: `e765c0120b798f680d9aa43f0e23dfb7df170130`
- Attempt: 1
- Written (UTC): 2026-09-30T22:06:13.429Z
- Passed: 1019 · Skipped: 75 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

114 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 4 | shard 1, shard 4 |
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
| `new row for relation <q> violates check constraint <q>` (quiet) | 2 | shard 3, shard 6 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · commit_failed duplicate key value violates unique constraint <q> ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · new row for relation <q> violates check constraint <q> ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-09-30T21:50:48.682Z | 9.3 min |
| email | 2026-09-30T21:50:07.999Z | 0.2 min |
| shard 1 | 2026-09-30T21:50:06.344Z | 13.7 min |
| shard 2 | 2026-09-30T21:50:16.920Z | 12.1 min |
| shard 3 | 2026-09-30T21:50:12.095Z | 9.8 min |
| shard 4 | 2026-09-30T21:50:09.299Z | 12.9 min |
| shard 5 | 2026-09-30T21:50:10.755Z | 12.3 min |
| shard 6 | 2026-09-30T21:50:15.012Z | 9.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 13.4 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 52 | 9.0 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 34 | 7.6 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 6.1 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.6 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 36 | 5.1 min | shard 1, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 5.1 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 26 | 4.9 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 38 | 4.9 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 4.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 22 | 4.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 4.3 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 40 | 4.3 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.1 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 4.0 min | smoke, shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 32 | 3.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 22 | 3.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 36 | 3.1 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 14 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.0 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 6 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.4 min | smoke |
| `category-image-routes.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 33.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.7 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `post-wizard-place.spec.ts` › PW-78 a big model list shows its required mark once the brand is chosen (INC-336) | mobile-360 | 32.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 30.2 s |
| `post-wizard-place.spec.ts` › PW-78 a big model list shows its required mark once the brand is chosen (INC-336) | desktop-1280 | 30.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 29.8 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 29.6 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 29.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 28.3 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 27.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 44 user(s) owned by process 36781795077-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 36781795077-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 51 user(s) owned by process 36781795077-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 128 user(s) owned by process 36781795077-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 87 user(s) owned by process 36781795077-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 41 user(s) owned by process 36781795077-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 129 user(s) owned by process 36781795077-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 86 user(s) owned by process 36781795077-6
```

## admin-attributes-editor.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-58 the route forwarded no message for the refused commit (INC-196 L2)

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
```

Context:

```text
          - listitem [ref=e584]:
            - generic [ref=e585]: About
          - listitem [ref=e586]:
            - generic [ref=e587]: How it works
      - navigation "Help" [ref=e588]:
        - heading "Help" [level=2] [ref=e589]
        - list [ref=e590]:
          - listitem [ref=e591]:
            - generic [ref=e592]: Safety
          - listitem [ref=e593]:
            - generic [ref=e594]: Contact
      - navigation "Legal" [ref=e595]:
        - heading "Legal" [level=2] [ref=e596]
        - list [ref=e597]:
          - listitem [ref=e598]:
            - generic [ref=e599]: Terms
          - listitem [ref=e600]:
            - generic [ref=e601]: Privacy
    - paragraph [ref=e603]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-78: no soft border on the big model list

expect(locator).toHaveClass(expected) failed

Locator: locator('[data-testid="post-attr-control"][data-attr="e2e_big_mobile360_1_1790805693279_model"]')
Expected pattern: /border-destructive\/40/
Received string:  "min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive"
Timeout: 10000ms

Call log:
  - PW-78: no soft border on the big model list with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_big_mobile360_1_1790805693279_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="ready" data-testid="post-attr-control" data-attr="e2e_big_mobile360_1_1790805693279_model" id="post-attr-e2e_big_mobile360_1_1790805693279_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-78-a-big-model-list-shows-its-required-mark-once-the-brand-is-chosen-INC-336-mobile-360`

## admin-attributes-editor.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-58 the route forwarded no message for the refused commit (INC-196 L2)

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
```

Context:

```text
          - listitem [ref=e880]:
            - generic [ref=e881]: About
          - listitem [ref=e882]:
            - generic [ref=e883]: How it works
      - navigation "Help" [ref=e884]:
        - heading "Help" [level=2] [ref=e885]
        - list [ref=e886]:
          - listitem [ref=e887]:
            - generic [ref=e888]: Safety
          - listitem [ref=e889]:
            - generic [ref=e890]: Contact
      - navigation "Legal" [ref=e891]:
        - heading "Legal" [level=2] [ref=e892]
        - list [ref=e893]:
          - listitem [ref=e894]:
            - generic [ref=e895]: Terms
          - listitem [ref=e896]:
            - generic [ref=e897]: Privacy
    - paragraph [ref=e899]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-78: no soft border on the big model list

expect(locator).toHaveClass(expected) failed

Locator: locator('[data-testid="post-attr-control"][data-attr="e2e_big_desktop1280_0_1790805700059_model"]')
Expected pattern: /border-destructive\/40/
Received string:  "min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive"
Timeout: 10000ms

Call log:
  - PW-78: no soft border on the big model list with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_big_desktop1280_0_1790805700059_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="ready" data-testid="post-attr-control" data-attr="e2e_big_desktop1280_0_1790805700059_model" id="post-attr-e2e_big_desktop1280_0_1790805700059_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-78-a-big-model-list-shows-its-required-mark-once-the-brand-is-chosen-INC-336-desktop-1280`

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

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
```
