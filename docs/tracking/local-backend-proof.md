# Local backend proof (non-gating)

- Commit: `a0ad85da4300d2c9015d41321e6ddad124614e1b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42006437766

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 66 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 67 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 50 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 63 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 65 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 69 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 48 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 52 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 65 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 57 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 70 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 75 | 75 |
| TOTAL | — | — | — | 0 | 0 | 0 | 75 | 75 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Repeat: each 2 on both projects; 75 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 3 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 7, 1 7, 2 4, 3 9, 4 6, 5 7, 6 9, 7 6, 8 9, 9 9, 10 8, 11 9, 12 4, 13 5, 14 6, 15 5, 16 8, repeat 9
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
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
172.18.0.1 2026-11-05 09:59:21.214 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:59:21.214 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:59:21.214 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:59:20 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_types text; v_md5 text; v_door_md5 text; v_acl text; v_oid oid; v_core oid; v_src text; 
09:59:20 | 429 | PostgREST 16.4 | client backend | active | : | with all_relations as ( select reltype from pg_class where relkind in ('v','r','m','f','p') union select oid from pg_typ
09:59:20 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:59:20 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:59:20 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:59:20 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:59:20 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane email
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:58:46.220 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:46.220 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:46.220 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:43 | 274 | @effect/sql-pg | client backend | active | : | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
09:58:43 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:43 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:43 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:43 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:43 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:58:42.201 UTC [273] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:42.201 UTC [273] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:42.201 UTC [273] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:38 | 273 | @effect/sql-pg | client backend | active | : | -- ===== E6 — proofs (scratch rows only; no auth.users row; claims are a random id) ===== DO $proof$ DECLARE v_key text 
09:58:38 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:38 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:38 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:38 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:38 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:58:17.156 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:17.156 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:17.156 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:13 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
09:58:13 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:13 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:13 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:13 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:13 | 205 |  | walwriter |  | Activity:WalWriterMain | 
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
172.18.0.1 2026-11-05 10:01:09.596 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 10:01:09.596 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 10:01:09.596 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
10:01:09 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 2. PROOFS -- (a) the header and the grants; the old sign
10:01:09 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
10:01:09 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
10:01:09 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
10:01:09 | 203 |  | background writer |  | Activity:BgwriterMain | 
10:01:09 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 4
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
172.18.0.1 2026-11-05 09:58:31.785 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:31.785 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:31.785 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:28 | 274 | @effect/sql-pg | client backend | active | : | -- ===== E6 — proofs (scratch rows only; no auth.users row; claims are a random id) ===== DO $proof$ DECLARE v_key text 
09:58:28 | 379 | PostgREST 16.4 | client backend | active | Lock:relation | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:58:28 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:28 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:28 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:28 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:28 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
172.18.0.1 2026-11-05 09:59:07.589 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:59:07.589 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:59:07.589 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:59:07 | 415 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:59:07 | 274 | @effect/sql-pg | client backend | active | IO:WalSync | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
09:59:07 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:59:07 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:59:07 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:59:07 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:59:07 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 6
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:58:43.900 UTC [276] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:43.900 UTC [276] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:43.900 UTC [276] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:43 | 276 | @effect/sql-pg | client backend | active | : | -- PROOF (NCQ-9…12): its own scratch users only; the queue is read through the core scoped to them -- (the door's allow 
09:58:43 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:43 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:43 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:43 | 204 |  | background writer |  | Activity:BgwriterMain | 
09:58:43 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 7
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:59:21.624 UTC [275] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:59:21.624 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:59:21.624 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:59:18 | 275 | @effect/sql-pg | client backend | active | : | GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role
09:59:18 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:59:18 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:59:18 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
09:59:18 | 204 |  | background writer |  | Activity:BgwriterMain | 
09:59:18 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:58:46.574 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:46.574 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:46.574 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:46 | 274 | @effect/sql-pg | client backend | active | : | -- PROOFS: scratch rows only, rolled back by the sentinel. -- (a) the status check takes paused; the header and the gran
09:58:46 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:46 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:46 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:46 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:46 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:59:07.322 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:59:07.322 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:59:07.322 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:59:06 | 274 | @effect/sql-pg | client backend | active | : | GRANT EXECUTE ON FUNCTION public.name_check_mark(uuid, text, text, text) TO service_role
09:59:06 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:59:06 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:59:06 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:59:06 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:59:06 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 10
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
172.18.0.1 2026-11-05 10:01:01.558 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 10:01:01.558 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 10:01:01.558 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
10:01:00 | 274 | @effect/sql-pg | client backend | active | : | CREATE OR REPLACE FUNCTION public.public_listing_json(l listings, p_viewer uuid) RETURNS jsonb LANGUAGE plpgsql STABLE S
10:01:00 | 408 | PostgREST 16.4 | client backend | active | : | with recursive pks_fks as ( -- pk + fk referencing col select contype::text as contype, conname, array_length(conkey, 1)
10:01:00 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
10:01:00 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
10:01:00 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
10:01:00 | 203 |  | background writer |  | Activity:BgwriterMain | 
10:01:00 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
172.18.0.1 2026-11-05 09:59:57.223 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:59:57.223 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:59:57.223 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:59:57 | 274 | @effect/sql-pg | client backend | active | : | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
09:59:57 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:59:57 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:59:57 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:59:57 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:59:57 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
172.18.0.1 2026-11-05 09:58:11.988 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:11.988 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:11.988 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:09 | 274 | @effect/sql-pg | client backend | active | : | -- Proofs — scratch rows inside a block that always rolls back. DO $p$ DECLARE v_s text := 'm8b-proof-' || substr(md5(ra
09:58:09 | 352 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:58:09 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:09 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:09 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:09 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:09 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 13
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
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
172.18.0.1 2026-11-05 09:58:29.838 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:29.838 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:29.838 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:29 | 369 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:58:29 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:29 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:29 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:29 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:29 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 14
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:59:06.146 UTC [276] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:59:06.146 UTC [276] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:59:06.146 UTC [276] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:59:02 | 276 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_cat uuid; v_k text := 'e2e_mig_m13_' || substr(md5(random()::text), 1, 8); v_c text; v_p text; v_q 
09:59:02 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:59:02 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:59:02 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
09:59:02 | 204 |  | background writer |  | Activity:BgwriterMain | 
09:59:02 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 15
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 09:58:37.082 UTC [275] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:37.082 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:37.082 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:33 | 275 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
09:58:33 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:33 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:33 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:33 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:33 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
172.18.0.1 2026-11-05 10:00:35.585 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 10:00:35.585 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 10:00:35.585 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
10:00:34 | 274 | @effect/sql-pg | client backend | active | : | INSERT INTO public.migration_marks (version) VALUES ('20261024180000') ON CONFLICT DO NOTHING
10:00:34 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
10:00:34 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
10:00:34 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
10:00:34 | 203 |  | background writer |  | Activity:BgwriterMain | 
10:00:34 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane repeat
- Step failure:
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
172.18.0.1 2026-11-05 09:58:53.313 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:58:53.313 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:58:53.313 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
09:58:51 | 274 | @effect/sql-pg | client backend | active | : | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
09:58:51 | 425 | PostgREST 16.4 | client backend | active | Client:ClientRead | SELECT c.castsource::regtype::text, c.casttarget::regtype::text, c.castfunc::regproc::text FROM pg_catalog.pg_cast c JOI
09:58:51 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:58:51 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:58:51 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:58:51 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:58:51 | 205 |  | walwriter |  | IO:WalSync | 
start failed in 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076 stmt 16; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
