# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35490612089
- Commit: `389249326547ab106631559e51c9aeb196fcfbc4`
- Attempt: 1
- Written (UTC): 2026-09-20T05:14:51.929Z
- Passed: 841 · Skipped: 74 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-13 a second city stops the auto-select at the region — Error: the open-market list never carried QR within 20 s
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar — Error: LY-6: the sticky action bar covers the open currency list
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back — Error: expect(received).toBeNull()

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
