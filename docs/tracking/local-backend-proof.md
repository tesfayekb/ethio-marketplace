# Local backend proof (non-gating)

- Commit: `fb20a5c090e94d5f7d764b243ea0a7471904f233`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39699807169

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 864 | 103 | applied 335/335 | 186 | 0 | 0 | 60 | 246 |
| email | 146 | 94 | applied 335/335 | 4 | 0 | 0 | 0 | 4 |
| 1 | 745 | 115 | applied 335/335 | 125 | 0 | 0 | 4 | 129 |
| 2 | 778 | 87 | applied 335/335 | 129 | 0 | 0 | 3 | 132 |
| 3 | 844 | 94 | applied 335/335 | 128 | 0 | 0 | 0 | 128 |
| 4 | 483 | 102 | applied 335/335 | 140 | 0 | 0 | 2 | 142 |
| 5 | 510 | 103 | applied 335/335 | 112 | 0 | 0 | 6 | 118 |
| 6 | 769 | 112 | applied 335/335 | 131 | 0 | 0 | 1 | 132 |
| 7 | 550 | 100 | applied 335/335 | 131 | 0 | 0 | 0 | 131 |
| 8 | 555 | 95 | applied 335/335 | 96 | 0 | 0 | 30 | 126 |
| 9 | 769 | 121 | applied 335/335 | 127 | 0 | 0 | 2 | 129 |
| 10 | 787 | 86 | applied 335/335 | 130 | 0 | 0 | 2 | 132 |
| 11 | 838 | 107 | applied 335/335 | 115 | 0 | 0 | 1 | 116 |
| 12 | 461 | 100 | applied 335/335 | 132 | 0 | 0 | 5 | 137 |
| 13 | 660 | 100 | applied 335/335 | 149 | 0 | 0 | 4 | 153 |
| 14 | 612 | 101 | applied 335/335 | 94 | 0 | 0 | 3 | 97 |
| 15 | 543 | 114 | applied 335/335 | 130 | 0 | 0 | 1 | 131 |
| 16 | 551 | 118 | applied 335/335 | 92 | 0 | 0 | 30 | 122 |
| TOTAL | — | — | — | 2151 | 0 | 0 | 154 | 2305 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: smoke 864 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 39699807169-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 39699807169-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 39699807169-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 39699807169-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 39699807169-local-3
  - 4: [e2e:teardown] deleted 12 user(s) owned by process 39699807169-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 39699807169-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 39699807169-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 39699807169-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 39699807169-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 39699807169-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 39699807169-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 39699807169-local-11
  - 12: [e2e:teardown] deleted 12 user(s) owned by process 39699807169-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 39699807169-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 39699807169-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 39699807169-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 39699807169-local-16
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
RLS on 78 of 78 public tables
Default grants in public: postgres | f | {postgres=X/postgres,service_role=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
