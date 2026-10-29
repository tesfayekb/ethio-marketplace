# Foundations turn N1b — stop 4 (N1b-1, M3: the route-side doors)

## CI

The newest completed run is **8cceeee8: SUCCESS**. Every job passed, the first-paint budget included. No red to fix.

## M3: what it does

- **File:** `supabase/migrations/20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql`, 16,252 bytes, sha256 3dd11fa3…41ed.
- **`job_run_claim(job, ts)`** claims the run that `job_call` dispatched, once, and returns its id. It refuses three cases before any lease:
  - `refused:window` when ts is more than 300 s old or more than 60 s ahead;
  - `refused:replay` when the (job, ts) was already claimed, or was never dispatched (a forged call);
  - `badValue:job` for an unknown job.
- **`job_lease_take(job, holder, seconds 10..900)` and `job_lease_release(job, holder)`:**
  - One live holder per job at a time.
  - An expired lease can be taken again.
  - Only the holder can release.
- **`job_pause_read`, `job_pause_set` and `job_pause_clear`** hold the breaker's reason: `credits`, `policy` or `rate_limit`.
- **`job_run_finish(run, outcome, reason, asked, clean, imitates, unavailable)`** writes the result once, and only on a claimed run.
- **`name_check_mark`** is redeclared whole from live `pg_get_functiondef`, with the same arguments and no DROP:
  - `'unavailable'` raises `attempts` and `last_attempt_at` and leaves the state as it was (A3);
  - the matching-text rule is kept;
  - it stays service-only.
- **Every door:** REVOKE ALL FROM PUBLIC, anon and authenticated; EXECUTE granted to service_role only.

### Proof

Under INC-980's rule, the proof uses only its own scratch user `e2e-n1b-…`, scratch job runs and scratch lease holders, each read by its own id. Before writing, it asserts there is no live lease and no live pause. Each check raises on failure, and the sentinel rolls everything back.

- **MK-1:** `'unavailable'` counts an attempt and keeps the state `'unchecked'`.
- **MK-2:** `'unavailable'` leaves an `'imitates'` row as `'imitates'`, so it never moves a row to `'clean'`.
- **MK-3:** a stale text changes nothing, whether the asked state is `'unavailable'` or `'clean'`.
- **MK-4:** an unknown state is refused.
- **MK-5:** `'clean'` still marks.
- **CL-1:** the first claim succeeds; the second is refused as a replay.
- **CL-2:** a ts that was never dispatched is refused.
- **CL-3:** a ts 301 s old, or 61 s ahead, is refused, and the run stays unclaimed.
- **CL-4:** an unknown job is refused.
- **LS-1:** the lease takes once; a second holder is refused; a wrong holder cannot release; release and retake work; an expired lease can be taken.
- **LS-2:** a bad lease length is refused.
- **PS-1 and PS-2:** set, read and clear work; an unknown reason is refused.
- **FN-1, FN-2 and FN-3:** a claimed run finishes once; an unclaimed run never finishes; `'dispatched'` is refused as an outcome.
- **AC-1:** all eight doors are service-only.

### The first submission failed, and nothing was applied

- **The failure:** `MK-5 clean`. The check read `IF NOT name_check_mark(...) OR (SELECT state …) <> 'clean'`, and the database evaluated the read before the call. SQL does not guarantee which side of an OR runs first.
- **The fix:** each call and its read-back are now separate statements. This applies to MK-3, MK-5, the LS-1 expired retake and the PS-1 clear.
- **Lesson:** never put a call that changes data and a read of its effect in the same expression.
- **State checked before retrying:** no M3 mark and no `job_run_claim` existed. The proof is not weakened: every assertion is still there.

### Read back on ethio-prod after the apply

- mark 20261029233000 present;
- job_runs, job_leases and job_pauses each have 0 rows;
- 0 of the seven new doors are executable by anon or authenticated;
- `name_check_mark` accepts `'unavailable'`.

### Migration guard

- **The first run failed** on one statement: the proof's rollback check, which reads the proof's own scratch ids.
- That statement is now on `scripts/migration-real-row-allowlist.txt` with its reason, until INC-977 closes.
- After that line: `Migration guard OK`.

## Apply

**apply cba46fd4 → expect mark 20261029233000** (on ethio-staging, by the supervisor; prod is applied and its mark was read back).

## Next

M4 (the schedule), as its own stop. After that: the route, the core, the jobs guard with the CI halves of S4 and S5, and NCJ-1…10.

## Files changed since 3199dd8d

- docs/governance/reports/foundations-turn-n1b.stop-4.md
- scripts/migration-real-row-allowlist.txt
- supabase/migrations/20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql
