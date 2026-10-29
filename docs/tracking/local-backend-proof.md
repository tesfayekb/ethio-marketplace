# Local backend proof (non-gating)

- Commit: `c7bb093ae4d52fe53b186c0244c285c17ab791e0`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40809236156

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 908 | 111 | applied 365/365 | 196 | 0 | 0 | 62 | 258 |
| email | 177 | 114 | applied 365/365 | 6 | 0 | 0 | 0 | 6 |
| 1 | 749 | 120 | applied 365/365 | 131 | 0 | 0 | 4 | 135 |
| 2 | 908 | 85 | applied 365/365 | 142 | 0 | 0 | 3 | 145 |
| 3 | 762 | 102 | applied 365/365 | 123 | 0 | 0 | 0 | 123 |
| 4 | 620 | 95 | applied 365/365 | 148 | 0 | 0 | 2 | 150 |
| 5 | 573 | 120 | applied 365/365 | 119 | 0 | 0 | 6 | 125 |
| 6 | 787 | 116 | applied 365/365 | 131 | 0 | 0 | 1 | 132 |
| 7 | 513 | 108 | applied 365/365 | 131 | 0 | 0 | 0 | 131 |
| 8 | 642 | 116 | applied 365/365 | 110 | 0 | 0 | 30 | 140 |
| 9 | 778 | 117 | applied 365/365 | 133 | 0 | 0 | 2 | 135 |
| 10 | 945 | 112 | applied 365/365 | 130 | 0 | 0 | 2 | 132 |
| 11 | 1006 | 119 | applied 365/365 | 123 | 0 | 0 | 1 | 124 |
| 12 | 658 | 117 | applied 365/365 | 140 | 0 | 0 | 5 | 145 |
| 13 | 631 | 119 | applied 365/365 | 120 | 0 | 0 | 5 | 125 |
| 14 | 790 | 111 | applied 365/365 | 129 | 0 | 0 | 3 | 132 |
| 15 | 539 | 107 | applied 365/365 | 130 | 0 | 0 | 1 | 131 |
| 16 | 562 | 116 | applied 365/365 | 99 | 0 | 0 | 32 | 131 |
| repeat | 1032 | 118 | applied 365/365 | 98 | 0 | 0 | 46 | 144 |
| TOTAL | — | — | — | 2339 | 0 | 0 | 205 | 2544 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: repeat 1032 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 18 tests selected, 18 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE attributes / @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE attributes / IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE attributes / IG-2 attributes: dangerous cells refuse their own row and name the reason / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE attributes-links / IG-5 attributes-links: an undeclared column is refused by name and the declared cells are not / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE audit / IG-6 the import audit row is written only by a caller who may run that family's import / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE categories / @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE categories / IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE categories / IG-2 categories: dangerous cells refuse their own row and name the reason / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE locations-countries / @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE locations-countries / IG-1 locations-countries: malformed, foreign, oversized and unreadable files are refused whole / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE locations-countries / IG-2 locations-countries: dangerous cells refuse their own row and name the reason / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE locations-locations / @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE locations-locations / IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE locations-locations / IG-2 locations-locations: dangerous cells refuse their own row and name the reason / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE translations / @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE translations / IG-1 translations: malformed, foreign, oversized and unreadable files are refused whole / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE translations / IG-2 translations: dangerous cells refuse their own row and name the reason / desktop-1280; Not repeated (time cap): import-security.spec.ts / IMPORT-GATE translations / IG-4 translations: XLIFF enters the same door and is judged by the same law / desktop-1280
- Database session samples during each start (INC-944): smoke 11, email 10, 1 13, 2 9, 3 9, 4 10, 5 13, 6 12, 7 11, 8 12, 9 13, 10 12, 11 13, 12 13, 13 13, 14 13, 15 11, 16 10, repeat 13
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40809236156-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40809236156-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40809236156-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40809236156-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40809236156-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40809236156-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40809236156-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40809236156-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40809236156-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40809236156-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40809236156-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40809236156-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40809236156-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40809236156-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40809236156-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40809236156-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40809236156-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40809236156-local-16
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
RLS on 80 of 80 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane repeat
- Outside test — Timed out waiting 840s for the test suite to run
- Outside test — Timed out waiting 840s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
