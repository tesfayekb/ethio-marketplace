# Local backend proof (non-gating)

- Commit: `e7f26f03d1d1894b419ff5c81eda3172f98770c6`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45638798552

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 643 | 86 | applied 556/556 | 38 | 0 | 0 | 16 | 54 |
| email | 210 | 69 | applied 556/556 | 6 | 0 | 0 | 0 | 6 |
| webkit | 814 | 67 | applied 556/556 | 80 | 0 | 0 | 24 | 104 |
| 1 | 499 | 58 | applied 556/556 | 199 | 0 | 0 | 69 | 268 |
| 2 | 1020 | 84 | applied 556/556 | 169 | 0 | 1 | 20 | 190 |
| 3 | 600 | 68 | applied 556/556 | 144 | 0 | 0 | 5 | 149 |
| 4 | 932 | 73 | applied 556/556 | 136 | 0 | 0 | 2 | 138 |
| 5 | 739 | 68 | applied 556/556 | 113 | 0 | 0 | 1 | 114 |
| 6 | 1083 | 68 | applied 556/556 | 118 | 0 | 0 | 40 | 158 |
| 7 | 1591 | 67 | applied 556/556 | 166 | 0 | 0 | 64 | 230 |
| 8 | 1401 | 67 | applied 556/556 | 184 | 0 | 0 | 54 | 238 |
| 9 | 869 | 68 | applied 556/556 | 119 | 0 | 0 | 3 | 122 |
| 10 | 1455 | 68 | applied 556/556 | 201 | 0 | 0 | 3 | 204 |
| 11 | 589 | 68 | applied 556/556 | 134 | 0 | 0 | 16 | 150 |
| 12 | 714 | 89 | applied 556/556 | 177 | 0 | 0 | 17 | 194 |
| 13 | 1032 | 86 | applied 556/556 | 179 | 0 | 0 | 5 | 184 |
| 14 | 1420 | 86 | applied 556/556 | 174 | 0 | 0 | 2 | 176 |
| 15 | 1155 | 76 | applied 556/556 | 134 | 0 | 0 | 0 | 134 |
| 16 | 688 | 65 | applied 556/556 | 147 | 0 | 0 | 19 | 166 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2618 | 0 | 1 | 360 | 2979 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 7 1591 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 11, email 7, webkit 7, 1 6, 2 11, 3 7, 4 9, 5 7, 6 8, 7 7, 8 7, 9 7, 10 7, 11 7, 12 12, 13 11, 14 11, 15 9, 16 7, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 116 files, weights from run 43431755160 (2026-11-13); mean 644 s, largest 646 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 646 s; planned/test seconds: 1 644/336, 2 644/821, 3 643/442, 4 643/732, 5 643/537, 6 644/900, 7 643/1433, 8 646/1212, 9 643/685, 10 646/1276, 11 645/403, 12 643/496, 13 644/832, 14 644/1217, 15 644/956, 16 643/364
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45638798552-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45638798552-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45638798552-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45638798552-local-4
  - 5: [e2e:teardown] deleted 30 user(s) owned by process 45638798552-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 45638798552-local-8
  - 9: [e2e:teardown] deleted 15 user(s) owned by process 45638798552-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45638798552-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 45638798552-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45638798552-local-15
  - 16: [e2e:teardown] deleted 25 user(s) owned by process 45638798552-local-16
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

## Lane 2
- admin-attributes-library.spec.ts / C3 attributes console / AT-6 merge: links move to the survivor and the sources disappear / desktop-1280 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
