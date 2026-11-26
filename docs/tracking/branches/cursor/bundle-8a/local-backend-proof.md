# Local backend proof (non-gating)

- Commit: `12a75352054d6727e09c3d4b7f820f0854acb239`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45889572597

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 587 | 57 | applied 563/563 | 38 | 0 | 0 | 16 | 54 |
| email | 203 | 65 | applied 563/563 | 6 | 0 | 0 | 0 | 6 |
| webkit | 881 | 67 | applied 563/563 | 80 | 0 | 0 | 24 | 104 |
| 1 | 900 | 68 | applied 563/563 | 228 | 0 | 0 | 70 | 298 |
| 2 | 868 | 87 | applied 563/563 | 92 | 1 | 0 | 29 | 122 |
| 3 | 743 | 71 | applied 563/563 | 75 | 0 | 0 | 71 | 146 |
| 4 | 670 | 70 | applied 563/563 | 152 | 0 | 0 | 12 | 164 |
| 5 | 1259 | 66 | applied 563/563 | 146 | 0 | 0 | 8 | 154 |
| 6 | 1328 | 72 | applied 563/563 | 131 | 0 | 0 | 15 | 146 |
| 7 | 1171 | 68 | applied 563/563 | 193 | 0 | 0 | 11 | 204 |
| 8 | 967 | 71 | applied 563/563 | 137 | 0 | 0 | 5 | 142 |
| 9 | 643 | 66 | applied 563/563 | 218 | 0 | 0 | 6 | 224 |
| 10 | 1257 | 67 | applied 563/563 | 165 | 0 | 0 | 41 | 206 |
| 11 | 1731 | 65 | applied 563/563 | 134 | 0 | 0 | 20 | 154 |
| 12 | 1075 | 68 | applied 563/563 | 183 | 0 | 0 | 15 | 198 |
| 13 | 847 | 68 | applied 563/563 | 126 | 0 | 0 | 12 | 138 |
| 14 | 1292 | 58 | applied 563/563 | 166 | 0 | 0 | 7 | 173 |
| 15 | 1167 | 69 | applied 563/563 | 147 | 1 | 0 | 8 | 156 |
| 16 | 910 | 58 | applied 563/563 | 270 | 0 | 0 | 48 | 318 |
| repeat | 1113 | 69 | applied 563/563 | 18 | 1 | 0 | 133 | 152 |
| TOTAL | — | — | — | 2705 | 3 | 0 | 551 | 3259 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 11 1731 s
- Repeat lane (DEC-283): Not repeated: e2e/failure-crawl-member-public.spec.ts (7 tests); Not repeated: e2e/failure-crawl-public.spec.ts (13 tests); Repeat: each 2 on both projects; 58 tests selected, 38 repeated; budget 793 s at 4.7 s a test; directly changed: 5 of 7 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 6, email 7, webkit 7, 1 7, 2 11, 3 8, 4 8, 5 7, 6 9, 7 7, 8 8, 9 7, 10 7, 11 7, 12 7, 13 7, 14 6, 15 7, 16 6, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 125 files, weights from run 43431755160 (2026-11-13); mean 792 s, largest 793 s (+0 %); alone: none; unweighed (median 46 s): none; repeat budget 793 s; planned/test seconds: 1 793/715, 2 792/659, 3 792/552, 4 793/470, 5 792/1079, 6 792/1139, 7 793/988, 8 793/770, 9 792/479, 10 792/1101, 11 793/1558, 12 793/884, 13 792/659, 14 793/1135, 15 792/973, 16 793/747
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45889572597-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45889572597-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 45889572597-local-2
  - 3: [e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-3
  - 4: [e2e:teardown] deleted 11 user(s) owned by process 45889572597-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-6
  - 7: [e2e:teardown] deleted 5 user(s) owned by process 45889572597-local-7
  - 8: [e2e:teardown] deleted 23 user(s) owned by process 45889572597-local-8
  - 9: [e2e:teardown] deleted 15 user(s) owned by process 45889572597-local-9
  - 10: [e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45889572597-local-12
  - 13: [e2e:teardown] deleted 27 user(s) owned by process 45889572597-local-13
  - 14: [e2e:teardown] deleted 17 user(s) owned by process 45889572597-local-14
  - 15: [e2e:teardown] deleted 47 user(s) owned by process 45889572597-local-15
  - 16: [e2e:teardown] deleted 12 user(s) owned by process 45889572597-local-16
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

## Lane 2
- Step failure:
Step smoke: outcome failure
  
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read / mobile-360 — Error: [e2e:crawl] no legal_versions row where status = published

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- failure-crawl-member-account.spec.ts / FAILURE CRAWL — the member's account pages (DEC-459 c) / FCR-32 /account/legal/$versionId as member: loads clean and says every failed read / mobile-360 — Error: [e2e:crawl] no legal_versions row where status = published

## Lane repeat
- Step failure:
Step smoke: outcome failure
  repeat-cap: failed
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read / mobile-360 — Error: [e2e:crawl] no legal_versions row where status = published
- Outside test — Timed out waiting 913s for the test suite to run
- Outside test — Timed out waiting 913s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
