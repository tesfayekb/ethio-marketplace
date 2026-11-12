STOP — housekeeping-3b part E (iv): the wired.test.ts assertion needs a file outside SCOPE
DONE: STEPS 0–1 (stop 1), parts A, B, C, D, and part E but its `wired.test.ts` assertion (commit d1b87b77d)
LEFT: part E's `wired.test.ts` assertion (CF-WIRED-3/4); STEPS 7 → 9
CI: the lane head's run, read at the ci-evidence branch before this file's commit (nothing of parts A → E
has been pushed yet):
# CI Status (auto-generated — do not edit by hand)

- Commit: `2fa93f6b18325df974cdeaa3cf6e6b10f0676130` (short `2fa93f6`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T01:25:39Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43133843360
FILES: this turn's, `git diff --name-only f3b215762` (60 paths at d1b87b77d), plus this file:
.gitignore
docs/features/ci-local-backend.md
docs/features/e2e-harness.md
docs/features/security-scanning.md
docs/governance/briefs/housekeeping-3b-ruling-1.md
docs/governance/briefs/housekeeping-3b.md
docs/governance/go-template.md
docs/governance/reports/housekeeping-3b.stop-1.md
e2e/admin-attributes-library.spec.ts
e2e/global-setup.ts
e2e/global-teardown.ts
e2e/helpers/account-language.ts
e2e/helpers/ad-page.ts
e2e/helpers/alias-check.ts
e2e/helpers/attribute-reap-plan.ts
e2e/helpers/auth-form.ts
e2e/helpers/categories.ts
e2e/helpers/category-menu.ts
e2e/helpers/countries.ts
e2e/helpers/exports.ts
e2e/helpers/locations.ts
e2e/helpers/posting.ts
e2e/helpers/reach-rows.ts
e2e/helpers/scratch.ts
e2e/helpers/translations.ts
e2e/helpers/ui.ts
e2e/helpers/users.ts
e2e/legal-admin.spec.ts
e2e/one-line-slots-admin.spec.ts
e2e/one-line-slots.spec.ts
roadmap.md
scripts/admin-tables.ts
scripts/brief/apply-blocks.ts
scripts/brief/go-laws.ts
scripts/budget-band.d.mts
scripts/bundle-closure.d.mts
scripts/ci/redact.py
scripts/ci/redact.test.ts
scripts/ci/redaction-rules.json
scripts/ci/start-failure-excerpt.d.mts
scripts/ci/start-failure-excerpt.test.ts
scripts/ci/step-failures.d.mts
scripts/ci/step-failures.test.ts
scripts/conformance/briefs.test.ts
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/package-price.ts
scripts/conformance/pattern-sites-allowlist.txt
scripts/conformance/pattern-sites.test.ts
scripts/conformance/vendor-seams-scan.ts
scripts/conformance/wired.test.ts
scripts/destructive-red.ts
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/e2e-select.ts
scripts/en-baseline-heal.ts
scripts/list-action-labels.ts
scripts/route-budgets.mjs
src/i18n/provider-d239.test.tsx
src/i18n/provider.tsx
docs/governance/reports/housekeeping-3b.stop-2.md (this file)
(`git diff --name-only 2b11a9d29` prints 332 paths: the bundle's earlier turns on this lane plus
the above; `git merge-base origin/dev HEAD` = 2b11a9d29, and `origin/dev` has not moved.)

## The conflict

Ruling 1, Q4 (a): "the `wired.test.ts` assertion that every `.mjs` a `scripts/` TypeScript file
imports has a `.d.mts` beside it exporting each imported name". Six scripts/ TypeScript files import
five `.mjs` modules. Four of those now have their `.d.mts` (step-failures, start-failure-excerpt,
budget-band, bundle-closure). The fifth, `scripts/route-budgets.mjs`, already had
`scripts/route-budgets.d.mts`, but it declares only `SHARED_SHELL_MODULES` and `sharedShellOwns`.
Its importers take four more names:

- `scripts/bundle-closure.test.ts:23` imports `ENTRY_CLOSURE`;
- `scripts/conformance/card-tiers.test.ts:6` imports `CARD_PAGES`, `TIER_FLAG_MARKER`,
  `tierFlagViolations`.

The assertion as ruled, written and run on the tree (kept aside, not committed —
`/tmp/ethio-scratch/housekeeping-3b/wired.test.part-e.ts`), prints exactly those four:

```text
+   "scripts/bundle-closure.test.ts imports ENTRY_CLOSURE: scripts/route-budgets.d.mts lacks it",
+   "scripts/conformance/card-tiers.test.ts imports CARD_PAGES: scripts/route-budgets.d.mts lacks it",
+   "scripts/conformance/card-tiers.test.ts imports TIER_FLAG_MARKER: scripts/route-budgets.d.mts lacks it",
+   "scripts/conformance/card-tiers.test.ts imports tierFlagViolations: scripts/route-budgets.d.mts lacks it",
```

The compiler says the same independently. The F1 measurement (ruling 1, item 7) at f3b215762 prints
`error TS2305: Module '"./route-budgets.mjs"' has no exported member 'ENTRY_CLOSURE'` at
`bundle-closure.test.ts(23,10)`, and the same for `CARD_PAGES`, `TIER_FLAG_MARKER` and
`tierFlagViolations` at `card-tiers.test.ts(6,…)`.

SCOPE holds `scripts/route-budgets.mjs` "for ceilings only" (ruling 1, Q3), and
`scripts/route-budgets.d.mts` is not in it. Stop 1 named the file as existing (its "nothing names
them" line) but not as incomplete: my census missed it. Rule 00 §Scope: "A file you need that your
scope does not cover is a STOP naming the file and why." So the assertion is not committed: a
commit is never red, and its planted half (CF-WIRED-4) would land without its tree half.

## The question

Q1 — Does SCOPE gain `scripts/route-budgets.d.mts`, to add these four declarations (typed from
`scripts/route-budgets.mjs` :90, :91, :99, :248)?

```ts
export const CARD_PAGES: string[];
export const TIER_FLAG_MARKER: string;
export function tierFlagViolations(
  pages: ReadonlyArray<{ id: string; closure: readonly string[] }>,
  textOf: (name: string) => string,
): string[];
export const ENTRY_CLOSURE: Record<string, readonly string[]>;
```

If YES, the assertion (CF-WIRED-3 over the tree, CF-WIRED-4 planted) and the four lines land in
one commit, `housekeeping-3b part E: every .mjs a script imports is declared`. Its line goes in the
`ci-guards.md` paragraph on `wired.test.ts`. Then STEP 7 and on. If NO, the assertion as ruled
cannot be green; it would have to be narrowed to the four files this turn declares, which departs
from Q4 (a)'s "every `.mjs`" and needs its own ruling.

## Where part E stands (commit d1b87b77d)

- (i) The GO checker:
  - Law 3's K1 clause is `newTestFindings` (CF-BRIEF-3, a tree law).
  - Law 11 reads a title after `commit (` or `Commit (`; a backtick before it stays a quotation, as
    the brief's own line 51 shows.
  - Law 10's message and template line 25 now read `COUNT: N := COMMAND`.
  - Cases are in `briefs.test.ts` (12 passed).
- (ii) The template: the consumers, premises and first-download census lines, and STEP 0's check-go
  sentence.
- (iii) LGA-22 is on `grantScratchRole`. CF-HELPERS-1 refuses a spec's `.from("roles").insert(`.
  - Red-first: the base spec gives "e2e/legal-admin.spec.ts:1153 inserts a role inline".
  - `e2e/legal-admin.spec.ts`, whole, `desktop-1280`, 0 retries, locally: 22 passed, LGA-22
    included (4.8 s); exit 0.
- (iv) Four `.d.mts`; both `@ts-expect-error` lines removed. Their importers' tests pass (37 across
  six files).
- (v) `.gitignore` ignores `__pycache__/`.
- (vi) `selfTestFailureLines` prints one `SELF-TEST FAILED — <record>: …` line per record. The
  record is the check name's leading INC-/DEC-/R1a/R1b; an unprefixed check goes under
  `DEC-083/084 census`. EFR-2 covers it; EFR-1 (the self-test) passes.
- Gates at d1b87b77d:
  - `bun run typecheck`: exit 0.
  - `bun run lint`: exit 0.
  - `bunx vitest run scripts --maxWorkers=2`: 110 files, 561 passed, 1 skipped.

## The push

Ruling 1 item 10 says ONE push after STEP 7. Rule 00 §Stopping says a stop is committed and
pushed, with the draft pull request updated, so the supervisor can read it from a clone. I follow
the rule: this push carries parts A → E and this file, so the lane's CI runs once on them before
STEP 7. The push after the answer is the turn's second code push.

## F1, measured (ruling 1, item 7; for 3c's GO and the report's §13)

The base copy is `/tmp/ethio-scratch/housekeeping-3b/f1-base/`. It is the working tree with each of
the 49 paths changed since f3b215762 written back from `git show f3b215762:<path>`, each checked
by `cmp`. The 9 paths added since are left out, and `node_modules` is a link. The tsconfig is
`tsconfig.f1.json` in that folder, never in the repository: `{"extends": "./tsconfig.json",
"include": ["scripts/**/*.ts"]}`.

```text
$ cd /tmp/ethio-scratch/housekeeping-3b/f1-base && bunx tsc --noEmit --pretty -p tsconfig.f1.json
Found 49 errors in 8 files.
```

By file: `.claude/hooks/lib.ts` 3 (reached by import), `scripts/bundle-closure.test.ts` 5,
`scripts/ci/turn-checks.ts` 1, `scripts/conformance/budget-band.test.ts` 2,
`scripts/conformance/card-tiers.test.ts` 3, `scripts/conformance/lint-rules.test.ts` 2,
`scripts/conformance/on-demand-failure.test.ts` 1, `scripts/e2e-failure-report.ts` 32 (`Bun` with
no types). The final tree's count goes in the report.
