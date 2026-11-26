# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45860262131 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45860262131
- Commit: `70df931855277087581fe4921066bcb64d5b34cd`
- Attempt: 1
- Written (UTC): 2026-11-26T17:40:58.464Z
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
| nightly | 2026-11-26T17:37:18.858Z | 3.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 203.4 s |
