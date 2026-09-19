# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35431333568
- Commit: `c1487d090e8d5221903daf10fb1d8b78ab3b35bc`
- PLATFORM-ORIGIN? the head commit's subject is `Work in progress` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-09-19T08:25:14.801Z
- Passed: 987 · Skipped: 103 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): shard 4, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row — Error: expect(received).toBeGreaterThan(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan — Error: PW-11: the market was not prefilled from the edge
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: expect(locator).toHaveText(expected) failed

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 36 user(s) owned by process 35431333568-4
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 91 user(s) owned by process 35431333568-changed
```

## admin-attributes.spec.ts › C3 attributes console › AT-20 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-20 the round trip was not a no-op: 0 added · 0 changed · 0 unlinked · 0 deleted · 1094 unchanged · 1 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
    "changes": 0,
    "deletes": 0,
-   "refused": 0,
+   "refused": 1,
    "unlinks": 0,
  }
```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import attributes" [active] [ref=e2]:
    - heading "Import attributes" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import attributes
      - paragraph [ref=e6]: Choose the two files you exported. Nothing is written until you confirm the preview.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 0 changed · 0 unlinked · 0 deleted · 1094 unchanged · 1 refused
      - list [ref=e9]:
        - listitem [ref=e10]: Row 76 — Option “e2e_fold_6_1_mm4ybg_md1” carries a field this import does not know
      - generic [ref=e11]:
        - button "Discard" [ref=e12] [cursor=pointer]
        - button "Confirm import" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
