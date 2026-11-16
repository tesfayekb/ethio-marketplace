# Local backend proof (non-gating)

- Commit: `6a6290a49485fe0b9a13401d701f3b90e546e56b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43828673900

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 371 | 61 | applied 499/499 | 27 | 0 | 0 | 5 | 32 |
| email | 172 | 61 | applied 499/499 | 6 | 0 | 0 | 0 | 6 |
| webkit | 661 | 62 | applied 499/499 | 70 | 0 | 0 | 24 | 94 |
| 1 | 520 | 62 | applied 499/499 | 188 | 0 | 0 | 69 | 257 |
| 2 | 492 | 63 | applied 499/499 | 174 | 0 | 0 | 26 | 200 |
| 3 | 550 | 60 | applied 499/499 | 169 | 0 | 0 | 5 | 174 |
| 4 | 513 | 61 | applied 499/499 | 137 | 0 | 0 | 5 | 142 |
| 5 | 533 | 62 | applied 499/499 | 93 | 0 | 0 | 1 | 94 |
| 6 | 594 | 69 | applied 499/499 | 153 | 0 | 0 | 41 | 194 |
| 7 | 498 | 63 | applied 499/499 | 147 | 0 | 0 | 77 | 224 |
| 8 | 508 | 62 | applied 499/499 | 179 | 0 | 0 | 7 | 186 |
| 9 | 618 | 80 | applied 499/499 | 123 | 0 | 0 | 1 | 124 |
| 10 | 489 | 61 | applied 499/499 | 160 | 0 | 0 | 2 | 162 |
| 11 | 651 | 78 | applied 499/499 | 120 | 0 | 0 | 8 | 128 |
| 12 | 530 | 59 | applied 499/499 | 164 | 0 | 0 | 19 | 183 |
| 13 | 524 | 64 | applied 499/499 | 157 | 0 | 0 | 9 | 166 |
| 14 | 617 | 78 | applied 499/499 | 183 | 0 | 0 | 5 | 188 |
| 15 | 557 | 62 | applied 499/499 | 124 | 0 | 0 | 8 | 132 |
| 16 | 619 | 78 | applied 499/499 | 172 | 0 | 0 | 48 | 220 |
| repeat | 785 | 66 | applied 499/499 | 128 | 0 | 0 | 8 | 136 |
| TOTAL | — | — | — | 2674 | 0 | 0 | 368 | 3042 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: repeat 785 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (52 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-audit.spec.ts (8 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-listings.spec.ts (39 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-monetisation.spec.ts (15 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening.spec.ts (29 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (18 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-image-routes.spec.ts (5 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (10 tests); Not repeated: e2e/door-refusals.spec.ts (6 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (20 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (1 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (9 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (16 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/mfa-stepup.spec.ts (11 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (10 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/name-check-queue.spec.ts (3 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (37 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (26 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-ad-page.spec.ts (15 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (20 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (26 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1440 tests selected, 34 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 6 of 112; Repeat in WebKit (DEC-371): 1 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 6, email 6, webkit 7, 1 6, 2 6, 3 6, 4 6, 5 6, 6 8, 7 6, 8 6, 9 10, 10 6, 11 10, 12 6, 13 7, 14 10, 15 6, 16 10, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/341, 2 641/334, 3 641/367, 4 640/340, 5 640/374, 6 641/407, 7 641/318, 8 641/337, 9 641/416, 10 643/325, 11 640/453, 12 641/352, 13 640/344, 14 641/423, 15 641/370, 16 641/430
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43828673900-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43828673900-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43828673900-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43828673900-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43828673900-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43828673900-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43828673900-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43828673900-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43828673900-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43828673900-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43828673900-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43828673900-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43828673900-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43828673900-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43828673900-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43828673900-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43828673900-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43828673900-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43828673900-local-16
  - repeat: [e2e:teardown] deleted 18 user(s) owned by process 43828673900-local-repeat
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
