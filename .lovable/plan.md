# Turn CI-4: the CI backend starts the same way every time (INC-1028, DEC-313)

Base dev 0e6f8a96. Tier B. One turn.

## CI first
When I read ci-status.md it still showed the last completed run as d7a47425, SUCCESS (2,507 passed, 0 failed). The run on 0e6f8a96 had not finished. The turn's Part A reads it again. If it is red, that fix comes first, at its root, before anything below.

## Cause of fact 1 (CL-1 "refused:replay"): what the reads show
The claim matches no row only if the row from :211 is missing, already claimed, or not seen. Each candidate, ruled in or out by reading:

- **A cron job touching job_runs: ruled out for this file.** Nothing writes job_runs while 20261029073342 applies:
  - the only scheduled writers are `name-check-catchup` (20261029073837) and `job-runs-prune` (20261029074251), and both are created later in the migration order;
  - other sessions cannot see the proof's uncommitted row anyway.
- **Role or row security: ruled out.** The migration role owns job_runs, so row security is bypassed for it. The table has no FORCE. The only policies name anon and authenticated. A role problem would also fail on every run, not on four.
- **Time: ruled out.** A clock gap or a second boundary would raise `refused:window`, not `refused:replay`. `ts` is the same bigint `v_now`, worked out once when the block starts and passed to the claim.
- **Two sessions applying migrations: still open, and the only live candidate.** Fact 2 has the same shape. Process 306 waits on 230's *transaction* (ShareLock) while it holds a lock on categories. That is a session writing rows the migration wrote, which is either a second applier or a writing cron job. It is not PostgREST's schema-cache read.

**Honest status:** the reads do not yet name the mechanism behind "replay". The diagnosis stays unconfirmed until step 1 below.

## Cause of fact 2 (the deadlock at 20261007033719 statement 48)
Five migrations schedule jobs before that point: 20261002013936, 20261003005802 (catalog-find-sweep, every 5 minutes), 20261004011235 and 20261004144146 (two jobs). The turn reads each job's command and names the one that both reads categories (it holds a lock there) and writes rows the migration changes (it waits on 230's transaction). If no job fits, the samples from d2e9bb36 lane 2 decide between a second applier and another session. The plan names what it finds and does not guess.

## Mechanism (extended: the start step in local-backend-proof.yml, DEC-309's job)
The concern is that the start applies migrations the same way every time, with nothing else writing or locking while they run.

**Chosen: hold pg_cron for the start, then restore it and prove it.**
1. `supabase start` runs on a workdir with **no** migrations. Every service comes up on an empty schema.
2. `ALTER SYSTEM SET cron.launch_active_jobs = off; SELECT pg_reload_conf();` The scheduler keeps running but launches no job.
3. `supabase migration up --local` applies every migration in one session, as the start would, and records the same history.
4. Restore: `ALTER SYSTEM RESET cron.launch_active_jobs; SELECT pg_reload_conf();` Then prove it:
   - `SHOW cron.launch_active_jobs` is on;
   - the scheduler session is in pg_stat_activity;
   - "applied N/N" still matches.
   If the proof fails, the lane fails as infrastructure.

**What it costs:** one extra command and about 2–5 s. Production changes in no way: no migration, no app code, and staging is untouched. The step first checks that the installed pg_cron accepts the setting (`SELECT version FROM pg_extension`, 1.5 or later). If it does not, the turn STOPs with that output.

**Weighed and not chosen:**
- Pausing each job (`cron.alter_job(active := false)`) cannot work: the migrations themselves create the jobs during the apply.
- A database-only first start (`-x` every other service) only stops PostgREST, which the evidence does not implicate. It is the fallback.
- Retrying a failed start would hide the cause, which the rules forbid.

## Step 1 inside the turn: reproduce before the fix lands
- Read the INC-944 samples and start logs of the four fact-1 runs and of d2e9bb36. Count the sessions running `DO $proof$` or migration statements at once, and the pg_cron sessions.
- Repro lane (manual dispatch, non-gating, in flake-check.yml): the start in a loop, 10 times on one runner, both before and after the change, recording each failure's statement.
- The report states which candidate the samples confirm. If a second applier is confirmed, the fix also serialises the apply (one session, step 3 above), which the chosen design already does.

## The guard: CF-CI-START-1
`scripts/ci/classify-start-failure.ts` reads the samples and the start log of a failed start. It prints one line: `start failed in <migration> stmt <n>; cron sessions: <k>; other sessions: <m>; appliers: <a>`. That line goes to local-backend-last-failure.md (counts and application names only, no query text from tables).
- Planted cases SF-1…5: cron active, two appliers, an outside session, clean (nothing active), and missing samples (reported as "unknown", never "none").
- A census in `wired.test.ts` names its caller in the workflow.

## DEC-313 (frozen decision rule)
Over the next 20 completed CI runs on dev after the landing:
- **0 starts fail inside a migration → keep.**
- **1 or more → fallback:**
  - first start the database only (`-x` all other services);
  - apply the migrations with cron held;
  - then start the rest.
  The classifier line of the failure goes into the follow-up brief.

Registry refusals that stop the start before any migration runs do not count. The classifier tells the two kinds apart.

## Proofs census (J1, G27): to confirm in the turn by a whole-tree search
These candidates turned up in the files I read. The turn names every hit, and **no landed proof is edited (G39)**:
- 20261029073342 CL-1/CL-3: keys `(name-check-catchup, v_now)` on the current second in the shared job_runs.
- 20261029072455 JC-3: a fixed key `ts = 1` and a fixed id `…e2e1` in the shared job_runs.
- 20261029074251 prune proof: inserts and reads job_runs and job_runs_prune_runs rows by age.
- 20261029110745 and 20261029233828: insert job_runs rows with explicit ids and timestamps.
- Every other proof that reads `clock_timestamp()` or `now()` as a key, or reads a shared table without its own scratch key.

The census turns into an allowlist (`file | reason | until`), so later migration proofs get the same check. A function found unsafe is fixed by a new migration; none was found by these reads.

## Files (scope)
- .github/workflows/local-backend-proof.yml (the start step)
- .github/workflows/flake-check.yml (repro dispatch)
- scripts/ci/classify-start-failure.ts and its test
- scripts/conformance census for proofs, plus its allowlist
- docs/features/e2e-harness.md, docs/governance/mechanisms.md, docs/_changelog.md
- roadmap.md and the report

The workflows are linted with actionlint; `bun run checks` runs before landing.

## Out of scope
Any landed migration, app code and staging.
