# Local backend proof (non-gating)

- Commit: `d0b6a4add54ade3a01a771df3b632c8bb5ad27a3`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41138429380

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 873 | 87 | applied 382/382 | 205 | 0 | 0 | 69 | 274 |
| email | 172 | 106 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 856 | 118 | applied 382/382 | 148 | 0 | 0 | 4 | 152 |
| 2 | 1038 | 105 | applied 382/382 | 152 | 0 | 0 | 3 | 155 |
| 3 | 778 | 108 | applied 382/382 | 132 | 1 | 0 | 0 | 133 |
| 4 | 585 | 97 | applied 382/382 | 143 | 0 | 0 | 2 | 145 |
| 5 | 652 | 90 | applied 382/382 | 159 | 0 | 0 | 7 | 166 |
| 6 | 655 | 95 | applied 382/382 | 131 | 0 | 0 | 1 | 132 |
| 7 | 725 | 118 | applied 382/382 | 187 | 0 | 0 | 66 | 253 |
| 8 | 262 | 86 | applied 382/382 | 20 | 0 | 0 | 17 | 37 |
| 9 | 780 | 109 | applied 382/382 | 134 | 0 | 0 | 6 | 140 |
| 10 | 1002 | 102 | applied 382/382 | 143 | 0 | 0 | 2 | 145 |
| 11 | 967 | 95 | applied 382/382 | 156 | 2 | 0 | 2 | 160 |
| 12 | 635 | 119 | applied 382/382 | 128 | 0 | 0 | 4 | 132 |
| 13 | 849 | 121 | applied 382/382 | 154 | 0 | 0 | 7 | 161 |
| 14 | 725 | 98 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 15 | 626 | 116 | applied 382/382 | 187 | 0 | 0 | 57 | 244 |
| 16 | 365 | 119 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 783 | 119 | applied 382/382 | 82 | 0 | 0 | 14 | 96 |
| TOTAL | — | — | — | 2438 | 3 | 0 | 263 | 2704 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1038 s
- Repeat lane (DEC-283): Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/shell.spec.ts (117 tests); Repeat: each 2 on both projects; 181 tests selected, 24 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 10, email 11, 1 13, 2 11, 3 13, 4 9, 5 9, 6 8, 7 14, 8 9, 9 13, 10 11, 11 10, 12 13, 13 13, 14 11, 15 12, 16 12, repeat 13
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41138429380-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41138429380-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41138429380-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41138429380-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41138429380-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41138429380-local-4
  - 5: [e2e:teardown] deleted 20 user(s) owned by process 41138429380-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 41138429380-local-7
  - 8: [e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41138429380-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41138429380-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41138429380-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41138429380-local-12
  - 13: [e2e:teardown] deleted 20 user(s) owned by process 41138429380-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41138429380-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-repeat
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

## Lane 3
- Step failure:
Step smoke: outcome failure
  
- admin-shell.spec.ts / Admin shell (U0) / A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveClass[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 11
- Step failure:
Step smoke: outcome failure
  
- admin-shell.spec.ts / Admin shell (U0) / A-6 admin fixture: gated section nav, section page + breadcrumb, deep link / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveClass[2m([22m[32mexpected[39m[2m)[22m failed
- admin-shell.spec.ts / Admin shell (U0) / A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveClass[2m([22m[32mexpected[39m[2m)[22m failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
