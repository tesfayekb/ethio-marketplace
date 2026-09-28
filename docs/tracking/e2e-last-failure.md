# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36366774220 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36366774220
- Commit: `a441db3f483edb75cae7223c5772d00ea09e7b6d`
- Attempt: 2
- Written (UTC): 2026-09-28T02:03:35.513Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling — Error: PW-41: the dial never closed within 62 calls
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-7 a region code alone selects the region — Error: [e2e:l4b2] seeding region failed: duplicate key value violates unique constraint "locations_iso_3166_2_unique"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-41: the dial never closed within 62 calls

expect(received).toBeGreaterThan(expected)

Expected: > 59
Received:   0
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › L4b location picker › LS-7 a region code alone selects the region

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:l4b2] seeding region failed: duplicate key value violates unique constraint "locations_iso_3166_2_unique"
```

Context: context file not found for `shell-L4b-location-picker-LS-7-a-region-code-alone-selects-the-region-mobile-360`

### admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-2-i89gxr')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-2-i89gxr')

[dialog-dump findRow(e2e-cat-4-2-i89gxr)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-2-i89gxr) after create] open dialogs: none
```

Context:

```text
          - listitem [ref=e229]:
            - generic [ref=e230]: About
          - listitem [ref=e231]:
            - generic [ref=e232]: How it works
      - navigation "Help" [ref=e233]:
        - heading "Help" [level=2] [ref=e234]
        - list [ref=e235]:
          - listitem [ref=e236]:
            - generic [ref=e237]: Safety
          - listitem [ref=e238]:
            - generic [ref=e239]: Contact
      - navigation "Legal" [ref=e240]:
        - heading "Legal" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Terms
          - listitem [ref=e245]:
            - generic [ref=e246]: Privacy
    - paragraph [ref=e248]: © 2026 ethio.com — All rights reserved.
```
```
