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
- The env block mirrors ci.yml's E2E job value-for-value, including
  `E2E_EMAIL_SINK: ${{ vars.E2E_EMAIL_SINK }}`. It used to pin that flag to `"1"`
  inline; when staging SMTP moved from Mailtrap to Ethereal (ruling R1) the nightly
  kept driving sends at the retired sink and every sign-up 500'd (INC-026b). The
  rule now: this block is a mirror, never a fork — a duplicated environment literal
  is what let the swap pass the nightly by.

## Heartbeat: `docs/tracking/nightly-status.md`

The workflow writes that file with `if: always()` and commits it with `[skip ci]`.
It records the conclusion (SUCCESS/FAILURE), the commit SHA, the UTC timestamp and
the run URL.

This is the supervisor's read on every verification clone. **A timestamp older than
~48h does not mean "nothing changed" — it means the schedule stopped running.** A
scheduled job that silently dies must be distinguishable from one that ran and
passed; the heartbeat is what makes that distinction. That staleness rule is
unchanged by anything below.

### Outcome authority (INC-027)

The job's conclusion is the **test step's** outcome and nothing else. "Run nightly
E2E" carries `continue-on-error: true` so the heartbeat still runs after a red
suite; a final "Report test outcome" step re-raises the captured outcome. So a green
suite with a broken heartbeat push is a green job with a warning, and a red suite is
never masked by a successful bookkeeping commit.

### Regenerate-after-fetch push

The push is not rebased — it is **regenerated**, up to 3 attempts: fetch origin main,
`reset --hard` onto it, re-write the status file from this run's own data, commit,
push. Why regenerate rather than rebase or merge: the status file is *derived state*.
Every field (conclusion, SHA, timestamp, run URL) belongs to the run that is writing
it, so rewriting on top of whatever main now holds is always correct and can never
conflict. The file content comes from one shell function used on every attempt, so
the retry cannot drift from the first write.

After 3 failed attempts the step emits `::warning::heartbeat push failed after
retries` and exits 0. The file then lags, which the staleness rule above catches.

The file is machine-generated and is exempt from the prettier gate in
`.prettierignore`, same class as `docs/tracking/ci-status.md` (INC-011).

