# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35110949027
- Commit: `d7eb0f2ef814bb750cdea0f6b3a62ee2736b01b0`
- Attempt: 1
- Written (UTC): 2026-09-16T14:58:28.744Z
- Passed: 764 · Skipped: 74 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 2, changed
- Sources without results: none

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 63 user(s) owned by process 35110949027-2
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 25 user(s) owned by process 35110949027-changed
```

## admin-coverage.spec.ts › L2b coverage console › CV-4 refusal: a limit below one is refused by name and nothing is saved

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 3
```

Context:

```text
      - generic [ref=e11]:
        - generic [ref=e12]: Regions at most
        - textbox "Regions at most" [ref=e13]: "1"
        - paragraph [ref=e14]: At least 1.
      - generic [ref=e15]:
        - generic [ref=e16]: Countries at most
        - textbox "Countries at most" [ref=e17]: "1"
        - paragraph [ref=e18]: At least 1.
      - generic [ref=e19]:
        - checkbox "Allow everywhere" [ref=e20]
        - generic [ref=e21]: Allow everywhere
      - paragraph [ref=e22]: A plan can be edited, never removed.
      - alert [ref=e23]: Every limit is at least 1.
      - generic [ref=e24]:
        - button "Cancel" [ref=e25] [cursor=pointer]
        - button "Save" [active] [ref=e26] [cursor=pointer]
    - button "Close" [ref=e27] [cursor=pointer]:
      - img [ref=e28]
      - generic [ref=e31]: Close
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).
