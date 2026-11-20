# Local backend proof (non-gating)

- Commit: `45166866181434cac7a8d6f65c6ef65df287ce70`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44726913494

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 472 | 86 | applied 540/540 | 27 | 0 | 0 | 5 | 32 |
| email | 238 | 87 | applied 540/540 | 6 | 0 | 0 | 0 | 6 |
| webkit | 804 | 86 | applied 540/540 | 70 | 0 | 0 | 24 | 94 |
| 1 | 511 | 63 | applied 540/540 | 188 | 0 | 0 | 69 | 257 |
| 2 | 525 | 64 | applied 540/540 | 174 | 0 | 0 | 26 | 200 |
| 3 | 682 | 86 | applied 540/540 | 169 | 0 | 0 | 5 | 174 |
| 4 | 539 | 65 | applied 540/540 | 137 | 0 | 0 | 5 | 142 |
| 5 | 538 | 56 | applied 540/540 | 92 | 0 | 1 | 1 | 94 |
| 6 | 537 | 68 | applied 540/540 | 153 | 0 | 0 | 41 | 194 |
| 7 | 528 | 67 | applied 540/540 | 149 | 0 | 0 | 77 | 226 |
| 8 | 526 | 66 | applied 540/540 | 179 | 0 | 0 | 7 | 186 |
| 9 | 492 | 65 | applied 540/540 | 123 | 0 | 0 | 1 | 124 |
| 10 | 558 | 71 | applied 540/540 | 160 | 0 | 0 | 2 | 162 |
| 11 | 528 | 66 | applied 540/540 | 120 | 0 | 0 | 8 | 128 |
| 12 | 537 | 60 | applied 540/540 | 164 | 0 | 0 | 19 | 183 |
| 13 | 596 | 85 | applied 540/540 | 157 | 0 | 0 | 9 | 166 |
| 14 | 563 | 74 | applied 540/540 | 183 | 0 | 0 | 5 | 188 |
| 15 | 544 | 56 | applied 540/540 | 124 | 0 | 0 | 8 | 132 |
| 16 | 664 | 87 | applied 540/540 | 172 | 0 | 0 | 48 | 220 |
| repeat | 969 | 86 | applied 540/540 | 120 | 0 | 0 | 0 | 120 |
| TOTAL | — | — | — | 2667 | 0 | 1 | 360 | 3028 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 969 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 15 tests selected, 15 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 11, email 11, webkit 11, 1 7, 2 7, 3 11, 4 7, 5 6, 6 7, 7 8, 8 7, 9 7, 10 8, 11 7, 12 6, 13 11, 14 9, 15 6, 16 11, repeat 11
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/340, 2 641/322, 3 641/481, 4 640/347, 5 640/379, 6 641/344, 7 641/344, 8 641/336, 9 641/331, 10 643/374, 11 640/347, 12 641/373, 13 640/391, 14 641/363, 15 641/385, 16 641/454
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44726913494-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44726913494-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44726913494-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44726913494-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44726913494-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44726913494-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44726913494-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44726913494-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44726913494-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44726913494-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44726913494-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44726913494-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 44726913494-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44726913494-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44726913494-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44726913494-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44726913494-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44726913494-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44726913494-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 44726913494-local-repeat
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
- admin-translations-data.spec.ts / U4b translations console / TR-14 the Data scope edits and approves a location name / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
