# Local backend proof (non-gating)

- Commit: `cbc98cbadccf71215c5b494488100b2df5d9c7ab`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39517400096

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 854 | 107 | applied 329/329 | 186 | 0 | 0 | 60 | 246 |
| 1 | 1139 | 102 | applied 329/329 | 188 | 0 | 0 | 6 | 194 |
| 2 | 933 | 103 | applied 329/329 | 146 | 0 | 0 | 1 | 147 |
| 3 | 637 | 99 | applied 329/329 | 175 | 0 | 0 | 2 | 177 |
| 4 | 694 | 105 | applied 329/329 | 170 | 0 | 0 | 6 | 176 |
| 5 | 715 | 100 | applied 329/329 | 151 | 0 | 0 | 1 | 152 |
| 6 | 704 | 116 | applied 329/329 | 148 | 0 | 0 | 30 | 178 |
| 7 | 917 | 105 | applied 329/329 | 159 | 0 | 0 | 3 | 162 |
| 8 | 1099 | 105 | applied 329/329 | 170 | 0 | 0 | 1 | 171 |
| 9 | 861 | 117 | applied 329/329 | 162 | 0 | 0 | 6 | 168 |
| 10 | 764 | 102 | applied 329/329 | 170 | 0 | 0 | 6 | 176 |
| 11 | 895 | 98 | applied 329/329 | 190 | 0 | 0 | 2 | 192 |
| 12 | 548 | 103 | applied 329/329 | 104 | 0 | 0 | 30 | 134 |
| TOTAL | — | — | — | 2119 | 0 | 0 | 154 | 2273 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the thirteen lanes)

- Slowest lane: 1 1139 s
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

DEC-211: compare every lane with staging CI on this same commit; two consecutive full-suite dev proofs required. Email-serial stays on staging. No automatic switch verdict.
