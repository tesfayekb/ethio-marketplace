STOP — f1-doors-6a STEP 1: two step-up cells cannot hold on door_context (stop (a))
DONE: STEP 0 (task saved, 578ecb774), STEP 1 (the census, 401f7473e)
LEFT: STEPS 2–7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `143027face66a5d2f569e442f57f54474e610441` (short `143027f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-17T16:16:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44122768790
FILES: docs/governance/briefs/f1-doors-6a.md
docs/governance/reports/f1-doors-6a.census.md
docs/governance/reports/f1-doors-6a.stop-1.md
roadmap.md

The brief's stop (a): "a decision of ruling 1, or a permission, class or step-up cell of the manifest,
cannot hold for a function of this family and the cell you would propose changes who may call it
today." Two cells meet it. The census (`docs/governance/reports/f1-doors-6a.census.md`, "The verdict"
and "Decisions for the supervisor") carries the evidence.

1. `admin_reveal_listing_contact(uuid,text)` — `listings:review | none:D129` (ruling 1 §6 keeps the
   opt-out). `door_context`'s staff form always calls `require_step_up_if_needed`
   (`supabase/migrations/20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql:85–87`; only
   `staff-reader` skips it), and `listings:review` has `requires_step_up = true` (read on the local
   proof stack). On the shell, the door refuses a reviewer who has no fresh second factor; today that
   reviewer reveals (SC-17, D129). No cell keeps D129 without a change beyond the family: a parameter
   on `door_context`, or a new permission row.
2. `admin_review_photo_change(uuid)` — `listings:review | row`. Neither the door nor its core checks
   step-up, and the screen calls it without the step-up guard
   (`src/features/admin-screening/photo-changes.tsx:62–76`). Building `row` refuses today's reviewer
   who has no fresh factor; keeping today's callers needs a third opt-out (DEC-336 forbids it, and
   `door_context` could not carry it).

The questions (the census's decisions 1 and 2). Decisions 3–7 are proposals the migration would build
on; confirm or rule them in the same answer:

1. The reveal: (A) `door_context` gains a step-up opt-out parameter (default off; DROP + CREATE with its
   service-role grant restated), allowed by check-doors only on a `none:<DEC>` line — callers and SC-17
   unchanged; (B) a permission row `listings:reveal` without step-up, granted in the same migration to
   every role holding `listings:review`, the line's permission becoming `listings:reveal`, with new
   `admin.roles.perm.*` keys (EN + AM); (C) take step-up (`row`), overturning D129 — SC-17 changes.
2. The photo-change review: (A) build `row` as ruling 1 §6 did for `catalog_find_rebuild` — a reviewer
   without a fresh factor is refused `stepUpRequired`, and the screen's Review goes through the page's
   `guard` in STEP 3; (B) keep today's callers by a third opt-out (needs decision 1 (A)'s parameter and
   overturns DEC-336's "no third").
3. `transition_listing`'s staff dial: (A) the door reads the listing's seller first; the seller or the
   service role takes `door_context('owner', NULL, NULL, 'revise')` (the first call, which check-doors
   judges), and any other signed-in caller takes `door_context('staff', 'listings', <review | enforce by
   the target status>, 'staff_moderation')`, with the shell re-counting the path's dial; (B) a new staff
   door for the screening decisions, `transition_listing` becoming the owner's and the service's only.
4. The move: the core's `rate_gate('revise')` leaves; one staff move spends `staff_moderation` once.
5. Country: edit `match` on `listings.home_country_code`; the list and the facts `filter` on the
   caller's countries. `has_permission` reads no country today, so a country-scoped listings holder is
   narrowed (no such grant is known before the Ops phase, DEC-380).
6. Returned answers kept at 200: the edit's seller refusals, the reveal's `notShown`, the name check's
   `stale`. The reveal's returned `rateLimited` becomes door_context's raised `rateLimited`, with no
   reset time until F1-7 (INC-1170).
7. Order: the tier's and the move's step-up come before their validation (ruling 1 §7).

Nothing else stops the turn: no return type changes (`admin_list_listings` keeps `RETURNS TABLE` and
raises), and every file the family needs is in SCOPE. No migration file is written; nothing was applied
anywhere. The census's probe ran only on the local proof stack and its file was removed.
