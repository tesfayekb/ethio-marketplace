# Local backend proof (non-gating)

- Commit: `17e867e2e28f169f11c2436dd4cbc4a4db316a7c`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39441214257

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 880 | 116 | applied 329/329 | 186 | 0 | 0 | 60 | 246 |
| 1 | not run | 359 | applied 329/329 | 0 | 0 | 0 | 0 | 0 |
| 2 | 1022 | 109 | applied 329/329 | 146 | 0 | 0 | 1 | 147 |
| 3 | 665 | 103 | applied 329/329 | 174 | 1 | 0 | 2 | 177 |
| 4 | 743 | 117 | applied 329/329 | 168 | 0 | 2 | 6 | 176 |
| 5 | 854 | 117 | applied 329/329 | 151 | 0 | 0 | 1 | 152 |
| 6 | 707 | 118 | applied 329/329 | 148 | 0 | 0 | 30 | 178 |
| 7 | 1020 | 105 | applied 329/329 | 158 | 0 | 1 | 3 | 162 |
| 8 | 1158 | 119 | applied 329/329 | 170 | 0 | 0 | 1 | 171 |
| 9 | 718 | 100 | applied 329/329 | 162 | 0 | 0 | 6 | 168 |
| 10 | 850 | 106 | applied 329/329 | 168 | 0 | 2 | 6 | 176 |
| 11 | 768 | 86 | applied 329/329 | 190 | 0 | 0 | 2 | 192 |
| 12 | 588 | 105 | applied 329/329 | 104 | 0 | 0 | 30 | 134 |
| TOTAL | — | — | — | 1925 | 1 | 5 | 148 | 2079 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the thirteen lanes)

- Slowest lane: 8 1158 s
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail])
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
RLS on 76 of 76 public tables
Default grants in public: postgres | f | {postgres=X/postgres,service_role=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 1
- No JSON results; smoke cancelled

## Lane 3
- legal-certify.spec.ts / Legal certification / LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so / mobile-360 — Error: [render-leak] gotoReady(/admin/listings/[account id]) rendered “undefined” at listing-history-what < listing-history-entry-0 < listing-history (p): “Status: undefined → Waiting for review”

## Lane 4
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveValue[2m([22m[32mexpected[39m[2m)[22m failed
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveValue[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 7
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-41 the page's remaining lines / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 10
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveValue[2m([22m[32mexpected[39m[2m)[22m failed
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveValue[2m([22m[32mexpected[39m[2m)[22m failed

DEC-211: compare every lane with staging CI on this same commit; two consecutive full-suite dev proofs required. Email-serial stays on staging. No automatic switch verdict.
