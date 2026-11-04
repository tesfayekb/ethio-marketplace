# Local backend proof (non-gating)

- Commit: `4a3b5acc6e48fe9253a9a0587d8f2252660ab0b4`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41863913123

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 50 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 71 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 58 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 51 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 53 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 69 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 54 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 64 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 49 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 4, 1 8, 2 5, 3 8, 4 9, 5 5, 6 5, 7 8, 8 9, 9 5, 10 9, 11 9, 12 7, 13 8, 14 9, 15 9, 16 4, repeat not run
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
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_8f4d9174 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:08:04 | 274 | @effect/sql-pg | client backend | active | IO:WalSync | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
16:08:04 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:08:04 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:08:04 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:08:04 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:08:04 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_5448df21 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:28 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
16:07:28 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:28 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:28 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:28 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:28 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_f6a0684c (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:09:24 | 274 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
16:09:24 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:09:24 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:09:24 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:09:24 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:09:24 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_c29d41d0 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:28 | 274 | @effect/sql-pg | client backend | active | : | REVOKE ALL ON FUNCTION public.admin_reveal_listing_contact(uuid, text) FROM PUBLIC, anon
16:07:28 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:28 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:28 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:28 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:28 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_a8532ec1 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:52 | 274 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
16:07:52 | 405 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
16:07:52 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:52 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:52 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:52 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:52 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 4
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_d163a15b (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:10:34 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (M5a): scratch rows only, rolled back by the sentinel. -- (1) each core: same body as the live door (md5 of pro
16:10:34 | 433 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
16:10:34 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:10:34 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:10:34 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:10:34 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:10:34 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 5
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_64f40e10 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:35 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-b): scratch rows only, rolled back by the sentinel; no real row read (G27; the -- currency is a scratch
16:07:35 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:35 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:35 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:35 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:35 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 6
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_4a643545 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:08:30 | 274 | @effect/sql-pg | client backend | active | : | -- ===== B — the two readers, whole ===== CREATE OR REPLACE FUNCTION public.public_listing_json(l public.listings, p_vie
16:08:30 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:08:30 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:08:30 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:08:30 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:08:30 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 7
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_47ea464e (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:08:13 | 273 | @effect/sql-pg | client backend | active | Client:ClientRead | SELECT count(*) = 3 AS provisioned FROM pg_catalog.pg_attribute a JOIN pg_catalog.pg_class c ON c.oid = a.attrelid WHERE
16:08:13 | 413 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
16:08:13 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:08:13 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:08:13 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:08:13 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:08:13 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 8
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_7f6fe6bd (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:49 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (M5a): scratch rows only, rolled back by the sentinel. -- (1) each core: same body as the live door (md5 of pro
16:07:49 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:49 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:49 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:49 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:49 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_4ed18228 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:35 | 274 | @effect/sql-pg | client backend | active | : | SELECT public.name_folds_rebuild()
16:07:35 | 363 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
16:07:35 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:35 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:35 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:35 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:35 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 10
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_cb354754 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:54 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_types text; v_md5 text; v_door_md5 text; v_acl text; v_oid oid; v_core oid; v_src text; 
16:07:54 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:54 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:54 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:54 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:54 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_f75a955d (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:08:05 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 3. PROOFS -- Scratch rows only, rolled back by the senti
16:08:05 | 430 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
16:08:05 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:08:05 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:08:05 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:08:05 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:08:05 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 12
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_dc916912 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:46 | 275 | @effect/sql-pg | client backend | active | : | SELECT public.name_folds_rebuild()
16:07:46 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:46 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:46 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:46 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:46 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 13
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_f0dad5ad (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:35 | 274 | @effect/sql-pg | client backend | active | : | -- Proofs — scratch rows inside a block that always rolls back. DO $p$ DECLARE v_s text := 'm8b-proof-' || substr(md5(ra
16:07:35 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:35 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:35 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:35 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:35 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 14
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_a2e87eb1 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:49 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_old text; v_new text; v_oid oid; v_src text; v_gate text := E' -- INC-951 3c (D1 M6b-leg
16:07:49 | 433 | PostgREST 16.4 | client backend | active | : | WITH role_setting AS ( SELECT setdatabase as database, unnest(setconfig) as setting FROM pg_catalog.pg_db_role_setting W
16:07:49 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:49 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:49 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:49 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:49 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 15
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_7049b3d0 (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:08:16 | 431 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
16:08:16 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:08:16 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:08:16 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:08:16 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:08:16 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 16
- Step failure:
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql...
Cause:
```text
ERROR: feed_tier_rank: unknown tier e2e_mig_l1_d24a37fe (SQLSTATE P0001)
```
Statement:
```text
At statement: 6
-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
(215 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
16:07:32 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
16:07:32 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
16:07:32 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
16:07:32 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
16:07:32 | 203 |  | background writer |  | Activity:BgwriterMain | 
16:07:32 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b stmt 6; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
