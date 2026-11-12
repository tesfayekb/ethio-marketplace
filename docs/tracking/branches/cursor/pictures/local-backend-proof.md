# Local backend proof (non-gating)

- Commit: `a0c67164fecd68deb1d6fe45d666f428cce8f405`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43319295611

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 920 | 54 | applied 437/437 | 206 | 0 | 0 | 70 | 276 |
| email | 210 | 70 | applied 437/437 | 6 | 0 | 0 | 0 | 6 |
| webkit | 2261 | 58 | applied 437/437 | 14 | 38 | 2 | 12 | 66 |
| 1 | 994 | 65 | applied 437/437 | 170 | 0 | 0 | 6 | 176 |
| 2 | 1330 | 78 | applied 437/437 | 190 | 0 | 0 | 1 | 191 |
| 3 | 710 | 60 | applied 437/437 | 140 | 0 | 0 | 24 | 164 |
| 4 | 969 | 77 | applied 437/437 | 179 | 0 | 0 | 2 | 181 |
| 5 | 647 | 57 | applied 437/437 | 159 | 0 | 0 | 7 | 166 |
| 6 | 977 | 78 | applied 437/437 | 190 | 0 | 0 | 1 | 191 |
| 7 | 466 | 76 | applied 437/437 | 81 | 0 | 0 | 68 | 149 |
| 8 | 735 | 75 | applied 437/437 | 125 | 0 | 0 | 51 | 176 |
| 9 | 1074 | 68 | applied 437/437 | 168 | 0 | 0 | 13 | 181 |
| 10 | 985 | 52 | applied 437/437 | 167 | 0 | 0 | 1 | 168 |
| 11 | 879 | 66 | applied 437/437 | 139 | 0 | 0 | 36 | 175 |
| 12 | 930 | 74 | applied 437/437 | 176 | 0 | 0 | 5 | 181 |
| 13 | 821 | 78 | applied 437/437 | 149 | 0 | 0 | 17 | 166 |
| 14 | 880 | 62 | applied 437/437 | 189 | 0 | 0 | 2 | 191 |
| 15 | 436 | 67 | applied 437/437 | 96 | 0 | 0 | 62 | 158 |
| 16 | 696 | 67 | applied 437/437 | 132 | 0 | 0 | 36 | 168 |
| repeat | 1061 | 75 | applied 437/437 | 140 | 0 | 0 | 12 | 152 |
| TOTAL | — | — | — | 2816 | 38 | 2 | 426 | 3282 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 2261 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (52 tests); Not repeated: e2e/admin-listings.spec.ts (39 tests); Not repeated: e2e/feed-screens.spec.ts (20 tests); Not repeated: e2e/layout.spec.ts (9 tests); Not repeated: e2e/mfa-stepup.spec.ts (11 tests); Not repeated: e2e/my-listings-page.spec.ts (10 tests); Not repeated: e2e/photo-pipeline.spec.ts (37 tests); Not repeated: e2e/post-wizard-category.spec.ts (26 tests); Not repeated: e2e/sage-ad-page.spec.ts (15 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (7 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (18 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-image-routes.spec.ts (5 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/door-refusals.spec.ts (6 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/my-listings-ad.spec.ts (19 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-levels.spec.ts (14 tests); Not repeated: e2e/my-listings-promote.spec.ts (5 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (20 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1430 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 14 repeated; importers of a changed helper: 0 of 99; Repeat in WebKit (DEC-371): 3 of the repeated tests, on webkit-1280 and webkit-390; Not repeated (time cap): admin-categories-images.spec.ts / C2 categories console / CI-4 image tab: generate persists three assets and regenerate re-versions them / webkit-1280; Not repeated (time cap): admin-categories-images.spec.ts / C2 categories console / CI-4 image tab: generate persists three assets and regenerate re-versions them / webkit-390; Not repeated (time cap): admin-screening.spec.ts / ADMIN SCREENING / SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) / webkit-1280; Not repeated (time cap): admin-screening.spec.ts / ADMIN SCREENING / SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) / webkit-390; Not repeated (time cap): admin-screening.spec.ts / ADMIN SCREENING / SC-6 Preview as buyer draws the ad's category picture / webkit-1280; Not repeated (time cap): admin-screening.spec.ts / ADMIN SCREENING / SC-6 Preview as buyer draws the ad's category picture / webkit-390
- Database session samples during each start (INC-944): smoke 5, email 8, webkit 6, 1 7, 2 10, 3 6, 4 10, 5 5, 6 10, 7 9, 8 9, 9 8, 10 5, 11 7, 12 9, 13 10, 14 6, 15 8, 16 8, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43319295611-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-email
  - webkit: [e2e:teardown] deleted 6 user(s) owned by process 43319295611-local-webkit
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 43319295611-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 43319295611-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 43319295611-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 43319295611-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 43319295611-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 43319295611-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 43319295611-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 43319295611-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-16
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
- Step failure:
Step smoke: outcome failure
  
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-9 a live ad opens at its canonical address, server-rendered / webkit-1280 — Error: expect(received).toBe(expected) // Object.is equality
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-36 the layout follows the article's width (DEC-192, drawings v13) / webkit-1280 — Error: expect(received).toBe(expected) // Object.is equality
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-52 an ad without photos loads its category picture at once with high priority (D234) / webkit-1280 — Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-frcdaobc-jyf5wn68k8:
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-56 the gallery fits a portrait, a landscape and a square photo, in its frame and in the viewer (INC-1121) / webkit-1280 — Error: [e2e:pictures] 4 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-recybdwb-bdpcp9g7br:
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-50 the seller card fills the right column / webkit-1280 — Error: expect(received).toBe(expected) // Object.is equality
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-9 a live ad opens at its canonical address, server-rendered / webkit-390 — Error: expect(received).toBe(expected) // Object.is equality
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-36 the layout follows the article's width (DEC-192, drawings v13) / webkit-390 — Error: expect(received).toBe(expected) // Object.is equality
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-52 an ad without photos loads its category picture at once with high priority (D234) / webkit-390 — Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-mzhvifnd-7sgwctyfvm:
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-56 the gallery fits a portrait, a landscape and a square photo, in its frame and in the viewer (INC-1121) / webkit-390 — Error: [e2e:pictures] 4 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-jxzjbhhh-y82y459pky:
- admin-categories-images.spec.ts / C2 categories console / CI-4 image tab: generate persists three assets and regenerate re-versions them / webkit-1280 — Test timeout of 60000ms exceeded.
- admin-categories-images.spec.ts / C2 categories console / CI-4 image tab: generate persists three assets and regenerate re-versions them / webkit-390 — Test timeout of 60000ms exceeded.
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) / webkit-1280 — Error: expect(locator).toContainText(expected) failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) / webkit-390 — Error: expect(locator).toContainText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-6 Preview as buyer draws the ad's category picture / webkit-1280 — Test timeout of 60000ms exceeded.
- admin-screening.spec.ts / ADMIN SCREENING / SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) / webkit-1280 — Error: expect(locator).toHaveCount(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-6 Preview as buyer draws the ad's category picture / webkit-390 — Test timeout of 60000ms exceeded.
- admin-screening.spec.ts / ADMIN SCREENING / SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) / webkit-390 — Error: expect(locator).toHaveCount(expected) failed
- feed-screens.spec.ts / FEED SCREENS / FS-7 a card without a photo draws the nearest category picture, else the placeholder / webkit-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- feed-screens.spec.ts / FEED SCREENS / FS-15 the card's ribbon and the old price (D173, D175 1, D180) / webkit-1280 — Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/c/e2e-post-local-webkit-20-lxycxz:
- feed-screens.spec.ts / FEED SCREENS / FS-7 a card without a photo draws the nearest category picture, else the placeholder / webkit-390 — Error: expect(locator).toHaveAttribute(expected) failed
- feed-screens.spec.ts / FEED SCREENS / FS-15 the card's ribbon and the old price (D173, D175 1, D180) / webkit-390 — Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/c/e2e-post-local-webkit-62-ne8w3b:
- layout.spec.ts / LY-1 wide pages use most of the desktop content width / webkit-1280 — Error: page.goto: Navigation to "http://127.0.0.1:4173/settings" is interrupted by another navigation to "http://127.0.0.1:4173/"
- layout.spec.ts / LY-3 wizard actions are sticky only below md / webkit-1280 — Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
- layout.spec.ts / LY-4 wizard aside is desktop-only / webkit-1280 — Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
- mfa-stepup.spec.ts / U1f step-up authentication / MF-1 enroll: QR + secret shown, a generated code activates the factor / webkit-1280 — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-1 enroll: QR + secret shown, a generated code activates the factor / webkit-390 — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-9 each row's picture fits its box in the table and in the cards, every shape (INC-1121) / webkit-1280 — Error: expect(locator).toBeVisible() failed
- my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-9 each row's picture fits its box in the table and in the cards, every shape (INC-1121) / webkit-390 — Error: expect(locator).toBeVisible() failed
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-12 a stored photo is drawn on the photo step through a link that expires / webkit-1280 — Error: page.goto: Navigation to "http://127.0.0.1:4173/" is interrupted by another navigation to "http://127.0.0.1:4173/"
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-35 photos of every shape fit the photo step, the preview's gallery and the viewer (INC-1121) / webkit-1280 — Error: expect(locator).toBeVisible() failed
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-12 a stored photo is drawn on the photo step through a link that expires / webkit-390 — Error: PP-12: a draft holding a photo resumes past the photo step (D39)
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-35 photos of every shape fit the photo step, the preview's gallery and the viewer (INC-1121) / webkit-390 — Error: expect(locator).toBeVisible() failed
- post-wizard-category.spec.ts / POSTING WIZARD / PW-3 a folder is browsable and never selectable; its leaf is (D11) / webkit-1280 — Error: PW-3: a leaf without its own illustration showed no ancestor stand-in
- post-wizard-category.spec.ts / POSTING WIZARD / PW-3 a folder is browsable and never selectable; its leaf is (D11) / webkit-390 — Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
- sage-ad-page.spec.ts / Sage ad page at 390, light / SAP-1 each tier's ad page reads its tokens (390, light) / webkit-390 — Error: expect(received).toBe(expected) // Object.is equality
- sage-ad-page.spec.ts / Sage ad page at 390, dark / SAP-1 each tier's ad page reads its tokens (390, dark) / webkit-390 — Error: expect(received).toBe(expected) // Object.is equality
- sage-ad-page.spec.ts / Sage ad page at 834, light / SAP-1 each tier's ad page reads its tokens (834, light) / webkit-1280 — Error: expect(received).toBe(expected) // Object.is equality
- sage-ad-page.spec.ts / Sage ad page at 834, dark / SAP-1 each tier's ad page reads its tokens (834, dark) / webkit-1280 — Error: expect(received).toBe(expected) // Object.is equality
- sage-ad-page.spec.ts / Sage ad page at 1440, light / SAP-1 each tier's ad page reads its tokens (1440, light) / webkit-1280 — Error: expect(received).toBe(expected) // Object.is equality
- sage-ad-page.spec.ts / Sage ad page at 1440, dark / SAP-1 each tier's ad page reads its tokens (1440, dark) / webkit-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane repeat
- Outside test — Timed out waiting 840s for the test suite to run
- Outside test — Timed out waiting 840s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
