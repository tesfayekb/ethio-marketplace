Source: supervisor thread, turn 1091, Thu 2026-10-01 16:18 New York.
Status at 2026-10-05: rulings sent 2026-10-01 16:20; the executor built (b) and (c) with two stated deviations (first lease creates the account; the reset happens at the next lease, not at release) that were not ruled on in the thread; not in the repo.
Related: DEC-097, DEC-099, INC-376, J6.

Lovable's fix checks out, and its plan for which test accounts to pool is sound. It can go ahead and build the pool.

- **Formatting fix:** on dev (5f8d0b60); only `roadmap.md` changed. I ran the project's pinned formatter on it myself and it passes. CI is still running on that commit, and no turn has stranded.
- **Plan accepted:** about 100 places move to the pool and about 35 keep making fresh accounts. At roughly 100 new accounts per run (my estimate), that comes to about 10–15k a month, far under the 100k limit.
- **Two small rulings** are in the message below: sign-out tests can use the pool, and admin tests get accounts with the role they need.

**Your steps**
1. Paste this into Lovable and send it:

---
```
Verified: roadmap.md passes the pinned prettier on 5f8d0b60; only roadmap.md changed. DEC-097 (a) census ACCEPTED. Build (b) and (c) now.

Two rulings on the census:
- auth-signout (11): move to the pool wherever the test only needs a signed-in session. Sessions are reaped at lease, so signing out needs no never-used account. Keep minting only where the test itself needs a brand-new identity; say which stayed.
- Roles: a pooled account gets the role its test asks for at lease, and release resets it to none. Or keep a small sub-pool per role — your call; state it. Tests that change a TARGET account's status or roles (admin-users) mint that target fresh, or restore it in finally. The actor comes from the pool.

Then continue: DEC-097 (c) → D+L+M → re-time search → S3 → DEC-096 → T (with T4) → A → B → C → Part O → Part P → INC-371 → the E census → the final full DEC-023 run. Same turn rules: stop at a clean point with the checks green, short report.
```
---

2. Bring me the next report. I'll confirm CI on the formatting fix when I look again.
