# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36407607815 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36407607815
- Commit: `c34b727b89ac53ca68e548423abf6ff2b85ea266`
- Attempt: 1
- Written (UTC): 2026-09-28T10:21:49.643Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 1941 stable+own rows against a 1943-row expectation
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — Error: [e2e:l2b] destroying XG failed at country row: update or delete on table "countries" violates foreign key constraint "locations_country_code_fkey" on table "locations"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back — Error: expect(received).toBeNull()

## Flaky bodies (DEC-078)

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: the CSV export was page-scoped: 1941 stable+own rows against a 1943-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 1943
Received: 1941
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

### shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:l2b] destroying XG failed at country row: update or delete on table "countries" violates foreign key constraint "locations_country_code_fkey" on table "locations"
```

Context: context file not found for `shell-L4b-location-picker-LS-11-picking-a-second-market-renders-its-own-tree-and-saves-its-own-node-mobile-360`

### admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: {"id": "b19db4e0-a298-4720-b4c2-f68f2c013eac", "is_active": false, "level": "country", "name_en": "E2E-Scratch-QM-1-1", "parent_id": null, "slug": "e2e-scratch-qm-1-1"}
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import countries" [active] [ref=e2]:
    - heading "Import countries" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import countries
      - paragraph [ref=e6]: "A file is written whole or not at all: one refused row stops the entire import."
      - paragraph [ref=e7]: Start from a download so the columns match. Read-only columns are never applied.
      - status [ref=e8]: 1 rows were restored.
      - button "Close" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```
