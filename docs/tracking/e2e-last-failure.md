# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35023696115
- Commit: `a06e8221235db6a39830197c7bca2530de230c55`
- Attempt: 1
- Written (UTC): 2026-09-15T21:17:25.868Z
- Passed: 655 · Skipped: 72 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): shard 1, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids — Error: expect(locator).toContainText(expected) failed

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 32 user(s) owned by process 35023696115-1
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 9 user(s) owned by process 35023696115-changed
```

## admin-locations.spec.ts › L2a locations console › LT-9b roster shape, card twin: the edit icon sits inline beside the path line

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia-card')
Expected substring: "ethiopia"
Received string:    "EthiopiaCountryEthiopiaActive"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia-card')
    14 × locator resolved to <div class="min-w-0 space-y-1" data-testid="location-ethiopia-card">…</div>
       - unexpected value "EthiopiaCountryEthiopiaActive"

```

Context:

```text
          - listitem [ref=e472]:
            - generic [ref=e473]: About
          - listitem [ref=e474]:
            - generic [ref=e475]: How it works
      - navigation "Help" [ref=e476]:
        - heading "Help" [level=2] [ref=e477]
        - list [ref=e478]:
          - listitem [ref=e479]:
            - generic [ref=e480]: Safety
          - listitem [ref=e481]:
            - generic [ref=e482]: Contact
      - navigation "Legal" [ref=e483]:
        - heading "Legal" [level=2] [ref=e484]
        - list [ref=e485]:
          - listitem [ref=e486]:
            - generic [ref=e487]: Terms
          - listitem [ref=e488]:
            - generic [ref=e489]: Privacy
    - paragraph [ref=e491]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-9b roster shape, card twin: the edit icon sits inline beside the path line

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia-card')
Expected substring: "ethiopia"
Received string:    "EthiopiaCountryEthiopiaActive"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia-card')
    14 × locator resolved to <div class="min-w-0 space-y-1" data-testid="location-ethiopia-card">…</div>
       - unexpected value "EthiopiaCountryEthiopiaActive"

```

Context:

```text
          - listitem [ref=e472]:
            - generic [ref=e473]: About
          - listitem [ref=e474]:
            - generic [ref=e475]: How it works
      - navigation "Help" [ref=e476]:
        - heading "Help" [level=2] [ref=e477]
        - list [ref=e478]:
          - listitem [ref=e479]:
            - generic [ref=e480]: Safety
          - listitem [ref=e481]:
            - generic [ref=e482]: Contact
      - navigation "Legal" [ref=e483]:
        - heading "Legal" [level=2] [ref=e484]
        - list [ref=e485]:
          - listitem [ref=e486]:
            - generic [ref=e487]: Terms
          - listitem [ref=e488]:
            - generic [ref=e489]: Privacy
    - paragraph [ref=e491]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
