# Local backend proof (non-gating)

- Commit: `fc918fbbc9dda9336541df2a95e429d77e824ccf`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41178779969

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1003 | 68 | applied 383/383 | 205 | 0 | 0 | 69 | 274 |
| email | 213 | 69 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 870 | 68 | applied 383/383 | 148 | 0 | 0 | 4 | 152 |
| 2 | 1098 | 68 | applied 383/383 | 152 | 0 | 0 | 3 | 155 |
| 3 | 936 | 68 | applied 383/383 | 157 | 0 | 0 | 6 | 163 |
| 4 | 678 | 70 | applied 383/383 | 139 | 0 | 0 | 2 | 141 |
| 5 | 567 | 47 | applied 383/383 | 145 | 0 | 0 | 7 | 152 |
| 6 | 869 | 70 | applied 383/383 | 149 | 0 | 0 | 1 | 150 |
| 7 | 484 | 73 | applied 383/383 | 106 | 0 | 0 | 49 | 155 |
| 8 | 665 | 66 | applied 383/383 | 105 | 0 | 0 | 44 | 149 |
| 9 | 869 | 69 | applied 383/383 | 143 | 0 | 0 | 12 | 155 |
| 10 | 1216 | 71 | applied 383/383 | 160 | 0 | 0 | 2 | 162 |
| 11 | 846 | 58 | applied 383/383 | 138 | 0 | 0 | 8 | 146 |
| 12 | not run | 53 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | 549 | 48 | applied 383/383 | 131 | 0 | 0 | 7 | 138 |
| 14 | 949 | 69 | applied 383/383 | 186 | 0 | 0 | 2 | 188 |
| 15 | 530 | 58 | applied 383/383 | 143 | 0 | 0 | 79 | 222 |
| 16 | 398 | 72 | applied 383/383 | 41 | 0 | 0 | 0 | 41 |
| repeat | 416 | 70 | applied 383/383 | 72 | 0 | 0 | 72 | 144 |
| TOTAL | — | — | — | 2326 | 0 | 0 | 367 | 2693 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1216 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 12 tests selected, 12 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 13, email 13, 1 13, 2 13, 3 13, 4 13, 5 9, 6 13, 7 14, 8 13, 9 13, 10 13, 11 11, 12 10, 13 9, 14 13, 15 11, 16 14, repeat 13
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41178779969-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41178779969-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41178779969-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41178779969-local-3
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41178779969-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41178779969-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41178779969-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41178779969-local-11
  - 12: not found
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-repeat
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

## Lane 12
- Step failure:
Step backend: outcome failure
  
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql...
Cause:
```text
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
TIME-WAIT  0      0               127.0.0.1:45060              127.0.0.1:31322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
07:03:34 | 231 | @effect/sql-pg | active | : | CREATE OR REPLACE FUNCTION public.admin_save_legal_draft(p_kind text, p_country character, p_label text, p_body_en text,
07:03:34 | 206 |  |  | Activity:AutovacuumMain | 
07:03:34 | 208 | pg_cron scheduler |  | Extension:Extension | 
07:03:34 | 209 |  |  | Activity:LogicalLauncherMain | 
07:03:34 | 202 |  |  | Activity:CheckpointerMain | 
07:03:34 | 203 |  |  | Activity:BgwriterMain | 
07:03:34 | 205 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
