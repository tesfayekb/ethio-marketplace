# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35500698825
- Commit: `95ff2b199a0c058aa045a897ac782a3095a267c9`
- Attempt: 1
- Written (UTC): 2026-09-20T09:04:58.980Z
- Passed: 844 · Skipped: 74 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 64 user(s) owned by process 35500698825-6
```

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 172000ms exceeded.
```

Context:

```text
          - listitem [ref=e429]:
            - generic [ref=e430]: ስለ እኛ
          - listitem [ref=e431]:
            - generic [ref=e432]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e433]:
        - heading "እገዛ" [level=2] [ref=e434]
        - list [ref=e435]:
          - listitem [ref=e436]:
            - generic [ref=e437]: ደህንነት
          - listitem [ref=e438]:
            - generic [ref=e439]: ያግኙን
      - navigation "ሕጋዊ" [ref=e440]:
        - heading "ሕጋዊ" [level=2] [ref=e441]
        - list [ref=e442]:
          - listitem [ref=e443]:
            - generic [ref=e444]: ውሎች
          - listitem [ref=e445]:
            - generic [ref=e446]: ግላዊነት
    - paragraph [ref=e448]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 6`
- Project: `desktop-1280`

```text
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: 'E2E-Scratch-XA-6-0', exact: true })

```

Context:

```text
          - listitem [ref=e264]:
            - generic [ref=e265]: About
          - listitem [ref=e266]:
            - generic [ref=e267]: How it works
      - navigation "Help" [ref=e268]:
        - heading "Help" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: Safety
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Legal" [ref=e275]:
        - heading "Legal" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Terms
          - listitem [ref=e280]:
            - generic [ref=e281]: Privacy
    - paragraph [ref=e283]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
