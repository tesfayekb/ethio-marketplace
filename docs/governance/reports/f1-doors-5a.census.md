# f1-doors-5a — the census (STEP 1)

Base: dev bdb2fc555 (the merge of pull request #49); the lane began from `origin/dev` bdb2fc555, so `<BASE>` and
`<HEAD>` are equal (read again at the census's end: `git rev-parse origin/dev` = bdb2fc555). CI on bdb2fc555:
SUCCESS (ci-evidence `ci-status.md`, completed 2026-11-15T19:38:27Z, run 43753052995). Every reading below is of
that tree.

How each reading was made (scratch tools under `/tmp/ethio-scratch/f1-doors-5a/`):

- **Bodies** — the last literal declaration of each function by a scratch reader over `scripts/doors/catalogue.ts`
  (`census.ts` → `census.txt`, `mech.ts`); `edit_my_listing`'s LIVE body rebuilt from its computed declarations
  (`rebuild-eml.ts`: the literal body of 20261019115951:93, then the two fragments of 20261105080108 and the
  fragment of 20261107125359:60, applied in file order).
- **md5 on the local proof stack** — a scratch probe migration (`probe.ts`; never committed; removed after the
  run; `git status --short` empty afterwards) made `bun run db:proof --fresh` raise
  `md5(replace(prosrc, chr(13), ''))`, the length, the volatility, the security, the return type, the ACL and the
  `proconfig` of every function of the family and of every function its bodies reach (57 functions), every
  function / policy / view naming a family door, the triggers on the tables the bodies write, every `cron.job`,
  and the nine posting dials' rows. Output: `probe.txt` (its sections are pasted in the appendix).
- **Callers** — every quoted door name under `src/`, `e2e/`, `scripts/` (`callers.txt`, 261 hits); SQL callers by
  a call-form reader over every function's last declaration (`sql-callers.ts`) and by the probe's word-boundary
  scan of every live `prosrc` (which also catches comments; each probe hit is resolved below).

## consumers

"Line" is `scripts/doors/manifest.txt` (line number). Every door of the family today: `RETURNS jsonb` (except
`transition_listing`, `void`), VOLATILE, SECURITY DEFINER, `SET search_path = public`, EXECUTE held by
`authenticated` and `service_role` (and the owner) — read from the live ACLs, equal to the catalogue's roles. None
but `change_home_country` calls `door_context`; none but it has the shell; every codes cell is `-`. Every live
md5 below equals the md5 of the text between the dollar tags of the file named (CR stripped); `edit_my_listing`'s
equals its rebuilt live text.

"→ gate" means `door_context`'s owner form answers it: `notSignedIn` (no caller, 401), `accountDeactivated`
(403), `rateLimited` (429, the dial counted first). Every family code below is a literal `door_refuse('<code>'`
in the new body, so the judge reads it. **Reused** codes have words today; **new** codes are named in `tests` and
at the migration stop.

### The gate rows (every door that has them)

| Today (sentence or code, where raised) | Becomes |
|---|---|
| `'not authenticated'` / `'notSignedIn'` (the body's first lines) | → gate `notSignedIn` |
| `'account is deactivated'` — `assert_caller_active()` direct, or inside `rate_gate()` | → gate `accountDeactivated` |
| `'rateLimited'` raised, or `{ok:false, field:'rate', reason:'rateLimited', resets_at}` returned at 200 | → gate `rateLimited` (429; no `resets_at` — decision at the stop) |

### The family's own codes

| Sentence today | Code | Kind |
|---|---|---|
| `'listing not found'` | `listingNotFound` | reused (`DOOR_CODES`, P-2) |
| `'not your listing'` | `notYourListing` | reused (`DRAFT_REASONS`, `PHOTO_REASONS`) — the family's one ownership code (the brief's `notYours`; decision at the stop) |
| `'illegal transition: % -> %'` | `illegalTransition:<from>-<to>` | new |
| `'photo not found on this listing'` | `photoGone` | reused (`PHOTO_REASONS`) |
| `'bad position'` | `badValue:position` | reused (`DRAFT_REASONS.badValue`) |
| `'reserved is true or false'` | `badValue:reserved` | reused |
| `'only a live listing is reserved'` | `notLive` | reused (`DOOR_CODES`, P-2) |
| `'a draft is not copied'`, `'a removed or refused listing is not copied'` | `notCopied:<status>` | new |
| `'unknown step'` | `badValue:step` | reused |
| `'only a draft is writable here; a live listing edits through edit_listing'` | `notADraft` | new |
| `'nothing to change'`, `'nothing changed'` | `nothingChanged` | new (both drew `myListings.editBox.nothing`) |
| `'not editable: %'` | `notEditable:<key>` | new |
| `'a draft is written in the posting form'` | `draftNotEdited` | new |
| `'an ad in review is edited once its review is done'` | `inReview` | new |
| `'an expired listing is renewed before it is edited'` | `renewFirst` | new |
| `'this listing is not edited'` | `listingNotEditable:<status>` | new |
| `'coverage must be a list'`, `'coverage must be a list of place ids'` | `badShape:coverage` | reused (`DRAFT_REASONS.badShape`) |
| `'contact_pref must be an object'` | `badShape:contact_pref` | reused |
| `'unknown status: %'` | `badValue:status` (the caller's text is not echoed) | reused |
| `'owner only: % -> %'` | `ownerOnly:<from>-<to>` | new |
| `'reviewer only: % -> %'` | `reviewerOnly:<from>-<to>` | new |
| `'enforcement only: % -> %'` (both forms) | `enforcementOnly:<from>-<to>` | new |
| `'service only: % -> paused'` | `serviceOnly:<from>-paused` | new |
| `'a listing its owner deleted is not restored'` | `ownerDeleted` | new |
| `'a listing removed for a severe reason is restored by a super admin only'` | `severeRestore` | new |
| `'a listing rejected for a severe reason is removed by enforcement only'` | `severeRemove` | new |

Codes the bodies already raise by plain `RAISE` (P0001) and that become `door_refuse` with the same text:
`residencyUnknown`, `categoryNotFound`, `categoryInactive`, `categoryNotPostable`, `attributeNotFound`,
`pinNotEditable:<status>`, `streetTooLong:<n>`, `directionsTooLong:<n>`, `contactInNote`, `badLatitude:<v>`,
`badLongitude:<v>`, `badPrecision:missing` / `badPrecision:<v>`, `badZoom:<v>`, `photosSoonNotEditable:<status>`,
`listingNotPlaced`, `notPaused`, `notLive`, `unknownLevel`, `sameLevel` (today `USING DETAIL = tier_until` →
`sameLevel:<tier_until>`), `lowerLevel`, `levelNotAvailable`, `seasonEnded`, `notOffered`, `creditsNotAvailable`,
`unknownReach`, `includedReach`, `sameReach` (DETAIL → `sameReach:<reach_until>`), `lowerReach`.

The detail separator: `door_refused` splits the message at its first `:`; a transition's two statuses are joined
by `-` (no status holds one), so `door-error.ts`'s `REASON_CODE` (`[A-Za-z0-9_.-]` after the colon) keeps the
whole code on the routes that relay it. `sameLevel` / `sameReach` carry a timestamp (spaces, `:`, `+`): those two
doors are called from the browser only (`promote-service.ts`), never through a route.

### The doors, one by one

Returned 200 answers that stay (field-level business answers, decision at the stop) are marked "stays".

- **check_seller_alias(text)** — line 182 (`owner | alias_check`); 20261004011235:766; md5 2074df98…; 447 B.
  Gates: `'not authenticated'`, then `rate_gate('alias_check')` returned at 200 → gate. Body answers
  `alias_verdict` (`aliasTaken`, `aliasTooSoon` — stays). Callers: `src/routes/api/listings/alias.ts:62`
  (`doorCall` raw, `asRefusals(data)`); e2e through the route (PW alias ids). Return stays jsonb.
- **clear_seller_place()** — line 183 (`owner | draft`); 20261023100132:291; d84236e8…; 256 B. Gates:
  `'not authenticated'`, `assert_caller_active` → gate; no dial today → gains `draft` (THE LAWS). Deletes the
  caller's own `seller_places` row (no other row is reachable: keyed by `auth.uid()`; no ownership code needed).
  Callers: `posting-service.ts:711`.
- **copy_my_listing(uuid)** — line 184 (`owner | draft`); 20261015081040:170; c639fa13…; 3,155 B. Sentences:
  deactivated, `rateLimited` (raised) → gate; `listingNotFound`; `notYourListing`; `notCopied:draft`,
  `notCopied:removed|rejected`; `residencyUnknown` (raised → `door_refuse`). Creates the new draft bound to the
  caller after the gate (THE LAWS). Answer `{ok, listing_id}`. Callers: `my-listing.ts:663`; e2e ML-13.
- **edit_my_listing(uuid,jsonb,uuid[],text)** — line 185 (`owner | revise`); COMPUTED: literal 20261019115951:93
  + 20261105080108 (two fragments) + 20261107125359:60 (one fragment); live md5 77def52b1ce62164e8f2ee1a84af6715,
  11,748 B (its own file). Sentences: `'not authenticated'`, deactivated, `rateLimited` → gate; `nothingChanged`
  (both sentences), `notEditable:<key>`, `listingNotFound`, `notYourListing`, `draftNotEdited`, `inReview`,
  `renewFirst`, `listingNotEditable:<status>`, `badShape:coverage`, `badShape:contact_pref`,
  `streetTooLong:<n>`, `directionsTooLong:<n>`, `contactInNote`. `validate_listing_draft`'s refusals returned at
  200 — stay. Calls `legal_certify` (its P0001 codes pass, below). Callers: `my-listing.ts:639`
  (`editMyListing`: error, then `data.ok/status/review`, then `refusalsOf`), `use-edit-draft.ts` through it; e2e
  ML-11, ML-12, ML-14, MLP-5, LG-18/21/25/28, AL-5, AL-27, AL-29, PR-27.
- **get_attribute_options(uuid)** — line 191 (`owner | options_read`); 20261006225254:367; d2d32fec…; 2,669 B.
  No caller check (rate_gate lets a NULL uid through); `rateLimited` (raised) → gate; `attributeNotFound`
  (raised → `door_refuse`). Callers: `src/routes/api/attributes.$id.options.ts:39` (`auth: "user"`; reads
  `error.message.includes("attributeNotFound")` → 404, `"rateLimited"` → 429).
- **get_posting_schema(uuid)** — line 201 (`owner | schema_read`); 20261107111340:64; a1bb0e2a…; 5,322 B. No
  caller check; `rateLimited` → gate; `categoryNotFound`, `categoryInactive`, `categoryNotPostable` (raised →
  `door_refuse`). Callers: `posting-service.ts:844` (`error.message.includes("rateLimited")`); e2e AT-60 (reads
  data, holds).
- **mark_sold(uuid)** — line 222 (`owner | revise`); 20261105080108:193; b48bcfcf…; 1,320 B. Sentences:
  `'not authenticated'`, `rateLimited` → gate; `listingNotFound`; `notYourListing`; `illegalTransition:<from>-sold`.
  Callers: `my-listing.ts:307`; e2e ML-4, FSL-2, FSL-3, LG-29, PR-31.
- **move_listing_photo(uuid,uuid,integer)** — line 223 (`owner | revise`); 20261023100132:143; 6b640568…; 1,887 B.
  Sentences: `'not authenticated'`, deactivated → gate; `notYourListing` (the listing is read by id AND seller in
  one query, so a missing ad and another seller's both answer it today — kept: the query reveals nothing of
  another's ad); `photoGone`; `badValue:position`. No dial today → gains `revise` (THE LAWS). Callers: `src/routes/api/listings/photos.$id.ts:160`; e2e PP-16, LG-28.
- **publish_listing(uuid,uuid[],text)** — line 243 (`owner | post`); 20261107125359:79; 2a455cfb…; 3,318 B.
  `rateLimited` returned at 200 → gate. Sentences: `listingNotFound`, `notYourListing`,
  `illegalTransition:<from>-screening`, `listingNotPlaced` (raised → `door_refuse`); `noFreeSlot` returned at 200
  with its slots detail — stays; `validate_listing_draft` refusals — stay. Calls `legal_certify`. Callers:
  `src/routes/api/listings/publish.ts:52` (`doorCall`); e2e LG-16/17/28/29/33, LGC-3, PW publish ids.
- **remove_listing_photo(uuid,uuid)** — line 244 (`owner | photo_remove`); 20261028230748:119; 1a7ac7eb…; 1,625 B.
  Order today: `'not authenticated'`, deactivated, `'not your listing'`, `'photo not found on this listing'`, then
  `rateLimited` → the gate now comes first (the dial before the row, as every door). Codes `listingNotFound`,
  `notYourListing`, `photoGone`. Callers: `photos.$id.ts:102`; e2e LG-29, PP ids through the route.
- **renew_listing(uuid,uuid[],text)** — line 246 (`owner | revise`); 20261019115951:310; 93815d85…; 3,159 B.
  `rateLimited` (raised), deactivated → gate; `listingNotFound`; `notYourListing`; `renewNeedsExpired`,
  `renewOff` returned at 200 — stay. Calls `legal_certify`. Callers: `my-listing.ts:324` (reads
  `data.refusals`); e2e ML-7, ML-8, LG-18, LG-26, PR-29.
- **resume_listing(uuid)** — line 248 (`owner | revise`); 20261105080111:100; 858701a0…; 729 B. Raises
  `notSignedIn`, deactivated → gate; `listingNotFound` (read `WHERE seller_id = auth.uid()` → split:
  `listingNotFound` / `notYourListing`); `notPaused`. Its own body spends no dial; today `revise` is spent once
  INSIDE `transition_listing`. After: once by `door_context`, none by the core — the count per call is the same.
  `noFreeSlot` (the free-slot trigger, P0001) passes. Callers: `my-listing.ts:331`; e2e LG-33, FSL ids.
- **save_posting_identity(text,text,text,text,text,jsonb,character)** — line 252 (`owner | identity`);
  20261029092611:7; 59a766e6…; 6,801 B (its own file). Spends the dial BEFORE the deactivation check today;
  `rateLimited` returned at 200 with `resets_at` → gate (deactivation now first). Field refusals (alias, business
  name, contact, country) returned at 200 — stay. Calls `alias_verdict`, `business_name_rule`,
  `listing_contact_refusals`, `confirm_home_country`. Callers: `src/routes/api/listings/identity.ts:203`
  (`doorCall`; the cast at `:188`); e2e LG-31, PW identity ids, `e2e/helpers/posting.ts:1609`.
- **save_seller_place(uuid)** — line 253 (`owner | draft`); 20261006225254:665; e80d6843…; 1,985 B.
  `rateLimited` returned at 200 → gate; `listingNotFound`; `notYourListing`; a coverage `required` refusal
  returned at 200 — stays. Callers: `posting-service.ts:699` (reads `ok` boolean); e2e PR-37 (`{ok:true}`, holds).
- **set_cover_photo(uuid,uuid)** — line 255 (`owner | revise`); 20261023100132:107; efa88b38…; 1,333 B.
  `'not authenticated'`, deactivated → gate; `notYourListing` (one query, kept as `move_listing_photo`);
  `photoGone`. No dial today → gains `revise`. Callers: `photos.$id.ts:165`; e2e LG-28, LG-30, CG-1.
- **set_listing_level(uuid,text)** — line 256 (`owner | promote`, audit `manual`); 20261104153958:32; 91b6da31…;
  4,418 B. Its codes are P-2's (list above); `notSignedIn` and `rateLimited` → gate; reads
  `WHERE seller_id = auth.uid()` → split `listingNotFound` / `notYourListing`; its direct `audit_log` insert stays
  (audit `manual`). PERFORMs `transition_listing` when the ad is paused → onto the core. Callers:
  `promote-service.ts:239` (`promoteRefusalKey(error)`, `data.until`); e2e LDR-1/2/3, LG-33.
- **set_listing_photos_soon(uuid,boolean)** — line 257 (`owner | draft`); 20261105080108:154; c5d2c31b…; 1,501 B.
  `rateLimited` returned at 200 → gate; `listingNotFound`; `notYourListing`; `photosSoonNotEditable:<status>`.
  Callers: `posting-service.ts:1132`; e2e LG-28, LG-30.
- **set_listing_pin(uuid,numeric,numeric,text,text,smallint,text)** — line 258 (`owner | revise`);
  20261105080108:46; 34c6bdd9…; 4,184 B. `'not authenticated'`, `rateLimited` → gate; `notYourListing` (one
  query by id and seller, kept);
  the pin codes (list above). Callers: `posting-service.ts:1184/1204/1242` (`pinAnswer`: `contactInNote`,
  `rateLimited`, else failed); e2e PW-193, LG-28, LG-30, PR-30, `e2e/helpers/posting.ts:1858`.
- **set_listing_reach(uuid,text)** — line 259 (`owner | promote`, audit `manual`); 20261104153959:30; 00492e7b…;
  3,398 B. P-2's codes; split as `set_listing_level`. Callers: `promote-service.ts:251`; e2e LG-33.
- **set_listing_reserved(uuid,boolean)** — line 260 (`owner | revise`); 20261014194317:660; cb753d8e…; 1,545 B.
  `'not authenticated'`, `rateLimited`, deactivated → gate; `listingNotFound`; `notYourListing`;
  `badValue:reserved`; `notLive`. Callers: `my-listing.ts:301`; e2e ML-1, ML-2, ML-3, MLA-2, MLP-5, LG-28, PR-45.
- **submit_listing(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamptz,uuid[],jsonb,
  integer,boolean)** — line 263 (`owner | draft`); 20261107125400:36; e39338a4…; 6,299 B (its own file). Order
  today: `'not authenticated'`, deactivated, then `rateLimited` returned at 200 → gate. `badValue:step`,
  `listingNotFound`, `notYourListing`, `notADraft`; `residencyUnknown` returned at 200 and
  `validate_listing_draft`'s refusals — stay. The two trailing arguments keep their defaults. Callers:
  `src/routes/api/listings/draft.ts:154` (`doorCall` with `translate`; casts `:124`, `:133`); e2e AU-5, LG-30,
  every PW id through the route.
- **suggest_seller_aliases(text,text,text,uuid)** — line 264 (`owner | alias_check`); 20261004055007:190;
  4a3b149e…; 3,381 B. `rateLimited` returned at 200 → gate. Callers: `alias.ts:69`.
- **transition_listing(uuid,text)** — line 265 (`staff | authenticated | listings:review | row | revise | - |
  global | guarded`); 20261104124958:37; bddd751f…; 9,553 B (its own file); `RETURNS void` → `jsonb` (DROP +
  CREATE, grants restated). Body today: `badValue:status`, `listingNotFound`; with a caller: deactivated,
  `rate_gate('revise')` raising `rateLimited`, then owner / reviewer (`has_permission listings:review`) /
  enforcer (`listings:enforce`), else `notYourListing`; then the path codes `ownerOnly`, `reviewerOnly` (with
  `require_step_up_if_needed('listings','review')`), `ownerDeleted`, `enforcementOnly`, `severeRestore`
  (step-up `listings:enforce`), `serviceOnly`, `severeRemove`, `illegalTransition`. `v_service := (uid IS NULL
  AND role IS DISTINCT FROM 'anon')`. Callers: `my-listing.ts:310/317/335`, `use-screening.ts:242` (throws on
  error, ignores data); e2e ML-1/2/6, MLA-1/8, MLP, LDR-5, LG-28/29, PR-23, PR-28, AL-8, ATR-5, SC-4/16/19,
  FE-12.
- **change_home_country(character)** — line 181 (`owner | identity`); 20261106051900:133; 0febedd7…; 1,979 B.
  ALREADY on `door_context('owner',NULL,NULL,'identity')` and the shell (F1-1); business answers
  `unknownCountry`, `countryTooSoon` at 200 (its line's reason). In the family by definition (owner, a posting
  dial); NOT in the GO's list; nothing to change (see `definition`).

### SQL callers, and the order of the files

Only `transition_listing` has SQL callers (the call-form reader over every last declaration, and the live probe):

| SQL caller | Kind | What it reads | Change |
|---|---|---|---|
| `admin_move_listing_core(uuid,text,text,text)` 20261028233839:342 | SECURITY INVOKER (under the definer `admin_move_listing`), F1-6's staff move | runs its own checks first (not signed in, `listings:enforce`, deactivated, unknown move, listing not found, own, illegal move, reason, note, severe restore, step-up `listings:enforce`), then `PERFORM transition_listing` — reads nothing back; a transition raise propagates | onto the core (file 2) |
| `designation_sweep_core(uuid[])` 20261105080106:29 | SECURITY DEFINER; run by `expire_stale_listings()` (cron `listing-expiry-sweep`, no JWT) | `transition_listing(v_id,'expired')` on active / reduced ads; the service path | onto the core (file 2): under the door's `door_context` a cron call would answer `notSignedIn` |
| `resume_listing(uuid)` | a family door | `PERFORM transition_listing(p_listing_id, v_row.resume_status)` | onto the core in its own redeclaration |
| `set_listing_level(uuid,text)` | a family door | `PERFORM transition_listing` when the ad is paused | onto the core in its own redeclaration |

The probe's word scan also names `public_listing_json` (`get_posting_schema`), `edit_listing` and `relist_listing`
(`renew_listing`), `feed_index_refresh` (`set_listing_level`), `edit_my_listing` and `set_listing_photos_soon`
(`set_listing_pin`), `promote_options` (`set_listing_reach`), `copy_my_listing`, `edit_listing` and
`validate_listing_draft` (`submit_listing`) and `my_listing` (`transition_listing`): each is a comment (the
call-form reader finds no call in any of them). No policy and no view names a family door (`#CALLERS-POLICY`,
`#CALLERS-VIEW`: none). No scheduled job calls a family door (the nine `cron.job` rows, appendix).

**The order of the files.** (1) the core `transition_listing_core(uuid,text)` — new, `RETURNS jsonb`,
SECURITY DEFINER, service-only (REVOKE from PUBLIC, anon, authenticated; GRANT to service_role): today's state
machine whole, with the codes above by `door_refuse`, WITHOUT the deactivation check and the `revise` dial (the
door's `door_context` gates those;   every SQL caller already checks its caller or is the service — the staff move's `revise` count is
`premises`' decision); nobody's contract changes. (2) `admin_move_listing_core` and `designation_sweep_core` onto the core (whole redeclarations
from their live bodies, md5 59c64012… and 1d10d4f5…; the one changed call). (3) the doors onto the shell, by
concern (the photo doors; the place, alias and schema doors; the seller's state doors with `resume_listing` and
`set_listing_level` onto the core; the promote doors; `edit_my_listing`, `submit_listing`,
`save_posting_identity` each alone). (4) `transition_listing` last, alone: DROP + CREATE `RETURNS jsonb` on
`door_context('owner',NULL,NULL,'revise')` + the core + the shell, `REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE
… TO authenticated, service_role` restated. No caller meets a returned refusal: the core RAISES (P0D01) for every
SQL caller, and only the doors (the outermost frames) return.

## callee-codes

Every function a family body calls, with every refusal it can answer (its last declaration;
`callee-raises.txt`), and what the door does with it:

| Callee | Refusals | The door |
|---|---|---|
| `assert_caller_active()` (closed) | `'account is deactivated'` | must not meet it: `door_context` answers `accountDeactivated` first; the bodies drop their calls |
| `rate_gate(text)` (closed) | `'unknown rate dial: %'`; calls `assert_caller_active` | must not meet it: the dial is `door_context`'s; the bodies drop their calls; every one of the nine dials has its row (probe `#DIALS`) |
| `alias_verdict(text,uuid)` (closed) | returns `aliasTaken`, `aliasTooSoon` | passes them as returned field answers (stay) |
| `validate_listing_draft(… 18 arguments, the last `p_listing_id uuid`)` (closed; computed, 20261107125358) | returns `required`, `categoryNotPostable`, `badShape`, `tooLong`, `contactInText`, `priceBasisAmbiguous`, `modeFollowsBasis`, `badValue`, `commissionNotOffered`, `commissionRange`, `mustBeEmpty`, `priceNotAllowed`, `notPositive`, `unknownCurrency`, `periodFollowsBasis`, `periodLocked`, `posterExpiryTooSoon`, `posterExpiryTooLate`, `unknownPlace`, `cityRequired` | passes them as returned field answers (stay) |
| `legal_certify(uuid,uuid,text,uuid[],text)` (closed) | raises P0001 `badValue:action`, `acceptanceRequired`, `certificationRequired`, `badLanguage` | passes them: P0001, not P0D01, so the shell does not catch them; the statement fails whole (no count, no row) as today; LG-* read them by `toContain` and hold |
| `legal_acceptance_guard` (trigger on `listings`, `listing_photos`, `profiles`) | raises `acceptanceRequired` | passes, as above |
| `listings_free_slot_guard` (trigger on `listings`) | raises `noFreeSlot` | passes, as above (`resume_listing`, `transition_listing_core` → active) |
| `listing_contact_refusals(jsonb)` (BROWSER) | returns `badShape`, `messagesRequired`, `unknownKey`, `showNeedsValue`, `badHandle` | passes them as returned field answers |
| `confirm_home_country(character)` (closed) | `'not authenticated'`, `'unknown country'`, `'country already confirmed'` | must not meet the first (the gate came first); `save_posting_identity` calls it only for a valid, unconfirmed country (its own checks before) — the other two are unreachable from it today and stay unreachable |
| `market_settings_for(character)` (closed) | `'marketNotSet'` | passes (P0001; already a code, `DOOR_CODES`) — from `set_listing_level` / `set_listing_reach` / `resume_listing` |
| `baseline_level_key()` (closed) | `'baselineMissing'` | passes (P0001) |
| `require_step_up_if_needed(text,text)` (closed) | P0009 `step-up required…` (three forms) | passes: P0009 keeps its own code (THE LAWS) — `transition_listing_core`'s reviewer and severe-restore paths |
| `has_permission(uuid,text,text)` (BROWSER), `is_super_admin(uuid)` | none | — |
| `level_perks_for`, `product_price_for` (BROWSER), `seller_regular_live` (two overloads), `business_name_rule`, `business_reason`, `alias_rule`, `alias_taken`, `name_fold`, `attr_contact_like`, `get_attribute_options_version` (BROWSER), `account_is_deactivated`, `deal_group`, `effective_category_links` | none raised | — |
| `transition_listing_core` (new) | the codes of `transition_listing` above (P0D01) | `transition_listing`, `resume_listing`, `set_listing_level` pass them through their shells as their own refusal; `admin_move_listing` (not on the shell, F1-6) lets them propagate as raised (P0D01 code `ownerDeleted` etc.; `moveErrorKey` reads them as `common.error`, as it reads today's sentence) |

The browser-executable callees (`has_permission`, `listing_contact_refusals`, `attr_contact_like`,
`level_perks_for`, `product_price_for`, `get_attribute_options_version`) are readers on their own lines; none
changes.

## cell-meaning

| Dial | Rations | How often one person honestly does it | Cell |
|---|---|---|---|
| `draft` 600/h | one save of a draft: a wizard step (`submit_listing`), the reusable place (`save_seller_place`, `clear_seller_place`), the photos-later toggle, a copy | a seller saves each of eight steps, goes back and forth, posts a few ads an hour: tens an hour | holds; `clear_seller_place` gains it |
| `post` 10/day | one publish (`publish_listing`) | a private seller publishes one to a few ads a day | holds |
| `revise` 120/h | one change to an ad of the seller's: edit, mark sold, reserve, pin, renew, close / reopen / pause / delete, resume, a photo moved or made the cover | a seller reorders ten photos, sets a cover and fixes a few ads in an hour: tens | holds; `move_listing_photo`, `set_cover_photo` gain it; `resume_listing` keeps its one count (now from the door, not the transition) |
| `revise` on `transition_listing`'s staff path | one review decision (a reviewer's approve / reject from the screening console) | a reviewer clearing a queue honestly decides one ad every half-minute to two minutes: 30–120 an hour — at the ceiling's edge | holds TODAY (the body spends `revise` for every caller today); named for F1-6 (decision at the stop) — the staff dial `staff_moderation` would ration this work better |
| `photo_remove` 100/day | one photo removed from an ad | a seller removes a few photos per ad, a few ads a day | holds |
| `promote` 10/h | one level or reach bought for an ad | a seller promotes a few ads at once | holds |
| `options_read` 400/h | one option list read for a select attribute | the wizard reads one list per select field per category chosen, cached 60 s by the route: tens an hour | holds |
| `schema_read` 120/h | one posting form read for a chosen category | a seller picks a few categories per ad | holds |
| `alias_check` 60/h | one check or suggestion of a seller name | a seller tries a handful of names | holds |
| `identity` 20/day | one save of the seller's identity (the contact step) or a home-country change | once per ad posted, `post` 10/day bounds it | holds |

**transition_listing — the class and the cells.** The body is an OWNER-OR-STAFF door: its owner path (pause,
close, reopen, delete) needs only the row's seller; its staff paths need `listings:review` (with step-up) or
`listings:enforce` (with step-up on a severe restore). The line's `staff | listings:review | row` cannot hold on
`door_context`: the staff form would refuse every seller `permissionDenied`. Proposed line:
`transition_listing(uuid,text) | owner | authenticated | - | - | revise | - | - | guarded | - | the status
door: door_context's owner form (signed in, active, revise); the core transition_listing_core keeps the owner,
listings:review (step-up) and listings:enforce (step-up) paths and their codes (F1-5a)`. WHO MAY CALL does not
change: every signed-in caller reaches the same checks in the same order, the seller gains nothing on his path,
the reviewer and the enforcer keep their permission and step-up checks byte for byte inside the core, the
service role passes as today — so it is not stop (a). The codes cell is `-` (the door's own body has no
`door_refuse`; the core's codes are named in the reason, as `admin_move_listing`'s line does).

## definition

The family by the concern's definition — every manifest line of class `owner` with a posting dial, plus
`transition_listing`, plus the browser-executable functions those bodies call: 23 owner lines (181–185, 191,
201, 222, 223, 243, 244, 246, 248, 252, 253, 255–260, 263, 264) plus `transition_listing` (265) = 24 doors.

- Against this GO's list (23 names): the definition adds **`change_home_country`** (line 181, owner, `identity`)
  — already on `door_context` and the shell since F1-1, nothing to change; it is named, not built.
- Against the plan's §5 row (`f1-doors.stop-1.md:479`): every door the row names exists; "the photo doors" are
  `move_listing_photo`, `remove_listing_photo`, `set_cover_photo`; "seller place" is `save_seller_place` and
  `clear_seller_place`; the row's "INC-836 part 2 (the three dropped…)" landed in F1-1 (CG-2 proves the retired
  doors closed). No door of the list no longer exists.
- A function of the list that only SQL calls: none (each has a browser caller under `src/` or the routes).
- The browser-executable callees (`has_permission`, `listing_contact_refusals`, `attr_contact_like`,
  `level_perks_for`, `product_price_for`, `get_attribute_options_version`) are on their own reader / helper lines
  and unchanged.

## tests

The family's e2e ids by file (the next free id of each family: PW-194, PR-61, PP-35, ML-15, MLA-20, MLP-9,
LG-34, LGC-7, PS-10, FSL-4, LDR-8): `post-wizard-*.spec.ts` (PW-1…193, through the routes), `posting-routes.spec.ts`
(PR-1…60), `photo-pipeline.spec.ts` (PP-1…34), `my-listings-doors.spec.ts` (ML-1…14), `my-listings-ad.spec.ts`
(MLA-1…19), `my-listings-page.spec.ts` (MLP-1…8), `my-listings-levels.spec.ts` (FSL-1…3, LDR-1…7),
`legal-certify.spec.ts` (LG-16…33 where it calls a family door), the manifest's `door-refusals.spec.ts` (reads no
family door). The client files' and routes' own unit tests: `my-listing.test.ts`, `my-listing-edit.test.ts`,
`promote-service.test.ts`, `promote-sheet.test.tsx`, `posting-service.test.ts`, `use-draft.test.tsx`,
`use-edit-draft.test.ts`, `use-screening.test.ts`, `refusal-text.test.ts`, `alias.test.ts`, `draft.test.ts`,
`identity.test.ts`, `photos.test.ts`, `attributes.options.test.ts`.

The ids whose reading changes, with the exact new expectation (from the bodies as the migration will write them):

| Id (file:line) | Reads today | New expectation |
|---|---|---|
| ML-1 `my-listings-doors:275` | `"only a live listing is reserved"` | `"notLive"` |
| ML-1 `:277` | `"illegal transition: closed -> reduced"` | `"illegalTransition:closed-reduced"` |
| ML-2 `:332`, `:333`, `:334` (close, reserve, edit as seller B; `:335–337` are `listing_history`, a reader — hold) | `"not your listing"` | `"notYourListing"` |
| ML-2 `:340` | `"illegal transition: screening -> closed"` | `"illegalTransition:screening-closed"` |
| ML-2 `:342` | `"an ad in review is edited once its review is done"` | `"inReview"` |
| ML-2 `:344`, ML-3 `:408` | `"only a live listing is reserved"` | `"notLive"` |
| ML-2 `:357`, `:362` | `"owner only: closed -> active"` | `"ownerOnly:closed-active"` |
| ML-6 `:556`, ML-12 `:885` | `"an expired listing is renewed before it is edited"` | `"renewFirst"` |
| ML-12 `:871`, `:890` | `"nothing to change"`, `"nothing changed"` | `"nothingChanged"` |
| ML-12 `:872`, `:873` | `"not editable: category_id"`, `"… poster_expires_at"` | `"notEditable:category_id"`, `"notEditable:poster_expires_at"` |
| ML-12 `:874`, `:875` | `"coverage must be a list"`, `"contact_pref must be an object"` | `"badShape:coverage"`, `"badShape:contact_pref"` |
| ML-12 `:876` | `"a draft is written in the posting form"` | `"draftNotEdited"` |
| ML-12 `:880` | `"an ad in review is edited once its review is done"` | `"inReview"` |
| ML-12 `:887` (O is seeded `sold`, `:860`) | `"this listing is not edited"` | `"listingNotEditable:sold"` |
| ML-12 `:888`, `:889` | `"listing not found"`, `"not your listing"` | `"listingNotFound"`, `"notYourListing"` |
| ML-13 `:1021`, `:1022`, `:1023`, `:1024` | the copy sentences, `"not your listing"` | `"notCopied:draft"`, `"notCopied:removed"`, `"notCopied:rejected"`, `"notYourListing"` |
| MLA-8 `my-listings-ad:672` | `"a listing its owner deleted is not restored"` | `"ownerDeleted"` |
| PR-21 `posting-routes:964` | the route body contains `"not your listing"` | contains `"notYourListing"` |
| LDR-2 `my-listings-levels:415` (`cases`) | `{ reason: "listingNotFound", id: theirs }` (another seller's ad) | `{ reason: "notYourListing", id: theirs }` |
| PR-27…31, PR-45 `posting-routes-dials` (outside the named files) | `isRateRefusal`: `error.includes("rateLimited")` | holds (the shell's message is `rateLimited`) |
| every id that reads `error` null / not null on a family door, or `data` of a door whose answer stays | — | holds |
| **AL-8 `admin-listings:615–620`** (outside SCOPE) | owner `transition_listing` removed → screening `"enforcement only: removed -> screening"` | `"enforcementOnly:removed-screening"` |
| **AL-29 `admin-listings:1975`** (outside SCOPE) | seller `edit_my_listing` `{ error: "not editable: category_id" }` | `{ error: "notEditable:category_id" }` |
| **CG-1 `auth-caller-gates:179`** (outside SCOPE) | `set_cover_photo` `toContain("account is deactivated")` (one loop with `unsave_listing`, `accept_legal`) | `set_cover_photo` → `"accountDeactivated"`; the other two unchanged — the loop splits |
| **AU-5 `admin-users:346`** (outside SCOPE) | `submit_listing` `toContain("account is deactivated")` | `"accountDeactivated"` |
| SC-4 `admin-screening:287` (outside SCOPE) | a plain user's `transition_listing` screening → active: `error` not null | holds (`notYourListing`, returned by the shell at 400) |
| SC-16 `admin-screening:306` (outside SCOPE) | a reviewer with no second factor: `toMatch(/no verified factor\|step-up required/i)` | holds (P0009 from `require_step_up_if_needed` inside the core; the door catches P0D01 only) |
| SC-19 `admin-screening:853`, FE-12 `feed-index:397` (outside SCOPE) | the service role's `transition_listing`: `error` null | holds (`door_context` returns at once for `service_role`; the core sees the service path) |
| ATR-5 `admin-listings:2378`, `:2389` (outside SCOPE) | the seller's own delete and sale through `transition_listing`: `error` null | holds (the answer becomes `{ok:true}`; no caller reads `data`) |
| AL-5 `admin-listings:480` (outside SCOPE) | the seller's `edit_my_listing`: `error` null, `data.refusals` holds `contactInText` | holds (a returned field refusal stays) |
| AT-60 `admin-attributes-links:924` (outside SCOPE), `e2e/helpers/seller-name.ts:13` | `get_posting_schema`'s `data`; `save_posting_identity` through `doorAnswer` | holds |

Effects a door now has on every call (counted per call by the tests that count them): `move_listing_photo`,
`set_cover_photo` count `revise` once; `clear_seller_place` counts `draft` once; a door's own refusal after the
gate now counts its dial once (`door_refused`, INC-844 — today the raise rolled the count back); a paused ad's
`set_listing_level` counts `promote` only (today also `revise`); `admin_move_listing` no longer counts the
staff member's `revise`. No test under `e2e/` counts these dials' rows today: `rg -n "rate_limits"` over the
family specs and `e2e/helpers/posting.ts` finds PW-41 (`geocode`), PR-49 (`photo-remove`, the route's own dial),
PR-50 (`upload:draft-week`) and PR-20 (a cleanup) — every one a route's dial, none a door's.

Unit tests whose fixtures read a folded sentence (STEP 3 / STEP 4's, in scope): `my-listing.test.ts:130–138`,
`my-listing-edit.test.ts:91–116`, `promote-service.test.ts:172`, `promote-sheet.test.tsx:170`,
`attributes.options.test.ts:61` (the route's own deactivated gate — holds).

## lists

- **The manifest**: lines 181–185, 191, 201, 222, 223, 243, 244, 246, 248, 252, 253, 255–260, 263–265 (24). Each
  codes cell gains the door's own codes; line 265 changes class (`cell-meaning`); a reason may gain "(F1-5a)".
  The new core has no browser grant: no line.
- **The forms allowlist** (`scripts/conformance/forms-allowlist.txt`): `:47` (`map-pin-dropper.tsx`), `:71–73`
  (`my-listing.ts`, `promote-service.ts`, `promote-sheet.tsx`, CF-FORM-3) — form shape, not refusals; untouched
  unless STEP 3 changes a counted form.
- **The public-surface allowlist** (`scripts/public-surface-allowlist.txt`): lines 5, 8, 9, 11, 14, 15, 16, 18,
  20–24, 38, 40, 60, 61, 67, 73, 78, 79, 178–180 name family doors; grants are restated as they stand (no new
  browser grant; the core is service-only) — no line changes.
- **The acceptance-door allowlist** (`scripts/acceptance-doors-allowlist.txt`): lines 86–89, 91–94, 96, 101–112
  — every key's signature is unchanged (`transition_listing(uuid,text)` keeps its arguments) — no line changes.
- **The door check's allowlist** (`scripts/doors/check-doors-allowlist.txt`): no family line.
- **CF-DOOR-ARGS' allowlist** (`scripts/conformance/door-args-allowlist.txt`): `:5` `draft.ts:124`, `:6`
  `draft.ts:133`, `:7` `identity.ts:188` leave in STEP 3; `user-client.ts:318` stays (F1-7).
- **The computed-declaration list** (`scripts/conformance/migration-reader.test.ts:199–204`): `attr_import_plan`,
  `edit_my_listing`, `public_listing_json`, `validate_listing_draft`. `edit_my_listing` leaves it in the
  migration's commit (its whole body is written literal).
- **The shared-value tables** (`scripts/conformance/shared-value-tables.txt`): `listings` and `listing_locations`
  are "read, not shared"; the family's tests write scratch sellers' own ads — no `@global-state` line needed.
- **The route budgets' six lines** (`scripts/route-budgets.mjs`): `:38` `/admin/audit` 296, `:42`
  `/admin/impersonation_/$sessionId` 294, `:52` `/admin/roles` 295, `:55` `/admin/translations` 306, `:56`
  `/admin/translations_/$lang` 310, `:57` `/admin/users` 294 — each written by F1-4b with the cause
  "locations-service.ts reads {ok:true,id} through categories-service's answeredId".
- **The register**: the doors' row (`docs/governance/mechanisms.md`, records turn only); a new row for the answer
  reader (Records).

## old-file-readers

Commands (pasted whole in the appendix with their hits): `oldreaders.sh` — `rg -n -F -e "<sentence>" src e2e
scripts` (i18n, the platform types and the manifest excluded) for each of the 30 sentence stems the family raises;
`rg -n "answeredId" src e2e scripts`; the door-name grep `callers.txt`.

The readers of a folded sentence or a changed answer (each hit resolved; hits of other doors' identical sentences
— `admin_edit_listing`, `admin_listing_detail`, `admin_move_listing`, `admin_screening_facts`, `listing_counts`,
`reveal_listing_contact`, `my_listing`, `my_listing_private`, `my_listing_certification`, `listing_history` — are
not this family's and hold):

- `src/features/my-listings/my-listing.ts:253–275` `actionErrorKey` — substring matches of `rateLimited`,
  `nothing changed` / `nothing to change`, `an ad in review is edited`, `residencyUnknown`, `noFreeSlot`,
  `account is deactivated`, `renewOff`, `removed by enforcement only`, `not your listing` / `listing not found` /
  `listingNotFound`, `illegal transition` / `only a live listing` / `owner only` / `renewNeedsExpired` /
  `notPaused` → STEP 3 moves it onto `readRefusal` with the family's words (in scope).
- `src/features/my-listings/promote-service.ts` `promoteRefusalKey` (reads `error`'s message; no `details`) →
  STEP 3 (in scope).
- `src/features/posting/posting-service.ts:844` (`rateLimited` substring, holds), `:1184/1204/1242` `pinAnswer`
  (codes, holds).
- `src/routes/api/listings/alias.ts`, `identity.ts` (the `resets_at` comment), `draft.ts`, `publish.ts`,
  `photos.$id.ts`, `src/routes/api/attributes.$id.options.ts` → STEP 3 (in scope): an untranslated door error is
  logged `[ssr-error]` by `doorCall` — each route passes a `translate` for its family codes.
- `src/features/admin-screening/use-screening.ts:242` — throws on error, ignores data: holds.
- `src/features/admin-listings/move-reasons.ts:56–68` `moveErrorKey` (outside SCOPE) — reads
  `admin_move_listing`'s own sentences; the transition codes it can still meet (`ownerDeleted`) read as
  `common.error`, as the sentence does today; `rateLimited` from the transition is no longer met (the core spends
  no dial): holds.
- `src/features/auth/deactivated.ts:38` `isDeactivatedRefusal` — no non-test caller (finding).
- `src/server/supabase/user-client.ts:234` and `upstream.test.ts` — the route's own deactivated gate and its
  fixtures: hold.
- `answeredId`: `categories-service.ts:24` (definition), `:137`, `:208`; `attributes-service.ts:10`, `:315`,
  `:442`; `locations-service.ts:3`, `:179`; `categories-service.test.ts:9`, `:36`; the six route-budget lines.
- e2e: the `tests` table above (four outside SCOPE).

## second-readers

`rg -n "vi\.mock\(|loadOnce\(|import\(" src` over the changed services (pasted in the appendix):
`post_.$listingId.tsx:32` imports `posting-service` on demand (`readDraft`, `mayResumePosting`; unchanged
exports); `vi.mock` of `posting-service` in `step-where-no-map.test.tsx:36`, `use-draft.test.tsx:17`,
`step-specifications-last-answer.test.tsx:24`, `step-review.test.tsx:29`, `use-edit-draft.test.ts:10`,
`step-where.test.tsx:80`, `step-photos.test.tsx:10`, `step-who.test.tsx:30`; of `my-listing` in
`step-review.test.tsx:9`, `use-edit-draft.test.ts:14`, `my-listing-edit.test.ts:4–7` (the platform client); of
`use-screening` in `listing-photos.test.tsx:23`; of `categories-service` in `country-verb-dialogs.test.tsx:29`
(`importOriginal` spread — keeps working when `answeredId` leaves; the mock does not name it); of
`locations-service` in `location-verb-dialogs.test.tsx:29` (spread). No `loadOnce` of a changed service.

## chunk-graph

From the lock-exact base build (`bun run build`, `/tmp/ethio-scratch/f1-doors-5a/build-base.log`), gzip -9 of
each chunk: `categories-service-G6Ml_15N.js` 4,369 B raw / 1,592 B gz; `locations-service-YTZg93MR.js` 4,025 /
1,642; `use-locations-Dw781Vnu.js` 909 / 443; `use-kept-page-dd25tKBF.js` 4,296 / 1,833. Importers of
`categories-service` (static, by chunk text): `admin.attributes`, `admin.categories`, `admin.places`,
`attribute-dialogs`, `category-dialogs`, `use-countries`, `locations-service` (+ the entry's preload map).
`locations-service` is imported by `admin.places`, `use-kept-page`, `use-locations` — the six staff pages reach
`categories-service` only through `use-kept-page` / `use-locations` → `locations-service`. The entry's closure:
203.7 KiB JS (no admin module). After Part B (measured at Part B): `locations-service` imports the `src/lib`
reader instead; `categories-service.js` leaves the six pages' closures.

## environments

The local proof stack (127.0.0.1, `bun run db:proof`): me — the probe ran there and was removed. ethio-staging:
the operator's paste of the supervisor's message of links (DEC-384), after the migration stop's ruling.
ethio-prod: after the merge, by the platform. The doors' callers run in: the browser (the platform client and
`src/lib/supabase-door.ts`, the signed-in seller), the server routes (`auth: "user"`, the caller's own bearer
through `user-client.ts`; a deactivated bearer is refused before any door, `user-client.ts:234`), SQL (the
definer doors and `admin_move_listing`), the cron (`expire_stale_listings` → `designation_sweep_core`, no JWT),
and e2e (scratch users' clients, `pageDoor` in the page, the service client).

## mechanisms

Read whole at their last declarations: `door_context` (20261106051600:39; the owner form: notSignedIn →
accountDeactivated → the dial by `rate_gate` → rateLimited; the service role returns at once),
`has_permission_scoped` (20261106051500:60; not used by the owner form), `door_refuse` (P0D01 `code[:detail]`),
`door_refused` (20261106051600:128: re-counts the dial for every code but the four gate codes, meters
`door_refusals (door, code, day)` — the detail is not stored — and sets `response.status` 401 / 403 / 428 / 429 /
400), `door_audit`. `readRefusal` (`src/lib/refusal.ts`) and `refusal-text.ts` (`DRAFT_REASONS` has
`notYourListing`, `badValue`, `badShape`, `rateLimited`, `residencyUnknown`, `noFreeSlot`, `contactInNote`,
`categoryNotPostable`, `doorError`; `PHOTO_REASONS` has `notYourListing`, `photoGone`, `rateLimited`). The route
mechanism: `doorCall` (`src/server/door.ts`) → `upstreamFailed` (`user-client.ts:196`: status 0, a gateway
status 502–530 or an HTML page — the shell's 400 / 401 / 403 / 428 / 429 are not upstream failures) → `translate`
or `verdict([doorRefusal(message)])` (`src/lib/door-error.ts:29`: `code[:detail]` kept when it matches
`REASON_CODE`, else `doorError`) and `logRouteError`; data → `doorAnswer` (maps a returned `rateLimited`'s
`resets_at` to `detail`). The catalogue (`scripts/doors/catalogue.ts`, read whole for Part A): it replays each
file's CREATE / DROP / GRANT / REVOKE events by offset; a plain CREATE is born closed, OR REPLACE keeps the
grants, a DROP forgets the overload and its grants; `dropEventsOf` blanks comments AND DO blocks (a computed DROP
is invisible to it). The patterns: P-2 (c)'s level and reach ownership proofs and F1-4b's scope proofs.

## first-download

Every page from the base build (`node scripts/check-bundle-size.mjs`, "Bundle budget OK"): pasted whole in the
appendix. The wizard (`/post`, `/post_/$listingId`, `/my-listings_/$listingId_/edit`): 403.1 / 404 KiB (room
0.9); `/my-listings` 312.4 / 315; `/my-listings_/$listingId` 319.9 / 323. The six of Part B: `/admin/audit`
295.1 / 296, `/admin/impersonation_/$sessionId` 292.8 / 294, `/admin/roles` 294.1 / 295, `/admin/translations`
305.3 / 306, `/admin/translations_/$lang` 308.7 / 310, `/admin/users` 293.0 / 294. The tightest rooms:
`/admin/users_/$userId` 0.4, `/admin/roles_/$roleId` 0.5, `/admin/listings_/$listingId` 0.5.

## premises

- The GO's "another signed-in seller is refused `notYours`": the family already has `notYourListing` with words
  in both of its families (`DRAFT_REASONS`, `PHOTO_REASONS`); "a code that exists is reused" — the census settles
  `notYourListing`.
- "`resume_listing` … spends none": its own body spends none, but its `PERFORM transition_listing` spends `revise`
  today; one count per call before and after.
- "`transition_listing` … the screening console calls it for review": true, and `admin_move_listing_core` and
  `designation_sweep_core` call it from SQL too (the cron through `expire_stale_listings`) — both move onto the
  core.
- The SCOPE's e2e clause names the family's spec files (and the helpers they use); four ids outside them read a
  sentence this turn folds to a code, in three files no clause of SCOPE reaches: AL-8 (`e2e/admin-listings.spec.ts:620`)
  and AL-29 (`:1975`), AU-5 (`e2e/admin-users.spec.ts:346`), CG-1 (`e2e/auth-caller-gates.spec.ts:179`) — STOP (c),
  `docs/governance/reports/f1-doors-5a.stop-1.md`. The other out-of-scope callers (SC-4, SC-16, SC-19, FE-12, ATR-5,
  AL-5, AT-60, the seller-name helper) hold (`tests`). `transition_listing`'s return type changes and it has callers
  outside SCOPE (those e2e ids; `src/features/admin-listings/move-reasons.ts` through `admin_move_listing`), but none
  reads its answer — no change is needed outside SCOPE for (b).
- The gate's `rateLimited` carries no `resets_at` (`door_context` refuses `rateLimited` with no detail): the doors
  that return it at 200 today with `resets_at` (`save_posting_identity`, and the route's relay at
  `src/routes/api/listings/identity.ts:201`) lose the time; no screen draws it (`post.refusal.rateLimited` and
  `post.photo.refusal.rateLimited` take no value).
- The staff move's dial: `admin_move_listing_core` (`20261028233839:342`) spends `revise` today only inside its
  `PERFORM transition_listing`; a core without the dial stops that count, and `moveErrorKey`
  (`src/features/admin-listings/move-reasons.ts:61`, outside SCOPE) maps `rateLimited` for it today — a decision at
  the stop (keep the count by a `rate_gate('revise')` in the move's own redeclaration, or leave it to F1-6).
- The supervisor's read "only `promote_options` is on the shell": `change_home_country` is on the shell too (F1-1).

## findings

- `src/features/auth/deactivated.ts:38` `isDeactivatedRefusal` has no non-test caller.
- The static catalogue keys `validate_listing_draft` by its 17 arguments; the live function has 18 (the computed
  DROP + CREATE of 20261107125358 inside a DO block, which `dropEventsOf` and `declarationsOf` do not see). The
  function is closed to the browser, so check-doors loses nothing today; Part A's `grant-dropped` judges literal
  DROPs only, so this turn's `transition_listing` DROP + CREATE is written literal.
- `remove_listing_photo` reads ownership and the photo BEFORE its dial today (every other door spends first); the
  gate order puts the dial first.
- `save_posting_identity` spends its dial BEFORE the deactivation check today; the gate order puts deactivation
  first.
- No security hole found.

## queued

`rg -n "F1-5a" docs/governance/briefs docs/governance/reports roadmap.md scripts/conformance scripts/doors`:

- `roadmap.md:35` — "the posting doors' argument casts (F1-5a)" → built here (STEP 3).
- `roadmap.md:40` — "First part — the migration guard refuses a file that drops and re-creates a function without
  restating every grant" → built here (Part A).
- `scripts/conformance/door-args-allowlist.txt:5–7` — the three casts → built here (STEP 3).
- `docs/governance/reports/p2-promote.report.md:286` — `my-listing.ts:253` `actionErrorKey` "F1-5a moves it" →
  built here (STEP 3); `tier-reasons.ts:54` `tierErrorKey` → left (F1-6, the staff tier door).
- `p2-promote.report.md:474` P2b-c, P2b-d — `set_listing_level` and `resume_listing` by plain RAISE; the
  deactivated sentence on every `assert_caller_active` door → built here (the migration).
- `p2-promote.stop-1.md:68`, `:260–266` — the promote codes in `DOOR_CODES` (added by P-2) and "does Resume's
  mapping move onto the one reader" → built here (STEP 3, onto `readRefusal`; `DOOR_CODES` does not grow).
- `f1-doors.stop-1.md:479` — the plan's family row → this turn.
- `f1-doors-4b.census.md:179` — "LR, GE, VP and PW read the public place readers (F1-5a, F1-5b, F1-7)" → the
  public place readers are F1-7's readers; left (F1-5b / F1-7).
- `f1-doors-4b.report.md:156`, `:253` — INC-942's three posting casts → built here (STEP 3).

## appendix

The raw readings, copied by script (`appendix.sh`) from the scratch files named. A1 (the probe), A2, A3 and A8 (the
base build) were run earlier in this turn on the base tree; A4 to A7 are the greps run again when the appendix was
made. A1 is cut from the raw `probe.log` (its extracted copy `probe.txt` had lost its last line, `schema_read
120/3600s`).

### A1. The probe on the local proof stack (`bun run db:proof --fresh` with the scratch probe; its raised message, from `probe.log`)

````
PROBE-CENSUS
#MD5
account_is_deactivated(uuid)=ab1a62340b48b3ce2704d20ad20cb8fa/117/s/definer/boolean/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_move_listing_core(uuid,text,text,text)=59c64012ffe2501ad34dd2570669cefb/2976/v/invoker/jsonb/acl={postgres=X/postgres}/cfg={search_path=public}
alias_rule(text,boolean)=49265d04fdd53d8a161b37c38288bd2f/4403/s/definer/text/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
alias_taken(text,uuid)=de212ef337bed1f7201bb71f4bc89ddb/381/s/definer/boolean/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
alias_verdict(text,uuid)=a41fdf8b718b3040764726897a0c71a5/865/s/definer/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
assert_caller_active()=aa5386c24795838834377ec019cd764f/178/s/definer/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
attr_answer_other_text(jsonb)=8668ad50a65437852135e702afd6a051/388/i/invoker/text/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
attr_contact_like(text)=cb434d3c889594980d08fd4fe665675c/1802/i/invoker/boolean/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
baseline_level_key()=65ed9d808c92c41c488837e014fee8c2/221/s/invoker/text/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
business_name_rule(text)=4bc8f9000b69c1ce2f02e6d8d5748f5b/4413/s/definer/text/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
business_reason(text)=2bb148da0535289b9093162ff7daf817/142/i/invoker/text/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
change_home_country(character)=0febedd71690d159351e4e5176a5be28/1979/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
check_seller_alias(text)=2074df98927a2b46651f5420b9c081af/447/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
clear_seller_place()=d84236e868e0dfc7499499306eb76dad/256/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
confirm_home_country(character)=3727b240cd8bea6d31f6b32585d99b3c/637/v/definer/void/acl={postgres=X/postgres}/cfg={search_path=public}
copy_my_listing(uuid)=c639fa133b2d16458bc8e60992f4ea1a/3155/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
deal_group(text,boolean)=56a5692a410bff3a4ab28ba2ebf56208/398/i/invoker/text/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
designation_sweep_core(uuid[])=1d10d4f569f2cf8f6bfe5483ece5f022/6673/v/definer/record/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
door_audit(door_ctx,text,text,text,jsonb,jsonb)=1e74cfe9e6e62933e1acba56fe395198/246/v/definer/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
door_context(text,text,text,text,character,text)=5a05ee77766181a4256d5b7efce36c41/2334/v/definer/door_ctx/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
door_refuse(text,text)=55f9bf0a6c4c4b2cc57d304df779e7fc/270/v/invoker/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
door_refused(text,text,text)=1a94a1b3ad3446749a1d08d9c096df02/1419/v/definer/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
edit_my_listing(uuid,jsonb,uuid[],text)=77def52b1ce62164e8f2ee1a84af6715/11748/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
effective_category_links(uuid)=83b3c5bd6b93447a185dd8317459de06/846/s/definer/record/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
get_attribute_options(uuid)=d2d32fec25ac42b8ab8233bcaecc618c/2669/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
get_attribute_options_version(uuid)=aa19b177393e2622497490154b9cc07c/441/s/definer/text/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
get_posting_schema(uuid)=a1bb0e2a63ce2d61525794c6e403305c/5322/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
has_permission(uuid,text,text)=c633eae927473b96a4e228a7bdd1356a/1514/s/definer/boolean/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
is_super_admin(uuid)=00bb2555ebe87b928be3804102c91ff4/168/s/definer/boolean/acl={postgres=X/postgres}/cfg={search_path=public}
legal_certify(uuid,uuid,text,uuid[],text)=ce1e70c2fe5d912127e55667dba397cf/1508/v/definer/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
level_perks_for(text,uuid,character)=662e1195e9779ac614ac4c929f4e51f3/2521/s/invoker/jsonb/acl={postgres=X/postgres,anon=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
listing_contact_refusals(jsonb)=d8b57864116db16570058346b4a9e04e/1899/i/invoker/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
mark_sold(uuid)=b48bcfcfacfc144842eca514ee438521/1320/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
market_settings_for(character)=3566667fb7791cb2be5af72f256a638b/346/s/invoker/market_settings/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
move_listing_photo(uuid,uuid,integer)=6b6405681888846fb00dee3ee5a45a07/1887/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
name_fold(text)=6b87a1d9d529d4be6871ac52fc913239/98/i/invoker/text/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
product_price_for(text,uuid,character)=4b6f682fd38679c23091ad077e0bba43/1464/s/invoker/jsonb/acl={postgres=X/postgres,anon=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
publish_listing(uuid,uuid[],text)=2a455cfb87b99a51389f08a72fe5665c/3318/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
rate_gate(text)=ee56a11fdbe5fe70d9ce8ba176b9ba62/1300/v/definer/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
remove_listing_photo(uuid,uuid)=1a7ac7eb852358fe63d4ecb3b77efdf8/1625/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
renew_listing(uuid,uuid[],text)=93815d85ea2c3989fd2ebc0a23d5ba2c/3159/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
require_step_up_if_needed(text,text)=92f9d4ba6c2b80816b6f9764e1d8c83c/1766/s/definer/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
resume_listing(uuid)=858701a05407750f0d68bfcbd584e43d/729/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
save_posting_identity(text,text,text,text,text,jsonb,character)=59a766e6afe1a623f33121f585a55aca/6801/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
save_seller_place(uuid)=e80d68439d1c0e0e6cd5524a2da94f0c/1985/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
seller_regular_live(uuid,character,uuid)=38a0e1c140db0ce2cebc051ef9b2252c/347/s/invoker/integer/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
seller_regular_live(uuid,character)=634b8918c043c67dfa9545f09b333417/297/s/invoker/integer/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
set_cover_photo(uuid,uuid)=efa88b38de5af98b6d09e10deaf79fac/1333/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
set_listing_level(uuid,text)=91b6da31335bfb3fa4798cff3b7d6b66/4418/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
set_listing_photos_soon(uuid,boolean)=c5d2c31b7448076f78448f0cf7e22b1b/1501/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
set_listing_pin(uuid,numeric,numeric,text,text,smallint,text)=34c6bdd95f57c63dae9003dbc2cb9b7a/4184/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
set_listing_reach(uuid,text)=00492e7bc78a52ba2374c408e9457c44/3398/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
set_listing_reserved(uuid,boolean)=cb753d8ec611ab543e5e50416d80290b/1545/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
submit_listing(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)=e39338a4d8ac361c55c1d39e7bc5ee41/6299/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
suggest_seller_aliases(text,text,text,uuid)=4a3b149eac1d2dc430e7ba18d96e896c/3381/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
transition_listing(uuid,text)=bddd751f0404d011f2279b818c2245dd/9553/v/definer/void/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
validate_listing_draft(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,jsonb,integer,boolean,uuid)=491536378cd106df1bc9c04359c93847/22679/v/definer/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
#CALLERS-FN
get_posting_schema <- fn public.public_listing_json
renew_listing <- fn public.edit_listing
renew_listing <- fn public.relist_listing
set_listing_level <- fn public.feed_index_refresh
set_listing_pin <- fn public.edit_my_listing
set_listing_pin <- fn public.set_listing_photos_soon
set_listing_reach <- fn public.promote_options
submit_listing <- fn public.copy_my_listing
submit_listing <- fn public.edit_listing
submit_listing <- fn public.validate_listing_draft
transition_listing <- fn public.admin_move_listing_core
transition_listing <- fn public.designation_sweep_core
transition_listing <- fn public.my_listing
transition_listing <- fn public.resume_listing
transition_listing <- fn public.set_listing_level
#CALLERS-POLICY
none
#CALLERS-VIEW
none
#TRIGGERS
audit_log.audit_log_append_only -> audit_log_append_only (before)
listing_locations.feed_index_on_place_delete -> feed_index_on_place_delete (after)
listing_locations.feed_index_on_place_insert -> feed_index_on_place_insert (after)
listing_locations.feed_index_on_place_update -> feed_index_on_place_update (after)
listing_photos.acceptance_guard -> legal_acceptance_guard (before)
listing_revisions.listing_revisions_home_country -> fill_seller_home_country (before)
listings.acceptance_guard -> legal_acceptance_guard (before)
listings.feed_index_on_listing_insert -> feed_index_on_listing_insert (after)
listings.feed_index_on_listing_update -> feed_index_on_listing_update (after)
listings.listing_photos_approved_with_ad -> listing_photos_approved_with_ad (after)
listings.listings_free_slot_guard -> listings_free_slot_guard (before)
listings.listings_price_marks -> listings_price_marks (before)
listings.listings_search_tsv_refresh -> listings_search_tsv_refresh (before)
listings.listings_state_marks -> listings_state_marks (before)
listings.update_listings_updated_at -> update_updated_at_column (before)
name_checks.name_checks_clear_imitates_of -> name_checks_clear_imitates_of (before)
package_prices.package_prices_updated_at -> update_updated_at_column (before)
profiles.acceptance_guard -> legal_acceptance_guard (before)
profiles.profiles_default_location_check -> profiles_default_location_check (before)
profiles.profiles_status_guard -> profiles_status_guard (before)
#CRON
catalog-find-sweep: SELECT public.catalog_find_sweep()
seller-name-sweep: SELECT public.seller_name_sweep()
listing-expiry-sweep: SELECT public.expire_stale_listings()
name-folds-rebuild: SELECT public.name_folds_rebuild()
feed-index-check: SELECT public.feed_index_check_sweep()
rate-limits-prune: SELECT public.rate_limits_prune()
ai-calls-prune: SELECT public.ai_calls_prune()
name-check-catchup: SELECT public.job_call('name-check-catchup')
job-runs-prune: SELECT public.job_runs_prune()
#DIALS
alias_check 60/3600s
draft 600/3600s
identity 20/86400s
options_read 400/3600s
photo_remove 100/86400s
post 10/86400s
promote 10/3600s
revise 120/3600s
schema_read 120/3600s
````

### A2. SQL callers by the call-form reader (`sql-callers.ts` → `sqlcallers.txt`)

````
check_seller_alias: fns=[-] policies/triggers=[-]
clear_seller_place: fns=[-] policies/triggers=[-]
copy_my_listing: fns=[-] policies/triggers=[-]
edit_my_listing: fns=[-] policies/triggers=[-]
get_attribute_options: fns=[-] policies/triggers=[-]
get_posting_schema: fns=[-] policies/triggers=[-]
mark_sold: fns=[-] policies/triggers=[-]
move_listing_photo: fns=[-] policies/triggers=[-]
publish_listing: fns=[-] policies/triggers=[-]
remove_listing_photo: fns=[-] policies/triggers=[-]
renew_listing: fns=[-] policies/triggers=[-]
resume_listing: fns=[-] policies/triggers=[-]
save_posting_identity: fns=[-] policies/triggers=[-]
save_seller_place: fns=[-] policies/triggers=[-]
set_cover_photo: fns=[-] policies/triggers=[-]
set_listing_level: fns=[-] policies/triggers=[-]
set_listing_photos_soon: fns=[-] policies/triggers=[-]
set_listing_pin: fns=[-] policies/triggers=[-]
set_listing_reach: fns=[-] policies/triggers=[-]
set_listing_reserved: fns=[-] policies/triggers=[-]
submit_listing: fns=[-] policies/triggers=[-]
suggest_seller_aliases: fns=[-] policies/triggers=[-]
transition_listing: fns=[admin_move_listing_core(uuid,text,text,text) (20261028233839:342); set_listing_level(uuid,text) (20261104153958:32); resume_listing(uuid) (20261105080111:100); designation_sweep_core(uuid[]) (20261105080106:29)] policies/triggers=[-]
change_home_country: fns=[-] policies/triggers=[-]
````

### A3. The callees' refusals (`callee-raises.ts` → `callee-raises.txt`)

````
## assert_caller_active() 20261023100132:21 closed
   'account is deactivated'
## rate_gate(text) 20261023100132:34 closed
   'unknown rate dial: %', p_action
## alias_verdict(text,uuid) 20261004011235:738 closed
   ret aliasTaken
   ret aliasTooSoon
## validate_listing_draft(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,jsonb,integer,boolean) 20261103040808:22 closed
   ret required
   ret categoryNotPostable
   ret badShape
   ret tooLong
   ret contactInText
   ret priceBasisAmbiguous
   ret modeFollowsBasis
   ret badValue
   ret commissionNotOffered
   ret commissionRange
   ret mustBeEmpty
   ret priceNotAllowed
   ret notPositive
   ret unknownCurrency
   ret periodFollowsBasis
   ret periodLocked
   ret posterExpiryTooSoon
   ret posterExpiryTooLate
   ret unknownPlace
   ret cityRequired
## legal_certify(uuid,uuid,text,uuid[],text) 20261019140533:51 closed
   'badValue:action'
   'acceptanceRequired'
   'certificationRequired'
   'badLanguage'
## listing_contact_refusals(jsonb) 20261003005802:835 BROWSER
   ret badShape
   ret messagesRequired
   ret unknownKey
   ret showNeedsValue
   ret badHandle
## business_name_rule(text) 20261018142627:192 closed
## business_reason(text) 20261004011235:732 closed
## confirm_home_country(character) 20260803075756:69 closed
   'not authenticated'
   'unknown country'
   'country already confirmed'
## alias_rule(text,boolean) 20261018142627:86 closed
## alias_taken(text,uuid) 20261004011235:686 closed
## attr_contact_like(text) 20261003005802:19 BROWSER
## level_perks_for(text,uuid,character) 20261103040805:131 BROWSER
## market_settings_for(character) 20261104153957:23 closed
   'marketNotSet'
## product_price_for(text,uuid,character) 20261103040806:35 BROWSER
## seller_regular_live(uuid,character) 20261104153957:47 closed
## seller_regular_live(uuid,character,uuid) 20261105080111:34 closed
## get_attribute_options_version(uuid) 20260916235955:266 BROWSER
## require_step_up_if_needed(text,text) 20260817100845:26 closed
   'step-up required: no verified factor' USING ERRCODE = 'P0009', HINT = 'Set up an authenticator app (TOTP) and
   'step-up required' USING ERRCODE = 'P0009', HINT = 'Verify a second factor (TOTP) and retry this action.'
   'step-up required: verification expired' USING ERRCODE = 'P0009', HINT = 'Enter a fresh code from your authent
## is_super_admin(uuid) 20260809010130:97 closed
## baseline_level_key() 20261104124957:89 closed
   'baselineMissing'
````

### A4. old-file-readers — `oldreaders.sh`, run again for this appendix

````
#!/bin/bash
# old-file-readers: each English sentence the family raises, grepped across src e2e scripts (i18n and types excluded)
cd /Users/tesfayemackbookpro/ethio-marketplace
while IFS= read -r s; do
  echo "### $s"
  rg -n -F -e "$s" src e2e scripts -g '!src/i18n/**' -g '!src/integrations/supabase/types.ts' -g '!scripts/doors/manifest.txt' || echo "  (none)"
done <<'LIST'
not authenticated
account is deactivated
listing not found
not your listing
illegal transition
photo not found on this listing
bad position
reserved is true or false
only a live listing is reserved
a draft is not copied
a removed or refused listing is not copied
unknown step
only a draft is writable here
nothing to change
not editable
a draft is written in the posting form
an ad in review is edited once
an expired listing is renewed before
this listing is not edited
coverage must be a list
contact_pref must be an object
nothing changed
unknown status
owner only
reviewer only
a listing its owner deleted is not restored
enforcement only
removed for a severe reason
service only
rejected for a severe reason
LIST
--- output
### not authenticated
e2e/auth-caller-gates.spec.ts:250:      /only a super admin|not your listing|not authenticated|illegal transition/,
e2e/ad-page-doors.spec.ts:442:    expect(refused.error).toMatch(/permission denied|not authenticated/);
src/lib/reader-failure.ts:25:    /JWT|not authenticated/i.test(message)
src/features/auth/deactivated.test.ts:31:    expect(isDeactivatedRefusal("not authenticated")).toBe(false);
src/features/seller/seller-review.test.ts:23:      error: { message: "not authenticated", code: "P0001", details: "", hint: "" },
### account is deactivated
e2e/posting-routes.spec.ts:1425:        expect(await draft.json()).toEqual({ error: "account is deactivated" });
e2e/posting-routes.spec.ts:1429:        expect(await identity.json()).toEqual({ error: "account is deactivated" });
e2e/posting-routes.spec.ts:1436:        expect(await options.json()).toEqual({ error: "account is deactivated" });
src/routes/api/attributes.options.test.ts:61:  expect(await response.json()).toEqual({ error: "account is deactivated" });
e2e/auth-caller-gates.spec.ts:179:      expect((await caller.rpc(fn, args)).error?.message).toContain("account is deactivated");
e2e/admin-users.spec.ts:346:    expect(error?.message ?? "").toContain("account is deactivated");
src/lib/door-codes.test.ts:75:    expect(doorCode("account is deactivated")).toEqual({ code: null, detail: null });
src/server/supabase/upstream.test.ts:197:    json({ code: "P0001", details: null, hint: null, message: "account is deactivated" }, 400);
src/server/supabase/upstream.test.ts:248:    expect(await refused?.json()).toEqual({ error: "account is deactivated" });
src/server/supabase/user-client.ts:234:  if (answer.reason === "deactivated") return routeJson({ error: "account is deactivated" }, 403);
src/features/my-listings/promote-service.test.ts:172:    expect(promoteRefusalKey({ message: "account is deactivated" }, "level")).toBe("door.refused");
src/features/my-listings/promote-sheet.test.tsx:170:      { data: null, error: { message: "account is deactivated", code: "P0001" } },
src/features/my-listings/my-listing.ts:261:  if (message.includes("account is deactivated")) return "myListings.error.deactivated";
src/features/my-listings/my-listing.test.ts:130:    expect(actionErrorKey("account is deactivated")).toBe("myListings.error.deactivated");
src/features/auth/deactivated.test.ts:29:    expect(isDeactivatedRefusal("account is deactivated")).toBe(true);
src/features/auth/deactivated.test.ts:30:    expect(isDeactivatedRefusal("P0001: account is deactivated")).toBe(true);
src/features/admin-listings/tier-reasons.test.ts:127:      (message) => message !== "not signed in" && message !== "account is deactivated",
src/features/admin-listings/tier-reasons.test.ts:155:      (message) => message !== "not signed in" && message !== "account is deactivated",
src/features/auth/deactivated.ts:38:  return typeof message === "string" && message.includes("account is deactivated");
### listing not found
e2e/photo-pipeline.spec.ts:103:    // save already sent to land as "listing not found").
e2e/helpers/posting.ts:2419: * "listing not found". So the page first waits for its network to go quiet (a
e2e/admin-screening.spec.ts:468:    expect(facts.error).toBe("listing not found");
e2e/admin-screening.spec.ts:473:    expect(shown.error).toBe("listing not found");
e2e/admin-listings.spec.ts:379:    expect((await edit(draft.id, { title: "A draft" })).error).toBe("listing not found");
e2e/admin-listings.spec.ts:1067:      "listing not found",
scripts/e2e-failure-report.ts:1134: * the census self-test shows it: its "listing not found" lines were followed by
scripts/e2e-failure-report.ts:2893:      const notFound = rows.find((row) => row.message === "listing not found");
scripts/e2e-failure-report.ts:2900:        ["listing not found ×2 is loud", notFound?.count === 2 && !notFound.quiet],
scripts/e2e-failure-report.ts:2901:        // INC-398 — on this capture both "listing not found" lines were followed by
scripts/e2e-failure-report.ts:2941:          green.includes("### listing not found") &&
scripts/e2e-failure-report.ts:2942:            green.includes("[ssr-error] /api/listings/draft listing not found"),
e2e/my-listings-doors.spec.ts:888:      [G, { title: `E2E new words ${token()}` }, "listing not found"],
scripts/fixtures/e2e-ssr-census/job.log.txt:416:[WebServer] [0m[31m[ssr-error] /api/listings/draft listing not found[0m
scripts/fixtures/e2e-ssr-census/job.log.txt:449:[WebServer] [0m[31m[ssr-error] /api/listings/draft listing not found[0m
src/server/supabase/upstream.test.ts:109:      json({ code: "P0001", details: null, hint: null, message: "listing not found" }, 400),
src/server/supabase/upstream.test.ts:129:    logRouteError("/api/x", "listing not found");
src/server/supabase/upstream.test.ts:132:      ["[ssr-error]", "/api/x", "listing not found"],
src/server/supabase/upstream.test.ts:175:      json({ code: "P0001", details: null, hint: null, message: "listing not found" }, 400);
src/lib/door-error.test.ts:13:    expect(doorErrorDetail("listing not found")).toBeUndefined();
src/lib/error-text.test.ts:15:    expect(errorText("listing not found")).toBe("listing not found");
src/features/admin-listings/edit-listing.test.ts:151:    expect(editErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/tier-reasons.test.ts:99:    expect(tierErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/move-reasons.ts:57:  if (message === "listing not found") return "admin.listings.move.error.notFound";
src/features/admin-listings/tier-reasons.ts:89:  if (message === "listing not found") return "admin.listings.move.error.notFound";
src/features/admin-listings/undo-edit.test.ts:47:    expect(undoErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/photo-remove.test.ts:22:    expect(photoRemoveErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/move-reasons.test.ts:50:    expect(moveErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/use-admin-listing.ts:12: * a draft answers "listing not found"). The door decides what this person may
src/features/admin-listings/listing-page.tsx:214:    const missing = query.error != null && errorText(query.error) === "listing not found";
src/features/my-listings/my-listing.ts:266:    message.includes("listing not found") ||
### not your listing
scripts/public-surface-allowlist.txt:6:my_listing_private | authenticated | owner-only read; raises "not your listing" for any other caller (M1b)
scripts/public-surface-allowlist.txt:83:listing_counts | authenticated | Bundle 19 turn 4 (D201 §9, M1): the owner's own counters (views, shares by channel, contacts) on auth.uid(); "not your listing" for any other caller (listing_reveal_count's rule)
e2e/posting-routes.spec.ts:964:      expect(JSON.stringify(foreign.body)).toContain("not your listing");
e2e/ad-page-doors.spec.ts:171:    expect(refused.error).toBe("not your listing");
e2e/legal-certify.spec.ts:438:    expect(refused.error).toContain("not your listing");
e2e/my-listings-doors.spec.ts:332:    expect((await close(b, x.id)).error).toBe("not your listing");
e2e/my-listings-doors.spec.ts:333:    expect((await reserve(b, x.id, true)).error).toBe("not your listing");
e2e/my-listings-doors.spec.ts:334:    expect((await price(b, x.id, 90)).error).toBe("not your listing");
e2e/my-listings-doors.spec.ts:335:    expect((await b.rpc("listing_history", { p_listing_id: x.id })).error).toBe("not your listing");
e2e/my-listings-doors.spec.ts:337:      "not your listing",
e2e/my-listings-doors.spec.ts:889:      [Q, { title: `E2E new words ${token()}` }, "not your listing"],
e2e/my-listings-doors.spec.ts:1024:    expect((await copy(Q.id)).error).toBe("not your listing");
e2e/my-listings-ad.spec.ts:313:      expect(refused.error).toBe("not your listing");
e2e/my-listings-ad.spec.ts:345:    expect(refused.error).toBe("not your listing");
e2e/my-listings-ad.spec.ts:623:    expect(gone.error).toBe("not your listing");
e2e/auth-caller-gates.spec.ts:250:      /only a super admin|not your listing|not authenticated|illegal transition/,
src/features/my-listings/my-listing.ts:80:    if (error.message.includes("not your listing")) return "notYours";
src/features/my-listings/my-listing.ts:265:    message.includes("not your listing") ||
src/features/posting/posting-service.ts:352:    if (error.message.includes("not your listing")) return null;
src/features/my-listings/my-listing.test.ts:132:    expect(actionErrorKey("not your listing")).toBe("myListings.error.notYours");
### illegal transition
src/lib/door-error.test.ts:29:    expect(doorRefusal("illegal transition: draft -> sold")).toEqual({
e2e/my-listings-doors.spec.ts:277:      "illegal transition: closed -> reduced",
e2e/my-listings-doors.spec.ts:340:    expect((await close(a, y.id)).error).toBe("illegal transition: screening -> closed");
e2e/auth-caller-gates.spec.ts:250:      /only a super admin|not your listing|not authenticated|illegal transition/,
src/features/my-listings/my-listing.ts:271:    message.includes("illegal transition") ||
src/features/my-listings/my-listing.test.ts:133:    expect(actionErrorKey("illegal transition: sold -> closed")).toBe("myListings.error.changed");
### photo not found on this listing
e2e/admin-listings.spec.ts:551:    ).toMatchObject({ error: "photo not found on this listing" });
src/features/admin-listings/listing-photos.test.tsx:116:    door.edit.mockRejectedValueOnce({ message: "photo not found on this listing" });
src/features/admin-listings/photo-remove.test.ts:16:    expect(photoRemoveErrorKey("photo not found on this listing")).toBe(
src/features/admin-listings/photo-remove.ts:23:  if (message === "photo not found on this listing") return "admin.listings.photos.error.gone";
### bad position
  (none)
### reserved is true or false
  (none)
### only a live listing is reserved
e2e/my-listings-doors.spec.ts:275:    expect((await reserve(me, ad.id, true)).error).toBe("only a live listing is reserved");
e2e/my-listings-doors.spec.ts:344:    expect((await reserve(a, y.id, true)).error).toBe("only a live listing is reserved");
e2e/my-listings-doors.spec.ts:408:    expect((await reserve(me, review.id, true)).error).toBe("only a live listing is reserved");
src/features/my-listings/my-listing.test.ts:134:    expect(actionErrorKey("only a live listing is reserved")).toBe("myListings.error.changed");
### a draft is not copied
e2e/my-listings-doors.spec.ts:1021:    expect((await copy(D.id)).error).toBe("a draft is not copied");
### a removed or refused listing is not copied
e2e/my-listings-doors.spec.ts:1022:    expect((await copy(M.id)).error).toBe("a removed or refused listing is not copied");
e2e/my-listings-doors.spec.ts:1023:    expect((await copy(R.id)).error).toBe("a removed or refused listing is not copied");
src/features/my-listings/my-listing-edit.test.ts:116:      ["a removed or refused listing is not copied", "myListings.error.failed"],
### unknown step
src/features/posting/use-draft.test.tsx:518: * p_step < 1 with 'unknown step'; going to step 1 used to lower a queued save
### only a draft is writable here
  (none)
### nothing to change
e2e/my-listings-doors.spec.ts:871:      [X, {}, "nothing to change"],
src/routes/settings.tsx:804:          {/* P1-g: with no password there is nothing to change. The recovery flow
src/features/my-listings/my-listing.ts:256:  if (message.includes("nothing changed") || message.includes("nothing to change"))
src/features/admin-listings/edit-listing.ts:257:  if (message === "nothing changed" || message === "nothing to change") {
### not editable
e2e/helpers/ui.ts:170:  await expect(input, `${fieldName} field is not editable`).toBeEditable();
scripts/migration-real-row-allowlist.txt:9:20261028223430_631c8680-d4a9-4b2f-bab9-8c83d604a445.sql | SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid | the profile is the proof's own scratch user (v_uid, inserted in the proof) (D1 M1); recorded in D1 stop 12, file applied and not editable | until INC-963 closed
scripts/migration-real-row-allowlist.txt:10:20261028224333_4ce633e9-2d61-433c-a543-6f7dc00cb769.sql | UPDATE public.user_directory SET home_country_code = v_home WHERE user_id = v_uid | the directory row is the proof's own scratch user (v_uid, inserted in the proof) (D1 M2); recorded in D1 stop 12, file applied and not editable | until INC-793 closed
scripts/migration-real-row-allowlist.txt:11:20261028224333_4ce633e9-2d61-433c-a543-6f7dc00cb769.sql | -- (b) step 2, fixed with an amount and no home market: price_currency/required. UPDATE public.user_directory SET home_c | the directory row is the proof's own scratch user (v_uid, inserted in the proof) (D1 M2); recorded in D1 stop 12, file applied and not editable | until INC-793 closed
scripts/migration-real-row-allowlist.txt:12:20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | the proof uses it. SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable | until INC-949 closed
scripts/migration-real-row-allowlist.txt:13:20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country') <> 1 | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable | until INC-949 closed
scripts/migration-real-row-allowlist.txt:14:20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | UPDATE public.locations SET is_active = true WHERE id = v_anc | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable | until INC-949 closed
scripts/migration-real-row-allowlist.txt:15:20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | -- R2 is switched off after its city is placed (the ancestry guard refuses an active -- city under an inactive region), | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable | until INC-949 closed
scripts/migration-real-row-allowlist.txt:16:20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable | until INC-949 closed
scripts/migration-real-row-allowlist.txt:17:20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | UPDATE public.locations SET is_active = true WHERE id = v_anc | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable | until INC-949 closed
scripts/migration-real-row-allowlist.txt:18:20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | UPDATE public.locations SET is_active = false WHERE id = v_r2 | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable | until INC-949 closed
scripts/migration-real-row-allowlist.txt:19:20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql | IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_target) THEN RAISE EXCEPTION 'INC-951 3a proof: the scrat | the profile is the proof's own scratch target user (v_target, inserted in the proof) (D1 M4); recorded in D1 stop 12, file applied and not editable | until INC-951 closed
scripts/migration-real-row-allowlist.txt:33:20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | INSERT INTO public.name_checks(profile_id, subject, checked_text, state, since, home_country_code) SELECT p.user_id, 'al | INC-979: the backfill statement under test (and its no-alias-left check) spans every profile by design; inside the proof it ran in the sub-block that rolled itself back, so nothing was kept; file applied on ethio-prod and not editable | until INC-979 closed
scripts/migration-real-row-allowlist.txt:34:20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | nothing changes (idempotent). INSERT INTO public.name_checks(profile_id, subject, checked_text, state, since, home_count | INC-979: the backfill statement under test (and its no-alias-left check) spans every profile by design; inside the proof it ran in the sub-block that rolled itself back, so nothing was kept; file applied on ethio-prod and not editable | until INC-979 closed
scripts/migration-real-row-allowlist.txt:35:20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.seller_alias IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.name_ch | INC-979: the backfill statement under test (and its no-alias-left check) spans every profile by design; inside the proof it ran in the sub-block that rolled itself back, so nothing was kept; file applied on ethio-prod and not editable | until INC-979 closed
scripts/migration-real-row-allowlist.txt:39:20261029085507_709fb25b-c8da-47f0-b50f-c1e6a5ab9b80.sql | IF (SELECT seller_alias FROM public.profiles WHERE user_id = v_u) IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-1c colu | reads only the proof's own scratch e2e-n1b2 user (v_u, inserted in the proof); rolled back on the M1 sentinel; file applied on ethio-prod and not editable (missed at stop 1, recorded at N1b-2b) | until INC-977 closed
scripts/migration-real-row-allowlist.txt:40:20261029085507_709fb25b-c8da-47f0-b50f-c1e6a5ab9b80.sql | IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u) OR EXISTS (SELECT 1 FROM public.alias_history WHERE user_id = v_u) T | the proof's rollback check: reads only its own scratch e2e-n1b2 user (v_u) and that user's scratch history rows (INC-980); file applied on ethio-prod and not editable | until INC-977 closed
scripts/migration-real-row-allowlist.txt:49:20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql | ', ' -- P-2 (a) M-1b (D305) — the free baseline: an ad at the baseline level publishes only while the seller''s -- com | not a statement: the text is a string constant inside the proof — the publish door's insertion, which the proof reverts to assert M4b's md5 (P-2 M-1b part 5); the proof reads no table at all | permanent (a landed file is not editable)
e2e/admin-listings.spec.ts:359:  test("AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note", async ({
e2e/admin-listings.spec.ts:383:    expect((await edit(target.id, { seller_id: user.id })).error).toBe("not editable: seller_id");
e2e/admin-listings.spec.ts:1975:    expect(asSeller).toMatchObject({ error: "not editable: category_id" });
e2e/my-listings-doors.spec.ts:872:      [X, { category_id: a.parentId }, "not editable: category_id"],
e2e/my-listings-doors.spec.ts:873:      [X, { poster_expires_at: new Date().toISOString() }, "not editable: poster_expires_at"],
### a draft is written in the posting form
e2e/my-listings-doors.spec.ts:876:      [D, { title: `E2E new words ${token()}` }, "a draft is written in the posting form"],
### an ad in review is edited once
e2e/my-listings-doors.spec.ts:342:      "an ad in review is edited once its review is done",
e2e/my-listings-doors.spec.ts:880:        "an ad in review is edited once its review is done",
src/features/my-listings/my-listing-edit.test.ts:92:      ["an ad in review is edited once its review is done", "myListings.ad.waiting"],
### an expired listing is renewed before
e2e/my-listings-doors.spec.ts:556:      "an expired listing is renewed before it is edited",
e2e/my-listings-doors.spec.ts:885:        "an expired listing is renewed before it is edited",
### this listing is not edited
e2e/my-listings-doors.spec.ts:887:      [O, { title: `E2E new words ${token()}` }, "this listing is not edited"],
### coverage must be a list
e2e/my-listings-doors.spec.ts:874:      [X, { coverage: "x" }, "coverage must be a list"],
### contact_pref must be an object
e2e/my-listings-doors.spec.ts:875:      [X, { contact_pref: [] }, "contact_pref must be an object"],
### nothing changed
e2e/admin-listings.spec.ts:466:    expect(again.error).toBe("nothing changed");
e2e/admin-listings.spec.ts:1436:   * Review; a step with nothing changed writes no revision.
e2e/admin-listings.spec.ts:1438:  test("AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision", async ({
e2e/admin-listings.spec.ts:1489:    // ad's title → nothing typed → Save → nothing changed → no revision, no notice.
e2e/my-listings-doors.spec.ts:890:      [X, { title: X.title }, "nothing changed"],
e2e/post-wizard-bundle2.spec.ts:1674:   * with nothing changed: no identity call at all.
e2e/post-wizard-bundle2.spec.ts:1676:  test("PW-144 leaving the contact step makes one identity call, or none when nothing changed", async ({
e2e/post-wizard-bundle2.spec.ts:1709:      expect(calls.length - mark, `PW-144: pass ${pass} with nothing changed called identity`).toBe(
e2e/post-wizard-bundle2.spec.ts:1769:    expect(calls.length - mark, "PW-185: nothing changed, yet identity was called").toBe(0);
e2e/admin-attributes-editor.spec.ts:946:      /* Nothing was chosen, so nothing changed. */
e2e/admin-attributes-editor.spec.ts:1243:      /* Nothing was chosen, so nothing changed. */
e2e/admin-attributes-editor.spec.ts:1511:      /* Nothing was chosen, so nothing changed (DB truth, J4). */
src/features/posting/use-edit-draft.test.ts:278:    editAdminListing.mockRejectedValueOnce(new Error("nothing changed"));
src/features/posting/use-draft.ts:184:   * work is cleared ONLY if nothing changed while it was in the air; otherwise
src/features/my-listings/my-listing.ts:256:  if (message.includes("nothing changed") || message.includes("nothing to change"))
src/features/my-listings/my-listing-edit.test.ts:91:      ["nothing changed", "myListings.editBox.nothing"],
src/features/admin-listings/edit-listing.test.ts:48:  it("LE-1 the form opens on the listing as it stands; nothing changed sends nothing", () => {
src/features/admin-listings/edit-listing.test.ts:144:    expect(editErrorKey("nothing changed")).toBe("admin.listings.edit.nothing");
src/features/admin-listings/tier-reasons.test.ts:106:    expect(tierErrorKey("nothing changed")).toBe("admin.listings.level.error.same");
src/features/admin-listings/undo-edit.ts:13: * `admin_undo_listing_edit` decides (F3): it also checks that nothing changed
src/features/admin-listings/tier-reasons.ts:92:  if (message === "nothing changed") return "admin.listings.level.error.same";
src/features/admin-listings/edit-listing.ts:257:  if (message === "nothing changed" || message === "nothing to change") {
### unknown status
  (none)
### owner only
scripts/public-surface-allowlist.txt:117:my_listing_certification | authenticated | the seller's own ad: the publishing statements that apply and whether an acceptance is owed; signed in, owner only (B22 Stage 1 turn 4)
e2e/my-listings-doors.spec.ts:357:    expect((await reopen(b, x.id)).error).toBe("owner only: closed -> active");
e2e/my-listings-doors.spec.ts:362:    expect(service.error?.message ?? null).toBe("owner only: closed -> active");
src/features/my-listings/my-listing.ts:273:    message.includes("owner only") ||
### reviewer only
  (none)
### a listing its owner deleted is not restored
e2e/my-listings-ad.spec.ts:672:    expect(restore.error?.message ?? null).toBe("a listing its owner deleted is not restored");
### enforcement only
e2e/admin-listings.spec.ts:620:    ).toBe("enforcement only: removed -> screening");
src/features/my-listings/my-listing.ts:263:  if (message.includes("removed by enforcement only")) return "myListings.error.severe";
src/features/my-listings/my-listing.test.ts:138:      actionErrorKey("a listing rejected for a severe reason is removed by enforcement only"),
### removed for a severe reason
e2e/admin-listings.spec.ts:633:      "a listing removed for a severe reason is restored by a super admin only",
src/features/admin-listings/move-reasons.test.ts:58:      moveErrorKey("a listing removed for a severe reason is restored by a super admin only"),
src/features/admin-listings/move-reasons.ts:60:  if (message.startsWith("a listing removed for a severe reason"))
### service only
e2e/my-listings-levels.spec.ts:147:/** The sweep's core on the test's own ads (service only). */
### rejected for a severe reason
src/features/my-listings/my-listing.test.ts:138:      actionErrorKey("a listing rejected for a severe reason is removed by enforcement only"),
````

### A5. `rg -n "answeredId" src e2e scripts`

````
scripts/route-budgets.mjs:38:  "/admin/audit": { ceiling: 296, public: false }, // DEC-296 (turn F1-4b, the places and markets clients on readRefusal): local 295.1 KiB, over 295 — locations-service.ts reads {ok:true,id} through categories-service's answeredId, so categories-service.js (1.5 KiB) joins the chunk set of every page that carries locations-service.js without it; locations-service.js 1.9 → 1.6 (the mapper left), against base 51a99915d; 295 → 296 = ceilingForLocal(295.1); was 295. DEC-296 (housekeeping turn 4, part C): local 294.3 KiB, +1.2 on part B's 293.1 — INC-1042: the admin navigation into the admin chunks (+1.2 KiB; small chunks compress worse than the entry); 294 → 295 = ceilingForLocal(294.3); was 294. DEC-296 (housekeeping turn 3b): local 292.6 + 0.1 KiB sat inside the NEAR band of 293 — DEC-367's settled-language attribute in the root language provider (settle, unsettle and the account rule's exits), +0.07 KiB (71 bytes gzipped) on the entry chunk every page downloads, against base f3b215762; 293 → 294 = ceilingForLocal(292.6); was 293. DEC-296 (turn P-1c b): local 301.1 KiB, over 300 — the one Guide sheet shared by both forms, split out of data-table.js (guide-sheet.js 2.2, data-table −1.6), the forms' contract guide-spec.js 0.2, and the +0.9 KiB artefact on every page (the Guide sheet's strings gate referenced from a route chunk splits spinner and on-demand-notice out of the entry: two chunks, cached after the first page, the entry −0.6); +2.0 on base eb72f3bd's 299.1; 300 → 302 = ceilingForLocal(301.1); was 300. DEC-296 (turn P-1c): local 298.9 KiB, over 298 — D313's Guide on every DataTable (P-1c): the control, the Sheet facade's shell, the StringsLayerGate and resilientLazy around the on-demand body, and the toolbar clone in data-table.tsx (+1.3–1.5 KiB on every DataTable page; the body and the guide layer stay on demand); 298 → 300 = ceilingForLocal(298.9); was 298. DEC-296 (turn S6-3, the ratchet): local 296.6 KiB, 8 KiB or more under 316 — the Filters panel's popover (Radix's popover with its floating-ui layer, and visible-area.ts) left this page's first download for the overlay chunk (row 48), with the entry's +0.2 KiB (the popover's facade in overlay-facade.tsx); 316 → 298 = ceilingForLocal(296.6); was 316. DEC-296 (turn S6-1): local 314.6 KiB, over 314 — the one dialog look on this page's dialogs (dialog-look.ts, the rebuilt dialog, alert-dialog and sheet parts, the field look inside a panel), with the entry's +0.2 KiB (menu-row.ts's LIST_CHOICE_ON and LIST_ROW_WRAP); 314 → 316 = ceilingForLocal(314.6); was 314. DEC-296 (turn C2): local 313.1 KiB, over 312 — the shared root growth: C1's press listener and PRESSED, C2's tap tick, release fade, useMenuAt and the bottom bar's rule (CI 3033041c's per-page red); 312 → 314 = floor(313.1 + 0.3) + 1; was 312. turn F (D264: the shared list constants in menu-row.ts and OPEN_CONTROL on the header controls, on every page): local 310.7998 KiB; 311 → 312 = ceilingForLocal (DEC-296), inside the 0.3 KiB NEAR band. SAGE-S1 (the Sage shell classes on every page: the one menu tile, the top bar's control look, the phone bar's pill and disc, --bar-rise): +0.3 KiB measured against b1bbeebe; the NEAR band (R4); was 310. 308.7344 KiB (+0.4883); the sub-menu mechanism's first-paint half (DEC-288): the rail rows' panel signals, the panel on demand; was 309. 308.2178 KiB (-0.1328); page heads in the reader's language: base text moved from route literals to keys, re-title on demand (INC-990); was 309. 308.3506 KiB (+0.4453); the reader-order and country-name mechanism in one shared module, replacing inline copies (L-2c); was 309. 307.9 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 304.1 // ratchet housekeeping-1b (292.6 KiB local; DEC-362)
scripts/route-budgets.mjs:42:  "/admin/impersonation_/$sessionId": { ceiling: 294, public: false }, // DEC-296 (turn F1-4b, the places and markets clients on readRefusal): local 292.8 + 0.1 KiB sat inside the NEAR band of 293 — locations-service.ts reads {ok:true,id} through categories-service's answeredId, so categories-service.js (1.5 KiB) joins the chunk set of every page that carries locations-service.js without it; locations-service.js 1.9 → 1.6 (the mapper left), against base 51a99915d; 293 → 294 = ceilingForLocal(292.8); was 293. DEC-296 (the app-fixes turn, parts C, D, INC-1130, the NEAR band): local 291.8 + 0.1 KiB sat inside the band of 292 — every panel gives the focus back to its opener: the hook (dialog-opener.ts) joined the notice-outlet chunk every panel imports (0.2 → 0.7 KiB; dialog.js 1.2 → 0.9 as its press code moved into it, sheet 1.6 → 1.7, alert-dialog 0.8 → 0.9); +0.6 on part B's (7ea280e59) 291.2; 292 → 293 = ceilingForLocal(291.8); was 292. DEC-296 (the app-fixes turn, part A, DEC-372): local 291.2 KiB, over 290 — the impersonation hook and service left the entry (every page −0.6 KiB) for chunks of their own, which this page's view imports (use-impersonation.js 0.7, impersonation-service.js 0.8 and useMutation.js 1.0 KiB: small chunks compress worse than the entry); +1.7 on base 3e3a51a89's 289.5; 290 → 292 = ceilingForLocal(291.2); was 290. DEC-296 (housekeeping turn 4, part C): local 289.4 KiB, +1.1 on part B's 288.3 — INC-1042: the admin navigation into the admin chunks (+1.1 KiB; small chunks compress worse than the entry); 289 → 290 = ceilingForLocal(289.4); was 289. DEC-296 (turn S6-3, the ratchet; turn F4b's raise comes back down): local 297.4 KiB, 8 KiB or more under 317 — the Filters panel's popover (Radix's popover with its floating-ui layer, and visible-area.ts) left this page's first download for the overlay chunk (row 48), with the entry's +0.2 KiB (the popover's facade in overlay-facade.tsx); 317 → 298 = ceilingForLocal(297.4); was 317. DEC-296 (turn S6-2, the NEAR band): local 315.6 + 0.1 KiB sat inside the band of 316 — NativeSelect, which DataTable's page-size picker draws, now sits in its own chunk with its two looks (the bundler split it out of the shared table chunk once 20 more files import it), with the entry's dependency map naming the new chunk; 316 → 317 = ceilingForLocal(315.6); was 316. DEC-296 (turn S6-1): local 315.3 KiB, over 315 — the one dialog look on this page's dialogs (dialog-look.ts, the rebuilt dialog, alert-dialog and sheet parts, the field look inside a panel), with the entry's +0.2 KiB (menu-row.ts's LIST_CHOICE_ON and LIST_ROW_WRAP); 315 → 316 = ceilingForLocal(315.3); was 315. DEC-296 (turn C2): local 313.9 KiB, over 313 — the shared root growth: C1's press listener and PRESSED, C2's tap tick, release fade, useMenuAt and the bottom bar's rule (CI 3033041c's per-page red); 313 → 315 = floor(313.9 + 0.3) + 1; was 313. turn F4b (F4a-2's popover reading collisionPaddingNow: src/lib/visible-area.ts on the admin toolbar's first paint): CI e1e736df measured 312.2 KiB; 312 → 313 = ceilingFor(312.2) (DEC-296). DEC-296 (turn A): local 310.88 + 0.1 = 311.0 KiB sat inside the NEAR band; 311 → 312 = floor(311.0 + 0.3) + 1. R1d-c (DEC-302: D259 Home row, D255 strip level, D240 menu panels, one current-item rule, D258 band row, INC-1013 ready mark): +1 KiB; was 310. 309.8408 KiB (+0.7929 against fa5c333f). CI's size taken as local 308.8467 + 0.1 = 308.9 KiB: CI's size + the NEAR band (INC-1003); was 309. 308.8467 KiB (-0.1436); page heads in the reader's language: base text moved from route literals to keys, re-title on demand (INC-990); was 310. 308.9902 KiB (+0.4287); the reader-order and country-name mechanism in one shared module, replacing inline copies (L-2c); was 309. 307.9 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 304.6 // ratchet housekeeping-1b (287.7 KiB local; DEC-362)
scripts/route-budgets.mjs:52:  "/admin/roles": { ceiling: 295, public: false }, // DEC-296 (turn F1-4b, the places and markets clients on readRefusal): local 294.1 KiB, over 294 — locations-service.ts reads {ok:true,id} through categories-service's answeredId, so categories-service.js (1.5 KiB) joins the chunk set of every page that carries locations-service.js without it; locations-service.js 1.9 → 1.6 (the mapper left), against base 51a99915d; 294 → 295 = ceilingForLocal(294.1); was 294. DEC-296 (turn F1-2, the roles and users clients on readRefusal): local 293.0 KiB, over 293 — refusal.ts (refusal.js 1.1 KiB, already a chunk of its own on the listing pages) joins this page's first download through use-admin-roles.js (roles-service.ts reads the roles family's refusals through readRefusal), with the entry's dependency map naming it (+21 B gzip, every page); +1.2 on base 13f204493's 291.8; 293 → 294 = ceilingForLocal(293.0); was 293. DEC-296 (the app-fixes turn, parts C, D, INC-1130): local 292.0 KiB reached its ceiling of 292 — every panel gives the focus back to its opener: the hook (dialog-opener.ts) joined the notice-outlet chunk every panel imports (0.2 → 0.7 KiB; dialog.js 1.2 → 0.9 as its press code moved into it, sheet 1.6 → 1.7, alert-dialog 0.8 → 0.9); +0.5 on part B's (7ea280e59) 291.5; 292 → 293 = ceilingForLocal(292.0); was 292. DEC-296 (housekeeping turn 4, part C): local 291.1 KiB, +1.2 on part B's 289.9 — INC-1042: the admin navigation into the admin chunks (+1.2 KiB; small chunks compress worse than the entry); 291 → 292 = ceilingForLocal(291.1); was 291. DEC-296 (housekeeping turn 4, part A): local 289.9 + 0.1 KiB sat inside the NEAR band of 290 — DEC-370's safe-href.ts and save-file.ts in the shared-shell chunk every page downloads (shared-shell 29.2 → 29.6 KiB, the index +0.1, against base db13e13b7); 290 → 291 = ceilingForLocal(289.9); was 290. DEC-296 (turn P-1c b): local 297.9 KiB, over 297 — the one Guide sheet shared by both forms, split out of data-table.js (guide-sheet.js 2.2, data-table −1.6), the forms' contract guide-spec.js 0.2, and the +0.9 KiB artefact on every page (the Guide sheet's strings gate referenced from a route chunk splits spinner and on-demand-notice out of the entry: two chunks, cached after the first page, the entry −0.6); +1.9 on base eb72f3bd's 296.0; 297 → 299 = ceilingForLocal(297.9); was 297. DEC-296 (turn P-1c): local 295.7 KiB, over 295 — D313's Guide on every DataTable (P-1c): the control, the Sheet facade's shell, the StringsLayerGate and resilientLazy around the on-demand body, and the toolbar clone in data-table.tsx (+1.3–1.5 KiB on every DataTable page; the body and the guide layer stay on demand); 295 → 297 = ceilingForLocal(295.7); was 295. DEC-296 (turn S4, the NEAR band): local 293.7 + 0.1 KiB sat inside the band of 294 — the entry's +0.2 KiB (its dependency map naming Sage S4's split card chunks); 294 → 295 = ceilingForLocal(293.7); was 294. DEC-296 (turn S6-3, the ratchet; turn F4b's raise comes back down): local 293.5 KiB, 8 KiB or more under 313 — the Filters panel's popover (Radix's popover with its floating-ui layer, and visible-area.ts) left this page's first download for the overlay chunk (row 48), with the entry's +0.2 KiB (the popover's facade in overlay-facade.tsx); 313 → 294 = ceilingForLocal(293.5); was 313. DEC-296 (turn S6-1): local 311.8 KiB, inside the NEAR band of 312 — the one dialog look on this page's dialogs (dialog-look.ts, the rebuilt dialog, alert-dialog and sheet parts, the field look inside a panel), with the entry's +0.2 KiB (menu-row.ts's LIST_CHOICE_ON and LIST_ROW_WRAP); S6-3 takes the step-up gate's dialog on demand; 312 → 313 = ceilingForLocal(311.8); was 312. DEC-296 (turn C2): local 310.7 KiB, over 310 — the shared root growth: C1's press listener and PRESSED, C2's tap tick, release fade, useMenuAt and the bottom bar's rule (CI 3033041c's per-page red); 310 → 312 = floor(310.7 + 0.3) + 1; was 310. turn F4b (F4a-2's popover reading collisionPaddingNow: src/lib/visible-area.ts on the admin toolbar's first paint): CI e1e736df measured 309.2 KiB; 309 → 310 = ceilingFor(309.2) (DEC-296). DEC-296 (turn A): CI 398a5859 = 308.0 KiB sat inside the NEAR band; 308 → 309 = floor(308.0 + 0.3) + 1. R1d-c (DEC-302: D259 Home row, D255 strip level, D240 menu panels, one current-item rule, D258 band row, INC-1013 ready mark): +1 KiB; was 307. 306.8018 KiB (+0.7911 against fa5c333f). CI's size 306.0 KiB: CI's size + the NEAR band (INC-1003); was 306. 305.8115 KiB (-0.1455); page heads in the reader's language: base text moved from route literals to keys, re-title on demand (INC-990); was 307. 305.9570 KiB (+0.5176); the reader-order and country-name mechanism in one shared module, replacing inline copies (L-2c); was 306. 302.1 // ratchet housekeeping-1b (289.4 KiB local; DEC-362)
scripts/route-budgets.mjs:55:  "/admin/translations": { ceiling: 306, public: false }, // DEC-296 (turn F1-4b, the places and markets clients on readRefusal): local 305.3 KiB, over 305 — locations-service.ts reads {ok:true,id} through categories-service's answeredId, so categories-service.js (1.5 KiB) joins the chunk set of every page that carries locations-service.js without it; locations-service.js 1.9 → 1.6 (the mapper left), against base 51a99915d; 305 → 306 = ceilingForLocal(305.3); was 305. DEC-296 (turn F1-2, the roles and users clients on readRefusal): local 304.0 KiB, over 304 — refusal.ts (refusal.js 1.1 KiB, already a chunk of its own on the listing pages) joins this page's first download through use-admin-users.js (admin-users-service.ts reads the profile editor's refusals through readRefusal), with the entry's dependency map naming it (+21 B gzip, every page); +1.2 on base 13f204493's 302.8; 304 → 305 = ceilingForLocal(304.0); was 304. DEC-296 (the app-fixes turn, parts C, D, F, INC-1130, INC-1137): local 303.0 KiB reached its ceiling of 303 — every panel gives the focus back to its opener: the hook (dialog-opener.ts) joined the notice-outlet chunk every panel imports (0.2 → 0.7 KiB; alert-dialog 0.8 → 0.9 as its press code moved into it), and the pseudo bar names the keys it could not write (admin.translations 5.8 → 5.9 KiB); +0.7 on part B's (7ea280e59) 302.3; 303 → 304 = ceilingForLocal(303.0); was 303. DEC-296 (housekeeping turn 4, part C): local 301.9 KiB, +1.1 on part B's 300.8 — INC-1042: the admin navigation into the admin chunks (+1.1 KiB; small chunks compress worse than the entry); 302 → 303 = ceilingForLocal(301.9); was 302. DEC-296 (housekeeping turn 4, part A): local 300.7 + 0.1 KiB sat inside the NEAR band of 301 — DEC-370's safe-href.ts and save-file.ts in the shared-shell chunk every page downloads (shared-shell 29.2 → 29.6 KiB, the index +0.1, against base db13e13b7); 301 → 302 = ceilingForLocal(300.7); was 301. DEC-296 (turn P-1c d, the ratchet): local 308.7 KiB, 8 KiB or more under 433 — the fold of the whole-catalogue imports, turn P-1c d; the layer bytes a visitor actually saves are the guide layer and the join — the admin and member layers are fetched by the admin layout's gate (−123.0 on base cfecc476f's 431.7); 433 → 310 = ceilingForLocal(308.7); was 433. DEC-296 (turn P-1c c): local 431.7 KiB, over 420 — the sixteen admin blocks' guide texts join the guide layer; this page imports the whole catalogue (roadmap line 7 — languages-page.tsx:28–29) so the layer rides its first download: +12.5 KiB on base 484b6bb3f's 419.2; comes back down when the fold lands; 420 → 433 = ceilingForLocal(431.7); was 420. DEC-296 (turn P-1c b): local 419.2 KiB, over 413 — K2: the console imports the guide catalogues (en-guide, am-guide) whole, so the 84 page-Guide keys ride in its first download (+2.3 per catalogue; the fold of the three whole-catalogue imports is the roadmap line, ruling 2), the one Guide sheet shared by both forms split out of data-table.js (guide-sheet.js 2.2, data-table −1.6) and guide-spec.js 0.2, and the +0.9 KiB artefact on every page (the Guide sheet's strings gate referenced from a route chunk splits spinner and on-demand-notice out of the entry: two chunks, cached after the first page, the entry −0.6); +7.1 on base eb72f3bd's 412.1; 413 → 420 = ceilingForLocal(419.2); was 413. DEC-296 (turn P-1c): local 411.9 KiB, over 406 — D313's Guide on every DataTable (P-1c): the control, the Sheet facade's shell, the StringsLayerGate and resilientLazy around the on-demand body, and the toolbar clone in data-table.tsx (+1.3–1.5 KiB on every DataTable page; the body and the guide layer stay on demand); and the `guide` layer joined into en.ts and am.ts, which languages-page.tsx :28–29 imports whole (+5.9 KiB; folding those imports is a K2 roadmap line); 406 → 413 = ceilingForLocal(411.9); was 406. DEC-296 (turn P-1b): local 404.7 KiB, over 404 — the strings console bundles every compiled key in both languages: P-1b's admin.monetisation.* keys (74 added, 15 retired: en-admin +0.8, am-admin +1.0 KiB), the entry -0.05 KiB (two routes left the route tree); 404 → 406 = ceilingForLocal(404.7); was 404. DEC-296 (turn P-1): local 402.9 KiB, over 401 — the strings console bundles every compiled key in both languages: P-1's admin.packages.* and plan-dial keys (en-admin +1.0, am-admin +1.1 KiB), with the entry's +0.3 KiB (the /admin/packages route and section on every page); 401 → 404 = ceilingForLocal(402.9); was 401. DEC-296 (turn S4, the NEAR band): local 399.7 + 0.1 KiB sat inside the band of 400 — the entry's +0.2 KiB (its dependency map naming Sage S4's split card chunks); 400 → 401 = ceilingForLocal(399.7); was 400. DEC-296 (turn S6-3, the ratchet): local 399.5 KiB, 8 KiB or more under 419 — the Filters panel's popover (Radix's popover with its floating-ui layer, and visible-area.ts) left this page's first download for the overlay chunk (row 48), with the entry's +0.2 KiB (the popover's facade in overlay-facade.tsx); 419 → 400 = ceilingForLocal(399.5); was 419. DEC-296 (turn S6-1): local 417.8 KiB, inside the NEAR band of 418 — the one dialog look on this page's dialogs (dialog-look.ts, the rebuilt dialog, alert-dialog and sheet parts, the field look inside a panel), with the entry's +0.2 KiB (menu-row.ts's LIST_CHOICE_ON and LIST_ROW_WRAP); S6-3 takes the step-up gate's dialog on demand; 418 → 419 = ceilingForLocal(417.8); was 418. DEC-296 (turn C2): local 417.3 KiB, over 416 — the shared root growth: C1's press listener and PRESSED, C2's tap tick, release fade, useMenuAt and the bottom bar's rule (CI 3033041c's per-page red); 416 → 418 = floor(417.3 + 0.3) + 1; was 416. turn F (D264: the shared list constants in menu-row.ts and OPEN_CONTROL on the header controls, on every page): local 414.8350 KiB; 415 → 416 = ceilingForLocal (DEC-296), inside the 0.3 KiB NEAR band. SAGE-S1 (the Sage shell classes on every page: the one menu tile, the top bar's control look, the phone bar's pill and disc, --bar-rise): +0.3 KiB measured against b1bbeebe; the NEAR band (R4); was 414. 412.7578 KiB (+0.4932); the sub-menu mechanism's first-paint half (DEC-288): the rail rows' panel signals, the panel on demand; was 413. 412.1201 KiB (+1.1309); the strings console bundles every compiled key in both languages (languages-page.tsx :28–:29): +44 page-head keys (INC-990); was 412. 410.9893 KiB (+0.5371); the reader-order and country-name mechanism in one shared module, replacing inline copies (L-2c); was 411. 410.5 (CI-1 local build: D239's account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page; INC-864 keeps reader-failure lazy); was 409.8 (CI-1, run on 9b8a8cdc: N1b-3c's 37 admin-layer strings); was 408.4 (INC-974: the rail seed, +0.3 on every page — the blank-menu fix) // ratchet housekeeping-1b (300.2 KiB local; DEC-362)
scripts/route-budgets.mjs:56:  "/admin/translations_/$lang": { ceiling: 310, public: false }, // DEC-296 (turn F1-4b, the places and markets clients on readRefusal): local 308.7 KiB, over 308 — locations-service.ts reads {ok:true,id} through categories-service's answeredId, so categories-service.js (1.5 KiB) joins the chunk set of every page that carries locations-service.js without it; locations-service.js 1.9 → 1.6 (the mapper left), against base 51a99915d; 308 → 310 = ceilingForLocal(308.7); was 308. DEC-296 (turn F1-3, the translations and legal clients on readRefusal): local 307.5 KiB, over 307 — refusal.ts (refusal.js 1.1 KiB, already a chunk of its own on /admin/translations and the listing pages) joins this page's first download through use-translations.js (translations-service.ts reads the family's refusals through readRefusal and its answers through shape guards: use-translations.js +0.2 KiB), less the three mfa.* keys leaving the base catalogue for the member layer (shared-shell.js −61 B gzip, every page); +1.2 on base a67a3fbda's 306.3; 307 → 308 = ceilingForLocal(307.5); was 307. DEC-296 (the app-fixes turn, part A, DEC-372, the NEAR band): local 305.8 + 0.1 KiB sat inside the band of 306 — the impersonation banner left the entry (every page −0.6 KiB), and with it react-query's useMutation and query-core's mutation observer, now a chunk of their own that this page's actions import (useMutation.js 1.0 KiB; query-core's mutation and mutation cache stay in index.js); +0.2 on base 3e3a51a89's 305.6; 306 → 307 = ceilingForLocal(305.8); was 306. DEC-296 (housekeeping turn 4, part C): local 305.4 KiB, +1.1 on part B's 304.3 — INC-1042: the admin navigation into the admin chunks (+1.1 KiB; small chunks compress worse than the entry); 305 → 306 = ceilingForLocal(305.4); was 305. DEC-296 (turn P-1c b): local 312.3 KiB, over 311 — the one Guide sheet shared by both forms, split out of data-table.js (guide-sheet.js 2.2, data-table −1.6), the forms' contract guide-spec.js 0.2, and the +0.9 KiB artefact on every page (the Guide sheet's strings gate referenced from a route chunk splits spinner and on-demand-notice out of the entry: two chunks, cached after the first page, the entry −0.6); +1.9 on base eb72f3bd's 310.4; 311 → 313 = ceilingForLocal(312.3); was 311. DEC-296 (turn P-1c): local 310.2 KiB, over 310 — D313's Guide on every DataTable (P-1c): the control, the Sheet facade's shell, the StringsLayerGate and resilientLazy around the on-demand body, and the toolbar clone in data-table.tsx (+1.3–1.5 KiB on every DataTable page; the body and the guide layer stay on demand); 310 → 311 = ceilingForLocal(310.2); was 310. DEC-296 (turn P-1, the NEAR band): local 308.8 + 0.1 KiB sat inside the band of 309 — the shared root growth: the /admin/packages route in the route tree and the entry's dependency map, and the Packages section (sections.ts, rail-items.ts), on every page (+0.3 KiB against base 94249bf8); 309 → 310 = ceilingForLocal(308.8); was 309. DEC-296 (turn S6-3, the ratchet): local 307.9 KiB, 8 KiB or more under 328 — the Filters panel's popover (Radix's popover with its floating-ui layer, and visible-area.ts) left this page's first download for the overlay chunk (row 48), with the entry's +0.2 KiB (the popover's facade in overlay-facade.tsx); 328 → 309 = ceilingForLocal(307.9); was 328. DEC-296 (turn S6-1): local 326.9 KiB, inside the NEAR band of 327 — the one dialog look on this page's dialogs (dialog-look.ts, the rebuilt dialog, alert-dialog and sheet parts, the field look inside a panel), with the entry's +0.2 KiB (menu-row.ts's LIST_CHOICE_ON and LIST_ROW_WRAP); S6-3 takes the step-up gate's dialog on demand; 327 → 328 = ceilingForLocal(326.9); was 327. DEC-296 (turn C2): local 325.9 KiB, over 325 — the shared root growth: C1's press listener and PRESSED, C2's tap tick, release fade, useMenuAt and the bottom bar's rule (CI 3033041c's per-page red); 325 → 327 = floor(325.9 + 0.3) + 1; was 325. turn F2 (INC-1027: the checked-state look in LIST_ROW, read by the menus and the searchable picker on this page): local 323.7383 KiB; 324 → 325 = ceilingForLocal (DEC-296), inside the 0.3 KiB NEAR band. SAGE-S2 CI budget correction: CI 398a5859 measured 323.2 KiB; 323 → 324 = floor(323.2 + 0.3) + 1 (DEC-296). Shared band look/current pill, location track intrinsic-width fix and D261 single shadow-transfer observer grow the shell on every page; 321.6631 KiB (+0.1084); the phone menu opens at the page's level with its current row in view (D246, app-rail.tsx in the entry) and the panel's surface utilities in the shared stylesheet (D245; the panel's code stays on demand); the NEAR band, DEC-296; was 322. 321.0391 KiB (-0.1455); page heads in the reader's language: base text moved from route literals to keys, re-title on demand (INC-990); was 322. 321.1846 KiB (+0.4297); the reader-order and country-name mechanism in one shared module, replacing inline copies (L-2c); was 322. 320.8 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the console's relative times (relative-time); the NEAR band, R4); before: 320.1 (CI-1 local build: D239's account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page; INC-864 keeps reader-failure lazy); was 316.6 // ratchet housekeeping-1b (303.8 KiB local; DEC-362)
scripts/route-budgets.mjs:57:  "/admin/users": { ceiling: 294, public: false }, // DEC-296 (turn F1-4b, the places and markets clients on readRefusal): local 293.0 KiB, over 293 — locations-service.ts reads {ok:true,id} through categories-service's answeredId, so categories-service.js (1.5 KiB) joins the chunk set of every page that carries locations-service.js without it; locations-service.js 1.9 → 1.6 (the mapper left), against base 51a99915d; 293 → 294 = ceilingForLocal(293.0); was 293. DEC-296 (the app-fixes turn, parts C, D, INC-1130): local 292.1 KiB over its ceiling of 292 — every panel gives the focus back to its opener: the hook (dialog-opener.ts) joined the notice-outlet chunk every panel imports (0.2 → 0.7 KiB; dialog.js 1.2 → 0.9 as its press code moved into it, sheet 1.6 → 1.7, alert-dialog 0.8 → 0.9); +0.5 on part B's (7ea280e59) 291.6; 292 → 293 = ceilingForLocal(292.1); was 292. DEC-296 (housekeeping turn 4, part C): local 291.2 KiB, +1.1 on part B's 290.1 — INC-1042: the admin navigation into the admin chunks (+1.1 KiB; small chunks compress worse than the entry); 291 → 292 = ceilingForLocal(291.2); was 291. DEC-296 (housekeeping turn 4, part A): local 290.0 KiB, over 290 — DEC-370's safe-href.ts and save-file.ts in the shared-shell chunk every page downloads (shared-shell 29.2 → 29.6 KiB, the index +0.1, against base db13e13b7); 290 → 291 = ceilingForLocal(290.0); was 290. DEC-296 (turn P-1c b): local 297.6 KiB, over 297 — the one Guide sheet shared by both forms, split out of data-table.js (guide-sheet.js 2.2, data-table −1.6), the forms' contract guide-spec.js 0.2, and the +0.9 KiB artefact on every page (the Guide sheet's strings gate referenced from a route chunk splits spinner and on-demand-notice out of the entry: two chunks, cached after the first page, the entry −0.6); +1.9 on base eb72f3bd's 295.7; 297 → 299 = ceilingForLocal(297.6); was 297. DEC-296 (turn P-1c part E, the NEAR band): local 295.7 + 0.1 KiB sat inside the band of 296 — a row's expansion mounted in the drawn twin only (use-drawn-twin.ts in data-table.tsx, +0.3 KiB on every DataTable page); 296 → 297 = ceilingForLocal(295.7); was 296. DEC-296 (turn P-1c): local 295.4 KiB, over 295 — D313's Guide on every DataTable (P-1c): the control, the Sheet facade's shell, the StringsLayerGate and resilientLazy around the on-demand body, and the toolbar clone in data-table.tsx (+1.3–1.5 KiB on every DataTable page; the body and the guide layer stay on demand); 295 → 296 = ceilingForLocal(295.4); was 295. DEC-296 (turn W3): local 293.8 KiB, +0.3 on base bd97c81c (293.5), inside the NEAR band of 294 — the shared root growth: press.ts's iPhone switch, NOTICE_DOCK on the shell's notices, panelAt and the panel tabs' chosen mark; 294 → 295 = ceilingForLocal(293.8); was 294. DEC-296 (turn S6-3, the ratchet; turn F4b's raise comes back down): local 293.2 KiB, 8 KiB or more under 312 — the Filters panel's popover (Radix's popover with its floating-ui layer, and visible-area.ts) left this page's first download for the overlay chunk (row 48), with the entry's +0.2 KiB (the popover's facade in overlay-facade.tsx); 312 → 294 = ceilingForLocal(293.2); was 312. DEC-296 (turn S6-1): local 311.1 KiB, over 311 — the one dialog look on this page's dialogs (dialog-look.ts, the rebuilt dialog, alert-dialog and sheet parts, the field look inside a panel), with the entry's +0.2 KiB (menu-row.ts's LIST_CHOICE_ON and LIST_ROW_WRAP); 311 → 312 = ceilingForLocal(311.1); was 311. DEC-296 (turn C2): local 309.7 KiB, over 309 — the shared root growth: C1's press listener and PRESSED, C2's tap tick, release fade, useMenuAt and the bottom bar's rule (CI 3033041c's per-page red); 309 → 311 = floor(309.7 + 0.3) + 1; was 309. turn F4b (F4a-2's popover reading collisionPaddingNow: src/lib/visible-area.ts on the admin toolbar's first paint): CI e1e736df measured 308.2 KiB; 308 → 309 = ceilingFor(308.2) (DEC-296). DEC-296 (turn A): CI 398a5859 = 307.0 KiB sat inside the NEAR band; 307 → 308 = floor(307.0 + 0.3) + 1. R1d-c (DEC-302: D259 Home row, D255 strip level, D240 menu panels, one current-item rule, D258 band row, INC-1013 ready mark): +1 KiB; was 306. 305.7998 KiB (+0.7910 against fa5c333f). CI's size 305.0 KiB: CI's size + the NEAR band (INC-1003); was 305. 304.8115 KiB (-0.1465); page heads in the reader's language: base text moved from route literals to keys, re-title on demand (INC-990); was 306. 304.9580 KiB (+0.4287); the reader-order and country-name mechanism in one shared module, replacing inline copies (L-2c); was 305. 303.8 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 300.6 // ratchet housekeeping-1b (289.5 KiB local; DEC-362)
src/features/admin-attributes/attributes-service.ts:10:import { answeredId } from "@/features/admin-categories/categories-service";
src/features/admin-attributes/attributes-service.ts:315:  return answeredId("admin_upsert_attribute", data);
src/features/admin-attributes/attributes-service.ts:442:  return answeredId("admin_link_attribute", data);
src/features/admin-locations/locations-service.ts:3:import { answeredId } from "@/features/admin-categories/categories-service";
src/features/admin-locations/locations-service.ts:179:  return answeredId("admin_upsert_location", data);
src/features/admin-categories/categories-service.test.ts:9:  answeredId,
src/features/admin-categories/categories-service.test.ts:36:      expect(() => answeredId("door", data)).toThrow("door answered without an id");
src/features/admin-categories/categories-service.ts:24:export function answeredId(door: string, data: unknown): string {
src/features/admin-categories/categories-service.ts:137:  return answeredId("admin_create_category", data);
src/features/admin-categories/categories-service.ts:208:  return answeredId("admin_add_category_pointer", data);
````

### A6. The door-name grep — `rg -n '"(<the 24 doors>)"' src e2e scripts -g '!src/integrations/supabase/types.ts'`

````
e2e/posting-routes-dials.spec.ts:101:    const first = await pageDoor(page, "set_listing_pin", { p_listing_id: listingId });
e2e/posting-routes-dials.spec.ts:114:      await twice(page, "edit_my_listing", {
e2e/posting-routes-dials.spec.ts:126:      await twice(page, "transition_listing", {
e2e/posting-routes-dials.spec.ts:138:      await twice(page, "renew_listing", { p_listing_id: listingId });
e2e/posting-routes-dials.spec.ts:147:      await twice(page, "set_listing_pin", { p_listing_id: listingId });
e2e/posting-routes-dials.spec.ts:156:      await twice(page, "mark_sold", { p_listing_id: listingId });
e2e/posting-routes-dials.spec.ts:165:      await twice(page, "set_listing_reserved", { p_listing_id: listingId, p_reserved: true });
scripts/conformance/listing-designation.test.ts:100:        fn("set_listing_reach", "  UPDATE public.listings SET reach = NULL WHERE id = p_id;"),
src/routes/api/attributes.$id.options.ts:39:        const { data, error, status } = await supabase.rpc("get_attribute_options", {
e2e/helpers/seller-name.ts:13:  const saved = await (await asPerson(person)).rpc("save_posting_identity", { p_alias: alias });
scripts/conformance/door-answers.test.ts:23:const PLANTED_DOORS = ["publish_listing", "report_listing"];
scripts/conformance/door-answers.test.ts:79:        expect.arrayContaining(["publish_listing", "renew_listing", "reveal_listing_contact"]),
scripts/conformance/door-answers.test.ts:90:      '  const published = await me.rpc("publish_listing", { p_listing_id: "x" });',
scripts/conformance/door-answers.test.ts:92:      '  expect((await me.rpc("publish_listing")).error, "looks ok").toBeNull();',
scripts/conformance/door-answers.test.ts:93:      '  doorAnswer(await me.rpc("publish_listing"), "helper");',
scripts/conformance/door-answers.test.ts:94:      '  const read = await me.rpc("publish_listing");',
scripts/conformance/door-answers.test.ts:96:      '  const raised = await me.rpc("publish_listing");',
scripts/conformance/door-answers.test.ts:98:      '  const other = await me.rpc("set_listing_pin");',
scripts/conformance/door-answers.test.ts:100:      '  const viaWrapper = await rpcResult(null, "publish_listing");',
e2e/posting-routes.spec.ts:1050:    const opened = await adminClient().rpc("transition_listing", {
e2e/posting-routes.spec.ts:1063:    const activated = await adminClient().rpc("transition_listing", {
scripts/conformance/migration-reader.test.ts:200:      "edit_my_listing",
scripts/public-surface.test.ts:85:    expect(real.filter(({ name }) => name === "transition_listing")).toHaveLength(1);
e2e/admin-listings.spec.ts:480:    ).rpc("edit_my_listing", { p_listing_id: target.id, p_changes: { title } });
e2e/admin-listings.spec.ts:615:        await owner.rpc("transition_listing", {
e2e/admin-listings.spec.ts:1971:    ).rpc("edit_my_listing", {
e2e/admin-listings.spec.ts:2378:    const deleted = await pageDoor(page, "transition_listing", {
e2e/admin-listings.spec.ts:2389:    const sale = await pageDoor(page, "transition_listing", {
scripts/conformance/listing-designation.ts:35:  "set_listing_level",
scripts/conformance/listing-designation.ts:36:  "set_listing_reach",
scripts/conformance/listing-designation.ts:38:  "transition_listing",
src/routes/api/listings/photos.test.ts:135:    expect(state.rpcCalls).toEqual(["remove_listing_photo"]);
e2e/admin-screening.spec.ts:287:      await pageDoor(page, "transition_listing", {
e2e/admin-screening.spec.ts:306:      await pageDoor(page, "transition_listing", {
e2e/admin-screening.spec.ts:853:    const moved = await adminClient().rpc("transition_listing", {
src/routes/api/listings/alias.ts:62:                  ? await supabase!.rpc("suggest_seller_aliases", {
src/routes/api/listings/alias.ts:69:                  : await supabase!.rpc("check_seller_alias", { p_alias: text(body.alias) ?? "" });
e2e/feed-index.spec.ts:397:    const opened = await adminClient().rpc("transition_listing", {
src/routes/api/listings/alias.test.ts:94:        name: "suggest_seller_aliases",
src/routes/api/listings/alias.test.ts:104:    expect(state.rpcCalls[1]).toEqual({ name: "check_seller_alias", args: { p_alias: "" } });
e2e/admin-attributes-links.spec.ts:924:        const { data } = await supabase.rpc("get_posting_schema", {
src/routes/api/listings/photos.$id.ts:102:              const result = await supabase!.rpc("remove_listing_photo", {
src/routes/api/listings/photos.$id.ts:160:                ? supabase!.rpc("move_listing_photo", {
src/routes/api/listings/photos.$id.ts:165:                : supabase!.rpc("set_cover_photo", {
e2e/my-listings-page.spec.ts:201:    const closed = await a.rpc("transition_listing", { p_listing_id: C, p_new_status: "closed" });
e2e/my-listings-page.spec.ts:218:    const reserved = await a.rpc("set_listing_reserved", { p_listing_id: X, p_reserved: true });
e2e/my-listings-page.spec.ts:221:    const priced = await a.rpc("edit_my_listing", {
e2e/my-listings-page.spec.ts:480:      const priced = await a.rpc("edit_my_listing", {
e2e/my-listings-page.spec.ts:493:    const reserved = await a.rpc("set_listing_reserved", { p_listing_id: X2, p_reserved: true });
src/routes/api/listings/identity.test.ts:175:    expect(state.rpcCalls).toEqual(["change_home_country"]);
src/routes/api/listings/identity.test.ts:223:    expect(state.rpcCalls).toEqual(["save_posting_identity"]);
src/routes/api/listings/identity.test.ts:244:    expect(state.rpcCalls).toEqual(["save_posting_identity"]);
src/routes/api/listings/identity.test.ts:254:    expect(state.rpcCalls).toEqual(["save_posting_identity"]);
e2e/my-listings-doors.spec.ts:222:    person.rpc("transition_listing", { p_listing_id: id, p_new_status: "closed" });
e2e/my-listings-doors.spec.ts:224:    person.rpc("transition_listing", { p_listing_id: id, p_new_status: to });
e2e/my-listings-doors.spec.ts:226:    person.rpc("set_listing_reserved", { p_listing_id: id, p_reserved: on });
e2e/my-listings-doors.spec.ts:231:    person.rpc("edit_my_listing", {
e2e/my-listings-doors.spec.ts:243:    person.rpc("edit_my_listing", {
e2e/my-listings-doors.spec.ts:358:    const service = await adminClient().rpc("transition_listing", {
e2e/my-listings-doors.spec.ts:429:    const sold = await me.rpc("mark_sold", { p_listing_id: p.id });
e2e/my-listings-doors.spec.ts:444:    const soldQ = await me.rpc("mark_sold", { p_listing_id: q.id });
e2e/my-listings-doors.spec.ts:529:    const moved = await service.rpc("transition_listing", {
e2e/my-listings-doors.spec.ts:544:    const fMoved = await service.rpc("transition_listing", {
e2e/my-listings-doors.spec.ts:576:    const refused = await me.rpc("renew_listing", { p_listing_id: live.id });
e2e/my-listings-doors.spec.ts:577:    expect(doorRefusal(refused, "renewNeedsExpired", "renew_listing")).toEqual(needsExpired);
e2e/my-listings-doors.spec.ts:581:    const renewed = await me.rpc("renew_listing", { p_listing_id: x.id });
e2e/my-listings-doors.spec.ts:592:    const twice = await me.rpc("renew_listing", { p_listing_id: x.id });
e2e/my-listings-doors.spec.ts:593:    expect(doorRefusal(twice, "renewNeedsExpired", "renew_listing")).toEqual(needsExpired);
e2e/my-listings-doors.spec.ts:632:    const renewed = await me.rpc("renew_listing", { p_listing_id: r.id });
e2e/my-listings-doors.spec.ts:794:        me.rpc("edit_my_listing", { p_listing_id: id, p_changes: changes });
e2e/my-listings-doors.spec.ts:905:      const refused = await me.rpc("edit_my_listing", { p_listing_id: ad.id, p_changes: changes });
e2e/my-listings-doors.spec.ts:912:    const judged = await me.rpc("edit_my_listing", {
e2e/my-listings-doors.spec.ts:957:    const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
e2e/my-listings-doors.spec.ts:1020:    const copy = (id: string) => me.rpc("copy_my_listing", { p_listing_id: id });
e2e/my-listings-doors.spec.ts:1038:      me.rpc("edit_my_listing", { p_listing_id: X.id, p_changes: changes });
e2e/admin-users.spec.ts:330:    const { error } = await asScratch.rpc("submit_listing", {
e2e/my-listings-ad.spec.ts:280:    const closed = await a.rpc("transition_listing", { p_listing_id: C, p_new_status: "closed" });
e2e/my-listings-ad.spec.ts:326:    const on = await s.rpc("set_listing_reserved", { p_listing_id: X, p_reserved: true });
e2e/my-listings-ad.spec.ts:328:    const off = await s.rpc("set_listing_reserved", { p_listing_id: X, p_reserved: false });
e2e/my-listings-ad.spec.ts:664:    const deleted = await s.rpc("transition_listing", { p_listing_id: X, p_new_status: "removed" });
e2e/my-listings-ad.spec.ts:668:    const restore = await adminClient().rpc("transition_listing", {
src/routes/api/listings/draft.test.ts:146:      name: "submit_listing",
e2e/auth-caller-gates.spec.ts:175:      ["set_cover_photo", { p_listing_id: listing.id, p_photo_id: photo.data.id }],
e2e/posting-routes-catalog.spec.ts:585:    const saved = await rpc(page, "save_seller_place", { p_listing_id: id });
src/routes/api/listings/identity.ts:43:type IdentityArgs = Database["public"]["Functions"]["save_posting_identity"]["Args"];
src/routes/api/listings/identity.ts:136:    return doorCall(PATH, () => supabase.rpc("change_home_country", { p_country: countryChange }));
src/routes/api/listings/identity.ts:203:    saved = await supabase.rpc("save_posting_identity", args);
e2e/my-listings-levels.spec.ts:357:      await pageDoor(page, "set_listing_level", { p_listing_id: ad, p_level_key: level }),
e2e/my-listings-levels.spec.ts:358:      "set_listing_level",
e2e/my-listings-levels.spec.ts:406:    const anonymous = await anonRpc("set_listing_level", {
e2e/my-listings-levels.spec.ts:423:      const answer = await pageDoor(page, "set_listing_level", {
e2e/my-listings-levels.spec.ts:449:    const answer = await pageDoor(page, "set_listing_level", {
e2e/my-listings-levels.spec.ts:530:    const removed = await pageDoor(page, "transition_listing", {
e2e/my-listings-levels.spec.ts:828:    doorAnswer(await pageDoor(page, "mark_sold", { p_listing_id: first }), "mark_sold");
e2e/my-listings-levels.spec.ts:865:    doorAnswer(await pageDoor(page, "mark_sold", { p_listing_id: live }), "mark_sold");
src/routes/api/listings/draft.ts:36:type SubmitArgs = Database["public"]["Functions"]["submit_listing"]["Args"];
src/routes/api/listings/draft.ts:154:          return doorCall(PATH, () => supabase!.rpc("submit_listing", args), { translate });
e2e/legal-certify.spec.ts:451:    const bare = await me.rpc("publish_listing", { p_listing_id: listingId });
e2e/legal-certify.spec.ts:455:    const missing = await me.rpc("publish_listing", {
e2e/legal-certify.spec.ts:463:    const ok = await me.rpc("publish_listing", {
e2e/legal-certify.spec.ts:468:    expect(doorAnswer(ok, "publish_listing")["status"]).toBe("screening");
e2e/legal-certify.spec.ts:500:    const refused = await me.rpc("publish_listing", args);
e2e/legal-certify.spec.ts:510:    const ok = await me.rpc("publish_listing", args);
e2e/legal-certify.spec.ts:511:    doorAnswer(ok, "publish_listing");
e2e/legal-certify.spec.ts:529:    const bareEdit = await me.rpc("edit_my_listing", { p_listing_id: live, p_changes: changes });
e2e/legal-certify.spec.ts:531:    const edited = await me.rpc("edit_my_listing", {
e2e/legal-certify.spec.ts:546:    const bareRenew = await me.rpc("renew_listing", { p_listing_id: old });
e2e/legal-certify.spec.ts:549:    const renewed = await me.rpc("renew_listing", {
e2e/legal-certify.spec.ts:654:    const ok = await me.rpc("publish_listing", {
e2e/legal-certify.spec.ts:659:    doorAnswer(ok, "publish_listing");
e2e/legal-certify.spec.ts:815:    const edited = await me.rpc("edit_my_listing", {
e2e/legal-certify.spec.ts:830:    const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
e2e/legal-certify.spec.ts:832:    const certified = await me.rpc("edit_my_listing", {
e2e/legal-certify.spec.ts:915:    const refused = await me.rpc("edit_my_listing", args);
e2e/legal-certify.spec.ts:924:    const edited = await me.rpc("edit_my_listing", args);
e2e/legal-certify.spec.ts:951:    const refused = await me.rpc("renew_listing", { p_listing_id: listingId });
e2e/legal-certify.spec.ts:960:    const renewed = await me.rpc("renew_listing", { p_listing_id: listingId });
e2e/legal-certify.spec.ts:1003:    const publish = await me.rpc("publish_listing", { p_listing_id: live });
e2e/legal-certify.spec.ts:1004:    doorAnswer(publish, "publish_listing");
e2e/legal-certify.spec.ts:1009:      { fn: "edit_my_listing", args: priceArgs(live, 90) },
e2e/legal-certify.spec.ts:1010:      { fn: "set_listing_pin", args: pinArgs(live) },
e2e/legal-certify.spec.ts:1011:      { fn: "set_listing_reserved", args: { p_listing_id: live, p_reserved: true } },
e2e/legal-certify.spec.ts:1013:        fn: "set_listing_photos_soon",
e2e/legal-certify.spec.ts:1016:      { fn: "set_cover_photo", args: { p_listing_id: live, p_photo_id: photos.second } },
e2e/legal-certify.spec.ts:1018:        fn: "move_listing_photo",
e2e/legal-certify.spec.ts:1023:        fn: "edit_my_listing",
e2e/legal-certify.spec.ts:1039:    const closedPublish = await me.rpc("publish_listing", { p_listing_id: closed });
e2e/legal-certify.spec.ts:1040:    doorAnswer(closedPublish, "publish_listing");
e2e/legal-certify.spec.ts:1042:    const close = await me.rpc("transition_listing", {
e2e/legal-certify.spec.ts:1049:    const reopen = await me.rpc("transition_listing", {
e2e/legal-certify.spec.ts:1063:    const changed = await me.rpc("edit_my_listing", priceArgs(live, 90));
e2e/legal-certify.spec.ts:1074:    const publish = await me.rpc("publish_listing", { p_listing_id: live });
e2e/legal-certify.spec.ts:1075:    doorAnswer(publish, "publish_listing");
e2e/legal-certify.spec.ts:1084:    const level = await me.rpc("set_listing_level", {
e2e/legal-certify.spec.ts:1091:    expect(await guardedTruth(live), "set_listing_level").toEqual(before);
e2e/legal-certify.spec.ts:1092:    const reach = await me.rpc("set_listing_reach", {
e2e/legal-certify.spec.ts:1099:    expect(await guardedTruth(live), "set_listing_reach").toEqual(before);
e2e/legal-certify.spec.ts:1113:    const resume = await me.rpc("resume_listing", { p_listing_id: live });
e2e/legal-certify.spec.ts:1117:    expect(await guardedTruth(live), "resume_listing").toEqual(pausedBefore);
e2e/legal-certify.spec.ts:1140:      const published = await me.rpc("publish_listing", { p_listing_id: id });
e2e/legal-certify.spec.ts:1141:      doorAnswer(published, "publish_listing");
e2e/legal-certify.spec.ts:1150:      { fn: "mark_sold", args: { p_listing_id: sold.id }, id: sold.id, status: "sold" },
e2e/legal-certify.spec.ts:1152:        fn: "transition_listing",
e2e/legal-certify.spec.ts:1158:        fn: "transition_listing",
e2e/legal-certify.spec.ts:1169:    const removedPhoto = await me.rpc("remove_listing_photo", {
e2e/legal-certify.spec.ts:1197:    const pin = await me.rpc("set_listing_pin", pinArgs(id));
e2e/legal-certify.spec.ts:1207:    const promise = await me.rpc("set_listing_photos_soon", {
e2e/legal-certify.spec.ts:1217:    const cover = await me.rpc("set_cover_photo", {
e2e/legal-certify.spec.ts:1231:    const saved = await me.rpc("submit_listing", {
e2e/legal-certify.spec.ts:1274:    const refused = await me.rpc("save_posting_identity", {
e2e/legal-certify.spec.ts:1280:    const unchanged = await me.rpc("save_posting_identity", {
e2e/legal-certify.spec.ts:1293:    const changed = await me.rpc("save_posting_identity", {
src/routes/api/listings/publish.ts:52:            supabase!.rpc("publish_listing", {
src/routes/api/attributes.options.test.ts:102:    error: name === "get_attribute_options" ? { message: "rateLimited" } : null,
src/routes/api/publish.test.ts:106:    expect(state.rpcCalls).toEqual([{ name: "publish_listing", args: { p_listing_id: LISTING } }]);
src/routes/api/publish.test.ts:117:      name: "publish_listing",
src/features/admin-screening/use-screening.ts:242:  const { error } = await supabase.rpc("transition_listing", {
src/features/posting/posting-service.ts:699:  const { data, error } = await supabase.rpc("save_seller_place", { p_listing_id: listingId });
src/features/posting/posting-service.ts:711:  const { error } = await supabase.rpc("clear_seller_place");
src/features/posting/posting-service.ts:844:  const { data, error } = await supabase.rpc("get_posting_schema", {
src/features/posting/posting-service.ts:1132:  const { error } = await supabase.rpc("set_listing_photos_soon", {
src/features/posting/posting-service.ts:1184:  const { error } = await supabase.rpc("set_listing_pin", {
src/features/posting/posting-service.ts:1204:  const { error } = await supabase.rpc("set_listing_pin", {
src/features/posting/posting-service.ts:1242:  const { error } = await supabase.rpc("set_listing_pin", {
src/features/my-listings/promote-service.ts:239:  const { data, error } = await rpc("set_listing_level", {
src/features/my-listings/promote-service.ts:251:  const { data, error } = await rpc("set_listing_reach", {
src/features/my-listings/my-listing.ts:301:      result = await supabase.rpc("set_listing_reserved", {
src/features/my-listings/my-listing.ts:307:      result = await supabase.rpc("mark_sold", { p_listing_id: id });
src/features/my-listings/my-listing.ts:310:      result = await supabase.rpc("transition_listing", {
src/features/my-listings/my-listing.ts:317:      result = await supabase.rpc("transition_listing", {
src/features/my-listings/my-listing.ts:324:      result = await supabase.rpc("renew_listing", {
src/features/my-listings/my-listing.ts:331:      result = await supabase.rpc("resume_listing", { p_listing_id: id });
src/features/my-listings/my-listing.ts:335:      result = await supabase.rpc("transition_listing", {
src/features/my-listings/my-listing.ts:639:  const { data, error } = await supabase.rpc("edit_my_listing", {
src/features/my-listings/my-listing.ts:663:  const { data, error } = await supabase.rpc("copy_my_listing", { p_listing_id: listingId });
src/features/my-listings/my-listing-edit.test.ts:55:    expect(rpc).toHaveBeenLastCalledWith("edit_my_listing", {
src/features/my-listings/my-listing-edit.test.ts:111:    expect(rpc).toHaveBeenLastCalledWith("copy_my_listing", { p_listing_id: "l-1" });
src/features/my-listings/my-listing-edit.test.ts:149:    expect(rpc).toHaveBeenLastCalledWith("edit_my_listing", {
src/features/my-listings/my-listing-edit.test.ts:154:    expect(rpc).toHaveBeenLastCalledWith("edit_my_listing", {
src/features/my-listings/my-listing-edit.test.ts:176:    expect(rpc).toHaveBeenLastCalledWith("renew_listing", { p_listing_id: "l-2" });
src/features/my-listings/my-listing-edit.test.ts:178:    expect(rpc).toHaveBeenLastCalledWith("renew_listing", {
src/features/my-listings/promote-service.test.ts:200:      { name: "set_listing_level", args: { p_listing_id: "ad-1", p_level_key: "lvl-b" } },
src/features/my-listings/promote-service.test.ts:245:      { name: "set_listing_reach", args: { p_listing_id: "ad-1", p_reach_key: "rch-wide" } },
src/features/my-listings/promote-sheet.test.tsx:157:    expect(calls.filter((call) => call.name === "set_listing_level")).toEqual([
src/features/my-listings/promote-sheet.test.tsx:158:      { name: "set_listing_level", args: { p_listing_id: "ad-1", p_level_key: "lvl-b" } },
src/features/my-listings/promote-sheet.test.tsx:305:      { name: "set_listing_reach", args: { p_listing_id: "ad-1", p_reach_key: "rch-wide" } },
src/server/supabase/upstream.test.ts:85:  return client.rpc("submit_listing", {} as never);
````

### A7. second-readers — `rg -n 'vi\.mock\(|loadOnce\(|import\(' src` over the services this turn changes and `categories-service`

````
src/routes/post_.$listingId.tsx:32:    const { readDraft, mayResumePosting } = await import("@/features/posting/posting-service");
src/features/admin-listings/listing-photos.test.tsx:23:vi.mock("@/features/admin-screening/use-screening", () => ({
src/features/admin-countries/country-verb-dialogs.test.tsx:29:vi.mock("@/features/admin-categories/categories-service", async (importOriginal) => ({
src/features/admin-countries/country-verb-dialogs.test.tsx:30:  ...(await importOriginal<typeof import("@/features/admin-categories/categories-service")>()),
src/features/posting/step-where-no-map.test.tsx:36:vi.mock("./posting-service", async (original) => ({
src/features/posting/step-where-no-map.test.tsx:37:  ...(await original<typeof import("./posting-service")>()),
src/features/posting/step-specifications-last-answer.test.tsx:24:vi.mock("./posting-service", () => ({
src/features/admin-locations/location-verb-dialogs.test.tsx:29:vi.mock("./locations-service", async (importOriginal) => ({
src/features/admin-locations/location-verb-dialogs.test.tsx:30:  ...(await importOriginal<typeof import("./locations-service")>()),
src/features/posting/use-draft.test.tsx:17:vi.mock("./posting-service", () => ({
src/features/posting/step-photos.test.tsx:10:vi.mock("./posting-service", () => ({ heldWithAd: () => false }));
src/features/posting/use-edit-draft.test.ts:10:vi.mock("./posting-service", async (importOriginal) => {
src/features/posting/use-edit-draft.test.ts:11:  const actual = await importOriginal<typeof import("./posting-service")>();
src/features/posting/use-edit-draft.test.ts:14:vi.mock("@/features/my-listings/my-listing", () => ({ editMyListing }));
src/features/posting/step-review.test.tsx:9:vi.mock("@/features/my-listings/my-listing", () => ({ readMyListing }));
src/features/posting/step-review.test.tsx:29:vi.mock("./posting-service", async (original) => ({
src/features/posting/step-review.test.tsx:30:  ...(await original<typeof import("./posting-service")>()),
src/features/my-listings/my-listing-edit.test.ts:7:  await import("./my-listing");
src/features/my-listings/my-listing-edit.test.ts:172:    const { runAction } = await import("./my-listing");
src/features/posting/step-who.test.tsx:30:vi.mock("./posting-service", () => ({
src/features/posting/step-where.test.tsx:80:vi.mock("./posting-service", () => ({
````

### A8. first-download at the base (`node scripts/check-bundle-size.mjs` on the base build, `bundle-base.log`)

````
Bundle budget — the entry's static import closure under dist/client (gzipped):
     128.4 KiB  dist/client/assets/index-DJGk7j-8.js
      29.3 KiB  dist/client/assets/shared-shell-BkzD2xOQ.js
      22.6 KiB  dist/client/assets/styles-BGSI5kon.css
      11.7 KiB  dist/client/assets/createServerFn-DCYSOUFG.js
       8.1 KiB  dist/client/assets/bundle-mjs-ry-q0ArR.js
       7.7 KiB  dist/client/assets/useQuery-B_datWrR.js
       2.9 KiB  dist/client/assets/link-CkQjZMj4.js
       2.8 KiB  dist/client/assets/react-DPqvtlQV.js
       2.2 KiB  dist/client/assets/useSelector-DSbyHGUA.js
       1.9 KiB  dist/client/assets/dist-DEpcibJZ.js
       1.3 KiB  dist/client/assets/lazyRouteComponent-BirVGXVO.js
       1.3 KiB  dist/client/assets/react-dom-B6cvz6ju.js
       1.0 KiB  dist/client/assets/dist-mRIjv3bL.js
       0.7 KiB  dist/client/assets/createLucideIcon-DGPfniA1.js
       0.7 KiB  dist/client/assets/preload-helper-Czpn1I53.js
       0.4 KiB  dist/client/assets/rolldown-runtime-QTnfLwEv.js
       0.4 KiB  dist/client/assets/useMatch-i8-xg83V.js
       0.4 KiB  dist/client/assets/dist-DGFCZd-W.js
       0.3 KiB  dist/client/assets/utils-DtbVXzXx.js
       0.3 KiB  dist/client/assets/jsx-runtime-By8HlURe.js
       0.3 KiB  dist/client/assets/qss-JC7fkHHg.js
       0.3 KiB  dist/client/assets/ClientOnly-CTnPRrI8.js
       0.2 KiB  dist/client/assets/useNavigate-CZzmch58.js
       0.2 KiB  dist/client/assets/useRouterState-C1UxbrdN.js
       0.2 KiB  dist/client/assets/useSearch-2KudQkUT.js
       0.2 KiB  dist/client/assets/ellipsis-Dw-TxPP1.js
       0.2 KiB  dist/client/assets/useRouter-CI6lzJu4.js
       0.1 KiB  dist/client/assets/x-drj1Vrig.js
       0.1 KiB  dist/client/assets/chevron-right-BJcjsBNR.js
       0.1 KiB  dist/client/assets/not-found-i5RsCZif.js
       0.1 KiB  dist/client/assets/root-DLTE-HSj.js
JS: 203.7 KiB / 205 KiB — ok
CSS: 22.6 KiB / 40 KiB — ok
Admin code in the entry's closure: 0 module(s), each allowlisted (BC-16) — ok

Per-page first download (entry + the page's chunks, gzipped):
    225.0 / 227 KiB  /
    223.0 / 225 KiB  /$name
    265.9 / 268 KiB  /account
    206.2 / 208 KiB  /account_/legal
    206.9 / 209 KiB  /account_/legal_/$versionId
    223.2 / 225 KiB  /account_/saved
    208.1 / 210 KiB  /admin
    208.9 / 211 KiB  /admin/
    323.6 / 325 KiB  /admin/ai
    337.3 / 338 KiB  /admin/attributes
    295.1 / 296 KiB  /admin/audit
    345.3 / 346 KiB  /admin/categories
    328.9 / 330 KiB  /admin/countries
    208.7 / 210 KiB  /admin/images
    292.8 / 294 KiB  /admin/impersonation_/$sessionId
    282.0 / 283 KiB  /admin/legal
    279.1 / 280 KiB  /admin/legal_/$versionId
    281.1 / 282 KiB  /admin/legal_/edit
    348.1 / 349 KiB  /admin/listings
    352.5 / 353 KiB  /admin/listings_/$listingId
    411.0 / 412 KiB  /admin/listings_/$listingId_/edit
    269.3 / 271 KiB  /admin/locations
    333.1 / 334 KiB  /admin/monetisation
    328.4 / 329 KiB  /admin/places
    294.1 / 295 KiB  /admin/roles
    273.5 / 274 KiB  /admin/roles_/$roleId
    369.1 / 370 KiB  /admin/screening
    305.3 / 306 KiB  /admin/translations
    308.7 / 310 KiB  /admin/translations_/$lang
    293.0 / 294 KiB  /admin/users
    289.6 / 290 KiB  /admin/users_/$userId
    219.7 / 223 KiB  /auth
    207.2 / 209 KiB  /auth_/callback
    209.1 / 211 KiB  /auth_/reset
    225.0 / 227 KiB  /c/$slug
    225.1 / 226 KiB  /dev/primitives
    246.2 / 248 KiB  /dev/style
    204.0 / 206 KiB  /dev/tall
    255.6 / 257 KiB  /l/$slug
    208.4 / 210 KiB  /legal/$kind
    214.7 / 217 KiB  /legal/accept
    209.1 / 211 KiB  /legal/publishing
    312.4 / 315 KiB  /my-listings
    319.9 / 323 KiB  /my-listings_/$listingId
    403.1 / 404 KiB  /my-listings_/$listingId_/edit
    403.1 / 404 KiB  /post
    403.1 / 404 KiB  /post_/$listingId
    208.4 / 210 KiB  /privacy
    274.3 / 277 KiB  /settings
    208.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok
Bundle budget OK.
EXIT 0
````
