# Local backend proof (non-gating)

- Commit: `4ec6935cee36e79d370d03fc755912bf30ca99ef`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41125880091

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 948 | 108 | applied 382/382 | 199 | 6 | 0 | 69 | 274 |
| email | 189 | 122 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 676 | 86 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 1028 | 108 | applied 382/382 | 159 | 0 | 0 | 3 | 162 |
| 3 | 773 | 106 | applied 382/382 | 132 | 1 | 0 | 0 | 133 |
| 4 | 713 | 103 | applied 382/382 | 138 | 0 | 0 | 2 | 140 |
| 5 | 553 | 85 | applied 382/382 | 140 | 0 | 0 | 7 | 147 |
| 6 | 899 | 118 | applied 382/382 | 155 | 0 | 0 | 1 | 156 |
| 7 | 380 | 105 | applied 382/382 | 89 | 10 | 0 | 33 | 132 |
| 8 | 581 | 85 | applied 382/382 | 98 | 4 | 0 | 43 | 145 |
| 9 | 720 | 94 | applied 382/382 | 136 | 0 | 0 | 13 | 149 |
| 10 | 1111 | 105 | applied 382/382 | 143 | 0 | 0 | 2 | 145 |
| 11 | 795 | 90 | applied 382/382 | 139 | 2 | 0 | 1 | 142 |
| 12 | 720 | 107 | applied 382/382 | 140 | 0 | 0 | 5 | 145 |
| 13 | 745 | 100 | applied 382/382 | 154 | 5 | 0 | 7 | 166 |
| 14 | 802 | 108 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 15 | 732 | 119 | applied 382/382 | 165 | 22 | 0 | 53 | 240 |
| 16 | 372 | 117 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 754 | 103 | applied 382/382 | 82 | 0 | 0 | 14 | 96 |
| TOTAL | — | — | — | 2387 | 50 | 0 | 259 | 2696 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1111 s
- Repeat lane (DEC-283): Not repeated: e2e/sage-shell.spec.ts (36 tests); Not repeated: e2e/shell.spec.ts (117 tests); Repeat: each 2 on both projects; 177 tests selected, 24 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 11, email 13, 1 9, 2 11, 3 12, 4 13, 5 8, 6 13, 7 13, 8 9, 9 12, 10 13, 11 9, 12 14, 13 9, 14 13, 15 13, 16 13, repeat 11
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41125880091-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41125880091-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41125880091-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41125880091-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41125880091-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41125880091-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41125880091-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41125880091-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 41125880091-local-7
  - 8: [e2e:teardown] deleted 2 user(s) owned by process 41125880091-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41125880091-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41125880091-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41125880091-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41125880091-local-12
  - 13: [e2e:teardown] deleted 20 user(s) owned by process 41125880091-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41125880091-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41125880091-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41125880091-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41125880091-local-repeat
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
  
- shell.spec.ts / RM-4 the row icons use the approved rail and phone sizes / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeGreaterThan[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / RM-4 the row icons use the approved rail and phone sizes / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeGreaterThan[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / mobile chrome / the menu opens in place / mobile-360 — Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').locator('[data-testid^="rail-category-"]:not([data-testid^="rail-category-e2e-"])').first().locator('svg:nth-of-type(1)') resolved to 2 elements:
- shell.spec.ts / mobile chrome / primary touch targets are at least 44px / mobile-360 — Error: language height
- shell.spec.ts / top band law (bundle 21 turn 2) / TB-1 the corner and the band line up / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / in-place category menu (bundle 21 turn 5) / B21SC-1 SC-1 the phone drills down and a leaf folds into the strip / mobile-360 — Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-localproof-6-8ii9fo-r').locator('svg:nth-of-type(1)') resolved to 2 elements:

## Lane 3
- Step failure:
Step smoke: outcome failure
  
- admin-shell.spec.ts / Admin shell (U0) / A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveClass[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 7
- Step failure:
Step smoke: outcome failure
  
- sage-shell.spec.ts / Sage shell at 390 px, light / SGS-1 the top band and the search pill (390, light) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 390 px, light / SGS-2 the controls share one look (390, light) / mobile-360 — Error: language-switcher lift
- sage-shell.spec.ts / Sage shell at 390 px, light / SGS-3 the menu: surface, tiles and the selected row (390, light) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 390 px, light / SGS-4 the footer (390, light) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 390 px, light / SGS-5 the bottom bar and the raised Post disc (390, light) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 390 px, dark / SGS-1 the top band and the search pill (390, dark) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 390 px, dark / SGS-2 the controls share one look (390, dark) / mobile-360 — Error: language-switcher lift
- sage-shell.spec.ts / Sage shell at 390 px, dark / SGS-3 the menu: surface, tiles and the selected row (390, dark) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 390 px, dark / SGS-4 the footer (390, dark) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 390 px, dark / SGS-5 the bottom bar and the raised Post disc (390, dark) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / RM-4 the row icons use the approved rail and phone sizes / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeGreaterThan[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / mobile chrome / the menu opens in place / mobile-360 — Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').locator('[data-testid^="rail-category-"]:not([data-testid^="rail-category-e2e-"])').first().locator('svg:nth-of-type(1)') resolved to 2 elements:
- shell.spec.ts / mobile chrome / primary touch targets are at least 44px / mobile-360 — Error: language height
- shell.spec.ts / in-place category menu (bundle 21 turn 5) / B21SC-1 SC-1 the phone drills down and a leaf folds into the strip / mobile-360 — Error: locator.boundingBox: Error: strict mode violation: getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-local-8-7-xe84pk-r').locator('svg:nth-of-type(1)') resolved to 2 elements:

## Lane 11
- Step failure:
Step smoke: outcome failure
  
- admin-shell.spec.ts / Admin shell (U0) / A-6 admin fixture: gated section nav, section page + breadcrumb, deep link / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveClass[2m([22m[32mexpected[39m[2m)[22m failed
- admin-shell.spec.ts / Admin shell (U0) / A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveClass[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 13
- Step failure:
Step smoke: outcome failure
  
- phone-frame.spec.ts / width walk (C2g.4) / signed out home at every width / desktop-1280 — Error: 320px: controls under 44px
- phone-frame.spec.ts / width walk (C2g.4) / admin categories at every width / desktop-1280 — Error: 320px: controls under 44px
- phone-frame.spec.ts / width walk (C2g.4) / account at every width / desktop-1280 — Error: 320px: controls under 44px
- phone-frame.spec.ts / width walk (C2g.4) / the posting wizard resized through every width without a reload / desktop-1280 — Error: 320px: controls under 44px
- phone-frame.spec.ts / width walk (C2g.4) / one session resized through every width without a reload / desktop-1280 — Error: 320px: controls under 44px

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- sage-shell.spec.ts / Sage shell at 834 px, light / SGS-1 the top band and the search pill (834, light) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 834 px, light / SGS-2 the controls share one look (834, light) / desktop-1280 — Error: language-switcher lift
- sage-shell.spec.ts / Sage shell at 834 px, light / SGS-3 the menu: surface, tiles and the selected row (834, light) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 834 px, light / SGS-4 the footer (834, light) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 834 px, light / SGS-6 Sign in is raised (834, light) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 834 px, dark / SGS-1 the top band and the search pill (834, dark) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 834 px, dark / SGS-2 the controls share one look (834, dark) / desktop-1280 — Error: language-switcher lift
- sage-shell.spec.ts / Sage shell at 834 px, dark / SGS-3 the menu: surface, tiles and the selected row (834, dark) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 834 px, dark / SGS-4 the footer (834, dark) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 834 px, dark / SGS-6 Sign in is raised (834, dark) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 1440 px, light / SGS-1 the top band and the search pill (1440, light) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 1440 px, light / SGS-2 the controls share one look (1440, light) / desktop-1280 — Error: language-switcher lift
- sage-shell.spec.ts / Sage shell at 1440 px, light / SGS-3 the menu: surface, tiles and the selected row (1440, light) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 1440 px, light / SGS-4 the footer (1440, light) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 1440 px, light / SGS-6 Sign in is raised (1440, light) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 1440 px, dark / SGS-1 the top band and the search pill (1440, dark) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 1440 px, dark / SGS-2 the controls share one look (1440, dark) / desktop-1280 — Error: language-switcher lift
- sage-shell.spec.ts / Sage shell at 1440 px, dark / SGS-3 the menu: surface, tiles and the selected row (1440, dark) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 1440 px, dark / SGS-4 the footer (1440, dark) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- sage-shell.spec.ts / Sage shell at 1440 px, dark / SGS-6 Sign in is raised (1440, dark) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- shell.spec.ts / RM-4 the row icons use the approved rail and phone sizes / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeGreaterThan[2m([22m[32mexpected[39m[2m)[22m
- shell.spec.ts / top band law (bundle 21 turn 2) / TB-1 the corner and the band line up / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeLessThanOrEqual[2m([22m[32mexpected[39m[2m)[22m

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
