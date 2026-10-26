# Foundations — turn 34b-4: the on-demand census judges a handler by what it does — an empty catch, a bare return and a missing handler are no answer (turn 34b-3's reviewer, MAJORs 1–2): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34b-4 (2026-10-26; INC-911's guard; anchors located at 1346a1be506179209286a168c323ea26ae8fc1b6). Turn 34b-3's reviewer found the census (scripts/conformance/on-demand-failure.test.ts) still takes three do-nothing answers for an answer: an empty `catch {}` around an awaited loader, a handler whose body only returns undefined, and `.then(ok, undefined)` (and so `.catch(undefined)`); you could not fix them inside that turn's hash contract — correct. This turn closes them, with their planted cases. Tier B (a conformance guard; no product code). No migration. No string. No package change. No AGENTS.md change. No file deleted. Base: dev 1346a1be506179209286a168c323ea26ae8fc1b6 (turn 34w-2's landing). The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the census; D — docs and the roadmap; THE CHECKS; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 1346a1be506179209286a168c323ea26ae8fc1b6
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
scripts/conformance/on-demand-failure.test.ts
SCOPE-END

THE SYSTEM (G0) — one concern, continued from turns 34b-2 and 34b-3.
CONCERN: a piece of the app fetched on demand whose download fails tells the person (register row 52); its guard must never count a handler that does nothing as an answer.
MECHANISM: the census in scripts/conformance/on-demand-failure.test.ts — `rejectionHandler` (the handler of each call) and `isSilent` (a handler that does nothing).
CONSUMERS (the census's own decisions): `isSilent` judged a function's body by `statements.length === 0` only (a body of `return undefined;` passed as an answer) and never judged an empty `catch {}` block (the await-in-try path hands it the catch's block); `rejectionHandler` took any second argument of `.then` — `undefined` included — and any argument of `.catch` for a handler. COVERED HERE: all three, by two helpers — `isNothing` (`undefined`, `null`, `void 0`) and `doesNothing` (a body of nothing but `return;`, `return undefined;`, `return void 0;` or empty statements) — and `handlerIn`, which makes "nothing" where a handler goes no handler at all. LEFT: a handler that does something but does not answer the person (logs only) stays a review question, as the census's own comment says.
CONFORMANCE GUARD: ODC-5 (planted: an empty catch, a bare return, then(ok, undefined), catch(undefined), and a handled control) — red on BASE's census (Part B); ODC-1 stays green on the tree (no product file uses any of the three).
EXCEPTIONS: none.
FIVE LENSES — security: none · performance: none (a unit test) · failure modes: the subject — a silent swallow can no longer pass the guard · consistency: one meaning of "no answer" for every form a handler takes · future growth: a new form of do-nothing is one line in `isNothing` or `doesNothing`.
FORWARD-SCAN: turns 35–37 add loaders and callers; ODC-1 judges each call. REGISTER: row 52's guard text gains ODC-5 (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34b-4.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: none in this turn. No browser run is owed (no product code changes); CI runs every test.
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once in the file as the blocks before it left it — at BASE, except Part C's blocks, which follow Part B's) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34b-4.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34b-4.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34b-4.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`).
- RED FIRST (G38): Part B shows ODC-5 failing on BASE's census before Part C's edits.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox (INC-890); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Behaviour contract: no product behaviour changes. The census reports, as before, every caller off the mechanism; it now also reports the three do-nothing answers. Nothing else changes.
- Knowledge K: K1 the census above; K2 the report lists (file:line) every product call the tightened census would have named (expected: none — ODC-1 stays green) and any other do-nothing form you find in src/ (a handler that only logs is a review question, list it); K3 the guard tightens in this turn; K4–K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; ODC-5 is new; every other test unchanged.
- The reviewer: after THE CHECKS, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE (CI run 40382950832, turn 34w-2's landing) — green, or still running; a red there is read and named). Any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. ODC-5, the planted do-nothing answers (only the test; the census's code changes in Part C):
EDIT scripts/conformance/on-demand-failure.test.ts #1
OLD-BEGIN

  it("ODC-3 the definers: resilientLazy reports, and every named loader exists over a loadOnce", () => {
OLD-END
NEW-BEGIN

  it("ODC-5 a handler that does nothing is silent, and no handler is none: an empty catch, a bare return, then(ok, undefined), catch(undefined) (34b-3's reviewer)", () => {
    const dir = "node_modules/.cache/on-demand-failure-5";
    mkdirSync(dir, { recursive: true });
    const files = {
      emptyCatch: `${dir}/odc-empty-catch.ts`,
      bareReturn: `${dir}/odc-bare-return.ts`,
      thenUndefined: `${dir}/odc-then-undefined.ts`,
      catchUndefined: `${dir}/odc-catch-undefined.ts`,
      handled: `${dir}/odc-handled.ts`,
    };
    const head =
      'import { reportOnDemandFailure } from "@/lib/on-demand-failure";\nimport { loadLeaflet } from "@/features/posting/map/leaflet";\n';
    try {
      writeFileSync(
        files.emptyCatch,
        `${head}export async function go() {\n  try {\n    await loadLeaflet();\n  } catch {}\n}\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.bareReturn,
        `${head}void loadLeaflet().catch(() => {\n  return undefined;\n});\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.thenUndefined,
        `${head}void loadLeaflet().then(() => 1, undefined);\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.catchUndefined,
        `${head}void loadLeaflet().catch(undefined);\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.handled,
        `${head}void loadLeaflet().catch((error: unknown) => reportOnDemandFailure("the map", error));\n`,
      );
      const result = onDemandFailureCensus(Object.values(files));
      expect(result.consumers).toEqual(Object.values(files));
      expect(report(result.findings)).toBe(
        [
          `${files.bareReturn}:3 catches a failed download of loadLeaflet silently, and no call in the file handles it`,
          `${files.catchUndefined}:3 leaves a failed download of loadLeaflet unhandled`,
          `${files.emptyCatch}:5 catches a failed download of loadLeaflet silently, and no call in the file handles it`,
          `${files.thenUndefined}:3 leaves a failed download of loadLeaflet unhandled`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("ODC-3 the definers: resilientLazy reports, and every named loader exists over a loadOnce", () => {
NEW-END
B2. Run `bunx vitest run scripts/conformance/on-demand-failure.test.ts` — the supervisor's run on BASE: `Tests  1 failed | 4 passed (5)`: ODC-5 (`expected '' to be 'node_modules/.cache/on-demand-failure…'` — BASE's census names none of the four) — paste the failure lines and the totals.

PART C — THE CENSUS.
C1. `isNothing`, `handlerIn` and `doesNothing`; `rejectionHandler` reads a handler through `handlerIn`; `isSilent` judges a catch block and a function body alike:
EDIT scripts/conformance/on-demand-failure.test.ts #2
OLD-BEGIN
      const chained = parent.parent;
      if (step === "catch") return chained.arguments[0] ?? null;
      if (step === "then" && chained.arguments.length >= 2) return chained.arguments[1] ?? null;
      if (step === "then" || step === "finally") {
OLD-END
NEW-BEGIN
      const chained = parent.parent;
      if (step === "catch") return handlerIn(chained.arguments[0]);
      if (step === "then" && chained.arguments.length >= 2) return handlerIn(chained.arguments[1]);
      if (step === "then" || step === "finally") {
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #3
OLD-BEGIN

/** A handler that does nothing: `() => undefined`, `() => {}`, `() => void 0`. */
function isSilent(handler: ts.Node): boolean {
  if (!ts.isArrowFunction(handler) && !ts.isFunctionExpression(handler)) return false;
  const body = handler.body;
  if (ts.isBlock(body)) return body.statements.length === 0;
  return (ts.isIdentifier(body) && body.text === "undefined") || ts.isVoidExpression(body);
}
OLD-END
NEW-BEGIN

/** No handler at all: `undefined`, `null` or `void 0` where a handler goes (turn 34b-3's reviewer). */
function isNothing(node: ts.Node): boolean {
  return (
    (ts.isIdentifier(node) && node.text === "undefined") ||
    node.kind === ts.SyntaxKind.NullKeyword ||
    ts.isVoidExpression(node)
  );
}

/** The handler an argument gives, or null when it gives none. */
function handlerIn(node: ts.Node | undefined): ts.Node | null {
  return node === undefined || isNothing(node) ? null : node;
}

/** A body that does nothing: no statement, or only `return;`, `return undefined;`, `return void 0;`. */
function doesNothing(block: ts.Block): boolean {
  return block.statements.every(
    (statement) =>
      ts.isEmptyStatement(statement) ||
      (ts.isReturnStatement(statement) &&
        (statement.expression === undefined || isNothing(statement.expression))),
  );
}

/**
 * A handler that does nothing: `() => undefined`, `() => {}`, `() => void 0`, `() => { return undefined; }`,
 * or an empty `catch {}` around an awaited call (turn 34b-3's reviewer, MAJOR 1).
 */
function isSilent(handler: ts.Node): boolean {
  if (ts.isBlock(handler)) return doesNothing(handler);
  if (!ts.isArrowFunction(handler) && !ts.isFunctionExpression(handler)) return false;
  const body = handler.body;
  if (ts.isBlock(body)) return doesNothing(body);
  return isNothing(body);
}
NEW-END
C2. Read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance` — every test passes, ODC-1…ODC-5 among them (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34w-2: turn 34w's NOT READY landing — the root reads its facts once, so the offline sign-out keeps the site on screen, DEC-272; SO-11's precondition; the live guard's pages, INC-926; the fading notice's role)` becomes `docs/governance/briefs/foundations-turn-34b-4.md (Foundations turn 34b-4: the on-demand census judges a handler by what it does — turn 34b-3's reviewer)` (everything after it stays, as it is).
D2. These edits (the register's row 52; the changelog; turn 34w-2 ticked with its closing run; this turn's own line):
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); Foundations turn 34b-2 |
OLD-END
NEW-BEGIN
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3; ODC-5: an empty `catch {}`, a handler that only returns undefined, `.then(ok, undefined)` and `.catch(undefined)` — 34b-3's reviewer, closed in turn 34b-4); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); Foundations turn 34b-2 |
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34w-2 (2026-10-26; turn 34w's NOT READY landing, a8c025ef) — DEC-272 / INC-927: the root's facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load (`shouldReload: false` on the root route): the router read them again from the server on a navigation to the page already shown, and offline that failed read's error view replaced the whole app — the offline sign-out's move to "/" from "/" (SO-12; DEC-271 now holds). INC-928: SO-11 waits for the signed-in page before it makes the session stale. INC-926: the shell's live guard evacuates every page the door-step guards (SIGNED_IN_PAGES) with /admin — /post, /legal/accept and /legal/publishing stood open after a sign-out in another tab. INC-929: the fading notice, drawn always, and an action message kept empty in the page carry no role until their words come (S446's class). RRO-1, CF-SIR-4, FN-1, AMSG-2, SO-11, SO-12.
OLD-END
NEW-BEGIN
- Foundations turn 34w-2 (2026-10-26; turn 34w's NOT READY landing, a8c025ef) — DEC-272 / INC-927: the root's facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load (`shouldReload: false` on the root route): the router read them again from the server on a navigation to the page already shown, and offline that failed read's error view replaced the whole app — the offline sign-out's move to "/" from "/" (SO-12; DEC-271 now holds). INC-928: SO-11 waits for the signed-in page before it makes the session stale. INC-926: the shell's live guard evacuates every page the door-step guards (SIGNED_IN_PAGES) with /admin — /post, /legal/accept and /legal/publishing stood open after a sign-out in another tab. INC-929: the fading notice, drawn always, and an action message kept empty in the page carry no role until their words come (S446's class). RRO-1, CF-SIR-4, FN-1, AMSG-2, SO-11, SO-12.

- Foundations turn 34b-4 (2026-10-26; turn 34b-3's reviewer) — the on-demand census judges a handler by what it does: an empty `catch {}` around an awaited loader, a handler whose body only returns undefined, and `null`/`undefined`/`void 0` where a handler goes (`.then(ok, undefined)`, `.catch(undefined)`) are silent or no handler at all, never an answer. ODC-5.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [x] Turn 34w (docs/governance/briefs/foundations-turn-34w.md; no migration; Lovable) — the operator's walk of 26 Oct and CI's red on bc963938: the notice's live region carries no role (ODN-2); INC-925 — a signed-out visitor to /settings stayed on sign in only a moment, because the shell's live guard kept its own list of the pages that send to sign in: the list is now the door-step's own (SIGNED_IN_PAGES, src/lib/signed-in-pages.ts; CF-SIR-4/5, SIP-1) and S-1 proves every such page keeps the visitor there; DEC-271 — an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns, and a download that fails offline is no stale chunk (STC-2, SO-12); D238 — the phone menu has no ×; INC-924 — the peek's three seconds count from when it is drawn, and it never takes over a menu the person opened (PK-2, PK-3). Final HEAD a8c025ef; CI run 40358294719: FAILURE — SO-12 at both widths (the offline sign-out's move to "/" from "/" re-read the root's facts from the server, and offline that failed read's error view replaced the app); its own sandbox also lost SO-11's race (INC-928). Closed by turn 34w-2.
  - [ ] Turn 34w-2 (docs/governance/briefs/foundations-turn-34w-2.md; no migration; Lovable) — turn 34w's NOT READY landing: DEC-272 / INC-927 — the root's facts are read once per page load (`shouldReload: false`; RRO-1), so the offline sign-out keeps the site on screen (SO-12, DEC-271); INC-928 — SO-11 waits for the signed-in page before the session goes stale; INC-926 — the live guard evacuates every page the door-step guards, with /admin (CF-SIR-4); INC-929 — the fading notice and the kept empty message carry no role (FN-1, AMSG-2).
  - [x] Turn 34b-3 (docs/governance/briefs/foundations-turn-34b-3.md; no migration; one string retired; Lovable) — every remaining on-demand consumer onto the mechanism, the allowlist down to its four permanent lines: the maps (map-preview.tsx :108, map-large.tsx :73), the pin map (LoadFailedHere — no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar, the strings gate, the phone box (Refresh), settings, the account read and the strings provider (INC-919: a failed language download is no longer an unhandled rejection); every "Try again" for a download becomes Refresh and every comment that promises a retry is corrected (INC-918); the footer's silent catch (use-footer-inset.ts :100, INC-909). And the census itself (34b-2's reviewer, MAJORs 1–2): a loader imported under another name or called through a namespace is still a call, and a file is on the mechanism only where each call's own failure is answered, never because the file mentions an answer somewhere. Final HEAD f09ec2a9; CI run 40374691120: running when turn 34w-2 was briefed (its Part A reads it; SO-12 the expected red). Its reviewer: NOT READY — the census misses an empty `catch {}`, a `() => { return undefined; }` handler, and takes `.then(ok, undefined)` for a handler; those three go to the next turn with their planted cases.
  - [x] Turn K1 (docs/governance/briefs/foundations-turn-k1.md; no migration; Lovable — the kit's files are outside the Claude Code executor's scope) — the independent review gates every landing: the reviewer runs in the foreground before the report, its last line rides the report's third line, and land.ts refuses a final report without it, with a BLOCKER in it, or reviewed on another commit (EXH-20); the scheduling rule reads the programs a command runs, not words in its data (INC-889, EXH-21); the scratch-repository tests state their time (INC-890). Rulings 1–5 (foundations-turn-k1-r1.md … -r5.md; INC-920): the kit's shell reader reads every command the shell runs; a heredoc's delimiter by the shell's quote removal; a program named by a variable, $'…', a substitution or a glob refused as unreadable; DEC-269 and DEC-270 — the scheduling rule also matches its words in the command's text, blanking only data no program of the command runs. Final HEAD a8a7a207; CI run 40326085964: SUCCESS, and main promoted. The older non-null assertions in .claude/hooks/, the spellings listed in the rulings' reports and INC-921 (the tree-scan time budget) to the next kit turn.
OLD-END
NEW-BEGIN
  - [x] Turn 34w (docs/governance/briefs/foundations-turn-34w.md; no migration; Lovable) — the operator's walk of 26 Oct and CI's red on bc963938: the notice's live region carries no role (ODN-2); INC-925 — a signed-out visitor to /settings stayed on sign in only a moment, because the shell's live guard kept its own list of the pages that send to sign in: the list is now the door-step's own (SIGNED_IN_PAGES, src/lib/signed-in-pages.ts; CF-SIR-4/5, SIP-1) and S-1 proves every such page keeps the visitor there; DEC-271 — an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns, and a download that fails offline is no stale chunk (STC-2, SO-12); D238 — the phone menu has no ×; INC-924 — the peek's three seconds count from when it is drawn, and it never takes over a menu the person opened (PK-2, PK-3). Final HEAD a8c025ef; CI run 40358294719: FAILURE — SO-12 at both widths (the offline sign-out's move to "/" from "/" re-read the root's facts from the server, and offline that failed read's error view replaced the app); its own sandbox also lost SO-11's race (INC-928). Closed by turn 34w-2.
  - [x] Turn 34w-2 (docs/governance/briefs/foundations-turn-34w-2.md; no migration; Lovable) — turn 34w's NOT READY landing: DEC-272 / INC-927 — the root's facts are read once per page load (`shouldReload: false`; RRO-1), so the offline sign-out keeps the site on screen (SO-12, DEC-271); INC-928 — SO-11 waits for the signed-in page before the session goes stale; INC-926 — the live guard evacuates every page the door-step guards, with /admin (CF-SIR-4); INC-929 — the fading notice and the kept empty message carry no role (FN-1, AMSG-2). Final HEAD 1346a1be; CI run 40382950832: running when turn 34b-4's brief was sent (the supervisor reads it).
  - [x] Turn 34b-3 (docs/governance/briefs/foundations-turn-34b-3.md; no migration; one string retired; Lovable) — every remaining on-demand consumer onto the mechanism, the allowlist down to its four permanent lines: the maps (map-preview.tsx :108, map-large.tsx :73), the pin map (LoadFailedHere — no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar, the strings gate, the phone box (Refresh), settings, the account read and the strings provider (INC-919: a failed language download is no longer an unhandled rejection); every "Try again" for a download becomes Refresh and every comment that promises a retry is corrected (INC-918); the footer's silent catch (use-footer-inset.ts :100, INC-909). And the census itself (34b-2's reviewer, MAJORs 1–2): a loader imported under another name or called through a namespace is still a call, and a file is on the mechanism only where each call's own failure is answered, never because the file mentions an answer somewhere. Final HEAD f09ec2a9; CI run 40374691120: running when turn 34w-2 was briefed (its Part A reads it; SO-12 the expected red). Its reviewer: NOT READY — the census misses an empty `catch {}`, a `() => { return undefined; }` handler, and takes `.then(ok, undefined)` for a handler; those three go to the next turn with their planted cases.
  - [ ] Turn 34b-4 (docs/governance/briefs/foundations-turn-34b-4.md; no migration; Lovable) — turn 34b-3's reviewer: the on-demand census judges a handler by what it does — an empty `catch {}`, a handler that only returns undefined, and `undefined`/`null`/`void 0` where a handler goes (`.then(ok, undefined)`, `.catch(undefined)`) are no answer (ODC-5).
  - [x] Turn K1 (docs/governance/briefs/foundations-turn-k1.md; no migration; Lovable — the kit's files are outside the Claude Code executor's scope) — the independent review gates every landing: the reviewer runs in the foreground before the report, its last line rides the report's third line, and land.ts refuses a final report without it, with a BLOCKER in it, or reviewed on another commit (EXH-20); the scheduling rule reads the programs a command runs, not words in its data (INC-889, EXH-21); the scratch-repository tests state their time (INC-890). Rulings 1–5 (foundations-turn-k1-r1.md … -r5.md; INC-920): the kit's shell reader reads every command the shell runs; a heredoc's delimiter by the shell's quote removal; a program named by a variable, $'…', a substitution or a glob refused as unreadable; DEC-269 and DEC-270 — the scheduling rule also matches its words in the command's text, blanking only data no program of the command runs. Final HEAD a8a7a207; CI run 40326085964: SUCCESS, and main promoted. The older non-null assertions in .claude/hooks/, the spellings listed in the rulings' reports and INC-921 (the tree-scan time budget) to the next kit turn.
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34b-4.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src supabase e2e` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 318 files, 1967 tests, every one passed); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
d1ff8268acfbe14fc9cf3a38afe982a645f5571ee54e8c18f986f139f6d0fa7e  docs/_changelog.md
6ccb603381005c7cca8f60870858d3d6d2ffef0152cac5534044bbb8ea8f5f51  docs/governance/mechanisms.md
34b705bf8634f5383e496f1963940534ccd6498eca73b7b901b9ab4e5b717d3c  scripts/conformance/on-demand-failure.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34b-4.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the red-first lines; the unit totals; the K2 lists (file:line); "none" for migrations, strings and product code; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): turn 34b-3's census MAJORs closed in a turn of their own, right after turn 34w-2; `null` and `void 0` count as no handler with `undefined`; a handler that only logs stays a review question.
```
