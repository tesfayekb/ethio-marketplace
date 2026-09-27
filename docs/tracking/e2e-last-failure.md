# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36312273832
- Commit: `422550b86a660e99e6d3f5e0e67b5de17caf6f08`
- Attempt: 1
- Written (UTC): 2026-09-27T10:40:56.341Z
- Passed: 1040 · Skipped: 78 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): shard 3, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) — Error: PW-35: the review never opened
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback — Error: marketplace rail categories: category labels still in English

## Flaky bodies (DEC-078)

### post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44)

- Source: `shard 2`
- Project: `mobile-360`

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

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-35-a-model-s-single-allowed-answer-is-stored-not-rendered-and-the-review-shows-it-D44-mobile-360`

### i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: marketplace rail categories: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "Construction Material",
+   "Travel & Accommodation",
+ ]
```

Context:

```text
          - listitem [ref=e210]:
            - generic [ref=e211]: ስለ እኛ
          - listitem [ref=e212]:
            - generic [ref=e213]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e214]:
        - heading "እገዛ" [level=2] [ref=e215]
        - list [ref=e216]:
          - listitem [ref=e217]:
            - generic [ref=e218]: ደህንነት
          - listitem [ref=e219]:
            - generic [ref=e220]: ያግኙን
      - navigation "ሕጋዊ" [ref=e221]:
        - heading "ሕጋዊ" [level=2] [ref=e222]
        - list [ref=e223]:
          - listitem [ref=e224]:
            - generic [ref=e225]: ውሎች
          - listitem [ref=e226]:
            - generic [ref=e227]: ግላዊነት
    - paragraph [ref=e229]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 25 user(s) owned by process 36312273832-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 25 user(s) owned by process 36312273832-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 122 user(s) owned by process 36312273832-changed
```

## posting-routes.spec.ts › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"price_bp","reason":"commissionRange"}]}

expect(received).toContain(expected) // indexOf

Expected value: "door"
Received array: ["price_bp"]
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-10-a-pricing-basis-is-the-door-s-own-refusal-by-name-at-status-200-DEC-079-mobile-360`

## posting-routes.spec.ts › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"price_bp","reason":"commissionRange"}]}

expect(received).toContain(expected) // indexOf

Expected value: "door"
Received array: ["price_bp"]
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-10-a-pricing-basis-is-the-door-s-own-refusal-by-name-at-status-200-DEC-079-desktop-1280`

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_bp_check" ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_bp_check" ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
