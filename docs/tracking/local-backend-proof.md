# Local backend proof (non-gating)

- Commit: `8a2d33a8656e4ac40e591c3de0e1fb1ac80e1d3a`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41313437026

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 899 | 58 | applied 383/383 | 205 | 0 | 0 | 69 | 274 |
| email | 208 | 69 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1024 | 74 | applied 383/383 | 163 | 0 | 0 | 6 | 169 |
| 2 | 1063 | 61 | applied 383/383 | 170 | 0 | 0 | 1 | 171 |
| 3 | 782 | 74 | applied 383/383 | 133 | 0 | 0 | 24 | 157 |
| 4 | 834 | 74 | applied 383/383 | 158 | 0 | 0 | 2 | 160 |
| 5 | 627 | 50 | applied 383/383 | 154 | 0 | 0 | 7 | 161 |
| 6 | 877 | 63 | applied 383/383 | 183 | 0 | 0 | 1 | 184 |
| 7 | 337 | 58 | applied 383/383 | 84 | 0 | 0 | 63 | 147 |
| 8 | 585 | 49 | applied 383/383 | 106 | 0 | 0 | 51 | 157 |
| 9 | 920 | 71 | applied 383/383 | 150 | 0 | 0 | 12 | 162 |
| 10 | 1097 | 60 | applied 383/383 | 164 | 0 | 0 | 2 | 166 |
| 11 | 877 | 72 | applied 383/383 | 127 | 0 | 0 | 35 | 162 |
| 12 | 792 | 62 | applied 383/383 | 155 | 0 | 0 | 5 | 160 |
| 13 | 969 | 71 | applied 383/383 | 173 | 0 | 0 | 7 | 180 |
| 14 | 805 | 71 | applied 383/383 | 163 | 0 | 0 | 2 | 165 |
| 15 | 346 | 58 | applied 383/383 | 87 | 0 | 0 | 59 | 146 |
| 16 | 615 | 58 | applied 383/383 | 123 | 0 | 0 | 36 | 159 |
| repeat | 411 | 73 | applied 383/383 | 60 | 0 | 0 | 60 | 120 |
| TOTAL | — | — | — | 2564 | 0 | 0 | 442 | 3006 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1097 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 20 tests selected, 20 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 5, email 8, 1 9, 2 6, 3 9, 4 9, 5 4, 6 7, 7 5, 8 4, 9 8, 10 6, 11 8, 12 6, 13 8, 14 8, 15 6, 16 6, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41313437026-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41313437026-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41313437026-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 41313437026-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 41313437026-local-3
  - 4: [e2e:teardown] deleted 34 user(s) owned by process 41313437026-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41313437026-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41313437026-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41313437026-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41313437026-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41313437026-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41313437026-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41313437026-local-11
  - 12: [e2e:teardown] deleted 34 user(s) owned by process 41313437026-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41313437026-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41313437026-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41313437026-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41313437026-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41313437026-local-repeat
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
