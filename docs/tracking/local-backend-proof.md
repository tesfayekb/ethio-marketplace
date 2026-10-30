# Local backend proof (non-gating)

- Commit: `8c48bb2a2f1eaed45c35363f63c3ed47c5a93e2a`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41096998961

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 931 | 110 | applied 382/382 | 205 | 0 | 0 | 69 | 274 |
| email | 171 | 106 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 743 | 102 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 1221 | 100 | applied 382/382 | 159 | 0 | 0 | 3 | 162 |
| 3 | 656 | 84 | applied 382/382 | 122 | 0 | 0 | 0 | 122 |
| 4 | 535 | 90 | applied 382/382 | 146 | 0 | 0 | 2 | 148 |
| 5 | 808 | 121 | applied 382/382 | 143 | 0 | 0 | 7 | 150 |
| 6 | 761 | 109 | applied 382/382 | 137 | 0 | 0 | 1 | 138 |
| 7 | 709 | 112 | applied 382/382 | 191 | 0 | 0 | 40 | 231 |
| 8 | 320 | 110 | applied 382/382 | 20 | 0 | 0 | 17 | 37 |
| 9 | 649 | 103 | applied 382/382 | 134 | 0 | 0 | 6 | 140 |
| 10 | 1150 | 109 | applied 382/382 | 143 | 0 | 0 | 2 | 145 |
| 11 | 755 | 85 | applied 382/382 | 130 | 0 | 0 | 1 | 131 |
| 12 | 725 | 103 | applied 382/382 | 143 | 0 | 0 | 5 | 148 |
| 13 | 808 | 117 | applied 382/382 | 145 | 0 | 0 | 5 | 150 |
| 14 | 773 | 119 | applied 382/382 | 134 | 0 | 0 | 4 | 138 |
| 15 | 610 | 99 | applied 382/382 | 184 | 0 | 1 | 37 | 222 |
| 16 | 377 | 108 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 467 | 117 | applied 382/382 | 92 | 0 | 0 | 48 | 140 |
| TOTAL | — | — | — | 2416 | 0 | 1 | 251 | 2668 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1221 s
- Repeat lane (DEC-283): Not repeated: e2e/shell.spec.ts (117 tests); Repeat: each 2 on both projects; 152 tests selected, 35 repeated; budget 720 s at 4.7 s a test; directly changed: 6 of 7 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 11, email 13, 1 11, 2 13, 3 8, 4 8, 5 13, 6 13, 7 11, 8 13, 9 10, 10 14, 11 8, 12 13, 13 13, 14 13, 15 9, 16 12, repeat 13
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41096998961-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41096998961-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41096998961-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41096998961-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41096998961-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41096998961-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41096998961-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41096998961-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 41096998961-local-7
  - 8: [e2e:teardown] deleted 2 user(s) owned by process 41096998961-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41096998961-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41096998961-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41096998961-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41096998961-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41096998961-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41096998961-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41096998961-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41096998961-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41096998961-local-repeat
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

## Lane 15
- shell-bands.spec.ts / D258 band rows, fine pointer / BND-E1 every band row is 40 px and the menu starts on its boundary (signed in) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
