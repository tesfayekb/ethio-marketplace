# Local backend proof (non-gating)

- Commit: `1a1bcd1c31bbdbf009b0029ba0a735a3b463616f`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46051288968

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 502 | 77 | applied 565/565 | 38 | 0 | 0 | 16 | 54 |
| email | 202 | 71 | applied 565/565 | 6 | 0 | 0 | 0 | 6 |
| webkit | 746 | 66 | applied 565/565 | 80 | 0 | 0 | 24 | 104 |
| 1 | 685 | 88 | applied 565/565 | 226 | 0 | 0 | 70 | 296 |
| 2 | 709 | 65 | applied 565/565 | 92 | 0 | 0 | 32 | 124 |
| 3 | 667 | 67 | applied 565/565 | 75 | 0 | 0 | 71 | 146 |
| 4 | 651 | 75 | applied 565/565 | 152 | 0 | 0 | 12 | 164 |
| 5 | 634 | 67 | applied 565/565 | 156 | 0 | 0 | 8 | 164 |
| 6 | 556 | 56 | applied 565/565 | 140 | 0 | 0 | 12 | 152 |
| 7 | 587 | 57 | applied 565/565 | 193 | 0 | 0 | 11 | 204 |
| 8 | 539 | 68 | applied 565/565 | 137 | 0 | 0 | 5 | 142 |
| 9 | 581 | 67 | applied 565/565 | 210 | 0 | 0 | 6 | 216 |
| 10 | 636 | 63 | applied 565/565 | 163 | 0 | 0 | 41 | 204 |
| 11 | 599 | 69 | applied 565/565 | 136 | 0 | 0 | 20 | 156 |
| 12 | 629 | 66 | applied 565/565 | 175 | 0 | 0 | 15 | 190 |
| 13 | 601 | 67 | applied 565/565 | 130 | 0 | 0 | 12 | 142 |
| 14 | 643 | 67 | applied 565/565 | 166 | 0 | 0 | 7 | 173 |
| 15 | 697 | 67 | applied 565/565 | 150 | 0 | 0 | 8 | 158 |
| 16 | 656 | 69 | applied 565/565 | 270 | 0 | 0 | 48 | 318 |
| repeat | 807 | 71 | applied 565/565 | 162 | 0 | 0 | 2 | 164 |
| TOTAL | — | — | — | 2857 | 0 | 0 | 420 | 3277 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 807 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (52 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (8 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (3 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-listings.spec.ts (41 tests); Not repeated: e2e/admin-locations.spec.ts (22 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening-reject.spec.ts (5 tests); Not repeated: e2e/admin-screening.spec.ts (32 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (23 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (10 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (22 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-image-routes.spec.ts (6 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (18 tests); Not repeated: e2e/door-refusals.spec.ts (7 tests); Not repeated: e2e/error-reports.spec.ts (2 tests); Not repeated: e2e/failure-crawl-admin-catalog.spec.ts (9 tests); Not repeated: e2e/failure-crawl-admin-content.spec.ts (9 tests); Not repeated: e2e/failure-crawl-admin-people.spec.ts (7 tests); Not repeated: e2e/failure-crawl-member-account.spec.ts (8 tests); Not repeated: e2e/failure-crawl-member-listings.spec.ts (5 tests); Not repeated: e2e/failure-crawl-member-public.spec.ts (7 tests); Not repeated: e2e/failure-crawl-public.spec.ts (13 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (20 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (9 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (9 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/mfa-stepup.spec.ts (14 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (12 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/offline.spec.ts (1 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (37 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (27 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-ad-page.spec.ts (15 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (20 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (26 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (16 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1561 tests selected, 42 repeated; budget 793 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 6 of 123; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 9, email 8, webkit 7, 1 12, 2 7, 3 7, 4 9, 5 7, 6 6, 7 6, 8 7, 9 7, 10 7, 11 7, 12 7, 13 7, 14 7, 15 7, 16 8, repeat 8
- Lane plan (DEC-375 b): 16 lanes over 126 files, weights from run 43431755160 (2026-11-13), the committed scripts/ci/lane-weights.json — no weights file at evidence 223ed22d0; mean 793 s, largest 793 s (+0 %); alone: none; unweighed (median 44 s): none; repeat budget 793 s; planned/test seconds: 1 793/479, 2 792/551, 3 793/504, 4 793/460, 5 793/466, 6 793/405, 7 793/434, 8 793/382, 9 793/420, 10 793/467, 11 793/433, 12 793/450, 13 792/442, 14 793/469, 15 793/530, 16 793/481
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 46051288968-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 46051288968-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 46051288968-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 46051288968-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 46051288968-local-2
  - 3: [e2e:teardown] deleted 3 user(s) owned by process 46051288968-local-3
  - 4: [e2e:teardown] deleted 11 user(s) owned by process 46051288968-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 46051288968-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 46051288968-local-6
  - 7: [e2e:teardown] deleted 5 user(s) owned by process 46051288968-local-7
  - 8: [e2e:teardown] deleted 23 user(s) owned by process 46051288968-local-8
  - 9: [e2e:teardown] deleted 15 user(s) owned by process 46051288968-local-9
  - 10: [e2e:teardown] deleted 3 user(s) owned by process 46051288968-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 46051288968-local-11
  - 12: [e2e:teardown] deleted 7 user(s) owned by process 46051288968-local-12
  - 13: [e2e:teardown] deleted 27 user(s) owned by process 46051288968-local-13
  - 14: [e2e:teardown] deleted 17 user(s) owned by process 46051288968-local-14
  - 15: [e2e:teardown] deleted 47 user(s) owned by process 46051288968-local-15
  - 16: [e2e:teardown] deleted 12 user(s) owned by process 46051288968-local-16
  - repeat: [e2e:teardown] deleted 18 user(s) owned by process 46051288968-local-repeat
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
