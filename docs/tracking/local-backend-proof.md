# Local backend proof (non-gating)

- Commit: `536dc66dc461f7698a0745d11359357f4e46ca54`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41142103894

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 875 | 98 | applied 382/382 | 204 | 1 | 0 | 69 | 274 |
| email | 179 | 107 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 855 | 112 | applied 382/382 | 148 | 0 | 0 | 4 | 152 |
| 2 | 1001 | 112 | applied 382/382 | 152 | 0 | 0 | 3 | 155 |
| 3 | 912 | 118 | applied 382/382 | 151 | 0 | 0 | 0 | 151 |
| 4 | 586 | 98 | applied 382/382 | 139 | 0 | 0 | 2 | 141 |
| 5 | 611 | 101 | applied 382/382 | 145 | 0 | 0 | 7 | 152 |
| 6 | 825 | 111 | applied 382/382 | 140 | 0 | 0 | 1 | 141 |
| 7 | 291 | 92 | applied 382/382 | 105 | 0 | 0 | 41 | 146 |
| 8 | 616 | 105 | applied 382/382 | 102 | 1 | 0 | 43 | 146 |
| 9 | 768 | 103 | applied 382/382 | 136 | 0 | 0 | 13 | 149 |
| 10 | 1124 | 99 | applied 382/382 | 169 | 0 | 0 | 2 | 171 |
| 11 | 849 | 100 | applied 382/382 | 132 | 0 | 0 | 2 | 134 |
| 12 | 511 | 86 | applied 382/382 | 137 | 0 | 0 | 4 | 141 |
| 13 | 632 | 89 | applied 382/382 | 145 | 0 | 0 | 7 | 152 |
| 14 | 851 | 117 | applied 382/382 | 139 | 0 | 0 | 2 | 141 |
| 15 | 653 | 113 | applied 382/382 | 186 | 0 | 0 | 69 | 255 |
| 16 | 361 | 107 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 847 | 110 | applied 382/382 | 106 | 0 | 0 | 14 | 120 |
| TOTAL | — | — | — | 2483 | 2 | 0 | 283 | 2768 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1124 s
- Repeat lane (DEC-283): Not repeated: e2e/sage-bands.spec.ts (20 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/shell.spec.ts (117 tests); Repeat: each 2 on both projects; 207 tests selected, 30 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 6 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 13, 1 13, 2 11, 3 13, 4 10, 5 10, 6 12, 7 9, 8 10, 9 13, 10 10, 11 12, 12 9, 13 9, 14 13, 15 13, 16 14, repeat 10
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41142103894-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41142103894-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41142103894-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41142103894-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41142103894-local-3
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41142103894-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41142103894-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41142103894-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41142103894-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41142103894-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41142103894-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41142103894-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41142103894-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41142103894-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41142103894-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41142103894-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41142103894-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41142103894-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41142103894-local-repeat
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
  
- shell.spec.ts / L4b location picker / long location names share one band row line / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveClass[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / L4b location picker / long location names share one band row line / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveClass[2m([22m[32mexpected[39m[2m)[22m failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
