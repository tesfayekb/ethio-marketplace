# Local backend proof (non-gating)

- Commit: `b3e8dba2adf1fd297fe72072dccef2e39fb503c3`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41156059838

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 115 | applied 383/383 | 0 | 0 | 0 | 0 | 0 |
| email | 141 | 89 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 873 | 118 | applied 383/383 | 148 | 0 | 0 | 4 | 152 |
| 2 | 1071 | 105 | applied 383/383 | 152 | 0 | 0 | 3 | 155 |
| 3 | not run | 90 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | 752 | 107 | applied 383/383 | 157 | 0 | 0 | 2 | 159 |
| 5 | 644 | 117 | applied 383/383 | 127 | 0 | 0 | 7 | 134 |
| 6 | 769 | 110 | applied 383/383 | 149 | 0 | 0 | 1 | 150 |
| 7 | 416 | 113 | applied 383/383 | 104 | 0 | 0 | 49 | 153 |
| 8 | 608 | 105 | applied 383/383 | 103 | 0 | 0 | 43 | 146 |
| 9 | 691 | 99 | applied 383/383 | 145 | 0 | 0 | 13 | 158 |
| 10 | 1033 | 107 | applied 383/383 | 160 | 0 | 0 | 2 | 162 |
| 11 | 862 | 108 | applied 383/383 | 132 | 0 | 0 | 2 | 134 |
| 12 | 762 | 106 | applied 383/383 | 155 | 0 | 0 | 4 | 159 |
| 13 | 604 | 110 | applied 383/383 | 131 | 0 | 0 | 7 | 138 |
| 14 | 846 | 106 | applied 383/383 | 186 | 0 | 0 | 2 | 188 |
| 15 | 570 | 116 | applied 383/383 | 143 | 0 | 0 | 77 | 220 |
| 16 | 367 | 119 | applied 383/383 | 41 | 0 | 0 | 0 | 41 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2039 | 0 | 0 | 216 | 2255 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1071 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 13, email 9, 1 13, 2 13, 3 8, 4 13, 5 13, 6 10, 7 13, 8 11, 9 9, 10 11, 11 13, 12 14, 13 10, 14 11, 15 12, 16 13, repeat not run
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41156059838-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41156059838-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41156059838-local-2
  - 3: not found
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41156059838-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41156059838-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41156059838-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41156059838-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41156059838-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41156059838-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41156059838-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41156059838-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41156059838-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41156059838-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41156059838-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41156059838-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41156059838-local-16
  - repeat: not found
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail]); the auth server's text columns '' (INC-808)
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
RLS on 85 of 85 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane smoke
- Step failure:
Step database-security-lints: outcome failure
  function_executable_by_anon ERROR 20
  ::error::function_executable_by_anon 20 is above its baseline 19
  function_search_path_mutable WARN 0
  rls_disabled_in_public ERROR 0
  security_definer_view ERROR 0
  table_writable_by_client WARN 0
  anon-executable functions outside the allowlist: 20 (names in the local-proof-smoke artifact)
  ::error::Database security lints differ from the baseline on the temporary backend (DEC-240)
- No JSON results; smoke skipped

## Lane 3
- Step failure:
Step backend: outcome failure
  
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql...
Cause:
```text
Error response from daemon: toomanyrequests: Rate exceeded
Error response from daemon: toomanyrequests: Rate exceeded
Error response from daemon: toomanyrequests: Rate exceeded
ERROR: refused:replay (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- Proof (INC-970, INC-980): scratch e2e-n1b users and scratch job rows only, read by their own ids; job_leases and
-- job_pauses are empty at birth (M2) and the proof asserts that before it writes; the sentinel rolls it all back.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text,'-','');
  v_tag  text := 'e2e-n1b-' || substr(v_hex,1,12);
  v_u1   uuid := gen_random_uuid();
  v_a1   text := 'qz' || translate(substr(v_hex,1,10),'0123456789','ghijkmnopr');
  v_now  bigint := floor(extract(epoch FROM clock_timestamp()))::bigint;
  v_run  uuid := gen_random_uuid();
(102 lines omitted)
  END LOOP;

  RAISE EXCEPTION 'M3 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M3 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u1) OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u1)
    OR EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (v_run, v_old))
    OR EXISTS (SELECT 1 FROM public.job_leases WHERE holder IN (v_h1, v_h2)) THEN
   RAISE EXCEPTION 'M3 rollback failed'; END IF;
END;
$proof$
```
Last 20 lines:
```text

  RAISE EXCEPTION 'M3 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M3 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u1) OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u1)
    OR EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (v_run, v_old))
    OR EXISTS (SELECT 1 FROM public.job_leases WHERE holder IN (v_h1, v_h2)) THEN
   RAISE EXCEPTION 'M3 rollback failed'; END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (31320-31329, DEC-284; 54320-54329, the retired block):
TIME-WAIT  0      0               127.0.0.1:36226              127.0.0.1:31322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:48:29 | 237 | @effect/sql-pg | active | : | -- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) ===== DO $proof$ DECLARE v_n integer; v_
01:48:29 | 212 |  |  | Activity:AutovacuumMain | 
01:48:29 | 214 | pg_cron scheduler |  | Extension:Extension | 
01:48:29 | 215 |  |  | Activity:LogicalLauncherMain | 
01:48:29 | 208 |  |  | Activity:CheckpointerMain | 
01:48:29 | 209 |  |  | Activity:BgwriterMain | 
01:48:29 | 211 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
