# Local backend proof (non-gating)

- Commit: `be7458c0e3b7faa578f0de01e1353588c880b44d`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45226805289

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 513 | 86 | applied 553/553 | 38 | 0 | 0 | 16 | 54 |
| email | 214 | 66 | applied 553/553 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1014 | 89 | applied 553/553 | 80 | 0 | 0 | 24 | 104 |
| 1 | 805 | 66 | applied 553/553 | 192 | 0 | 0 | 69 | 261 |
| 2 | 997 | 67 | applied 553/553 | 169 | 0 | 0 | 21 | 190 |
| 3 | 629 | 66 | applied 553/553 | 169 | 0 | 0 | 5 | 174 |
| 4 | 709 | 67 | applied 553/553 | 137 | 0 | 0 | 5 | 142 |
| 5 | 615 | 68 | applied 553/553 | 93 | 0 | 0 | 1 | 94 |
| 6 | 577 | 67 | applied 553/553 | 159 | 0 | 0 | 41 | 200 |
| 7 | 513 | 67 | applied 553/553 | 149 | 0 | 0 | 77 | 226 |
| 8 | 508 | 65 | applied 553/553 | 179 | 0 | 0 | 7 | 186 |
| 9 | 816 | 68 | applied 553/553 | 129 | 0 | 0 | 1 | 130 |
| 10 | 609 | 71 | applied 553/553 | 176 | 0 | 0 | 2 | 178 |
| 11 | 641 | 68 | applied 553/553 | 126 | 0 | 0 | 8 | 134 |
| 12 | 575 | 68 | applied 553/553 | 163 | 0 | 0 | 18 | 181 |
| 13 | 552 | 76 | applied 553/553 | 156 | 0 | 0 | 8 | 164 |
| 14 | 527 | 65 | applied 553/553 | 187 | 0 | 0 | 3 | 190 |
| 15 | 942 | 67 | applied 553/553 | 128 | 0 | 0 | 6 | 134 |
| 16 | 713 | 87 | applied 553/553 | 172 | 0 | 0 | 48 | 220 |
| repeat | 1671 | 68 | applied 553/553 | 112 | 0 | 0 | 8 | 120 |
| TOTAL | — | — | — | 2720 | 0 | 0 | 368 | 3088 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 1671 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-translations-console.spec.ts (23 tests); Not repeated: e2e/settings.spec.ts (13 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-listings.spec.ts (41 tests); Not repeated: e2e/admin-locations.spec.ts (22 tests); Not repeated: e2e/admin-screening.spec.ts (32 tests); Not repeated: e2e/admin-translations-governance.spec.ts (10 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (12 tests); Repeat: each 2 on both projects; 232 tests selected, 30 repeated; budget 643 s at 4.7 s a test; directly changed: 2 of 5 repeated; importers of a changed helper: 2 of 9; Repeat in WebKit (DEC-371): 1 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 1 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 11, email 7, webkit 12, 1 7, 2 7, 3 7, 4 7, 5 7, 6 7, 7 7, 8 7, 9 7, 10 8, 11 7, 12 7, 13 9, 14 7, 15 7, 16 11, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/332, 2 641/339, 3 641/361, 4 640/375, 5 640/371, 6 641/340, 7 641/319, 8 641/342, 9 641/389, 10 643/413, 11 640/365, 12 641/363, 13 640/345, 14 641/321, 15 641/390, 16 641/439
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45226805289-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45226805289-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45226805289-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45226805289-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 45226805289-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45226805289-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45226805289-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45226805289-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45226805289-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45226805289-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 45226805289-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 45226805289-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45226805289-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45226805289-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45226805289-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45226805289-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45226805289-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45226805289-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45226805289-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 45226805289-local-repeat
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
