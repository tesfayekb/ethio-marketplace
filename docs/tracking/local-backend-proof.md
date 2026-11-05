# Local backend proof (non-gating)

- Commit: `3b65c7614038afa4ae941fd01fa84eccc66afd37`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42062915236

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1047 | 72 | applied 409/409 | 206 | 0 | 0 | 70 | 276 |
| email | 210 | 74 | applied 409/409 | 6 | 0 | 0 | 0 | 6 |
| 1 | 948 | 59 | applied 409/409 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1324 | 73 | applied 409/409 | 190 | 0 | 0 | 1 | 191 |
| 3 | 1244 | 65 | applied 409/409 | 134 | 0 | 0 | 24 | 158 |
| 4 | 941 | 66 | applied 409/409 | 177 | 0 | 0 | 2 | 179 |
| 5 | 858 | 74 | applied 409/409 | 151 | 0 | 0 | 7 | 158 |
| 6 | 973 | 75 | applied 409/409 | 191 | 0 | 0 | 1 | 192 |
| 7 | 491 | 74 | applied 409/409 | 91 | 0 | 0 | 68 | 159 |
| 8 | 763 | 80 | applied 409/409 | 115 | 0 | 0 | 51 | 166 |
| 9 | 1642 | 63 | applied 409/409 | 165 | 0 | 1 | 13 | 179 |
| 10 | 1089 | 63 | applied 409/409 | 167 | 0 | 0 | 1 | 168 |
| 11 | 948 | 70 | applied 409/409 | 133 | 0 | 0 | 36 | 169 |
| 12 | 956 | 72 | applied 409/409 | 174 | 0 | 0 | 5 | 179 |
| 13 | 779 | 73 | applied 409/409 | 149 | 0 | 0 | 17 | 166 |
| 14 | 982 | 74 | applied 409/409 | 182 | 0 | 0 | 2 | 184 |
| 15 | 380 | 57 | applied 409/409 | 96 | 0 | 0 | 62 | 158 |
| 16 | 707 | 74 | applied 409/409 | 132 | 0 | 0 | 36 | 168 |
| repeat | 522 | 69 | applied 409/409 | 152 | 0 | 0 | 0 | 152 |
| TOTAL | — | — | — | 2779 | 0 | 1 | 402 | 3182 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 9 1642 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/admin-listings.spec.ts (38 tests); Not repeated: e2e/admin-screening.spec.ts (27 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/my-listings-ad.spec.ts (18 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-levels.spec.ts (13 tests); Not repeated: e2e/my-listings-page.spec.ts (8 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/sage-ad-page.spec.ts (9 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (1 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dialogs.spec.ts (7 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/legal-admin.spec.ts (21 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/posting-routes-dials.spec.ts (9 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1122 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 5 of 25 repeated; importers of a changed helper: 0 of 49
- Database session samples during each start (INC-944): smoke 9, email 9, 1 6, 2 9, 3 6, 4 7, 5 9, 6 9, 7 9, 8 10, 9 6, 10 7, 11 8, 12 9, 13 9, 14 9, 15 6, 16 9, repeat 8
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42062915236-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42062915236-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42062915236-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42062915236-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42062915236-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42062915236-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42062915236-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42062915236-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42062915236-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42062915236-local-8
  - 9: [e2e:teardown] deleted 10 user(s) owned by process 42062915236-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42062915236-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42062915236-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42062915236-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42062915236-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42062915236-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42062915236-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42062915236-local-16
  - repeat: [e2e:teardown] deleted 30 user(s) owned by process 42062915236-local-repeat
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
- admin-audit.spec.ts / U3 audit & security / IMP-1 impersonation: super admin opens a read-only session and ends it / desktop-1280 — [31mTest timeout of 60000ms exceeded.[39m

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
