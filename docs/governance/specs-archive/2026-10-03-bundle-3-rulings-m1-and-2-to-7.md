Source: supervisor thread, turn 1264, 1268, 1270, 1272, 1274, 1278, 1280, Sat 2026-10-03 18:09 New York.
Status at 2026-10-04: built: bundle 3 closed on the engineering side at dev = main = 9ba4ff73 (CI green, all 25 jobs; M1, M1b 2a467fcc mark 20261003223000, M2 18556a32, M3 mark 20261004030000 applied on ethio-prod and ethio-staging); the speed rules of RULINGS 2, 3 and 6 were carried into the walk fixes and bundle 4.
Related: bundle 3, DEC-114, DEC-115, DEC-119, INC-407, INC-409, INC-410, M1, M1b, M2, M3.

RULINGS ON M1 (bundle 3). Go-ahead for one corrective migration, M1b. CI must be green before Part B.

A. CI is red on fb53f294 (reproduced). Fix both in the M1b landing.
1. bun run format:check fails: "No parser could be inferred" for docs/data/reserved-names-v3.csv. Add docs/data/ to .prettierignore with a comment (data saved byte for byte; same class as docs/spec/). The brief omitted this.
2. bun run test:unit fails in src/test/pool-reset-map.test.ts: rate_overrides is undeclared.
   - e2e/helpers/pool-reset-map.ts: rate_overrides is RESET; reapPoolAccount (e2e/helpers/users.ts:239) deletes the account's rows. That is the only change allowed in users.ts.
   - contact_reveals holds viewer_id, which the census pattern does not see. Add viewer_id to USER_COLUMN in the test and to the map's header rule; contact_reveals is RESET (rows where the account is the viewer are deleted; rows on its listings cascade), and the reaper deletes them.
3. Before every report run the whole bun run test:unit and the whole-tree bun run format:check, and state CI's result on your last commit. "94 posting unit tests" is not the suite.

B. M1b: one file, the e2e-areas line, the mark chosen at apply time, the attribute table (argument list, provolatile, prosecdef, proconfig; live beside file) pasted before applying.
4. rate_dials returns to the brief: post 10 / 86400 · schema_read 120 / 3600 · add identity 20 / 86400 and alias_check 60 / 3600 · delete geocode, upload and assist:listing (nothing reads them; those routes keep their own dials through consume_rate_limit). Proof: exactly six rows with the brief's values. A test that needs more than a dial gets a rate_overrides row for its own user; name the test. A dial is never raised to pass a test. Say why post was set to 20 an hour.
5. publish_listing, redeclared whole from live: after the ownership and status checks, a seller whose user_directory.country_source is not 'user_confirmed' is refused with field home_country_code, reason required (step 12).
6. 20261003215042_bb808e1a carries no mark and its ledger row was written by hand on both databases. M1b restates the three deny-all policies (DROP POLICY IF EXISTS, then CREATE POLICY), proves them, and inserts the ledger row '20261003215042' ON CONFLICT DO NOTHING, so every environment gets that row from a file. Standing rule: a ledger mark is written only by a migration file, never by hand, on any database; nothing is written to ethio-staging outside the tests' scratch rows.
7. my_listing_private and my_last_listing_private stop returning home_country_code (the observed country is a server fact and no screen reads it). Redeclared whole, attributes kept.
8. validate_listing_draft takes p_uid and is EXECUTE to authenticated; src, e2e and scripts hold no caller. Revoke it from authenticated (the doors call it as owner). If your census finds a browser caller, stop and tell me.
9. Proofs owed from step 9, in the DO block with scratch rows it removes: rate_gate allows up to the dial, refuses after it and honours an override for a scratch user (if a DO block cannot carry the caller's id, say so and prove it in e2e); pin_show for one exact and one approx pin; anon as well as authenticated holds no SELECT on the five private columns.
10. In M1 the bodies of submit_listing and set_listing_pin lack the comments their last files carry (the INC-324 and INC-321 notes). Say whether the live definitions lack them or you removed them. A whole redeclaration keeps the body byte for byte apart from the named change.
11. Apply M1b on ethio-prod, paste the read-back, state "apply <fragment> → expect mark <value>", and stop.

C. After the operator applies M1b on staging.
12. In the same landing: step 12's app side (the contact step requires the home country; e2e/helpers/posting.ts confirms it before any publish), so CI stays green.
13. The tests owed for steps 5 to 8. They can no longer be shown red, so each carries a positive control in the same test: the denied call returns the permission error or the named refusal, and the allowed path (owner or server) succeeds.
14. In your report: the step 4 census table; step 7's granted column list (search_tsv staying private is accepted) and the eight reads after; step 8's census with the listing_locations and listing_photos policies; the attribute table for every function redeclared in M1 and M1b; CI's result on your last commit.
15. When CI is green, continue with Part B, C and D as the brief says.

<!-- extractor: next part is from turn 1268, Sat 2026-10-03 19:11 New York -->

RULINGS 2 (bundle 3): CI red, then speed. These replace the brief's "Local E2E" line and its END OF BUNDLE local run.

A. CI is red on 5ab8777b (run 37159751365): 4 failures, one cause.
1. PW-48 (post-wizard-category) and PW-13 (post-wizard-place) publish through the screen with a seller whose home country is not confirmed. Three specs were changed, not every publish. Fix the class once: one helper in e2e/helpers/posting.ts gives a seller with a confirmed home country, and every posting spec's seller setup uses it (photo-pipeline, post-wizard-category, -finder, -place, -pricing, -resets, -specs, -bundle2, -where, posting-routes). Only the tests that prove the refusal or exercise the country control use a seller without it. Remove the per-publish calls.

B. Speed, from now on.
2. Start each turn by reading CI for your last commit on the ci-evidence branch (docs/tracking/ci-status.md, e2e-last-failure.md, guards-last-failure.md). A red is fixed before new work. If the run is still going, start the work and read it before the turn ends.
3. Local E2E per turn: only the spec files you changed or added in that turn, both projects, 2 workers. Add the selector's list only when it names five spec files or fewer. Nothing wider, and no run is repeated to fill a report. CI runs the whole suite on every push, and main moves only on a fully green run.
4. No end-of-bundle local run. The bundle closes on CI green for the final commit.
5. The whole bun run test:unit, typecheck, lint and the whole-tree format:check before each commit stay.
6. Do not stop between parts. Stop only with a migration's "apply <fragment> → expect mark <value>" line, for a ruling the brief cannot answer, or at the end. A turn that ends mid-work says three lines: done, left, CI.
7. Decision rule: if a CI red in a spec you did not run locally is still red after your next turn, say so; that area returns to the selector's full list for the rest of the bundle.

C. Rulings on your open points.
8. Step 12 on the screen is finished with Part B: Next on the contact step refuses without a confirmed country, at the control, with the required mark (today the seller learns only at Publish); choosing from the list only selects, and "Confirm this country" confirms (a slip must not lock a country only support can change); the hint reads as the brief says.
9. The INC-324 and INC-321 notes are not restored now. The wizard bundle redeclares both functions and brings them back.
10. The 161 older database warnings wait for the close-out bundle.
11. The step 14 report is folded into the final report, with one exception: paste the step 4 census (privileged functions) in the turn that writes M2, and fix in M2 anything it finds.
12. M2's proofs follow M1b's pattern (a block that is rolled back); nothing is left behind.

Now: item 1, then Part B, Part C (M2, one staging stop), Part D, the final report.

<!-- extractor: next part is from turn 1270, Sat 2026-10-03 20:31 New York -->

RULINGS 3 (bundle 3). Part A is green on CI (27eb76b3, run 37162727099) and on main.

1. Reading CI: the ci-evidence branch is not on your remote. Read the files over HTTPS (the repository is public):
   https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md
   https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md
   https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md
   The commit named in ci-status.md must be your last commit; an older one means the run is still going. If you cannot fetch them, say so once.
2. Local E2E has a cap: at most three spec files per turn, the ones you changed that are most likely to break. A helper swap across many specs is CI's to prove. No end-of-bundle local run (ruling 4 stands).
3. Ruling 8 is still owed; the Part B report dropped it. In step-who.tsx the list's onChange still confirms (confirmCountry at :719) and Next does not refuse. Required: choosing from the list only selects; "Confirm this country" confirms; Next on the contact step refuses without a confirmed country, at the control, with the required mark. One test, written and run red before the fix.
4. Phone, a defect (INC-407). While the library is not loaded, phone-number-field.tsx saves "+" code and the typed digits (saveOf, and the onBlur branch for lib === null). "0911234567" typed before the library arrives is saved as +2510911234567, a wrong number the door accepts; after a failed load the box still saves that way. The brief says the number is read by the library before any save and never by another rule. Required: until the library is loaded the box keeps the typed text and emits nothing to save; when it arrives the text is read, shown grouped and saved; if the load failed and a phone box holds typed text, Next refuses at that box with the retry line. A carried number already in "+ code digits" form is unaffected. One test, red first: the library is held back, the seller types 0911234567 and leaves the box, nothing is saved; the library is released and +251911234567 is saved.
5. The after-the-fact red runs for PW-125 and PW-126 are waived. From now on a new test is written and run red before its fix, in the same turn.

Do items 3 and 4 next, then continue in order: Part C, Part D, the final report.

<!-- extractor: next part is from turn 1272, Sat 2026-10-03 21:16 New York -->

RULINGS 4 (bundle 3). M2 is read and accepted; the operator has applied it on staging.

1. Yes: alias_history is RESET in e2e/helpers/pool-reset-map.ts and the reaper deletes the account's rows (the same exception as rate_overrides). Standing: any later table with a user-id column gets this without asking.
2. Your four choices are accepted: home_country_code on alias_history; "taken" judged after the fold; the admin path outside the 30-day rule; no business-name reason path while admin_update_profile sets no business name.
3. The empty migration 60b466e2 is healed correctly (ledger row from M2, allowlist line). Nothing more.
4. CI on 6f2620d6 (run 37166386469) had two reds. Fix both in your next landing.
   - PW-112 (post-wizard-place) expects the phone box to read "911234567"; it now reads "91 123 4567". Update the expectation as you did for PW-118; the saved value is still +251911234567 (DB truth).
   - PW-55 (post-wizard-pricing) never reaches step 8. In step-who.tsx, blocked is !countryLocked || unreadPhone, and countryLocked is false until readSellerIdentity() answers, so a Next pressed before that answer is refused "required" for a seller who is already confirmed. Next must not judge before the identity has been read: while it loads, Next waits; if the read failed, the existing readFailed line shows. One test, red first: the identity read is held back, Next is pressed, no refusal shows; the read is released and Next moves on.
5. Until the app side lands, the identity route and the door both count 'identity' in the same bucket (10 a day in effect). Land the route change first.
6. Owed in your next report: the step 4 census table (rulings 2, item 11 asked for it in the M2 turn), and your count of catalogue brand names beside my 633, with where the brand_name preset's names live.
7. There is no end-of-bundle local run (rulings 2, item 4). The bundle closes on CI green for the final commit.

Then: the app side of steps 19 to 23, Part D, the final report.

<!-- extractor: next part is from turn 1274, Sat 2026-10-03 21:38 New York -->

## The six functions

| Function | Verdict |
|---|---|
| `attr_import_plan` | **Fix now.** Any signed-in user can run the attribute import planner against the live catalogue. Its two sibling planners are server-only, and nothing in the browser calls it. |
| `has_permission` | **Later.** A signed-in user can ask whether another account holds a permission. It is used by 62 access rules and by admin lists, so changing it needs its own census. I logged it for the close-out bundle. |
| `impersonated_get_profile`, `impersonated_list_listings` | **Fine.** Both go through a helper that requires the caller to own a live session. |
| `entity_source_value` | **Fine.** It returns only the English name of a category, place or attribute. |
| `get_attribute_options` | **Fine by design**, since the form needs it. It has no per-account limit yet; I am adding one in the wizard bundle. |

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

RULINGS 5 (bundle 3): the step 4 census. No migration now; one ACL-only migration, M3, is the LAST item of the bundle.

1. Verdicts, read from the files:
   - attr_import_plan(jsonb, jsonb, text): fix. It is EXECUTE to authenticated (d7b6b698) while cat_import_plan and loc_import_plan are service_role only, no browser code calls it, and the admin doors call it as owner. M3 revokes it from authenticated.
   - has_permission(uuid, text, text): logged as INC-409 for the close-out bundle. It is used by the access policies and called with other users' ids inside admin functions, so a guard needs its own caller census. Not changed here.
   - impersonated_get_profile and impersonated_list_listings: fine. impersonation_target (d748b282) requires actor_id = auth.uid() and a live session.
   - entity_source_value: fine. It returns English names only.
   - get_attribute_options: fine by design. A per-account dial for it comes with the wizard bundle (INC-410).
2. src/routes/api/listings/identity.ts returns the door's answer as it is (routeJson(data, 200) at :153). The door now answers a rate refusal with resets_at; pass it through doorAnswer as the draft and publish routes do, so the client still reads detail.
3. Order from here: the app side of steps 19 to 23, then Part D, then M3.
   - M3: one file, the e2e-areas line, REVOKE EXECUTE on attr_import_plan(jsonb, jsonb, text) FROM authenticated with service_role kept, a proof that authenticated and anon cannot execute it and that the admin attribute import preview still works for a scratch import inside a rolled-back block, the mark chosen at apply time. Apply on ethio-prod, read back, and stop with "apply <fragment> → expect mark <value>".
   - After the operator applies M3 on staging: read CI for the final commit, fix any red, and give the final report with the full step 4 table (one row per function, with its verdict).

<!-- extractor: next part is from turn 1278, Sat 2026-10-03 21:57 New York -->

RULINGS 6 (bundle 3). Continue: steps 20, 22, 23, Part D, then M3.

1. Red-first applies to defect fixes (a test that reproduces a defect). A test for a new feature whose control does not exist on the old screen needs no red run. The owed red runs for PW-130 and PW-131 are waived.
2. Reading CI: a run that a later push cancelled still lists the failures of the shards that finished (e2e-last-failure.md). Read them as red. On d3be2df2 they were PW-112 and four "post-step-8 not visible" failures (PW-55, PW-57, PW-64, PW-76), all from before your Next fix; rerun PW-57, PW-64 and PW-76 once to confirm they pass now.
3. No push has had a complete CI run since 27eb76b3. At the M3 stop, after the operator applies it on staging, wait for one complete run on the final commit and fix whatever it shows before the final report.

<!-- extractor: next part is from turn 1280, Sat 2026-10-03 22:14 New York -->

RULINGS 7 (bundle 3). Continue to M3.

1. The admin reason path needs one browser test before M3 (it assigns reserved names): an admin sets a reserved name on a scratch user and is refused for want of a reason; with a reason of ten characters or more the name is set and audit_log holds 'user.alias_assigned' with the reason and the rule; a too-short reason is still refused. Scratch user only, removed in finally.
2. Then the two Part D component tests, the scoped browser runs (three spec files at most), and M3. Stop with "apply <fragment> → expect mark <value>".
