# Local backend proof (non-gating)

- Commit: `d3e08ea0c84e7c32a3515db16e3d897390601484`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43673418709

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 451 | 74 | applied 475/475 | 27 | 0 | 0 | 5 | 32 |
| email | 202 | 64 | applied 475/475 | 6 | 0 | 0 | 0 | 6 |
| webkit | 590 | 60 | applied 475/475 | 70 | 0 | 0 | 24 | 94 |
| 1 | 568 | 78 | applied 475/475 | 188 | 0 | 0 | 69 | 257 |
| 2 | 468 | 51 | applied 475/475 | 174 | 0 | 0 | 26 | 200 |
| 3 | 609 | 65 | applied 475/475 | 169 | 0 | 0 | 5 | 174 |
| 4 | 665 | 78 | applied 475/475 | 137 | 0 | 0 | 5 | 142 |
| 5 | 598 | 78 | applied 475/475 | 93 | 0 | 0 | 1 | 94 |
| 6 | 570 | 63 | applied 475/475 | 153 | 0 | 0 | 41 | 194 |
| 7 | 653 | 78 | applied 475/475 | 146 | 0 | 1 | 77 | 224 |
| 8 | 509 | 54 | applied 475/475 | 179 | 0 | 0 | 7 | 186 |
| 9 | 489 | 61 | applied 475/475 | 123 | 0 | 0 | 1 | 124 |
| 10 | 604 | 77 | applied 475/475 | 160 | 0 | 0 | 2 | 162 |
| 11 | 531 | 53 | applied 475/475 | 120 | 0 | 0 | 8 | 128 |
| 12 | 676 | 77 | applied 475/475 | 164 | 0 | 0 | 19 | 183 |
| 13 | 556 | 68 | applied 475/475 | 157 | 0 | 0 | 9 | 166 |
| 14 | 549 | 64 | applied 475/475 | 183 | 0 | 0 | 5 | 188 |
| 15 | 522 | 59 | applied 475/475 | 124 | 0 | 0 | 8 | 132 |
| 16 | 547 | 62 | applied 475/475 | 172 | 0 | 0 | 48 | 220 |
| repeat | 397 | 64 | applied 475/475 | 100 | 0 | 0 | 0 | 100 |
| TOTAL | — | — | — | 2645 | 0 | 1 | 360 | 3006 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 12 676 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Repeat: each 2 on both projects; 72 tests selected, 25 repeated; budget 643 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 8, email 7, webkit 6, 1 10, 2 5, 3 7, 4 10, 5 10, 6 7, 7 9, 8 5, 9 6, 10 10, 11 5, 12 10, 13 8, 14 7, 15 6, 16 7, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/380, 2 641/320, 3 641/416, 4 640/473, 5 640/404, 6 641/380, 7 641/452, 8 641/352, 9 641/339, 10 643/416, 11 640/377, 12 641/479, 13 640/364, 14 641/367, 15 641/372, 16 641/365
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43673418709-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43673418709-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43673418709-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43673418709-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43673418709-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43673418709-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43673418709-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43673418709-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43673418709-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43673418709-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43673418709-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43673418709-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43673418709-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43673418709-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43673418709-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43673418709-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43673418709-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43673418709-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43673418709-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 43673418709-local-repeat
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

## Lane 7
- choice-lists.spec.ts / choice lists at 360, light / CL-E10 the account menu's parts equal the other lists' (360, light) / mobile-360 — Error: expect(locator).toBeHidden() failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
