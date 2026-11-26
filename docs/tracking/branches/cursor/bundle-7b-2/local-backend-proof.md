# Local backend proof (non-gating)

- Commit: `f50dcc72b5161ac2b3ec251ea38c259e57799790`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45758262652

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 784 | 64 | applied 563/563 | 38 | 0 | 0 | 16 | 54 |
| email | 205 | 69 | applied 563/563 | 6 | 0 | 0 | 0 | 6 |
| webkit | 782 | 65 | applied 563/563 | 80 | 0 | 0 | 24 | 104 |
| 1 | 530 | 67 | applied 563/563 | 210 | 0 | 0 | 76 | 286 |
| 2 | 879 | 69 | applied 563/563 | 162 | 0 | 0 | 20 | 182 |
| 3 | 778 | 56 | applied 563/563 | 167 | 0 | 0 | 7 | 174 |
| 4 | 855 | 66 | applied 563/563 | 121 | 0 | 0 | 14 | 135 |
| 5 | 1477 | 88 | applied 563/563 | 143 | 0 | 0 | 1 | 144 |
| 6 | 1066 | 66 | applied 563/563 | 200 | 0 | 0 | 40 | 240 |
| 7 | 829 | 69 | applied 563/563 | 147 | 0 | 0 | 63 | 210 |
| 8 | 1016 | 58 | applied 563/563 | 135 | 0 | 0 | 3 | 138 |
| 9 | 867 | 97 | applied 563/563 | 120 | 0 | 0 | 4 | 124 |
| 10 | 1716 | 88 | applied 563/563 | 162 | 0 | 1 | 1 | 164 |
| 11 | 604 | 73 | applied 563/563 | 140 | 0 | 0 | 6 | 146 |
| 12 | 518 | 64 | applied 563/563 | 158 | 0 | 0 | 2 | 160 |
| 13 | 923 | 68 | applied 563/563 | 151 | 0 | 0 | 17 | 168 |
| 14 | 1390 | 62 | applied 563/563 | 143 | 0 | 3 | 18 | 164 |
| 15 | 1080 | 66 | applied 563/563 | 187 | 0 | 0 | 47 | 234 |
| 16 | 953 | 67 | applied 563/563 | 157 | 0 | 0 | 1 | 158 |
| repeat | 1012 | 87 | applied 563/563 | 47 | 0 | 0 | 61 | 108 |
| TOTAL | — | — | — | 2674 | 0 | 4 | 421 | 3099 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 10 1716 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-screening.spec.ts (32 tests); Not repeated: e2e/photo-pipeline.spec.ts (37 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Repeat: each 2 on both projects; 136 tests selected, 27 repeated; budget 656 s at 4.7 s a test; directly changed: 4 of 7 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 1 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-73 Remove from a category names the listings that hold an answer, and removes / desktop-1280; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing / desktop-1280; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-74 a merge is refused while a listing holds a source's answer, and merges when none does / desktop-1280; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-75 the import preview names the holders of an unlinked question and a removed answer / desktop-1280; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-76 the order control refuses a child above its parent and accepts the right order / desktop-1280; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-76b the link editor refuses a condition on the upper question naming the lower one, and accepts the reverse / desktop-1280; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-77 an import whose end state asks a child first is refused whole at the commit / desktop-1280; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-81 the editor names the listings holding an answer a type change removes / desktop-1280; Not repeated (time cap): admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-82 a single-pick question made multi-pick: every ad's answer becomes a one-answer list in the same change; other questions and other changes are untouched (INC-632) / desktop-1280; Not repeated (time cap): admin-screening-reject.spec.ts / ADMIN SCREENING REJECT / SRJ-1 a Reject with no reason is not sent: the dialog asks for one / desktop-1280; Not repeated (time cap): admin-screening-reject.spec.ts / ADMIN SCREENING REJECT / SRJ-2 Other with no note is not sent: the dialog asks for the note / desktop-1280; Not repeated (time cap): admin-screening-reject.spec.ts / ADMIN SCREENING REJECT / SRJ-3 a reason and a note reject the ad; the audit row and the seller's notice name both / desktop-1280; Not repeated (time cap): admin-screening-reject.spec.ts / ADMIN SCREENING REJECT / SRJ-4 the ticked ads take one reason, one notice each / desktop-1280; Not repeated (time cap): admin-screening-reject.spec.ts / ADMIN SCREENING REJECT / SRJ-5 an Approve asks for no reason / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-10 my_listings: a list of categories is OR-ed, each with its subtree; more than twenty values are refused (DEC-420, DEC-423) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-11 my_listings: a list naming a category that holds another seller's ad returns none of that seller's ads (DEC-420) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-3 My Listings opens its own page; signed out, the page asks to sign in / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-6 My listings on the table blocks: the header, the search, Filters with chips, Columns and each row's actions (D181) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2) / mobile-360; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-8 a live ad's ⋯ menu carries Share, opening the share sheet on the ad's address (D224) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-8 a live ad's ⋯ menu carries Share, opening the share sheet on the ad's address (D224) / mobile-360; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-9 each row's picture fits its box in the table and in the cards, every shape (INC-1121) / desktop-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-9 each row's picture fits its box in the table and in the cards, every shape (INC-1121) / mobile-360; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-9 each row's picture fits its box in the table and in the cards, every shape (INC-1121) / webkit-1280; Not repeated (time cap): my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-9 each row's picture fits its box in the table and in the cards, every shape (INC-1121) / webkit-390; Not repeated (time cap): offline.spec.ts / OFFLINE — a waiting read says so (INC-1286) / OFF-1 offline with a read waiting shows the shell's line once; back online it leaves by itself / desktop-1280; Not repeated (time cap): offline.spec.ts / OFFLINE — a waiting read says so (INC-1286) / OFF-1 offline with a read waiting shows the shell's line once; back online it leaves by itself / mobile-360
- Database session samples during each start (INC-944): smoke 7, email 7, webkit 7, 1 7, 2 8, 3 6, 4 7, 5 12, 6 7, 7 7, 8 6, 9 7, 10 12, 11 9, 12 7, 13 7, 14 7, 15 7, 16 7, repeat 11
- Lane plan (DEC-375 b): 16 lanes over 118 files, weights from run 43431755160 (2026-11-13); mean 654 s, largest 656 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 656 s; planned/test seconds: 1 654/346, 2 653/697, 3 654/430, 4 654/683, 5 656/1271, 6 653/898, 7 654/639, 8 653/847, 9 655/655, 10 653/1510, 11 653/415, 12 654/347, 13 653/745, 14 653/1222, 15 656/916, 16 656/788
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45758262652-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45758262652-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45758262652-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45758262652-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 45758262652-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45758262652-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45758262652-local-4
  - 5: [e2e:teardown] deleted 17 user(s) owned by process 45758262652-local-5
  - 6: [e2e:teardown] deleted 5 user(s) owned by process 45758262652-local-6
  - 7: [e2e:teardown] deleted 11 user(s) owned by process 45758262652-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 45758262652-local-8
  - 9: [e2e:teardown] deleted 49 user(s) owned by process 45758262652-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45758262652-local-10
  - 11: [e2e:teardown] deleted 6 user(s) owned by process 45758262652-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 45758262652-local-12
  - 13: [e2e:teardown] deleted 11 user(s) owned by process 45758262652-local-13
  - 14: [e2e:teardown] deleted 5 user(s) owned by process 45758262652-local-14
  - 15: [e2e:teardown] deleted 7 user(s) owned by process 45758262652-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45758262652-local-16
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

## Lane 10
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit / mobile-360 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Lane 14
- admin-attributes-editor.spec.ts / C3 attributes console / AT-50 per-option labels, aliases and the inactive switch land and read back / mobile-360 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- admin-attributes-editor.spec.ts / C3 attributes console / AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere / mobile-360 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- admin-attributes-editor.spec.ts / C3 attributes console / AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere / desktop-1280 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Lane repeat
- Outside test — Timed out waiting 776s for the test suite to run
- Outside test — Timed out waiting 776s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
