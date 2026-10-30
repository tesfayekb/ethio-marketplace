# Local backend proof (non-gating)

- Commit: `8aead74ba13126b1a2b58759ab8303b4f4e60243`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41020162680

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 845 | 88 | applied 382/382 | 197 | 0 | 0 | 65 | 262 |
| email | 220 | 120 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 814 | 118 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 993 | 105 | applied 382/382 | 133 | 0 | 0 | 3 | 136 |
| 3 | 909 | 119 | applied 382/382 | 133 | 0 | 0 | 0 | 133 |
| 4 | 647 | 113 | applied 382/382 | 144 | 0 | 0 | 2 | 146 |
| 5 | 601 | 116 | applied 382/382 | 125 | 0 | 0 | 7 | 132 |
| 6 | 924 | 117 | applied 382/382 | 172 | 0 | 0 | 1 | 173 |
| 7 | 433 | 107 | applied 382/382 | 105 | 0 | 0 | 0 | 105 |
| 8 | 619 | 115 | applied 382/382 | 99 | 0 | 0 | 36 | 135 |
| 9 | 670 | 98 | applied 382/382 | 136 | 0 | 0 | 8 | 144 |
| 10 | 1001 | 108 | applied 382/382 | 130 | 0 | 0 | 2 | 132 |
| 11 | 982 | 102 | applied 382/382 | 143 | 0 | 0 | 1 | 144 |
| 12 | 580 | 92 | applied 382/382 | 126 | 0 | 0 | 5 | 131 |
| 13 | 739 | 116 | applied 382/382 | 162 | 0 | 0 | 5 | 167 |
| 14 | 799 | 121 | applied 382/382 | 134 | 0 | 0 | 4 | 138 |
| 15 | 717 | 117 | applied 382/382 | 174 | 0 | 0 | 34 | 208 |
| 16 | 322 | 108 | applied 382/382 | 31 | 0 | 0 | 0 | 31 |
| repeat | 455 | 108 | applied 382/382 | 132 | 0 | 0 | 20 | 152 |
| TOTAL | — | — | — | 2423 | 0 | 0 | 197 | 2620 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1001 s
- Repeat lane (DEC-283): Not repeated: e2e/shell.spec.ts (111 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/admin-listings.spec.ts (31 tests); Not repeated: e2e/admin-screening.spec.ts (26 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/legal-certify.spec.ts (21 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/my-listings-ad.spec.ts (18 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (8 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (9 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 675 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 3 of 4 repeated; importers of a changed helper: 5 of 41
- Database session samples during each start (INC-944): smoke 9, email 14, 1 13, 2 13, 3 13, 4 11, 5 13, 6 13, 7 13, 8 11, 9 10, 10 13, 11 13, 12 10, 13 11, 14 13, 15 13, 16 12, repeat 11
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41020162680-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41020162680-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41020162680-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41020162680-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41020162680-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41020162680-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41020162680-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41020162680-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41020162680-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41020162680-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41020162680-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 41020162680-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 41020162680-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41020162680-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41020162680-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41020162680-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41020162680-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41020162680-local-16
  - repeat: [e2e:teardown] deleted 30 user(s) owned by process 41020162680-local-repeat
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
