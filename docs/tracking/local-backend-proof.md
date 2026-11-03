# Local backend proof (non-gating)

- Commit: `610250df68ecf4aa58374cbc80347bed6bbde842`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41589975179

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1021 | 72 | applied 392/392 | 206 | 0 | 0 | 70 | 276 |
| email | 228 | 72 | applied 392/392 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1026 | 73 | applied 392/392 | 163 | 0 | 0 | 6 | 169 |
| 2 | 1125 | 62 | applied 392/392 | 161 | 9 | 0 | 1 | 171 |
| 3 | 838 | 60 | applied 392/392 | 145 | 0 | 0 | 24 | 169 |
| 4 | 711 | 51 | applied 392/392 | 169 | 0 | 0 | 2 | 171 |
| 5 | 903 | 72 | applied 392/392 | 160 | 0 | 0 | 7 | 167 |
| 6 | 864 | 62 | applied 392/392 | 187 | 0 | 0 | 1 | 188 |
| 7 | 365 | 49 | applied 392/392 | 81 | 0 | 0 | 68 | 149 |
| 8 | 699 | 73 | applied 392/392 | 116 | 0 | 0 | 57 | 173 |
| 9 | 1089 | 74 | applied 392/392 | 166 | 0 | 0 | 7 | 173 |
| 10 | 1136 | 62 | applied 392/392 | 150 | 9 | 0 | 1 | 160 |
| 11 | 944 | 76 | applied 392/392 | 138 | 0 | 0 | 36 | 174 |
| 12 | 750 | 61 | applied 392/392 | 155 | 0 | 0 | 5 | 160 |
| 13 | 840 | 72 | applied 392/392 | 154 | 0 | 0 | 17 | 171 |
| 14 | 995 | 74 | applied 392/392 | 182 | 0 | 0 | 2 | 184 |
| 15 | 437 | 73 | applied 392/392 | 88 | 0 | 0 | 61 | 149 |
| 16 | 705 | 75 | applied 392/392 | 131 | 0 | 0 | 37 | 168 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2558 | 18 | 0 | 402 | 2978 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1136 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 8, 1 9, 2 6, 3 6, 4 4, 5 9, 6 6, 7 4, 8 9, 9 9, 10 7, 11 9, 12 6, 13 8, 14 9, 15 9, 16 9, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41589975179-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 41589975179-local-1
  - 2: [e2e:teardown] deleted 4 user(s) owned by process 41589975179-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41589975179-local-3
  - 4: [e2e:teardown] deleted 34 user(s) owned by process 41589975179-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 41589975179-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 41589975179-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 41589975179-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 41589975179-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41589975179-local-11
  - 12: [e2e:teardown] deleted 34 user(s) owned by process 41589975179-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 41589975179-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 41589975179-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-16
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
RLS on 89 of 89 public tables
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
  
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-1 gating: a super admin sees the two seeded packages with their tier words; a plain user is refused and has no entry / mobile-360 — Error: [e2e:pkg] reading the package featured_45 failed: column listing_packages.tier does not exist
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-2 lifecycle: a package is created, edited (days, label), switched off and on through the door; the key is fixed on edit; each save is audited / mobile-360 — Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('packages-roster').getByTestId('data-table-cards').getByTestId('package-e2e_pkg_life_local2_2_m-card')
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-3 refusal: a reviewer and a coverage editor have no Packages entry, the screen refuses them, and the doors refuse them by name; nothing is written / mobile-360 — Error: PKG-3 the package door did not refuse the reviewer
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-4 prices: a free price for every market and three narrower rows are saved through the door; the resolver answers by precedence and NULL where nothing covers / mobile-360 — Error: [e2e:pkg] seeding e2e_pkg_price_local2_6_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-5 windows: a price whose dates overlap another of the same scope is refused by name and nothing is written; an adjacent window saves / mobile-360 — Error: [e2e:pkg] seeding e2e_pkg_win_local2_8_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-6 end: End price sets the end to now; the row stays in the console, the public read no longer lists it, and the resolver answers NULL / mobile-360 — Error: [e2e:pkg] seeding e2e_pkg_end_local2_10_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-7 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given / mobile-360 — Error: [e2e:pkg] reading the package e2e_pkg_aal_local2_12_m failed: column listing_packages.tier does not exist
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-8 geometry: the screen, its dialogs and the prices table hold at 360 and in Amharic / mobile-360 — Error: [e2e:pkg] seeding e2e_pkg_geo_local2_14_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-9 the browser roles read enabled packages and valid prices only, by their own columns, never updated_by / mobile-360 — Error: [e2e:pkg] seeding e2e_pkg_pubon_local2_16_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-1 gating: a super admin sees the two seeded packages with their tier words; a plain user is refused and has no entry / desktop-1280 — Error: [e2e:pkg] reading the package featured_45 failed: column listing_packages.tier does not exist
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-2 lifecycle: a package is created, edited (days, label), switched off and on through the door; the key is fixed on edit; each save is audited / desktop-1280 — Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('packages-roster').getByRole('table').getByTestId('package-e2e_pkg_life_local10_2_d')
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-3 refusal: a reviewer and a coverage editor have no Packages entry, the screen refuses them, and the doors refuse them by name; nothing is written / desktop-1280 — Error: PKG-3 the package door did not refuse the reviewer
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-4 prices: a free price for every market and three narrower rows are saved through the door; the resolver answers by precedence and NULL where nothing covers / desktop-1280 — Error: [e2e:pkg] seeding e2e_pkg_price_local10_6_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-5 windows: a price whose dates overlap another of the same scope is refused by name and nothing is written; an adjacent window saves / desktop-1280 — Error: [e2e:pkg] seeding e2e_pkg_win_local10_8_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-6 end: End price sets the end to now; the row stays in the console, the public read no longer lists it, and the resolver answers NULL / desktop-1280 — Error: [e2e:pkg] seeding e2e_pkg_end_local10_10_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-7 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given / desktop-1280 — Error: [e2e:pkg] reading the package e2e_pkg_aal_local10_12_d failed: column listing_packages.tier does not exist
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-8 geometry: the screen, its dialogs and the prices table hold at 360 and in Amharic / desktop-1280 — Error: [e2e:pkg] seeding e2e_pkg_geo_local10_14_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
- admin-packages.spec.ts / P-1 Admin › Packages / PKG-9 the browser roles read enabled packages and valid prices only, by their own columns, never updated_by / desktop-1280 — Error: [e2e:pkg] seeding e2e_pkg_pubon_local10_16_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
