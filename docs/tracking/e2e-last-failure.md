# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37166386469
- Commit: `6f2620d6fdb959c360a63194f84a8bc842dc860f`
- Attempt: 1
- Written (UTC): 2026-10-04T01:16:41.799Z
- Passed: 826 · Skipped: 66 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 2, shard 3, shard 4, shard 6, changed
- Sources without results: shard 1, shard 5

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate — Error: [INC-113] url: http://127.0.0.1:4173/
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `smoke`
- Project: `mobile-360`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"degraded":false,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) · stars: (none) · menu closed (options are portalled)

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "am",
    "en",
    "x-default",
+   "zxb-20mo",
  ]
```

Context:

```text
          - listitem [ref=e71]:
            - generic [ref=e72]: About
          - listitem [ref=e73]:
            - generic [ref=e74]: How it works
      - navigation "Help" [ref=e75]:
        - heading "Help" [level=2] [ref=e76]
        - list [ref=e77]:
          - listitem [ref=e78]:
            - generic [ref=e79]: Safety
          - listitem [ref=e80]:
            - generic [ref=e81]: Contact
      - navigation "Legal" [ref=e82]:
        - heading "Legal" [level=2] [ref=e83]
        - list [ref=e84]:
          - listitem [ref=e85]:
            - generic [ref=e86]: Terms
          - listitem [ref=e87]:
            - generic [ref=e88]: Privacy
    - paragraph [ref=e90]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 5, shard 6, changed |
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

- Count: 7 · Sources: shard 3, shard 5, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 2, shard 3, shard 4, shard 6, changed · unavailable: shard 1, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T00:56:44.406Z | 14.7 min |
| email | 2026-10-04T00:56:33.275Z | 0.2 min |
| shard 2 | 2026-10-04T00:56:37.833Z | 17.6 min |
| shard 3 | 2026-10-04T00:56:48.482Z | 17.5 min |
| shard 4 | 2026-10-04T00:56:39.844Z | 19.5 min |
| shard 6 | 2026-10-04T00:56:34.977Z | 13.5 min |
| changed | 2026-10-04T00:56:41.317Z | 13.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 62 | 18.1 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 54 | 18.1 min | shard 2, changed |
| `shell.spec.ts` | 252 | 16.6 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 45 | 11.0 min | shard 2, changed |
| `post-wizard-where.spec.ts` | 28 | 9.0 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 44 | 6.7 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 16 | 6.6 min | shard 3 |
| `auth-signout.spec.ts` | 33 | 6.4 min | smoke, shard 2 |
| `post-wizard-resets.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 20 | 5.8 min | shard 4 |
| `post-wizard-category.spec.ts` | 20 | 4.3 min | shard 2 |
| `admin-attributes-editor.spec.ts` | 17 | 4.2 min | shard 4 |
| `admin-categories-lifecycle.spec.ts` | 20 | 4.1 min | shard 4 |
| `admin-categories-console.spec.ts` | 16 | 4.0 min | shard 4 |
| `admin-attributes-links.spec.ts` | 11 | 3.6 min | shard 4 |
| `admin-users.spec.ts` | 11 | 3.1 min | shard 2 |
| `import-security.spec.ts` | 17 | 3.0 min | shard 2 |
| `admin-translations-console.spec.ts` | 18 | 2.7 min | shard 4 |
| `photo-pipeline.spec.ts` | 10 | 2.6 min | shard 2 |
| `admin-attributes-import.spec.ts` | 16 | 2.6 min | shard 4 |
| `admin-locations.spec.ts` | 17 | 2.5 min | shard 4 |
| `admin-roles.spec.ts` | 12 | 2.3 min | shard 4 |
| `admin-countries.spec.ts` | 8 | 1.5 min | shard 4 |
| `admin-audit.spec.ts` | 5 | 1.5 min | shard 4 |
| `admin-translations-governance.spec.ts` | 4 | 1.3 min | shard 2 |
| `admin-translations-data.spec.ts` | 4 | 1.2 min | shard 2 |
| `mfa-stepup.spec.ts` | 9 | 1.2 min | shard 2 |
| `post-wizard-finder.spec.ts` | 4 | 0.8 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `category-image-routes.spec.ts` | 5 | 0.7 min | shard 2 |
| `admin-shell.spec.ts` | 5 | 0.7 min | shard 4 |
| `admin-coverage.spec.ts` | 7 | 0.6 min | shard 4 |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 2 | 0.4 min | shard 2 |
| `settings.spec.ts` | 4 | 0.4 min | shard 3 |
| `admin-categories-images.spec.ts` | 1 | 0.4 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `i18n-coverage.spec.ts` | 4 | 0.3 min | shard 2 |
| `i18n-bundle.spec.ts` | 2 | 0.3 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `category-nav.spec.ts` | 5 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `layout.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 5 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-pricing.spec.ts` › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages | mobile-360 | 71.0 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | mobile-360 | 60.8 s |
| `post-wizard-place.spec.ts` › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged | desktop-1280 | 56.8 s |
| `post-wizard-place.spec.ts` › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged | mobile-360 | 53.8 s |
| `post-wizard-place.spec.ts` › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged | mobile-360 | 46.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 37.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 37.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 37.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 37.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 36.7 s |
| `post-wizard-pricing.spec.ts` › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) | mobile-360 | 35.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.6 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | mobile-360 | 34.6 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 34.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37166386469-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37166386469-email
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37166386469-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37166386469-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37166386469-4
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37166386469-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37166386469-changed
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-who-value-phone')
Expected: "911234567"
Received: "91 123 4567"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('post-who-value-phone')
    14 × locator resolved to <input dir="ltr" inputmode="tel" value="91 123 4567" placeholder="911234567" id="post-who-value-phone" autocomplete="tel-national" data-testid="post-who-value-phone" class="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"/>
       - unexpected value "91 123 4567"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-mobile-360`

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-who-value-phone')
Expected: "911234567"
Received: "91 123 4567"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('post-who-value-phone')
    14 × locator resolved to <input dir="ltr" inputmode="tel" value="91 123 4567" placeholder="911234567" id="post-who-value-phone" autocomplete="tel-national" data-testid="post-who-value-phone" class="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"/>
       - unexpected value "91 123 4567"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-who-value-phone')
Expected: "911234567"
Received: "91 123 4567"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('post-who-value-phone')
    14 × locator resolved to <input dir="ltr" inputmode="tel" value="91 123 4567" placeholder="911234567" id="post-who-value-phone" autocomplete="tel-national" data-testid="post-who-value-phone" class="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"/>
       - unexpected value "91 123 4567"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-desktop-1280`

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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```

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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×5
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
  ✘  147 [mobile-360] › e2e/admin-locations.spec.ts:975:3 › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope (22.2s)
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37166386469-1-3059-3-qodn65@ethio-e2e.invalid)
  ✓  167 [mobile-360] › e2e/admin-translations-console.spec.ts:408:3 › U4b translations console › TR-10 translator card proves both permission states (12.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37166386469-1-3059-3-qodn65@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 3191f1e2-d742-48af-910e-8c8b4346a4d3: []
  ✓  168 [mobile-360] › e2e/admin-translations-console.spec.ts:500:3 › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision (13.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37166386469-1-3059-3-qodn65@ethio-e2e.invalid)
  ✓  169 [mobile-360] › e2e/admin-translations-console.spec.ts:566:3 › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key (7.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37166386469-1-3059-3-qodn65@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 3191f1e2-d742-48af-910e-8c8b4346a4d3: []
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
--- error lines (10) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  141 [desktop-1280] › e2e/post-wizard-place.spec.ts:547:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (22.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  142 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (23.3s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  143 [desktop-1280] › e2e/post-wizard-place.spec.ts:547:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (retry #1) (22.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  144 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (22.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  153 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:458:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (24.4s)
--- final 10 lines ---
✓  165 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:635:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (7.4s)
  ✓  164 [desktop-1280] › e2e/post-wizard-place.spec.ts:1287:3 › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line (12.3s)
  ✓  166 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:668:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (13.3s)
  ✓  167 [desktop-1280] › e2e/post-wizard-place.spec.ts:1321:3 › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point (14.4s)
  ✓  168 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:689:3 › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from photos reopens details (INC-315) (10.5s)
  -  170 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:715:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar
  ✓  169 [desktop-1280] › e2e/post-wizard-place.spec.ts:1358:3 › POSTING WIZARD › PW-40 removing the pin clears all four columns (11.1s)
  ✓  171 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:885:3 › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control (9.6s)
  ✓  172 [desktop-1280] › e2e/post-wizard-place.spec.ts:1382:3 › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling (17.8s)
```

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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×5
```
