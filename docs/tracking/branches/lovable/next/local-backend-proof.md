# Local backend proof (non-gating)

- Commit: `f04da58b6e20046b4e7d2cdf787c71637a7f7640`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45534020394

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 491 | 78 | applied 553/553 | 38 | 0 | 0 | 16 | 54 |
| email | 211 | 69 | applied 553/553 | 6 | 0 | 0 | 0 | 6 |
| webkit | 818 | 70 | applied 553/553 | 79 | 1 | 0 | 24 | 104 |
| 1 | 532 | 56 | applied 553/553 | 190 | 2 | 0 | 69 | 261 |
| 2 | 704 | 91 | applied 553/553 | 167 | 2 | 0 | 21 | 190 |
| 3 | 536 | 68 | applied 553/553 | 169 | 0 | 0 | 5 | 174 |
| 4 | 592 | 64 | applied 553/553 | 132 | 5 | 0 | 5 | 142 |
| 5 | 630 | 87 | applied 553/553 | 92 | 1 | 0 | 1 | 94 |
| 6 | 680 | 87 | applied 553/553 | 157 | 2 | 0 | 41 | 200 |
| 7 | 715 | 84 | applied 553/553 | 145 | 4 | 0 | 77 | 226 |
| 8 | 554 | 67 | applied 553/553 | 178 | 1 | 0 | 7 | 186 |
| 9 | 916 | 67 | applied 553/553 | 116 | 13 | 0 | 1 | 130 |
| 10 | 537 | 68 | applied 553/553 | 175 | 1 | 0 | 2 | 178 |
| 11 | 533 | 69 | applied 553/553 | 126 | 0 | 0 | 8 | 134 |
| 12 | 508 | 56 | applied 553/553 | 163 | 0 | 0 | 18 | 181 |
| 13 | 471 | 68 | applied 553/553 | 156 | 0 | 0 | 8 | 164 |
| 14 | 663 | 87 | applied 553/553 | 187 | 0 | 0 | 3 | 190 |
| 15 | 767 | 89 | applied 553/553 | 122 | 6 | 0 | 6 | 134 |
| 16 | 1012 | 67 | applied 553/553 | 167 | 5 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2565 | 43 | 0 | 360 | 2968 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 16 1012 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 10, email 7, webkit 7, 1 6, 2 12, 3 7, 4 7, 5 11, 6 11, 7 11, 8 7, 9 7, 10 7, 11 7, 12 6, 13 7, 14 11, 15 12, 16 7, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/381, 2 641/493, 3 641/340, 4 640/424, 5 640/424, 6 641/472, 7 641/512, 8 641/372, 9 641/732, 10 643/354, 11 640/365, 12 641/355, 13 640/306, 14 641/437, 15 641/550, 16 641/839
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45534020394-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45534020394-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 45534020394-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45534020394-local-3
  - 4: [e2e:teardown] deleted 35 user(s) owned by process 45534020394-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45534020394-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-7
  - 8: [e2e:teardown] deleted 9 user(s) owned by process 45534020394-local-8
  - 9: [e2e:teardown] deleted 14 user(s) owned by process 45534020394-local-9
  - 10: [e2e:teardown] deleted 8 user(s) owned by process 45534020394-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45534020394-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45534020394-local-14
  - 15: [e2e:teardown] deleted 57 user(s) owned by process 45534020394-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45534020394-local-16
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

## Lane webkit
- Step failure:
Step smoke: outcome failure
  
- auth-signout.spec.ts / F1-7d the end of a session / SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep the fresh session (INC-1218) @webkit / webkit-1280 — Error: sign-in affordance never returned after sign-out

## Lane 1
- Step failure:
Step smoke: outcome failure
  
- shell.spec.ts / U4h device language star / TR-27 a star set signed-out survives reload, sign-in and sign-out / desktop-1280 — Error: sign-in affordance never returned after sign-out
- shell.spec.ts / U4h device language star / TR-37 the account carries onto a starless device, and (D239) over a star too / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 2
- Step failure:
Step smoke: outcome failure
  
- admin-attributes-library.spec.ts / C3 attributes console / AT-1 gating: a plain user is refused; the library renders for an admin / desktop-1280 — Error: sign-in affordance never returned after sign-out
- admin-shell.spec.ts / Admin shell (U0) / A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- import-security.spec.ts / IMPORT-GATE attributes / @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited / desktop-1280 — Error: sign-in affordance never returned after sign-out
- import-security.spec.ts / IMPORT-GATE categories / @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited / desktop-1280 — Error: sign-in affordance never returned after sign-out
- import-security.spec.ts / IMPORT-GATE translations / @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited / desktop-1280 — Error: sign-in affordance never returned after sign-out
- import-security.spec.ts / IMPORT-GATE locations-countries / @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited / desktop-1280 — Error: sign-in affordance never returned after sign-out
- import-security.spec.ts / IMPORT-GATE locations-locations / @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- feed-screens.spec.ts / FEED SCREENS / FS-11 signing out keeps the place this browser chose (INC-532) / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 6
- Step failure:
Step smoke: outcome failure
  
- admin-countries.spec.ts / L2b countries console / CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin / desktop-1280 — Error: sign-in affordance never returned after sign-out
- admin-locations.spec.ts / L2a locations console / LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 7
- Step failure:
Step smoke: outcome failure
  
- admin-categories-console.spec.ts / C2 categories console / CT-1 gating: a plain user is refused; the section renders for an admin / desktop-1280 — Error: sign-in affordance never returned after sign-out
- admin-categories-console.spec.ts / C2 categories console / CT-7b browse paths: an unproven factor cannot move a pointer / desktop-1280 — Error: sign-in affordance never returned after sign-out
- legal-admin.spec.ts / Admin Legal / LGA-1 Legal cards, facts and the permission-gated admin menu / desktop-1280 — Error: sign-in affordance never returned after sign-out
- legal-admin.spec.ts / Admin Legal / LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- admin-translations-console.spec.ts / U4b translations console / TR-7b sync after a step-up prompt still reports its counts / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 9
- Step failure:
Step smoke: outcome failure
  
- admin-audit.spec.ts / U3 audit & security / AS-1 gating: a plain user is refused, a moderator reads the log / desktop-1280 — Error: sign-in affordance never returned after sign-out
- admin-audit.spec.ts / U3 audit & security / IMP-6 the active-session check runs for staff only, never on a member's page / desktop-1280 — Error: sign-in affordance never returned after sign-out
- admin-roles.spec.ts / U2 roles console / RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects / desktop-1280 — Error: sign-in affordance never returned after sign-out
- auth-signout.spec.ts / U0j sign-out hard reset / SO-1 admin: one click signs out and resets to the marketplace / desktop-1280 — Error: sign-in affordance never returned after sign-out
- auth-signout.spec.ts / U0j sign-out hard reset / SO-2 settings: confirmed sign-out empties the gated surface / desktop-1280 — Error: sign-in affordance never returned after sign-out
- auth-signout.spec.ts / U0j sign-out hard reset / SO-4 signed-out marketplace carries no gated UI / desktop-1280 — Error: sign-in affordance never returned after sign-out
- auth-signout.spec.ts / U0j sign-out hard reset / SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- auth-signout.spec.ts / U0j sign-out hard reset / SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- auth-signout.spec.ts / U0j sign-out hard reset / SO-13 an offline sign-out from a page opened directly lands on a working Home page (DEC-279, INC-930) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- auth-signout.spec.ts / U0k session policy / SP-4 cross-tab: signing out in one tab evacuates the other / desktop-1280 — Error: sign-in affordance never returned after sign-out
- auth-signout.spec.ts / F1-7d the end of a session / SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- auth-signout.spec.ts / F1-7d the end of a session / SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- auth-signout.spec.ts / F1-7d the end of a session / SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep the fresh session (INC-1218) @webkit / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- i18n-sign-in-language.spec.ts / D239 — the account's language at sign-in / D239-E5 sign-out keeps the current language / desktop-1280 — Error: sign-in affordance never returned after sign-out
- mfa-stepup.spec.ts / U1f step-up authentication / MF-2 gate: wrong code refused, correct code lets the action through / desktop-1280 — Error: sign-in affordance never returned after sign-out
- mfa-stepup.spec.ts / U1f step-up authentication / MF-4 server: permission first, then step-up — the RPC refuses regardless of UI / desktop-1280 — Error: sign-in affordance never returned after sign-out
- mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7b cancelling the prompt releases the caller and writes nothing / desktop-1280 — Error: sign-in affordance never returned after sign-out
- mfa-stepup.spec.ts / INC-1234 one step-up, one prompt / MF-9 one code covers a category's creation and its picture step / desktop-1280 — Error: sign-in affordance never returned after sign-out
- viewing-place.spec.ts / VIEWING PLACE — the shell carries it (D106 part 2) / VP-7 another browser opens on the account's place, and signing out there keeps it / desktop-1280 — Error: sign-in affordance never returned after sign-out

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- admin-users.spec.ts / U1 admin users / AU-1 permission: moderator is refused, admin sees the list / desktop-1280 — Error: sign-in affordance never returned after sign-out
- sage-shell.spec.ts / Sage shell at 834 px, light / SGS-6 Sign in is raised (834, light) / desktop-1280 — Test timeout of 60000ms exceeded.
- sage-shell.spec.ts / Sage shell at 834 px, dark / SGS-6 Sign in is raised (834, dark) / desktop-1280 — Test timeout of 60000ms exceeded.
- sage-shell.spec.ts / Sage shell at 1440 px, light / SGS-6 Sign in is raised (1440, light) / desktop-1280 — Test timeout of 60000ms exceeded.
- sage-shell.spec.ts / Sage shell at 1440 px, dark / SGS-6 Sign in is raised (1440, dark) / desktop-1280 — Test timeout of 60000ms exceeded.

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
