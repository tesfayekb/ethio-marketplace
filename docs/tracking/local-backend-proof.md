# Local backend proof (non-gating)

- Commit: `b2bbc9f339d21280ef244e38ce7324888e7fc0d4`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41190843148

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1015 | 71 | applied 383/383 | 205 | 0 | 0 | 69 | 274 |
| email | 208 | 62 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 819 | 49 | applied 383/383 | 163 | 0 | 0 | 6 | 169 |
| 2 | 988 | 72 | applied 383/383 | 142 | 0 | 0 | 1 | 143 |
| 3 | 838 | 73 | applied 383/383 | 142 | 0 | 0 | 12 | 154 |
| 4 | 774 | 72 | applied 383/383 | 148 | 0 | 0 | 2 | 150 |
| 5 | 746 | 63 | applied 383/383 | 154 | 0 | 0 | 7 | 161 |
| 6 | 875 | 72 | applied 383/383 | 149 | 0 | 0 | 1 | 150 |
| 7 | 445 | 64 | applied 383/383 | 106 | 0 | 0 | 49 | 155 |
| 8 | 612 | 50 | applied 383/383 | 105 | 0 | 0 | 50 | 155 |
| 9 | 780 | 58 | applied 383/383 | 143 | 0 | 0 | 6 | 149 |
| 10 | 1169 | 71 | applied 383/383 | 160 | 0 | 0 | 2 | 162 |
| 11 | 937 | 63 | applied 383/383 | 146 | 0 | 0 | 14 | 160 |
| 12 | 686 | 72 | applied 383/383 | 137 | 0 | 0 | 4 | 141 |
| 13 | 754 | 60 | applied 383/383 | 145 | 0 | 0 | 7 | 152 |
| 14 | 887 | 68 | applied 383/383 | 148 | 0 | 0 | 2 | 150 |
| 15 | 618 | 59 | applied 383/383 | 185 | 0 | 0 | 79 | 264 |
| 16 | 361 | 65 | applied 383/383 | 41 | 0 | 0 | 0 | 41 |
| repeat | 417 | 73 | applied 383/383 | 56 | 0 | 0 | 48 | 104 |
| TOTAL | — | — | — | 2481 | 0 | 0 | 359 | 2840 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1169 s
- Repeat lane (DEC-283): Repeat: each 2 on both projects; 26 tests selected, 26 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 2 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 8, email 6, 1 4, 2 8, 3 8, 4 9, 5 6, 6 8, 7 7, 8 4, 9 6, 10 8, 11 7, 12 9, 13 6, 14 8, 15 6, 16 7, repeat 8
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41190843148-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41190843148-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41190843148-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41190843148-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41190843148-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41190843148-local-4
  - 5: [e2e:teardown] deleted 20 user(s) owned by process 41190843148-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41190843148-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41190843148-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41190843148-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41190843148-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41190843148-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41190843148-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41190843148-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41190843148-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41190843148-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41190843148-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41190843148-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41190843148-local-repeat
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
