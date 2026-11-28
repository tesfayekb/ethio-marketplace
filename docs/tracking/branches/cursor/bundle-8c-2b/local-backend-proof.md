# Local backend proof (non-gating)

- Commit: `ce1d058901d7bc718ebe7810526e11e3dde3a32f`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46117003671

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 458 | 68 | applied 565/565 | 40 | 0 | 0 | 16 | 56 |
| email | 170 | 66 | applied 565/565 | 6 | 0 | 0 | 0 | 6 |
| webkit | 994 | 86 | applied 565/565 | 80 | 0 | 0 | 24 | 104 |
| 1 | 584 | 68 | applied 565/565 | 217 | 0 | 0 | 81 | 298 |
| 2 | 817 | 71 | applied 565/565 | 145 | 0 | 0 | 15 | 160 |
| 3 | 596 | 66 | applied 565/565 | 113 | 0 | 0 | 9 | 122 |
| 4 | 628 | 66 | applied 565/565 | 128 | 0 | 0 | 6 | 134 |
| 5 | 672 | 70 | applied 565/565 | 134 | 0 | 0 | 8 | 142 |
| 6 | 568 | 66 | applied 565/565 | 193 | 0 | 0 | 11 | 204 |
| 7 | 704 | 79 | applied 565/565 | 168 | 0 | 0 | 68 | 236 |
| 8 | 741 | 86 | applied 565/565 | 177 | 0 | 0 | 21 | 198 |
| 9 | 643 | 68 | applied 565/565 | 145 | 0 | 0 | 1 | 146 |
| 10 | 590 | 68 | applied 565/565 | 113 | 0 | 0 | 3 | 116 |
| 11 | 605 | 66 | applied 565/565 | 281 | 0 | 0 | 3 | 284 |
| 12 | 640 | 67 | applied 565/565 | 133 | 0 | 0 | 59 | 192 |
| 13 | 643 | 66 | applied 565/565 | 160 | 0 | 0 | 14 | 174 |
| 14 | 692 | 91 | applied 565/565 | 126 | 0 | 0 | 25 | 151 |
| 15 | 815 | 87 | applied 565/565 | 158 | 0 | 0 | 46 | 204 |
| 16 | 596 | 66 | applied 565/565 | 184 | 0 | 0 | 10 | 194 |
| repeat | 978 | 68 | applied 565/565 | 170 | 0 | 0 | 2 | 172 |
| TOTAL | — | — | — | 2871 | 0 | 0 | 422 | 3293 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 994 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-listings.spec.ts (40 tests); Not repeated: e2e/admin-locations.spec.ts (22 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-screening.spec.ts (30 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (16 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/mfa-stepup.spec.ts (13 tests); Not repeated: e2e/staff-gate.spec.ts (3 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page.spec.ts (41 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (8 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (2 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening-reject.spec.ts (5 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (23 tests); Not repeated: e2e/admin-translations-governance.spec.ts (10 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (21 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-image-routes.spec.ts (6 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (12 tests); Not repeated: e2e/door-refusals.spec.ts (7 tests); Not repeated: e2e/failure-crawl-admin-catalog.spec.ts (9 tests); Not repeated: e2e/failure-crawl-admin-content.spec.ts (11 tests); Not repeated: e2e/failure-crawl-admin-people.spec.ts (7 tests); Not repeated: e2e/failure-crawl-member-account.spec.ts (8 tests); Not repeated: e2e/failure-crawl-member-listings.spec.ts (5 tests); Not repeated: e2e/failure-crawl-member-public.spec.ts (7 tests); Not repeated: e2e/failure-crawl-public.spec.ts (13 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (9 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (11 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/offline.spec.ts (1 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (35 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (25 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-ad-page.spec.ts (9 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (16 tests); Not repeated: e2e/shell-bands.spec.ts (6 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat by id: e2e/legal-doors.spec.ts — LG-3 (1 of 17 tests, the ids on lines this push changed); Repeat cost: weights from run 46098160058 (2026-11-28), docs/tracking/branches/lovable/next/lane-weights.json at evidence 32a1eaad2 (run 46098160058; 0 of 3 files unread); mean 10.0 s a repeated test, 430.8 s a repetition at one worker; WebKit tests costed by their file's mobile-360 measure; 0 test-project measures at the weights' median 3.1 s; Repeat: each 2 on both projects; 1511 tests selected, 43 repeated; budget 862 s at 10.0 s a test; directly changed: 7 of 20 repeated; importers of a changed helper: 1 of 105; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 1 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 8, email 7, webkit 11, 1 7, 2 8, 3 7, 4 7, 5 8, 6 7, 7 10, 8 11, 9 7, 10 7, 11 7, 12 7, 13 7, 14 12, 15 11, 16 7, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 127 files, weights from run 46098160058 (2026-11-28), docs/tracking/branches/lovable/next/lane-weights.json at evidence 32a1eaad2 (run 46098160058; 0 of 3 files unread); mean 859 s, largest 862 s (+0 %); alone: none; unweighed (median 45 s): none; repeat budget 862 s; planned/test seconds: 1 858/423, 2 857/628, 3 861/441, 4 857/452, 5 859/478, 6 861/403, 7 857/505, 8 857/535, 9 859/456, 10 859/414, 11 862/423, 12 857/466, 13 860/475, 14 861/466, 15 859/589, 16 857/418
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 46117003671-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 46117003671-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 46117003671-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 46117003671-local-1
  - 2: [e2e:teardown] deleted 13 user(s) owned by process 46117003671-local-2
  - 3: [e2e:teardown] deleted 49 user(s) owned by process 46117003671-local-3
  - 4: [e2e:teardown] deleted 7 user(s) owned by process 46117003671-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 46117003671-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 46117003671-local-6
  - 7: [e2e:teardown] deleted 5 user(s) owned by process 46117003671-local-7
  - 8: [e2e:teardown] deleted 11 user(s) owned by process 46117003671-local-8
  - 9: [e2e:teardown] deleted 7 user(s) owned by process 46117003671-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 46117003671-local-10
  - 11: [e2e:teardown] deleted 7 user(s) owned by process 46117003671-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 46117003671-local-12
  - 13: [e2e:teardown] deleted 23 user(s) owned by process 46117003671-local-13
  - 14: [e2e:teardown] deleted 37 user(s) owned by process 46117003671-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 46117003671-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 46117003671-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 46117003671-local-repeat
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
RLS on 92 of 92 public tables
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
