RULING — tests-ci-2, after stop 4: the bench's limit covers the gate's whole wait (your MAJOR finding, INC-1230), seven more ceilings, then the one push. Base: cursor/tests-ci-2 3be465ac3.

The Feed bench has completed: run 44896403216, PASS. The quiet window is over. Your three local commits stand in the order you made them; name the order under §10.

PREVENTION (G70)
- Class (the supervisor's, S710): a limit computed from one measured run, where one part of the run has a designed maximum far above what was measured. The brief's rule said "gate + seed + measure + cleanup" and never said the gate counts at its maximum, so a 2 s gate gave a limit the gate's own 40 minutes cannot fit in. Your self-review found it. Changed here: decision 1, with a test that holds the two numbers together.
- Class: two lanes are open and both move page sizes; the one that merges second is judged against the first, and a Lovable branch cannot take dev in. Changed here: decision 2. This lane merges first and carries the ceilings for both, from the supervisor's build of the merged trees; Lovable's bundle never opens `scripts/route-budgets.mjs`. In force now for the supervisor: when two lanes are open and one holds the budget file, the merged trees are measured before the first lane's final push.
Repository: decisions 1 and 2. Cursor rules, Knowledge: not needed.

THE RULINGS
1. THE LIMIT (INC-1230). The job's `timeout-minutes` in `.github/workflows/feed-bench.yml` is the gate's maximum wait plus the run's own allowance: `GATE_WAIT_MINUTES` (`scripts/feed-bench.ts`) + 38 = 78.
   - The 38 is yours: half as much again of the measured run without its gate wait. It becomes a named, exported constant beside `GATE_WAIT_MINUTES`, with run 44896403216's numbers in its comment.
   - Every honest end (PASS, MISS, SKIPPED after the whole wait, YIELDED) is then the script's own exit with its status file; only a hang meets the limit.
   - One new test in `scripts/conformance/ci-deadlines.test.ts`, under its next free id: the workflow's number equals the sum of the two constants. Show it red with 38 planted.
   - DEC-412's comment in the workflow, its header and the paragraph in `docs/features/feed-engine.md` say the rule in these words: the gate's whole wait, plus half as much again of the measured run.
   - Whether the publish step runs after a job timeout stays unproven; say so under §10. It no longer decides an honest run.
   - The Sunday cron stands: 13:10 UTC plus 78 minutes ends before the nightly's 15:30 UTC.
2. SEVEN MORE CEILINGS, in `scripts/route-budgets.mjs`, beside your two (which stand as committed). Lovable bundle 1 (`lovable/bundle-1`, built, its pull request opens after this lane merges) grows these pages. The supervisor measured them with `bun run build` and `scripts/check-bundle-size.mjs` in a lock-exact clone, on this lane 3be465ac3 merged with dev 37b62562a and with `lovable/bundle-1` 4e421408d. The same build without Lovable's branch equals CI run 44894986213 on every page.

   | Page | local KiB | ceiling |
   | --- | --- | --- |
   | `/admin/listings` | 326.675 | 327 → 328 |
   | `/admin/listings_/$listingId_/edit` | 408.726 | 409 → 410 |
   | `/legal/publishing` | 207.612 | 208 → 209 |
   | `/my-listings_/$listingId` | 319.942 | 320 → 321 |
   | `/my-listings_/$listingId_/edit` | 400.844 | 401 → 402 |
   | `/post` | 400.823 | 401 → 402 |
   | `/post_/$listingId` | 400.791 | 401 → 402 |

   - Each line in DEC-296's local form: `DEC-296 (tests-ci-2, ruling 5): local <size> KiB on this lane merged with dev 37b62562a and lovable/bundle-1 4e421408d; <old> → <new> = ceilingForLocal(<size>); was <old>`, and the cause: Lovable bundle 1 (the posting pages' when-sentences and their readers, the overlay facade's late-press fix, two base-layer sentences), judged chunk by chunk on its own pull request.
   - Your tree holds neither L22c nor that bundle, so your build shows smaller sizes and these ceilings stand one or two KiB above your own. No guard refuses that (the ratchet speaks at its slack). The budget job of your push is the proof: read it before the report.
   - No other ceiling moves.
3. THE COMMITS AND THE PUSH. Two more code commits on top of your three: `tests-ci-2: the bench's limit covers the gate's whole wait (INC-1230)` and `tests-ci-2: seven ceilings for Lovable bundle 1 (DEC-296)`. Re-run only what reads the files they touch (the script tests that read the workflows, `scripts/feed-bench.ts` and `scripts/route-budgets.mjs`, found by grep and named under §10; prettier on the changed files; `bun run build && node scripts/check-bundle-size.mjs`). Then ONE push, the pull request ready, STEP 7. The report's CI line is the run of that push's head.
4. THE ORDER OF THE MERGES. This lane merges first. Nothing for you to do about the other.

RECORDS (word for word into §14, beside ruling 4's)
INC-1230 — the Feed bench's job limit was shorter than its gate's maximum wait plus its run: the gate waits up to `GATE_WAIT_MINUTES` for quiet staging inside the job, and the limit was half as much again of one measured run whose gate wait was short (60 from run 43872334867, then 38 from run 44896403216). A long wait ended in a job timeout with no honest SKIPPED status. Found by the executor's self-review. Class: a limit computed from one measured run where a part has a designed maximum. Mechanism: the job's `timeout-minutes` and the two constants in `scripts/feed-bench.ts`. Fix: the limit is the gate's whole wait plus the run's allowance, held together by [the test's id]. Status: CLOSED by [commit].
