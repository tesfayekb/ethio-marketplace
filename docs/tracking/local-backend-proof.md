# Local backend proof (non-gating)

- Commit: `ccffb095bf9604d8191e1ad05818d04c356242ff`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41974149932

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 74 | applied 400/400 | 0 | 0 | 0 | 0 | 0 |
| email | 198 | 67 | applied 400/400 | 6 | 0 | 0 | 0 | 6 |
| 1 | 987 | 60 | applied 400/400 | 168 | 0 | 0 | 6 | 174 |
| 2 | 977 | 60 | applied 400/400 | 153 | 15 | 0 | 1 | 169 |
| 3 | 902 | 72 | applied 400/400 | 145 | 0 | 0 | 24 | 169 |
| 4 | 841 | 74 | applied 400/400 | 169 | 0 | 0 | 2 | 171 |
| 5 | 804 | 59 | applied 400/400 | 160 | 0 | 0 | 7 | 167 |
| 6 | 867 | 63 | applied 400/400 | 187 | 0 | 0 | 1 | 188 |
| 7 | 458 | 69 | applied 400/400 | 91 | 0 | 0 | 68 | 159 |
| 8 | 629 | 58 | applied 400/400 | 113 | 0 | 0 | 50 | 163 |
| 9 | 961 | 59 | applied 400/400 | 168 | 0 | 0 | 14 | 182 |
| 10 | 1148 | 66 | applied 400/400 | 147 | 15 | 0 | 1 | 163 |
| 11 | 762 | 50 | applied 400/400 | 138 | 0 | 0 | 36 | 174 |
| 12 | 957 | 73 | applied 400/400 | 173 | 0 | 0 | 5 | 178 |
| 13 | 786 | 73 | applied 400/400 | 136 | 0 | 0 | 17 | 153 |
| 14 | 902 | 63 | applied 400/400 | 182 | 0 | 0 | 2 | 184 |
| 15 | 405 | 60 | applied 400/400 | 96 | 0 | 0 | 62 | 158 |
| 16 | 639 | 59 | applied 400/400 | 132 | 0 | 0 | 36 | 168 |
| repeat | 280 | 73 | applied 400/400 | 150 | 0 | 0 | 0 | 150 |
| TOTAL | — | — | — | 2514 | 30 | 0 | 332 | 2876 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1148 s
- Repeat lane (DEC-283): Repeat: each 5 on both projects; 15 tests selected, 15 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 8, 1 6, 2 5, 3 9, 4 9, 5 6, 6 7, 7 8, 8 5, 9 6, 10 7, 11 4, 12 8, 13 9, 14 7, 15 6, 16 6, repeat 9
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41974149932-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41974149932-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41974149932-local-3
  - 4: [e2e:teardown] deleted 34 user(s) owned by process 41974149932-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41974149932-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41974149932-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41974149932-local-11
  - 12: [e2e:teardown] deleted 34 user(s) owned by process 41974149932-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-repeat
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

## Lane smoke
- Step failure:
Step acceptance-doors-guard: outcome failure
  Acceptance-doors guard FAIL: resume_listing(uuid): guarded allowance must name DEC-216 and an LG test id
  Acceptance-doors guard FAIL: set_listing_level(uuid,text): guarded allowance must name DEC-216 and an LG test id
  Acceptance-doors guard FAIL: set_listing_reach(uuid,text): guarded allowance must name DEC-216 and an LG test id
- No JSON results; smoke skipped

## Lane 2
- Step failure:
Step smoke: outcome failure
  
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-1 Premium from the console: the badge, the preview's look, the History line, the row, one audit row, the feed's rank; then Regular again / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-6 Set tier from the row menu: Premium through the ad page's dialog and door, the Tier filter lists it, one audit row and one revision; the own row and a removed row offer none / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb and no caps; the doors refuse both by name / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-4 a level is created with its perks and both names, shown under the language switch, edited, and attributed to its author and editor by name / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-7 a season: a root ending in ten days caps the level's days and names season_until; an ended season answers 0 / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-8 Add price inside the product's row names the product; the saved row reads Market · Category with its credit cost; a price for every market and a narrower one; the row's search narrows / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-9 Edit while unused: the amount, the credit cost and the end change through the door; the start is kept; the row and the audit follow / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-11 End price sets the end to now; the row stays, says so, offers no verb any more, and the public read no longer lists it / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-17 the order strip: a price added for every market clears the product from Needs a row; the strip reads Set once no pair is left / mobile-360 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-1 Premium from the console: the badge, the preview's look, the History line, the row, one audit row, the feed's rank; then Regular again / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-6 Set tier from the row menu: Premium through the ad page's dialog and door, the Tier filter lists it, one audit row and one revision; the own row and a removed row offer none / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb and no caps; the doors refuse both by name / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-4 a level is created with its perks and both names, shown under the language switch, edited, and attributed to its author and editor by name / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-7 a season: a root ending in ten days caps the level's days and names season_until; an ended season answers 0 / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-8 Add price inside the product's row names the product; the saved row reads Market · Category with its credit cost; a price for every market and a narrower one; the row's search narrows / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-9 Edit while unused: the amount, the credit cost and the end change through the door; the start is kept; the row and the audit follow / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-11 End price sets the end to now; the row stays, says so, offers no verb any more, and the public read no longer lists it / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-17 the order strip: a price added for every market clears the product from Needs a row; the strip reads Set once no pair is left / desktop-1280 — Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
