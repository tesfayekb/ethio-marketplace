# Local backend proof (non-gating)

- Commit: `2a9531519456f42735e5157496985752e9f44168`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41121234139

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1025 | 119 | applied 382/382 | 205 | 0 | 0 | 69 | 274 |
| email | 199 | 103 | applied 382/382 | 6 | 0 | 0 | 0 | 6 |
| 1 | 858 | 111 | applied 382/382 | 141 | 0 | 0 | 4 | 145 |
| 2 | 1075 | 117 | applied 382/382 | 159 | 0 | 0 | 3 | 162 |
| 3 | 785 | 111 | applied 382/382 | 122 | 0 | 0 | 0 | 122 |
| 4 | 727 | 106 | applied 382/382 | 146 | 0 | 0 | 2 | 148 |
| 5 | 741 | 119 | applied 382/382 | 143 | 0 | 0 | 7 | 150 |
| 6 | 820 | 120 | applied 382/382 | 137 | 0 | 0 | 1 | 138 |
| 7 | 749 | 110 | applied 382/382 | 191 | 0 | 0 | 40 | 231 |
| 8 | 342 | 116 | applied 382/382 | 20 | 0 | 0 | 17 | 37 |
| 9 | 626 | 77 | applied 382/382 | 134 | 0 | 0 | 6 | 140 |
| 10 | 1123 | 105 | applied 382/382 | 143 | 0 | 0 | 2 | 145 |
| 11 | 926 | 118 | applied 382/382 | 130 | 0 | 0 | 1 | 131 |
| 12 | 656 | 120 | applied 382/382 | 143 | 0 | 0 | 5 | 148 |
| 13 | 819 | 109 | applied 382/382 | 145 | 0 | 0 | 5 | 150 |
| 14 | 789 | 114 | applied 382/382 | 134 | 0 | 0 | 4 | 138 |
| 15 | 631 | 104 | applied 382/382 | 185 | 0 | 0 | 37 | 222 |
| 16 | 410 | 121 | applied 382/382 | 41 | 0 | 0 | 0 | 41 |
| repeat | 979 | 101 | applied 382/382 | 99 | 0 | 0 | 45 | 144 |
| TOTAL | — | — | — | 2424 | 0 | 0 | 248 | 2672 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1123 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 18 tests selected, 18 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-1 a subcategory shows its own listings; its parent shows the whole branch / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-10 nothing anywhere: the invitation card comes first, with the category and the place / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-11 signing out keeps the place this browser chose (INC-532) / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-12 on a phone three cards share a row and the invitation is the size of a card (D123) / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-13 each wider place is headed in its own name: the region, then the country (D127) / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-14 with no place chosen the page is headed All listings (D127) / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-15 the card's ribbon and the old price (D173, D175 1, D180) / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-16 listing cards lift without a border in both themes / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-17 a complete list across places ends with the one invitation (D215) / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-18 with no place chosen the complete list ends with the invitation, naming no place (D215) / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-2 20 per page in D108's order; the next page loads only when the end comes into view / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-3 the page reaches beyond the chosen place, heads the wider listings in their own place, and invites in the chosen one / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-4 nothing in the chosen place: the invitation first, then the wider place / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-5 an address nobody has shows not found and asks the feed nothing / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-6 a failed read is shown, and Retry recovers / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-7 a card without a photo draws the nearest category picture, else the placeholder / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-8 the home page invites in the chosen place, naming the place alone / desktop-1280; Not repeated (time cap): feed-screens.spec.ts / FEED SCREENS / FS-9 four listings in the chosen place: no card after them until the list ends, then one at its end (D215) / desktop-1280
- Database session samples during each start (INC-944): smoke 13, email 9, 1 13, 2 11, 3 12, 4 13, 5 12, 6 13, 7 10, 8 11, 9 10, 10 13, 11 13, 12 11, 13 13, 14 12, 15 9, 16 13, repeat 9
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 41121234139-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 41121234139-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 41121234139-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 41121234139-local-2
  - 3: [e2e:teardown] deleted 20 user(s) owned by process 41121234139-local-3
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 41121234139-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 41121234139-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 41121234139-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 41121234139-local-7
  - 8: [e2e:teardown] deleted 2 user(s) owned by process 41121234139-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 41121234139-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 41121234139-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 41121234139-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 41121234139-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 41121234139-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 41121234139-local-14
  - 15: [e2e:teardown] deleted 3 user(s) owned by process 41121234139-local-15
  - 16: [e2e:teardown] deleted 2 user(s) owned by process 41121234139-local-16
  - repeat: not found
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
RLS on 85 of 85 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane repeat
- Outside test — Timed out waiting 840s for the test suite to run
- Outside test — Timed out waiting 840s for the teardown for test suite to run

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
