# Local backend proof (non-gating)

- Commit: `9c430cf99c2a0219d7b8e71c92cd55b9f7eb5fc7`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41414833020

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 49 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 71 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 69 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 71 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 71 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 64 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 62 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 4, 1 9, 2 6, 3 9, 4 8, 5 9, 6 8, 7 8, 8 8, 9 9, 10 7, 11 9, 12 6, 13 7, 14 8, 15 8, 16 9, repeat not run
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
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:52 | 274 | @effect/sql-pg | client backend | active | : | -- ===== C — proofs (scratch rows only; no auth.users row; the caller is a random id) ===== DO $proof$ DECLARE v_key tex
08:43:52 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:52 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:52 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:52 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:43:52 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:16 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
08:43:16 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:16 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:16 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:16 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:43:16 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF (SELECT max_cities FROM public.coverage_plans WHERE plan = v_plan) <> 3 THEN
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:44:04 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:44:04 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:44:04 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:44:04 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:44:04 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:45:22 | 274 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
08:45:22 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:45:22 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:45:22 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:45:22 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:45:22 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:46 | 431 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
08:43:46 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:46 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:46 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:46 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:43:46 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 4
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:40 | 400 | PostgREST 16.4 | client backend | idle in transaction | : | WITH pks_uniques_cols AS ( SELECT conrelid, array_agg(key order by key) as cols FROM pg_constraint, LATERAL unnest(conke
08:43:40 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:40 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:40 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:40 | 204 |  | background writer |  | Activity:BgwriterMain | 
08:43:40 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 5
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF (SELECT max_cities FROM public.coverage_plans WHERE plan = v_plan) <> 3 THEN
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:46:24 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:46:24 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:46:24 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:46:24 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:46:24 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 6
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF (SELECT max_cities FROM public.coverage_plans WHERE plan = v_plan) <> 3 THEN
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:39 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:39 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:39 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:39 | 204 |  | background writer |  | Activity:BgwriterMain | 
08:43:39 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 7
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:45:29 | 274 | @effect/sql-pg | client backend | active | : | GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character,
08:45:29 | 399 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
08:45:29 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:45:29 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:45:29 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:45:29 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:45:29 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 8
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:44:19 | 274 | @effect/sql-pg | client backend | active | : | DROP FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text,
08:44:19 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:44:19 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:44:19 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
08:44:19 | 204 |  | background writer |  | Activity:BgwriterMain | 
08:44:19 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:49 | 275 | @effect/sql-pg | client backend | active | : | -- Proof (INC-980): one scratch e2e-n1b2 seller whose alias is then set mixed-case on its own profile (the -- legacy sha
08:43:49 | 429 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
08:43:49 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:49 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:49 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:49 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:43:49 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 10
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:55 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
08:43:55 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:55 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:55 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:55 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:43:55 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:44:27 | 276 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_old text; v_new text; v_svc boolean; v_oid oid; v_src text; v_gate text; v_uid uuid := g
08:44:27 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:44:27 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:44:27 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
08:44:27 | 204 |  | background writer |  | Activity:BgwriterMain | 
08:44:27 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:50 | 274 | @effect/sql-pg | client backend | active | : | SELECT count(*) = 3 AS provisioned FROM pg_catalog.pg_attribute a JOIN pg_catalog.pg_class c ON c.oid = a.attrelid WHERE
08:43:50 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:50 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:50 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:50 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:43:50 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 13
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:56 | 275 | @effect/sql-pg | client backend | active | : | -- PROOF (NCQ-7a…h, NCQ-8): its own scratch user only, mutation and readback in separate statements, -- rolled back whol
08:43:56 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:56 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:56 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:56 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:43:56 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 14
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:53 | 275 | @effect/sql-pg | client backend | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
08:43:53 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:53 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:53 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:53 | 204 |  | background writer |  | Activity:BgwriterMain | 
08:43:53 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 15
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF (SELECT max_cities FROM public.coverage_plans WHERE plan = v_plan) <> 3 THEN
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:43:49 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:43:49 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:43:49 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:43:49 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:43:49 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 16
- Step failure:
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Cause:
```text
ERROR: badPlan (SQLSTATE P0001)
```
Statement:
```text
At statement: 11
-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 [masked hex]).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
(189 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:44:16 | 274 | @effect/sql-pg | client backend | active | : | -- Foundations turn N1b-1, M2 (INC-977, INC-981): the database's one outside call, signed, never carrying the secret. --
08:44:16 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:44:16 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:44:16 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:44:16 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:44:16 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6 stmt 11; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
