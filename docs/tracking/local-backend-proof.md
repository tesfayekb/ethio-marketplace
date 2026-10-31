# Local backend proof (non-gating)

- Commit: `3d94bd6b610f8401f9ccbf30bd442e117ceb0862`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41163450560

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 875 | 77 | applied 383/383 | 203 | 2 | 0 | 69 | 274 |
| email | 183 | 118 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 857 | 115 | applied 383/383 | 148 | 0 | 0 | 4 | 152 |
| 2 | 1080 | 106 | applied 383/383 | 152 | 0 | 0 | 3 | 155 |
| 3 | 780 | 84 | applied 383/383 | 151 | 0 | 0 | 0 | 151 |
| 4 | 748 | 109 | applied 383/383 | 157 | 0 | 0 | 2 | 159 |
| 5 | 662 | 106 | applied 383/383 | 131 | 0 | 0 | 7 | 138 |
| 6 | 881 | 124 | applied 383/383 | 187 | 0 | 0 | 1 | 188 |
| 7 | 338 | 114 | applied 383/383 | 64 | 0 | 0 | 49 | 113 |
| 8 | 612 | 112 | applied 383/383 | 104 | 1 | 0 | 44 | 149 |
| 9 | 862 | 121 | applied 383/383 | 143 | 0 | 0 | 12 | 155 |
| 10 | 958 | 88 | applied 383/383 | 160 | 0 | 0 | 2 | 162 |
| 11 | 881 | 117 | applied 383/383 | 132 | 0 | 0 | 2 | 134 |
| 12 | 619 | 100 | applied 383/383 | 155 | 0 | 0 | 4 | 159 |
| 13 | 637 | 104 | applied 383/383 | 135 | 0 | 0 | 7 | 142 |
| 14 | 936 | 106 | applied 383/383 | 182 | 0 | 0 | 2 | 184 |
| 15 | 495 | 98 | applied 383/383 | 142 | 1 | 0 | 79 | 222 |
| 16 | 306 | 99 | applied 383/383 | 41 | 0 | 0 | 0 | 41 |
| repeat | 312 | 101 | applied 383/383 | 36 | 0 | 0 | 0 | 36 |
| TOTAL | — | — | — | 2429 | 4 | 0 | 287 | 2720 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1080 s
- Repeat lane (DEC-283): Not repeated: e2e/sage-bands.spec.ts (38 tests); Repeat: each 2 on both projects; 47 tests selected, 9 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 3 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 10, email 13, 1 13, 2 14, 3 9, 4 13, 5 13, 6 11, 7 13, 8 11, 9 13, 10 9, 11 13, 12 9, 13 10, 14 13, 15 10, 16 9, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41163450560-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41163450560-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41163450560-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41163450560-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41163450560-local-3
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41163450560-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41163450560-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41163450560-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41163450560-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41163450560-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41163450560-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41163450560-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41163450560-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41163450560-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41163450560-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41163450560-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41163450560-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41163450560-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41163450560-local-repeat
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

## Lane smoke
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / top band law (bundle 21 turn 2) / TB-1 the corner and the band line up / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / top band law (bundle 21 turn 2) / TB-1 the corner and the band line up / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / top band law (bundle 21 turn 2) / TB-1 the corner and the band line up / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / top band law (bundle 21 turn 2) / TB-1 the corner and the band line up / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
