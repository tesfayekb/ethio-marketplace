# Local backend proof (non-gating)

- Commit: `14045945395fa2040b7772b6b3aa0c1d9aa1156e`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40816710648

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 972 | 117 | applied 365/365 | 196 | 0 | 0 | 62 | 258 |
| email | 187 | 119 | applied 365/365 | 6 | 0 | 0 | 0 | 6 |
| 1 | 729 | 115 | applied 365/365 | 131 | 0 | 0 | 4 | 135 |
| 2 | 992 | 112 | applied 365/365 | 142 | 0 | 0 | 3 | 145 |
| 3 | 884 | 115 | applied 365/365 | 123 | 0 | 0 | 0 | 123 |
| 4 | 544 | 100 | applied 365/365 | 148 | 0 | 0 | 2 | 150 |
| 5 | 438 | 97 | applied 365/365 | 119 | 0 | 0 | 6 | 125 |
| 6 | 789 | 117 | applied 365/365 | 131 | 0 | 0 | 1 | 132 |
| 7 | 496 | 112 | applied 365/365 | 131 | 0 | 0 | 0 | 131 |
| 8 | 567 | 90 | applied 365/365 | 110 | 0 | 0 | 30 | 140 |
| 9 | 725 | 118 | applied 365/365 | 133 | 0 | 0 | 2 | 135 |
| 10 | 971 | 118 | applied 365/365 | 130 | 0 | 0 | 2 | 132 |
| 11 | 866 | 102 | applied 365/365 | 123 | 0 | 0 | 1 | 124 |
| 12 | 630 | 108 | applied 365/365 | 140 | 0 | 0 | 5 | 145 |
| 13 | 610 | 117 | applied 365/365 | 120 | 0 | 0 | 5 | 125 |
| 14 | 823 | 119 | applied 365/365 | 129 | 0 | 0 | 3 | 132 |
| 15 | 469 | 99 | applied 365/365 | 130 | 0 | 0 | 1 | 131 |
| 16 | 618 | 120 | applied 365/365 | 99 | 0 | 0 | 32 | 131 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2241 | 0 | 0 | 159 | 2400 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 992 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 13, email 13, 1 12, 2 11, 3 13, 4 8, 5 9, 6 13, 7 11, 8 9, 9 12, 10 13, 11 10, 12 11, 13 13, 14 13, 15 9, 16 13, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40816710648-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40816710648-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40816710648-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40816710648-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40816710648-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40816710648-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40816710648-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40816710648-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40816710648-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40816710648-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40816710648-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40816710648-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40816710648-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40816710648-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40816710648-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40816710648-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40816710648-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40816710648-local-16
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
RLS on 80 of 80 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
