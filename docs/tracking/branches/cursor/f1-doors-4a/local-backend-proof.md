# Local backend proof (non-gating)

- Commit: `5895500bda368c4493474ca2a97fc0f4a03dc6e0`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43666982893

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 342 | 59 | applied 475/475 | 27 | 0 | 0 | 5 | 32 |
| email | 193 | 62 | applied 475/475 | 6 | 0 | 0 | 0 | 6 |
| webkit | 680 | 62 | applied 475/475 | 70 | 0 | 0 | 24 | 94 |
| 1 | 578 | 78 | applied 475/475 | 188 | 0 | 0 | 69 | 257 |
| 2 | 521 | 60 | applied 475/475 | 170 | 4 | 0 | 26 | 200 |
| 3 | 516 | 61 | applied 475/475 | 169 | 0 | 0 | 5 | 174 |
| 4 | 568 | 62 | applied 475/475 | 133 | 4 | 0 | 5 | 142 |
| 5 | 548 | 52 | applied 475/475 | 88 | 4 | 1 | 1 | 94 |
| 6 | 614 | 77 | applied 475/475 | 153 | 0 | 0 | 41 | 194 |
| 7 | 552 | 63 | applied 475/475 | 147 | 0 | 0 | 77 | 224 |
| 8 | 654 | 79 | applied 475/475 | 177 | 2 | 0 | 7 | 186 |
| 9 | 596 | 73 | applied 475/475 | 123 | 0 | 0 | 1 | 124 |
| 10 | 560 | 64 | applied 475/475 | 160 | 0 | 0 | 2 | 162 |
| 11 | 533 | 51 | applied 475/475 | 120 | 0 | 0 | 8 | 128 |
| 12 | 526 | 61 | applied 475/475 | 164 | 0 | 0 | 19 | 183 |
| 13 | 451 | 61 | applied 475/475 | 157 | 0 | 0 | 9 | 166 |
| 14 | 527 | 62 | applied 475/475 | 183 | 0 | 0 | 5 | 188 |
| 15 | 678 | 78 | applied 475/475 | 120 | 4 | 0 | 8 | 132 |
| 16 | 583 | 69 | applied 475/475 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2527 | 18 | 1 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: webkit 680 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 7, webkit 6, 1 10, 2 6, 3 6, 4 6, 5 5, 6 9, 7 7, 8 10, 9 9, 10 7, 11 5, 12 6, 13 6, 14 7, 15 10, 16 8, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/389, 2 641/373, 3 641/358, 4 640/410, 5 640/393, 6 641/421, 7 641/372, 8 641/459, 9 641/400, 10 643/367, 11 640/378, 12 641/371, 13 640/305, 14 641/354, 15 641/492, 16 641/386
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43666982893-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43666982893-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 43666982893-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43666982893-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43666982893-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43666982893-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43666982893-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43666982893-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43666982893-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43666982893-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43666982893-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 43666982893-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43666982893-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43666982893-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43666982893-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43666982893-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43666982893-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43666982893-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43666982893-local-16
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
  
- admin-attributes-library.spec.ts / C3 attributes console / AT-5 delete: refused while linked, accepted once unlinked / mobile-360 — Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete
- admin-attributes-library.spec.ts / C3 attributes console / AT-14 a categories:view-only user reads the library and every write door refuses / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- admin-attributes-library.spec.ts / C3 attributes console / AT-5 delete: refused while linked, accepted once unlinked / desktop-1280 — Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete
- admin-attributes-library.spec.ts / C3 attributes console / AT-14 a categories:view-only user reads the library and every write door refuses / desktop-1280 — Error: expect(received).toContain(expected) // indexOf

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- admin-categories-home.spec.ts / Bundle 7 category doors / CT-38 a retired category with a child is not deleted until the child moves away / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-categories-home.spec.ts / Bundle 7 category doors / CT-40 the delete door's refusals read as words, never as keys / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-categories-home.spec.ts / Bundle 7 category doors / CT-38 a retired category with a child is not deleted until the child moves away / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-categories-home.spec.ts / Bundle 7 category doors / CT-40 the delete door's refusals read as words, never as keys / desktop-1280 — Error: expect(locator).toHaveText(expected) failed

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-74 a merge is refused while a listing holds a source's answer, and merges when none does / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- admin-attributes-safety.spec.ts / Bundle 7 attribute safety / AT-74 a merge is refused while a listing holds a source's answer, and merges when none does / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- admin-translations-data.spec.ts / U4b translations console / TR-26 the Data scope approves every machine-filled content name / desktop-1280 — Error: approve-all never approved scratch location [account id]
- category-image-routes.spec.ts / C5a — category AI foundation routes / CI-4b stored truth: generate, accept, and the reader returns assets + stamp / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- category-image-routes.spec.ts / C5a — category AI foundation routes / CI-4b stored truth: generate, accept, and the reader returns assets + stamp / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- admin-attributes-import.spec.ts / C3 attributes console / AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins / mobile-360 — Error: AT-46 the door tolerated an inherited rank
- admin-attributes-import.spec.ts / C3 attributes console / AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins / desktop-1280 — Error: AT-46 the door tolerated an inherited rank

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- admin-categories-lifecycle.spec.ts / C2 categories console / CT-14 catch-all law: never a parent, refused server-side, no move verbs / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- admin-categories-lifecycle.spec.ts / C2 categories console / CT-17 create flow: two steps, chained countries + position, image / mobile-360 — Error: expect(received).toEqual(expected) // deep equality
- admin-categories-lifecycle.spec.ts / C2 categories console / CT-14 catch-all law: never a parent, refused server-side, no move verbs / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- admin-categories-lifecycle.spec.ts / C2 categories console / CT-17 create flow: two steps, chained countries + position, image / desktop-1280 — Error: expect(received).toEqual(expected) // deep equality

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
