# Local backend proof (non-gating)

- Commit: `71107be62b0340efa3d7a7b924c1886fe0ec2d6c`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41662230025

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1045 | 74 | applied 392/392 | 206 | 0 | 0 | 70 | 276 |
| email | 206 | 73 | applied 392/392 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1056 | 77 | applied 392/392 | 163 | 0 | 0 | 6 | 169 |
| 2 | 1097 | 51 | applied 392/392 | 186 | 0 | 0 | 1 | 187 |
| 3 | 802 | 74 | applied 392/392 | 134 | 0 | 0 | 24 | 158 |
| 4 | 852 | 72 | applied 392/392 | 158 | 0 | 0 | 2 | 160 |
| 5 | 981 | 75 | applied 392/392 | 160 | 0 | 0 | 7 | 167 |
| 6 | 971 | 73 | applied 392/392 | 187 | 0 | 0 | 1 | 188 |
| 7 | 352 | 50 | applied 392/392 | 81 | 0 | 0 | 68 | 149 |
| 8 | 668 | 62 | applied 392/392 | 116 | 0 | 0 | 51 | 167 |
| 9 | 1082 | 73 | applied 392/392 | 166 | 0 | 0 | 13 | 179 |
| 10 | 1135 | 74 | applied 392/392 | 158 | 0 | 0 | 1 | 159 |
| 11 | 903 | 73 | applied 392/392 | 133 | 0 | 0 | 36 | 169 |
| 12 | 944 | 65 | applied 392/392 | 173 | 0 | 0 | 5 | 178 |
| 13 | 684 | 62 | applied 392/392 | 136 | 0 | 0 | 17 | 153 |
| 14 | 729 | 47 | applied 392/392 | 182 | 0 | 0 | 2 | 184 |
| 15 | 446 | 72 | applied 392/392 | 89 | 0 | 0 | 61 | 150 |
| 16 | 586 | 49 | applied 392/392 | 130 | 0 | 0 | 37 | 167 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2564 | 0 | 0 | 402 | 2966 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1135 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 9, 1 9, 2 4, 3 9, 4 9, 5 9, 6 9, 7 4, 8 6, 9 9, 10 9, 11 9, 12 7, 13 7, 14 4, 15 9, 16 4, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41662230025-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41662230025-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41662230025-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 41662230025-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 41662230025-local-3
  - 4: [e2e:teardown] deleted 34 user(s) owned by process 41662230025-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41662230025-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41662230025-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41662230025-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41662230025-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41662230025-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41662230025-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41662230025-local-11
  - 12: [e2e:teardown] deleted 34 user(s) owned by process 41662230025-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41662230025-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41662230025-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41662230025-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41662230025-local-16
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
RLS on 89 of 89 public tables
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
