# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37233659011
- Commit: `7a12dead2a06f95c63f3f72feb1b47e778b8a353`
- Attempt: 1
- Written (UTC): 2026-10-04T21:12:47.527Z
- Passed: 781 · Skipped: 67 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 2, shard 3, shard 4, shard 6
- Sources without results: shard 1, shard 5

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back — Error: [e2e:l2b] destroying XS failed at place country 59a420cf-dc2a-40ed-abd6-122473a8b967: update or delete on table "locations" violates foreign key constraint "locations_parent_id_fkey" on table "locations"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] destroying XS failed at place country 59a420cf-dc2a-40ed-abd6-122473a8b967: update or delete on table "locations" violates foreign key constraint "locations_parent_id_fkey" on table "locations"
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import countries" [active] [ref=e2]:
    - heading "Import countries" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import countries
      - paragraph [ref=e6]: "A file is written whole or not at all: one refused row stops the entire import."
      - paragraph [ref=e7]: Start from a download so the columns match. Read-only columns are never applied.
      - status [ref=e8]: 1 added · 0 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

### admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e824]:
            - generic [ref=e825]: About
          - listitem [ref=e826]:
            - generic [ref=e827]: How it works
      - navigation "Help" [ref=e828]:
        - heading "Help" [level=2] [ref=e829]
        - list [ref=e830]:
          - listitem [ref=e831]:
            - generic [ref=e832]: Safety
          - listitem [ref=e833]:
            - generic [ref=e834]: Contact
      - navigation "Legal" [ref=e835]:
        - heading "Legal" [level=2] [ref=e836]
        - list [ref=e837]:
          - listitem [ref=e838]:
            - generic [ref=e839]: Terms
          - listitem [ref=e840]:
            - generic [ref=e841]: Privacy
    - paragraph [ref=e843]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

113 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
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
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 2, shard 3, shard 4, shard 6 · unavailable: shard 1, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T20:52:41.204Z | 13.5 min |
| email | 2026-10-04T20:52:44.942Z | 0.2 min |
| shard 2 | 2026-10-04T20:52:42.038Z | 18.0 min |
| shard 3 | 2026-10-04T20:52:47.203Z | 18.8 min |
| shard 4 | 2026-10-04T20:52:41.485Z | 18.3 min |
| shard 6 | 2026-10-04T20:52:43.126Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 64 | 17.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 16.9 min | smoke, shard 3, shard 6 |
| `posting-routes.spec.ts` | 50 | 8.7 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 28 | 8.4 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 22 | 7.4 min | shard 3 |
| `post-wizard-bundle2.spec.ts` | 25 | 6.8 min | shard 2 |
| `post-wizard-resets.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 33 | 6.0 min | smoke, shard 2 |
| `admin-attributes-library.spec.ts` | 20 | 5.0 min | shard 4 |
| `post-wizard-category.spec.ts` | 21 | 4.9 min | shard 2 |
| `post-wizard-place.spec.ts` | 18 | 4.0 min | shard 2 |
| `admin-categories-console.spec.ts` | 16 | 3.9 min | shard 4 |
| `admin-categories-lifecycle.spec.ts` | 20 | 3.9 min | shard 4 |
| `admin-attributes-editor.spec.ts` | 17 | 3.5 min | shard 4 |
| `admin-users.spec.ts` | 12 | 3.3 min | shard 2 |
| `admin-locations.spec.ts` | 17 | 3.1 min | shard 4 |
| `admin-attributes-links.spec.ts` | 11 | 3.0 min | shard 4 |
| `photo-pipeline.spec.ts` | 10 | 3.0 min | shard 2 |
| `import-security.spec.ts` | 17 | 3.0 min | shard 2 |
| `admin-translations-console.spec.ts` | 18 | 2.4 min | shard 4 |
| `admin-roles.spec.ts` | 12 | 2.3 min | shard 4 |
| `admin-attributes-import.spec.ts` | 16 | 2.3 min | shard 4 |
| `admin-countries.spec.ts` | 8 | 1.5 min | shard 4 |
| `admin-audit.spec.ts` | 5 | 1.5 min | shard 4 |
| `mfa-stepup.spec.ts` | 9 | 1.1 min | shard 2 |
| `post-wizard-finder.spec.ts` | 4 | 0.7 min | shard 2 |
| `admin-shell.spec.ts` | 5 | 0.7 min | shard 4 |
| `admin-coverage.spec.ts` | 7 | 0.7 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-image-routes.spec.ts` | 5 | 0.5 min | shard 2 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `post-wizard-details.spec.ts` | 2 | 0.4 min | shard 2 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 1 | 0.4 min | shard 4 |
| `i18n-coverage.spec.ts` | 4 | 0.3 min | shard 2 |
| `i18n-bundle.spec.ts` | 2 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `category-nav.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `layout.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 5 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 43.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 41.0 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 36.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 36.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 36.0 s |
| `post-wizard-pricing.spec.ts` › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) | mobile-360 | 35.0 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 34.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 34.3 s |
| `post-wizard-pricing.spec.ts` › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) | mobile-360 | 34.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 33.1 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | mobile-360 | 32.4 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 32.2 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | mobile-360 | 32.1 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 32.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 31.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37233659011-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37233659011-email
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37233659011-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37233659011-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37233659011-4
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37233659011-6
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

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

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
  ✘   78 [mobile-360] › e2e/admin-categories-console.spec.ts:343:3 › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home (36.3s)
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37233659011-1-3064-3-fnbome@ethio-e2e.invalid)
  ✓  169 [mobile-360] › e2e/admin-translations-console.spec.ts:339:3 › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge (3.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37233659011-1-3064-2-jcc9fq@ethio-e2e.invalid)
  ✓  170 [mobile-360] › e2e/admin-translations-console.spec.ts:408:3 › U4b translations console › TR-10 translator card proves both permission states (12.8s)
  ✓  168 [mobile-360] › e2e/admin-translations-data.spec.ts:452:3 › U4b translations console › TR-26 the Data scope approves every machine-filled content name (17.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37233659011-1-3064-2-jcc9fq@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37233659011-1-3064-3-fnbome@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 0aa8ed88-0aa6-42d1-978d-17c13629f838: []
  ✓  172 [mobile-360] › e2e/admin-translations-data.spec.ts:587:3 › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else (9.0s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘   62 [desktop-1280] › e2e/locations-tree.spec.ts:104:3 › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves (922ms)
--- final 10 lines ---
-  182 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:739:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar
  ✓  183 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:940:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (9.6s)
  ✓  181 [desktop-1280] › e2e/post-wizard-place.spec.ts:1402:3 › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling (17.5s)
  ✓  184 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:961:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (14.3s)
  ✓  185 [desktop-1280] › e2e/post-wizard-place.spec.ts:1440:3 › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) (13.8s)
  ✓  186 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1026:3 › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) (9.2s)
  ✓  187 [desktop-1280] › e2e/post-wizard-place.spec.ts:1624:3 › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336) (9.2s)
  ✓  188 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1060:3 › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9) (8.1s)
  ✓  189 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1078:3 › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) (14.1s)
```

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
