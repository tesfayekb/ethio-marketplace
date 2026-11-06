# Local backend proof (non-gating)

- Commit: `596345a4c4ed52ed31589d8ac0872bc0de15b8f3`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42162789510

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1015 | 71 | applied 409/409 | 206 | 0 | 0 | 70 | 276 |
| email | 168 | 51 | applied 409/409 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1089 | 76 | applied 409/409 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1551 | 49 | applied 409/409 | 190 | 0 | 0 | 1 | 191 |
| 3 | 770 | 72 | applied 409/409 | 134 | 0 | 0 | 24 | 158 |
| 4 | 907 | 64 | applied 409/409 | 177 | 0 | 0 | 2 | 179 |
| 5 | 1190 | 58 | applied 409/409 | 151 | 0 | 0 | 7 | 158 |
| 6 | 997 | 75 | applied 409/409 | 191 | 0 | 0 | 1 | 192 |
| 7 | 937 | 64 | applied 409/409 | 91 | 0 | 0 | 68 | 159 |
| 8 | 707 | 73 | applied 409/409 | 115 | 0 | 0 | 51 | 166 |
| 9 | 982 | 60 | applied 409/409 | 166 | 0 | 0 | 13 | 179 |
| 10 | 965 | 50 | applied 409/409 | 167 | 0 | 0 | 1 | 168 |
| 11 | 901 | 72 | applied 409/409 | 133 | 0 | 0 | 36 | 169 |
| 12 | 824 | 57 | applied 409/409 | 174 | 0 | 0 | 5 | 179 |
| 13 | 755 | 71 | applied 409/409 | 149 | 0 | 0 | 17 | 166 |
| 14 | 904 | 64 | applied 409/409 | 182 | 0 | 0 | 2 | 184 |
| 15 | 440 | 68 | applied 409/409 | 96 | 0 | 0 | 62 | 158 |
| 16 | 701 | 73 | applied 409/409 | 132 | 0 | 0 | 36 | 168 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2628 | 0 | 0 | 402 | 3030 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1551 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 8, email 5, 1 9, 2 4, 3 8, 4 7, 5 6, 6 9, 7 7, 8 9, 9 6, 10 4, 11 9, 12 6, 13 9, 14 7, 15 8, 16 9, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42162789510-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42162789510-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42162789510-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42162789510-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42162789510-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42162789510-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42162789510-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42162789510-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42162789510-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42162789510-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42162789510-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42162789510-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42162789510-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42162789510-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42162789510-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42162789510-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42162789510-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42162789510-local-16
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
RLS on 90 of 90 public tables
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
