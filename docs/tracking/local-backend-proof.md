# Local backend proof (non-gating)

- Commit: `225594a14c8b74e1f2ff5ee55ccb8ad43b3362e0`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39942129628

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 96 | applied 338/338 | 0 | 0 | 0 | 0 | 0 |
| email | 135 | 89 | applied 338/338 | 4 | 0 | 0 | 0 | 4 |
| 1 | 691 | 87 | applied 338/338 | 134 | 0 | 0 | 4 | 138 |
| 2 | 728 | 90 | applied 338/338 | 120 | 0 | 0 | 3 | 123 |
| 3 | 803 | 86 | applied 338/338 | 127 | 4 | 0 | 0 | 131 |
| 4 | 567 | 117 | applied 338/338 | 143 | 0 | 0 | 2 | 145 |
| 5 | 558 | 118 | applied 338/338 | 113 | 0 | 0 | 6 | 119 |
| 6 | 834 | 110 | applied 338/338 | 131 | 0 | 0 | 1 | 132 |
| 7 | 940 | 102 | applied 338/338 | 131 | 0 | 0 | 0 | 131 |
| 8 | 1055 | 102 | applied 338/338 | 96 | 0 | 0 | 30 | 126 |
| 9 | 644 | 91 | applied 338/338 | 127 | 0 | 0 | 2 | 129 |
| 10 | 1327 | 105 | applied 338/338 | 130 | 0 | 0 | 2 | 132 |
| 11 | 949 | 114 | applied 338/338 | 117 | 4 | 0 | 1 | 122 |
| 12 | 453 | 92 | applied 338/338 | 132 | 0 | 0 | 5 | 137 |
| 13 | 496 | 96 | applied 338/338 | 115 | 0 | 0 | 4 | 119 |
| 14 | 811 | 116 | applied 338/338 | 129 | 0 | 0 | 3 | 132 |
| 15 | 643 | 116 | applied 338/338 | 129 | 1 | 0 | 1 | 131 |
| 16 | 537 | 105 | applied 338/338 | 92 | 0 | 0 | 30 | 122 |
| TOTAL | — | — | — | 1970 | 9 | 0 | 94 | 2073 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 10 1327 s
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 39942129628-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 39942129628-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 39942129628-local-3
  - 4: [e2e:teardown] deleted 12 user(s) owned by process 39942129628-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 39942129628-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 39942129628-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 39942129628-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 39942129628-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 39942129628-local-11
  - 12: [e2e:teardown] deleted 12 user(s) owned by process 39942129628-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 39942129628-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 39942129628-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-16
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
RLS on 78 of 78 public tables
Default grants in public: postgres | f | {postgres=X/postgres,service_role=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane smoke
- No JSON results; smoke skipped

## Lane 3
- auth-caller-gates.spec.ts / CG-1 a deactivated account is refused at the doors that had no gate / mobile-360 — Error: [CG] terms has no in-force version
- auth-caller-gates.spec.ts / CG-2 the three retired doors are closed to a signed-in account / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- auth-caller-gates.spec.ts / CG-4 a fresh password sign-in is the proof — and the last-method rule still refuses an email-only account / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- auth-caller-gates.spec.ts / CG-5 the dial / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

## Lane 11
- auth-caller-gates.spec.ts / CG-1 a deactivated account is refused at the doors that had no gate / desktop-1280 — Error: [CG] terms has no in-force version
- auth-caller-gates.spec.ts / CG-2 the three retired doors are closed to a signed-in account / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- auth-caller-gates.spec.ts / CG-4 a fresh password sign-in is the proof — and the last-method rule still refuses an email-only account / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- auth-caller-gates.spec.ts / CG-5 the dial / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

## Lane 15
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-153 a settled range hides its number and the review and buyer sheet show the range / desktop-1280 — Error: PW-153: the review did not show the range (stored model: e2e_settle_1792754157033_kkqa9r_m2)

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
