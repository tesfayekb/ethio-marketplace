# Local backend proof (non-gating)

- Commit: `8cdb5963a718cbed0b58f74978c65c0a60066ac8`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39619317310

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 868 | 106 | applied 333/333 | 186 | 0 | 0 | 60 | 246 |
| email | 170 | 116 | applied 333/333 | 4 | 0 | 0 | 0 | 4 |
| 1 | 1080 | 91 | applied 333/333 | 188 | 0 | 0 | 6 | 194 |
| 2 | 990 | 97 | applied 333/333 | 160 | 0 | 0 | 1 | 161 |
| 3 | 604 | 116 | applied 333/333 | 172 | 0 | 0 | 2 | 174 |
| 4 | 668 | 102 | applied 333/333 | 170 | 0 | 0 | 6 | 176 |
| 5 | 828 | 116 | applied 333/333 | 149 | 0 | 0 | 1 | 150 |
| 6 | 666 | 97 | applied 333/333 | 150 | 0 | 0 | 30 | 180 |
| 7 | 1022 | 116 | applied 333/333 | 159 | 0 | 0 | 3 | 162 |
| 8 | 975 | 99 | applied 333/333 | 170 | 0 | 0 | 1 | 171 |
| 9 | 832 | 113 | applied 333/333 | 173 | 0 | 0 | 6 | 179 |
| 10 | 849 | 112 | applied 333/333 | 170 | 0 | 0 | 6 | 176 |
| 11 | 777 | 99 | applied 333/333 | 190 | 0 | 0 | 2 | 192 |
| 12 | 560 | 105 | applied 333/333 | 104 | 0 | 0 | 30 | 134 |
| TOTAL | — | — | — | 2145 | 0 | 0 | 154 | 2299 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the fourteen lanes)

- Slowest lane: 1 1080 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 39619317310-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 39619317310-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 39619317310-local-1
  - 2: [e2e:teardown] deleted 15 user(s) owned by process 39619317310-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 39619317310-local-3
  - 4: [e2e:teardown] deleted 20 user(s) owned by process 39619317310-local-4
  - 5: [e2e:teardown] deleted 2 user(s) owned by process 39619317310-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 39619317310-local-6
  - 7: [e2e:teardown] deleted 9 user(s) owned by process 39619317310-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 39619317310-local-8
  - 9: [e2e:teardown] deleted 22 user(s) owned by process 39619317310-local-9
  - 10: [e2e:teardown] deleted 20 user(s) owned by process 39619317310-local-10
  - 11: [e2e:teardown] deleted 2 user(s) owned by process 39619317310-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 39619317310-local-12
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
RLS on 77 of 77 public tables
Default grants in public: postgres | f | {postgres=X/postgres,service_role=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

DEC-211, DEC-218: every gating browser test runs here — fourteen lanes, the email lane included; two consecutive full dev runs judge each change.
