# Foundations turn CI-4 — report (INC-1028, DEC-313)

## 1. CI line
- Before the turn: 0e6f8a96, run 41184135622 (08:41:22Z), **FAILURE**: only the first-paint budget. /admin/listings_/$listingId_/edit measured 404.8 against a 405 ceiling, inside the NEAR band. It is fixed in this turn (§3).
- 4a4ee518: no completed run on the evidence branch at 08:58Z (ci-status.md still names 0e6f8a96). This turn's CI judges it.

## 2. Step 0
docs/governance/briefs/foundations-turn-ci-4.md is the ruling in one fenced block. Its sha256 is `5e0e8e73c4e1e747f045ab9b1207682fda1ddefdd71965254b86102fe5ebe234`, which equals the value after END. Roadmap line 3 names it, and prettier --check passed.

## 3. The red, fixed first
In scripts/route-budgets.mjs, /admin/listings_/$listingId_/edit goes 405 → 406 = ceilingFor(404.8), in DEC-296's form. The cause is F3's picker placement code on the edit page.

## 4. Item 1: the five runs' session samples (the last sample in each local-backend-proof.md)
| Run | Failure | Applier sessions | Cron | Other |
| --- | --- | --- | --- | --- |
| aed7904b (9fad723e) | refused:replay, 20261029073342 | 1 (`@effect/sql-pg`, a `DO $proof$`) | scheduler only (`pg_cron scheduler`, Extension wait); 0 job sessions | none |
| e195034e (0dcba0dc) | refused:replay | 1 | scheduler only; 0 jobs | none |
| b3e8dba2 (517a7ad8) | refused:replay | 1 | scheduler only; 0 jobs | none |
| fc918fbb (cc7dea18) | refused:replay | 1 (`CREATE OR REPLACE FUNCTION admin_save_legal_draft`) | scheduler only; 0 jobs | none |
| d2e9bb36 (7f6569ea) | deadlock, 20261007033719 stmt 48 | 1 (pid 230) | scheduler only; 0 jobs | **pid 306 `autovacuum: VACUUM ANALYZE public.categories` (Timeout:VacuumTruncate)** |

What the samples show:
- **Fact 2 has a confirmed cause.** The deadlock partner, process 306, is autovacuum on public.categories, not a cron job and not PostgREST.
- **Fact 1 remains unconfirmed.** No sample shows a second applier or a running cron job. The samples are 5 s apart, and the rendered sample is one lane's (the report's own caveat). So they neither rule in nor rule out a session that came and went between samples. The plan's reads still hold: no writer of job_runs exists while 20261029073342 applies, the owner bypasses row security, and a time fault would raise refused:window.
- The new start holds cron **and autovacuum** for the apply. The CF-CI-START-1 line now records the kinds at the next failure. There is no repro lane, as ruled.

## 5. The start as built (local-backend-proof.yml, step `backend`)
1. `supabase start` with `.ci-local/supabase/migrations` moved aside, so the start sees no migrations. It runs once and is never retried, so CF-CI-IMG-1…4 pass unchanged (8 tests) and its definition did not change (no G38). A failure is reported as "start failed before any migration ran".
2. The existing status parse and container discovery run, then the version read (§6).
3. Hold: `ALTER SYSTEM SET cron.launch_active_jobs = off`, `autovacuum = off`, then `pg_reload_conf()`, as `supabase_admin` in the temporary container only.
4. Apply: `supabase migration up --local --workdir .ci-local` in one session, appended to local-backend-start.log. The excerpt reader's "Applying migration" lines are unchanged. It is not retried.
   - The INC-944 sampler now wraps only this phase and gained a backend column.
   - On failure, the last sample and the CF-CI-START-1 line go to the start log and local-backend-failure.txt.
5. Restore and prove (item 2):
   - Both settings reset; `on on 1` is read back (both on, one scheduler session), or the step fails.
   - 0 ledger rows without a name or statements, then the existing check (`applied N/N` against the repository's versions).
   - `NOTIFY pgrst, 'reload schema'`, then a REST read of `job_runs` (born in 20261029072455), polled up to 30 s for status 200.
   - One sign-up of `ci-start-<random>@example.invalid` through the before_user_created hook. A 5xx, no answer, or a hook error fails as infrastructure. The scratch account is deleted through the admin API.

The keys this step wrote to GITHUB_ENV are read back from that file, because a step's own GITHUB_ENV writes reach only later steps. actionlint `-shellcheck= -pyflakes=`: exit 0.

**Departure:** autovacuum is held as well as cron. The plan named cron, and the deadlock run's sample names autovacuum. The ruling's "anything the cause itself points to" covers it.

**Not proven locally:** the step itself. It runs only in CI, so this turn's CI judges it. Its first run is also the first proof that `migration up` on CLI 2.120.0 writes the same ledger as `start`.

## 6. pg_cron version read
The step reads `pg_available_extensions.default_version` for pg_cron and whether `cron.launch_active_jobs` exists, and writes both to local-backend-status.txt. If the setting is missing, it fails with "STOP (DEC-313)". This turn read no version locally; the first CI run records it.

## 7. CF-CI-START-1
`scripts/ci/classify-start-failure.ts` prints: `start failed in <migration> stmt <n>; cron jobs: k (scheduler present|absent); appliers: a; autovacuum: v; other sessions: m`. With no sample it prints `sessions: unknown (no sample)`.

The planted cases are SF-1 cron job, SF-2 two appliers, SF-3 outside session and autovacuum, SF-4 clean, SF-5 missing sample: 5 passed. Its caller is the workflow; CF-WIRED-1 reports 32 scripts, missing 0.

## 8. The proofs census, CF-PROOF-KEY-1
`scripts/conformance/migration-proof-keys.test.ts` checks every migration. A finding is a `DO` block insert into public.<table> whose values carry one of:
- a bigint variable taken from `epoch FROM clock_timestamp()/now()` ("second");
- a literal `00000000-` uuid ("fixed").

Allowlist lines are `key | reason | landed; G39`. An unlisted, stale or duplicate line fails, and so does any other `until`.

Landed hits, all three listed:
- 20260903025501 category_country_exclusions: fixed
- 20261029072455 job_runs: fixed (JC-3)
- 20261029073342 job_runs: second (CL-1/CL-3)

PK-1 planted:
- a clock-keyed proof and a fixed-key proof each fail;
- a scratch-keyed proof passes;
- a bad `until` and a stale line fail.

2 passed. No landed migration was edited.

## 9. DEC-313's frozen rule
Over the next 20 completed CI runs on dev after this landing:
- **0 starts fail inside a migration → keep.**
- **1 or more → fallback:** start the database only (`-x` all other services), apply with cron and autovacuum held, then start the rest. The failure's CF-CI-START-1 line goes into the follow-up brief.

Registry refusals before any migration do not count.

## 10. Checks and unit count
- Focused: ci-images and ci-deadlines 8 passed; classify-start-failure 5, migration-proof-keys 2, wired 2 and planted-proofs 2 passed.
- `bun run checks` results are appended below.

## 11. K2
- The deadlock's other half: any later migration that takes AccessExclusive on a hot table could still meet a *manual* session in CI (none seen).
- staging and production run migrations through the platform's tool, not this step. Their concurrency is untouched and unexamined here.
- 20261029073342's CL-1 remains a current-second key in a shared table. The census lists it; it is not changed, per G39.

## 12. Files (git diff --name-only 4a4ee518)
```text
.github/workflows/local-backend-proof.yml
docs/_changelog.md
docs/features/ci-local-backend.md
docs/features/e2e-harness.md
docs/governance/briefs/foundations-turn-ci-4.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-ci-4.report.md
roadmap.md
scripts/ci/classify-start-failure.test.ts
scripts/ci/classify-start-failure.ts
scripts/conformance/migration-proof-keys-allowlist.txt
scripts/conformance/migration-proof-keys.test.ts
scripts/route-budgets.mjs
```
AGENTS.md is untouched.
