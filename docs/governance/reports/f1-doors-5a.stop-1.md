STOP — f1-doors-5a STEP 1: four browser tests outside SCOPE read sentences this turn folds to codes (stop (c))
DONE: STEP 0 (task saved, `c128271de`), STEP 1 (the census, `f056957b5`, `docs/governance/reports/f1-doors-5a.census.md`)
LEFT: STEP 2 (Part A, Part B, the migration and its stop), STEPS 3 to 7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `bdb2fc555c04ea6a1ad65ba96ccc89e6ad4840ee` (short `bdb2fc5`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-15T19:38:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43753052995
(dev's root `ci-status.md` on `origin/ci-evidence`; the commit is the base and `origin/dev` is still `bdb2fc555`. The
lane has no run yet: `branches/cursor/f1-doors-5a/ci-status.md` does not exist.)
FILES:
docs/governance/briefs/f1-doors-5a.md
docs/governance/reports/f1-doors-5a.census.md
docs/governance/reports/f1-doors-5a.stop-1.md
roadmap.md

## The stop

STEP 1's stop (c): "the family needs a file outside SCOPE that no clause of SCOPE reaches". SCOPE's `e2e/` clause
names the family's spec files (`post-wizard-*.spec.ts`, `posting-routes.spec.ts`, `photo-pipeline.spec.ts`,
`my-listings-*.spec.ts`, `legal-certify.spec.ts`) and the helpers they use. Four assertions in three other spec files
read a sentence a family door raises today and that this turn's migration turns into a code. Each fails the moment the
migration is applied, whatever the client does:

| Id | File:line | Door | Reads today | Reads after the migration |
|---|---|---|---|---|
| AL-8 | `e2e/admin-listings.spec.ts:620` | `transition_listing` (the owner, removed → screening) | `"enforcement only: removed -> screening"` | `"enforcementOnly:removed-screening"` |
| AL-29 | `e2e/admin-listings.spec.ts:1975` | `edit_my_listing` (the seller, a category change) | `{ error: "not editable: category_id" }` | `{ error: "notEditable:category_id" }` |
| AU-5 | `e2e/admin-users.spec.ts:346` | `submit_listing` (a deactivated account) | `toContain("account is deactivated")` | `toContain("accountDeactivated")` |
| CG-1 | `e2e/auth-caller-gates.spec.ts:179` | `set_cover_photo` (a deactivated account; one loop with `unsave_listing` and `accept_legal`) | `toContain("account is deactivated")` for all three | `"accountDeactivated"` for `set_cover_photo`; the other two doors unchanged, so the loop splits |

How the census found them: each of the 30 sentence stems the family raises, grepped across `e2e/` outside the family's
files (`rg -n -F`), and every call of a family door from another spec file; each hit read in place. The other hits
belong to other doors (`admin_edit_listing`, `admin_listing_detail`, `admin_screening_facts`, `listing_counts`, the
retired doors' negative match in CG-2) and hold. The other out-of-scope callers of family doors hold too: SC-4, SC-16,
SC-19, FE-12, ATR-5, AL-5, AT-60 and `e2e/helpers/seller-name.ts:13` (the census's `tests` table, each with its
reason).

Stops (a) and (b) do not apply:
- (a) `transition_listing`'s line changes class from `staff | listings:review | row` to `owner` with `revise`
  (`cell-meaning`). The staff form of `door_context` would refuse every seller, so the line cannot hold as written. The
  proposed line keeps who may call: every signed-in caller reaches the same checks in the same order, the reviewer's
  `listings:review` and step-up and the enforcer's `listings:enforce` and step-up stay byte for byte inside the core,
  and the service role passes as today.
- (b) `transition_listing`'s return type changes from `void` to `jsonb`, and it has callers outside SCOPE (the e2e ids
  above; `src/features/admin-listings/move-reasons.ts` through `admin_move_listing`). None of them reads the answer, so
  none needs a change.

## What I need

1. A ruling on the four assertions: add `e2e/admin-listings.spec.ts`, `e2e/admin-users.spec.ts` and
   `e2e/auth-caller-gates.spec.ts` to SCOPE for those four assertions only, with the new expectations in the table
   above (STEP 4's work, in the second chat), or another ruling.

The census also settles the points below. Unless the ruling says otherwise, this chat builds them as written in the
census and names them again at the migration stop:

2. The family's ownership code is `notYourListing`, the brief's `notYours`. It already exists with words in both of
   the family's word maps (`DRAFT_REASONS`, `PHOTO_REASONS`) and the law says a code that exists is reused first. The
   level, reach and resume doors read the row "by id and seller" today and answer `listingNotFound` for another
   seller's ad. They split into `listingNotFound` (no such ad) and `notYourListing` (another seller's ad), so LDR-2
   (`my-listings-levels:415`) moves to `notYourListing`. The photo and pin doors keep one answer, `notYourListing`, for
   both cases, as today: their one query reveals nothing of another seller's ad.
3. `transition_listing` becomes a door over a new service-only core, `transition_listing_core(uuid,text)`. The core
   keeps today's state machine and refuses by `door_refuse`, without the deactivation check and the `revise` dial,
   which the door's `door_context` now gates. The SQL callers `admin_move_listing_core` and `designation_sweep_core`
   (the expiry cron, which has no JWT and would be refused `notSignedIn` by the door) and the doors `resume_listing`
   and `set_listing_level` move onto the core. The order of the files: the core, then the SQL callers onto it, then
   the doors, then `transition_listing` last (DROP + CREATE, with `REVOKE ALL … FROM PUBLIC, anon` and
   `GRANT EXECUTE … TO authenticated, service_role` restated).
4. The staff move's dial. Today a staff member's `admin_move_listing` spends `revise` only inside its
   `PERFORM transition_listing`, and `moveErrorKey` (`src/features/admin-listings/move-reasons.ts:61`, outside SCOPE)
   maps the `rateLimited` that comes from it. A core without the dial would stop that count, which changes a staff
   door outside this family. The default I will build: `admin_move_listing_core`'s redeclaration calls
   `rate_gate('revise')` where the transition used to, so the count and its refusal stay exactly as today. The
   alternative is to drop it and leave the staff move's dial to F1-6.
5. A reviewer's decision keeps spending `revise`, as today (the body spends it for every caller). It is named for F1-6:
   the staff dial `staff_moderation` would ration that work better.
6. The gate's `rateLimited` carries no reset time (`door_context` refuses it with no detail). `save_posting_identity`
   returns `resets_at` today and the identity route passes it on (`src/routes/api/listings/identity.ts:201`), but no
   screen draws it (`post.refusal.rateLimited` and `post.photo.refusal.rateLimited` take no value). The time is
   dropped.
7. Two doors change their gate order to the law's: `remove_listing_photo` spends its dial before reading the row
   (today it reads ownership and the photo first), and `save_posting_identity` checks deactivation before its dial
   (today the dial comes first).

Correction to the census's own reading, made before this stop: the probe's extracted copy (`probe.txt`) had lost its
last line, so the dial section seemed to show eight dials. The raw log holds the ninth, `schema_read 120/3600s`, and
the census's appendix is cut from the raw log. All nine posting dials have their rows.

No security hole was found. No migration has been written; nothing was applied anywhere. The census's probe ran only on
the local proof stack and was removed before the census was committed.
