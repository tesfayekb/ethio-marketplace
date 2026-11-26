# Local backend proof (non-gating)

- Commit: `f22bfee8ba06e379d96692840af5e6e3e174c9be`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45772935453

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 86 | applied 563/563 | 0 | 0 | 0 | 0 | 0 |
| email | 171 | 56 | applied 563/563 | 6 | 0 | 0 | 0 | 6 |
| webkit | 945 | 73 | applied 563/563 | 80 | 0 | 0 | 24 | 104 |
| 1 | 614 | 88 | applied 563/563 | 210 | 0 | 0 | 76 | 286 |
| 2 | 905 | 68 | applied 563/563 | 162 | 0 | 0 | 20 | 182 |
| 3 | 605 | 67 | applied 563/563 | 167 | 0 | 0 | 7 | 174 |
| 4 | 893 | 70 | applied 563/563 | 121 | 0 | 0 | 14 | 135 |
| 5 | 1411 | 69 | applied 563/563 | 143 | 0 | 0 | 1 | 144 |
| 6 | 1143 | 78 | applied 563/563 | 198 | 0 | 2 | 40 | 240 |
| 7 | 837 | 66 | applied 563/563 | 147 | 0 | 0 | 63 | 210 |
| 8 | 1018 | 67 | applied 563/563 | 135 | 0 | 0 | 3 | 138 |
| 9 | 935 | 68 | applied 563/563 | 119 | 0 | 1 | 4 | 124 |
| 10 | 1719 | 68 | applied 563/563 | 163 | 0 | 0 | 1 | 164 |
| 11 | 537 | 65 | applied 563/563 | 140 | 0 | 0 | 6 | 146 |
| 12 | 534 | 68 | applied 563/563 | 158 | 0 | 0 | 2 | 160 |
| 13 | 967 | 67 | applied 563/563 | 151 | 0 | 0 | 17 | 168 |
| 14 | 1519 | 65 | applied 563/563 | 145 | 0 | 1 | 18 | 164 |
| 15 | 1093 | 68 | applied 563/563 | 187 | 0 | 0 | 47 | 234 |
| 16 | 1120 | 67 | applied 563/563 | 157 | 0 | 0 | 1 | 158 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2589 | 0 | 4 | 344 | 2937 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 10 1719 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 11, email 6, webkit 9, 1 11, 2 7, 3 7, 4 8, 5 7, 6 10, 7 7, 8 7, 9 7, 10 7, 11 7, 12 7, 13 7, 14 7, 15 7, 16 7, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 118 files, weights from run 43431755160 (2026-11-13); mean 654 s, largest 656 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 656 s; planned/test seconds: 1 654/402, 2 653/671, 3 654/443, 4 654/693, 5 656/1235, 6 653/937, 7 654/615, 8 653/841, 9 655/757, 10 653/1471, 11 653/357, 12 654/350, 13 653/750, 14 653/1220, 15 656/917, 16 656/801
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45772935453-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45772935453-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45772935453-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 45772935453-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45772935453-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45772935453-local-4
  - 5: [e2e:teardown] deleted 17 user(s) owned by process 45772935453-local-5
  - 6: [e2e:teardown] deleted 5 user(s) owned by process 45772935453-local-6
  - 7: [e2e:teardown] deleted 11 user(s) owned by process 45772935453-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 45772935453-local-8
  - 9: [e2e:teardown] deleted 51 user(s) owned by process 45772935453-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45772935453-local-10
  - 11: [e2e:teardown] deleted 6 user(s) owned by process 45772935453-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 45772935453-local-12
  - 13: [e2e:teardown] deleted 11 user(s) owned by process 45772935453-local-13
  - 14: [e2e:teardown] deleted 5 user(s) owned by process 45772935453-local-14
  - 15: [e2e:teardown] deleted 7 user(s) owned by process 45772935453-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45772935453-local-16
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

## Lane smoke
- Step failure:
Step door-guard: outcome failure
  check-doors self-test OK: 23 finding kinds fired on their planted fixtures, the clean pair fired nothing
  check-doors live FAIL: callee-code-missing admin_commit_attribute_import(jsonb,jsonb,text,text) unknownCategory — attr_import_plan(jsonb,jsonb,text) refuses unknownCategory, which the line lacks (live:18)
  check-doors live FAIL: callee-code-missing admin_commit_location_import(jsonb,jsonb,text,text) unknownCountry — loc_import_plan(jsonb,jsonb,text) refuses unknownCountry, which the line lacks (live:20)
  check-doors live FAIL: callee-code-missing admin_preview_location_import(jsonb,jsonb,text) unknownCountry — loc_import_plan(jsonb,jsonb,text) refuses unknownCountry, which the line lacks (live:98)
- No JSON results; smoke skipped

## Lane 6
- admin-locations.spec.ts / L2a locations console / LT-9a roster shape, table twin: the edit icon sits in the end column with pagination / desktop-1280 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- legal-doors.spec.ts / Legal doors / LG-10 admin_legal_documents lists a scratch document with each version's publisher and acceptance count, newest version first, after the real kinds / mobile-360 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Lane 9
- mfa-stepup.spec.ts / U1f step-up authentication / MF-2 gate: wrong code refused, correct code lets the action through / desktop-1280 — Test timeout of 60000ms exceeded.

## Lane 14
- admin-attributes-editor.spec.ts / C3 attributes console / AT-35 the options expansion reads as labels / desktop-1280 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
