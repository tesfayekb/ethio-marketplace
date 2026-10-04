# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37168582571
- Commit: `3f4c24c3d71e9aeac6ddf9c5ef6481afa67da474`
- Attempt: 1
- Written (UTC): 2026-10-04T01:58:07.030Z
- Passed: 487 · Skipped: 63 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 3, shard 6, changed
- Sources without results: shard 1, shard 2, shard 4, shard 5

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

103 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 3 | shard 3, shard 6 |
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

- Count: 3 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 3, shard 6, changed · unavailable: shard 1, shard 2, shard 4, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T01:40:30.558Z | 14.4 min |
| email | 2026-10-04T01:40:40.546Z | 0.2 min |
| shard 3 | 2026-10-04T01:40:30.803Z | 16.6 min |
| shard 6 | 2026-10-04T01:40:39.581Z | 16.0 min |
| changed | 2026-10-04T01:40:29.294Z | 14.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 62 | 19.7 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 17.3 min | smoke, shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 36 | 13.9 min | changed |
| `post-wizard-where.spec.ts` | 28 | 9.6 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 32 | 9.2 min | changed |
| `posting-routes.spec.ts` | 44 | 8.7 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 16 | 4.4 min | shard 3 |
| `auth-signout.spec.ts` | 22 | 4.3 min | smoke |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 3 | 0.2 min | smoke, shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | desktop-1280 | 71.8 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 57.0 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | mobile-360 | 46.8 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | desktop-1280 | 44.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 43.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 38.5 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 37.3 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | mobile-360 | 35.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 35.7 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 35.1 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | desktop-1280 | 33.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 32.2 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 32.1 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 32.1 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | mobile-360 | 30.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37168582571-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37168582571-email
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37168582571-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37168582571-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37168582571-changed
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-country-refusal')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-who-country-refusal')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-country-refusal')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-who-country-refusal')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-desktop-1280`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-who-value-phone')
Expected: "91 123 4567"
Received: "911234567"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('post-who-value-phone')
    14 × locator resolved to <input dir="ltr" inputmode="tel" value="911234567" placeholder="911234567" id="post-who-value-phone" autocomplete="tel-national" data-testid="post-who-value-phone" class="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"/>
       - unexpected value "911234567"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-who-value-phone')
Expected: "91 123 4567"
Received: "911234567"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('post-who-value-phone')
    14 × locator resolved to <input dir="ltr" inputmode="tel" value="911234567" placeholder="911234567" id="post-who-value-phone" autocomplete="tel-national" data-testid="post-who-value-phone" class="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"/>
       - unexpected value "911234567"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-desktop-1280`

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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## Server errors: shard 4

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

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37168582571-1-3065-2-tnrzog@ethio-e2e.invalid)
  ✓  158 [mobile-360] › e2e/admin-shell.spec.ts:278:3 › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one (12.7s)
  ✓  161 [mobile-360] › e2e/admin-translations-console.spec.ts:203:3 › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication (3.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37168582571-1-3065-2-tnrzog@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 3051bf80-a21c-49fa-a4ab-d7e3dda0ca5a: []
  ✓  162 [mobile-360] › e2e/admin-translations-console.spec.ts:261:3 › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts (6.6s)
[e2e:l4c] get_my_translator_languages for pooled 0002de57-48de-4ee4-aa5f-d4c1680267ac: []
  ✓  163 [mobile-360] › e2e/admin-translations-console.spec.ts:285:3 › U4b translations console › TR-7b sync after a step-up prompt still reports its counts @private-identity (8.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37168582571-1-3065-2-tnrzog@ethio-e2e.invalid)
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

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (6) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
  ✘  115 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:314:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (28.4s)
  ✘  118 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:314:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (retry #1) (29.7s)
  ✘  158 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (25.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  159 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (24.2s)
--- final 10 lines ---
✓  155 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (14.9s)
  ✓  157 [mobile-360] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (16.2s)
  ✘  158 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (25.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  159 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (24.2s)
  ✓  160 [mobile-360] › e2e/post-wizard-place.spec.ts:547:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (11.0s)
  ✓  161 [mobile-360] › e2e/post-wizard-place.spec.ts:591:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live (14.3s)
PW-30 walk: signed in @ 3453 ms | category and specifications seeded @ 4136 ms | step 3 reached @ 6237 ms | specifications answered @ 6410 ms | step 6 open @ 9453 ms | tree served @ 9694 ms | place chosen @ 9787 ms | review open @ 13353 ms | review labels read @ 13367 ms | buyer preview read @ 13444 ms | Amharic review read @ 13822 ms
  ✓  162 [mobile-360] › e2e/post-wizard-place.spec.ts:684:3 › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans (15.3s)
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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37168582571-4-3066-2-8vjv5h@ethio-e2e.invalid)
  ✓  124 [desktop-1280] › e2e/admin-roles.spec.ts:145:3 › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects (14.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37168582571-4-3066-3-68qap7@ethio-e2e.invalid)
  ✓  125 [desktop-1280] › e2e/admin-locations.spec.ts:142:3 › L2a locations console › LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows (5.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37168582571-4-3066-2-8vjv5h@ethio-e2e.invalid)
  ✓  126 [desktop-1280] › e2e/admin-roles.spec.ts:178:3 › U2 roles console › RP-2 create: a super admin creates a custom role through step-up (8.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37168582571-4-3066-3-68qap7@ethio-e2e.invalid)
  ✓  127 [desktop-1280] › e2e/admin-locations.spec.ts:219:3 › L2a locations console › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down (21.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37168582571-4-3066-2-8vjv5h@ethio-e2e.invalid)
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
--- error lines (6) ---
  ✘   98 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:314:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (29.5s)
  ✘  101 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:314:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (retry #1) (29.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  143 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (24.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  146 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (26.9s)
--- final 10 lines ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  143 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (24.8s)
  ✓  145 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:407:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (11.9s)
  ✓  147 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:422:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (10.9s)
  ✓  148 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:436:3 › POSTING WIZARD › PW-94 a listing card prints its price period (6.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  146 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (26.9s)
  ✓  149 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:458:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (13.7s)
  ✓  150 [desktop-1280] › e2e/post-wizard-place.spec.ts:547:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (12.3s)
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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```
