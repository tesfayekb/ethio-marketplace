# Local backend proof (non-gating)

- Commit: `444acdf3c67b7d2de7e339636bf4e13f16f174a4`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40964680564

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 982 | 120 | applied 381/381 | 196 | 0 | 0 | 62 | 258 |
| email | 172 | 107 | applied 381/381 | 6 | 0 | 0 | 0 | 6 |
| 1 | 709 | 107 | applied 381/381 | 132 | 0 | 0 | 4 | 136 |
| 2 | 1005 | 95 | applied 381/381 | 142 | 0 | 0 | 3 | 145 |
| 3 | 736 | 89 | applied 381/381 | 128 | 0 | 0 | 0 | 128 |
| 4 | 715 | 115 | applied 381/381 | 149 | 0 | 0 | 2 | 151 |
| 5 | 592 | 100 | applied 381/381 | 124 | 0 | 0 | 7 | 131 |
| 6 | 786 | 116 | applied 381/381 | 131 | 0 | 0 | 1 | 132 |
| 7 | 555 | 114 | applied 381/381 | 131 | 0 | 0 | 0 | 131 |
| 8 | 604 | 108 | applied 381/381 | 113 | 0 | 0 | 30 | 143 |
| 9 | 626 | 97 | applied 381/381 | 134 | 0 | 0 | 2 | 136 |
| 10 | 907 | 114 | applied 381/381 | 130 | 0 | 0 | 2 | 132 |
| 11 | 989 | 120 | applied 381/381 | 128 | 0 | 0 | 1 | 129 |
| 12 | 577 | 87 | applied 381/381 | 141 | 0 | 0 | 5 | 146 |
| 13 | 682 | 117 | applied 381/381 | 125 | 0 | 1 | 5 | 131 |
| 14 | 732 | 111 | applied 381/381 | 129 | 0 | 0 | 3 | 132 |
| 15 | 461 | 99 | applied 381/381 | 130 | 0 | 0 | 1 | 131 |
| 16 | 543 | 108 | applied 381/381 | 102 | 0 | 0 | 32 | 134 |
| repeat | 283 | 121 | applied 381/381 | 24 | 0 | 0 | 0 | 24 |
| TOTAL | — | — | — | 2295 | 0 | 1 | 160 | 2456 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1005 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 2 tests selected, 2 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 13, email 14, 1 12, 2 12, 3 9, 4 12, 5 12, 6 12, 7 12, 8 11, 9 9, 10 11, 11 13, 12 9, 13 11, 14 11, 15 9, 16 11, repeat 13
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40964680564-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40964680564-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40964680564-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40964680564-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40964680564-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 40964680564-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40964680564-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40964680564-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40964680564-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40964680564-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40964680564-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40964680564-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40964680564-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 40964680564-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40964680564-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40964680564-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40964680564-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40964680564-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 40964680564-local-repeat
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

## Lane 13
- page-head.spec.ts / PGH-E2 picks re-title without changing the URL or calling route server functions / desktop-1280 — [31mTest timeout of 60000ms exceeded.[39m

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
