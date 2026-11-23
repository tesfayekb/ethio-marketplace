# Local backend proof (non-gating)

- Commit: `ac88976d8ace08cd3a17bff9e2d1fbbcd97f1900`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45119524740

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 404 | 58 | applied 552/552 | 38 | 0 | 0 | 16 | 54 |
| email | 205 | 66 | applied 552/552 | 6 | 0 | 0 | 0 | 6 |
| webkit | 963 | 79 | applied 552/552 | 79 | 0 | 1 | 24 | 104 |
| 1 | 518 | 67 | applied 552/552 | 188 | 0 | 0 | 69 | 257 |
| 2 | 492 | 58 | applied 552/552 | 169 | 0 | 0 | 21 | 190 |
| 3 | 668 | 81 | applied 552/552 | 169 | 0 | 0 | 5 | 174 |
| 4 | 502 | 67 | applied 552/552 | 137 | 0 | 0 | 5 | 142 |
| 5 | 608 | 88 | applied 552/552 | 93 | 0 | 0 | 1 | 94 |
| 6 | 646 | 84 | applied 552/552 | 159 | 0 | 0 | 41 | 200 |
| 7 | 500 | 68 | applied 552/552 | 149 | 0 | 0 | 77 | 226 |
| 8 | 526 | 68 | applied 552/552 | 179 | 0 | 0 | 7 | 186 |
| 9 | 680 | 88 | applied 552/552 | 129 | 0 | 0 | 1 | 130 |
| 10 | 540 | 66 | applied 552/552 | 176 | 0 | 0 | 2 | 178 |
| 11 | 617 | 72 | applied 552/552 | 122 | 0 | 0 | 8 | 130 |
| 12 | 530 | 65 | applied 552/552 | 163 | 0 | 0 | 18 | 181 |
| 13 | 451 | 65 | applied 552/552 | 156 | 0 | 0 | 8 | 164 |
| 14 | 498 | 67 | applied 552/552 | 187 | 0 | 0 | 3 | 190 |
| 15 | 549 | 66 | applied 552/552 | 128 | 0 | 0 | 6 | 134 |
| 16 | 503 | 68 | applied 552/552 | 172 | 0 | 0 | 48 | 220 |
| repeat | 926 | 85 | applied 552/552 | 112 | 0 | 0 | 0 | 112 |
| TOTAL | — | — | — | 2711 | 0 | 1 | 360 | 3072 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 963 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 14 tests selected, 14 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 1 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 4 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 6, email 7, webkit 10, 1 7, 2 6, 3 10, 4 7, 5 12, 6 11, 7 7, 8 7, 9 12, 10 7, 11 9, 12 7, 13 7, 14 7, 15 7, 16 7, repeat 11
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/329, 2 641/324, 3 641/476, 4 640/327, 5 640/404, 6 641/444, 7 641/322, 8 641/343, 9 641/478, 10 643/354, 11 640/421, 12 641/366, 13 640/300, 14 641/319, 15 641/393, 16 641/333
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45119524740-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45119524740-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45119524740-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45119524740-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 45119524740-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45119524740-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45119524740-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45119524740-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45119524740-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45119524740-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 45119524740-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 45119524740-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45119524740-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45119524740-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45119524740-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45119524740-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45119524740-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45119524740-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45119524740-local-16
  - repeat: [e2e:teardown] deleted 186 user(s) owned by process 45119524740-local-repeat
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

## Lane webkit
- sage-ad-page.spec.ts / Sage ad page at 390, dark / SAP-1 each tier's ad page reads its tokens (390, dark) / webkit-390 — Error: premium ad: the segment

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
