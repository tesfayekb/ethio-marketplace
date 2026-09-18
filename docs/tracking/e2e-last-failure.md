# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35385534608
- Commit: `587d1c8e075d83884b592a27aedd1c0995f5da1f`
- Attempt: 1
- Written (UTC): 2026-09-18T19:35:23.080Z
- Passed: 806 · Skipped: 70 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: reachStep7: the region level never rendered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-region')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - reachStep7: the region level never rendered with timeout 10000ms
  - waiting for getByTestId('post-where-region')

```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360`

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
