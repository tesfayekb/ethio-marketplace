# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37396290413
- Commit: `6255a7214fecfd79acac3e3f41f1fe217a4f15d9`
- Attempt: 1
- Written (UTC): 2026-10-06T01:04:19.684Z
- Passed: 1 · Skipped: 0 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

62 line(s), 27 message(s): 1 off the allowlist, 26 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 5 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `countries badHeader` (quiet) | 1 | shard 5 |
| `countries nulByte` (quiet) | 1 | shard 5 |
| `countries tooManyRows` (quiet) | 1 | shard 5 |
| `countries unknownColumn` (quiet) | 1 | shard 5 |
| `countries wrongFile` (quiet) | 1 | shard 5 |
| `listing not found` | 1 | shard 6 |
| `strings emptyFile` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×6 · too many previews ×5 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · countries badHeader ×1 · countries nulByte ×1 · countries tooManyRows ×1 · countries unknownColumn ×1 · countries wrongFile ×1 · strings emptyFile ×1

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, changed · unavailable: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-06T00:55:40.901Z | 0.3 min |
| changed | 2026-10-06T00:55:34.732Z | 2.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `posting-routes-dials.spec.ts` | 8 | 3.6 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `posting-routes-dials.spec.ts` › PR-29 renew_listing counts against the revise dial | desktop-1280 | 31.8 s |
| `posting-routes-dials.spec.ts` › PR-29 renew_listing counts against the revise dial | mobile-360 | 31.2 s |
| `posting-routes-dials.spec.ts` › PR-30 set_listing_pin counts against the revise dial | desktop-1280 | 29.7 s |
| `posting-routes-dials.spec.ts` › PR-30 set_listing_pin counts against the revise dial | mobile-360 | 29.2 s |
| `posting-routes-dials.spec.ts` › PR-28 transition_listing counts against the revise dial | mobile-360 | 27.1 s |
| `posting-routes-dials.spec.ts` › PR-28 transition_listing counts against the revise dial | desktop-1280 | 24.9 s |
| `posting-routes-dials.spec.ts` › PR-27 edit_listing counts against the revise dial | desktop-1280 | 23.1 s |
| `posting-routes-dials.spec.ts` › PR-27 edit_listing counts against the revise dial | mobile-360 | 21.9 s |
| `auth-signup.spec.ts` › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle | email-serial | 4.6 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37396290413-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37396290413-changed
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: second edit_listing: {"data":null,"error":"edit_listing takes a published listing; a draft writes through submit_listing"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: second transition_listing: {"data":null,"error":"new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: second renew_listing: {"data":{"ok":false,"refusals":[{"field":"status","reason":"renewNeedsActive"}]},"error":null}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-30 set_listing_pin counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: second set_listing_pin: {"data":{"ok":true,"pin_lat":null,"pin_lng":null,"pin_zoom":null,"directions":null,"pin_precision":null,"street_address":null},"error":null}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: second edit_listing: {"data":null,"error":"edit_listing takes a published listing; a draft writes through submit_listing"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: About
          - listitem [ref=e318]:
            - generic [ref=e319]: How it works
      - navigation "Help" [ref=e320]:
        - heading "Help" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Safety
          - listitem [ref=e325]:
            - generic [ref=e326]: Contact
      - navigation "Legal" [ref=e327]:
        - heading "Legal" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Terms
          - listitem [ref=e332]:
            - generic [ref=e333]: Privacy
    - paragraph [ref=e335]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: second transition_listing: {"data":null,"error":"new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: About
          - listitem [ref=e318]:
            - generic [ref=e319]: How it works
      - navigation "Help" [ref=e320]:
        - heading "Help" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Safety
          - listitem [ref=e325]:
            - generic [ref=e326]: Contact
      - navigation "Legal" [ref=e327]:
        - heading "Legal" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Terms
          - listitem [ref=e332]:
            - generic [ref=e333]: Privacy
    - paragraph [ref=e335]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: second renew_listing: {"data":{"ok":false,"refusals":[{"field":"status","reason":"renewNeedsActive"}]},"error":null}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: About
          - listitem [ref=e318]:
            - generic [ref=e319]: How it works
      - navigation "Help" [ref=e320]:
        - heading "Help" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Safety
          - listitem [ref=e325]:
            - generic [ref=e326]: Contact
      - navigation "Legal" [ref=e327]:
        - heading "Legal" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Terms
          - listitem [ref=e332]:
            - generic [ref=e333]: Privacy
    - paragraph [ref=e335]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-30 set_listing_pin counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: second set_listing_pin: {"data":{"ok":true,"pin_lat":null,"pin_lng":null,"pin_zoom":null,"directions":null,"pin_precision":null,"street_address":null},"error":null}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: About
          - listitem [ref=e318]:
            - generic [ref=e319]: How it works
      - navigation "Help" [ref=e320]:
        - heading "Help" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Safety
          - listitem [ref=e325]:
            - generic [ref=e326]: Contact
      - navigation "Legal" [ref=e327]:
        - heading "Legal" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Terms
          - listitem [ref=e332]:
            - generic [ref=e333]: Privacy
    - paragraph [ref=e335]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×8
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
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
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×16
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   80 [desktop-1280] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (9.0s)
  ✓   81 [desktop-1280] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (8.9s)
  ✓   82 [desktop-1280] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (8.1s)
  ✓   83 [desktop-1280] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (7.2s)
  ✓   84 [desktop-1280] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (5.9s)
  ✓   85 [desktop-1280] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (10.0s)
  ✓   86 [desktop-1280] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (12.7s)
  ✓   87 [desktop-1280] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (11.3s)
  ✓   88 [desktop-1280] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (7.7s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
  ✘   31 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1307:3 › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record (3.0m)
--- final 10 lines ---
✓   53 [mobile-360] › e2e/admin-attributes-library.spec.ts:788:3 › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety (8.9s)
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied
  ✓   55 [mobile-360] › e2e/admin-attributes-library.spec.ts:909:3 › C3 attributes console › AT-16 a user without categories:view gets 403 and sees no export control (7.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37396290413-1-3054-3-lrt2ak@ethio-e2e.invalid)
  ✓   54 [mobile-360] › e2e/admin-attributes-links.spec.ts:175:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (12.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37396290413-1-3054-2-q5f4zq@ethio-e2e.invalid)
  ✓   56 [mobile-360] › e2e/admin-attributes-library.spec.ts:1028:3 › C3 attributes console › AT-17 an inherited row names its origin and clears the child's card flag (11.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37396290413-1-3054-3-lrt2ak@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
  ✓   89 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE translations › IG-1 translations: malformed, foreign, oversized and unreadable files are refused whole (3.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37396290413-2-3030-2-hwmknt@ethio-e2e.invalid)
  ✓   91 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE translations › IG-2 translations: dangerous cells refuse their own row and name the reason (3.3s)
  ✓   90 [mobile-360] › e2e/mfa-stepup.spec.ts:355:3 › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint @private-identity (6.3s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (9) ---
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
  ✘   53 [mobile-360] › e2e/posting-routes-dials.spec.ts:128:3 › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial (9.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
  ✘   55 [mobile-360] › e2e/posting-routes-dials.spec.ts:128:3 › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial (retry #1) (11.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
  ✘   57 [mobile-360] › e2e/posting-routes-dials.spec.ts:151:3 › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial (11.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
  ✘   59 [mobile-360] › e2e/posting-routes-dials.spec.ts:151:3 › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial (retry #1) (7.6s)
--- final 10 lines ---
✓   61 [mobile-360] › e2e/posting-routes-dials.spec.ts:163:3 › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial (8.3s)
  ✓   60 [mobile-360] › e2e/post-wizard-specs.spec.ts:2111:3 › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides (12.3s)
  ✓   62 [mobile-360] › e2e/posting-routes-dials.spec.ts:172:3 › POSTING DOOR DIALS › PR-30 set_listing_pin counts against the revise dial (7.5s)
  ✓   63 [mobile-360] › e2e/post-wizard-specs.spec.ts:2173:3 › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not (13.1s)
  ✓   64 [mobile-360] › e2e/posting-routes-identity.spec.ts:40:3 › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked (15.4s)
  ✓   65 [mobile-360] › e2e/post-wizard-specs.spec.ts:2248:3 › POSTING WIZARD › PW-50 the specifications show every row open in display order (D41) (11.0s)
  ✓   66 [mobile-360] › e2e/posting-routes.spec.ts:93:3 › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once (8.9s)
  ✓   67 [mobile-360] › e2e/post-wizard-specs.spec.ts:2293:3 › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on (12.1s)
  ✓   68 [mobile-360] › e2e/posting-routes.spec.ts:123:3 › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 (8.9s)
```

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×8
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
  ✘   20 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:856:3 › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere (3.0m)
  ✘   49 [desktop-1280] › e2e/admin-attributes-library.spec.ts:503:3 › C3 attributes console › AT-11 remove from category unlinks it and the chip disappears (DB truth) (31.2s)
--- final 10 lines ---
✓   63 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1028:3 › C3 attributes console › AT-17 an inherited row names its origin and clears the child's card flag (7.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37396290413-4-2869-2-qev23k@ethio-e2e.invalid)
  ✓   64 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1065:3 › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin (6.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37396290413-4-2869-2-qev23k@ethio-e2e.invalid)
  ✓   65 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1127:3 › C3 attributes console › AT-19 an inherited row has no write verb and the write RPCs refuse it (8.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37396290413-4-2869-2-qev23k@ethio-e2e.invalid)
  ✓   62 [desktop-1280] › e2e/admin-attributes-links.spec.ts:597:3 › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link (31.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37396290413-4-2869-3-wlawa0@ethio-e2e.invalid)
  ✓   66 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1215:3 › C3 attributes console › AT-36 a secondary parent confers nothing, a primary parent confers (11.1s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37396290413-5-2839-3-lp8izm@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
  ✓   83 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE locations-countries › IG-1 locations-countries: malformed, foreign, oversized and unreadable files are refused whole (2.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37396290413-5-2839-3-lp8izm@ethio-e2e.invalid)
  ✓   84 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE locations-countries › IG-2 locations-countries: dangerous cells refuse their own row and name the reason (3.9s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
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
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   43 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1437:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (15.9s)
[PW-98 fresh] city={"x":430,"y":274,"width":316,"height":44} tick={"x":430,"y":422,"width":20,"height":20} line=<div data-testid="post-where-row" data-key="primary" data-item="1" data-red="0" class="space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ms-1 md:ms-6 border-input"><div class="space-y-2"><div class="space-y-1"><label for="post-where-city" class="text-sm font-medium text-foreground">City</label><select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Choose one</opti
[PW-98 prefilled] city={"x":430,"y":274,"width":316,"height":44} tick={"x":430,"y":422,"width":20,"height":20} line=<div data-testid="post-where-row" data-key="primary" data-item="1" data-red="0" class="space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ms-1 md:ms-6 border-input"><div class="space-y-2"><div class="space-y-1"><label for="post-where-city" class="text-sm font-medium text-foreground">City</label><select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Choose one</opti
  ✓   44 [desktop-1280] › e2e/post-wizard-where.spec.ts:686:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-98 the item tick sits on the city line, fresh and prefilled (27.9s)
  ✓   45 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1607:3 › POSTING WIZARD › PW-58 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45) (15.8s)
  ✓   46 [desktop-1280] › e2e/post-wizard-where.spec.ts:717:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-99 the place boxes step in; every select stays at least 200 px (16.8s)
  ✓   47 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1659:3 › POSTING WIZARD › PW-159 a list fact ticks its tick list once, and the seller's untick stays (16.4s)
  ✓   48 [desktop-1280] › e2e/post-wizard-where.spec.ts:791:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-100 every category offers the map; after Save the preview shows the pin (13.4s)
  ✓   49 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1740:3 › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range (18.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
