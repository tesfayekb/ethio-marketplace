RULING — cursor-bundle-5, stop 3: (c) the staff gate is wired in bundle 6; the red run is DLG-E12 and is fixed first; the status read leaves the first paint; one clean merge of dev. Base: cursor/bundle-5 67331d799

Save this file bare as `docs/governance/briefs/cursor-bundle-5-ruling-3.md` (new) by a scripted copy; its sha256 is the carrier's. Build on in the SAME chat (Claude Sonnet 5.5). Where this ruling and the brief or rulings 1 and 2 differ, this ruling governs.

THE OPERATOR'S WORD: his paste of this ruling is his word for ONE `git merge origin/dev` on this lane (STEP 1). It is an exception to rule 00 §Git, as on bundle 4, not a change to the rule. Nothing else of merge, rebase, pull or cherry-pick is allowed.

PREVENTION
- CLASS 1 (the supervisor's, with your stop-1 census): the harness count named the sites that NAME the permission (`admin_panel`, 20), not the accounts that HOLD it (every staff role grant). I carried "20" into ruling 1 without a command of my own. A change that reaches the staff tests of as many spec files as the two counts below show is its own turn. In force for the supervisor: a count in a ruling is my own command's count, and a census of who meets a gate lists accounts by every path to the permission. Repository (bundle 6, Part 1): `docs/governance/go-template.md` gains the census item `gate-reach`, and `scripts/brief/go-laws.ts` gains its law. Cursor rules queue: rule 40, a gate's harness answer is one helper, sized by the tests it reaches.
  - The `grantRole(` lines under `e2e/` that name a staff role, at your head:
    COUNT: 88 := grep -rnF "grantRole(" e2e | grep -c -e admin -e moderator
  - The spec files with a staff grant:
    COUNT: 31 := grep -l -e "grantRole([^)]*admin" -e "grantRole([^)]*moderator" -e admin_panel e2e/*.spec.ts | wc -l
- CLASS 2 (the supervisor's; second occurrence): ruling 1 item 10 put two lists on the style board and named none of the specs that measure that page. In force: a ruling that adds to a shared test page names every spec that loads it. Repository (bundle 6, Part 1): a law in `scripts/brief/go-laws.ts` for it.
  - The specs that load `/dev/style`:
    COUNT: 6 := grep -lE "/dev/style" e2e/*.spec.ts | wc -l
- CLASS 3 (the supervisor's): INC-1266's law was ruled to Lovable this morning and never written into your rulings: a reader that sits on a first download does not carry the typed failure. Ruling 1 item 9 asked for a named failure, and you followed INC-1256. In force: a law ruled to one executor is written into every open lane's next ruling.
- CLASS 4 (yours, small): the red run's failing test IS named, at the END of your lane's `e2e-last-failure.md`, after the post-test sections. In force for both of us: that file is read to its end. INC-1272 (assigned) moves the gating failures to its top. Cursor rules queue: rule 00, the CI read.
- Your stop was right: you counted before the push and built nothing more.

THE DECISIONS
1. (c), by DEC-451 (assigned; the supervisor's, G17; the operator reads it in the carrier). The staff gate is WIRED in bundle 6, together with its one harness helper and the server half (DEC-438). Bundle 6's first part is that helper, planned on its own census. In this bundle:
   - `src/routes/admin.tsx`: the gate's mount leaves: the lazy `StaffFactorGate`, `StaffFactorUnreachable`, the `Suspense` and the wrapper around `<Outlet />`. Every line Part 4 changed in this file for the gate returns to its text at `adb10b7`. A change made there for another concern stays and is named in the report.
   - The gate's line (its key ends in `#StaffFactorGate`) leaves `scripts/conformance/holds-its-box-allowlist.txt`, which `scripts/conformance/holds-its-box.test.ts` reads.
   - STAFF-E1, STAFF-E2 and `e2e/helpers/staff-factor.ts` leave the tree, with every list that names them. Their ids stay assigned. Bundle 6 brings them back from your commits by a scripted copy.
   - The gate's own files STAY, unmounted: `src/features/auth/mfa/staff-factor.ts`, `src/features/auth/mfa/staff-factor-gate.tsx`, their unit tests (AG-U1 to AG-U4) and their words. The gate file's header says in one line that nothing mounts it until bundle 6 (DEC-451). A word whose only user leaves goes with it, is named in the report, and returns in bundle 6 from `words.json`. If a standing law refuses a module nothing imports, decide by that law and name it under Departures.
   - Nothing of options (a) or (b) is built here: no sign-in helper changes, no per-spec edits.
2. THE RED RUN (45187492568, on `adb10b7`) IS YOURS. It is DLG-E12 in `e2e/dialogs.spec.ts`, on Lane 10 (`desktop-1280`) and Lane webkit (`webkit-1280`): "the choices a person sees @ 834 x 900", expected at least 6, received 2 and 3. Every other job is green; the repeat lane's two lines are its time cap (INC-589).
   - MY HYPOTHESIS, to prove before you change anything else: Part 1 put the section "Select lists" AFTER "Filters" in `src/routes/dev.style.tsx` (:1412 after :1382). "Filters" was the board's last section. The test's `open` scrolls the button to the window's centre. With a section below it the button now reaches the centre, and the panel has half the window where it had most of it.
   - THE FIX: the section "Select lists" moves to sit just BEFORE "Filters", so "Filters" is the board's last section again. Nothing in the panel, the test or a helper changes.
   - THE PROOF, by id, 0 retries, on `desktop-1280` and `webkit-1280`: DLG-E12 green; SLH-1 and SLH-2 green; and every test, in the specs that load `/dev/style`, that opens `style-filters` or a `style-select-` control. If DLG-E12 is still red, STOP with its `listFacts` values.
   - The panel itself is INC-1271 (assigned; text under RECORDS), owner Lovable's next bundle. You change nothing in it.
3. THE FIRST PAINT. On my build of your head merged with dev, the budget check fails before any ceiling: "door-refused-key: 1 in the entry's closure, ENTRY_CLOSURE lists 0 (DEC-362)". `/` goes from 223.072 to 224.092 KiB, and every public page gains about 1.0 KiB. The chain: `src/features/auth/use-auth.ts` → `src/features/auth/account-status.ts` → `src/lib/reader-failure.ts` → `src/lib/refusal.ts` → `src/lib/door-refused-key.ts`.
   - THE LAW (INC-1266, the one Lovable's bundle 7 was held to): a reader that sits on a first download does not carry the typed failure. `ENTRY_CLOSURE` is not edited for it, and no public page's ceiling moves for it.
   - THE FIX: `src/features/auth/account-status.ts` imports nothing from `@/lib/reader-failure`. Its `failed` answer carries the error as it arrived. `src/features/auth/use-auth.ts` hands that error to `reportOnDemandFailure` as it does now. The failure is still named and reported, never a quiet "nothing" (INC-1264 stands). The module's header names INC-1266 as the reason. This amends ruling 1 item 9's word "typed" for this one reader.
   - Its test: ACS-U7 (free). A failed session read, a failed client and a failed query each answer `failed` with the error as it arrived, and nothing is sent without a session.
   - THE PROOF: after the build, `node scripts/check-bundle-size.mjs` prints no ENTRY_CLOSURE line. If another chain still puts a new chunk on the entry, STOP with the chain.
4. THE CEILINGS (DEC-296's form, your own measure) are measured after steps 1 to 4 below, on the merged tree. A line Lovable's bundle 7 moved (`/admin/attributes`, `/admin/countries`, `/admin/locations`) keeps bundle 7's sentence if you do not move it. If you move it, its base figure is dev's.
5. AU-3 (`e2e/admin-users.spec.ts`) is INC-1269, intermittent, owner bundle 6. If it alone is red on your final run, name it; do not fix it here.

THE STEPS (in this order; ONE final push at the end)
1. THE MERGE.
   - `git fetch origin dev cursor/bundle-5`. `git rev-parse HEAD origin/cursor/bundle-5` prints `67331d799763475cc5a3f914cf06d56429d25dbe` twice, and `git rev-parse origin/dev` prints `92fee7d1a4df49feeee9d3879946fdef44a33317`. Anything else: STOP.
   - `git merge --no-ff --no-commit origin/dev`. `git diff --name-only --diff-filter=U` prints nothing. `git diff --cached --name-only HEAD` prints exactly the files listed at the end of this ruling. Anything else: `git merge --abort` and STOP.
   - `bun run typecheck` is clean (it is on my trial merge). Commit with the title `Merge dev 92fee7d1a into cursor/bundle-5 (ruling 3: no conflict)`. Do not push yet.
2. Decision 2: the section moves, with its proof.
3. Decision 1: the gate's mount and its browser tests leave.
4. Decision 3: the status read, ACS-U7 and the entry check.
5. The brief's remaining steps as written: the docs, the first-download check and its ceilings, `bun run checks` once on the final tree, the browser tests by id, the self-review, the ONE push, the report.

THE BRIEF'S SCOPE GROWS BY: nothing. The merge brings dev's files as they stand on dev; you write none of them. Never a file SIDE BY SIDE gives to Lovable, and never `.github/` beyond what the brief already holds.

RECORDS (for your report's Records section, word for word; the records turn imports them):
- DEC-451 — the supervisor (G17), 2026-11-23, by the operator's paste: the staff second-factor gate (DEC-434) is wired in Cursor bundle 6, with its one harness helper and the server half (DEC-438); bundle 5 keeps the gate's component and unit tests unmounted. Reason: the gate reaches the staff sign-ins of thirty-one spec files; a change of that size is its own turn.
- INC-1271 (write it only if your proof of decision 2 holds) — the Filters panel shows fewer than six choices when its button sits at the middle of a 900-pixel-tall window: DLG-E12 went red on run 45187492568 once the style board grew below the panel's button. Class: an anchored panel's room. Mechanism: the Filters panel (Lovable bundle 3). Owner: Lovable's next bundle; its test gains the mid-window case, red first.
- INC-1272 — the lane's `e2e-last-failure.md` lists its gating failures after the post-test sections, so a reader of its top sees none. Class: evidence a reader must scroll for. Mechanism: the failure reporter. Owner: Cursor bundle 6.
- INC-1266 gains a third held reader: `src/features/auth/account-status.ts`, the signed-in person's status read, which sits on every page's first download.

THE FILES OF THE MERGE
COUNT: 15 := git diff --name-only a14f032b6 92fee7d1a4df49feeee9d3879946fdef44a33317 | wc -l
- `scripts/route-budgets.mjs`
- `src/features/admin-ai/ai-service.test.ts`
- `src/features/admin-ai/ai-service.ts`
- `src/features/admin-attributes/attributes-service.test.ts`
- `src/features/admin-attributes/attributes-service.ts`
- `src/features/admin-categories/categories-service.test.ts`
- `src/features/admin-categories/categories-service.ts`
- `src/features/admin-categories/category-images-service.test.ts`
- `src/features/admin-categories/category-images-service.ts`
- `src/features/admin-countries/countries-service.test.ts`
- `src/features/admin-countries/countries-service.ts`
- `src/features/admin-locations/locations-service.test.ts`
- `src/features/admin-locations/locations-service.ts`
- `src/lib/reader-failure.test.ts`
- `src/lib/reader-failure.ts`

IN YOUR ANSWER: the final report as the brief orders, and in it: step 1's printed lines and the merge commit's sha; decision 2's proof; the entry check's output; what left and what stayed for the gate.
