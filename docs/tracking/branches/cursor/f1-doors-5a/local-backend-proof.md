# Local backend proof (non-gating)

- Commit: `1eaac1022d7fc04dca5f1eb4c1d352f3f5e3f41c`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43788920521

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 392 | 63 | applied 499/499 | 27 | 0 | 0 | 5 | 32 |
| email | 206 | 72 | applied 499/499 | 6 | 0 | 0 | 0 | 6 |
| webkit | 813 | 73 | applied 499/499 | 70 | 0 | 0 | 24 | 94 |
| 1 | 531 | 65 | applied 499/499 | 188 | 0 | 0 | 69 | 257 |
| 2 | 480 | 60 | applied 499/499 | 172 | 2 | 0 | 26 | 200 |
| 3 | 552 | 60 | applied 499/499 | 157 | 12 | 0 | 5 | 174 |
| 4 | 517 | 61 | applied 499/499 | 135 | 2 | 0 | 5 | 142 |
| 5 | 548 | 61 | applied 499/499 | 91 | 2 | 0 | 1 | 94 |
| 6 | 494 | 60 | applied 499/499 | 153 | 0 | 0 | 41 | 194 |
| 7 | 626 | 78 | applied 499/499 | 147 | 0 | 0 | 77 | 224 |
| 8 | 499 | 56 | applied 499/499 | 179 | 0 | 0 | 7 | 186 |
| 9 | 512 | 63 | applied 499/499 | 123 | 0 | 0 | 1 | 124 |
| 10 | 501 | 61 | applied 499/499 | 156 | 4 | 0 | 2 | 162 |
| 11 | 628 | 79 | applied 499/499 | 120 | 0 | 0 | 8 | 128 |
| 12 | 685 | 78 | applied 499/499 | 160 | 4 | 0 | 19 | 183 |
| 13 | 509 | 65 | applied 499/499 | 157 | 0 | 0 | 9 | 166 |
| 14 | 482 | 62 | applied 499/499 | 183 | 0 | 0 | 5 | 188 |
| 15 | 601 | 65 | applied 499/499 | 124 | 0 | 0 | 8 | 132 |
| 16 | 518 | 64 | applied 499/499 | 170 | 2 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2518 | 28 | 0 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 813 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 9, webkit 9, 1 7, 2 6, 3 6, 4 6, 5 6, 6 6, 7 10, 8 6, 9 6, 10 6, 11 10, 12 10, 13 7, 14 6, 15 7, 16 6, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/349, 2 641/335, 3 641/387, 4 640/337, 5 640/378, 6 641/340, 7 641/436, 8 641/336, 9 641/337, 10 643/332, 11 640/433, 12 641/499, 13 640/331, 14 641/315, 15 641/420, 16 641/347
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43788920521-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43788920521-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43788920521-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43788920521-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43788920521-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43788920521-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43788920521-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43788920521-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43788920521-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43788920521-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43788920521-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43788920521-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43788920521-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43788920521-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43788920521-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43788920521-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43788920521-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43788920521-local-15
  - 16: [e2e:teardown] deleted 25 user(s) owned by process 43788920521-local-16
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

## Lane 2
- Step failure:
Step smoke: outcome failure
  
- posting-routes.spec.ts / POSTING ROUTES / PR-7 the draft dial refuses by name once the ceiling is reached / mobile-360 — Error: the dial never refused within 5 calls
- posting-routes.spec.ts / POSTING ROUTES / PR-7 the draft dial refuses by name once the ceiling is reached / desktop-1280 — Error: the dial never refused within 5 calls

## Lane 3
- Step failure:
Step smoke: outcome failure
  
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-2 Nobody else moves a seller's ad, and a refused call writes nothing / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-3 Reserved on and off, on a live ad only (D173) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing / mobile-360 — Error: ML-12 nothing to change
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-2 Nobody else moves a seller's ad, and a refused call writes nothing / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-3 Reserved on and off, on a live ad only (D173) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing / desktop-1280 — Error: ML-12 nothing to change
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- my-listings-levels.spec.ts / MY LISTINGS — an ad's level and its clocks (P-2 (a)) / LDR-2 each refusal of the seller's level door by name, and nothing written / mobile-360 — Error: listingNotFound
- my-listings-levels.spec.ts / MY LISTINGS — an ad's level and its clocks (P-2 (a)) / LDR-2 each refusal of the seller's level door by name, and nothing written / desktop-1280 — Error: listingNotFound

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- auth-caller-gates.spec.ts / CG-1 a deactivated account is refused at the doors that had no gate / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- auth-caller-gates.spec.ts / CG-1 a deactivated account is refused at the doors that had no gate / desktop-1280 — Error: expect(received).toContain(expected) // indexOf

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-29 Neither door moves a posted ad to another category; nothing is written (D172) / mobile-360 — Error: expect(received).toMatchObject(expected)
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-29 Neither door moves a posted ad to another category; nothing is written (D172) / desktop-1280 — Error: expect(received).toMatchObject(expected)

## Lane 12
- Step failure:
Step smoke: outcome failure
  
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-8 A seller who also holds listings:enforce deletes his own ad as its owner; a deleted ad is never restored / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-10 A refused ad's Delete is answered in words when it was refused for a severe reason / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-8 A seller who also holds listings:enforce deletes his own ad as its owner; a deleted ad is never restored / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-10 A refused ad's Delete is answered in words when it was refused for a severe reason / desktop-1280 — Error: expect(locator).toHaveText(expected) failed

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- admin-users.spec.ts / U1 admin users / AU-5 seam: a deactivated account cannot write a listing / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- admin-users.spec.ts / U1 admin users / AU-5 seam: a deactivated account cannot write a listing / desktop-1280 — Error: expect(received).toContain(expected) // indexOf

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
