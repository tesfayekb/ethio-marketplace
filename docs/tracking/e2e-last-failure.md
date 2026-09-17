# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35281783898
- Commit: `0b8c6683fdfdc1307937c991c3e425b7c4b4f1fc`
- Attempt: 1
- Written (UTC): 2026-09-17T22:36:23.748Z
- Passed: 777 · Skipped: 70 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): shard 2, shard 3
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: TR-12 step 3: the guarded bulk run never resolved for scope zxx-de (run-state=running progress=900/1685) — [e2e:INC-210] the guarded outcome never arrived within 90000 ms — waited on getByTestId('ai-bulk-summary').or(getByTestId('ai-bulk-error'))
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 1684 stable+own rows against a 1685-row expectation
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — Test timeout of 180000ms exceeded.

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 70 user(s) owned by process 35281783898-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 59 user(s) owned by process 35281783898-3
```

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: TR-12 step 3: the guarded bulk run never resolved for scope zxx-mo (run-state=running progress=600/1685) — [e2e:INC-210] the guarded outcome never arrived within 90000 ms — waited on getByTestId('ai-bulk-summary').or(getByTestId('ai-bulk-error'))

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 90000ms exceeded while waiting on the predicate
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

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 180000ms exceeded.
```

Context:

```text
          - listitem [ref=e79]:
            - generic [ref=e80]: About
          - listitem [ref=e81]:
            - generic [ref=e82]: How it works
      - navigation "Help" [ref=e83]:
        - heading "Help" [level=2] [ref=e84]
        - list [ref=e85]:
          - listitem [ref=e86]:
            - generic [ref=e87]: Safety
          - listitem [ref=e88]:
            - generic [ref=e89]: Contact
      - navigation "Legal" [ref=e90]:
        - heading "Legal" [level=2] [ref=e91]
        - list [ref=e92]:
          - listitem [ref=e93]:
            - generic [ref=e94]: Terms
          - listitem [ref=e95]:
            - generic [ref=e96]: Privacy
    - paragraph [ref=e98]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
