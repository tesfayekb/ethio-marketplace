# Local backend proof (non-gating)

- Commit: `9cb65e4f610f6854f1366fd9c5a9848de821d68e`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39542085480

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 858 | 106 | applied 330/330 | 186 | 0 | 0 | 60 | 246 |
| 1 | 1155 | 102 | applied 330/330 | 188 | 0 | 0 | 6 | 194 |
| 2 | 1076 | 108 | applied 330/330 | 146 | 0 | 0 | 1 | 147 |
| 3 | 626 | 95 | applied 330/330 | 180 | 2 | 0 | 2 | 184 |
| 4 | 616 | 85 | applied 330/330 | 170 | 0 | 0 | 6 | 176 |
| 5 | 801 | 114 | applied 330/330 | 149 | 0 | 0 | 1 | 150 |
| 6 | 665 | 107 | applied 330/330 | 150 | 0 | 0 | 30 | 180 |
| 7 | 1014 | 114 | applied 330/330 | 159 | 0 | 0 | 3 | 162 |
| 8 | 1167 | 107 | applied 330/330 | 170 | 0 | 0 | 1 | 171 |
| 9 | 708 | 95 | applied 330/330 | 167 | 2 | 0 | 6 | 175 |
| 10 | 873 | 119 | applied 330/330 | 170 | 0 | 0 | 6 | 176 |
| 11 | 832 | 107 | applied 330/330 | 190 | 0 | 0 | 2 | 192 |
| 12 | 575 | 107 | applied 330/330 | 104 | 0 | 0 | 30 | 134 |
| TOTAL | — | — | — | 2129 | 4 | 0 | 154 | 2287 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the thirteen lanes)

- Slowest lane: 8 1167 s
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

## Lane 3
- legal-certify.spec.ts / Legal certification / LG-29 taking an ad down is never held: while an acceptance is owed the seller marks one ad sold, closes one, removes one, and removes a photo / mobile-360 — Error: {"data":null,"error":"not your listing"}
- legal-certify.spec.ts / Legal certification / LG-30 a draft stays the seller's own while an acceptance is owed: its price, pin and photo order change / mobile-360 — Error: {"data":null,"error":"the price of this listing is changed through its edit"}

## Lane 9
- legal-certify.spec.ts / Legal certification / LG-29 taking an ad down is never held: while an acceptance is owed the seller marks one ad sold, closes one, removes one, and removes a photo / desktop-1280 — Error: {"data":null,"error":"not your listing"}
- legal-certify.spec.ts / Legal certification / LG-30 a draft stays the seller's own while an acceptance is owed: its price, pin and photo order change / desktop-1280 — Error: {"data":null,"error":"the price of this listing is changed through its edit"}

DEC-211: compare every lane with staging CI on this same commit; two consecutive full-suite dev proofs required. Email-serial stays on staging. No automatic switch verdict.
