RULING — cursor-bundle-7a, stop 4: the re-land onto `cursor/bundle-7a-2`. Base: cursor/bundle-7a 662d5fa2a; dev 3123c75e4

**MODEL — Claude Sonnet 5.5, in the SAME Cursor chat (it is stopped at STEP 5).**

Your proposal is right and is ruled as you wrote it, with the details below. Ruling 2 as you saved it is the supervisor's file: both read `aa98e09787098f32b33974842cd7d7723b9b28afa1f892fd0d1c8a21e4eaf5f2`.

PREVENTION (G70)

- Class 1 — a run classed by one failed job (S791, mine). I classed run 45664029304 as preflight-only ("STAGING BEHIND") and told you so, without listing its failed jobs. "Component tests" and "First-paint bundle budget" were red too. §8's class (a) holds only when the preflight and its dependents are the only failures.
  - Instructions — in force now: every CI classification first lists every job of the run whose conclusion is not success (the jobs API, by name), and names a class only for that whole list.
  - Repository, Cursor rules, Knowledge — not needed. Your report read the run whole; the slip was my reading.
- Class 2 — two lanes judged disjoint once, then both grew into the same files (S792, mine). I checked Lovable 10b against your lane at `d8bc2ea07` and found no file in both. Then 10b's ruling 2 changed eleven ceiling lines and your step 4 changed seven, with the maps, and I let #106 merge without running the trial merge again.
  - Instructions — in force now: before the operator merges one lane while another is open, the supervisor runs `git merge-tree --write-tree` of the open lane against the dev that merge would make, and names any conflict and its cost to the operator first.
  - Repository: INC-1295 (Cursor bundle 8) owns the class. If the census stops committing the usage maps, two of these four files go away; the page limits stay a committed ratchet.
  - Cursor rules, Knowledge — not needed.

WHAT THE SUPERVISOR CHECKED (a fresh fetch of `662d5fa2a` and of dev `3123c75e4`)

- Run 45664029304: the jobs not green are exactly "Component tests" and "First-paint bundle budget (gzipped ceiling)". Pull request #105: mergeable false, state dirty.
- `git diff --name-only db0b43c9c cursor/bundle-7a`: 56 paths (22 added, 34 changed, none deleted).
  - The paths dev also changed since `db0b43c9c` are exactly your four.
  - `git merge-tree` names the two maps and `scripts/route-budgets.mjs` as conflicts. It merges the allowlist by text, and a merged line key need not point at its line (INC-1293).
- dev has no new migration since `db0b43c9c`, so the five files keep their order and their marks.
- The tests dev changed since `db0b43c9c` that pair one of file B's sixty moved codes with a status:
  - one contradicts the new table: the fixture `gone` (`src/components/shell/failure-notice.test.tsx:32`, `listingNotAvailable` at 400), which FN-U3 and FN-U11 read;
  - the others agree with it: a 409 read by its status first in `failureKind` (`src/components/shell/failure-reason.test.ts:71`, `listingNotAvailable`), and `src/features/admin-locations/export-words.test.ts` :27, :35, :43 (404).

DECISIONS

1. RE-LAND by rule 00 §Git's own steps.
   - Run `git switch -c cursor/bundle-7a-2 origin/dev`, with origin/dev at `3123c75e4`. If dev has moved, stop and say so.
   - Copy each path of `git diff --name-only db0b43c9c cursor/bundle-7a` by script (`git show cursor/bundle-7a:<path> > <path>`), except the four of decision 3.
   - Prove the copy: `git diff --stat cursor/bundle-7a -- <those 52 paths>` prints nothing.
   - Then save this ruling as `docs/governance/briefs/cursor-bundle-7a-ruling-3.md` by scripted copy (sha256 in the carrier).
2. The five migration files stay byte for byte. Your report gives the sha256 of each, equal on both branches. There is no migration stop: ethio-staging holds A to E, read back at 17:36Z.
3. The four files made on the new base:
   - (a) the two usage maps, by `bun run i18n:usage` on the final tree;
   - (b) `scripts/route-budgets.mjs`, starting from dev's file and measured on your own build of the final tree:
     - each page inside the NEAR band or over gets a DEC-296 sentence placed first in its comment, with dev's sentence kept after it, and the number set by `ceilingForLocal`;
     - the cause is given chunk by chunk (DEC-355): the sixty refusal-status rows in the `reader-failure` chunk, with that chunk's growth in KiB against a build of dev `3123c75e4` that you name;
     - an unexplained growth is a STOP;
   - (c) `scripts/conformance/provider-errors-allowlist.txt`: dev's file, with your one line's key moved to the line the copied `src/server/imports/route.test.ts` holds; CF-PROVERR (`scripts/conformance/provider-errors.test.ts`) passes;
   - (d) the test below.
4. THE BRIEF'S SCOPE GROWS BY `src/components/shell/failure-notice.test.tsx`.
   - It is yours to edit. No Lovable lane is open, and the edit follows from this turn's own status move. Name it under §10.
   - The 404 alone is not enough; I ran it on a simulated re-land (dev `3123c75e4` with the lane's files copied as decision 1 says). FN-U3 passes. But FN-U11 then reads "gone" at once (status first) and no longer waits for the reader. FN-U6, which runs after it, then finds the reader pending.
   - So make exactly two edits:
     - the fixture `gone` (:32) takes `status: 404`; FN-U3 reads it unchanged;
     - FN-U11 gets its own fixture, a door refusal the table keeps at 400. Add `const refused = Object.assign(new Error("badValue"), { code: "P0D01", status: 400 });` beside the others. FN-U11 renders `refused`, and expects `failure.server` at once and `failure.refused` once the reader arrives. Its purpose and its place, first in the file, stay.
   - With these two edits, `failure-notice.test.tsx` and `failure-reason.test.ts` pass on the simulation, 26 of 26.
   - If the gate finds any other test red because a moved code's status changed, fix it the same way: its fixture takes the code's new status, and its purpose stays. Name each one. Any other red is a STOP.
5. Roadmap line 3 stays as the copy brings it (it names `cursor-bundle-7a.md`).
6. Then STEP 4 to STEP 6 as ruling 1 says:
   - `bun run checks` once on the final tree;
   - the self-review;
   - the one push;
   - open the new pull request into dev, with #105's title plus "(re-land of #105)" and a body that says it replaces #105;
   - write the report while CI runs. It pastes the new run's smoke-lane `advisors:` lines and the step's seconds (ruling 2, decision 3).
   - The operator closes #105 unmerged once the new one is green. You delete nothing.
7. DEC-414's count: this stop is the supervisor's (S791, S792), not yours.

NUMBERS ASSIGNED (G66): S791, S792 (the supervisor's). No new INC or DEC.
