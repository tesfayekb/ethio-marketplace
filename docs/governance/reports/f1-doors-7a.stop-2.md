MIGRATION — f1-doors-7a STEP 2: the shell's rate limit and the readers on the door mechanism (ten files)
DONE: STEP 0, STEP 1 (census, stop 1), ruling 1 saved, STEP 2 (ten migration files, the checker's two judgements, the manifest and allowlists)
LEFT: STEP 3 (the client: the types patch, the three `_read` callers, the viewer's state, `reader-failure.ts` classing `notSignedIn` as auth by ruling 5, `doorAnswer`), STEP 4 (the tests), STEPS 5–7 — the next chat (DEC-387)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `cda0840a81798ca66037515c55ff45b4db019b27` (short `cda0840`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-19T12:59:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44527801180
FILES:
docs/features/doors.md
docs/governance/briefs/f1-doors-7a-ruling-1.md
docs/governance/briefs/f1-doors-7a.md
docs/governance/reports/f1-doors-7a.census.md
docs/governance/reports/f1-doors-7a.stop-1.md
docs/governance/reports/f1-doors-7a.stop-2.md
roadmap.md
scripts/doors/catalogue.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/doors/manifest.ts
scripts/doors/manifest.txt
scripts/doors/policies.ts
scripts/public-surface-allowlist.txt
supabase/migrations/20261119150000_1b7e8a6b-7a49-469b-918b-36a244454c88.sql
supabase/migrations/20261119150100_7865816d-4bf9-4a6b-9070-a44199ee9c6e.sql
supabase/migrations/20261119150200_77d5acc2-e3af-4635-b249-05b712af1070.sql
supabase/migrations/20261119150300_89938bbb-1658-40d6-baac-74cb470ba6fd.sql
supabase/migrations/20261119150400_3f213ee5-6d1e-45c1-8f46-ab60d46d9c5b.sql
supabase/migrations/20261119150500_b7fcfe88-667d-405f-9018-bed6552edafb.sql
supabase/migrations/20261119150600_57fbc734-01db-4382-b05b-300b81dad61c.sql
supabase/migrations/20261119150700_1df56bcd-5038-457b-ab0f-07edd66ad4c1.sql
supabase/migrations/20261119150800_d09dae74-5af5-44b3-999b-6f297359409e.sql
supabase/migrations/20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql

Base: dev 470135181. The migration commit is `106b62b49` (committed 15:09:02 UTC, so every mark is the commit's hour
rounded up plus one hour, 17:00, then +100 per part). `origin/dev` moved during the turn to `8ac9908f8` (Lovable's L15,
pull request #74: `src/features/admin/sections.test.ts`, `src/i18n/locales/am-base.ts`, `src/i18n/locales/en-base.ts`);
none of those files is in this lane's diff, nothing was merged or rebased.

## The apply pairing lines (in this order)

```
apply 1b7e8a6b → expect mark 20261119170000
apply 7865816d → expect mark 20261119170100
apply 77d5acc2 → expect mark 20261119170200
apply 89938bbb → expect mark 20261119170300
apply 3f213ee5 → expect mark 20261119170400
apply b7fcfe88 → expect mark 20261119170500
apply 57fbc734 → expect mark 20261119170600
apply 1df56bcd → expect mark 20261119170700
apply d09dae74 → expect mark 20261119170800
apply 3e96e1ab → expect mark 20261119170900
```

Part 1's pre-check reads the ledger's newest mark `20261119050600`; each later part reads the mark of the part before.

## The files

| # | file | sha256 | bytes | mark | objects | proofs |
|---|---|---|---|---|---|---|
| 1 | `20261119150000_1b7e8a6b-7a49-469b-918b-36a244454c88.sql` | `b61cef9b6a829e25947a795d4fecfe76be795fee31ad05b1b7b83058e36464cf` | 13837 | 20261119170000 | `door_context`, `door_refused` redeclared whole (the reset time as `rateLimited`'s detail; no second count for `rateLimited`) | (a) headers and grants; (b) scratch door under the dial `save` with a scratch override at 3: an allowed call counts once, another code after the dial counts once (INC-844), the call over the limit refuses `rateLimited` with a future instant as its detail and leaves the stored count as it was |
| 2 | `20261119150100_7865816d-4bf9-4a6b-9070-a44199ee9c6e.sql` | `7395fcc2cf3eee7a162d24538954c7d980b812f61f358461d9b499e9cc936543` | 24968 | 20261119170100 | `listing_counts`, `listing_history`, `my_listing`, `my_listing_certification`, `my_listing_private` redeclared on `door_context('reader')` | (a) headers and grants; (b) the owner's read equals the old body's (its pg_temp copy) on the same scratch rows, as the function owner and under `authenticated`; (c) signed out → `notSignedIn`, deactivated → `accountDeactivated`, another's ad and an unknown id → `notYourListing`; (d) cost, 200 calls each |
| 3 | `20261119150200_77d5acc2-e3af-4635-b249-05b712af1070.sql` | `e8b092415ac78a6ba9c1c7278262c622d70c0039e021c6550b64c2de8f7d1de3` | 23923 | 20261119170200 | `my_listings`, `my_last_listing_private`, `my_recent_categories` redeclared on the gate | (a)–(d) as part 2; `my_listings`' bad group, page, search and mark → `badValue:<field>`; another person's reads never carry the seller's ad |
| 4 | `20261119150300_89938bbb-1658-40d6-baac-74cb470ba6fd.sql` | `95ecf5404f2d3ea0ded107f45c8154755fa9ca886ee2e5af3db0919c2db11d6b` | 24886 | 20261119170300 | `my_legal_history`, `my_legal_status`, `my_legal_version` on `door_context('reader')`; `legal_in_force`, `legal_scheduled` on `door_context('public')` | (a)–(d); scratch legal kinds (public and signed-in-only) with versions in force and scheduled and an acceptance; signed out → `notSignedIn` (the signed-in three; the signed-in-only kind of the public two); deactivated → `accountDeactivated` (all five); a version not in force for another person and an unknown id → `notYours` |
| 5 | `20261119150400_3f213ee5-6d1e-45c1-8f46-ab60d46d9c5b.sql` | `96b8249d71337237dffa39f4d5912528ee175882721576cc9e07212fd656e545` | 24426 | 20261119170400 | `my_saved_listings`, `my_seller_line`, `my_seller_place`, `my_viewing_location` on the gate | (a)–(d); `my_saved_listings`' bad sizes → `badSize`, bad cursors → `badValue:cursor`; another person's saved list never carries the ad |
| 6 | `20261119150500_b7fcfe88-667d-405f-9018-bed6552edafb.sql` | `19a3e802dfd63a4bc5a58601ef4dc63df6a8227ca548b3dced30a354e38bc7bc` | 15767 | 20261119170500 | `impersonated_get_profile`, `impersonated_list_listings` on the gate before `impersonation_target` | (a)–(d); a staff member's open scratch session; a session not the caller's answers `impersonation_target`'s own refusal, before and after alike |
| 7 | `20261119150600_57fbc734-01db-4382-b05b-300b81dad61c.sql` | `637485cce2673a77365af5a2a5fb038a7c2a4c7bc01869d491fa1c286e8409bb` | 14538 | 20261119170600 | new `get_attribute_options_version_read(uuid)`, `listing_contact_refusals_read(jsonb)`, `translation_scope_ok_read(text)`; the three old names closed to anon, authenticated and PUBLIC (bodies and headers kept) | (a) old bodies' md5 and closure, new headers and grants; (b) through `authenticated` each reader answers what its old function answers on the same input while the old name's direct call is refused; (c) `notSignedIn`, `accountDeactivated`; (d) cost beside the old function |
| 8 | `20261119150700_1df56bcd-5038-457b-ab0f-07edd66ad4c1.sql` | `d049246d6267c504b149616d72f0f06f95a6e35b4a8069cef909044d6e1b0fe3` | 12966 | 20261119170700 | `listing_saved(text)` dropped; new `listing_viewer_state(text)` → jsonb `{saved, owner}` | (a) the drop and the new header and grants; (b) seller `{saved:false, owner:true}`, a saver `{saved:true, owner:false}`, another person, a malformed and an unknown id both false, every `saved` equal to the old `listing_saved` (pg_temp copy); (c) `notSignedIn`, `accountDeactivated`; (d) cost beside `listing_saved` |
| 9 | `20261119150800_d09dae74-5af5-44b3-999b-6f297359409e.sql` | `10113983f0158b3eccf06dfc5ab3fa423fe0266ade1c7fd2d76891990ee17b2d` | 10511 | 20261119170800 | seven (e) readers closed: `catalog_find_version`, `get_browse_tree`, `get_category_attributes`, `get_ui_bundle`, `level_perks_for`, `price_shape_for_basis`, `impersonation_target` | (a) bodies unchanged (md5), no browser role, the service role keeps what it held; (b) the callers that prove it, read from the live catalogue (each caller a DEFINER or an INVOKER no browser role runs, followed in turn; triggers only on tables no browser role writes; no policy, view or CHECK of a browser-writable table names the chain); (c) the impersonation readers still read through `impersonation_target` as their owner |
| 10 | `20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql` | `e68f8d832ad16ed663b78b18f7ca5cf256f3516b80fcc5ae476f24b877b81f2b` | 15685 | 20261119170900 | the thirty-one helpers closed (DEC-407's form) | (a) and (b) as part 9, over the thirty-one |

Every file's closers are last (its REVOKE / GRANT lines, then its mark). The proofs run in one `DO $proof$` block each,
on scratch rows only (`e2e-mig-f17a<n>-<stem>` names, a scratch country `XZ` inside the rolled-back block), and end
on their part's sentinel (`f1-7a-part-<n>-proof-ok`), which rolls every scratch row back. Each proof's pg_temp copies
of the old bodies are closed to PUBLIC at once (the born-closed law) and are never called under a browser role.

## The proofs and the guards

- `bun run db:proof --fresh` on the final files, before the commit: `db:proof PASS — applied 532/532, CLI 2.120.0, cold, 58 s`
- pre-stop scan: 7 of 7, 1b7e8a6b 7865816d 77d5acc2 89938bbb 3f213ee5 b7fcfe88 57fbc734 1df56bcd d09dae74 3e96e1ab
  (1: the fresh stack applied every file in order, and `listing_saved` has no SQL caller beside its own file; 2: every
  scratch key passes its column's CHECK on that stack; 3: idem for every literal's type; 4: no expectation is a real
  row's value — the real-row guard holds, the country anchor is read and touched only by its `e2e-mig-%` name; 5: no
  random code is drawn — each file's stem is one draw and the scratch country code is fixed inside its own rolled-back
  block; 6: every file reads the live `md5(replace(prosrc, chr(13), ''))` of each body it redeclares or closes, and the
  previous mark; 7: both sides of every md5 compare are chr(13)-stripped and no compared literal spans a line break.)
- `bash scripts/check-migrations.sh` (with `TURN_BASE`/`CHECKS_BASE` = 470135181), its guard lines:
  ```
  Born-closed guard OK (floor 20261007143529).
  Definer guard OK.
  Self-marking guard OK (floor 20260817054246).
  Public-surface guard self-test OK (a grant whose object a later file drops is no offender; without the drop it is).
  Public-surface guard OK (floor 20261003215043).
  Real-row proof guard OK (floor 20261007000000).
  Spanning-literal guard OK (floor 20261109000000).
  Random-text guard OK (floor 20261118160000).
  Migration guard OK.
  ```
- `check-doors` static:
  ```
  check-doors self-test OK: 12 finding kinds fired on their planted fixtures, the clean pair fired nothing
  check-doors static OK: 220 manifest lines reconcile with the migrations' catalogue
  ```
- the laws `bunx vitest run scripts --maxWorkers=2`: 124 files, 668 passed, 1 skipped; `bun run typecheck` and
  `bun run lint` clean.
- Planted reds on the local stack, each restored and compared equal afterwards: part 10 without `attr_cell_check`'s
  revoke → "F1-7a part 10 proof (b): the INVOKER function attr_cell_check (chain of public.attr_bound_ok(text)) is open
  to a browser role"; part 2 with the deactivated scratch user left active → "listing_counts(...) as deactivated answered
  notYourListing (P0D01), not accountDeactivated".

## The order of the files, and why no caller meets a changed refusal

The ruling's order: the shell (1); the seventeen signed-in readers and the two legal readers (2–6); the three `_read`
readers with their old names' revokes (7); the viewer's state with the drop (8); the (e) readers (9); the helpers (10),
last and apart from every body change, so a wrong revoke is corrected by one grant file.

In the database no caller meets a changed refusal: no function of parts 2–6 has an SQL caller (class (a) by the
census), so no body reads their new codes; the three old names of part 7 keep their bodies, their sentences and their
SQL callers, which run them as their owner; `impersonation_target` keeps its body and its refusal, and its only callers
are the two readers of part 6, definers since part 6, before part 9 closes it; the shell's change reaches every door
only through `rateLimited`'s detail and `door_refused`'s count, which no SQL body reads.

In the app, between the staging apply and STEP 3, callers DO meet changed answers, and they are this push's expected
reds below: the three routes calling the old names (`src/routes/api/attributes.$id.options.ts:31`,
`src/routes/api/listings/identity.ts:175`, `src/routes/api/translate.ts:105`) answer permission denied until they call
the `_read` names; `src/features/ad-page/save.ts:47` calls the dropped `listing_saved`. Two client readers meet the new refusals, as
this push's CI showed (below): a reader's `door_refuse` (SQLSTATE `P0D01`) reaches a browser caller through PostgREST
as HTTP 500, and `src/lib/reader-failure.ts:20-36` tests `status >= 500` before its refusal codes, so until STEP 3
every gate refusal of these readers is classed `server` (the old sentences, P0001 at 400, were `refused`, and
`not authenticated` was `auth`) — MLA-6's "not one of yours" line is not drawn; and `src/lib/door-error.ts:21`'s
`REASON_CODE` allows only `[A-Za-z0-9_.-]` after the colon, so a door's `rateLimited:<resets_at>` (an instant with
`:` and `+`) becomes `doorError` and is logged until STEP 3 reads the code and its detail apart (PR-7). The
signed-in screens gate by `requireSignedIn`, so a signed-out call reaches these readers only when a session
expires mid-page.

## The classification as built

| class | functions | how |
|---|---|---|
| the shell | `door_context`, `door_refused` | redeclared whole (part 1) |
| (a) signed-in readers on `door_context('reader')` | `listing_counts`, `listing_history`, `my_listing`, `my_listing_certification`, `my_listing_private`, `my_listings`, `my_last_listing_private`, `my_recent_categories`, `my_legal_history`, `my_legal_status`, `my_legal_version`, `my_saved_listings`, `my_seller_line`, `my_seller_place`, `my_viewing_location`, `impersonated_get_profile`, `impersonated_list_listings` (17) | redeclared whole (parts 2–6) |
| (a) public readers on `door_context('public')` | `legal_in_force`, `legal_scheduled` | redeclared whole (part 4); ruling 4 |
| DEC-409 split: new reader on the gate, old name closed | `get_attribute_options_version` → `get_attribute_options_version_read`; `listing_contact_refusals` → `listing_contact_refusals_read`; `translation_scope_ok` → `translation_scope_ok_read` | part 7; old bodies and headers untouched (`listing_contact_refusals` stays INVOKER) |
| new: the viewer's state | `listing_viewer_state(text)` replacing `listing_saved(text)` (dropped) | part 8 |
| public readers off the gate, reason `public-data` (DEC-408) | `feed_page`, `get_category_tree_version`, `get_entity_bundle`, `get_location_tree`, `get_location_tree_version`, `get_open_countries`, `get_ui_bundle_parts`, `get_ui_bundle_version`, `price_unit_labels`, `seller_feed_page`, `sold_visible_days` (11) | bodies and grants untouched; the checker's closure found no caller read in any of the eleven (`check-doors` static OK) |
| (c) helpers kept by their policies | `has_permission(uuid,text,text)` (22 policies), `sold_cutoff()` (3 public-read policies) | manifest only |
| (e) closed readers | `catalog_find_version`, `get_browse_tree`, `get_category_attributes`, `get_ui_bundle`, `level_perks_for`, `price_shape_for_basis`, `impersonation_target` | part 9 |
| (e) closed helpers | the thirty-one below | part 10 |

## Every redeclared body: md5 before → after (`md5(replace(prosrc, chr(13), ''))`)

| function | before | after |
|---|---|---|
| `door_context` | `5a05ee77766181a4256d5b7efce36c41` | `1136caf7f43e38e4ee9a1852635333f8` |
| `door_refused` | `1a94a1b3ad3446749a1d08d9c096df02` | `990719366502e9e9f0e92a62692cb3f8` |
| `listing_counts` | `717b7d1e73be25900600f7a7c6c491ce` | `cb11c7fad2068848c501747ea1cf8d5a` |
| `listing_history` | `8b71b1c3368284e598e18d6f29c2cda7` | `6c5593badd9dd71d1e3c4f4509c1373a` |
| `my_listing` | `bd071192f16c2c21ad1ec12932ab9c7d` | `e707acdf42efee95d263de466544040e` |
| `my_listing_certification` | `bfcddd0a948b320e9947d1d053bbe8be` | `59d12e6bb838a24c1e3302cbeed015e3` |
| `my_listing_private` | `b7332e5c36a8300aa73ba6084a43110b` | `9eb473ec806c4ba3a2852dfec4c46b7e` |
| `my_listings` | `8eeba7bbb45afe77623d4f2d6dd898af` | `de99323ea3dfe39e78fa49ce8c7d8aa9` |
| `my_last_listing_private` | `7319e9bab115b8681131ed524cb1ab1b` | `01c43a5cbe9c4205d3915f909ef523d8` |
| `my_recent_categories` | `b309bc46855d34842419b1ca4b5bd500` | `3dedcf06f31b525fc02008816e694123` |
| `my_legal_history` | `3903d96295286e083e84a045475a53b7` | `1651d4dbafa2737b4d2cdd65d16761c0` |
| `my_legal_status` | `6310784b019a6f57f6596e199d0349ad` | `035cf4542feb9617de7758d9ade394d0` |
| `my_legal_version` | `47d5a78440bfa5f51399153e3d06db11` | `da8c84c9d84f938aab87224b7729aee1` |
| `legal_in_force` | `ff27d5272e924e6a26131189b87e4ce1` | `8806354f32212346bc27eb023045c72a` |
| `legal_scheduled` | `3973a5a0c000ac502cb327142b8a05bc` | `f44b2988b992c288512acf3b63b77918` |
| `my_saved_listings` | `a97294ca81edeeafb02688d1afced62a` | `7438ae1a723e2f599ba4affe37607886` |
| `my_seller_line` | `3f047866c6606f435e19116b176076de` | `e171cf1127a5e6f605ca1ef820e43b81` |
| `my_seller_place` | `207a62507515108ecbb5028f08e62df0` | `f69ef2d1ef8b0d1b3d5d78f0ba5867c8` |
| `my_viewing_location` | `1bb879fd3701485cf77e99fd499be486` | `81a45debc5db3d69a146018a22fdaaa1` |
| `impersonated_get_profile` | `b39a3d18661a80b0ed30ccf7de74e1ab` | `623968df1585ba93d2c46a89a07e89a2` |
| `impersonated_list_listings` | `a27491a4009fe4a05e43a57423ac169e` | `88669b9b83037e9b00e0dedc97008e0d` |

The shell's two "before" values agree with the supervisor's staging read (first twelve: `5a05ee777661`, `1a94a1b3ad34`).
The three old names of part 7 keep their bodies, checked by md5 in the file: `get_attribute_options_version`
`aa19b177393e2622497490154b9cc07c`, `listing_contact_refusals` `d8b57864116db16570058346b4a9e04e`,
`translation_scope_ok` `df925ba6ca44fe98a2f67eea830e4d26`. Every body of parts 9 and 10 is checked unchanged by its md5
in the file (the values below).

## Dropped and re-created functions

None is dropped and re-created. `listing_saved(text)` (grants before: authenticated, service_role) is dropped in part 8
and not re-created; `listing_viewer_state(text)` is new, born closed, then granted to authenticated and service_role.
`check-doors`' `grant-dropped` reads part 8 and finds nothing to restate.

## Every grant that left (static catalogue at the base → after; PUBLIC is revoked in every closing file too)

| function | before | after |
|---|---|---|
| `get_attribute_options_version(uuid)` | authenticated, service_role | service_role |
| `listing_contact_refusals(jsonb)` | authenticated, service_role | service_role |
| `translation_scope_ok(text)` | authenticated | none |
| `listing_saved(text)` | authenticated, service_role | dropped |
| `catalog_find_version()`, `level_perks_for(text,uuid,character)`, `price_shape_for_basis(text)` | anon, authenticated, service_role | service_role |
| `get_browse_tree(text)`, `get_category_attributes(uuid,boolean)`, `get_ui_bundle(text)` | anon, authenticated | none |
| `impersonation_target(uuid)` | authenticated, service_role | service_role |
| `category_slug_candidate(text)` | authenticated | none |
| the other thirty helpers of part 10 | authenticated, service_role | service_role |

## Every closed function with the caller that proves it

Part 9 (the (e) readers; callers from the census's live reading):

| function | md5 (unchanged) | SQL callers (all run it as their owner) | browser callers |
|---|---|---|---|
| `catalog_find_version()` | `1b5e2af66273a0c6354ae408b5edaf30` | `catalog_find_refresh` [D], `catalog_find_sweep` [D], `catalog_search` [D] | none |
| `get_browse_tree(text)` | `f2f15bba0a10fd29d49ecec7498a90fe` | none | none |
| `get_category_attributes(uuid,boolean)` | `8a2b9e09355e4c9a27977d98fbfcf65f` | none | none |
| `get_ui_bundle(text)` | `c0228102995224952a4b7fac3f41cc97` | none | none (unit-test mocks only) |
| `level_perks_for(text,uuid,character)` | `662e1195e9779ac614ac4c929f4e51f3` | nine DEFINER bodies; `listing_photo_cap` [I, service only] | e2e `adminClient()` (service) only |
| `price_shape_for_basis(text)` | `cdae788c71d87c7e04fb1265ebde2142` | `validate_listing_draft` [D] | none |
| `impersonation_target(uuid)` | `a50583be2e3d2768b10b9cefd04a06d3` | `impersonated_get_profile` [D], `impersonated_list_listings` [D] | none |

Part 10 (the helpers; [D] a definer, [I] an invoker no browser role runs, `+a` the caller is itself browser-callable
and runs the helper as its owner; CHECK constraints sit on tables no browser role writes):

| helper | md5 (unchanged) | SQL callers |
|---|---|---|
| `assert_parent_not_catchall(uuid)` | `7479a4f6b855e105f48f2b7de207c96f` | admin_add_category_pointer_core [I], admin_create_category_core [I], admin_move_category_pointer_core [I] |
| `attr_allowed_check(text,jsonb,jsonb,jsonb)` | `ccdcbfc822c0f7e356f3d3c8059a10cb` | admin_upsert_attribute [D]+a, attr_import_plan [D] |
| `attr_answer_other_text(jsonb)` | `8668ad50a65437852135e702afd6a051` | edit_my_listing [D]+a, listings_search_tsv_refresh [I], validate_listing_attributes [D]+a, validate_listing_draft [D] |
| `attr_answer_tokens(jsonb)` | `26d39934698be9051e18e1a6eebebc71` | attr_visible_when_met [I]+a, attribute_holders [I], validate_listing_attributes [D]+a |
| `attr_bound_ok(text)` | `8c6bd1891746cd863d4ebfd844cb372f` | attr_cell_check [I]+a, attr_option_shape [I]+a; CHECK attributes.attributes_bounds_check |
| `attr_bound_value(text)` | `84b9d00295619e2a15c0896bc2692071` | validate_listing_attributes [D]+a |
| `attr_bounds_targets(jsonb)` | `b08e84acc432452a3976d0d21c574739` | admin_upsert_attribute [D]+a, attr_import_plan [D] |
| `attr_cats_expand(uuid[])` | `062033660213b4966e150f75387c5408` | admin_upsert_attribute [D]+a, attr_allowed_check [I]+a, attr_import_plan [D], price_basis_conflict [I] |
| `attr_cell_check(text,text,text,text,integer,text,text,integer,text,text,text)` | `8ed535c02a2724e034488e020cf227e9` | admin_upsert_attribute [D]+a, attr_import_plan [D] |
| `attr_contact_like(text)` | `cb434d3c889594980d08fd4fe665675c` | edit_my_listing [D]+a, set_listing_pin [D]+a, validate_listing_attributes [D]+a, validate_listing_draft [D] |
| `attr_export_payload(text)` | `5cec4c6a3f3b2fdf68a739722bba05be` | admin_export_attributes [D]+a, import_readonly_ignored [D] |
| `attr_inherited_ranks(uuid,jsonb)` | `4eef07248ad243dff5a06737616d2d47` | attr_rank_conflict [I]+a |
| `attr_link_cells_refusal(uuid,uuid,text[],jsonb,jsonb)` | `2ca0e4f4bd4072bbe728c09003853c60` | admin_link_attribute [D]+a, admin_update_attribute_link [D]+a, attr_import_plan [D] |
| `attr_option_norm_v2(jsonb)` | `b01b465f9a1965fa1c853dc6c3644634` | attr_import_plan [D] |
| `attr_option_shape(text,jsonb)` | `2df33bb0ea435190f95f67f83ba9e07e` | admin_upsert_attribute [D]+a, attr_import_plan [D] |
| `attr_postplan_cats(text,jsonb)` | `879db8e9bdce96aab6f9cc181a7a5df5` | admin_upsert_attribute [D]+a, attr_allowed_check [I]+a, attr_import_plan [D], price_basis_conflict [I] |
| `attr_preset_ok(text)` | `1377013128760da20a28c4afe74a5f69` | attr_cell_check [I]+a; CHECK attributes.attributes_preset_check |
| `attr_rank_conflict(uuid,integer,text,jsonb)` | `1e1965ccee3bedd0440adebc74c7db62` | admin_set_card_attributes [D]+a, attr_import_plan [D] |
| `attr_split_option_cell(text)` | `d6fc93b76a34868ff7a2cc43a63291d7` | attr_import_plan [D] |
| `attr_visible_when_met(jsonb,jsonb,jsonb)` | `5ab8255b201c43104ef02414578f0e81` | price_basis_in_force [I], validate_listing_attributes [D]+a, validate_listing_draft [D] |
| `attr_visible_when_ok(jsonb)` | `20a83804a1b8c68109d97292927fca9b` | attr_import_plan [D], attr_link_cells_refusal [I]+a; CHECK category_attribute_links.category_attribute_links_visible_when_shape |
| `cat_primary_parent(uuid)` | `2afedddceaa8735b686e17eb947f85f4` | admin_list_categories [D]+a, attr_cats_expand [I]+a, attr_export_payload [I]+a, attr_import_plan [D], attr_inherited_ranks [I]+a, attr_link_origin [I], attr_link_path [I], cat_import_plan [D], catalog_find_path [D], catalog_find_refresh [D], effective_category_links [D], public_listing_json [D] |
| `cat_primary_pointer(uuid)` | `905b137a0805e9b9df6d850a491ec38d` | admin_commit_category_import [D]+a, admin_undo_category_import [D]+a, cat_export_rows [I] |
| `catalog_find_norm(text)` | `fa72eaf330d105b782fc634a730f0b86` | catalog_find [D], catalog_find_refresh [D] |
| `category_slug_candidate(text)` | `1dd9c063550b2dfa5c341b0459736f72` | admin_create_category_core [I] |
| `entity_source_value(text,uuid,text)` | `3d3a8a78d59cd6d31254282fee8c4d66` | admin_machine_entity_translation_core [I], admin_save_entity_translation_core [I] |
| `import_norm_text(text)` | `59cf9a336b3a3c4ae025c73a24c67665` | import_norm_bool [I], import_norm_date [I], import_norm_pipe [I], import_sanitize [I]+a |
| `import_sanitize(jsonb)` | `76d31599961c0a86a30825c83cc84405` | import_gate_audit [D] |
| `location_slug_candidate(text,uuid)` | `b18e9221331c48277753077d6298defd` | admin_commit_location_import [D]+a, admin_set_country_active [D]+a, admin_upsert_location [D]+a, countries_anchor_on_insert [D] |
| `ui_translation_reviewable(text,boolean,boolean)` | `4bec401735b1d6a176542aa78e8d2118` | admin_translation_stats [D]+a, approve_all_translations_impl [D] |
| `validate_listing_attributes(uuid,jsonb,jsonb,text[])` | `b8de9ceddf7e181034d60507363eda5e` | validate_listing_draft [D] |

Each file's proof (b) walks this chain in the live catalogue on every apply, so a caller this table misses fails the
apply. Ruling 7's second condition is read in the CI section below.

## The measured cost (local proof stack, median of 200 calls; ruling 7's bar: 5 ms per call at the median)

`door_context` per class, after the change: reader 0.0070 ms, public signed in 0.0070 ms, public signed out 0.0030 ms,
staff-reader 0.0760 ms (before, the census's probe: 0.0080, 0.0080, 0.0040, 0.0800).

| reader | before (old body) | after |
|---|---|---|
| `listing_counts` | 0.0250 | 0.0325 |
| `listing_history` | 0.0270 | 0.0350 |
| `my_listing` | 0.0390 | 0.0470 |
| `my_listing_certification` | 0.0430 | 0.0520 |
| `my_listing_private` | 0.4760 | 0.4870 |
| `my_listings` | 0.1960 | 0.2060 |
| `my_last_listing_private` | 0.0190 | 0.0270 |
| `my_recent_categories` | 0.0200 | 0.0280 |
| `my_legal_history` | 0.0280 | 0.0360 |
| `my_legal_status` | 0.0350 | 0.0430 |
| `my_legal_version` | 0.0240 | 0.0320 |
| `legal_in_force` | 0.0220 | 0.0300 |
| `legal_scheduled` | 0.0230 | 0.0320 |
| `my_seller_line` | 0.0240 | 0.0320 |
| `my_seller_place` | 0.0110 | 0.0180 |
| `my_viewing_location` | 0.2410 | 0.2490 |
| `my_saved_listings` | 0.0590 | 0.0680 |
| `impersonated_get_profile` | 0.0220 | 0.0300 |
| `impersonated_list_listings` | 0.0290 | 0.0380 |
| `get_attribute_options_version` → `_read` | 0.0320 | 0.0190 |
| `listing_contact_refusals` → `_read` | 0.0150 | 0.0230 |
| `translation_scope_ok` → `_read` | 0.3815 | 0.3590 |
| `listing_saved` → `listing_viewer_state` | 0.0060 | 0.0150 |

All in milliseconds; the largest is 0.4870 ms, under ruling 7's bar by a factor of ten. Each proof fails its file if a new
median passes 5 ms.

## New or changed string keys

None. `src/lib/door-codes.ts` does not grow (ruling 10).

## Every manifest cell or class changed

- Codes cells (ruling 10), each from `-`: `listing_counts`, `listing_history`, `my_listing`, `my_listing_certification`,
  `my_listing_private` → `notSignedIn,notYourListing`; `my_last_listing_private`, `my_recent_categories`,
  `my_legal_history`, `my_legal_status`, `my_seller_line`, `my_seller_place`, `my_viewing_location` → `notSignedIn`;
  `my_legal_version` → `notSignedIn,notYours`; `my_listings` → `badValue,notSignedIn`; `my_saved_listings` →
  `badSize,badValue,notSignedIn`; `legal_in_force`, `legal_scheduled` → `notSignedIn`. Sentence: the codes each body
  raises itself, beside the gate's.
- Reason `public-data` on the eleven public readers (DEC-408). Sentence: the body and every public function it names read
  nothing of the caller, proven by `check-doors` on every push.
- `has_permission(uuid,text,text)`: `signed-in-reader` → `helper`, reason `policy` and its 22 policies by name. Sentence:
  the grant serves the policies that call it as the person; INC-409's branch is the body's and untouched.
- `sold_cutoff()`: `public-reader` → `helper` (anon, authenticated), reason `policy listing_locations_public_read,
  listing_photos_public_read, listings_public_read`. Sentence: the three public-read policies call it as the visitor.
- `translation_scope_ok(text)` line leaves (its `translations:manage` cell did not hold, INC-1158); new line
  `translation_scope_ok_read(text) | signed-in-reader | authenticated`, no permission cell (ruling 2).
- New lines (signed-in-reader, authenticated): `get_attribute_options_version_read(uuid)`,
  `listing_contact_refusals_read(jsonb)`, `listing_viewer_state(text)`.
- Lines that leave: the three old split names, `listing_saved`, the seven (e) readers and the thirty-one helpers.
- `scripts/doors/check-doors-allowlist.txt`: the two `grant-without-caller` lines for `get_browse_tree` and
  `get_category_attributes` leave; four `grant-without-caller` lines join, until 2026-12-31, for the four new readers
  whose app callers move at STEP 3 after the types patch (each leaves with its caller).
- `scripts/public-surface-allowlist.txt`: 21 lines RETIRED in DEC-347's form (part 7: `listing_contact_refusals`; part
  9: six readers; part 10: fourteen helpers); `listing_saved`'s line leaves (dropped); five lines join (the four new
  readers and `impersonated_get_profile`'s restated grant).

## Decisions for the supervisor

1. The checker reads policies STATICALLY (`scripts/doors/policies.ts`: every `CREATE POLICY` / `DROP POLICY` of the
   migrations in apply order) and uses that reading in both modes; `--live` judges the same policies. Planted case:
   DOORS-13.
2. The helper reason grammar is `policy <name>, <name>, …` (names sorted); a `policy` reason that names no policy, or a
   policy that does not call the function, is refused (`helper-reason-unproven`).
3. The manifest grammar now lets a `helper` line name `anon` (before: only a public line could), for `sold_cutoff`,
   which the visitor's public-read policies call.
4. `reader-off-gate`: a signed-in-reader or staff-reader line off the gate is refused outright; a public-reader line off
   the gate needs `public-data`, and the closure follows every public function its body names, at any depth, for
   `auth.uid()`, `auth.role()`, `auth.jwt()` or a `'request.` setting (DOORS-12, with a read two calls deep).
5. The static catalogue no longer counts a dynamic `GRANT`/`REVOKE` whose literal target opens on `pg_temp.` as
   `grant-unseen` (DOORS-14, red on the old reader first): the proofs close their pg_temp copies of the old bodies to
   PUBLIC by a dynamic REVOKE, which the born-closed law needs and which can reach no function of schema public. The
   alternative, an allowlist line per file, would stand forever.
6. Four `grant-without-caller` lines until 2026-12-31 for the new readers, as above.
7. Names: the ruling's `<old>_read` names and `listing_viewer_state` are used as given; none collides.
8. A deactivated signed-in caller of `legal_in_force` / `legal_scheduled` is now refused `accountDeactivated` (ruling 4
   accepted it; named here as the behaviour change it is).
9. The retired public-surface lines' tail names F1-7c as the turn where the guards learn retirement (DEC-347).
10. A census miss outside SCOPE, red on this push's Component tests: `src/features/posting/price-basis.test.ts:21-28`
    takes the newest migration whose text includes `FUNCTION public.price_shape_for_basis` as the function's
    declaration; part 9's `REVOKE EXECUTE ON FUNCTION public.price_shape_for_basis(text)` now matches, the test
    finds no CASE arm ("expected two CASE arms, found 0") and its two SQL-reading tests fail. The file is under
    `src/features/` but calls no function, so no clause of SCOPE reaches it. Proposed: STEP 3 may change its filter to
    the declaration (`CREATE OR REPLACE FUNCTION public.price_shape_for_basis`), one line, with its red-first run; the
    alternative, writing part 9's revoke without `public.`, would bend a migration to a test's reader.
11. Census misses inside SCOPE, for STEP 3 and STEP 4: LGC-6 (`e2e/legal-certify.spec.ts:1339-1343`) reads the legal
    readers' old refusal (HTTP 401, code 42501) and now receives `notSignedIn` at HTTP 500; MLA-6 (`e2e/my-listings-
    ad.spec.ts`, another seller's ad) depends on `reader-failure.ts` classing the gate's refusals before the 5xx test;
    PR-7 depends on `door-error.ts` reading `rateLimited:<resets_at>`. The census named PR-7 for the time only.
12. A reader's gate refusal answers HTTP 500 through PostgREST (the `P0` class), as for the readers already on the shell
    (`e2e/legal-admin.spec.ts:1186`). STEP 3 makes the client read it as a refusal; whether a reader's refusal should
    set `response.status` as `door_refused` does is a question for F1-7c (it would need a handler in every reader).

## The reds expected on this push until STEPS 3 and 4

By the census's `tests` item and the grep of the closed and dropped names:

- PR-7 (`e2e/posting-routes.spec.ts:563`), AP-25 and AP-27 (`e2e/ad-page-doors.spec.ts:752,756` and `:855,860`), VP-4
  (`e2e/viewing-place.spec.ts:184`): `rateLimited` now carries the reset time; STEP 4 reads it.
- PR-21 (`posting-routes.spec.ts:964`), AP-4 (`ad-page-doors.spec.ts:171`), LG-15 (`e2e/legal-certify.spec.ts:438`),
  ML-2 (`e2e/my-listings-doors.spec.ts:333,335`), MLA-1, MLA-2, MLA-7 (`e2e/my-listings-ad.spec.ts:313,345,623`):
  `not your listing` → `notYourListing`.
- AP-20 (`ad-page-doors.spec.ts:442`): `permission denied|not authenticated` → `notSignedIn`.
- CG-2 (`e2e/auth-caller-gates.spec.ts:259`): its pattern gains `notYourListing|notSignedIn`.
- MLP-1 (`e2e/my-listings-page.spec.ts:301,303`), MLP-5 (`:568,575`): the sentences → `badValue:group|page|search|mark`.
- AP-24 (`ad-page-doors.spec.ts:601,604`) and AP-25 (`:726`): they call `listing_saved`, dropped.
- Every flow through the posting identity step (`listing_contact_refusals`), the attribute options route
  (`get_attribute_options_version`) and the translate route (`translation_scope_ok`), and the ad page's save state
  (`save.ts:47`, `listing_saved`): a "permission denied for function" naming one of those three names, or a missing
  `listing_saved`, is expected. A permission-denied red naming ANY other function is a STOP in this chat (ruling 7).
- The preflight job reports STAGING BEHIND until ethio-staging holds mark 20261119170900.

## The first shared run

The proofs' first run on a shared database is the staging apply: until then they have run only on this computer's
throwaway stack (`bun run db:proof`) and on CI's temporary backends.

## Records so far (for STEP 7's §14; the GO's and ruling 1's lines, word for word there)

- INC-1212's brackets: thirty-one helpers closed; the lines kept: `has_permission` (its 22 policies) and `sold_cutoff`
  (the three public-read policies); the checker reads policies statically.
- INC-1162's: every helper's grant left; none kept by its old reason.
- INC-1158's: `translation_scope_ok`'s `translations:manage` → none (`translation_scope_ok_read`, signed-in reader).
- Scratch: `/tmp/ethio-scratch/f1-doors-7a/` (the build scripts, the cost runs, the planted copies) is the operator's to
  remove.

## CI on this push

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `a45b433781e052460026abd032a6a59042b98bfe` (short `a45b433`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-19T16:09:47Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44552590552
```

Read with `gh pr checks 75`, the failed jobs' logs (`gh api …/actions/jobs/<id>/logs`, read only) and this lane's
`e2e-last-failure.md` on ci-evidence (19 of 19 results files and logs read by its writer). 28 checks pass, 15 fail,
1 is skipped.

- The temporary backends: every lane's backend applied all ten files (`MIGRATIONS_OK: 1`), so every proof passed on
  CI's temporary Supabase as on the local stack.
- RULING 7's CONDITION HOLDS: across the twelve red lanes' logs and the e2e failure file, the only functions named in
  "permission denied for function" are `get_attribute_options_version` (29 in the failure texts; 922 server-log lines),
  `listing_contact_refusals` (20; 28) and `translation_scope_ok` (21; 44) — the three expected split names. No closed
  reader or helper is named, and no log line names `permission denied` for anything else.
- `E2E preflight (migration parity, staging)`: "STAGING BEHIND: apply 20261119150900_3e96e1ab-….sql to ethio-staging
  before E2E can pass" — expected until the staging apply. `E2E (Playwright, ethio-staging)` reports the lanes'
  failure file ("E2E failed — see docs/tracking/branches/cursor/f1-doors-7a/e2e-last-failure.md").
- `Component tests`: 1 of 529 files, 2 of 3452 tests — `src/features/posting/price-basis.test.ts` (decision 10).
- The twelve red E2E lanes: Passed 2347 · Skipped 360 · Failed 199 (the file's own counts; it holds 246 test
  sections, grouped below by test id).
  By spec: `ad-page-doors` AP-4, AP-24, AP-25, AP-27; `ad-page` AP-26; `posting-routes` PR-4, PR-6, PR-7, PR-21;
  `my-listings-doors` ML-2; `my-listings-page` MLP-1, MLP-5; `my-listings-ad` MLA-1, MLA-2, MLA-6, MLA-7, MLA-15;
  `legal-certify` LG-15, LGC-6; `viewing-place` VP-4; `admin-translations-console` TR-11, TR-12, TR-13, TR-16,
  TR-23, TR-35 and one U4b test; `admin-translations-data` TR-24, TR-26; the posting wizard — `post-wizard-bundle2`
  PW-133, PW-144, PW-149, PW-185; `post-wizard-category` PW-44; `post-wizard-details` PW-102, PW-103, PW-170, PW-172;
  `post-wizard-finder` PW-85; `post-wizard-place` PW-12, PW-30, PW-76, PW-78; `post-wizard-pricing` PW-55, PW-56,
  PW-57, PW-58, PW-63, PW-64, PW-67, PW-108, PW-109, PW-136, PW-137, PW-138, PW-140, PW-162; `post-wizard-resets`
  PW-26, PW-32, PW-59, PW-60, PW-61, PW-152, PW-163, PW-164, PW-165, PW-166, PW-167, PW-168, PW-174;
  `post-wizard-specs` PW-5, PW-9, PW-16, PW-21, PW-22, PW-25, PW-28, PW-34, PW-35, PW-42, PW-43, PW-45, PW-49, PW-50,
  PW-51, PW-69, PW-74, PW-106, PW-107, PW-120, PW-145, PW-153, PW-159, PW-188; `post-wizard-units` PW-175;
  `post-wizard-where` PW-88, PW-104.
- How each is accounted for: the ids named under "The reds expected" above; the posting wizard's ids, PR-6 and the
  attribute pickers through the options route (`get_attribute_options_version`, the 922 server-log lines in those
  shards); PR-4, PW-133, PW-144, PW-149, PW-185, PW-12 and MLA-15 through the identity step
  (`listing_contact_refusals`); the TR ids through the translate route (`translation_scope_ok`); AP-26 through the ad
  page's heart (`listing_saved`); LGC-6, MLA-6 and PR-7's cause are the census misses of decision 11. None is
  outside these classes.
- Server-error census (non-gating): beside the three names, `rateLimited:<instant>` 8 lines in shard 2 (the doors'
  new detail reaching `door-error.ts`, decision 11) and `[object Object]` 44 lines in shards 5 and 8, the same shards
  and count as the translate route's scope denial; its source line was not read here — a finding for STEP 3.

No red on this push is a STOP under ruling 7. Every red above stays until the staging apply and STEPS 3 and 4; the
next push is the next chat's.
