# Local backend proof (non-gating)

- Commit: `aed7904b96eb30258824fc572ff0013e131728bb`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41087865312

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 861 | 85 | applied 382/382 | 205 | 0 | 0 | 69 | 274 |
| email | 187 | 118 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 734 | 104 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 1127 | 107 | applied 382/382 | 159 | 0 | 0 | 3 | 162 |
| 3 | 727 | 100 | applied 382/382 | 122 | 0 | 0 | 0 | 122 |
| 4 | 730 | 115 | applied 382/382 | 146 | 0 | 0 | 2 | 148 |
| 5 | not run | 107 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | 768 | 103 | applied 382/382 | 137 | 0 | 0 | 1 | 138 |
| 7 | 803 | 119 | applied 382/382 | 191 | 0 | 0 | 40 | 231 |
| 8 | 331 | 108 | applied 382/382 | 20 | 0 | 0 | 17 | 37 |
| 9 | 727 | 94 | applied 382/382 | 134 | 0 | 0 | 6 | 140 |
| 10 | 1108 | 118 | applied 382/382 | 143 | 0 | 0 | 2 | 145 |
| 11 | 887 | 114 | applied 382/382 | 130 | 0 | 0 | 1 | 131 |
| 12 | 725 | 110 | applied 382/382 | 143 | 0 | 0 | 5 | 148 |
| 13 | 823 | 117 | applied 382/382 | 145 | 0 | 0 | 5 | 150 |
| 14 | 689 | 105 | applied 382/382 | 134 | 0 | 0 | 4 | 138 |
| 15 | 720 | 119 | applied 382/382 | 185 | 0 | 0 | 37 | 222 |
| 16 | 372 | 115 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 481 | 104 | applied 382/382 | 92 | 0 | 0 | 48 | 140 |
| TOTAL | — | — | — | 2274 | 0 | 0 | 244 | 2518 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1127 s
- Repeat lane (DEC-283): Not repeated: e2e/shell.spec.ts (117 tests); Repeat: each 2 on both projects; 152 tests selected, 35 repeated; budget 720 s at 4.7 s a test; directly changed: 6 of 7 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 13, 1 11, 2 13, 3 12, 4 12, 5 10, 6 12, 7 13, 8 13, 9 12, 10 13, 11 12, 12 13, 13 13, 14 10, 15 11, 16 12, repeat 13
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41087865312-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41087865312-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41087865312-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41087865312-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41087865312-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41087865312-local-4
  - 5: not found
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41087865312-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 41087865312-local-7
  - 8: [e2e:teardown] deleted 2 user(s) owned by process 41087865312-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41087865312-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41087865312-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41087865312-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41087865312-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41087865312-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41087865312-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41087865312-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41087865312-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41087865312-local-repeat
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

## Lane 5
- Step failure:
Step backend: outcome failure
  
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql...
Cause:
```text
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
Error response from daemon: toomanyrequests: Data limit exceeded
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
TIME-WAIT  0      0                127.0.0.1:58268              127.0.0.1:31322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
16:15:14 | 230 | @effect/sql-pg | active | : | DO $proof$ DECLARE v_cat uuid; v_k text := 'e2e_mig_m13_' || substr(md5(random()::text), 1, 8); v_c text; v_p text; v_q 
16:15:14 | 212 |  |  | Activity:AutovacuumMain | 
16:15:14 | 214 | pg_cron scheduler |  | Extension:Extension | 
16:15:14 | 215 |  |  | Activity:LogicalLauncherMain | 
16:15:14 | 208 |  |  | Activity:CheckpointerMain | 
16:15:14 | 209 |  |  | Activity:BgwriterMain | 
16:15:14 | 211 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
