# Local backend proof (non-gating)

- Commit: `eb72f3bdf462fadf0bf246a66e2eb921da07b751`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41736333497

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1020 | 72 | applied 392/392 | 206 | 0 | 0 | 70 | 276 |
| email | 219 | 74 | applied 392/392 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1029 | 72 | applied 392/392 | 163 | 0 | 0 | 6 | 169 |
| 2 | 1223 | 74 | applied 392/392 | 172 | 0 | 0 | 1 | 173 |
| 3 | 918 | 72 | applied 392/392 | 145 | 0 | 0 | 24 | 169 |
| 4 | 866 | 66 | applied 392/392 | 169 | 0 | 0 | 2 | 171 |
| 5 | 730 | 55 | applied 392/392 | 156 | 0 | 0 | 7 | 163 |
| 6 | 784 | 52 | applied 392/392 | 191 | 0 | 0 | 1 | 192 |
| 7 | 455 | 72 | applied 392/392 | 81 | 0 | 0 | 68 | 149 |
| 8 | 687 | 69 | applied 392/392 | 116 | 0 | 0 | 51 | 167 |
| 9 | 981 | 61 | applied 392/392 | 166 | 0 | 0 | 13 | 179 |
| 10 | 963 | 50 | applied 392/392 | 161 | 0 | 0 | 1 | 162 |
| 11 | 915 | 72 | applied 392/392 | 138 | 0 | 0 | 36 | 174 |
| 12 | 717 | 50 | applied 392/392 | 155 | 0 | 0 | 5 | 160 |
| 13 | 771 | 61 | applied 392/392 | 154 | 0 | 0 | 17 | 171 |
| 14 | 953 | 72 | applied 392/392 | 182 | 0 | 0 | 2 | 184 |
| 15 | 424 | 64 | applied 392/392 | 88 | 0 | 0 | 61 | 149 |
| 16 | 680 | 72 | applied 392/392 | 131 | 0 | 0 | 37 | 168 |
| repeat | 1057 | 72 | applied 392/392 | 137 | 0 | 0 | 1 | 138 |
| TOTAL | — | — | — | 2717 | 0 | 0 | 403 | 3120 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1223 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 23 tests selected, 23 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 2 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 9, 1 8, 2 9, 3 8, 4 7, 5 5, 6 5, 7 9, 8 8, 9 6, 10 4, 11 8, 12 4, 13 6, 14 9, 15 7, 16 8, repeat 8
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41736333497-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41736333497-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41736333497-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41736333497-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41736333497-local-3
  - 4: [e2e:teardown] deleted 34 user(s) owned by process 41736333497-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41736333497-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41736333497-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41736333497-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41736333497-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41736333497-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41736333497-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41736333497-local-11
  - 12: [e2e:teardown] deleted 34 user(s) owned by process 41736333497-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41736333497-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41736333497-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41736333497-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41736333497-local-16
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
RLS on 89 of 89 public tables
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
- Outside test — Timed out waiting 840s for the test suite to run
- Outside test — Timed out waiting 840s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
