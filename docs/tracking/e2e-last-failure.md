# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35689807555
- Commit: `6ba3c4bb4a8f78bb16b7d91926abfa94edad2d0c`
- Attempt: 2
- Written (UTC): 2026-09-22T05:38:06.049Z
- Passed: 835 · Skipped: 76 · Failed: 116
- Gating failures: 116 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 24
- Post-test errors (DEC-059, non-gating): shard 3, shard 4, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-audit.spec.ts › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded — Error: [e2e:users] admin.createUser failed for e2e+35689807555-4-2-6-xes7my@ethio-e2e.invalid: fetch failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row — Error: [e2e:l2b] destroying XU failed at close: TypeError: fetch failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11) — Error: PW-3: the scratch folder is missing from the browse level
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides — Error: expect(locator).toBeVisible() failed

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 103 user(s) owned by process 35689807555-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING failed to delete ea5e9693-7886-4b79-979a-d93590f1a66e: fetch failed — deferred to the nightly sweep
[e2e:teardown] deleted 35 user(s) owned by process 35689807555-4, 1 deferred to the nightly sweep
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 98 user(s) owned by process 35689807555-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 162 user(s) owned by process 35689807555-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="9b0022f1-b02c-4b32-83e6-d99000a7c20d"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="9b0022f1-b02c-4b32-83e6-d99000a7c20d"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f2490eae-40fb-46a3-90c8-bb1d61742dcd"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f2490eae-40fb-46a3-90c8-bb1d61742dcd"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="8e8f0161-262c-4dae-bab2-fdf6c0cf63d9"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="8e8f0161-262c-4dae-bab2-fdf6c0cf63d9"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="51442cdd-f220-4dee-8031-5626fcebe70f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="51442cdd-f220-4dee-8031-5626fcebe70f"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="bff74a64-c720-47b7-b459-5fadd53a4cc8"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="bff74a64-c720-47b7-b459-5fadd53a4cc8"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="48b966d1-cf16-48e5-bb2b-4041b9f204ff"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="48b966d1-cf16-48e5-bb2b-4041b9f204ff"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f044a944-6398-402f-b52c-c143d1044739"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f044a944-6398-402f-b52c-c143d1044739"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="13451b53-ebf6-4d1a-9536-336f6cae34e6"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="13451b53-ebf6-4d1a-9536-336f6cae34e6"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="c4fec53b-697f-4019-af83-4e5afd974195"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="c4fec53b-697f-4019-af83-4e5afd974195"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="237192d9-97de-4428-a138-3391d3b79c25"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="237192d9-97de-4428-a138-3391d3b79c25"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="4af55314-be6f-4f1a-9e37-dc93971afe70"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="4af55314-be6f-4f1a-9e37-dc93971afe70"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="9c4bb1df-7555-4ddb-b900-b7121852d7ca"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="9c4bb1df-7555-4ddb-b900-b7121852d7ca"]')

```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="a692f2ff-8126-42ed-aca4-cc0594e11715"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="a692f2ff-8126-42ed-aca4-cc0594e11715"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="e8916b17-eb6a-4bb1-ba23-f783fda4ce69"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="e8916b17-eb6a-4bb1-ba23-f783fda4ce69"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="e75f232a-b099-48a0-9b03-301002da2a2d"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="e75f232a-b099-48a0-9b03-301002da2a2d"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="75ac3a12-d65a-47b5-9715-27dbf3368e1e"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="75ac3a12-d65a-47b5-9715-27dbf3368e1e"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="0c70932f-a9f1-4411-a0ed-8371ad13a585"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="0c70932f-a9f1-4411-a0ed-8371ad13a585"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="daa60d09-dfaf-4f39-9bae-d3125c2685c6"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="daa60d09-dfaf-4f39-9bae-d3125c2685c6"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="5bfff9c8-6830-403a-92d9-410d7c715b4e"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="5bfff9c8-6830-403a-92d9-410d7c715b4e"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ea4fad7c-0f5b-4ecf-ad1c-a71aec0d85df"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ea4fad7c-0f5b-4ecf-ad1c-a71aec0d85df"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="fa93a7a7-094a-4454-b7f2-fbe69256f3de"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="fa93a7a7-094a-4454-b7f2-fbe69256f3de"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="01534b47-3f29-4922-b7f5-e3a49bf795bc"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="01534b47-3f29-4922-b7f5-e3a49bf795bc"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f8674de9-d183-4c45-9d47-059807855db0"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f8674de9-d183-4c45-9d47-059807855db0"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="eabffe7f-833b-4bc8-a430-006a3c9b0749"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="eabffe7f-833b-4bc8-a430-006a3c9b0749"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="02169ebe-29aa-4ef6-8681-d45ab20a84d0"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="02169ebe-29aa-4ef6-8681-d45ab20a84d0"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's allowed set narrows and locks a sibling picker

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f2d59c7c-f2fa-4d63-a489-1a67b25db313"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f2d59c7c-f2fa-4d63-a489-1a67b25db313"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-46: the imported category never reached the wizard's tree

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Test timeout of 60000ms exceeded
```

Context:

```text
          - listitem [ref=e603]:
            - generic [ref=e604]: About
          - listitem [ref=e605]:
            - generic [ref=e606]: How it works
      - navigation "Help" [ref=e607]:
        - heading "Help" [level=2] [ref=e608]
        - list [ref=e609]:
          - listitem [ref=e610]:
            - generic [ref=e611]: Safety
          - listitem [ref=e612]:
            - generic [ref=e613]: Contact
      - navigation "Legal" [ref=e614]:
        - heading "Legal" [level=2] [ref=e615]
        - list [ref=e616]:
          - listitem [ref=e617]:
            - generic [ref=e618]: Terms
          - listitem [ref=e619]:
            - generic [ref=e620]: Privacy
    - paragraph [ref=e622]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="adc2de58-e6a1-4485-842b-24c3ccd99cbf"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="adc2de58-e6a1-4485-842b-24c3ccd99cbf"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="db61e0de-dd19-4fe1-8d6d-1e8c504c89ab"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="db61e0de-dd19-4fe1-8d6d-1e8c504c89ab"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="0f09b762-7d60-4719-8296-71281d0b9797"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="0f09b762-7d60-4719-8296-71281d0b9797"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: ስለ እኛ
          - listitem [ref=e151]:
            - generic [ref=e152]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e153]:
        - heading "እገዛ" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: ደህንነት
          - listitem [ref=e158]:
            - generic [ref=e159]: ያግኙን
      - navigation "ሕጋዊ" [ref=e160]:
        - heading "ሕጋዊ" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: ውሎች
          - listitem [ref=e165]:
            - generic [ref=e166]: ግላዊነት
    - paragraph [ref=e168]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ec5fad88-8735-4e6b-9bef-57c73a41bb4a"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ec5fad88-8735-4e6b-9bef-57c73a41bb4a"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:l2c] seeding XP failed: TypeError: fetch failed
```

Context:

```text
          - listitem [ref=e859]:
            - generic [ref=e860]: About
          - listitem [ref=e861]:
            - generic [ref=e862]: How it works
      - navigation "Help" [ref=e863]:
        - heading "Help" [level=2] [ref=e864]
        - list [ref=e865]:
          - listitem [ref=e866]:
            - generic [ref=e867]: Safety
          - listitem [ref=e868]:
            - generic [ref=e869]: Contact
      - navigation "Legal" [ref=e870]:
        - heading "Legal" [level=2] [ref=e871]
        - list [ref=e872]:
          - listitem [ref=e873]:
            - generic [ref=e874]: Terms
          - listitem [ref=e875]:
            - generic [ref=e876]: Privacy
    - paragraph [ref=e878]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="3bc05500-8976-446e-9e84-f8e20e5d6818"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="3bc05500-8976-446e-9e84-f8e20e5d6818"]')

```

Context:

```text
          - listitem [ref=e809]:
            - generic [ref=e810]: About
          - listitem [ref=e811]:
            - generic [ref=e812]: How it works
      - navigation "Help" [ref=e813]:
        - heading "Help" [level=2] [ref=e814]
        - list [ref=e815]:
          - listitem [ref=e816]:
            - generic [ref=e817]: Safety
          - listitem [ref=e818]:
            - generic [ref=e819]: Contact
      - navigation "Legal" [ref=e820]:
        - heading "Legal" [level=2] [ref=e821]
        - list [ref=e822]:
          - listitem [ref=e823]:
            - generic [ref=e824]: Terms
          - listitem [ref=e825]:
            - generic [ref=e826]: Privacy
    - paragraph [ref=e828]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-3: the scratch folder is missing from the browse level

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-browse-folder"][data-category="2148e1f5-af57-48ec-b012-f7be1b574464"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-3: the scratch folder is missing from the browse level with timeout 10000ms
  - waiting for locator('[data-testid="post-browse-folder"][data-category="2148e1f5-af57-48ec-b012-f7be1b574464"]')

```

Context:

```text
          - listitem [ref=e1184]:
            - generic [ref=e1185]: About
          - listitem [ref=e1186]:
            - generic [ref=e1187]: How it works
      - navigation "Help" [ref=e1188]:
        - heading "Help" [level=2] [ref=e1189]
        - list [ref=e1190]:
          - listitem [ref=e1191]:
            - generic [ref=e1192]: Safety
          - listitem [ref=e1193]:
            - generic [ref=e1194]: Contact
      - navigation "Legal" [ref=e1195]:
        - heading "Legal" [level=2] [ref=e1196]
        - list [ref=e1197]:
          - listitem [ref=e1198]:
            - generic [ref=e1199]: Terms
          - listitem [ref=e1200]:
            - generic [ref=e1201]: Privacy
    - paragraph [ref=e1203]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f3c81e6a-6460-4205-a967-122d4800e05b"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f3c81e6a-6460-4205-a967-122d4800e05b"]')

```

Context:

```text
          - listitem [ref=e847]:
            - generic [ref=e848]: About
          - listitem [ref=e849]:
            - generic [ref=e850]: How it works
      - navigation "Help" [ref=e851]:
        - heading "Help" [level=2] [ref=e852]
        - list [ref=e853]:
          - listitem [ref=e854]:
            - generic [ref=e855]: Safety
          - listitem [ref=e856]:
            - generic [ref=e857]: Contact
      - navigation "Legal" [ref=e858]:
        - heading "Legal" [level=2] [ref=e859]
        - list [ref=e860]:
          - listitem [ref=e861]:
            - generic [ref=e862]: Terms
          - listitem [ref=e863]:
            - generic [ref=e864]: Privacy
    - paragraph [ref=e866]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f25db5a8-3ed8-4a00-8aa5-a58fbad7f5b0"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f25db5a8-3ed8-4a00-8aa5-a58fbad7f5b0"]')

```

Context:

```text
          - listitem [ref=e854]:
            - generic [ref=e855]: About
          - listitem [ref=e856]:
            - generic [ref=e857]: How it works
      - navigation "Help" [ref=e858]:
        - heading "Help" [level=2] [ref=e859]
        - list [ref=e860]:
          - listitem [ref=e861]:
            - generic [ref=e862]: Safety
          - listitem [ref=e863]:
            - generic [ref=e864]: Contact
      - navigation "Legal" [ref=e865]:
        - heading "Legal" [level=2] [ref=e866]
        - list [ref=e867]:
          - listitem [ref=e868]:
            - generic [ref=e869]: Terms
          - listitem [ref=e870]:
            - generic [ref=e871]: Privacy
    - paragraph [ref=e873]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="2a517d6f-30de-40bf-9c21-45e68de2def7"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="2a517d6f-30de-40bf-9c21-45e68de2def7"]')

```

Context:

```text
          - listitem [ref=e876]:
            - generic [ref=e877]: About
          - listitem [ref=e878]:
            - generic [ref=e879]: How it works
      - navigation "Help" [ref=e880]:
        - heading "Help" [level=2] [ref=e881]
        - list [ref=e882]:
          - listitem [ref=e883]:
            - generic [ref=e884]: Safety
          - listitem [ref=e885]:
            - generic [ref=e886]: Contact
      - navigation "Legal" [ref=e887]:
        - heading "Legal" [level=2] [ref=e888]
        - list [ref=e889]:
          - listitem [ref=e890]:
            - generic [ref=e891]: Terms
          - listitem [ref=e892]:
            - generic [ref=e893]: Privacy
    - paragraph [ref=e895]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="358f2174-5036-43a5-9a70-1d78fa265439"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="358f2174-5036-43a5-9a70-1d78fa265439"]')

```

Context:

```text
          - listitem [ref=e914]:
            - generic [ref=e915]: About
          - listitem [ref=e916]:
            - generic [ref=e917]: How it works
      - navigation "Help" [ref=e918]:
        - heading "Help" [level=2] [ref=e919]
        - list [ref=e920]:
          - listitem [ref=e921]:
            - generic [ref=e922]: Safety
          - listitem [ref=e923]:
            - generic [ref=e924]: Contact
      - navigation "Legal" [ref=e925]:
        - heading "Legal" [level=2] [ref=e926]
        - list [ref=e927]:
          - listitem [ref=e928]:
            - generic [ref=e929]: Terms
          - listitem [ref=e930]:
            - generic [ref=e931]: Privacy
    - paragraph [ref=e933]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="07345d0e-603c-40a9-89f2-acf230362448"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="07345d0e-603c-40a9-89f2-acf230362448"]')

```

Context:

```text
          - listitem [ref=e918]:
            - generic [ref=e919]: About
          - listitem [ref=e920]:
            - generic [ref=e921]: How it works
      - navigation "Help" [ref=e922]:
        - heading "Help" [level=2] [ref=e923]
        - list [ref=e924]:
          - listitem [ref=e925]:
            - generic [ref=e926]: Safety
          - listitem [ref=e927]:
            - generic [ref=e928]: Contact
      - navigation "Legal" [ref=e929]:
        - heading "Legal" [level=2] [ref=e930]
        - list [ref=e931]:
          - listitem [ref=e932]:
            - generic [ref=e933]: Terms
          - listitem [ref=e934]:
            - generic [ref=e935]: Privacy
    - paragraph [ref=e937]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="689ad8e1-0da3-40f8-9f9b-f94581d2c584"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="689ad8e1-0da3-40f8-9f9b-f94581d2c584"]')

```

Context:

```text
          - listitem [ref=e876]:
            - generic [ref=e877]: About
          - listitem [ref=e878]:
            - generic [ref=e879]: How it works
      - navigation "Help" [ref=e880]:
        - heading "Help" [level=2] [ref=e881]
        - list [ref=e882]:
          - listitem [ref=e883]:
            - generic [ref=e884]: Safety
          - listitem [ref=e885]:
            - generic [ref=e886]: Contact
      - navigation "Legal" [ref=e887]:
        - heading "Legal" [level=2] [ref=e888]
        - list [ref=e889]:
          - listitem [ref=e890]:
            - generic [ref=e891]: Terms
          - listitem [ref=e892]:
            - generic [ref=e893]: Privacy
    - paragraph [ref=e895]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="c9ebe40a-2f7f-4f4e-8675-5b400c5ae03b"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="c9ebe40a-2f7f-4f4e-8675-5b400c5ae03b"]')

```

Context:

```text
          - listitem [ref=e875]:
            - generic [ref=e876]: About
          - listitem [ref=e877]:
            - generic [ref=e878]: How it works
      - navigation "Help" [ref=e879]:
        - heading "Help" [level=2] [ref=e880]
        - list [ref=e881]:
          - listitem [ref=e882]:
            - generic [ref=e883]: Safety
          - listitem [ref=e884]:
            - generic [ref=e885]: Contact
      - navigation "Legal" [ref=e886]:
        - heading "Legal" [level=2] [ref=e887]
        - list [ref=e888]:
          - listitem [ref=e889]:
            - generic [ref=e890]: Terms
          - listitem [ref=e891]:
            - generic [ref=e892]: Privacy
    - paragraph [ref=e894]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="efb703b6-bdc8-4a8e-9c8b-4c5381f88a4f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="efb703b6-bdc8-4a8e-9c8b-4c5381f88a4f"]')

```

Context:

```text
          - listitem [ref=e899]:
            - generic [ref=e900]: About
          - listitem [ref=e901]:
            - generic [ref=e902]: How it works
      - navigation "Help" [ref=e903]:
        - heading "Help" [level=2] [ref=e904]
        - list [ref=e905]:
          - listitem [ref=e906]:
            - generic [ref=e907]: Safety
          - listitem [ref=e908]:
            - generic [ref=e909]: Contact
      - navigation "Legal" [ref=e910]:
        - heading "Legal" [level=2] [ref=e911]
        - list [ref=e912]:
          - listitem [ref=e913]:
            - generic [ref=e914]: Terms
          - listitem [ref=e915]:
            - generic [ref=e916]: Privacy
    - paragraph [ref=e918]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="80428b31-a267-4b44-9da7-2fe2b55acb85"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="80428b31-a267-4b44-9da7-2fe2b55acb85"]')

```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="48f17f52-36ab-4ca0-b5de-ed51d7ed572f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="48f17f52-36ab-4ca0-b5de-ed51d7ed572f"]')

```

Context:

```text
          - listitem [ref=e901]:
            - generic [ref=e902]: About
          - listitem [ref=e903]:
            - generic [ref=e904]: How it works
      - navigation "Help" [ref=e905]:
        - heading "Help" [level=2] [ref=e906]
        - list [ref=e907]:
          - listitem [ref=e908]:
            - generic [ref=e909]: Safety
          - listitem [ref=e910]:
            - generic [ref=e911]: Contact
      - navigation "Legal" [ref=e912]:
        - heading "Legal" [level=2] [ref=e913]
        - list [ref=e914]:
          - listitem [ref=e915]:
            - generic [ref=e916]: Terms
          - listitem [ref=e917]:
            - generic [ref=e918]: Privacy
    - paragraph [ref=e920]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="2b47a43e-0c43-4d27-9b7c-c7b505b26685"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="2b47a43e-0c43-4d27-9b7c-c7b505b26685"]')

```

Context:

```text
          - listitem [ref=e899]:
            - generic [ref=e900]: About
          - listitem [ref=e901]:
            - generic [ref=e902]: How it works
      - navigation "Help" [ref=e903]:
        - heading "Help" [level=2] [ref=e904]
        - list [ref=e905]:
          - listitem [ref=e906]:
            - generic [ref=e907]: Safety
          - listitem [ref=e908]:
            - generic [ref=e909]: Contact
      - navigation "Legal" [ref=e910]:
        - heading "Legal" [level=2] [ref=e911]
        - list [ref=e912]:
          - listitem [ref=e913]:
            - generic [ref=e914]: Terms
          - listitem [ref=e915]:
            - generic [ref=e916]: Privacy
    - paragraph [ref=e918]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ae11c974-57ae-4289-9ea6-5e289dc32449"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ae11c974-57ae-4289-9ea6-5e289dc32449"]')

```

Context:

```text
          - listitem [ref=e911]:
            - generic [ref=e912]: About
          - listitem [ref=e913]:
            - generic [ref=e914]: How it works
      - navigation "Help" [ref=e915]:
        - heading "Help" [level=2] [ref=e916]
        - list [ref=e917]:
          - listitem [ref=e918]:
            - generic [ref=e919]: Safety
          - listitem [ref=e920]:
            - generic [ref=e921]: Contact
      - navigation "Legal" [ref=e922]:
        - heading "Legal" [level=2] [ref=e923]
        - list [ref=e924]:
          - listitem [ref=e925]:
            - generic [ref=e926]: Terms
          - listitem [ref=e927]:
            - generic [ref=e928]: Privacy
    - paragraph [ref=e930]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="dbae9521-99b4-4e28-af95-5cc8fd625846"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="dbae9521-99b4-4e28-af95-5cc8fd625846"]')

```

Context:

```text
          - listitem [ref=e893]:
            - generic [ref=e894]: About
          - listitem [ref=e895]:
            - generic [ref=e896]: How it works
      - navigation "Help" [ref=e897]:
        - heading "Help" [level=2] [ref=e898]
        - list [ref=e899]:
          - listitem [ref=e900]:
            - generic [ref=e901]: Safety
          - listitem [ref=e902]:
            - generic [ref=e903]: Contact
      - navigation "Legal" [ref=e904]:
        - heading "Legal" [level=2] [ref=e905]
        - list [ref=e906]:
          - listitem [ref=e907]:
            - generic [ref=e908]: Terms
          - listitem [ref=e909]:
            - generic [ref=e910]: Privacy
    - paragraph [ref=e912]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="fd1be804-1715-4196-9fc4-14e51954ac1b"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="fd1be804-1715-4196-9fc4-14e51954ac1b"]')

```

Context:

```text
          - listitem [ref=e899]:
            - generic [ref=e900]: About
          - listitem [ref=e901]:
            - generic [ref=e902]: How it works
      - navigation "Help" [ref=e903]:
        - heading "Help" [level=2] [ref=e904]
        - list [ref=e905]:
          - listitem [ref=e906]:
            - generic [ref=e907]: Safety
          - listitem [ref=e908]:
            - generic [ref=e909]: Contact
      - navigation "Legal" [ref=e910]:
        - heading "Legal" [level=2] [ref=e911]
        - list [ref=e912]:
          - listitem [ref=e913]:
            - generic [ref=e914]: Terms
          - listitem [ref=e915]:
            - generic [ref=e916]: Privacy
    - paragraph [ref=e918]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="e5f4eb16-b50c-4c3f-94a0-5906d8f50bc4"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="e5f4eb16-b50c-4c3f-94a0-5906d8f50bc4"]')

```

Context:

```text
          - listitem [ref=e881]:
            - generic [ref=e882]: About
          - listitem [ref=e883]:
            - generic [ref=e884]: How it works
      - navigation "Help" [ref=e885]:
        - heading "Help" [level=2] [ref=e886]
        - list [ref=e887]:
          - listitem [ref=e888]:
            - generic [ref=e889]: Safety
          - listitem [ref=e890]:
            - generic [ref=e891]: Contact
      - navigation "Legal" [ref=e892]:
        - heading "Legal" [level=2] [ref=e893]
        - list [ref=e894]:
          - listitem [ref=e895]:
            - generic [ref=e896]: Terms
          - listitem [ref=e897]:
            - generic [ref=e898]: Privacy
    - paragraph [ref=e900]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="3c6f7f78-0a43-4f9f-b4e9-e1e6c50e923f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="3c6f7f78-0a43-4f9f-b4e9-e1e6c50e923f"]')

```

Context:

```text
          - listitem [ref=e887]:
            - generic [ref=e888]: About
          - listitem [ref=e889]:
            - generic [ref=e890]: How it works
      - navigation "Help" [ref=e891]:
        - heading "Help" [level=2] [ref=e892]
        - list [ref=e893]:
          - listitem [ref=e894]:
            - generic [ref=e895]: Safety
          - listitem [ref=e896]:
            - generic [ref=e897]: Contact
      - navigation "Legal" [ref=e898]:
        - heading "Legal" [level=2] [ref=e899]
        - list [ref=e900]:
          - listitem [ref=e901]:
            - generic [ref=e902]: Terms
          - listitem [ref=e903]:
            - generic [ref=e904]: Privacy
    - paragraph [ref=e906]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="cb587f84-a502-4be9-8240-334e6669a1a8"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="cb587f84-a502-4be9-8240-334e6669a1a8"]')

```

Context:

```text
          - listitem [ref=e875]:
            - generic [ref=e876]: About
          - listitem [ref=e877]:
            - generic [ref=e878]: How it works
      - navigation "Help" [ref=e879]:
        - heading "Help" [level=2] [ref=e880]
        - list [ref=e881]:
          - listitem [ref=e882]:
            - generic [ref=e883]: Safety
          - listitem [ref=e884]:
            - generic [ref=e885]: Contact
      - navigation "Legal" [ref=e886]:
        - heading "Legal" [level=2] [ref=e887]
        - list [ref=e888]:
          - listitem [ref=e889]:
            - generic [ref=e890]: Terms
          - listitem [ref=e891]:
            - generic [ref=e892]: Privacy
    - paragraph [ref=e894]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="d77931da-1f3d-4585-a224-0af0b521b965"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="d77931da-1f3d-4585-a224-0af0b521b965"]')

```

Context:

```text
          - listitem [ref=e881]:
            - generic [ref=e882]: About
          - listitem [ref=e883]:
            - generic [ref=e884]: How it works
      - navigation "Help" [ref=e885]:
        - heading "Help" [level=2] [ref=e886]
        - list [ref=e887]:
          - listitem [ref=e888]:
            - generic [ref=e889]: Safety
          - listitem [ref=e890]:
            - generic [ref=e891]: Contact
      - navigation "Legal" [ref=e892]:
        - heading "Legal" [level=2] [ref=e893]
        - list [ref=e894]:
          - listitem [ref=e895]:
            - generic [ref=e896]: Terms
          - listitem [ref=e897]:
            - generic [ref=e898]: Privacy
    - paragraph [ref=e900]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="52c43593-6c0c-44e7-8a35-d150ccaaed59"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="52c43593-6c0c-44e7-8a35-d150ccaaed59"]')

```

Context:

```text
          - listitem [ref=e893]:
            - generic [ref=e894]: About
          - listitem [ref=e895]:
            - generic [ref=e896]: How it works
      - navigation "Help" [ref=e897]:
        - heading "Help" [level=2] [ref=e898]
        - list [ref=e899]:
          - listitem [ref=e900]:
            - generic [ref=e901]: Safety
          - listitem [ref=e902]:
            - generic [ref=e903]: Contact
      - navigation "Legal" [ref=e904]:
        - heading "Legal" [level=2] [ref=e905]
        - list [ref=e906]:
          - listitem [ref=e907]:
            - generic [ref=e908]: Terms
          - listitem [ref=e909]:
            - generic [ref=e910]: Privacy
    - paragraph [ref=e912]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-46: the imported category never reached the wizard's tree

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Test timeout of 60000ms exceeded
```

Context:

```text
          - listitem [ref=e1331]:
            - generic [ref=e1332]: About
          - listitem [ref=e1333]:
            - generic [ref=e1334]: How it works
      - navigation "Help" [ref=e1335]:
        - heading "Help" [level=2] [ref=e1336]
        - list [ref=e1337]:
          - listitem [ref=e1338]:
            - generic [ref=e1339]: Safety
          - listitem [ref=e1340]:
            - generic [ref=e1341]: Contact
      - navigation "Legal" [ref=e1342]:
        - heading "Legal" [level=2] [ref=e1343]
        - list [ref=e1344]:
          - listitem [ref=e1345]:
            - generic [ref=e1346]: Terms
          - listitem [ref=e1347]:
            - generic [ref=e1348]: Privacy
    - paragraph [ref=e1350]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="35a338e8-5350-4e81-bfc4-237f64641f54"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="35a338e8-5350-4e81-bfc4-237f64641f54"]')

```

Context:

```text
          - listitem [ref=e983]:
            - generic [ref=e984]: About
          - listitem [ref=e985]:
            - generic [ref=e986]: How it works
      - navigation "Help" [ref=e987]:
        - heading "Help" [level=2] [ref=e988]
        - list [ref=e989]:
          - listitem [ref=e990]:
            - generic [ref=e991]: Safety
          - listitem [ref=e992]:
            - generic [ref=e993]: Contact
      - navigation "Legal" [ref=e994]:
        - heading "Legal" [level=2] [ref=e995]
        - list [ref=e996]:
          - listitem [ref=e997]:
            - generic [ref=e998]: Terms
          - listitem [ref=e999]:
            - generic [ref=e1000]: Privacy
    - paragraph [ref=e1002]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="2fb11b56-1fdc-4c0b-8bbb-119e96ec1394"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="2fb11b56-1fdc-4c0b-8bbb-119e96ec1394"]')

```

Context:

```text
          - listitem [ref=e1001]:
            - generic [ref=e1002]: About
          - listitem [ref=e1003]:
            - generic [ref=e1004]: How it works
      - navigation "Help" [ref=e1005]:
        - heading "Help" [level=2] [ref=e1006]
        - list [ref=e1007]:
          - listitem [ref=e1008]:
            - generic [ref=e1009]: Safety
          - listitem [ref=e1010]:
            - generic [ref=e1011]: Contact
      - navigation "Legal" [ref=e1012]:
        - heading "Legal" [level=2] [ref=e1013]
        - list [ref=e1014]:
          - listitem [ref=e1015]:
            - generic [ref=e1016]: Terms
          - listitem [ref=e1017]:
            - generic [ref=e1018]: Privacy
    - paragraph [ref=e1020]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="1909286c-73ae-49af-b13e-00a80ac2260a"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="1909286c-73ae-49af-b13e-00a80ac2260a"]')

```

Context:

```text
          - listitem [ref=e995]:
            - generic [ref=e996]: About
          - listitem [ref=e997]:
            - generic [ref=e998]: How it works
      - navigation "Help" [ref=e999]:
        - heading "Help" [level=2] [ref=e1000]
        - list [ref=e1001]:
          - listitem [ref=e1002]:
            - generic [ref=e1003]: Safety
          - listitem [ref=e1004]:
            - generic [ref=e1005]: Contact
      - navigation "Legal" [ref=e1006]:
        - heading "Legal" [level=2] [ref=e1007]
        - list [ref=e1008]:
          - listitem [ref=e1009]:
            - generic [ref=e1010]: Terms
          - listitem [ref=e1011]:
            - generic [ref=e1012]: Privacy
    - paragraph [ref=e1014]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ce570e36-3064-4df2-953e-8fe5a89d10ca"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ce570e36-3064-4df2-953e-8fe5a89d10ca"]')

```

Context:

```text
          - listitem [ref=e1001]:
            - generic [ref=e1002]: About
          - listitem [ref=e1003]:
            - generic [ref=e1004]: How it works
      - navigation "Help" [ref=e1005]:
        - heading "Help" [level=2] [ref=e1006]
        - list [ref=e1007]:
          - listitem [ref=e1008]:
            - generic [ref=e1009]: Safety
          - listitem [ref=e1010]:
            - generic [ref=e1011]: Contact
      - navigation "Legal" [ref=e1012]:
        - heading "Legal" [level=2] [ref=e1013]
        - list [ref=e1014]:
          - listitem [ref=e1015]:
            - generic [ref=e1016]: Terms
          - listitem [ref=e1017]:
            - generic [ref=e1018]: Privacy
    - paragraph [ref=e1020]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="aa84ce71-1086-403e-96fc-228b25745a7d"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="aa84ce71-1086-403e-96fc-228b25745a7d"]')

```

Context:

```text
          - listitem [ref=e1025]:
            - generic [ref=e1026]: About
          - listitem [ref=e1027]:
            - generic [ref=e1028]: How it works
      - navigation "Help" [ref=e1029]:
        - heading "Help" [level=2] [ref=e1030]
        - list [ref=e1031]:
          - listitem [ref=e1032]:
            - generic [ref=e1033]: Safety
          - listitem [ref=e1034]:
            - generic [ref=e1035]: Contact
      - navigation "Legal" [ref=e1036]:
        - heading "Legal" [level=2] [ref=e1037]
        - list [ref=e1038]:
          - listitem [ref=e1039]:
            - generic [ref=e1040]: Terms
          - listitem [ref=e1041]:
            - generic [ref=e1042]: Privacy
    - paragraph [ref=e1044]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="07efbf34-236e-46c2-85f6-cbaca5f8faf0"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="07efbf34-236e-46c2-85f6-cbaca5f8faf0"]')

```

Context:

```text
          - listitem [ref=e1025]:
            - generic [ref=e1026]: ስለ እኛ
          - listitem [ref=e1027]:
            - generic [ref=e1028]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e1029]:
        - heading "እገዛ" [level=2] [ref=e1030]
        - list [ref=e1031]:
          - listitem [ref=e1032]:
            - generic [ref=e1033]: ደህንነት
          - listitem [ref=e1034]:
            - generic [ref=e1035]: ያግኙን
      - navigation "ሕጋዊ" [ref=e1036]:
        - heading "ሕጋዊ" [level=2] [ref=e1037]
        - list [ref=e1038]:
          - listitem [ref=e1039]:
            - generic [ref=e1040]: ውሎች
          - listitem [ref=e1041]:
            - generic [ref=e1042]: ግላዊነት
    - paragraph [ref=e1044]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="7a621cf0-aeb7-49eb-9073-7e2fc03fdb27"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="7a621cf0-aeb7-49eb-9073-7e2fc03fdb27"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="2a3fc76f-32d2-4167-b7c5-add0f734ecf4"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="2a3fc76f-32d2-4167-b7c5-add0f734ecf4"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="5f2f5787-e6f3-4c2c-87eb-7ca186a0cf80"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="5f2f5787-e6f3-4c2c-87eb-7ca186a0cf80"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="b076478c-c6f1-4918-a631-5496d0f27692"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b076478c-c6f1-4918-a631-5496d0f27692"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="620f5591-294e-44ed-b91d-f918bd77aa06"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="620f5591-294e-44ed-b91d-f918bd77aa06"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="23b832ad-11e3-4be4-9feb-b9cee7483dd4"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="23b832ad-11e3-4be4-9feb-b9cee7483dd4"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="00fb7163-f86e-428b-886b-f8c461f8acef"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="00fb7163-f86e-428b-886b-f8c461f8acef"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="5f1b0af7-ffb5-4825-93aa-304c3690a9b7"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="5f1b0af7-ffb5-4825-93aa-304c3690a9b7"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="686b8e29-83be-4233-be1d-1dafdb39cc92"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="686b8e29-83be-4233-be1d-1dafdb39cc92"]')

```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="2fb699cf-532d-4eab-9a07-72462b158521"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="2fb699cf-532d-4eab-9a07-72462b158521"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="b4b429e6-6dd0-4744-9301-4ac607a27cf1"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b4b429e6-6dd0-4744-9301-4ac607a27cf1"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ddcb7972-7bb8-463e-9081-4235a422effc"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ddcb7972-7bb8-463e-9081-4235a422effc"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="dc6ee3c2-e997-4c5e-bd62-bd38ed8be059"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="dc6ee3c2-e997-4c5e-bd62-bd38ed8be059"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="987f6876-6951-4f85-a9c4-c0ea4715e284"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="987f6876-6951-4f85-a9c4-c0ea4715e284"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="8a25a6b0-1a70-40a0-ae45-2830deb15e47"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="8a25a6b0-1a70-40a0-ae45-2830deb15e47"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="325fda33-58f4-43e5-ab38-1a6512dd0448"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="325fda33-58f4-43e5-ab38-1a6512dd0448"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="21866088-f637-4954-b01d-a507798a081f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="21866088-f637-4954-b01d-a507798a081f"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="844b5ed1-5071-4d40-a9e7-c759d2450f32"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="844b5ed1-5071-4d40-a9e7-c759d2450f32"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="8c8f96c7-de3a-48a1-bbbd-a6159b25bb93"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="8c8f96c7-de3a-48a1-bbbd-a6159b25bb93"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="8d7662ca-2cef-4694-8371-5f26fe7ed1b2"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="8d7662ca-2cef-4694-8371-5f26fe7ed1b2"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e537]:
            - generic [ref=e538]: About
          - listitem [ref=e539]:
            - generic [ref=e540]: How it works
      - navigation "Help" [ref=e541]:
        - heading "Help" [level=2] [ref=e542]
        - list [ref=e543]:
          - listitem [ref=e544]:
            - generic [ref=e545]: Safety
          - listitem [ref=e546]:
            - generic [ref=e547]: Contact
      - navigation "Legal" [ref=e548]:
        - heading "Legal" [level=2] [ref=e549]
        - list [ref=e550]:
          - listitem [ref=e551]:
            - generic [ref=e552]: Terms
          - listitem [ref=e553]:
            - generic [ref=e554]: Privacy
    - paragraph [ref=e556]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-46: the imported category never reached the wizard's tree

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Test timeout of 60000ms exceeded
```

Context:

```text
          - listitem [ref=e603]:
            - generic [ref=e604]: About
          - listitem [ref=e605]:
            - generic [ref=e606]: How it works
      - navigation "Help" [ref=e607]:
        - heading "Help" [level=2] [ref=e608]
        - list [ref=e609]:
          - listitem [ref=e610]:
            - generic [ref=e611]: Safety
          - listitem [ref=e612]:
            - generic [ref=e613]: Contact
      - navigation "Legal" [ref=e614]:
        - heading "Legal" [level=2] [ref=e615]
        - list [ref=e616]:
          - listitem [ref=e617]:
            - generic [ref=e618]: Terms
          - listitem [ref=e619]:
            - generic [ref=e620]: Privacy
    - paragraph [ref=e622]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="2b27a1fb-7941-46d7-9fb0-814c139d2959"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="2b27a1fb-7941-46d7-9fb0-814c139d2959"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ed4efa9f-87f3-46f4-a047-6482a6fa269b"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ed4efa9f-87f3-46f4-a047-6482a6fa269b"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="c99cd9aa-212b-407f-abbb-cf603f763b47"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="c99cd9aa-212b-407f-abbb-cf603f763b47"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="4b9da636-67b5-4719-b7ee-7fdb808ff407"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="4b9da636-67b5-4719-b7ee-7fdb808ff407"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="d9318d4b-5a7a-4a43-9945-a9a29833139c"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="d9318d4b-5a7a-4a43-9945-a9a29833139c"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: ስለ እኛ
          - listitem [ref=e151]:
            - generic [ref=e152]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e153]:
        - heading "እገዛ" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: ደህንነት
          - listitem [ref=e158]:
            - generic [ref=e159]: ያግኙን
      - navigation "ሕጋዊ" [ref=e160]:
        - heading "ሕጋዊ" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: ውሎች
          - listitem [ref=e165]:
            - generic [ref=e166]: ግላዊነት
    - paragraph [ref=e168]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="192de02f-f6c0-4ab7-b3e8-234f0b0c1fb0"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="192de02f-f6c0-4ab7-b3e8-234f0b0c1fb0"]')

```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: How it works
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
          - listitem [ref=e158]:
            - generic [ref=e159]: Contact
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - generic [ref=e164]: Terms
          - listitem [ref=e165]:
            - generic [ref=e166]: Privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="99487150-636f-4562-808d-0e86c00ed844"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="99487150-636f-4562-808d-0e86c00ed844"]')

```

Context:

```text
          - listitem [ref=e809]:
            - generic [ref=e810]: About
          - listitem [ref=e811]:
            - generic [ref=e812]: How it works
      - navigation "Help" [ref=e813]:
        - heading "Help" [level=2] [ref=e814]
        - list [ref=e815]:
          - listitem [ref=e816]:
            - generic [ref=e817]: Safety
          - listitem [ref=e818]:
            - generic [ref=e819]: Contact
      - navigation "Legal" [ref=e820]:
        - heading "Legal" [level=2] [ref=e821]
        - list [ref=e822]:
          - listitem [ref=e823]:
            - generic [ref=e824]: Terms
          - listitem [ref=e825]:
            - generic [ref=e826]: Privacy
    - paragraph [ref=e828]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ca6ecaa9-2977-4d77-a652-a9c88ceaadeb"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ca6ecaa9-2977-4d77-a652-a9c88ceaadeb"]')

```

Context:

```text
          - listitem [ref=e847]:
            - generic [ref=e848]: About
          - listitem [ref=e849]:
            - generic [ref=e850]: How it works
      - navigation "Help" [ref=e851]:
        - heading "Help" [level=2] [ref=e852]
        - list [ref=e853]:
          - listitem [ref=e854]:
            - generic [ref=e855]: Safety
          - listitem [ref=e856]:
            - generic [ref=e857]: Contact
      - navigation "Legal" [ref=e858]:
        - heading "Legal" [level=2] [ref=e859]
        - list [ref=e860]:
          - listitem [ref=e861]:
            - generic [ref=e862]: Terms
          - listitem [ref=e863]:
            - generic [ref=e864]: Privacy
    - paragraph [ref=e866]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="0544f773-8a7f-4ed5-8384-42a5148afed7"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="0544f773-8a7f-4ed5-8384-42a5148afed7"]')

```

Context:

```text
          - listitem [ref=e854]:
            - generic [ref=e855]: About
          - listitem [ref=e856]:
            - generic [ref=e857]: How it works
      - navigation "Help" [ref=e858]:
        - heading "Help" [level=2] [ref=e859]
        - list [ref=e860]:
          - listitem [ref=e861]:
            - generic [ref=e862]: Safety
          - listitem [ref=e863]:
            - generic [ref=e864]: Contact
      - navigation "Legal" [ref=e865]:
        - heading "Legal" [level=2] [ref=e866]
        - list [ref=e867]:
          - listitem [ref=e868]:
            - generic [ref=e869]: Terms
          - listitem [ref=e870]:
            - generic [ref=e871]: Privacy
    - paragraph [ref=e873]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="3dc86e6a-c930-46af-b03d-ff5d3475716d"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="3dc86e6a-c930-46af-b03d-ff5d3475716d"]')

```

Context:

```text
          - listitem [ref=e876]:
            - generic [ref=e877]: About
          - listitem [ref=e878]:
            - generic [ref=e879]: How it works
      - navigation "Help" [ref=e880]:
        - heading "Help" [level=2] [ref=e881]
        - list [ref=e882]:
          - listitem [ref=e883]:
            - generic [ref=e884]: Safety
          - listitem [ref=e885]:
            - generic [ref=e886]: Contact
      - navigation "Legal" [ref=e887]:
        - heading "Legal" [level=2] [ref=e888]
        - list [ref=e889]:
          - listitem [ref=e890]:
            - generic [ref=e891]: Terms
          - listitem [ref=e892]:
            - generic [ref=e893]: Privacy
    - paragraph [ref=e895]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f2855b8e-9c11-4e6a-aa16-93444e6c1521"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f2855b8e-9c11-4e6a-aa16-93444e6c1521"]')

```

Context:

```text
          - listitem [ref=e914]:
            - generic [ref=e915]: About
          - listitem [ref=e916]:
            - generic [ref=e917]: How it works
      - navigation "Help" [ref=e918]:
        - heading "Help" [level=2] [ref=e919]
        - list [ref=e920]:
          - listitem [ref=e921]:
            - generic [ref=e922]: Safety
          - listitem [ref=e923]:
            - generic [ref=e924]: Contact
      - navigation "Legal" [ref=e925]:
        - heading "Legal" [level=2] [ref=e926]
        - list [ref=e927]:
          - listitem [ref=e928]:
            - generic [ref=e929]: Terms
          - listitem [ref=e930]:
            - generic [ref=e931]: Privacy
    - paragraph [ref=e933]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="88c37658-dead-4d13-9af0-0abc7aa3f1f8"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="88c37658-dead-4d13-9af0-0abc7aa3f1f8"]')

```

Context:

```text
          - listitem [ref=e918]:
            - generic [ref=e919]: About
          - listitem [ref=e920]:
            - generic [ref=e921]: How it works
      - navigation "Help" [ref=e922]:
        - heading "Help" [level=2] [ref=e923]
        - list [ref=e924]:
          - listitem [ref=e925]:
            - generic [ref=e926]: Safety
          - listitem [ref=e927]:
            - generic [ref=e928]: Contact
      - navigation "Legal" [ref=e929]:
        - heading "Legal" [level=2] [ref=e930]
        - list [ref=e931]:
          - listitem [ref=e932]:
            - generic [ref=e933]: Terms
          - listitem [ref=e934]:
            - generic [ref=e935]: Privacy
    - paragraph [ref=e937]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="e688918c-c58a-467b-af7f-f6178f23225f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="e688918c-c58a-467b-af7f-f6178f23225f"]')

```

Context:

```text
          - listitem [ref=e876]:
            - generic [ref=e877]: About
          - listitem [ref=e878]:
            - generic [ref=e879]: How it works
      - navigation "Help" [ref=e880]:
        - heading "Help" [level=2] [ref=e881]
        - list [ref=e882]:
          - listitem [ref=e883]:
            - generic [ref=e884]: Safety
          - listitem [ref=e885]:
            - generic [ref=e886]: Contact
      - navigation "Legal" [ref=e887]:
        - heading "Legal" [level=2] [ref=e888]
        - list [ref=e889]:
          - listitem [ref=e890]:
            - generic [ref=e891]: Terms
          - listitem [ref=e892]:
            - generic [ref=e893]: Privacy
    - paragraph [ref=e895]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="6975fbd1-790c-4154-b61d-b475a4521cf2"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="6975fbd1-790c-4154-b61d-b475a4521cf2"]')

```

Context:

```text
          - listitem [ref=e899]:
            - generic [ref=e900]: About
          - listitem [ref=e901]:
            - generic [ref=e902]: How it works
      - navigation "Help" [ref=e903]:
        - heading "Help" [level=2] [ref=e904]
        - list [ref=e905]:
          - listitem [ref=e906]:
            - generic [ref=e907]: Safety
          - listitem [ref=e908]:
            - generic [ref=e909]: Contact
      - navigation "Legal" [ref=e910]:
        - heading "Legal" [level=2] [ref=e911]
        - list [ref=e912]:
          - listitem [ref=e913]:
            - generic [ref=e914]: Terms
          - listitem [ref=e915]:
            - generic [ref=e916]: Privacy
    - paragraph [ref=e918]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="b9abdc0a-0ea2-42d4-be61-6dc99c70eb55"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b9abdc0a-0ea2-42d4-be61-6dc99c70eb55"]')

```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="6774f7ad-c756-4abd-9ae5-6de2247e2a80"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="6774f7ad-c756-4abd-9ae5-6de2247e2a80"]')

```

Context:

```text
          - listitem [ref=e901]:
            - generic [ref=e902]: About
          - listitem [ref=e903]:
            - generic [ref=e904]: How it works
      - navigation "Help" [ref=e905]:
        - heading "Help" [level=2] [ref=e906]
        - list [ref=e907]:
          - listitem [ref=e908]:
            - generic [ref=e909]: Safety
          - listitem [ref=e910]:
            - generic [ref=e911]: Contact
      - navigation "Legal" [ref=e912]:
        - heading "Legal" [level=2] [ref=e913]
        - list [ref=e914]:
          - listitem [ref=e915]:
            - generic [ref=e916]: Terms
          - listitem [ref=e917]:
            - generic [ref=e918]: Privacy
    - paragraph [ref=e920]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="b39905d8-ec40-4169-b3c5-e87a5f1106cb"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b39905d8-ec40-4169-b3c5-e87a5f1106cb"]')

```

Context:

```text
          - listitem [ref=e899]:
            - generic [ref=e900]: About
          - listitem [ref=e901]:
            - generic [ref=e902]: How it works
      - navigation "Help" [ref=e903]:
        - heading "Help" [level=2] [ref=e904]
        - list [ref=e905]:
          - listitem [ref=e906]:
            - generic [ref=e907]: Safety
          - listitem [ref=e908]:
            - generic [ref=e909]: Contact
      - navigation "Legal" [ref=e910]:
        - heading "Legal" [level=2] [ref=e911]
        - list [ref=e912]:
          - listitem [ref=e913]:
            - generic [ref=e914]: Terms
          - listitem [ref=e915]:
            - generic [ref=e916]: Privacy
    - paragraph [ref=e918]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f44b6ba9-cf6e-44b7-b13c-ce5612ddbe45"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f44b6ba9-cf6e-44b7-b13c-ce5612ddbe45"]')

```

Context:

```text
          - listitem [ref=e911]:
            - generic [ref=e912]: About
          - listitem [ref=e913]:
            - generic [ref=e914]: How it works
      - navigation "Help" [ref=e915]:
        - heading "Help" [level=2] [ref=e916]
        - list [ref=e917]:
          - listitem [ref=e918]:
            - generic [ref=e919]: Safety
          - listitem [ref=e920]:
            - generic [ref=e921]: Contact
      - navigation "Legal" [ref=e922]:
        - heading "Legal" [level=2] [ref=e923]
        - list [ref=e924]:
          - listitem [ref=e925]:
            - generic [ref=e926]: Terms
          - listitem [ref=e927]:
            - generic [ref=e928]: Privacy
    - paragraph [ref=e930]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="8cdff0ac-c965-4778-b4cc-19fc0767c5a0"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="8cdff0ac-c965-4778-b4cc-19fc0767c5a0"]')

```

Context:

```text
          - listitem [ref=e905]:
            - generic [ref=e906]: About
          - listitem [ref=e907]:
            - generic [ref=e908]: How it works
      - navigation "Help" [ref=e909]:
        - heading "Help" [level=2] [ref=e910]
        - list [ref=e911]:
          - listitem [ref=e912]:
            - generic [ref=e913]: Safety
          - listitem [ref=e914]:
            - generic [ref=e915]: Contact
      - navigation "Legal" [ref=e916]:
        - heading "Legal" [level=2] [ref=e917]
        - list [ref=e918]:
          - listitem [ref=e919]:
            - generic [ref=e920]: Terms
          - listitem [ref=e921]:
            - generic [ref=e922]: Privacy
    - paragraph [ref=e924]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="b6f849fa-19c5-4aec-ab56-92f8162f27ae"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b6f849fa-19c5-4aec-ab56-92f8162f27ae"]')

```

Context:

```text
          - listitem [ref=e893]:
            - generic [ref=e894]: About
          - listitem [ref=e895]:
            - generic [ref=e896]: How it works
      - navigation "Help" [ref=e897]:
        - heading "Help" [level=2] [ref=e898]
        - list [ref=e899]:
          - listitem [ref=e900]:
            - generic [ref=e901]: Safety
          - listitem [ref=e902]:
            - generic [ref=e903]: Contact
      - navigation "Legal" [ref=e904]:
        - heading "Legal" [level=2] [ref=e905]
        - list [ref=e906]:
          - listitem [ref=e907]:
            - generic [ref=e908]: Terms
          - listitem [ref=e909]:
            - generic [ref=e910]: Privacy
    - paragraph [ref=e912]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="d598390e-93c0-4c69-9677-baabb87731c2"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="d598390e-93c0-4c69-9677-baabb87731c2"]')

```

Context:

```text
          - listitem [ref=e887]:
            - generic [ref=e888]: About
          - listitem [ref=e889]:
            - generic [ref=e890]: How it works
      - navigation "Help" [ref=e891]:
        - heading "Help" [level=2] [ref=e892]
        - list [ref=e893]:
          - listitem [ref=e894]:
            - generic [ref=e895]: Safety
          - listitem [ref=e896]:
            - generic [ref=e897]: Contact
      - navigation "Legal" [ref=e898]:
        - heading "Legal" [level=2] [ref=e899]
        - list [ref=e900]:
          - listitem [ref=e901]:
            - generic [ref=e902]: Terms
          - listitem [ref=e903]:
            - generic [ref=e904]: Privacy
    - paragraph [ref=e906]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="69fc2d98-04b6-48b8-9374-2bc6c77bc63c"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="69fc2d98-04b6-48b8-9374-2bc6c77bc63c"]')

```

Context:

```text
          - listitem [ref=e899]:
            - generic [ref=e900]: About
          - listitem [ref=e901]:
            - generic [ref=e902]: How it works
      - navigation "Help" [ref=e903]:
        - heading "Help" [level=2] [ref=e904]
        - list [ref=e905]:
          - listitem [ref=e906]:
            - generic [ref=e907]: Safety
          - listitem [ref=e908]:
            - generic [ref=e909]: Contact
      - navigation "Legal" [ref=e910]:
        - heading "Legal" [level=2] [ref=e911]
        - list [ref=e912]:
          - listitem [ref=e913]:
            - generic [ref=e914]: Terms
          - listitem [ref=e915]:
            - generic [ref=e916]: Privacy
    - paragraph [ref=e918]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="b418b2c0-ab55-4541-9bd7-b8ba8acd394a"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b418b2c0-ab55-4541-9bd7-b8ba8acd394a"]')

```

Context:

```text
          - listitem [ref=e881]:
            - generic [ref=e882]: About
          - listitem [ref=e883]:
            - generic [ref=e884]: How it works
      - navigation "Help" [ref=e885]:
        - heading "Help" [level=2] [ref=e886]
        - list [ref=e887]:
          - listitem [ref=e888]:
            - generic [ref=e889]: Safety
          - listitem [ref=e890]:
            - generic [ref=e891]: Contact
      - navigation "Legal" [ref=e892]:
        - heading "Legal" [level=2] [ref=e893]
        - list [ref=e894]:
          - listitem [ref=e895]:
            - generic [ref=e896]: Terms
          - listitem [ref=e897]:
            - generic [ref=e898]: Privacy
    - paragraph [ref=e900]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="495c016a-4816-4556-aa2f-621ed97a9781"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="495c016a-4816-4556-aa2f-621ed97a9781"]')

```

Context:

```text
          - listitem [ref=e887]:
            - generic [ref=e888]: About
          - listitem [ref=e889]:
            - generic [ref=e890]: How it works
      - navigation "Help" [ref=e891]:
        - heading "Help" [level=2] [ref=e892]
        - list [ref=e893]:
          - listitem [ref=e894]:
            - generic [ref=e895]: Safety
          - listitem [ref=e896]:
            - generic [ref=e897]: Contact
      - navigation "Legal" [ref=e898]:
        - heading "Legal" [level=2] [ref=e899]
        - list [ref=e900]:
          - listitem [ref=e901]:
            - generic [ref=e902]: Terms
          - listitem [ref=e903]:
            - generic [ref=e904]: Privacy
    - paragraph [ref=e906]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="d75b5e42-635c-479b-b3da-6eea99660d7e"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="d75b5e42-635c-479b-b3da-6eea99660d7e"]')

```

Context:

```text
          - listitem [ref=e875]:
            - generic [ref=e876]: About
          - listitem [ref=e877]:
            - generic [ref=e878]: How it works
      - navigation "Help" [ref=e879]:
        - heading "Help" [level=2] [ref=e880]
        - list [ref=e881]:
          - listitem [ref=e882]:
            - generic [ref=e883]: Safety
          - listitem [ref=e884]:
            - generic [ref=e885]: Contact
      - navigation "Legal" [ref=e886]:
        - heading "Legal" [level=2] [ref=e887]
        - list [ref=e888]:
          - listitem [ref=e889]:
            - generic [ref=e890]: Terms
          - listitem [ref=e891]:
            - generic [ref=e892]: Privacy
    - paragraph [ref=e894]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="32d428b2-ee00-4333-8226-afba798ab365"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="32d428b2-ee00-4333-8226-afba798ab365"]')

```

Context:

```text
          - listitem [ref=e881]:
            - generic [ref=e882]: About
          - listitem [ref=e883]:
            - generic [ref=e884]: How it works
      - navigation "Help" [ref=e885]:
        - heading "Help" [level=2] [ref=e886]
        - list [ref=e887]:
          - listitem [ref=e888]:
            - generic [ref=e889]: Safety
          - listitem [ref=e890]:
            - generic [ref=e891]: Contact
      - navigation "Legal" [ref=e892]:
        - heading "Legal" [level=2] [ref=e893]
        - list [ref=e894]:
          - listitem [ref=e895]:
            - generic [ref=e896]: Terms
          - listitem [ref=e897]:
            - generic [ref=e898]: Privacy
    - paragraph [ref=e900]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="2779e643-9853-4d06-9cf9-e80775263052"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="2779e643-9853-4d06-9cf9-e80775263052"]')

```

Context:

```text
          - listitem [ref=e893]:
            - generic [ref=e894]: About
          - listitem [ref=e895]:
            - generic [ref=e896]: How it works
      - navigation "Help" [ref=e897]:
        - heading "Help" [level=2] [ref=e898]
        - list [ref=e899]:
          - listitem [ref=e900]:
            - generic [ref=e901]: Safety
          - listitem [ref=e902]:
            - generic [ref=e903]: Contact
      - navigation "Legal" [ref=e904]:
        - heading "Legal" [level=2] [ref=e905]
        - list [ref=e906]:
          - listitem [ref=e907]:
            - generic [ref=e908]: Terms
          - listitem [ref=e909]:
            - generic [ref=e910]: Privacy
    - paragraph [ref=e912]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's allowed set narrows and locks a sibling picker

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f95e7c43-8e23-4c37-8068-bcec9b92013a"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f95e7c43-8e23-4c37-8068-bcec9b92013a"]')

```

Context:

```text
          - listitem [ref=e893]:
            - generic [ref=e894]: About
          - listitem [ref=e895]:
            - generic [ref=e896]: How it works
      - navigation "Help" [ref=e897]:
        - heading "Help" [level=2] [ref=e898]
        - list [ref=e899]:
          - listitem [ref=e900]:
            - generic [ref=e901]: Safety
          - listitem [ref=e902]:
            - generic [ref=e903]: Contact
      - navigation "Legal" [ref=e904]:
        - heading "Legal" [level=2] [ref=e905]
        - list [ref=e906]:
          - listitem [ref=e907]:
            - generic [ref=e908]: Terms
          - listitem [ref=e909]:
            - generic [ref=e910]: Privacy
    - paragraph [ref=e912]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-46: the imported category never reached the wizard's tree

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Test timeout of 60000ms exceeded
```

Context:

```text
          - listitem [ref=e1331]:
            - generic [ref=e1332]: About
          - listitem [ref=e1333]:
            - generic [ref=e1334]: How it works
      - navigation "Help" [ref=e1335]:
        - heading "Help" [level=2] [ref=e1336]
        - list [ref=e1337]:
          - listitem [ref=e1338]:
            - generic [ref=e1339]: Safety
          - listitem [ref=e1340]:
            - generic [ref=e1341]: Contact
      - navigation "Legal" [ref=e1342]:
        - heading "Legal" [level=2] [ref=e1343]
        - list [ref=e1344]:
          - listitem [ref=e1345]:
            - generic [ref=e1346]: Terms
          - listitem [ref=e1347]:
            - generic [ref=e1348]: Privacy
    - paragraph [ref=e1350]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e1367]:
            - generic [ref=e1368]: About
          - listitem [ref=e1369]:
            - generic [ref=e1370]: How it works
      - navigation "Help" [ref=e1371]:
        - heading "Help" [level=2] [ref=e1372]
        - list [ref=e1373]:
          - listitem [ref=e1374]:
            - generic [ref=e1375]: Safety
          - listitem [ref=e1376]:
            - generic [ref=e1377]: Contact
      - navigation "Legal" [ref=e1378]:
        - heading "Legal" [level=2] [ref=e1379]
        - list [ref=e1380]:
          - listitem [ref=e1381]:
            - generic [ref=e1382]: Terms
          - listitem [ref=e1383]:
            - generic [ref=e1384]: Privacy
    - paragraph [ref=e1386]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ded6bb1d-7ee3-4f79-87d1-c0760fa7f4d5"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ded6bb1d-7ee3-4f79-87d1-c0760fa7f4d5"]')

```

Context:

```text
          - listitem [ref=e1001]:
            - generic [ref=e1002]: About
          - listitem [ref=e1003]:
            - generic [ref=e1004]: How it works
      - navigation "Help" [ref=e1005]:
        - heading "Help" [level=2] [ref=e1006]
        - list [ref=e1007]:
          - listitem [ref=e1008]:
            - generic [ref=e1009]: Safety
          - listitem [ref=e1010]:
            - generic [ref=e1011]: Contact
      - navigation "Legal" [ref=e1012]:
        - heading "Legal" [level=2] [ref=e1013]
        - list [ref=e1014]:
          - listitem [ref=e1015]:
            - generic [ref=e1016]: Terms
          - listitem [ref=e1017]:
            - generic [ref=e1018]: Privacy
    - paragraph [ref=e1020]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="b54d9270-1e5e-4807-863f-74944c6616ca"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b54d9270-1e5e-4807-863f-74944c6616ca"]')

```

Context:

```text
          - listitem [ref=e995]:
            - generic [ref=e996]: About
          - listitem [ref=e997]:
            - generic [ref=e998]: How it works
      - navigation "Help" [ref=e999]:
        - heading "Help" [level=2] [ref=e1000]
        - list [ref=e1001]:
          - listitem [ref=e1002]:
            - generic [ref=e1003]: Safety
          - listitem [ref=e1004]:
            - generic [ref=e1005]: Contact
      - navigation "Legal" [ref=e1006]:
        - heading "Legal" [level=2] [ref=e1007]
        - list [ref=e1008]:
          - listitem [ref=e1009]:
            - generic [ref=e1010]: Terms
          - listitem [ref=e1011]:
            - generic [ref=e1012]: Privacy
    - paragraph [ref=e1014]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f79dbc66-44f3-4bb3-8d84-c593dd82d683"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f79dbc66-44f3-4bb3-8d84-c593dd82d683"]')

```

Context:

```text
          - listitem [ref=e1001]:
            - generic [ref=e1002]: About
          - listitem [ref=e1003]:
            - generic [ref=e1004]: How it works
      - navigation "Help" [ref=e1005]:
        - heading "Help" [level=2] [ref=e1006]
        - list [ref=e1007]:
          - listitem [ref=e1008]:
            - generic [ref=e1009]: Safety
          - listitem [ref=e1010]:
            - generic [ref=e1011]: Contact
      - navigation "Legal" [ref=e1012]:
        - heading "Legal" [level=2] [ref=e1013]
        - list [ref=e1014]:
          - listitem [ref=e1015]:
            - generic [ref=e1016]: Terms
          - listitem [ref=e1017]:
            - generic [ref=e1018]: Privacy
    - paragraph [ref=e1020]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="5cdf2297-bf1a-4f9b-98c4-ea2440fa91e4"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="5cdf2297-bf1a-4f9b-98c4-ea2440fa91e4"]')

```

Context:

```text
          - listitem [ref=e1025]:
            - generic [ref=e1026]: ስለ እኛ
          - listitem [ref=e1027]:
            - generic [ref=e1028]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e1029]:
        - heading "እገዛ" [level=2] [ref=e1030]
        - list [ref=e1031]:
          - listitem [ref=e1032]:
            - generic [ref=e1033]: ደህንነት
          - listitem [ref=e1034]:
            - generic [ref=e1035]: ያግኙን
      - navigation "ሕጋዊ" [ref=e1036]:
        - heading "ሕጋዊ" [level=2] [ref=e1037]
        - list [ref=e1038]:
          - listitem [ref=e1039]:
            - generic [ref=e1040]: ውሎች
          - listitem [ref=e1041]:
            - generic [ref=e1042]: ግላዊነት
    - paragraph [ref=e1044]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

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

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
