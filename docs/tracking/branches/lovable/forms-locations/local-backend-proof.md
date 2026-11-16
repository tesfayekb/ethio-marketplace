# Local backend proof (non-gating)

- Commit: `8bdfe235751ddf6cf38bd9827d85c3ed347930c6`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43849416511

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 377 | 60 | applied 499/499 | 27 | 0 | 0 | 5 | 32 |
| email | 209 | 66 | applied 499/499 | 6 | 0 | 0 | 0 | 6 |
| webkit | 775 | 71 | applied 499/499 | 70 | 0 | 0 | 24 | 94 |
| 1 | 522 | 62 | applied 499/499 | 188 | 0 | 0 | 69 | 257 |
| 2 | 505 | 61 | applied 499/499 | 174 | 0 | 0 | 26 | 200 |
| 3 | 523 | 62 | applied 499/499 | 169 | 0 | 0 | 5 | 174 |
| 4 | 506 | 53 | applied 499/499 | 137 | 0 | 0 | 5 | 142 |
| 5 | 550 | 63 | applied 499/499 | 93 | 0 | 0 | 1 | 94 |
| 6 | 480 | 51 | applied 499/499 | 153 | 0 | 0 | 41 | 194 |
| 7 | 487 | 60 | applied 499/499 | 147 | 0 | 0 | 77 | 224 |
| 8 | 506 | 63 | applied 499/499 | 179 | 0 | 0 | 7 | 186 |
| 9 | 505 | 63 | applied 499/499 | 123 | 0 | 0 | 1 | 124 |
| 10 | 472 | 61 | applied 499/499 | 160 | 0 | 0 | 2 | 162 |
| 11 | 611 | 69 | applied 499/499 | 120 | 0 | 0 | 8 | 128 |
| 12 | 502 | 61 | applied 499/499 | 164 | 0 | 0 | 19 | 183 |
| 13 | 470 | 62 | applied 499/499 | 157 | 0 | 0 | 9 | 166 |
| 14 | 522 | 63 | applied 499/499 | 183 | 0 | 0 | 5 | 188 |
| 15 | 559 | 61 | applied 499/499 | 124 | 0 | 0 | 8 | 132 |
| 16 | 642 | 80 | applied 499/499 | 172 | 0 | 0 | 48 | 220 |
| repeat | 980 | 81 | applied 499/499 | 92 | 0 | 0 | 22 | 114 |
| TOTAL | — | — | — | 2638 | 0 | 0 | 382 | 3020 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 980 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 19 tests selected, 19 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-10 tones: retired is destructive, active is secondary, a level badge is outline / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-11 one read per country: filtering costs no request, switching the market costs exactly one / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-12 transfer scope: exports and the import title follow the selected country / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-14 market state and whole-country parent follow the selected market / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-15 an imported place name is in the name table after commit and gone after undo / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-16 the row's actions: Edit, a red Delete and the menu's verbs open the editor's own dialogs / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-4 path rule: retiring a scratch region hides its active descendants from the public tree / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-7b the editor round-trips a row without dropping a stored field / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror) / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-9a roster shape, table twin: the edit icon sits in the end column with pagination / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / LT-9b roster shape, card twin: the edit icon sits inline beside the path line / desktop-1280; Not repeated (time cap): admin-locations.spec.ts / L2a locations console / OV-1 overview totals, links and group breadcrumbs / desktop-1280
- Database session samples during each start (INC-944): smoke 6, email 7, webkit 8, 1 6, 2 6, 3 6, 4 5, 5 6, 6 5, 7 6, 8 6, 9 6, 10 6, 11 7, 12 6, 13 6, 14 7, 15 6, 16 10, repeat 10
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/330, 2 641/329, 3 641/342, 4 640/352, 5 640/372, 6 641/333, 7 641/318, 8 641/346, 9 641/346, 10 643/321, 11 640/413, 12 641/351, 13 640/301, 14 641/353, 15 641/382, 16 641/443
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43849416511-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43849416511-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43849416511-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43849416511-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43849416511-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43849416511-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43849416511-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43849416511-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43849416511-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43849416511-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43849416511-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43849416511-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43849416511-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43849416511-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43849416511-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43849416511-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43849416511-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43849416511-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43849416511-local-16
  - repeat: not found
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

## Lane repeat
- Outside test — Timed out waiting 763s for the test suite to run
- Outside test — Timed out waiting 763s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
