# Local backend proof (non-gating)

- Commit: `206720960c4aba8ef61ec25ab9c02f881f1254ad`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45838095211

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 590 | 69 | applied 563/563 | 38 | 0 | 0 | 16 | 54 |
| email | 191 | 65 | applied 563/563 | 6 | 0 | 0 | 0 | 6 |
| webkit | 805 | 61 | applied 563/563 | 80 | 0 | 0 | 24 | 104 |
| 1 | 530 | 69 | applied 563/563 | 210 | 0 | 0 | 76 | 286 |
| 2 | 968 | 88 | applied 563/563 | 162 | 0 | 0 | 20 | 182 |
| 3 | 750 | 87 | applied 563/563 | 167 | 0 | 0 | 7 | 174 |
| 4 | 849 | 58 | applied 563/563 | 121 | 0 | 0 | 14 | 135 |
| 5 | 1524 | 81 | applied 563/563 | 141 | 2 | 0 | 1 | 144 |
| 6 | 1101 | 68 | applied 563/563 | 200 | 0 | 0 | 40 | 240 |
| 7 | 937 | 88 | applied 563/563 | 147 | 0 | 0 | 63 | 210 |
| 8 | 1015 | 60 | applied 563/563 | 135 | 0 | 0 | 3 | 138 |
| 9 | 931 | 90 | applied 563/563 | 120 | 0 | 0 | 4 | 124 |
| 10 | 1637 | 66 | applied 563/563 | 163 | 0 | 0 | 1 | 164 |
| 11 | 521 | 66 | applied 563/563 | 140 | 0 | 0 | 6 | 146 |
| 12 | 578 | 70 | applied 563/563 | 158 | 0 | 0 | 2 | 160 |
| 13 | 927 | 67 | applied 563/563 | 151 | 0 | 0 | 17 | 168 |
| 14 | 1389 | 66 | applied 563/563 | 146 | 0 | 0 | 18 | 164 |
| 15 | 1134 | 68 | applied 563/563 | 187 | 0 | 0 | 47 | 234 |
| 16 | 1072 | 87 | applied 563/563 | 157 | 0 | 0 | 1 | 158 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2629 | 2 | 0 | 360 | 2991 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 10 1637 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 7, email 7, webkit 6, 1 7, 2 11, 3 11, 4 6, 5 10, 6 7, 7 12, 8 6, 9 12, 10 7, 11 7, 12 8, 13 7, 14 7, 15 8, 16 11, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 118 files, weights from run 43431755160 (2026-11-13); mean 654 s, largest 656 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 656 s; planned/test seconds: 1 654/347, 2 653/747, 3 654/549, 4 654/689, 5 656/1334, 6 653/929, 7 654/714, 8 653/841, 9 655/712, 10 653/1466, 11 653/354, 12 654/393, 13 653/739, 14 653/1216, 15 656/948, 16 656/858
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45838095211-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45838095211-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45838095211-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45838095211-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 45838095211-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45838095211-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45838095211-local-4
  - 5: [e2e:teardown] deleted 17 user(s) owned by process 45838095211-local-5
  - 6: [e2e:teardown] deleted 5 user(s) owned by process 45838095211-local-6
  - 7: [e2e:teardown] deleted 11 user(s) owned by process 45838095211-local-7
  - 8: [e2e:teardown] deleted 5 user(s) owned by process 45838095211-local-8
  - 9: [e2e:teardown] deleted 49 user(s) owned by process 45838095211-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45838095211-local-10
  - 11: [e2e:teardown] deleted 6 user(s) owned by process 45838095211-local-11
  - 12: [e2e:teardown] deleted 3 user(s) owned by process 45838095211-local-12
  - 13: [e2e:teardown] deleted 11 user(s) owned by process 45838095211-local-13
  - 14: [e2e:teardown] deleted 5 user(s) owned by process 45838095211-local-14
  - 15: [e2e:teardown] deleted 7 user(s) owned by process 45838095211-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45838095211-local-16
  - repeat: not found
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- patched 20261029073342 (3dd11fa31551 -> 4287abad5fa3): CL-3's ahead check reads the clock just before the call (INC-1028, DEC-316)
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail]); the auth server's text columns '' (INC-808)
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
RLS on 90 of 90 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local
pg_cron: available 1.6.4; cron.launch_active_jobs settings: 1
Restored (cron.launch_active_jobs, autovacuum, scheduler sessions): on on 1
Start proofs (DEC-313): PostgREST serves job_runs; the sign-up hook answered 200

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-77 an import whose end state asks a child first is refused whole at the commit / mobile-360 — Error: expect(locator).toContainText(expected) failed
- admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-77 an import whose end state asks a child first is refused whole at the commit / desktop-1280 — Error: expect(locator).toContainText(expected) failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
