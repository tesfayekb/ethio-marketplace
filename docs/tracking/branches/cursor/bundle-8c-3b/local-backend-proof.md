# Local backend proof (non-gating)

- Commit: `534626ccb1274b5cd4da7cda2b81c2e730ba9b75`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46145197126

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 482 | 70 | applied 565/565 | 40 | 0 | 0 | 16 | 56 |
| email | 198 | 69 | applied 565/565 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1011 | 87 | applied 565/565 | 79 | 0 | 1 | 24 | 104 |
| 1 | 573 | 57 | applied 565/565 | 229 | 0 | 0 | 69 | 298 |
| 2 | 844 | 70 | applied 565/565 | 56 | 0 | 0 | 28 | 84 |
| 3 | 693 | 67 | applied 565/565 | 80 | 0 | 0 | 28 | 108 |
| 4 | 656 | 67 | applied 565/565 | 111 | 0 | 0 | 9 | 120 |
| 5 | 694 | 88 | applied 565/565 | 94 | 0 | 0 | 16 | 110 |
| 6 | 635 | 65 | applied 565/565 | 207 | 0 | 0 | 7 | 214 |
| 7 | 672 | 71 | applied 565/565 | 207 | 0 | 0 | 9 | 216 |
| 8 | 598 | 66 | applied 565/565 | 175 | 0 | 0 | 53 | 228 |
| 9 | 727 | 87 | applied 565/565 | 136 | 0 | 0 | 0 | 136 |
| 10 | 659 | 68 | applied 565/565 | 234 | 0 | 0 | 1 | 235 |
| 11 | 770 | 87 | applied 565/565 | 167 | 0 | 0 | 21 | 188 |
| 12 | 676 | 72 | applied 565/565 | 171 | 0 | 0 | 41 | 212 |
| 13 | 663 | 70 | applied 565/565 | 158 | 0 | 0 | 4 | 162 |
| 14 | 616 | 66 | applied 565/565 | 145 | 0 | 0 | 7 | 152 |
| 15 | 565 | 65 | applied 565/565 | 190 | 0 | 0 | 28 | 218 |
| 16 | 613 | 66 | applied 565/565 | 214 | 0 | 1 | 59 | 274 |
| repeat | 800 | 67 | applied 565/565 | 114 | 0 | 0 | 2 | 116 |
| TOTAL | — | — | — | 2813 | 0 | 2 | 422 | 3237 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 1011 s
- Repeat lane (DEC-283): Not repeated: e2e/import-security.spec.ts (18 tests); Repeat cost: weights from run 46131049264 (2026-11-28), docs/tracking/branches/cursor/bundle-8c-3a/lane-weights.json at evidence 460b4bcbb (run 46131049264; 0 of 5 files unread); mean 12.6 s a repeated test, 366.7 s a repetition at one worker; WebKit tests costed by their file's mobile-360 measure; 0 test-project measures at the weights' median 2.8 s; Repeat: each 2 on both projects; 47 tests selected, 29 repeated; budget 814 s at 12.6 s a test; directly changed: 2 of 3 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 1 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 8, email 8, webkit 11, 1 6, 2 8, 3 7, 4 7, 5 12, 6 7, 7 8, 8 7, 9 11, 10 7, 11 11, 12 9, 13 7, 14 7, 15 7, 16 7, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 127 files, weights from run 46131049264 (2026-11-28), docs/tracking/branches/cursor/bundle-8c-3a/lane-weights.json at evidence 460b4bcbb (run 46131049264; 0 of 5 files unread); mean 813 s, largest 814 s (+0 %); alone: none; unweighed (median 44 s): none; repeat budget 814 s; planned/test seconds: 1 812/418, 2 813/661, 3 814/538, 4 812/449, 5 813/490, 6 814/422, 7 813/484, 8 813/438, 9 812/516, 10 813/447, 11 813/566, 12 812/480, 13 812/477, 14 812/457, 15 813/388, 16 813/458
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 46145197126-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 46145197126-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 46145197126-local-webkit
  - 1: [e2e:teardown] deleted 11 user(s) owned by process 46145197126-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 46145197126-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 46145197126-local-3
  - 4: [e2e:teardown] deleted 3 user(s) owned by process 46145197126-local-4
  - 5: [e2e:teardown] deleted 49 user(s) owned by process 46145197126-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 46145197126-local-6
  - 7: [e2e:teardown] deleted 5 user(s) owned by process 46145197126-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 46145197126-local-8
  - 9: [e2e:teardown] deleted 25 user(s) owned by process 46145197126-local-9
  - 10: [e2e:teardown] deleted 9 user(s) owned by process 46145197126-local-10
  - 11: [e2e:teardown] deleted 9 user(s) owned by process 46145197126-local-11
  - 12: [e2e:teardown] deleted 23 user(s) owned by process 46145197126-local-12
  - 13: [e2e:teardown] deleted 8 user(s) owned by process 46145197126-local-13
  - 14: [e2e:teardown] deleted 23 user(s) owned by process 46145197126-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 46145197126-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 46145197126-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 46145197126-local-repeat
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
RLS on 92 of 92 public tables
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

## Lane webkit
- sage-ad-page.spec.ts / Sage ad page at 390, dark / SAP-1 each tier's ad page reads its tokens (390, dark) / webkit-390 — Error: regular ad: the segment

## Lane 16
- choice-lists.spec.ts / choice lists at 1440, light / CL-E10 the account menu's parts equal the other lists' (1440, light) / desktop-1280 — Error: expect(locator).toBeVisible() failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
