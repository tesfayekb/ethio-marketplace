# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36383469726
- Commit: `394162bb3a3fdb68ba3288a64d55463c9c04f067`
- Attempt: 2
- Written (UTC): 2026-09-28T06:10:35.637Z
- Passed: 1109 · Skipped: 78 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): shard 2, shard 5, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest — Error: PW-20: no region carried the city e2e-loc-smoke-2-gs-city-l4iq23
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('location-level-city')
Expected pattern: /Escratch Guess City xdqqqx/
Received string:  "Escratch Guess City vdfzbqx"
Timeout: 10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('location-level-city')
    14 × locator resolved to <button type="button" id="radix-_r_4_" aria-label="City" data-state="closed" aria-haspopup="menu" aria-expanded="false" data-testid="location-level-city" class="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium text-foreground">…</button>
       - unexpected value "Escratch Guess City vdfzbqx"

```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-desktop-1280`

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

### post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

```

Context:

```text
          - listitem [ref=e150]:
            - generic [ref=e151]: About
          - listitem [ref=e152]:
            - generic [ref=e153]: How it works
      - navigation "Help" [ref=e154]:
        - heading "Help" [level=2] [ref=e155]
        - list [ref=e156]:
          - listitem [ref=e157]:
            - generic [ref=e158]: Safety
          - listitem [ref=e159]:
            - generic [ref=e160]: Contact
      - navigation "Legal" [ref=e161]:
        - heading "Legal" [level=2] [ref=e162]
        - list [ref=e163]:
          - listitem [ref=e164]:
            - generic [ref=e165]: Terms
          - listitem [ref=e166]:
            - generic [ref=e167]: Privacy
    - paragraph [ref=e169]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-20: no region carried the city e2e-loc-smoke-2-gs-city-l4iq23

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e174]:
            - generic [ref=e175]: About
          - listitem [ref=e176]:
            - generic [ref=e177]: How it works
      - navigation "Help" [ref=e178]:
        - heading "Help" [level=2] [ref=e179]
        - list [ref=e180]:
          - listitem [ref=e181]:
            - generic [ref=e182]: Safety
          - listitem [ref=e183]:
            - generic [ref=e184]: Contact
      - navigation "Legal" [ref=e185]:
        - heading "Legal" [level=2] [ref=e186]
        - list [ref=e187]:
          - listitem [ref=e188]:
            - generic [ref=e189]: Terms
          - listitem [ref=e190]:
            - generic [ref=e191]: Privacy
    - paragraph [ref=e193]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

```

Context:

```text
          - listitem [ref=e423]:
            - generic [ref=e424]: About
          - listitem [ref=e425]:
            - generic [ref=e426]: How it works
      - navigation "Help" [ref=e427]:
        - heading "Help" [level=2] [ref=e428]
        - list [ref=e429]:
          - listitem [ref=e430]:
            - generic [ref=e431]: Safety
          - listitem [ref=e432]:
            - generic [ref=e433]: Contact
      - navigation "Legal" [ref=e434]:
        - heading "Legal" [level=2] [ref=e435]
        - list [ref=e436]:
          - listitem [ref=e437]:
            - generic [ref=e438]: Terms
          - listitem [ref=e439]:
            - generic [ref=e440]: Privacy
    - paragraph [ref=e442]: © 2026 ethio.com — All rights reserved.
```
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 165 user(s) owned by process 36383469726-2
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING failed to delete 074e9262-fb42-416b-888a-27296f760626: User not found — deferred to the nightly sweep
[e2e:teardown] deleted 160 user(s) owned by process 36383469726-5, 1 deferred to the nightly sweep
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 169 user(s) owned by process 36383469726-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

```

Context:

```text
          - listitem [ref=e157]:
            - generic [ref=e158]: About
          - listitem [ref=e159]:
            - generic [ref=e160]: How it works
      - navigation "Help" [ref=e161]:
        - heading "Help" [level=2] [ref=e162]
        - list [ref=e163]:
          - listitem [ref=e164]:
            - generic [ref=e165]: Safety
          - listitem [ref=e166]:
            - generic [ref=e167]: Contact
      - navigation "Legal" [ref=e168]:
        - heading "Legal" [level=2] [ref=e169]
        - list [ref=e170]:
          - listitem [ref=e171]:
            - generic [ref=e172]: Terms
          - listitem [ref=e173]:
            - generic [ref=e174]: Privacy
    - paragraph [ref=e176]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

```

Context:

```text
          - listitem [ref=e416]:
            - generic [ref=e417]: About
          - listitem [ref=e418]:
            - generic [ref=e419]: How it works
      - navigation "Help" [ref=e420]:
        - heading "Help" [level=2] [ref=e421]
        - list [ref=e422]:
          - listitem [ref=e423]:
            - generic [ref=e424]: Safety
          - listitem [ref=e425]:
            - generic [ref=e426]: Contact
      - navigation "Legal" [ref=e427]:
        - heading "Legal" [level=2] [ref=e428]
        - list [ref=e429]:
          - listitem [ref=e430]:
            - generic [ref=e431]: Terms
          - listitem [ref=e432]:
            - generic [ref=e433]: Privacy
    - paragraph [ref=e435]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

```

Context:

```text
          - listitem [ref=e157]:
            - generic [ref=e158]: About
          - listitem [ref=e159]:
            - generic [ref=e160]: How it works
      - navigation "Help" [ref=e161]:
        - heading "Help" [level=2] [ref=e162]
        - list [ref=e163]:
          - listitem [ref=e164]:
            - generic [ref=e165]: Safety
          - listitem [ref=e166]:
            - generic [ref=e167]: Contact
      - navigation "Legal" [ref=e168]:
        - heading "Legal" [level=2] [ref=e169]
        - list [ref=e170]:
          - listitem [ref=e171]:
            - generic [ref=e172]: Terms
          - listitem [ref=e173]:
            - generic [ref=e174]: Privacy
    - paragraph [ref=e176]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

```

Context:

```text
          - listitem [ref=e416]:
            - generic [ref=e417]: About
          - listitem [ref=e418]:
            - generic [ref=e419]: How it works
      - navigation "Help" [ref=e420]:
        - heading "Help" [level=2] [ref=e421]
        - list [ref=e422]:
          - listitem [ref=e423]:
            - generic [ref=e424]: Safety
          - listitem [ref=e425]:
            - generic [ref=e426]: Contact
      - navigation "Legal" [ref=e427]:
        - heading "Legal" [level=2] [ref=e428]
        - list [ref=e429]:
          - listitem [ref=e430]:
            - generic [ref=e431]: Terms
          - listitem [ref=e432]:
            - generic [ref=e433]: Privacy
    - paragraph [ref=e435]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

```text
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
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft null value in column "listing_id" of relation "listing_revisions" violates not-null constraint
[WebServer] [ssr-error] /api/listings/draft listing not found ×17
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×20
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_bp_check"
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×36
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_bp_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
