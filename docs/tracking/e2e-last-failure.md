# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36362240778 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36362240778
- Commit: `98d2cd2c1a5eb616520ae7300ffd4695da3d1882`
- Attempt: 2
- Written (UTC): 2026-09-28T00:56:18.745Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo — Error: []
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) — Error: PW-35: the review never opened

## Flaky bodies (DEC-078)

### admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e824]:
            - generic [ref=e825]: About
          - listitem [ref=e826]:
            - generic [ref=e827]: How it works
      - navigation "Help" [ref=e828]:
        - heading "Help" [level=2] [ref=e829]
        - list [ref=e830]:
          - listitem [ref=e831]:
            - generic [ref=e832]: Safety
          - listitem [ref=e833]:
            - generic [ref=e834]: Contact
      - navigation "Legal" [ref=e835]:
        - heading "Legal" [level=2] [ref=e836]
        - list [ref=e837]:
          - listitem [ref=e838]:
            - generic [ref=e839]: Terms
          - listitem [ref=e840]:
            - generic [ref=e841]: Privacy
    - paragraph [ref=e843]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo

- Source: `changed`
- Project: `desktop-1280`

```text
Error: []

expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 1,
-   "changes": 1,
+   "changes": 2,
    "refusals": 0,
  }
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

### post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-35: the review never opened

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-35: the review never opened with timeout 20000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-35-a-model-s-single-allowed-answer-is-stored-not-rendered-and-the-review-shows-it-D44-desktop-1280`
