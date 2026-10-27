# Local backend proof (non-gating)

- Commit: `529655649246c6e364e69fe57f1655e29f5459eb`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40512047787

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 950 | 117 | applied 345/345 | 194 | 0 | 0 | 62 | 256 |
| email | 817 | 103 | applied 345/345 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1370 | 83 | applied 345/345 | 138 | 0 | 0 | 4 | 142 |
| 2 | 1579 | 112 | applied 345/345 | 133 | 0 | 0 | 3 | 136 |
| 3 | 771 | 98 | applied 345/345 | 127 | 0 | 0 | 0 | 127 |
| 4 | 614 | 98 | applied 345/345 | 143 | 0 | 0 | 2 | 145 |
| 5 | 465 | 95 | applied 345/345 | 119 | 0 | 0 | 6 | 125 |
| 6 | 749 | 106 | applied 345/345 | 131 | 0 | 0 | 1 | 132 |
| 7 | 533 | 102 | applied 345/345 | 131 | 0 | 0 | 0 | 131 |
| 8 | 529 | 115 | applied 345/345 | 99 | 0 | 0 | 30 | 129 |
| 9 | 887 | 116 | applied 345/345 | 141 | 0 | 1 | 2 | 144 |
| 10 | 1280 | 117 | applied 345/345 | 130 | 0 | 0 | 2 | 132 |
| 11 | 840 | 103 | applied 345/345 | 122 | 0 | 0 | 1 | 123 |
| 12 | 654 | 122 | applied 345/345 | 140 | 0 | 0 | 5 | 145 |
| 13 | 611 | 117 | applied 345/345 | 120 | 0 | 0 | 5 | 125 |
| 14 | 1264 | 104 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 15 | 581 | 117 | applied 345/345 | 130 | 0 | 0 | 1 | 131 |
| 16 | 570 | 103 | applied 345/345 | 99 | 0 | 0 | 32 | 131 |
| TOTAL | — | — | — | 2232 | 0 | 1 | 159 | 2392 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 2 1579 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40512047787-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40512047787-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40512047787-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40512047787-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 40512047787-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40512047787-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40512047787-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40512047787-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40512047787-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40512047787-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40512047787-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40512047787-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40512047787-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40512047787-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40512047787-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40512047787-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40512047787-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40512047787-local-16
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

## Lane 9
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-36 the layout follows the article's width (DEC-192, drawings v13) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
