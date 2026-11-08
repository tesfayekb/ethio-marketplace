# Local backend proof (non-gating)

- Commit: `9948040b623c28a2980816e3dbc559a82686fbd5`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42444923983

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 959 | 62 | applied 424/424 | 206 | 0 | 0 | 70 | 276 |
| email | 180 | 59 | applied 424/424 | 6 | 0 | 0 | 0 | 6 |
| 1 | 904 | 50 | applied 424/424 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1260 | 65 | applied 424/424 | 190 | 0 | 0 | 1 | 191 |
| 3 | 700 | 62 | applied 424/424 | 140 | 0 | 0 | 24 | 164 |
| 4 | 928 | 65 | applied 424/424 | 178 | 0 | 0 | 2 | 180 |
| 5 | 838 | 77 | applied 424/424 | 156 | 0 | 0 | 7 | 163 |
| 6 | 917 | 69 | applied 424/424 | 189 | 0 | 0 | 1 | 190 |
| 7 | 459 | 75 | applied 424/424 | 81 | 0 | 0 | 68 | 149 |
| 8 | 718 | 67 | applied 424/424 | 123 | 0 | 0 | 50 | 173 |
| 9 | 1014 | 62 | applied 424/424 | 168 | 0 | 0 | 14 | 182 |
| 10 | 1050 | 63 | applied 424/424 | 167 | 0 | 0 | 1 | 168 |
| 11 | 953 | 76 | applied 424/424 | 139 | 0 | 0 | 36 | 175 |
| 12 | 967 | 75 | applied 424/424 | 175 | 0 | 0 | 5 | 180 |
| 13 | 667 | 60 | applied 424/424 | 146 | 0 | 0 | 17 | 163 |
| 14 | 1008 | 75 | applied 424/424 | 188 | 0 | 0 | 2 | 190 |
| 15 | 465 | 75 | applied 424/424 | 96 | 0 | 0 | 62 | 158 |
| 16 | 643 | 59 | applied 424/424 | 132 | 0 | 0 | 36 | 168 |
| repeat | 636 | 74 | applied 424/424 | 148 | 0 | 0 | 4 | 152 |
| TOTAL | — | — | — | 2796 | 0 | 0 | 406 | 3202 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1260 s
- Repeat lane (DEC-283): Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Repeat: each 2 on both projects; 91 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 6, email 6, 1 4, 2 7, 3 7, 4 7, 5 9, 6 8, 7 9, 8 8, 9 7, 10 7, 11 9, 12 9, 13 6, 14 9, 15 9, 16 6, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42444923983-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42444923983-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42444923983-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42444923983-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42444923983-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42444923983-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42444923983-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42444923983-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42444923983-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42444923983-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42444923983-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42444923983-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42444923983-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42444923983-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42444923983-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42444923983-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42444923983-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42444923983-local-16
  - repeat: [e2e:teardown] deleted 6 user(s) owned by process 42444923983-local-repeat
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
