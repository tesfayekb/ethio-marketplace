# Local backend proof (non-gating)

- Commit: `29ff30d588fd1541759b1cfa0dc86d19fe3b5cd6`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41392124605

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 58 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 71 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 63 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 51 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 71 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 51 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 70 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | 49 | not confirmed; backend failure | 0 | 0 | 0 | 20 | 20 |
| TOTAL | — | — | — | 0 | 0 | 0 | 20 | 20 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 20 tests selected, 20 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 2 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 6, email 6, 1 8, 2 6, 3 7, 4 8, 5 9, 6 6, 7 8, 8 9, 9 8, 10 4, 11 8, 12 6, 13 4, 14 8, 15 9, 16 9, repeat 4
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
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:48 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_cat uuid; v_k text := 'e2e_mig_m13_' || substr(md5(random()::text), 1, 8); v_c text; v_p text; v_q 
05:09:48 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:48 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:48 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:48 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:48 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:56 | 274 | @effect/sql-pg | client backend | active | : | SELECT public.name_folds_rebuild()
05:09:56 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:56 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:56 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:56 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:56 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:53 | 275 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
05:09:53 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:53 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:53 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:53 | 204 |  | background writer |  | Activity:BgwriterMain | 
05:09:53 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:35 | 387 | PostgREST 16.4 | client backend | idle in transaction | Client:ClientRead | BEGIN ISOLATION LEVEL READ COMMITTED READ ONLY
05:09:35 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:35 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:35 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:35 | 204 |  | background writer |  | Activity:BgwriterMain | 
05:09:35 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 3
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:10:11 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:10:11 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:10:11 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
05:10:11 | 204 |  | background writer |  | Activity:BgwriterMain | 
05:10:11 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 4
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:58 | 274 | @effect/sql-pg | client backend | active | : | REVOKE ALL ON FUNCTION public.category_pointer_no_cycle() FROM PUBLIC, anon, authenticated
05:09:58 | 400 | PostgREST 16.4 | client backend | active | : | with all_relations as ( select reltype from pg_class where relkind in ('v','r','m','f','p') union select oid from pg_typ
05:09:58 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:58 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:58 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:58 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:58 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 5
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:10:10 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (NCAP-1…7): its own scratch seller and scratch staff only, rolled back whole, raising on failure. DO $proof$ DE
05:10:10 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:10:10 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:10:10 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:10:10 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:10:10 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 6
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:12:05 | 376 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:12:05 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:12:05 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:12:05 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:12:05 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:12:05 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 7
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:52 | 274 | @effect/sql-pg | client backend | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
05:09:52 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:52 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:52 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:52 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:52 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 8
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:10:27 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:10:27 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:10:27 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:10:27 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:10:27 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:49 | 273 | @effect/sql-pg | client backend | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
05:09:49 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:49 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:49 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:49 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:49 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 10
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:17 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
05:09:17 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:17 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:17 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:17 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:17 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:10:47 | 274 | @effect/sql-pg | client backend | active | : | -- Proofs — a scratch admin and scratch rows inside a block that always rolls back. DO $p$ DECLARE v_uid uuid := gen_ran
05:10:47 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:10:47 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:10:47 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:10:47 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:10:47 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:35 | 275 | @effect/sql-pg | client backend | active | : | -- ===== E6 — proofs (scratch rows only; no auth.users row; claims are a random id) ===== DO $proof$ DECLARE v_key text 
05:09:35 | 378 | PostgREST 16.4 | client backend | active | Lock:relation | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:09:35 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:35 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:35 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:35 | 204 |  | background writer |  | Activity:BgwriterMain | 
05:09:35 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 13
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:10:51 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
05:10:51 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:10:51 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:10:51 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:10:51 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:10:51 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 14
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:42 | 275 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_cat uuid; v_k text := 'e2e_mig_m13_' || substr(md5(random()::text), 1, 8); v_c text; v_p text; v_q 
05:09:42 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:42 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:42 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:42 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:42 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 15
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:54 | 429 | PostgREST 16.4 | client backend | active | : | with recursive pks_fks as ( -- pk + fk referencing col select contype::text as contype, conname, array_length(conkey, 1)
05:09:54 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:54 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:54 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:54 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:54 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 16
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:12:40 | 434 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:12:40 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:12:40 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:12:40 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
05:12:40 | 204 |  | background writer |  | Activity:BgwriterMain | 
05:12:40 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane repeat
- Step failure:
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]

## Lane repeat
## Migration/start failure
Last migration line: Applying migration 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql...
Cause:
```text
ERROR: syntax error at end of input (SQLSTATE 42601)
```
Statement:
```text
At statement: 3
-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
(111 lines omitted)
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
```
Last 20 lines:
```text
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
                     ^
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:09:20 | 273 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
05:09:20 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:09:20 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:09:20 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:09:20 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:09:20 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99 stmt 3; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
