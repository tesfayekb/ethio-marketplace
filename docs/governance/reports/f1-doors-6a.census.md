# F1-6a — the census (STEP 1)

Brief: `docs/governance/briefs/f1-doors-6a.md` (sha256 adecf294f61aa17b92ebabe4c476e74953f0f040675c46b8713567c8acc17806).
BASE = HEAD = `143027face66a5d2f569e442f57f54474e610441` (the merge of pull request #62). Lane `cursor/f1-doors-6a`.
CI for 143027f: SUCCESS (run 44122768790; lanes skipped, the code tree proven by run 44115771373); no failed guard.

Every reading below comes from a command run in this turn. The scratch tools live under
`/tmp/ethio-scratch/f1-doors-6a/` (`census.ts` the static bodies, `probe.ts` the local-stack probe,
`callers.ts`, `stems.ts`, `e2e-ids.ts`, `closure.mjs`); their raw outputs are appendices A–D. The local
probe ran as a scratch migration `20261117235900_probe.sql` through `bun run db:proof --fresh` (it raises
its readings by design; the file was removed after the run, `git status --short` empty).

## The verdict for the brief's stop list

**STOP (a), twice.** Two step-up cells of this family cannot hold on `door_context`. For each one, the
cell I could build changes who may call the door today:

1. `admin_reveal_listing_contact(uuid,text)` — line `listings:review | none:D129` (ruling 1 §6 keeps
   the opt-out). `door_context`'s staff form always calls `require_step_up_if_needed(p_resource,
   p_action)` (`20261106051600_8b7c2e41…sql:85–87`; only `staff-reader` skips it), and the permission
   row `listings:review` has `requires_step_up = true` (local probe, #PERMS). On the shell, the door
   would refuse a reviewer who has no fresh second factor. That reviewer reveals today (SC-17, D129).
   The only other `none:` line, `admin_reorder_categories` (`none:C2h`), holds because its row
   `categories:update` needs no step-up. No cell I could write keeps D129 without a change beyond
   this family: a parameter on `door_context`, or a new permission row.
2. `admin_review_photo_change(uuid)` — line `listings:review | row`. Neither the door nor its core
   checks step-up today (bodies read whole), and the screen calls it without the step-up guard
   (`src/features/admin-screening/photo-changes.tsx:62–76` calls `reviewPhotoChange` directly; the
   `guard` prop is passed only to the rows' photo links, `:200`). Building `row` on the shell refuses
   a reviewer who has no fresh factor. That reviewer marks changes reviewed today. The only cell that
   keeps today's callers is a third `none:` opt-out, which ruling 1 §6 and DEC-336 forbid and which
   `door_context` could not carry anyway (item 1).

Stops (b) and (c) do not apply. No return type must change: `admin_list_listings` keeps `RETURNS TABLE`
and raises its refusal, as the staff readers of F1-3 to F1-5b do. Every file the family needs lies in
SCOPE. The dial cells (the move, `transition_listing`'s reviewer path, undo, name-check clear) are not
stops: the cell-meaning item proposes them.

## consumers

Each function from its LIVE body: the file that last declared it and the line, its full md5 of
`replace(prosrc, chr(13), '')` on the local proof stack (appendix A, #MD5; every twelve-digit prefix
equals the supervisor's ethio-staging reading in the brief), its manifest line, and the gates its body
has today. "Gates today" lists the order in the body. "deact" is the sentence "account is deactivated".
Every door is VOLATILE SECURITY DEFINER `search_path=public`, granted to authenticated and service_role
(appendix A, acl). The cores are INVOKER and granted to postgres only.

### The doors

| function | last declared | md5 (local) | manifest | gates today |
|---|---|---|---|---|
| `admin_allow_listing_photo(uuid)` → jsonb | `20261028233839_7aad90ab…:65` | 9f5b886f04da4fcfb9df0dfaa5ee7518 | :18 staff, listings:review, row, staff_moderation, global | not signed in → has_permission review 'permission denied' → deact → step-up review → rate_gate staff_moderation 'rateLimited' → core |
| `admin_edit_listing(uuid,jsonb,text,text)` → jsonb | `20261028233839_7aad90ab…:316` | aa0fa15263cb1d903fb29d6d25b6e0ba | :37 staff, listings:enforce, row, staff_moderation, `row:listings.home_country_code` | not signed in → permission (enforce) → deact → step-up enforce → staff_moderation → core; **no country check** |
| `admin_move_listing(uuid,text,text,text)` → jsonb | `20261028233839_7aad90ab…:415` | 759b06a21541fe7b7a9c55daaa6a05b9 | :86 staff, listings:enforce, row, staff_moderation, global | not signed in → permission (enforce) → deact → staff_moderation → core (the core: step-up enforce after its validation, then `rate_gate('revise')`) |
| `admin_name_check_clear(uuid,text,text,text)` → jsonb | `20261029233828_4aaa2474…:133` | 533ef73c75df3e7563f664731981dc8f | :88 staff, profiles:update, row, staff_moderation, audit name_check.cleared, global | has_permission(profiles,update) 'permission denied' (no null-uid sentence: a visitor gets 'permission denied') → step-up profiles:update; **no deact sentence, no dial** |
| `admin_reveal_listing_contact(uuid,text)` → jsonb | `20261010145454_392f2c82…:14` | 5b65091cbf005c3e825f233d10bcf983 | :101 staff, listings:review, **none:D129**, review_reveal, audit manual, global | not signed in → permission (review); **no deact, no step-up (D129)**; 'unknown channel'; rate_gate review_reveal **returned** `{ok:false, reason:'rateLimited', resets_at}` at 200 |
| `admin_review_photo_change(uuid)` → jsonb | `20261028233839_7aad90ab…:115` | a51ff98a20f550365c5e39ae8646a39e | :102 staff, listings:review, **row**, staff_moderation, global | 'not authenticated' → 'forbidden' → staff_moderation → core; **no deact, no step-up** (door and core) |
| `admin_set_listing_policy(boolean,integer)` → jsonb | `20261029015441_88c7da1c…:260` | a2f41e81addb52bd99550cc57931b6d1 | :126 staff, listings:enforce, row, staff_config, audit manual, global | not signed in → permission (enforce) → step-up enforce → staff_config; **no deact** |
| `admin_set_listing_tier(uuid,text,text,text,integer)` → jsonb | `20261105080112_4bb8208e…:31` | 93aad2bb17b61bbdac3f3ba886d81861 | :127 staff, listings:enforce, row, staff_moderation, audit manual, global | not signed in → permission → deact → staff_moderation → its validation → step-up enforce **after** the validation (ruling 1 §7: the deviant takes the one order) |
| `admin_undo_listing_edit(uuid,timestamp with time zone,text)` → jsonb | `20261028235443_3e3ea913…:1280` | ca70dc4662e277b6040246a4c2428eae | :138 staff, listings:enforce, row, staff_moderation, global | not signed in → permission → deact → step-up enforce; **no dial**; then `app.listing_undo = on` → `admin_edit_listing_core(…,'undo',note)` → off |

### The readers (STABLE, staff-reader lines, no dial, no step-up)

| function | last declared | md5 (local) | manifest | gates today |
|---|---|---|---|---|
| `admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)` → TABLE | `20261109044935_68fda306…:26` | 05a60d67383ba629298d497c65afe6ab | :70 listings:view, **filter** | not signed in → permission; 'unknown view', 'unknown tier'; filters by its `p_country` argument only, **never by the caller's scope** |
| `admin_listing_certifications(uuid)` → jsonb | `20261019115742_844b64b2…:234` | 0c2c2d7b46c5c7cd07ee69cade2c5139 | :78 listings:view, global | 'not authenticated' → 'permission denied' |
| `admin_listing_detail(uuid)` → jsonb | `20261105080110_25cc301c…:133` | 3bf9681c1ea9b072c5974d28812bc1dc | :79 listings:view, global | not signed in → permission → 'listing not found' (missing or draft) |
| `admin_listing_reports(uuid)` → jsonb | `20261017115807_1c740888…:113` | e03c16828dbaa3b5bf44b90e92f5d629 | :80 listings:review, global | has_permission(auth.uid()) 'permission denied' only |
| `admin_name_check_list(timestamptz,uuid,integer)` → jsonb | `20261029104632_2673141c…:60` | b98d555a96d8b8928c4d03ec026737e9 | :89 listings:view, global | has_permission only; reads `name_check_queue_page` |
| `admin_name_check_summary()` → jsonb | `20261029063150_560e36c8…:296` | e8f5a9307894d3d743618af43d5668af | :90 listings:view, global | has_permission only |
| `admin_open_report_counts(uuid[])` → jsonb | `20261017115807_1c740888…:134` | 529ec4553039d0320a8aeeeb18bbbb05 | :91 listings:review, global | has_permission only; 'admin_open_report_counts: badSize' over 100 ids |
| `admin_screening_facts(uuid)` → jsonb | `20261010103356_7ed3323f…:20` | 82067755383e42a9b344edc3888fac0f | :110 listings:review, **filter** | not signed in → permission → 'listing not found' unless screening; **no scope narrowing** |

### The cores and the state machine

| function | last declared | md5 (local) | callers (appendix A, #CALLERS-FN) |
|---|---|---|---|
| `admin_allow_listing_photo_core(uuid)` INVOKER | `20261028233839_7aad90ab…:27` | 04b61455ec2985e302ab9474b02b38ea | `admin_allow_listing_photo` only |
| `admin_edit_listing_core(uuid,jsonb,text,text)` INVOKER | `20261107125401_0d1cd555…:107` | 5afb24b3a7aaa4bc0b08e3c6bb400014 | `admin_edit_listing`, `admin_undo_listing_edit` |
| `admin_move_listing_core(uuid,text,text,text)` INVOKER | `20261115203200_097f9087…:41` | 403c8acf9fa61ebe3dd3a87676ddba53 | `admin_move_listing` only |
| `admin_review_photo_change_core(uuid)` INVOKER | `20261028233839_7aad90ab…:90` | 93e1798802419e4a8b9a9e436d9805ef | `admin_review_photo_change` only |
| `transition_listing(uuid,text)` door | `20261115204400_8c921ada…:40` | 162b76e76b15eb016f0cbb5d0a2629da | :264 owner, revise; on the shell since F1-5a: `door_context('owner',NULL,NULL,'revise')` → core |
| `transition_listing_core(uuid,text)` DEFINER, service_role | `20261115203100_7603ae36…:45` | 8281cf2fe98b3e674015f4c089db6f39 | `transition_listing`, `admin_move_listing_core`, `designation_sweep_core`, `resume_listing`, `set_listing_level` |

Each core repeats its door's gates (the same sentences) before its work. The probe's other hits are
comments: `admin_allow_listing_photo <- listing_photos_approved_with_ad()` is the comment at
`20261015113334_76db3ae0…:276`; `admin_undo_listing_edit <- admin_edit_listing_core` is the core's
comment ("accepted only from admin_undo_listing_edit"); `transition_listing <- my_listing` is
`my_listing`'s comment (F1-5a census). No policy and no view names a family function (#CALLERS-POLICY,
#CALLERS-VIEW: none). No scheduled job calls one (#CRON: nine jobs, none of the family).

### Each sentence today → the code it becomes (detail after the colon)

Gate sentences (every door and reader): 'not signed in' / 'not authenticated' → `notSignedIn`;
'permission denied' / 'forbidden' → `permissionDenied` (`permissionDenied:scope` where the line names a
country); the deactivated sentence → `accountDeactivated` (where a body lacks it today,
`has_permission` already answers false for a deactivated account — `20261106051700_c4e9a6d7…:55` — so
the caller was refused 'permission denied': who may call does not change); step-up stays P0009
(`step-up required: …`, read by the client's step-up gate); 'rateLimited' → `rateLimited`
(door_context, raised).

Work sentences (codes reused from `transition_listing_core` and the listings console where they exist;
`src/lib/door-codes.ts` does not grow):

| function | today | code |
|---|---|---|
| allow_photo core | 'reviewGone' | `reviewGone` |
| allow_photo core, move core, tier | "your own listing is changed the seller's way" | `ownListing` |
| edit core | "your own listing is edited the seller's way" | `ownListing` |
| review_photo_change core | 'changeGone' | `changeGone` |
| move core | 'unknown move' | `badValue:to` |
| move core, edit core, tier, detail, facts, reveal, undo | 'listing not found' | `listingNotFound` |
| move core | 'illegal move: <from> -> <to>' | `illegalTransition:<from>-<to>` (the state machine's code) |
| move core, edit core, tier | 'unknown reason' | `badValue:reason` |
| move core, edit core, tier | 'a note is required' / 'the note is too long' | `noteRequired` / `noteTooLong` |
| move core | 'a listing removed for a severe reason is restored by a super admin only' | `severeRestore` (the state machine's code) |
| edit core | 'nothing to change' / 'nothing changed' | `nothingChanged` |
| edit core | 'not editable: <key>' | `badValue:<key>` |
| edit core | 'a removed listing is not edited' | `listingRemoved` |
| edit core | 'the category of a posted listing is not changed' | `categoryFixed` |
| edit core | 'remove_photos must be a list' | `badValue:remove_photos` |
| edit core | 'photo not found on this listing' | `photoNotFound` |
| edit core | `validate_listing_draft`'s answer `{ok:false, refusals}` | stays RETURNED at 200 (AL-5, AL-19: the seller's refusals) |
| undo | 'nothing to undo' / 'the listing has changed since this edit' / 'a photo removal is not undone' | `nothingToUndo` / `listingChanged` / `photoRemovalFinal` |
| reveal | 'unknown channel' | `badValue:channel` |
| reveal | returned `{ok:false, reason:'notShown'}` | stays returned (an answer: the number is not shown on the ad) |
| reveal | returned `{ok:false, reason:'rateLimited', resets_at}` | `rateLimited` raised by door_context (the reset time leaves: INC-1170; F1-7 brings it back) |
| policy | 'renew days are 1 to 365' | `badValue:renew_days` |
| tier | 'unknown tier' / 'a removed listing takes no tier' / 'nothing changed' / 'badDays' | `badValue:tier` / `listingRemoved` / `nothingChanged` / `badDays` |
| name_check_clear | 'badValue:name' / 'badValue:reason' (raised as text today) | `badValue:name` / `badValue:reason` |
| name_check_clear | returned `{ok:false, reason:'stale'}` | stays returned (`use-name-checks.ts:149` reads it) |
| list | 'unknown view' / 'unknown tier' | `badValue:view` / `badValue:tier` |
| open_report_counts | 'admin_open_report_counts: badSize' | `badSize` |

### The client callers and what each reads

| file:line | function | reads |
|---|---|---|
| `src/features/admin-listings/use-admin-listings.ts:68` | admin_list_listings | rows; an error thrown to the page |
| `src/features/admin-listings/use-admin-listings.ts:136` | admin_move_listing | `error.message` → `moveErrorKey` (`move-reasons.ts:56–68`); the bulk loop stops at 'rateLimited' (`listings-page.tsx:315–316`) |
| `src/features/admin-listings/use-admin-listing.ts:177` | admin_listing_detail | the answer; 'listing not found' → `listing-error` (`admin.listings.detail.notFound`, AL-18) |
| `src/features/admin-listings/use-admin-listing.ts:232` | admin_edit_listing | `editErrorKey` (`edit-listing.ts:256–263`), `photoRemoveErrorKey` (`photo-remove.ts:22–25`); the returned refusals by the posting reader |
| `src/features/admin-listings/use-admin-listing.ts:254` | admin_undo_listing_edit | `undoErrorKey` (`undo-edit.ts:32–37`) |
| `src/features/admin-listings/use-admin-listing.ts:280` | admin_set_listing_tier | `tierErrorKey` (`tier-reasons.ts:88–101`) through `change-listing-tier.ts:36` |
| `src/features/admin-listings/use-admin-listing.ts:351` | admin_listing_certifications | the answer, shape-checked (`:319–324`) |
| `src/features/admin-listings/use-listing-reports.ts:11`, `:40` | admin_open_report_counts, admin_listing_reports | the answers |
| `src/features/admin-listings/listing-settings.tsx:96` | admin_set_listing_policy | `settingsErrorKey` (`listing-policy.ts:36–39`) → `listings-settings-problem` |
| `src/features/admin-screening/use-screening.ts:242` | transition_listing (the reviewer) | `error.message` (the screen's notice; step-up abort) |
| `src/features/admin-screening/use-screening.ts:287` | admin_screening_facts | the answer |
| `src/features/admin-screening/use-screening.ts:354` | admin_reveal_listing_contact | the RETURNED `reason` (`revealProblemKey`, `:344–347`: 'rateLimited' → `admin.screening.revealLimited`, 'notShown' → `admin.screening.revealNotShown`) |
| `src/features/admin-screening/use-screening.ts:399` | admin_name_check_summary | the answer, shape-checked |
| `src/features/admin-screening/use-name-checks.ts:116`, `:140` | admin_name_check_list, admin_name_check_clear | `ReaderError` on out-of-shape; the returned 'stale' (`:149`) |
| `src/features/admin-screening/use-photo-reviews.ts:87` | admin_allow_listing_photo | `photoAllowErrorKey` (`:92–96`) |
| `src/features/admin-screening/use-photo-changes.ts:91` | admin_review_photo_change | `photoChangeErrorKey` (`:96–98`) |
| `src/features/my-listings/my-listing.ts:315`, `:322`, `:340` | transition_listing (the owner) | unchanged by this turn (the owner path) |

The e2e callers are under the tests item and appendix C.

### The order of the files (proposed)

1. The cores (`admin_allow_listing_photo_core`, `admin_review_photo_change_core`,
   `admin_move_listing_core`, `admin_edit_listing_core`) onto codes: they RAISE `door_refuse`, never
   return a refusal. Their only callers are this family's doors (above). A door not yet on the shell
   lets the P0D01 pass to PostgREST as an error whose message is the code. No caller meets a returned
   refusal.
2. The SQL callers: `admin_undo_listing_edit` (the edit core's second caller) and `transition_listing`'s
   staff path (decision 3).
3. The doors and readers onto `door_context` and the shell.

## callee-codes

| callee | what it can answer | what the door does with it |
|---|---|---|
| `door_context` | `notSignedIn`, `accountDeactivated`, `permissionDenied[:scope]`, P0009 step-up, `rateLimited` (`20261106051600:69–97`) | the shell returns `door_refused` (a reader lets it rise) |
| `has_permission_scoped` | allowed / countries / detail `scope` (read through door_context only) | — |
| `require_step_up_if_needed` | P0009 'step-up required: …' (not P0D01: passes the shell, rises) | the client's step-up gate reads it |
| `rate_gate` | `{allowed, remaining, resets_at}` (never raises) | through door_context only, once per call |
| the four cores | their codes (table above); P0009 from their repeated step-up (to leave: the door has checked it) | rise through the door's shell |
| `transition_listing_core` | `badValue:status`, `listingNotFound` (service), `notYourListing`, `ownerOnly:<a>-<b>`, `reviewerOnly:<a>-<b>`, `ownerDeleted`, `enforcementOnly:<a>-<b>`, `severeRestore`, `serviceOnly:<a>-paused`, `severeRemove`, `illegalTransition:<a>-<b>`, P0009 | the move core calls it after its own validation, so of these only `severeRemove`/`illegalTransition` can reach a staff move; they rise through the move door's shell |
| `validate_listing_draft` | a RETURNED `{ok:false, refusals}` | the edit core returns it as it is (AL-5) |
| `log_audit` / `door_audit` | 'door_audit: no caller in the context' (service role) | the service role passes door_context with no uid: the cores keep their own `log_audit` for that path |
| triggers on the written tables (appendix A, #TRIGGERS) | `listings_free_slot_guard` raises `noFreeSlot` (the consoles map it today: `move-reasons.ts:66`, `tier-reasons.ts:94`); `acceptance_guard` on listings/listing_photos (staff writes pass: takedowns and staff edits, AGENTS.md); `listings_state_marks`, `listings_price_marks`, the feed index, `listing_photos_approved_with_ad` raise nothing a caller reads; `audit_log_append_only` refuses UPDATE/DELETE only | `noFreeSlot` is a plain RAISE, not P0D01: it passes the shell and rises with its message unchanged (the consoles keep reading it) |

## cell-meaning

Dials (local probe #DIALS: staff_moderation 600/h, review_reveal 60/h, staff_config 600/h, revise 120/h —
equal to the supervisor's staging reading):

- `admin_allow_listing_photo` · staff_moderation: shows one photo the screen held. A reviewer clears a
  queue at a few dozen photos an hour. 600 holds.
- `admin_edit_listing` · staff_moderation: one staff edit of a seller's ad, a handful an hour. Holds.
- `admin_move_listing` · staff_moderation: remove, restore or send back. The console's tick-boxes move
  many ads in one action (AL-15), up to about a hundred an hour in a clean-up. Today one move spends
  staff_moderation in the door AND `revise` in the core (`rate_gate('revise')`, the seller's 120/h).
  A bulk clean-up therefore stops at 120 on a dial meant for one seller's own edits. PROPOSED and
  built: the core's `rate_gate('revise')` leaves; the move spends staff_moderation once (the queued
  line, F1-5a ruling 1 §4).
- `admin_name_check_clear` · staff_moderation: allows one held seller name, tens an hour at most.
  Today it spends no dial (INC-1038). It gains staff_moderation.
- `admin_reveal_listing_contact` · review_reveal 60/h: shows one seller's number to a reviewer who
  calls about an ad, a few an hour. 60 rations access to private contact data. Holds.
- `admin_review_photo_change` · staff_moderation: marks one seen photo change reviewed, tens an hour.
  Holds.
- `admin_set_listing_policy` · staff_config: the renew settings, saved a few times a year. The
  config dial holds.
- `admin_set_listing_tier` · staff_moderation: one tier change, a handful an hour. Holds.
- `admin_undo_listing_edit` · staff_moderation: one undo, rare. Today it spends no dial; it gains
  staff_moderation. Undo calls the edit CORE, not the edit door, so one undo spends once.
- `transition_listing`'s reviewer path · today `revise` (the door's owner gate spends it for every
  caller). A reviewer working the screening queue approves or rejects 100–200 ads an hour (bulk
  Approve, D128), so the seller's 120/h refuses honest review work. PROPOSED: staff_moderation for
  the reviewer's and the enforcer's decisions; the owner keeps `revise` (the queued line, F1-5a
  ruling 1 §5). How the door picks its dial is decision 3.
- The readers spend no dial (staff-reader).

Step-up cells (local probe #PERMS: listings:enforce true, listings:review true, listings:view false,
profiles:update true):

- allow_photo `row` (listings:review): showing a photo the screen held back is a review decision,
  like approving the ad. The body checks it today. Holds.
- edit `row`, undo `row`, policy `row`, tier `row` (listings:enforce): each changes a seller's ad or
  every seller's rules. Each body checks it today (tier only after its validation; ruling 1 §7 moves
  it to the one order). Hold.
- move `row` (listings:enforce): the core checks it after its validation. On the shell it comes
  before. Who may call is unchanged; only the order changes. Holds.
- name_check_clear `row` (profiles:update): allowing a name other buyers see. The body checks it.
  Holds.
- reveal `none:D129`: holds by meaning (D129: reading a number to call the seller during review asks
  for no second factor), but `door_context` cannot carry it. STOP (a) 1.
- review_photo_change `row`: by ruling 1 §6's rule (a line's step-up follows its permission row),
  `row`. By its work (an acknowledgement in a queue: no buyer-visible change, an audit row), none is
  asked today, by the server or the screen. Building `row` refuses today's reviewer without a fresh
  factor. STOP (a) 2.

Country cells: `admin_edit_listing` `row:listings.home_country_code` (mode `match`: the door reads the
listing's `home_country_code` before door_context, as F1-4b's match doors do), `admin_list_listings`
and `admin_screening_facts` `filter`, every other line `global`. `has_permission` reads no country
(`20261106051700_c4e9a6d7…:53–67`), so a country-scoped listings grant passes for every country
today; on the shell it is narrowed to its own countries. That changes who may call for a
country-scoped holder. It is not one of the stop's cells (permission, class, step-up), and the brief's
security lens expects it. It is decision 5.

## definition

The concern's definition: every manifest line of class staff or staff-reader whose permission's
resource is `listings` (census.ts over `scripts/doors/manifest.txt`: 16 lines — :18, :37, :70, :78,
:79, :80, :86, :89, :90, :91, :101, :102, :110, :126, :127, :138), plus `admin_name_check_clear`
(:88), plus the four cores, plus every function those bodies call that a browser role may execute.
The callees a browser role may execute (appendix A, acl): `has_permission(uuid,text,text)`
(authenticated; a policy helper, not a door) and `transition_listing` (the move core reaches it only
through `transition_listing_core`). Every other callee (`door_*`, `has_permission_scoped`,
`require_step_up_if_needed`, `rate_gate`, `assert_caller_active`, `account_is_deactivated`,
`log_audit`, `validate_listing_draft`, `name_check_queue_page`, `cat_descendants`,
`market_settings_for`, `seller_regular_live`, `baseline_level_key`, `get_role_hierarchy`,
`is_super_admin`) is closed to browser roles.

Against the brief's list: equal (17 functions + 4 cores + transition_listing's staff path). Against the
plan's §5 row F1-6 (`f1-doors.stop-1.md:481`, "≈45"): the row also names services and monetisation (jobs,
AI features, the monetisation doors), which the supervisor split to F1-6b. `admin_job_resume`
(services:manage) is called from the screening console (`use-name-checks.ts:19`, comment) but its
permission is services', so it belongs to F1-6b. Difference: none beyond that split.

## tests

The family's e2e ids by their real names (appendix C maps each to the lines that read an error), with
each new expectation taken from the body as proposed. `.error` below is the `pageDoor`/`rpc`
message string; a shell door's message is `code[:detail]`.

- AL-2 (`admin-listings.spec.ts:253`): `list({p_view:'bogus'})` 'unknown view' → `badValue:view` (a
  reader: raised, the same message form).
- AL-3 (:329): edit, list and detail as a person without the permission: 'permission denied' →
  `permissionDenied`.
- AL-12 (:359): "your own listing is edited the seller's way" → `ownListing`; draft 'listing not
  found' → `listingNotFound`; 'a removed listing is not edited' → `listingRemoved`; 'not editable:
  seller_id' → `badValue:seller_id`; 'a note is required' → `noteRequired`.
- AL-4 (:394) 'nothing changed' → `nothingChanged`. AL-5 (:470), AL-6 (:498), AL-19 (:1268), AL-26
  (:1648): returned answers unchanged.
- AL-7 (:554): 'unknown reason' → `badValue:reason`; 'illegal move: removed -> removed' →
  `illegalTransition:removed-removed`.
- AL-8 (:599): the owner's `enforcementOnly:removed-screening` unchanged; 'step-up required: no
  verified factor' unchanged (P0009); the severe sentence → `severeRestore`.
- AL-9 (:643): 'illegal move: sold -> screening' → `illegalTransition:sold-screening`.
- AL-16 (:1037): draft detail 'listing not found' → `listingNotFound`.
- AL-27 (:1733): 'nothing to undo' → `nothingToUndo` (three lines); 'unknown reason' (the edit door,
  :1749) → `badValue:reason`; 'the listing has changed since this edit' → `listingChanged` (two lines).
- ATR-2 (:2266): 'a removed listing takes no tier' → `listingRemoved`; the problem line keeps
  `admin.listings.level.error.same`. ATR-3 (:2308), ATR-7 (:2494): 'permission denied' →
  `permissionDenied`. ATR-4 (:2340): `^step-up required` unchanged.
- The problem lines read word for word (PREVENTION (7)) keep their keys: AL-13 :896
  `listings-move-problem` pickReason, AL-14 :953 noteRequired (both the dialog's own check, before
  the door), AL-18 :1256 `listing-error` detail.notFound, :1893 `listing-photo-remove-problem`
  pickReason, AL-30 :2035 `listings-settings-problem` daysHelp (the code `badValue:renew_days` maps to
  it), ATR-2 :2279/:2285, LVP-3 (`my-listings-promote.spec.ts:579`) `listings-tier-problem`
  baselineDays (the dialog's own check).
- AP-28 (`ad-page-doors.spec.ts:890`): reports and counts 'permission denied' (`toContain`) →
  `permissionDenied`; 'badSize' unchanged by `toContain`.
- SC-4 (`admin-screening.spec.ts:278`): `not.toBeNull` — holds under any code. SC-16 (:296):
  `/no verified factor|step-up required/` — holds (P0009). SC-19 (:849): the service role —
  unchanged.
- SC-7 (:357) unchanged. SC-8 (:389): facts and reveal 'permission denied' → `permissionDenied`.
- SC-17 (:408): a reviewer without a second factor reveals. It stays green only under decision 1
  (A) or (B); under (C) it is refused `stepUpRequired`.
- SC-9 (:431): 'unknown channel' → `badValue:channel`. SC-10 (:464): 'listing not found' (facts and
  reveal) → `listingNotFound`.
- SC-23 (:1116): the seller's call `allowed.error?.message` 'permission denied' → `permissionDenied`.
- SC-24 (:1204): `admin-photo-reviews-notice` allowed — success, unchanged.
- ML-10 (`my-listings-doors.spec.ts:692`): 'permission denied' ×2 → `permissionDenied`; 'step-up
  required: no verified factor' unchanged; 'renew days are 1 to 365' → `badValue:renew_days`.
- ML-9 (:635), ML-1 (:259): success paths unchanged.
- LDR-4 (`my-listings-levels.spec.ts:459`): `toContain("badDays")` unchanged.
- NCQ-E2E-1, NCQ-E2E-4 (`name-check-queue.spec.ts:65`, `:165`): success paths through the screen;
  unchanged (they gain a staff_moderation count).
- The `transition_listing` owner and service callers (ML-2, ML-6, MLA-1, MLA-8, LG-28, LG-29, FE-12,
  PR-23, LDR-5, ATR-5): the owner path is unchanged. PR-28 (`posting-routes-dials.spec.ts:123`, the
  owner's revise count) is unchanged.
- No e2e id exercises `admin_review_photo_change` (callers.txt: only the screen's service). No e2e
  id exercises the move's or the reviewer's dial; the dial change is proven in the migration.

The client files' own unit tests (each reads a sentence that becomes a code):
`edit-listing.test.ts:144–153`, `move-reasons.test.ts:50–66`, `photo-remove.test.ts:16–22`,
`listing-policy.test.ts:46–47`, `tier-reasons.test.ts:99–157`, `undo-edit.test.ts:39–49`,
`use-photo-reviews.test.ts:42–46`, `use-photo-changes.test.ts:36–37`, `use-screening.test.ts:164–167`
(the returned reveal reason); `change-listing-tier.test.ts`, `listing-settings.test.tsx`,
`use-admin-listing.test.ts`, `use-name-checks.test.ts`, `photo-changes.test.tsx`,
`photo-reviews.test.tsx`, `listing-photos.test.tsx`, `name-checks.test.tsx`, `tier-dialog.test.tsx`,
`move-dialog.test.tsx`, `undo-dialog.test.tsx` (their mocks, below).

Next ids: AL-32, ATR-8, SC-28, NCQ-E2E-5, LVP-6, AP-56, ML-15, LDR-8.

## lists

- The manifest `scripts/doors/manifest.txt`: lines 18, 37, 70, 78, 79, 80, 86, 88, 89, 90, 91, 101,
  102, 110, 126, 127, 138 (codes cells to fill), 264 (`transition_listing`: its codes cell gains
  the staff gate's codes under decision 3).
- The door check's allowlist `scripts/doors/check-doors-allowlist.txt`: three lines, none of this
  family (`package_price_for` is F1-6b's).
- The forms allowlist `scripts/conformance/forms-allowlist.txt`: lines 17–22, 26, 27 (the eight
  CF-FORM-3 lines; they leave in STEP 3).
- The public-surface allowlist `scripts/public-surface-allowlist.txt`: :51, :52, :54–58, :68, :70,
  :76, :96, :97, :118, :146–148, :162, :22 (`transition_listing`). No grant changes under the
  proposed build (no DROP). A decision-1 (A) parameter on `door_context` is a DROP + CREATE of a
  service-role-only function: no allowlist line. A decision-3 (B) new door would need its own
  allowlist line.
- `scripts/acceptance-doors-allowlist.txt`: :10, :24, :33, :41, :42, :61, :62, :72, :112, :116
  (reasons only; no change).
- `scripts/conformance/seller-names-allowlist.txt`: :4, :6, :7, :19 (no change).
- `scripts/conformance/status-map.ts` reads `admin_list_listings`' view arrays
  (`WHEN 'all' THEN ARRAY[…]`): the redeclaration keeps the arrays' form.
- `scripts/conformance/listing-designation.ts:37–38` names `admin_set_listing_tier` and
  `transition_listing_core` as writers of the tier columns: the names stay.
- The migration reader's computed-declaration list (`COMPUTED_BY_HAND`,
  `migration-reader.test.ts:141`: `["attr_import_plan"]`): no change; every body is written out
  whole.
- Shared-value tables the family's tests write: none. `listing_policy` is read and refused only
  (`my-listings-doors.spec.ts:35`: "No test writes the global listing_policy row"); the name-check
  job pause is `@global-state` (`name-check-queue.spec.ts:209`).
- The register: the doors' row gains "the staff's listing and screening doors on the shell (F1-6a)"
  (records turn).

## old-file-readers

Command: `bun /tmp/ethio-scratch/f1-doors-6a/stems.ts` — `rg -n -F '<stem>' src e2e scripts`
(excluding the generated types, SQL, the locales and the manifest) for 38 stems. Counts:

```
not signed in 17 · not authenticated 5 · permission denied 64 · forbidden 41 · account is deactivated 16
rateLimited 262 · reviewGone 3 · changeGone 3 · your own listing 8 · unknown move 0 · illegal move 4
unknown reason 9 · a note is required 4 · the note is too long 4 · a listing removed for a severe reason 3
nothing to change 2 · not editable 20 · listing not found 29 · a removed listing is not edited 6
the category of a posted listing 1 · remove_photos must be a list 0 · photo not found on this listing 4
nothing changed 19 · nothing to undo 8 · the listing has changed since this edit 4
a photo removal is not undone 1 · unknown channel 1 · notShown 5 · renew days are 1 to 365 3
unknown tier 4 · a removed listing takes no tier 4 · badDays 20 · badValue:name 0 · badValue:reason 0
"stale" 8 · unknown view 1 · badSize 10 · step-up required 34
```

Every hit is in appendix B. The hits of this family are the console mappers and their unit tests
(consumers, tests), the e2e lines under tests, and the function-name readers in appendix D
(`status-map.ts`, `listing-designation.ts`, the allowlists). The generic stems ('permission denied',
'rateLimited', 'forbidden', 'listing not found', 'nothing changed', 'not editable') also match other
families' code; those hits name no function of this family, by appendix C's map. No guard or script
reads a sentence of this family.

## second-readers

`rg -n "vi\.mock\(|import\(|loadOnce\(" src e2e scripts | rg "admin-listings|admin-screening"`:
`src/features/posting/use-edit-draft.test.ts:15` mocks `use-admin-listing`; `listing-photos.test.tsx:23`,
`:34`, `:37` mock `use-screening`, `use-admin-listing`, `use-photo-reviews` (spreading the real module);
`photo-changes.test.tsx:61` and `photo-reviews.test.tsx:31` spread the real `use-photo-changes` and
`use-photo-reviews`; `name-checks.test.tsx:21` spreads `use-name-checks`; `use-screening.test.ts:8`,
`use-photo-reviews.test.ts:8`, `use-admin-listing.test.ts:4`, `change-listing-tier.test.ts:7`,
`listing-settings.test.tsx:9` mock the Supabase client; `tier-dialog.test.tsx:5` mocks
`@/lib/supabase-door`. No `loadOnce` and no dynamic `import()` of these modules.

## chunk-graph

Base build (`bun install --frozen-lockfile`, no changes; `bun run build` exit 0), each page's static
closure by `scripts/bundle-closure.mjs` (`closure.mjs`), gzip bytes of the chunks the client change
may touch:

```
/admin/listings: 101 chunks, 335959 B; admin.listings 6185, change-listing-tier 2323, refusal 1134, refusal-text 1351, tier-reasons 739, use-admin-listing 1977, use-photo-changes 817, use-screening 1983, card-tier 722
/admin/listings_/$listingId: 95 chunks, 336990 B; admin.listings_._listingId 6107, listing-detail 13359, listing-photos 3167, edit-listing 537, change-listing-tier 2323, tier-reasons 739, use-admin-listing 1977, use-screening 1983, refusal 1134, refusal-text 1351, ad-page-refusals 463
/admin/listings_/$listingId_/edit: 114 chunks, 420930 B; …edit 1033, listing-detail 13359, edit-listing 537, use-admin-listing 1977, use-screening 1983, my-listing 2952, refusal 1134
/admin/screening: 103 chunks, 353364 B; admin.screening 9043, listing-detail 13359, listing-photos 3167, use-photo-changes 817, tier-reasons 739, use-admin-listing 1977, use-screening 1983, refusal 1134
```

`move-reasons`, `undo-edit`, `photo-remove`, `listing-policy`, `use-photo-reviews` and `use-name-checks`
are folded into the page chunks above. "After" is STEP 3's (the new chat).

## environments

The local proof stack (`bun run db:proof`, 127.0.0.1): applied by me (the probe here; the migration's
proof in STEP 2). ethio-staging: applied by the operator from the supervisor's message of links
(DEC-384), read back by the supervisor. ethio-prod: after the merge, by the same pairing lines. No
other database.

## mechanisms

- `door_context` (`20261106051600_8b7c2e41…:39–99`, md5 5a05ee77766181a4256d5b7efce36c41): the staff
  form asks the permission (with scope), then step-up unless `staff-reader` (`:85–87`), then the dial
  (`:90–97`); a reader with a dial raises. No step-up opt-out exists.
- `has_permission_scoped` (md5 3825186312d23eb61175be8134b624f8), `door_refuse` (55f9bf0a…),
  `door_refused` (1a94a1b3…; re-counts the dial except for the four gate codes, meters
  `door_refusals`, sets the status), `door_audit` (1e74cfe9…; refuses a context with no uid).
- `readRefusal` (`src/lib/refusal.ts`, 268 lines; read whole): seven dialects in order; a family hands
  its words in (`RefusalFamily`); a bare code by the family's words; the consoles' shared
  `ADMIN_REFUSALS` (`src/lib/refusal-tail.ts:23`, rateLimited); `DOOR_CODES`
  (`src/lib/door-codes.ts:22`) for the gate codes.
- The consoles' words today: `move-reasons.ts:56–68`, `edit-listing.ts:256–263`,
  `photo-remove.ts:22–25`, `undo-edit.ts:32–37`, `tier-reasons.ts:88–101`, `listing-policy.ts:36–39`,
  `use-photo-reviews.ts:92–96`, `use-photo-changes.ts:96–98`, `use-screening.ts:344–347`. Every code
  in the table above maps to a key these already show, except `categoryFixed` and
  `photoRemovalFinal`, which fall to `common.error` today and keep the generic (no new string).
- The patterns: F1-4b's staff match door and staff proofs (`20261115123100_c9452c23…`), F1-1's
  `admin_reorder_categories` on the shell with `none:C2h` (`20261115021600_dd8b1b55…`), F1-5b's
  scratch callers with their own `rate_overrides` rows.

## first-download

`node scripts/check-bundle-size.mjs` on the base build (`/tmp/ethio-scratch/f1-doors-6a/bundle-base.log`,
92 lines): exit 1, one finding, the NEAR band on `/admin/translations` (305.7 of 306 KiB + 0.1 local
allowance; "set it to ceilingForLocal(size) = 307"). That is the line F1-5b reported (INC-1190), not
this family's page. The family's pages: `/admin/listings` 328.1 / 329 KiB, `/admin/listings_/$listingId`
329.1 / 330, `/admin/listings_/$listingId_/edit` 411.1 / 412, `/admin/screening` 345.1 / 348. The three
listings pages sit 0.9 KiB under their ceilings; STEP 3 must keep each one outside the 0.3 KiB band
or raise its ceiling by DEC-296's form.

## premises

1. The brief's EXCEPTIONS ("`none:D129` … is kept and named") and ruling 1 §6 assume the mechanism can
   carry a staff door with no step-up whose permission row asks for one. It cannot (`door_context`
   `:85–87`). STOP (a) 1.
2. "a line's step-up the body does not keep is built on the shell" — for `admin_review_photo_change`
   the build changes who may call. STOP (a) 2 (the brief names this case).
3. The supervisor's read "no step-up check in the bodies of `admin_move_listing`": the move CORE
   checks `listings:enforce` after its validation (`admin_move_listing_core`, body). The line holds.
4. "`admin_name_check_clear` … spend[s] no dial today": confirmed; it also has no null-uid sentence,
   so a visitor reads 'permission denied' today (→ `notSignedIn`).
5. `transition_listing`'s staff path "still spends `revise`": confirmed, through the door's owner
   gate, for every staff caller (reviewer and enforcer).

## findings

1. `admin_list_listings` and `admin_screening_facts` (lines `filter`) never narrow by the caller's
   scope, and `admin_edit_listing` (line `row:listings.home_country_code`) never checks the listing's
   country: `has_permission` reads no country (`20261106051700_c4e9a6d7…:53–67`). A country-scoped
   listings holder acts on every country today. No such grant is known on any database: no
   country-scoped staff exists before the Ops phase (DEC-380). The shell closes this (decision 5).
2. `admin_reveal_listing_contact`'s rate refusal is a RETURNED `{ok:false, reason:'rateLimited',
   resets_at}` at 200, unlike every other door. On the shell it is raised by door_context with no
   reset time (INC-1170, F1-7).
3. `admin_move_listing` spends two dials, one of them the seller's (cell-meaning).
4. The base build's NEAR band on `/admin/translations` (INC-1190, F1-5b's): outside this family's
   scope; reported, not fixed here.
5. The flake ledger on ci-evidence names SMN-E3 three or more times in seven days (and CL-E10 several
   times): outside this family; for the supervisor.
6. No security hole found.

## queued

`rg -n "F1-6" docs/governance/briefs docs/governance/reports roadmap.md scripts/conformance scripts/doors`:

- `roadmap.md:31` — "the staff move's and the reviewer's decisions spend `staff_moderation`, not the
  seller's `revise`" (F1-5a ruling 1 §4, §5): built here (cell-meaning; decision 3).
- `roadmap.md:15` — INC-1167 (a storage object at a takedown): left (the before-launch list).
- `scripts/doors/check-doors-allowlist.txt:6` — `package_price_for`: left (F1-6b).
- `docs/governance/reports/f1-doors-2.report.md` — INC-1038 "three doors remain for F1-6": built here
  for this family's two (undo, name-check clear); the third is F1-6b's.
- `docs/governance/reports/f1-doors-3.report.md:336` — `admin_end_package_price` scope: left (F1-6b).
- `docs/governance/reports/f1-doors-5a.census.md` — `tier-reasons.ts` `tierErrorKey` to F1-6: built
  here (STEP 3).

## Decisions for the supervisor (numbered)

1. **The reveal's `none:D129` on the shell.** (A) `door_context` gains a parameter (a step-up opt-out,
   default off; DROP + CREATE of the mechanism with its service-role grant restated) that check-doors
   allows only on a `none:<DEC>` line. Who may call is unchanged, and so is SC-17. (B) A permission
   row `listings:reveal` (no step-up), granted in the same migration to every role holding
   `listings:review`; the line's permission becomes `listings:reveal`; it needs new
   `admin.roles.perm.*` keys (EN, AM). Who may call is unchanged at the apply. (C) Take step-up
   (`row`): a reviewer without a fresh factor is refused; D129 is overturned; SC-17 changes.
2. **`admin_review_photo_change`'s `row`.** (A) Build it, as ruling 1 §6 did for
   `catalog_find_rebuild`: a reviewer without a fresh factor is refused `stepUpRequired`; the screen's
   Review goes through the page's `guard` (STEP 3, in scope). (B) Keep today's callers: a third
   opt-out, which DEC-336 forbids and which needs decision 1 (A)'s parameter.
3. **How `transition_listing` spends staff_moderation for staff.** (A) The door reads the listing's
   seller first; the seller (or the service role) takes `door_context('owner', NULL, NULL, 'revise')`
   (the first call, which check-doors reads), and any other signed-in caller takes `door_context('staff',
   'listings', <review | enforce, by the target status>, 'staff_moderation')`; the shell re-counts the
   path's dial. (B) A new staff door for the screening decisions (`listings:review`, `row`,
   `staff_moderation`), with its manifest and public-surface lines; `transition_listing` becomes the
   owner's and the service's only. (A) keeps one door and every caller; (B) adds a door and moves
   the screening console and SC-4, SC-16, SC-19.
4. **The move's second dial** (no question, named): the core's `rate_gate('revise')` leaves; one staff
   move spends staff_moderation once.
5. **Country scope** (confirm): edit `match` on the listing's `home_country_code`, the list and the
   facts `filter` on the caller's countries; a country-scoped listings holder is narrowed to their
   countries (finding 1).
6. **Returned answers** (confirm): `validate_listing_draft`'s refusals (edit), `notShown` (reveal) and
   `stale` (name-check clear) stay returned at 200; the reveal's returned `rateLimited` becomes
   door_context's raised `rateLimited` (no reset time until F1-7). The screen keeps its line
   `admin.screening.revealLimited`.
7. **Order** (named): tier's and move's step-up come before their validation (ruling 1 §7).

## Appendices

Appended by script from the scratch outputs, unedited:
A. the local probe's readings (`probe.txt`); B. the stems' hits (`stems.txt`); C. the e2e ids that
call a family function (`e2e-ids.txt`); D. the callers of each name outside SQL (`callers.txt`).

### Appendix A — the local probe (probe.txt)

````text
ERROR: PROBE-CENSUS
#MD5
account_is_deactivated(uuid)=ab1a62340b48b3ce2704d20ad20cb8fa/117/s/definer/boolean/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_allow_listing_photo(uuid)=9f5b886f04da4fcfb9df0dfaa5ee7518/842/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_allow_listing_photo_core(uuid)=04b61455ec2985e302ab9474b02b38ea/1630/v/invoker/jsonb/acl={postgres=X/postgres}/cfg={search_path=public}
admin_edit_listing(uuid,jsonb,text,text)=aa0fa15263cb1d903fb29d6d25b6e0ba/772/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_edit_listing_core(uuid,jsonb,text,text)=5afb24b3a7aaa4bc0b08e3c6bb400014/9265/v/invoker/jsonb/acl={postgres=X/postgres}/cfg={search_path=public}
admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)=05a60d67383ba629298d497c65afe6ab/3909/s/definer/record[set]/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_listing_certifications(uuid)=0c2c2d7b46c5c7cd07ee69cade2c5139/1107/s/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_listing_detail(uuid)=3bf9681c1ea9b072c5974d28812bc1dc/6642/s/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_listing_reports(uuid)=e03c16828dbaa3b5bf44b90e92f5d629/556/s/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_move_listing(uuid,text,text,text)=759b06a21541fe7b7a9c55daaa6a05b9/700/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_move_listing_core(uuid,text,text,text)=403c8acf9fa61ebe3dd3a87676ddba53/3228/v/invoker/jsonb/acl={postgres=X/postgres}/cfg={search_path=public}
admin_name_check_clear(uuid,text,text,text)=533ef73c75df3e7563f664731981dc8f/1432/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_name_check_list(timestamp with time zone,uuid,integer)=b98d555a96d8b8928c4d03ec026737e9/303/s/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_name_check_summary()=e8f5a9307894d3d743618af43d5668af/275/s/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_open_report_counts(uuid[])=529ec4553039d0320a8aeeeb18bbbb05/617/s/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_reveal_listing_contact(uuid,text)=5b65091cbf005c3e825f233d10bcf983/1426/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_review_photo_change(uuid)=a51ff98a20f550365c5e39ae8646a39e/509/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_review_photo_change_core(uuid)=93e1798802419e4a8b9a9e436d9805ef/758/v/invoker/jsonb/acl={postgres=X/postgres}/cfg={search_path=public}
admin_screening_facts(uuid)=82067755383e42a9b344edc3888fac0f/1393/s/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_set_listing_policy(boolean,integer)=a2f41e81addb52bd99550cc57931b6d1/1669/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_set_listing_tier(uuid,text,text,text,integer)=93aad2bb17b61bbdac3f3ba886d81861/5564/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
admin_undo_listing_edit(uuid,timestamp with time zone,text)=ca70dc4662e277b6040246a4c2428eae/3057/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
assert_caller_active()=aa5386c24795838834377ec019cd764f/178/s/definer/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
baseline_level_key()=65ed9d808c92c41c488837e014fee8c2/221/s/invoker/text/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
cat_descendants(uuid)=09ab221636ffb68d7c10c658461f0ede/246/s/invoker/uuid[set]/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
door_audit(door_ctx,text,text,text,jsonb,jsonb)=1e74cfe9e6e62933e1acba56fe395198/246/v/definer/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
door_context(text,text,text,text,character,text)=5a05ee77766181a4256d5b7efce36c41/2334/v/definer/door_ctx/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
door_refuse(text,text)=55f9bf0a6c4c4b2cc57d304df779e7fc/270/v/invoker/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
door_refused(text,text,text)=1a94a1b3ad3446749a1d08d9c096df02/1419/v/definer/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
get_role_hierarchy(uuid)=439ae3f84a13b6b0749ae8720c51ac75/238/s/definer/uuid[set]/acl={postgres=X/postgres}/cfg={search_path=public}
has_permission(uuid,text,text)=c633eae927473b96a4e228a7bdd1356a/1514/s/definer/boolean/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
has_permission_scoped(uuid,text,text,character,text)=3825186312d23eb61175be8134b624f8/2332/s/definer/record[set]/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
is_super_admin(uuid)=00bb2555ebe87b928be3804102c91ff4/168/s/definer/boolean/acl={postgres=X/postgres}/cfg={search_path=public}
log_audit(text,text,text,jsonb)=4a9f53ecc195b2297e304674620e1c99/184/v/definer/void/acl={postgres=X/postgres}/cfg={search_path=public}
market_settings_for(character)=3566667fb7791cb2be5af72f256a638b/346/s/invoker/market_settings/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
name_check_queue_page(timestamp with time zone,uuid,integer,boolean,uuid[])=3d6f00841f0199ec8e900c971f465edf/1729/s/invoker/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
rate_gate(text)=ee56a11fdbe5fe70d9ce8ba176b9ba62/1300/v/definer/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
require_step_up_if_needed(text,text)=92f9d4ba6c2b80816b6f9764e1d8c83c/1766/s/definer/void/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
seller_regular_live(uuid,character,uuid)=38a0e1c140db0ce2cebc051ef9b2252c/347/s/invoker/integer/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
seller_regular_live(uuid,character)=634b8918c043c67dfa9545f09b333417/297/s/invoker/integer/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
transition_listing(uuid,text)=162b76e76b15eb016f0cbb5d0a2629da/460/v/definer/jsonb/acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}/cfg={search_path=public}
transition_listing_core(uuid,text)=8281cf2fe98b3e674015f4c089db6f39/9652/v/definer/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
validate_listing_draft(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,jsonb,integer,boolean,uuid)=491536378cd106df1bc9c04359c93847/22679/v/definer/jsonb/acl={postgres=X/postgres,service_role=X/postgres}/cfg={search_path=public}
#CALLERS-FN
admin_allow_listing_photo <- fn public.listing_photos_approved_with_ad()
admin_allow_listing_photo_core <- fn public.admin_allow_listing_photo(uuid)
admin_edit_listing_core <- fn public.admin_edit_listing(uuid,jsonb,text,text)
admin_edit_listing_core <- fn public.admin_undo_listing_edit(uuid,timestamp with time zone,text)
admin_move_listing_core <- fn public.admin_move_listing(uuid,text,text,text)
admin_review_photo_change_core <- fn public.admin_review_photo_change(uuid)
admin_undo_listing_edit <- fn public.admin_edit_listing_core(uuid,jsonb,text,text)
transition_listing <- fn public.my_listing(uuid)
transition_listing_core <- fn public.admin_move_listing_core(uuid,text,text,text)
transition_listing_core <- fn public.designation_sweep_core(uuid[])
transition_listing_core <- fn public.resume_listing(uuid)
transition_listing_core <- fn public.set_listing_level(uuid,text)
transition_listing_core <- fn public.transition_listing(uuid,text)
#CALLERS-POLICY
none
#CALLERS-VIEW
none
#TRIGGERS
audit_log.audit_log_append_only -> audit_log_append_only (before delete update)
door_refusals.door_refusals_updated_at -> update_updated_at_column (before update)
listing_certifications.listing_certifications_final -> listing_certifications_finality (before update)
listing_photos.acceptance_guard -> legal_acceptance_guard (before insert update)
listing_revisions.listing_revisions_home_country -> fill_seller_home_country (before insert)
listings.acceptance_guard -> legal_acceptance_guard (before insert update)
listings.feed_index_on_listing_insert -> feed_index_on_listing_insert (after insert)
listings.feed_index_on_listing_update -> feed_index_on_listing_update (after update)
listings.listing_photos_approved_with_ad -> listing_photos_approved_with_ad (after update)
listings.listings_free_slot_guard -> listings_free_slot_guard (before insert update)
listings.listings_price_marks -> listings_price_marks (before update)
listings.listings_search_tsv_refresh -> listings_search_tsv_refresh (before insert update)
listings.listings_state_marks -> listings_state_marks (before update)
listings.update_listings_updated_at -> update_updated_at_column (before update)
name_checks.name_checks_clear_imitates_of -> name_checks_clear_imitates_of (before update)
seller_notices.seller_notices_home_country -> fill_seller_home_country (before insert)
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
review_reveal 60/3600s
revise 120/3600s
staff_config 600/3600s
staff_moderation 600/3600s
#PERMS
audit_logs:export step_up=false
audit_logs:view step_up=false
listings:create step_up=false
listings:delete step_up=false
listings:enforce step_up=true
listings:manage step_up=false
listings:review step_up=true
listings:update step_up=false
listings:view step_up=false
profiles:create step_up=true
profiles:delete step_up=true
profiles:manage step_up=false
profiles:update step_up=true
profiles:view step_up=false
#LISTINGS-ROWS
0
#COST admin_list_listings (all, 25 rows max) run1=414.2us run2=396.7us run3=326.8us
````

### Appendix B — the stems' hits (stems.txt)

````text
== rg -n -F 'not signed in' src e2e scripts (17)
src/server/route.test.ts:53:      return routeJson({ error: "not signed in" }, 401);
e2e/admin-monetisation.spec.ts:1391:        /denied|not signed in|permission denied/,
src/server/supabase/upstream.test.ts:136:  it("UP-3 an auth server that does not answer is 'upstream' (503), a refused bearer stays 'not signed in' (401)", async () => {
src/server/supabase/user-client.ts:36: * "not signed in": the route answers 503 and the client tries again.
src/server/supabase/user-client.ts:221: * wording of "not signed in" is written once.
src/server/supabase/user-client.ts:233:  // Turn S3 — a deactivated account: refused, not "not signed in"; nothing is logged (no incident, no secret).
src/server/supabase/user-client.ts:236:    console.error(`[ssr-error] ${path} not signed in ${errorText(answer.message)}`);
src/server/supabase/user-client.ts:239:    { error: answer.reason === "missingBearer" ? "missing bearer token" : "not signed in" },
src/features/admin-listings/tier-reasons.test.ts:127:      (message) => message !== "not signed in" && message !== "account is deactivated",
src/features/admin-listings/tier-reasons.test.ts:155:      (message) => message !== "not signed in" && message !== "account is deactivated",
src/features/admin/translations/translations-service.test.ts:119:    await expect(translate()).rejects.toThrow("not signed in");
src/features/admin/translations/translations-service.test.ts:120:    await expect(listProviderLanguages()).rejects.toThrow("not signed in");
src/features/posting/posting-service.ts:35:/** The bearer the routes demand; absent means "not signed in" and the route 401s. */
src/features/admin/translations/translations-service.ts:552:  if (answer.kind === "signedOut") throw new Error("not signed in");
src/features/admin/translations/translations-service.ts:623:  if (answer.kind === "signedOut") throw new Error("not signed in");
src/features/admin-monetisation/monetisation-service.ts:253:  "not signed in": "admin.packages.error.denied",
src/features/admin-categories/category-images-service.ts:51:  if (answer.kind === "signedOut") throw new CategoryImageError("not signed in", 401, "model-call");
== rg -n -F 'not authenticated' src e2e scripts (5)
e2e/auth-caller-gates.spec.ts:259:      /only a super admin|not your listing|not authenticated|illegal transition/,
e2e/ad-page-doors.spec.ts:442:    expect(refused.error).toMatch(/permission denied|not authenticated/);
src/lib/reader-failure.ts:25:    /JWT|not authenticated/i.test(message)
src/features/auth/deactivated.test.ts:31:    expect(isDeactivatedRefusal("not authenticated")).toBe(false);
src/features/seller/seller-review.test.ts:23:      error: { message: "not authenticated", code: "P0001", details: "", hint: "" },
== rg -n -F 'permission denied' src e2e scripts (64)
e2e/legal-doors.spec.ts:796:    expect(refused.error, "record_legal_notice is service-only").toContain("permission denied");
e2e/legal-doors.spec.ts:1277:      "permission denied",
e2e/admin-screening.spec.ts:399:    expect(facts.error).toBe("permission denied");
e2e/admin-screening.spec.ts:404:    expect(shown.error).toBe("permission denied");
e2e/admin-screening.spec.ts:1200:    expect(allowed.error?.message).toBe("permission denied");
e2e/auth-caller-gates.spec.ts:257:    expect(error?.message, fn).toContain("permission denied for function");
e2e/admin-listings.spec.ts:330:    await refusedEdit(await leaseUser(), "permission denied", async (person, listingId) => {
e2e/admin-listings.spec.ts:332:        "permission denied",
e2e/admin-listings.spec.ts:335:        "permission denied",
e2e/admin-listings.spec.ts:350:    await refusedEdit(holder, "permission denied");
e2e/admin-listings.spec.ts:2329:    expect(denied.error).toBe("permission denied");
e2e/admin-listings.spec.ts:2524:    expect(denied.error).toBe("permission denied");
e2e/my-listings-doors.spec.ts:721:    expect((await set(me, true, 30)).error).toBe("permission denied");
e2e/my-listings-doors.spec.ts:731:    expect((await set(me, true, 30)).error).toBe("permission denied");
e2e/admin-monetisation.spec.ts:590:    ).toBe("permission denied");
e2e/admin-monetisation.spec.ts:629:    ).toBe("permission denied");
e2e/admin-monetisation.spec.ts:1391:        /denied|not signed in|permission denied/,
scripts/deny-tests/phase1-identity.md:121:    "message": "permission denied for table profiles",
scripts/deny-tests/phase1-identity.md:170:    "message": "permission denied for table user_directory",
scripts/deny-tests/phase1-identity.md:191:    "message": "permission denied for function confirm_home_country"
e2e/ad-page-doors.spec.ts:176:    expect(unsigned.error).toContain("permission denied");
e2e/ad-page-doors.spec.ts:442:    expect(refused.error).toMatch(/permission denied|not authenticated/);
e2e/ad-page-doors.spec.ts:728:      expect(answer.error).toContain("permission denied");
e2e/ad-page-doors.spec.ts:732:    expect(savedList.error).toContain("permission denied");
e2e/ad-page-doors.spec.ts:848:      ).toContain("permission denied");
e2e/ad-page-doors.spec.ts:936:      expect(insert.error).toContain("permission denied");
e2e/ad-page-doors.spec.ts:938:        "permission denied",
e2e/ad-page-doors.spec.ts:941:        "permission denied",
e2e/admin-services.spec.ts:125:    expect(list.error).toBe("permission denied");
e2e/admin-services.spec.ts:128:    expect(days.error).toBe("permission denied");
e2e/admin-services.spec.ts:136:    expect(set.error).toBe("permission denied");
e2e/admin-services.spec.ts:140:    expect(gate.error ?? "").toContain("permission denied");
e2e/admin-services.spec.ts:145:    expect(spend.error ?? "").toContain("permission denied");
e2e/admin-services.spec.ts:149:      expect(read.error ?? "", `${table} read`).toContain("permission denied");
e2e/my-listings-levels.spec.ts:411:    expect(JSON.stringify(anonymous.body), "anonymous").toMatch(/notSignedIn|permission denied/);
src/routes/api/translate.route.test.ts:331:      ["permission denied", "writerFailed"],
src/server/imports/csv.test.ts:66:    expect(exportRefusal({ message: "permission denied" }, "unknown country scope")).toBeNull();
src/server/imports/route.test.ts:297:    // F1-4b — the seven rows that read `permission denied`, `import already running`,
src/server/imports/route.test.ts:303:      "permission denied",
src/features/admin/translations/history-drawer.test.tsx:92:    listRevisions.mockRejectedValue(new Error("permission denied"));
src/lib/refusal-tail.test.ts:68:    expect(doorKeyText("permission denied", translate)).toBeNull();
src/features/admin/translations/pseudo-generate.test.tsx:126:      if (key === "a.first") throw new Error("permission denied");
src/features/admin/translations/pseudo-generate.test.tsx:164:    mocks.write.mockRejectedValue(new Error("permission denied"));
src/lib/supabase-door.test.ts:143:      json({ code: "42501", message: "permission denied", details: "d", hint: "h" }, 403),
src/lib/supabase-door.test.ts:148:      error: { code: "42501", message: "permission denied", details: "d", hint: "h" },
src/features/admin/translations/export-all.test.ts:114:    const reader = vi.fn(async () => ({ data: null, error: new Error("permission denied") }));
src/features/admin/translations/export-all.test.ts:115:    await expect(fetchAllTranslationRows("zxx-mo", reader)).rejects.toThrow("permission denied");
src/features/admin/legal/legal-service.test.ts:245:  expect(legalRefusalKey({ message: "permission denied" })).toBe("admin.legal.error.generic");
src/features/admin-screening/name-checks.test.tsx:57:      error: new Error("permission denied"),
src/features/levels/levels-store.test.ts:166:    tableAnswers.push({ data: null, error: { message: "permission denied", code: "42501" } });
src/features/levels/levels-store.test.ts:172:    expect(logged).toHaveBeenCalledWith("[levels] the level rows read failed", "permission denied");
src/features/admin-listings/edit-listing.test.ts:152:    expect(editErrorKey("permission denied")).toBe("admin.listings.move.error.denied");
src/features/admin-screening/use-photo-reviews.test.ts:46:    expect(photoAllowErrorKey("permission denied")).toBe("common.error");
src/features/admin-listings/listing-policy.test.ts:47:    expect(settingsErrorKey("permission denied")).toBe("admin.listings.settings.failed");
src/features/admin-listings/tier-reasons.test.ts:110:    expect(tierErrorKey("permission denied")).toBe("admin.listings.move.error.denied");
src/features/admin-listings/move-reasons.ts:63:  if (message === "permission denied") return "admin.listings.move.error.denied";
src/features/admin-listings/undo-edit.test.ts:46:    expect(undoErrorKey("permission denied")).toBe("admin.listings.move.error.denied");
src/features/admin-listings/tier-dialog.test.tsx:188:    tableAnswers.push({ data: null, error: { message: "permission denied", code: "42501" } });
src/features/admin-listings/move-reasons.test.ts:61:    expect(moveErrorKey("permission denied")).toBe("admin.listings.move.error.denied");
src/features/admin-monetisation/monetisation-service.ts:254:  "permission denied": "admin.packages.error.denied",
src/features/admin-listings/tier-reasons.ts:97:  if (message === "permission denied") return "admin.listings.move.error.denied";
src/features/admin-ai/ai-service.ts:439:  if (/permission denied/i.test(raw)) return { key: "admin.ai.error.denied", raw: null };
src/features/admin-ai/ai-service.test.ts:158:    expect(aiErrorKey("permission denied")).toEqual({ key: "admin.ai.error.denied", raw: null });
src/features/admin-ai/ai-spend-days.test.tsx:79:    read.error = new Error("permission denied");
== rg -n -F 'forbidden' src e2e scripts (41)
scripts/conformance/import-doors.test.ts:225:    expect(words.has("forbidden")).toBe(true);
scripts/conformance/executor-hooks.test.ts:621:  it("EXH-16 every command the protocol requires passes BOTH layers — the permission rules and the guard; the forbidden ones are deni…
scripts/conformance/executor-hooks.test.ts:668:    // The second layer: the rules deny the forbidden commands on their own.
scripts/ci/lovable-branch-guard.test.ts:57:  it("CF-LVB-1 every forbidden path refuses with its rule and DEC", () => {
scripts/ci/lovable-branch-guard.test.ts:184:  it("CF-LVB-8 a rename away from a forbidden path refuses; a forbidden path on a later page refuses", () => {
scripts/conformance/briefs.test.ts:26:  forbiddenScopeFindings,
scripts/conformance/briefs.test.ts:326:      expect(forbiddenScopeFindings(planted, f).map((x) => x.text)).toEqual([
scripts/conformance/briefs.test.ts:554:      const texts = (text: string) => forbiddenScopeFindings(text, "s.md").map((x) => x.text);
scripts/conformance/briefs.test.ts:572:      expect(forbiddenScopeFindings(brief("x", "SCOPE: a\nb `CLAUDE.md`"), "s.md")[0]?.line).toBe(
e2e/ad-page-doors.spec.ts:131:    for (const forbidden of [
e2e/ad-page-doors.spec.ts:141:      expect(whole).not.toContain(forbidden);
src/routes/api/admin/categories/export.ts:41:    if (refused !== null) return clientError(refused, refused === "forbidden" ? 403 : 404);
src/routes/api/admin/categories/generate-image.test.ts:94:    expect(await response.json()).toEqual({ error: "forbidden" });
src/routes/api/admin/locations/export.ts:45:    if (refused !== null) return clientError(refused, refused === "forbidden" ? 403 : 404);
src/routes/api/admin/attributes/export.ts:44:    if (refused !== null) return clientError(refused, refused === "forbidden" ? 403 : 404);
e2e/proofs/c4-arbitrary-recipient.patch:2:# Applying this to main is forbidden: it re-introduces the INC-010a abuse vector, an
src/routes/api/admin/exports.test.ts:101:  it("EXR-1 a caller without view is 403 forbidden and no export RPC runs", async () => {
src/routes/api/admin/exports.test.ts:111:      expect(await response.json()).toEqual({ error: "forbidden" });
e2e/proofs/b3-enumeration.patch:2:# Applying this to main is forbidden: it re-introduces an account-enumeration leak by
scripts/check-bundle-size.mjs:5: * The weight guard (check-marketplace-imports.mjs) answers "did a forbidden
e2e/admin-shell.spec.ts:181:    const forbidden = ADMIN_SECTIONS.find((s) => !expected.includes(s.id));
e2e/admin-shell.spec.ts:182:    if (forbidden) {
e2e/admin-shell.spec.ts:183:      await page.goto(forbidden.path);
src/routes/api/translate.route.test.ts:208:      body: { error: "forbidden" },
src/routes/api/translate.route.test.ts:552:    expect(await get()).toEqual({ status: 403, body: { error: "forbidden" } });
scripts/brief/go-laws.ts:32:const NEGATION = /\b(?:never|not|no|none|forbidden|refuses)\b/i;
scripts/brief/go-laws.ts:141:export function forbiddenScopeFindings(text: string, file: string): Finding[] {
scripts/brief/go-laws.ts:888:    ...forbiddenScopeFindings(text, file),
src/server/imports/route.ts:65:  "forbidden",
src/server/imports/csv.test.ts:60:  it("CSV-7 an export reader's gate code is forbidden, with or without its scope; no sentence is; the scope sentence answers itself", () => {
src/server/imports/csv.test.ts:62:    expect(exportRefusal({ message: "permissionDenied" }, scope)).toBe("forbidden");
src/server/imports/csv.test.ts:64:      "forbidden",
src/server/imports/route.test.ts:201:    expect(await response.json()).toEqual({ error: "forbidden" });
src/server/imports/csv.ts:67:): "forbidden" | typeof unknownScope | null {
src/server/imports/csv.ts:68:  if (doorCode(error).code === "permissionDenied") return "forbidden";
src/server/route.test.ts:291:    expect(await response.json()).toEqual({ error: "forbidden" });
src/server/route.ts:238:        if (!allowed) return clientError("forbidden", 403);
src/lib/route-client.test.ts:133:    fetchMock.mockResolvedValue(jsonAnswer({ error: "forbidden" }, 403));
src/lib/route-client.test.ts:138:      error: "forbidden",
src/features/admin-screening/use-photo-changes.test.ts:37:    expect(photoChangeErrorKey("forbidden")).toBe("common.error");
src/features/admin/translations/translations-service.ts:414:    forbidden: PERMISSION,
== rg -n -F 'account is deactivated' src e2e scripts (16)
src/routes/api/attributes.options.test.ts:61:  expect(await response.json()).toEqual({ error: "account is deactivated" });
e2e/posting-routes.spec.ts:1425:        expect(await draft.json()).toEqual({ error: "account is deactivated" });
e2e/posting-routes.spec.ts:1429:        expect(await identity.json()).toEqual({ error: "account is deactivated" });
e2e/posting-routes.spec.ts:1436:        expect(await options.json()).toEqual({ error: "account is deactivated" });
src/server/supabase/upstream.test.ts:197:    json({ code: "P0001", details: null, hint: null, message: "account is deactivated" }, 400);
src/server/supabase/upstream.test.ts:248:    expect(await refused?.json()).toEqual({ error: "account is deactivated" });
src/server/supabase/user-client.ts:234:  if (answer.reason === "deactivated") return routeJson({ error: "account is deactivated" }, 403);
src/features/auth/deactivated.test.ts:29:    expect(isDeactivatedRefusal("account is deactivated")).toBe(true);
src/features/auth/deactivated.test.ts:30:    expect(isDeactivatedRefusal("P0001: account is deactivated")).toBe(true);
src/lib/door-codes.test.ts:75:    expect(doorCode("account is deactivated")).toEqual({ code: null, detail: null });
src/features/auth/deactivated.ts:38:  return typeof message === "string" && message.includes("account is deactivated");
src/features/my-listings/promote-service.test.ts:173:    expect(promoteRefusalKey({ message: "account is deactivated" }, "level")).toBe("door.refused");
src/features/my-listings/my-listing.test.ts:158:      "account is deactivated",
src/features/admin-listings/tier-reasons.test.ts:127:      (message) => message !== "not signed in" && message !== "account is deactivated",
src/features/admin-listings/tier-reasons.test.ts:155:      (message) => message !== "not signed in" && message !== "account is deactivated",
src/features/my-listings/promote-sheet.test.tsx:170:      { data: null, error: { message: "account is deactivated", code: "P0001" } },
== rg -n -F 'rateLimited' src e2e scripts (262)
src/routes/l.$slug.tsx:38:    if (answer.kind === "rate") console.error("[ssr-error] /l rateLimited");
src/routes/l.$slug.tsx:140:  const [saveRefusal, setSaveRefusal] = useState<"rateLimited" | "failed" | null>(null);
src/routes/l.$slug.tsx:166:        else setSaveRefusal(answer.reason === "rateLimited" ? "rateLimited" : "failed");
e2e/photo-pipeline.spec.ts:445:    expect(reasons(answer.payload)).toEqual([{ field: "rate", reason: "rateLimited" }]);
e2e/posting-routes-dials.spec.ts:21: * naming `rateLimited` (no return type changes). Each test lowers that dial for its OWN leased seller through
e2e/posting-routes-dials.spec.ts:37:/** The refusal of the `revise` dial: the door's exception names rateLimited. */
e2e/posting-routes-dials.spec.ts:39:  return answer.error !== null && answer.error.includes("rateLimited");
src/routes/api/media/photo-links.test.ts:101:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T13:00:00Z" }],
e2e/viewing-place.spec.ts:184:    expect(await refusedPlace(own, c.subCity.id)).toBe("rateLimited");
src/routes/api/media/photo-links.ts:74:    if (!rate.allowed) return refusal("rate", "rateLimited", rate.resetsAt ?? undefined);
e2e/posting-routes.spec.ts:551:        const rate = reasonsOf(answer.payload).find((entry) => entry.reason === "rateLimited");
e2e/posting-routes.spec.ts:563:      expect(entry["reason"]).toBe("rateLimited");
e2e/posting-routes.spec.ts:564:      // INC-1170: the gate's rateLimited names no reset time until F1-7; it restores the detail assertion here.
e2e/posting-routes.spec.ts:1311:      const refusal = refusals.find((entry) => entry["reason"] === "rateLimited");
src/routes/api/upload/photo.test.ts:194:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T13:00:00Z" }],
e2e/post-wizard-place.spec.ts:1540:      expect(refusal?.reason, "PW-41: the refusal used another word").toBe("rateLimited");
scripts/conformance/error-text-allowlist.txt:7:src/features/admin-listings/listings-page.tsx | :291 maps a refusal's own message to the words shown (moveErrorKey; an empty message …
src/routes/api/attributes.$id.options.ts:20:  readonly code = "rateLimited";
src/routes/api/attributes.$id.options.ts:44:          if (error.message.includes("rateLimited")) throw new OptionsRefusal();
src/routes/api/translate.ts:140:              "rateLimited",
e2e/posting-routes-identity.spec.ts:94:      reason: "rateLimited",
e2e/post-wizard-bundle2.spec.ts:1140:        body: JSON.stringify({ ok: false, refusals: [{ field: "rate", reason: "rateLimited" }] }),
e2e/fixtures.ts:144: * (429, `rateLimited`): step 1 shows the name matches and its notice, as nearly
e2e/fixtures.ts:164:      body: JSON.stringify({ error: "rateLimited" }),
src/routes/api/catalog.find.ts:14: * `^[a-z]{2,3}$`); a bad shape is 400 `bad query`, a spent dial 429 `rateLimited`.
src/routes/api/catalog.find.ts:27:  if (answer === null) return clientError("rateLimited", 429);
src/routes/api/catalog.find.test.ts:49:it("CFR-4 a null search is 429 rateLimited", async () => {
src/routes/api/catalog.find.test.ts:53:  expect(await response.json()).toEqual({ error: "rateLimited" });
e2e/helpers/rate-window.ts:48: * Sends once; any answer but a 429 `rateLimited` returns at once. On that
e2e/helpers/rate-window.ts:57:  const refused = (value: T) => value.status === 429 && value.payload["error"] === "rateLimited";
src/routes/api/geo/search.test.ts:63:it("GSR-2 a spent dial is rateLimited with resetsAt and no outbound call", async () => {
src/routes/api/geo/search.test.ts:68:    refusals: [{ field: "geocode", reason: "rateLimited", detail: SPENT.resetsAt }],
src/routes/api/geo/outline.ts:76:        { field: "geocode", reason: "rateLimited", detail: error.resetsAt ?? undefined },
scripts/fixtures/e2e-results-flaky-stdout.json:103:                      "text": "[client-error] HTTP 429 POST /api/listings/identity ({\"ok\":false,\"refusals\":[{\"field\":\"rate…
src/routes/api/geo/search.ts:29: *     request. A spent dial is `rateLimited` in the door's own vocabulary (F4).
e2e/post-wizard-specs.spec.ts:380:          body: JSON.stringify({ ok: false, reason: "rateLimited" }),
e2e/post-wizard-specs.spec.ts:399:      `[data-testid="post-attr-options-error"][data-attr="${spec.select.attrKey}"][data-reason="rateLimited"]`,
e2e/post-wizard-specs.spec.ts:401:    await expect(line).toHaveText(en["post.specs.rateLimited"]);
src/routes/api/geo/outline.test.ts:87:it("GOL-4 a spent dial is rateLimited, no outbound call, nothing cached", async () => {
src/routes/api/geo/outline.test.ts:91:    refusals: [{ field: "geocode", reason: "rateLimited", detail: SPENT.resetsAt }],
e2e/import-security.spec.ts:834:          expect(answer.payload["error"]).toBe("rateLimited");
e2e/ad-page-doors.spec.ts:549:    expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
e2e/ad-page-doors.spec.ts:752:      expect(repeat.error).toBe("rateLimited");
e2e/ad-page-doors.spec.ts:756:      expect(third.error).toBe("rateLimited");
e2e/ad-page-doors.spec.ts:855:      expect(limited.error).toBe("rateLimited");
e2e/ad-page-doors.spec.ts:860:      expect(duplicate.error).toBe("rateLimited");
src/routes/api/publish.test.ts:111:      ["rateLimited", 429],
src/routes/api/attributes.options.test.ts:98:it("ATO-6 rateLimited is not cached", async () => {
src/routes/api/attributes.options.test.ts:102:    error: name === "get_attribute_options" ? { message: "rateLimited" } : null,
src/routes/api/attributes.options.test.ts:108:    expect(await response.json()).toEqual({ error: "rateLimited" });
src/routes/api/attributes.options.test.ts:114:it("ATO-7 the shell's refusals: attributeNotFound is a 404, rateLimited a 429 that is not cached, any other code a read failure", asyn…
src/routes/api/attributes.options.test.ts:126:  refuse("rateLimited", 429);
src/routes/api/attributes.options.test.ts:129:  expect(await limited.json()).toEqual({ error: "rateLimited" });
src/routes/api/translate.route.test.ts:268:      body: { error: "rateLimited" },
src/routes/api/translate.route.test.ts:330:      ["rateLimited", "writerFailed"],
src/routes/api/listings/identity.test.ts:188:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-25T00:00:00Z" }],
src/routes/api/listings/identity.test.ts:271:   * route (through doorCall) keeps its code as the reason. The gate's `rateLimited` names no
src/routes/api/listings/identity.test.ts:277:      ["rateLimited", 429],
src/routes/api/listings/photos.test.ts:117:      refusals: [{ field: "photos", reason: "rateLimited", detail: "2026-10-24T12:00:00Z" }],
src/routes/api/listings/photos.test.ts:154:      ["rateLimited", 429],
src/lib/door-error.ts:25: * own machine code (`tooManyPhotos:10`, `rateLimited`) keeps that code — the
src/routes/api/listings/draft.test.ts:163:      "rateLimited",
src/routes/api/listings/draft.test.ts:176:      ["rateLimited", 429],
src/routes/api/listings/alias.ts:18: * (the dial's `rateLimited` included) reaches the client as its code, through `doorCall`.
src/lib/refusal.ts:19: *    such as a rate gate's `rateLimited` included: the consoles' shared words
src/routes/api/listings/identity.ts:148:        { field: "rate", reason: "rateLimited", detail: rate.resetsAt ?? undefined },
src/routes/api/listings/identity.ts:202:  // F1-5a — the door is on the shell: a refusal (the gate's `rateLimited` included, which names
src/lib/door-codes.ts:28:  "rateLimited",
src/routes/api/listings/draft.ts:98: * `doorCall`'s (`doorRefusal`), which keeps a door's code (`rateLimited`,
src/routes/api/listings/background.ts:94:      refused = refusal("rate", "rateLimited", daily.resetsAt ?? undefined);
src/lib/route-client.test.ts:204:    fetchMock.mockResolvedValue(jsonAnswer({ error: "rateLimited", detail: "60" }, 429));
src/lib/route-client.test.ts:210:      payload: { error: "rateLimited", detail: "60" },
src/lib/route-client.test.ts:211:      error: "rateLimited",
src/server/route.test.ts:406:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T11:00:00Z" }],
src/server/route.test.ts:438:      error: "rateLimited",
src/routes/api/listings/assist.test.ts:175:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T12:00:00Z" }],
src/routes/api/listings/alias.test.ts:123:        ["rateLimited", 429],
src/lib/error-text.test.ts:19:    expect(errorText({ code: "P0001", message: "rateLimited" })).toBe("rateLimited");
src/server/door.test.ts:50:    for (const code of ["notReady:photos", "rateLimited", "notYourListing", "other"]) {
src/server/door.ts:47:    // Ruling 4 (F1-5a) — a door's own machine code (`notYourListing`, `rateLimited`,
src/lib/refusal-tail.ts:17: * `rateLimited` (rate_gate, INC-951). Every staff screen reads it as ONE shared
src/lib/refusal-tail.ts:18: * sentence; a screen with its own specific rateLimited key maps it before here.
src/lib/refusal-tail.ts:20:export const RATE_LIMITED_KEY = "admin.error.rateLimited" satisfies MessageKey;
src/lib/refusal-tail.ts:23:export const ADMIN_REFUSALS: RefusalFamily = { words: { rateLimited: RATE_LIMITED_KEY } };
src/lib/refusal-tail.ts:38:  const key = code === "rateLimited" ? RATE_LIMITED_KEY : code;
src/lib/door-error.test.ts:20:    expect(doorRefusal("rateLimited")).toEqual({ field: "door", reason: "rateLimited" });
src/lib/door-codes.test.ts:45:      "rateLimited",
src/lib/door-codes.test.ts:90:    expect(doorCode("rateLimited:2026-11-06T10:00:00Z")).toEqual({
src/lib/door-codes.test.ts:91:      code: "rateLimited",
src/lib/reader-failure.test.ts:18:    expect(readerFailure({ code: "P0001", message: "rateLimited" }).class).toBe("refused"));
src/lib/reader-failure.ts:32:              /^(?:rateLimited|notYours|notYourListing|permissionDenied|accountDeactivated|acceptancePending|legalAcceptancePending|stepUpRequired|notI…
src/lib/refusal.test.ts:19:  "admin.error.rateLimited",
src/lib/refusal.test.ts:60:      { kind: "answered", status: 429, ok: false, payload: null, error: "rateLimited", detail: "" },
src/lib/refusal.test.ts:63:    expect(coded).toMatchObject({ key: "admin.error.rateLimited", branch: "family" });
src/server/route.ts:67:   * (`{field, reason: reason ?? "rateLimited", detail: resetsAt}`) instead of
src/server/route.ts:252:                  reason: entry.refuseAs.verdict.reason ?? "rateLimited",
src/server/route.ts:258:              "rateLimited",
src/server/supabase/user-client.ts:370:      if (rest["reason"] !== "rateLimited") return entry;
src/server/imports/route.ts:71:  "rateLimited",
src/server/imports/route.ts:100:  rateLimited: 429,
src/server/imports/route.ts:251:          "rateLimited",
src/server/imports/csv.test.ts:71:    expect(exportRefusal({ message: "rateLimited" }, scope)).toBeNull();
src/features/posting/refusal-text.ts:46:  rateLimited: "post.refusal.rateLimited",
src/features/posting/refusal-text.ts:123:  rateLimited: "post.photo.refusal.rateLimited",
src/features/posting/refusal-text.ts:176: * F1-5a — A REFUSAL THAT IS THE DIAL'S: a door's error (the shell's `rateLimited`, or the
src/features/posting/refusal-text.ts:181:  return readRefusal(refusal, DRAFT_REFUSALS).key === DRAFT_REASONS["rateLimited"];
src/server/imports/route.test.ts:259:  it("IMR-6 a spent dial on preview answers 429 rateLimited with no RPC; commit metering follows budgetModes", async () => {
src/server/imports/route.test.ts:264:    expect(await limited.json()).toEqual({ error: "rateLimited" });
src/server/imports/route.test.ts:350:        envelope("rateLimited", "2026-11-14T15:00:00+00:00"),
src/server/imports/route.test.ts:352:        { error: "rateLimited", detail: "2026-11-14T15:00:00+00:00" },
src/server/imports/route.test.ts:600:        expect(await second.json()).toEqual({ error: "rateLimited" });
src/server/imports/route.test.ts:622:        expect(await second.json()).toEqual({ error: "rateLimited" });
src/features/posting/photo-background.test.ts:54:    expect(backgroundRefusalKey("rateLimited:2026-10-15T00:00:00Z")).toBe(
src/features/posting/photo-background.test.ts:55:      "post.photo.refusal.rateLimited",
src/features/admin-screening/use-screening.ts:341:  | { ok: false; reason: "notShown" | "rateLimited" };
src/features/admin-screening/use-screening.ts:344:export function revealProblemKey(reason: "notShown" | "rateLimited") {
src/features/admin-screening/use-screening.ts:345:  return reason === "rateLimited"
src/features/admin-screening/use-screening.ts:363:  if (payload["reason"] === "notShown" || payload["reason"] === "rateLimited") {
src/features/admin-screening/use-screening.test.ts:166:    expect(revealProblemKey("rateLimited")).toBe("admin.screening.revealLimited");
src/features/admin/translations/translations-service.test.ts:103:  it("TRS-6 the press dial's 429 shows admin.translations.ai.rateLimited, with no detail line", async () => {
src/features/admin/translations/translations-service.test.ts:104:    route.answer = answered(429, { error: "rateLimited" });
src/features/admin/translations/translations-service.test.ts:108:    expect(translationRefusalKey(failure)).toBe("admin.translations.ai.rateLimited");
src/features/admin/translations/translations-service.test.ts:110:    // An import's own rateLimited refusal keeps its file key.
src/features/admin/translations/translations-service.test.ts:111:    expect(translationRefusalKey(new Error("rateLimited"))).toBe(
src/features/admin/translations/translations-service.test.ts:195:      ["rateLimited", "admin.translations.error.fileTooMany"],
src/features/posting/preview/listing-detail.tsx:279:    refusal: "rateLimited" | "failed" | null;
src/features/posting/preview/listing-detail.tsx:794:                    view.save.refusal === "rateLimited"
src/features/posting/preview/listing-detail.tsx:795:                      ? "adPage.save.rateLimited"
src/features/posting/preview/listing-detail.tsx:1522:            : state.reason === "rateLimited"
src/features/posting/preview/listing-detail.tsx:1523:              ? t("adPage.contact.rateLimited")
src/features/admin/users/admin-users-service.ts:243: * F1-2); unknownUser and rateLimited read as the generic. Two sentences remain: step-up stays
src/features/admin/users/alias-reason.test.ts:41:    ["rateLimited", "admin.users.edit.failed"],
src/features/admin/roles/roles-service.ts:150: * words here (unknownRole, unknownPermission, roleReserved, rateLimited) reads
src/features/admin-monetisation/monetisation-service.ts:256:  rateLimited: "admin.packages.error.rateLimited",
src/features/admin/roles/roles-service.test.ts:29:      "rateLimited:2026-11-14T10:00:00Z",
src/features/admin-locations/location-refusals.test.tsx:58:      [...IDS, "permissionDenied", "rateLimited", "required", "badType"].sort(),
src/features/admin-locations/location-refusals.test.tsx:72:    expect(readRefusal(refused("rateLimited"), LOCATION_REFUSALS).key).toBe(
src/features/admin-locations/location-refusals.test.tsx:73:      "admin.error.rateLimited",
src/features/admin-locations/location-refusals.ts:21:    rateLimited: RATE_LIMITED_KEY,
src/features/posting/preview/listing-detail.test.tsx:297:        state: { kind: "refused", reason: "rateLimited" },
src/features/posting/preview/listing-detail.test.tsx:302:    en["adPage.contact.rateLimited"],
src/features/posting/preview/listing-detail.test.tsx:359:      save={{ ...save, viewer: "signedIn", busy: true, refusal: "rateLimited" }}
src/features/posting/preview/listing-detail.test.tsx:363:  expect(screen.getByRole("status")).toHaveTextContent(en["adPage.save.rateLimited"]);
src/features/admin/legal/legal-service.test.ts:247:  for (const code of ["permissionDenied", "notSignedIn", "rateLimited", "unknownVersion"])
src/features/admin/legal/legal-service.ts:396: * `rateLimited` and the whole export fails, never a file cut short.
src/features/admin/translations/translations-service.ts:435:    rateLimited: FILE_TOO_MANY,
src/features/admin/translations/translations-service.ts:436:    [MACHINE_TRANSLATE_RATE_LIMITED]: "admin.translations.ai.rateLimited",
src/features/posting/use-draft.test.tsx:166:    refusals: [{ field: "door", reason: "rateLimited", detail: "2099-01-01T00:00:00Z" }],
src/features/admin-categories/category-refusals.ts:16:    rateLimited: RATE_LIMITED_KEY,
src/features/admin-attributes/attribute-refusals.test.tsx:23:      ["rateLimited", "admin.error.rateLimited"],
src/features/posting/step-where.tsx:155:type LineState = "idle" | "busy" | "saved" | "failed" | "long" | "contact" | "rateLimited";
src/features/posting/step-where.tsx:2129:          {(dirState === "failed" || dirState === "rateLimited") && (
src/features/posting/step-where.tsx:2136:                dirState === "rateLimited"
src/features/posting/step-where.tsx:2137:                  ? "post.refusal.rateLimited"
src/features/posting/step-where.tsx:2223:          {(noteState === "failed" || noteState === "rateLimited") && (
src/features/posting/step-where.tsx:2230:                noteState === "rateLimited"
src/features/posting/step-where.tsx:2231:                  ? "post.refusal.rateLimited"
src/features/posting/attribute-options.ts:156: * route's 429 (rateLimited), so a control the seller opened can say so in
src/features/posting/attribute-options.ts:178:    // F4 — never silent: a refused read (429 = rateLimited) is logged.
src/features/legal/certify-refusal.test.ts:35:    expect(certifyRefusal("rateLimited", navigate, { pathname: "/", search: "" })).toBe(false);
src/features/posting/posting-service.ts:839: * `rateLimited` past it, as the shell's error (F1-5a); the details step says so in plain words
src/features/posting/posting-service.ts:845:): Promise<{ schema: PostingSchema | null; rateLimited: boolean }> {
src/features/posting/posting-service.ts:850:    const rateLimited = isRateRefusal(error);
src/features/posting/posting-service.ts:851:    if (!rateLimited) console.error("[posting] schema read failed:", error.message);
src/features/posting/posting-service.ts:852:    return { schema: null, rateLimited };
src/features/posting/posting-service.ts:854:  return { schema: shapePostingSchema(data), rateLimited: false };
src/features/posting/posting-service.ts:1146:function pinAnswer(message: string): "contactInNote" | "rateLimited" | "failed" {
src/features/posting/posting-service.ts:1149:  // M9b / INC-444 — the revise dial refuses by exception naming rateLimited.
src/features/posting/posting-service.ts:1150:  return message.includes("rateLimited") ? "rateLimited" : "failed";
src/features/posting/posting-service.ts:1243:): Promise<"saved" | "contactInNote" | "rateLimited" | "failed"> {
src/features/admin-categories/category-dialogs.test.tsx:24:  it("CDR-1: a save refused by a rate gate shows the shared admin.error.rateLimited", () => {
src/features/admin-categories/category-dialogs.test.tsx:27:    act(() => result.current.fail({ message: "rateLimited", code: "P0D01" }));
src/features/admin-categories/category-dialogs.test.tsx:28:    expect(result.current.message).toBe("T(admin.error.rateLimited)");
src/features/posting/step-specifications.tsx:97:  rateLimited?: boolean;
src/features/posting/step-specifications.tsx:173:  const [rateLimited, setRateLimited] = useState(false);
src/features/posting/step-specifications.tsx:244:      setRateLimited(read.rateLimited);
src/features/posting/step-specifications.tsx:288:            ? { state: "failed", list: [], rateLimited: limited }
src/features/posting/step-specifications.tsx:1194:            {t(rateLimited ? "post.specs.rateLimited" : "post.specs.loadFailed")}
src/features/posting/step-specifications.tsx:1207:        {t(rateLimited ? "post.specs.rateLimited" : "post.specs.loadFailed")}
src/features/posting/step-specifications.tsx:1754:                data-reason={held.rateLimited ? "rateLimited" : "failed"}
src/features/posting/step-specifications.tsx:1756:                {t(held.rateLimited ? "post.specs.rateLimited" : "post.specs.optionsFailed")}
src/features/posting/step-specifications-last-answer.test.tsx:32:    rateLimited: false,
src/features/admin-attributes/attribute-refusals.ts:18:    rateLimited: RATE_LIMITED_KEY,
src/features/posting/posting-service.test.ts:325:      tables.doorAnswer = { data: null, error: { message: "rateLimited", code: "P0D01" } };
src/features/posting/posting-service.test.ts:326:      expect(await readPostingSchemaAnswer("cat-1")).toEqual({ schema: null, rateLimited: true });
src/features/posting/posting-service.test.ts:332:        "a sentence that names rateLimited",
src/features/posting/posting-service.test.ts:338:          rateLimited: false,
src/features/admin-categories/use-image-failure.test.ts:19:    expect(line(new CategoryImageError("rateLimited", 429, "model-call"))).toBe(
src/features/admin-categories/use-image-failure.test.ts:20:      `admin.categories.error.imageFailed${stage("model-call")}: rateLimited`,
src/features/admin-categories/use-image-failure.test.ts:25:    expect(line(new CategoryImageError("rateLimited", 0, "persist"))).toBe(
src/features/admin-categories/use-image-failure.test.ts:26:      "admin.error.rateLimited",
src/features/posting/refusal-text.test.ts:16:    expect(draftRefusalKey("rateLimited")).toBe("post.refusal.rateLimited");
src/features/posting/refusal-text.test.ts:19:    expect(photoRefusalKey("rateLimited")).toBe("post.photo.refusal.rateLimited");
src/features/posting/refusal-text.test.ts:27:    expect(isRateRefusal("rateLimited")).toBe(true);
src/features/posting/refusal-text.test.ts:28:    expect(isRateRefusal({ message: "rateLimited", code: "P0D01" })).toBe(true);
src/features/posting/refusal-text.test.ts:29:    expect(isRateRefusal({ field: "door", reason: "rateLimited" })).toBe(true);
src/features/posting/refusal-text.test.ts:31:    expect(isRateRefusal({ message: "a sentence that names rateLimited" })).toBe(false);
src/features/admin-categories/category-refusals.test.tsx:24:      ["rateLimited", "admin.error.rateLimited"],
src/features/legal/legal-accept-refusals.ts:7: * `emptyList`, `notApplicable`, the gate's `rateLimited`); the one the person can mend by
src/features/posting/photo-refusal.test.ts:10:    expect(photoRefusalKey("rateLimited")).toBe("post.photo.refusal.rateLimited");
src/features/posting/use-draft.ts:425:    const limited = answer.refusals.find((refusal) => refusal.reason === "rateLimited");
src/features/posting/map/geocode.ts:20:export type GeoReason = "rateLimited" | "unavailable" | "signedOut" | null;
src/features/posting/map/geocode.ts:44:    return { payload, reason: first["reason"] === "rateLimited" ? "rateLimited" : "unavailable" };
src/features/admin-countries/country-refusals.ts:17:    rateLimited: RATE_LIMITED_KEY,
src/features/legal/legal-accept-refusals.test.ts:27:    "rateLimited",
src/features/posting/map/map-pin-dropper.tsx:71:  rateLimited: "post.pin.geocodeRateLimited",
src/features/admin-countries/country-refusals.test.tsx:31:      [...IDS, "permissionDenied", "rateLimited", "required", "badType"].sort(),
src/features/admin-countries/country-refusals.test.tsx:42:    expect(readRefusal(refused("rateLimited"), COUNTRY_REFUSALS).key).toBe(
src/features/admin-countries/country-refusals.test.tsx:43:      "admin.error.rateLimited",
src/features/my-listings/promote-service.test.ts:156:      ["rateLimited", "myListings.error.rateLimited"],
src/features/ad-page/contact.ts:35:  // `rateLimited`) arrive as an error whose message is the code; the body's own two ceilings
src/features/ad-page/contact.ts:36:  // (`sellersCapReached`, the new-account `rateLimited`) stay a returned answer (D3).
src/features/ad-page/save.ts:19:      // F1-5b — the shell's refusal is a code (`ownListing`, `rateLimited`, ...), read by the one reader.
src/features/my-listings/my-listing-edit.test.ts:93:      ["rateLimited", "myListings.error.rateLimited"],
src/features/my-listings/my-listing-edit.test.ts:117:      ["rateLimited", "myListings.error.rateLimited"],
src/features/my-listings/my-listing-edit.test.ts:170:    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
src/features/my-listings/my-listing-edit.test.ts:172:    expect(other).toEqual({ ok: false, key: "myListings.error.rateLimited" });
src/features/ad-page/report.ts:32:      // F1-5b — the shell's refusal is a code (`alreadyReported`, `ownListing`, `rateLimited`, ...).
src/features/ad-page/report-ad.tsx:37:  const [state, setState] = useState<"sent" | "already" | "rateLimited" | "failed" | null>(null);
src/features/ad-page/report-ad.tsx:99:                  : state === "rateLimited"
src/features/ad-page/report-ad.tsx:100:                    ? "adPage.report.rateLimited"
src/features/my-listings/my-listing.test.ts:131:      ["rateLimited", "myListings.error.rateLimited"],
src/features/ad-page/report.test.ts:29:  it.each(["alreadyReported", "rateLimited", "ownListing"])(
src/features/admin-listings/tier-reasons.test.ts:109:    expect(tierErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
src/features/ad-page/contact.test.ts:61:      data: { ok: false, reason: "rateLimited", resets_at: "2026-11-18T00:00:00Z" },
src/features/ad-page/contact.test.ts:64:    expect(await revealContact("abc")).toEqual({ ok: false, reason: "rateLimited" });
src/features/ad-page/contact.test.ts:67:  it("reads the shell's codes as errors: listingNotAvailable and the gate's rateLimited", async () => {
src/features/ad-page/contact.test.ts:70:    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
src/features/ad-page/contact.test.ts:71:    expect(await revealContact("abc")).toEqual({ ok: false, reason: "rateLimited" });
src/features/my-listings/promote-service.ts:181:  rateLimited: "myListings.error.rateLimited",
src/features/admin-listings/tier-reasons.ts:96:  if (message === "rateLimited") return "admin.listings.move.error.rateLimited";
src/features/ad-page/report-ad.test.tsx:47:  it.each(["sent", "already", "rateLimited", "failed", "ownListing"])(
src/features/ad-page/report-ad.test.tsx:90:          state === "rateLimited" || state === "failed",
src/features/ad-page/save.test.ts:18:  it("SAVE-2 (SV-2) the shell's ownListing and rateLimited codes are read as errors", async () => {
src/features/ad-page/save.test.ts:19:    for (const reason of ["ownListing", "rateLimited"]) {
src/features/ad-page/save.test.ts:23:    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
src/features/ad-page/save.test.ts:24:    expect(await unsaveListing("abc")).toEqual({ ok: false, reason: "rateLimited" });
src/features/ad-page/save.test.ts:45:      { ok: false, reason: "rateLimited" },
src/features/admin-listings/listings-page.tsx:316:            if (message === "rateLimited") break;
src/features/ad-page/ad-page-refusals.ts:5: * answers a refusal as `code[:detail]` (`ownListing`, `rateLimited`, ...); a code with
src/features/ad-page/ad-page-refusals.ts:11:  words: { rateLimited: "adPage.save.rateLimited" },
src/features/ad-page/ad-page-refusals.ts:17:    rateLimited: "adPage.report.rateLimited",
src/features/ad-page/ad-page-refusals.ts:23:/** The contact door's two returned ceilings (`sellersCapReached`, the new-account `rateLimited`) read here too. */
src/features/ad-page/ad-page-refusals.ts:26:    rateLimited: "adPage.contact.rateLimited",
src/features/ad-page/ad-page-refusals.ts:47: * `rateLimited` or a returned one. The ceiling a screen words as "try again tomorrow".
src/features/ad-page/ad-page-refusals.ts:49:function isRate(failure: unknown, family: RefusalFamily & { words: { rateLimited: string } }) {
src/features/ad-page/ad-page-refusals.ts:50:  return readRefusal(failure, family).key === family.words.rateLimited;
src/features/ad-page/ad-page-refusals.ts:53:export type SaveRefusal = "rateLimited" | "ownListing" | "listingNotAvailable" | "failed";
src/features/ad-page/ad-page-refusals.ts:59:  return isRate(failure, SAVE_REFUSALS) ? "rateLimited" : "failed";
src/features/ad-page/ad-page-refusals.ts:62:export type ReportRefusal = "alreadyReported" | "rateLimited" | "ownListing" | "failed";
src/features/ad-page/ad-page-refusals.ts:69:  return key === REPORT_REFUSALS.words.rateLimited ? "rateLimited" : "failed";
src/features/ad-page/ad-page-refusals.ts:74:  | "rateLimited"
src/features/ad-page/ad-page-refusals.ts:85:  return key === CONTACT_REFUSALS.words.rateLimited ? "rateLimited" : "failed";
src/features/ad-page/ad-page-refusals.test.ts:28:    ["rateLimited", "rateLimited"],
src/features/ad-page/ad-page-refusals.test.ts:55:    ["rateLimited", "rateLimited"],
src/features/ad-page/ad-page-refusals.test.ts:69:    ["rateLimited", "rateLimited"],
src/features/ad-page/ad-page-refusals.test.ts:86:    [{ message: "rateLimited" }, "rateLimited"],
src/features/ad-page/ad-page-refusals.test.ts:91:    [{ ok: false, reason: "rateLimited", resets_at: "2026-11-18T00:00:00Z" }, "rateLimited"],
src/features/admin-listings/move-reasons.ts:62:  if (message === "rateLimited") return "admin.listings.move.error.rateLimited";
src/features/my-listings/my-listings-page.tsx:389:        if (outcome.key === "myListings.error.rateLimited") break;
src/features/my-listings/my-listing.ts:260:    rateLimited: "myListings.error.rateLimited",
src/features/admin-listings/move-reasons.test.ts:60:    expect(moveErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
== rg -n -F 'reviewGone' src e2e scripts (3)
src/features/admin-listings/listing-photos.test.tsx:222:    door.allow.mockRejectedValueOnce({ message: "reviewGone" });
src/features/admin-screening/use-photo-reviews.test.ts:42:    expect(photoAllowErrorKey("reviewGone")).toBe("admin.listings.photos.allowGone");
src/features/admin-screening/use-photo-reviews.ts:93:  if (message.includes("reviewGone")) return "admin.listings.photos.allowGone";
== rg -n -F 'changeGone' src e2e scripts (3)
src/features/admin-screening/use-photo-changes.ts:97:  return message.includes("changeGone") ? "admin.screening.changes.gone" : "common.error";
src/features/admin-screening/photo-changes.test.tsx:119:    reads.review.mockRejectedValueOnce({ message: "changeGone" });
src/features/admin-screening/use-photo-changes.test.ts:36:    expect(photoChangeErrorKey("changeGone")).toBe("admin.screening.changes.gone");
== rg -n -F 'your own listing' src e2e scripts (8)
e2e/admin-listings.spec.ts:377:      "your own listing is edited the seller's way",
src/features/admin-listings/edit-listing.test.ts:148:    expect(editErrorKey("your own listing is edited the seller's way")).toBe(
src/features/admin-screening/use-photo-reviews.test.ts:43:    expect(photoAllowErrorKey("your own listing is changed the seller's way")).toBe(
src/features/admin-screening/use-photo-reviews.ts:94:  if (message.includes("your own listing")) return "admin.listings.move.error.own";
src/features/admin-listings/tier-reasons.test.ts:100:    expect(tierErrorKey("your own listing is changed the seller's way")).toBe(
src/features/admin-listings/move-reasons.test.ts:51:    expect(moveErrorKey("your own listing is changed the seller's way")).toBe(
src/features/admin-listings/move-reasons.ts:58:  if (message.startsWith("your own listing")) return "admin.listings.move.error.own";
src/features/admin-listings/tier-reasons.ts:90:  if (message.startsWith("your own listing")) return "admin.listings.move.error.own";
== rg -n -F 'unknown move' src e2e scripts (0)

== rg -n -F 'illegal move' src e2e scripts (4)
e2e/admin-listings.spec.ts:574:    expect((await move("removed", "rules")).error).toBe("illegal move: removed -> removed");
e2e/admin-listings.spec.ts:662:    expect((await sendBack(sold.id)).error).toBe("illegal move: sold -> screening");
src/features/admin-listings/move-reasons.test.ts:54:    expect(moveErrorKey("illegal move: removed -> removed")).toBe(
src/features/admin-listings/move-reasons.ts:59:  if (message.startsWith("illegal move")) return "admin.listings.move.error.illegal";
== rg -n -F 'unknown reason' src e2e scripts (9)
e2e/admin-listings.spec.ts:567:    expect((await move("removed", "removed_in_error")).error).toBe("unknown reason");
e2e/admin-listings.spec.ts:1749:    expect(asReason.error).toBe("unknown reason");
src/features/posting/refusal-text.ts:148: * (`src/lib/refusal.ts`): an unknown reason reads as the family's own generic.
src/features/posting/refusal-text.test.ts:6:  it("PRT-1 publish's slots refusal (noFreeSlot, with its count) has its own words; an unknown reason the fallback", () => {
src/features/admin-listings/tier-reasons.test.ts:108:    expect(tierErrorKey("unknown reason")).toBe("admin.listings.move.pickReason");
src/features/admin-listings/edit-listing.ts:261:  if (message === "unknown reason") return "admin.listings.move.pickReason";
src/features/admin-listings/tier-reasons.ts:95:  if (message === "unknown reason") return "admin.listings.move.pickReason";
src/features/admin-listings/history.test.ts:196:  it("INC-799 an unknown reason reads its code, never undefined", () => {
src/features/ad-page/contact.test.ts:87:  it("still refuses an unknown reason as failed", async () => {
== rg -n -F 'a note is required' src e2e scripts (4)
e2e/admin-listings.spec.ts:384:    expect((await edit(target.id, { title: "Other" }, "other")).error).toBe("a note is required");
src/features/admin-listings/tier-reasons.test.ts:111:    expect(tierErrorKey("a note is required")).toBe("admin.listings.move.noteRequired");
src/features/admin-listings/move-reasons.ts:64:  if (message === "a note is required") return "admin.listings.move.noteRequired";
src/features/admin-listings/tier-reasons.ts:98:  if (message === "a note is required") return "admin.listings.move.noteRequired";
== rg -n -F 'the note is too long' src e2e scripts (4)
src/features/admin-listings/tier-reasons.test.ts:112:    expect(tierErrorKey("the note is too long")).toBe("admin.listings.move.noteTooLong");
src/features/admin-listings/undo-edit.test.ts:48:    expect(undoErrorKey("the note is too long")).toBe("admin.listings.move.noteTooLong");
src/features/admin-listings/move-reasons.ts:65:  if (message === "the note is too long") return "admin.listings.move.noteTooLong";
src/features/admin-listings/tier-reasons.ts:99:  if (message === "the note is too long") return "admin.listings.move.noteTooLong";
== rg -n -F 'a listing removed for a severe reason' src e2e scripts (3)
e2e/admin-listings.spec.ts:633:      "a listing removed for a severe reason is restored by a super admin only",
src/features/admin-listings/move-reasons.test.ts:58:      moveErrorKey("a listing removed for a severe reason is restored by a super admin only"),
src/features/admin-listings/move-reasons.ts:60:  if (message.startsWith("a listing removed for a severe reason"))
== rg -n -F 'nothing to change' src e2e scripts (2)
src/routes/settings.tsx:804:          {/* P1-g: with no password there is nothing to change. The recovery flow
src/features/admin-listings/edit-listing.ts:257:  if (message === "nothing changed" || message === "nothing to change") {
== rg -n -F 'not editable' src e2e scripts (20)
scripts/migration-real-row-allowlist.txt:9:20261028223430_631c8680-d4a9-4b2f-bab9-8c83d604a445.sql | SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id =…
scripts/migration-real-row-allowlist.txt:10:20261028224333_4ce633e9-2d61-433c-a543-6f7dc00cb769.sql | UPDATE public.user_directory SET home_country_code = v_home WHERE user_id = v_…
scripts/migration-real-row-allowlist.txt:11:20261028224333_4ce633e9-2d61-433c-a543-6f7dc00cb769.sql | -- (b) step 2, fixed with an amount and no home market: price_currency/require…
scripts/migration-real-row-allowlist.txt:12:20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | the proof uses it. SELECT a.id INTO v_anc FROM public.locations a WHERE a.coun…
scripts/migration-real-row-allowlist.txt:13:20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a WHERE a.country_c…
scripts/migration-real-row-allowlist.txt:14:20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | UPDATE public.locations SET is_active = true WHERE id = v_anc | the rows are t…
scripts/migration-real-row-allowlist.txt:15:20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | -- R2 is switched off after its city is placed (the ancestry guard refuses an …
scripts/migration-real-row-allowlist.txt:16:20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code A…
scripts/migration-real-row-allowlist.txt:17:20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | UPDATE public.locations SET is_active = true WHERE id = v_anc | the rows are t…
scripts/migration-real-row-allowlist.txt:18:20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | UPDATE public.locations SET is_active = false WHERE id = v_r2 | the rows are t…
scripts/migration-real-row-allowlist.txt:19:20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql | IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_target) THEN RA…
scripts/migration-real-row-allowlist.txt:33:20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | INSERT INTO public.name_checks(profile_id, subject, checked_text, state, since…
scripts/migration-real-row-allowlist.txt:34:20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | nothing changes (idempotent). INSERT INTO public.name_checks(profile_id, subje…
scripts/migration-real-row-allowlist.txt:35:20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.seller_alias IS NOT NULL AN…
scripts/migration-real-row-allowlist.txt:39:20261029085507_709fb25b-c8da-47f0-b50f-c1e6a5ab9b80.sql | IF (SELECT seller_alias FROM public.profiles WHERE user_id = v_u) IS DISTINCT …
scripts/migration-real-row-allowlist.txt:40:20261029085507_709fb25b-c8da-47f0-b50f-c1e6a5ab9b80.sql | IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u) OR EXISTS (SELECT 1 FROM p…
scripts/migration-real-row-allowlist.txt:49:20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql | ', ' -- P-2 (a) M-1b (D305) — the free baseline: an ad at the baseline level p…
e2e/helpers/ui.ts:170:  await expect(input, `${fieldName} field is not editable`).toBeEditable();
e2e/admin-listings.spec.ts:359:  test("AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note", async ({
e2e/admin-listings.spec.ts:383:    expect((await edit(target.id, { seller_id: user.id })).error).toBe("not editable: seller_id");
== rg -n -F 'listing not found' src e2e scripts (29)
e2e/photo-pipeline.spec.ts:103:    // save already sent to land as "listing not found").
e2e/helpers/posting.ts:2419: * "listing not found". So the page first waits for its network to go quiet (a
e2e/admin-listings.spec.ts:379:    expect((await edit(draft.id, { title: "A draft" })).error).toBe("listing not found");
e2e/admin-listings.spec.ts:1067:      "listing not found",
e2e/admin-screening.spec.ts:468:    expect(facts.error).toBe("listing not found");
e2e/admin-screening.spec.ts:473:    expect(shown.error).toBe("listing not found");
scripts/e2e-failure-report.ts:1175: * the census self-test shows it: its "listing not found" lines were followed by
scripts/e2e-failure-report.ts:2920:      const notFound = rows.find((row) => row.message === "listing not found");
scripts/e2e-failure-report.ts:2927:        ["listing not found ×2 is loud", notFound?.count === 2 && !notFound.quiet],
scripts/e2e-failure-report.ts:2928:        // INC-398 — on this capture both "listing not found" lines were followed by
scripts/e2e-failure-report.ts:2968:          green.includes("### listing not found") &&
scripts/e2e-failure-report.ts:2969:            green.includes("[ssr-error] /api/listings/draft listing not found"),
scripts/fixtures/e2e-ssr-census/job.log.txt:416:[WebServer] [0m[31m[ssr-error] /api/listings/draft listing not found[0m
scripts/fixtures/e2e-ssr-census/job.log.txt:449:[WebServer] [0m[31m[ssr-error] /api/listings/draft listing not found[0m
src/server/supabase/upstream.test.ts:109:      json({ code: "P0001", details: null, hint: null, message: "listing not found" }, 400),
src/server/supabase/upstream.test.ts:129:    logRouteError("/api/x", "listing not found");
src/server/supabase/upstream.test.ts:132:      ["[ssr-error]", "/api/x", "listing not found"],
src/server/supabase/upstream.test.ts:175:      json({ code: "P0001", details: null, hint: null, message: "listing not found" }, 400);
src/lib/error-text.test.ts:15:    expect(errorText("listing not found")).toBe("listing not found");
src/lib/door-error.test.ts:13:    expect(doorErrorDetail("listing not found")).toBeUndefined();
src/features/admin-listings/edit-listing.test.ts:151:    expect(editErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/tier-reasons.test.ts:99:    expect(tierErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/undo-edit.test.ts:47:    expect(undoErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/move-reasons.ts:57:  if (message === "listing not found") return "admin.listings.move.error.notFound";
src/features/admin-listings/move-reasons.test.ts:50:    expect(moveErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/listing-page.tsx:214:    const missing = query.error != null && errorText(query.error) === "listing not found";
src/features/admin-listings/photo-remove.test.ts:22:    expect(photoRemoveErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
src/features/admin-listings/tier-reasons.ts:89:  if (message === "listing not found") return "admin.listings.move.error.notFound";
src/features/admin-listings/use-admin-listing.ts:12: * a draft answers "listing not found"). The door decides what this person may
== rg -n -F 'a removed listing is not edited' src e2e scripts (6)
e2e/admin-listings.spec.ts:381:      "a removed listing is not edited",
e2e/admin-listings.spec.ts:1188:    // Turn L4a — a removed listing is not edited (the door's rule): no Edit.
src/features/admin-listings/edit-listing.test.ts:145:    expect(editErrorKey("a removed listing is not edited")).toBe(
src/features/admin-listings/undo-edit.test.ts:43:    expect(undoErrorKey("a removed listing is not edited")).toBe(
src/features/admin-listings/edit-listing.ts:260:  if (message === "a removed listing is not edited") return "admin.listings.edit.error.removed";
src/features/admin-listings/photo-remove.test.ts:19:    expect(photoRemoveErrorKey("a removed listing is not edited")).toBe(
== rg -n -F 'the category of a posted listing' src e2e scripts (1)
e2e/admin-listings.spec.ts:1986:    ).toMatchObject({ error: "the category of a posted listing is not changed" });
== rg -n -F 'remove_photos must be a list' src e2e scripts (0)

== rg -n -F 'photo not found on this listing' src e2e scripts (4)
e2e/admin-listings.spec.ts:551:    ).toMatchObject({ error: "photo not found on this listing" });
src/features/admin-listings/listing-photos.test.tsx:116:    door.edit.mockRejectedValueOnce({ message: "photo not found on this listing" });
src/features/admin-listings/photo-remove.test.ts:16:    expect(photoRemoveErrorKey("photo not found on this listing")).toBe(
src/features/admin-listings/photo-remove.ts:23:  if (message === "photo not found on this listing") return "admin.listings.photos.error.gone";
== rg -n -F 'nothing changed' src e2e scripts (19)
e2e/post-wizard-bundle2.spec.ts:1674:   * with nothing changed: no identity call at all.
e2e/post-wizard-bundle2.spec.ts:1676:  test("PW-144 leaving the contact step makes one identity call, or none when nothing changed", async ({
e2e/post-wizard-bundle2.spec.ts:1709:      expect(calls.length - mark, `PW-144: pass ${pass} with nothing changed called identity`).toBe(
e2e/post-wizard-bundle2.spec.ts:1769:    expect(calls.length - mark, "PW-185: nothing changed, yet identity was called").toBe(0);
e2e/admin-attributes-editor.spec.ts:946:      /* Nothing was chosen, so nothing changed. */
e2e/admin-attributes-editor.spec.ts:1243:      /* Nothing was chosen, so nothing changed. */
e2e/admin-attributes-editor.spec.ts:1511:      /* Nothing was chosen, so nothing changed (DB truth, J4). */
e2e/admin-listings.spec.ts:466:    expect(again.error).toBe("nothing changed");
e2e/admin-listings.spec.ts:1436:   * Review; a step with nothing changed writes no revision.
e2e/admin-listings.spec.ts:1438:  test("AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision", asyn…
e2e/admin-listings.spec.ts:1489:    // ad's title → nothing typed → Save → nothing changed → no revision, no notice.
src/features/admin-listings/edit-listing.test.ts:48:  it("LE-1 the form opens on the listing as it stands; nothing changed sends nothing", () => {
src/features/admin-listings/edit-listing.test.ts:144:    expect(editErrorKey("nothing changed")).toBe("admin.listings.edit.nothing");
src/features/admin-listings/tier-reasons.test.ts:106:    expect(tierErrorKey("nothing changed")).toBe("admin.listings.level.error.same");
src/features/admin-listings/edit-listing.ts:257:  if (message === "nothing changed" || message === "nothing to change") {
src/features/admin-listings/undo-edit.ts:13: * `admin_undo_listing_edit` decides (F3): it also checks that nothing changed
src/features/admin-listings/tier-reasons.ts:92:  if (message === "nothing changed") return "admin.listings.level.error.same";
src/features/posting/use-draft.ts:184:   * work is cleared ONLY if nothing changed while it was in the air; otherwise
src/features/posting/use-edit-draft.test.ts:278:    editAdminListing.mockRejectedValueOnce(new Error("nothing changed"));
== rg -n -F 'nothing to undo' src e2e scripts (8)
e2e/admin-listings.spec.ts:1728:   * nothing to undo; a line that is no longer the newest; a listing changed
e2e/admin-listings.spec.ts:1733:  test("AL-27 Undo refuses: nothing to undo, a stale line, a listing changed since, an undo, the seller's own line, today's rules", async ({
e2e/admin-listings.spec.ts:1743:    expect((await undo(live.id, new Date().toISOString())).error).toBe("nothing to undo");
e2e/admin-listings.spec.ts:1783:    expect((await undo(live.id, await newestRevisionAt(live.id))).error).toBe("nothing to undo");
e2e/admin-listings.spec.ts:1785:    // The seller's own line is the newest (a scratch revision of this listing): nothing to undo.
e2e/admin-listings.spec.ts:1797:    expect((await undo(live.id, await newestRevisionAt(live.id))).error).toBe("nothing to undo");
src/features/admin-listings/undo-edit.test.ts:42:    expect(undoErrorKey("nothing to undo")).toBe("admin.listings.undo.changed");
src/features/admin-listings/undo-edit.ts:33:  if (message === "the listing has changed since this edit" || message === "nothing to undo") {
== rg -n -F 'the listing has changed since this edit' src e2e scripts (4)
e2e/admin-listings.spec.ts:1764:      "the listing has changed since this edit",
e2e/admin-listings.spec.ts:1774:    expect((await undo(live.id, at)).error).toBe("the listing has changed since this edit");
src/features/admin-listings/undo-edit.test.ts:39:    expect(undoErrorKey("the listing has changed since this edit")).toBe(
src/features/admin-listings/undo-edit.ts:33:  if (message === "the listing has changed since this edit" || message === "nothing to undo") {
== rg -n -F 'a photo removal is not undone' src e2e scripts (1)
src/features/admin-listings/undo-edit.test.ts:49:    expect(undoErrorKey("a photo removal is not undone")).toBe("common.error");
== rg -n -F 'unknown channel' src e2e scripts (1)
e2e/admin-screening.spec.ts:460:    expect(handle.error).toBe("unknown channel");
== rg -n -F 'notShown' src e2e scripts (5)
e2e/admin-screening.spec.ts:455:    expect(hidden.data).toEqual({ ok: false, reason: "notShown" });
src/features/admin-screening/use-screening.ts:341:  | { ok: false; reason: "notShown" | "rateLimited" };
src/features/admin-screening/use-screening.ts:344:export function revealProblemKey(reason: "notShown" | "rateLimited") {
src/features/admin-screening/use-screening.ts:363:  if (payload["reason"] === "notShown" || payload["reason"] === "rateLimited") {
src/features/admin-screening/use-screening.test.ts:167:    expect(revealProblemKey("notShown")).toBe("admin.screening.revealNotShown");
== rg -n -F 'renew days are 1 to 365' src e2e scripts (3)
e2e/my-listings-doors.spec.ts:748:        "renew days are 1 to 365",
src/features/admin-listings/listing-policy.ts:37:  if (message.includes("renew days are 1 to 365")) return "admin.listings.settings.daysHelp";
src/features/admin-listings/listing-policy.test.ts:46:    expect(settingsErrorKey("renew days are 1 to 365")).toBe("admin.listings.settings.daysHelp");
== rg -n -F 'unknown tier' src e2e scripts (4)
scripts/conformance/proof-readers.ts:15: * "unknown tier" for a level the proof had just inserted). The law
src/features/admin-listings/tier-reasons.test.ts:107:    expect(tierErrorKey("unknown tier")).toBe("admin.listings.level.error.unknown");
src/features/admin-listings/tier-reasons.ts:93:  if (message === "unknown tier") return "admin.listings.level.error.unknown";
src/features/posting/preview/listing-detail-tier.test.tsx:124:  it("LD-25 a free ad and an ad of unknown tier draw the free look: white boxes, green accents, no tier mark", () => {
== rg -n -F 'a removed listing takes no tier' src e2e scripts (4)
e2e/admin-listings.spec.ts:2297:    expect(refused.error).toBe("a removed listing takes no tier");
src/features/admin-listings/change-listing-tier.test.ts:67:      error: { message: "a removed listing takes no tier" },
src/features/admin-listings/tier-reasons.test.ts:103:    expect(tierErrorKey("a removed listing takes no tier")).toBe(
src/features/admin-listings/tier-reasons.ts:91:  if (message === "a removed listing takes no tier") return "admin.listings.level.error.removed";
== rg -n -F 'badDays' src e2e scripts (20)
e2e/my-listings-levels.spec.ts:459:  test("LDR-4 staff set a level for some days and open-ended; days on the baseline are refused badDays", async ({
e2e/my-listings-levels.spec.ts:506:    expect(String(refused.error)).toContain("badDays");
src/features/admin-listings/tier-reasons.test.ts:153:    expect(raised).toContain("badDays");
src/features/admin-listings/change-listing-tier.test.ts:110:  it("CLT-5 the dialog's Days reach the door as p_days; the door's badDays reads as the days rule (P-2 (b))", async () =…
src/features/admin-listings/change-listing-tier.test.ts:129:    rpc.mockResolvedValueOnce({ data: null, error: { message: "badDays" } });
src/features/admin-listings/tier-reasons.ts:53:/** P-2 (b) — the door's bound on a level's days (`admin_set_listing_tier`, badDays). */
src/features/admin-listings/tier-reasons.ts:100:  if (message === "badDays") return "admin.listings.level.error.days";
src/features/admin-monetisation/product-editor.tsx:99:    "admin.packages.error.badDays": ["days"],
src/features/admin-monetisation/monetisation-forms.test.ts:119:    expect(refusal({ ...GOOD_LEVEL, days: "" })).toBe("admin.packages.error.badDays");
src/features/admin-monetisation/monetisation-forms.test.ts:120:    expect(refusal({ ...GOOD_LEVEL, days: "0" })).toBe("admin.packages.error.badDays");
src/features/admin-monetisation/monetisation-forms.test.ts:228:    expect(refusal({ ...GOOD_OVERRIDE, days: "0" })).toBe("admin.packages.error.badDays");
src/features/admin-monetisation/monetisation-forms.ts:120:  if (days === null) return { ok: false, key: "admin.packages.error.badDays" };
src/features/admin-monetisation/monetisation-forms.ts:215:    if (days === null) return { ok: false, key: "admin.packages.error.badDays" };
src/features/admin-monetisation/monetisation-refusals.ts:15:  "admin.packages.error.badDays",
src/features/admin-monetisation/monetisation-field-gates.test.tsx:95:  it.each(["", "0", "1.5", "x"])("days %j is badDays", (days) => {
src/features/admin-monetisation/monetisation-field-gates.test.tsx:98:      key: "admin.packages.error.badDays",
src/features/admin-monetisation/monetisation-field-gates.test.tsx:141:  it("days 0 is badDays; photos 31 is badPhotos; days 45 passes", () => {
src/features/admin-monetisation/monetisation-field-gates.test.tsx:143:      key: "admin.packages.error.badDays",
src/features/admin-monetisation/override-dialog.tsx:80:    "admin.packages.error.badDays": badCell(form.days, 1) ? ["days"] : [],
src/features/admin-monetisation/monetisation-service.ts:262:  "bad days": "admin.packages.error.badDays",
== rg -n -F 'badValue:name' src e2e scripts (0)

== rg -n -F 'badValue:reason' src e2e scripts (0)

== rg -n -F '"stale"' src e2e scripts (8)
e2e/ad-page-doors.spec.ts:261:      p_rate_key: rateKey("stale"),
src/features/feed/use-feed.test.ts:95:          page: served(["stale"]),
src/features/admin-screening/use-name-checks.ts:134:export type ClearAnswer = "done" | "stale";
src/features/admin-screening/use-name-checks.ts:149:  if (answer?.ok === false && answer.reason === "stale") return "stale";
src/features/admin-screening/name-checks.tsx:102:    let answer: "done" | "stale";
src/server/jobs/signature.ts:23:export type JobRefusal = "secret_missing" | "bad_signature" | "stale";
src/server/jobs/signature.ts:42:    return { ok: false, reason: "stale" };
src/server/imports/route.test.ts:288:      digest: "stale",
== rg -n -F 'unknown view' src e2e scripts (1)
e2e/admin-listings.spec.ts:287:    expect((await list(page, { p_view: "bogus" })).error).toBe("unknown view");
== rg -n -F 'badSize' src e2e scripts (10)
src/routes/api/feed.test.ts:167:  it("FDR-1 invalid sizes answer badSize with no-store before rpc", async () => {
src/routes/api/feed.test.ts:172:      expect(await response.json()).toEqual({ error: "badSize" });
src/routes/api/feed.test.ts:203:    expect(await response.json()).toEqual({ error: "badSize" });
src/routes/api/feed.ts:46:  | "badSize"
src/routes/api/feed.ts:58:  "feed_page: badSize": "badSize",
src/routes/api/feed.ts:159:            ? "badSize"
src/routes/api/seller.ts:34:type ClientCode = "badKey" | "badCursor" | "badSize" | "unknownSeller";
src/routes/api/seller.ts:39:  "seller_feed_page: badSize": "badSize",
e2e/ad-page-doors.spec.ts:678:      expect(answer.error).toContain("badSize");
e2e/ad-page-doors.spec.ts:984:      ).toContain("badSize");
== rg -n -F 'step-up required' src e2e scripts (34)
src/routes/api/translate.ts:75:  if (message.startsWith("step-up required")) return "stepUp";
e2e/admin-screening.spec.ts:311:    expect(deniedReviewer).toMatch(/no verified factor|step-up required/i);
e2e/my-listings-doors.spec.ts:735:    expect((await set(enforcer, true, 30)).error).toBe("step-up required: no verified factor");
e2e/admin-listings.spec.ts:356:    await refusedEdit(holder, "step-up required: no verified factor");
e2e/admin-listings.spec.ts:631:    expect((await restoreAs(plainRemoved.id)).error).toBe("step-up required: no verified factor");
e2e/admin-listings.spec.ts:2360:    expect(asked.error ?? "").toMatch(/^step-up required/);
e2e/admin-roles.spec.ts:321:      ).toMatch(/no verified factor|step-up required/i);
e2e/mfa-stepup.spec.ts:206:    expect(staffError ?? "").toMatch(/step-up required/i);
src/routes/api/translate.route.test.ts:321:      ["step-up required", "stepUp"],
src/routes/api/translate.route.test.ts:322:      ["step-up required: no verified factor", "stepUp"],
src/routes/api/translate.route.test.ts:323:      ["step-up required: verification expired", "stepUp"],
src/features/admin-monetisation/monetisation-service.test.ts:351:    door.rpc = rpcError("step-up required", "P0009");
src/features/admin-monetisation/monetisation-service.test.ts:354:      message: "step-up required",
src/server/answer.ts:140:  return routeJson({ error: "step-up required", code: "P0009" }, 428);
src/features/admin-monetisation/monetisation-service.ts:303:  if (code === "P0009" || /step-up required/i.test(raw)) {
src/server/answer.test.ts:143:    expect(await response.text()).toBe('{"error":"step-up required","code":"P0009"}');
src/features/admin-attributes/attribute-refusals.test.tsx:92:      "step-up required",
src/server/imports/route.ts:48: * `step-up required` or begins `step-up required:`. A fixed sentence answers ITSELF (a server
src/server/imports/route.ts:58:  { match: "step-up required", kind: "stepUp", status: 428 },
src/features/admin-listings/tier-reasons.test.ts:113:    expect(tierErrorKey("step-up required: listings:enforce")).toBe("common.error");
src/features/admin/users/admin-users-service.ts:258:    [/step-up required/i, "admin.users.edit.errorStepUp"],
src/features/admin/users/alias-reason.test.ts:48:    expect(profileEditRefusalKey({ code: "P0009", message: "step-up required" })).toBe(
src/features/admin/translations/translations-service.test.ts:223:    expect(translationRefusalKey({ code: "P0009", message: "step-up required" })).toBe(
src/features/admin/translations/translations-service.ts:455:    [/step-up required/i, "admin.translations.error.stepUp"],
src/features/admin/translations/translations-service.ts:1028:  if (status === 428) return new Error("step-up required");
src/features/admin/roles/roles-service.ts:167:  sentences: [[/step-up required/i, "admin.roles.error.stepUp"]],
src/features/admin/roles/roles-service.test.ts:42:      roleRefusalKey({ code: "P0009", message: "step-up required" }, "admin.roles.perm.failed"),
src/features/admin-categories/categories-page.tsx:391:   * `step-up required` (P0009), the shared defence-in-depth path in
src/features/admin-locations/location-refusals.test.tsx:124:    for (const message of ["step-up required", "step-up required: verification expired"]) {
src/features/admin-categories/category-refusals.test.tsx:56:      "step-up required",
src/features/admin-countries/country-refusals.test.tsx:71:    const stepUp = readRefusal({ message: "step-up required", code: "P0009" }, COUNTRY_REFUSALS);
src/features/admin-ai/ai-service.test.ts:159:    expect(aiErrorKey("step-up required: no verified factor").key).toBe("admin.ai.error.stepUp");
src/features/auth/mfa/mfa-service.ts:149:  return candidate.code === "P0009" || (candidate.message ?? "").includes("step-up required");
src/features/auth/mfa/use-step-up.ts:42: * 'step-up required' (SQLSTATE P0009), the same modal re-opens against the same
````

### Appendix C — the e2e ids that call a family function (e2e-ids.txt)

````text
## e2e/ad-page-doors.spec.ts:890 AP-28 — admin_listing_reports, admin_open_report_counts
  910: expect(reported.error).toBeNull();
  918: expect(rows.error).toBeNull();
  930: anonRows.error !== null || (Array.isArray(anonRows.data) && anonRows.data.length === 0),
  936: expect(insert.error).toContain("permission denied");
  937: expect((await x.rpc("admin_listing_reports", { p_listing_id: ad.id })).error).toContain(
  938: "permission denied",
  940: expect((await x.rpc("admin_open_report_counts", { p_listing_ids: [ad.id] })).error).toContain(
  941: "permission denied",
  954: expect(reports.error).toBeNull();
  976: expect(counts.error).toBeNull();
  983: ).error,
  984: ).toContain("badSize");
  990: expect(truth.error).toBeNull();
  1000: expect(reports.error).toBeNull();
  1002: expect(meters.error).toBeNull();
## e2e/admin-listings.spec.ts:215 AL-1 — admin_list_listings
  227: expect(byId.error).toBeNull();
## e2e/admin-listings.spec.ts:253 AL-2 — admin_edit_listing
  271: expect(result.error).toBeNull();
  287: expect((await list(page, { p_view: "bogus" })).error).toBe("unknown view");
  295: * AL-3 keeps the people who may not edit; AL-12 the super admin's refusals.
  322: expect(answer.error).toBe(expected);
## e2e/admin-listings.spec.ts:329 AL-3 — admin_list_listings, admin_listing_detail
  330: await refusedEdit(await leaseUser(), "permission denied", async (person, listingId) => {
  331: expect((await person.rpc("admin_list_listings", { p_search: listingId })).error).toBe(
  332: "permission denied",
  334: expect((await person.rpc("admin_listing_detail", { p_listing_id: listingId })).error).toBe(
  335: "permission denied",
## e2e/admin-listings.spec.ts:359 AL-12 — admin_edit_listing
  376: expect((await edit(own.id, { title: "My own" })).error).toBe(
  379: expect((await edit(draft.id, { title: "A draft" })).error).toBe("listing not found");
  380: expect((await edit(removed.id, { title: "Removed" })).error).toBe(
  383: expect((await edit(target.id, { seller_id: user.id })).error).toBe("not editable: seller_id");
  384: expect((await edit(target.id, { title: "Other" }, "other")).error).toBe("a note is required");
## e2e/admin-listings.spec.ts:394 AL-4 — admin_edit_listing
  407: expect(result.error).toBeNull();
  425: if (revisionCountry.error)
  426: throw new Error(`[e2e:al-4] revision country read failed: ${revisionCountry.error.message}`);
  432: if (sellerDirectory.error)
  433: throw new Error(`[e2e:al-4] directory read failed: ${sellerDirectory.error.message}`);
  457: if (noticeCountry.error)
  458: throw new Error(`[e2e:al-4] notice country read failed: ${noticeCountry.error.message}`);
  466: expect(again.error).toBe("nothing changed");
## e2e/admin-listings.spec.ts:470 AL-5 — admin_edit_listing
  470: test("AL-5 Edit keeps the seller's rules: a refusal is the seller's refusal, and nothing is written", async ({
  481: expect(asSeller.error).toBeNull();
  482: const sellerRefusals = (asSeller.data as { ok: boolean; refusals: Row[] }).refusals;
  491: expect(asAdmin.error).toBeNull();
  492: expect(asAdmin.data).toEqual({ ok: false, refusals: sellerRefusals });
## e2e/admin-listings.spec.ts:498 AL-6 — admin_edit_listing
  512: throw new Error(`[e2e:al] seeding photos failed: ${error?.message ?? "no rows"}`);
  522: if (covered.error) throw new Error(`[e2e:al] cover failed: ${covered.error.message}`);
  530: expect(result.error).toBeNull();
## e2e/admin-listings.spec.ts:554 AL-7 — admin_move_listing
  567: expect((await move("removed", "removed_in_error")).error).toBe("unknown reason");
  574: expect((await move("removed", "rules")).error).toBe("illegal move: removed -> removed");
## e2e/admin-listings.spec.ts:599 AL-8 — admin_move_listing, transition_listing
  619: ).error,
  631: expect((await restoreAs(plainRemoved.id)).error).toBe("step-up required: no verified factor");
  632: expect((await restoreAs(severe.id)).error).toBe(
## e2e/admin-listings.spec.ts:643 AL-9 — admin_move_listing
  662: expect((await sendBack(sold.id)).error).toBe("illegal move: sold -> screening");
  680: expect(forged.error).not.toBeNull();
## e2e/admin-listings.spec.ts:1037 AL-16 — admin_listing_detail, admin_move_listing
  1060: if (revision.error) throw new Error(`[e2e:al] revision seed failed: ${revision.error.message}`);
  1066: expect((await viewer.rpc("admin_listing_detail", { p_listing_id: draft.id })).error).toBe(
  1070: expect(seen.error).toBeNull();
  1105: expect(text, `AL-16 the door showed ${hidden}`).not.toContain(hidden);
  1114: expect(removed.error).toBeNull();
## e2e/admin-listings.spec.ts:1268 AL-19 — admin_edit_listing
  1278: if (ends.error) throw new Error(`[e2e:al] end date failed: ${ends.error.message}`);
  1287: expect(first.error).toBeNull();
  1295: if (off.error) throw new Error(`[e2e:al] switching the place off failed: ${off.error.message}`);
  1301: expect(second.error).toBeNull();
  1310: expect(third.error).toBeNull();
  1311: expect((third.data as { ok: boolean; refusals: Row[] }).refusals).toContainEqual({
## e2e/admin-listings.spec.ts:1648 AL-26 — admin_edit_listing
  1660: expect(first.error).toBeNull();
  1666: expect(second.error).toBeNull();
  1686: await expect(page.getByTestId("listing-notice")).toHaveText(
  1714: if (error) throw new Error(`[e2e:al] listing read failed: ${error.message}`);
  1727: * Turn L4d (D141) — the undo door's refusals, called as the super admin:
  1730: * that break today's rules (a refusal, nothing written). "undo" is not a
## e2e/admin-listings.spec.ts:1733 AL-27 — admin_undo_listing_edit, admin_edit_listing
  1743: expect((await undo(live.id, new Date().toISOString())).error).toBe("nothing to undo");
  1749: expect(asReason.error).toBe("unknown reason");
  1761: ).error,
  1763: expect((await undo(live.id, "2000-01-01T00:00:00+00:00")).error).toBe(
  1772: if (changed.error) throw new Error(`[e2e:al] change failed: ${changed.error.message}`);
  1774: expect((await undo(live.id, at)).error).toBe("the listing has changed since this edit");
  1776: if (putBack.error) throw new Error(`[e2e:al] put back failed: ${putBack.error.message}`);
  1778: expect(undone.error).toBeNull();
  1783: expect((await undo(live.id, await newestRevisionAt(live.id))).error).toBe("nothing to undo");
  1796: if (own.error) throw new Error(`[e2e:al] revision seed failed: ${own.error.message}`);
  1797: expect((await undo(live.id, await newestRevisionAt(live.id))).error).toBe("nothing to undo");
  1803: // Before-values that break today's rules: a refusal under the title, nothing written.
  1809: if (phone.error) throw new Error(`[e2e:al] title seed failed: ${phone.error.message}`);
  1817: ).error,
  1820: expect(refused.error).toBeNull();
  1823: refusals: expect.arrayContaining([
  1893: await expect(dialog.getByTestId("listing-photo-remove-problem")).toHaveText(
  1908: await expect(page.getByTestId("listing-notice")).toHaveText(
## e2e/admin-listings.spec.ts:1949 AL-29 — admin_edit_listing
  1962: if (error) throw new Error(`[e2e:al] listing read failed: ${error.message}`);
## e2e/admin-listings.spec.ts:2266 ATR-2 — admin_set_listing_tier
  2279: await expect(page.getByTestId("listings-tier-problem")).toHaveText(
  2280: en["admin.listings.level.error.same"],
  2285: await expect(page.getByTestId("listings-tier-problem")).toHaveText(
  2291: // The door's own refusal for a removed ad, as the same signed-in super admin.
  2297: expect(refused.error).toBe("a removed listing takes no tier");
## e2e/admin-listings.spec.ts:2308 ATR-3 — admin_set_listing_tier
  2329: expect(denied.error).toBe("permission denied");
## e2e/admin-listings.spec.ts:2340 ATR-4 — admin_set_listing_tier
  2360: expect(asked.error ?? "").toMatch(/^step-up required/);
## e2e/admin-listings.spec.ts:2366 ATR-5 — transition_listing
  2382: expect(deleted.error).toBeNull();
  2393: expect(sale.error).toBeNull();
## e2e/admin-listings.spec.ts:2494 ATR-7 — admin_set_listing_tier
  2524: expect(denied.error).toBe("permission denied");
## e2e/admin-screening.spec.ts:278 SC-4 — transition_listing
  291: ).error;
## e2e/admin-screening.spec.ts:296 SC-16 — transition_listing
  310: ).error;
## e2e/admin-screening.spec.ts:357 SC-7 — admin_screening_facts
  379: expect(text, `SC-7: a contact value left the door (${secret})`).not.toContain(secret);
  381: if (profile?.display_name) expect(text).not.toContain(profile.display_name);
## e2e/admin-screening.spec.ts:389 SC-8 — admin_screening_facts, admin_reveal_listing_contact
  399: expect(facts.error).toBe("permission denied");
  404: expect(shown.error).toBe("permission denied");
## e2e/admin-screening.spec.ts:408 SC-17 — admin_screening_facts, admin_reveal_listing_contact
  419: expect(read.error, "SC-17: a reviewer reads the facts without a second factor").toBeNull();
  424: expect(revealed.error, "SC-17: the reveal asked for a second factor (D129)").toBeNull();
## e2e/admin-screening.spec.ts:431 SC-9 — admin_reveal_listing_contact
  440: expect(shown.error).toBeNull();
  454: expect(hidden.error).toBeNull();
  460: expect(handle.error).toBe("unknown channel");
## e2e/admin-screening.spec.ts:464 SC-10 — admin_screening_facts, admin_reveal_listing_contact
  468: expect(facts.error).toBe("listing not found");
  473: expect(shown.error).toBe("listing not found");
## e2e/admin-screening.spec.ts:849 SC-19 — transition_listing
  857: expect(moved.error).toBeNull();
  872: if (approved.error) throw new Error(`[e2e:sc] the control failed: ${approved.error.message}`);
## e2e/admin-screening.spec.ts:1116 SC-23 — admin_allow_listing_photo
  1136: if (error) throw new Error(`[e2e:sc] registering ${name} failed: ${error.message}`);
  1155: await expect(page.getByTestId("admin-screening-notice")).toHaveText(
  1172: if (error) throw new Error(`[e2e:sc] reading the reviews failed: ${error.message}`);
  1197: if (signedIn.error)
  1198: throw new Error(`[e2e:sc] signing in the seller failed: ${signedIn.error.message}`);
  1200: expect(allowed.error?.message).toBe("permission denied");
## e2e/feed-index.spec.ts:392 FE-12 — transition_listing
  401: expect(opened.error, JSON.stringify(opened.error)).toBeNull();
## e2e/legal-certify.spec.ts:997 LG-28 — transition_listing
  1033: expect(refused.error, `${call.fn}: ${JSON.stringify(refused)}`).toContain(
  1047: expect(close.error, JSON.stringify(close)).toBeNull();
  1054: expect(reopen.error, JSON.stringify(reopen)).toContain("acceptanceRequired");
  1063: expect(accepted.error, JSON.stringify(accepted)).toBeNull();
  1065: expect(changed.error, JSON.stringify(changed)).toBeNull();
## e2e/legal-certify.spec.ts:1123 LG-29 — transition_listing
  1167: expect(answer.error, JSON.stringify(answer)).toBeNull();
  1174: expect(removedPhoto.error, JSON.stringify(removedPhoto)).toBeNull();
  1184: if (accepted.error)
  1185: throw new Error(`[e2e:certify] takedown acceptance truth: ${accepted.error.message}`);
## e2e/my-listings-ad.spec.ts:273 MLA-1 — transition_listing
  281: expect(closed.error, "[e2e:mla] closing C").toBeNull();
  285: expect(list.error, "[e2e:mla] my_listings live").toBeNull();
  290: expect(x.error, "[e2e:mla] my_listing X").toBeNull();
  300: expect(c.error, "[e2e:mla] my_listing C").toBeNull();
  313: expect(refused.error).toBe("not your listing");
  318: expect(anonymous.error).not.toBeNull();
## e2e/my-listings-ad.spec.ts:658 MLA-8 — transition_listing
  665: expect(deleted.error, "[e2e:mla] owner delete with listings:enforce").toBeNull();
  672: expect(restore.error?.message ?? null).toBe("ownerDeleted");
## e2e/my-listings-doors.spec.ts:259 ML-1 — admin_list_listings
  264: expect((await reserve(me, ad.id, true)).error).toBeNull();
  265: expect((await close(me, ad.id)).error).toBeNull();
  275: expect((await reserve(me, ad.id, true)).error).toBe("notLive");
  276: expect((await reopen(me, ad.id, "reduced")).error).toBe("illegalTransition:closed-reduced");
  286: expect(answer.error, `admin_list_listings ${p_view}`).toBeNull();
  291: expect(listedIds(await view("all"))).toContain(ad.id);
  292: expect(listedIds(await view("live"))).not.toContain(ad.id);
  294: expect((await reopen(me, ad.id)).error).toBeNull();
  305: expect(listedIds(await view("live"))).toContain(ad.id);
  306: expect(listedIds(await view("ended"))).not.toContain(ad.id);
  316: expect((await close(me, open.id)).error).toBeNull();
  317: expect((await reopen(me, open.id)).error).toBeNull();
## e2e/my-listings-doors.spec.ts:321 ML-2 — transition_listing
  330: expect((await close(b, x.id)).error).toBe("notYourListing");
  331: expect((await reserve(b, x.id, true)).error).toBe("notYourListing");
  332: expect((await price(b, x.id, 90)).error).toBe("notYourListing");
  333: expect((await b.rpc("listing_history", { p_listing_id: x.id })).error).toBe("not your listing");
  334: expect((await b.rpc("listing_history", { p_listing_id: crypto.randomUUID() })).error).toBe(
  338: expect((await close(a, y.id)).error).toBe("illegalTransition:screening-closed");
  339: expect((await price(a, y.id, 90)).error).toBe("inReview");
  340: expect((await reserve(a, y.id, true)).error).toBe("notLive");
  342: expect((await close(a, x.id)).error).toBeNull();
  353: expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
  358: expect(service.error?.message ?? null).toBe("ownerOnly:closed-active");
## e2e/my-listings-doors.spec.ts:515 ML-6 — transition_listing
  522: expect(edited.error).toBeNull();
  529: expect(moved.error).toBeNull();
  537: expect((await close(me, f.id)).error).toBeNull();
  544: expect(fMoved.error).toBeNull();
  551: expect((await editTitle(me, g.id)).error).toBe("renewFirst");
## e2e/my-listings-doors.spec.ts:635 ML-9 — admin_edit_listing
  642: expect((await close(me, h.id)).error).toBeNull();
  643: expect((await reopen(me, h.id)).error).toBeNull();
  644: expect((await reserve(me, h.id, true)).error).toBeNull();
  645: expect((await price(me, h.id, 95)).error).toBeNull();
  655: expect(staffEdit.error).toBeNull();
  658: expect(answer.error).toBeNull();
  675: expect(entries[1]?.["fields"]).toContain("price_amount");
## e2e/my-listings-doors.spec.ts:692 ML-10 — admin_set_listing_policy
  700: expect(read.error).toBeNull();
  705: expect(hidden.error).not.toBeNull();
  711: expect(patched.error).not.toBeNull();
  716: expect(anonymous.error).not.toBeNull();
  721: expect((await set(me, true, 30)).error).toBe("permission denied");
  731: expect((await set(me, true, 30)).error).toBe("permission denied");
  735: expect((await set(enforcer, true, 30)).error).toBe("step-up required: no verified factor");
  747: expect(refused.error, `admin_set_listing_policy(${allowed}, ${n})`).toBe(
## e2e/my-listings-levels.spec.ts:459 LDR-4 — admin_set_listing_tier
  506: expect(String(refused.error)).toContain("badDays");
## e2e/my-listings-levels.spec.ts:510 LDR-5 — transition_listing
  534: expect(removed.error).toBeNull();
## e2e/posting-routes-dials.spec.ts:123 PR-28 — transition_listing
## e2e/posting-routes.spec.ts:1035 PR-23 — transition_listing
  1054: expect(opened.error, JSON.stringify(opened.error)).toBeNull();
  1067: expect(activated.error, JSON.stringify(activated.error)).toBeNull();
  1080: expect(passed.error).toBeNull();
  1086: expect(before.error, `PR-23: no sweep ledger: ${before.error?.message}`).toBeNull();
  1088: expect(swept.error, JSON.stringify(swept.error)).toBeNull();
  1094: expect(after.error, `PR-23: no sweep ledger: ${after.error?.message}`).toBeNull();
````

### Appendix D — the callers of each name outside SQL (callers.txt)

````text
== admin_allow_listing_photo (9)
docs/features/media-pipeline.md:277:- **The decisions.** Approving the ad in Screening shows only its `held` photos (and a photo held before this turn, which has no review row); a photo the screen jud…
docs/features/admin-screening.md:84:- **The section** "Photos to review" (`admin-photo-reviews`, src/features/admin-screening/photo-reviews.tsx), above "Photo changes on live ads", for listings:review…
scripts/acceptance-doors-allowlist.txt:10:admin_allow_listing_photo(uuid) | staff | Writes listing_photos, listing_photo_reviews, audit_log; rejects callers lacking listings:review before its mutation…
scripts/public-surface-allowlist.txt:70:admin_allow_listing_photo | authenticated | admin door, bundle 16 turn 4a (D178): listings:review with the second factor checked inside; never the caller's own …
scripts/doors/manifest.txt:18:admin_allow_listing_photo(uuid) | staff | authenticated | listings:review | row | staff_moderation | - | global | staff | - | census F1-1: no country argument or country-…
e2e/admin-screening.spec.ts:1199:    const allowed = await sellerClient.rpc("admin_allow_listing_photo", { p_photo_id: failed });
src/features/admin-listings/listing-photos.tsx:59: * then `admin_allow_listing_photo`, which shows the photo to buyers. A refusal is
src/features/admin-screening/use-photo-reviews.ts:18: * the seller must send again. The door `admin_allow_listing_photo` (listings:review
src/features/admin-screening/use-photo-reviews.ts:87:  const { error } = await supabase.rpc("admin_allow_listing_photo", { p_photo_id: photoId });
== admin_edit_listing (47)
docs/features/admin-listings.md:8:- **`admin_edit_listing(listing, changes, reason, note)`** — VOLATILE definer, `listings:enforce` with a fresh second factor. `changes` holds any of title, descriptio…
docs/features/admin-listings.md:43:- **DEC-173 / INC-552 (the migration):** `admin_edit_listing` judged through the contact step (7) with the listing's end date and places, so a listing whose seller s…
docs/features/admin-listings.md:65:- **The door** `admin_undo_listing_edit(listing, at, note)` (listings:enforce with a fresh second factor): the History line's moment must be the listing's newest rev…
docs/features/admin-listings.md:112:- **The door:** `admin_edit_listing(listing, { remove_photos: [id] }, reason, note)` through the second factor — one revision (Edited: Photos, with the reason and t…
docs/features/admin-listings.md:123:- The photos, with their marks (not checked by AI, may not fit the ad) and Remove, are in Edit (`listing-edit-panel`), above the form; the page outside Edit draws t…
docs/features/admin-listings.md:130:- **The category is fixed (D172).** Edit shows the ad's category in its Specifications box and no longer offers "Change category" (the tree, its filter and its Canc…
docs/features/admin-listings.md:140:- D172's server side: one migration redeclares `admin_edit_listing` (from 20261012042142) and the seller's `edit_listing` (from 20261006225254) whole, each with one…
docs/features/admin-listings.md:153:- **Edit** (`listing-edit`, listings:enforce, never one's own ad or a removed one) opens `/admin/listings/<id>/edit`: the posting wizard in edit mode, `actor: "admi…
docs/features/admin-screening.md:93:- **Edit** (`admin-screening-preview-edit`, for listings:enforce) sits in the preview's footer beside "Open the ad's page". It puts the reviewer's edit boxes in the…
scripts/acceptance-doors-allowlist.txt:24:admin_edit_listing(uuid,jsonb,text,text) | staff | Writes listings, listing_photos, listing_revisions, audit_log, seller_notices; rejects callers lacking list…
scripts/acceptance-doors-allowlist.txt:72:admin_undo_listing_edit(uuid,timestamp with time zone,text) | staff | Delegates listing restoration and revision writes to admin_edit_listing; rejects callers…
scripts/public-surface-allowlist.txt:55:admin_edit_listing | authenticated | Listings console L1 (D136): listings:enforce with a fresh second factor; the seller's content rules; never a draft, a remov…
scripts/public-surface-allowlist.txt:58:admin_undo_listing_edit | authenticated | Listings console L4d (D141): listings:enforce with a fresh second factor; only the listing's newest revision, an edit …
scripts/doors/manifest.txt:37:admin_edit_listing(uuid,jsonb,text,text) | staff | authenticated | listings:enforce | row | staff_moderation | - | row:listings.home_country_code | staff | - | -
e2e/my-listings-doors.spec.ts:649:    const staffEdit = await pageDoor(page, "admin_edit_listing", {
src/routes/admin.listings_.$listingId_.edit.tsx:29: * Every save goes through `admin_edit_listing` under the step-up gate, as the
e2e/admin-listings.spec.ts:38: * authority): admin_list_listings (listings:view; drafts never), admin_edit_listing
e2e/admin-listings.spec.ts:317:    const answer = await person.rpc("admin_edit_listing", {
e2e/admin-listings.spec.ts:367:      pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:401:    const result = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:461:    const again = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:486:    const asAdmin = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:525:    const result = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:546:      await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1282:    const first = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1296:    const second = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1305:    const third = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1655:    const first = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1661:    const second = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1744:    const asReason = await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1756:        await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1812:        await pageDoor(page, "admin_edit_listing", {
e2e/admin-listings.spec.ts:1945:   * retired) and staff's `admin_edit_listing` both refuse another leaf, and nothing is
e2e/admin-listings.spec.ts:1981:      await pageDoor(page, "admin_edit_listing", {
e2e/admin-screening.spec.ts:160:       * which `admin_edit_listing` checks before it removes a photo.
src/features/posting/edit-step-changes.test.ts:16: * filtered by the actor's door (edit_my_listing :51–56; admin_edit_listing :70–71).
src/features/posting/edit-step-changes.ts:8: * seller, `admin_edit_listing` for staff) — never the whole draft, because a
src/features/posting/edit-step-changes.ts:22:/** The door keys each actor may send (edit_my_listing :51–56; admin_edit_listing :70–71). */
src/features/posting/use-edit-draft.ts:38: *    (`edit_my_listing` / `admin_edit_listing`), the door deciding what applies at
src/features/admin-listings/edit-listing.ts:13: * The door `admin_edit_listing(listing, changes, reason, note)` (turn L1, as
src/features/admin-listings/listing-page.tsx:79: * seller (`ListingEditForm`, through `admin_edit_listing`). INC-553: every price
src/features/admin-listings/listing-page.tsx:88: * those who may edit (`ListingPhotos`, through `admin_edit_listing`'s
src/features/admin-listings/listing-page.tsx:102: * reason box above it, every save through `admin_edit_listing` under the
src/features/admin-listings/photo-remove.test.ts:9:    // The door's list (admin_edit_listing): EDIT_REASONS plus "photo".
src/features/admin-listings/photo-remove.ts:8: * The door is `admin_edit_listing(listing, { remove_photos: [id] }, reason, note)`
src/features/admin-listings/use-admin-listing.ts:184: * Turn L4a (D140) — an admin's edit through the one door `admin_edit_listing`
src/features/admin-listings/use-admin-listing.ts:232:  const { data, error } = await supabase.rpc("admin_edit_listing", {
== admin_move_listing (16)
docs/features/admin-listings.md:9:- **`admin_move_listing(listing, to, reason, note)`** — VOLATILE definer, `listings:enforce` with a fresh second factor. Remove (any status but draft and removed → re…
scripts/public-surface-allowlist.txt:56:admin_move_listing | authenticated | Listings console L1 (D137): Remove, Restore, Send back to review; listings:enforce with a fresh second factor; a severe rem…
scripts/acceptance-doors-allowlist.txt:33:admin_move_listing(uuid,text,text,text) | staff | Writes audit_log, seller_notices; rejects callers lacking listings:enforce before its mutations
scripts/doors/manifest.txt:86:admin_move_listing(uuid,text,text,text) | staff | authenticated | listings:enforce | row | staff_moderation | - | global | staff | - | census F1-1: no country argument or…
e2e/admin-listings.spec.ts:39: * and admin_move_listing (listings:enforce with a fresh second factor), the state
e2e/admin-listings.spec.ts:561:      pageDoor(page, "admin_move_listing", {
e2e/admin-listings.spec.ts:606:      pageDoor(page, "admin_move_listing", {
e2e/admin-listings.spec.ts:626:      enforcer.rpc("admin_move_listing", {
e2e/admin-listings.spec.ts:652:      pageDoor(page, "admin_move_listing", {
e2e/admin-listings.spec.ts:1109:    const removed = await pageDoor(page, "admin_move_listing", {
src/features/admin-listings/listings-page.tsx:82: * three moves go through `admin_move_listing` (listings:enforce with a fresh
src/features/admin-listings/move-reasons.test.ts:8: * reason lists are read from the migration that declares `admin_move_listing`
src/features/admin-listings/use-admin-listings.ts:126: * the door `admin_move_listing` (listings:enforce with a fresh second factor;
src/features/admin-listings/use-admin-listings.ts:136:  const { error } = await supabase.rpc("admin_move_listing", {
src/features/admin-listings/move-reasons.ts:7: * The door `admin_move_listing(listing, to, reason, note)` (turn L1) is the
src/features/my-listings/state-line.ts:13:/** The removal reasons a seller may be told (admin_move_listing's list for a removal). */
== admin_name_check_clear (8)
docs/features/hidden-seller-name.md:56:- **Allow this name** (`admin_name_check_clear`): profiles:update, then the second factor, then the row locked FOR UPDATE. The reason is optional (trimmed, at mo…
scripts/acceptance-doors-allowlist.txt:116:admin_name_check_clear(uuid,text,text,text) | staff | Writes name_checks and audit_log; rejects callers lacking profiles:update (then step-up) before its cap…
scripts/public-surface-allowlist.txt:148:admin_name_check_clear | authenticated | Foundations turn N1b-3 M2 (INC-977): staff clear a held seller name; profiles:update then step-up inside before the ca…
scripts/doors/manifest.txt:88:admin_name_check_clear(uuid,text,text,text) | staff | authenticated | profiles:update | row | staff_moderation | name_check.cleared | global | staff | - | census F1-1: no…
src/features/admin-screening/use-name-checks.ts:16: *   admin_name_check_clear  profiles:update → step-up → the row FOR UPDATE; a
src/features/admin-screening/use-name-checks.ts:140:  const { data, error } = await rpc("admin_name_check_clear", {
src/features/admin-screening/use-name-checks.ts:150:  throw new ReaderError({ class: "malformed", message: "admin_name_check_clear: out of shape" });
src/features/admin-screening/name-checks.tsx:50: * Allow ("Allow this name", admin_name_check_clear) asks for the second factor
== admin_reveal_listing_contact (13)
docs/features/admin-screening.md:30:- `admin_reveal_listing_contact(p_listing_id, p_channel)` — "Show number": a fresh second factor (`require_step_up_if_needed('listings','review')`), the dial `revie…
docs/features/admin-screening.md:42:- **Preview as buyer** now reads, besides the row and its photos: the questions and their options (`get_posting_schema`, the options route — as the posting form rea…
docs/features/admin-screening.md:52:- **"Show number" asks for no second factor (D129).** `admin_reveal_listing_contact` is redeclared without `require_step_up_if_needed` (turn A3's migration, proofs …
scripts/public-surface-allowlist.txt:52:admin_reveal_listing_contact | authenticated | bundle 11 A1 (D120, D128): "Show number" — listings:review, rate-gated review_reveal, phone, phone2 or whatsapp s…
scripts/acceptance-doors-allowlist.txt:41:admin_reveal_listing_contact(uuid,text) | staff | Writes audit_log; rejects callers lacking listings:review before its mutations
scripts/doors/manifest.txt:101:admin_reveal_listing_contact(uuid,text) | staff | authenticated | listings:review | none:D129 | review_reveal | manual | global | staff | - | none:D129 — the recorded op…
e2e/admin-screening.spec.ts:400:    const shown = await pageDoor(page, "admin_reveal_listing_contact", {
e2e/admin-screening.spec.ts:420:    const revealed = await pageDoor(page, "admin_reveal_listing_contact", {
e2e/admin-screening.spec.ts:436:    const shown = await pageDoor(page, "admin_reveal_listing_contact", {
e2e/admin-screening.spec.ts:450:    const hidden = await pageDoor(page, "admin_reveal_listing_contact", {
e2e/admin-screening.spec.ts:456:    const handle = await pageDoor(page, "admin_reveal_listing_contact", {
e2e/admin-screening.spec.ts:469:    const shown = await pageDoor(page, "admin_reveal_listing_contact", {
src/features/admin-screening/use-screening.ts:354:  const { data, error } = await supabase.rpc("admin_reveal_listing_contact", {
== admin_review_photo_change (6)
docs/features/admin-screening.md:75:- **Photo changes on live ads (B5).** Below the queue, for listings:review: every photo a seller added, edited or removed while the ad was live (`active` or `reduce…
scripts/acceptance-doors-allowlist.txt:42:admin_review_photo_change(uuid) | staff | Writes listing_photo_changes, audit_log; rejects callers lacking listings:review before its mutations
scripts/public-surface-allowlist.txt:68:admin_review_photo_change | authenticated | admin door, bundle 13 turn 10 (D154 B5): listings:review checked inside; marks one photo change reviewed and writes …
scripts/doors/manifest.txt:102:admin_review_photo_change(uuid) | staff | authenticated | listings:review | row | staff_moderation | - | global | staff | - | census F1-1: no country argument or country…
src/features/admin-screening/use-photo-changes.ts:15: * (`admin_review_photo_change`, which re-checks listings:review and audits).
src/features/admin-screening/use-photo-changes.ts:91:  const { error } = await supabase.rpc("admin_review_photo_change", { p_change_id: changeId });
== admin_set_listing_policy (12)
docs/features/admin-listings.md:147:- **Settings** in All listings' header (`listings-settings`, listings:enforce; `ListingSettings`): the dialog `listings-settings-dialog` reads `listing_policy` and …
scripts/public-surface-allowlist.txt:76:admin_set_listing_policy | authenticated | Bundle 16 turn 1 (D174 3): listings:enforce with a fresh second factor; days 1 to 365; audited listing.policy_set
docs/features/my-listings.md:26:`listing_policy` (one row): `renew_allowed` (on) and `renew_days` (30). Signed-in users read the two values; `admin_set_listing_policy(renew_allowed, renew_days)` write…
docs/features/my-listings.md:148:- **The renew settings** (D174 3, D175 2): Admin › Listings › All listings has **Settings** in its header (`listings-settings`, listings:enforce): whether sellers may …
scripts/acceptance-doors-allowlist.txt:61:admin_set_listing_policy(boolean,integer) | staff | Writes listing_policy, audit_log; rejects callers lacking listings:enforce before its mutations
scripts/doors/manifest.txt:126:admin_set_listing_policy(boolean,integer) | staff | authenticated | listings:enforce | row | staff_config | manual | global | staff | - | census F1-1: no country argumen…
e2e/my-listings-doors.spec.ts:720:      person.rpc("admin_set_listing_policy", { p_renew_allowed: allowed, p_renew_days: n });
e2e/my-listings-doors.spec.ts:743:      const refused = await pageDoor(page, "admin_set_listing_policy", {
e2e/my-listings-doors.spec.ts:747:      expect(refused.error, `admin_set_listing_policy(${allowed}, ${n})`).toBe(
src/features/admin-listings/listing-settings.tsx:30: * user; written only through `admin_set_listing_policy` — listings:enforce with a
src/features/admin-listings/listing-settings.tsx:96:        const { error } = await supabase.rpc("admin_set_listing_policy", {
src/features/admin-listings/listing-settings.test.tsx:55:    expect(calls.write).toHaveBeenCalledWith("admin_set_listing_policy", {
== admin_set_listing_tier (29)
scripts/conformance/listing-designation.test.ts:20: * are written only by the level and reach doors, admin_set_listing_tier,
docs/features/admin-listings.md:160:- **The door `admin_set_listing_tier(listing, tier, reason, note)`** (M1, `20261102045918_cf2b45c5`) — VOLATILE definer, the staff listing doors' shape (INC-951 3b)…
docs/features/admin-listings.md:168:- **Days** in the Set tier dialog (`listings-tier-days-field`, the input `listings-tier-days`: numeric, at most four characters; `admin.listings.level.days` with it…
docs/features/listings.md:111:Staff set the tier through `admin_set_listing_tier` (M1) — see
scripts/acceptance-doors-allowlist.txt:62:admin_set_listing_tier(uuid,text,text,text,integer) | staff | Writes listings (tier, tier_until, tier_source and the clock a level with extends_lifetime pushe…
scripts/public-surface-allowlist.txt:162:admin_set_listing_tier | authenticated | Turn T1 (D242, D276), a new argument list in P-2 M-1b (days): staff set an ad's level (any enabled level row) for a nu…
docs/features/plans.md:92:`edit_my_listing`'s write into screening meets it; `admin_set_listing_tier`
scripts/doors/manifest.txt:127:admin_set_listing_tier(uuid,text,text,text,integer) | staff | authenticated | listings:enforce | row | staff_moderation | manual | global | staff | - | census F1-1: no c…
scripts/conformance/listing-designation.ts:13: * (`set_listing_level`, `set_listing_reach`), staff's `admin_set_listing_tier`,
scripts/conformance/listing-designation.ts:37:  "admin_set_listing_tier",
e2e/my-listings-levels.spec.ts:41: * staff door admin_set_listing_tier with days and open-ended, the removal that
e2e/my-listings-levels.spec.ts:470:      await pageDoor(page, "admin_set_listing_tier", {
e2e/my-listings-levels.spec.ts:476:      "admin_set_listing_tier",
e2e/my-listings-levels.spec.ts:485:      await pageDoor(page, "admin_set_listing_tier", {
e2e/my-listings-levels.spec.ts:490:      "admin_set_listing_tier",
e2e/my-listings-levels.spec.ts:499:    const refused = await pageDoor(page, "admin_set_listing_tier", {
e2e/admin-listings.spec.ts:2152:  // The one door `admin_set_listing_tier` (M1: listings:enforce with a fresh second factor; a tier
e2e/admin-listings.spec.ts:2292:    const refused = await pageDoor(page, "admin_set_listing_tier", {
e2e/admin-listings.spec.ts:2324:    const denied = await pageDoor(page, "admin_set_listing_tier", {
e2e/admin-listings.spec.ts:2355:    const asked = await pageDoor(page, "admin_set_listing_tier", {
e2e/admin-listings.spec.ts:2519:    const denied = await pageDoor(page, "admin_set_listing_tier", {
src/features/admin-listings/tier-reasons.test.ts:27: * `admin_set_listing_tier` (T1 M1), so a change to the door's lists that this
src/features/admin-listings/use-admin-listing.ts:265: * `admin_set_listing_tier` (listings:enforce with a fresh second factor; the
src/features/admin-listings/use-admin-listing.ts:280:  const { data, error } = await supabase.rpc("admin_set_listing_tier", {
src/features/admin-listings/use-admin-listing.ts:290:    throw new Error("admin_set_listing_tier: malformed answer");
src/features/admin-listings/change-listing-tier.test.ts:42:    expect(rpc).toHaveBeenCalledWith("admin_set_listing_tier", {
src/features/admin-listings/change-listing-tier.test.ts:123:    expect(rpc).toHaveBeenLastCalledWith("admin_set_listing_tier", {
src/features/admin-listings/tier-reasons.ts:12: * The door `admin_set_listing_tier(listing, tier, reason, note)` (T1 M1) is the
src/features/admin-listings/tier-reasons.ts:53:/** P-2 (b) — the door's bound on a level's days (`admin_set_listing_tier`, badDays). */
== admin_undo_listing_edit (10)
docs/features/admin-listings.md:65:- **The door** `admin_undo_listing_edit(listing, at, note)` (listings:enforce with a fresh second factor): the History line's moment must be the listing's newest rev…
docs/features/admin-listings.md:141:- The undo door (`admin_undo_listing_edit`, D141) alone may still put back a category that an edit made before D172 had moved: `app.listing_undo` is on only for its…
scripts/acceptance-doors-allowlist.txt:72:admin_undo_listing_edit(uuid,timestamp with time zone,text) | staff | Delegates listing restoration and revision writes to admin_edit_listing; rejects callers…
scripts/public-surface-allowlist.txt:58:admin_undo_listing_edit | authenticated | Listings console L4d (D141): listings:enforce with a fresh second factor; only the listing's newest revision, an edit …
scripts/doors/manifest.txt:138:admin_undo_listing_edit(uuid,timestamp with time zone,text) | staff | authenticated | listings:enforce | row | staff_moderation | - | global | staff | - | census F1-1: n…
e2e/admin-listings.spec.ts:1740:      pageDoor(page, "admin_undo_listing_edit", { p_listing_id: listingId, p_at: at });
src/features/admin-listings/use-admin-listing.ts:244: * `admin_undo_listing_edit` (listings:enforce with a fresh second factor): the
src/features/admin-listings/use-admin-listing.ts:254:  const { data, error } = await supabase.rpc("admin_undo_listing_edit", {
src/features/admin-listings/listing-page.tsx:84: * note, and the door (`admin_undo_listing_edit`) puts the edit's before-values
src/features/admin-listings/undo-edit.ts:13: * `admin_undo_listing_edit` decides (F3): it also checks that nothing changed
== admin_list_listings (33)
docs/features/admin-listings.md:7:- **`admin_list_listings(view, search, country, category, seller, from, to, tier, limit, offset)`** — STABLE definer, `listings:view`. Drafts never. Views: `live` (ac…
docs/features/admin-listings.md:15:- **All listings** (`src/features/admin-listings/listings-page.tsx`, route `src/routes/admin.listings.tsx`) on the agreed blocks: the heading in the header with the …
docs/features/admin-listings.md:44:- **INC-553 — a price with its unit:** every price on the console prints with its unit ("1,450,000 ETB per bag"), as the card does: All listings (the door `admin_lis…
scripts/public-surface-allowlist.txt:54:admin_list_listings | authenticated | Listings console L1 (D134): listings:view only; drafts never; the seller's public name, the e-mail only for profiles:view …
scripts/doors/manifest.txt:70:admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer) | staff-reader | authenticated | listings:view | - | - | - | filter | - | - | -
scripts/conformance/status-map.test.ts:21: * mapper) and a place in admin_list_listings' view arrays (or is excluded there
scripts/conformance/status-map.test.ts:66:  `CREATE OR REPLACE FUNCTION public.admin_list_listings(p_view text)
scripts/conformance/status-map.test.ts:82:REVOKE ALL ON FUNCTION public.admin_list_listings(text) FROM PUBLIC;
scripts/conformance/status-map.test.ts:87:    "STM-1 the tree's statuses are all mapped by listing_group_of and placed (or excluded by name) by admin_list_listings",
scripts/conformance/status-map.test.ts:102:      const views = viewStatusesOf(last.get("admin_list_listings")?.body ?? "");
scripts/conformance/status-map.test.ts:117:      "admin_list_listings:paused",
scripts/conformance/status-map.test.ts:125:        `20260101000000_a.sql:${lineOf("FUNCTION public.admin_list_listings")} admin_list_listings gives 'paused' no place`,
scripts/conformance/status-map.test.ts:133:      "admin_list_listings:missing",
scripts/conformance/status-map-allowlist.txt:2:# listing_group_of (My listings' one mapper) or no place in admin_list_listings' view arrays (unless the
scripts/conformance/status-map.ts:12: * through `admin_list_listings`' view arrays (`WHEN 'all' THEN ARRAY[…]`). A
scripts/conformance/status-map.ts:23: *   - `admin_list_listings:<status>` — a status named by no `ARRAY[…]` of the body
scripts/conformance/status-map.ts:32:export const STATUS_READERS = ["listing_group_of", "admin_list_listings"] as const;
scripts/conformance/status-map.ts:135:  const admin = last.get("admin_list_listings");
scripts/conformance/status-map.ts:137:  judge("admin_list_listings", views.named, views.excluded);
scripts/conformance/seller-names-allowlist.txt:4:admin_list_listings | staff door (has_permission listings view); staff see the name | 2027-04-30
e2e/my-listings-doors.spec.ts:282:      const answer = await viewer.rpc("admin_list_listings", {
e2e/my-listings-doors.spec.ts:286:      expect(answer.error, `admin_list_listings ${p_view}`).toBeNull();
e2e/admin-listings.spec.ts:38: * authority): admin_list_listings (listings:view; drafts never), admin_edit_listing
e2e/admin-listings.spec.ts:213:    pageDoor(page, "admin_list_listings", args);
e2e/admin-listings.spec.ts:226:    const byId = await viewer.rpc("admin_list_listings", { p_search: live.id });
e2e/admin-listings.spec.ts:239:    expect((await viewer.rpc("admin_list_listings", { p_search: draft.id })).data).toEqual([]);
e2e/admin-listings.spec.ts:240:    const bySeller = (await viewer.rpc("admin_list_listings", { p_seller: seller.alias }))
e2e/admin-listings.spec.ts:244:    expect((await viewer.rpc("admin_list_listings", { p_seller: seller.email })).data).toEqual([]);
e2e/admin-listings.spec.ts:331:      expect((await person.rpc("admin_list_listings", { p_search: listingId })).error).toBe(
src/routes/admin.listings.tsx:9: * `admin_list_listings`, which re-checks `listings:view` (F3).
src/features/admin-listings/listings-page.tsx:67: * `admin_list_listings` (listings:view; the seller's e-mail only for
src/features/admin-listings/use-admin-listings.ts:7: * the one door `admin_list_listings` (L1): listings:view; drafts never; the
src/features/admin-listings/use-admin-listings.ts:68:  const { data, error } = await supabase.rpc("admin_list_listings", {
== admin_listing_certifications (8)
docs/features/legal.md:174:- **The staff card.** The ad's admin page shows a Certifications card (`admin_listing_certifications`, listings:view): one row per certification, newest first, with the stat…
scripts/public-surface-allowlist.txt:118:admin_listing_certifications | authenticated | an ad's certification record for staff; checks listings:view inside (B22 Stage 1 turn 4)
scripts/doors/manifest.txt:78:admin_listing_certifications(uuid) | staff-reader | authenticated | listings:view | - | - | - | global | - | - | census F1-1: no country argument or country-bearing targe…
src/features/admin-listings/listing-page.tsx:961: * Bundle 22 turn 4 — the ad's certifications for staff (admin_listing_certifications, listings:view): one
src/features/admin-listings/use-admin-listing.ts:302:/** Bundle 22 turn 4 — one certification of an ad (admin_listing_certifications; listings:view). */
src/features/admin-listings/use-admin-listing.ts:319:  if (!Array.isArray(value)) throw new Error("admin_listing_certifications: invalid answer");
src/features/admin-listings/use-admin-listing.ts:324:      throw new Error("admin_listing_certifications: invalid action");
src/features/admin-listings/use-admin-listing.ts:351:  const { data, error } = await supabase.rpc("admin_listing_certifications", {
== admin_listing_detail (17)
docs/features/design-foundation.md:620:- **Where:** the buyer's page only (`/l/$slug`; ruling 1, answer 1). The public document carries the ad's tier (`tierOf` in card-tier.ts reads it; an unknown val…
docs/features/admin-listings.md:31:- **The door:** `admin_listing_detail(listing)` — STABLE definer, `listings:view`; a draft answers "listing not found". One answer: the listing (content, status, tie…
docs/features/admin-listings.md:162:- **Set tier** on the listing's page (`listing-set-tier`; `mayEnforce && !own && mayTier(status)` — never a removed listing or a draft; the door decides again) open…
scripts/public-surface-allowlist.txt:57:admin_listing_detail | authenticated | Listings console L3 (D139): listings:view only; drafts never; the e-mail only for profiles:view holders, a staff member's…
scripts/doors/manifest.txt:79:admin_listing_detail(uuid) | staff-reader | authenticated | listings:view | - | - | - | global | - | - | census F1-1: no country argument or country-bearing target row re…
scripts/conformance/seller-names-allowlist.txt:6:admin_listing_detail | staff door (has_permission listings view); staff see the name (SPA-7) | 2027-04-30
e2e/admin-listings.spec.ts:334:      expect((await person.rpc("admin_listing_detail", { p_listing_id: listingId })).error).toBe(
e2e/admin-listings.spec.ts:1031:   * `admin_listing_detail`: listings:view reads a listing, never a draft; the
e2e/admin-listings.spec.ts:1066:    expect((await viewer.rpc("admin_listing_detail", { p_listing_id: draft.id })).error).toBe(
e2e/admin-listings.spec.ts:1069:    const seen = await viewer.rpc("admin_listing_detail", { p_listing_id: live.id });
e2e/admin-listings.spec.ts:1115:    const full = (await pageDoor(page, "admin_listing_detail", { p_listing_id: live.id }))
e2e/admin-listings.spec.ts:1128:    const again = (await viewer.rpc("admin_listing_detail", { p_listing_id: live.id })).data as Row;
e2e/admin-listings.spec.ts:2220:    // (admin_listing_detail); this door writes none (ruling 1, answer 5), so the line carries
src/features/admin-listings/use-admin-listing.ts:11: * its console page, through the one door `admin_listing_detail` (listings:view;
src/features/admin-listings/use-admin-listing.ts:177:  const { data, error } = await supabase.rpc("admin_listing_detail", { p_listing_id: listingId });
src/features/admin-listings/listing-page.tsx:73: * reads it all, `admin_listing_detail` (listings:view; the door decides what
src/features/posting/use-edit-draft.ts:127: * Staff read the ad through the console's own door (`admin_listing_detail`,
== admin_listing_reports (7)
docs/features/admin-listings.md:149:Bundle 19 turn 13b — for listings:review, the row shows "Reports: N" (open reports) under its status and the listing's page a Reports card (reason, status, date, no…
docs/features/ad-page.md:57:Turn 13a — M4 — `listing_reports` (the reporter and the closer referenced through `public.profiles(user_id)`, never auth.users; `home_country_code` carried and filled from …
scripts/public-surface-allowlist.txt:96:admin_listing_reports | authenticated | the listing's reports for listings:review (B19 M4)
e2e/ad-page-doors.spec.ts:937:      expect((await x.rpc("admin_listing_reports", { p_listing_id: ad.id })).error).toContain(
e2e/ad-page-doors.spec.ts:953:      const reports = await staff.rpc("admin_listing_reports", { p_listing_id: ad.id });
scripts/doors/manifest.txt:80:admin_listing_reports(uuid) | staff-reader | authenticated | listings:review | - | - | - | global | - | - | census F1-1: no country argument or country-bearing target row…
src/features/admin-listings/use-listing-reports.ts:40:      const { data, error } = await supabase.rpc("admin_listing_reports", {
== admin_name_check_list (8)
docs/features/hidden-seller-name.md:54:**The seller names held for review** (`src/features/admin-screening/name-checks.tsx`). Every `imitates` row, oldest hold first (`since`, then `profile_id`), in k…
scripts/public-surface-allowlist.txt:147:admin_name_check_list | authenticated | Foundations turn N1b-3 M2 (INC-977): the staff queue of held seller names; listings:view checked inside before any read…
scripts/doors/manifest.txt:89:admin_name_check_list(timestamp with time zone,uuid,integer) | staff-reader | authenticated | listings:view | - | - | - | global | - | - | census F1-1: no country argumen…
scripts/conformance/seller-names-allowlist.txt:19:name_check_queue_page | staff core (service-only); the held name only behind admin_name_check_list's listings:view + profiles:view gates (N1b-3 M2, NC…
src/features/admin-screening/use-name-checks.ts:13: *   admin_name_check_list   listings:view; the name, its checked text and the
src/features/admin-screening/use-name-checks.ts:66:    new ReaderError({ class: "malformed", message: "admin_name_check_list: answer out of shape" });
src/features/admin-screening/use-name-checks.ts:116:  const { data, error } = await rpc("admin_name_check_list", {
src/features/admin-screening/name-checks.tsx:45: * Read through admin_name_check_list (listings:view; the name and the model's
== admin_name_check_summary (7)
docs/features/ai-gateway.md:29:The seller-name route spends its existing imitation dial before `aiCall`; every non-success remains pass-unchecked: the door `save_posting_identity` records every new na…
scripts/public-surface-allowlist.txt:146:admin_name_check_summary | authenticated | Foundations turn N1a (INC-977): staff count of unchecked seller names and the oldest 'since'; listings:view checked …
scripts/doors/manifest.txt:90:admin_name_check_summary() | staff-reader | authenticated | listings:view | - | - | - | global | - | - | census F1-1: no country argument or country-bearing target row re…
src/features/admin-screening/use-screening.ts:371: * `admin_name_check_summary()` (listings:view, the page's own gate) answers the
src/features/admin-screening/use-screening.ts:384:      message: "admin_name_check_summary: answer out of shape",
src/features/admin-screening/use-screening.ts:399:  const { data, error } = await supabase.rpc("admin_name_check_summary");
src/features/admin-screening/use-screening.test.ts:238:        "admin_name_check_summary: answer out of shape",
== admin_open_report_counts (8)
docs/features/admin-listings.md:149:Bundle 19 turn 13b — for listings:review, the row shows "Reports: N" (open reports) under its status and the listing's page a Reports card (reason, status, date, no…
docs/features/ad-page.md:57:Turn 13a — M4 — `listing_reports` (the reporter and the closer referenced through `public.profiles(user_id)`, never auth.users; `home_country_code` carried and filled from …
scripts/public-surface-allowlist.txt:97:admin_open_report_counts | authenticated | open-report counts per listing for the console's rows, listings:review, at most 100 ids (B19 M4)
scripts/doors/manifest.txt:91:admin_open_report_counts(uuid[]) | staff-reader | authenticated | listings:review | - | - | - | global | - | - | census F1-1: no country argument or country-bearing targe…
e2e/ad-page-doors.spec.ts:940:      expect((await x.rpc("admin_open_report_counts", { p_listing_ids: [ad.id] })).error).toContain(
e2e/ad-page-doors.spec.ts:975:      const counts = await staff.rpc("admin_open_report_counts", { p_listing_ids: [ad.id] });
e2e/ad-page-doors.spec.ts:980:          await staff.rpc("admin_open_report_counts", {
src/features/admin-listings/use-listing-reports.ts:11:      const { data, error } = await supabase.rpc("admin_open_report_counts", {
== admin_screening_facts (13)
scripts/public-surface-allowlist.txt:51:admin_screening_facts | authenticated | bundle 11 A1 (D120): listings:review only; an ad waiting for review — its country, which contact methods are shown (true…
docs/features/admin-screening.md:29:- `admin_screening_facts(p_listing_id)` — what "Preview as buyer" needs and the reviewer may read: the ad's country (its place's market, else the listing's home cou…
docs/features/admin-screening.md:42:- **Preview as buyer** now reads, besides the row and its photos: the questions and their options (`get_posting_schema`, the options route — as the posting form rea…
docs/features/admin-screening.md:49:- **The market filter reads the ad's place (INC-537).** Filters → Country keeps the ads whose place is in that market: `place.country_code` through the embedded pla…
scripts/doors/manifest.txt:110:admin_screening_facts(uuid) | staff-reader | authenticated | listings:review | - | - | - | filter | - | - | -
scripts/conformance/seller-names-allowlist.txt:7:admin_screening_facts | staff door (has_permission listings review); staff see the name | 2027-04-30
e2e/admin-screening.spec.ts:362:    const { data, error } = await pageDoor(page, "admin_screening_facts", {
e2e/admin-screening.spec.ts:398:    const facts = await pageDoor(page, "admin_screening_facts", { p_listing_id: ad.id });
e2e/admin-screening.spec.ts:418:    const read = await pageDoor(page, "admin_screening_facts", { p_listing_id: ad.id });
e2e/admin-screening.spec.ts:467:    const facts = await pageDoor(page, "admin_screening_facts", { p_listing_id: ad.id });
src/features/admin-screening/use-screening.ts:34:   * admin_screening_facts reports). A3, INC-537 — never `home_country_code`:
src/features/admin-screening/use-screening.ts:252: * the seller's public name, from `admin_screening_facts` (listings:review).
src/features/admin-screening/use-screening.ts:287:  const { data, error } = await supabase.rpc("admin_screening_facts", {
== transition_listing (68)
e2e/posting-routes-dials.spec.ts:123:  test("PR-28 transition_listing counts against the revise dial", async ({ page }) => {
e2e/posting-routes-dials.spec.ts:126:      await twice(page, "transition_listing", {
docs/features/posting.md:1328:- Bundle 6 (INC-444, DEC-136): the seller doors edit_listing, transition_listing, renew_listing, set_listing_pin, mark_sold and relist_listing each call `rate_gate('revis…
docs/features/admin-listings.md:9:- **`admin_move_listing(listing, to, reason, note)`** — VOLATILE definer, `listings:enforce` with a fresh second factor. Remove (any status but draft and removed → re…
docs/features/admin-listings.md:10:- **`transition_listing`** gains Restore: removed → screening, enforcement only, with a fresh second factor; a severe removal by a super admin only (REQ-022 as amend…
docs/features/admin-listings.md:161:- **The tier is cleared on removal** (M2, `20261102052535_4fb5d636`): `transition_listing` redeclared whole with two insertions — the owner's delete sets `tier = 'r…
docs/features/legal.md:221:- **INC-807, turn 17b.** The owed doors are `edit_listing`, `mark_sold`, `move_listing_photo`, `relist_listing`, `remove_listing_photo`, `save_posting_identity`, `set_cover_…
docs/features/admin-screening.md:15:Each asks for confirmation, then for a fresh second factor through the step-up gate, then calls `transition_listing` as the signed-in reviewer. Approve moves the ad…
docs/features/admin-screening.md:19:`transition_listing` requires a recent second-factor step-up (`require_step_up_if_needed`) for a reviewer's decision (to active, reduced, rejected or held) and for …
docs/features/admin-screening.md:39:- **Tick-boxes** (D128 — a bulk action exists here): ticking ads shows the selection bar with Approve and Reject; one confirmation counts them (`admin.screening.con…
docs/features/admin-screening.md:66:While photo screening is switched off, a draft's new photos are held (docs/features/ai-services.md, "Photos held for staff"). Preview as buyer reads each photo's `u…
docs/features/admin-screening.md:109:- From Screening (`?from=screening`), for listings:review, the wizard's Review carries **Approve** (`post-edit-approve`) and **Reject** (`post-edit-reject`, destru…
docs/features/listings.md:50:> `transition_listing` as last declared (migration `20261011085637_3c0e90be`).
docs/features/listings.md:66:`transition_listing`.
docs/features/listings.md:72:> the owner doors and the nine-state `transition_listing` — are described from
docs/features/listings.md:94:`transition_listing`.
docs/features/listings.md:96:### `public.transition_listing(listing_id, new_status)`
docs/features/listings.md:122:reduced reach through `transition_listing`, which writes the `state` revision
docs/features/listings.md:168:client mutations are `rpc('submit_listing')` and `rpc('transition_listing')`;
docs/features/listings.md:192:`20260917010000`). Still **no door**: `submit_listing`/`transition_listing` are
docs/features/listings.md:219:`transition_listing`. Bundle 16 turn 1 adds `closed` ("No longer available",
docs/features/listings.md:393:`transition_listing(id, new_status)` over the nine states:
docs/features/admin-users.md:30:- `public.transition_listing(...)` (the state machine)
docs/features/my-listings.md:30:- **The status `closed`** ("No longer available"). `transition_listing(id, 'closed')`: the owner closes his live ad (active or reduced); the time it had left is kept (`…
docs/features/my-listings.md:40:- **The expiry sweep** (`expire_stale_listings`, hourly) expires each due ad — with full or reduced reach — through `transition_listing`, which writes its revision and …
docs/features/my-listings.md:109:- **Delete (call F).** Every ad but a removed one has **Delete**, last, behind a confirm ("You cannot undo this."). The door is `transition_listing` to `removed` as th…
docs/features/ci-guards.md:153:`submit_listing` / `transition_listing` re-declared in `20260816120338`.
scripts/acceptance-doors-allowlist.txt:103:resume_listing(uuid) | guarded | Resumes the caller's paused listing through transition_listing, whose status and clock writes pass acceptance_guard; a step …
scripts/acceptance-doors-allowlist.txt:112:transition_listing(uuid,text) | guarded | Updates listing status and publication/expiry/clock/deletion fields through acceptance_guard before a state revisio…
scripts/public-surface-allowlist.txt:22:transition_listing | authenticated | the status door, restated by M5; owner, reviewer and enforcer checks inside; L1 adds removed -> screening for enforcement w…
scripts/public-surface-allowlist.txt:56:admin_move_listing | authenticated | Listings console L1 (D137): Remove, Restore, Send back to review; listings:enforce with a fresh second factor; a severe rem…
scripts/public-surface-allowlist.txt:180:resume_listing | authenticated | Turn P-2 (a) M-1b (DEC-328): the owner resumes his paused ad to the status it was paused from with the time it had left; an ad…
docs/features/ai-services.md:102:- **Approving the ad approves its photos.** A trigger on `listings` (`listing_photos_approved_with_ad`): when a person moves an ad from `screening` or `held` to `activ…
docs/features/plans.md:91:`transition_listing`'s UPDATE (same key, same DETAIL, nothing written);
docs/features/security-scanning.md:91:Housekeeping turn 4 (INC-443's last item): the list names each surface once, with one reason. `parseSurface` refuses a repeated name ("public surface: repeated na…
scripts/doors/manifest.txt:264:transition_listing(uuid,text) | owner | authenticated | - | - | revise | - | - | guarded | - | the status door (F1-5a, ruling 1 §3): door_context's owner form (signed in…
scripts/check-listing-writes.sh:5:#   supabase.rpc('submit_listing', ...) / supabase.rpc('transition_listing', ...)
e2e/legal-certify.spec.ts:1043:    const close = await me.rpc("transition_listing", {
e2e/legal-certify.spec.ts:1050:    const reopen = await me.rpc("transition_listing", {
e2e/legal-certify.spec.ts:1153:        fn: "transition_listing",
e2e/legal-certify.spec.ts:1159:        fn: "transition_listing",
scripts/public-surface.test.ts:85:    expect(real.filter(({ name }) => name === "transition_listing")).toHaveLength(1);
e2e/my-listings-levels.spec.ts:530:    const removed = await pageDoor(page, "transition_listing", {
e2e/my-listings-doors.spec.ts:222:    person.rpc("transition_listing", { p_listing_id: id, p_new_status: "closed" });
e2e/my-listings-doors.spec.ts:224:    person.rpc("transition_listing", { p_listing_id: id, p_new_status: to });
e2e/my-listings-doors.spec.ts:354:    const service = await adminClient().rpc("transition_listing", {
e2e/my-listings-doors.spec.ts:525:    const moved = await service.rpc("transition_listing", {
e2e/my-listings-doors.spec.ts:540:    const fMoved = await service.rpc("transition_listing", {
e2e/admin-screening.spec.ts:287:      await pageDoor(page, "transition_listing", {
e2e/admin-screening.spec.ts:306:      await pageDoor(page, "transition_listing", {
e2e/admin-screening.spec.ts:853:    const moved = await adminClient().rpc("transition_listing", {
e2e/posting-routes.spec.ts:1050:    const opened = await adminClient().rpc("transition_listing", {
e2e/posting-routes.spec.ts:1063:    const activated = await adminClient().rpc("transition_listing", {
e2e/my-listings-page.spec.ts:201:    const closed = await a.rpc("transition_listing", { p_listing_id: C, p_new_status: "closed" });
e2e/my-listings-ad.spec.ts:280:    const closed = await a.rpc("transition_listing", { p_listing_id: C, p_new_status: "closed" });
e2e/my-listings-ad.spec.ts:664:    const deleted = await s.rpc("transition_listing", { p_listing_id: X, p_new_status: "removed" });
e2e/my-listings-ad.spec.ts:668:    const restore = await adminClient().rpc("transition_listing", {
src/routes/admin.screening.tsx:10: * transition_listing, which re-checks `listings:review` and a fresh second
e2e/admin-listings.spec.ts:615:        await owner.rpc("transition_listing", {
e2e/admin-listings.spec.ts:2378:    const deleted = await pageDoor(page, "transition_listing", {
e2e/admin-listings.spec.ts:2389:    const sale = await pageDoor(page, "transition_listing", {
e2e/feed-index.spec.ts:397:    const opened = await adminClient().rpc("transition_listing", {
src/routes/admin.listings_.$listingId_.edit.tsx:41: * `transition_listing` under the step-up gate (one ad), and returns to the queue
src/features/my-listings/my-listing.ts:315:      result = await supabase.rpc("transition_listing", {
src/features/my-listings/my-listing.ts:322:      result = await supabase.rpc("transition_listing", {
src/features/my-listings/my-listing.ts:340:      result = await supabase.rpc("transition_listing", {
src/features/admin-screening/use-screening.ts:242:  const { error } = await supabase.rpc("transition_listing", {
src/features/admin-screening/screening-page.tsx:77: * (`transition_listing`) re-checks `listings:review` and a fresh second factor
== admin_allow_listing_photo_core (0)

== admin_edit_listing_core (0)

== admin_move_listing_core (0)

== admin_review_photo_change_core (0)

== transition_listing_core (4)
scripts/conformance/listing-designation.test.ts:21: * transition_listing_core and designation_sweep_core; src/ never writes them through
scripts/doors/manifest.txt:264:transition_listing(uuid,text) | owner | authenticated | - | - | revise | - | - | guarded | - | the status door (F1-5a, ruling 1 §3): door_context's owner form (signed in…
scripts/conformance/listing-designation.ts:14: * `transition_listing_core` (the state machine: a removal clears them) and the sweep
scripts/conformance/listing-designation.ts:38:  "transition_listing_core",
````
