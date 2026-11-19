# Local backend proof (non-gating)

- Commit: `5cb117c198701ffcaa027d508e23aa6ef4bc2147`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44450591343

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 646 | 61 | applied 522/522 | 27 | 0 | 0 | 5 | 32 |
| email | 373 | 62 | applied 522/522 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1506 | 61 | applied 522/522 | 70 | 0 | 0 | 24 | 94 |
| 1 | 721 | 62 | applied 522/522 | 186 | 2 | 0 | 69 | 257 |
| 2 | 678 | 63 | applied 522/522 | 174 | 0 | 0 | 26 | 200 |
| 3 | 875 | 60 | applied 522/522 | 169 | 0 | 0 | 5 | 174 |
| 4 | 657 | 79 | applied 522/522 | 137 | 0 | 0 | 5 | 142 |
| 5 | 800 | 63 | applied 522/522 | 93 | 0 | 0 | 1 | 94 |
| 6 | 892 | 61 | applied 522/522 | 153 | 0 | 0 | 41 | 194 |
| 7 | 604 | 70 | applied 522/522 | 146 | 0 | 1 | 77 | 224 |
| 8 | 768 | 63 | applied 522/522 | 179 | 0 | 0 | 7 | 186 |
| 9 | 540 | 66 | applied 522/522 | 123 | 0 | 0 | 1 | 124 |
| 10 | 744 | 63 | applied 522/522 | 150 | 10 | 0 | 2 | 162 |
| 11 | 588 | 62 | applied 522/522 | 120 | 0 | 0 | 8 | 128 |
| 12 | 521 | 53 | applied 522/522 | 164 | 0 | 0 | 19 | 183 |
| 13 | 797 | 64 | applied 522/522 | 157 | 0 | 0 | 9 | 166 |
| 14 | 889 | 63 | applied 522/522 | 183 | 0 | 0 | 5 | 188 |
| 15 | 738 | 61 | applied 522/522 | 124 | 0 | 0 | 8 | 132 |
| 16 | 815 | 63 | applied 522/522 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2533 | 12 | 1 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 1506 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 6, webkit 6, 1 6, 2 6, 3 6, 4 10, 5 6, 6 6, 7 8, 8 6, 9 8, 10 6, 11 6, 12 5, 13 6, 14 6, 15 6, 16 6, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/340, 2 641/331, 3 641/335, 4 640/455, 5 640/374, 6 641/344, 7 641/415, 8 641/341, 9 641/359, 10 643/366, 11 640/362, 12 641/366, 13 640/300, 14 641/316, 15 641/376, 16 641/324
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44450591343-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44450591343-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44450591343-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44450591343-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44450591343-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44450591343-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44450591343-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44450591343-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 44450591343-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44450591343-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44450591343-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44450591343-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44450591343-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44450591343-local-16
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

## Lane 1
- Step failure:
Step smoke: outcome failure
  
- admin-services.spec.ts / ADMIN › SERVICES — the AI switches and meter (D158) / SV-1 a seller can neither read nor change a switch, call the meter or read its tables / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-services.spec.ts / ADMIN › SERVICES — the AI switches and meter (D158) / SV-1 a seller can neither read nor change a switch, call the meter or read its tables / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 7
- choice-lists.spec.ts / choice lists at 1440, light / CL-E10 the account menu's parts equal the other lists' (1440, light) / desktop-1280 — Error: expect(locator).toBeHidden() failed

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them / mobile-360 — Error: MON-13 signed-in: the console rpc answered
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them / desktop-1280 — Error: MON-13 signed-in: the console rpc answered

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
