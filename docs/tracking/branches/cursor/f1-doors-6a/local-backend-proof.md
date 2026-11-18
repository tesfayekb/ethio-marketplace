# Local backend proof (non-gating)

- Commit: `857a8e728c0f864a93cb56bd053fd4a7ef724edb`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44247634746

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 65 | applied 514/514 | 0 | 0 | 0 | 0 | 0 |
| email | 365 | 61 | applied 514/514 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1546 | 62 | applied 514/514 | 70 | 0 | 0 | 24 | 94 |
| 1 | 677 | 60 | applied 514/514 | 188 | 0 | 0 | 69 | 257 |
| 2 | 555 | 63 | applied 514/514 | 174 | 0 | 0 | 26 | 200 |
| 3 | 587 | 64 | applied 514/514 | 165 | 4 | 0 | 5 | 174 |
| 4 | 568 | 68 | applied 514/514 | 135 | 2 | 0 | 5 | 142 |
| 5 | 782 | 62 | applied 514/514 | 93 | 0 | 0 | 1 | 94 |
| 6 | 770 | 62 | applied 514/514 | 153 | 0 | 0 | 41 | 194 |
| 7 | 544 | 65 | applied 514/514 | 147 | 0 | 0 | 77 | 224 |
| 8 | 610 | 74 | applied 514/514 | 179 | 0 | 0 | 7 | 186 |
| 9 | 676 | 63 | applied 514/514 | 123 | 0 | 0 | 1 | 124 |
| 10 | 768 | 80 | applied 514/514 | 128 | 32 | 0 | 2 | 162 |
| 11 | 482 | 53 | applied 514/514 | 120 | 0 | 0 | 8 | 128 |
| 12 | 689 | 81 | applied 514/514 | 164 | 0 | 0 | 19 | 183 |
| 13 | 829 | 63 | applied 514/514 | 157 | 0 | 0 | 9 | 166 |
| 14 | 1212 | 78 | applied 514/514 | 153 | 30 | 0 | 5 | 188 |
| 15 | 900 | 63 | applied 514/514 | 124 | 0 | 0 | 8 | 132 |
| 16 | 611 | 61 | applied 514/514 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 52 | 52 |
| TOTAL | — | — | — | 2451 | 68 | 0 | 407 | 2926 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 1546 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (52 tests); Repeat: each 2 on both projects; 52 tests selected, 0 repeated; budget 643 s at 4.7 s a test; directly changed: 0 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 7, email 6, webkit 6, 1 6, 2 7, 3 7, 4 7, 5 6, 6 6, 7 7, 8 9, 9 6, 10 10, 11 5, 12 10, 13 6, 14 10, 15 6, 16 6, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/331, 2 641/373, 3 641/408, 4 640/370, 5 640/374, 6 641/350, 7 641/364, 8 641/424, 9 641/332, 10 643/562, 11 640/339, 12 641/493, 13 640/301, 14 641/1015, 15 641/380, 16 641/321
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44247634746-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44247634746-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44247634746-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44247634746-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44247634746-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44247634746-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44247634746-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 44247634746-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44247634746-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-13
  - 14: [e2e:teardown] deleted 13 user(s) owned by process 44247634746-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44247634746-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44247634746-local-16
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

## Lane smoke
- Step failure:
Step acceptance-doors-guard: outcome failure
  Acceptance-doors guard FAIL: admin_review_listing(uuid,text): missing acceptance check and allowance
- No JSON results; smoke skipped

## Lane 3
- Step failure:
Step smoke: outcome failure
  
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-2 Nobody else moves a seller's ad, and a refused call writes nothing / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-2 Nobody else moves a seller's ad, and a refused call writes nothing / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- i18n-coverage.spec.ts / i18n chrome coverage (Amharic) / the roles permission matrix renders no raw English vocabulary / mobile-360 — Error: matrix vocabulary: raw English actions/resources rendered
- i18n-coverage.spec.ts / i18n chrome coverage (Amharic) / the roles permission matrix renders no raw English vocabulary / desktop-1280 — Error: matrix vocabulary: raw English actions/resources rendered

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-2 All listings: the views, the filters and newest first / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-4 Edit: the change, one revision, one audit row and one notice; a live listing stays live / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-6 Edit removes a photo: the row goes, the next becomes the cover, the revision keeps the file / mobile-360 — Error: expect(received).toMatchObject(expected)
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-9 Send back to review; the seller reads their own notices and no one else's / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-27 Undo refuses: nothing to undo, a stale line, a listing changed since, an undo, the seller's own line, today's rules / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-29 Neither door moves a posted ad to another category; nothing is written (D172) / mobile-360 — Error: expect(received).toMatchObject(expected)
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-2 the dialog refuses the unchanged tier and Other without a note; the door refuses a removed ad, which offers no Set tier / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-3 a reviewer is refused by the door and sees no Set tier; nothing is written / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-7 a reviewer's row menu has no Set tier and the door refuses him; nothing is written / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-2 All listings: the views, the filters and newest first / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-4 Edit: the change, one revision, one audit row and one notice; a live listing stays live / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-6 Edit removes a photo: the row goes, the next becomes the cover, the revision keeps the file / desktop-1280 — Error: expect(received).toMatchObject(expected)
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-9 Send back to review; the seller reads their own notices and no one else's / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-27 Undo refuses: nothing to undo, a stale line, a listing changed since, an undo, the seller's own line, today's rules / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-29 Neither door moves a posted ad to another category; nothing is written (D172) / desktop-1280 — Error: expect(received).toMatchObject(expected)
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-2 the dialog refuses the unchanged tier and Other without a note; the door refuses a removed ad, which offers no Set tier / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-3 a reviewer is refused by the door and sees no Set tier; nothing is written / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-7 a reviewer's row menu has no Set tier and the door refuses him; nothing is written / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 14
- Step failure:
Step smoke: outcome failure
  
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-28 who reads the reports: the reporter his own rows, nobody else's; staff with listings:review through the two admin doors; a plain account is refused / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-28 who reads the reports: the reporter his own rows, nobody else's; staff with listings:review through the two admin doors; a plain account is refused / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- admin-screening.spec.ts / ADMIN SCREENING / SC-2 Approve puts the ad on the site / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-3 Reject keeps the ad off / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-16 a reviewer without a fresh second factor cannot decide / mobile-360 — Error: expect(received).toMatch(expected)
- admin-screening.spec.ts / ADMIN SCREENING / SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-screening.spec.ts / ADMIN SCREENING / SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) / mobile-360 — Error: SC-17: the reveal asked for a second factor (D129)
- admin-screening.spec.ts / ADMIN SCREENING / SC-9 Show number: a reviewer with a fresh second factor gets the number, and one audit row names the channel and never the number / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-screening.spec.ts / ADMIN SCREENING / SC-10 an ad that is not waiting for review answers neither door / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-screening.spec.ts / ADMIN SCREENING / SC-12 two ticked ads are approved together, after one confirmation that counts them / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-14 Reject at the foot of the preview closes it and keeps the ad off / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158) / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-23 approving an ad shows its held photos only; a failed photo waits for its own decision (D178) / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-screening.spec.ts / ADMIN SCREENING / SC-2 Approve puts the ad on the site / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-3 Reject keeps the ad off / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-16 a reviewer without a fresh second factor cannot decide / desktop-1280 — Error: expect(received).toMatch(expected)
- admin-screening.spec.ts / ADMIN SCREENING / SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-screening.spec.ts / ADMIN SCREENING / SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) / desktop-1280 — Error: SC-17: the reveal asked for a second factor (D129)
- admin-screening.spec.ts / ADMIN SCREENING / SC-9 Show number: a reviewer with a fresh second factor gets the number, and one audit row names the channel and never the number / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-screening.spec.ts / ADMIN SCREENING / SC-10 an ad that is not waiting for review answers neither door / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-screening.spec.ts / ADMIN SCREENING / SC-12 two ticked ads are approved together, after one confirmation that counts them / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-14 Reject at the foot of the preview closes it and keeps the ad off / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158) / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-23 approving an ad shows its held photos only; a failed photo waits for its own decision (D178) / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
