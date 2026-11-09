# Local backend proof (non-gating)

- Commit: `2d5d503262b83a0deeaa58ae9e8d75b20064c05a`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42587592780

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1027 | 76 | applied 436/436 | 206 | 0 | 0 | 70 | 276 |
| email | 212 | 74 | applied 436/436 | 6 | 0 | 0 | 0 | 6 |
| 1 | 906 | 56 | applied 436/436 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1310 | 76 | applied 436/436 | 190 | 0 | 0 | 1 | 191 |
| 3 | 689 | 60 | applied 436/436 | 140 | 0 | 0 | 24 | 164 |
| 4 | 965 | 75 | applied 436/436 | 179 | 0 | 0 | 2 | 181 |
| 5 | 860 | 75 | applied 436/436 | 156 | 1 | 0 | 7 | 164 |
| 6 | 882 | 62 | applied 436/436 | 190 | 0 | 0 | 1 | 191 |
| 7 | 496 | 76 | applied 436/436 | 91 | 0 | 0 | 68 | 159 |
| 8 | 630 | 54 | applied 436/436 | 115 | 0 | 0 | 51 | 166 |
| 9 | 1113 | 75 | applied 436/436 | 166 | 0 | 0 | 13 | 179 |
| 10 | 1213 | 75 | applied 436/436 | 167 | 0 | 0 | 1 | 168 |
| 11 | 849 | 61 | applied 436/436 | 139 | 0 | 0 | 36 | 175 |
| 12 | 954 | 77 | applied 436/436 | 176 | 0 | 0 | 5 | 181 |
| 13 | 824 | 74 | applied 436/436 | 146 | 1 | 0 | 17 | 164 |
| 14 | 1011 | 75 | applied 436/436 | 189 | 0 | 0 | 2 | 191 |
| 15 | 326 | 50 | applied 436/436 | 96 | 0 | 0 | 62 | 158 |
| 16 | 693 | 74 | applied 436/436 | 132 | 0 | 0 | 36 | 168 |
| repeat | 623 | 53 | applied 436/436 | 152 | 0 | 0 | 0 | 152 |
| TOTAL | — | — | — | 2804 | 2 | 0 | 402 | 3208 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1310 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-listings.spec.ts (38 tests); Not repeated: e2e/admin-screening.spec.ts (27 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/dialogs.spec.ts (7 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/sage-ad-page.spec.ts (9 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Repeat: each 2 on both projects; 439 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 4 of 14 repeated; importers of a changed helper: 1 of 17
- Database session samples during each start (INC-944): smoke 9, email 9, 1 5, 2 9, 3 6, 4 9, 5 9, 6 6, 7 9, 8 5, 9 9, 10 9, 11 6, 12 9, 13 9, 14 9, 15 4, 16 9, repeat 5
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42587592780-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42587592780-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42587592780-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42587592780-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42587592780-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42587592780-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42587592780-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42587592780-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42587592780-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-repeat
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

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- my-listings-promote.spec.ts / MY LISTINGS — Promote: the level sheet and the staff Days field (P-2 (b)) / LVP-5 the Reach section: the included reach (not self-serve) named current on a fresh ad; sameReach and lowerReach refused by name with nothing written; a wider reach set free; then nothing wider / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 13
- Step failure:
Step smoke: outcome failure
  
- my-listings-promote.spec.ts / MY LISTINGS — Promote: the level sheet and the staff Days field (P-2 (b)) / LVP-5 the Reach section: the included reach (not self-serve) named current on a fresh ad; sameReach and lowerReach refused by name with nothing written; a wider reach set free; then nothing wider / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
