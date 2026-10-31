# Local backend proof (non-gating)

- Commit: `d79810764599d3ce607b657ec4aff9405808200e`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41169833292

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 988 | 64 | applied 383/383 | 205 | 0 | 0 | 69 | 274 |
| email | 202 | 69 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 872 | 69 | applied 383/383 | 148 | 0 | 0 | 4 | 152 |
| 2 | 908 | 46 | applied 383/383 | 152 | 0 | 0 | 3 | 155 |
| 3 | 948 | 68 | applied 383/383 | 151 | 0 | 0 | 0 | 151 |
| 4 | 825 | 72 | applied 383/383 | 157 | 0 | 0 | 2 | 159 |
| 5 | 673 | 70 | applied 383/383 | 131 | 0 | 0 | 7 | 138 |
| 6 | 937 | 69 | applied 383/383 | 187 | 0 | 0 | 1 | 188 |
| 7 | 367 | 72 | applied 383/383 | 64 | 0 | 0 | 49 | 113 |
| 8 | 682 | 69 | applied 383/383 | 105 | 0 | 0 | 44 | 149 |
| 9 | 818 | 59 | applied 383/383 | 143 | 0 | 0 | 12 | 155 |
| 10 | 1099 | 58 | applied 383/383 | 160 | 0 | 0 | 2 | 162 |
| 11 | 919 | 71 | applied 383/383 | 132 | 0 | 0 | 2 | 134 |
| 12 | 790 | 68 | applied 383/383 | 155 | 0 | 0 | 4 | 159 |
| 13 | 706 | 64 | applied 383/383 | 135 | 0 | 0 | 7 | 142 |
| 14 | 945 | 70 | applied 383/383 | 182 | 0 | 0 | 2 | 184 |
| 15 | 622 | 71 | applied 383/383 | 143 | 0 | 0 | 79 | 222 |
| 16 | 385 | 65 | applied 383/383 | 41 | 0 | 0 | 0 | 41 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2397 | 0 | 0 | 287 | 2684 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1099 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 12, email 13, 1 13, 2 9, 3 13, 4 14, 5 13, 6 13, 7 14, 8 13, 9 11, 10 11, 11 13, 12 13, 13 12, 14 13, 15 13, 16 12, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41169833292-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41169833292-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41169833292-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41169833292-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41169833292-local-3
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41169833292-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41169833292-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41169833292-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41169833292-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41169833292-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41169833292-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41169833292-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41169833292-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41169833292-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41169833292-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41169833292-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41169833292-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41169833292-local-16
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
