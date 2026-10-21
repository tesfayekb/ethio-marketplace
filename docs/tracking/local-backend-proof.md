# Local backend proof (non-gating)

- Commit: `a70af1b1a2a61cad0db5d9d7258f3d10a5048c24`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39561502286

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 760 | 86 | applied 332/332 | 186 | 0 | 0 | 60 | 246 |
| email | 146 | 98 | applied 332/332 | 4 | 0 | 0 | 0 | 4 |
| 1 | 727 | 108 | applied 332/332 | 188 | 0 | 0 | 6 | 194 |
| 2 | 635 | 99 | applied 332/332 | 160 | 0 | 0 | 1 | 161 |
| 3 | 453 | 105 | applied 332/332 | 169 | 0 | 0 | 2 | 171 |
| 4 | 562 | 118 | applied 332/332 | 170 | 0 | 0 | 6 | 176 |
| 5 | 563 | 115 | applied 332/332 | 151 | 0 | 0 | 1 | 152 |
| 6 | 467 | 99 | applied 332/332 | 148 | 0 | 0 | 30 | 178 |
| 7 | 682 | 105 | applied 332/332 | 159 | 0 | 0 | 3 | 162 |
| 8 | 627 | 90 | applied 332/332 | 170 | 0 | 0 | 1 | 171 |
| 9 | 537 | 99 | applied 332/332 | 170 | 0 | 0 | 6 | 176 |
| 10 | 463 | 101 | applied 332/332 | 170 | 0 | 0 | 6 | 176 |
| 11 | 610 | 100 | applied 332/332 | 189 | 0 | 1 | 2 | 192 |
| 12 | 448 | 108 | applied 332/332 | 104 | 0 | 0 | 30 | 134 |
| TOTAL | — | — | — | 2138 | 0 | 1 | 154 | 2293 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the fourteen lanes)

- Slowest lane: smoke 760 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 39561502286-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 39561502286-local-email
  - 1: [e2e:teardown] deleted 10 user(s) owned by process 39561502286-local-1
  - 2: [e2e:teardown] deleted 16 user(s) owned by process 39561502286-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 39561502286-local-3
  - 4: [e2e:teardown] deleted 21 user(s) owned by process 39561502286-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 39561502286-local-5
  - 6: [e2e:teardown] deleted 4 user(s) owned by process 39561502286-local-6
  - 7: [e2e:teardown] deleted 10 user(s) owned by process 39561502286-local-7
  - 8: [e2e:teardown] deleted 6 user(s) owned by process 39561502286-local-8
  - 9: [e2e:teardown] deleted 23 user(s) owned by process 39561502286-local-9
  - 10: [e2e:teardown] deleted 21 user(s) owned by process 39561502286-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 39561502286-local-11
  - 12: [e2e:teardown] deleted 4 user(s) owned by process 39561502286-local-12
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
RLS on 76 of 76 public tables
Default grants in public: postgres | f | {postgres=X/postgres,service_role=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 11
- post-wizard-place.spec.ts / POSTING WIZARD / PW-30 review and buyer preview render option labels, units, multi-values and booleans / desktop-1280 — Error: PW-30: no place was chosen

DEC-211, DEC-218: every gating browser test runs here — fourteen lanes, the email lane included; two consecutive full dev runs judge each change.
