# Local backend proof (non-gating)

- Commit: `0ce4baafcdb99db913405838d0c17349bcc654c3`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42534773334

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 907 | 51 | applied 431/431 | 205 | 0 | 1 | 70 | 276 |
| email | 206 | 64 | applied 431/431 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1109 | 80 | applied 431/431 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1343 | 79 | applied 431/431 | 190 | 0 | 0 | 1 | 191 |
| 3 | 738 | 64 | applied 431/431 | 140 | 0 | 0 | 24 | 164 |
| 4 | 836 | 60 | applied 431/431 | 178 | 0 | 0 | 2 | 180 |
| 5 | 716 | 59 | applied 431/431 | 156 | 0 | 0 | 7 | 163 |
| 6 | 758 | 50 | applied 431/431 | 189 | 0 | 0 | 1 | 190 |
| 7 | 440 | 66 | applied 431/431 | 81 | 0 | 0 | 68 | 149 |
| 8 | 730 | 74 | applied 431/431 | 123 | 0 | 0 | 50 | 173 |
| 9 | 1049 | 67 | applied 431/431 | 168 | 0 | 0 | 14 | 182 |
| 10 | 1137 | 65 | applied 431/431 | 167 | 0 | 0 | 1 | 168 |
| 11 | 848 | 65 | applied 431/431 | 139 | 0 | 0 | 36 | 175 |
| 12 | 953 | 74 | applied 431/431 | 175 | 0 | 0 | 5 | 180 |
| 13 | 800 | 78 | applied 431/431 | 146 | 0 | 0 | 17 | 163 |
| 14 | 1018 | 77 | applied 431/431 | 188 | 0 | 0 | 2 | 190 |
| 15 | 399 | 61 | applied 431/431 | 96 | 0 | 0 | 62 | 158 |
| 16 | 676 | 67 | applied 431/431 | 132 | 0 | 0 | 36 | 168 |
| repeat | 693 | 63 | applied 431/431 | 152 | 0 | 0 | 0 | 152 |
| TOTAL | — | — | — | 2799 | 0 | 1 | 402 | 3202 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1343 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-screening.spec.ts (27 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-promote.spec.ts (4 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/dialogs.spec.ts (7 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/sage-ad-page.spec.ts (9 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Repeat: each 2 on both projects; 378 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 10 repeated; importers of a changed helper: 0 of 17
- Database session samples during each start (INC-944): smoke 5, email 7, 1 10, 2 10, 3 7, 4 6, 5 6, 6 4, 7 7, 8 9, 9 8, 10 7, 11 7, 12 9, 13 9, 14 9, 15 6, 16 7, repeat 7
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42534773334-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42534773334-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42534773334-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42534773334-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42534773334-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42534773334-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42534773334-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42534773334-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42534773334-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42534773334-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42534773334-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42534773334-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42534773334-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42534773334-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42534773334-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42534773334-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42534773334-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42534773334-local-16
  - repeat: [e2e:teardown] deleted 6 user(s) owned by process 42534773334-local-repeat
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
RLS on 91 of 91 public tables
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

## Lane smoke
- auth-signout.spec.ts / U0j sign-out hard reset / SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271) / mobile-360 — Error: no project's stored session is left on this device

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
