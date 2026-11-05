# Local backend proof (non-gating)

- Commit: `51fe8c2d9570ce9cbbc6dfc039170b30cdc4f129`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42000937962

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 77 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 49 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 56 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 65 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 50 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | 66 | not confirmed; backend failure | 0 | 0 | 0 | 75 | 75 |
| TOTAL | — | — | — | 0 | 0 | 0 | 75 | 75 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Repeat: each 2 on both projects; 75 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 3 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 9, 1 9, 2 9, 3 4, 4 6, 5 6, 6 9, 7 9, 8 9, 9 9, 10 5, 11 7, 12 9, 13 9, 14 5, 15 9, 16 9, repeat 7
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
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:57.600 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:57.600 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:57.600 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:54 | 274 | @effect/sql-pg | client backend | active | : | -- ===== F — proofs ===== DO $proof$ DECLARE v_n integer; v_i integer; v_id text; v_ids text[] := ARRAY[]::text[]; v_rol
09:18:54 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:54 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:54 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:54 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:54 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:20:31.525 UTC [275] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:20:31.525 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:20:31.525 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:20:30 | 275 | @effect/sql-pg | client backend | active | : | -- Foundations turn N1b-1, M2 (INC-977, INC-981): the database's one outside call, signed, never carrying the secret. --
09:20:30 | 430 | PostgREST 16.4 | client backend | active | : | with all_relations as ( select reltype from pg_class where relkind in ('v','r','m','f','p') union select oid from pg_typ
09:20:30 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:20:30 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:20:30 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
09:20:30 | 204 |  | background writer |  | Activity:BgwriterMain | 
09:20:30 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 1
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:50.992 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:50.992 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:50.992 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:50 | 427 | PostgREST 16.4 | client backend | active | : | with recursive pks_fks as ( -- pk + fk referencing col select contype::text as contype, conname, array_length(conkey, 1)
09:18:50 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:50 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:50 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:50 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:50 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 2
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:50.297 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:50.297 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:50.297 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:49 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_old text; v_new text; v_oid oid; v_src text; v_gate text := E' -- INC-951 3c (D1 M6b-leg
09:18:49 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:49 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:49 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:49 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:49 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:20:41.368 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:20:41.368 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:20:41.368 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:20:38 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
09:20:38 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:20:38 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:20:38 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:20:38 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:20:38 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 4
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:19:19.224 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:19:19.224 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:19:19.224 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:19:16 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_cat uuid; v_k text := 'e2e_mig_m13_' || substr(md5(random()::text), 1, 8); v_c text; v_p text; v_q 
09:19:16 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:19:16 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:19:16 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:19:16 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:19:16 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 5
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:19:02.869 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:19:02.869 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:19:02.869 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:19:01 | 274 | @effect/sql-pg | client backend | active | : | SELECT count(*) = 3 AS provisioned FROM pg_catalog.pg_attribute a JOIN pg_catalog.pg_class c ON c.oid = a.attrelid WHERE
09:19:01 | 387 | PostgREST 16.4 | client backend | active | : | with role_setting as ( select r.rolname, unnest(r.rolconfig) as setting from pg_auth_members m join pg_roles r on r.oid 
09:19:01 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:19:01 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:19:01 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:19:01 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:19:01 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 6
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:50.448 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:50.448 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:50.448 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:50 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-b): scratch rows only, rolled back by the sentinel; no real row read (G27; the -- currency is a scratch
09:18:50 | 432 | PostgREST 16.4 | client backend | active | Lock:relation | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:18:50 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:50 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:50 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:50 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:50 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 7
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:19:23.335 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:19:23.335 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:19:23.335 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:19:23 | 274 | @effect/sql-pg | client backend | active | : | -- PROOFS: scratch rows only, rolled back by the sentinel. -- (a) the status check takes paused; the header and the gran
09:19:23 | 438 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:19:23 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:19:23 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:19:23 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:19:23 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:19:23 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 8
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:56.932 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:56.932 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:56.932 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:55 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_types text; v_md5 text; v_door_md5 text; v_acl text; v_oid oid; v_core oid; v_src text; 
09:18:55 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:55 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:55 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:55 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:55 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:21:03.720 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:21:03.720 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:21:03.720 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:21:03 | 274 | @effect/sql-pg | client backend | active | : | GRANT ALL ON FUNCTION public.admin_name_check_clear(uuid, text, text, text) TO service_role
09:21:03 | 439 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:21:03 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:21:03 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:21:03 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:21:03 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:21:03 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 10
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:51.592 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:51.592 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:51.592 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:48 | 274 | @effect/sql-pg | client backend | active | : | GRANT EXECUTE ON FUNCTION public.publish_listing(uuid) TO authenticated
09:18:48 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:48 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:48 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:48 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:48 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:48.743 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:48.743 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:48.743 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:46 | 274 | @effect/sql-pg | client backend | active | : | SELECT public.name_folds_rebuild()
09:18:46 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:46 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:46 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:46 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:46 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:19:09.080 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:19:09.080 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:19:09.080 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:19:08 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_uid uuid := gen_random_uuid(); v_role uuid := gen_random_uuid(); v_feature text := 'e2e-a2-' || sub
09:19:08 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:19:08 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:19:08 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:19:08 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:19:08 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 13
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:55.015 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:55.015 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:55.015 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:55 | 440 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:18:55 | 274 | @effect/sql-pg | client backend | active | : | GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO authenticated, s
09:18:55 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:55 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:55 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:55 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:55 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 14
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:18.092 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:18.092 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:18.092 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_p, v_q)) <> v_revs THEN
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:18 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:18 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:18 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:18 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:18 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 15
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:20:06.476 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:20:06.476 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:20:06.476 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:20:06 | 439 | PostgREST 16.4 | client backend | active | : | with role_setting as ( select r.rolname, unnest(r.rolconfig) as setting from pg_auth_members m join pg_roles r on r.oid 
09:20:06 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:20:06 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:20:06 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:20:06 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:20:06 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 16
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:58.121 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:58.121 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:58.121 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:56 | 274 | @effect/sql-pg | client backend | active | : | -- Proofs, with no caller (G39): the policies and the functions read the window from the setting and carry no typed 30 -
09:18:56 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:56 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:56 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:56 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:56 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane repeat
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]

## Lane repeat
## Migration/start failure
Last migration line: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
Cause:
```text
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 09:18:30.688 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:18:30.688 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:18:30.688 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```
Statement:
```text
At statement: 16
-- ------------------------------------------------------------ 5. PROOFS
-- (a) the four bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a seller with his acceptances, two live ads paused by the state
-- machine as the service; as the seller, a pin, a tick and mark_sold land on a paused ad (each its revision);
-- edit_my_listing's status gate lets a paused ad through (its answer is a later refusal, never the gate's
-- 'this listing is not edited') and still refuses the sold one; as a stranger every door answers 'not your
-- listing' and writes nothing. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_pin   regprocedure := 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;
(130 lines omitted)
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 5 proof (c): a stranger''s refused call left a trace';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:18:26 | 274 | @effect/sql-pg | client backend | active | : | -- ── 10. After: the same timings on the new rules ─────────────────────── DO $t$ DECLARE v_name text; i int; t0 timesta
09:18:26 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:18:26 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:18:26 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:18:26 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:18:26 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
