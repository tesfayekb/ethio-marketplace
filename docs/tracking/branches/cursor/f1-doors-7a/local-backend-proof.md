# Local backend proof (non-gating)

- Commit: `c03e3392330cac4d437729d3a6c501237d8fef23`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44607286456

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 507 | 66 | applied 532/532 | 27 | 0 | 0 | 5 | 32 |
| email | 237 | 67 | applied 532/532 | 6 | 0 | 0 | 0 | 6 |
| webkit | 776 | 77 | applied 532/532 | 70 | 0 | 0 | 24 | 94 |
| 1 | 596 | 66 | applied 532/532 | 188 | 0 | 0 | 69 | 257 |
| 2 | 559 | 68 | applied 532/532 | 173 | 0 | 1 | 26 | 200 |
| 3 | 605 | 69 | applied 532/532 | 169 | 0 | 0 | 5 | 174 |
| 4 | 863 | 64 | applied 532/532 | 137 | 0 | 0 | 5 | 142 |
| 5 | 563 | 70 | applied 532/532 | 93 | 0 | 0 | 1 | 94 |
| 6 | 561 | 66 | applied 532/532 | 153 | 0 | 0 | 41 | 194 |
| 7 | 471 | 55 | applied 532/532 | 148 | 0 | 1 | 77 | 226 |
| 8 | 523 | 66 | applied 532/532 | 179 | 0 | 0 | 7 | 186 |
| 9 | 676 | 66 | applied 532/532 | 123 | 0 | 0 | 1 | 124 |
| 10 | 657 | 67 | applied 532/532 | 160 | 0 | 0 | 2 | 162 |
| 11 | 612 | 68 | applied 532/532 | 120 | 0 | 0 | 8 | 128 |
| 12 | 546 | 59 | applied 532/532 | 164 | 0 | 0 | 19 | 183 |
| 13 | 518 | 66 | applied 532/532 | 157 | 0 | 0 | 9 | 166 |
| 14 | 503 | 57 | applied 532/532 | 183 | 0 | 0 | 5 | 188 |
| 15 | 830 | 67 | applied 532/532 | 124 | 0 | 0 | 8 | 132 |
| 16 | 640 | 69 | applied 532/532 | 172 | 0 | 0 | 48 | 220 |
| repeat | 340 | 67 | applied 532/532 | 104 | 0 | 0 | 0 | 104 |
| TOTAL | — | — | — | 2650 | 0 | 2 | 360 | 3012 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 4 863 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (52 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (10 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 194 tests selected, 26 repeated; budget 643 s at 4.7 s a test; directly changed: 3 of 10 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 7, email 7, webkit 10, 1 7, 2 8, 3 8, 4 7, 5 8, 6 7, 7 6, 8 7, 9 7, 10 7, 11 7, 12 6, 13 7, 14 6, 15 7, 16 7, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/336, 2 641/367, 3 641/408, 4 640/323, 5 640/381, 6 641/348, 7 641/315, 8 641/343, 9 641/328, 10 643/328, 11 640/352, 12 641/380, 13 640/300, 14 641/344, 15 641/378, 16 641/345
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44607286456-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44607286456-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44607286456-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44607286456-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44607286456-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44607286456-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44607286456-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44607286456-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44607286456-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44607286456-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44607286456-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44607286456-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 44607286456-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44607286456-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44607286456-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44607286456-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44607286456-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44607286456-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44607286456-local-16
  - repeat: [e2e:teardown] deleted 18 user(s) owned by process 44607286456-local-repeat
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

## Lane 2
- submenu-look.spec.ts / D248 a side panel is the main menu / SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254) / desktop-1280 — Error: SMN-E13 the panel scrolls

## Lane 7
- legal-admin.spec.ts / Admin Legal / LGA-1 Legal cards, facts and the permission-gated admin menu / desktop-1280 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
