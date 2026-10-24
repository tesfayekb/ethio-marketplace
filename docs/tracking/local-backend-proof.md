# Local backend proof (non-gating)

- Commit: `3db3fd464a0225c928ce570ab6668c126b9dffb0`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40087352763

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 822 | 112 | applied 342/342 | 186 | 0 | 0 | 60 | 246 |
| email | 144 | 93 | applied 342/342 | 6 | 0 | 0 | 0 | 6 |
| 1 | 833 | 115 | applied 342/342 | 134 | 0 | 0 | 4 | 138 |
| 2 | 913 | 118 | applied 342/342 | 120 | 0 | 0 | 3 | 123 |
| 3 | 915 | 102 | applied 342/342 | 130 | 0 | 0 | 0 | 130 |
| 4 | 568 | 118 | applied 342/342 | 147 | 0 | 0 | 2 | 149 |
| 5 | 678 | 116 | applied 342/342 | 84 | 31 | 0 | 6 | 121 |
| 6 | 811 | 107 | applied 342/342 | 130 | 1 | 0 | 1 | 132 |
| 7 | 553 | 97 | applied 342/342 | 87 | 32 | 0 | 0 | 119 |
| 8 | 636 | 118 | applied 342/342 | 108 | 0 | 0 | 30 | 138 |
| 9 | 633 | 94 | applied 342/342 | 127 | 0 | 0 | 2 | 129 |
| 10 | 888 | 111 | applied 342/342 | 130 | 0 | 0 | 2 | 132 |
| 11 | 975 | 121 | applied 342/342 | 120 | 0 | 0 | 1 | 121 |
| 12 | 580 | 116 | applied 342/342 | 136 | 0 | 0 | 5 | 141 |
| 13 | 725 | 113 | applied 342/342 | 85 | 32 | 0 | 4 | 121 |
| 14 | 819 | 115 | applied 342/342 | 128 | 1 | 0 | 3 | 132 |
| 15 | 764 | 117 | applied 342/342 | 98 | 32 | 0 | 1 | 131 |
| 16 | 548 | 110 | applied 342/342 | 92 | 0 | 0 | 30 | 122 |
| TOTAL | — | — | — | 2048 | 129 | 0 | 154 | 2331 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the eighteen lanes)

- Slowest lane: 11 975 s
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40087352763-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40087352763-local-1
  - 2: [e2e:teardown] deleted 6 user(s) owned by process 40087352763-local-2
  - 3: [e2e:teardown] deleted 21 user(s) owned by process 40087352763-local-3
  - 4: [e2e:teardown] deleted 14 user(s) owned by process 40087352763-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40087352763-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40087352763-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40087352763-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40087352763-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40087352763-local-11
  - 12: [e2e:teardown] deleted 14 user(s) owned by process 40087352763-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40087352763-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40087352763-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-16
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
RLS on 78 of 78 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:54321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 5
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-3 a PDF renamed .jpg is refused unsupportedFormat / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-4 a variant over its size dial is refused by name / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-5 the policy pass refuses the cover and stores nothing / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-6 another seller's listing is a 403 / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-7 the eleventh photo is refused tooManyPhotos / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-8 DELETE removes the row and the objects; POST makes a photo the cover / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-9 the upload dial refuses once the seller's hourly ceiling is reached / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-11 a refused photo holds Next until it is removed; the step says photos are public / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-12 a stored photo is drawn on the photo step through a link that expires / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-13 photo links: the owner and staff get them; another seller and no session do not / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-14 a photo removed while it uploads, or while it waits its turn, never comes back / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-16 a photo dropped on the step is added like a picked one / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-17 Move earlier and Move later put a photo at its place, and the first is the cover / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-19 Next and Back wait while a photo is sent, and the cover carries its ribbon / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-24 a middle size over its cap is refused by name and nothing is stored (D162) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-30 Remove background is on the cover only; the preview lies on the house background; Keep stores it as the cover (D159) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused and stored nowhere (D178, D183) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-33 the seller is told why a photo is hidden: the rule it may break, or an unsure check (D178) / mobile-360 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

## Lane 6
- post-wizard-category.spec.ts / POSTING WIZARD / PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step / mobile-360 — Error: PW-54: the draft route returned no listing

## Lane 7
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-34 removed held question is released by autosave and strict route save / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-35 removed held option is released; a required strict question asks again / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-36 new unknown key and new unknown option remain refused / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-40 a removed question or option is let go once, then the same body is refused / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-41 the door refuses an answer the chosen options do not allow / mobile-360 — Error: case 1: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-42 the door reads a padded answer as the value it stores / mobile-360 — Error: padded (1): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-37 coverage first appearance is stored once, renumbered in either order / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-27 edit_listing counts against the revise dial / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-28 transition_listing counts against the revise dial / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-29 renew_listing counts against the revise dial / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-30 set_listing_pin counts against the revise dial / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-31 mark_sold counts against the revise dial / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-32 relist_listing counts against the revise dial / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-45 set_listing_reserved counts against the revise dial / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-46 set_listing_price counts against the revise dial / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-1 the draft route sets the observed residency from the edge exactly once / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-2 an incomplete step is the door's own refusal, at status 200 / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079) / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContainEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- posting-routes.spec.ts / POSTING ROUTES / PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081) / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309) / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-13 a draft may carry a commission before its percentage (INC-312) / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-14 the draft door's answer names the currency it stored (INC-321) / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324) / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-5 assist answers from the facts alone, within the field caps / mobile-360 — Error: PR-5: the draft door made no listing
- posting-routes.spec.ts / POSTING ROUTES / PR-7 the draft dial refuses by name once the ceiling is reached / mobile-360 — Error: the dial never refused within 5 calls
- posting-routes.spec.ts / POSTING ROUTES / PR-17 the draft route refuses a region-only place and accepts a city and a sub-city / mobile-360 — Error: step 3
- posting-routes.spec.ts / POSTING ROUTES / PR-18 the draft route accepts a 5000-character description and refuses 5001 / mobile-360 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContainEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- posting-routes.spec.ts / POSTING ROUTES / PR-16 a model question that matters is required by the draft route (DEC-086) / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-21 step 7: private columns are owner-only, through my_listing_private / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-48 the writing helper spends only its caller's own listing's tries / mobile-360 — Error: PR-48: the draft door made no listing
- posting-routes.spec.ts / POSTING ROUTES / PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185) / mobile-360 — Error: PR-50: the draft door made no listing
- posting-routes.spec.ts / POSTING ROUTES / D189 deactivated seller / PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669) / mobile-360 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

## Lane 13
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-3 a PDF renamed .jpg is refused unsupportedFormat / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-4 a variant over its size dial is refused by name / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-5 the policy pass refuses the cover and stores nothing / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-6 another seller's listing is a 403 / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-7 the eleventh photo is refused tooManyPhotos / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-8 DELETE removes the row and the objects; POST makes a photo the cover / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-9 the upload dial refuses once the seller's hourly ceiling is reached / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-11 a refused photo holds Next until it is removed; the step says photos are public / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-12 a stored photo is drawn on the photo step through a link that expires / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-13 photo links: the owner and staff get them; another seller and no session do not / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-14 a photo removed while it uploads, or while it waits its turn, never comes back / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-16 a photo dropped on the step is added like a picked one / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-17 Move earlier and Move later put a photo at its place, and the first is the cover / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-18 a photo dragged onto another photo takes its place (computer) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-19 Next and Back wait while a photo is sent, and the cover carries its ribbon / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-24 a middle size over its cap is refused by name and nothing is stored (D162) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-30 Remove background is on the cover only; the preview lies on the house background; Keep stores it as the cover (D159) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused and stored nowhere (D178, D183) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-33 the seller is told why a photo is hidden: the rule it may break, or an unsure check (D178) / desktop-1280 — Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

## Lane 14
- post-wizard-category.spec.ts / POSTING WIZARD / PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step / desktop-1280 — Error: PW-54: the draft route returned no listing

## Lane 15
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-34 removed held question is released by autosave and strict route save / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-35 removed held option is released; a required strict question asks again / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-36 new unknown key and new unknown option remain refused / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-40 a removed question or option is let go once, then the same body is refused / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-41 the door refuses an answer the chosen options do not allow / desktop-1280 — Error: case 1: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-42 the door reads a padded answer as the value it stores / desktop-1280 — Error: padded (1): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-catalog.spec.ts / POSTING ROUTES — catalogue changes / PR-37 coverage first appearance is stored once, renumbered in either order / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-27 edit_listing counts against the revise dial / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-28 transition_listing counts against the revise dial / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-29 renew_listing counts against the revise dial / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-30 set_listing_pin counts against the revise dial / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-31 mark_sold counts against the revise dial / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-32 relist_listing counts against the revise dial / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-45 set_listing_reserved counts against the revise dial / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes-dials.spec.ts / POSTING DOOR DIALS / PR-46 set_listing_price counts against the revise dial / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-1 the draft route sets the observed residency from the edge exactly once / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-2 an incomplete step is the door's own refusal, at status 200 / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079) / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContainEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- posting-routes.spec.ts / POSTING ROUTES / PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081) / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309) / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-13 a draft may carry a commission before its percentage (INC-312) / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-14 the draft door's answer names the currency it stored (INC-321) / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324) / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-5 assist answers from the facts alone, within the field caps / desktop-1280 — Error: PR-5: the draft door made no listing
- posting-routes.spec.ts / POSTING ROUTES / PR-7 the draft dial refuses by name once the ceiling is reached / desktop-1280 — Error: the dial never refused within 5 calls
- posting-routes.spec.ts / POSTING ROUTES / PR-17 the draft route refuses a region-only place and accepts a city and a sub-city / desktop-1280 — Error: step 3
- posting-routes.spec.ts / POSTING ROUTES / PR-18 the draft route accepts a 5000-character description and refuses 5001 / desktop-1280 — Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContainEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- posting-routes.spec.ts / POSTING ROUTES / PR-16 a model question that matters is required by the draft route (DEC-086) / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-21 step 7: private columns are owner-only, through my_listing_private / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-48 the writing helper spends only its caller's own listing's tries / desktop-1280 — Error: PR-48: the draft door made no listing
- posting-routes.spec.ts / POSTING ROUTES / PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185) / desktop-1280 — Error: PR-50: the draft door made no listing
- posting-routes.spec.ts / POSTING ROUTES / D189 deactivated seller / PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669) / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

DEC-211, DEC-218, DEC-232: every gating browser test runs here — eighteen lanes, the email lane included; two consecutive full dev runs judge each change.
