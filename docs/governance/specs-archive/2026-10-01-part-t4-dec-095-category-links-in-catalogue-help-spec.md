Source: supervisor thread, turn 1053 (replaces the first version in turn 1047, re-issued here with updated wording), Thu 2026-10-01 12:17 New York.
Status at 2026-10-05: DEC-095 ruled 2026-10-01 after the Construction walk; the curator rewrote all 57 pointer lines as full-path sentences (walk-fix batch, 2026-10-01) pending the token; the {category:<slug>} token, pointer button and category-move dialog were built in bundle 4 Part G step 29 (dev 0fc968e4, 2026-10-05); the mechanical swap of the 57 sentences for tokens has not been commissioned; the repo holds the built behaviour (docs/features/attributes.md, posting.md, roadmap.md), not this text.
Related: DEC-095, T4, DEC-094, D59 path, PW-107 (later renumbered), c27-walk-pointer-lines-2026-10-01.csv, bundle 4 Part G.

Mostly green. All the tests passed on the re-run, so the email fix worked. Only the last step failed: copying the commit to main. GitHub rejected that update on its own side ("fatal error in commit_refs"), a one-off glitch, not something in our code.

**Your steps:**

1. In GitHub Actions, open run 36882672052 and click **Re-run failed jobs** once more. Only the "Promote to main" step will run. If you skip this, Lovable's next green push updates main anyway.
2. Yes, send Lovable a message, but use this updated one instead of the earlier version:

---
```
CI on 6a33e31b is green on every test (re-run after the operator repaired staging SMTP; the promote step hit a transient GitHub ref error and is being re-run). INC-367 and INC-368 are closed: PW-58 is green in every shard and the server log carries no constraint lines.

Continue with N2 and the queue: S1 → D + L + M → S2/S3 → T → A → B → C → E census → full DEC-023 run. Part T gains T4:

T4 — DEC-095, category links in catalogue help (operator walk 2026-10-01: pointer lines must say exactly where to go and should take the seller there).
- Catalogue help text, in every language, may carry {category:<slug>}. The same resolver as {country} renders it as the destination's full path in the UI language — every level, root to leaf — as a link.
- On the posting form, tapping the link changes the draft's category to that leaf through the existing category-change path (the D59 reset with its Undo). Census that path first, with file:line.
- Admin views and exports show the raw token. The import gate accepts only slugs of active categories and refuses an unknown slug, with a self-test fixture. The finder indexes token-bearing text with the token removed.
- A help line that carries a category link is exempt from the 60-character first-sentence limit and wraps.
- Tests: component tests for the resolver (path in both languages; an unknown slug renders nothing dangerous); the gate self-test; PW-107 on a scratch definition and scratch categories (G27): the link shows the full path, and tapping it moves the draft to that category.
Every src/ landing runs `bun run i18n:usage` and commits both maps. Report only on green.
```
---

3. Carry on with the two curator imports (write-in first, then Home & Garden) and the walk from my earlier message, if you haven't already.
