---
name: start-turn
description: Part A and STEP 0 of an executor turn — orient on dev and CI, compare the brief's BASE, save the brief byte for byte, record it in roadmap.md. Use at the start of every brief, before any other change.
---

# Start a turn (Part A + STEP 0)

Run these in order; keep every output the brief asks for in your notes for the report.

## Part A — orient

```bash
git fetch origin dev main ci-evidence
git switch dev
git status --short                                   # must be empty
git rev-list --count origin/dev..HEAD                # must be 0 (nothing unlanded) before catching up
git merge --ff-only origin/dev                       # only when dev is behind; refused otherwise → STOP
git rev-parse origin/dev                             # <HEAD>; the brief's BASE: line is <BASE>
git diff --name-only <BASE>..origin/dev              # empty = anchors fresh; else compare with SCOPE → STOP on overlap
git show origin/ci-evidence:docs/tracking/ci-status.md | head -6     # two-step read: conclusion + SHA = <HEAD>
git show origin/ci-evidence:docs/tracking/guards-last-failure.md | head -40
git show origin/ci-evidence:docs/tracking/e2e-last-failure.md | head -40
```

A red on `<HEAD>` that belongs to the previous turn: classify it (40-ci-evidence.md), fix it first at
its root in this turn, and name it in the report. STALE (SHA mismatch): do not wait; read it again
before the part the brief names.

## STEP 0 — record

1. Save the brief: write the text between BRIEF-BEGIN and BRIEF-END (title line and fence included)
   to `docs/governance/briefs/<file>.md` with the editing tool — no trailing edits, UTF-8, LF, one
   final newline. Then `sha256sum docs/governance/briefs/<file>.md` and compare with the value the
   carrying message states; a difference is a STOP (paste both values).
2. `roadmap.md`: line 3 names the brief in force; tick the previous turn's line as the brief says;
   add the next line(s) it dictates; tick nothing else.
3. Commit: `git add docs/governance/briefs/<file>.md roadmap.md && git commit -m "turn <NN>: step 0 — brief saved"`
   (it lands with the first stop or the end).

From here the scope guard allows the brief's SCOPE block. Proceed to the parts in the brief's order.
