# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35559475734
- Commit: `fe2db0ee71491c06761ce8182bd9c08752311622`
- Attempt: 1
- Written (UTC): 2026-09-21T04:16:28.450Z
- Passed: 933 · Skipped: 76 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 3, shard 6, changed
- Sources without results: none

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 70 user(s) owned by process 35559475734-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 68 user(s) owned by process 35559475734-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 73 user(s) owned by process 35559475734-changed
```

## posting-routes.spec.ts › POSTING ROUTES › PR-6 the options route is ETag'd: a conditional repeat costs a 304

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "max-age=300"
Received string:    "public, max-age=60, stale-while-revalidate=300"
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-6-the-options-route-is-ETag-d-a-conditional-repeat-costs-a-304-mobile-360`

## posting-routes.spec.ts › POSTING ROUTES › PR-6 the options route is ETag'd: a conditional repeat costs a 304

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "max-age=300"
Received string:    "public, max-age=60, stale-while-revalidate=300"
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-6-the-options-route-is-ETag-d-a-conditional-repeat-costs-a-304-desktop-1280`

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
