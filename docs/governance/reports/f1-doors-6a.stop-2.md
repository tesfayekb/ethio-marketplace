MIGRATION — f1-doors-6a STEP 2: the staff's listing doors on the shell (nine files)
DONE: STEP 0 (578ecb774), STEP 1 (401f7473e, 5824af408), ruling 1 saved (a8c0bfa8a), Part A (b5b847f44), STEP 2 (bb027882a)
LEFT: STEPS 3–7 (a new chat, after the supervisor's ruling)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `31401802938b9b4b6409fcd9a11f9370c4e74e0a` (short `3140180`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-17T23:37:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44200138789
FILES: docs/features/doors.md
docs/governance/briefs/f1-doors-6a-ruling-1.md
docs/governance/briefs/f1-doors-6a.md
docs/governance/reports/f1-doors-6a.census.md
docs/governance/reports/f1-doors-6a.stop-1.md
docs/governance/reports/f1-doors-6a.stop-2.md
roadmap.md
scripts/conformance/perm-vocabulary-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/doors/manifest.txt
scripts/doors/step-ups.ts
scripts/public-surface-allowlist.txt
supabase/migrations/20261118012100_bc29ea76-91c8-4bef-b10a-43631dce3928.sql
supabase/migrations/20261118012200_8af8d6de-451a-42f7-9f4a-6d34dcd7cdc5.sql
supabase/migrations/20261118012300_6aaba954-b8be-45af-9441-2568fa79849b.sql
supabase/migrations/20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql
supabase/migrations/20261118012500_f28efa6b-af25-4885-a95e-c9651318213a.sql
supabase/migrations/20261118012600_f4b5a77e-d92d-434c-b464-faed97296c53.sql
supabase/migrations/20261118012700_dcd3867e-e839-4780-8308-6bb9a66bf0b8.sql
supabase/migrations/20261118012800_2fd5e6a5-1831-4de4-abee-3ae5c55be1ea.sql
supabase/migrations/20261118012900_14117b17-8154-4c64-8cb3-0c1750236627.sql

## CI read at this stop

The lane's last run (above, on stop 1's commit 3140180) and dev's last run (385003b, run 44204012123,
FAILURE) are red on ONE job each: "Dependency vulnerability audit (enforcing on high/critical)". Every
other job of the lane's run is green (its lanes skipped: the code tree was proven by run 44115771373);
dev's e2e record says its lanes passed. A local `bun audit` at this commit names one high advisory,
in `picomatch`, reached only through build and test tooling (vite, vitest, eslint, the TanStack
plugins). It is not this lane's: the same red stands on dev, and its fix is a package change, which
rule 50 makes its own turn. Not fixed here; named for the supervisor (decision 14). Logs read:
`ci-status.md` (dev and the lane), dev's `guards-last-failure.md` and `e2e-last-failure.md`, the lane's
`e2e-last-failure.md`. Not read: the run logs themselves.

`origin/dev` is 385003bd1 (Lovable's pull request #63). Since the base 143027fac it changed
`docs/generated/i18n-usage.json`, `public/i18n-usage.json`, `scripts/route-budgets.mjs`,
`e2e/ad-page.spec.ts`, `src/features/ad-page/save-intent.ts` (+ test), `src/routes/l.$slug.tsx`: no
migration, and none of these files is touched by this turn so far. The two usage maps and the route
budgets are files STEP 3–5 regenerate or may touch (brief PREVENTION (8)): the operator merges dev
into the pull request first.

## The files, in order

The order (brief PREVENTION (5), census "The order of the files"): the cores, then the SQL callers,
then the doors and readers. Each file's pre-check reads the previous mark and the live md5 of every
body it redeclares (chr(13) stripped), and refuses to apply otherwise.

| # | file | sha256 | mark | objects |
|---|---|---|---|---|
| 1 | `20261118012100_bc29ea76-91c8-4bef-b10a-43631dce3928.sql` | `7bc9c6c9331c30ff4098a02d00f9dc276f6b7763284552cd618655dac52a32b9` | 20261118070000 | redeclares `admin_allow_listing_photo_core(uuid)`, `admin_review_photo_change_core(uuid)`, `admin_move_listing_core(uuid,text,text,text)`, `admin_edit_listing_core(uuid,jsonb,text,text)` |
| 2 | `20261118012200_8af8d6de-451a-42f7-9f4a-6d34dcd7cdc5.sql` | `4450cc7881e976498fdf757ec6cbc3b5def55f3d84fc7d2b6b247f91a5fb996b` | 20261118070100 | redeclares `admin_undo_listing_edit(uuid,timestamp with time zone,text)` |
| 3 | `20261118012300_6aaba954-b8be-45af-9441-2568fa79849b.sql` | `63837e3664f4bf3ab885060c6f9f7cbc5880d0798de369108ef23da615c4e7c6` | 20261118070200 | redeclares `admin_allow_listing_photo(uuid)`, `admin_review_photo_change(uuid)` |
| 4 | `20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql` | `7aa826b317bc95803185dd31afbf9ad203d7bce7224055ee9cb81a33297caa95` | 20261118070300 | redeclares `admin_move_listing(uuid,text,text,text)`, `admin_edit_listing(uuid,jsonb,text,text)` |
| 5 | `20261118012500_f28efa6b-af25-4885-a95e-c9651318213a.sql` | `b9b3555996e93315399659b6804f4defa5c46ee35a0f3887d3119cc9b158ee0d` | 20261118070400 | redeclares `admin_set_listing_tier(uuid,text,text,text,integer)`, `admin_set_listing_policy(boolean,integer)` |
| 6 | `20261118012600_f4b5a77e-d92d-434c-b464-faed97296c53.sql` | `ec20310dffec9538a49c29b9082bcd12171f8027c56f209443ab19c525e5c2fc` | 20261118070500 | redeclares `transition_listing(uuid,text)`; creates `admin_review_listing(uuid,text)` |
| 7 | `20261118012700_dcd3867e-e839-4780-8308-6bb9a66bf0b8.sql` | `989ebb6e2082c3424389da4aa5f1d0b4404aed35f18dcddb4803940a451f9988` | 20261118070600 | inserts the permission `listings:reveal` and its grants; redeclares `admin_reveal_listing_contact(uuid,text)`, `admin_name_check_clear(uuid,text,text,text)` |
| 8 | `20261118012800_2fd5e6a5-1831-4de4-abee-3ae5c55be1ea.sql` | `e2bed4b9badbd57619f7d06c65da0df36107d0289eed4b2799ca8884d3c29a2d` | 20261118070700 | redeclares the two filtered readers `admin_list_listings(…10 args)`, `admin_screening_facts(uuid)` |
| 9 | `20261118012900_14117b17-8154-4c64-8cb3-0c1750236627.sql` | `68a228720bcece2a8de3102bf7dece36d3ccd803ce48d27b1e1193598f65b430` | 20261118070800 | redeclares the six global readers `admin_listing_certifications(uuid)`, `admin_listing_detail(uuid)`, `admin_listing_reports(uuid)`, `admin_name_check_list(timestamp with time zone,uuid,integer)`, `admin_name_check_summary()`, `admin_open_report_counts(uuid[])` |

Part 1's pre-check reads the ledger's newest mark 20261117060500 (`20261117040800_ffe4d0a8…`, the
newest file at the base; dev added no migration since); each later part reads its predecessor's mark.
The marks follow rule 30's value: the commit bb027882a was made at 05:51 UTC, so 07:00 for part 1 and
+100 per part.

Proofs each file carries (one `DO` block, scratch rows only — scratch countries XZ/XY, `e2e-mig-`
accounts, scratch roles, levels and listings — ending on a sentinel exception that rolls everything
back):
1. (a) catalog facts of the four cores (VOLATILE, SECURITY INVOKER, no browser grant); (b) the cores'
   own gates as codes, raised; (c) an enforcer's move through the core moves the ad and spends no dial.
2. (a) catalog facts; (b) the gates, with status codes; (c) each code with every earlier check
   cleared, 400, nothing written; (d) an edit and its undo; (e) staff_moderation counted once per call
   past the gate, every refusal metered.
3. The same (a)–(e) over both photo doors: reviewGone, ownListing, changeGone; a reviewer without a
   fresh factor refused stepUpRequired on both (DEC-401).
4. The same over the move and the edit, plus scope: a country enforcer XZ edits an XZ ad, is refused
   `permissionDenied:scope` on an XY ad and on any move; the move spends no `revise`.
5. The same over the tier and the policy; the policy singleton is parked on known values inside the
   rolled-back block (DEC-350), and the tier proof uses two scratch levels, so no real row's value is
   an expectation.
6. The review door's gates and codes (`badValue:status`, `illegalTransition:active-held`,
   `ownerOnly:closed-active`); `transition_listing` refuses a person, a reviewer, an enforcer and a
   missing ad `notYourListing`; the reviewer approves through the new door; the seller closes their
   own ad; the service role pauses one with no dial.
7. (a) `listings:reveal`: no second factor, assignable, its description; every role holding
   `listings:review` holds it, including a scratch role granted review before the grant statement
   ran; (b)–(e) the reveal's and the clear's gates, codes, success and tallies (`review_reveal` for
   the reviewer and for a holder with no factor, who reveals: D129 kept).
8. (a)–(e) for the two filtered readers, with scope: a country holder lists only its country's ads and
   reads only its country's facts (`listingNotFound` otherwise); nothing spent or metered.
9. (a)–(d) for the six global readers: a country holder is refused `permissionDenied:scope`; a global
   holder with no factor reads; `listingNotFound`, `badSize` (none; 101); nothing spent or metered.

```
db:proof PASS — applied 514/514, CLI 2.120.0, cold, 52 s
```

That is `bun run db:proof --fresh` on the committed files with their final marks: one fresh stack
applying every migration of the repository, these nine included, so every file's proof ran in it.
Each file had also passed alone, cumulatively, while it was written.

pre-stop scan: 7 of 7, bc29ea76 8af8d6de 6aaba954 64aca671 f28efa6b f4b5a77e dcd3867e 2fd5e6a5 14117b17
(1–3: each file applies on the fresh stack, its seed rows after their columns, its scratch keys within
their CHECKs — the level key `e2e_mig_lw_<8 hex>` within `^[a-z][a-z0-9_]{1,31}$` — and its literals of
their parameters' types; 4: no expectation reads a real row — the only reads of real tables are the
refusals to run when XZ/XY exists, and part 5 parks the policy singleton; 5: each proof draws one
`gen_random_uuid()` text and derives its keys; 6: every pre-check reads the previous mark and the md5
of every body it redeclares (two literals per body: previous, new); 7: every md5 compares
`replace(prosrc, chr(13), '')`, and the spanning-literal guard below passes.)

`bash scripts/check-migrations.sh` (exit 0) — its guard lines:

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard self-test OK (a grant whose object a later file drops is no offender; without the drop it is).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Spanning-literal guard self-test OK (the bad fixture is refused, the good one passes).
Spanning-literal guard OK (floor 20261109000000).
Migration guard OK.
```

`bun scripts/doors/check-doors.ts`: `check-doors self-test OK: 10 finding kinds fired on their planted
fixtures, the clean pair fired nothing` / `check-doors static OK: 260 manifest lines reconcile with the
migrations' catalogue`. `bun run typecheck` and `bun run lint` pass; `bunx vitest run scripts
--maxWorkers=2`: 123 files, 649 passed, 1 skipped. `bash scripts/check-listing-writes.sh`: findings 0.

## The pairing lines

```
apply bc29ea76 → expect mark 20261118070000
apply 8af8d6de → expect mark 20261118070100
apply 6aaba954 → expect mark 20261118070200
apply 64aca671 → expect mark 20261118070300
apply f28efa6b → expect mark 20261118070400
apply f4b5a77e → expect mark 20261118070500
apply dcd3867e → expect mark 20261118070600
apply 2fd5e6a5 → expect mark 20261118070700
apply 14117b17 → expect mark 20261118070800
```

The proofs' first run on a shared database is the staging apply.

## Why no caller meets a returned refusal

- The cores (file 1) RAISE their codes (`door_refuse`, P0D01); they never return a refusal. Their only
  callers are this family's doors and the undo. Until a door is on the shell, the P0D01 reaches
  PostgREST as an error whose message is the code. Once a door is on the shell, the shell turns the
  code into the one answer (`door_refused`, its status code).
- The undo (file 2) calls the edit CORE inside its own shell, so an edit-core code becomes the undo's
  answer. No SQL function calls the undo.
- `transition_listing` (file 6): since F1-5a every live SQL caller goes through
  `transition_listing_core`. The latest `resume_listing` (`20261115203700_3e9620aa…:122`), the latest
  `designation_sweep_core` (`…:147`) and the move core (file 1) all call the core. The other
  `PERFORM public.transition_listing(` hits in `supabase/migrations/` are proofs or superseded bodies.
  The new door calls the core and is called by no SQL function.
- The doors on the shell (files 2–7) are called only by the browser services in `src/features/` and
  by e2e. The readers (files 8–9) are not on the shell: `staff-reader` lets P0D01 rise as an error.
- The returned answers the ruling keeps (§6) stay returned at 200: the edit's seller refusals (the
  `validate_listing_draft` answer), the reveal's `notShown`, the clear's `stale`.

## Every redeclared body: previous md5 → new md5

The previous md5s are the live bodies the census read (`bodies/`, the supervisor's staging read of
2026-11-17 equal to them, ruling 1); the new md5s are this commit's bodies, each checked by its file's
post-check on the proof stack.

| file | function | previous | new |
|---|---|---|---|
| 1 | admin_allow_listing_photo_core | 04b61455ec2985e302ab9474b02b38ea | 4f5c45441d844fb9eb7634f5c82b2a76 |
| 1 | admin_review_photo_change_core | 93e1798802419e4a8b9a9e436d9805ef | a7cd2532d0a88ce3c1995e1ed1707f93 |
| 1 | admin_move_listing_core | 403c8acf9fa61ebe3dd3a87676ddba53 | c5d16cb19ada2a87bc88df3dfa45ec98 |
| 1 | admin_edit_listing_core | 5afb24b3a7aaa4bc0b08e3c6bb400014 | 91f8926e5c94cc2a56d14f06731ab8b7 |
| 2 | admin_undo_listing_edit | ca70dc4662e277b6040246a4c2428eae | 18889bb0edaf177e4a0e8acce2459eb9 |
| 3 | admin_allow_listing_photo | 9f5b886f04da4fcfb9df0dfaa5ee7518 | 9f5c856e1af165ead24b31da2f678f7a |
| 3 | admin_review_photo_change | a51ff98a20f550365c5e39ae8646a39e | 1a2128b78faff0b67d2d8737ce1acf9c |
| 4 | admin_move_listing | 759b06a21541fe7b7a9c55daaa6a05b9 | ae6ec4a71c3a8b0e602ffd185eebd503 |
| 4 | admin_edit_listing | aa0fa15263cb1d903fb29d6d25b6e0ba | 315d2d2c8c32de07802e10e37719fe31 |
| 5 | admin_set_listing_tier | 93aad2bb17b61bbdac3f3ba886d81861 | b5a0eeee1f4cb8e74bd750ecc4a9f9da |
| 5 | admin_set_listing_policy | a2f41e81addb52bd99550cc57931b6d1 | 5d7b315fb6fb57bd115ac46f942323f1 |
| 6 | transition_listing | 162b76e76b15eb016f0cbb5d0a2629da | 7bd2fb3ba90fca00b806d82e1619ba41 |
| 6 | admin_review_listing | (new) | 3680b277e612ee5a8c29843be78b28e8 |
| 7 | admin_reveal_listing_contact | 5b65091cbf005c3e825f233d10bcf983 | 61aaa18012b7b36eda9b3b000af60946 |
| 7 | admin_name_check_clear | 533ef73c75df3e7563f664731981dc8f | f11f36b3c22e3221f9a11cc1157da9ff |
| 8 | admin_list_listings | 05a60d67383ba629298d497c65afe6ab | ec92e6b6d2453d53a24fb9622f9ec9d7 |
| 8 | admin_screening_facts | 82067755383e42a9b344edc3888fac0f | e76530247270677fd16020c762fedaef |
| 9 | admin_listing_certifications | 0c2c2d7b46c5c7cd07ee69cade2c5139 | ce25e449941e3954ac440eceb3643e2a |
| 9 | admin_listing_detail | 3bf9681c1ea9b072c5974d28812bc1dc | bc064c03d395a6b26ea1953f4de0f562 |
| 9 | admin_listing_reports | e03c16828dbaa3b5bf44b90e92f5d629 | 2364e8acbabebf70ada6ce6c680c8446 |
| 9 | admin_name_check_list | b98d555a96d8b8928c4d03ec026737e9 | ab24f20bf4a8e06801abb86fe6aa2d29 |
| 9 | admin_name_check_summary | e8f5a9307894d3d743618af43d5668af | adae2b5cf2860813cef052e8d9ac76a0 |
| 9 | admin_open_report_counts | 529ec4553039d0320a8aeeeb18bbbb05 | e136f99f7e2e2bba8f0443eff7039560 |

File 6 also checks `transition_listing_core`'s live md5 (8281cf2f…) as the body the new door calls; it
does not redeclare it. Each body was diffed against its previous text: the changes are only the gates
moved to `door_context`, sentences to codes, the shell, and the named changes of ruling 1 (§4 the move
core's `rate_gate('revise')` gone; §7 the tier's step-up before its validation; §3 the owner-only
`transition_listing`). The readers are generated from their live text by named, exactly-once
replacements.

Dropped and re-created functions: none. Every body is `CREATE OR REPLACE` with an unchanged signature
and return type, so no grant needs restating for a drop. Each file still restates its functions'
`REVOKE … FROM PUBLIC, anon` and `GRANT EXECUTE … TO authenticated, service_role` as its closers.

## The new door

```
public.admin_review_listing(p_listing_id uuid, p_new_status text) RETURNS jsonb
  LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path = public
  EXECUTE: authenticated, service_role (REVOKE ALL FROM PUBLIC, anon)
```

It calls `door_context('staff','listings','review','staff_moderation',NULL,'global')`, then refuses
any `p_new_status` outside `active`, `reduced`, `rejected`, `held` with `badValue:status`, then calls
`transition_listing_core`. Its answer on success is the core's `{"ok": true, "status": <p_new_status>}`;
a refusal is `door_refused('admin_review_listing','staff_moderation',…)`. The client types need the
new function (the supervisor's patch, ruling 1 §3).

## String keys

One new key, not yet in the tree: `admin.roles.perm.action.reveal`, English "Reveal" (ruling 1 §1).
Its Amharic comes from the supervisor. Until both land together in STEP 3, CF-PERM-1 holds a dated
allowance: `action:reveal | … | 2026-11-30` in `scripts/conformance/perm-vocabulary-allowlist.txt`. The
permission row's English description: "Reveal a screened listing's contact" (siblings' form).

## Cells changed, with cell-meaning

- `admin_reveal_listing_contact(uuid,text)`: the permission is `listings:review` → `listings:reveal`;
  the step-up stays `none:D129` (DEC-400). Meaning: it shows one seller's number to a reviewer who
  calls about an ad, a few times an hour. D129: reading a number to call the seller during review asks
  for no second factor. `listings:reveal` declares `requires_step_up = false`, so `door_context` keeps
  the opt-out by construction, and Part A's check holds it. `review_reveal` (60/h) still rations
  access to private contact data.
- `admin_review_listing(uuid,text)` (new): `staff | listings:review | row | staff_moderation | global`.
  Meaning: approving or rejecting an ad puts it in front of buyers, a review decision that asks for a
  second factor, as the core's reviewer branch did. A reviewer working the queue decides 100–200 ads an
  hour (bulk Approve, D128). The seller's `revise` (120/h) refused that work; `staff_moderation`
  (600/h) holds it.
- `transition_listing(uuid,text)`: the codes cell is `- → notYourListing`; the dial stays `revise`,
  now spent by the owner (and passed by the service role) only.
- The codes cells, `-` → each door's own `door_refuse` codes (the judge's rule): the undo
  (listingChanged, listingNotFound, nothingToUndo, photoRemovalFinal), the tier (badDays, badValue,
  listingNotFound, listingRemoved, noteRequired, noteTooLong, nothingChanged, ownListing), the policy,
  the clear and the review door (badValue), the reveal (badValue, listingNotFound), the list
  (badValue), the facts and the detail (listingNotFound), the report counts (badSize).
- No dial, step-up or class cell otherwise changed. Two bodies now keep cells they did not keep
  before. The photo-change review checks `row` (DEC-401, INC-1195). The undo and the name-check clear
  spend the `staff_moderation` their lines already named. The move spends it once (its core's
  `revise` gone, ruling 1 §4).

Allowances added, each dated: `grant-without-caller admin_review_listing(uuid,text)` in
`scripts/doors/check-doors-allowlist.txt`, until 2026-11-30 (no tree code calls it until STEP 3 moves
the screening console). The stop-1 allowance `opt-out-over-step-up admin_reveal_listing_contact` is
removed: the line now names `listings:reveal`. DOORS-11 gains `tree("listings:reveal") === false`.
The public-surface line for `admin_review_listing` (its `authenticated` grant) is added.

## The census the ruling asked for (§3): no enforce transition through transition_listing

```
rg -n "transition_listing" src e2e --glob '!src/integrations/supabase/types.ts'
```

The browser code: `src/features/admin-screening/use-screening.ts:242` (`decideListing`, `"active" |
"rejected"` only, used by `screening-page.tsx:441` and `admin.listings_.$listingId_.edit.tsx:88`) and
`src/features/my-listings/my-listing.ts:315`, `:322`, `:340` (the owner's own ads). The remaining hits
are three comments (`admin.screening.tsx:10`, `screening-page.tsx:77`, `admin.listings_.$listingId_.edit.tsx:41`)
and e2e: service-role calls (`adminClient()`), owners on their own ads (`my-listings-*.spec.ts`,
`legal-certify.spec.ts`, `admin-listings.spec.ts:615` (AL-8: the owner's `enforcementOnly`, unchanged),
`:2378`, `:2389`), PR-28's owner dial, and SC-4/SC-16 (`admin-screening.spec.ts:287`, `:306`). No
browser caller sends `removed`, or `removed` → `screening`, through `transition_listing` as staff; the
enforcer's moves go through `admin_move_listing`. No second door (`admin_enforce_listing`) is built.

## The reds expected on this push, until STEPS 3 and 4

CI's temporary backends apply these files, so:
- Sentences that become codes (the census's `tests` item): AL-2, AL-3, AL-4, AL-7, AL-8 (the severe
  sentence → `severeRestore`), AL-9, AL-12, AL-16, AL-27, ATR-2, ATR-3, ATR-7, AP-28, SC-8, SC-9, SC-10,
  SC-23 (its seller's call), ML-10.
- The screening console's decisions still go through `transition_listing` and are refused
  `notYourListing` (DEC-402): SC-12, SC-14, SC-18, SC-23, SC-25 and SC-26. SC-16 also goes red: a
  reviewer is now refused `notYourListing` before step-up is asked, so it moves to the new door. SC-4
  (`not.toBeNull`) and SC-19 (the service role) stay green, and move to the new door in STEP 3 as the
  ruling says.
- SC-17: its scratch role holds `listings:review` only, so the reveal is refused `permissionDenied`
  until STEP 3 grants the scratch role `listings:reveal`. Roles given review after the apply are not
  given reveal (ruling 1 §1, a Departure).
- The smoke lane's acceptance-doors guard: `admin_review_listing(uuid,text): missing acceptance check
  and allowance` (decision 10).
- The E2E preflight reports STAGING BEHIND until ethio-staging holds 20261118070800.
- The dependency audit's red, already on dev (decision 14).

## Decisions for the supervisor

1. The review door's scope is `global`. The alternative is `match` on `listings.home_country_code`,
   consistent with the facts reader's `filter`. With `global`, a country-scoped reviewer is refused
   `permissionDenied:scope` on every decision; no such grant exists before the Ops phase (DEC-380).
2. A reviewer who is also the seller can approve their own ad: through the new door (it has no
   `ownListing` check) and through `transition_listing` (their own ad passes `notYourListing`, and
   the core's reviewer branch asks only `listings:review` and step-up). This is unchanged from today.
   Should the review door refuse `ownListing` as the move and the edit do?
3. Between the production apply and the Publish, the published screening console still calls
   `transition_listing` and is refused `notYourListing`. The apply and the Publish go together.
4. The service role passes `door_context` with no gate and no dial, so it now reaches the doors that
   have no core of their own (tier, policy, reveal, the clear, the review door, the undo's own checks)
   with an audit actor of NULL. No service caller exists today.
5. The reveal's `badValue:channel` now comes after the dial (door_context spends first), so a bad
   channel spends one `review_reveal`.
6. The six global readers narrow a country-scoped viewer: `permissionDenied:scope` where it read
   everything before (ruling 1 §5 named this for the list and the facts).
7. The scope column is `listings.home_country_code` (edit `match`; list and facts `filter`).
8. The cores keep their own gates as codes, so a core applied before its door (or called by the undo)
   still refuses a caller who lacks the permission. The doors repeat them. This is apply-order safety.
9. Files 1, 5 and 7 are 30.1, 29.2 and 28.8 KB, above rule 30's ~25 KB split line. Each is one
   concern (the four cores; the level and policy pair; the reveal permission with its two doors).
   Recent landed files are 30–36 KB.
10. A file outside SCOPE: `scripts/acceptance-doors-allowlist.txt`. AGENTS.md's law (a signed-in write
    door checks acceptance or has its line) and CI's live acceptance-doors guard need a line for the
    new door. SCOPE (brief, ruling 1 §3) does not name the file. The proposed line, not written:
    `admin_review_listing(uuid,text) | staff | Screening decisions through transition_listing_core,
    whose status writes pass acceptance_guard; listings:review with a fresh second factor (DEC-402)`.
11. Stale reasons in lines whose grants this turn does not change (K2, outside the scope clause, not
    touched): `scripts/public-surface-allowlist.txt:22` (`transition_listing`: "owner, reviewer and
    enforcer checks inside"), `:52` (`admin_reveal_listing_contact`: "listings:review"), and
    `scripts/acceptance-doors-allowlist.txt:41` (the reveal: "rejects callers lacking listings:review").
12. `rateLimited` is re-counted by `door_refused` (it is not among the gate codes it skips), so a
    rate-limited call spends one more unit of its dial. The reveal's proof counts it (review_reveal 2
    for the holder with no factor).
13. Part A's form is (a): inside `scripts/doors/check-doors.ts` (`step-ups.ts` reads each permission's
    newest declared `requires_step_up` from the migrations), proven by DOORS-11 on a planted line and
    wired in `wired.test.ts`. The permissions it reads need no list and no allowlist line.
14. The red on dev and on this lane's last run is the dependency audit (one high advisory in
    `picomatch`, build and test tooling only). Fixing it is a package change, its own turn (rule 50).
    It is not touched here.

## Records (word for word, numbers assigned by ruling 1)

DEC — DEC-400: the reveal of a seller's contact during review is its own permission, `listings:reveal`
(`requires_step_up = false`, assignable), granted by set at the apply to every role holding
`listings:review`; `admin_reveal_listing_contact`'s line names it and keeps `none:D129`.
DEC — DEC-401: `admin_review_photo_change` asks `listings:review`'s second factor (`row`), through
door_context on the shell.
DEC — DEC-402: the reviewer's screening decisions go through the staff door `admin_review_listing`
(`listings:review`, `row`, `staff_moderation`), which calls `transition_listing_core` with the review
transitions only; `transition_listing` is the owner's and the service role's alone.
INC — INC-1195: the defect is that `admin_review_photo_change`'s manifest line promised row step-up and neither the door
nor its core checked it; its class is INC-1158's (a manifest cell true by its shape and not by its
body); the mechanism is door_context on the shell, which keeps every staff `row` cell by construction
once the family has moved, plus Part A's check for the `none:` side.
