# Local backend proof (non-gating)

- Commit: `f59780cacce77687b544bd3959546c227b56503b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45494187853

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 575 | 68 | applied 553/553 | 38 | 0 | 0 | 16 | 54 |
| email | 198 | 67 | applied 553/553 | 6 | 0 | 0 | 0 | 6 |
| webkit | 848 | 69 | applied 553/553 | 80 | 0 | 0 | 24 | 104 |
| 1 | 547 | 67 | applied 553/553 | 195 | 0 | 0 | 69 | 264 |
| 2 | 830 | 69 | applied 553/553 | 168 | 1 | 0 | 21 | 190 |
| 3 | 612 | 68 | applied 553/553 | 169 | 0 | 0 | 5 | 174 |
| 4 | 780 | 68 | applied 553/553 | 131 | 5 | 1 | 5 | 142 |
| 5 | 793 | 86 | applied 553/553 | 93 | 0 | 0 | 1 | 94 |
| 6 | not run | 68 | applied 553/553 | 0 | 0 | 0 | 0 | 0 |
| 7 | 1351 | 68 | applied 553/553 | 145 | 3 | 1 | 77 | 226 |
| 8 | 1679 | 68 | applied 553/553 | 179 | 0 | 0 | 7 | 186 |
| 9 | 815 | 68 | applied 553/553 | 127 | 2 | 0 | 1 | 130 |
| 10 | 1452 | 67 | applied 553/553 | 176 | 0 | 0 | 2 | 178 |
| 11 | 663 | 85 | applied 553/553 | 126 | 0 | 0 | 8 | 134 |
| 12 | 541 | 69 | applied 553/553 | 163 | 0 | 0 | 18 | 181 |
| 13 | 907 | 69 | applied 553/553 | 156 | 0 | 0 | 8 | 164 |
| 14 | 1383 | 67 | applied 553/553 | 187 | 0 | 0 | 3 | 190 |
| 15 | 1023 | 67 | applied 553/553 | 126 | 2 | 0 | 6 | 134 |
| 16 | 515 | 69 | applied 553/553 | 171 | 1 | 0 | 48 | 220 |
| repeat | 952 | 67 | applied 553/553 | 60 | 0 | 0 | 76 | 136 |
| TOTAL | — | — | — | 2496 | 14 | 2 | 395 | 2907 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 8 1679 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-audit.spec.ts (8 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-listings.spec.ts (41 tests); Not repeated: e2e/admin-locations.spec.ts (22 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening.spec.ts (32 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (23 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-signout.spec.ts (22 tests); Not repeated: e2e/category-image-routes.spec.ts (5 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/mfa-stepup.spec.ts (14 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/settings.spec.ts (16 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (52 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (3 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (10 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (18 tests); Not repeated: e2e/door-refusals.spec.ts (7 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (20 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (9 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/layout.spec.ts (9 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (12 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (37 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (26 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/sage-ad-page.spec.ts (15 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (20 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (26 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1490 tests selected, 34 repeated; budget 643 s at 4.7 s a test; directly changed: 3 of 33 repeated; importers of a changed helper: 0 of 80; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-16 the three reads carry the public id / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-20 the reveal by public id: the owner gets his channels with no row; a buyer gets them with one row a day; a sold or unknown ad is not available; the row carries its instant (D201 §6) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-21 the sellers cap: ten distinct sellers a day, flagged for staff (D201 §6a) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-22 a new account is held to five reveals its first day (D201 §6b) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-25 no client reads or writes saved_listings; the save dial counts every signed-in attempt, a repeat save included (D201 §8, F1-5b) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts every signed-in attempt, a refused one included, and a call the dial itself refuses names its reset time and counts nothing more / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-28 who reads the reports: the reporter his own rows, nobody else's; staff with listings:review through the two admin doors; a plain account is refused / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-3 public_listing answers the public document of a live ad and nothing private / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-34 seller_feed_page: the seller's live ads by his alias in the feed's order, paged; a draft and an ad sold more than 30 days ago never; an unknown, malformed or deactivated seller is unknownSeller; no id travels / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-4 the owner reads his own flag and counts; another person is refused / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-5 only a live ad, or one sold within 30 days, has a page / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-6 views count once per address and never for the owner; shares count by channel / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-7 no client reads the buckets or calls the counting doors / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-8 every ad has a well-formed id of its own / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-31 a dependent definition cascades in the editor / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-32 an import creates a parent and its dependent in one pass / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-33 the dependency doors refuse and name what they judged / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-34 a categories:view-only operator cannot set a dependency / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-35 the options expansion reads as labels / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-48 the library's coverage column reads n/N for a select definition / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-49 saving a select definition without edits preserves every stored option field / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-50 per-option labels, aliases and the inactive switch land and read back / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-53 the allowed-values picker stores the map, reads it back, and withholds a target linked nowhere / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-54 the import dialog previews a definitions-only run and discards it / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record / mobile-360; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-56 the constraint pickers offer only co-linked targets / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-56 the constraint pickers offer only co-linked targets / mobile-360; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count / mobile-360; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-58 a rank swap within one category imports through the route / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-58 a rank swap within one category imports through the route / mobile-360; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-83 the key-facts rank imports through the route: absent stands, blank clears, clash and 5 refuse, export last, undo restores / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-83 the key-facts rank imports through the route: absent stands, blank clears, clash and 5 refuse, export last, undo restores / mobile-360; Not repeated (time cap): shell-table-law.spec.ts / shell table law / admin tables never overflow horizontally / desktop-1280; Not repeated (time cap): shell-table-law.spec.ts / shell table law / admin tables never overflow horizontally / mobile-360
- Database session samples during each start (INC-944): smoke 7, email 7, webkit 7, 1 7, 2 7, 3 7, 4 7, 5 11, 6 7, 7 7, 8 7, 9 7, 10 7, 11 11, 12 7, 13 7, 14 7, 15 7, 16 7, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/375, 2 641/658, 3 641/431, 4 640/597, 5 640/597, 6 ?/not run, 7 641/1178, 8 641/1507, 9 641/646, 10 643/1257, 11 640/457, 12 641/357, 13 640/740, 14 641/1225, 15 641/866, 16 641/352
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45494187853-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45494187853-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 45494187853-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45494187853-local-3
  - 4: [e2e:teardown] deleted 37 user(s) owned by process 45494187853-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45494187853-local-5
  - 6: not found
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 45494187853-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 45494187853-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45494187853-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45494187853-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45494187853-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45494187853-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45494187853-local-16
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
- Step failure:
Step smoke: outcome failure
  
- admin-shell.spec.ts / Admin shell (U0) / A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one / mobile-360 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- import-security.spec.ts / IMPORT-GATE attributes / @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited / mobile-360 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- import-security.spec.ts / IMPORT-GATE attributes / @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited / desktop-1280 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- import-security.spec.ts / IMPORT-GATE categories / @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited / mobile-360 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- import-security.spec.ts / IMPORT-GATE locations-countries / @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited / mobile-360 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- import-security.spec.ts / IMPORT-GATE locations-countries / @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited / desktop-1280 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- import-security.spec.ts / IMPORT-GATE locations-locations / @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited / mobile-360 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

## Lane 6
- Step failure:
Step install-chromium-s-system-libraries: outcome failure
  Fetched 1650 kB in 0s (4330 kB/s)
  Reading package lists...
  Reading package lists...
  Building dependency tree...
  Reading state information...
  Package fonts-freefont-ttf is not available, but is referred to by another package.
  This may mean that the package is missing, has been obsoleted, or
  is only available from another source
  
  E: Unable to locate package fonts-unifont
  E: Unable to locate package xfonts-cyrillic
  E: Unable to locate package xfonts-scalable
  E: Unable to locate package fonts-ipafont-gothic
  E: Unable to locate package fonts-wqy-zenhei
  E: Unable to locate package fonts-tlwg-loma-otf
  E: Package 'fonts-freefont-ttf' has no installation candidate
  Failed to install browser dependencies
  Error: Installation process exited with code: 100
  ::error title=ci-mirror::the install failed (exit 1) after apt's fetch stage — final, never run twice (DEC-276)
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium failed with exit 1 on try 1 of 1
- No JSON results; smoke skipped

## Lane 7
- Step failure:
Step smoke: outcome failure
  
- admin-categories-console.spec.ts / C2 categories console / CT-10 parent picker: retired nodes are absent and options carry paths / mobile-360 — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- legal-admin.spec.ts / Admin Legal / LGA-1 Legal cards, facts and the permission-gated admin menu / mobile-360 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- legal-admin.spec.ts / Admin Legal / LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish / mobile-360 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- legal-admin.spec.ts / Admin Legal / LGA-1 Legal cards, facts and the permission-gated admin menu / desktop-1280 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

## Lane 9
- Step failure:
Step smoke: outcome failure
  
- admin-audit.spec.ts / U3 audit & security / AS-1 gating: a plain user is refused, a moderator reads the log / desktop-1280 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- admin-roles.spec.ts / U2 roles console / RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects / desktop-1280 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-23 a commit without step-up is refused and writes nothing / mobile-360 — Error: {"counts":{"adds":0,"changes":0,"deletes":0,"retires":0,"refusals":1,"unchanged":0,"reactivations":0},"batch_id":"[account id]","refusals":[{"key":"e2e-cat-local-15-0-horcun","row":2,"file":"categories","reason":"unknownSlug","values":{"category_path":"","category_slug":"e2e-cat-local-15-0-horcun","parent_slug":"","name_en":"e2e-cat-local-15-0-horcun","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","capabilities":"","default_price_period":"","price_period_locked":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":""}}]}
- admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-23 a commit without step-up is refused and writes nothing / desktop-1280 — Error: {"counts":{"adds":0,"changes":0,"deletes":0,"retires":0,"refusals":1,"unchanged":0,"reactivations":0},"batch_id":"[account id]","refusals":[{"key":"e2e-cat-local-15-2-s26tw0","row":2,"file":"categories","reason":"unknownSlug","values":{"category_path":"","category_slug":"e2e-cat-local-15-2-s26tw0","parent_slug":"","name_en":"e2e-cat-local-15-2-s26tw0","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","capabilities":"","default_price_period":"","price_period_locked":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":""}}]}

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- admin-users.spec.ts / U1 admin users / AU-1 permission: moderator is refused, admin sees the list / mobile-360 — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

## Lane repeat
- Outside test — Timed out waiting 763s for the test suite to run
- Outside test — Timed out waiting 763s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
