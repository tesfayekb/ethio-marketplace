# Local backend proof (non-gating)

- Commit: `782180b95f69b938dbbd55481062e73fc88212f5`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44552590552

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 473 | 86 | applied 532/532 | 27 | 0 | 0 | 5 | 32 |
| email | 640 | 67 | applied 532/532 | 6 | 0 | 0 | 0 | 6 |
| webkit | 1446 | 66 | applied 532/532 | 70 | 0 | 0 | 24 | 94 |
| 1 | 799 | 67 | applied 532/532 | 188 | 0 | 0 | 69 | 257 |
| 2 | 576 | 65 | applied 532/532 | 166 | 8 | 0 | 26 | 200 |
| 3 | 1940 | 61 | applied 532/532 | 129 | 40 | 0 | 5 | 174 |
| 4 | 581 | 66 | applied 532/532 | 135 | 2 | 0 | 5 | 142 |
| 5 | 786 | 64 | applied 532/532 | 89 | 4 | 0 | 1 | 94 |
| 6 | 843 | 64 | applied 532/532 | 151 | 2 | 0 | 41 | 194 |
| 7 | 637 | 85 | applied 532/532 | 147 | 0 | 0 | 77 | 224 |
| 8 | 2882 | 67 | applied 532/532 | 135 | 44 | 0 | 7 | 186 |
| 9 | 607 | 63 | applied 532/532 | 123 | 0 | 0 | 1 | 124 |
| 10 | 912 | 68 | applied 532/532 | 156 | 4 | 0 | 2 | 162 |
| 11 | 1620 | 69 | applied 532/532 | 108 | 12 | 0 | 8 | 128 |
| 12 | 3194 | 66 | applied 532/532 | 105 | 59 | 0 | 19 | 183 |
| 13 | 581 | 75 | applied 532/532 | 155 | 2 | 0 | 9 | 166 |
| 14 | 1126 | 86 | applied 532/532 | 163 | 20 | 0 | 5 | 188 |
| 15 | 721 | 87 | applied 532/532 | 122 | 2 | 0 | 8 | 132 |
| 16 | 646 | 66 | applied 532/532 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2347 | 199 | 0 | 360 | 2906 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 12 3194 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 11, email 7, webkit 7, 1 7, 2 7, 3 7, 4 7, 5 7, 6 7, 7 11, 8 7, 9 7, 10 7, 11 7, 12 7, 13 9, 14 11, 15 11, 16 7, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/336, 2 641/338, 3 641/1772, 4 640/339, 5 640/431, 6 641/351, 7 641/436, 8 641/2631, 9 641/332, 10 643/354, 11 640/1087, 12 641/2779, 13 640/367, 14 641/908, 15 641/483, 16 641/331
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44552590552-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44552590552-local-email
  - webkit: [e2e:teardown] deleted 4 user(s) owned by process 44552590552-local-webkit
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44552590552-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44552590552-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44552590552-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44552590552-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44552590552-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44552590552-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44552590552-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44552590552-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44552590552-local-9
  - 10: [e2e:teardown] deleted 7 user(s) owned by process 44552590552-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44552590552-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44552590552-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44552590552-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44552590552-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44552590552-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44552590552-local-16
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
  
- posting-routes.spec.ts / POSTING ROUTES / PR-4 identity: the alias is saved, and a second seller cannot take it / mobile-360 — Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-6 the options route is ETag'd: a conditional repeat costs a 304 / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- posting-routes.spec.ts / POSTING ROUTES / PR-7 the draft dial refuses by name once the ceiling is reached / mobile-360 — Error: the dial never refused within 5 calls
- posting-routes.spec.ts / POSTING ROUTES / PR-21 step 7: private columns are owner-only, through my_listing_private / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- posting-routes.spec.ts / POSTING ROUTES / PR-4 identity: the alias is saved, and a second seller cannot take it / desktop-1280 — Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}
- posting-routes.spec.ts / POSTING ROUTES / PR-6 the options route is ETag'd: a conditional repeat costs a 304 / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- posting-routes.spec.ts / POSTING ROUTES / PR-7 the draft dial refuses by name once the ceiling is reached / desktop-1280 — Error: the dial never refused within 5 calls
- posting-routes.spec.ts / POSTING ROUTES / PR-21 step 7: private columns are owner-only, through my_listing_private / desktop-1280 — Error: expect(received).toContain(expected) // indexOf

## Lane 3
- Step failure:
Step smoke: outcome failure
  
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-2 Nobody else moves a seller's ad, and a refused call writes nothing / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-doors.spec.ts / MY LISTINGS — the seller's doors (bundle 16 turn 1) / ML-2 Nobody else moves a seller's ad, and a refused call writes nothing / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-149 a save refused for another reason shows a message at Next and can be retried / mobile-360 — Error: PW-149: the retry did not pass
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-133 contact details are kept on the profile and open the next ad / mobile-360 — Error: expect(locator).toBeVisible() failed
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-144 leaving the contact step makes one identity call, or none when nothing changed / mobile-360 — Error: expect(locator).toBeVisible() failed
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-185 a Next pressed while the contact step is still reading waits for it, then reaches review / mobile-360 — Error: expect(locator).toBeVisible() failed
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-149 a save refused for another reason shows a message at Next and can be retried / desktop-1280 — Error: PW-149: the retry did not pass
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-133 contact details are kept on the profile and open the next ad / desktop-1280 — Error: expect(locator).toBeVisible() failed
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-144 leaving the contact step makes one identity call, or none when nothing changed / desktop-1280 — Error: expect(locator).toBeVisible() failed
- post-wizard-bundle2.spec.ts / POSTING WIZARD — bundle 2 place and contact / PW-185 a Next pressed while the contact step is still reading waits for it, then reaches review / desktop-1280 — Error: expect(locator).toBeVisible() failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-26 a category change drops the details the new category never asks / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-61 after ten seconds the Undo is gone and the reset stands (D59) / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-163 a first identity answer keeps the details filled above it; a change keeps them too / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-152 a two-pair condition shows its row only when both answers match / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-165 a parent's change never touches a detail that depends on another parent / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4) / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-26 a category change drops the details the new category never asks / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-61 after ten seconds the Undo is gone and the reset stands (D59) / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-163 a first identity answer keeps the details filled above it; a change keeps them too / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-152 a two-pair condition shows its row only when both answers match / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-165 a parent's change never touches a detail that depends on another parent / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-resets.spec.ts / POSTING WIZARD / PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4) / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-units.spec.ts / POSTING WIZARD — UNITS / PW-175 the price page asks the unit of sale above the quantity / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-units.spec.ts / POSTING WIZARD — UNITS / PW-175 the price page asks the unit of sale above the quantity / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed

## Lane 4
- Step failure:
Step smoke: outcome failure
  
- post-wizard-category.spec.ts / POSTING WIZARD / PW-44 a dependent list on a surfaced leaf narrows by its parent / mobile-360 — Error: PW-44: the child picker was open before its parent
- post-wizard-category.spec.ts / POSTING WIZARD / PW-44 a dependent list on a surfaced leaf narrows by its parent / desktop-1280 — Error: PW-44: the child picker was open before its parent

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- admin-translations-data.spec.ts / U4b translations console / TR-24 the Data scope machine-translates one row and then every untranslated one / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-translations-data.spec.ts / U4b translations console / TR-26 the Data scope approves every machine-filled content name / mobile-360 — Error: bulk entity AI never reached scratch location [account id]
- admin-translations-data.spec.ts / U4b translations console / TR-24 the Data scope machine-translates one row and then every untranslated one / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-translations-data.spec.ts / U4b translations console / TR-26 the Data scope approves every machine-filled content name / desktop-1280 — Error: bulk entity AI never reached scratch location [account id]

## Lane 6
- Step failure:
Step smoke: outcome failure
  
- post-wizard-finder.spec.ts / POSTING WIZARD — the category finder (W7) / PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option / mobile-360 — Error: PW-85: "e2eflabeldlwhwivacgus" listed the leaf without the match line
- post-wizard-finder.spec.ts / POSTING WIZARD — the category finder (W7) / PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option / desktop-1280 — Error: PW-85: "e2eflabelefuscvpjhg" listed the leaf without the match line

## Lane 8
- Step failure:
Step smoke: outcome failure
  
- admin-translations-console.spec.ts / U4b translations console / TR-11 per-row AI translate writes a machine row and captures a revision / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-12 bulk AI fill translates every untranslated scratch key / mobile-360 — Error: TR-12 step 4: bulk AI never landed the machine row for e2e.scratch.44552590552-local-8-local-8-mobile-360-3-tr12-b1 in scope zxx-mo (expected machine|true|true)
- admin-translations-console.spec.ts / U4b translations console / TR-13 the placeholder validator flags a machine write too / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-35 machine translation keeps the {country} token / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-23 machine translation keeps placeholders, and the editor repairs a mangled one / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-scope AI: a translator outside the language gets the structured refusal / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- admin-translations-console.spec.ts / U4b translations console / TR-16 the History drawer lists revisions and restores one as a new edit / mobile-360 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-11 per-row AI translate writes a machine row and captures a revision / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-12 bulk AI fill translates every untranslated scratch key / desktop-1280 — Error: TR-12 step 4: bulk AI never landed the machine row for e2e.scratch.44552590552-local-8-local-8-desktop-1280-27-tr12-b1 in scope zxx-de (expected machine|true|true)
- admin-translations-console.spec.ts / U4b translations console / TR-13 the placeholder validator flags a machine write too / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-35 machine translation keeps the {country} token / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-23 machine translation keeps placeholders, and the editor repairs a mangled one / desktop-1280 — Error: expect(locator).toBeVisible() failed
- admin-translations-console.spec.ts / U4b translations console / TR-scope AI: a translator outside the language gets the structured refusal / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- admin-translations-console.spec.ts / U4b translations console / TR-16 the History drawer lists revisions and restores one as a new edit / desktop-1280 — Error: expect(locator).toBeVisible() failed
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-108 an Other basis names the seller's written unit (INC-371) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-162 (e) a basis emptied by a specification change after the title step leaves no refusal on specifications (INC-455) / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-108 an Other basis names the seller's written unit (INC-371) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-pricing.spec.ts / POSTING WIZARD / PW-162 (e) a basis emptied by a specification change after the title step leaves no refusal on specifications (INC-455) / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-page.spec.ts / MY LISTINGS — the list page (bundle 16 turn 2) / MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

## Lane 11
- Step failure:
Step smoke: outcome failure
  
- post-wizard-place.spec.ts / POSTING WIZARD / PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored / mobile-360 — Error: [INC-562] step 8 did not come after Next. Saves (draft, identity): draft 200 after 84 ms, ok=true | identity 200 after 133 ms, ok=false (door:doorError). Refusal lines shown: none.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-30 review and buyer preview render option labels, units, multi-values and booleans / mobile-360 — Test timeout of 172000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-78 a big model list shows its required mark once the brand is chosen (INC-336) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored / desktop-1280 — Error: [INC-562] step 8 did not come after Next. Saves (draft, identity): draft 200 after 48 ms, ok=true | identity 200 after 125 ms, ok=false (door:doorError). Refusal lines shown: none.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-30 review and buyer preview render option labels, units, multi-values and booleans / desktop-1280 — Test timeout of 172000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-place.spec.ts / POSTING WIZARD / PW-78 a big model list shows its required mark once the brand is chosen (INC-336) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-104 a unit settled by the type is held by the price page's unit / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-where.spec.ts / POSTING WIZARD — where the ad is shown (W6b-1) / PW-104 a unit settled by the type is held by the price page's unit / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed

## Lane 12
- Step failure:
Step smoke: outcome failure
  
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-2 listing_history says which way a Reserved change went / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit / mobile-360 — Error: expect(locator).toHaveText(expected) failed
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F) / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) / mobile-360 — Error: expect(locator).toBeVisible() failed
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-2 listing_history says which way a Reserved change went / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit / desktop-1280 — Error: expect(locator).toHaveText(expected) failed
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F) / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- my-listings-ad.spec.ts / MY LISTINGS — one ad's page (bundle 16 turn 3) / MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) / desktop-1280 — Error: expect(locator).toBeVisible() failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-145 an over-limit options read says so under its control, and a second open loads the list / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-120 a phone number in an Other write-in is flagged as typed, single and multi / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-106 an empty Other write-in is refused and focused on Next (INC-369) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-107 a multi-choice Other carries its write-in to the draft (INC-370) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-74 a step-3 round trip keeps every answer (INC-329, small model list) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-74 a step-3 round trip keeps every answer (INC-329, big model list) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-16 typing is saved without judgement; only Next asks the door to judge the step / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-21 a child detail shows only the chosen parent's options and clears on change / mobile-360 — Error: PW-21: the child was open with no parent chosen
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-188 a list that hangs under another answer offers its shared Other last under every parent, and stores the seller's words (INC-609) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-22 a link's allowed options narrow the picker and its default prefills / mobile-360 — Error: PW-22: the link's default did not prefill
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-28 a conditional detail appears only when its condition is met / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-9 an option's facts prefill the siblings they name / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) / mobile-360 — Error: PW-25: e2e_deep_local-12_67_08n3vv_brand never loaded its options
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-159 a list fact ticks its tick list once, and the seller's untick stays / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-153 a settled range hides its number and the review and buyer sheet show the range / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray / mobile-360 — Error: PW-34: the colour option carries no swatch
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-45 a declared swatch renders one ink, a two-tone and a pattern tile / mobile-360 — Error: PW-45: the declared swatch tray never rendered
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) / mobile-360 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-42 Amharic catalog text falls back field by field / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-43 a fact prefills a sibling the same selection unhides / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-49 a prefill-only fact keeps its input while a settled one does not / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-50 the specifications show every row open in display order (D41) / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-51 a dependent detail never renders above the answer it hangs on / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-145 an over-limit options read says so under its control, and a second open loads the list / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-120 a phone number in an Other write-in is flagged as typed, single and multi / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-106 an empty Other write-in is refused and focused on Next (INC-369) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-107 a multi-choice Other carries its write-in to the draft (INC-370) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-74 a step-3 round trip keeps every answer (INC-329, small model list) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-74 a step-3 round trip keeps every answer (INC-329, big model list) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-16 typing is saved without judgement; only Next asks the door to judge the step / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-21 a child detail shows only the chosen parent's options and clears on change / desktop-1280 — Error: PW-21: the child was open with no parent chosen
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-188 a list that hangs under another answer offers its shared Other last under every parent, and stores the seller's words (INC-609) / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-22 a link's allowed options narrow the picker and its default prefills / desktop-1280 — Error: PW-22: the link's default did not prefill
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-28 a conditional detail appears only when its condition is met / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-9 an option's facts prefill the siblings they name / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) / desktop-1280 — Error: PW-25: e2e_deep_local-12_92_iaiu11_brand never loaded its options
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-159 a list fact ticks its tick list once, and the seller's untick stays / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-153 a settled range hides its number and the review and buyer sheet show the range / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray / desktop-1280 — Error: PW-34: the colour option carries no swatch
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-45 a declared swatch renders one ink, a two-tone and a pattern tile / desktop-1280 — Error: PW-45: the declared swatch tray never rendered
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) / desktop-1280 — Error: expect(locator).toHaveCount(expected) failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-42 Amharic catalog text falls back field by field / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-43 a fact prefills a sibling the same selection unhides / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-49 a prefill-only fact keeps its input while a settled one does not / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-specs.spec.ts / POSTING WIZARD / PW-51 a dependent detail never renders above the answer it hangs on / desktop-1280 — Test timeout of 60000ms exceeded.

## Lane 13
- Step failure:
Step smoke: outcome failure
  
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- ad-page.spec.ts / AD PAGE — the buyer's page (bundle 19 turn 5) / AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed

## Lane 14
- Step failure:
Step smoke: outcome failure
  
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-4 the owner reads his own flag and counts; another person is refused / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) / mobile-360 — Error: expect(received).toBeNull()
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-25 no client reads or writes saved_listings; the save dial counts every signed-in attempt, a repeat save included (D201 §8, F1-5b) / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts every signed-in attempt, a refused one included / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-4 the owner reads his own flag and counts; another person is refused / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) / desktop-1280 — Error: expect(received).toBeNull()
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-25 no client reads or writes saved_listings; the save dial counts every signed-in attempt, a repeat save included (D201 §8, F1-5b) / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- ad-page-doors.spec.ts / AD PAGE DOORS — M1 (bundle 19 turn 4) / AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts every signed-in attempt, a refused one included / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality
- legal-certify.spec.ts / Legal certification / LG-15 my_listing_certification lists the statements for all countries and the ad's countries, never another country's; another seller is refused / mobile-360 — Error: expect(received).toContain(expected) // indexOf
- legal-certify.spec.ts / Legal certification / LGC-6 a publishing statement is for signed-in people: the doors refuse a visitor, the page sends one to sign in, and a seller reads the global statement and the country's (D236, M24) / mobile-360 — Error: legal_in_force
- legal-certify.spec.ts / Legal certification / LG-15 my_listing_certification lists the statements for all countries and the ad's countries, never another country's; another seller is refused / desktop-1280 — Error: expect(received).toContain(expected) // indexOf
- legal-certify.spec.ts / Legal certification / LGC-6 a publishing statement is for signed-in people: the doors refuse a visitor, the page sends one to sign in, and a seller reads the global statement and the country's (D236, M24) / desktop-1280 — Error: legal_in_force
- post-wizard-details.spec.ts / POSTING WIZARD — WRITE-IN DETAILS / PW-102 a type that leaves only Other shows that question's text box, and the typed text saves / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-details.spec.ts / POSTING WIZARD — WRITE-IN DETAILS / PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name / mobile-360 — Test timeout of 60000ms exceeded.
- post-wizard-details.spec.ts / POSTING WIZARD — WRITE-IN DETAILS / PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3) / mobile-360 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-details.spec.ts / POSTING WIZARD — WRITE-IN DETAILS / PW-172 a held answer whose option is switched off prints its label, never offered (INC-466) / mobile-360 — Error: PW-172: Review prints the stored value
- post-wizard-details.spec.ts / POSTING WIZARD — WRITE-IN DETAILS / PW-102 a type that leaves only Other shows that question's text box, and the typed text saves / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-details.spec.ts / POSTING WIZARD — WRITE-IN DETAILS / PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name / desktop-1280 — Test timeout of 60000ms exceeded.
- post-wizard-details.spec.ts / POSTING WIZARD — WRITE-IN DETAILS / PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3) / desktop-1280 — Error: expect(locator).toHaveAttribute(expected) failed
- post-wizard-details.spec.ts / POSTING WIZARD — WRITE-IN DETAILS / PW-172 a held answer whose option is switched off prints its label, never offered (INC-466) / desktop-1280 — Error: PW-172: Review prints the stored value

## Lane 15
- Step failure:
Step smoke: outcome failure
  
- viewing-place.spec.ts / VIEWING PLACE — the account doors (D106) / VP-4 the viewing_place dial refuses the call past the account's limit / mobile-360 — Error: expect(received).toBe(expected) // Object.is equality
- viewing-place.spec.ts / VIEWING PLACE — the account doors (D106) / VP-4 the viewing_place dial refuses the call past the account's limit / desktop-1280 — Error: expect(received).toBe(expected) // Object.is equality

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
