# P-2 — ruling 1 (the plan approved; phase 2 = turn (a))

```text
RULING — P-2, ruling 1: the plan is approved; phase 2 = turn (a). Base: rebase cursor/p2-plan onto origin/dev 7c89b1f60 first (the merge of #18), keeping both sides of any roadmap or register conflict; roadmap line 4 (lane B) goes and line 3 names docs/governance/briefs/p2-level-reach.md as the brief in force, with this ruling saved beside it as docs/governance/briefs/p2-level-reach-ruling-1.md. You are now the only lane; tests run as usual.
**MODEL — Claude Fable 5.1 (High)** (Tier A: three migrations, doors, the sweep).

The nine premise corrections of your §9 are accepted as written (the live transition_listing site, the 60 already gone, SQL sweeps heartbeat-only, max_active_ads never wired, the level guides free of "tier", used_count the doors' duty, seller_notices' shape, reach NULL = the market's included reach, no live hole). The answers:

Q1 — the column stays `tier` in P-2 (internal; every SQL reader names it); the fold renames keys, strings and guide texts only, and new keys are born "level". A column rename is its own later migration if ever. CF-LEVEL-1's allowlist can empty with the column kept, because its rule judges the level literals, not the column's name.
Q2 — no re-buy of the same level in P-2: `sameLevel` with the until date in the refusal's detail. P-3 revisits (an extension is a credit question).
Q3 — yes: a bought level on a paused ad resumes it in the same call (model rule 5 names the buy as the renew path); the resume goes through the same transition as `resume_listing`, under the slot rule, in one transaction.
Q4 — Promote shows LEVELS ONLY until (c); `set_listing_reach` still lands in (a) (CF-TIER-5 covers all five columns from the first migration), and the reach surfaces appear in (c) with the caps fold. The (b) brief says so in words.
Q5 — provisional, the operator may override before M-1c lands: at a reach end the sweep trims the ad's places back to the market's included reach (the primary place kept, then the seller's places in their saved order up to the included caps), records the removed places in the revision row, and never touches the ad otherwise; "back to city" means what buyers see, not only a column. D311's way stays for photos.
Q6 — neither derived nor per market: `listing_packages.is_baseline boolean NOT NULL DEFAULT false` with a partial unique index (exactly one row where kind = 'level' AND is_baseline), seeded on `regular`, exposed in the console as a read-only mark; `baseline_level_key()` reads it. The baseline is one level everywhere; what varies per country is N.
Q7 — widen CF-PRICE-1's rule: a reader is admitted when it only calls the SQL resolvers (product_price_for, level_perks_for) and computes nothing; the census lists every reader; promote-service.ts is the second. No allowlist line.
Q8 — as you propose: a level's `days` is the designation's clock; `expires_at` keeps DEC-117; `extends_lifetime = true` on the level row pushes `expires_at` to at least `tier_until` at the set; `coverage_plans.default_days` retires unread.
Q9 — keep the `tier_rank` name; rank = the level row's `sort` (regular 0 < featured 10 < premium 20; the feed orders as today); a comment names the fold; the rename, if ever, rides Q1's.

Also decided:
- The dial: `('promote', 10, 3600)` — ten sets an hour per user; a later RAISE rolls the count back and the refusal proofs assert it.
- The pause is a STATUS (`paused`), written only by transition_listing, exactly as §1 lays it out, with `resume_listing` the owner's door.
- Health line: none for the SQL sweep in P-2; the heartbeat row gains the four counters; the register row says "health line at the sweeps' consolidation (row 72)", and the roadmap gains that line.
- Staging applies: M-1a and M-1c through my connector; M-1b carries a DROP (admin_set_listing_tier DROP + CREATE) and is applied on staging by the operator from the raw file (DEC-323) — write its stop report in the apply-pairing form.
- Decisions recorded for the records turn: DEC-328 (the pause is a status), DEC-329 (the baseline level flag), DEC-330 (the reach end trims to the included reach — provisional), DEC-331 (the tier-word fold: column kept, keys and strings renamed, CF-LEVEL-1's allowlist empties — this replaces the 2027-03-31 date), DEC-332 (SQL sweeps heartbeat-only until the consolidation).

TURN (a), as §8: M-1a → stop 1 → M-1b → stop 2 → M-1c → stop 3 → the app minimum (typed readers of the new fields, setAdminListingTier passes days, the refusal keys EN + AM — the Amharic is mine: post every new key with its English at stop 3 and I return the file) → CF-TIER-5 (listing-designation.ts, planted bypass, wired) → the tests you list (the PP-6 refusal proofs: rows, revision, audit, dial count unchanged; LVD-1…5, SWP-1…4, FSL-1…3 on a scratch seller; the prefixes you grep-checked) → report → PR ready → every check green → END. Each migration: whole redeclarations from the live definitions (G39), proofs on scratch rows (XZ, e2e_mig_ keys), closers in-file, the mark above the ledger's newest; the stop report after the prod apply with its read-back and the `apply <fragment> → expect mark <value>` line. Tolerances: a red is a STOP when its body or server log touches a path this turn changed; a refusal that leaves a row, a revision, an audit line or a spent dial is a STOP; a reader answering `?? 'regular'` or `?? 'city'` on the new columns is a STOP.

(b) and (c) follow as §8 says, each on its own ruling; INC-1038 + CF-DIAL-1 right after (a) as its own short Fable turn; INC-1042 + #434–436 and INC-1039 / DEC-321 as their own turns, placed on the roadmap in (c).
```
