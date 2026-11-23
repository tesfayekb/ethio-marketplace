# Local backend proof (non-gating)

- Commit: `f676957701108eafd85c2a12938cdd33b78c019d`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45214184929

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 589 | 91 | applied 553/553 | 38 | 0 | 0 | 16 | 54 |
| email | 323 | 67 | applied 553/553 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1179 | 65 | applied 553/553 | 79 | 1 | 0 | 24 | 104 |
| 1 | 561 | 79 | applied 553/553 | 192 | 0 | 0 | 69 | 261 |
| 2 | 910 | 70 | applied 553/553 | 153 | 16 | 0 | 21 | 190 |
| 3 | 578 | 62 | applied 553/553 | 167 | 2 | 0 | 5 | 174 |
| 4 | 725 | 86 | applied 553/553 | 135 | 2 | 0 | 5 | 142 |
| 5 | 601 | 68 | applied 553/553 | 93 | 0 | 0 | 1 | 94 |
| 6 | 814 | 88 | applied 553/553 | 153 | 6 | 0 | 41 | 200 |
| 7 | 1115 | 67 | applied 553/553 | 131 | 18 | 0 | 77 | 226 |
| 8 | 881 | 61 | applied 553/553 | 175 | 4 | 0 | 7 | 186 |
| 9 | 715 | 69 | applied 553/553 | 123 | 6 | 0 | 1 | 130 |
| 10 | 1164 | 66 | applied 553/553 | 161 | 15 | 0 | 2 | 178 |
| 11 | 687 | 87 | applied 553/553 | 126 | 0 | 0 | 8 | 134 |
| 12 | 686 | 90 | applied 553/553 | 163 | 0 | 0 | 18 | 181 |
| 13 | 633 | 68 | applied 553/553 | 156 | 0 | 0 | 8 | 164 |
| 14 | 1197 | 88 | applied 553/553 | 183 | 4 | 0 | 3 | 190 |
| 15 | 2129 | 66 | applied 553/553 | 116 | 16 | 0 | 6 | 138 |
| 16 | 1084 | 90 | applied 553/553 | 160 | 12 | 0 | 48 | 220 |
| repeat | 1034 | 89 | applied 553/553 | 40 | 12 | 0 | 64 | 116 |
| TOTAL | — | — | — | 2550 | 114 | 0 | 424 | 3088 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 15 2129 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-translations-console.spec.ts (23 tests); Not repeated: e2e/mfa-stepup.spec.ts (16 tests); Not repeated: e2e/settings.spec.ts (13 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-listings.spec.ts (41 tests); Not repeated: e2e/admin-locations.spec.ts (22 tests); Not repeated: e2e/admin-screening.spec.ts (32 tests); Not repeated: e2e/admin-translations-governance.spec.ts (10 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (12 tests); Repeat: each 2 on both projects; 248 tests selected, 30 repeated; budget 643 s at 4.7 s a test; directly changed: 2 of 6 repeated; importers of a changed helper: 2 of 9; Repeat in WebKit (DEC-371): 1 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 1 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass; Not repeated (time cap): the serial pass's @global-state tests (DEC-415)
- Database session samples during each start (INC-944): smoke 12, email 7, webkit 7, 1 10, 2 7, 3 7, 4 11, 5 7, 6 11, 7 7, 8 6, 9 8, 10 7, 11 11, 12 12, 13 7, 14 12, 15 7, 16 12, repeat 12
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/366, 2 641/619, 3 641/394, 4 640/517, 5 640/380, 6 641/596, 7 641/824, 8 641/710, 9 641/529, 10 643/723, 11 640/464, 12 641/474, 13 640/305, 14 641/978, 15 641/1483, 16 641/854
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45214184929-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45214184929-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-1
  - 2: [e2e:teardown] deleted 11 user(s) owned by process 45214184929-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45214184929-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45214184929-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45214184929-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-7
  - 8: [e2e:teardown] deleted 10 user(s) owned by process 45214184929-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 45214184929-local-9
  - 10: [e2e:teardown] deleted 9 user(s) owned by process 45214184929-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45214184929-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45214184929-local-14
  - 15: [e2e:teardown] deleted 75 user(s) owned by process 45214184929-local-15
  - 16: [e2e:teardown] deleted 27 user(s) owned by process 45214184929-local-16
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
  
- dialogs.spec.ts / a Filters panel in rows (Lovable bundle 3) / DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel / webkit-1280 — Error: DLG-E12 the choices a person sees @ 834 x 900

## Lane 2
- Step failure:
Step smoke: outcome failure
  
- admin-attributes-library.spec.ts / C3 attributes console / AT-1 gating: a plain user is refused; the library renders for an admin / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-attributes-library.spec.ts / C3 attributes console / AT-14 a categories:view-only user reads the library and every write door refuses / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-attributes-library.spec.ts / C3 attributes console / AT-1 gating: a plain user is refused; the library renders for an admin / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-attributes-library.spec.ts / C3 attributes console / AT-14 a categories:view-only user reads the library and every write door refuses / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-shell.spec.ts / Admin shell (U0) / A-6 admin fixture: gated section nav, section page + breadcrumb, deep link / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- admin-shell.spec.ts / Admin shell (U0) / A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- admin-shell.spec.ts / Admin shell (U0) / A-4 admin TAB from marketplace navigates to /admin (INC-071) / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-shell.spec.ts / Admin shell (U0) / A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-shell.spec.ts / Admin shell (U0) / IN-1 sub-items indent when open and share one folded icon column / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-shell.spec.ts / Admin shell (U0) / A-6 admin fixture: gated section nav, section page + breadcrumb, deep link / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed
- admin-shell.spec.ts / Admin shell (U0) / A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed
- admin-shell.spec.ts / Admin shell (U0) / A-4 admin TAB from marketplace navigates to /admin (INC-071) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-shell.spec.ts / Admin shell (U0) / A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-shell.spec.ts / Admin shell (U0) / IN-1 sub-items indent when open and share one folded icon column / desktop-1280 — Error: expect(locator).toBeVisible() failed
- shell-table-law.spec.ts / shell table law / admin tables never overflow horizontally / mobile-360 — Error: expect(locator).toBeVisible() failed
- shell-table-law.spec.ts / shell table law / admin tables never overflow horizontally / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 3
- Step failure:
Step smoke: outcome failure
  
- admin-guides.spec.ts / Admin › the Guide on every block (P-1c, D313) / AG-6 a next whose section the signed-in person may not open leads to the admin landing: no refusal notice, no error, nothing written / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-guides.spec.ts / Admin › the Guide on every block (P-1c, D313) / AG-6 a next whose section the signed-in person may not open leads to the admin landing: no refusal notice, no error, nothing written / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- i18n-coverage.spec.ts / i18n chrome coverage (Amharic) / the roles permission matrix renders no raw English vocabulary / mobile-360 — Error: expect(locator).toBeVisible() failed
- i18n-coverage.spec.ts / i18n chrome coverage (Amharic) / the roles permission matrix renders no raw English vocabulary / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 6
- Step failure:
Step smoke: outcome failure
  
- admin-countries.spec.ts / L2b countries console / CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-countries.spec.ts / L2b countries console / CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-locations.spec.ts / L2a locations console / LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 7
- Step failure:
Step smoke: outcome failure
  
- admin-categories-console.spec.ts / C2 categories console / CT-1 gating: a plain user is refused; the section renders for an admin / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-2 roster: the ratified tree renders, search narrows it, nothing overflows / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-7b browse paths: an unproven factor cannot move a pointer / mobile-360 — Test timeout of 60000ms exceeded.
- admin-categories-console.spec.ts / C2 categories console / CT-9b roster shape: the parent line and pagination inside cards / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-29 every ratified category renders its own glyph, not the fallback / mobile-360 — Test timeout of 60000ms exceeded.
- admin-categories-console.spec.ts / C2 categories console / CT-1 gating: a plain user is refused; the section renders for an admin / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-2 roster: the ratified tree renders, search narrows it, nothing overflows / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-7b browse paths: an unproven factor cannot move a pointer / desktop-1280 — Test timeout of 60000ms exceeded.
- admin-categories-console.spec.ts / C2 categories console / CT-9a roster shape: the parent column and a 25-row page (table twin) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-29 every ratified category renders its own glyph, not the fallback / desktop-1280 — Test timeout of 60000ms exceeded.
- legal-admin.spec.ts / Admin Legal / LGA-1 Legal cards, facts and the permission-gated admin menu / mobile-360 — Error: expect(locator).toBeVisible() failed
- legal-admin.spec.ts / Admin Legal / LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish / mobile-360 — Error: expect(locator).toBeVisible() failed
- legal-admin.spec.ts / Admin Legal / LGA-1 Legal cards, facts and the permission-gated admin menu / desktop-1280 — Error: expect(locator).toBeVisible() failed
- legal-admin.spec.ts / Admin Legal / LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish / desktop-1280 — Error: expect(locator).toBeVisible() failed
- rbac.spec.ts / RBAC client seam / R-8 staff user: Admin tab appears and /admin renders / mobile-360 — Error: expect(locator).toBeVisible() failed
- rbac.spec.ts / RBAC client seam / R-8 staff user: Admin tab appears and /admin renders / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- admin-attributes-import.spec.ts / C3 attributes console / AT-23 a categories:view-only operator sees no import control and is refused / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-attributes-import.spec.ts / C3 attributes console / AT-23 a categories:view-only operator sees no import control and is refused / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-7b sync after a step-up prompt still reports its counts / mobile-360 — Test timeout of 120000ms exceeded.
- admin-translations-console.spec.ts / U4b translations console / TR-7b sync after a step-up prompt still reports its counts / desktop-1280 — Test timeout of 120000ms exceeded.

## Lane 9
- Step failure:
Step smoke: outcome failure
  
- admin-audit.spec.ts / U3 audit & security / AS-1 gating: a plain user is refused, a moderator reads the log / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-audit.spec.ts / U3 audit & security / AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-audit.spec.ts / U3 audit & security / AS-1 gating: a plain user is refused, a moderator reads the log / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-audit.spec.ts / U3 audit & security / AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-11 All listings page with listings:view and no other listing right: the public name, never the e-mail, no moves / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2) / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone / mobile-360 — Test timeout of 60000ms exceeded.
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-3 a reviewer is refused by the door and sees no Set tier; nothing is written / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-7 a reviewer's row menu has no Set tier and the door refuses him; nothing is written / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-11 All listings page with listings:view and no other listing right: the public name, never the e-mail, no moves / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone / desktop-1280 — Test timeout of 60000ms exceeded.
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-3 a reviewer is refused by the door and sees no Set tier; nothing is written / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-7 a reviewer's row menu has no Set tier and the door refuses him; nothing is written / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-monetisation.spec.ts / P-1b Admin › Monetisation / MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name / desktop-1280 — Error: expect(locator).toBeVisible() failed
- dialogs.spec.ts / a Filters panel in rows (Lovable bundle 3) / DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel / desktop-1280 — Error: DLG-E12 the choices a person sees @ 834 x 900

## Lane 14
- Step failure:
Step smoke: outcome failure
  
- admin-attributes-editor.spec.ts / C3 attributes console / AT-34 a categories:view-only operator cannot set a dependency / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-attributes-editor.spec.ts / C3 attributes console / AT-34 a categories:view-only operator cannot set a dependency / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-screening.spec.ts / ADMIN SCREENING / SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) / mobile-360 — Test timeout of 180000ms exceeded.
- admin-screening.spec.ts / ADMIN SCREENING / SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) / desktop-1280 — Test timeout of 180000ms exceeded.

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-22 a categories:view-only operator sees no import control and is refused / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-lifecycle.spec.ts / CAT-IE categories import/export / CT-22 a categories:view-only operator sees no import control and is refused / desktop-1280 — Error: expect(locator).toBeVisible() failed
- mfa-stepup.spec.ts / U1f step-up authentication / MF-2 gate: wrong code refused, correct code lets the action through / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-3 no factor: the modal explains and the RPC is never called / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-2 gate: wrong code refused, correct code lets the action through / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-3 no factor: the modal explains and the RPC is never called / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f step-up authentication / MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f-4 step-up freshness / MF-6 unenrolling the only factor drops the stepped-up state / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / U1f-4 step-up freshness / MF-6 unenrolling the only factor drops the stepped-up state / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7b cancelling the prompt releases the caller and writes nothing / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7c a no-factor identity is released with the hint / mobile-360 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7b cancelling the prompt releases the caller and writes nothing / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / FIX-SCAN-1 step-up abort / MF-7c a no-factor identity is released with the hint / desktop-1280 — Test timeout of 60000ms exceeded.
- mfa-stepup.spec.ts / INC-1234 one step-up, one prompt / MF-9 one code covers a category's creation and its picture step / mobile-360 — Test timeout of 120000ms exceeded.
- mfa-stepup.spec.ts / INC-1234 one step-up, one prompt / MF-9 one code covers a category's creation and its picture step / desktop-1280 — Test timeout of 120000ms exceeded.

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- admin-users.spec.ts / U1 admin users / AU-1 permission: moderator is refused, admin sees the list / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-users.spec.ts / U1 admin users / AU-2 search and status filter / mobile-360 — Test timeout of 60000ms exceeded.
- admin-users.spec.ts / U1 admin users / AU-3 detail: reason required, deactivate, audit row, reactivate / mobile-360 — Test timeout of 60000ms exceeded.
- admin-users.spec.ts / U1 admin users / AU-8 own row: status controls are not offered on your own record / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-users.spec.ts / U1 admin users / AU-11 own row: no edit form on your own record / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-users.spec.ts / U1 admin users / AU-13 the users list on the agreed blocks: heading, toolbar, pills, Columns, page size / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-users.spec.ts / U1 admin users / AU-1 permission: moderator is refused, admin sees the list / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-users.spec.ts / U1 admin users / AU-2 search and status filter / desktop-1280 — Test timeout of 60000ms exceeded.
- admin-users.spec.ts / U1 admin users / AU-3 detail: reason required, deactivate, audit row, reactivate / desktop-1280 — Test timeout of 60000ms exceeded.
- admin-users.spec.ts / U1 admin users / AU-8 own row: status controls are not offered on your own record / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-users.spec.ts / U1 admin users / AU-11 own row: no edit form on your own record / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-users.spec.ts / U1 admin users / AU-13 the users list on the agreed blocks: heading, toolbar, pills, Columns, page size / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane repeat
- Step failure:
Step smoke: outcome failure
  repeat-cap: failed
- admin-categories-console.spec.ts / C2 categories console / CT-1 gating: a plain user is refused; the section renders for an admin / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-2 roster: the ratified tree renders, search narrows it, nothing overflows / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-7b browse paths: an unproven factor cannot move a pointer / mobile-360 — Test timeout of 60000ms exceeded.
- admin-categories-console.spec.ts / C2 categories console / CT-9b roster shape: the parent line and pagination inside cards / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-29 every ratified category renders its own glyph, not the fallback / mobile-360 — Test timeout of 60000ms exceeded.
- admin-categories-console.spec.ts / C2 categories console / CT-1 gating: a plain user is refused; the section renders for an admin / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-2 roster: the ratified tree renders, search narrows it, nothing overflows / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-7b browse paths: an unproven factor cannot move a pointer / mobile-360 — Test timeout of 60000ms exceeded.
- admin-categories-console.spec.ts / C2 categories console / CT-9b roster shape: the parent line and pagination inside cards / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-categories-console.spec.ts / C2 categories console / CT-29 every ratified category renders its own glyph, not the fallback / mobile-360 — Test timeout of 60000ms exceeded.
- Outside test — Timed out waiting 763s for the test suite to run
- Outside test — Timed out waiting 763s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
