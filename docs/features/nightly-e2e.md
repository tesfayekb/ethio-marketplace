# Nightly E2E job

## What runs nightly, and why

Once a day, on ethio-staging: the cases that require **real elapsed time**, whose
run also carries the maintenance pass (DEC-369, below); the database security
lints (DEC-148); the heartbeat and its evidence on `ci-evidence`; and, in its own
job, the Cloudflare parity smoke. The `@global-state` specs are not here: they
run, and gate, in the per-push serial lane (`local-backend-proof.yml`, INC-1135).
The serial full run that once carried them retired (DEC-393, below).

The real-time cases are exactly one today:

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
- Trigger: `schedule` at 11:30 in New York all year (DEC-277, Foundations turn K3) **and** `workflow_dispatch`. GitHub's schedules are UTC, so the workflow carries two, `30 15 * * *` (New York on summer time) and `30 16 * * *` (winter time); its first job, `hour`, runs `bash scripts/ci/nightly-hour.sh <event> <schedule>`, and only the schedule that falls at 11 o'clock in New York on the run's UTC day goes on — the other ends in seconds, its two test jobs skipped, and writes no heartbeat. The answer reads the schedule that fired (`github.event.schedule`), never the clock, so a late start cannot skip both; the clock changes (2026-11-01, 2027-03-14) need no re-time (NH-1…5, scripts/ci/nightly-hour.test.ts). The script first proves the machine knows New York's zone (−05:00 on 2026-01-15, −04:00 on 2026-07-15); where the time-zone files are missing it stops with `::error title=nightly-hour::`, exit 2, never a silent skip (INC-962, Foundations turn C1; NH-6 where `TZDIR` governs the zone files, Linux; NH-7 on every platform through a `NIGHTLY_ZONE` no zone database has, INC-1096). A run started by hand always goes on. Earlier hours: 06:00 UTC, then 18:00 UTC (DEC-171, 2026-10-11).
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
It records the conclusion (SUCCESS/FAILURE, a FAILURE followed by the reporter's
STAGING-SINK line when a failure carried the mail sink's refusal — INC-1175), the
gating failures, the lints, the commit SHA, the UTC timestamp and the run URL.

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

## The staging gate (DEC-168)

- Before its tests the nightly waits, up to 60 minutes, until no CI, Guard Proof or Feed bench run is queued or running (`bun scripts/staging-gate.ts wait 60`); after that it runs anyway, with a warning. An unreadable gate is a warning, never a stop.
- After the tests, `bun scripts/staging-gate.ts overlaps` writes a notice on the run page for every other staging run that overlapped this nightly, so a nightly red is read with that in hand (INC-487).
- The job's token gains `actions: read` for these two steps; CI itself never waits.

## Flake check (DEC-184, bundle 18 turn 3)

A manually dispatched repeat-run workflow (`.github/workflows/flake-check.yml`) moves the G38 flake proof to CI because the executor's local browser does not start (INC-506).
Inputs: `specs` (required, space-separated paths, e.g. `e2e/post-wizard-place.spec.ts e2e/post-wizard-bundle2.spec.ts`), `grep` (required, e.g. `PW-12 |PW-117 |PW-178 `), `repeat` (default `12`) and `workers` (default `8`).
A flake fix is proven by a dispatched repeat — 12 × each test, 8 workers, both projects, 0 retries — at 100 %; a fix whose repeat fails is reworked before the bundle closes; this workflow never gates CI or promote.
The operator dispatches it from Actions → Flake check → Run workflow.
The verdict is published to branch ci-evidence like the nightly's: `docs/tracking/flake-check-status.md` (conclusion, the inputs, commit, run) and `docs/tracking/flake-check-last-failure.md` (the failure reporter's file, source `flake`); the `flake-check-report` artifact (HTML report, `flake.log`) stays for a signed-in reader. The repeat runs with 0 retries, so it never writes the flake ledger. There is no schedule and no promote.

## Turn 30 (2026-10-23, DEC-240) — the lint step before the heartbeat; the verdict includes it

The step "Database security lints (counts only, DEC-148)" now runs BEFORE "Write and push heartbeat", with `id: lints` and `continue-on-error: true`, so the heartbeat always runs and the status carries its outcome: `- Database lints (DEC-148): success|failure` after the "Gating failures" line, and `- Conclusion: SUCCESS` only when the gating failures are 0 AND the lints succeeded (INC-831: from 2026-10-19 to 2026-10-23 the lints were red while the status said SUCCESS — the status was written first). "Report test outcome" exits 1 when the lints failed. The same comparator runs in CI's smoke lane on every commit (docs/features/ci-guards.md, turn 30); the nightly keeps the staging read.

## Housekeeping turn 3 (INC-1101, DEC-321)

The nightly installs Chromium's system libraries through `scripts/ci/install-browser-deps.sh` (both jobs), which drops an apt mirror that does not resolve and runs once more only at apt's fetch stage (docs/features/ci-local-backend.md, DEC-366). Its publish step sets `EVIDENCE_REF` (`github.head_ref || github.ref_name`); the nightly runs on the default branch, dev, so its two files keep their paths on `ci-evidence`, and a dispatch on another ref publishes under `docs/tracking/branches/<ref>/` (DEC-321).

## Housekeeping turn 3c (INC-1108, DEC-369) — the nightly reaps ethio-staging

The step "Run nightly E2E (real-elapsed-time cases)" sets `E2E_MAINTENANCE: "1"` in its own `env:`, so its global setup runs the maintenance pass against ethio-staging once a night: the reaper (every scratch prefix of `e2e/helpers/scratch.ts` older than the cutoff), the scratch roles, listings, categories and attribute definitions, the photo and category-asset storage sweeps, the audit prune and the tripwire (docs/features/e2e-harness.md). (The serial full run that then followed did not set it; it retired with DEC-393.) Before this turn the job's shard name (`nightly`) was never the owner's, so staging was never reaped. The "Sweep stale E2E users" step stays the one mechanism for users (the pass deletes none). CF-CID-7 (`scripts/conformance/ci-deadlines.test.ts`) holds the line to this step and to lane 1's proof step in `local-backend-proof.yml`, and refuses the variable anywhere else.

## The tests and CI turn (DEC-393, INC-1148, INC-1175) — one run, a verdict inside the ceiling

- **The serial full run retired (DEC-393).** The step that ran the whole suite with one worker on ethio-staging took longer than the job's 360-minute ceiling every night (cancelled 2026-11-08, -09, -10, -13 and -14; red after five hours on -11 and -15), so the nightly wrote "Sources without results: full" and no verdict (INC-1111). Its reason, DEC-028's — the `@global-state` specs ran nowhere else — no longer holds since the per-push serial lane runs them on every push (INC-1135). The step, the stash before it and the `full` source are gone: the evidence step copies `test-results/results.json` and `nightly.log` into the reporter's `nightly` source, `E2E_EXPECTED_SOURCES: nightly`, and `E2E_GREEN` reads the `run` step alone.
- **The ceiling.** `timeout-minutes: 90` — the staging gate's own cap (60 minutes) plus the worst measured steps (about 9 minutes) plus margin, written on the line; never raised later without a DEC.
- **`@global-state` is no quarantine (INC-1148).** The reporter's quarantine label, `isQuarantined`, `classifyFailures` and its self-test fixture retired with the run (no reader remained). Every failure gates; the verdict file is `gating=` / `silent=` / `flaky=`.
- **The STAGING-SINK label (INC-1175).** A failed test whose own attempts printed a `[client-error]` line carrying `auth/v1/signup`, `HTTP 500` and "Error sending confirmation email" is labelled `STAGING-SINK (environment: the staging mail sink refused the send — INC-1175)` on its failure section, counted on the report's "Gating failures" line, and named on the heartbeat's conclusion line: the evidence step sets `E2E_VERDICT_CLASS_PATH`, the reporter writes the class on the file's first line (all `ci.yml` reads) and `STAGING-SINK <n> (environment: …)` on its second, and the heartbeat appends that second line to `- Conclusion: FAILURE`. The label names the cause; the failure still gates. The sink itself is the operator's SMTP setting on ethio-staging.
- **Tests.** `scripts/e2e-failure-report.test.ts`: EFR-3 drives the reporter on `stagingSinkSample()` — the real `e2e-results-sample.json` with one splice made in memory, the 2026-11-15 nightly's captured sign-up line (`scripts/fixtures/e2e-staging-sink-line.txt`, verbatim) as CAP-1's attempt stdout; no tracked copy, so the sample's synthetic token shapes stay in the one path the secrets scan excludes — and on the unspliced sample (labelled and not); EFR-4 reads one `nightly` source whole ("Sources without results: none") and holds the workflow to one source, the `run` step's outcome and no serial run. The reporter's own self-test checks the label both ways on the same two captures.
