# Local backend proof (non-gating)

- Commit: `e1045fb435f97e39f5e983e04b674eb07380b5d5`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40615073357

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 968 | 116 | applied 345/345 | 196 | 0 | 0 | 62 | 258 |
| email | 160 | 102 | applied 345/345 | 6 | 0 | 0 | 0 | 6 |
| 1 | 593 | 97 | applied 345/345 | 130 | 0 | 0 | 4 | 134 |
| 2 | 925 | 98 | applied 345/345 | 142 | 0 | 0 | 3 | 145 |
| 3 | 883 | 116 | applied 345/345 | 123 | 0 | 0 | 0 | 123 |
| 4 | 633 | 114 | applied 345/345 | 148 | 0 | 0 | 2 | 150 |
| 5 | 477 | 101 | applied 345/345 | 119 | 0 | 0 | 6 | 125 |
| 6 | 811 | 117 | applied 345/345 | 131 | 0 | 0 | 1 | 132 |
| 7 | 520 | 101 | applied 345/345 | 131 | 0 | 0 | 0 | 131 |
| 8 | 649 | 115 | applied 345/345 | 110 | 0 | 0 | 30 | 140 |
| 9 | 752 | 115 | applied 345/345 | 132 | 0 | 0 | 2 | 134 |
| 10 | 958 | 115 | applied 345/345 | 130 | 0 | 0 | 2 | 132 |
| 11 | 1009 | 117 | applied 345/345 | 123 | 0 | 0 | 1 | 124 |
| 12 | 645 | 116 | applied 345/345 | 140 | 0 | 0 | 5 | 145 |
| 13 | 660 | 119 | applied 345/345 | 119 | 1 | 0 | 5 | 125 |
| 14 | 695 | 100 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 15 | 536 | 121 | applied 345/345 | 130 | 0 | 0 | 1 | 131 |
| 16 | 580 | 116 | applied 345/345 | 99 | 0 | 0 | 32 | 131 |
| TOTAL | — | — | — | 2238 | 1 | 0 | 159 | 2398 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 11 1009 s
- Database session samples during each start (INC-944): smoke 13, email 10, 1 9, 2 9, 3 13, 4 12, 5 9, 6 13, 7 12, 8 12, 9 12, 10 12, 11 13, 12 12, 13 13, 14 10, 15 11, 16 12
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40615073357-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40615073357-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40615073357-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40615073357-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40615073357-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40615073357-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40615073357-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40615073357-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40615073357-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40615073357-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40615073357-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40615073357-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40615073357-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40615073357-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40615073357-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40615073357-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40615073357-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40615073357-local-16
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

## Lane 13
- on-demand-failure.spec.ts / ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911) / ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads / desktop-1280 — Error: apiResponse.text: Response has been disposed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
