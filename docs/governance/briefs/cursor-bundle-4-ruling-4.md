RULING — cursor-bundle-4, stop after ruling 3: the pull request conflicts with dev; merge dev once, the one conflict resolved by script. Base: cursor/bundle-4 63e91300c

Save this file bare as `docs/governance/briefs/cursor-bundle-4-ruling-4.md` (new) by a scripted copy; its sha256 is the carrier's. Save the package's `resolve.py` OUTSIDE the repository (`/tmp/resolve.py`, never committed); its sha256 is `abbe86279ed35d28af19c53966f418770b590fc9c5d83599226e996180787525`. Where this ruling and the brief or rulings 1 to 3 differ, this ruling governs.

THE OPERATOR'S WORD (2026-11-23, about 00:15 New York): one `git merge origin/dev` on this lane is allowed, ONCE, for this conflict. It is an exception to rule 00 §Git, not a change to the rule. Nothing else of merge, rebase, pull or cherry-pick is allowed.

PREVENTION
- CLASS (the supervisor's, S756): I simulated ruling 3's two lines on your head, and separately on my merge of your earlier head with dev. I never merged the ruled head with dev. `/admin/screening` sits on the line before `/admin/translations`, and Lovable's bundle changed `/admin/translations`, `/admin/translations_/$lang` and `/admin/users` on dev. Git refuses two changes to adjacent lines, so GitHub marks #96 DIRTY and builds no run. In force for the supervisor: a ruling that changes a file the other lane also changed is simulated as the ruled head merged with dev, and the merge must be clean before the ruling is sent. Repository: not needed (a conflicting pull request starts no run, so nothing lands). Cursor rules: listed for the next rules turn, as a question for the operator — may a supervisor's ruling order one merge of dev with a scripted, sha-proven resolution when a pull request conflicts? Knowledge: not needed.
- Your stop was right. You pushed once, saw no run, found the cause and did not merge.

WHAT THE SUPERVISOR READ
- `git merge --no-commit --no-ff origin/dev` on `63e91300c` in my clone, never pushed:
  - Exactly one file conflicts: `scripts/route-budgets.mjs`, in one region of four lines on each side.
  - The locale files and the two usage maps merge without a conflict.
- `resolve.py` keeps your `/admin/screening` line (350, ruling 3) and dev's three lines after it. The resolved file's sha256 is `d14916f74c05540f3012a6f12bde5be50f3550fd2e1e3c515d4de6fa85164190`.
- That file, and every file under `src/`, `scripts/`, `supabase/`, `e2e/`, `public/`, with `package.json` and `bun.lock`, equal my tested trial merge byte for byte. On that trial merge:
  - Types are clean.
  - `vitest run src` and `vitest run scripts`: every file passes.
  - `bun run i18n:usage` changes nothing.
  - `check-bundle-size` prints "Bundle budget OK."

THE STEPS
1. `git fetch origin dev cursor/bundle-4`. Then `git rev-parse HEAD origin/cursor/bundle-4 origin/dev` must print `63e91300c…` twice and `46d4e7b2119dcee9016bd1552131b720ce0bebc9`. If anything differs, STOP.
2. `git merge --no-ff --no-commit origin/dev`. Then `git diff --name-only --diff-filter=U` must print exactly `scripts/route-budgets.mjs`. Any other file: `git merge --abort` and STOP.
3. `python3 /tmp/resolve.py` must print `RESOLVED 1 region; sha256 d14916f74c05540f3012a6f12bde5be50f3550fd2e1e3c515d4de6fa85164190`. Then `git add scripts/route-budgets.mjs`, and `git diff --name-only --diff-filter=U` must print nothing. Anything else: `git merge --abort` and STOP; change nothing by hand.
4. Check the merged tree:
   - `bun run i18n:usage`: neither map changes.
   - Prettier on `scripts/route-budgets.mjs`.
   - `bun run typecheck`.
   - `bun run build && node scripts/check-bundle-size.mjs`: "Bundle budget OK."
   Any failure: `git merge --abort` and STOP.
5. Save this ruling (the scripted copy above) and add it. The report:
   - §10 gets one line: ruling 4, one merge of dev by the operator's word, the conflict resolved by script, sha `d14916f7…4190`.
   - §11 states that the run of the merge commit is the judged run.
   Add both, then commit the merge with the title `Merge dev 46d4e7b21 into cursor/bundle-4 (ruling 4: route-budgets resolved by script)`.
6. Push once, with no force. Then `gh pr checks 96 --watch --interval 60`. This run builds the merged tree, the migration preflight included.
7. Green: write the comment per rule 00, and the pull request stays a draft until I say the run is green. Red: STOP, name the job and its first error line.

THE BRIEF'S SCOPE GROWS BY: nothing (the merge brings dev's files as they stand on dev; the only file you write is `scripts/route-budgets.mjs`, by the script). Never a file SIDE BY SIDE gives to Lovable, and never `.github/`.

RECORDS (§14): none new. S756 is the supervisor's and lands at the records turn.

IN YOUR ANSWER: the printed lines of steps 1 to 3; step 4's four results; the merge commit's sha; the run and its verdict.
