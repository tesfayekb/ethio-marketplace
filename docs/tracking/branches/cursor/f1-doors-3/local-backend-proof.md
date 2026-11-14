# Local backend proof (non-gating)

- Commit: `c1a8bdb595b60dbdd0ab83eabf3d5110397d6a02`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43609766468

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 449 | 63 | applied 456/456 | 27 | 0 | 0 | 5 | 32 |
| email | 223 | 77 | applied 456/456 | 6 | 0 | 0 | 0 | 6 |
| webkit | 804 | 76 | applied 456/456 | 70 | 0 | 0 | 24 | 94 |
| 1 | 476 | 59 | applied 456/456 | 188 | 0 | 0 | 69 | 257 |
| 2 | 465 | 59 | applied 456/456 | 174 | 0 | 0 | 26 | 200 |
| 3 | 530 | 51 | applied 456/456 | 169 | 0 | 0 | 5 | 174 |
| 4 | 522 | 61 | applied 456/456 | 137 | 0 | 0 | 5 | 142 |
| 5 | 520 | 58 | applied 456/456 | 93 | 0 | 0 | 1 | 94 |
| 6 | 497 | 59 | applied 456/456 | 153 | 0 | 0 | 41 | 194 |
| 7 | 475 | 58 | applied 456/456 | 147 | 0 | 0 | 77 | 224 |
| 8 | 648 | 77 | applied 456/456 | 179 | 0 | 0 | 7 | 186 |
| 9 | 544 | 63 | applied 456/456 | 123 | 0 | 0 | 1 | 124 |
| 10 | 567 | 63 | applied 456/456 | 160 | 0 | 0 | 2 | 162 |
| 11 | 642 | 78 | applied 456/456 | 120 | 0 | 0 | 8 | 128 |
| 12 | 582 | 62 | applied 456/456 | 164 | 0 | 0 | 19 | 183 |
| 13 | 487 | 57 | applied 456/456 | 156 | 0 | 1 | 9 | 166 |
| 14 | 499 | 53 | applied 456/456 | 183 | 0 | 0 | 5 | 188 |
| 15 | 531 | 61 | applied 456/456 | 124 | 0 | 0 | 8 | 132 |
| 16 | 559 | 63 | applied 456/456 | 172 | 0 | 0 | 48 | 220 |
| repeat | 895 | 59 | applied 456/456 | 108 | 0 | 0 | 0 | 108 |
| TOTAL | — | — | — | 2653 | 0 | 1 | 360 | 3014 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 895 s
- Repeat lane (DEC-283): Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (16 tests); Repeat: each 2 on both projects; 65 tests selected, 27 repeated; budget 643 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 7, email 9, webkit 9, 1 6, 2 6, 3 5, 4 6, 5 6, 6 6, 7 6, 8 9, 9 7, 10 7, 11 10, 12 7, 13 6, 14 5, 15 6, 16 7, repeat 6
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/332, 2 641/316, 3 641/368, 4 640/368, 5 640/372, 6 641/348, 7 641/324, 8 641/462, 9 641/363, 10 643/394, 11 640/443, 12 641/403, 13 640/322, 14 641/345, 15 641/379, 16 641/384
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43609766468-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43609766468-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43609766468-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43609766468-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43609766468-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43609766468-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43609766468-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43609766468-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43609766468-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43609766468-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43609766468-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43609766468-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43609766468-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43609766468-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43609766468-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43609766468-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43609766468-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43609766468-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43609766468-local-16
  - repeat: [e2e:teardown] deleted 6 user(s) owned by process 43609766468-local-repeat
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

## Lane 13
- submenu-touch.spec.ts / SMN-E3 a tap opens the page and the panel; rows fit between 32 and 48 px, panel rows the rail's / desktop-1280 — Error: SMN-E3 a panel row is at most the rail's (D248)

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
