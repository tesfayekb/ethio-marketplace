# Local backend proof (non-gating)

- Commit: `fa5c333f76c6fe6d20882180c0a364bd854812b5`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41051458551

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 976 | 102 | applied 382/382 | 203 | 0 | 0 | 67 | 270 |
| email | 179 | 120 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 664 | 93 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 992 | 117 | applied 382/382 | 133 | 0 | 0 | 3 | 136 |
| 3 | 859 | 104 | applied 382/382 | 148 | 0 | 0 | 0 | 148 |
| 4 | 693 | 117 | applied 382/382 | 129 | 0 | 0 | 2 | 131 |
| 5 | 775 | 117 | applied 382/382 | 160 | 0 | 0 | 7 | 167 |
| 6 | 775 | 118 | applied 382/382 | 137 | 0 | 0 | 1 | 138 |
| 7 | 688 | 98 | applied 382/382 | 188 | 0 | 0 | 33 | 221 |
| 8 | 309 | 103 | applied 382/382 | 20 | 0 | 0 | 8 | 28 |
| 9 | 666 | 103 | applied 382/382 | 134 | 0 | 0 | 12 | 146 |
| 10 | 811 | 102 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 11 | 978 | 116 | applied 382/382 | 143 | 0 | 0 | 1 | 144 |
| 12 | 724 | 105 | applied 382/382 | 143 | 0 | 0 | 5 | 148 |
| 13 | 784 | 115 | applied 382/382 | 145 | 0 | 0 | 5 | 150 |
| 14 | 677 | 100 | applied 382/382 | 134 | 0 | 0 | 4 | 138 |
| 15 | 604 | 97 | applied 382/382 | 178 | 0 | 0 | 34 | 212 |
| 16 | 327 | 97 | applied 382/382 | 37 | 1 | 0 | 0 | 38 |
| repeat | 217 | 111 | applied 382/382 | 24 | 2 | 0 | 26 | 52 |
| TOTAL | — | — | — | 2333 | 3 | 0 | 214 | 2550 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 992 s
- Repeat lane (DEC-283): Not repeated: e2e/shell.spec.ts (115 tests); Repeat: each 2 on both projects; 128 tests selected, 13 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 4 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 13, email 11, 1 9, 2 13, 3 12, 4 13, 5 13, 6 13, 7 11, 8 12, 9 11, 10 9, 11 13, 12 13, 13 13, 14 10, 15 9, 16 13, repeat 11
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41051458551-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41051458551-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41051458551-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41051458551-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41051458551-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41051458551-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41051458551-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41051458551-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 41051458551-local-7
  - 8: [e2e:teardown] deleted 2 user(s) owned by process 41051458551-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41051458551-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 41051458551-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 41051458551-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41051458551-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41051458551-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41051458551-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41051458551-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41051458551-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41051458551-local-repeat
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

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- submenu-look.spec.ts / D248 a side panel is the main menu / SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254) / desktop-1280 — Error: SMN-E13 the panel scrolls

## Lane repeat
- Step failure:
Step smoke: outcome failure
  repeat-cap: failed
- submenu-look.spec.ts / D248 a side panel is the main menu / SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254) / desktop-1280 — Error: SMN-E13 the panel scrolls
- submenu-look.spec.ts / D248 a side panel is the main menu / SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254) / desktop-1280 — Error: SMN-E13 the panel scrolls

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
