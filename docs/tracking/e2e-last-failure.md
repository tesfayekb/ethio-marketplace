# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35857823558
- Commit: `ad565a37ec2f0e2fd3b0743a111c5c97c9855939`
- Attempt: 1
- Written (UTC): 2026-09-23T12:17:41.506Z
- Passed: 994 · Skipped: 78 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): shard 4, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › app shell › the feed body is centred with equal left and right gutters — TypeError: Cannot read properties of null (reading 'x')
- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 1935 stable+own rows against a 1934-row expectation
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log — Error: [e2e:u3] granting moderator failed: TypeError: fetch failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo — Error: [e2e:cat-ie] pointer for e2e-cat-4-5-keqxzd failed: TypeError: fetch failed

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING failed to delete 2363f41b-6533-4eea-9e7d-bdeb08e1bf50: fetch failed — deferred to the nightly sweep
[e2e:teardown] deleted 37 user(s) owned by process 35857823558-4, 1 deferred to the nightly sweep
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 104 user(s) owned by process 35857823558-changed
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-import-counts')
Expected: visible
Timeout: 120000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 120000ms
  - waiting for getByTestId('category-import-counts')

```

Context:

```text
  - dialog "Import categories" [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - generic [ref=e9]:
        - generic [ref=e10]: Categories file
        - button "Categories file" [ref=e11]
        - generic [ref=e12]:
          - button "Choose Categories file…" [ref=e13] [cursor=pointer]
          - generic [ref=e14]: categories.csv
      - button "Preview changes" [ref=e15] [cursor=pointer]
      - alert [ref=e16]: The import could not be completed.
      - paragraph [ref=e17]: "Reason: canceling statement due to statement timeout"
      - button "Discard" [ref=e19] [cursor=pointer]
    - button "Close" [ref=e20] [cursor=pointer]:
      - img [ref=e21]
      - generic [ref=e24]: Close
```
```

## admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] destroying QS failed at close: TypeError: fetch failed
```

Context:

```text
          - listitem [ref=e266]:
            - generic [ref=e267]: About
          - listitem [ref=e268]:
            - generic [ref=e269]: How it works
      - navigation "Help" [ref=e270]:
        - heading "Help" [level=2] [ref=e271]
        - list [ref=e272]:
          - listitem [ref=e273]:
            - generic [ref=e274]: Safety
          - listitem [ref=e275]:
            - generic [ref=e276]: Contact
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - generic [ref=e281]: Terms
          - listitem [ref=e282]:
            - generic [ref=e283]: Privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/categories/import preview_failed canceling statement due to statement timeout ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 4

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/admin/categories/import ({"error":"server error","message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/admin/categories/import ({"error":"server error","message":"canceling statement due to statement timeout"})
console.error: [client-error] gate fetch threw
```
