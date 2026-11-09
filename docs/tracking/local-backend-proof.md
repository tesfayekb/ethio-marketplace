# Local backend proof (non-gating)

- Commit: `f7baa4063553326c5e7c8a91494d7cbae7e98102`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42562258710

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1013 | 71 | applied 431/431 | 206 | 0 | 0 | 70 | 276 |
| email | 192 | 61 | applied 431/431 | 6 | 0 | 0 | 0 | 6 |
| 1 | 980 | 62 | applied 431/431 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1330 | 74 | applied 431/431 | 188 | 1 | 0 | 1 | 190 |
| 3 | 769 | 74 | applied 431/431 | 140 | 0 | 0 | 24 | 164 |
| 4 | 754 | 49 | applied 431/431 | 178 | 1 | 0 | 2 | 181 |
| 5 | 737 | 62 | applied 431/431 | 156 | 0 | 0 | 7 | 163 |
| 6 | 805 | 51 | applied 431/431 | 189 | 1 | 0 | 1 | 191 |
| 7 | 349 | 50 | applied 431/431 | 82 | 0 | 0 | 68 | 150 |
| 8 | 631 | 52 | applied 431/431 | 124 | 0 | 0 | 51 | 175 |
| 9 | 1119 | 77 | applied 431/431 | 166 | 0 | 0 | 13 | 179 |
| 10 | 1115 | 61 | applied 431/431 | 165 | 1 | 0 | 1 | 167 |
| 11 | 938 | 76 | applied 431/431 | 139 | 0 | 0 | 36 | 175 |
| 12 | 964 | 71 | applied 431/431 | 175 | 1 | 0 | 5 | 181 |
| 13 | 790 | 76 | applied 431/431 | 146 | 0 | 0 | 17 | 163 |
| 14 | 981 | 70 | applied 431/431 | 188 | 1 | 0 | 2 | 191 |
| 15 | 477 | 72 | applied 431/431 | 96 | 0 | 0 | 62 | 158 |
| 16 | 620 | 52 | applied 431/431 | 132 | 0 | 0 | 36 | 168 |
| repeat | 785 | 75 | applied 431/431 | 152 | 0 | 0 | 0 | 152 |
| TOTAL | — | — | — | 2796 | 6 | 0 | 402 | 3204 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1330 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-monetisation.spec.ts (16 tests); Not repeated: e2e/admin-screening.spec.ts (27 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-promote.spec.ts (4 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/dialogs.spec.ts (7 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/sage-ad-page.spec.ts (9 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Repeat: each 2 on both projects; 430 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 13 repeated; importers of a changed helper: 0 of 17
- Database session samples during each start (INC-944): smoke 8, email 6, 1 7, 2 9, 3 9, 4 4, 5 7, 6 5, 7 4, 8 5, 9 9, 10 6, 11 9, 12 8, 13 9, 14 8, 15 8, 16 5, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42562258710-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42562258710-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42562258710-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42562258710-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42562258710-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42562258710-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42562258710-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42562258710-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42562258710-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42562258710-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42562258710-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42562258710-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42562258710-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-16
  - repeat: [e2e:teardown] deleted 6 user(s) owned by process 42562258710-local-repeat
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
RLS on 91 of 91 public tables
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

## Lane 2
- Step failure:
Step smoke: outcome failure
  
- admin-guides.spec.ts / Admin › the Guide on every block (P-1c, D313) / AG-1 every admin section draws; every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveCount[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-19 INC-1080: an ad on a level opens its Edit's photo box at the ad's own cap, never the schema's baseline / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 6
- Step failure:
Step smoke: outcome failure
  
- post-wizard-place.spec.ts / POSTING WIZARD / PW-193 an ad at nationwide reach has room for a second city and says no city limit / mobile-360 — Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-guides.spec.ts / Admin › the Guide on every block (P-1c, D313) / AG-1 every admin section draws; every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveCount[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 12
- Step failure:
Step smoke: outcome failure
  
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-19 INC-1080: an ad on a level opens its Edit's photo box at the ad's own cap, never the schema's baseline / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 14
- Step failure:
Step smoke: outcome failure
  
- post-wizard-place.spec.ts / POSTING WIZARD / PW-193 an ad at nationwide reach has room for a second city and says no city limit / desktop-1280 — Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
