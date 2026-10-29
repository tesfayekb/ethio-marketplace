# Local backend proof (non-gating)

- Commit: `a7c3639c5a5adf8654190df53872f3cc3630525b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40878793849

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1011 | 107 | applied 381/381 | 196 | 0 | 0 | 62 | 258 |
| email | 178 | 115 | applied 381/381 | 6 | 0 | 0 | 0 | 6 |
| 1 | 782 | 120 | applied 381/381 | 132 | 0 | 0 | 4 | 136 |
| 2 | 1000 | 112 | applied 381/381 | 142 | 0 | 0 | 3 | 145 |
| 3 | 884 | 119 | applied 381/381 | 128 | 0 | 0 | 0 | 128 |
| 4 | 617 | 99 | applied 381/381 | 147 | 2 | 0 | 2 | 151 |
| 5 | 603 | 119 | applied 381/381 | 121 | 0 | 0 | 7 | 128 |
| 6 | 812 | 118 | applied 381/381 | 131 | 0 | 0 | 1 | 132 |
| 7 | 529 | 107 | applied 381/381 | 131 | 0 | 0 | 0 | 131 |
| 8 | 515 | 117 | applied 381/381 | 102 | 0 | 0 | 30 | 132 |
| 9 | 882 | 106 | applied 381/381 | 145 | 0 | 0 | 2 | 147 |
| 10 | 883 | 115 | applied 381/381 | 130 | 0 | 0 | 2 | 132 |
| 11 | 997 | 120 | applied 381/381 | 128 | 0 | 0 | 1 | 129 |
| 12 | 612 | 89 | applied 381/381 | 139 | 2 | 0 | 5 | 146 |
| 13 | 522 | 102 | applied 381/381 | 123 | 0 | 0 | 5 | 128 |
| 14 | 814 | 119 | applied 381/381 | 129 | 0 | 0 | 3 | 132 |
| 15 | 566 | 104 | applied 381/381 | 129 | 0 | 1 | 1 | 131 |
| 16 | 567 | 103 | applied 381/381 | 102 | 0 | 0 | 32 | 134 |
| repeat | 662 | 98 | applied 381/381 | 150 | 0 | 0 | 2 | 152 |
| TOTAL | — | — | — | 2411 | 4 | 1 | 162 | 2578 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: smoke 1011 s
- Repeat lane (DEC-283): Not repeated: e2e/shell.spec.ts (109 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-audit.spec.ts (7 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (1 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-coverage.spec.ts (8 tests); Not repeated: e2e/admin-listings.spec.ts (31 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-roles.spec.ts (13 tests); Not repeated: e2e/admin-screening.spec.ts (26 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (17 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-image-routes.spec.ts (5 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (5 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (21 tests); Not repeated: e2e/legal-certify.spec.ts (21 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/mfa-stepup.spec.ts (9 tests); Not repeated: e2e/my-listings-ad.spec.ts (18 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (8 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/overlays.spec.ts (3 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (9 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1087 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 4 of 5 repeated; importers of a changed helper: 4 of 84
- Database session samples during each start (INC-944): smoke 13, email 11, 1 13, 2 11, 3 13, 4 9, 5 13, 6 13, 7 11, 8 12, 9 13, 10 10, 11 13, 12 9, 13 10, 14 13, 15 11, 16 13, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40878793849-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40878793849-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40878793849-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40878793849-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40878793849-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 40878793849-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40878793849-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40878793849-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40878793849-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40878793849-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40878793849-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40878793849-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40878793849-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 40878793849-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40878793849-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40878793849-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40878793849-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40878793849-local-16
  - repeat: [e2e:teardown] deleted 22 user(s) owned by process 40878793849-local-repeat
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail]); the auth server's text columns '' (INC-808)
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
RLS on 85 of 85 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- i18n-coverage.spec.ts / i18n chrome coverage (Amharic) / the admin shell renders no English fallback / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed
- i18n-coverage.spec.ts / i18n chrome coverage (Amharic) / the roles permission matrix renders no raw English vocabulary / mobile-360 — Error: matrix vocabulary: raw English actions/resources rendered

## Lane 12
- Step failure:
Step smoke: outcome failure
  
- i18n-coverage.spec.ts / i18n chrome coverage (Amharic) / the admin shell renders no English fallback / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed
- i18n-coverage.spec.ts / i18n chrome coverage (Amharic) / the roles permission matrix renders no raw English vocabulary / desktop-1280 — Error: matrix vocabulary: raw English actions/resources rendered

## Lane 15
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-145 an over-limit options read says so under its control, and a second open loads the list / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
