# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35498102136
- Commit: `a1d91ef735df1f93604e1eb6e18923f5c530904f`
- Attempt: 2
- Written (UTC): 2026-09-20T08:14:02.855Z
- Passed: 841 · Skipped: 74 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row — Error: expect(received).toBeGreaterThan(expected)
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further — Error: reachStep7: no region carried the city addis-ababa.

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e217]:
            - generic [ref=e218]: ስለ እኛ
          - listitem [ref=e219]:
            - generic [ref=e220]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e221]:
        - heading "እገዛ" [level=2] [ref=e222]
        - list [ref=e223]:
          - listitem [ref=e224]:
            - generic [ref=e225]: ደህንነት
          - listitem [ref=e226]:
            - generic [ref=e227]: ያግኙን
      - navigation "ሕጋዊ" [ref=e228]:
        - heading "ሕጋዊ" [level=2] [ref=e229]
        - list [ref=e230]:
          - listitem [ref=e231]:
            - generic [ref=e232]: ውሎች
          - listitem [ref=e233]:
            - generic [ref=e234]: ግላዊነት
    - paragraph [ref=e236]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
