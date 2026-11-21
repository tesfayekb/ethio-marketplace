# Local backend proof (non-gating)

- Commit: `3f6e46bc4f6d5de06fbf56955cae5143b8cf725b`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44894986213

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 424 | 67 | applied 544/544 | 38 | 0 | 0 | 16 | 54 |
| email | 192 | 56 | applied 544/544 | 6 | 0 | 0 | 0 | 6 |
| webkit | 860 | 78 | applied 544/544 | 71 | 0 | 1 | 24 | 96 |
| 1 | 494 | 66 | applied 544/544 | 188 | 0 | 0 | 69 | 257 |
| 2 | 479 | 57 | applied 544/544 | 169 | 0 | 0 | 21 | 190 |
| 3 | 548 | 67 | applied 544/544 | 169 | 0 | 0 | 5 | 174 |
| 4 | 559 | 62 | applied 544/544 | 137 | 0 | 0 | 5 | 142 |
| 5 | 559 | 65 | applied 544/544 | 93 | 0 | 0 | 1 | 94 |
| 6 | 555 | 68 | applied 544/544 | 153 | 0 | 0 | 41 | 194 |
| 7 | 647 | 86 | applied 544/544 | 149 | 0 | 0 | 77 | 226 |
| 8 | 658 | 86 | applied 544/544 | 179 | 0 | 0 | 7 | 186 |
| 9 | 668 | 87 | applied 544/544 | 129 | 0 | 0 | 1 | 130 |
| 10 | 508 | 65 | applied 544/544 | 160 | 0 | 0 | 2 | 162 |
| 11 | 516 | 65 | applied 544/544 | 120 | 0 | 0 | 8 | 128 |
| 12 | 596 | 69 | applied 544/544 | 163 | 0 | 0 | 18 | 181 |
| 13 | 470 | 67 | applied 544/544 | 156 | 0 | 0 | 8 | 164 |
| 14 | 580 | 74 | applied 544/544 | 181 | 0 | 0 | 3 | 184 |
| 15 | 651 | 86 | applied 544/544 | 122 | 0 | 0 | 6 | 128 |
| 16 | 483 | 57 | applied 544/544 | 172 | 0 | 0 | 48 | 220 |
| repeat | 341 | 65 | applied 544/544 | 102 | 0 | 0 | 34 | 136 |
| TOTAL | — | — | — | 2657 | 0 | 1 | 394 | 3052 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 860 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (52 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (8 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (2 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-listings.spec.ts (39 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-monetisation.spec.ts (15 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening.spec.ts (29 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (22 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-image-routes.spec.ts (5 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (10 tests); Not repeated: e2e/door-refusals.spec.ts (7 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (20 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (1 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (9 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (16 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/mfa-stepup.spec.ts (11 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (10 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/name-check-queue.spec.ts (3 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (37 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (26 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-ad-page.spec.ts (15 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (20 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (26 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1434 tests selected, 34 repeated; budget 643 s at 4.7 s a test; directly changed: 5 of 5 repeated; importers of a changed helper: 2 of 108; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 7, email 6, webkit 10, 1 7, 2 6, 3 7, 4 6, 5 7, 6 8, 7 11, 8 11, 9 11, 10 7, 11 7, 12 8, 13 7, 14 9, 15 11, 16 6, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/337, 2 641/322, 3 641/369, 4 640/363, 5 640/371, 6 641/375, 7 641/447, 8 641/453, 9 641/465, 10 643/324, 11 640/356, 12 641/408, 13 640/303, 14 641/381, 15 641/455, 16 641/326
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44894986213-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44894986213-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44894986213-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44894986213-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44894986213-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44894986213-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44894986213-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44894986213-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44894986213-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44894986213-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44894986213-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44894986213-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 44894986213-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44894986213-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44894986213-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44894986213-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44894986213-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44894986213-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44894986213-local-16
  - repeat: [e2e:teardown] deleted 18 user(s) owned by process 44894986213-local-repeat
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
- sage-ad-page.spec.ts / Sage ad page at 390, dark / SAP-1 each tier's ad page reads its tokens (390, dark) / webkit-390 — Error: premium ad: the segment

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
