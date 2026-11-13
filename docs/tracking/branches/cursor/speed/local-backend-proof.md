# Local backend proof (non-gating)

- Commit: `eaa02da3db3eff3adea75926463b88cea8e2008b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43434492441

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 936 | 60 | applied 437/437 | 206 | 0 | 0 | 70 | 276 |
| email | 220 | 76 | applied 437/437 | 6 | 0 | 0 | 0 | 6 |
| webkit | 726 | 63 | applied 437/437 | 68 | 0 | 0 | 24 | 92 |
| 1 | 1093 | 76 | applied 437/437 | 170 | 0 | 0 | 6 | 176 |
| 2 | 1314 | 75 | applied 437/437 | 190 | 0 | 0 | 1 | 191 |
| 3 | 639 | 50 | applied 437/437 | 140 | 0 | 0 | 24 | 164 |
| 4 | 796 | 59 | applied 437/437 | 179 | 0 | 0 | 2 | 181 |
| 5 | 736 | 64 | applied 437/437 | 159 | 0 | 0 | 7 | 166 |
| 6 | 916 | 66 | applied 437/437 | 190 | 0 | 0 | 1 | 191 |
| 7 | 409 | 61 | applied 437/437 | 81 | 0 | 0 | 68 | 149 |
| 8 | 731 | 75 | applied 437/437 | 125 | 0 | 0 | 51 | 176 |
| 9 | 869 | 51 | applied 437/437 | 168 | 0 | 0 | 13 | 181 |
| 10 | 944 | 51 | applied 437/437 | 167 | 0 | 0 | 1 | 168 |
| 11 | 844 | 63 | applied 437/437 | 139 | 0 | 0 | 36 | 175 |
| 12 | 935 | 75 | applied 437/437 | 176 | 0 | 0 | 5 | 181 |
| 13 | 647 | 56 | applied 437/437 | 149 | 0 | 0 | 17 | 166 |
| 14 | 860 | 61 | applied 437/437 | 189 | 0 | 0 | 2 | 191 |
| 15 | 474 | 76 | applied 437/437 | 96 | 0 | 0 | 62 | 158 |
| 16 | 598 | 51 | applied 437/437 | 132 | 0 | 0 | 36 | 168 |
| repeat | 1088 | 76 | applied 437/437 | 148 | 0 | 0 | 0 | 148 |
| TOTAL | — | — | — | 2878 | 0 | 0 | 426 | 3304 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 2 1314 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (52 tests); Not repeated: e2e/admin-listings.spec.ts (39 tests); Not repeated: e2e/dialogs.spec.ts (8 tests); Not repeated: e2e/feed-screens.spec.ts (20 tests); Not repeated: e2e/layout.spec.ts (9 tests); Not repeated: e2e/mfa-stepup.spec.ts (11 tests); Not repeated: e2e/my-listings-page.spec.ts (10 tests); Not repeated: e2e/photo-pipeline.spec.ts (37 tests); Not repeated: e2e/post-wizard-category.spec.ts (26 tests); Not repeated: e2e/sage-ad-page.spec.ts (15 tests); Not repeated: e2e/sage-cards.spec.ts (20 tests); Not repeated: e2e/sage-tiers.spec.ts (26 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (7 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (18 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-image-routes.spec.ts (5 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/door-refusals.spec.ts (6 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1443 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 14 repeated; importers of a changed helper: 5 of 99; Repeat in WebKit (DEC-371): 3 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 5, email 9, webkit 7, 1 9, 2 9, 3 4, 4 5, 5 7, 6 7, 7 6, 8 9, 9 5, 10 5, 11 7, 12 9, 13 5, 14 7, 15 9, 16 5, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43434492441-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43434492441-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43434492441-local-webkit
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 43434492441-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 43434492441-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 43434492441-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 43434492441-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 43434492441-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 43434492441-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 43434492441-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 43434492441-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 43434492441-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 43434492441-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 43434492441-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 43434492441-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43434492441-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 43434492441-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 43434492441-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 43434492441-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 43434492441-local-repeat
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
