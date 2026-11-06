# Foundations 1 (the door mechanism), ruling 1 — the plan approved; phase 2 = turn F1-1

```text
RULING — Foundations 1 (the door mechanism), ruling 1: the plan is approved with the decisions below; phase 2 = turn F1-1, which starts when P-2 turn (a) has merged (it lands BEFORE P-2 (b) and (c), so their redeclarations are built on door_context). Until then this lane holds: rebase cursor/f1-doors-plan onto dev once P-2 (a) is in, save this ruling as docs/governance/briefs/f1-doors-ruling-1.md, and wait for my "go".
**MODEL — Claude Fable 5.1 (High)** (Tier A).

The thirteen corrections of §6 are accepted (the counts 91 / 124 / 299 / 10 / 106, INC-409's shape, the reader mode, the F5 reading, types.ts, the premise, the file names). Decisions:

1. THE MANIFEST — option (c), hand-kept and double-entry: `scripts/doors/manifest.txt` + `manifest.ts`, `check-doors.ts` proving both sides (the line against the body's door_context literals, statically from the last declarations and live from pg_get_functiondef), with every finding kind planted: missing-line, line-without-door, gate-missing-for-class, class-mismatch, grant-unseen, stray-grant (the trigger function). The acceptance classes and the public-surface function side move into it in F1-7 as you say; until then both files stay and the census reads them.

2. THE SHELL — whole, family by family: every door of a family takes the shell in its family's turn, and a door whose return type must change becomes `RETURNS jsonb` in that same turn (DROP + CREATE, grants restated, the callers read `data.id` through the shape guard); no door is left on RAISE-only "until its turn" beyond its family's turn. The premise (§6.12) is proven FIRST in F1-1 on the smoke lane with a planted scratch door: a returned refusal with `response.status` 4xx commits the count and the refusal row and leaves the door's table unchanged, and supabase-js surfaces `code[:detail]` exactly as a RAISE does. If the premise fails, F1-1 STOPs at that proof and I rule; the server-route fallback is not adopted on your own.

3. REFUSALS — `door_refuse(code, detail)` with ERRCODE P0D01 and the `code[:detail]` shape; the closed code list in `src/lib/door-codes.ts` with the one generic key (EN + AM — mine, delivered as a file with F1-1's new strings); `stepUpRequired` keeps P0009 so the 428 path holds; the sentence sites fold to codes door by door in each family's turn, never by search-and-replace.

4. SCOPE (INC-834) — the three modes as §3.3 (`match` / `global` / `filter`, `none` for owner and public), `has_permission_scoped` beside the unchanged `has_permission`; the coarse assignment stands as the starting manifest and F1-1's census refines it by argument NAME and target table — the manifest's `country` column is the record; a door the census cannot classify is `global` (the stricter reading) with a `reason`.

5. DIALS — no door without one. Owner doors: the dial of their family as the manifest names it (`revise` for the three, the siblings' dials elsewhere). Staff doors: `staff_config` for the 51 (configuration families) and `staff_moderation` where the door moderates people or ads, by family, as the manifest column says; limits stay today's rows. A family with no fitting dial gets one new named dial with an ESTIMATE limit in its migration (a rate_dials row) — named in the stop report, never silently.

6. STEP-UP — the two recorded opt-outs stay as `none:<DEC>` lines (admin_reorder_categories, admin_reveal_listing_contact — D129). No third: `catalog_find_rebuild` takes step-up as its permission row says; its line reads `row`.

7. ORDER — the one law order for every door: caller class → deactivation → permission with scope → step-up → dial → acceptance where owed → the work; the two deviants (admin_set_listing_tier, transition_listing) take it on migration; a refused call never spends a dial of a right it did not have.

8. INC-409 — the `false` branch as §4 (policies cannot RAISE), DR-1, the proof comparing a policy-driven read before and after.
   INC-786 / INC-821 — FOR KEY SHARE and the quiet `{counted:false}` as §4, with the class census (save_listing, report_listing, reveal_listing_contact, the photo doors) in F1-5b.
   INC-942 — `DoorArgs<F>` with the nullable union and CF-DOOR-ARGS, allowlist starting at the ten and emptied in F1-4a.
   INC-836 part 2 — `relist_listing` IS retired with the other two (DEC-335): no screen calls it, `copy_my_listing` is the seller's way to post an item again today, and relist returns — if stage 4 wants it — as a new seller door on door_context with its own spec; the 12 tests move onto `edit_my_listing` / service seeding; CG-2 to six.
   INC-837 closes in F1-1; INC-849 is closed (the Result type lands in F1-7); INC-443 as §4 (the FOREACH grant form resolved; the 106 authenticated functions become lines in F1-1).

9. READERS (INC-838) — in F1-7 as planned; the public readers' deactivated-token refusal is the backstop you describe. The cost bar: ≤ 0.1 ms median per door_context call on the smoke lane, measured by F1-1's proof block (1,000 calls per class, clock_timestamp) and by feed-bench before and after F1-7; over the bar is a STOP.

10. FILES BEYOND THE ALLOWANCE — granted for F1-1 only: AGENTS.md (its :18 and :52 lines and the agents-lines allowlist), `.github/workflows/ci.yml` and `local-backend-proof.yml` (the caller-gates step retired, `check-doors --live` in its place). The workflow change is DEC-334 under G22 with its frozen rule: the new step gates from its first run only after it has failed on its planted fixture in the same run's self-test; a step that cannot prove itself does not replace the old one.

11. TYPES — `src/integrations/supabase/types.ts` is regenerated by ME from staging after each staging apply (the connector's generator, as P-1b's types patch) and delivered as a patch the turn applies; a turn's code reads `data` through the shape guards and never depends on the new `Returns` before the patch lands; each migration stop report names the regen as the pairing's third step.

12. TURNS — the seven of §5 stand (F1-1 … F1-7, eight stops), oldest families first; P-2's three seller doors are manifest lines in F1-1; P-2 (b) and (c) run between F1-1 and F1-2 and build their new or redeclared doors on door_context from the start.

Decisions recorded for the records turn: DEC-333 (the door mechanism: manifest (c), door_context, door_refuse P0D01, the shell with door_refused and door_refusals, the three scope modes), DEC-334 (check-doors --live replaces the caller-gates step; frozen rule), DEC-335 (relist_listing retired; relist returns as a specified seller door), DEC-336 (every door spends a dial of its family; no third step-up opt-out).

HOLD here. No code until P-2 (a) has merged and I say "go F1-1".
```
