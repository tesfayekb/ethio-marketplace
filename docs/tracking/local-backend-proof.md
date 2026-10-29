# Local backend proof (non-gating)

- Commit: `3199dd8d5c455292fa8b1eb8b52af7842894510b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40835510411

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 869 | 104 | applied 370/370 | 196 | 0 | 0 | 62 | 258 |
| email | 181 | 117 | applied 370/370 | 6 | 0 | 0 | 0 | 6 |
| 1 | 624 | 100 | applied 370/370 | 132 | 0 | 0 | 4 | 136 |
| 2 | 812 | 103 | applied 370/370 | 129 | 0 | 0 | 3 | 132 |
| 3 | 1013 | 121 | applied 370/370 | 136 | 0 | 0 | 0 | 136 |
| 4 | 630 | 126 | applied 370/370 | 148 | 0 | 0 | 2 | 150 |
| 5 | 451 | 99 | applied 370/370 | 119 | 0 | 0 | 6 | 125 |
| 6 | 817 | 120 | applied 370/370 | 131 | 0 | 0 | 1 | 132 |
| 7 | 609 | 119 | applied 370/370 | 131 | 0 | 0 | 0 | 131 |
| 8 | 516 | 116 | applied 370/370 | 101 | 0 | 0 | 30 | 131 |
| 9 | 805 | 110 | applied 370/370 | 145 | 0 | 0 | 2 | 147 |
| 10 | 978 | 120 | applied 370/370 | 130 | 0 | 0 | 2 | 132 |
| 11 | 974 | 117 | applied 370/370 | 123 | 0 | 0 | 1 | 124 |
| 12 | 648 | 117 | applied 370/370 | 140 | 0 | 0 | 5 | 145 |
| 13 | 597 | 105 | applied 370/370 | 120 | 0 | 0 | 5 | 125 |
| 14 | 814 | 120 | applied 370/370 | 129 | 0 | 0 | 3 | 132 |
| 15 | 598 | 119 | applied 370/370 | 130 | 0 | 0 | 1 | 131 |
| 16 | 529 | 102 | applied 370/370 | 101 | 0 | 0 | 32 | 133 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2247 | 0 | 0 | 159 | 2406 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 3 1013 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 13, 1 8, 2 9, 3 13, 4 12, 5 9, 6 13, 7 13, 8 11, 9 10, 10 13, 11 13, 12 11, 13 13, 14 13, 15 13, 16 10, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40835510411-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40835510411-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40835510411-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40835510411-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40835510411-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40835510411-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40835510411-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40835510411-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40835510411-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40835510411-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40835510411-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40835510411-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40835510411-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40835510411-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40835510411-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40835510411-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40835510411-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40835510411-local-16
  - repeat: not found
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
RLS on 84 of 84 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
