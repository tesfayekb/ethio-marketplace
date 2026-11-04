# Local backend proof (non-gating)

- Commit: `f2d4112cbaa2a92df164fa3af9b34f49031958f7`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41756986789

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 949 | 58 | applied 392/392 | 206 | 0 | 0 | 70 | 276 |
| email | 169 | 50 | applied 392/392 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1079 | 72 | applied 392/392 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1175 | 75 | applied 392/392 | 167 | 0 | 0 | 1 | 168 |
| 3 | 924 | 72 | applied 392/392 | 145 | 0 | 0 | 24 | 169 |
| 4 | 682 | 58 | applied 392/392 | 169 | 0 | 0 | 2 | 171 |
| 5 | 919 | 73 | applied 392/392 | 164 | 0 | 0 | 7 | 171 |
| 6 | 999 | 74 | applied 392/392 | 183 | 0 | 0 | 1 | 184 |
| 7 | 426 | 63 | applied 392/392 | 91 | 0 | 0 | 68 | 159 |
| 8 | 684 | 60 | applied 392/392 | 115 | 0 | 0 | 51 | 166 |
| 9 | 976 | 60 | applied 392/392 | 166 | 0 | 0 | 13 | 179 |
| 10 | 932 | 50 | applied 392/392 | 161 | 0 | 0 | 1 | 162 |
| 11 | 816 | 54 | applied 392/392 | 138 | 0 | 0 | 36 | 174 |
| 12 | 883 | 68 | applied 392/392 | 173 | 0 | 0 | 5 | 178 |
| 13 | 900 | 73 | applied 392/392 | 155 | 0 | 0 | 17 | 172 |
| 14 | 717 | 59 | applied 392/392 | 163 | 0 | 0 | 2 | 165 |
| 15 | 472 | 72 | applied 392/392 | 96 | 0 | 0 | 62 | 158 |
| 16 | 698 | 72 | applied 392/392 | 132 | 0 | 0 | 36 | 168 |
| repeat | 576 | 59 | applied 392/392 | 108 | 0 | 0 | 0 | 108 |
| TOTAL | — | — | — | 2706 | 0 | 0 | 402 | 3108 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1175 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 9 tests selected, 9 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 6, email 4, 1 9, 2 9, 3 8, 4 5, 5 9, 6 9, 7 7, 8 6, 9 6, 10 4, 11 5, 12 8, 13 9, 14 6, 15 9, 16 9, repeat 6
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41756986789-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41756986789-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41756986789-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41756986789-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41756986789-local-3
  - 4: [e2e:teardown] deleted 34 user(s) owned by process 41756986789-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41756986789-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41756986789-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41756986789-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41756986789-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41756986789-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41756986789-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41756986789-local-11
  - 12: [e2e:teardown] deleted 34 user(s) owned by process 41756986789-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41756986789-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41756986789-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41756986789-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41756986789-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41756986789-local-repeat
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
