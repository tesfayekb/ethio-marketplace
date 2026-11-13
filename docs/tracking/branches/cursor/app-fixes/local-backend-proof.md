# Local backend proof (non-gating)

- Commit: `ddfc6fb0802c880ae6a527dfffc575ee7a63bb5e`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43484667160

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 171 | 51 | applied 437/437 | 4 | 0 | 0 | 0 | 4 |
| email | 208 | 74 | applied 437/437 | 6 | 0 | 0 | 0 | 6 |
| webkit | 841 | 78 | applied 437/437 | 70 | 0 | 0 | 24 | 94 |
| 1 | 757 | 56 | applied 437/437 | 188 | 0 | 0 | 69 | 257 |
| 2 | 712 | 51 | applied 437/437 | 174 | 0 | 0 | 26 | 200 |
| 3 | 903 | 71 | applied 437/437 | 169 | 0 | 0 | 5 | 174 |
| 4 | 825 | 61 | applied 437/437 | 137 | 0 | 0 | 5 | 142 |
| 5 | 850 | 70 | applied 437/437 | 97 | 0 | 0 | 1 | 98 |
| 6 | 893 | 77 | applied 437/437 | 153 | 0 | 0 | 41 | 194 |
| 7 | 778 | 62 | applied 437/437 | 147 | 0 | 0 | 77 | 224 |
| 8 | 901 | 71 | applied 437/437 | 181 | 0 | 0 | 7 | 188 |
| 9 | 792 | 55 | applied 437/437 | 124 | 0 | 0 | 2 | 126 |
| 10 | 716 | 51 | applied 437/437 | 164 | 0 | 0 | 2 | 166 |
| 11 | 955 | 76 | applied 437/437 | 120 | 0 | 0 | 8 | 128 |
| 12 | 866 | 70 | applied 437/437 | 164 | 0 | 0 | 19 | 183 |
| 13 | 787 | 72 | applied 437/437 | 157 | 0 | 0 | 9 | 166 |
| 14 | 868 | 74 | applied 437/437 | 183 | 0 | 0 | 5 | 188 |
| 15 | 930 | 75 | applied 437/437 | 124 | 0 | 0 | 8 | 132 |
| 16 | 989 | 82 | applied 437/437 | 172 | 0 | 0 | 48 | 220 |
| repeat | 1028 | 76 | applied 437/437 | 101 | 0 | 0 | 7 | 108 |
| TOTAL | — | — | — | 2635 | 0 | 0 | 363 | 2998 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 1028 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 18 tests selected, 18 repeated; budget 643 s at 4.7 s a test; directly changed: 2 of 2 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 2 of the repeated tests, on webkit-1280 and webkit-390; Not repeated (time cap): dialogs.spec.ts / one dialog look on a real surface (turn S6-1) / DLG-E9 a small panel opened from state gives the focus back to its opener, by Escape and by its close button / webkit-390; Not repeated (time cap): dialogs.spec.ts / the full-screen surfaces on the one primitive (turn S6-4) / DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected / webkit-390
- Database session samples during each start (INC-944): smoke 5, email 9, webkit 10, 1 6, 2 5, 3 8, 4 6, 5 8, 6 9, 7 7, 8 8, 9 5, 10 5, 11 9, 12 8, 13 8, 14 9, 15 9, 16 10, repeat 9
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/592, 2 641/558, 3 641/718, 4 640/642, 5 640/655, 6 641/702, 7 641/599, 8 641/706, 9 641/629, 10 643/564, 11 640/750, 12 641/692, 13 640/601, 14 641/684, 15 641/704, 16 641/765
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43484667160-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43484667160-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43484667160-local-webkit
  - 1: [e2e:teardown] deleted 2 user(s) owned by process 43484667160-local-1
  - 2: [e2e:teardown] deleted 8 user(s) owned by process 43484667160-local-2
  - 3: [e2e:teardown] deleted 4 user(s) owned by process 43484667160-local-3
  - 4: [e2e:teardown] deleted 24 user(s) owned by process 43484667160-local-4
  - 5: [e2e:teardown] deleted 14 user(s) owned by process 43484667160-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 43484667160-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 43484667160-local-7
  - 8: [e2e:teardown] deleted 7 user(s) owned by process 43484667160-local-8
  - 9: [e2e:teardown] deleted 12 user(s) owned by process 43484667160-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 43484667160-local-10
  - 11: [e2e:teardown] deleted 2 user(s) owned by process 43484667160-local-11
  - 12: [e2e:teardown] deleted 4 user(s) owned by process 43484667160-local-12
  - 13: [e2e:teardown] deleted 2 user(s) owned by process 43484667160-local-13
  - 14: [e2e:teardown] deleted 10 user(s) owned by process 43484667160-local-14
  - 15: [e2e:teardown] deleted 42 user(s) owned by process 43484667160-local-15
  - 16: [e2e:teardown] deleted 22 user(s) owned by process 43484667160-local-16
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
