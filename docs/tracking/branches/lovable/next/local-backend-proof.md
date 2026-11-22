# Local backend proof (non-gating)

- Commit: `0965f518396a8f1351939c85b2f05f34365c67fb`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45049131600

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 466 | 71 | applied 550/550 | 38 | 0 | 0 | 16 | 54 |
| email | 195 | 66 | applied 550/550 | 6 | 0 | 0 | 0 | 6 |
| webkit | 985 | 85 | applied 550/550 | 80 | 0 | 0 | 24 | 104 |
| 1 | 572 | 77 | applied 550/550 | 188 | 0 | 0 | 69 | 257 |
| 2 | 609 | 77 | applied 550/550 | 169 | 0 | 0 | 21 | 190 |
| 3 | 540 | 65 | applied 550/550 | 169 | 0 | 0 | 5 | 174 |
| 4 | 545 | 67 | applied 550/550 | 137 | 0 | 0 | 5 | 142 |
| 5 | 544 | 57 | applied 550/550 | 92 | 0 | 1 | 1 | 94 |
| 6 | 532 | 67 | applied 550/550 | 159 | 0 | 0 | 41 | 200 |
| 7 | 642 | 79 | applied 550/550 | 149 | 0 | 0 | 77 | 226 |
| 8 | 589 | 66 | applied 550/550 | 179 | 0 | 0 | 7 | 186 |
| 9 | 609 | 65 | applied 550/550 | 129 | 0 | 0 | 1 | 130 |
| 10 | 548 | 66 | applied 550/550 | 176 | 0 | 0 | 2 | 178 |
| 11 | 678 | 76 | applied 550/550 | 120 | 1 | 1 | 8 | 130 |
| 12 | 525 | 64 | applied 550/550 | 163 | 0 | 0 | 18 | 181 |
| 13 | 453 | 64 | applied 550/550 | 156 | 0 | 0 | 8 | 164 |
| 14 | 479 | 65 | applied 550/550 | 187 | 0 | 0 | 3 | 190 |
| 15 | 682 | 86 | applied 550/550 | 124 | 0 | 0 | 6 | 130 |
| 16 | 534 | 68 | applied 550/550 | 172 | 0 | 0 | 48 | 220 |
| repeat | 980 | 77 | applied 550/550 | 91 | 0 | 0 | 45 | 136 |
| TOTAL | — | — | — | 2684 | 1 | 2 | 405 | 3092 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 985 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-screening.spec.ts (32 tests); Not repeated: e2e/admin-translations-governance.spec.ts (10 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/dialogs.spec.ts (18 tests); Repeat: each 2 on both projects; 108 tests selected, 34 repeated; budget 643 s at 4.7 s a test; directly changed: 4 of 8 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass; Not repeated (time cap): admin-audit.spec.ts / U3 audit & security / AS-1 gating: a plain user is refused, a moderator reads the log / desktop-1280; Not repeated (time cap): admin-audit.spec.ts / U3 audit & security / AS-2 filters: an action filter narrows the list / desktop-1280; Not repeated (time cap): admin-audit.spec.ts / U3 audit & security / AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size / desktop-1280; Not repeated (time cap): admin-audit.spec.ts / U3 audit & security / IMP-1 impersonation: super admin opens a read-only session and ends it / desktop-1280; Not repeated (time cap): admin-audit.spec.ts / U3 audit & security / IMP-2 dual-actor audit: start and end are both recorded / desktop-1280; Not repeated (time cap): admin-audit.spec.ts / U3 audit & security / IMP-3 server refusals: self and a super-admin target / desktop-1280; Not repeated (time cap): admin-audit.spec.ts / U3 audit & security / IMP-5 server refusal: a caller who is not a super admin / desktop-1280; Not repeated (time cap): admin-audit.spec.ts / U3 audit & security / IMP-6 the active-session check runs for staff only, never on a member's page / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-10 members link preselects the role filter via the URL / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-16 the roles list on the agreed blocks: heading, Create role, Columns, Open and View members / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-17 P-1: the matrix shows the packages resource with View and Update, Update marked step-up / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-2 create: a super admin creates a custom role through step-up / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-3 matrix: grant then revoke a benign permission, persisted across reload / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-5 delete guards: members block deletion; typed confirm deletes / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-6 revocation path: unenrolling the factor refuses the next change / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-7 registration: DEC-016 permissions appear as grantable rows / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-8 Amharic + no horizontal overflow / desktop-1280; Not repeated (time cap): admin-roles.spec.ts / U2 roles console / RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / TR-42 answer-option translations (DEC-233) / TR-42 the Data scope saves and approves an answer option, excluding switched-off options and Amharic (INC-820) / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / U4b translations console / TR-14 the Data scope edits and approves a location name / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / U4b translations console / TR-24 the Data scope machine-translates one row and then every untranslated one / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / U4b translations console / TR-26 the Data scope approves every machine-filled content name / desktop-1280; Not repeated (time cap): admin-translations-data.spec.ts / U4b translations console / TR-34 the Data roster names each row's identity and changes nothing else / desktop-1280; Not repeated (time cap): house-style.spec.ts / house style fixture / HS-1 no horizontal overflow and the new badges render / desktop-1280; Not repeated (time cap): house-style.spec.ts / house style fixture / HS-2 axe is clean in light and in dark mode / desktop-1280; Not repeated (time cap): house-style.spec.ts / house style fixture / HS-29 Escape closes the open filter list before its panel / desktop-1280; Not repeated (time cap): house-style.spec.ts / house style fixture / HS-3 row actions are named, sized and keyboard-safe / desktop-1280; Not repeated (time cap): house-style.spec.ts / house style fixture / HS-4 the pager moves by page and by rows per page / desktop-1280; Not repeated (time cap): house-style.spec.ts / house style fixture / HS-5 the filters button counts and its chips clear / desktop-1280; Not repeated (time cap): house-style.spec.ts / house style fixture / HS-6 the focus ring shows after keyboard use only / desktop-1280
- Database session samples during each start (INC-944): smoke 8, email 7, webkit 11, 1 9, 2 10, 3 7, 4 7, 5 6, 6 7, 7 10, 8 7, 9 7, 10 7, 11 9, 12 7, 13 7, 14 7, 15 11, 16 8, repeat 10
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/365, 2 641/413, 3 641/361, 4 640/357, 5 640/385, 6 641/345, 7 641/434, 8 641/404, 9 641/445, 10 643/364, 11 640/468, 12 641/353, 13 640/299, 14 641/308, 15 641/465, 16 641/359
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45049131600-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45049131600-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 45049131600-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45049131600-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45049131600-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45049131600-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 45049131600-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 45049131600-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45049131600-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45049131600-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45049131600-local-14
  - 15: [e2e:teardown] deleted 45 user(s) owned by process 45049131600-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45049131600-local-16
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

## Lane 5
- admin-translations-data.spec.ts / U4b translations console / TR-26 the Data scope approves every machine-filled content name / desktop-1280 — Error: bulk entity AI never reached scratch location [account id]

## Lane 11
- Step failure:
Step smoke: outcome failure
  
- house-style.spec.ts / house style fixture / HS-6 the focus ring shows after keyboard use only / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-97 the map credit is visible and uncovered on both plans / mobile-360 — Error: PW-97: the Esri credit is covered

## Lane repeat
- Outside test — Timed out waiting 763s for the test suite to run
- Outside test — Timed out waiting 763s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
