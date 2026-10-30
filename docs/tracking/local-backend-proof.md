# Local backend proof (non-gating)

- Commit: `ffb3ee6fecf357ad55666610c3acc42510618e19`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41035524031

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 999 | 113 | applied 382/382 | 190 | 6 | 1 | 65 | 262 |
| email | 175 | 107 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 804 | 103 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 1008 | 105 | applied 382/382 | 133 | 0 | 0 | 3 | 136 |
| 3 | 897 | 117 | applied 382/382 | 148 | 0 | 0 | 0 | 148 |
| 4 | 681 | 118 | applied 382/382 | 129 | 0 | 0 | 2 | 131 |
| 5 | 783 | 113 | applied 382/382 | 160 | 0 | 0 | 7 | 167 |
| 6 | 608 | 90 | applied 382/382 | 137 | 0 | 0 | 1 | 138 |
| 7 | 463 | 110 | applied 382/382 | 105 | 0 | 0 | 0 | 105 |
| 8 | 586 | 104 | applied 382/382 | 100 | 1 | 0 | 39 | 140 |
| 9 | 754 | 121 | applied 382/382 | 134 | 0 | 0 | 11 | 145 |
| 10 | 851 | 102 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 11 | 1050 | 120 | applied 382/382 | 143 | 0 | 0 | 1 | 144 |
| 12 | 544 | 100 | applied 382/382 | 126 | 0 | 0 | 5 | 131 |
| 13 | 834 | 109 | applied 382/382 | 162 | 0 | 0 | 5 | 167 |
| 14 | 671 | 100 | applied 382/382 | 134 | 0 | 0 | 4 | 138 |
| 15 | 800 | 116 | applied 382/382 | 169 | 5 | 0 | 34 | 208 |
| 16 | 284 | 85 | applied 382/382 | 36 | 1 | 0 | 0 | 37 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 111 | 111 |
| TOTAL | — | — | — | 2283 | 13 | 1 | 294 | 2591 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 11 1050 s
- Repeat lane (DEC-283): Not repeated: e2e/shell.spec.ts (111 tests); Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 11, email 13, 1 13, 2 13, 3 13, 4 13, 5 12, 6 9, 7 13, 8 9, 9 11, 10 10, 11 13, 12 9, 13 13, 14 10, 15 14, 16 9, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41035524031-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41035524031-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41035524031-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41035524031-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41035524031-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41035524031-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41035524031-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41035524031-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 41035524031-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 41035524031-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41035524031-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41035524031-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41035524031-local-16
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

## Lane smoke
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / app shell / FT-1 the footer brand and three link columns fit every width / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / app shell / FT-1 the footer brand and three link columns fit every width / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / mobile chrome / the bar and the band stay while the page scrolls / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- shell.spec.ts / rail scroll regions (U0f) / footer never covers the rail's Sign out / desktop-1280 — Error: rail must clear the footer and Sign out must be hit-testable
- shell.spec.ts / desktop layout laws (U0g) / L1/L2: the top band and the rail stay put while content scrolls / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / desktop layout laws (U0g) / L3: the footer spans the full width beneath the fixed rail / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / desktop layout laws (U0g) / U0i: the rail ends at the footer top and its last item stays reachable / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / app shell / FT-1 the footer brand and three link columns fit every width / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / app shell / FT-1 the footer brand and three link columns fit every width / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / rail scroll regions (U0f) / footer never covers the rail's Sign out / desktop-1280 — Error: rail must clear the footer and Sign out must be hit-testable
- shell.spec.ts / desktop layout laws (U0g) / L1/L2: the top band and the rail stay put while content scrolls / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / desktop layout laws (U0g) / L3: the footer spans the full width beneath the fixed rail / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / desktop layout laws (U0g) / U0i: the rail ends at the footer top and its last item stays reachable / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- submenu-look.spec.ts / D248 a side panel is the main menu / SMN-E10 a 20-row panel fits at 1280×1000; at 1280×600 its rows reach 32 px, then it scrolls / desktop-1280 — Error: SMN-E10 no scroll at 1000 px

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
