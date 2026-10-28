# Local backend proof (non-gating)

- Commit: `3b7df2396e86640ebf81d63577ae1557186b7b68`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40781098009

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 882 | 100 | applied 346/346 | 196 | 0 | 0 | 62 | 258 |
| email | 181 | 118 | applied 346/346 | 6 | 0 | 0 | 0 | 6 |
| 1 | 648 | 110 | applied 346/346 | 131 | 0 | 0 | 4 | 135 |
| 2 | 976 | 104 | applied 346/346 | 142 | 0 | 0 | 3 | 145 |
| 3 | 852 | 117 | applied 346/346 | 123 | 0 | 0 | 0 | 123 |
| 4 | 545 | 97 | applied 346/346 | 148 | 0 | 0 | 2 | 150 |
| 5 | 568 | 113 | applied 346/346 | 119 | 0 | 0 | 6 | 125 |
| 6 | 628 | 94 | applied 346/346 | 131 | 0 | 0 | 1 | 132 |
| 7 | 549 | 110 | applied 346/346 | 131 | 0 | 0 | 0 | 131 |
| 8 | 671 | 118 | applied 346/346 | 110 | 0 | 0 | 30 | 140 |
| 9 | 700 | 110 | applied 346/346 | 133 | 0 | 0 | 2 | 135 |
| 10 | 810 | 100 | applied 346/346 | 130 | 0 | 0 | 2 | 132 |
| 11 | 902 | 109 | applied 346/346 | 123 | 0 | 0 | 1 | 124 |
| 12 | 706 | 125 | applied 346/346 | 140 | 0 | 0 | 5 | 145 |
| 13 | 609 | 116 | applied 346/346 | 120 | 0 | 0 | 5 | 125 |
| 14 | 807 | 117 | applied 346/346 | 129 | 0 | 0 | 3 | 132 |
| 15 | 577 | 107 | applied 346/346 | 130 | 0 | 0 | 1 | 131 |
| 16 | 584 | 116 | applied 346/346 | 99 | 0 | 0 | 32 | 131 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2241 | 0 | 0 | 159 | 2400 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 976 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 10, email 13, 1 10, 2 11, 3 12, 4 9, 5 13, 6 8, 7 12, 8 13, 9 10, 10 8, 11 10, 12 13, 13 12, 14 13, 15 13, 16 12, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40781098009-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40781098009-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40781098009-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40781098009-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40781098009-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40781098009-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40781098009-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40781098009-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40781098009-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40781098009-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40781098009-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40781098009-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40781098009-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40781098009-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40781098009-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40781098009-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40781098009-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40781098009-local-16
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
RLS on 80 of 80 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
