# Local backend proof (non-gating)

- Commit: `0f542851e0f20f8950ef2f92a450cdfdfbc42419`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40209349608

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 887 | 115 | applied 345/345 | 186 | 0 | 0 | 60 | 246 |
| email | 194 | 119 | applied 345/345 | 6 | 0 | 0 | 0 | 6 |
| 1 | 666 | 87 | applied 345/345 | 134 | 0 | 0 | 4 | 138 |
| 2 | 882 | 117 | applied 345/345 | 120 | 0 | 0 | 3 | 123 |
| 3 | 905 | 109 | applied 345/345 | 130 | 0 | 0 | 0 | 130 |
| 4 | 586 | 90 | applied 345/345 | 147 | 0 | 0 | 2 | 149 |
| 5 | 424 | 93 | applied 345/345 | 115 | 0 | 0 | 6 | 121 |
| 6 | 1227 | 89 | applied 345/345 | 131 | 0 | 0 | 1 | 132 |
| 7 | 554 | 118 | applied 345/345 | 119 | 0 | 0 | 0 | 119 |
| 8 | 1220 | 120 | applied 345/345 | 108 | 0 | 0 | 30 | 138 |
| 9 | 738 | 106 | applied 345/345 | 127 | 0 | 0 | 2 | 129 |
| 10 | 814 | 100 | applied 345/345 | 130 | 0 | 0 | 2 | 132 |
| 11 | 971 | 115 | applied 345/345 | 120 | 0 | 0 | 1 | 121 |
| 12 | 565 | 98 | applied 345/345 | 136 | 0 | 0 | 5 | 141 |
| 13 | not run | 52 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | 813 | 115 | applied 345/345 | 129 | 0 | 0 | 3 | 132 |
| 15 | 518 | 101 | applied 345/345 | 130 | 0 | 0 | 1 | 131 |
| 16 | 528 | 106 | applied 345/345 | 92 | 0 | 0 | 30 | 122 |
| TOTAL | — | — | — | 2060 | 0 | 0 | 150 | 2210 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 6 1227 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40209349608-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40209349608-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40209349608-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40209349608-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40209349608-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40209349608-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40209349608-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40209349608-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40209349608-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40209349608-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40209349608-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40209349608-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40209349608-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40209349608-local-12
  - 13: not found
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40209349608-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40209349608-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40209349608-local-16
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail]); the auth server's text columns '' (INC-808)
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
RLS on 80 of 80 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 13
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: no migration reached
```text
f30f4fcb85f4: Pull complete
c0cb7126d877: Pull complete
Digest: sha256:[masked hex]
Status: Downloaded newer image for ghcr.io/supabase/gotrue:v2.197.0
ghcr.io/supabase/gotrue:v2.197.0
f0bff0b17bb6: Pull complete
531e3bd93090: Pull complete
bf5074c0b7fa: Pull complete
814dd06d26c7: Pull complete
Digest: sha256:[masked hex]
Status: Downloaded newer image for ghcr.io/supabase/kong:2.8.1
ghcr.io/supabase/kong:2.8.1
76bc8d85aed0: Pull complete
8039b21a00ac: Pull complete
0c91f59dd719: Pull complete
6a5c742fadca: Pull complete
018eaf08b9fd: Pull complete
fb772985a92d: Pull complete
2923bc55a2bd: Pull complete
b594b09cdd92: Pull complete
ac0658ef7013: Pull complete
61cdca7212db: Pull complete
c7702d9346eb: Pull complete
1af9995b8d71: Pull complete
2f8950e7369c: Pull complete
f4c8c0988961: Pull complete
b72d0b0c7819: Pull complete
887d4dcfbb60: Pull complete
b4770aa5855a: Pull complete
f48c9b774cf3: Pull complete
031bc7c39c03: Pull complete
532d14cf7b90: Pull complete
d0b84d5f07f5: Pull complete
2271b8d67cdb: Pull complete
92c57cef4d95: Pull complete
9bad77f51394: Pull complete
6d07fafc16fc: Pull complete
02b1eb22dea5: Pull complete
95e2e129052b: Pull complete
3bc958d77632: Pull complete
c91d81325bd0: Pull complete
434c95230705: Pull complete
4bc1415e9b24: Pull complete
8d0d2729c399: Pull complete
0b67f6a8a496: Pull complete
Digest: sha256:[masked hex]
Status: Downloaded newer image for ghcr.io/supabase/postgres:17.11.0.004
ghcr.io/supabase/postgres:17.11.0.004
23af072915d6: Pull complete
9f5e13364d13: Pull complete
4c76576d4885: Pull complete
fb9dd83d9835: Pull complete
Digest: sha256:[masked hex]
Status: Downloaded newer image for ghcr.io/supabase/storage-api:v1.79.36
ghcr.io/supabase/storage-api:v1.79.36
Starting database...
Stopping containers...
failed to start docker container "supabase_db_ethio-ci-local": Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint supabase_db_ethio-ci-local ([masked hex]): failed to bind host port for 0.0.0.0:54322:172.18.0.2:5432/tcp: address already in use
Error: failed to start containers: [masked hex]
Try rerunning the command with --debug to troubleshoot the error.
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
