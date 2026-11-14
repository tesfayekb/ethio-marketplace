# Local backend proof (non-gating)

- Commit: `276339ca41c60041419a12dc13d2e18bb36b2615`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43572434121

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 421 | 62 | applied 442/442 | 27 | 0 | 0 | 5 | 32 |
| email | 207 | 66 | applied 442/442 | 6 | 0 | 0 | 0 | 6 |
| webkit | 736 | 62 | applied 442/442 | 70 | 0 | 0 | 24 | 94 |
| 1 | 476 | 58 | applied 442/442 | 188 | 0 | 0 | 69 | 257 |
| 2 | 484 | 59 | applied 442/442 | 174 | 0 | 0 | 26 | 200 |
| 3 | 680 | 76 | applied 442/442 | 169 | 0 | 0 | 5 | 174 |
| 4 | 676 | 77 | applied 442/442 | 137 | 0 | 0 | 5 | 142 |
| 5 | 552 | 61 | applied 442/442 | 93 | 0 | 0 | 1 | 94 |
| 6 | 595 | 67 | applied 442/442 | 153 | 0 | 0 | 41 | 194 |
| 7 | 473 | 58 | applied 442/442 | 147 | 0 | 0 | 77 | 224 |
| 8 | 474 | 57 | applied 442/442 | 179 | 0 | 0 | 7 | 186 |
| 9 | 1456 | 76 | applied 442/442 | 89 | 34 | 0 | 1 | 124 |
| 10 | 475 | 60 | applied 442/442 | 160 | 0 | 0 | 2 | 162 |
| 11 | 531 | 61 | applied 442/442 | 120 | 0 | 0 | 8 | 128 |
| 12 | 631 | 67 | applied 442/442 | 164 | 0 | 0 | 19 | 183 |
| 13 | 460 | 59 | applied 442/442 | 156 | 0 | 1 | 9 | 166 |
| 14 | 624 | 76 | applied 442/442 | 183 | 0 | 0 | 5 | 188 |
| 15 | 572 | 57 | applied 442/442 | 120 | 4 | 0 | 8 | 132 |
| 16 | 582 | 58 | applied 442/442 | 164 | 8 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2499 | 46 | 1 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 9 1456 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 7, email 8, webkit 7, 1 6, 2 6, 3 9, 4 10, 5 6, 6 8, 7 6, 8 5, 9 9, 10 5, 11 6, 12 7, 13 6, 14 9, 15 5, 16 6, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/337, 2 641/335, 3 641/481, 4 640/475, 5 640/377, 6 641/409, 7 641/328, 8 641/334, 9 641/1267, 10 643/324, 11 640/361, 12 641/432, 13 640/311, 14 641/434, 15 641/425, 16 641/430
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43572434121-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43572434121-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43572434121-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43572434121-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43572434121-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43572434121-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43572434121-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43572434121-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43572434121-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43572434121-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43572434121-local-8
  - 9: [e2e:teardown] deleted 21 user(s) owned by process 43572434121-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43572434121-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43572434121-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43572434121-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43572434121-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43572434121-local-14
  - 15: [e2e:teardown] deleted 47 user(s) owned by process 43572434121-local-15
  - 16: [e2e:teardown] deleted 31 user(s) owned by process 43572434121-local-16
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

## Lane 9
- Step failure:
Step smoke: outcome failure
  
- admin-audit.spec.ts / U3 audit & security / IMP-1 impersonation: super admin opens a read-only session and ends it / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-audit.spec.ts / U3 audit & security / IMP-2 dual-actor audit: start and end are both recorded / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-audit.spec.ts / U3 audit & security / IMP-3 server refusals: self and a super-admin target / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- admin-audit.spec.ts / U3 audit & security / IMP-5 server refusal: a caller who is not a super admin / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- admin-audit.spec.ts / U3 audit & security / IMP-1 impersonation: super admin opens a read-only session and ends it / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-audit.spec.ts / U3 audit & security / IMP-2 dual-actor audit: start and end are both recorded / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-audit.spec.ts / U3 audit & security / IMP-3 server refusals: self and a super-admin target / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- admin-audit.spec.ts / U3 audit & security / IMP-5 server refusal: a caller who is not a super admin / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- admin-roles.spec.ts / U2 roles console / RP-2 create: a super admin creates a custom role through step-up / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-3 matrix: grant then revoke a benign permission, persisted across reload / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs / mobile-360 — Error: expect(received).toMatch(expected)
- admin-roles.spec.ts / U2 roles console / RP-5 delete guards: members block deletion; typed confirm deletes / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-6 revocation path: unenrolling the factor refuses the next change / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-7 registration: DEC-016 permissions appear as grantable rows / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-8 Amharic + no horizontal overflow / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-10 members link preselects the role filter via the URL / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-16 the roles list on the agreed blocks: heading, Create role, Columns, Open and View members / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-17 P-1: the matrix shows the packages resource with View and Update, Update marked step-up / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-2 create: a super admin creates a custom role through step-up / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-3 matrix: grant then revoke a benign permission, persisted across reload / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs / desktop-1280 — Error: expect(received).toMatch(expected)
- admin-roles.spec.ts / U2 roles console / RP-5 delete guards: members block deletion; typed confirm deletes / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-6 revocation path: unenrolling the factor refuses the next change / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-7 registration: DEC-016 permissions appear as grantable rows / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-8 Amharic + no horizontal overflow / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-10 members link preselects the role filter via the URL / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-16 the roles list on the agreed blocks: heading, Create role, Columns, Open and View members / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-roles.spec.ts / U2 roles console / RP-17 P-1: the matrix shows the packages resource with View and Update, Update marked step-up / desktop-1280 — Error: expect(locator).toBeVisible() failed

## Lane 13
- submenu-touch.spec.ts / SMN-E3 a tap opens the page and the panel; rows fit between 32 and 48 px, panel rows the rail's / desktop-1280 — Error: SMN-E3 a panel row is at most the rail's (D248)

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- i18n-sign-in-language.spec.ts / D239 — the account's language at sign-in / D239-E6 impersonation leaves the staff member's own language as it was, at start and at end / mobile-360 — Error: expect(locator).toBeVisible() failed
- i18n-sign-in-language.spec.ts / D239 — the account's language at sign-in / D239-E6 impersonation leaves the staff member's own language as it was, at start and at end / desktop-1280 — Error: expect(locator).toBeVisible() failed
- mfa-stepup.spec.ts / U1f step-up authentication / MF-4 server: permission first, then step-up — the RPC refuses regardless of UI / mobile-360 — Error: expect(received).toMatch(expected)
- mfa-stepup.spec.ts / U1f step-up authentication / MF-4 server: permission first, then step-up — the RPC refuses regardless of UI / desktop-1280 — Error: expect(received).toMatch(expected)

## Lane 16
- Step failure:
Step smoke: outcome failure
  
- admin-users.spec.ts / U1 admin users / AU-6 negative: a base user cannot call the status RPC / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- admin-users.spec.ts / U1 admin users / AU-10 edit: a duplicate alias is refused inline and nothing changes / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-users.spec.ts / U1 admin users / AU-12 edit: a reserved name needs a reason of ten characters / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-users.spec.ts / U1 admin users / AU-6 negative: a base user cannot call the status RPC / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- admin-users.spec.ts / U1 admin users / AU-10 edit: a duplicate alias is refused inline and nothing changes / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-users.spec.ts / U1 admin users / AU-12 edit: a reserved name needs a reason of ten characters / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-users.spec.ts / D189 deactivated staff / AU-14 a deactivated staff account holds no permission: the staff door refuses it and has_permission answers false (D189) / mobile-360 — Error: expect(received).toMatch(expected)
- admin-users.spec.ts / D189 deactivated staff / AU-14 a deactivated staff account holds no permission: the staff door refuses it and has_permission answers false (D189) / desktop-1280 — Error: expect(received).toMatch(expected)

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
