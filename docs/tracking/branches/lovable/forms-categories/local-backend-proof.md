# Local backend proof (non-gating)

- Commit: `eefe830a1231704a94f09fc97c3d56502352b77c`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43859278786

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 402 | 62 | applied 499/499 | 27 | 0 | 0 | 5 | 32 |
| email | 216 | 78 | applied 499/499 | 6 | 0 | 0 | 0 | 6 |
| webkit | 619 | 61 | applied 499/499 | 70 | 0 | 0 | 24 | 94 |
| 1 | 584 | 79 | applied 499/499 | 188 | 0 | 0 | 69 | 257 |
| 2 | 600 | 74 | applied 499/499 | 174 | 0 | 0 | 26 | 200 |
| 3 | 565 | 63 | applied 499/499 | 169 | 0 | 0 | 5 | 174 |
| 4 | 521 | 64 | applied 499/499 | 137 | 0 | 0 | 5 | 142 |
| 5 | 591 | 78 | applied 499/499 | 93 | 0 | 0 | 1 | 94 |
| 6 | 557 | 66 | applied 499/499 | 153 | 0 | 0 | 41 | 194 |
| 7 | 479 | 60 | applied 499/499 | 147 | 0 | 0 | 77 | 224 |
| 8 | 501 | 60 | applied 499/499 | 179 | 0 | 0 | 7 | 186 |
| 9 | 577 | 74 | applied 499/499 | 123 | 0 | 0 | 1 | 124 |
| 10 | 469 | 61 | applied 499/499 | 160 | 0 | 0 | 2 | 162 |
| 11 | 516 | 62 | applied 499/499 | 120 | 0 | 0 | 8 | 128 |
| 12 | 524 | 62 | applied 499/499 | 164 | 0 | 0 | 19 | 183 |
| 13 | 508 | 63 | applied 499/499 | 157 | 0 | 0 | 9 | 166 |
| 14 | 623 | 79 | applied 499/499 | 183 | 0 | 0 | 5 | 188 |
| 15 | 545 | 62 | applied 499/499 | 124 | 0 | 0 | 8 | 132 |
| 16 | 504 | 62 | applied 499/499 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2546 | 0 | 0 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 14 623 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 10, webkit 6, 1 10, 2 9, 3 7, 4 7, 5 10, 6 7, 7 6, 8 6, 9 9, 10 6, 11 6, 12 6, 13 7, 14 10, 15 6, 16 6, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/387, 2 641/419, 3 641/392, 4 640/349, 5 640/403, 6 641/379, 7 641/318, 8 641/334, 9 641/393, 10 643/320, 11 640/347, 12 641/354, 13 640/332, 14 641/433, 15 641/375, 16 641/326
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43859278786-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43859278786-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43859278786-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43859278786-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43859278786-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43859278786-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43859278786-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43859278786-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43859278786-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43859278786-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43859278786-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43859278786-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43859278786-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43859278786-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43859278786-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43859278786-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43859278786-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43859278786-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43859278786-local-16
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
