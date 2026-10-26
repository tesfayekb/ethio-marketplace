# Local backend proof (non-gating)

- Commit: `1346a1be506179209286a168c323ea26ae8fc1b6`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40382950832

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 968 | 119 | applied 345/345 | 194 | 0 | 0 | 62 | 256 |
| email | 172 | 103 | applied 345/345 | 6 | 0 | 0 | 0 | 6 |
| 1 | 654 | 98 | applied 345/345 | 129 | 0 | 0 | 4 | 133 |
| 2 | 1750 | 114 | applied 345/345 | 142 | 0 | 0 | 3 | 145 |
| 3 | 1232 | 119 | applied 345/345 | 122 | 0 | 0 | 0 | 122 |
| 4 | 644 | 101 | applied 345/345 | 148 | 0 | 0 | 2 | 150 |
| 5 | 1217 | 107 | applied 345/345 | 119 | 0 | 0 | 6 | 125 |
| 6 | 904 | 126 | applied 345/345 | 131 | 0 | 0 | 1 | 132 |
| 7 | 477 | 99 | applied 345/345 | 131 | 0 | 0 | 0 | 131 |
| 8 | 828 | 107 | applied 345/345 | 98 | 0 | 0 | 30 | 128 |
| 9 | 760 | 88 | applied 345/345 | 142 | 0 | 0 | 2 | 144 |
| 10 | 952 | 118 | applied 345/345 | 130 | 0 | 0 | 2 | 132 |
| 11 | 953 | 115 | applied 345/345 | 122 | 0 | 0 | 1 | 123 |
| 12 | 607 | 109 | applied 345/345 | 140 | 0 | 0 | 5 | 145 |
| 13 | 553 | 104 | applied 345/345 | 120 | 0 | 0 | 5 | 125 |
| 14 | 797 | 111 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 15 | 568 | 104 | applied 345/345 | 130 | 0 | 0 | 1 | 131 |
| 16 | 575 | 106 | applied 345/345 | 98 | 0 | 0 | 32 | 130 |
| TOTAL | — | — | — | 2231 | 0 | 0 | 159 | 2390 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 2 1750 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40382950832-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40382950832-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40382950832-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40382950832-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40382950832-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40382950832-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40382950832-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40382950832-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40382950832-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40382950832-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40382950832-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40382950832-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40382950832-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40382950832-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40382950832-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40382950832-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40382950832-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40382950832-local-16
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
