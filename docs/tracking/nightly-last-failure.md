# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46034915977 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46034915977
- Commit: `32f68bb9685485b4df91e17a97cb215e7c864e77`
- Attempt: 1
- Written (UTC): 2026-11-27T16:40:29.192Z
- Post-test warnings: 3
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 1 results files read, 1 of 1 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly · unavailable: none

No `[ssr-error]` lines in any source (all 1 logs read).

## Accessibility (DEC-084, gating)

Logs read: nightly · unavailable: none

No `[a11y]` lines in any source (all 1 logs read).

## Timing (DEC-087, non-gating)

Results read: nightly · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-11-27T16:36:48.571Z | 3.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 203.4 s |
