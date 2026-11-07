# Local backend proof (non-gating)

- Commit: `2cfb2e998136bb6caa0db43ac8c7180e72ecd144`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42350853426

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1047 | 75 | applied 416/416 | 206 | 0 | 0 | 70 | 276 |
| email | 201 | 63 | applied 416/416 | 6 | 0 | 0 | 0 | 6 |
| 1 | 974 | 60 | applied 416/416 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1158 | 60 | applied 416/416 | 190 | 0 | 0 | 1 | 191 |
| 3 | 697 | 60 | applied 416/416 | 140 | 0 | 0 | 24 | 164 |
| 4 | 887 | 62 | applied 416/416 | 178 | 0 | 0 | 2 | 180 |
| 5 | 653 | 53 | applied 416/416 | 155 | 0 | 0 | 7 | 162 |
| 6 | 956 | 75 | applied 416/416 | 189 | 0 | 0 | 1 | 190 |
| 7 | 464 | 67 | applied 416/416 | 82 | 0 | 0 | 68 | 150 |
| 8 | 659 | 60 | applied 416/416 | 124 | 0 | 0 | 51 | 175 |
| 9 | 1073 | 75 | applied 416/416 | 166 | 0 | 0 | 13 | 179 |
| 10 | 960 | 49 | applied 416/416 | 167 | 0 | 0 | 1 | 168 |
| 11 | 763 | 52 | applied 416/416 | 139 | 0 | 0 | 36 | 175 |
| 12 | 805 | 54 | applied 416/416 | 175 | 0 | 0 | 5 | 180 |
| 13 | 640 | 53 | applied 416/416 | 145 | 0 | 0 | 17 | 162 |
| 14 | 868 | 61 | applied 416/416 | 188 | 0 | 0 | 2 | 190 |
| 15 | 365 | 55 | applied 416/416 | 96 | 0 | 0 | 62 | 158 |
| 16 | 665 | 61 | applied 416/416 | 132 | 0 | 0 | 36 | 168 |
| repeat | 755 | 61 | applied 416/416 | 144 | 0 | 0 | 0 | 144 |
| TOTAL | — | — | — | 2790 | 0 | 0 | 402 | 3192 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1158 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 12 tests selected, 12 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 2 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 7, 1 6, 2 6, 3 6, 4 6, 5 5, 6 9, 7 7, 8 6, 9 9, 10 4, 11 5, 12 5, 13 5, 14 6, 15 5, 16 6, repeat 6
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42350853426-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42350853426-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42350853426-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42350853426-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42350853426-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42350853426-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42350853426-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42350853426-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42350853426-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42350853426-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42350853426-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42350853426-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42350853426-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42350853426-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42350853426-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42350853426-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42350853426-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42350853426-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 42350853426-local-repeat
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
RLS on 91 of 91 public tables
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
