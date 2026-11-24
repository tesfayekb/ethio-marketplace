# Local backend proof (non-gating)

- Commit: `9ea47373664b36797b7ba65f0de9041b5ebf8669`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45494230491

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 579 | 68 | applied 555/555 | 38 | 0 | 0 | 16 | 54 |
| email | 224 | 67 | applied 555/555 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1097 | 87 | applied 555/555 | 79 | 0 | 1 | 24 | 104 |
| 1 | 656 | 88 | applied 555/555 | 195 | 0 | 0 | 69 | 264 |
| 2 | 926 | 87 | applied 555/555 | 169 | 0 | 0 | 21 | 190 |
| 3 | 603 | 69 | applied 555/555 | 169 | 0 | 0 | 5 | 174 |
| 4 | 926 | 66 | applied 555/555 | 137 | 0 | 0 | 5 | 142 |
| 5 | 739 | 65 | applied 555/555 | 93 | 0 | 0 | 1 | 94 |
| 6 | 1139 | 68 | applied 555/555 | 157 | 2 | 0 | 41 | 200 |
| 7 | 1407 | 68 | applied 555/555 | 143 | 6 | 0 | 77 | 226 |
| 8 | 1705 | 69 | applied 555/555 | 179 | 0 | 0 | 7 | 186 |
| 9 | 845 | 57 | applied 555/555 | 127 | 2 | 0 | 1 | 130 |
| 10 | 1476 | 81 | applied 555/555 | 174 | 2 | 0 | 2 | 178 |
| 11 | 517 | 67 | applied 555/555 | 126 | 0 | 0 | 8 | 134 |
| 12 | 518 | 67 | applied 555/555 | 163 | 0 | 0 | 18 | 181 |
| 13 | 997 | 77 | applied 555/555 | 156 | 0 | 0 | 8 | 164 |
| 14 | 1411 | 70 | applied 555/555 | 187 | 0 | 0 | 3 | 190 |
| 15 | 1650 | 87 | applied 555/555 | 118 | 10 | 0 | 6 | 134 |
| 16 | 653 | 87 | applied 555/555 | 172 | 0 | 0 | 48 | 220 |
| repeat | 966 | 68 | applied 555/555 | 59 | 0 | 0 | 77 | 136 |
| TOTAL | — | — | — | 2647 | 22 | 1 | 437 | 3107 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 8 1705 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-audit.spec.ts (8 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-listings.spec.ts (41 tests); Not repeated: e2e/admin-locations.spec.ts (22 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening.spec.ts (32 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (23 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-signout.spec.ts (22 tests); Not repeated: e2e/category-image-routes.spec.ts (5 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/mfa-stepup.spec.ts (14 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/settings.spec.ts (16 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (52 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (3 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (10 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (18 tests); Not repeated: e2e/door-refusals.spec.ts (7 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (20 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (9 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/layout.spec.ts (9 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (12 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (37 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (26 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/sage-ad-page.spec.ts (15 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (20 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (26 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1490 tests selected, 34 repeated; budget 643 s at 4.7 s a test; directly changed: 3 of 33 repeated; importers of a changed helper: 0 of 80; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-16 the three reads carry the public id / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-20 the reveal by public id: the owner gets his channels with no row; a buyer gets them with one row a day; a sold or unknown ad is not available; the row carries its instant (D201 §6) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-21 the sellers cap: ten distinct sellers a day, flagged for staff (D201 §6a) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-22 a new account is held to five reveals its first day (D201 §6b) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-25 no client reads or writes saved_listings; the save dial counts every signed-in attempt, a repeat save included (D201 §8, F1-5b) / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts every signed-in attempt, a refused one included, and a call the dial itself refuses names its reset time and counts nothing more / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-28 who reads the reports: the reporter his own rows, nobody else's; staff with listings:review through the two admin doors; a plain account is refused / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-3 public_listing answers the public document of a live ad and nothing private / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-34 seller_feed_page: the seller's live ads by his alias in the feed's order, paged; a draft and an ad sold more than 30 days ago never; an unknown, malformed or deactivated seller is unknownSeller; no id travels / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-4 the owner reads his own flag and counts; another person is refused / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-5 only a live ad, or one sold within 30 days, has a page / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-6 views count once per address and never for the owner; shares count by channel / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-7 no client reads the buckets or calls the counting doors / desktop-1280; Not repeated (time cap): ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-8 every ad has a well-formed id of its own / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-31 a dependent definition cascades in the editor / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-32 an import creates a parent and its dependent in one pass / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-33 the dependency doors refuse and name what they judged / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-34 a categories:view-only operator cannot set a dependency / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-35 the options expansion reads as labels / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-48 the library's coverage column reads n/N for a select definition / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-49 saving a select definition without edits preserves every stored option field / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-50 per-option labels, aliases and the inactive switch land and read back / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-53 the allowed-values picker stores the map, reads it back, and withholds a target linked nowhere / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-54 the import dialog previews a definitions-only run and discards it / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record / mobile-360; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-56 the constraint pickers offer only co-linked targets / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-56 the constraint pickers offer only co-linked targets / mobile-360; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count / mobile-360; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-58 a rank swap within one category imports through the route / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-58 a rank swap within one category imports through the route / mobile-360; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-83 the key-facts rank imports through the route: absent stands, blank clears, clash and 5 refuse, export last, undo restores / desktop-1280; Not repeated (time cap): admin-attributes-editor.spec.ts / C3 attributes console / AT-83 the key-facts rank imports through the route: absent stands, blank clears, clash and 5 refuse, export last, undo restores / mobile-360; Not repeated (time cap): shell-table-law.spec.ts / shell table law / admin tables never overflow horizontally / desktop-1280; Not repeated (time cap): shell-table-law.spec.ts / shell table law / admin tables never overflow horizontally / mobile-360
- Database session samples during each start (INC-944): smoke 7, email 7, webkit 11, 1 12, 2 11, 3 7, 4 7, 5 7, 6 7, 7 7, 8 7, 9 6, 10 10, 11 7, 12 7, 13 10, 14 7, 15 11, 16 12, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/432, 2 641/724, 3 641/442, 4 640/727, 5 640/550, 6 641/964, 7 641/1224, 8 641/1505, 9 641/685, 10 643/1284, 11 640/354, 12 641/355, 13 640/786, 14 641/1232, 15 641/1445, 16 641/448
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45494230491-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45494230491-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 45494230491-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45494230491-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45494230491-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45494230491-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 45494230491-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 45494230491-local-9
  - 10: [e2e:teardown] deleted 9 user(s) owned by process 45494230491-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45494230491-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45494230491-local-14
  - 15: [e2e:teardown] deleted 65 user(s) owned by process 45494230491-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45494230491-local-16
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

## Lane webkit
- sage-ad-page.spec.ts / Sage ad page at 390, dark / SAP-1 each tier's ad page reads its tokens (390, dark) / webkit-390 — Error: regular ad: the segment

## Lane 6
- Step failure:
Step smoke: outcome failure
  
- admin-locations.spec.ts / L2a locations console / LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 7
- Step failure:
Step smoke: outcome failure
  
- admin-categories-console.spec.ts / C2 categories console / CT-7b browse paths: an unproven factor cannot move a pointer / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-7b browse paths: an unproven factor cannot move a pointer / desktop-1280 — Error: expect(locator).toBeVisible() failed
- door-refusals.spec.ts / DRF-1 has_permission answers about the caller only: another account asking about a holder reads false / mobile-360 — Error: the holder reads the truth about itself
- door-refusals.spec.ts / DRF-1 has_permission answers about the caller only: another account asking about a holder reads false / desktop-1280 — Error: the holder reads the truth about itself
- legal-admin.spec.ts / Admin Legal / LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- legal-admin.spec.ts / Admin Legal / LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 9
- Step failure:
Step smoke: outcome failure
  
- admin-roles.spec.ts / U2 roles console / RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects / mobile-360 — Error: expect(page).not.toHaveURL(expected) failed
- admin-roles.spec.ts / U2 roles console / RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects / desktop-1280 — Error: expect(page).not.toHaveURL(expected) failed

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-23 a commit without step-up is refused and writes nothing / mobile-360 — Error: {"error":"forbidden"}
- admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-23 a commit without step-up is refused and writes nothing / desktop-1280 — Error: {"error":"forbidden"}
- mfa-stepup.spec.ts / U1f step-up authentication / MF-3 no factor: the modal explains and the RPC is never called / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-3 no factor: the modal explains and the RPC is never called / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f-4 step-up freshness / MF-6 unenrolling the only factor drops the stepped-up state / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f-4 step-up freshness / MF-6 unenrolling the only factor drops the stepped-up state / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7c a no-factor identity is released with the hint / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7c a no-factor identity is released with the hint / desktop-1280 — Test timeout of 60000ms exceeded.

## Lane repeat
- Outside test — Timed out waiting 763s for the test suite to run
- Outside test — Timed out waiting 763s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
