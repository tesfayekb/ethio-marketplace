# Local backend proof (non-gating)

- Commit: `1c43379bfa34a1c7b0cf15b19ec7d7f1e83a9b19`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41011892858

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 995 | 120 | applied 382/382 | 192 | 3 | 0 | 63 | 258 |
| email | 172 | 116 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 676 | 100 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 987 | 112 | applied 382/382 | 133 | 0 | 0 | 3 | 136 |
| 3 | 875 | 119 | applied 382/382 | 133 | 0 | 0 | 0 | 133 |
| 4 | 664 | 105 | applied 382/382 | 144 | 0 | 0 | 2 | 146 |
| 5 | 561 | 108 | applied 382/382 | 125 | 0 | 0 | 7 | 132 |
| 6 | 774 | 105 | applied 382/382 | 131 | 0 | 0 | 1 | 132 |
| 7 | 527 | 96 | applied 382/382 | 136 | 0 | 0 | 0 | 136 |
| 8 | 619 | 97 | applied 382/382 | 105 | 3 | 0 | 34 | 142 |
| 9 | 823 | 125 | applied 382/382 | 136 | 0 | 0 | 7 | 143 |
| 10 | 829 | 97 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 11 | 1011 | 121 | applied 382/382 | 143 | 0 | 0 | 1 | 144 |
| 12 | 696 | 114 | applied 382/382 | 126 | 0 | 0 | 5 | 131 |
| 13 | 680 | 108 | applied 382/382 | 127 | 0 | 0 | 5 | 132 |
| 14 | 859 | 119 | applied 382/382 | 169 | 0 | 0 | 4 | 173 |
| 15 | 631 | 106 | applied 382/382 | 173 | 0 | 0 | 33 | 206 |
| 16 | 361 | 108 | applied 382/382 | 28 | 1 | 0 | 0 | 29 |
| repeat | 168 | 82 | applied 382/382 | 14 | 2 | 0 | 16 | 32 |
| TOTAL | — | — | — | 2292 | 9 | 0 | 187 | 2488 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 11 1011 s
- Repeat lane (DEC-283): Not repeated: e2e/shell.spec.ts (109 tests); Repeat: each 2 on both projects; 117 tests selected, 8 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 4 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 13, email 11, 1 9, 2 14, 3 13, 4 12, 5 11, 6 13, 7 12, 8 11, 9 13, 10 9, 11 13, 12 12, 13 13, 14 11, 15 11, 16 13, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41011892858-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41011892858-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41011892858-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41011892858-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41011892858-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41011892858-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41011892858-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41011892858-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 41011892858-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 41011892858-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41011892858-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41011892858-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41011892858-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41011892858-local-repeat
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
  
- shell.spec.ts / mobile chrome / the strip sits under the fixed bar / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / mobile chrome / the menu opens in place / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / mobile chrome / primary touch targets are at least 44px / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / mobile chrome / the strip sits under the fixed bar / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / mobile chrome / the menu opens in place / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / mobile chrome / primary touch targets are at least 44px / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- menu-rows.spec.ts / ROWS-E3 the rail's list fits at 1280×600 when its rows fit at 32 px; it does not scroll / desktop-1280 — Error: ROWS-E3 the tree's rows fit at 32 px in this region

## Lane repeat
- Step failure:
Step smoke: outcome failure
  repeat-cap: failed
- menu-rows.spec.ts / ROWS-E3 the rail's list fits at 1280×600 when its rows fit at 32 px; it does not scroll / desktop-1280 — Error: ROWS-E3 the tree's rows fit at 32 px in this region
- menu-rows.spec.ts / ROWS-E3 the rail's list fits at 1280×600 when its rows fit at 32 px; it does not scroll / desktop-1280 — Error: ROWS-E3 the tree's rows fit at 32 px in this region

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
