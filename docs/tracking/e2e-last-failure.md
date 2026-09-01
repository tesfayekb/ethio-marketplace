# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33564965075
- Commit: `77d06d119252fbaf563931c2d638a02939a2da44`
- Attempt: 1
- Written (UTC): 2026-09-01T22:17:55.505Z
- Passed: 335 · Skipped: 65 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one — Error: entity stats never moved below 1

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"

```

Context:

```text
          - listitem [ref=e379]:
            - generic [ref=e380]: About
          - listitem [ref=e381]:
            - generic [ref=e382]: How it works
      - navigation "Help" [ref=e383]:
        - heading "Help" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - generic [ref=e387]: Safety
          - listitem [ref=e388]:
            - generic [ref=e389]: Contact
      - navigation "Legal" [ref=e390]:
        - heading "Legal" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Terms
          - listitem [ref=e395]:
            - generic [ref=e396]: Privacy
    - paragraph [ref=e398]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('step-up-modal')

```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: How it works
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Terms
          - listitem [ref=e167]:
            - generic [ref=e168]: Privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"

```

Context:

```text
          - listitem [ref=e460]:
            - generic [ref=e461]: About
          - listitem [ref=e462]:
            - generic [ref=e463]: How it works
      - navigation "Help" [ref=e464]:
        - heading "Help" [level=2] [ref=e465]
        - list [ref=e466]:
          - listitem [ref=e467]:
            - generic [ref=e468]: Safety
          - listitem [ref=e469]:
            - generic [ref=e470]: Contact
      - navigation "Legal" [ref=e471]:
        - heading "Legal" [level=2] [ref=e472]
        - list [ref=e473]:
          - listitem [ref=e474]:
            - generic [ref=e475]: Terms
          - listitem [ref=e476]:
            - generic [ref=e477]: Privacy
    - paragraph [ref=e479]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('step-up-modal')

```

Context:

```text
          - listitem [ref=e232]:
            - generic [ref=e233]: About
          - listitem [ref=e234]:
            - generic [ref=e235]: How it works
      - navigation "Help" [ref=e236]:
        - heading "Help" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Safety
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Terms
          - listitem [ref=e248]:
            - generic [ref=e249]: Privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).
