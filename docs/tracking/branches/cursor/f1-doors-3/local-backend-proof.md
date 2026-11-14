# Local backend proof (non-gating)

- Commit: `698483b75991cb70fea2c02af7fd1f4617fdb03d`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43591785189

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 384 | 55 | applied 455/455 | 27 | 0 | 0 | 5 | 32 |
| email | 193 | 61 | applied 455/455 | 6 | 0 | 0 | 0 | 6 |
| webkit | 807 | 76 | applied 455/455 | 70 | 0 | 0 | 24 | 94 |
| 1 | 591 | 72 | applied 455/455 | 188 | 0 | 0 | 69 | 257 |
| 2 | 479 | 53 | applied 455/455 | 174 | 0 | 0 | 26 | 200 |
| 3 | 524 | 59 | applied 455/455 | 169 | 0 | 0 | 5 | 174 |
| 4 | 517 | 54 | applied 455/455 | 137 | 0 | 0 | 5 | 142 |
| 5 | 548 | 55 | applied 455/455 | 91 | 2 | 0 | 1 | 94 |
| 6 | 622 | 77 | applied 455/455 | 153 | 0 | 0 | 41 | 194 |
| 7 | 492 | 60 | applied 455/455 | 143 | 4 | 0 | 77 | 224 |
| 8 | 478 | 49 | applied 455/455 | 167 | 12 | 0 | 7 | 186 |
| 9 | 602 | 76 | applied 455/455 | 123 | 0 | 0 | 1 | 124 |
| 10 | 481 | 60 | applied 455/455 | 160 | 0 | 0 | 2 | 162 |
| 11 | 548 | 60 | applied 455/455 | 120 | 0 | 0 | 8 | 128 |
| 12 | 601 | 66 | applied 455/455 | 164 | 0 | 0 | 19 | 183 |
| 13 | 544 | 62 | applied 455/455 | 157 | 0 | 0 | 9 | 166 |
| 14 | 512 | 54 | applied 455/455 | 183 | 0 | 0 | 5 | 188 |
| 15 | 611 | 70 | applied 455/455 | 124 | 0 | 0 | 8 | 132 |
| 16 | 501 | 61 | applied 455/455 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2528 | 18 | 0 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 807 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 5, email 6, webkit 9, 1 8, 2 5, 3 6, 4 5, 5 6, 6 9, 7 6, 8 4, 9 9, 10 6, 11 6, 12 7, 13 7, 14 5, 15 8, 16 6, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/378, 2 641/326, 3 641/380, 4 640/364, 5 640/385, 6 641/429, 7 641/342, 8 641/339, 9 641/415, 10 643/328, 11 640/384, 12 641/421, 13 640/360, 14 641/352, 15 641/438, 16 641/330
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43591785189-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43591785189-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43591785189-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43591785189-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43591785189-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43591785189-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43591785189-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43591785189-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43591785189-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43591785189-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43591785189-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43591785189-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43591785189-local-16
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
  
- admin-translations-data.spec.ts / TR-42 answer-option translations (DEC-233) / TR-42 the Data scope saves and approves an answer option, excluding switched-off options and Amharic (INC-820) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-translations-data.spec.ts / TR-42 answer-option translations (DEC-233) / TR-42 the Data scope saves and approves an answer option, excluding switched-off options and Amharic (INC-820) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 7
- Step failure:
Step smoke: outcome failure
  
- legal-admin.spec.ts / Admin Legal / LGA-16 a document's review: its publish counts; Reviewed — no change with a note moves the due date and is audited; a blank note sends nothing; the door refuses a person without legal:edit / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- legal-admin.spec.ts / Admin Legal / LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- legal-admin.spec.ts / Admin Legal / LGA-16 a document's review: its publish counts; Reviewed — no change with a note moves the due date and is audited; a blank note sends nothing; the door refuses a person without legal:edit / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- legal-admin.spec.ts / Admin Legal / LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- admin-translations-console.spec.ts / U4b translations console / TR-6 coverage gate: empty and incomplete catalogs both refuse publication / mobile-360 — Error: expect(received).toMatch(expected)
- admin-translations-console.spec.ts / U4b translations console / TR-6 coverage gate: empty and incomplete catalogs both refuse publication / desktop-1280 — Error: expect(received).toMatch(expected)
- legal-doors.spec.ts / Legal doors / LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule / mobile-360 — Error: plain user is refused the draft door
- legal-doors.spec.ts / Legal doors / LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written / mobile-360 — Error: plain user is refused the settings read
- legal-doors.spec.ts / Legal doors / LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only / mobile-360 — Error: a plain user is refused the staff history
- legal-doors.spec.ts / Legal doors / LG-9 the staff reads: admin_legal_documents and admin_legal_version refuse every lesser caller; the super admin reads a scratch version whole, its change log included / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- legal-doors.spec.ts / Legal doors / LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- legal-doors.spec.ts / Legal doors / LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule / desktop-1280 — Error: plain user is refused the draft door
- legal-doors.spec.ts / Legal doors / LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written / desktop-1280 — Error: plain user is refused the settings read
- legal-doors.spec.ts / Legal doors / LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only / desktop-1280 — Error: a plain user is refused the staff history
- legal-doors.spec.ts / Legal doors / LG-9 the staff reads: admin_legal_documents and admin_legal_version refuse every lesser caller; the super admin reads a scratch version whole, its change log included / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- legal-doors.spec.ts / Legal doors / LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row / desktop-1280 — Error: expect(received).toContain(expected) // indexOf

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
