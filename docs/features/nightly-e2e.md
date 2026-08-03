# Nightly E2E job

## What runs nightly, and why

Only cases that require **real elapsed time**. Today that is exactly one case:

| ID  | Behaviour guarded                                         | Spec file                                    |
| --- | --------------------------------------------------------- | -------------------------------------------- |
| A-3 | Per-visit resend limit (3) reached; further sends refused | `e2e/nightly/auth-resend-exhaustion.spec.ts` |

A-3 must sit out two 60-second resend cooldowns. Playwright's virtual clock cannot
substitute for that in this app: three mechanisms were tried and all failed
(INC-015, INC-019, INC-020). Running the real waits on every push would tax each
commit by roughly two minutes, and a test-only cooldown override would put a seam
into a security throttle — both were rejected. So the case moved to a schedule.

The per-push suite keeps 12 cases, all green. **A-2 is the per-push guard for the
operator-ruled cooldown-on-click behaviour**; A-3 only adds the exhaustion tail.

## Schedule and manual run

- Workflow: `.github/workflows/nightly-e2e.yml`
- Trigger: `schedule` at `0 6 * * *` (06:00 UTC) **and** `workflow_dispatch`.
- It does **not** run on push.
- Config: `playwright.nightly.config.ts` (`testDir: ./e2e/nightly`, one chromium
  project at 360x740, `retries: 0`, `workers: 1`).
- `E2E_EMAIL_SINK: '1'` is set by the workflow itself, so the nightly spec is not
  wrapped in the per-push sink gate.

## Heartbeat: `docs/tracking/nightly-status.md`

The workflow writes that file with `if: always()` and commits it with `[skip ci]`.
It records the conclusion (SUCCESS/FAILURE), the commit SHA, the UTC timestamp and
the run URL.

This is the supervisor's read on every verification clone. **A timestamp older than
~48h does not mean "nothing changed" — it means the schedule stopped running.** A
scheduled job that silently dies must be distinguishable from one that ran and
passed; the heartbeat is what makes that distinction.

Note: GitHub disables scheduled workflows automatically after prolonged repository
inactivity (roughly 60 days without commits). If the heartbeat goes stale, check
whether the schedule was disabled before investigating the tests.

The file is machine-generated and is exempt from the prettier gate in
`.prettierignore`, same class as `docs/tracking/ci-status.md` (INC-011).
