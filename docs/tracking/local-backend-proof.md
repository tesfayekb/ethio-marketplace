# Local backend proof (non-gating)

- Commit: `09e893285bce060f59f9ce2b37068ab492db79ab`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42164369112

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1603 | 73 | applied 409/409 | 206 | 0 | 0 | 70 | 276 |
| email | 208 | 73 | applied 409/409 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1066 | 72 | applied 409/409 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1118 | 53 | applied 409/409 | 190 | 0 | 0 | 1 | 191 |
| 3 | 787 | 75 | applied 409/409 | 134 | 0 | 0 | 24 | 158 |
| 4 | 765 | 51 | applied 409/409 | 177 | 0 | 0 | 2 | 179 |
| 5 | 1330 | 62 | applied 409/409 | 151 | 0 | 0 | 7 | 158 |
| 6 | 896 | 67 | applied 409/409 | 191 | 0 | 0 | 1 | 192 |
| 7 | 1009 | 52 | applied 409/409 | 91 | 0 | 0 | 68 | 159 |
| 8 | 690 | 62 | applied 409/409 | 115 | 0 | 0 | 51 | 166 |
| 9 | 865 | 48 | applied 409/409 | 166 | 0 | 0 | 13 | 179 |
| 10 | 1152 | 68 | applied 409/409 | 167 | 0 | 0 | 1 | 168 |
| 11 | 767 | 49 | applied 409/409 | 133 | 0 | 0 | 36 | 169 |
| 12 | 736 | 49 | applied 409/409 | 174 | 0 | 0 | 5 | 179 |
| 13 | 695 | 60 | applied 409/409 | 149 | 0 | 0 | 17 | 166 |
| 14 | 754 | 49 | applied 409/409 | 182 | 0 | 0 | 2 | 184 |
| 15 | 452 | 73 | applied 409/409 | 96 | 0 | 0 | 62 | 158 |
| 16 | 728 | 76 | applied 409/409 | 132 | 0 | 0 | 36 | 168 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2628 | 0 | 0 | 402 | 3030 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: smoke 1603 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 9, 1 9, 2 5, 3 9, 4 5, 5 7, 6 8, 7 5, 8 7, 9 4, 10 8, 11 4, 12 4, 13 6, 14 4, 15 9, 16 9, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42164369112-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42164369112-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42164369112-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42164369112-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42164369112-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42164369112-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42164369112-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42164369112-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42164369112-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42164369112-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42164369112-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42164369112-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42164369112-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42164369112-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42164369112-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42164369112-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42164369112-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42164369112-local-16
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
