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

### Regenerate-after-fetch publish (DEC-098)

The heartbeat and the evidence file publish to branch `ci-evidence` through
`scripts/publish-evidence.sh`, never to dev. The step writes the status file once
from this run's own data; the script then, up to 3 attempts, fetches `ci-evidence`,
resets its own worktree onto it, copies both files in, commits only on change and
pushes. Why regenerate rather than rebase or merge: the files are _derived state_.
Every field (conclusion, SHA, timestamp, run URL) belongs to the run that is writing
it, so rewriting on top of whatever the branch now holds is always correct and can
never conflict.

After 3 failed attempts the script emits `::warning::` and exits 0. The file then
lags, which the staleness rule above catches. Read it with
`git fetch origin ci-evidence && git show origin/ci-evidence:docs/tracking/nightly-status.md`.

The file is machine-generated and is exempt from the prettier gate in
`.prettierignore`, same class as `docs/tracking/ci-status.md` (INC-011).

## Cloudflare parity smoke (DEC-019 / INC-088)

The per-push suite serves the built app on nitro's `node-server` preset, so one nightly
job — `cloudflare-parity-smoke` — keeps a wrangler-served pass on the DEPLOY runtime: it
builds with `bun run build:e2e:cloudflare`, verifies `dist/server/wrangler.json`, and
runs `e2e/smoke-auth-i18n.spec.ts` on `mobile-360`. If it dies because workerd refuses
the build-day `compatibility_date`, the step prints an explicit `::error::` naming the
INC-088 runtime class so a runtime refusal is never read as an application break.

## Bundle 7 note

The nightly lints step lands with Part E (M11).

## Database security lints step (Bundle 7 ES7, DEC-148)

One step after the suites, `if: always()`: `bun scripts/security-lints.ts`. It never stops the suites; its failure turns the run red like any failed step. See docs/features/security-scanning.md for the rule.

## Bundle 7 additions

- The nightly runs `scripts/security-lints.ts` against ethio-staging (counts only; see security-scanning.md).
- The job's token is read-only by default; the nightly job declares `contents: write` for its evidence publish (DEC-153).
- Failure tables are written through the reporter's `mdCell` helper (DEC-154).
