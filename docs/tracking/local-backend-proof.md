# Local backend proof (non-gating)

- Commit: `78b96e259c820ab45786cb34a34d8b7b69da4792`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39411681777

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 770 | 89 | applied 329/329 | 186 | 0 | 0 | 60 | 246 |
| 1 | 1225 | 104 | applied 329/329 | 179 | 6 | 3 | 6 | 194 |
| 2 | 1057 | 105 | applied 329/329 | 145 | 1 | 0 | 1 | 147 |
| 3 | 637 | 95 | applied 329/329 | 174 | 1 | 0 | 2 | 177 |
| 4 | 1040 | 104 | applied 329/329 | 163 | 6 | 1 | 6 | 176 |
| 5 | 824 | 105 | applied 329/329 | 150 | 1 | 0 | 1 | 152 |
| 6 | 661 | 101 | applied 329/329 | 148 | 0 | 0 | 30 | 178 |
| 7 | 1179 | 122 | applied 329/329 | 151 | 6 | 2 | 3 | 162 |
| 8 | 1021 | 99 | applied 329/329 | 169 | 1 | 0 | 1 | 171 |
| 9 | 708 | 100 | applied 329/329 | 161 | 1 | 0 | 6 | 168 |
| 10 | 1063 | 88 | applied 329/329 | 162 | 6 | 2 | 6 | 176 |
| 11 | 844 | 104 | applied 329/329 | 189 | 1 | 0 | 2 | 192 |
| 12 | 569 | 104 | applied 329/329 | 104 | 0 | 0 | 30 | 134 |
| TOTAL | — | — | — | 2081 | 30 | 8 | 154 | 2273 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the thirteen lanes)

- Slowest lane: 1 1225 s
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail])
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
RLS on 76 of 76 public tables
Default grants in public: postgres | f | {postgres=X/postgres,service_role=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
Database container: supabase_db_ethio-ci-local

## Lane 1
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-9 a live ad opens at its canonical address, server-rendered / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveCount[2m([22m[32mexpected[39m[2m)[22m failed
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-19 the share image and the structured data / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-36 the layout follows the article's width (DEC-192, drawings v13) / mobile-360 — Error: Timeout 10000ms exceeded while waiting on the predicate
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-41 the page's remaining lines / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-49 the feed's first page asks no second request for its photos (DEC-195) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-48 the thumbnails' arrows (INC-717, INC-720) / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveCount[2m([22m[32mexpected[39m[2m)[22m failed
- admin-attributes-import.spec.ts / C3 attributes console / AT-27 an edited read-only cell is ignored while the row's real change applies / mobile-360 — Error: {"error":"tooManyRequests"}
- admin-attributes-import.spec.ts / C3 attributes console / AT-70 a direct rank held twice in the end state is refused as rankClash / mobile-360 — Error: {"error":"tooManyRequests"}
- admin-attributes-import.spec.ts / C3 attributes console / AT-71 removing an option value still in use is refused as optionInUse / mobile-360 — Error: {"error":"tooManyRequests"}

## Lane 2
- admin-translations-console.spec.ts / U4b translations console / TR-6 coverage gate: empty and incomplete catalogs both refuse publication / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed

## Lane 3
- feed-screens.spec.ts / FEED SCREENS / FS-15 the card's ribbon and the old price (D173, D175 1, D180) / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 4
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveValue[2m([22m[32mexpected[39m[2m)[22m failed
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-12 a stored photo is drawn on the photo step through a link that expires / mobile-360 — Error: PP-12: the stored photo has no signed link
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session / mobile-360 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer / mobile-360 — Error: PP-22: no counter on the photo
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) / mobile-360 — Error: PP-23: the page does not offer the middle size
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) / mobile-360 — [31mTest timeout of 60000ms exceeded.[39m
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2) / mobile-360 — [31mTest timeout of 60000ms exceeded.[39m

## Lane 5
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) / mobile-360 — Error: PW-162 (d) the Price Next moved on after a failed send — {"label":"d","ui":{"url":"http://127.0.0.1:4173/post/[account id]","steps":["post-step-5"],"loading":false,"saveCaption":"Saved","next":{"present":true,"closed":null,"disabled":false},"unreachable":false},"draft":[{"id":"[account id]","draft_step":4,"status":"draft"}],"sends":[{"step":2,"outcome":"sent"},{"step":4,"outcome":"aborted"},{"step":4,"outcome":"sent"},{"step":4,"outcome":"sent"}]}

## Lane 7
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-9 a live ad opens at its canonical address, server-rendered / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveCount[2m([22m[32mexpected[39m[2m)[22m failed
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-19 the share image and the structured data / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-36 the layout follows the article's width (DEC-192, drawings v13) / desktop-1280 — Error: Timeout 10000ms exceeded while waiting on the predicate
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-41 the page's remaining lines / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-50 the seller card fills the right column / desktop-1280 — Error: Timeout 10000ms exceeded while waiting on the predicate
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-49 the feed's first page asks no second request for its photos (DEC-195) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-48 the thumbnails' arrows (INC-717, INC-720) / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveCount[2m([22m[32mexpected[39m[2m)[22m failed
- admin-attributes-import.spec.ts / C3 attributes console / AT-27 an edited read-only cell is ignored while the row's real change applies / desktop-1280 — Error: {"error":"tooManyRequests"}

## Lane 8
- admin-translations-console.spec.ts / U4b translations console / TR-6 coverage gate: empty and incomplete catalogs both refuse publication / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeDisabled[2m([22m[2m)[22m failed

## Lane 9
- feed-screens.spec.ts / FEED SCREENS / FS-15 the card's ribbon and the old price (D173, D175 1, D180) / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed

## Lane 10
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveValue[2m([22m[32mexpected[39m[2m)[22m failed
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveValue[2m([22m[32mexpected[39m[2m)[22m failed
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-12 a stored photo is drawn on the photo step through a link that expires / desktop-1280 — Error: PP-12: the stored photo has no signed link
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session / desktop-1280 — Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoHaveAttribute[2m([22m[32mexpected[39m[2m)[22m failed
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer / desktop-1280 — Error: PP-22: no counter on the photo
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) / desktop-1280 — Error: PP-23: the page does not offer the middle size
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) / desktop-1280 — [31mTest timeout of 60000ms exceeded.[39m
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2) / desktop-1280 — [31mTest timeout of 60000ms exceeded.[39m

## Lane 11
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) / desktop-1280 — Error: PW-162 (d) the Price Next moved on after a failed send — {"label":"d","ui":{"url":"http://127.0.0.1:4173/post/[account id]","steps":["post-step-5"],"loading":false,"saveCaption":"Saved","next":{"present":true,"closed":null,"disabled":false},"unreachable":false},"draft":[{"id":"[account id]","draft_step":4,"status":"draft"}],"sends":[{"step":2,"outcome":"sent"},{"step":4,"outcome":"aborted"},{"step":4,"outcome":"sent"},{"step":4,"outcome":"sent"}]}

DEC-211: compare every lane with staging CI on this same commit; two consecutive full-suite dev proofs required. Email-serial stays on staging. No automatic switch verdict.
