# Local backend proof (non-gating)

- Commit: `919cea1524b0f9e7fc765c2cbc7501f89d4d52cf`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41417522518

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 58 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 64 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 48 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 76 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 71 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 62 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 71 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 50 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 63 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 6, 1 7, 2 4, 3 9, 4 9, 5 9, 6 9, 7 8, 8 6, 9 8, 10 9, 11 8, 12 9, 13 4, 14 9, 15 7, 16 8, repeat not run
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
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:07:53 | 274 | @effect/sql-pg | client backend | active | IO:WalInitSync | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
09:07:53 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:07:53 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:07:53 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:07:53 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:07:53 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:06:36 | 275 | @effect/sql-pg | client backend | active | : | CREATE OR REPLACE FUNCTION public.reveal_listing_contact(p_public_id text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFIN
09:06:36 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:06:36 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:06:36 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:06:36 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:06:36 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:05:46 | 275 | @effect/sql-pg | client backend | active | : | -- Proof (INC-980): one scratch e2e-n1b2 seller whose alias is then set mixed-case on its own profile (the -- legacy sha
09:05:46 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:05:46 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:05:46 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
09:05:46 | 204 |  | background writer |  | Activity:BgwriterMain | 
09:05:46 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:05:23 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
09:05:23 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:05:23 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:05:23 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:05:23 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:05:23 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:05:51 | 274 | @effect/sql-pg | client backend | active | : | REVOKE ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) FROM PUBLIC
09:05:51 | 419 | PostgREST 16.4 | client backend | active | : | WITH pks_uniques_cols AS ( SELECT conrelid, array_agg(key order by key) as cols FROM pg_constraint, LATERAL unnest(conke
09:05:51 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:05:51 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:05:51 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:05:51 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:05:51 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 4
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package_price.ended'
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:06:00 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:06:00 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:06:00 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:06:00 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:06:00 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 5
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:06:03 | 274 | @effect/sql-pg | client backend | active | IO:DataFileExtend | CREATE TABLE public.job_pauses ( job text NOT NULL PRIMARY KEY CHECK (job IN ('name-check-catchup')), reason text NOT NU
09:06:03 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:06:03 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:06:03 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
09:06:03 | 204 |  | background writer |  | Activity:BgwriterMain | 
09:06:03 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 6
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package_price.ended'
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:05:59 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:05:59 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:05:59 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:05:59 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:05:59 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 7
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:08:03 | 274 | @effect/sql-pg | client backend | active | : | -- Proof (one DO block, scratch rows in the e2e-mig- namespace, no caller, rolled -- back by sentinel). The commit and u
09:08:03 | 400 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:08:03 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:08:03 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:08:03 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:08:03 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:08:03 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 8
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:05:40 | 275 | @effect/sql-pg | client backend | active | IO:DataFileExtend | CREATE FUNCTION public.admin_upsert_attribute( p_id uuid, p_attr_key text, p_name_en text, p_attr_type text, p_options j
09:05:40 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:05:40 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:05:40 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
09:05:40 | 204 |  | background writer |  | Activity:BgwriterMain | 
09:05:40 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:06:59 | 276 | @effect/sql-pg | client backend | active | : | -- Proofs — scratch rows inside a block that always rolls back. DO $p$ DECLARE v_s text := 'm8b-proof-' || substr(md5(ra
09:06:59 | 210 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:06:59 | 211 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:06:59 | 204 |  | checkpointer |  | Activity:CheckpointerMain | 
09:06:59 | 205 |  | background writer |  | Activity:BgwriterMain | 
09:06:59 | 207 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 10
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:06:54 | 274 | @effect/sql-pg | client backend | active | : | -- Proof (INC-980): its own scratch e2e-n1b2 seller (v_u) only, the legacy mixed-case alias shape included (INC-986); ro
09:06:54 | 428 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:06:54 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:06:54 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:06:54 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:06:54 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:06:54 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 11
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:05:56 | 274 | @effect/sql-pg | client backend | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
09:05:56 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:05:56 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:05:56 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:05:56 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:05:56 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package_price.ended'
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:05:47 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:05:47 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:05:47 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:05:47 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:05:47 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 13
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:05:45 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
09:05:45 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:05:45 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:05:45 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:05:45 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:05:45 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 14
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:06:28 | 432 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:06:28 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:06:28 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:06:28 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:06:28 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:06:28 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 15
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:06:06 | 275 | @effect/sql-pg | client backend | active | : | REVOKE ALL ON public.job_runs, public.job_leases, public.job_pauses FROM PUBLIC, anon, authenticated
09:06:06 | 414 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
09:06:06 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:06:06 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:06:06 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
09:06:06 | 204 |  | background writer |  | Activity:BgwriterMain | 
09:06:06 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 16
- Step failure:
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Cause:
```text
ERROR: P-1 M1c proof (d-h): a refused call wrote (SQLSTATE P0001)
```
Statement:
```text
At statement: 9
-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
(232 lines omitted)
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
            AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text)) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): a refused call wrote';
    END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
09:06:11 | 274 | @effect/sql-pg | client backend | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
09:06:11 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
09:06:11 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
09:06:11 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
09:06:11 | 203 |  | background writer |  | Activity:BgwriterMain | 
09:06:11 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97 stmt 9; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
