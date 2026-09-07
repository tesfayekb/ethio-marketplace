# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34077278329
- Commit: `b438b5c47e075ec53c05c218f964b2e26fb667c3`
- Attempt: 1
- Written (UTC): 2026-09-07T02:52:44.848Z
- Passed: 458 · Skipped: 67 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one — Error: entity stats never moved below 2
- FLAKY (passed on retry) · `mobile-360` · source `changed` · category-nav.spec.ts › category selection navigates › C-2: the rail highlight follows the URL — Error: expect(locator).toHaveText(expected) failed

## admin-attributes.spec.ts › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 25
Received: 44

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e861]:
            - generic [ref=e862]: About
          - listitem [ref=e863]:
            - generic [ref=e864]: How it works
      - navigation "Help" [ref=e865]:
        - heading "Help" [level=2] [ref=e866]
        - list [ref=e867]:
          - listitem [ref=e868]:
            - generic [ref=e869]: Safety
          - listitem [ref=e870]:
            - generic [ref=e871]: Contact
      - navigation "Legal" [ref=e872]:
        - heading "Legal" [level=2] [ref=e873]
        - list [ref=e874]:
          - listitem [ref=e875]:
            - generic [ref=e876]: Terms
          - listitem [ref=e877]:
            - generic [ref=e878]: Privacy
    - paragraph [ref=e880]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 25
Received: 44

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e861]:
            - generic [ref=e862]: About
          - listitem [ref=e863]:
            - generic [ref=e864]: How it works
      - navigation "Help" [ref=e865]:
        - heading "Help" [level=2] [ref=e866]
        - list [ref=e867]:
          - listitem [ref=e868]:
            - generic [ref=e869]: Safety
          - listitem [ref=e870]:
            - generic [ref=e871]: Contact
      - navigation "Legal" [ref=e872]:
        - heading "Legal" [level=2] [ref=e873]
        - list [ref=e874]:
          - listitem [ref=e875]:
            - generic [ref=e876]: Terms
          - listitem [ref=e877]:
            - generic [ref=e878]: Privacy
    - paragraph [ref=e880]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
