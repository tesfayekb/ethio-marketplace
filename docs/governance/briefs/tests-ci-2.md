THE TESTS AND CI TURN 2 — the queued items of roadmap line 31: the Feed bench's seed and its schedule (INC-1181, INC-1182), a security-class finding with the Lovable branches' platform commits (INC-1186, INC-1168 (c)), the budget judged on every dev push that changes `src/` and the ceilings ratcheted (INC-1190, INC-1198), the preview's import cycle (INC-1193), three migration guards onto the reader and one that passes when its reader fails (INC-1205, INC-1207), the Lovable guard's test off the live list (INC-1206), two retried tests (INC-1210, INC-1015), and the table's width check (ACT-023). Base: dev 96b53abfe

Stem: `tests-ci-2` (brief `docs/governance/briefs/tests-ci-2.md` (new); report `docs/governance/reports/tests-ci-2.report.md` (new)). Tier B (CI, guards, tests), Tier A for INC-1186. FLAGS: no-migration, no-new-string, no-package-change, no-agents-change. PLAN FIRST: the census stops once. A NEW lane `cursor/tests-ci-2` from origin/dev, its own pull request into dev (a draft from the first push, ready at the end). Read first, whole: each item's entries in `docs/tracking/incidental-findings.md` (INC-1015, INC-1168, INC-1181, INC-1182, INC-1186, INC-1190, INC-1193, INC-1198, INC-1205, INC-1206, INC-1207, INC-1210), the ACT-023 line in `docs/tracking/action-tracker.md` or `roadmap.md`, and the previous tests and CI brief `docs/governance/briefs/tests-ci.md`.

PREVENTION (G70)
- Class (the supervisor's): queued items wait in the roadmap with their owner named, and nothing makes the turn that owns them come. Changed here: this turn takes the whole line. In force: after each foundations turn, the supervisor names the next turn that owns the queued line, by DEC-379's order.
- Carried: a test id is free across `src`, `e2e` and `scripts` (TI-1); a type is proven by `expectTypeOf`; an allowlist line reads `key | reason | until` with a date, `INC-<n>` or `DEC-<n>` (`scripts/conformance/kit.ts` `readAllowlist`).
Repository: the items below. Cursor rules, Knowledge: not needed.

THE SYSTEM (G0) — one header per item; the census confirms or corrects each.
1. INC-1181 + INC-1182 — CONCERN: the weekly Feed bench measures the feed at 100k listings without colliding with the nightly. MECHANISM: `.github/workflows/feed-bench.yml` (cron `10 16 * * 0`) and its seed script; `.github/workflows/nightly-e2e.yml` (crons `30 15 * * *` and `30 16 * * *`). COVERED: the seed spreads its rows over enough scratch sellers that the free-slot check stays cheap (the census reads the seed and names the count it chooses), and the bench's `timeout-minutes` is set from gate + seed + measure + cleanup measured on the dispatched run. DEC-412 (frozen here, G22): the bench's Sunday run moves at least two hours before the earlier nightly cron, and its new cron line is named in the report. Proof: one dispatched run of the bench on the lane, read whole.
2. INC-1186 + INC-1168 (c) — a security-class finding. Its substance comes from the supervisor in the chat at the census stop (G51), never in a committed file before its fix is live. The census reads INC-1168 (c) and states what (c) still asks.
3. INC-1190 + INC-1198 — CONCERN: every dev push whose tree changes `src/` gets the budget judged, and every ceiling sits close to its page. MECHANISM: the CI workflow's proven-tree skip (DEC-375), `scripts/check-bundle-size.mjs`, `scripts/route-budgets.mjs`. COVERED: the skip never skips the budget job for a push that changes `src/` (a CI test proves both sides). The ratchet: every ceiling comes down to its page plus the band the repository's rule names; the census names that rule and its file, and the report gives the table of every page, before and after.
4. INC-1193 — CONCERN: no import cycle the dev server exposes (`Cannot access enBase before initialization` on `/` and `/l/*` in Lovable's preview). The census finds the cycle by the import graph (file:line), and the fix breaks it at its cause. A guard: a cycle census over `src/i18n/` and its importers, with a planted cycle.
5. INC-1205 + INC-1207 — CONCERN: every migration guard reads SQL through the migration reader (register row 125) and fails when its reader fails. MECHANISM: `scripts/check-migrations.sh` (the spanning-literal guard near :918–:921; the three guards INC-1207 names). COVERED: each of the three moves onto the reader; the spanning-literal guard checks its reader's exit, as the random-text guard does since `tci-overlay-guards`. A planted failure of the reader proves each.
6. INC-1206 — `scripts/ci/lovable-branch-guard.test.ts` (near :398–:412) builds a fixture from the live `scripts/route-budgets.mjs`. It takes a fixture of its own, so a change to the live list can never change the test's verdict.
7. INC-1210 + INC-1015 — CL-E10 and SMN-E13 retried. Each cause is found from its failure bodies (the flake ledger and the e2e failure files on ci-evidence) and fixed at its cause, never by a retry or a raised timeout (G38). The repeat lane proves each.
8. ACT-023 — the shared table's checks refuse a column width its fixed layout ignores. The census reads ACT-023's line and the table checks (`scripts/admin-tables.test.ts` and the DataTable primitive) and says what the check must refuse.

SCOPE, by area (the census narrows it to files; each source file with its own tests): `.github/workflows/`; `scripts/` (the bench's seed, the migration guards, the budget scripts, `scripts/ci/`, `scripts/conformance/`, the table checks, each with its tests); `src/i18n/` and the modules in INC-1193's cycle; `e2e/` (the two retried specs and their helpers); `docs/features/`; `docs/governance/reports/` (this turn's census and reports); `roadmap.md` line 3; the turn's brief; `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`). Never a path rule 00 forbids.

THE CUT (G37): eight items, each small. If the census finds one larger than about ten source files, propose moving it out, and STOP.

THE TURN, IN THIS ORDER
STEP 0 — `git fetch origin && git switch -c cursor/tests-ci-2 origin/dev` (print the head; it must contain `96b53abfe`). `git status --short` is empty. Save this brief byte for byte as `docs/governance/briefs/tests-ci-2.md` (new) (scripted copy; its sha256 equal to the value after END BRIEF). Roadmap line 3: `The brief in force: docs/governance/briefs/tests-ci-2.md (the tests and CI turn 2 — roadmap line 31's queued items). Previous: ` followed by the line as it stands after "The brief in force: ". Remove from `scripts/conformance/briefs-allowlist.txt` every line keyed to another brief (today one line, keyed to `docs/governance/briefs/f1-doors-7d.md`). Run `bun scripts/brief/check-go.ts docs/governance/briefs/tests-ci-2.md` (the file saved here) and paste its output. Commit `tests-ci-2: task saved`; not pushed by itself. Go straight on to STEP 1.
STEP 1 — THE CENSUS, into `docs/governance/reports/tests-ci-2.census.md` (new). For each of the eight items, answer every item by its key word, or "CENSUS-ITEM <key>: not applicable — <why>":
- consumers — what each item's mechanism serves, by definition;
- definition — each item's files and lines, read at the base;
- tests — each touched file's tests, and the planted case each new guard needs; the next free id of each family;
- lists — the conformance allowlists, `wired.test.ts`, the register;
- old-file-readers — every test or script that reads a file this turn changes by path or text;
- second-readers — every dynamic `import()` and `vi.mock` of a module this turn changes;
- chunk-graph — INC-1193's import cycle, by the graph;
- environments — which workflow runs where and when;
- mechanisms — the migration reader (register row 125), the budget scripts, the proven-tree skip, read whole;
- first-download — every page's first download and its room to its ceiling, at the base;
- premises — every premise of this GO the tree makes wrong;
- callee-codes — not applicable (no door changes); say so;
- findings — beyond the task, file:line; a security hole is a STOP at once, described in the chat only (G51);
- queued — `rg -n "tests and CI" roadmap.md docs/governance/reports`, each item marked built here or left (where). `docs/governance/reports/tests-ci-2.stop-1.md` (new); STOP. This stop always happens: the supervisor gives INC-1186's substance and rules on the plan.
STEP 2 — items 1, 3 and 6 (CI and budgets). Commit `tests-ci-2: the bench, the budget and the guard's fixture`.
STEP 3 — items 4, 5 and 8 (the cycle, the migration guards, the table check). Commit `tests-ci-2: the cycle, the migration guards, the width check`.
STEP 4 — item 7 (the two retried tests) and item 2 (as ruled). Commit `tests-ci-2: the retried tests and the ruled finding`.
STEP 5 — `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; the touched files' unit tests; `bun run build && node scripts/check-bundle-size.mjs`; `bun run checks` (its fast line and last line pasted); the census's e2e ids by `--grep` in both Chromium projects through `bun run e2e:local` when the E2E values are set; `bun scripts/brief/check-go.ts docs/governance/briefs/tests-ci-2.md --at <the commit STEP 0 began from>`. Then the self-review (rule 80), BEFORE the push.
STEP 6 — push ONCE; `gh pr checks <number> --watch --interval 60`; dispatch the Feed bench on the lane once and read it whole. Handle what the runs show by the TOLERANCES, in at most one further code commit.
STEP 7 — the report, written while CI runs: rule 60's fourteen headings; §14 Records word for word; its push changes records only.

DECIDE-AND-NAME: the seed's seller count; the ratchet's per-page numbers; where each fix lives; the cycle's break. Name each under §10.

RECORDS (word for word into §14; the executor fills the bracketed parts)
DEC-412 — the Feed bench's Sunday run moves at least two hours before the earlier nightly cron ([the new cron line]); its seed spreads over [n] scratch sellers; `timeout-minutes` [n] from the dispatched run [id] (gate [s], seed [s], measure [s], cleanup [s]).
INC-1181, INC-1182 — status line: CLOSED — [DEC-412; the dispatched run's numbers].
INC-1190, INC-1198 — status line: CLOSED — [the skip rule's change and its test; the ratchet table's one line].
INC-1193 — status line: CLOSED — [the cycle, file:line; the break; the guard].
INC-1205, INC-1207 — status line: CLOSED — [the three guards on the reader; the exit check; the planted cases].
INC-1206 — status line: CLOSED — [the fixture].
INC-1210, INC-1015 — status line: CLOSED — [each cause, file:line; the fix; the repeat lane's run].
ACT-023 — status line: CLOSED — [the check and its planted case].
INC-1186, INC-1168 (c) — named by number only in this report (G51); the supervisor writes their records at the records turn after the fix is live.
roadmap — line 31: "DONE ([pull request])".

TOLERANCES (G60), by defect. A red is a STOP only when its failure names a path this turn changed and its cause is not one this brief's laws already handle. First download (DEC-355, word for word): a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number. A flake fix proven by a retry or a raised timeout is a STOP (G38). A transport failure is named under Limits and re-run once.

FINDINGS (G64): anything major beyond this task goes in §13 with file:line; a security hole is a STOP at once, described in the chat only, never in a committed file (G51).

LIMITS TO STATE: the E2E values may be absent in this chat; then the e2e ids are CI's to prove, and the report says so. The bench is dispatched from the lane by `gh workflow run`; if the sandbox cannot dispatch, say so and the operator dispatches it.
