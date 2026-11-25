# Local backend proof (non-gating)

- Commit: `9975031ffd8d171d773af1005012a27b5d0a0dd9`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45720941766

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 636 | 75 | applied 561/561 | 38 | 0 | 0 | 16 | 54 |
| email | 183 | 66 | applied 561/561 | 6 | 0 | 0 | 0 | 6 |
| webkit | 789 | 67 | applied 561/561 | 80 | 0 | 0 | 24 | 104 |
| 1 | 521 | 69 | applied 561/561 | 199 | 0 | 0 | 69 | 268 |
| 2 | 911 | 68 | applied 561/561 | 170 | 0 | 0 | 20 | 190 |
| 3 | 620 | 68 | applied 561/561 | 144 | 0 | 0 | 5 | 149 |
| 4 | 911 | 71 | applied 561/561 | 136 | 0 | 0 | 2 | 138 |
| 5 | 691 | 58 | applied 561/561 | 113 | 0 | 0 | 1 | 114 |
| 6 | 1121 | 72 | applied 561/561 | 118 | 0 | 0 | 40 | 158 |
| 7 | 1660 | 68 | applied 561/561 | 165 | 0 | 1 | 64 | 230 |
| 8 | 1512 | 86 | applied 561/561 | 184 | 0 | 0 | 54 | 238 |
| 9 | 888 | 89 | applied 561/561 | 119 | 0 | 0 | 3 | 122 |
| 10 | 1455 | 68 | applied 561/561 | 201 | 0 | 0 | 3 | 204 |
| 11 | 666 | 77 | applied 561/561 | 134 | 0 | 0 | 16 | 150 |
| 12 | 518 | 68 | applied 561/561 | 177 | 0 | 0 | 17 | 194 |
| 13 | 1009 | 77 | applied 561/561 | 179 | 0 | 0 | 5 | 184 |
| 14 | 1425 | 87 | applied 561/561 | 173 | 0 | 1 | 2 | 176 |
| 15 | 1109 | 67 | applied 561/561 | 134 | 0 | 0 | 0 | 134 |
| 16 | 624 | 76 | applied 561/561 | 147 | 0 | 0 | 19 | 166 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2617 | 0 | 2 | 360 | 2979 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 7 1660 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 7, webkit 7, 1 7, 2 7, 3 7, 4 8, 5 6, 6 8, 7 8, 8 11, 9 12, 10 7, 11 10, 12 7, 13 10, 14 12, 15 7, 16 9, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 116 files, weights from run 43431755160 (2026-11-13); mean 644 s, largest 646 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 646 s; planned/test seconds: 1 644/334, 2 644/736, 3 643/451, 4 643/728, 5 643/533, 6 644/919, 7 643/1473, 8 646/1312, 9 643/679, 10 646/1267, 11 645/465, 12 643/359, 13 644/798, 14 644/1221, 15 644/936, 16 643/409
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45720941766-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45720941766-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45720941766-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45720941766-local-4
  - 5: [e2e:teardown] deleted 30 user(s) owned by process 45720941766-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 45720941766-local-8
  - 9: [e2e:teardown] deleted 15 user(s) owned by process 45720941766-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45720941766-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 45720941766-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45720941766-local-15
  - 16: [e2e:teardown] deleted 25 user(s) owned by process 45720941766-local-16
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
- choice-lists.spec.ts / choice lists at 1440, light / CL-E10 the account menu's parts equal the other lists' (1440, light) / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 14
- admin-attributes-editor.spec.ts / C3 attributes console / AT-58 a rank swap within one category imports through the route / mobile-360 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
