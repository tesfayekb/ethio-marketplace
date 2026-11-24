# Local backend proof (non-gating)

- Commit: `8a6464e5b3efa867121be6c0686112cbbf46eb8e`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45332415048

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 813 | 68 | applied 553/553 | 38 | 0 | 0 | 16 | 54 |
| email | 182 | 59 | applied 553/553 | 6 | 0 | 0 | 0 | 6 |
| webkit | not run | 66 | applied 553/553 | 0 | 0 | 0 | 0 | 0 |
| 1 | 989 | 66 | applied 553/553 | 192 | 0 | 0 | 69 | 261 |
| 2 | 629 | 85 | applied 553/553 | 169 | 0 | 0 | 21 | 190 |
| 3 | 971 | 69 | applied 553/553 | 169 | 0 | 0 | 5 | 174 |
| 4 | 672 | 81 | applied 553/553 | 137 | 0 | 0 | 5 | 142 |
| 5 | 965 | 66 | applied 553/553 | 93 | 0 | 0 | 1 | 94 |
| 6 | 628 | 86 | applied 553/553 | 159 | 0 | 0 | 41 | 200 |
| 7 | 655 | 86 | applied 553/553 | 149 | 0 | 0 | 77 | 226 |
| 8 | 645 | 85 | applied 553/553 | 179 | 0 | 0 | 7 | 186 |
| 9 | 993 | 67 | applied 553/553 | 129 | 0 | 0 | 1 | 130 |
| 10 | 954 | 65 | applied 553/553 | 175 | 1 | 0 | 2 | 178 |
| 11 | 669 | 85 | applied 553/553 | 126 | 0 | 0 | 8 | 134 |
| 12 | 603 | 62 | applied 553/553 | 163 | 0 | 0 | 18 | 181 |
| 13 | 949 | 67 | applied 553/553 | 156 | 0 | 0 | 8 | 164 |
| 14 | 987 | 67 | applied 553/553 | 187 | 0 | 0 | 3 | 190 |
| 15 | 584 | 61 | applied 553/553 | 128 | 0 | 0 | 6 | 134 |
| 16 | 1008 | 66 | applied 553/553 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | 68 | applied 553/553 | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2527 | 1 | 0 | 336 | 2864 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 16 1008 s
- Repeat lane (DEC-283): Repeat: each 3 on both projects; 18 tests selected, 18 repeated; budget 643 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 6 of the repeated tests, on webkit-1280 and webkit-390; Repeat serially (DEC-415): 0 of the repeated tests, @global-state, each 3 on mobile-360 and desktop-1280 at one worker after the parallel pass
- Database session samples during each start (INC-944): smoke 7, email 6, webkit 7, 1 7, 2 11, 3 7, 4 10, 5 7, 6 11, 7 11, 8 11, 9 7, 10 7, 11 11, 12 6, 13 7, 14 7, 15 6, 16 7, repeat 7
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/335, 2 641/432, 3 641/338, 4 640/475, 5 640/371, 6 641/426, 7 641/454, 8 641/439, 9 641/386, 10 643/355, 11 640/459, 12 641/420, 13 640/304, 14 641/320, 15 641/410, 16 641/343
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 45332415048-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-email
  - webkit: not found
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 45332415048-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 45332415048-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 45332415048-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 45332415048-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 45332415048-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 45332415048-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 45332415048-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 45332415048-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 45332415048-local-14
  - 15: [e2e:teardown] deleted 49 user(s) owned by process 45332415048-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 45332415048-local-16
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
Step install-chromium-s-system-libraries: outcome failure
  Ign:103 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libsoup-3.0-0 amd64 3.4.4-5ubuntu0.11
  Ign:104 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 gstreamer1.0-plugins-good amd64 1.24.2-1ubuntu1.8
  Ign:105 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libabsl20220623t64 amd64 20220623.1-3.1ubuntu3.2
  Get:106 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libgav1-1 amd64 0.18.0-1build3 [357 kB]
  Get:107 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libyuv0 amd64 0.0~git202401110.af6ac82-1 [178 kB]
  Get:108 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libavif16 amd64 1.0.4-1ubuntu3 [91.2 kB]
  Get:109 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libavtp0 amd64 0.2.0-1build1 [6414 B]
  Get:110 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libcairo-script-interpreter2 amd64 1.18.0-3build1 [60.3 kB]
  Get:111 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdc1394-25 amd64 2.2.6-4build1 [90.1 kB]
  Get:112 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libde265-0 amd64 1.0.15-1ubuntu0.2 [167 kB]
  Get:113 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libdecor-0-0 amd64 0.2.2-1build2 [16.5 kB]
  Get:114 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libgles2 amd64 1.7.0-1build1 [17.1 kB]
  Get:115 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdirectfb-1.7-7t64 amd64 1.7.7-11.1ubuntu2 [1035 kB]
  Get:116 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdvdread8t64 amd64 6.1.3-1.1build1 [54.7 kB]
  Get:117 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdvdnav4 amd64 6.1.1-3build1 [39.5 kB]
  Get:118 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgl1-mesa-dri amd64 25.2.8-0ubuntu0.24.04.5 [38.0 kB]
  Ign:119 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libglx-mesa0 amd64 25.2.8-0ubuntu0.24.04.5
  Get:120 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgbm1 amd64 25.2.8-0ubuntu0.24.04.5 [34.2 kB]
  Get:121 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 mesa-libgallium amd64 25.2.8-0ubuntu0.24.04.5 [10.8 MB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
- No JSON results; smoke skipped

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- dialogs.spec.ts / a Filters panel in rows (Lovable bundle 3) / DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel / desktop-1280 — Error: DLG-E12 the open list @ 834 x 560

## Lane repeat
- Step failure:
Step install-chromium-s-system-libraries: outcome failure
  Get:97 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libtag1v5-vanilla amd64 1.13.1-1build1 [326 kB]
  Get:98 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libtag1v5 amd64 1.13.1-1build1 [11.7 kB]
  Get:99 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libv4lconvert0t64 amd64 1.26.1-4build3 [87.6 kB]
  Get:100 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libv4l-0t64 amd64 1.26.1-4build3 [46.9 kB]
  Ign:101 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libwavpack1 amd64 5.6.0-1build1
  Ign:102 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libsoup-3.0-common all 3.4.4-5ubuntu0.11
  Get:103 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libsoup-3.0-0 amd64 3.4.4-5ubuntu0.11 [292 kB]
  Get:104 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 gstreamer1.0-plugins-good amd64 1.24.2-1ubuntu1.8 [2236 kB]
  Ign:105 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libabsl20220623t64 amd64 20220623.1-3.1ubuntu3.2
  Ign:106 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libgav1-1 amd64 0.18.0-1build3
  Get:107 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libyuv0 amd64 0.0~git202401110.af6ac82-1 [178 kB]
  Ign:108 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libavif16 amd64 1.0.4-1ubuntu3
  Get:109 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libavtp0 amd64 0.2.0-1build1 [6414 B]
  Get:110 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libcairo-script-interpreter2 amd64 1.18.0-3build1 [60.3 kB]
  Get:111 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdc1394-25 amd64 2.2.6-4build1 [90.1 kB]
  Get:112 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libde265-0 amd64 1.0.15-1ubuntu0.2 [167 kB]
  Get:113 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libdecor-0-0 amd64 0.2.2-1build2 [16.5 kB]
  Get:114 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libgles2 amd64 1.7.0-1build1 [17.1 kB]
  Get:115 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdirectfb-1.7-7t64 amd64 1.7.7-11.1ubuntu2 [1035 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium webkit ran past its 1500s deadline on try 1 of 1

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
