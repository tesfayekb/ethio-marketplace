# Local backend proof (non-gating)

- Commit: `53aaccf3d16fb34accb93767c20001057bd5e7d1`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41199774824

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 933 | 58 | applied 383/383 | 205 | 0 | 0 | 69 | 274 |
| email | 205 | 72 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | not run | 58 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | 1000 | 72 | applied 383/383 | 148 | 0 | 0 | 1 | 149 |
| 3 | 712 | 50 | applied 383/383 | 137 | 0 | 0 | 24 | 161 |
| 4 | 645 | 49 | applied 383/383 | 149 | 0 | 0 | 2 | 151 |
| 5 | 874 | 73 | applied 383/383 | 164 | 0 | 0 | 7 | 171 |
| 6 | 861 | 72 | applied 383/383 | 140 | 0 | 0 | 1 | 141 |
| 7 | 460 | 72 | applied 383/383 | 115 | 0 | 0 | 49 | 164 |
| 8 | 669 | 71 | applied 383/383 | 105 | 0 | 0 | 50 | 155 |
| 9 | 928 | 72 | applied 383/383 | 150 | 0 | 0 | 6 | 156 |
| 10 | 1037 | 59 | applied 383/383 | 153 | 0 | 0 | 2 | 155 |
| 11 | 847 | 71 | applied 383/383 | 120 | 0 | 0 | 35 | 155 |
| 12 | 740 | 73 | applied 383/383 | 151 | 0 | 0 | 5 | 156 |
| 13 | 702 | 49 | applied 383/383 | 159 | 0 | 0 | 7 | 166 |
| 14 | 877 | 61 | applied 383/383 | 148 | 0 | 0 | 2 | 150 |
| 15 | 681 | 71 | applied 383/383 | 185 | 0 | 0 | 79 | 264 |
| 16 | 339 | 53 | applied 383/383 | 41 | 0 | 0 | 0 | 41 |
| repeat | 642 | 74 | applied 383/383 | 108 | 0 | 0 | 4 | 112 |
| TOTAL | — | — | — | 2384 | 0 | 0 | 343 | 2727 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1037 s
- Repeat lane (DEC-283): Not repeated: e2e/choice-lists.spec.ts (48 tests); Repeat: each 2 on both projects; 76 tests selected, 28 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 3 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 6, email 9, 1 6, 2 8, 3 4, 4 4, 5 9, 6 8, 7 8, 8 8, 9 8, 10 6, 11 8, 12 9, 13 4, 14 6, 15 8, 16 5, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41199774824-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41199774824-local-email
  - 1: not found
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41199774824-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41199774824-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41199774824-local-4
  - 5: [e2e:teardown] deleted 20 user(s) owned by process 41199774824-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41199774824-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41199774824-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41199774824-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41199774824-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41199774824-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41199774824-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41199774824-local-12
  - 13: [e2e:teardown] deleted 20 user(s) owned by process 41199774824-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41199774824-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41199774824-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41199774824-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41199774824-local-repeat
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
pg_cron: available 1.6.4; cron.launch_active_jobs settings: 1
Restored (cron.launch_active_jobs, autovacuum, scheduler sessions): on on 1
Start proofs (DEC-313): PostgREST serves job_runs; the sign-up hook answered 200

## Lane 1
- Step failure:
start failed in 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
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
      RAISE EXCEPTION 'AC-1 %', v_fn; END IF;
  END LOOP;

  RAISE EXCEPTION 'M3 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M3 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u1) OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u1)
    OR EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (v_run, v_old))
    OR EXISTS (SELECT 1 FROM public.job_leases WHERE holder IN (v_h1, v_h2)) THEN
   RAISE EXCEPTION 'M3 rollback failed'; END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:13:12 | 274 | @effect/sql-pg | client backend | active | : | SELECT public.name_folds_rebuild()
12:13:12 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:13:12 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:13:12 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:13:12 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:13:12 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
