# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35850846689
- Commit: `58fec4eec35117d51330965794fdf07bd2f06283`
- Attempt: 1
- Written (UTC): 2026-09-23T11:04:03.352Z
- Passed: 993 · Skipped: 78 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 6
- Post-test errors (DEC-059, non-gating): shard 3, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar — Error: LY-6: the sticky action bar covers the open currency list
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it — Error: PW-5: no lazy multi-select control was generated for e2e_post_changed_1_bz0y98_multi
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills — Error: expect(locator).toBeVisible() failed

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 75 user(s) owned by process 35850846689-3
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 108 user(s) owned by process 35850846689-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-50 the specifications keep display order and hide only the trailing extras

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-50: the visible details were not in display order

expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 0

  Array [
    "e2e_phone_3_2_0wa07f_brand",
-   "e2e_phone_3_2_0wa07f_series",
-   "e2e_phone_3_2_0wa07f_model",
-   "e2e_phone_3_2_0wa07f_storage",
  ]
```

Context:

```text
          - listitem [ref=e176]:
            - generic [ref=e177]: About
          - listitem [ref=e178]:
            - generic [ref=e179]: How it works
      - navigation "Help" [ref=e180]:
        - heading "Help" [level=2] [ref=e181]
        - list [ref=e182]:
          - listitem [ref=e183]:
            - generic [ref=e184]: Safety
          - listitem [ref=e185]:
            - generic [ref=e186]: Contact
      - navigation "Legal" [ref=e187]:
        - heading "Legal" [level=2] [ref=e188]
        - list [ref=e189]:
          - listitem [ref=e190]:
            - generic [ref=e191]: Terms
          - listitem [ref=e192]:
            - generic [ref=e193]: Privacy
    - paragraph [ref=e195]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-50 the specifications keep display order and hide only the trailing extras

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-50: the visible details were not in display order

expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 0

  Array [
    "e2e_phone_changed_5_gncvgt_brand",
-   "e2e_phone_changed_5_gncvgt_series",
-   "e2e_phone_changed_5_gncvgt_model",
-   "e2e_phone_changed_5_gncvgt_storage",
  ]
```

Context:

```text
          - listitem [ref=e176]:
            - generic [ref=e177]: About
          - listitem [ref=e178]:
            - generic [ref=e179]: How it works
      - navigation "Help" [ref=e180]:
        - heading "Help" [level=2] [ref=e181]
        - list [ref=e182]:
          - listitem [ref=e183]:
            - generic [ref=e184]: Safety
          - listitem [ref=e185]:
            - generic [ref=e186]: Contact
      - navigation "Legal" [ref=e187]:
        - heading "Legal" [level=2] [ref=e188]
        - list [ref=e189]:
          - listitem [ref=e190]:
            - generic [ref=e191]: Terms
          - listitem [ref=e192]:
            - generic [ref=e193]: Privacy
    - paragraph [ref=e195]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×22
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
