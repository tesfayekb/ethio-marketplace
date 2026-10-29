# Foundations N1b-1 — stop 6 (M5, job_runs retention)

CI: newest completed run 8cceeee8 — SUCCESS (2026-10-29T07:27:10Z).

- File: `supabase/migrations/20261029074251_2206e389-eb7f-4c54-a303-2db5a95ae5f8.sql` (6793 bytes, sha256 8f4da51b…). Mark 20261030000000.
- Prune family: `job_runs_prune_runs` heartbeat table (born closed, deny policies, service_role only), `job_runs_prune()` → `job_runs_prune_core(NULL)`, pg_cron `job-runs-prune` at `41 4 * * *` (daily, beside ai-calls-prune 04:17). 14 days; each job's newest row is kept whatever its age; the heartbeat table self-trims at 14 days, as ai_calls_prune does.
- Departure: the core takes an optional id scope so the proof runs the statement under test on its own rows only (INC-980). Only the live wrapper (NULL scope) spans real rows and trims heartbeats; it is never called in the proof.
- Proof (rolled back whole): PR-1 >14 d deleted, <14 d kept; PR-2 heartbeat counts 2; PR-3 the newest row kept at 30 days; PR-4 a scoped run never trims heartbeats; PR-5 schedule + function/table/sequence ACLs; rollback check.
- Prod read-back: mark present; job at `41 4 * * *`; 0 job_runs, 0 prune heartbeats.
- Linter: 234 pre-existing warnings, none new.

apply 2206e389 → expect mark 20261030000000
