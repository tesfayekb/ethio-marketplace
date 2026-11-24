# Local backend proof (non-gating)

- Commit: `71d06fb4d2afa51329627f4e3ffe5bef6096c17b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45337319415

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 432 | 68 | applied 553/553 | 38 | 0 | 0 | 16 | 54 |
| email | 485 | 66 | applied 553/553 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1048 | 88 | applied 553/553 | 80 | 0 | 0 | 24 | 104 |
| 1 | 795 | 68 | applied 553/553 | 192 | 0 | 0 | 69 | 261 |
| 2 | 847 | 65 | applied 553/553 | 169 | 0 | 0 | 21 | 190 |
| 3 | 846 | 67 | applied 553/553 | 169 | 0 | 0 | 5 | 174 |
| 4 | 744 | 66 | applied 553/553 | 137 | 0 | 0 | 5 | 142 |
| 5 | 810 | 64 | applied 553/553 | 93 | 0 | 0 | 1 | 94 |
| 6 | 867 | 68 | applied 553/553 | 159 | 0 | 0 | 41 | 200 |
| 7 | 670 | 88 | applied 553/553 | 149 | 0 | 0 | 77 | 226 |
| 8 | 775 | 68 | applied 553/553 | 179 | 0 | 0 | 7 | 186 |
| 9 | 575 | 63 | applied 553/553 | 129 | 0 | 0 | 1 | 130 |
| 10 | 820 | 66 | applied 553/553 | 176 | 0 | 0 | 2 | 178 |
| 11 | 766 | 66 | applied 553/553 | 126 | 0 | 0 | 8 | 134 |
| 12 | 838 | 66 | applied 553/553 | 163 | 0 | 0 | 18 | 181 |
| 13 | 713 | 67 | applied 553/553 | 156 | 0 | 0 | 8 | 164 |
| 14 | 638 | 87 | applied 553/553 | 187 | 0 | 0 | 3 | 190 |
| 15 | 870 | 65 | applied 553/553 | 128 | 0 | 0 | 6 | 134 |
| 16 | 786 | 65 | applied 553/553 | 172 | 0 | 0 | 48 | 220 |
| repeat | 989 | 67 | applied 553/553 | 101 | 0 | 0 | 7 | 108 |
| TOTAL | — | — | — | 2709 | 0 | 0 | 367 | 3076 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 1048 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 18 tests selected, 18 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 6 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 3 on mobile-360 and desktop-1280 at one worker after the parallel pass; Not repeated (time cap): dialogs.spec.ts / a Filters panel in rows (Lovable bundle 3) / DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel / webkit-390; Not repeated (time cap): dialogs.spec.ts / a Filters panel in rows (Lovable bundle 3) / DLG-E13 the fullest Filters panel: each date box's calendar opens inside the panel with its seven days in view, a chosen date is read whole, and a press on another row closes the open list / webkit-390; Not repeated (time cap): dialogs.spec.ts / one dialog look on a real surface (turn S6-1) / DLG-E9 a small panel opened from state gives the focus back to its opener, by Escape and by its close button / webkit-390; Not repeated (time cap): dialogs.spec.ts / the banded panel's body (Lovable bundle 2) / DLG-E10 a tall banded panel in a short window: the body alone scrolls, its last control is reached and pressed, the cue takes no room / webkit-390; Not repeated (time cap): dialogs.spec.ts / the banded panel's body (Lovable bundle 2) / DLG-E11 every banded panel of the board: the body has its content's height or scrolls, between the header and the last band, inside the window / webkit-390; Not repeated (time cap): dialogs.spec.ts / the full-screen surfaces on the one primitive (turn S6-4) / DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected / webkit-390
- Database session samples during each start (INC-944): smoke 8, email 7, webkit 12, 1 7, 2 7, 3 7, 4 7, 5 7, 6 7, 7 12, 8 7, 9 7, 10 7, 11 7, 12 7, 13 7, 14 11, 15 7, 16 7, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/339, 2 641/318, 3 641/362, 4 640/310, 5 640/370, 6 641/341, 7 641/460, 8 641/336, 9 641/385, 10 643/350, 11 640/361, 12 641/353, 13 640/300, 14 641/430, 15 641/394, 16 641/325
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45337319415-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45337319415-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 45337319415-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45337319415-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45337319415-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45337319415-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 45337319415-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 45337319415-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45337319415-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45337319415-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45337319415-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45337319415-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45337319415-local-16
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
