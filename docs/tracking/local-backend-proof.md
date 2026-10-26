# Local backend proof (non-gating)

- Commit: `ba37841d81e43ec78123c49eb27f6fcd1f849e05`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40260842584

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1266 | 94 | applied 345/345 | 188 | 0 | 0 | 60 | 248 |
| email | 392 | 117 | applied 345/345 | 6 | 0 | 0 | 0 | 6 |
| 1 | 669 | 110 | applied 345/345 | 129 | 0 | 0 | 4 | 133 |
| 2 | 959 | 120 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 3 | 851 | 103 | applied 345/345 | 132 | 1 | 0 | 0 | 133 |
| 4 | 915 | 115 | applied 345/345 | 148 | 0 | 0 | 2 | 150 |
| 5 | 566 | 105 | applied 345/345 | 118 | 0 | 0 | 6 | 124 |
| 6 | 664 | 96 | applied 345/345 | 130 | 0 | 1 | 1 | 132 |
| 7 | 799 | 104 | applied 345/345 | 131 | 0 | 0 | 0 | 131 |
| 8 | 606 | 116 | applied 345/345 | 97 | 0 | 0 | 30 | 127 |
| 9 | 762 | 117 | applied 345/345 | 131 | 0 | 0 | 2 | 133 |
| 10 | 782 | 97 | applied 345/345 | 130 | 0 | 0 | 2 | 132 |
| 11 | 941 | 117 | applied 345/345 | 120 | 0 | 0 | 1 | 121 |
| 12 | 774 | 119 | applied 345/345 | 140 | 0 | 0 | 5 | 145 |
| 13 | 594 | 115 | applied 345/345 | 119 | 0 | 0 | 5 | 124 |
| 14 | 621 | 95 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 15 | 478 | 96 | applied 345/345 | 130 | 0 | 0 | 1 | 131 |
| 16 | 562 | 116 | applied 345/345 | 93 | 0 | 0 | 30 | 123 |
| TOTAL | — | — | — | 2200 | 1 | 1 | 155 | 2357 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: smoke 1266 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40260842584-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40260842584-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40260842584-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40260842584-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40260842584-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40260842584-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40260842584-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40260842584-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40260842584-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40260842584-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40260842584-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40260842584-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40260842584-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-16
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

## Lane 3
- admin-translations-governance.spec.ts / U4g bulk approval, order and orphans / TR-31 a scratch language deletes with a typed confirm and leaves no rows / mobile-360 — Error: TR-31: the delete confirmation is not red

## Lane 6
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-94 a listing card prints its price period / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
