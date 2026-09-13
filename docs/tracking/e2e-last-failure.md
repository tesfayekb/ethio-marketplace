# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34753266967
- Commit: `cc4e4cfdd568239e24db95fd91fd19267d66e20f`
- Attempt: 1
- Written (UTC): 2026-09-13T11:09:02.139Z
- Passed: 592 · Skipped: 69 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 2, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) — Test timeout of 60000ms exceeded.

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 58 user(s) owned by process 34753266967-2
    Error: entity stats never moved below 5
    expect(received).toBeLessThan(expected)
    Expected: < 5
    Received:   5
    Call Log:
    - Timeout 30000ms exceeded while waiting on the predicate
      325 |       // STATS MOVE — the same count, re-read from the server, has dropped.
      326 |       await gotoReady(page, `/admin/translations/${fence}?scope=data`);
    > 327 |       await expect
          |       ^
      328 |         .poll(
      329 |           async () => {
      330 |             const bar = page.getByTestId("ai-bulk-start");
        at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:327:7
    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/admin-translations-data-U4-9ee2e-then-every-untranslated-one-mobile-360/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────
    Error Context: test-results/admin-translations-data-U4-9ee2e-then-every-untranslated-one-mobile-360/error-context.md
    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/admin-translations-data-U4-9ee2e-then-every-untranslated-one-mobile-360/trace.zip
    Usage:
        npx playwright show-trace test-results/admin-translations-data-U4-9ee2e-then-every-untranslated-one-mobile-360/trace.zip
    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────
    Error: entity stats never moved below 2
    Expected: < 2
    Received:   6
    test-results/admin-translations-data-U4-9ee2e-then-every-untranslated-one-mobile-360-retry1/test-failed-1.png
    Error Context: test-results/admin-translations-data-U4-9ee2e-then-every-untranslated-one-mobile-360-retry1/error-context.md
    test-results/admin-translations-data-U4-9ee2e-then-every-untranslated-one-mobile-360-retry1/trace.zip
        npx playwright show-trace test-results/admin-translations-data-U4-9ee2e-then-every-untranslated-one-mobile-360-retry1/trace.zip
  1 failed
    [mobile-360] › e2e/admin-translations-data.spec.ts:211:3 › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one
  87 passed (6.0m)
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 34753266967-changed
```

## admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: entity stats never moved below 5

expect(received).toBeLessThan(expected)

Expected: < 5
Received:   5

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e523]:
            - generic [ref=e524]: About
          - listitem [ref=e525]:
            - generic [ref=e526]: How it works
      - navigation "Help" [ref=e527]:
        - heading "Help" [level=2] [ref=e528]
        - list [ref=e529]:
          - listitem [ref=e530]:
            - generic [ref=e531]: Safety
          - listitem [ref=e532]:
            - generic [ref=e533]: Contact
      - navigation "Legal" [ref=e534]:
        - heading "Legal" [level=2] [ref=e535]
        - list [ref=e536]:
          - listitem [ref=e537]:
            - generic [ref=e538]: Terms
          - listitem [ref=e539]:
            - generic [ref=e540]: Privacy
    - paragraph [ref=e542]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).
