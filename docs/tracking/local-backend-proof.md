# Local backend proof (non-gating)

- Commit: `b2940a6130622876b0b40dfc674ae2c69ad7b35d`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40974739742

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 963 | 106 | applied 382/382 | 196 | 0 | 0 | 62 | 258 |
| email | 179 | 105 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 584 | 98 | applied 382/382 | 132 | 0 | 0 | 4 | 136 |
| 2 | 1078 | 117 | applied 382/382 | 142 | 0 | 0 | 3 | 145 |
| 3 | 881 | 120 | applied 382/382 | 128 | 0 | 0 | 0 | 128 |
| 4 | 696 | 121 | applied 382/382 | 149 | 0 | 0 | 2 | 151 |
| 5 | 634 | 104 | applied 382/382 | 123 | 1 | 0 | 7 | 131 |
| 6 | 760 | 111 | applied 382/382 | 130 | 0 | 1 | 1 | 132 |
| 7 | 573 | 109 | applied 382/382 | 131 | 0 | 0 | 0 | 131 |
| 8 | 659 | 118 | applied 382/382 | 113 | 0 | 0 | 30 | 143 |
| 9 | 742 | 112 | applied 382/382 | 134 | 0 | 0 | 2 | 136 |
| 10 | 821 | 103 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 11 | 841 | 85 | applied 382/382 | 128 | 0 | 0 | 1 | 129 |
| 12 | 714 | 121 | applied 382/382 | 141 | 0 | 0 | 5 | 146 |
| 13 | 644 | 103 | applied 382/382 | 125 | 0 | 1 | 5 | 131 |
| 14 | 808 | 109 | applied 382/382 | 129 | 0 | 0 | 3 | 132 |
| 15 | 537 | 119 | applied 382/382 | 130 | 0 | 0 | 1 | 131 |
| 16 | 586 | 118 | applied 382/382 | 102 | 0 | 0 | 32 | 134 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2269 | 1 | 2 | 160 | 2432 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1078 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 13, email 13, 1 9, 2 13, 3 13, 4 13, 5 9, 6 11, 7 13, 8 13, 9 13, 10 9, 11 9, 12 14, 13 11, 14 13, 15 11, 16 13, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40974739742-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40974739742-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40974739742-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40974739742-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40974739742-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 40974739742-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40974739742-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40974739742-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40974739742-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40974739742-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40974739742-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40974739742-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40974739742-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 40974739742-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40974739742-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40974739742-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40974739742-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40974739742-local-16
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
RLS on 85 of 85 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- page-head.spec.ts / PGH-E2 picks re-title without changing the URL or calling route server functions / mobile-360 — [31mTest timeout of 60000ms exceeded.[39m

## Lane 6
- post-wizard-place.spec.ts / POSTING WIZARD / PW-30 review and buyer preview render option labels, units, multi-values and booleans / mobile-360 — Error: PW-30: no place was chosen

## Lane 13
- page-head.spec.ts / PGH-E2 picks re-title without changing the URL or calling route server functions / desktop-1280 — [31mTest timeout of 60000ms exceeded.[39m

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
