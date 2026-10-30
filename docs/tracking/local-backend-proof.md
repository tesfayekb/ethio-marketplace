# Local backend proof (non-gating)

- Commit: `60287c03dcf4fc90c5067ae75070eb5fd1f433cc`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41034540038

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 981 | 117 | applied 382/382 | 197 | 0 | 0 | 65 | 262 |
| email | 165 | 104 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 740 | 103 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 1000 | 107 | applied 382/382 | 133 | 0 | 0 | 3 | 136 |
| 3 | 899 | 121 | applied 382/382 | 148 | 0 | 0 | 0 | 148 |
| 4 | 622 | 102 | applied 382/382 | 129 | 0 | 0 | 2 | 131 |
| 5 | 779 | 107 | applied 382/382 | 160 | 0 | 0 | 7 | 167 |
| 6 | 717 | 102 | applied 382/382 | 137 | 0 | 0 | 1 | 138 |
| 7 | 358 | 91 | applied 382/382 | 105 | 0 | 0 | 0 | 105 |
| 8 | 596 | 102 | applied 382/382 | 101 | 0 | 0 | 39 | 140 |
| 9 | 648 | 89 | applied 382/382 | 134 | 0 | 0 | 11 | 145 |
| 10 | 1036 | 122 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 11 | 906 | 105 | applied 382/382 | 143 | 0 | 0 | 1 | 144 |
| 12 | 679 | 122 | applied 382/382 | 126 | 0 | 0 | 5 | 131 |
| 13 | 740 | 101 | applied 382/382 | 162 | 0 | 0 | 5 | 167 |
| 14 | 676 | 97 | applied 382/382 | 134 | 0 | 0 | 4 | 138 |
| 15 | 722 | 120 | applied 382/382 | 174 | 0 | 0 | 34 | 208 |
| 16 | 341 | 106 | applied 382/382 | 37 | 0 | 0 | 0 | 37 |
| repeat | 262 | 95 | applied 382/382 | 64 | 0 | 0 | 64 | 128 |
| TOTAL | — | — | — | 2361 | 0 | 0 | 247 | 2608 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1036 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 16 tests selected, 16 repeated; budget 720 s at 4.7 s a test; directly changed: 4 of 4 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 13, email 11, 1 11, 2 13, 3 13, 4 11, 5 13, 6 12, 7 10, 8 11, 9 9, 10 14, 11 10, 12 14, 13 10, 14 11, 15 13, 16 13, repeat 10
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41034540038-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41034540038-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41034540038-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41034540038-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41034540038-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41034540038-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41034540038-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41034540038-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41034540038-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41034540038-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41034540038-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 41034540038-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 41034540038-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41034540038-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41034540038-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41034540038-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41034540038-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41034540038-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41034540038-local-repeat
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
