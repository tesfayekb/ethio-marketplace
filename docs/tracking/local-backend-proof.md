# Local backend proof (non-gating)

- Commit: `e683cc0f2738fc096607af89ad1b7267d29add53`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39581997762

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 874 | 114 | applied 333/333 | 186 | 0 | 0 | 60 | 246 |
| email | 151 | 99 | applied 333/333 | 4 | 0 | 0 | 0 | 4 |
| 1 | 750 | 113 | applied 333/333 | 187 | 0 | 1 | 6 | 194 |
| 2 | 757 | 100 | applied 333/333 | 159 | 1 | 0 | 1 | 161 |
| 3 | 409 | 101 | applied 333/333 | 172 | 0 | 0 | 2 | 174 |
| 4 | 551 | 117 | applied 333/333 | 170 | 0 | 0 | 6 | 176 |
| 5 | 575 | 116 | applied 333/333 | 149 | 0 | 0 | 1 | 150 |
| 6 | 556 | 104 | applied 333/333 | 150 | 0 | 0 | 30 | 180 |
| 7 | 749 | 107 | applied 333/333 | 159 | 0 | 0 | 3 | 162 |
| 8 | 827 | 117 | applied 333/333 | 169 | 0 | 1 | 1 | 171 |
| 9 | 557 | 115 | applied 333/333 | 173 | 0 | 0 | 6 | 179 |
| 10 | 564 | 103 | applied 333/333 | 170 | 0 | 0 | 6 | 176 |
| 11 | 665 | 115 | applied 333/333 | 190 | 0 | 0 | 2 | 192 |
| 12 | 404 | 99 | applied 333/333 | 104 | 0 | 0 | 30 | 134 |
| TOTAL | — | — | — | 2142 | 1 | 2 | 154 | 2299 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the fourteen lanes)

- Slowest lane: smoke 874 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 39581997762-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 39581997762-local-email
  - 1: [e2e:teardown] deleted 10 user(s) owned by process 39581997762-local-1
  - 2: [e2e:teardown] deleted 16 user(s) owned by process 39581997762-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 39581997762-local-3
  - 4: [e2e:teardown] deleted 21 user(s) owned by process 39581997762-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 39581997762-local-5
  - 6: [e2e:teardown] deleted 4 user(s) owned by process 39581997762-local-6
  - 7: [e2e:teardown] deleted 10 user(s) owned by process 39581997762-local-7
  - 8: [e2e:teardown] deleted 6 user(s) owned by process 39581997762-local-8
  - 9: [e2e:teardown] deleted 23 user(s) owned by process 39581997762-local-9
  - 10: [e2e:teardown] deleted 21 user(s) owned by process 39581997762-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 39581997762-local-11
  - 12: [e2e:teardown] deleted 4 user(s) owned by process 39581997762-local-12
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
RLS on 77 of 77 public tables
Default grants in public: postgres | f | {postgres=X/postgres,service_role=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 1
- ad-page.spec.ts / AD PAGE — the phone page never widens (bundle 21 turn 10) / OVW-1 long unbroken words keep the ad page the screen's width / mobile-360 — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eyoopiwpzlogvksccatipbgxwuwxpttndmmkaitvhnqyxhpi","furthestElement":"breadcrumb-ad","crumbHeight":20}

## Lane 2
- admin-countries.spec.ts / L2b countries console / CO-6 rail order: two roots are stored in position order, and the reset removes every row / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mnot[2m.[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

## Lane 8
- admin-countries.spec.ts / L2b countries console / CO-6 rail order: two roots are stored in position order, and the reset removes every row / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mnot[2m.[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

DEC-211, DEC-218: every gating browser test runs here — fourteen lanes, the email lane included; two consecutive full dev runs judge each change.
