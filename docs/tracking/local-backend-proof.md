# Local backend proof (non-gating)

- Commit: `5319153301591c80bd034da4fdceb6071bafdff9`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39980672474

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 871 | 103 | applied 339/339 | 186 | 0 | 0 | 60 | 246 |
| email | 178 | 101 | applied 339/339 | 0 | 1 | 0 | 3 | 4 |
| 1 | 833 | 115 | applied 339/339 | 134 | 0 | 0 | 4 | 138 |
| 2 | 859 | 98 | applied 339/339 | 120 | 0 | 0 | 3 | 123 |
| 3 | 812 | 99 | applied 339/339 | 130 | 0 | 0 | 0 | 130 |
| 4 | 560 | 106 | applied 339/339 | 146 | 0 | 0 | 2 | 148 |
| 5 | 1365 | 114 | applied 339/339 | 114 | 0 | 0 | 6 | 120 |
| 6 | 1442 | 107 | applied 339/339 | 131 | 0 | 0 | 1 | 132 |
| 7 | 548 | 111 | applied 339/339 | 119 | 0 | 0 | 0 | 119 |
| 8 | 606 | 99 | applied 339/339 | 108 | 0 | 0 | 30 | 138 |
| 9 | 659 | 80 | applied 339/339 | 127 | 0 | 0 | 2 | 129 |
| 10 | 961 | 115 | applied 339/339 | 130 | 0 | 0 | 2 | 132 |
| 11 | 1508 | 106 | applied 339/339 | 120 | 0 | 0 | 1 | 121 |
| 12 | 572 | 121 | applied 339/339 | 135 | 0 | 0 | 5 | 140 |
| 13 | 590 | 114 | applied 339/339 | 116 | 0 | 0 | 4 | 120 |
| 14 | 781 | 103 | applied 339/339 | 129 | 0 | 0 | 3 | 132 |
| 15 | 589 | 110 | applied 339/339 | 130 | 0 | 0 | 1 | 131 |
| 16 | 571 | 89 | applied 339/339 | 92 | 0 | 0 | 30 | 122 |
| TOTAL | — | — | — | 2167 | 1 | 0 | 157 | 2325 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 11 1508 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 39980672474-localproof
  - email: [e2e:teardown] deleted 2 user(s) owned by process 39980672474-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 39980672474-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 39980672474-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 39980672474-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 39980672474-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 39980672474-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 39980672474-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 39980672474-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 39980672474-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 39980672474-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 39980672474-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 39980672474-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 39980672474-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 39980672474-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 39980672474-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 39980672474-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 39980672474-local-16
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

## Lane email
- auth-signup.spec.ts / A: sign-up + resend (needs a recipient-agnostic mail sink) / A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle / email-serial — Error: sign-up surfaced an error instead of check-email

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
