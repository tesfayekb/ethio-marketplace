# Local backend proof (non-gating)

- Commit: `d602d83b9f4413da419ff3bf4d4729e7352c134d`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41446177542

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1019 | 67 | applied 388/388 | 206 | 0 | 0 | 70 | 276 |
| email | 169 | 51 | applied 388/388 | 6 | 0 | 0 | 0 | 6 |
| 1 | 909 | 59 | applied 388/388 | 163 | 0 | 0 | 6 | 169 |
| 2 | 1054 | 59 | applied 388/388 | 170 | 0 | 0 | 1 | 171 |
| 3 | 902 | 71 | applied 388/388 | 145 | 0 | 0 | 24 | 169 |
| 4 | 712 | 52 | applied 388/388 | 169 | 0 | 0 | 2 | 171 |
| 5 | 778 | 55 | applied 388/388 | 160 | 0 | 0 | 7 | 167 |
| 6 | 964 | 73 | applied 388/388 | 187 | 0 | 0 | 1 | 188 |
| 7 | 409 | 60 | applied 388/388 | 81 | 0 | 0 | 68 | 149 |
| 8 | 706 | 70 | applied 388/388 | 116 | 0 | 0 | 57 | 173 |
| 9 | 1069 | 71 | applied 388/388 | 166 | 0 | 0 | 7 | 173 |
| 10 | 1129 | 73 | applied 388/388 | 159 | 0 | 0 | 1 | 160 |
| 11 | 767 | 58 | applied 388/388 | 138 | 0 | 0 | 36 | 174 |
| 12 | 659 | 49 | applied 388/388 | 155 | 0 | 0 | 5 | 160 |
| 13 | 758 | 59 | applied 388/388 | 154 | 0 | 0 | 17 | 171 |
| 14 | 761 | 50 | applied 388/388 | 182 | 0 | 0 | 2 | 184 |
| 15 | 308 | 49 | applied 388/388 | 88 | 0 | 0 | 61 | 149 |
| 16 | 686 | 72 | applied 388/388 | 131 | 0 | 0 | 37 | 168 |
| repeat | 1023 | 68 | applied 388/388 | 130 | 0 | 0 | 10 | 140 |
| TOTAL | — | — | — | 2706 | 0 | 0 | 412 | 3118 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1129 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-listings.spec.ts (38 tests); Not repeated: e2e/admin-screening.spec.ts (27 tests); Repeat: each 2 on both projects; 100 tests selected, 35 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 5 repeated; importers of a changed helper: 0 of 0; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-10 members link preselects the role filter via the URL / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-16 the roles list on the agreed blocks: heading, Create role, Columns, Open and View members / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-17 P-1: the matrix shows the packages resource with View and Update, Update marked step-up / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-5 delete guards: members block deletion; typed confirm deletes / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-6 revocation path: unenrolling the factor refuses the next change / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-7 registration: DEC-016 permissions appear as grantable rows / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-8 Amharic + no horizontal overflow / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match / desktop-1280
- Database session samples during each start (INC-944): smoke 8, email 5, 1 6, 2 6, 3 8, 4 5, 5 5, 6 9, 7 6, 8 8, 9 8, 10 9, 11 5, 12 4, 13 6, 14 4, 15 4, 16 8, repeat 8
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41446177542-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41446177542-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41446177542-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41446177542-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41446177542-local-3
  - 4: [e2e:teardown] deleted 34 user(s) owned by process 41446177542-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41446177542-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41446177542-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41446177542-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41446177542-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41446177542-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41446177542-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41446177542-local-11
  - 12: [e2e:teardown] deleted 34 user(s) owned by process 41446177542-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41446177542-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41446177542-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41446177542-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41446177542-local-16
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
RLS on 87 of 87 public tables
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
