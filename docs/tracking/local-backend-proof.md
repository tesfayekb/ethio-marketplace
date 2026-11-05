# Local backend proof (non-gating)

- Commit: `6c398a79981bc11bf16fc9f9594739135ceb82ce`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41966759770

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 63 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 49 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 55 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 51 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 49 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 50 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 7, email 8, 1 4, 2 9, 3 5, 4 9, 5 9, 6 9, 7 5, 8 5, 9 9, 10 9, 11 5, 12 4, 13 4, 14 9, 15 6, 16 9, repeat not run
- Teardown:
  - smoke: not found
  - email: not found
  - 1: not found
  - 2: not found
  - 3: not found
  - 4: not found
  - 5: not found
  - 6: not found
  - 7: not found
  - 8: not found
  - 9: not found
  - 10: not found
  - 11: not found
  - 12: not found
  - 13: not found
  - 14: not found
  - 15: not found
  - 16: not found
  - repeat: not found
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- patched 20261029073342 (3dd11fa31551 -> 4287abad5fa3): CL-3's ahead check reads the clock just before the call (INC-1028, DEC-316)
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail]); the auth server's text columns '' (INC-808)
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
not written
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local
pg_cron: available 1.6.4; cron.launch_active_jobs settings: 1

## Lane smoke
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:21.987 UTC [275] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:21.987 UTC [275] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:21.987 UTC [275] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:21.987 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:21.987 UTC [275] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:22 | 413 | PostgREST 16.4 | client backend | active | : | with recursive pks_fks as ( -- pk + fk referencing col select contype::text as contype, conname, array_length(conkey, 1)
04:30:22 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:22 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:22 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:22 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:30:22 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane email
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:26.964 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:26.964 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:26.964 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:26.964 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:26.964 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql...
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:22 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:22 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:22 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:22 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:30:22 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:29:55.151 UTC [275] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:29:55.151 UTC [275] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:29:55.151 UTC [275] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:29:55.151 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:29:55.151 UTC [275] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:29:52 | 275 | @effect/sql-pg | client backend | active | : | -- ── 7. Data fixes ──────────────────────────────────────────────────────── -- Step 3: a draft whose draft_step is 4 (t
04:29:52 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:29:52 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:29:52 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:29:52 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:29:52 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:19.164 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:19.164 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:19.164 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:19.164 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:19.164 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:19 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (T1 M2): scratch rows only, rolled back by the sentinel. -- (a) the header and the grants are the ones the door
04:30:19 | 438 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:30:19 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:19 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:19 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:19 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:30:19 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 3
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:29:38.171 UTC [273] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:29:38.171 UTC [273] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:29:38.171 UTC [273] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:29:38.171 UTC [273] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:29:38.171 UTC [273] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:29:35 | 273 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_cat uuid; v_k text := 'e2e_mig_m13_' || substr(md5(random()::text), 1, 8); v_c text; v_p text; v_q 
04:29:35 | 356 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:29:35 | 207 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:29:35 | 208 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:29:35 | 201 |  | checkpointer |  | Activity:CheckpointerMain | 
04:29:35 | 202 |  | background writer |  | Activity:BgwriterMain | 
04:29:35 | 204 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 4
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:31:18.586 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:31:18.586 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:31:18.586 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:31:18.586 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:31:18.586 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql...
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:31:17 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:31:17 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:31:17 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:31:17 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:31:17 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 5
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:35.930 UTC [275] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:35.930 UTC [275] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:35.930 UTC [275] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:35.930 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:35.930 UTC [275] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:34 | 275 | @effect/sql-pg | client backend | active | : | GRANT EXECUTE ON FUNCTION public.admin_set_legal_settings(jsonb) TO authenticated
04:30:34 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:34 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:34 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:34 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:30:34 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 6
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:20.987 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:20.987 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:20.987 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:20.987 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:20.987 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:21 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
04:30:21 | 431 | PostgREST 16.4 | client backend | idle in transaction | Client:ClientRead | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:30:21 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:21 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:21 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:21 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:30:21 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 7
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:29.721 UTC [275] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:29.721 UTC [275] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:29.721 UTC [275] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:29.721 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:29.721 UTC [275] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:27 | 275 | @effect/sql-pg | client backend | active | : | -- Proof (one DO block, scratch rows in the e2e-mig- namespace, no caller, rolled -- back by sentinel). The commit and u
04:30:27 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:27 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:27 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:27 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:30:27 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 8
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:29:43.267 UTC [275] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:29:43.267 UTC [275] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:29:43.267 UTC [275] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:29:43.267 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:29:43.267 UTC [275] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:29:40 | 275 | @effect/sql-pg | client backend | active | : | DROP POLICY IF EXISTS listing_locations_owner_update ON public.listing_locations
04:29:40 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:29:40 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:29:40 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:29:40 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:29:40 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:34.542 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:34.542 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:34.542 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:34.542 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:34.542 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:32 | 274 | @effect/sql-pg | client backend | active | : | SELECT public.name_folds_rebuild()
04:30:32 | 423 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:30:32 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:32 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:32 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:32 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:30:32 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 10
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:32:15.488 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:32:15.488 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:32:15.488 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:32:15.488 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:32:15.488 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:32:15 | 431 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:32:15 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:32:15 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:32:15 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:32:15 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:32:15 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 11
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:29:56.543 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:29:56.543 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:29:56.543 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:29:56.543 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:29:56.543 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:29:56 | 371 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:29:56 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:29:56 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:29:56 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:29:56 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:29:56 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 12
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:31:51.125 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:31:51.125 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:31:51.125 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:31:51.125 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:31:51.125 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:31:47 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
04:31:47 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:31:47 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:31:47 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:31:47 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:31:47 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 13
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:00.029 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:00.029 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:00.029 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:00.029 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:00.029 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:29:56 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
04:29:56 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:29:56 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:29:56 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:29:56 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:29:56 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 14
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:30.980 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:30.980 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:30.980 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:30.980 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:30.980 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:30 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_old text; v_new text; v_oid oid; v_src text; v_gate text := E' -- INC-951 3c (D1 M6b-cat
04:30:30 | 430 | PostgREST 16.4 | client backend | active | : | with all_relations as ( select reltype from pg_class where relkind in ('v','r','m','f','p') union select oid from pg_typ
04:30:30 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:30 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:30 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:30 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:30:30 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 15
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:13.665 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:13.665 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:13.665 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:13.665 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:13.665 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:11 | 274 | @effect/sql-pg | client backend | active | : | -- Bundle 11, the Listings console, turn L1 (2026-10-11). Tier A. The console's doors and the seller's notices -- (D134,
04:30:11 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:11 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:11 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:11 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:30:11 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 16
- Step failure:
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
Cause:
```text
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 04:30:24.963 UTC [274] postgres@postgres ERROR:  DEC-340 planted failure: the server record must show this stack
172.18.0.1 2026-11-05 04:30:24.963 UTC [274] postgres@postgres DETAIL:  dec340_planted_raise() raised on purpose
172.18.0.1 2026-11-05 04:30:24.963 UTC [274] postgres@postgres HINT:  commit 2 of the ci-db-error-record lane removes this file
172.18.0.1 2026-11-05 04:30:24.963 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function dec340_planted_raise() line 3 at RAISE
	SQL statement "SELECT public.dec340_planted_raise()"
	PL/pgSQL function inline_code_block line 3 at PERFORM
172.18.0.1 2026-11-05 04:30:24.963 UTC [274] postgres@postgres STATEMENT:  DO $$
(4 statement lines dropped)
```
Statement:
```text
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
```
Last 20 lines:
```text
Applying migration 20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql...
Applying migration 20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql...
Applying migration 20261105041444_94668649-35fb-405f-91a2-473d6329690e.sql...
ERROR: DEC-340 planted failure: the server record must show this stack (SQLSTATE P0001)
dec340_planted_raise() raised on purpose
At statement: 2
DO $$
BEGIN
  PERFORM public.dec340_planted_raise();
END;
$$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:30:24 | 274 | @effect/sql-pg | client backend | active | Client:ClientRead | SELECT count(*) = 3 AS provisioned FROM pg_catalog.pg_attribute a JOIN pg_catalog.pg_class c ON c.oid = a.attrelid WHERE
04:30:24 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:30:24 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:30:24 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:30:24 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:30:24 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105041444_94668649-35fb-405f-91a2-473d6329690e stmt 2; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
