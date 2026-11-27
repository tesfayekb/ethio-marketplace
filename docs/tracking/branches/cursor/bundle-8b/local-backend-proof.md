# Local backend proof (non-gating)

- Commit: `8e9b95fd4755e51fe2cad208341be8100263d011`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45929211475

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 606 | 67 | applied 565/565 | 38 | 0 | 0 | 16 | 54 |
| email | 182 | 68 | applied 565/565 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1058 | 87 | applied 565/565 | 79 | 0 | 1 | 24 | 104 |
| 1 | 891 | 68 | applied 565/565 | 226 | 0 | 0 | 70 | 296 |
| 2 | 1342 | 68 | applied 565/565 | 84 | 8 | 0 | 32 | 124 |
| 3 | 720 | 67 | applied 565/565 | 75 | 0 | 0 | 71 | 146 |
| 4 | 810 | 66 | applied 565/565 | 149 | 3 | 0 | 12 | 164 |
| 5 | 1316 | 86 | applied 565/565 | 152 | 4 | 0 | 8 | 164 |
| 6 | 1312 | 67 | applied 565/565 | 140 | 0 | 0 | 12 | 152 |
| 7 | 1287 | 92 | applied 565/565 | 193 | 0 | 0 | 11 | 204 |
| 8 | 937 | 67 | applied 565/565 | 137 | 0 | 0 | 5 | 142 |
| 9 | 625 | 67 | applied 565/565 | 210 | 0 | 0 | 6 | 216 |
| 10 | 1243 | 67 | applied 565/565 | 163 | 0 | 0 | 41 | 204 |
| 11 | 1722 | 68 | applied 565/565 | 134 | 0 | 0 | 20 | 154 |
| 12 | 1044 | 66 | applied 565/565 | 175 | 0 | 0 | 15 | 190 |
| 13 | 809 | 67 | applied 565/565 | 130 | 0 | 0 | 12 | 142 |
| 14 | 1323 | 66 | applied 565/565 | 166 | 0 | 0 | 7 | 173 |
| 15 | 1202 | 70 | applied 565/565 | 150 | 0 | 0 | 8 | 158 |
| 16 | 919 | 65 | applied 565/565 | 270 | 0 | 0 | 48 | 318 |
| repeat | 201 | 66 | applied 565/565 | 24 | 0 | 0 | 0 | 24 |
| TOTAL | — | — | — | 2701 | 15 | 1 | 418 | 3135 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 11 1722 s
- Repeat lane (DEC-283): Repeat: each 6 on both projects; 2 tests selected, 2 repeated; budget 793 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 6 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 7, email 7, webkit 11, 1 7, 2 7, 3 7, 4 7, 5 11, 6 7, 7 12, 8 7, 9 7, 10 7, 11 7, 12 7, 13 7, 14 7, 15 8, 16 7, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 126 files, weights from run 43431755160 (2026-11-13); mean 793 s, largest 793 s (+0 %); alone: none; unweighed (median 44 s): none; repeat budget 793 s; planned/test seconds: 1 793/721, 2 792/1154, 3 793/533, 4 793/637, 5 793/1113, 6 793/1146, 7 793/1064, 8 793/778, 9 793/456, 10 793/1086, 11 793/1540, 12 793/879, 13 792/631, 14 793/1139, 15 793/1016, 16 793/756
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45929211475-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 45929211475-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-1
  - 2: [e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-2
  - 3: [e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-3
  - 4: [e2e:teardown] deleted 11 user(s) owned by process 45929211475-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-6
  - 7: [e2e:teardown] deleted 5 user(s) owned by process 45929211475-local-7
  - 8: [e2e:teardown] deleted 23 user(s) owned by process 45929211475-local-8
  - 9: [e2e:teardown] deleted 15 user(s) owned by process 45929211475-local-9
  - 10: [e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45929211475-local-11
  - 12: [e2e:teardown] deleted 7 user(s) owned by process 45929211475-local-12
  - 13: [e2e:teardown] deleted 27 user(s) owned by process 45929211475-local-13
  - 14: [e2e:teardown] deleted 17 user(s) owned by process 45929211475-local-14
  - 15: [e2e:teardown] deleted 47 user(s) owned by process 45929211475-local-15
  - 16: [e2e:teardown] deleted 12 user(s) owned by process 45929211475-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 45929211475-local-repeat
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
RLS on 92 of 92 public tables
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
- sage-ad-page.spec.ts / Sage ad page at 390, light / SAP-1 each tier's ad page reads its tokens (390, light) / webkit-390 — Error: featured ad: the segment

## Lane 2
- Step failure:
Step smoke: outcome failure
  
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-70 /admin/ as staff: loads clean and says every failed read / mobile-360 — Error: /admin/ api /api/error-reports (network): the read failed and the screen said nothing (no failure notice)
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read / mobile-360 — Error: /admin/listings/$listingId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-73 /admin/listings/$listingId/edit as staff: loads clean and says every failed read / mobile-360 — Error: /admin/listings/$listingId/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-74 /admin/legal as staff: loads clean and says every failed read / mobile-360 — Error: /admin/legal at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read / mobile-360 — Error: /admin/legal/$versionId at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-76 /admin/legal/edit as staff: loads clean and says every failed read / mobile-360 — Error: /admin/legal/edit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-77 /admin/translations as staff: loads clean and says every failed read / mobile-360 — Error: /admin/translations at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-content.spec.ts / FAILURE CRAWL — the staff console's content pages (DEC-459 c) / FCR-78 /admin/translations/$lang as staff: loads clean and says every failed read / mobile-360 — Error: /admin/translations/$lang at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- failure-crawl-admin-catalog.spec.ts / FAILURE CRAWL — the staff console's catalogue pages (DEC-459 c) / FCR-56 /admin/places as staff: loads clean and says every failed read / mobile-360 — Error: /admin/places at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-catalog.spec.ts / FAILURE CRAWL — the staff console's catalogue pages (DEC-459 c) / FCR-57 /admin/packages as staff: loads clean and says every failed read / mobile-360 — Error: /admin/packages at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-catalog.spec.ts / FAILURE CRAWL — the staff console's catalogue pages (DEC-459 c) / FCR-58 /admin/monetisation as staff: loads clean and says every failed read / mobile-360 — Error: /admin/monetisation at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- failure-crawl-admin-people.spec.ts / FAILURE CRAWL — the staff console's people pages (DEC-459 c) / FCR-63 /admin/roles/$roleId as staff: loads clean and says every failed read / mobile-360 — Error: /admin/roles/$roleId at 768px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-people.spec.ts / FAILURE CRAWL — the staff console's people pages (DEC-459 c) / FCR-65 /admin/audit as staff: loads clean and says every failed read / mobile-360 — Error: /admin/audit at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-people.spec.ts / FAILURE CRAWL — the staff console's people pages (DEC-459 c) / FCR-66 /admin/screening as staff: loads clean and says every failed read / mobile-360 — Error: /admin/screening at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- failure-crawl-admin-people.spec.ts / FAILURE CRAWL — the staff console's people pages (DEC-459 c) / FCR-67 /admin/ai as staff: loads clean and says every failed read / mobile-360 — Error: /admin/ai at 360px: [client-error] Failed to load resource: the server responded with a status of 429 (Too Many Requests)

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
