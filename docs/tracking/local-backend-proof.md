# Local backend proof (non-gating)

- Commit: `0a16eed0d2b15972b114913c0652793bb82d7a1e`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41160992985

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 98 | applied 383/383 | 0 | 0 | 0 | 0 | 0 |
| email | 193 | 123 | applied 383/383 | 6 | 0 | 0 | 0 | 6 |
| 1 | 884 | 121 | applied 383/383 | 148 | 0 | 0 | 4 | 152 |
| 2 | 1035 | 94 | applied 383/383 | 152 | 0 | 0 | 3 | 155 |
| 3 | 915 | 118 | applied 383/383 | 151 | 0 | 0 | 0 | 151 |
| 4 | 671 | 93 | applied 383/383 | 157 | 0 | 0 | 2 | 159 |
| 5 | 579 | 108 | applied 383/383 | 127 | 0 | 0 | 7 | 134 |
| 6 | 858 | 122 | applied 383/383 | 149 | 0 | 0 | 1 | 150 |
| 7 | 373 | 103 | applied 383/383 | 104 | 0 | 0 | 49 | 153 |
| 8 | 607 | 92 | applied 383/383 | 103 | 0 | 0 | 43 | 146 |
| 9 | 862 | 111 | applied 383/383 | 145 | 0 | 0 | 13 | 158 |
| 10 | 986 | 95 | applied 383/383 | 160 | 0 | 0 | 2 | 162 |
| 11 | 869 | 116 | applied 383/383 | 132 | 0 | 0 | 2 | 134 |
| 12 | 766 | 120 | applied 383/383 | 155 | 0 | 0 | 4 | 159 |
| 13 | 512 | 97 | applied 383/383 | 131 | 0 | 0 | 7 | 138 |
| 14 | 825 | 103 | applied 383/383 | 186 | 0 | 0 | 2 | 188 |
| 15 | 565 | 111 | applied 383/383 | 143 | 0 | 0 | 77 | 220 |
| 16 | 343 | 107 | applied 383/383 | 41 | 0 | 0 | 0 | 41 |
| repeat | 376 | 108 | applied 383/383 | 36 | 0 | 0 | 0 | 36 |
| TOTAL | — | — | — | 2226 | 0 | 0 | 216 | 2442 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1035 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 3 tests selected, 3 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 13, 1 13, 2 12, 3 13, 4 12, 5 11, 6 13, 7 11, 8 12, 9 13, 10 9, 11 13, 12 13, 13 9, 14 11, 15 13, 16 11, repeat 11
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41160992985-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41160992985-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41160992985-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41160992985-local-3
  - 4: [e2e:teardown] deleted 32 user(s) owned by process 41160992985-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41160992985-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41160992985-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41160992985-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41160992985-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41160992985-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41160992985-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41160992985-local-11
  - 12: [e2e:teardown] deleted 32 user(s) owned by process 41160992985-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41160992985-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41160992985-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41160992985-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41160992985-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 41160992985-local-repeat
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
RLS on 85 of 85 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane smoke
- Step failure:
Step database-security-lints: outcome failure
  function_executable_by_anon ERROR 20
  ::error::function_executable_by_anon 20 is above its baseline 19
  function_search_path_mutable WARN 0
  rls_disabled_in_public ERROR 0
  security_definer_view ERROR 0
  table_writable_by_client WARN 0
  anon-executable functions outside the allowlist: 20 (names in the local-proof-smoke artifact)
  ::error::Database security lints differ from the baseline on the temporary backend (DEC-240)
- No JSON results; smoke skipped

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
