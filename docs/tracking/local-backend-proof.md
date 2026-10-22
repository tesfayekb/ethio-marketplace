# Local backend proof (non-gating)

- Commit: `b4bc54fa8d380a4aa024fa5358ea346180e84aad`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39709332051

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 818 | 107 | applied 336/336 | 186 | 0 | 0 | 60 | 246 |
| email | 183 | 115 | applied 336/336 | 4 | 0 | 0 | 0 | 4 |
| 1 | 736 | 118 | applied 336/336 | 125 | 0 | 0 | 4 | 129 |
| 2 | 977 | 117 | applied 336/336 | 129 | 0 | 0 | 3 | 132 |
| 3 | 921 | 116 | applied 336/336 | 126 | 0 | 0 | 0 | 126 |
| 4 | 579 | 119 | applied 336/336 | 143 | 0 | 0 | 2 | 145 |
| 5 | 520 | 117 | applied 336/336 | 112 | 0 | 0 | 6 | 118 |
| 6 | 791 | 116 | applied 336/336 | 131 | 0 | 0 | 1 | 132 |
| 7 | 452 | 100 | applied 336/336 | 131 | 0 | 0 | 0 | 131 |
| 8 | 596 | 112 | applied 336/336 | 96 | 0 | 0 | 30 | 126 |
| 9 | 794 | 121 | applied 336/336 | 127 | 0 | 0 | 2 | 129 |
| 10 | 944 | 111 | applied 336/336 | 130 | 0 | 0 | 2 | 132 |
| 11 | 933 | 114 | applied 336/336 | 116 | 0 | 0 | 1 | 117 |
| 12 | 543 | 117 | applied 336/336 | 132 | 0 | 0 | 5 | 137 |
| 13 | 773 | 116 | applied 336/336 | 149 | 0 | 0 | 4 | 153 |
| 14 | 629 | 118 | applied 336/336 | 94 | 0 | 0 | 3 | 97 |
| 15 | 475 | 99 | applied 336/336 | 130 | 0 | 0 | 1 | 131 |
| 16 | 550 | 108 | applied 336/336 | 92 | 0 | 0 | 30 | 122 |
| TOTAL | — | — | — | 2153 | 0 | 0 | 154 | 2307 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 2 977 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 39709332051-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 39709332051-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 39709332051-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 39709332051-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 39709332051-local-3
  - 4: [e2e:teardown] deleted 12 user(s) owned by process 39709332051-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 39709332051-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 39709332051-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 39709332051-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 39709332051-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 39709332051-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 39709332051-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 39709332051-local-11
  - 12: [e2e:teardown] deleted 12 user(s) owned by process 39709332051-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 39709332051-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 39709332051-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 39709332051-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 39709332051-local-16
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
