# Local backend proof (non-gating)

- Commit: `bc963938f649d134784d317c78b15ec367f132d9`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40345497360

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 950 | 108 | applied 345/345 | 190 | 0 | 0 | 60 | 250 |
| email | 166 | 104 | applied 345/345 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1123 | 96 | applied 345/345 | 129 | 0 | 0 | 4 | 133 |
| 2 | 1058 | 114 | applied 345/345 | 142 | 0 | 0 | 3 | 145 |
| 3 | 856 | 116 | applied 345/345 | 119 | 2 | 0 | 0 | 121 |
| 4 | 646 | 112 | applied 345/345 | 148 | 0 | 0 | 2 | 150 |
| 5 | 473 | 97 | applied 345/345 | 119 | 0 | 0 | 6 | 125 |
| 6 | 781 | 107 | applied 345/345 | 131 | 0 | 0 | 1 | 132 |
| 7 | 460 | 98 | applied 345/345 | 131 | 0 | 0 | 0 | 131 |
| 8 | 569 | 104 | applied 345/345 | 102 | 0 | 0 | 30 | 132 |
| 9 | 643 | 101 | applied 345/345 | 131 | 0 | 0 | 2 | 133 |
| 10 | 861 | 102 | applied 345/345 | 130 | 0 | 0 | 2 | 132 |
| 11 | 964 | 116 | applied 345/345 | 126 | 0 | 0 | 1 | 127 |
| 12 | 1170 | 101 | applied 345/345 | 135 | 0 | 0 | 5 | 140 |
| 13 | 537 | 96 | applied 345/345 | 120 | 0 | 0 | 5 | 125 |
| 14 | 639 | 94 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 15 | 525 | 115 | applied 345/345 | 130 | 0 | 0 | 1 | 131 |
| 16 | 572 | 106 | applied 345/345 | 98 | 0 | 0 | 30 | 128 |
| TOTAL | — | — | — | 2216 | 2 | 0 | 155 | 2373 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 12 1170 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40345497360-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40345497360-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40345497360-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40345497360-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40345497360-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40345497360-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40345497360-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40345497360-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40345497360-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40345497360-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40345497360-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40345497360-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40345497360-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40345497360-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40345497360-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40345497360-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40345497360-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40345497360-local-16
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

## Lane 3
- auth-reset.spec.ts / R-2: the reset request answers identically for a real and an unknown address / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed
- auth-reset.spec.ts / R-4: the reset request is throttled after one submit / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
