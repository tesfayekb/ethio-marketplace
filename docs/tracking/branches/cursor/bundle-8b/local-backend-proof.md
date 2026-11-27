# Local backend proof (non-gating)

- Commit: `29778bceac92aa9a24b32160f7618dd50c2a57fc`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45913849134

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 649 | 78 | applied 565/565 | 38 | 0 | 0 | 16 | 54 |
| email | 175 | 68 | applied 565/565 | 6 | 0 | 0 | 0 | 6 |
| webkit | 785 | 57 | applied 565/565 | 80 | 0 | 0 | 24 | 104 |
| 1 | 914 | 73 | applied 565/565 | 228 | 0 | 0 | 70 | 298 |
| 2 | 921 | 86 | applied 565/565 | 93 | 0 | 0 | 29 | 122 |
| 3 | 707 | 67 | applied 565/565 | 75 | 0 | 0 | 71 | 146 |
| 4 | 592 | 67 | applied 565/565 | 152 | 0 | 0 | 12 | 164 |
| 5 | 1323 | 88 | applied 565/565 | 146 | 0 | 0 | 8 | 154 |
| 6 | 1382 | 87 | applied 565/565 | 131 | 0 | 0 | 15 | 146 |
| 7 | 1141 | 67 | applied 565/565 | 193 | 0 | 0 | 11 | 204 |
| 8 | 910 | 67 | applied 565/565 | 137 | 0 | 0 | 5 | 142 |
| 9 | 677 | 72 | applied 565/565 | 218 | 0 | 0 | 6 | 224 |
| 10 | 1226 | 56 | applied 565/565 | 165 | 0 | 0 | 41 | 206 |
| 11 | 1709 | 66 | applied 565/565 | 134 | 0 | 0 | 20 | 154 |
| 12 | 1082 | 68 | applied 565/565 | 183 | 0 | 0 | 15 | 198 |
| 13 | 922 | 77 | applied 565/565 | 126 | 0 | 0 | 12 | 138 |
| 14 | 1283 | 56 | applied 565/565 | 166 | 0 | 0 | 7 | 173 |
| 15 | 1221 | 69 | applied 565/565 | 147 | 0 | 1 | 8 | 156 |
| 16 | 978 | 71 | applied 565/565 | 270 | 0 | 0 | 48 | 318 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2688 | 0 | 1 | 418 | 3107 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 11 1709 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 10, email 7, webkit 6, 1 9, 2 11, 3 7, 4 7, 5 12, 6 11, 7 7, 8 7, 9 8, 10 5, 11 7, 12 7, 13 9, 14 6, 15 8, 16 8, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 125 files, weights from run 43431755160 (2026-11-13); mean 792 s, largest 793 s (+0 %); alone: none; unweighed (median 46 s): none; repeat budget 793 s; planned/test seconds: 1 793/731, 2 792/720, 3 792/530, 4 793/439, 5 792/1109, 6 792/1176, 7 793/964, 8 793/737, 9 792/490, 10 792/1076, 11 793/1554, 12 793/904, 13 792/709, 14 793/1119, 15 792/1041, 16 793/786
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45913849134-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45913849134-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45913849134-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45913849134-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 45913849134-local-2
  - 3: [e2e:teardown] deleted 3 user(s) owned by process 45913849134-local-3
  - 4: [e2e:teardown] deleted 11 user(s) owned by process 45913849134-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 45913849134-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45913849134-local-6
  - 7: [e2e:teardown] deleted 5 user(s) owned by process 45913849134-local-7
  - 8: [e2e:teardown] deleted 23 user(s) owned by process 45913849134-local-8
  - 9: [e2e:teardown] deleted 15 user(s) owned by process 45913849134-local-9
  - 10: [e2e:teardown] deleted 3 user(s) owned by process 45913849134-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45913849134-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45913849134-local-12
  - 13: [e2e:teardown] deleted 27 user(s) owned by process 45913849134-local-13
  - 14: [e2e:teardown] deleted 17 user(s) owned by process 45913849134-local-14
  - 15: [e2e:teardown] deleted 47 user(s) owned by process 45913849134-local-15
  - 16: [e2e:teardown] deleted 12 user(s) owned by process 45913849134-local-16
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

## Lane 15
- failure-crawl-member-account.spec.ts / FAILURE CRAWL — the member's account pages (DEC-459 c) / FCR-34 /settings as member: loads clean and says every failed read / mobile-360 — Error: /settings rpc has_password (malformed): the read failed and the screen said nothing (no failure notice)

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
