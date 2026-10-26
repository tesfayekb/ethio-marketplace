# Local backend proof (non-gating)

- Commit: `9a3f8713faa0a0e619b96feb08448ae67764c2bb`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40318186480

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1580 | 119 | applied 345/345 | 188 | 0 | 0 | 60 | 248 |
| email | 171 | 108 | applied 345/345 | 6 | 0 | 0 | 0 | 6 |
| 1 | 581 | 90 | applied 345/345 | 129 | 0 | 0 | 4 | 133 |
| 2 | 951 | 115 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 3 | 957 | 115 | applied 345/345 | 133 | 0 | 0 | 0 | 133 |
| 4 | 642 | 114 | applied 345/345 | 148 | 0 | 0 | 2 | 150 |
| 5 | 554 | 106 | applied 345/345 | 118 | 0 | 0 | 6 | 124 |
| 6 | 728 | 118 | applied 345/345 | 131 | 0 | 0 | 1 | 132 |
| 7 | 498 | 101 | applied 345/345 | 131 | 0 | 0 | 0 | 131 |
| 8 | 589 | 100 | applied 345/345 | 101 | 1 | 0 | 30 | 132 |
| 9 | 755 | 118 | applied 345/345 | 131 | 0 | 0 | 2 | 133 |
| 10 | 1006 | 110 | applied 345/345 | 130 | 0 | 0 | 2 | 132 |
| 11 | 1602 | 101 | applied 345/345 | 120 | 0 | 0 | 1 | 121 |
| 12 | 657 | 104 | applied 345/345 | 140 | 0 | 0 | 5 | 145 |
| 13 | 1482 | 111 | applied 345/345 | 119 | 0 | 0 | 5 | 124 |
| 14 | 786 | 115 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 15 | 579 | 116 | applied 345/345 | 130 | 0 | 0 | 1 | 131 |
| 16 | 1527 | 105 | applied 345/345 | 98 | 0 | 0 | 30 | 128 |
| TOTAL | — | — | — | 2211 | 1 | 0 | 155 | 2367 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 11 1602 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40318186480-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40318186480-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40318186480-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40318186480-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40318186480-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40318186480-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40318186480-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40318186480-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40318186480-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40318186480-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40318186480-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40318186480-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40318186480-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40318186480-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40318186480-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40318186480-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40318186480-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40318186480-local-16
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

## Lane 8
- settings.spec.ts / S-1: unauthenticated /settings lands on /auth / mobile-360 — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
