# Local backend proof (non-gating)

- Commit: `d519d8d5ff7b69ae081c0739c55cec75a6e04be1`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44017605815

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 411 | 64 | applied 505/505 | 27 | 0 | 0 | 5 | 32 |
| email | 226 | 79 | applied 505/505 | 6 | 0 | 0 | 0 | 6 |
| webkit | 555 | 52 | applied 505/505 | 70 | 0 | 0 | 24 | 94 |
| 1 | 512 | 63 | applied 505/505 | 188 | 0 | 0 | 69 | 257 |
| 2 | 588 | 72 | applied 505/505 | 174 | 0 | 0 | 26 | 200 |
| 3 | 657 | 78 | applied 505/505 | 169 | 0 | 0 | 5 | 174 |
| 4 | 550 | 61 | applied 505/505 | 137 | 0 | 0 | 5 | 142 |
| 5 | 537 | 60 | applied 505/505 | 91 | 2 | 0 | 1 | 94 |
| 6 | 487 | 52 | applied 505/505 | 153 | 0 | 0 | 41 | 194 |
| 7 | 471 | 62 | applied 505/505 | 147 | 0 | 0 | 77 | 224 |
| 8 | 517 | 62 | applied 505/505 | 179 | 0 | 0 | 7 | 186 |
| 9 | 498 | 59 | applied 505/505 | 123 | 0 | 0 | 1 | 124 |
| 10 | 521 | 63 | applied 505/505 | 160 | 0 | 0 | 2 | 162 |
| 11 | 517 | 62 | applied 505/505 | 120 | 0 | 0 | 8 | 128 |
| 12 | 501 | 62 | applied 505/505 | 164 | 0 | 0 | 19 | 183 |
| 13 | 630 | 70 | applied 505/505 | 153 | 4 | 0 | 9 | 166 |
| 14 | 504 | 64 | applied 505/505 | 175 | 8 | 0 | 5 | 188 |
| 15 | 574 | 62 | applied 505/505 | 120 | 4 | 0 | 8 | 132 |
| 16 | 595 | 67 | applied 505/505 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2528 | 18 | 0 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 3 657 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 10, webkit 5, 1 6, 2 9, 3 10, 4 6, 5 6, 6 5, 7 6, 8 6, 9 6, 10 7, 11 6, 12 6, 13 8, 14 6, 15 6, 16 7, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/335, 2 641/402, 3 641/466, 4 640/379, 5 640/382, 6 641/335, 7 641/320, 8 641/339, 9 641/328, 10 643/354, 11 640/346, 12 641/353, 13 640/435, 14 641/349, 15 641/392, 16 641/388
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44017605815-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44017605815-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44017605815-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44017605815-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44017605815-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44017605815-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44017605815-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44017605815-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 44017605815-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44017605815-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44017605815-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44017605815-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44017605815-local-16
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
  
- auth-caller-gates.spec.ts / CG-1 a deactivated account is refused at the doors that had no gate / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- auth-caller-gates.spec.ts / CG-1 a deactivated account is refused at the doors that had no gate / desktop-1280 — Error: expect(received).toContain(expected) // indexOf

## Lane 13
- Step failure:
Step smoke: outcome failure
  
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-29 Report on the buyer's page: signed out, the link signs in and comes back to #report; signed in, the dialog sends a reason and a note once and thanks; a second report says already reported; the owner's page has no Report / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-29 Report on the buyer's page: signed out, the link signs in and comes back to #report; signed in, the dialog sends a reason and a note once and thanks; a second report says already reported; the owner's page has no Report / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed

## Lane 14
- Step failure:
Step smoke: outcome failure
  
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) / mobile-360 — Error: expect(received).toBeNull()
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8) / mobile-360 — Error: expect(received).toBeNull()
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts written rows only / mobile-360 — Error: expect(received).toBeNull()
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) / desktop-1280 — Error: expect(received).toBeNull()
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8) / desktop-1280 — Error: expect(received).toBeNull()
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts written rows only / desktop-1280 — Error: expect(received).toBeNull()
- legal-certify.spec.ts / Legal certification / LG-20 the contact reveal answers acceptanceRequired to a viewer who owes an acceptance; the owner still sees his own / mobile-360 — Error: expect(received).toBeNull()
- legal-certify.spec.ts / Legal certification / LG-20 the contact reveal answers acceptanceRequired to a viewer who owes an acceptance; the owner still sees his own / desktop-1280 — Error: expect(received).toBeNull()

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- viewing-place.spec.ts / VIEWING PLACE — the account doors (D106) / VP-2 a place that is not shown is refused, and the saved place stays / mobile-360 — Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"placeNotOpen","refusals":[{"reason":"placeNotOpen"}]}
- viewing-place.spec.ts / VIEWING PLACE — the account doors (D106) / VP-4 the viewing_place dial refuses the call past the account's limit / mobile-360 — Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"rateLimited","refusals":[{"reason":"rateLimited"}]}
- viewing-place.spec.ts / VIEWING PLACE — the account doors (D106) / VP-2 a place that is not shown is refused, and the saved place stays / desktop-1280 — Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"placeNotOpen","refusals":[{"reason":"placeNotOpen"}]}
- viewing-place.spec.ts / VIEWING PLACE — the account doors (D106) / VP-4 the viewing_place dial refuses the call past the account's limit / desktop-1280 — Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"rateLimited","refusals":[{"reason":"rateLimited"}]}

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
