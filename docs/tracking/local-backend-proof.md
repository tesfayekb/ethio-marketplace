# Local backend proof (non-gating)

- Commit: `896657171fcfe9d785aa30dff224bb447e6c2a05`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42950754366

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 950 | 61 | applied 437/437 | 206 | 0 | 0 | 70 | 276 |
| email | 159 | 50 | applied 437/437 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1000 | 62 | applied 437/437 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1285 | 74 | applied 437/437 | 190 | 0 | 0 | 1 | 191 |
| 3 | 637 | 52 | applied 437/437 | 140 | 0 | 0 | 24 | 164 |
| 4 | 795 | 53 | applied 437/437 | 179 | 0 | 0 | 2 | 181 |
| 5 | 744 | 60 | applied 437/437 | 157 | 0 | 0 | 7 | 164 |
| 6 | 966 | 75 | applied 437/437 | 190 | 0 | 0 | 1 | 191 |
| 7 | 413 | 61 | applied 437/437 | 91 | 0 | 0 | 68 | 159 |
| 8 | 651 | 61 | applied 437/437 | 115 | 0 | 0 | 51 | 166 |
| 9 | 992 | 64 | applied 437/437 | 166 | 0 | 0 | 13 | 179 |
| 10 | 1042 | 60 | applied 437/437 | 167 | 0 | 0 | 1 | 168 |
| 11 | 731 | 49 | applied 437/437 | 139 | 0 | 0 | 36 | 175 |
| 12 | 912 | 61 | applied 437/437 | 176 | 0 | 0 | 5 | 181 |
| 13 | 787 | 77 | applied 437/437 | 147 | 0 | 0 | 17 | 164 |
| 14 | 1005 | 71 | applied 437/437 | 189 | 0 | 0 | 2 | 191 |
| 15 | 330 | 50 | applied 437/437 | 96 | 0 | 0 | 62 | 158 |
| 16 | 592 | 51 | applied 437/437 | 132 | 0 | 0 | 36 | 168 |
| repeat | 400 | 52 | applied 437/437 | 72 | 0 | 0 | 0 | 72 |
| TOTAL | — | — | — | 2726 | 0 | 0 | 402 | 3128 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1285 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 6 tests selected, 6 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 6, email 5, 1 7, 2 9, 3 5, 4 5, 5 6, 6 9, 7 7, 8 6, 9 7, 10 6, 11 4, 12 7, 13 9, 14 8, 15 5, 16 5, repeat 5
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42950754366-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42950754366-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42950754366-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42950754366-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42950754366-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42950754366-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42950754366-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42950754366-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42950754366-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42950754366-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42950754366-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42950754366-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42950754366-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42950754366-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42950754366-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42950754366-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42950754366-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42950754366-local-16
  - repeat: [e2e:teardown] deleted 14 user(s) owned by process 42950754366-local-repeat
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
