# Local backend proof (non-gating)

- Commit: `7b53aae8929656cbc95e8bc69cf59eb4312b005a`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43626312389

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 461 | 76 | applied 456/456 | 27 | 0 | 0 | 5 | 32 |
| email | 180 | 53 | applied 456/456 | 6 | 0 | 0 | 0 | 6 |
| webkit | 648 | 59 | applied 456/456 | 70 | 0 | 0 | 24 | 94 |
| 1 | 490 | 53 | applied 456/456 | 188 | 0 | 0 | 69 | 257 |
| 2 | 651 | 77 | applied 456/456 | 174 | 0 | 0 | 26 | 200 |
| 3 | 510 | 58 | applied 456/456 | 169 | 0 | 0 | 5 | 174 |
| 4 | 559 | 66 | applied 456/456 | 137 | 0 | 0 | 5 | 142 |
| 5 | 520 | 51 | applied 456/456 | 93 | 0 | 0 | 1 | 94 |
| 6 | 569 | 63 | applied 456/456 | 153 | 0 | 0 | 41 | 194 |
| 7 | 594 | 68 | applied 456/456 | 147 | 0 | 0 | 77 | 224 |
| 8 | 568 | 65 | applied 456/456 | 179 | 0 | 0 | 7 | 186 |
| 9 | 606 | 77 | applied 456/456 | 123 | 0 | 0 | 1 | 124 |
| 10 | 471 | 59 | applied 456/456 | 160 | 0 | 0 | 2 | 162 |
| 11 | 504 | 60 | applied 456/456 | 120 | 0 | 0 | 8 | 128 |
| 12 | 681 | 76 | applied 456/456 | 164 | 0 | 0 | 19 | 183 |
| 13 | 462 | 59 | applied 456/456 | 157 | 0 | 0 | 9 | 166 |
| 14 | 469 | 59 | applied 456/456 | 183 | 0 | 0 | 5 | 188 |
| 15 | 524 | 61 | applied 456/456 | 124 | 0 | 0 | 8 | 132 |
| 16 | 646 | 77 | applied 456/456 | 172 | 0 | 0 | 48 | 220 |
| repeat | 964 | 76 | applied 456/456 | 100 | 0 | 0 | 8 | 108 |
| TOTAL | — | — | — | 2646 | 0 | 0 | 368 | 3014 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 964 s
- Repeat lane (DEC-283): Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (16 tests); Repeat: each 2 on both projects; 65 tests selected, 27 repeated; budget 643 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Not repeated (time cap): admin-translations-console.spec.ts / U4b translations console / TR-33 an empty filter leaves export enabled and downloads the language / desktop-1280; Not repeated (time cap): admin-translations-console.spec.ts / U4b translations console / TR-40 sync follows a changed Amharic text no person wrote, and keeps one a person wrote / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / TR-42 answer-option translations (DEC-233) / TR-42 the Data scope saves and approves an answer option, excluding switched-off options and Amharic (INC-820) / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / U4b translations console / TR-14 the Data scope edits and approves a location name / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / U4b translations console / TR-24 the Data scope machine-translates one row and then every untranslated one / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / U4b translations console / TR-26 the Data scope approves every machine-filled content name / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / U4b translations console / TR-34 the Data roster names each row's identity and changes nothing else / desktop-1280
- Database session samples during each start (INC-944): smoke 9, email 5, webkit 6, 1 5, 2 9, 3 6, 4 7, 5 5, 6 7, 7 8, 8 7, 9 9, 10 6, 11 6, 12 9, 13 6, 14 6, 15 6, 16 10, repeat 9
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/336, 2 641/449, 3 641/364, 4 640/374, 5 640/368, 6 641/386, 7 641/403, 8 641/385, 9 641/403, 10 643/301, 11 640/358, 12 641/482, 13 640/301, 14 641/321, 15 641/376, 16 641/447
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43626312389-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43626312389-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43626312389-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43626312389-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43626312389-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43626312389-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43626312389-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43626312389-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43626312389-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43626312389-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43626312389-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43626312389-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43626312389-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43626312389-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43626312389-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43626312389-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43626312389-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43626312389-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43626312389-local-16
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

## Lane repeat
- Outside test — Timed out waiting 763s for the test suite to run
- Outside test — Timed out waiting 763s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
