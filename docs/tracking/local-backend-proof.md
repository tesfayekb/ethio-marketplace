# Local backend proof (non-gating)

- Commit: `50eb7468b1f8da534556864a964cd220b4e50bb7`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41106419359

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 935 | 103 | applied 382/382 | 205 | 0 | 0 | 69 | 274 |
| email | 180 | 100 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 830 | 109 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 1140 | 105 | applied 382/382 | 159 | 0 | 0 | 3 | 162 |
| 3 | 642 | 100 | applied 382/382 | 122 | 0 | 0 | 0 | 122 |
| 4 | 634 | 105 | applied 382/382 | 146 | 0 | 0 | 2 | 148 |
| 5 | 745 | 106 | applied 382/382 | 143 | 0 | 0 | 7 | 150 |
| 6 | 788 | 108 | applied 382/382 | 137 | 0 | 0 | 1 | 138 |
| 7 | 797 | 119 | applied 382/382 | 191 | 0 | 0 | 40 | 231 |
| 8 | 363 | 121 | applied 382/382 | 20 | 0 | 0 | 17 | 37 |
| 9 | 777 | 110 | applied 382/382 | 134 | 0 | 0 | 6 | 140 |
| 10 | 964 | 98 | applied 382/382 | 143 | 0 | 0 | 2 | 145 |
| 11 | 860 | 108 | applied 382/382 | 130 | 0 | 0 | 1 | 131 |
| 12 | 601 | 96 | applied 382/382 | 143 | 0 | 0 | 5 | 148 |
| 13 | 726 | 103 | applied 382/382 | 145 | 0 | 0 | 5 | 150 |
| 14 | 619 | 100 | applied 382/382 | 134 | 0 | 0 | 4 | 138 |
| 15 | 615 | 101 | applied 382/382 | 185 | 0 | 0 | 37 | 222 |
| 16 | 372 | 124 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 280 | 103 | applied 382/382 | 48 | 0 | 0 | 48 | 96 |
| TOTAL | — | — | — | 2373 | 0 | 0 | 251 | 2624 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1140 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 8 tests selected, 8 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 11, email 12, 1 13, 2 13, 3 8, 4 11, 5 13, 6 13, 7 13, 8 13, 9 13, 10 9, 11 13, 12 11, 13 11, 14 9, 15 9, 16 12, repeat 13
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41106419359-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41106419359-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41106419359-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41106419359-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41106419359-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41106419359-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41106419359-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41106419359-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 41106419359-local-7
  - 8: [e2e:teardown] deleted 2 user(s) owned by process 41106419359-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41106419359-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41106419359-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41106419359-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41106419359-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41106419359-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41106419359-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41106419359-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41106419359-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41106419359-local-repeat
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
