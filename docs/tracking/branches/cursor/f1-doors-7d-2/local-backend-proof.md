# Local backend proof (non-gating)

- Commit: `b8eb0ea9b3d2347ad8b028ce8a51ab3497d94529`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44762889388

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 399 | 68 | applied 544/544 | 27 | 0 | 0 | 5 | 32 |
| email | 194 | 57 | applied 544/544 | 6 | 0 | 0 | 0 | 6 |
| webkit | 677 | 66 | applied 544/544 | 72 | 0 | 0 | 24 | 96 |
| 1 | 511 | 68 | applied 544/544 | 188 | 0 | 0 | 69 | 257 |
| 2 | 497 | 66 | applied 544/544 | 174 | 0 | 0 | 26 | 200 |
| 3 | 697 | 87 | applied 544/544 | 169 | 0 | 0 | 5 | 174 |
| 4 | 494 | 65 | applied 544/544 | 137 | 0 | 0 | 5 | 142 |
| 5 | 533 | 67 | applied 544/544 | 93 | 0 | 0 | 1 | 94 |
| 6 | 518 | 65 | applied 544/544 | 153 | 0 | 0 | 41 | 194 |
| 7 | 695 | 88 | applied 544/544 | 148 | 0 | 1 | 77 | 226 |
| 8 | 616 | 75 | applied 544/544 | 179 | 0 | 0 | 7 | 186 |
| 9 | 716 | 87 | applied 544/544 | 127 | 2 | 0 | 1 | 130 |
| 10 | 680 | 88 | applied 544/544 | 160 | 0 | 0 | 2 | 162 |
| 11 | 1079 | 74 | applied 544/544 | 120 | 0 | 0 | 8 | 128 |
| 12 | 526 | 68 | applied 544/544 | 164 | 0 | 0 | 19 | 183 |
| 13 | 476 | 65 | applied 544/544 | 157 | 0 | 0 | 9 | 166 |
| 14 | 507 | 65 | applied 544/544 | 183 | 0 | 0 | 5 | 188 |
| 15 | 590 | 68 | applied 544/544 | 124 | 0 | 0 | 8 | 132 |
| 16 | 636 | 80 | applied 544/544 | 172 | 0 | 0 | 48 | 220 |
| repeat | 1059 | 60 | applied 544/544 | 96 | 5 | 0 | 31 | 132 |
| TOTAL | — | — | — | 2649 | 7 | 1 | 391 | 3048 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 11 1079 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 22 tests selected, 22 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 1 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 7, email 6, webkit 7, 1 7, 2 7, 3 11, 4 7, 5 7, 6 7, 7 12, 8 9, 9 11, 10 12, 11 8, 12 7, 13 7, 14 7, 15 7, 16 10, repeat 6
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/333, 2 641/313, 3 641/482, 4 640/318, 5 640/372, 6 641/349, 7 641/490, 8 641/411, 9 641/488, 10 643/435, 11 640/406, 12 641/356, 13 640/298, 14 641/313, 15 641/390, 16 641/426
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44762889388-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44762889388-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44762889388-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44762889388-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44762889388-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44762889388-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44762889388-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44762889388-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44762889388-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44762889388-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44762889388-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44762889388-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 44762889388-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44762889388-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44762889388-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44762889388-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44762889388-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44762889388-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44762889388-local-16
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

## Lane 7
- legal-admin.spec.ts / Admin Legal / LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused / mobile-360 — Test timeout of 60000ms exceeded.

## Lane 9
- Step failure:
Step smoke: outcome failure
  
- auth-signout.spec.ts / D189 deactivated session / SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) / mobile-360 — Error: expect(page).toHaveURL(expected) failed
- auth-signout.spec.ts / D189 deactivated session / SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) / desktop-1280 — Error: expect(page).toHaveURL(expected) failed

## Lane repeat
- Step failure:
Step smoke: outcome failure
  repeat-cap: failed
- auth-signout.spec.ts / D189 deactivated session / SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) / mobile-360 — Error: expect(page).toHaveURL(expected) failed
- auth-signout.spec.ts / D189 deactivated session / SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) / mobile-360 — Error: expect(page).toHaveURL(expected) failed
- auth-signout.spec.ts / D189 deactivated session / SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) / mobile-360 — Error: expect(page).toHaveURL(expected) failed
- auth-signout.spec.ts / D189 deactivated session / SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) / desktop-1280 — Error: expect(page).toHaveURL(expected) failed
- auth-signout.spec.ts / D189 deactivated session / SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) / desktop-1280 — Error: expect(page).toHaveURL(expected) failed
- Outside test — Timed out waiting 763s for the test suite to run
- Outside test — Timed out waiting 763s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
