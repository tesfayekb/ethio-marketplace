# Local backend proof (non-gating)

- Commit: `d2e9bb36513981269f1b82736746b26b874901e7`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41151685462

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 994 | 123 | applied 382/382 | 205 | 0 | 0 | 69 | 274 |
| email | 174 | 105 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 779 | 98 | applied 382/382 | 148 | 0 | 0 | 4 | 152 |
| 2 | not run | 84 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | 841 | 101 | applied 382/382 | 151 | 0 | 0 | 0 | 151 |
| 4 | 618 | 104 | applied 382/382 | 157 | 0 | 0 | 2 | 159 |
| 5 | 596 | 107 | applied 382/382 | 127 | 0 | 0 | 7 | 134 |
| 6 | 751 | 107 | applied 382/382 | 149 | 0 | 0 | 1 | 150 |
| 7 | 440 | 120 | applied 382/382 | 104 | 0 | 0 | 49 | 153 |
| 8 | 562 | 97 | applied 382/382 | 103 | 0 | 0 | 43 | 146 |
| 9 | 732 | 107 | applied 382/382 | 145 | 0 | 0 | 13 | 158 |
| 10 | 1140 | 116 | applied 382/382 | 160 | 0 | 0 | 2 | 162 |
| 11 | 873 | 117 | applied 382/382 | 132 | 0 | 0 | 2 | 134 |
| 12 | 628 | 87 | applied 382/382 | 155 | 0 | 0 | 4 | 159 |
| 13 | 688 | 118 | applied 382/382 | 131 | 0 | 0 | 7 | 138 |
| 14 | 928 | 101 | applied 382/382 | 186 | 0 | 0 | 2 | 188 |
| 15 | 581 | 120 | applied 382/382 | 143 | 0 | 0 | 77 | 220 |
| 16 | 363 | 117 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 842 | 94 | applied 382/382 | 106 | 0 | 0 | 14 | 120 |
| TOTAL | — | — | — | 2349 | 0 | 0 | 296 | 2645 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1140 s
- Repeat lane (DEC-283): Not repeated: e2e/sage-bands.spec.ts (36 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/shell.spec.ts (117 tests); Repeat: each 2 on both projects; 223 tests selected, 30 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 6 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 13, email 13, 1 11, 2 9, 3 11, 4 9, 5 13, 6 11, 7 13, 8 9, 9 10, 10 12, 11 12, 12 9, 13 13, 14 12, 15 13, 16 13, repeat 10
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41151685462-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41151685462-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41151685462-local-1
  - 2: not found
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41151685462-local-3
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41151685462-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41151685462-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41151685462-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41151685462-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41151685462-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41151685462-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41151685462-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41151685462-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41151685462-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41151685462-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41151685462-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41151685462-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41151685462-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41151685462-local-repeat
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

## Lane 2
- Step failure:
Step backend: outcome failure
  
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql...
Cause:
```text
Error response from daemon: toomanyrequests: Rate exceeded
Error response from daemon: toomanyrequests: Rate exceeded
ERROR: deadlock detected (SQLSTATE 40P01)
```
Statement:
```text
At statement: 48
DROP POLICY IF EXISTS categories_admin_insert ON public.categories
```
Last 20 lines:
```text
Applying migration 20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql...
Applying migration 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql...
Stopping containers...
ERROR: deadlock detected (SQLSTATE 40P01)
Process 230 waits for AccessExclusiveLock on relation 17667 of database 5; blocked by process 306.
Process 306 waits for ShareLock on transaction 1552; blocked by process 230.
At statement: 48
DROP POLICY IF EXISTS categories_admin_insert ON public.categories
Try rerunning the command with --debug to troubleshoot the error.
Port holders (31320-31329, DEC-284; 54320-54329, the retired block):
TIME-WAIT  0      0                127.0.0.1:51590              127.0.0.1:31322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:45:19 | 230 | @effect/sql-pg | active | : | -- Proofs — a scratch admin and scratch rows inside a block that always rolls back. DO $p$ DECLARE v_uid uuid := gen_ran
00:45:19 | 212 |  |  | Activity:AutovacuumMain | 
00:45:19 | 306 |  | active | Timeout:VacuumTruncate | autovacuum: VACUUM ANALYZE public.categories
00:45:19 | 214 | pg_cron scheduler |  | Extension:Extension | 
00:45:19 | 215 |  |  | Activity:LogicalLauncherMain | 
00:45:19 | 208 |  |  | Activity:CheckpointerMain | 
00:45:19 | 209 |  |  | Activity:BgwriterMain | 
00:45:19 | 211 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
