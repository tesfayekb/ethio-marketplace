MIGRATION — p2-fold c1 step 2: M-3b — the reach resolver, the trim on the included reach, the reach answer in promote_options, the judge reading the ad's reach, and its six callers passing the ad (six files, one stop)
DONE: c1 step 1 (M-3a, on staging), the types patch (ruling 3), c1 step 2 (M-3b): six files written, their proofs, the guards, db:proof PASS, a planted-red control for each behaviour part
LEFT: after "continue" (with the types patch for M-3b) — c1 step 3 (photo.ts onto listing_photo_cap, PP-7 / PP-25 / PW-29 on a scratch category's override, PW-82 on a scratch reach row, SWP-3, the promote_options door test, THE CHECKS, budgets, the self-review, the report, the pull request's CI and the c1 comment)
CI: # CI Status (auto-generated — do not edit by hand)
    (blank)
    - Commit: `8a457e7562b60deea1ebbd0edc1ea75f498fe8a7` (short `8a457e7`)
    - Conclusion: **FAILURE**
    - Completed (UTC): 2026-11-07T13:08:44Z
    - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42372896662
    (8a457e7 is stop 1's addendum. Its reds are Lane 5, Lane 13 and E2E (ethio-staging): PP-7,
    PP-25 and PW-29 on both projects, 6 failed of 2646, the expected ones. The preflight is green:
    staging holds M-3a. origin/dev is still af50ca802 — no drift. The run on this push is read
    after the push and written below in its own commit.)
FILES: (git diff --name-only 8a457e756, ruling 3's base)
       src/integrations/supabase/types.ts
       supabase/migrations/20261107125356_a2a45734-ad08-4ad2-bc78-0337e079a07c.sql
       supabase/migrations/20261107125357_cf82e13d-2735-4ecd-b6fd-23236994563c.sql
       supabase/migrations/20261107125358_704f04ac-89c6-4b05-b247-5788ad7463e4.sql
       supabase/migrations/20261107125359_ee072b49-3507-4f80-bab2-9328caa7212b.sql
       supabase/migrations/20261107125400_19c38d6c-77ec-40e1-a8ea-e04838c46440.sql
       supabase/migrations/20261107125401_0d1cd555-1031-44eb-8922-f6ba4413daf7.sql
       (and this file)

The types patch (ruling 3, sha256 `d4f32ba5…`) was applied with `git apply`, `bun run typecheck`
passed, and it was committed as 8c4240280. The .patch file is not in the tree.

M-3b is six files, split by concern under rule 30's ~25 KB a file. Its first three concerns,
written as one file, measured 37.6 KB. The judge and `edit_my_listing` together measured 27.3 KB.
Apply them in order: each part's pre-check refuses to run before the previous part's mark. Each
pre-check also requires every body the part rewrites to hash, live, to the body the census read
(G39); a mismatch stops the apply.

Every redeclared body was produced by a script outside the tree from its last declaration's text:
the fragments in, each occurring exactly once, then put back to the last declaration's md5. The
same fragments are what each file's proof puts back inside the database.

## Part 1 — an ad's reach and its caps

- Name: `supabase/migrations/20261107125356_a2a45734-ad08-4ad2-bc78-0337e079a07c.sql` (20 497 bytes)
- sha256: `4dee6c60975b870c7be5e0787497848446254d32c1f55a2a7e08365ee64ac30b`
- Mark: `20261107140000`. Pre-check: the mark `20261107120100` (M-3a part 2), and live
  `listing_places_trim` = `87161a988489cd5cc92dd4ac1c156601`.
- Creates `public.listing_effective_reach(p_listing uuid) RETURNS text` (sql, STABLE, INVOKER,
  `search_path=public`, service-only), THE one resolver:
  `coalesce(l.reach, market_settings_for(<the least country of the ad's places>).included_reach)`.
  `coalesce` evaluates the market only when there is no bought reach. An ad with no places reads
  the default row; an unknown ad answers NULL.
- Redeclares `listing_places_trim(uuid)` whole from 20261105080105, header and grants unchanged.
  Its caps are those of the ad's market's included reach, by the same market rule, and a NULL cap is
  no limit: the comparisons read `(cap IS NULL OR count <= cap)`. Its COMMENT is restated without its seller_plan wording.
- Proofs (sentinel `p2c-m3b1-proof-ok`):
  - (a) both headers and grants.
  - (b) md5 with the three fragments put back = `87161a98…`, the body of 20261105080105.
  - (c) the resolver gives:
    - a bought reach for an ad that has one;
    - XZ's included reach for an ad placed in XZ;
    - the scratch default's included reach for an unplaced draft (the real default row is parked
      on XY inside the rolled-back block);
    - NULL for an unknown id.
  - (d) the trim on XZ's included caps (2 cities, regions uncapped, 1 country):
    - an ad in three cities of three regions keeps the primary and the next, and answers the
      third;
    - a second trim removes nothing;
    - an ad in two cities of two regions keeps both (the NULL region cap does not bind);
    - neither ad's row changes.

## Part 2 — the reach in the Promote answer

- Name: `supabase/migrations/20261107125357_cf82e13d-2735-4ecd-b6fd-23236994563c.sql` (22 959 bytes)
- sha256: `f3a16b7c50ef7b144163bc511fadd5310483c2ba8a3668bae538f1a1e6540fc0`
- Mark: `20261107140100`. Pre-check: the mark `20261107140000`, and live `promote_options` =
  `289edad282d69672248641cbef4a7224`.
- Redeclares `promote_options(uuid)` whole from 20261106233808, with its header, its grants, its
  levels and its refusals unchanged. Two keys are added to the answer:
  ```
  'reach':   { key: listing_effective_reach(ad), until: reach_until, source: reach_source,
               included: <the market's included_reach> },
  'reaches': [ { key, name_en, name_am, sort, current, below, days, amount, currency,
                 availability }, … ]
  ```
  The `reaches` list covers every enabled self-serve reach row, in `(sort, key)` order. Its
  `availability` follows set_listing_reach's own reads, in that door's order:
  `includedReach` → `unknownReach` → `sameReach` → `lowerReach` → `notOffered` → `available`.
  `creditsNotAvailable` stays the door's answer at the moment of setting, as for levels. The price
  is `product_price_for(key, category, country)`, the door's read. The COMMENT is restated.
- Proofs (sentinel `p2c-m3b2-proof-ok`):
  - (a) header and grants.
  - (b) md5 with the three fragments put back = `289edad2…`, the body of 20261106233808.
  - (c) the answer for an ad at XZ's included reach:
    - the head is `{key: rinc, until: null, source: null, included: rinc}`;
    - the scratch rows come in order (low, offered, unpriced). The staff-only included row is
      absent.
    - The row below and the unpriced row are compared whole. The offered row is checked for
      amount 7, currency XTS, 20 days and `available`.
    - An ad holding a bought reach answers `sameReach` on it and `lowerReach` on the rows under it,
      with its until and source.
    - Nothing any read wrote: rate limits, revisions, audit rows and the ads are compared before
      and after.
  - (d) the answer agrees with set_listing_reach:
    - the row it calls `lowerReach` and the row it calls `notOffered` are refused by those words;
    - the `available` row sets;
    - the next answer carries that reach.

## Part 3 — the judge reads the ad's reach

- Name: `supabase/migrations/20261107125358_704f04ac-89c6-4b05-b247-5788ad7463e4.sql` (18 780 bytes)
- sha256: `06874d00191c66b1c8416d24805bbd1ed772b4639ba4d2fc4b4d4697eaca340d`
- Mark: `20261107140200`. Pre-check: the mark `20261107140100`, and live `validate_listing_draft`
  (17 arguments) = `6fdcdbc38cac35a964253bf7a2098b74`.
- `validate_listing_draft` is DROP + CREATE: the argument list changes. Its body is 21.9 KB, so it
  is written by computed insertion (rule 30):
  1. The live body is read and CR-normalised, and its md5 is checked as `6fdcdbc3…`
     (20261103040808 :22).
  2. Two fragments, each unique, are replaced: the plan's row type
     (`coverage_plans` → `listing_packages`, plus `v_reach text`) and the plan's read.
  3. The new md5 is checked as `b85ca3d36ed569bf8d6205b6b3c1fe8c`.
  4. The live header is checked (DEFINER, VOLATILE, `search_path=public`).
  5. The 17-argument function is dropped. It is created again with the live argument list plus
     `p_listing_id uuid DEFAULT NULL::uuid`.
  6. A post-apply check confirms pronargs 18, pronargdefaults 3 and the md5. The grants are
     restated: service only.

  The new read:
  ```
  v_reach := CASE WHEN p_listing_id IS NULL THEN (public.market_settings_for(v_market)).included_reach
                  ELSE public.listing_effective_reach(p_listing_id) END;
  SELECT * INTO v_plan FROM public.listing_packages k WHERE k.key = v_reach AND k.kind = 'reach';
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownReach'; END IF;
  ```
  The three comparisons are unchanged (`v_cities > v_plan.max_cities` …). A NULL cap makes each one
  NULL, which never refuses.
- Proofs (sentinel `p2c-m3b3-proof-ok`):
  - (a) header, body md5, grants, pronargs 18 / pronargdefaults 3, and the 17-argument signature
    gone.
  - (b) the coverage refusals of each judgement at step 6:
    - a nationwide ad (bought; no city or region cap; one country) keeps three cities in two
      regions;
    - an ad at XZ's included reach (1 / 1 / 1) is refused `coverageExceedsPlan:city` for two
      cities;
    - a call with seventeen arguments (no ad) is judged by the places' market's included reach,
      and refused the same;
    - a worldwide ad (no caps) keeps two countries;
    - the nationwide ad is refused `coverageExceedsPlan:country` for the second country.

## Part 4 — the seller's live doors pass their ad

- Name: `supabase/migrations/20261107125359_ee072b49-3507-4f80-bab2-9328caa7212b.sql` (21 748 bytes)
- sha256: `ad8bd34495b165053af90bee990d35ac35871d570c098f0844337863715882c3`
- Mark: `20261107140300`. Pre-check: the mark `20261107140200`; live `edit_my_listing` =
  `12c05d47758d54fe541961e7f5c8ce2d`; live `publish_listing` = `0eabacd706c7c4bb33bf1bfc556f834a`.
- `edit_my_listing` is 11.7 KB, so it is written by computed insertion:
  - The old md5 `12c05d47…` is the body 20261105080108 leaves (its computed insertion into
    20261019115951's text). db:proof's apply of every migration in order met it at part 4's
    pre-check.
  - One fragment is replaced: the judge's last argument becomes `, p_listing_id`.
  - The new md5 is `77def52b1ce62164e8f2ee1a84af6715`.
  - The live header, defaults and ACL are checked after the apply.
- `publish_listing` is redeclared whole from 20261104154001, with the same one-argument fragment.
- Proofs (sentinel `p2c-m3b4-proof-ok`):
  - (a) both headers and grants; `edit_my_listing`'s md5; `publish_listing`'s md5 with the
    fragment put back = `0eabacd7…`.
  - (b) `edit_my_listing` as the seller, a title change (law 14):
    - **A nationwide ad in three cities of two regions:** the edit lands, `ok: true`, to review
      (`screening`, a title change), and its places stay `[a1, a2, b1]`.
    - **An ad at XZ's included reach holding two cities:** it is answered
      `{ok: false, refusals: [coverageExceedsPlan:city]}`. Nothing is written: its row (status,
      title, `updated_at`), its places, its revisions, its audit rows and its certifications are
      all compared before and after.
    - **The refused edit's dial:** its `revise` dial count rose by exactly one (see question 1).

## Part 5 — the writers that send places

- Name: `supabase/migrations/20261107125400_19c38d6c-77ec-40e1-a8ea-e04838c46440.sql` (19 122 bytes)
- sha256: `1a61564f8a381f4e8e1bb54ee76a1ff879c82910e9670b4078168f51766075f2`
- Mark: `20261107140400`. Pre-check: the mark `20261107140300`; live `submit_listing` =
  `7aa90de20926d5704297dd61187e380e`; live `edit_listing` = `ce57a0f007bb2f13029648475e074b6e`.
- `submit_listing` is redeclared whole from 20261006225254. Its one validator call (the census's
  line 488) gains `, p_listing_id`, which is NULL for a new draft. `edit_listing` is redeclared
  whole from 20261014194317: it is service-only since 20261106052000 and retired by DEC-335, and
  it gets the same fragment. Headers, arguments and grants are unchanged and restated.
- Proof: both headers and grants (authenticated: yes for submit, no for edit), and each md5 with
  its fragment put back.

## Part 6 — the doors that send no places

- Name: `supabase/migrations/20261107125401_0d1cd555-1031-44eb-8922-f6ba4413daf7.sql` (18 763 bytes)
- sha256: `98064820ca8dfd9bd2d4497cf4d09a8b9517e8f4c82adbf9ca4e6010fb93fc26`
- Mark: `20261107140500`. Pre-check: the mark `20261107140400`; live `set_listing_price` =
  `15e599df63caf7f023401e3ca8a04137`; live `admin_edit_listing_core` =
  `07cd57b9091c3befe914e128318a6f44` (the md5 its own file records).
- `set_listing_price` (service-only, retired by DEC-335) and `admin_edit_listing_core` are each
  redeclared whole, with the same one-argument fragment. `admin_edit_listing_core` is SECURITY
  INVOKER and executable by no role; it is called from `admin_edit_listing`'s body.
- Proof: both headers and grants (`admin_edit_listing_core`: INVOKER, no role holds EXECUTE), and
  each md5 with its fragment put back.

## Which callers carry behaviour proofs, and why the others do not

`edit_my_listing` carries the door proofs (part 4); the judge is proven directly in every reach
case (part 3).
- `submit_listing` and `publish_listing` write and publish drafts. A draft holds no bought reach,
  so the judge reads its market's included reach, as part 3's no-ad and included-reach cases
  prove.
- `set_listing_price` and `admin_edit_listing_core` send the judge no places (coverage NULL), so a
  reach's caps never apply to their calls.
- `edit_listing` has no browser caller (DEC-335).

Each of these five is proven by md5: its body is its last declaration's apart from the one
argument.

## Guard lines (final tree)

- `bash scripts/check-migrations.sh`: "Real-row proof guard OK (floor 20261007000000)." and
  "Migration guard OK." (the born-closed, definer, self-marking and public-surface guards print OK
  above them).
- `bun scripts/doors/check-doors.ts`:
  - "check-doors self-test OK: 7 finding kinds fired on their planted fixtures, the clean pair
    fired nothing";
  - "check-doors static OK: 266 manifest lines reconcile with the migrations' catalogue". There
    are no manifest changes: the resolver and the judge are service-only, and `promote_options`
    keeps its refusals. Its manifest line reads `listingNotFound,listingNotPlaced,marketNotSet`,
    the same refusals as before.
- `bunx vitest run scripts --maxWorkers=2` (outside the sandbox): 491 passed, 1 failed — NH-6
  (`scripts/ci/nightly-hour.test.ts`), the known macOS limit, as at stop 1. A sandboxed run
  also failed `executor-hooks.test.ts` and GW-3, which need git temporary repositories; both
  pass outside the sandbox.
- `bun run db:proof --fresh` (last line, final tree): `db:proof PASS — applied 424/424, CLI
  2.120.0, cold, 53 s`.
- Planted-red controls (not committed). One wrong expectation per run; each file was rebuilt from
  its template after:

  | Part | Planted change | db:proof stopped with |
  | --- | --- | --- |
  | 1 | the trim expects to remove city 2 | "part 1 proof (d): the trim over the included caps answered {…}" |
  | 2 | the offered row expects `notOffered` | "part 2 proof (c): the offered row differs ({…"availability": "available"})" |
  | 3 | the second country expects no refusal | "part 3 proof (b): a nationwide ad's second country was not refused (…coverageExceedsPlan:country…)" |
  | 4 | the dial expects no move | "part 4 proof (b): the refused edit's dial moved by other than one" |

  Each message begins "P-2 (c) M-3b". The fresh run on the restored files is the PASS above.

## Decisions taken inside the rulings, for the supervisor's reading

1. **The judge's new argument is `p_listing_id uuid DEFAULT NULL`, trailing.** While parts 3–6
   are applied, any caller still sending seventeen arguments resolves to the new function and is
   judged as a new ad, by the places' market's included reach. The same DEFAULT means the generated
   types make it optional (rule 30).
2. **DROP + CREATE happens in one block.** A name-keyed census sees no overload window.
3. **The market rule.** The resolver's market (and the trim's) is the least country of the ad's
   places (`min(country_code)`), the judge's `v_market` rule. With no places, it is the default
   row. `set_listing_reach` and `promote_options` price by the ad's `location_id`'s country, as
   before. The two agree whenever the primary place is in the least country, which is every
   one-country ad.
4. **The trim reads the market's included reach, never the resolver.**
   `designation_sweep_core` trims before it clears the bought reach (20261105080106:122, then
   :126). The resolver would still answer the bought reach at that moment.
5. **The judge raises `unknownReach` when the reach key has no reach row.** The old read of a
   missing `coverage_plans` row left the caps NULL and refused nothing (a phantom success). Every
   market row's `included_reach` and every bought `reach` is a reach row today.
6. **`set_listing_reach` stays as it is, and is a K2 line (below).** The trim and
   `promote_options` are already the two redeclarations beyond the six.
7. **The seller-names guard and the judge.** Part 3's CREATE names the judge by
   `format('… FUNCTION public.%I(…', 'validate_listing_draft', …)`, with a comment saying why.
   `scripts/conformance/seller-names.test.ts`'s `latestBodies` reads any
   `CREATE … FUNCTION <name>(` text as a declaration, and it does not blank DO blocks. Written in
   the earlier files' plain form, it took the format template (`%s`) for the judge's body and
   failed SPA-10a: "seller-names-allowlist.txt:14 stale allowance: validate_listing_draft". The
   live judge still reads the caller's own name, so the allowance stays true. With `%I`, the guard
   reads the judge's declared text (20261103040808) as before; it passes. See finding 2.
8. **Not carrying M-3c-a.** This stop retires nothing: `seller_plan`, `plan_caps`,
   `plan_photo_cap`, `admin_set_coverage_plan` and `coverage_plans` stay, and their readers outside
   the judge are listed under K2.

## Questions for the supervisor

1. **The dial on a refused edit.** Ruling 3 asks that a city ad over its cap be "refused with
   nothing written (rows, revisions, audit, dial — the PP-6 pattern)". `edit_my_listing` spends
   its `revise` dial before it calls the judge (`rate_gate('revise')`, 20261019115951 :136), and
   it answers a refusal as a value (`RETURN v_val`), so the dial's count stays spent. The same
   order holds in `submit_listing` (:461, `draft`) and `publish_listing` (:45, `post`). Part 4's
   proof therefore pins what the door does today: everything else is unchanged, and the dial rose
   by exactly one. Moving the dial after the judge would change four doors' order beyond ruling
   3's changes, so I did not make it. Should the dial move (a new part, or M-3c), or does the proof
   stand as written?
2. **The market of a place change.** The judge reads an existing ad's reach through the resolver,
   whose market comes from the places stored before the call, not the places being sent. Two
   cases differ from "the market the sent places give":
   - a draft's first send of places at step 6, where nothing is stored yet, is judged by the
     default row's included reach;
   - an edit that moves an ad's places to another country is judged by the old country's included
     reach.

   On today's seeds both answer `city` (the default and every market row include `city`), so no
   test or seller sees a difference yet. Should the resolver take the market from the call
   (for example `listing_effective_reach(uuid, p_market char DEFAULT NULL)`, the judge passing
   `v_market`), or does the stored-places rule stand?

## K2 — the same concern outside this stop

- `set_listing_reach` (20261104153959:59–64) computes the ad's current reach inline:
  `coalesce(v_row.reach, v_market.included_reach)` over its `location_id`'s country. This is a
  second resolver; it is for M-3c-b.
- `listing_places_trim` (part 1, file line 78) repeats the resolver's market subquery: the least
  country of the ad's places. It cannot call the resolver (decision 4).
- `promote_options` prices by the `location_id` country (20261106233808, unchanged) while its
  `reach` comes from the resolver (decision 3).
- Plan-seam readers left for M-3c-a: `get_posting_schema` no longer reads the seam (M-3a). The
  judge and the trim leave it in this stop. `seller_plan`, `plan_caps`, `plan_photo_cap` and
  `admin_set_coverage_plan` remain, with the route's `planPhotoCap` (step 3).

## Findings

1. NH-6 (`scripts/ci/nightly-hour.test.ts:99`) cannot pass on macOS; pre-existing, outside scope,
   already ruled.
2. `scripts/conformance/seller-names.test.ts` `latestBodies` (its lines 24–33) reads a computed
   insertion's `format('CREATE … FUNCTION <name>(%s) … AS $tag$%s$tag$')` template as the
   function's latest body. Since 20261105080108 (and again in part 4), it sees `edit_my_listing`'s
   body as `%s`, as it does for the eight import doors written that way in 20261029022748,
   024207, 024340, 024420, 024515 and 024619. None of these reads a name
   column today, so nothing is hidden yet. A later computed insertion of a name reader would hide
   that read from SPA-10a. `plan-seam.ts`'s reader blanks DO blocks; this one does not. This is
   outside this turn's scope (a guard file); I name it for a guard turn.

## The types after the apply

`validate_listing_draft`'s `Args` gain `p_listing_id?: string`, and
`listing_effective_reach: { Args: { p_listing: string }; Returns: string }` appears. No other
generated signature changes: `promote_options` still returns `Json`, and every caller keeps its
arguments.

## Expected reds on this push

- The preflight: "STAGING BEHIND" until ethio-staging holds `20261107140500`.
- PP-7, PP-25 and PW-29, both projects, as at stop 1 (their move is step 3).
- E2E (Playwright, ethio-staging): the aggregate of the above.

Nothing in M-3b changes what a seller is allowed today: every market row and the default include
`city`, whose caps are the free plan's (M-3a's seed), and `seller_plan()` gives every seller the
free plan. `my-listings-doors.spec.ts:1194`'s over-plan edit is still refused
`coverageExceedsPlan:city`. PW-82 reads `coverage_plans`' free row, which is unchanged. Any other
red is a STOP into the chat.

## The pairing lines (in order)

apply a2a45734 → expect mark 20261107140000
apply cf82e13d → expect mark 20261107140100
apply 704f04ac → expect mark 20261107140200
apply ee072b49 → expect mark 20261107140300
apply 19c38d6c → expect mark 20261107140400
apply 0d1cd555 → expect mark 20261107140500
