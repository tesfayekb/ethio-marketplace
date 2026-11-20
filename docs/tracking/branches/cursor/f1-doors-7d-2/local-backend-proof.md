# Local backend proof (non-gating)

- Commit: `1264edbccdc73a152e481a89b9829ba07d6317de`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44767885988

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 529 | 87 | applied 544/544 | 27 | 0 | 0 | 5 | 32 |
| email | 183 | 66 | applied 544/544 | 6 | 0 | 0 | 0 | 6 |
| webkit | 790 | 68 | applied 544/544 | 72 | 0 | 0 | 24 | 96 |
| 1 | 589 | 80 | applied 544/544 | 188 | 0 | 0 | 69 | 257 |
| 2 | 557 | 68 | applied 544/544 | 174 | 0 | 0 | 26 | 200 |
| 3 | 571 | 57 | applied 544/544 | 169 | 0 | 0 | 5 | 174 |
| 4 | 660 | 85 | applied 544/544 | 137 | 0 | 0 | 5 | 142 |
| 5 | 601 | 71 | applied 544/544 | 93 | 0 | 0 | 1 | 94 |
| 6 | 666 | 86 | applied 544/544 | 153 | 0 | 0 | 41 | 194 |
| 7 | 681 | 88 | applied 544/544 | 149 | 0 | 0 | 77 | 226 |
| 8 | 507 | 66 | applied 544/544 | 179 | 0 | 0 | 7 | 186 |
| 9 | 553 | 66 | applied 544/544 | 129 | 0 | 0 | 1 | 130 |
| 10 | 530 | 66 | applied 544/544 | 160 | 0 | 0 | 2 | 162 |
| 11 | 1397 | 78 | applied 544/544 | 120 | 0 | 0 | 8 | 128 |
| 12 | 611 | 70 | applied 544/544 | 164 | 0 | 0 | 19 | 183 |
| 13 | 464 | 69 | applied 544/544 | 157 | 0 | 0 | 9 | 166 |
| 14 | 486 | 56 | applied 544/544 | 183 | 0 | 0 | 5 | 188 |
| 15 | 621 | 70 | applied 544/544 | 124 | 0 | 0 | 8 | 132 |
| 16 | 584 | 59 | applied 544/544 | 172 | 0 | 0 | 48 | 220 |
| repeat | 991 | 66 | applied 544/544 | 108 | 0 | 0 | 24 | 132 |
| TOTAL | — | — | — | 2664 | 0 | 0 | 384 | 3048 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 11 1397 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 22 tests selected, 22 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 1 of the repeated tests, on webkit-1280 and webkit-390; Not repeated (time cap): auth-signout.spec.ts / D189 deactivated session / SO-10 a signed-in tab's reload never shows the Sign in link before the account menu (INC-667) / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / D189 deactivated session / SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189) / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / D189 deactivated session / SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / F1-7d the end of a session / SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218) / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / F1-7d the end of a session / SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / F1-7d the end of a session / SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep the fresh session (INC-1218) @webkit / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / F1-7d the end of a session / SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep the fresh session (INC-1218) @webkit / webkit-1280; Not repeated (time cap): auth-signout.spec.ts / F1-7d the end of a session / SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep the fresh session (INC-1218) @webkit / webkit-390; Not repeated (time cap): auth-signout.spec.ts / U0j sign-out hard reset / SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271) / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / U0j sign-out hard reset / SO-13 an offline sign-out from a page opened directly lands on a working Home page (DEC-279, INC-930) / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / U0k session policy / SP-1 idle: the warning appears, then the session is hard-reset / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / U0k session policy / SP-2 stay signed in extends past the original deadline / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / U0k session policy / SP-3 absolute: continuous activity does not save the session / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / U0k session policy / SP-4 cross-tab: signing out in one tab evacuates the other / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / U0k session policy / SP-6 stale stamps from a previous session never sign the new one out / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / U0k session policy / SP-7 reload of a live session keeps its clocks (no silent extension) / desktop-1280; Not repeated (time cap): auth-signout.spec.ts / U0k session policy / SP-8 the session notice on a phone is docked on the bottom bar, the Post disc over it / desktop-1280
- Database session samples during each start (INC-944): smoke 11, email 7, webkit 8, 1 10, 2 8, 3 6, 4 11, 5 8, 6 11, 7 11, 8 7, 9 7, 10 7, 11 10, 12 8, 13 7, 14 6, 15 8, 16 6, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/375, 2 641/366, 3 641/378, 4 640/394, 5 640/386, 6 641/426, 7 641/449, 8 641/346, 9 641/385, 10 643/342, 11 640/414, 12 641/420, 13 640/306, 14 641/307, 15 641/409, 16 641/333
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44767885988-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44767885988-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44767885988-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44767885988-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44767885988-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44767885988-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44767885988-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44767885988-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44767885988-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44767885988-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44767885988-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44767885988-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 44767885988-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44767885988-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44767885988-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44767885988-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44767885988-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44767885988-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44767885988-local-16
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
