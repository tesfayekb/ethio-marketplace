# Local backend proof (non-gating)

- Commit: `1754bf3bfeca7ce8cefb9495e1feb6c242572f28`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44979930034

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 490 | 70 | applied 550/550 | 38 | 0 | 0 | 16 | 54 |
| email | 205 | 67 | applied 550/550 | 6 | 0 | 0 | 0 | 6 |
| webkit | 789 | 77 | applied 550/550 | 72 | 0 | 0 | 24 | 96 |
| 1 | 504 | 65 | applied 550/550 | 188 | 0 | 0 | 69 | 257 |
| 2 | 657 | 86 | applied 550/550 | 169 | 0 | 0 | 21 | 190 |
| 3 | 535 | 66 | applied 550/550 | 169 | 0 | 0 | 5 | 174 |
| 4 | 545 | 71 | applied 550/550 | 137 | 0 | 0 | 5 | 142 |
| 5 | 603 | 86 | applied 550/550 | 93 | 0 | 0 | 1 | 94 |
| 6 | 1333 | 66 | applied 550/550 | 123 | 30 | 0 | 41 | 194 |
| 7 | 512 | 69 | applied 550/550 | 149 | 0 | 0 | 77 | 226 |
| 8 | 541 | 68 | applied 550/550 | 179 | 0 | 0 | 7 | 186 |
| 9 | 571 | 66 | applied 550/550 | 129 | 0 | 0 | 1 | 130 |
| 10 | 508 | 68 | applied 550/550 | 160 | 0 | 0 | 2 | 162 |
| 11 | 498 | 64 | applied 550/550 | 120 | 0 | 0 | 8 | 128 |
| 12 | 533 | 67 | applied 550/550 | 163 | 0 | 0 | 18 | 181 |
| 13 | 456 | 57 | applied 550/550 | 156 | 0 | 0 | 8 | 164 |
| 14 | 491 | 68 | applied 550/550 | 181 | 0 | 0 | 3 | 184 |
| 15 | 547 | 67 | applied 550/550 | 124 | 0 | 0 | 6 | 130 |
| 16 | 579 | 73 | applied 550/550 | 172 | 0 | 0 | 48 | 220 |
| repeat | 533 | 66 | applied 550/550 | 126 | 2 | 0 | 0 | 128 |
| TOTAL | — | — | — | 2654 | 32 | 0 | 360 | 3046 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 6 1333 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-listings.spec.ts (39 tests); Not repeated: e2e/my-listings-page.spec.ts (10 tests); Repeat: each 2 on both projects; 81 tests selected, 32 repeated; budget 643 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 2 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 8, email 7, webkit 10, 1 7, 2 11, 3 7, 4 8, 5 11, 6 7, 7 7, 8 7, 9 7, 10 7, 11 7, 12 7, 13 6, 14 7, 15 7, 16 9, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/329, 2 641/451, 3 641/360, 4 640/360, 5 640/402, 6 641/1153, 7 641/326, 8 641/353, 9 641/384, 10 643/329, 11 640/343, 12 641/352, 13 640/300, 14 641/326, 15 641/385, 16 641/381
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44979930034-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44979930034-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44979930034-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44979930034-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44979930034-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44979930034-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44979930034-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44979930034-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 44979930034-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44979930034-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44979930034-local-14
  - 15: [e2e:teardown] deleted 45 user(s) owned by process 44979930034-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44979930034-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 44979930034-local-repeat
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- patched 20261029073342 (3dd11fa31551 -> 4287abad5fa3): CL-3's ahead check reads the clock just before the call (INC-1028, DEC-316)
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail]); the auth server's text columns '' (INC-808)
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
RLS on 90 of 90 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local
pg_cron: available 1.6.4; cron.launch_active_jobs settings: 1
Restored (cron.launch_active_jobs, autovacuum, scheduler sessions): on on 1
Start proofs (DEC-313): PostgREST serves job_runs; the sign-up hook answered 200

## Lane 6
- Step failure:
Step smoke: outcome failure
  
- admin-locations.spec.ts / L2a locations console / LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down / mobile-360 — Test timeout of 60000ms exceeded.
- admin-locations.spec.ts / L2a locations console / LT-4 path rule: retiring a scratch region hides its active descendants from the public tree / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-7b the editor round-trips a row without dropping a stored field / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror) / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-9b roster shape, card twin: the edit icon sits inline beside the path line / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-10 tones: retired is destructive, active is secondary, a level badge is outline / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-11 one read per country: filtering costs no request, switching the market costs exactly one / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-12 transfer scope: exports and the import title follow the selected country / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-14 market state and whole-country parent follow the selected market / mobile-360 — Test timeout of 60000ms exceeded.
- admin-locations.spec.ts / L2a locations console / LT-16 the row's actions: Edit, a red Delete and the menu's verbs open the editor's own dialogs / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down / desktop-1280 — Test timeout of 60000ms exceeded.
- admin-locations.spec.ts / L2a locations console / LT-4 path rule: retiring a scratch region hides its active descendants from the public tree / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-7b the editor round-trips a row without dropping a stored field / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-9a roster shape, table twin: the edit icon sits in the end column with pagination / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-10 tones: retired is destructive, active is secondary, a level badge is outline / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-11 one read per country: filtering costs no request, switching the market costs exactly one / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-12 transfer scope: exports and the import title follow the selected country / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-14 market state and whole-country parent follow the selected market / desktop-1280 — Test timeout of 60000ms exceeded.
- admin-locations.spec.ts / L2a locations console / LT-16 the row's actions: Edit, a red Delete and the menu's verbs open the editor's own dialogs / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane repeat
- Step failure:
Step smoke: outcome failure
  repeat-cap: failed
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices / mobile-360 — Error: expect(locator).toContainText(expected) failed
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices / desktop-1280 — Error: expect(locator).toContainText(expected) failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
