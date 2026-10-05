Source: supervisor thread, turn 863, Mon 2026-09-28 01:48 New York.
Status at 2026-10-05: ruled by the supervisor on 2026-09-28 01:48 after the operator's agreement (expiry stays none by default; photo caps per plan already live; D64 folded into D69; D68 numbers become seeded defaults); no spec prompt written, not built; not in the repo.
Related: D64, D68, D69, D65, D56, coverage_plans.max_photos, expiry_days.

Agreed, and the ground is friendlier than it looks:

- **Expiry:** already your policy. Categories have no expiry by default (`expiry_days` is NULL — "no expiry is the norm", C2d), and a listing stays until the seller removes it; the seller may *choose* an "until" date, nothing forces one. Nothing to change now; the "about to expire" notifications become a setting when D56/notifications arrive.
- **Photos per posting per plan:** already dynamic. `coverage_plans.max_photos` (default 10) is read by the posting door (`plan_caps`) and is editable in the **Admin → Coverage plans** console today. Per-category-per-plan is a matrix on top of that when you want it.
- **Sale windows, AI switches, notification lead times:** not dynamic yet — and they should share one mechanism rather than three consoles.

So D64 (AI switchboard) and D68's numbers merge into **D69 — Platform Controls**: one settings registry (`platform_settings`: key, value, optional scope = plan or category, bounds, updated_by, audited), read by the doors through one function with the seed defaults as fallback, and one admin page with a section per domain — **AI features** (on/off, per-user daily limit, global budget), **Posting** (photos per plan and per category, sale reference window and cap, cooldown), **Notifications** (lead times, off until the channel exists). Every knob carries a min/max so a typo can't set a 900-day sale; every change is audited; the client reads a versioned public route only for UI hints, the door always decides. 7/30 become the **seeded defaults**, changed from the page whenever you like.

Queue stays: DEC-082 (in flight) → D62-1b → D66 → **D69 Platform Controls** (subsumes D64) → **D68 sales** (built on D69's knobs) → D63 → D65 photo studio (behind the AI switch).

Record: no expiry by default confirmed as policy; photo caps per plan already live; D64 folded into D69; D68 numbers are seeded defaults, not constants.
