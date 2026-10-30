# Local backend proof (non-gating)

- Commit: `9d3e46d617c2206dc8527a693ced63d402e61a2d`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40984475820

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 910 | 104 | applied 382/382 | 196 | 0 | 0 | 62 | 258 |
| email | 177 | 115 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 739 | 117 | applied 382/382 | 132 | 0 | 0 | 4 | 136 |
| 2 | 992 | 98 | applied 382/382 | 142 | 0 | 0 | 3 | 145 |
| 3 | 865 | 117 | applied 382/382 | 128 | 0 | 0 | 0 | 128 |
| 4 | 720 | 119 | applied 382/382 | 149 | 0 | 0 | 2 | 151 |
| 5 | 588 | 104 | applied 382/382 | 125 | 0 | 0 | 7 | 132 |
| 6 | 698 | 98 | applied 382/382 | 131 | 0 | 0 | 1 | 132 |
| 7 | 460 | 101 | applied 382/382 | 131 | 0 | 0 | 0 | 131 |
| 8 | 589 | 105 | applied 382/382 | 113 | 0 | 0 | 30 | 143 |
| 9 | 656 | 109 | applied 382/382 | 134 | 0 | 0 | 2 | 136 |
| 10 | 1005 | 106 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 11 | 986 | 106 | applied 382/382 | 128 | 0 | 0 | 1 | 129 |
| 12 | 490 | 94 | applied 382/382 | 141 | 0 | 0 | 5 | 146 |
| 13 | 629 | 105 | applied 382/382 | 127 | 0 | 0 | 5 | 132 |
| 14 | 793 | 118 | applied 382/382 | 129 | 0 | 0 | 3 | 132 |
| 15 | 593 | 120 | applied 382/382 | 130 | 0 | 0 | 1 | 131 |
| 16 | 587 | 117 | applied 382/382 | 102 | 0 | 0 | 32 | 134 |
| repeat | 986 | 96 | applied 382/382 | 138 | 0 | 0 | 14 | 152 |
| TOTAL | — | — | — | 2412 | 0 | 0 | 174 | 2586 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1005 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 19 tests selected, 19 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-160 Use my location stays pressed until the pin is moved by hand / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-33 a region alone never lists itself; its city does (W6 R2) / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-37 a tap on the map places a pin and the door stores it as exact / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-38 a place search moves the pin and fills the street line / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-39 an approximate pin is stored as approx and drawn as an area, never a point / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-40 removing the pin clears all four columns / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-41 the geocode route spends a dial and refuses the call past its ceiling / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-78 a big model list shows its required mark once the brand is chosen (INC-336) / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-81 a prefilled city counts as chosen: no mark, Next passes untouched / desktop-1280; Not repeated (time cap): post-wizard-place.spec.ts / POSTING WIZARD / PW-82 the add buttons follow the plan's own limits / desktop-1280
- Database session samples during each start (INC-944): smoke 11, email 13, 1 13, 2 11, 3 13, 4 13, 5 12, 6 11, 7 9, 8 9, 9 10, 10 13, 11 13, 12 8, 13 13, 14 13, 15 13, 16 14, repeat 11
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40984475820-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40984475820-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40984475820-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40984475820-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40984475820-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 40984475820-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40984475820-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40984475820-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40984475820-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40984475820-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40984475820-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40984475820-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40984475820-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 40984475820-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40984475820-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40984475820-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40984475820-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40984475820-local-16
  - repeat: not found
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

## Lane repeat
- Outside test — Timed out waiting 840s for the test suite to run
- Outside test — Timed out waiting 840s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
