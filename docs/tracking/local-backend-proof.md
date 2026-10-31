# Local backend proof (non-gating)

- Commit: `398a5859cff9090edb796b12ccbf7ce05837ed3d`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41148548211

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 955 | 104 | applied 382/382 | 205 | 0 | 0 | 69 | 274 |
| email | 178 | 103 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 823 | 107 | applied 382/382 | 148 | 0 | 0 | 4 | 152 |
| 2 | 1014 | 102 | applied 382/382 | 152 | 0 | 0 | 3 | 155 |
| 3 | 913 | 114 | applied 382/382 | 151 | 0 | 0 | 0 | 151 |
| 4 | 727 | 113 | applied 382/382 | 157 | 0 | 0 | 2 | 159 |
| 5 | 654 | 119 | applied 382/382 | 127 | 0 | 0 | 7 | 134 |
| 6 | 737 | 98 | applied 382/382 | 149 | 0 | 0 | 1 | 150 |
| 7 | 362 | 101 | applied 382/382 | 104 | 0 | 0 | 49 | 153 |
| 8 | 623 | 94 | applied 382/382 | 103 | 0 | 0 | 43 | 146 |
| 9 | 813 | 108 | applied 382/382 | 145 | 0 | 0 | 13 | 158 |
| 10 | 1138 | 104 | applied 382/382 | 160 | 0 | 0 | 2 | 162 |
| 11 | 830 | 112 | applied 382/382 | 132 | 0 | 0 | 2 | 134 |
| 12 | 753 | 105 | applied 382/382 | 155 | 0 | 0 | 4 | 159 |
| 13 | 646 | 108 | applied 382/382 | 131 | 0 | 0 | 7 | 138 |
| 14 | 822 | 100 | applied 382/382 | 186 | 0 | 0 | 2 | 188 |
| 15 | 577 | 119 | applied 382/382 | 143 | 0 | 0 | 77 | 220 |
| 16 | 377 | 121 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 871 | 100 | applied 382/382 | 106 | 0 | 0 | 14 | 120 |
| TOTAL | — | — | — | 2501 | 0 | 0 | 299 | 2800 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1138 s
- Repeat lane (DEC-283): Not repeated: e2e/sage-bands.spec.ts (36 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/shell.spec.ts (117 tests); Repeat: each 2 on both projects; 223 tests selected, 30 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 6 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 12, email 11, 1 11, 2 11, 3 12, 4 12, 5 13, 6 11, 7 10, 8 12, 9 12, 10 13, 11 11, 12 13, 13 12, 14 10, 15 13, 16 13, repeat 10
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41148548211-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41148548211-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41148548211-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41148548211-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41148548211-local-3
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41148548211-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41148548211-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41148548211-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41148548211-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41148548211-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41148548211-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41148548211-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41148548211-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41148548211-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41148548211-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41148548211-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41148548211-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41148548211-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41148548211-local-repeat
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
