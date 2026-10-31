# Local backend proof (non-gating)

- Commit: `e195034e836da0d7cf1ecd57c7f45d171a4cb280`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41151913976

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 979 | 105 | applied 382/382 | 205 | 0 | 0 | 69 | 274 |
| email | 186 | 116 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 881 | 118 | applied 382/382 | 148 | 0 | 0 | 4 | 152 |
| 2 | 1122 | 121 | applied 382/382 | 152 | 0 | 0 | 3 | 155 |
| 3 | not run | 98 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | 566 | 104 | applied 382/382 | 157 | 0 | 0 | 2 | 159 |
| 5 | 582 | 93 | applied 382/382 | 127 | 0 | 0 | 7 | 134 |
| 6 | 840 | 118 | applied 382/382 | 149 | 0 | 0 | 1 | 150 |
| 7 | 335 | 102 | applied 382/382 | 104 | 0 | 0 | 49 | 153 |
| 8 | 654 | 109 | applied 382/382 | 103 | 0 | 0 | 43 | 146 |
| 9 | 851 | 118 | applied 382/382 | 145 | 0 | 0 | 13 | 158 |
| 10 | 1169 | 105 | applied 382/382 | 160 | 0 | 0 | 2 | 162 |
| 11 | 888 | 119 | applied 382/382 | 132 | 0 | 0 | 2 | 134 |
| 12 | 705 | 103 | applied 382/382 | 155 | 0 | 0 | 4 | 159 |
| 13 | 675 | 106 | applied 382/382 | 131 | 0 | 0 | 7 | 138 |
| 14 | 964 | 110 | applied 382/382 | 186 | 0 | 0 | 2 | 188 |
| 15 | 551 | 113 | applied 382/382 | 143 | 0 | 0 | 77 | 220 |
| 16 | 346 | 108 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 859 | 116 | applied 382/382 | 106 | 0 | 0 | 14 | 120 |
| TOTAL | — | — | — | 2350 | 0 | 0 | 299 | 2649 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1169 s
- Repeat lane (DEC-283): Not repeated: e2e/sage-bands.spec.ts (36 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/shell.spec.ts (117 tests); Repeat: each 2 on both projects; 223 tests selected, 30 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 6 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 13, email 11, 1 13, 2 13, 3 10, 4 9, 5 12, 6 13, 7 10, 8 14, 9 13, 10 13, 11 13, 12 11, 13 12, 14 13, 15 12, 16 11, repeat 10
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41151913976-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41151913976-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41151913976-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41151913976-local-2
  - 3: not found
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41151913976-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41151913976-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41151913976-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41151913976-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41151913976-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41151913976-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41151913976-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41151913976-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41151913976-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41151913976-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41151913976-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41151913976-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41151913976-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41151913976-local-repeat
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
TIME-WAIT  0      0                127.0.0.1:54410               127.0.0.1:31322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:05:29 | 230 | @effect/sql-pg | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
01:05:29 | 212 |  |  | Activity:AutovacuumMain | 
01:05:29 | 214 | pg_cron scheduler |  | Extension:Extension | 
01:05:29 | 215 |  |  | Activity:LogicalLauncherMain | 
01:05:29 | 208 |  |  | Activity:CheckpointerMain | 
01:05:29 | 209 |  |  | Activity:BgwriterMain | 
01:05:29 | 211 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
