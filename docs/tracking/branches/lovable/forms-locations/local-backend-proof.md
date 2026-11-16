# Local backend proof (non-gating)

- Commit: `57da63859d78c30e1f7e3f5b7c40d7dd4f1f3b1b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43846036222

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 393 | 61 | applied 499/499 | 27 | 0 | 0 | 5 | 32 |
| email | 215 | 69 | applied 499/499 | 6 | 0 | 0 | 0 | 6 |
| webkit | 667 | 60 | applied 499/499 | 70 | 0 | 0 | 24 | 94 |
| 1 | 626 | 83 | applied 499/499 | 188 | 0 | 0 | 69 | 257 |
| 2 | 493 | 62 | applied 499/499 | 174 | 0 | 0 | 26 | 200 |
| 3 | 504 | 62 | applied 499/499 | 169 | 0 | 0 | 5 | 174 |
| 4 | 565 | 62 | applied 499/499 | 137 | 0 | 0 | 5 | 142 |
| 5 | 559 | 63 | applied 499/499 | 93 | 0 | 0 | 1 | 94 |
| 6 | 549 | 63 | applied 499/499 | 151 | 2 | 0 | 41 | 194 |
| 7 | 644 | 79 | applied 499/499 | 147 | 0 | 0 | 77 | 224 |
| 8 | 493 | 61 | applied 499/499 | 179 | 0 | 0 | 7 | 186 |
| 9 | 514 | 54 | applied 499/499 | 123 | 0 | 0 | 1 | 124 |
| 10 | 493 | 63 | applied 499/499 | 160 | 0 | 0 | 2 | 162 |
| 11 | 651 | 80 | applied 499/499 | 120 | 0 | 0 | 8 | 128 |
| 12 | 636 | 68 | applied 499/499 | 164 | 0 | 0 | 19 | 183 |
| 13 | 591 | 68 | applied 499/499 | 157 | 0 | 0 | 9 | 166 |
| 14 | 467 | 62 | applied 499/499 | 183 | 0 | 0 | 5 | 188 |
| 15 | 561 | 61 | applied 499/499 | 124 | 0 | 0 | 8 | 132 |
| 16 | 656 | 80 | applied 499/499 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2544 | 2 | 0 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 667 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 8, webkit 6, 1 10, 2 6, 3 6, 4 6, 5 6, 6 6, 7 10, 8 6, 9 5, 10 6, 11 10, 12 8, 13 8, 14 6, 15 6, 16 10, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/404, 2 641/323, 3 641/346, 4 640/382, 5 640/377, 6 641/375, 7 641/444, 8 641/334, 9 641/347, 10 643/320, 11 640/452, 12 641/450, 13 640/372, 14 641/326, 15 641/378, 16 641/450
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43846036222-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43846036222-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43846036222-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43846036222-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43846036222-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43846036222-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43846036222-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43846036222-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43846036222-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43846036222-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43846036222-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43846036222-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43846036222-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43846036222-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43846036222-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43846036222-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43846036222-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43846036222-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43846036222-local-16
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

## Lane 6
- Step failure:
Step smoke: outcome failure
  
- admin-locations.spec.ts / L2a locations console / LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down / desktop-1280 — Error: expect(locator).toBeVisible() failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
