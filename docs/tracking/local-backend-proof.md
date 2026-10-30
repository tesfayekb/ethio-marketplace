# Local backend proof (non-gating)

- Commit: `36c4a083376e092ac6650d2a86c263b11bce22c8`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41000289665

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 965 | 113 | applied 382/382 | 196 | 0 | 0 | 62 | 258 |
| email | 190 | 122 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 583 | 82 | applied 382/382 | 132 | 0 | 0 | 4 | 136 |
| 2 | 1074 | 120 | applied 382/382 | 142 | 0 | 0 | 3 | 145 |
| 3 | 884 | 119 | applied 382/382 | 128 | 0 | 0 | 0 | 128 |
| 4 | 695 | 108 | applied 382/382 | 149 | 0 | 0 | 2 | 151 |
| 5 | 640 | 121 | applied 382/382 | 125 | 0 | 0 | 7 | 132 |
| 6 | 779 | 104 | applied 382/382 | 131 | 0 | 0 | 1 | 132 |
| 7 | 561 | 117 | applied 382/382 | 131 | 0 | 0 | 0 | 131 |
| 8 | 616 | 107 | applied 382/382 | 113 | 0 | 0 | 30 | 143 |
| 9 | 582 | 82 | applied 382/382 | 136 | 0 | 0 | 2 | 138 |
| 10 | 974 | 105 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 11 | 1014 | 119 | applied 382/382 | 128 | 0 | 0 | 1 | 129 |
| 12 | 690 | 119 | applied 382/382 | 141 | 0 | 0 | 5 | 146 |
| 13 | 616 | 112 | applied 382/382 | 127 | 0 | 0 | 5 | 132 |
| 14 | 686 | 98 | applied 382/382 | 129 | 0 | 0 | 3 | 132 |
| 15 | 463 | 99 | applied 382/382 | 132 | 0 | 0 | 1 | 133 |
| 16 | 579 | 109 | applied 382/382 | 102 | 0 | 0 | 32 | 134 |
| repeat | 666 | 107 | applied 382/382 | 148 | 0 | 0 | 4 | 152 |
| TOTAL | — | — | — | 2426 | 0 | 0 | 164 | 2590 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1074 s
- Repeat lane (DEC-283): Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/admin-listings.spec.ts (31 tests); Not repeated: e2e/admin-screening.spec.ts (26 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/legal-certify.spec.ts (21 tests); Not repeated: e2e/my-listings-ad.spec.ts (18 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (8 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (9 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 556 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 5 of 38
- Database session samples during each start (INC-944): smoke 13, email 13, 1 9, 2 13, 3 13, 4 13, 5 14, 6 13, 7 13, 8 11, 9 9, 10 13, 11 13, 12 13, 13 11, 14 11, 15 9, 16 12, repeat 11
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41000289665-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41000289665-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41000289665-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41000289665-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41000289665-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41000289665-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41000289665-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41000289665-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41000289665-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41000289665-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41000289665-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 41000289665-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 41000289665-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41000289665-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41000289665-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41000289665-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41000289665-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41000289665-local-16
  - repeat: [e2e:teardown] deleted 18 user(s) owned by process 41000289665-local-repeat
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

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
