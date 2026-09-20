# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35501302989
- Commit: `a79dded91174f52541cef2605e5930d07bef8725`
- Attempt: 1
- Written (UTC): 2026-09-20T09:19:22.906Z
- Passed: 842 · Skipped: 74 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): shard 3, shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 66 user(s) owned by process 35501302989-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 64 user(s) owned by process 35501302989-6
```

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 172000ms exceeded.
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

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 172000ms exceeded.
```

Context:

```text
          - listitem [ref=e435]:
            - generic [ref=e436]: ስለ እኛ
          - listitem [ref=e437]:
            - generic [ref=e438]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e439]:
        - heading "እገዛ" [level=2] [ref=e440]
        - list [ref=e441]:
          - listitem [ref=e442]:
            - generic [ref=e443]: ደህንነት
          - listitem [ref=e444]:
            - generic [ref=e445]: ያግኙን
      - navigation "ሕጋዊ" [ref=e446]:
        - heading "ሕጋዊ" [level=2] [ref=e447]
        - list [ref=e448]:
          - listitem [ref=e449]:
            - generic [ref=e450]: ውሎች
          - listitem [ref=e451]:
            - generic [ref=e452]: ግላዊነት
    - paragraph [ref=e454]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 6`
- Project: `desktop-1280`

```text
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: 'E2E-Scratch-XK-6-0', exact: true })

```

Context:

```text
          - listitem [ref=e281]:
            - generic [ref=e282]: About
          - listitem [ref=e283]:
            - generic [ref=e284]: How it works
      - navigation "Help" [ref=e285]:
        - heading "Help" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - generic [ref=e289]: Safety
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Legal" [ref=e292]:
        - heading "Legal" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Terms
          - listitem [ref=e297]:
            - generic [ref=e298]: Privacy
    - paragraph [ref=e300]: © 2026 ethio.com — All rights reserved.
```
```

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
