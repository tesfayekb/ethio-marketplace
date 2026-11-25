# Local backend proof (non-gating)

- Commit: `5661c1eda27a7a410e40eec534ec30f3c4c1237e`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45689374949

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 579 | 60 | applied 561/561 | 38 | 0 | 0 | 16 | 54 |
| email | 175 | 56 | applied 561/561 | 6 | 0 | 0 | 0 | 6 |
| webkit | 827 | 69 | applied 561/561 | 80 | 0 | 0 | 24 | 104 |
| 1 | 501 | 59 | applied 561/561 | 199 | 0 | 0 | 69 | 268 |
| 2 | 953 | 67 | applied 561/561 | 170 | 0 | 0 | 20 | 190 |
| 3 | 623 | 66 | applied 561/561 | 144 | 0 | 0 | 5 | 149 |
| 4 | 885 | 67 | applied 561/561 | 136 | 0 | 0 | 2 | 138 |
| 5 | 725 | 67 | applied 561/561 | 113 | 0 | 0 | 1 | 114 |
| 6 | 1094 | 68 | applied 561/561 | 118 | 0 | 0 | 40 | 158 |
| 7 | 1605 | 68 | applied 561/561 | 166 | 0 | 0 | 64 | 230 |
| 8 | 1413 | 67 | applied 561/561 | 184 | 0 | 0 | 54 | 238 |
| 9 | 894 | 87 | applied 561/561 | 118 | 0 | 1 | 3 | 122 |
| 10 | 1462 | 67 | applied 561/561 | 201 | 0 | 0 | 3 | 204 |
| 11 | 558 | 58 | applied 561/561 | 134 | 0 | 0 | 16 | 150 |
| 12 | 546 | 68 | applied 561/561 | 177 | 0 | 0 | 17 | 194 |
| 13 | 922 | 65 | applied 561/561 | 179 | 0 | 0 | 5 | 184 |
| 14 | 1369 | 67 | applied 561/561 | 174 | 0 | 0 | 2 | 176 |
| 15 | 1116 | 67 | applied 561/561 | 134 | 0 | 0 | 0 | 134 |
| 16 | 644 | 72 | applied 561/561 | 147 | 0 | 0 | 19 | 166 |
| repeat | 933 | 66 | applied 561/561 | 30 | 0 | 0 | 74 | 104 |
| TOTAL | — | — | — | 2648 | 0 | 1 | 434 | 3083 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 7 1605 s
- Repeat lane (DEC-283): Repeat: each 2 on both projects; 26 tests selected, 26 repeated; budget 646 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-12 lifecycle: a retired category is reactivated through step-up / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-13 lifecycle: a typed-slug delete removes the row and its dependents / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-14 catch-all law: never a parent, refused server-side, no move verbs / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-15 reorder: Move up flips the order with no step-up, catch-all last / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-16 return path: closing a secondary dialog returns to the open editor / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-16 return path: closing a secondary dialog returns to the open editor / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-17 create flow: two steps, chained countries + position, image / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-17 create flow: two steps, chained countries + position, image / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2 categories console / CT-44 a second Move up waits for the first and lands from the new order / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2-HOME categories home flag / CT-33 the flagged pointer is the home, a reorder never moves it, and deleting it promotes the other / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / C2-HOME categories home flag / CT-33 the flagged pointer is the home, a reorder never moves it, and deleting it promotes the other / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-18 a real-export round trip is a no-op / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-18 a real-export round trip is a no-op / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-19 a create and a rename commit through the doors and undo / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-19 a create and a rename commit through the doors and undo / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-20 action=retire and action=reactivate walk the state machine / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-20 action=retire and action=reactivate walk the state machine / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-21 unknown parents, cycles, catch-alls and formulas are refused / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-21 unknown parents, cycles, catch-alls and formulas are refused / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-22 a categories:view-only operator sees no import control and is refused / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-22 a categories:view-only operator sees no import control and is refused / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-23 an importer without step-up is refused at the preview and writes nothing / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-23 an importer without step-up is refused at the preview and writes nothing / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-24 a slug rename is refused by name, and a name edit is one change / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-24 a slug rename is refused by name, and a name edit is one change / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-25 an attributes file is refused by identity / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-25 an attributes file is refused by identity / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-26 imported Amharic names land pending, and undo removes them / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-26 imported Amharic names land pending, and undo removes them / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-27 a leaf delete undoes with its Amharic name; a parent delete names its child / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-27 a leaf delete undoes with its Amharic name; a parent delete names its child / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-28 the import dialog reaches Applied and undoes / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-28 the import dialog reaches Applied and undoes / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-34 own_place is accepted by the import and an unknown token is refused / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-34 own_place is accepted by the import and an unknown token is refused / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-35 an imported category name is in the name table after commit and gone after undo / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-35 an imported category name is in the name table after commit and gone after undo / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-36 a created leaf gets its secondary parents and the undo removes both pointers / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-36 a created leaf gets its secondary parents and the undo removes both pointers / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-37 undoing a category delete restores its attribute links or names the skipped ones / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-37 undoing a category delete restores its attribute links or names the skipped ones / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in / mobile-360; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-46 rented and filled are accepted by the import and an unknown token is still refused / desktop-1280; Not repeated (time cap): admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-46 rented and filled are accepted by the import and an unknown token is still refused / mobile-360
- Database session samples during each start (INC-944): smoke 6, email 6, webkit 7, 1 6, 2 7, 3 7, 4 7, 5 7, 6 7, 7 7, 8 7, 9 12, 10 7, 11 6, 12 7, 13 7, 14 7, 15 7, 16 9, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 116 files, weights from run 43431755160 (2026-11-13); mean 644 s, largest 646 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 646 s; planned/test seconds: 1 644/339, 2 644/743, 3 643/451, 4 643/715, 5 643/543, 6 644/917, 7 643/1413, 8 646/1232, 9 643/677, 10 646/1266, 11 645/394, 12 643/370, 13 644/737, 14 644/1208, 15 644/925, 16 643/412
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45689374949-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45689374949-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45689374949-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45689374949-local-4
  - 5: [e2e:teardown] deleted 30 user(s) owned by process 45689374949-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 45689374949-local-8
  - 9: [e2e:teardown] deleted 15 user(s) owned by process 45689374949-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45689374949-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 45689374949-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45689374949-local-15
  - 16: [e2e:teardown] deleted 25 user(s) owned by process 45689374949-local-16
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

## Lane 9
- admin-roles.spec.ts / U2 roles console / RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles / desktop-1280 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Lane repeat
- Outside test — Timed out waiting 766s for the test suite to run
- Outside test — Timed out waiting 766s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
