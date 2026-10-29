# Local backend proof (non-gating)

- Commit: `3afc773a0ddc5da40f7ba711f8a8c7147befe8af`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40821484703

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 965 | 117 | applied 367/367 | 196 | 0 | 0 | 62 | 258 |
| email | 182 | 117 | applied 367/367 | 6 | 0 | 0 | 0 | 6 |
| 1 | 771 | 120 | applied 367/367 | 131 | 1 | 0 | 4 | 136 |
| 2 | 855 | 98 | applied 367/367 | 129 | 0 | 0 | 3 | 132 |
| 3 | 901 | 101 | applied 367/367 | 136 | 0 | 0 | 0 | 136 |
| 4 | 668 | 120 | applied 367/367 | 148 | 0 | 0 | 2 | 150 |
| 5 | 520 | 106 | applied 367/367 | 119 | 0 | 0 | 6 | 125 |
| 6 | 681 | 109 | applied 367/367 | 131 | 0 | 0 | 1 | 132 |
| 7 | 460 | 101 | applied 367/367 | 131 | 0 | 0 | 0 | 131 |
| 8 | 677 | 119 | applied 367/367 | 110 | 0 | 0 | 30 | 140 |
| 9 | 757 | 103 | applied 367/367 | 133 | 1 | 0 | 2 | 136 |
| 10 | 931 | 120 | applied 367/367 | 130 | 0 | 0 | 2 | 132 |
| 11 | 973 | 117 | applied 367/367 | 123 | 0 | 0 | 1 | 124 |
| 12 | 679 | 118 | applied 367/367 | 140 | 0 | 0 | 5 | 145 |
| 13 | 559 | 119 | applied 367/367 | 120 | 0 | 0 | 5 | 125 |
| 14 | 791 | 105 | applied 367/367 | 129 | 0 | 0 | 3 | 132 |
| 15 | 609 | 123 | applied 367/367 | 130 | 0 | 0 | 1 | 131 |
| 16 | 511 | 98 | applied 367/367 | 99 | 0 | 0 | 32 | 131 |
| repeat | 321 | 108 | applied 367/367 | 0 | 12 | 0 | 0 | 12 |
| TOTAL | — | — | — | 2241 | 14 | 0 | 159 | 2414 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 11 973 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 1 tests selected, 1 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 13, email 13, 1 13, 2 11, 3 11, 4 13, 5 11, 6 10, 7 9, 8 13, 9 13, 10 11, 11 12, 12 13, 13 11, 14 13, 15 14, 16 9, repeat 12
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40821484703-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40821484703-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40821484703-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40821484703-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40821484703-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40821484703-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40821484703-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40821484703-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40821484703-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40821484703-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40821484703-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40821484703-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40821484703-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40821484703-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40821484703-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40821484703-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40821484703-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40821484703-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 40821484703-local-repeat
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

## Lane 1
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed

## Lane 9
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed

## Lane repeat
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed
- admin-ai-calls.spec.ts / ACR-E1 staff history filters through the real door and renders its exact page / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
