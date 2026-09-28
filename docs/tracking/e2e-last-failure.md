# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36379492978 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36379492978
- Commit: `0bbf9eb767ebcc1d2164df9f62d6c23166a1abe2`
- Attempt: 1
- Written (UTC): 2026-09-28T05:10:36.801Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) — Error: PW-35: the review never opened

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
