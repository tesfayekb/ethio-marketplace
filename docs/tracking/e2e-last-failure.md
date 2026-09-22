# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35691977174
- Commit: `5f37392c04956c0983586a33d619c519e340fb57`
- Attempt: 1
- Written (UTC): 2026-09-22T06:07:21.217Z
- Passed: 828 · Skipped: 74 · Failed: 48
- Gating failures: 48 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 13
- Post-test errors (DEC-059, non-gating): shard 3, shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact — Error: expect(locator).toBeVisible() failed

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 102 user(s) owned by process 35691977174-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 94 user(s) owned by process 35691977174-6
```

## post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="9d1b81d4-8077-40dd-87e1-5a0aa1eff7f9"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="9d1b81d4-8077-40dd-87e1-5a0aa1eff7f9"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="3f15b9ba-62a6-456e-a6eb-d11bc7905e8f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="3f15b9ba-62a6-456e-a6eb-d11bc7905e8f"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="b3006aa3-32e0-4024-ada2-56f442e4cd59"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b3006aa3-32e0-4024-ada2-56f442e4cd59"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="4016250a-1e1d-4c49-990e-0a2a3081fd99"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="4016250a-1e1d-4c49-990e-0a2a3081fd99"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="cf764e3f-998b-4967-935f-5d6da616ef22"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="cf764e3f-998b-4967-935f-5d6da616ef22"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="5bad603c-7d90-41e5-9aad-ce924590e51b"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="5bad603c-7d90-41e5-9aad-ce924590e51b"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="14c6b36f-44c3-451a-9926-66fc5c2eb9e3"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="14c6b36f-44c3-451a-9926-66fc5c2eb9e3"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="e14599c8-c3c7-4e7b-b892-6649c1c2abb7"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="e14599c8-c3c7-4e7b-b892-6649c1c2abb7"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="48cd6517-15ec-4d34-8ade-78a39e4bc5ac"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="48cd6517-15ec-4d34-8ade-78a39e4bc5ac"]')

```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="850767f8-829b-4ce6-812d-df53d20368cf"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="850767f8-829b-4ce6-812d-df53d20368cf"]')

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

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="921c2398-859b-497b-b4ff-e1a097d5c3ba"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="921c2398-859b-497b-b4ff-e1a097d5c3ba"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="15ebd313-79be-41d0-88ac-f06f95b1b24f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="15ebd313-79be-41d0-88ac-f06f95b1b24f"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="7f951562-121c-4cc6-9820-c4012a15d03b"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="7f951562-121c-4cc6-9820-c4012a15d03b"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="ab9066e5-79a6-43f7-9db6-c66d5c809eb3"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ab9066e5-79a6-43f7-9db6-c66d5c809eb3"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="bdedff5a-4650-4d38-9c72-a9dfdc4cc5a0"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="bdedff5a-4650-4d38-9c72-a9dfdc4cc5a0"]')

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

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="d3248d90-57f9-48bf-a601-a0a14f671753"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="d3248d90-57f9-48bf-a601-a0a14f671753"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="bc98c9e8-78f3-4c66-b6ca-9fa7cea59930"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="bc98c9e8-78f3-4c66-b6ca-9fa7cea59930"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="d5e27ede-e628-48f6-80f7-b7b09b519872"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="d5e27ede-e628-48f6-80f7-b7b09b519872"]')

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

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="e8fcbedf-1b64-4897-ac6f-7c67d60d586e"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="e8fcbedf-1b64-4897-ac6f-7c67d60d586e"]')

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

## post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="466156e7-658b-4fbc-9ac3-7f848043e47a"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="466156e7-658b-4fbc-9ac3-7f848043e47a"]')

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

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="5f39562b-916c-4d05-91fe-791f3350c876"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="5f39562b-916c-4d05-91fe-791f3350c876"]')

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

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="98965f0e-61b2-4c8e-9a62-ba2b2b461e30"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="98965f0e-61b2-4c8e-9a62-ba2b2b461e30"]')

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

Locator: locator('[data-testid="post-category-hit"][data-category="b33fa4e8-38c1-4db3-8ecf-7c3945fc8db3"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="b33fa4e8-38c1-4db3-8ecf-7c3945fc8db3"]')

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

## post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="201b81b4-b655-420b-babb-73aa30ca1297"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="201b81b4-b655-420b-babb-73aa30ca1297"]')

```

Context:

```text
          - listitem [ref=e1073]:
            - generic [ref=e1074]: About
          - listitem [ref=e1075]:
            - generic [ref=e1076]: How it works
      - navigation "Help" [ref=e1077]:
        - heading "Help" [level=2] [ref=e1078]
        - list [ref=e1079]:
          - listitem [ref=e1080]:
            - generic [ref=e1081]: Safety
          - listitem [ref=e1082]:
            - generic [ref=e1083]: Contact
      - navigation "Legal" [ref=e1084]:
        - heading "Legal" [level=2] [ref=e1085]
        - list [ref=e1086]:
          - listitem [ref=e1087]:
            - generic [ref=e1088]: Terms
          - listitem [ref=e1089]:
            - generic [ref=e1090]: Privacy
    - paragraph [ref=e1092]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="893e31d8-57b9-4682-ae86-24c10149a3f1"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="893e31d8-57b9-4682-ae86-24c10149a3f1"]')

```

Context:

```text
          - listitem [ref=e1111]:
            - generic [ref=e1112]: About
          - listitem [ref=e1113]:
            - generic [ref=e1114]: How it works
      - navigation "Help" [ref=e1115]:
        - heading "Help" [level=2] [ref=e1116]
        - list [ref=e1117]:
          - listitem [ref=e1118]:
            - generic [ref=e1119]: Safety
          - listitem [ref=e1120]:
            - generic [ref=e1121]: Contact
      - navigation "Legal" [ref=e1122]:
        - heading "Legal" [level=2] [ref=e1123]
        - list [ref=e1124]:
          - listitem [ref=e1125]:
            - generic [ref=e1126]: Terms
          - listitem [ref=e1127]:
            - generic [ref=e1128]: Privacy
    - paragraph [ref=e1130]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="d34a3ea3-d10a-423a-85df-dbd1d693bbe9"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="d34a3ea3-d10a-423a-85df-dbd1d693bbe9"]')

```

Context:

```text
          - listitem [ref=e1112]:
            - generic [ref=e1113]: About
          - listitem [ref=e1114]:
            - generic [ref=e1115]: How it works
      - navigation "Help" [ref=e1116]:
        - heading "Help" [level=2] [ref=e1117]
        - list [ref=e1118]:
          - listitem [ref=e1119]:
            - generic [ref=e1120]: Safety
          - listitem [ref=e1121]:
            - generic [ref=e1122]: Contact
      - navigation "Legal" [ref=e1123]:
        - heading "Legal" [level=2] [ref=e1124]
        - list [ref=e1125]:
          - listitem [ref=e1126]:
            - generic [ref=e1127]: Terms
          - listitem [ref=e1128]:
            - generic [ref=e1129]: Privacy
    - paragraph [ref=e1131]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="90dd0a7b-4ebf-400f-be64-78d08804c9ad"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="90dd0a7b-4ebf-400f-be64-78d08804c9ad"]')

```

Context:

```text
          - listitem [ref=e1113]:
            - generic [ref=e1114]: About
          - listitem [ref=e1115]:
            - generic [ref=e1116]: How it works
      - navigation "Help" [ref=e1117]:
        - heading "Help" [level=2] [ref=e1118]
        - list [ref=e1119]:
          - listitem [ref=e1120]:
            - generic [ref=e1121]: Safety
          - listitem [ref=e1122]:
            - generic [ref=e1123]: Contact
      - navigation "Legal" [ref=e1124]:
        - heading "Legal" [level=2] [ref=e1125]
        - list [ref=e1126]:
          - listitem [ref=e1127]:
            - generic [ref=e1128]: Terms
          - listitem [ref=e1129]:
            - generic [ref=e1130]: Privacy
    - paragraph [ref=e1132]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ec3a5c80-7891-4e3b-9ab3-d87def750572"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ec3a5c80-7891-4e3b-9ab3-d87def750572"]')

```

Context:

```text
          - listitem [ref=e1105]:
            - generic [ref=e1106]: About
          - listitem [ref=e1107]:
            - generic [ref=e1108]: How it works
      - navigation "Help" [ref=e1109]:
        - heading "Help" [level=2] [ref=e1110]
        - list [ref=e1111]:
          - listitem [ref=e1112]:
            - generic [ref=e1113]: Safety
          - listitem [ref=e1114]:
            - generic [ref=e1115]: Contact
      - navigation "Legal" [ref=e1116]:
        - heading "Legal" [level=2] [ref=e1117]
        - list [ref=e1118]:
          - listitem [ref=e1119]:
            - generic [ref=e1120]: Terms
          - listitem [ref=e1121]:
            - generic [ref=e1122]: Privacy
    - paragraph [ref=e1124]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="21440deb-4396-42c3-b160-f10ac205bd94"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="21440deb-4396-42c3-b160-f10ac205bd94"]')

```

Context:

```text
          - listitem [ref=e1105]:
            - generic [ref=e1106]: About
          - listitem [ref=e1107]:
            - generic [ref=e1108]: How it works
      - navigation "Help" [ref=e1109]:
        - heading "Help" [level=2] [ref=e1110]
        - list [ref=e1111]:
          - listitem [ref=e1112]:
            - generic [ref=e1113]: Safety
          - listitem [ref=e1114]:
            - generic [ref=e1115]: Contact
      - navigation "Legal" [ref=e1116]:
        - heading "Legal" [level=2] [ref=e1117]
        - list [ref=e1118]:
          - listitem [ref=e1119]:
            - generic [ref=e1120]: Terms
          - listitem [ref=e1121]:
            - generic [ref=e1122]: Privacy
    - paragraph [ref=e1124]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="ac6a8a4c-52b9-49ca-98a0-02b1d708a9d7"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="ac6a8a4c-52b9-49ca-98a0-02b1d708a9d7"]')

```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="fcd2c5fd-a4a5-4093-bbab-a3a05aefaf06"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="fcd2c5fd-a4a5-4093-bbab-a3a05aefaf06"]')

```

Context:

```text
          - listitem [ref=e1104]:
            - generic [ref=e1105]: About
          - listitem [ref=e1106]:
            - generic [ref=e1107]: How it works
      - navigation "Help" [ref=e1108]:
        - heading "Help" [level=2] [ref=e1109]
        - list [ref=e1110]:
          - listitem [ref=e1111]:
            - generic [ref=e1112]: Safety
          - listitem [ref=e1113]:
            - generic [ref=e1114]: Contact
      - navigation "Legal" [ref=e1115]:
        - heading "Legal" [level=2] [ref=e1116]
        - list [ref=e1117]:
          - listitem [ref=e1118]:
            - generic [ref=e1119]: Terms
          - listitem [ref=e1120]:
            - generic [ref=e1121]: Privacy
    - paragraph [ref=e1123]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="46ba9420-7ca6-4c37-a38d-884f80703321"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="46ba9420-7ca6-4c37-a38d-884f80703321"]')

```

Context:

```text
          - listitem [ref=e1109]:
            - generic [ref=e1110]: About
          - listitem [ref=e1111]:
            - generic [ref=e1112]: How it works
      - navigation "Help" [ref=e1113]:
        - heading "Help" [level=2] [ref=e1114]
        - list [ref=e1115]:
          - listitem [ref=e1116]:
            - generic [ref=e1117]: Safety
          - listitem [ref=e1118]:
            - generic [ref=e1119]: Contact
      - navigation "Legal" [ref=e1120]:
        - heading "Legal" [level=2] [ref=e1121]
        - list [ref=e1122]:
          - listitem [ref=e1123]:
            - generic [ref=e1124]: Terms
          - listitem [ref=e1125]:
            - generic [ref=e1126]: Privacy
    - paragraph [ref=e1128]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="39593f0c-7adb-4aa5-8ed9-e803573e0820"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="39593f0c-7adb-4aa5-8ed9-e803573e0820"]')

```

Context:

```text
          - listitem [ref=e1086]:
            - generic [ref=e1087]: About
          - listitem [ref=e1088]:
            - generic [ref=e1089]: How it works
      - navigation "Help" [ref=e1090]:
        - heading "Help" [level=2] [ref=e1091]
        - list [ref=e1092]:
          - listitem [ref=e1093]:
            - generic [ref=e1094]: Safety
          - listitem [ref=e1095]:
            - generic [ref=e1096]: Contact
      - navigation "Legal" [ref=e1097]:
        - heading "Legal" [level=2] [ref=e1098]
        - list [ref=e1099]:
          - listitem [ref=e1100]:
            - generic [ref=e1101]: Terms
          - listitem [ref=e1102]:
            - generic [ref=e1103]: Privacy
    - paragraph [ref=e1105]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="159b3cc2-4949-482a-a320-77187942a8fa"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="159b3cc2-4949-482a-a320-77187942a8fa"]')

```

Context:

```text
          - listitem [ref=e1103]:
            - generic [ref=e1104]: About
          - listitem [ref=e1105]:
            - generic [ref=e1106]: How it works
      - navigation "Help" [ref=e1107]:
        - heading "Help" [level=2] [ref=e1108]
        - list [ref=e1109]:
          - listitem [ref=e1110]:
            - generic [ref=e1111]: Safety
          - listitem [ref=e1112]:
            - generic [ref=e1113]: Contact
      - navigation "Legal" [ref=e1114]:
        - heading "Legal" [level=2] [ref=e1115]
        - list [ref=e1116]:
          - listitem [ref=e1117]:
            - generic [ref=e1118]: Terms
          - listitem [ref=e1119]:
            - generic [ref=e1120]: Privacy
    - paragraph [ref=e1122]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="c14a9ad4-7b97-4aa9-8c6a-22d9794d853e"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="c14a9ad4-7b97-4aa9-8c6a-22d9794d853e"]')

```

Context:

```text
          - listitem [ref=e1097]:
            - generic [ref=e1098]: About
          - listitem [ref=e1099]:
            - generic [ref=e1100]: How it works
      - navigation "Help" [ref=e1101]:
        - heading "Help" [level=2] [ref=e1102]
        - list [ref=e1103]:
          - listitem [ref=e1104]:
            - generic [ref=e1105]: Safety
          - listitem [ref=e1106]:
            - generic [ref=e1107]: Contact
      - navigation "Legal" [ref=e1108]:
        - heading "Legal" [level=2] [ref=e1109]
        - list [ref=e1110]:
          - listitem [ref=e1111]:
            - generic [ref=e1112]: Terms
          - listitem [ref=e1113]:
            - generic [ref=e1114]: Privacy
    - paragraph [ref=e1116]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="355861d4-e78f-4971-bf33-b19d2eb27b75"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="355861d4-e78f-4971-bf33-b19d2eb27b75"]')

```

Context:

```text
          - listitem [ref=e1097]:
            - generic [ref=e1098]: About
          - listitem [ref=e1099]:
            - generic [ref=e1100]: How it works
      - navigation "Help" [ref=e1101]:
        - heading "Help" [level=2] [ref=e1102]
        - list [ref=e1103]:
          - listitem [ref=e1104]:
            - generic [ref=e1105]: Safety
          - listitem [ref=e1106]:
            - generic [ref=e1107]: Contact
      - navigation "Legal" [ref=e1108]:
        - heading "Legal" [level=2] [ref=e1109]
        - list [ref=e1110]:
          - listitem [ref=e1111]:
            - generic [ref=e1112]: Terms
          - listitem [ref=e1113]:
            - generic [ref=e1114]: Privacy
    - paragraph [ref=e1116]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="f9a23b3d-cac5-4a28-904d-8e827ba6fe18"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="f9a23b3d-cac5-4a28-904d-8e827ba6fe18"]')

```

Context:

```text
          - listitem [ref=e1086]:
            - generic [ref=e1087]: About
          - listitem [ref=e1088]:
            - generic [ref=e1089]: How it works
      - navigation "Help" [ref=e1090]:
        - heading "Help" [level=2] [ref=e1091]
        - list [ref=e1092]:
          - listitem [ref=e1093]:
            - generic [ref=e1094]: Safety
          - listitem [ref=e1095]:
            - generic [ref=e1096]: Contact
      - navigation "Legal" [ref=e1097]:
        - heading "Legal" [level=2] [ref=e1098]
        - list [ref=e1099]:
          - listitem [ref=e1100]:
            - generic [ref=e1101]: Terms
          - listitem [ref=e1102]:
            - generic [ref=e1103]: Privacy
    - paragraph [ref=e1105]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="6e907daa-11fe-4a55-84bd-d5b587a6bb52"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="6e907daa-11fe-4a55-84bd-d5b587a6bb52"]')

```

Context:

```text
          - listitem [ref=e1080]:
            - generic [ref=e1081]: About
          - listitem [ref=e1082]:
            - generic [ref=e1083]: How it works
      - navigation "Help" [ref=e1084]:
        - heading "Help" [level=2] [ref=e1085]
        - list [ref=e1086]:
          - listitem [ref=e1087]:
            - generic [ref=e1088]: Safety
          - listitem [ref=e1089]:
            - generic [ref=e1090]: Contact
      - navigation "Legal" [ref=e1091]:
        - heading "Legal" [level=2] [ref=e1092]
        - list [ref=e1093]:
          - listitem [ref=e1094]:
            - generic [ref=e1095]: Terms
          - listitem [ref=e1096]:
            - generic [ref=e1097]: Privacy
    - paragraph [ref=e1099]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="57010f13-2739-46dc-ac5f-d139b860a500"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="57010f13-2739-46dc-ac5f-d139b860a500"]')

```

Context:

```text
          - listitem [ref=e1092]:
            - generic [ref=e1093]: About
          - listitem [ref=e1094]:
            - generic [ref=e1095]: How it works
      - navigation "Help" [ref=e1096]:
        - heading "Help" [level=2] [ref=e1097]
        - list [ref=e1098]:
          - listitem [ref=e1099]:
            - generic [ref=e1100]: Safety
          - listitem [ref=e1101]:
            - generic [ref=e1102]: Contact
      - navigation "Legal" [ref=e1103]:
        - heading "Legal" [level=2] [ref=e1104]
        - list [ref=e1105]:
          - listitem [ref=e1106]:
            - generic [ref=e1107]: Terms
          - listitem [ref=e1108]:
            - generic [ref=e1109]: Privacy
    - paragraph [ref=e1111]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="38d5f9ae-acef-4a6d-b2ec-a93408a62bf7"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="38d5f9ae-acef-4a6d-b2ec-a93408a62bf7"]')

```

Context:

```text
          - listitem [ref=e1086]:
            - generic [ref=e1087]: About
          - listitem [ref=e1088]:
            - generic [ref=e1089]: How it works
      - navigation "Help" [ref=e1090]:
        - heading "Help" [level=2] [ref=e1091]
        - list [ref=e1092]:
          - listitem [ref=e1093]:
            - generic [ref=e1094]: Safety
          - listitem [ref=e1095]:
            - generic [ref=e1096]: Contact
      - navigation "Legal" [ref=e1097]:
        - heading "Legal" [level=2] [ref=e1098]
        - list [ref=e1099]:
          - listitem [ref=e1100]:
            - generic [ref=e1101]: Terms
          - listitem [ref=e1102]:
            - generic [ref=e1103]: Privacy
    - paragraph [ref=e1105]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="991434cd-8d9c-4d7d-b834-4a7611e13f05"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="991434cd-8d9c-4d7d-b834-4a7611e13f05"]')

```

Context:

```text
          - listitem [ref=e1073]:
            - generic [ref=e1074]: About
          - listitem [ref=e1075]:
            - generic [ref=e1076]: How it works
      - navigation "Help" [ref=e1077]:
        - heading "Help" [level=2] [ref=e1078]
        - list [ref=e1079]:
          - listitem [ref=e1080]:
            - generic [ref=e1081]: Safety
          - listitem [ref=e1082]:
            - generic [ref=e1083]: Contact
      - navigation "Legal" [ref=e1084]:
        - heading "Legal" [level=2] [ref=e1085]
        - list [ref=e1086]:
          - listitem [ref=e1087]:
            - generic [ref=e1088]: Terms
          - listitem [ref=e1089]:
            - generic [ref=e1090]: Privacy
    - paragraph [ref=e1092]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="8d4aa335-b94f-4a56-a106-34b78c46937e"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="8d4aa335-b94f-4a56-a106-34b78c46937e"]')

```

Context:

```text
          - listitem [ref=e1079]:
            - generic [ref=e1080]: About
          - listitem [ref=e1081]:
            - generic [ref=e1082]: How it works
      - navigation "Help" [ref=e1083]:
        - heading "Help" [level=2] [ref=e1084]
        - list [ref=e1085]:
          - listitem [ref=e1086]:
            - generic [ref=e1087]: Safety
          - listitem [ref=e1088]:
            - generic [ref=e1089]: Contact
      - navigation "Legal" [ref=e1090]:
        - heading "Legal" [level=2] [ref=e1091]
        - list [ref=e1092]:
          - listitem [ref=e1093]:
            - generic [ref=e1094]: Terms
          - listitem [ref=e1095]:
            - generic [ref=e1096]: Privacy
    - paragraph [ref=e1098]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's allowed set narrows and locks a sibling picker

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="6e43fe94-625c-400a-95b9-64c1f2e07e5c"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="6e43fe94-625c-400a-95b9-64c1f2e07e5c"]')

```

Context:

```text
          - listitem [ref=e1086]:
            - generic [ref=e1087]: About
          - listitem [ref=e1088]:
            - generic [ref=e1089]: How it works
      - navigation "Help" [ref=e1090]:
        - heading "Help" [level=2] [ref=e1091]
        - list [ref=e1092]:
          - listitem [ref=e1093]:
            - generic [ref=e1094]: Safety
          - listitem [ref=e1095]:
            - generic [ref=e1096]: Contact
      - navigation "Legal" [ref=e1097]:
        - heading "Legal" [level=2] [ref=e1098]
        - list [ref=e1099]:
          - listitem [ref=e1100]:
            - generic [ref=e1101]: Terms
          - listitem [ref=e1102]:
            - generic [ref=e1103]: Privacy
    - paragraph [ref=e1105]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="6c30dbd6-de95-4517-a399-aa8b9a02905b"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="6c30dbd6-de95-4517-a399-aa8b9a02905b"]')

```

Context:

```text
          - listitem [ref=e1121]:
            - generic [ref=e1122]: About
          - listitem [ref=e1123]:
            - generic [ref=e1124]: How it works
      - navigation "Help" [ref=e1125]:
        - heading "Help" [level=2] [ref=e1126]
        - list [ref=e1127]:
          - listitem [ref=e1128]:
            - generic [ref=e1129]: Safety
          - listitem [ref=e1130]:
            - generic [ref=e1131]: Contact
      - navigation "Legal" [ref=e1132]:
        - heading "Legal" [level=2] [ref=e1133]
        - list [ref=e1134]:
          - listitem [ref=e1135]:
            - generic [ref=e1136]: Terms
          - listitem [ref=e1137]:
            - generic [ref=e1138]: Privacy
    - paragraph [ref=e1140]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="506f6fa2-0de7-49e8-a08f-7e9e44b600af"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="506f6fa2-0de7-49e8-a08f-7e9e44b600af"]')

```

Context:

```text
          - listitem [ref=e1163]:
            - generic [ref=e1164]: About
          - listitem [ref=e1165]:
            - generic [ref=e1166]: How it works
      - navigation "Help" [ref=e1167]:
        - heading "Help" [level=2] [ref=e1168]
        - list [ref=e1169]:
          - listitem [ref=e1170]:
            - generic [ref=e1171]: Safety
          - listitem [ref=e1172]:
            - generic [ref=e1173]: Contact
      - navigation "Legal" [ref=e1174]:
        - heading "Legal" [level=2] [ref=e1175]
        - list [ref=e1176]:
          - listitem [ref=e1177]:
            - generic [ref=e1178]: Terms
          - listitem [ref=e1179]:
            - generic [ref=e1180]: Privacy
    - paragraph [ref=e1182]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="36ec6d96-fa6d-41b8-9431-f88cf3f1dd36"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="36ec6d96-fa6d-41b8-9431-f88cf3f1dd36"]')

```

Context:

```text
          - listitem [ref=e1151]:
            - generic [ref=e1152]: About
          - listitem [ref=e1153]:
            - generic [ref=e1154]: How it works
      - navigation "Help" [ref=e1155]:
        - heading "Help" [level=2] [ref=e1156]
        - list [ref=e1157]:
          - listitem [ref=e1158]:
            - generic [ref=e1159]: Safety
          - listitem [ref=e1160]:
            - generic [ref=e1161]: Contact
      - navigation "Legal" [ref=e1162]:
        - heading "Legal" [level=2] [ref=e1163]
        - list [ref=e1164]:
          - listitem [ref=e1165]:
            - generic [ref=e1166]: Terms
          - listitem [ref=e1167]:
            - generic [ref=e1168]: Privacy
    - paragraph [ref=e1170]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="3a7d8259-451c-4ea9-b4fe-46943448cdc3"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="3a7d8259-451c-4ea9-b4fe-46943448cdc3"]')

```

Context:

```text
          - listitem [ref=e1139]:
            - generic [ref=e1140]: ስለ እኛ
          - listitem [ref=e1141]:
            - generic [ref=e1142]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e1143]:
        - heading "እገዛ" [level=2] [ref=e1144]
        - list [ref=e1145]:
          - listitem [ref=e1146]:
            - generic [ref=e1147]: ደህንነት
          - listitem [ref=e1148]:
            - generic [ref=e1149]: ያግኙን
      - navigation "ሕጋዊ" [ref=e1150]:
        - heading "ሕጋዊ" [level=2] [ref=e1151]
        - list [ref=e1152]:
          - listitem [ref=e1153]:
            - generic [ref=e1154]: ውሎች
          - listitem [ref=e1155]:
            - generic [ref=e1156]: ግላዊነት
    - paragraph [ref=e1158]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="2f28d4da-a02b-4754-aa09-a789174cf91f"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="2f28d4da-a02b-4754-aa09-a789174cf91f"]')

```

Context:

```text
          - listitem [ref=e1145]:
            - generic [ref=e1146]: About
          - listitem [ref=e1147]:
            - generic [ref=e1148]: How it works
      - navigation "Help" [ref=e1149]:
        - heading "Help" [level=2] [ref=e1150]
        - list [ref=e1151]:
          - listitem [ref=e1152]:
            - generic [ref=e1153]: Safety
          - listitem [ref=e1154]:
            - generic [ref=e1155]: Contact
      - navigation "Legal" [ref=e1156]:
        - heading "Legal" [level=2] [ref=e1157]
        - list [ref=e1158]:
          - listitem [ref=e1159]:
            - generic [ref=e1160]: Terms
          - listitem [ref=e1161]:
            - generic [ref=e1162]: Privacy
    - paragraph [ref=e1164]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
