# Foundations N1b-1 — stop 5 (M4, the schedule)

CI: newest completed run 8cceeee8 — SUCCESS (2026-10-29T07:27:10Z).

- File: `supabase/migrations/20261029073837_44a91d3e-8f13-4122-97c5-8a9edde98f7a.sql` (2334 bytes). Mark 20261029234500.
- pg_cron job `name-check-catchup`, `*/15 * * * *` (96 runs/day), command `SELECT public.job_call('name-check-catchup')`.
- Proof (rolled back whole; INC-980 rule — reads only the run it starts): SC-1 schedule shape; SC-2 one job_call caller; SC-3 no Vault entries; SC-4 the job's own command writes 'not_configured'/'vault_entry_missing' and queues nothing; rollback assertion.
- The platform's cron review asked to confirm the cadence; the first line carries the reviewed marker (operator ruling R3). Nothing was applied by the refused first submission.
- Prod read-back: mark present; job active at */15; 0 job_runs.
- Lesson (stop 4, recorded as ruled): a function call and a check of its effect are never in one expression.
- Open: until Vault entries exist, prod gains 96 'not_configured' rows/day; job_runs retention is not built yet (named for the route turn).
- Linter: 234 pre-existing warnings, none new.

apply 44a91d3e → expect mark 20261029234500
