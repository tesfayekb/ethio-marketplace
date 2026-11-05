# P-2 (a) — ruling 15, amendment 1 (saved verbatim)

````
RULING 15 — AMENDMENT 1 (replaces items 2 and 4; items 1, 3 and 5 stand). Base: cursor/p2-proof-caps fdba8a4ae.
MODEL — Opus 5.5 High.
VERIFIED: item 1 at 7e1edad2d — the header line plus hunks inside the two DO $proof$ blocks only (file 10 from :88, file 11 from :173); marks, grants and function bodies unchanged. Ruling 15's step 2 told you to merge dev — rule 00 §Git forbids it; that was the supervisor's slip (S540).

A. Open the draft pull request now for cursor/p2-proof-caps (`gh pr create --draft`). If GitHub's API fails again, say so in one line and go on — the operator opens it from the web. Its CI is the 1/1/1 proof; do not wait for it.
B. The stale comment (file 10 :84–:87, and the matching comment above file 11's proof, if any): rewrite it to describe the new scenario (C+1 cities in one region, the primary saved last, exactly the last other removed). A comment is not a schema statement — item 1's byte-for-byte list named comments too widely (decision mine). Nothing else outside the proof blocks changes.
C. Item 3 (the census) now, before the wait.
D. NEW STANDING RULE (in force now; the next Cursor-rules turn installs it): while two lanes are open, a lane's pull request does not edit docs/tracking/incidental-findings.md, docs/governance/mechanisms.md, docs/_changelog.md, or any line of roadmap.md but line 3 (rule 00 step 0's "The brief in force"). Its records go verbatim into a "Records" section of its own report; the records turn lands them. Item 4 (replaced): INC-1067's entry and the two roadmap lines go into your report's "Records" section.
E. Save this amendment as docs/governance/briefs/p2-proof-caps-amendment-1.md; commit; push. Then WAIT: stop with one line until the db-proof lane's replacement pull request (branch cursor/db-proof-2) is merged into dev; the operator sends "continue".
F. Item 2 (replaced), after "continue": `git fetch origin dev`; `git switch -c cursor/p2-proof-caps-2 origin/dev`; write every file your branch changed except roadmap.md from your branch's head (`git show <head>:<path> > <path>`; `git diff --stat <head> -- <those paths>` empty); write roadmap.md line 3 fresh (your brief; "Previous:" = dev's line 3). Plant ONE uncommitted migration file sorted between 20261105080104 and 20261105080105 that sets coverage_plans 'free' to 2/2/2 (`WHERE plan = 'free'`); `bun run db:proof --fresh` → PASS; delete the planted file; `bun run db:proof --fresh` → PASS at 1/1/1; `git status --short` clean. Push; open a new pull request (ready) naming the first as replaced; END. Report: both db:proof lines, the copied-file list with the empty stat, the census, the Records section.
````
