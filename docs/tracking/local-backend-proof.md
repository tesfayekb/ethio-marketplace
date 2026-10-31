# Local backend proof (non-gating)

- Commit: `3033041c84421789ec460300981fbf2cd30971fa`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41217044558

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 896 | 50 | applied 383/383 | 205 | 0 | 0 | 69 | 274 |
| email | 159 | 50 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 879 | 51 | applied 383/383 | 163 | 0 | 0 | 6 | 169 |
| 2 | 891 | 50 | applied 383/383 | 148 | 0 | 0 | 1 | 149 |
| 3 | 851 | 72 | applied 383/383 | 137 | 0 | 0 | 24 | 161 |
| 4 | 730 | 71 | applied 383/383 | 155 | 0 | 0 | 2 | 157 |
| 5 | 863 | 73 | applied 383/383 | 158 | 0 | 0 | 7 | 165 |
| 6 | 929 | 64 | applied 383/383 | 191 | 0 | 0 | 1 | 192 |
| 7 | 382 | 61 | applied 383/383 | 70 | 3 | 0 | 50 | 123 |
| 8 | 600 | 52 | applied 383/383 | 106 | 0 | 0 | 51 | 157 |
| 9 | 797 | 52 | applied 383/383 | 150 | 0 | 0 | 12 | 162 |
| 10 | 933 | 48 | applied 383/383 | 153 | 0 | 0 | 2 | 155 |
| 11 | 870 | 73 | applied 383/383 | 131 | 0 | 0 | 35 | 166 |
| 12 | 777 | 67 | applied 383/383 | 154 | 0 | 0 | 5 | 159 |
| 13 | 734 | 59 | applied 383/383 | 145 | 0 | 0 | 7 | 152 |
| 14 | 855 | 58 | applied 383/383 | 190 | 0 | 0 | 2 | 192 |
| 15 | 352 | 66 | applied 383/383 | 68 | 3 | 1 | 51 | 123 |
| 16 | 574 | 51 | applied 383/383 | 122 | 0 | 0 | 36 | 158 |
| repeat | 670 | 72 | applied 383/383 | 124 | 0 | 0 | 4 | 128 |
| TOTAL | — | — | — | 2576 | 6 | 1 | 365 | 2948 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 933 s
- Repeat lane (DEC-283): Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Repeat: each 2 on both projects; 94 tests selected, 32 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 5 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 4, email 4, 1 5, 2 4, 3 8, 4 8, 5 9, 6 7, 7 6, 8 5, 9 5, 10 4, 11 9, 12 8, 13 6, 14 6, 15 7, 16 5, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41217044558-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41217044558-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41217044558-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41217044558-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41217044558-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41217044558-local-4
  - 5: [e2e:teardown] deleted 20 user(s) owned by process 41217044558-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41217044558-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41217044558-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41217044558-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41217044558-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41217044558-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41217044558-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41217044558-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41217044558-local-repeat
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
RLS on 85 of 85 public tables
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
- Step failure:
Step smoke: outcome failure
  
- sage-bands.spec.ts / Sage bands at 360, dark / SGB-5 current tab and crumb share the location raised segment (360, dark) / mobile-360 — Error: background-color
- sage-bands.spec.ts / Sage bands at 390, light / SGB-5 current tab and crumb share the location raised segment (390, light) / mobile-360 — Error: background-color
- sage-bands.spec.ts / Sage bands at 390, dark / SGB-5 current tab and crumb share the location raised segment (390, dark) / mobile-360 — Error: background-color

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- sage-bands.spec.ts / Sage bands at 834, light / SGB-5 current tab and crumb share the location raised segment (834, light) / desktop-1280 — Error: background-color
- sage-bands.spec.ts / Sage bands at 834, dark / SGB-5 current tab and crumb share the location raised segment (834, dark) / desktop-1280 — Error: background-color
- sage-bands.spec.ts / Sage bands at 1440, light / SGB-5 current tab and crumb share the location raised segment (1440, light) / desktop-1280 — Error: background-color
- sage-bands.spec.ts / Sage bands at 1440, dark / SGB-5 current tab and crumb share the location raised segment (1440, dark) / desktop-1280 — Error: background-color

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
