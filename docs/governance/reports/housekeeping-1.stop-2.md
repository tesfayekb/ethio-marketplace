QUESTION — housekeeping-1 part C: ruling 1's own Q6 line fails CF-BRIEF-2 (the allowlist cannot stay empty)
DONE: STEP 0, STEP 1, ruling 1 saved (6877c3077), parts A + D (b0afddb79)
LEFT: part C (written, not committed — red on the tree, below), part B, STEPS 6 → 8
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `129f9360db4201672cff6d80a3d426d8e7c4457a` (short `129f936`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-10T09:33:57Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42788538842
FILES:
docs/governance/briefs/housekeeping-1-ruling-1.md
docs/governance/briefs/housekeeping-1.md
docs/governance/reports/housekeeping-1.stop-1.md
docs/governance/reports/housekeeping-1.stop-2.md
roadmap.md
scripts/ci/laws-changed.ts
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts

Base: dev 2b11a9d29 (`git rev-parse --short=9 origin/dev` after `git fetch`: dev did not move).

## What is done

Parts A + D, commit b0afddb79 `housekeeping-1: part A+D — the checks tell a machine limit from a
defect`, built to ruling 1 (Q1–Q5, Q7, INC-1096):

- turn-checks.ts: the platform reader (a pinned asset's machine read from the step's own text;
  NOT RUN with `pinned binary <os>/<arch> (<asset>); this machine <platform>/<arch>`), `--no-tests`
  (test steps by text, `bun run <script>` expanded through package.json; LAWS_CHANGED_UNITS carries
  `tests: true`; an unknown argument exits 2), R4 on budget-band.mjs's `NEAR_KIB` and `judgedSize`
  (its own `NEAR_KIB` and raw compare gone; NOTE lines; never FAIL), `budgetVerdict` (a NEAR-only
  budget failure is PASS), `briefBase` through `briefInForce`.
- laws-changed.ts: `briefInForce(roadmap)`, used by `turnBase`.
- nightly-hour.sh: :40 names `${ZONE}`; the header names GNU date. nightly-hour.test.ts:
  `describe.runIf(hasGnuDate)`, NH-6 `it.runIf(process.platform === "linux")`, NH-7.
- Red first, on the base code: TCK-5, TCK-7, TCK-8, TCK-9 failed (`Tests 4 failed | 10 passed`);
  NH-7 failed on the base script's message (`Tests 1 failed | 5 passed | 1 skipped`), as Q2(b) said.
- TCK-9's lines are copied from two real runs of check-bundle-size.mjs in a scratch tree
  (/tmp/ethio-scratch/housekeeping-1/budget-tree, one page's ceiling moved): every line found
  byte-equal in its capture (budget-near.txt sha256 9edfa2f7…d7b6, budget-over.txt 99b6f090…c902).
- After: `bun run typecheck` exit 0; `bunx vitest run scripts --maxWorkers=2`: `Test Files 99
  passed (99)`, `Tests 507 passed | 1 skipped (508)` (the skip: NH-6, this machine is darwin).

## The question

Part C is written to Q6 and Q8 (briefs.test.ts, briefs-allowlist.txt with no line). CF-BRIEF-4 was
shown red first (the two checkers emptied: `Tests 1 failed | 2 passed`), and the planted bypass
works (appended to the ruling file and restored, sha256 equal again: CF-BRIEF-2 and CF-BRIEF-3
named the planted lines). But on the real tree CF-BRIEF-2 has one finding, in ruling 1 itself:

```
docs/governance/briefs/housekeeping-1-ruling-1.md:11 any red
```

The sentence, as the rule splits it: "Q6 — (a). A phrase inside double quotes (straight or curly)
is a quotation and is skipped, beside the negation window; the allowlist stays empty at birth; the
planted `Any red is a STOP.` (unquoted) still fails CF-BRIEF-4." The split is at `.` `;` `!` `?`
followed by white space, so the last clause is one sentence: "the planted `Any red is a STOP.`
(unquoted) still fails CF-BRIEF-4." It holds "any red" and STOP, no negation word, and the phrase sits
in a code span, not in double quotes. Q6's rule and "the allowlist stays empty at birth" cannot both
hold on this ruling. The brief itself passes (CF-BRIEF-1, -2, -3).

Options:

- (a) Recommended. A Markdown code span (`` `…` ``) is a quotation too, beside straight and curly
  double quotes: one more alternative in the test's QUOTED pattern. The allowlist stays empty;
  CF-BRIEF-4's planted `Any red is a STOP.` (plain text) still fails; CF-BRIEF-4 gains a code-span
  form among the forms that pass. Cost: a stop rule written inside backticks also passes. The
  test's comment already says the law guards carelessness, not evasion.
- (b) One allowlist line at birth: `docs/governance/briefs/housekeeping-1-ruling-1.md:11 any red |
  ruling 1 quotes the planted line CF-BRIEF-4 fails, in a code span | <until>`. It goes stale, and
  fails, the day line 3 names the next brief (the file is no longer read), so turn 2's lane must
  remove it.
- (c) Ruling 1 is re-issued (a new file) with the planted text in double quotes. The saved
  ruling-1 file stays as it is (sha256 d8bfd62f…9878).

Part C's two files are complete but not committed (a commit is never red); they stay as untracked
files in the worktree (copies in /tmp/ethio-scratch/housekeeping-1/). wired.test.ts is not yet
touched. Part B has not started: ruling 1 orders C before B.
