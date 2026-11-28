# Local backend proof (non-gating)

- Commit: `eb11c1e77c271b455fbecf66314e10487cb67703`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46152482494

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 445 | 68 | applied 565/565 | 40 | 0 | 0 | 16 | 56 |
| email | 218 | 72 | applied 565/565 | 6 | 0 | 0 | 0 | 6 |
| webkit | 720 | 67 | applied 565/565 | 80 | 0 | 0 | 24 | 104 |
| 1 | 735 | 67 | applied 565/565 | 77 | 0 | 0 | 21 | 98 |
| 2 | 644 | 67 | applied 565/565 | 243 | 0 | 1 | 74 | 318 |
| 3 | 622 | 66 | applied 565/565 | 118 | 0 | 0 | 66 | 184 |
| 4 | 698 | 67 | applied 565/565 | 139 | 0 | 0 | 15 | 154 |
| 5 | 720 | 76 | applied 565/565 | 101 | 0 | 0 | 9 | 110 |
| 6 | 586 | 68 | applied 565/565 | 207 | 0 | 0 | 59 | 266 |
| 7 | 733 | 86 | applied 565/565 | 168 | 0 | 0 | 2 | 170 |
| 8 | 589 | 68 | applied 565/565 | 110 | 0 | 0 | 14 | 124 |
| 9 | 586 | 67 | applied 565/565 | 135 | 0 | 0 | 9 | 144 |
| 10 | 782 | 89 | applied 565/565 | 201 | 0 | 0 | 1 | 202 |
| 11 | 671 | 71 | applied 565/565 | 193 | 0 | 0 | 3 | 196 |
| 12 | 621 | 67 | applied 565/565 | 180 | 0 | 0 | 78 | 258 |
| 13 | 656 | 77 | applied 565/565 | 138 | 0 | 0 | 6 | 144 |
| 14 | 810 | 86 | applied 565/565 | 180 | 0 | 0 | 2 | 182 |
| 15 | 642 | 69 | applied 565/565 | 205 | 0 | 0 | 13 | 218 |
| 16 | 641 | 65 | applied 565/565 | 179 | 0 | 0 | 8 | 187 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2700 | 0 | 1 | 420 | 3121 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 14 810 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 7, email 8, webkit 7, 1 7, 2 7, 3 7, 4 7, 5 9, 6 7, 7 11, 8 7, 9 7, 10 12, 11 8, 12 7, 13 10, 14 11, 15 8, 16 7, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 127 files, weights from run 46145197126 (2026-11-28), docs/tracking/branches/cursor/bundle-8c-3b/lane-weights.json at evidence d9673a294 (run 46145197126; 0 of 6 files unread); mean 845 s, largest 847 s (+0 %); alone: none; unweighed (median 45 s): none; repeat budget 847 s; planned/test seconds: 1 847/571, 2 844/458, 3 846/436, 4 845/512, 5 846/522, 6 845/403, 7 844/535, 8 845/409, 9 844/426, 10 844/565, 11 847/492, 12 846/434, 13 847/453, 14 845/610, 15 846/462, 16 844/465
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 46152482494-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 46152482494-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 46152482494-local-webkit
  - 1: [e2e:teardown] deleted 5 user(s) owned by process 46152482494-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 46152482494-local-2
  - 3: [e2e:teardown] deleted 3 user(s) owned by process 46152482494-local-3
  - 4: [e2e:teardown] deleted 13 user(s) owned by process 46152482494-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 46152482494-local-5
  - 6: [e2e:teardown] deleted 18 user(s) owned by process 46152482494-local-6
  - 7: [e2e:teardown] deleted 49 user(s) owned by process 46152482494-local-7
  - 8: [e2e:teardown] deleted 7 user(s) owned by process 46152482494-local-8
  - 9: [e2e:teardown] deleted 5 user(s) owned by process 46152482494-local-9
  - 10: [e2e:teardown] deleted 3 user(s) owned by process 46152482494-local-10
  - 11: [e2e:teardown] deleted 23 user(s) owned by process 46152482494-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 46152482494-local-12
  - 13: [e2e:teardown] deleted 23 user(s) owned by process 46152482494-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 46152482494-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 46152482494-local-15
  - 16: [e2e:teardown] deleted 21 user(s) owned by process 46152482494-local-16
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

## Lane 2
- legal-admin.spec.ts / Admin Legal / LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish / desktop-1280 — Error: expect(locator).toBeVisible() failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
