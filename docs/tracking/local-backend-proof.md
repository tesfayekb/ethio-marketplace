# Local backend proof (non-gating)

- Commit: `c8410ef2612996fcc963621611a843dcf0b9d609`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40855224390

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 917 | 119 | applied 378/378 | 196 | 0 | 0 | 62 | 258 |
| email | 177 | 112 | applied 378/378 | 6 | 0 | 0 | 0 | 6 |
| 1 | 752 | 106 | applied 378/378 | 132 | 0 | 0 | 4 | 136 |
| 2 | 826 | 103 | applied 378/378 | 129 | 0 | 0 | 3 | 132 |
| 3 | 861 | 93 | applied 378/378 | 136 | 0 | 0 | 0 | 136 |
| 4 | 535 | 102 | applied 378/378 | 148 | 0 | 0 | 2 | 150 |
| 5 | 562 | 118 | applied 378/378 | 119 | 0 | 0 | 6 | 125 |
| 6 | 708 | 111 | applied 378/378 | 131 | 0 | 0 | 1 | 132 |
| 7 | 568 | 117 | applied 378/378 | 131 | 0 | 0 | 0 | 131 |
| 8 | 519 | 113 | applied 378/378 | 102 | 0 | 0 | 30 | 132 |
| 9 | 856 | 104 | applied 378/378 | 145 | 0 | 0 | 2 | 147 |
| 10 | 995 | 117 | applied 378/378 | 130 | 0 | 0 | 2 | 132 |
| 11 | 877 | 104 | applied 378/378 | 123 | 0 | 0 | 1 | 124 |
| 12 | 715 | 122 | applied 378/378 | 140 | 0 | 0 | 5 | 145 |
| 13 | 533 | 94 | applied 378/378 | 120 | 0 | 0 | 5 | 125 |
| 14 | 660 | 117 | applied 378/378 | 129 | 0 | 0 | 3 | 132 |
| 15 | 602 | 128 | applied 378/378 | 130 | 0 | 0 | 1 | 131 |
| 16 | 526 | 98 | applied 378/378 | 102 | 0 | 0 | 32 | 134 |
| repeat | 198 | 104 | applied 378/378 | 12 | 0 | 0 | 0 | 12 |
| TOTAL | — | — | — | 2261 | 0 | 0 | 159 | 2420 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 995 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 1 tests selected, 1 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 11, email 13, 1 13, 2 9, 3 10, 4 9, 5 13, 6 10, 7 13, 8 12, 9 13, 10 13, 11 10, 12 14, 13 11, 14 9, 15 13, 16 9, repeat 12
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40855224390-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40855224390-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40855224390-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40855224390-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40855224390-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40855224390-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40855224390-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40855224390-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40855224390-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40855224390-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40855224390-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40855224390-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40855224390-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40855224390-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40855224390-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40855224390-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40855224390-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40855224390-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 40855224390-local-repeat
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
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
