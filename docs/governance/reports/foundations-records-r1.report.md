# Records turn R1 — the block applier (register row 58) and the incident ledger's first half, INC-847 … INC-900

Base: e9ee79f7ae83011194ea424889f9f8c047884f7b · Final commit: 393c04b · Brief: docs/governance/briefs/foundations-records-r1.md (sha256 d4505130a068e21f9eeef27a76fc7768130c508cd71e11fc92bc2698d3d8e64e)
Review: READY · 0 BLOCKER · 2 MAJOR · 6 MINOR · on 393c04b

## 1. Done / not done, by part and step

- Part A — done. `git rev-parse HEAD origin/dev` → e9ee79f7ae83011194ea424889f9f8c047884f7b twice; origin/dev = BASE, so no BASE..origin/dev diff. CI on BASE: SUCCESS (section 11); the failure logs were not read (not owed on SUCCESS).
- STEP 0 — done (96823c7). The brief was copied by script from this session's transcript (the carrying message's text between BRIEF-BEGIN and BRIEF-END), not retyped: 91868 bytes, sha256 d4505130a068e21f9eeef27a76fc7768130c508cd71e11fc92bc2698d3d8e64e, equal to the carrying message's values. roadmap.md line 3 was changed with the editing tool as the brief says.
- Part B — done (a54535c). B1: apply-blocks.ts and apply-blocks.sh were written with the file-writing tool, and both match the brief's hashes. B2:
  - `--dry` → `FILE scripts/brief/apply-blocks.test.ts (7596 bytes)` · `applied 1 block(s) to 1 file(s)` · `(dry run: nothing written)`.
  - Without `--dry` → `FILE scripts/brief/apply-blocks.test.ts (7596 bytes)` · `applied 1 block(s) to 1 file(s)`.
  - B3 → `Test Files 3 passed (3)` · `Tests 9 passed (9)`.
- Part C — done (393c04b). C1 printed the same six lines for the dry run and for the real run: `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/features/e2e-harness.md #1` · `EDIT docs/governance/mechanisms.md #1` · `EDIT docs/_changelog.md #1` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `applied 6 block(s) to 5 file(s)`, both runs exit 0. C2: `grep -c '^## INC-'` → 777, which is BASE's 723 + 54. The three anchors, in order: `4950:## INC-847 — My listings ("seller center") first show` · `5162:## INC-900 — stored category pictures are PNG with a ` · `5166:Numbering: next free INC-901 — INC-901 … INC-937 ar`.
- THE CHECKS — done (section 5). THE INDEPENDENT REVIEW — done (section 10). THE COMPLETION REPORT — this file.

## 2. Files changed

`git diff --name-only e9ee79f7ae83011194ea424889f9f8c047884f7b..HEAD`:

```
docs/_changelog.md
docs/features/e2e-harness.md
docs/governance/briefs/foundations-records-r1.md
docs/governance/mechanisms.md
docs/tracking/incidental-findings.md
roadmap.md
scripts/brief/apply-blocks.sh
scripts/brief/apply-blocks.test.ts
scripts/brief/apply-blocks.ts
```

Plus this report. The new files are tracked: `git ls-files` lists docs/governance/briefs/foundations-records-r1.md, scripts/brief/apply-blocks.sh, scripts/brief/apply-blocks.test.ts and scripts/brief/apply-blocks.ts.

## 3. Behaviour contract

Nothing in the product changes: `git diff e9ee79f7… --stat -- src e2e supabase` is empty.

| Thing | BASE | Now |
| --- | --- | --- |
| The applier | absent | `bash scripts/brief/apply-blocks.sh <brief> [--dry] [<path> …]`: exit 0 with one line per block; exit 1 with `APPLY REFUSED (nothing written): …` on a refusal; exit 2 with a usage line when no argument is given |
| The incident ledger | ends at `Numbering: next free INC-847.` | INC-847 … INC-900 and the new numbering line in its place; the old numbering line is the only line removed |
| The harness doc | — | gains one paragraph at its end |
| The register | — | gains row 58 |
| The changelog | — | gains the R1 line |
| The roadmap | — | line 3 (STEP 0), the 34c-4 line extended, the INC-937 line added, 34d ticked, the R1 line added |

The `sha256sum -c` of the brief's hash list printed OK for all 7 files.

## 4. Censuses

- The applier's consumers at BASE: `git grep -l 'OLD-BEGIN' e9ee79f7… -- scripts .claude` prints nothing (exit 1). At HEAD the same grep finds only scripts/brief/apply-blocks.ts and scripts/brief/apply-blocks.test.ts.
- INC headings at BASE: `git grep -c '^## INC-8[4-9][0-9]\|^## INC-900' e9ee79f7… -- docs/tracking/incidental-findings.md` → 7. These are INC-840 … INC-846, listed by `grep -o`. None falls in INC-847 … INC-900.

## 5. Tests

BA-1 … BA-5 are new (scripts/brief/apply-blocks.test.ts), and all five pass. They test new behaviour, so no red run is owed (G38).

Runs:
- `bunx vitest run` on apply-blocks.test.ts, wired.test.ts and non-null.test.ts → `Test Files 3 passed (3)` · `Tests 9 passed (9)`.
- `bun run test:unit` → `Test Files 327 passed (327)` · `Tests 2001 passed (2001)`.
- `bun run lint` → `✖ 39 problems (0 errors, 39 warnings)`.
- `bun run typecheck` → exit 0.
- `bun run i18n:usage` → `1736 keys across 593 files`; neither map moved (`git status --short` empty).
- `bun run build` → completes.
- `bun run format:check` → `All matched files use Prettier code style!`.

E2E: none owed. No file under e2e/ or src/ changed, so no J-audit line is owed either.

## 6. K2 — siblings that bypass the mechanism

- No other script applies brief blocks: the `OLD-BEGIN` grep in section 4 finds nothing at BASE.
- The ledger already held no number in INC-847 … INC-900 (section 4).

## 7. Allowlists and guards

- No allowlist changed: `git diff --stat e9ee79f7..HEAD -- 'scripts/conformance/*-allowlist.txt'` is empty.
- The guard for row 58 is BA-1 … BA-5.
- wired.test.ts passes with apply-blocks.sh named by apply-blocks.test.ts.

## 8. Strings

None (no-new-string). `git diff e9ee79f7..HEAD -- 'src/i18n/locales/*' | wc -l` → 0.

## 9. Migrations

None (no-migration). `git diff --name-only e9ee79f7..HEAD -- supabase/migrations` is empty.

## 10. Departures

1. **STEP 0's copy.** The brief was saved by a scripted copy from the session transcript (jq → awk → cp), not with the editing tool. The reason is the rule's own: a long text that moves is copied by script, never retyped. The byte count and sha256 equal the carrying message's values. roadmap.md was edited with the editing tool as the brief says.
2. **The review ran in the background.** It was asked for in the foreground (`run_in_background: false`), but the platform started it in the background. The turn waited for its answer (a foreground wait on its verdict line) before this report was written.
3. **The reviewer's findings — none fixed.** The brief's hash list fixes scripts/brief/* byte for byte as the files stand at the end of the turn, and EXACT TEXT forbids hand edits to Part C's texts. So no fix inside SCOPE is allowed by the brief's text, and each finding is listed here for a ruling:
   - **MAJOR 1 — row 58 has no conformance census of K3's form.** BA-1…5 test the applier itself; nothing in scripts/conformance through kit.ts fails if a second applier appears later. The register row says "none" for guard debt. The reviewer adds that a strict reading of K3 makes this a BLOCKER.
   - **MAJOR 2 — a malformed block is dropped silently (apply-blocks.ts:34-62).** `parseBlocks` keeps only what BLOCK_RX matches. An EDIT whose `NEW-END`, or a FILE whose `FILE-END`, is mistyped as the brief's last block is skipped without a refusal. The reviewer proved it with a scratch probe: `["EDIT r.md #1","applied 1 block(s) to 1 file(s)"]`, exit 0. Its proposed fix: refuse any marker line outside the spans the matcher consumed, and plant tests for a trailing run-on and a FILE run-on. This turn's own runs were checked against the brief's expected lines and matched (section 1).
   - **MINOR 1** — EDIT numbers (`#n`) are not checked: a duplicate, a gap or an out-of-order number passes.
   - **MINOR 2** — BA-5 proves by text (`toContain`), not by behaviour.
   - **MINOR 3** — BA-4's `mkdtempSync` directory is never removed, and the applier's stdout and stderr go into the unit log.
   - **MINOR 4** — `bun run typecheck` (tsconfig `include`) does not cover scripts/. This is the existing setup; the reviewer's standalone tsc run compiled apply-blocks.ts and its test clean.
   - **MINOR 5** — no docs/features file for the tooling mechanism (H1). The brief named none.
   - **MINOR 6** — "nothing written" holds for refusals only: writes go file by file, so an I/O error on the second file leaves the first one written.
   - **For the supervisor's G51 check (not counted by the reviewer):** INC-900's "buckets have no mime restriction" is already visible in the public migrations.
4. No STOP and no ruling in this turn.

## 11. CI

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e9ee79f7ae83011194ea424889f9f8c047884f7b` (short `e9ee79f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-27T02:22:53Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40436029815
```

Two-step check: the conclusion is SUCCESS, and the reported commit is BASE = origin/dev (the last landed commit). This landing's run has not completed.

## 12. Limits

- No browser test was run; none is owed, since no file under src/ or e2e/ changed. CI on the landing runs every test.
- e2e-last-failure.md and guards-last-failure.md were not read, because CI on BASE was SUCCESS.
- The applier's own refusal paths were exercised only by BA-3 and BA-4, in planted scratch trees.
