RULING — cursor-bundle-7b, final report: one test the turn made timing-dependent; two record lines; then the judged push. Base: cursor/bundle-7b-2 16929f29f

**MODEL — Claude Sonnet 5.5, in the SAME Cursor chat (it ended with the final report).**

Save this ruling as `docs/governance/briefs/cursor-bundle-7b-ruling-3.md` (new), by scripted copy (sha256 in the carrier).

PREVENTION (G70)

- Class 1 — a test the turn made timing-dependent passes in the warm full suite and fails alone (INC-1306).
  - `RFT-4` (`src/components/shell/rail-first-paint.test.tsx` :160) waits one fixed tick before it reads the failure notice.
  - This turn put an on-demand load between the read and the notice: `routeFailure` (`src/lib/route-client.ts` :89) loads `src/lib/reader-failure.ts` through `loadOnce`. The test's mock now keeps the real `routeFailure`.
  - In the full suite the module is already transformed by an earlier file, so the test passes. Alone, it fails every time.
  - Neither your gate (the full suite) nor my verification (the judged run) ran a changed test file alone.
  - Instructions, in force now: my verification runs every test file a lane changed, each alone, on my lock-exact clone, before CLEAN (S804, mine).
  - Repository: decision 1 here. INC-1306's guard: the component job also runs, each alone, the test files a push changes. Owner Cursor bundle 8.
  - Cursor rules, for the next rules turn: rule 40 gains "a test waits for an answer with `findBy…` or `waitFor`, never a fixed tick; the gate runs each test file the turn changed alone". In force now for this lane: decision 3.
  - Knowledge: the same sentence joins Lovable's next Knowledge version.
- Class 2 — a record line that names a file wrongly.
  - `docs/features/ci-guards.md` places FNC-1's census under `scripts/conformance/`. It lives at `src/components/shell/failure-notice.census.test.ts`.
  - The report's register row says the census is "joined to `wired.test.ts`". Ruling 1, decision 12 said `wired.test.ts` does not change for it, and it did not.
  - Repository: decision 2 corrects both. This is the class's first occurrence in a feature doc, so it is counted and no guard is built (§11).
  - Instructions, Cursor rules and Knowledge: not needed.

WHAT THE SUPERVISOR CHECKED
- The migration laws on the lane head: `bunx vitest run scripts/conformance/proof-readers.test.ts` and `bash scripts/check-migrations.sh` pass.
- File 1's DEC-345 correction: only proof text changed; every schema statement, the mark and the grants are byte-identical.
- File 2, read whole before the apply:
  - its pre-checks;
  - both redeclared bodies' old → new diffs: `my_listings` `619f5b92…` → `c11b4628cd29d62e5646c46d4a55f663`, `my_listing` `e707acdf…` → `33d0ed8c251305665a80eaa56422def3`;
  - the proofs' rows: scratch only;
  - the grants.
- ethio-staging, after my connector apply:
  - mark `20261126040000` present;
  - both bodies' md5 as above;
  - grants unchanged;
  - scratch rows 0;
  - the applied statements' sha256 equals the file's (`65a6ada5…`).
- The run on `5ccc79542` (45754134703): red only in the staging preflight, which was expected.
- The report commit's run (45758262652), every job read: the preflight and every browser lane are green; Component tests is red (RFT-4, decision 1). Four flaky passes, all INC-1303's "challenge failed (500)": AL-20 in lane 10, AT-50 and AT-51 in lane 14 (decision 4).
- `client.ts`: the DEC-477 change is the import and the one call.
- The words: byte-exact with both of my words files.
- The ceilings: each carries its cause. The entry grew 208 → 209 by its named modules; four admin pages fell by about 53 KiB (INC-1291).

DECISIONS

1. RFT-4 waits as a person waits. In `src/components/shell/rail-first-paint.test.tsx`, replace exactly these four lines:

```
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(screen.getByRole("alert").getAttribute("data-failure-reason")).not.toBeNull();
```

with this one line:

```
    expect((await screen.findByRole("alert")).getAttribute("data-failure-reason")).not.toBeNull();
```

   - `act` then has no other reader in the file (:164 is its only use), so line 1's import becomes `import { cleanup, render, screen } from "@testing-library/react";`.
   - I proved the change on my clone: the file alone was red 3 of 3 before it and green 3 of 3 after it.
   - This is not a weaker proof. The notice must still appear and carry its reason; the test now waits for it the way the code delivers it.
2. THE TWO RECORD LINES:
   - In `docs/features/ci-guards.md`, FNC-1's path becomes `src/components/shell/failure-notice.census.test.ts`.
   - In the report's §14, the failure notice's register row reads: "register row — the failure notice: the census (`src/components/shell/failure-notice.census.test.ts`, FNC-1) registered in `docs/features/ci-guards.md`; `wired.test.ts` does not name it (ruling 1, decision 12)."
3. BEFORE THE PUSH: run each test file this lane changed, each alone (`git diff --name-only origin/dev...HEAD -- '*.test.ts' '*.test.tsx'`, one `bunx vitest run <file>` per file). Paste the count and the result. A file red alone is fixed the way decision 1 fixes RFT-4; name it under §15.
   - My census, for your comparison: every test file near the three on-demand loads this turn added (`routeFailure`; `src/components/shell/failure-reason.ts`; `src/features/auth/mfa/session-level.ts`), and every test file this lane changed, each run alone. Only RFT-4 is red alone.
4. INC-1303's FIRST CAPTURES: the capture now runs on every lane, and run 45758262652 holds four of its failures. Its file rides each lane's log artifact (`local-backend-auth-capture.txt`). The artifact host is refused to my workspace, so you read it.
   - `gh run download 45758262652 -n e2e-log-10 -n e2e-log-14`, then read both capture files.
   - Paste under §15 the lines for `/factors/…/challenge` (their counts by status, and each 500's `error_code` and `msg`, as the capture writes them), and say what they show.
   - Change no harness file in this lane. INC-1303's fix moves to Cursor 7c's first part, with the cause in hand. A fix to `aal2Session` reaches every spec that mints a staff session, so it needs its own turn and its own repeat-lane proof.
5. THE REPORT gains a §15, "After the final report": decisions 1 to 4, and INC-1306 in §14 word for word:

```
INC — INC-1306 (the supervisor's record): a component test the turn made timing-dependent. RFT-4 (src/components/shell/rail-first-paint.test.tsx) waited one fixed tick before it read the failure notice; Cursor bundle 7b put an on-demand load between the read and the notice (routeFailure in src/lib/route-client.ts loads src/lib/reader-failure.ts through loadOnce), and the test's mock keeps the real routeFailure. In the full suite the module is already transformed and the test passes; alone it fails every time. Evidence: run 45758262652 (the report commit; the same code as 5ccc79542), Component tests: "Unable to find an accessible element with the role "alert""; the supervisor's clone, the file alone, red 3 of 3, then green 3 of 3 with findByRole. Class: concern "a test that waits for an answer the code delivers later"; mechanism: Testing Library's waiting queries (findBy…, waitFor); the guard is NONE YET. Fixed in the lane (ruling 3). Owner of the guard: Cursor bundle 8 — the component job also runs, each alone, the test files a push changes.
```

6. ONE PUSH: the test, the two record lines, this ruling and the report's §15, in one commit. It changes code, so it is the judged run. The pull request stays a draft. I verify, and the operator marks it ready and merges.

NUMBERS ASSIGNED (G66): INC-1306; S804 (the supervisor's). No new DEC.

For the records turn, INC-1303's later word: open; its first captures are in run 45758262652; owner Cursor 7c, first part.

The bundle count (DEC-414): this ruling follows the final report; it is counted as the lane's one return.
