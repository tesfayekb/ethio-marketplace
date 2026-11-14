# Local backend proof (non-gating)

- Commit: `3a71a3c4c6e5c1e31f1905311358a295b551ed64`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43581123466

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 358 | 60 | applied 443/443 | 27 | 0 | 0 | 5 | 32 |
| email | 221 | 76 | applied 443/443 | 6 | 0 | 0 | 0 | 6 |
| webkit | 770 | 63 | applied 443/443 | 70 | 0 | 0 | 24 | 94 |
| 1 | 473 | 50 | applied 443/443 | 188 | 0 | 0 | 69 | 257 |
| 2 | 615 | 74 | applied 443/443 | 174 | 0 | 0 | 26 | 200 |
| 3 | 515 | 61 | applied 443/443 | 169 | 0 | 0 | 5 | 174 |
| 4 | 472 | 50 | applied 443/443 | 137 | 0 | 0 | 5 | 142 |
| 5 | 579 | 63 | applied 443/443 | 93 | 0 | 0 | 1 | 94 |
| 6 | 614 | 76 | applied 443/443 | 153 | 0 | 0 | 41 | 194 |
| 7 | 639 | 79 | applied 443/443 | 147 | 0 | 0 | 77 | 224 |
| 8 | 585 | 65 | applied 443/443 | 179 | 0 | 0 | 7 | 186 |
| 9 | 467 | 50 | applied 443/443 | 123 | 0 | 0 | 1 | 124 |
| 10 | 585 | 70 | applied 443/443 | 160 | 0 | 0 | 2 | 162 |
| 11 | 526 | 61 | applied 443/443 | 120 | 0 | 0 | 8 | 128 |
| 12 | 524 | 60 | applied 443/443 | 164 | 0 | 0 | 19 | 183 |
| 13 | 441 | 50 | applied 443/443 | 157 | 0 | 0 | 9 | 166 |
| 14 | 629 | 70 | applied 443/443 | 183 | 0 | 0 | 5 | 188 |
| 15 | 670 | 75 | applied 443/443 | 124 | 0 | 0 | 8 | 132 |
| 16 | 611 | 75 | applied 443/443 | 172 | 0 | 0 | 48 | 220 |
| repeat | 937 | 59 | applied 443/443 | 113 | 0 | 0 | 19 | 132 |
| TOTAL | — | — | — | 2659 | 0 | 0 | 379 | 3038 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 937 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-users.spec.ts (14 tests); Repeat: each 2 on both projects; 47 tests selected, 33 repeated; budget 643 s at 4.7 s a test; directly changed: 3 of 4 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 1 of the repeated tests, on webkit-1280 and webkit-390; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-16 the roles list on the agreed blocks: heading, Create role, Columns, Open and View members / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-17 P-1: the matrix shows the packages resource with View and Update, Update marked step-up / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7b cancelling the prompt releases the caller and writes nothing / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7c a no-factor identity is released with the hint / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f step-up authentication / MF-1 enroll: QR + secret shown, a generated code activates the factor / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f step-up authentication / MF-1 enroll: QR + secret shown, a generated code activates the factor / webkit-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f step-up authentication / MF-1 enroll: QR + secret shown, a generated code activates the factor / webkit-390; Not repeated (time cap): mfa-stepup.spec.ts / U1f step-up authentication / MF-2 gate: wrong code refused, correct code lets the action through / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f step-up authentication / MF-3 no factor: the modal explains and the RPC is never called / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f step-up authentication / MF-4 server: permission first, then step-up — the RPC refuses regardless of UI / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f step-up authentication / MF-5 unenroll requires a fresh verification / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f step-up authentication / MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f-4 step-up freshness / MF-6 unenrolling the only factor drops the stepped-up state / desktop-1280; Not repeated (time cap): mfa-stepup.spec.ts / U1f-4 step-up freshness / MF-7 a verification older than the window re-prompts / desktop-1280
- Database session samples during each start (INC-944): smoke 6, email 9, webkit 7, 1 4, 2 9, 3 6, 4 4, 5 6, 6 9, 7 10, 8 7, 9 4, 10 8, 11 6, 12 6, 13 4, 14 8, 15 9, 16 9, repeat 6
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/328, 2 641/434, 3 641/367, 4 640/327, 5 640/388, 6 641/429, 7 641/448, 8 641/391, 9 641/324, 10 643/401, 11 640/358, 12 641/351, 13 640/296, 14 641/434, 15 641/465, 16 641/428
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43581123466-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43581123466-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43581123466-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43581123466-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43581123466-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43581123466-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43581123466-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43581123466-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43581123466-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43581123466-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43581123466-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43581123466-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43581123466-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43581123466-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43581123466-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43581123466-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43581123466-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43581123466-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43581123466-local-16
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
