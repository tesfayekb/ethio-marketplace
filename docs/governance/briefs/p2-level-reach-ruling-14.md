# P-2 (a) — ruling 14 (saved verbatim; base: cursor/p2-plan at 038a04c3d)

Attachments, compared by sha256 before use: `p2-m1c-types.patch` 1ae081631f745de5175b1ce2097a46d7b40b05bda3fa81c8cd8382e14883b8cc (matches); `p2-ruling14-strings.json` 3acc3db28e6c491dd309e947dda8e474789933cac8b5874cd00f3ca007f6907b (matches).

````
RULING 14 — P-2 (a): the last build turn. Base: cursor/p2-plan 038a04c3d.
MODEL — Opus 5.5 High (builds to this ruling; the two helpers extend D318's seeding mechanism and the existing last-declaration reader — no new sensitive mechanism).

STATE (supervisor-verified)
- ethio-staging holds all nine M-1c files: marks 20261105100100 … 20261105100900 each read back by the specific version; the text staging stored equals each file at 038a04c3d byte for byte. The preflight passes.
- CI on 038a04c3d (run 42014967372): 409/409 applied on every backend; 2752 passed; ONE red, LG-29 on both projects: "[e2e:certify] making active: noFreeSlot" at e2e/legal-certify.spec.ts:283 (makeState :265–:284), from :1206.
- 038a04c3d's failed jobs are NOT re-run (LG-29 fails again by design); your push runs CI fresh.

THE CAUSE (read, not guessed): LG-29 (:1198–:1208) publishes four ads for one scratch seller. The ad beyond the seller's free slots is REFUSED by publish_listing's envelope ({ok:false, refusals:[{field:"slots", reason:"noFreeSlot"}]}, 20261104154001_0ce62d98 :76–:82). The spec reads only `published.error` (:1205) — null for an envelope refusal — so the refusal passed as success; makeState (a service-role UPDATE draft → active) then forced the refused draft live. Part 8's guard now refuses that write. The guard is right; the test built a state the product forbids.

1. INC-1061 — service-role writes of listings.status / listings.tier outside the seeding law. The law fires on INSERT OR UPDATE OF status, tier; CF-SEED-1 covers INSERT only. Census by the law's definition, not by the statement.
   a. Mechanism: e2e/helpers/listing-seed.ts gains the ONE service-role writer of status/tier on an existing row (name yours), reading the room through the same readers as seedListingRow and applying the same rule: a write that brings the row INTO the counted baseline set beyond the seller's free slots refuses at the line (default) or moves the ad to the first level above the baseline (beyondFreeSlots: "level"); writes into non-counted statuses pass through it unchanged.
   b. Consumers: every service-role `.from("listings").update(…)` in e2e/ whose payload names status or tier moves onto it — my census at 038a04c3d: 26 sites in 17 files (ESTIMATE; your census by definition is the record), legal-certify's makeState and its 18 callers (:559 … :1372) among them. Each spec keeps its assertion intent.
   c. LG-29 and the other legal-certify ads that must be live: an ad beyond the free slots carries the level above the baseline BEFORE publish (a draft is not counted; publish_listing counts only baseline ads), so the seller's own door publishes it — and every publish's answer is asserted ok (item 2).
   d. Guard: CF-SEED-1 fails on any service-role INSERT into listings and any service-role UPDATE of listings naming status or tier outside the helper; planted-bypass proof of makeState's UPDATE shape; allowlist empty unless a site truly cannot move (key | reason | until).

2. INC-1062 — a test reads a door's transport error but not its answer. A door that refuses in its body ({ok:false, refusals}) answers error null, so `expect(x.error).toBeNull()` alone passes a refusal as success.
   a. Mechanism (NONE YET): e2e/helpers/door-answer.ts — one helper returns the payload only when error is null AND payload.ok === true, otherwise fails naming the refusals; one helper asserts a named refusal (ok === false and the reason). Names yours.
   b. Guard CF-DOOR-1 (scripts/conformance/): the envelope doors are DERIVED from the migrations' last declarations (a function whose last body can answer 'ok', false — reuse sql-writes.ts's last-declaration reader; never a second parser). My heuristic count at 038a04c3d: 19 doors, about 65 e2e call sites, about 15 reading no `ok` (ESTIMATE). Every e2e `.rpc("<envelope door>"` site must reach the helper or read the answer's ok; a site reading only `.error` fails. Planted-bypass proof of LG-29's shape. Wired (wired.test.ts names its caller).
   c. Consumers this turn: every site the guard fails moves onto the helper; allowlist empty unless a site truly cannot (key | reason | until).

3. The app minimum (the plan :127 and ruling 9), plus what M-1c made necessary:
   a. Types: apply the attached p2-m1c-types.patch (sha256 1ae081631f745de5175b1ce2097a46d7b40b05bda3fa81c8cd8382e14883b8cc), `git apply --check` first — the staging regen after part 9 (PostgrestVersion kept "14.5"): heartbeat counters, tier_reminded_for, seller_notices.reason nullable, designation_sweep_core, listing_group_of, listing_places_trim, seller_regular_live's 3-argument form. Nothing else differs.
   b. Typed readers: the card's and the ad's level, levelUntil, levelSource, reach, reachUntil (my_listings / my_listing) and admin_listing_detail's five clock columns, as typed absences — no casts, no defaults.
   c. setAdminListingTier passes p_days (no UI yet) and reads the answer's new `status`.
   d. A paused ad (group attention) shows myListings.paused and myListings.pausedHelp, keeps its kept days, and offers "Resume ad" (myListings.ad.resume, primary) → resume_listing, plus every action whose door accepts a paused ad (part 5: pin, photos-soon, mark sold, edit). Without Resume a paused seller is stranded — this is the minimum, not (b)'s screens. A live row with levelUntil shows myListings.levelEnding through the one date mechanism.
   e. noFreeSlot reaches words wherever a person can meet it: the wizard's DRAFT_REASONS (src/features/posting/refusal-text.ts :23) and actionErrorKey (src/features/my-listings/my-listing.ts :245 — resume, renew, reopen, the edit into review) both map it to post.refusal.noFreeSlot (one seller key; actionErrorKey already returns post.refusal.residencyUnknown at :251 the same way); the console's tierErrorKey (tier-reasons.ts :54) and moveErrorKey (move-reasons.ts :56) map it to admin.listings.error.noFreeSlot. A unit test per mapper.
   f. The console's history labels for the sweep's audit actions: admin.listings.action.levelEnded / levelPaused / reachEnded.
   g. STRINGS: the attached p2-ruling14-strings.json (sha256 3acc3db28e6c491dd309e947dda8e474789933cac8b5874cd00f3ca007f6907b) — nine keys, EN + AM, by layer. Check its sha256, apply BY SCRIPT from the file (never retype); the am-script guard must pass. Two EN texts differ from your stop-4 proposal on purpose (my call): pausedHelp drops "or choose a level" (no level screen until (b); (b) adds it back) and names the app's own actions ("mark as sold", "no longer available").

4. CF-TIER-5 (scripts/conformance/listing-designation.ts) as the plan set it: every writer of the five designation columns in a last declaration is an admitted body (the level and reach doors, admin_set_listing_tier, transition_listing, designation_sweep_core); src never `.update(`s them; planted bypass; wired.

5. Tests as the plan set them: SWP-1…4, FSL-1…3 (FSL-3 through the Resume button), the level-door spec under its free prefix including the two-tab race (two sessions take the seller's last free slot at once: exactly one wins, the other gets the noFreeSlot words, nothing half-written). Grep-check every new id free. Red-first for the two guards on a planted bypass, never committed.

6. Records in the PR: INC-1061 and INC-1062 rows (defect, evidence, fix, class naming the concern and its mechanism); register row 114 widened to UPDATE; a register row for CF-DOOR-1; docs/features/my-listings.md for the paused ad.

7. THE CHECKS whole on the final tree, the self-review, the report (file list from `git diff --name-only 038a04c3d`; the K2 sibling list; every new string key with its EN), PR #19 ready, push, END.

FINDINGS clause as before. No migration in this turn: if one looks needed, STOP and say why.
````
