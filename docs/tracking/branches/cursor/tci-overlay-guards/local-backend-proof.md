# Local backend proof (non-gating)

- Commit: `6046cce710f5c5ffc1e92a23e465099b7f01e760`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44345618975

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 465 | 79 | applied 515/515 | 27 | 0 | 0 | 5 | 32 |
| email | 518 | 63 | applied 515/515 | 6 | 0 | 0 | 0 | 6 |
| webkit | not run | 63 | applied 515/515 | 0 | 0 | 0 | 0 | 0 |
| 1 | 588 | 77 | applied 515/515 | 188 | 0 | 0 | 69 | 257 |
| 2 | 659 | 61 | applied 515/515 | 173 | 0 | 1 | 26 | 200 |
| 3 | 745 | 62 | applied 515/515 | 169 | 0 | 0 | 5 | 174 |
| 4 | 564 | 67 | applied 515/515 | 137 | 0 | 0 | 5 | 142 |
| 5 | 695 | 63 | applied 515/515 | 93 | 0 | 0 | 1 | 94 |
| 6 | 619 | 59 | applied 515/515 | 153 | 0 | 0 | 41 | 194 |
| 7 | not run | 63 | applied 515/515 | 0 | 0 | 0 | 0 | 0 |
| 8 | 844 | 62 | applied 515/515 | 179 | 0 | 0 | 7 | 186 |
| 9 | 732 | 61 | applied 515/515 | 123 | 0 | 0 | 1 | 124 |
| 10 | 665 | 63 | applied 515/515 | 160 | 0 | 0 | 2 | 162 |
| 11 | 590 | 64 | applied 515/515 | 120 | 0 | 0 | 8 | 128 |
| 12 | 536 | 55 | applied 515/515 | 164 | 0 | 0 | 19 | 183 |
| 13 | 491 | 55 | applied 515/515 | 156 | 0 | 1 | 9 | 166 |
| 14 | 1040 | 64 | applied 515/515 | 183 | 0 | 0 | 5 | 188 |
| 15 | 654 | 79 | applied 515/515 | 124 | 0 | 0 | 8 | 132 |
| 16 | 929 | 63 | applied 515/515 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2327 | 0 | 2 | 259 | 2588 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 14 1040 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 10, email 6, webkit 6, 1 9, 2 6, 3 6, 4 8, 5 6, 6 6, 7 6, 8 6, 9 6, 10 6, 11 7, 12 5, 13 5, 14 6, 15 10, 16 6, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/389, 2 641/325, 3 641/356, 4 640/353, 5 640/373, 6 641/355, 7 ?/not run, 8 641/349, 9 641/331, 10 643/337, 11 640/402, 12 641/379, 13 640/327, 14 641/316, 15 641/465, 16 641/324
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44345618975-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-email
  - webkit: not found
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44345618975-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44345618975-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44345618975-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44345618975-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-6
  - 7: not found
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44345618975-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44345618975-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 44345618975-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44345618975-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44345618975-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44345618975-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44345618975-local-16
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
  Get:150 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmfx1 amd64 22.5.4-1 [3124 kB]
  Get:151 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmjpegutils-2.1-0t64 amd64 1:2.1.0+debian-8.1build1 [25.5 kB]
  Get:152 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmodplug1 amd64 1:0.8.9.0-3build1 [166 kB]
  Get:153 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmpcdec6 amd64 2:0.1~r495-2build1 [32.7 kB]
  Get:154 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmpeg2encpp-2.1-0t64 amd64 1:2.1.0+debian-8.1build1 [75.6 kB]
  Get:155 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmplex2-2.1-0t64 amd64 1:2.1.0+debian-8.1build1 [46.1 kB]
  Get:156 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libneon27t64 amd64 0.33.0-1.1build3 [102 kB]
  Get:157 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libnice10 amd64 0.1.21-2build3 [157 kB]
  Get:158 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenal-data all 1:1.23.1-4build1 [161 kB]
  Get:159 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenexr-3-1-30 amd64 3.1.5-5.1build3 [1004 kB]
  Get:160 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenh264-7 amd64 2.4.1+dfsg-1 [409 kB]
  Get:161 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenni2-0 amd64 2.2.0.33+dfsg-18 [370 kB]
  Get:162 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libqrencode4 amd64 4.1.1-1build2 [25.0 kB]
  Get:163 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libsecret-common all 0.21.4-1build3 [4962 B]
  Get:164 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libsecret-1-0 amd64 0.21.4-1build3 [116 kB]
  Get:165 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsndio7.0 amd64 1.9.0-0.3build3 [29.6 kB]
  Get:166 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsoundtouch1 amd64 2.3.2+ds1-1build1 [60.5 kB]
  Get:167 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libspandsp2t64 amd64 0.0.6+dfsg-2.1build1 [311 kB]
  Get:168 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsrtp2-1 amd64 2.5.0-3build1 [41.9 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
- No JSON results; smoke skipped

## Lane 2
- submenu-look.spec.ts / D248 a side panel is the main menu / SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254) / desktop-1280 — Error: SMN-E13 the panel scrolls

## Lane 7
- Step failure:
Step install-chromium-s-system-libraries: outcome failure
  ci-mirror probe: archive.ubuntu.com → ok
  ci-mirror probe: security.ubuntu.com → ok
  Installing dependencies...
  Switching to root user to install dependencies...
  Get:1 file:/etc/apt/apt-mirrors.txt Mirrorlist [152 B]
  Get:5 https://packages.microsoft.com/ubuntu/24.04/prod noble InRelease [3600 B]
  Get:6 https://packages.microsoft.com/ubuntu/24.04/prod noble/main arm64 Packages [723 kB]
  Get:7 https://packages.microsoft.com/ubuntu/24.04/prod noble/main amd64 Packages [794 kB]
  Get:8 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
  Get:9 http://security.ubuntu.com/ubuntu noble-security/main amd64 Packages [1198 kB]
  Get:10 http://security.ubuntu.com/ubuntu noble-security/main Translation-en [239 kB]
  Get:11 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Packages [1229 kB]
  Get:12 http://security.ubuntu.com/ubuntu noble-security/universe Translation-en [248 kB]
  Get:13 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Packages [1792 kB]
  Get:14 http://security.ubuntu.com/ubuntu noble-security/restricted Translation-en [414 kB]
  Get:15 http://security.ubuntu.com/ubuntu noble-security/multiverse Translation-en [12.7 kB]
  Ign:2 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble InRelease
  Get:3 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
  Get:4 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium ran past its 1500s deadline on try 1 of 1
- No JSON results; smoke skipped

## Lane 13
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
