# Local backend proof (non-gating)

- Commit: `7c05e7ce820144128d33630260531d12afc49014`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40120074214

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 875 | 115 | applied 342/342 | 186 | 0 | 0 | 60 | 246 |
| email | 189 | 118 | applied 342/342 | 6 | 0 | 0 | 0 | 6 |
| 1 | 841 | 119 | applied 342/342 | 134 | 0 | 0 | 4 | 138 |
| 2 | 791 | 103 | applied 342/342 | 120 | 0 | 0 | 3 | 123 |
| 3 | 967 | 119 | applied 342/342 | 130 | 0 | 0 | 0 | 130 |
| 4 | 501 | 103 | applied 342/342 | 147 | 0 | 0 | 2 | 149 |
| 5 | 533 | 106 | applied 342/342 | 115 | 0 | 0 | 6 | 121 |
| 6 | 799 | 118 | applied 342/342 | 131 | 0 | 0 | 1 | 132 |
| 7 | 543 | 117 | applied 342/342 | 119 | 0 | 0 | 0 | 119 |
| 8 | 650 | 122 | applied 342/342 | 108 | 0 | 0 | 30 | 138 |
| 9 | 708 | 115 | applied 342/342 | 127 | 0 | 0 | 2 | 129 |
| 10 | 800 | 97 | applied 342/342 | 130 | 0 | 0 | 2 | 132 |
| 11 | 783 | 95 | applied 342/342 | 120 | 0 | 0 | 1 | 121 |
| 12 | 577 | 119 | applied 342/342 | 136 | 0 | 0 | 5 | 141 |
| 13 | 614 | 116 | applied 342/342 | 117 | 0 | 0 | 4 | 121 |
| 14 | 781 | 102 | applied 342/342 | 129 | 0 | 0 | 3 | 132 |
| 15 | 495 | 109 | applied 342/342 | 130 | 0 | 0 | 1 | 131 |
| 16 | 575 | 117 | applied 342/342 | 92 | 0 | 0 | 30 | 122 |
| TOTAL | — | — | — | 2177 | 0 | 0 | 154 | 2331 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 3 967 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40120074214-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40120074214-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40120074214-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40120074214-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40120074214-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40120074214-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40120074214-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40120074214-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40120074214-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40120074214-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40120074214-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40120074214-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40120074214-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40120074214-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40120074214-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40120074214-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40120074214-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40120074214-local-16
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
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
