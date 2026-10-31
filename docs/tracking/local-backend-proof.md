# Local backend proof (non-gating)

- Commit: `e1dc86f4157400dbbfc61d16eead7a97faac9786`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41193131306

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 882 | 50 | applied 383/383 | 205 | 0 | 0 | 69 | 274 |
| email | 191 | 58 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1021 | 72 | applied 383/383 | 163 | 0 | 0 | 6 | 169 |
| 2 | 991 | 71 | applied 383/383 | 142 | 0 | 0 | 1 | 143 |
| 3 | 879 | 72 | applied 383/383 | 137 | 0 | 0 | 26 | 163 |
| 4 | 700 | 62 | applied 383/383 | 149 | 0 | 0 | 2 | 151 |
| 5 | 854 | 72 | applied 383/383 | 164 | 0 | 0 | 7 | 171 |
| 6 | 703 | 50 | applied 383/383 | 139 | 0 | 1 | 1 | 141 |
| 7 | 461 | 72 | applied 383/383 | 114 | 0 | 0 | 42 | 156 |
| 8 | 668 | 72 | applied 383/383 | 104 | 0 | 0 | 50 | 154 |
| 9 | 778 | 57 | applied 383/383 | 145 | 0 | 0 | 13 | 158 |
| 10 | 1173 | 68 | applied 383/383 | 160 | 0 | 0 | 2 | 162 |
| 11 | 836 | 74 | applied 383/383 | 118 | 0 | 0 | 33 | 151 |
| 12 | 738 | 72 | applied 383/383 | 151 | 0 | 0 | 5 | 156 |
| 13 | 820 | 60 | applied 383/383 | 159 | 0 | 0 | 7 | 166 |
| 14 | 898 | 74 | applied 383/383 | 148 | 0 | 0 | 2 | 150 |
| 15 | 686 | 71 | applied 383/383 | 185 | 0 | 0 | 79 | 264 |
| 16 | 327 | 49 | applied 383/383 | 41 | 0 | 0 | 0 | 41 |
| repeat | 213 | 74 | applied 383/383 | 8 | 0 | 0 | 0 | 8 |
| TOTAL | — | — | — | 2438 | 0 | 1 | 345 | 2784 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1173 s
- Repeat lane (DEC-283): Not repeated: e2e/choice-lists.spec.ts (44 tests); Repeat: each 2 on both projects; 46 tests selected, 2 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 2 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 4, email 6, 1 9, 2 8, 3 8, 4 6, 5 8, 6 4, 7 9, 8 8, 9 6, 10 8, 11 9, 12 9, 13 6, 14 9, 15 8, 16 4, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41193131306-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41193131306-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41193131306-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41193131306-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41193131306-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41193131306-local-4
  - 5: [e2e:teardown] deleted 20 user(s) owned by process 41193131306-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41193131306-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41193131306-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41193131306-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41193131306-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41193131306-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41193131306-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41193131306-local-12
  - 13: [e2e:teardown] deleted 20 user(s) owned by process 41193131306-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41193131306-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41193131306-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41193131306-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41193131306-local-repeat
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

## Lane 6
- post-wizard-pricing.spec.ts / POSTING WIZARD / LY-6 at 360 the open currency list is above the sticky action bar / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
