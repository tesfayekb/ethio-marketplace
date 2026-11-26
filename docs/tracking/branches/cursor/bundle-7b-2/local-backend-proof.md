# Local backend proof (non-gating)

- Commit: `e56e9a50a708adfeea86f7f401fd9e830616b1ff`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45734853168

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 587 | 67 | applied 562/562 | 38 | 0 | 0 | 16 | 54 |
| email | 203 | 66 | applied 562/562 | 6 | 0 | 0 | 0 | 6 |
| webkit | 833 | 68 | applied 562/562 | 80 | 0 | 0 | 24 | 104 |
| 1 | 602 | 87 | applied 562/562 | 199 | 0 | 0 | 69 | 268 |
| 2 | 911 | 67 | applied 562/562 | 170 | 0 | 0 | 20 | 190 |
| 3 | 706 | 86 | applied 562/562 | 144 | 0 | 0 | 5 | 149 |
| 4 | 875 | 58 | applied 562/562 | 136 | 0 | 0 | 2 | 138 |
| 5 | 714 | 66 | applied 562/562 | 113 | 0 | 0 | 1 | 114 |
| 6 | 1088 | 70 | applied 562/562 | 118 | 0 | 0 | 40 | 158 |
| 7 | 1595 | 69 | applied 562/562 | 166 | 0 | 0 | 64 | 230 |
| 8 | 1412 | 66 | applied 562/562 | 184 | 0 | 0 | 54 | 238 |
| 9 | 821 | 66 | applied 562/562 | 119 | 0 | 0 | 3 | 122 |
| 10 | 1451 | 68 | applied 562/562 | 201 | 0 | 0 | 3 | 204 |
| 11 | 723 | 89 | applied 562/562 | 134 | 0 | 0 | 16 | 150 |
| 12 | 562 | 67 | applied 562/562 | 177 | 0 | 0 | 17 | 194 |
| 13 | 1023 | 77 | applied 562/562 | 179 | 0 | 0 | 5 | 184 |
| 14 | 1550 | 59 | applied 562/562 | 168 | 6 | 0 | 2 | 176 |
| 15 | 1128 | 69 | applied 562/562 | 134 | 0 | 0 | 0 | 134 |
| 16 | 522 | 66 | applied 562/562 | 147 | 0 | 0 | 19 | 166 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2613 | 6 | 0 | 360 | 2979 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 7 1595 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 7, email 7, webkit 7, 1 11, 2 7, 3 11, 4 6, 5 7, 6 8, 7 7, 8 7, 9 7, 10 7, 11 12, 12 7, 13 10, 14 6, 15 8, 16 7, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 116 files, weights from run 43431755160 (2026-11-13); mean 644 s, largest 646 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 646 s; planned/test seconds: 1 644/384, 2 644/734, 3 643/502, 4 643/711, 5 643/536, 6 644/908, 7 643/1433, 8 646/1222, 9 643/663, 10 646/1265, 11 645/504, 12 643/376, 13 644/821, 14 644/1391, 15 644/941, 16 643/358
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45734853168-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45734853168-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45734853168-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45734853168-local-4
  - 5: [e2e:teardown] deleted 30 user(s) owned by process 45734853168-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 45734853168-local-8
  - 9: [e2e:teardown] deleted 15 user(s) owned by process 45734853168-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45734853168-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 45734853168-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45734853168-local-15
  - 16: [e2e:teardown] deleted 25 user(s) owned by process 45734853168-local-16
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

## Lane 14
- Step failure:
Step smoke: outcome failure
  
- admin-screening.spec.ts / ADMIN SCREENING / SC-3 Reject keeps the ad off / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-14 Reject at the foot of the preview closes it and keeps the ad off / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-screening.spec.ts / ADMIN SCREENING / SC-3 Reject keeps the ad off / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-14 Reject at the foot of the preview closes it and keeps the ad off / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
