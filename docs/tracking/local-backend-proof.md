# Local backend proof (non-gating)

- Commit: `522230b3a7850a9e5629cc39da59941e2d0cf1ce`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40071930414

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 784 | 90 | applied 342/342 | 186 | 0 | 0 | 60 | 246 |
| email | 179 | 116 | applied 342/342 | 6 | 0 | 0 | 0 | 6 |
| 1 | 741 | 106 | applied 342/342 | 134 | 0 | 0 | 4 | 138 |
| 2 | 857 | 103 | applied 342/342 | 120 | 0 | 0 | 3 | 123 |
| 3 | 833 | 101 | applied 342/342 | 130 | 0 | 0 | 0 | 130 |
| 4 | 529 | 115 | applied 342/342 | 146 | 1 | 0 | 2 | 149 |
| 5 | 503 | 102 | applied 342/342 | 113 | 1 | 0 | 6 | 120 |
| 6 | 781 | 107 | applied 342/342 | 131 | 0 | 0 | 1 | 132 |
| 7 | 607 | 122 | applied 342/342 | 119 | 0 | 0 | 0 | 119 |
| 8 | 583 | 102 | applied 342/342 | 108 | 0 | 0 | 30 | 138 |
| 9 | 651 | 79 | applied 342/342 | 127 | 0 | 0 | 2 | 129 |
| 10 | 959 | 112 | applied 342/342 | 130 | 0 | 0 | 2 | 132 |
| 11 | 779 | 94 | applied 342/342 | 120 | 0 | 0 | 1 | 121 |
| 12 | 577 | 116 | applied 342/342 | 135 | 1 | 0 | 5 | 141 |
| 13 | 498 | 99 | applied 342/342 | 115 | 1 | 0 | 4 | 120 |
| 14 | 688 | 101 | applied 342/342 | 129 | 0 | 0 | 3 | 132 |
| 15 | 568 | 116 | applied 342/342 | 130 | 0 | 0 | 1 | 131 |
| 16 | 565 | 117 | applied 342/342 | 92 | 0 | 0 | 30 | 122 |
| TOTAL | — | — | — | 2171 | 4 | 0 | 154 | 2329 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 10 959 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40071930414-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40071930414-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40071930414-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40071930414-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40071930414-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40071930414-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40071930414-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40071930414-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40071930414-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40071930414-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40071930414-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40071930414-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40071930414-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-16
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
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 4
- legal-certify.spec.ts / Legal certification / LGC-6 a statement's public page shows the global statement, and the country's with its country line; anyone may read it (DEC-236) / mobile-360 — Error: SSR error page twice for http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

## Lane 5
- legal-pages.spec.ts / Legal public pages / LGP-4 /legal/publishing with no statement in force shows its soon state and carries the publishing title (DEC-236) / mobile-360 — Error: SSR error page twice for http://127.0.0.1:4173/legal/publishing?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

## Lane 12
- legal-certify.spec.ts / Legal certification / LGC-6 a statement's public page shows the global statement, and the country's with its country line; anyone may read it (DEC-236) / desktop-1280 — Error: SSR error page twice for http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

## Lane 13
- legal-pages.spec.ts / Legal public pages / LGP-4 /legal/publishing with no statement in force shows its soon state and carries the publishing title (DEC-236) / desktop-1280 — Error: SSR error page twice for http://127.0.0.1:4173/legal/publishing?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
