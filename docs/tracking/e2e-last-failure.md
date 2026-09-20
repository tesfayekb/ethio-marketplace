# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35518290957
- Commit: `575830a8e58cd683f881bfe3ada6b7dc2a503947`
- Attempt: 1
- Written (UTC): 2026-09-20T15:15:24.493Z
- Passed: 717 · Skipped: 72 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): shard 3
- Sources without results: shard 4

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate — Error: [INC-113] url: http://127.0.0.1:4173/
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active — Error: {"error":"not signed in"}

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING failed to delete ca1dbfe3-2eda-4dad-9725-6e7181f70116: fetch failed — deferred to the nightly sweep
[e2e:teardown] deleted 68 user(s) owned by process 35518290957-3, 1 deferred to the nightly sweep
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: upload 4: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
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

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/upload/photo storage put default/71f9dfbf-8fbf-47d6-980f-853f5eac9ed3/4c260c49-e1fb-4e6c-b8a7-c3b81ea46fcc/1088e1a9-27b8-4bbf-b5ad-725a974989fb/cover.png: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch() | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-BMGzdhSw.mjs:1478:23)
[WebServer] [ssr-error] /api/upload/photo storage put default/ec008bdd-1d65-4972-8fb0-f8c88d7f4c8e/c3df2059-ed9c-4120-9cbb-fd16faa6d492/a3b84613-89cd-4b65-a817-b895522ddfa4/cover.png: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch() | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-BMGzdhSw.mjs:1478:23)
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft not signed in The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/upload/photo not signed in The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
[WebServer] [ssr-error] /api/attributes/4719601e-e899-471d-90f4-9981e0ac7f7f/options Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 3

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 401 (Unauthorized)
console.error: [client-error] gate fetch threw
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
