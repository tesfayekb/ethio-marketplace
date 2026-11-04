# Local backend proof (non-gating)

- Commit: `484b6bb3ffb8d81cdf45905b3de202ddb2ea53f6`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41777385628

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 885 | 48 | applied 392/392 | 206 | 0 | 0 | 70 | 276 |
| email | 220 | 75 | applied 392/392 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1016 | 66 | applied 392/392 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1122 | 69 | applied 392/392 | 167 | 0 | 0 | 1 | 168 |
| 3 | 934 | 74 | applied 392/392 | 145 | 0 | 0 | 24 | 169 |
| 4 | 840 | 72 | applied 392/392 | 169 | 0 | 0 | 2 | 171 |
| 5 | 855 | 67 | applied 392/392 | 164 | 0 | 0 | 7 | 171 |
| 6 | 927 | 71 | applied 392/392 | 183 | 0 | 0 | 1 | 184 |
| 7 | 431 | 61 | applied 392/392 | 91 | 0 | 0 | 68 | 159 |
| 8 | 702 | 72 | applied 392/392 | 115 | 0 | 0 | 51 | 166 |
| 9 | 1069 | 71 | applied 392/392 | 166 | 0 | 0 | 13 | 179 |
| 10 | 987 | 50 | applied 392/392 | 161 | 0 | 0 | 1 | 162 |
| 11 | 954 | 75 | applied 392/392 | 138 | 0 | 0 | 36 | 174 |
| 12 | 979 | 73 | applied 392/392 | 173 | 0 | 0 | 5 | 178 |
| 13 | 711 | 60 | applied 392/392 | 155 | 0 | 0 | 17 | 172 |
| 14 | 814 | 71 | applied 392/392 | 163 | 0 | 0 | 2 | 165 |
| 15 | 466 | 72 | applied 392/392 | 96 | 0 | 0 | 62 | 158 |
| 16 | 592 | 50 | applied 392/392 | 132 | 0 | 0 | 36 | 168 |
| repeat | 605 | 76 | applied 392/392 | 108 | 0 | 0 | 0 | 108 |
| TOTAL | — | — | — | 2706 | 0 | 0 | 402 | 3108 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1122 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 9 tests selected, 9 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 4, email 9, 1 7, 2 8, 3 9, 4 8, 5 8, 6 8, 7 6, 8 9, 9 8, 10 4, 11 9, 12 9, 13 5, 14 8, 15 9, 16 4, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41777385628-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41777385628-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41777385628-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41777385628-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41777385628-local-3
  - 4: [e2e:teardown] deleted 34 user(s) owned by process 41777385628-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41777385628-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41777385628-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41777385628-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41777385628-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41777385628-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41777385628-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41777385628-local-11
  - 12: [e2e:teardown] deleted 34 user(s) owned by process 41777385628-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41777385628-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41777385628-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41777385628-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41777385628-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41777385628-local-repeat
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
