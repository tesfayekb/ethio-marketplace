# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35155684382
- Commit: `073f1a8146dfb7943d97f2e85d666ef015ec2208`
- Attempt: 2
- Written (UTC): 2026-09-16T22:16:19.945Z
- Passed: 751 · Skipped: 70 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 2, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else — Error: expect(received).toBe(expected) // Object.is equality

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 61 user(s) owned by process 35155684382-2
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 23 user(s) owned by process 35155684382-changed
```

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: TR-12 step 3: neither the bulk summary nor a run error rendered within 90 s (3 keys queued for scope zxx-mo)

expect(locator).toBeVisible() failed

Locator: getByTestId('ai-bulk-summary').or(getByTestId('ai-bulk-error'))
Expected: visible
Timeout: 90000ms
Error: element(s) not found

Call log:
  - TR-12 step 3: neither the bulk summary nor a run error rendered within 90 s (3 keys queued for scope zxx-mo) with timeout 90000ms
  - waiting for getByTestId('ai-bulk-summary').or(getByTestId('ai-bulk-error'))

```

Context:

```text
          - listitem [ref=e506]:
            - generic [ref=e507]: About
          - listitem [ref=e508]:
            - generic [ref=e509]: How it works
      - navigation "Help" [ref=e510]:
        - heading "Help" [level=2] [ref=e511]
        - list [ref=e512]:
          - listitem [ref=e513]:
            - generic [ref=e514]: Safety
          - listitem [ref=e515]:
            - generic [ref=e516]: Contact
      - navigation "Legal" [ref=e517]:
        - heading "Legal" [level=2] [ref=e518]
        - list [ref=e519]:
          - listitem [ref=e520]:
            - generic [ref=e521]: Terms
          - listitem [ref=e522]:
            - generic [ref=e523]: Privacy
    - paragraph [ref=e525]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```
