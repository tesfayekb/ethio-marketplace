# P-2 turn (a) — ruling 11 (M-1c's proof row, and the slot law's census)

Base: cursor/p2-plan at bc0ce8ac1

````
RULING — P-2 (a), ruling 11: M-1c's proof row, and the slot law's census. Base: cursor/p2-plan bc0ce8ac1. Save as docs/governance/briefs/p2-level-reach-ruling-11.md.
**MODEL — Claude Opus 5.5 (High)** (a proof fix and a census; the design decision in item 2 is mine).

1. INC-1059 — run 41996927177: every lane's backend start failed at 20261105080106_42c3a28d statement 5 (its proof). The server record (DEC-340): `new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"`, DETAIL the scratch level row (e2e_mig_lv_…, days 10, max_photos null, placement null), CONTEXT the INSERT at inline_code_block line 66. A level row must carry its perks (max_photos, placement — see 20261103040805's listing_packages_perks_by_kind_check). FIX: the scratch level rows carry max_photos and placement as the earlier P-2 proofs do (6, 'boost', badge false). CENSUS every scratch INSERT in the seven M-1c files against the CHECKs of the table it writes (listing_packages, listings, seller_notices, market_settings, package_prices) and fix every row the CHECKs would refuse; list them. Proof text only — marks unchanged; say so in each touched file's header line. Run `bash scripts/check-migrations.sh`.

2. INC-1058 — CENSUS ONLY (no code): your §10 finding that a paused (or closed) ad edited through edit_my_listing returns from review live at the baseline with no slot count. The law must hold at the ONE transition every door passes — a baseline ad ENTERING a counted status (screening, held, active, reduced) from a status that is not counted. List, file:line from this tree: every path that moves an ad into a counted status (transition_listing's branches, publish_listing, resume_listing, set_listing_level's resume, edit_my_listing / submit_listing / renew / relist paths, the reviewer's approve, the sweep), which of them check the slot today, and what a check inside transition_listing would refuse or change for each (including the reviewer approving an edited paused ad — it must not become a lock-out of a seller who had a slot when he posted). Post it with the stop; I decide the design.

3. Then push ONCE and END THE TURN. One full CI run judges it; I apply the seven files on staging after a green backend start. The app minimum, CF-TIER-5, the tests and the report wait for my next ruling.
````
