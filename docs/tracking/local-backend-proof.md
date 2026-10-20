# Local backend proof (non-gating)

- Commit: `54dbf7ad3f573f92870033d3044cdc9e19287965`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39504890888

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 770 | 90 | applied 329/329 | 186 | 0 | 0 | 60 | 246 |
| 1 | 1170 | 117 | applied 329/329 | 187 | 0 | 1 | 6 | 194 |
| 2 | 1033 | 109 | applied 329/329 | 146 | 0 | 0 | 1 | 147 |
| 3 | 738 | 118 | applied 329/329 | 175 | 0 | 0 | 2 | 177 |
| 4 | 670 | 98 | applied 329/329 | 170 | 0 | 0 | 6 | 176 |
| 5 | 823 | 110 | applied 329/329 | 151 | 0 | 0 | 1 | 152 |
| 6 | 624 | 101 | applied 329/329 | 148 | 0 | 0 | 30 | 178 |
| 7 | 906 | 104 | applied 329/329 | 159 | 0 | 0 | 3 | 162 |
| 8 | 1127 | 105 | applied 329/329 | 170 | 0 | 0 | 1 | 171 |
| 9 | 808 | 110 | applied 329/329 | 162 | 0 | 0 | 6 | 168 |
| 10 | 766 | 116 | applied 329/329 | 170 | 0 | 0 | 6 | 176 |
| 11 | 860 | 110 | applied 329/329 | 190 | 0 | 0 | 2 | 192 |
| 12 | 572 | 103 | applied 329/329 | 104 | 0 | 0 | 30 | 134 |
| TOTAL | — | — | — | 2118 | 0 | 1 | 154 | 2273 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the thirteen lanes)

- Slowest lane: 1 1170 s
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
- ad-page.spec.ts / AD PAGE — the phone page never widens (bundle 21 turn 10) / OVW-1 long unbroken words keep the ad page the screen's width / mobile-360 — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eoznnvmepunzvnikccknbedzetuaorerjqscvdywuozyouzp","furthestElement":"breadcrumb-ad","crumbHeight":20}

DEC-211: compare every lane with staging CI on this same commit; two consecutive full-suite dev proofs required. Email-serial stays on staging. No automatic switch verdict.
