# Local backend proof (non-gating)

- Commit: `31d5fb6b131e43d4a5a3345f3a267021d1321bf1`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40827819679

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 904 | 109 | applied 367/367 | 196 | 0 | 0 | 62 | 258 |
| email | 146 | 95 | applied 367/367 | 6 | 0 | 0 | 0 | 6 |
| 1 | 603 | 99 | applied 367/367 | 132 | 0 | 0 | 4 | 136 |
| 2 | 880 | 101 | applied 367/367 | 129 | 0 | 0 | 3 | 132 |
| 3 | 834 | 96 | applied 367/367 | 136 | 0 | 0 | 0 | 136 |
| 4 | 649 | 106 | applied 367/367 | 148 | 0 | 0 | 2 | 150 |
| 5 | 593 | 116 | applied 367/367 | 119 | 0 | 0 | 6 | 125 |
| 6 | 686 | 113 | applied 367/367 | 131 | 0 | 0 | 1 | 132 |
| 7 | 564 | 117 | applied 367/367 | 131 | 0 | 0 | 0 | 131 |
| 8 | 491 | 100 | applied 367/367 | 101 | 0 | 0 | 30 | 131 |
| 9 | 789 | 111 | applied 367/367 | 145 | 0 | 0 | 2 | 147 |
| 10 | 893 | 112 | applied 367/367 | 130 | 0 | 0 | 2 | 132 |
| 11 | 1021 | 123 | applied 367/367 | 123 | 0 | 0 | 1 | 124 |
| 12 | 510 | 89 | applied 367/367 | 140 | 0 | 0 | 5 | 145 |
| 13 | 587 | 99 | applied 367/367 | 120 | 0 | 0 | 5 | 125 |
| 14 | 779 | 102 | applied 367/367 | 129 | 0 | 0 | 3 | 132 |
| 15 | 552 | 114 | applied 367/367 | 130 | 0 | 0 | 1 | 131 |
| 16 | 594 | 118 | applied 367/367 | 101 | 0 | 0 | 32 | 133 |
| repeat | 274 | 119 | applied 367/367 | 36 | 0 | 0 | 0 | 36 |
| TOTAL | — | — | — | 2283 | 0 | 0 | 159 | 2442 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 11 1021 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 3 tests selected, 3 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 2 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 10, email 8, 1 9, 2 11, 3 8, 4 13, 5 13, 6 11, 7 13, 8 10, 9 10, 10 11, 11 13, 12 9, 13 12, 14 13, 15 13, 16 13, repeat 13
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40827819679-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40827819679-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40827819679-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40827819679-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40827819679-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40827819679-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40827819679-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40827819679-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40827819679-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40827819679-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40827819679-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40827819679-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40827819679-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40827819679-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40827819679-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40827819679-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40827819679-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40827819679-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 40827819679-local-repeat
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
RLS on 80 of 80 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
