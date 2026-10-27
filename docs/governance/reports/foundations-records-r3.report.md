# Records turn R3 — the block applier hardened, and the decision ledger's block S77 and system-state.md's position

Base: 8898525cce8d7542e84f218beedb192d29fda03e · Final commit: 5aba175 · Brief: docs/governance/briefs/foundations-records-r3.md (sha256 ad92b7811dc91f831055633ece1353a2de303e8c12e255727a0b1d5680a35a25)
Review: READY · 0 BLOCKER · 1 MAJOR · 4 MINOR · on 5aba175

## 1. Done / not done, by part and step

- Part A: done. I switched from the session branch to `dev`. `git rev-parse HEAD origin/dev` printed `8898525cce8d7542e84f218beedb192d29fda03e` twice, so HEAD = origin/dev = BASE and there is no BASE..origin/dev diff. CI on BASE: SUCCESS (section 11). I did not read e2e-last-failure.md or guards-last-failure.md, as the brief says when BASE is SUCCESS.
- STEP 0: done (`e293298 records turn R3: step 0 — brief saved`). I wrote the brief with the Write tool. `sha256sum` gives `ad92b7811dc91f831055633ece1353a2de303e8c12e255727a0b1d5680a35a25` and `wc -c` gives 144815; both equal the carrying message's values. The file ends with the closing fence and one LF. I edited roadmap.md line 3 with the Edit tool, exactly as the brief says.
- Part B: done (`fd138a1 records turn R3 part B: the block applier hardened`). B1 and B2 are in section 5.
- Part C: done (`5aba175 records turn R3 part C: block S77, the position, the register and the roadmap`). C1 and C2 are in section 5.
- THE CHECKS: done (section 5). THE END-TO-END CHECK: none owed, because no file under src/ or e2e/ changed (section 12). THE INDEPENDENT REVIEW: done (section 10 says how it ran). This report: done. Landing: follows this commit.

## 2. Files changed

`git diff --name-only 8898525cce8d7542e84f218beedb192d29fda03e..HEAD` (before the report commit):

```
docs/_changelog.md
docs/features/brief-applier.md
docs/governance/briefs/foundations-records-r3.md
docs/governance/mechanisms.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
roadmap.md
scripts/brief/apply-blocks.test.ts
scripts/brief/apply-blocks.ts
```

Plus this report, docs/governance/reports/foundations-records-r3.report.md, in its own commit. The new files are proven by `git ls-files -- docs/features/brief-applier.md docs/governance/briefs/foundations-records-r3.md`, which prints both paths. Every path is in SCOPE or among the standing-allowance files the brief names. No file was deleted.

## 3. Behaviour contract

Nothing in the product changes: `git diff 8898525c --stat -- src e2e supabase` is empty.

| Function | At BASE (R1's applier) | Now |
|---|---|---|
| `parseBlocks`: a last EDIT that never ends | skipped silently (R1's reviewer probe printed `applied 1 block(s)`) | refused: `malformed — the marker "EDIT a.txt #1" on line 9 belongs to no whole block` (BA-1) |
| `parseBlocks`: a FILE-BEGIN with no FILE-END | skipped | refused, with its line (BA-1) |
| `parseBlocks`: a path's EDIT number repeated, skipped or not starting at 1 | accepted | refused: `out of order — the path's next EDIT is #n` (BA-1) |
| `parseBlocks`: a run-on EDIT (a marker inside OLD/NEW) | refused | refused, same message (BA-1) |
| `applyBlocks`: writes | one write call per file | one `io.writeAll` with every text (BA-2) |
| `writeAllUnder` (new): a file that cannot be staged | — (an earlier file was already written) | nothing written and no `.apply-blocks-staged` file left behind; exit 1 (BA-4) |
| Every other refusal message, `--dry`, usage exit 2 | as before | unchanged (BA-3, BA-4) |

The ledger gains block S77 after its last line. system-state.md gains its standing reads' two version names, the new position, and a superseded line above the 2026-10-23 paragraph; that paragraph's bytes are unchanged because it sits inside the block's NEW text as given. Register row 58 gains its census and notes. The roadmap gains INC-938, INC-939 and R3's line, and R2 is ticked. The changelog gains R3's line. The hash list in section 5 proves all of this.

## 4. Censuses

- The applier's one parser, re-located at BASE: `git grep -l 'OLD-BEGIN\|NEW-BEGIN' 8898525cce8d7542e84f218beedb192d29fda03e -- src e2e scripts .claude` printed `scripts/brief/apply-blocks.test.ts` and `scripts/brief/apply-blocks.ts`, as the brief expects. BA-6 holds the same census at HEAD and passes.
- K2's DEC census: `git grep -c '^- DEC-24[3-9] (\|^- DEC-2[5-6][0-9] (\|^- DEC-27[0-5] (' 8898525c… -- docs/spec/spec-ledger.md` printed nothing (exit 1). The ledger defined none of DEC-243 … DEC-275 before S77.

## 5. Tests and command output

- B1, R1's applier applying the new test and the docs page:
  ```
  FILE scripts/brief/apply-blocks.test.ts (11686 bytes)
  FILE docs/features/brief-applier.md (1744 bytes)
  applied 2 block(s) to 2 file(s)
  ```
  Then `bunx vitest run scripts/brief/apply-blocks.test.ts` was RED, as expected, and not committed. BA-1, BA-2 and BA-4 failed: `Tests  3 failed | 3 passed (6)`.
- B2, the new applier over the old: `FILE scripts/brief/apply-blocks.ts (8718 bytes)` · `applied 1 block(s) to 1 file(s)`. Then `bunx vitest run scripts/brief/apply-blocks.test.ts scripts/conformance/wired.test.ts scripts/conformance/non-null.test.ts`: `Test Files  3 passed (3)` · `Tests  10 passed (10)`.
- C1 printed the same lines with `--dry` (plus `(dry run: nothing written)`) and without it. Both runs exited 0:
  ```
  EDIT docs/spec/spec-ledger.md #1
  EDIT docs/governance/system-state.md #1
  EDIT docs/governance/system-state.md #2
  EDIT docs/governance/mechanisms.md #1
  EDIT roadmap.md #1
  EDIT roadmap.md #2
  EDIT docs/_changelog.md #1
  applied 7 block(s) to 5 file(s)
  ```
  After the run, `find . -name '*.apply-blocks-staged' -not -path './node_modules/*'` printed nothing.
- C2:
  ```
  4461:S77 · 2026-10-23 12:0xZ → 2026-10-27 11:55Z · BUNDLE 22 CLOSED (TURN 30
  4632:NUMBERING after this block: next free DEC-276 (DEC-275 drafted in turn 34e)
  73:Current position 2026-10-27, the Foundations bundle built
  75:(Superseded 2026-10-27 by the position above; the paragra
  ```
  The full line 4632 reads `… D239, INC-940, S455, ACT-021.` Section 10 covers how this differs from C2's quoted expectation.
- THE CHECKS:
  - `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-records-r3.md | sha256sum -c` printed OK for all seven files: docs/_changelog.md, docs/features/brief-applier.md, docs/governance/mechanisms.md, docs/governance/system-state.md, docs/spec/spec-ledger.md, scripts/brief/apply-blocks.test.ts and scripts/brief/apply-blocks.ts.
  - `git diff 8898525c --stat -- src e2e supabase`: empty.
  - `bun run lint`: `✖ 39 problems (0 errors, 39 warnings)`.
  - `bun run typecheck` (`tsc --noEmit`): no errors.
  - `bun run test:unit`: `Test Files  327 passed (327)` · `Tests  2002 passed (2002)`.
  - `bun run i18n:usage`: `i18n usage map: 1736 keys across 593 files (395 dynamic call sites)`; neither map changed.
  - `bun run build`: completed (nitro "You can preview this build").
  - `bun run format:check`: `All matched files use Prettier code style!`.
- Test ids: BA-1 … BA-5 were rewritten and BA-6 is new, all from the brief's FILE block for scripts/brief/apply-blocks.test.ts. The red-first evidence is B1's totals.
- E2E: none owed and none run (section 12). No file under e2e/ changed, so there is no J-audit line.

## 6. K2 — siblings that bypass the mechanism

- Code that parses brief blocks: none besides the applier. The greps are in section 4, and BA-6 walks src/, e2e/, scripts/ and .claude/ (ts, tsx, mjs, js, cjs, sh) and finds no other file that names `OLD-BEGIN` or `NEW-BEGIN`.
- DEC numbers DEC-243 … DEC-275 already defined in the ledger: none (section 4).

## 7. Allowlists and guards

- Allowlists: `git diff --stat 8898525c..HEAD -- 'scripts/conformance/*-allowlist.txt'` is empty, so no allowlist changed.
- Guards: BA-1 … BA-6 in scripts/brief/apply-blocks.test.ts all pass. BA-6 is the census, with its planted second parser (`scripts/other.ts`) named. scripts/conformance/wired.test.ts has `scripts/brief/apply-blocks.sh` in its domain, BA-5 names it by running it, and wired.test.ts passed in B2. non-null.test.ts also passed in B2, so the new applier adds no non-null assertion.

## 8. Strings

None, as the brief says (FLAGS no-new-string). `bun run i18n:usage` left both maps unchanged, and no file under src/ changed.

## 9. Migrations

None (FLAGS no-migration). `git diff --name-only 8898525c..HEAD` lists nothing under supabase/.

## 10. Departures

- C2's quoted expectation for the last numbering line reads "S454", but block S77's NEW text (C1) ends `S455, ACT-021.`, and the ledger now carries that text. The applier applied the brief's block exactly, and the file matches the brief's hash list (`docs/spec/spec-ledger.md: OK`). So I took the hash-proven block as the record and did not edit it. I list the gap between the brief's two texts here for the supervisor.
- The reviewer was asked to run in the foreground (`run_in_background: false`), but the platform started it in the background. I waited for its answer and wrote nothing past this draft until it arrived. While waiting, the bash guard refused a polling loop I wrote to watch the reviewer's output file ("no scheduling or service control from the executor (at)"); I took that refusal as final and did not retry it another way.
- The reviewer's findings are not fixed here and are listed for a ruling. scripts/brief/apply-blocks.ts, its test and docs/features/brief-applier.md are pinned by the brief's hash list, and the brief's EXACT TEXT rule allows changes only through its blocks. Any fix would break THE CHECKS' `sha256sum -c` and change brief text the brief does not allow me to change. The findings, in the reviewer's words, shortened:
  - MAJOR — an edited file loses its executable bit. `writeAllUnder` stages a fresh file and renames it over the target (apply-blocks.ts:161, :168), so a 0755 file comes back 0644. The reviewer reproduced it on a scratch root. Six tracked files are 100755, e.g. scripts/check-migrations.sh. Proposed fix: copy the target's mode before the rename, with a BA case.
  - MINOR — the rename step is not all-or-nothing. Only the staging loop is guarded, so a FILE block whose target is an existing directory leaves the earlier file renamed, a `.apply-blocks-staged` file behind and a raw stack trace instead of `APPLY REFUSED`. Directories made by `mkdirSync` also stay behind when staging fails. Three texts overstate this: brief-applier.md:25, the header at apply-blocks.ts:13–14 and the `Io.writeAll` comment at :31.
  - MINOR — BA-6's regex (apply-blocks.test.ts:75) looks only for `OLD-BEGIN`/`NEW-BEGIN`, so a parser that reads only `FILE-BEGIN`/`FILE-END` would pass.
  - MINOR — BA-6 is a local census in the mechanism's own test, not a scripts/conformance census through kit.ts (K3's form). This is the brief's stated decision, noted for the record.
  - MINOR — the brief contradicts itself on S454 / S455 (the first departure above). The record is not edited.

## 11. CI

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, read at Part A:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `8898525cce8d7542e84f218beedb192d29fda03e` (short `8898525`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-27T11:54:00Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40496361455
```

Two-step check: the conclusion is SUCCESS, and its commit equals BASE (the last landed commit). This landing's run has not completed.

## 12. Limits

- No browser test was run. None is owed, because no file under src/ or e2e/ changed; CI runs every test on the landing.
- `bun run typecheck` covers neither scripts/ nor .claude/hooks/ (INC-938), so the new applier and its test are type-checked by nobody. Vitest runs them without types.
- No test covers file mode or a failure during the rename step (the reviewer's MAJOR and first MINOR, section 10).
- Of the CI evidence I read only ci-status.md, because BASE was SUCCESS. I did not read nightly-status.md.
