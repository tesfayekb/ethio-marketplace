# Local backend proof (non-gating)

- Commit: `72d289e75ba2874b9cbfee62c6115899b8bd215c`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46098160058

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 505 | 73 | applied 565/565 | 38 | 0 | 0 | 16 | 54 |
| email | 178 | 68 | applied 565/565 | 6 | 0 | 0 | 0 | 6 |
| webkit | 757 | 69 | applied 565/565 | 80 | 0 | 0 | 24 | 104 |
| 1 | 777 | 67 | applied 565/565 | 93 | 0 | 0 | 67 | 160 |
| 2 | 825 | 91 | applied 565/565 | 285 | 0 | 0 | 77 | 362 |
| 3 | 672 | 65 | applied 565/565 | 95 | 0 | 0 | 79 | 174 |
| 4 | 662 | 86 | applied 565/565 | 87 | 0 | 0 | 25 | 112 |
| 5 | 708 | 73 | applied 565/565 | 119 | 0 | 0 | 13 | 132 |
| 6 | 574 | 68 | applied 565/565 | 186 | 0 | 1 | 7 | 194 |
| 7 | 570 | 67 | applied 565/565 | 174 | 0 | 0 | 0 | 174 |
| 8 | 542 | 55 | applied 565/565 | 176 | 0 | 0 | 3 | 179 |
| 9 | 608 | 69 | applied 565/565 | 145 | 0 | 0 | 17 | 162 |
| 10 | 750 | 87 | applied 565/565 | 168 | 0 | 0 | 20 | 188 |
| 11 | 636 | 67 | applied 565/565 | 163 | 0 | 0 | 43 | 206 |
| 12 | 770 | 90 | applied 565/565 | 168 | 0 | 1 | 1 | 170 |
| 13 | 639 | 68 | applied 565/565 | 212 | 0 | 0 | 6 | 218 |
| 14 | 611 | 67 | applied 565/565 | 138 | 0 | 0 | 18 | 156 |
| 15 | 592 | 65 | applied 565/565 | 202 | 0 | 0 | 2 | 204 |
| 16 | 712 | 88 | applied 565/565 | 164 | 0 | 0 | 2 | 166 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2699 | 0 | 2 | 420 | 3121 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 2 825 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 7, webkit 7, 1 7, 2 12, 3 7, 4 11, 5 9, 6 7, 7 7, 8 6, 9 7, 10 12, 11 7, 12 12, 13 7, 14 7, 15 7, 16 12, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 127 files, weights from run 46081846257 (2026-11-27), docs/tracking/branches/cursor/bundle-8c-1/lane-weights.json at evidence 09598ad61 (run 46081846257; 0 of 2 files unread); mean 827 s, largest 829 s (+0 %); alone: none; unweighed (median 43 s): none; repeat budget 829 s; planned/test seconds: 1 827/590, 2 827/618, 3 828/493, 4 827/464, 5 827/517, 6 828/392, 7 827/411, 8 829/391, 9 827/423, 10 827/543, 11 827/461, 12 827/556, 13 826/480, 14 827/446, 15 827/438, 16 827/507
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 46098160058-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 46098160058-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 46098160058-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 46098160058-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 46098160058-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 46098160058-local-3
  - 4: [e2e:teardown] deleted 47 user(s) owned by process 46098160058-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 46098160058-local-5
  - 6: [e2e:teardown] deleted 11 user(s) owned by process 46098160058-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 46098160058-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 46098160058-local-8
  - 9: [e2e:teardown] deleted 23 user(s) owned by process 46098160058-local-9
  - 10: [e2e:teardown] deleted 28 user(s) owned by process 46098160058-local-10
  - 11: [e2e:teardown] deleted 5 user(s) owned by process 46098160058-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 46098160058-local-12
  - 13: [e2e:teardown] deleted 13 user(s) owned by process 46098160058-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 46098160058-local-14
  - 15: [e2e:teardown] deleted 5 user(s) owned by process 46098160058-local-15
  - 16: [e2e:teardown] deleted 25 user(s) owned by process 46098160058-local-16
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

## Lane 6
- admin-countries.spec.ts / L2b countries console / CO-6 rail order: two roots are stored in position order, and the reset removes every row / desktop-1280 — Error: CO-6: the rail save refused notARoot twice

## Lane 12
- admin-translations-data.spec.ts / U4b translations console / TR-14 the Data scope edits and approves a location name / mobile-360 — Error: expect(locator).toBeVisible() failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
