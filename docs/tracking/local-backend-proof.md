# Local backend proof (non-gating)

- Commit: `37ff1f047facb03f0fb5677765d9d1d649ffe57c`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40842401853

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 121 | applied 374/374 | 0 | 0 | 0 | 0 | 0 |
| email | 184 | 118 | applied 374/374 | 6 | 0 | 0 | 0 | 6 |
| 1 | 741 | 119 | applied 374/374 | 132 | 0 | 0 | 4 | 136 |
| 2 | 932 | 117 | applied 374/374 | 129 | 0 | 0 | 3 | 132 |
| 3 | 960 | 98 | applied 374/374 | 136 | 0 | 0 | 0 | 136 |
| 4 | 617 | 100 | applied 374/374 | 148 | 0 | 0 | 2 | 150 |
| 5 | 512 | 112 | applied 374/374 | 119 | 0 | 0 | 6 | 125 |
| 6 | 798 | 119 | applied 374/374 | 131 | 0 | 0 | 1 | 132 |
| 7 | 526 | 121 | applied 374/374 | 131 | 0 | 0 | 0 | 131 |
| 8 | 545 | 120 | applied 374/374 | 101 | 0 | 0 | 30 | 131 |
| 9 | 879 | 118 | applied 374/374 | 145 | 0 | 0 | 2 | 147 |
| 10 | 901 | 99 | applied 374/374 | 130 | 0 | 0 | 2 | 132 |
| 11 | 971 | 102 | applied 374/374 | 123 | 0 | 0 | 1 | 124 |
| 12 | 660 | 117 | applied 374/374 | 140 | 0 | 0 | 5 | 145 |
| 13 | 521 | 97 | applied 374/374 | 120 | 0 | 0 | 5 | 125 |
| 14 | 731 | 109 | applied 374/374 | 129 | 0 | 0 | 3 | 132 |
| 15 | 579 | 120 | applied 374/374 | 130 | 0 | 0 | 1 | 131 |
| 16 | 572 | 112 | applied 374/374 | 101 | 0 | 0 | 32 | 133 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2051 | 0 | 0 | 97 | 2148 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 11 971 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 13, email 14, 1 13, 2 13, 3 13, 4 10, 5 11, 6 13, 7 11, 8 13, 9 13, 10 11, 11 12, 12 13, 13 10, 14 10, 15 11, 16 11, repeat not run
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40842401853-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40842401853-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40842401853-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40842401853-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40842401853-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40842401853-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40842401853-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40842401853-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40842401853-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40842401853-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40842401853-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40842401853-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40842401853-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40842401853-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40842401853-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40842401853-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40842401853-local-16
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
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane smoke
- No JSON results; smoke skipped

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
