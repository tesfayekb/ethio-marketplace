# Local backend proof (non-gating)

- Commit: `5ce698ebe11cda26be91b8ac74ed67529418e6c1`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44280551332

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 727 | 62 | applied 505/505 | 27 | 0 | 0 | 5 | 32 |
| email | 216 | 80 | applied 505/505 | 6 | 0 | 0 | 0 | 6 |
| webkit | not run | 64 | applied 505/505 | 0 | 0 | 0 | 0 | 0 |
| 1 | 573 | 72 | applied 505/505 | 188 | 0 | 0 | 69 | 257 |
| 2 | 566 | 65 | applied 505/505 | 174 | 0 | 0 | 26 | 200 |
| 3 | 582 | 63 | applied 505/505 | 169 | 0 | 0 | 5 | 174 |
| 4 | 703 | 61 | applied 505/505 | 137 | 0 | 0 | 5 | 142 |
| 5 | 695 | 59 | applied 505/505 | 93 | 0 | 0 | 1 | 94 |
| 6 | 786 | 62 | applied 505/505 | 153 | 0 | 0 | 41 | 194 |
| 7 | 649 | 79 | applied 505/505 | 147 | 0 | 0 | 77 | 224 |
| 8 | 719 | 62 | applied 505/505 | 179 | 0 | 0 | 7 | 186 |
| 9 | 709 | 63 | applied 505/505 | 123 | 0 | 0 | 1 | 124 |
| 10 | 597 | 74 | applied 505/505 | 160 | 0 | 0 | 2 | 162 |
| 11 | 622 | 70 | applied 505/505 | 120 | 0 | 0 | 8 | 128 |
| 12 | 688 | 80 | applied 505/505 | 164 | 0 | 0 | 19 | 183 |
| 13 | 506 | 63 | applied 505/505 | 157 | 0 | 0 | 9 | 166 |
| 14 | 550 | 63 | applied 505/505 | 183 | 0 | 0 | 5 | 188 |
| 15 | 601 | 63 | applied 505/505 | 124 | 0 | 0 | 8 | 132 |
| 16 | 784 | 62 | applied 505/505 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 52 | 52 |
| TOTAL | — | — | — | 2476 | 0 | 0 | 388 | 2864 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 6 786 s
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (52 tests); Repeat: each 2 on both projects; 52 tests selected, 0 repeated; budget 643 s at 4.7 s a test; directly changed: 0 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 6, email 10, webkit 6, 1 8, 2 7, 3 7, 4 6, 5 6, 6 6, 7 10, 8 6, 9 6, 10 9, 11 8, 12 10, 13 7, 14 7, 15 7, 16 6, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/374, 2 641/380, 3 641/411, 4 640/323, 5 640/369, 6 641/348, 7 641/446, 8 641/344, 9 641/335, 10 643/414, 11 640/424, 12 641/488, 13 640/331, 14 641/369, 15 641/407, 16 641/323
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44280551332-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-email
  - webkit: not found
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44280551332-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44280551332-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44280551332-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44280551332-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44280551332-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44280551332-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 44280551332-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44280551332-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44280551332-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44280551332-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44280551332-local-16
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
  Get:161 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenni2-0 amd64 2.2.0.33+dfsg-18 [370 kB]
  Get:162 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libqrencode4 amd64 4.1.1-1build2 [25.0 kB]
  Get:163 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libsecret-common all 0.21.4-1build3 [4962 B]
  Get:164 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libsecret-1-0 amd64 0.21.4-1build3 [116 kB]
  Get:165 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsndio7.0 amd64 1.9.0-0.3build3 [29.6 kB]
  Get:166 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsoundtouch1 amd64 2.3.2+ds1-1build1 [60.5 kB]
  Get:167 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libspandsp2t64 amd64 0.0.6+dfsg-2.1build1 [311 kB]
  Get:168 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsrtp2-1 amd64 2.5.0-3build1 [41.9 kB]
  Get:169 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libwayland-server0 amd64 1.22.0-2.1build1 [33.9 kB]
  Get:170 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libwildmidi2 amd64 0.4.3-1build3 [68.5 kB]
  Get:171 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libwoff1 amd64 1.0.2-2build1 [45.3 kB]
  Get:172 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libxcb-xkb1 amd64 1.15-1ubuntu2 [32.3 kB]
  Get:173 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libxkbcommon-x11-0 amd64 1.6.0-1build1 [14.5 kB]
  Get:174 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libzbar0t64 amd64 0.23.93-4build3 [123 kB]
  Get:175 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libzxing3 amd64 2.2.1-3 [583 kB]
  Get:176 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 xfonts-encodings all 1:1.0.5-0ubuntu2 [578 kB]
  Get:177 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 xfonts-utils amd64 1:7.7+6build3 [94.4 kB]
  Get:178 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 xfonts-cyrillic all 1:1.0.5+nmu1 [384 kB]
  Get:179 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 xfonts-scalable all 1:1.0.3-1.3 [304 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
- No JSON results; smoke skipped

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
