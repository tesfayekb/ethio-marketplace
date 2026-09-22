# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35671252321
- Commit: `13c7630a111e17a7f6c94efed1d45e20cddf433b`
- Attempt: 2
- Written (UTC): 2026-09-22T02:38:32.476Z
- Passed: 969 · Skipped: 76 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · rbac.spec.ts › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home — Error: [e2e:users] admin.createUser failed for e2e+35671252321-6-1-9-ow4csd@ethio-e2e.invalid: fetch failed

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING failed to delete f791f7c5-52cf-48b9-bfe5-1d749acd5eec: fetch failed — deferred to the nightly sweep
[e2e:teardown] WARNING failed to delete ed599be9-5086-4ec2-930a-e090ebbd1149: fetch failed — deferred to the nightly sweep
[e2e:teardown] WARNING failed to delete 8945dda7-8158-498b-8b44-11b3a51c524c: fetch failed — deferred to the nightly sweep
[e2e:teardown] WARNING failed to delete b3c27110-7050-4433-8d00-00ff7d3d549d: fetch failed — deferred to the nightly sweep
[e2e:teardown] deleted 62 user(s) owned by process 35671252321-6, 4 deferred to the nightly sweep
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 91 user(s) owned by process 35671252321-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-photo-tile')
Expected: "stored"
Received: "failed"
Timeout:  45000ms

Call log:
  - Expect "toHaveAttribute" with timeout 45000ms
  - waiting for getByTestId('post-photo-tile')
    2 × locator resolved to <li data-state="preparing" data-testid="post-photo-tile" class="space-y-2 rounded-md border border-border p-2">…</li>
      - unexpected value "preparing"
    3 × locator resolved to <li data-state="uploading" data-testid="post-photo-tile" class="space-y-2 rounded-md border border-border p-2">…</li>
      - unexpected value "uploading"
    44 × locator resolved to <li data-state="failed" data-testid="post-photo-tile" class="space-y-2 rounded-md border border-border p-2">…</li>
       - unexpected value "failed"

```

Context:

```text
          - listitem [ref=e783]:
            - generic [ref=e784]: About
          - listitem [ref=e785]:
            - generic [ref=e786]: How it works
      - navigation "Help" [ref=e787]:
        - heading "Help" [level=2] [ref=e788]
        - list [ref=e789]:
          - listitem [ref=e790]:
            - generic [ref=e791]: Safety
          - listitem [ref=e792]:
            - generic [ref=e793]: Contact
      - navigation "Legal" [ref=e794]:
        - heading "Legal" [level=2] [ref=e795]
        - list [ref=e796]:
          - listitem [ref=e797]:
            - generic [ref=e798]: Terms
          - listitem [ref=e799]:
            - generic [ref=e800]: Privacy
    - paragraph [ref=e802]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/attributes/ee0913fe-cd93-42e8-9aad-853bda44b38a/options Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/attributes/a439beb9-33f1-4194-85d0-ad9b2387c373/options Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
[WebServer] [ssr-error] /api/upload/photo storage put default/ed599be9-5086-4ec2-930a-e090ebbd1149/f497a5eb-453f-4b1d-ab11-49363a9371f0/21b33f25-be6b-4df1-8064-a2581cac8c6b/cover.webp: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch() | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-DomXYHP8.mjs:1478:23)
[WebServer] [ssr-error] /api/upload/photo storage put default/ed599be9-5086-4ec2-930a-e090ebbd1149/f497a5eb-453f-4b1d-ab11-49363a9371f0/b33a435c-bba1-4abb-9daa-9baac5e82ddb/cover.webp: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch() | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-DomXYHP8.mjs:1478:23)
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/upload/photo ({"error":"server error"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/upload/photo ({"error":"server error"})
```
