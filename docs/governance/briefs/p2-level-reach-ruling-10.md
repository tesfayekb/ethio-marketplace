# P-2 turn (a) — ruling 10 (M-1c's nine questions answered; build)

Base: cursor/p2-plan at 5e7f263d6

````
RULING — P-2 (a), ruling 10: M-1c's nine questions answered; build. Base: cursor/p2-plan 5e7f263d6. Save as docs/governance/briefs/p2-level-reach-ruling-10.md.
**MODEL — Claude Fable 5.1 (High)**

H1 — option A. The trim enforces the caps the judge enforces today, read through the judge's own reader (seller_plan → coverage_plans), never a second copy of that read; the primary place kept, then listing_locations in position order within the caps, the removed ids in the revision row, the feed re-queued. (c) moves that one read to the reach row when the caps fold. Option B would leave a window in which an ended reach keeps its places for free — DEC-330 says trim.
H2 — agreed: at a level end the tier falls to the baseline in both branches, the slot counted before the fall; no slot → transition_listing(id, 'paused') (service), audit listing.level_paused, the notice.
H3 — the four doors that stay accept 'paused' beside 'closed': edit_my_listing, set_listing_pin, set_listing_photos_soon, mark_sold. edit_listing and set_listing_price are left as they are and named in the report — DEC-335 retires them in F1-1; no screen calls them. Ruling 2 §4's citations were mine and wrong; yours stand.
H4 — 'paused' goes wherever 'closed' goes in both readers: my_listings → the attention group (D317, flagged as a product decision; the operator may override before (b)); admin_list_listings 'all' yes, 'ended' no. INC-1057: my_listings' group CASE has no ELSE — a status outside its list is invisible to its owner. The CASE gains an ELSE that RAISEs ('my_listings: unmapped status %'), and the class gets its guard: CF-STATUS-1 — a conformance test (plan-seam's last declarations) asserting every status literal of listings_status_check appears in my_listings' CASE and in admin_list_listings' view arrays; planted red; wired. Register row.
H5 — agreed: level only; tier_reminded_for holds the tier_until reminded about.
H6 — agreed: seller_notices.reason nullable with CHECK ((kind LIKE 'admin\_%') = (reason IS NOT NULL)); kinds + level_ending, level_paused; the EN strings posted at the stop, the Amharic mine.
H7 — agreed: a reach end applies to any status with reach_until < now().
H8 — agreed: five to seven files under 25 KB, marks set at the push above 20261104213000 and at or after the UTC hour of the push, ONE stop with every pairing line; I apply them on staging through the connector (a file with a DROP included — the connector is the default carrier now, INC-1056).
H9 — agreed: listing.level_ended / level_paused / reach_ended, actor NULL.

Laws 11, 12, 13 and CF-SQL-1 bind every file; every write under pg_cron still carries its WHERE. Proofs on scratch rows with the sentinel; the sweep's proof runs designation_sweep_core directly on scratch ads (a level ended with a slot → baseline, live; without → paused + notice; a reach ended → places trimmed to the caps, removed ids in the revision, feed re-queued; the reminder once; a second run moves nothing). Build → checks → push → STOP with the pairing lines and the EN strings. Tolerances as before.
````
