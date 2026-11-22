# Local backend proof (non-gating)

- Commit: `1ed26064d1cd5de58a409ca376ffeb0b43749dc1`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44992385314

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 456 | 73 | applied 545/545 | 38 | 0 | 0 | 16 | 54 |
| email | 183 | 68 | applied 545/545 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1159 | 65 | applied 545/545 | 67 | 5 | 0 | 24 | 96 |
| 1 | 544 | 70 | applied 545/545 | 188 | 0 | 0 | 69 | 257 |
| 2 | 504 | 68 | applied 545/545 | 169 | 0 | 0 | 21 | 190 |
| 3 | 1174 | 86 | applied 545/545 | 161 | 8 | 0 | 5 | 174 |
| 4 | 489 | 66 | applied 545/545 | 137 | 0 | 0 | 5 | 142 |
| 5 | 556 | 66 | applied 545/545 | 93 | 0 | 0 | 1 | 94 |
| 6 | 652 | 88 | applied 545/545 | 153 | 0 | 0 | 41 | 194 |
| 7 | 609 | 71 | applied 545/545 | 149 | 0 | 0 | 77 | 226 |
| 8 | 558 | 68 | applied 545/545 | 179 | 0 | 0 | 7 | 186 |
| 9 | 576 | 67 | applied 545/545 | 129 | 0 | 0 | 1 | 130 |
| 10 | 501 | 67 | applied 545/545 | 158 | 2 | 0 | 2 | 162 |
| 11 | 1407 | 68 | applied 545/545 | 108 | 14 | 0 | 8 | 130 |
| 12 | 549 | 66 | applied 545/545 | 163 | 0 | 0 | 18 | 181 |
| 13 | 595 | 86 | applied 545/545 | 156 | 0 | 0 | 8 | 164 |
| 14 | 595 | 77 | applied 545/545 | 181 | 0 | 0 | 3 | 184 |
| 15 | 616 | 74 | applied 545/545 | 124 | 0 | 0 | 6 | 130 |
| 16 | 704 | 87 | applied 545/545 | 170 | 2 | 0 | 48 | 220 |
| repeat | 736 | 66 | applied 545/545 | 116 | 0 | 0 | 0 | 116 |
| TOTAL | — | — | — | 2645 | 31 | 0 | 360 | 3036 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 11 1407 s
- Repeat lane (DEC-283): Not repeated: e2e/dialogs.spec.ts (10 tests); Not repeated: e2e/house-style.spec.ts (7 tests); Repeat: each 2 on both projects; 46 tests selected, 29 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 3 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 2 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 8, email 7, webkit 7, 1 8, 2 7, 3 11, 4 7, 5 7, 6 12, 7 8, 8 8, 9 7, 10 7, 11 7, 12 7, 13 11, 14 10, 15 8, 16 11, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/351, 2 641/333, 3 641/965, 4 640/326, 5 640/372, 6 641/445, 7 641/362, 8 641/372, 9 641/388, 10 643/335, 11 640/1229, 12 641/363, 13 640/398, 14 641/397, 15 641/414, 16 641/492
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44992385314-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44992385314-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44992385314-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44992385314-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44992385314-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44992385314-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44992385314-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44992385314-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 44992385314-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44992385314-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44992385314-local-14
  - 15: [e2e:teardown] deleted 45 user(s) owned by process 44992385314-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44992385314-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 44992385314-local-repeat
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
  
- admin-categories-images.spec.ts / C2 categories console / CI-4 image tab: generate persists three assets and regenerate re-versions them / webkit-1280 — Test timeout of 60000ms exceeded.
- admin-categories-images.spec.ts / C2 categories console / CI-4 image tab: generate persists three assets and regenerate re-versions them / webkit-390 — Test timeout of 60000ms exceeded.
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) / webkit-1280 — Test timeout of 60000ms exceeded.
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) / webkit-390 — Test timeout of 60000ms exceeded.
- dialogs.spec.ts / the full-screen surfaces on the one primitive (turn S6-4) / DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected / webkit-1280 — Error: the pin map @ 1440 light: the 32rem card

## Lane 3
- Step failure:
Step smoke: outcome failure
  
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-113 directions are saved, survive a pin move, and refuse a phone number / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-178 a late read of the place text never replaces a newer save / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-179 a pin save never restates directions the step could not read / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-186 a pin saved while the directions save is unanswered keeps both / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-113 directions are saved, survive a pin move, and refuse a phone number / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-178 a late read of the place text never replaces a newer save / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-179 a pin save never restates directions the step could not read / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-186 a pin saved while the directions save is unanswered keeps both / desktop-1280 — Test timeout of 60000ms exceeded.

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- dialogs.spec.ts / one dialog look on a real surface (turn S6-1) / DLG-E7 Share this ad: a bottom sheet with its grabber below md, a floating dialog from md / mobile-360 — Error: share @ 390 padding
- dialogs.spec.ts / the full-screen surfaces on the one primitive (turn S6-4) / DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected / desktop-1280 — Error: the pin map @ 1440 light: the 32rem card

## Lane 11
- Step failure:
Step smoke: outcome failure
  
- post-wizard-place.spec.ts / POSTING WIZARD / PW-37 a tap on the map places a pin and the door stores it as exact / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-39 an approximate pin is stored as approx and drawn as an area, never a point / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-40 removing the pin clears all four columns / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-160 Use my location stays pressed until the pin is moved by hand / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-37 a tap on the map places a pin and the door stores it as exact / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-39 an approximate pin is stored as approx and drawn as an area, never a point / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-40 removing the pin clears all four columns / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-160 Use my location stays pressed until the pin is moved by hand / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-100 every category offers the map; after Save the preview shows the pin / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-96 the saved pin keeps its zoom; the dropper reopens at it / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-100 every category offers the map; after Save the preview shows the pin / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-96 the saved pin keeps its zoom; the dropper reopens at it / desktop-1280 — Test timeout of 60000ms exceeded.

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer / desktop-1280 — Error: PP-22: on a computer the thumbnails are not beside the photo
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) / desktop-1280 — Error: PP-23: on a computer the wide photo's top does not meet the first thumbnail's

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
