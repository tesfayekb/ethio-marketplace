# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37179068050
- Commit: `77499b09d71dfa10019797393620accd8c53b600`
- Attempt: 1
- Written (UTC): 2026-10-04T05:31:13.406Z
- Passed: 1144 · Skipped: 75 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-9 coordinates far from every metro stop at the market — Error: [e2e:l4b2] seeding region failed: duplicate key value violates unique constraint "locations_iso_3166_2_unique"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal — Error: PW-132: a free Latin name was not confirmed

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-9 coordinates far from every metro stop at the market

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:l4b2] seeding region failed: duplicate key value violates unique constraint "locations_iso_3166_2_unique"
```

Context: context file not found for `shell-L4b-location-picker-LS-9-coordinates-far-from-every-metro-stop-at-the-market-mobile-360`

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-132: a free Latin name was not confirmed

expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-ok')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-132: a free Latin name was not confirmed with timeout 10000ms
  - waiting for getByTestId('post-who-alias-ok')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-132-a-non-Latin-seller-name-shows-the-Latin-line-as-the-refusal-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

112 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 5, shard 6 |
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
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · commit_failed duplicate key value violates unique constraint <q> ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T05:10:57.339Z | 14.0 min |
| email | 2026-10-04T05:11:05.696Z | 0.3 min |
| shard 1 | 2026-10-04T05:10:57.605Z | 18.5 min |
| shard 2 | 2026-10-04T05:11:10.057Z | 19.7 min |
| shard 3 | 2026-10-04T05:10:54.986Z | 15.7 min |
| shard 4 | 2026-10-04T05:10:58.382Z | 18.9 min |
| shard 5 | 2026-10-04T05:11:29.590Z | 16.5 min |
| shard 6 | 2026-10-04T05:11:07.670Z | 16.3 min |
| changed | 2026-10-04T05:10:57.112Z | 5.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 76 | 20.8 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 62 | 18.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 16.7 min | smoke, shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 9.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.1 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.7 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 28 | 8.5 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 40 | 8.0 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 44 | 8.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 40 | 7.9 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.8 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 36 | 7.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 7.5 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 24 | 7.3 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 32 | 6.8 min | shard 3, shard 5 |
| `import-security.spec.ts` | 34 | 5.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 5.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 5.8 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 34 | 5.0 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 4.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.3 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.8 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.2 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.1 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 4 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-132 a non-Latin seller name shows the Latin line as the refusal | desktop-1280 | 54.7 s |
| `post-wizard-bundle2.spec.ts` › PW-132 a non-Latin seller name shows the Latin line as the refusal | mobile-360 | 51.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 49.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.9 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | desktop-1280 | 44.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 41.6 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 39.5 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 37.1 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 36.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 36.1 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 35.9 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 35.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 35.3 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | desktop-1280 | 34.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 34.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37179068050-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37179068050-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37179068050-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37179068050-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37179068050-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37179068050-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37179068050-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37179068050-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37179068050-changed
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

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-132: a free Latin name was not confirmed

expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-ok')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-132: a free Latin name was not confirmed with timeout 10000ms
  - waiting for getByTestId('post-who-alias-ok')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-132-a-non-Latin-seller-name-shows-the-Latin-line-as-the-refusal-desktop-1280`

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

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
