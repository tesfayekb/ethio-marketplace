# Foundations — turn 34d: a test's interception ends with its page — the route guard, the on-demand helper through it, and its census (INC-934); and the non-null census sees the definite-assignment mark (turn K2's report): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34d (2026-10-26; INC-934; register row 57, new; anchors located at a9f033a9516c92454595e47939ce12fa9e04e6c5). ODE-1 (e2e/on-demand-failure.spec.ts) has failed in its helper three times — twice in CI as a retried pass (the flake ledger: run 40384938946 on eb95b9e4, desktop, shard 13, and the run on cd3e00dd: "route.fetch: Target page, context or browser has been closed while running route callback.") and once in Lovable's turn 34c-3 run at 360 ("apiResponse.text: Response has been disposed", e2e/helpers/on-demand.ts :21). The cause: `refuseScripts` fetches each script's real answer and reads it; the refused chunk makes the app reload once (INC-640), and a script fetched for the page being left is still in the handler when that page goes, so Playwright throws inside the handler and the test fails before any product check. This turn lands one guard for every interception that fetches the real answer, puts the on-demand helper through it, and lands the census that holds the other three spec files at their counts. And turn K2's report found a gap: the non-null census does not see a definite-assignment assertion (a `let` or a class field marked `!` before its type) — the same mark in another place; it counts them now (13 in three files), and their allowlist lines rise to match. Tier B (test infrastructure; a conformance guard; no product code). No migration. No string. No package change. AGENTS.md: one clause added to its browser-tests line (EDIT below). No file deleted. Base: dev a9f033a9516c92454595e47939ce12fa9e04e6c5 (turn 34c-5's landing). The executor is Claude Code (DEC-257: the operator is present and starts the session; this brief was first built for Lovable, whose workspace ran out of credits, and is re-cut for the kit — the same work). ONE TURN. Parts, IN THIS ORDER: A — orient and CI first; STEP 0 (the brief and the roadmap); B — red first (shown, not committed); C — the guard (B and C one commit); D — docs; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: a9f033a9516c92454595e47939ce12fa9e04e6c5
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
AGENTS.md
e2e/helpers/on-demand.ts
e2e/helpers/route-guard.ts
scripts/conformance/non-null-allowlist.txt
scripts/conformance/non-null.test.ts
scripts/conformance/route-guard-allowlist.txt
scripts/conformance/route-guard.test.ts
src/test/e2e-route-guard.test.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: a test's interception ends with its page — a route handler that fetches the real answer may outlive the page it serves (a reload, a navigation, the test's end), and its failure then is no finding about the product (register row 57, new).
MECHANISM: NONE YET — built in Part C as e2e/helpers/route-guard.ts: `whilePageLives(handler)` wraps a route handler — Playwright's two errors for a page that has gone ("Target page, context or browser has been closed", "Response has been disposed"; `pageWentAway(error)`) end the request, every other error throws.
CONSUMERS (every `page.route` handler in e2e/ that calls its route's `fetch()` at BASE — the census's own list): e2e/helpers/on-demand.ts :19 `refuseScripts` (ODE-1's helper) → through whilePageLives, here; e2e/shell.spec.ts :3857 (PK-2) and :3890 (PK-3); e2e/post-wizard-bundle2.spec.ts :268 and :386; e2e/post-wizard-specs.spec.ts :2549 → held at their counts by their allowlist lines until each file is next run whole (G37: a touched spec file runs whole, and these three are long). Handlers that never fetch (they fulfil, continue or abort) cannot outlive a fetch and are not in the census.
COVERED HERE: the on-demand helper and the guard. LEFT: the three spec files, by their allowlist lines (INC-934).
CONFORMANCE GUARD: CF-RG-1 (scripts/conformance/route-guard.test.ts — every e2e `page.route`/`context.route` handler written inline that calls its route's `fetch()` is named, keyed `<file> (<count>)`; scripts/conformance/route-guard-allowlist.txt, the kit's `key | reason | until` form, a count that only falls) — red on BASE naming e2e/helpers/on-demand.ts :19; CF-RG-2 (planted: an inline fetching handler named; a guarded one and one that never fetches passed); RG-1 and RG-2 (src/test/e2e-route-guard.test.ts — the two errors named and no other; a gone page ends the handler, another failure throws, an answering handler untouched).
EXCEPTIONS: the three spec files' lines, until INC-934.
FIVE LENSES — security: none (test code) · performance: none · failure modes: the subject — a request whose page has gone ends; any other error in a handler still fails its test (no assertion loosened: the product checks after the reload are unchanged) · consistency: one guard for every fetching interception · future growth: a new interception that reads the real answer wraps its handler once; CF-RG-1 names it otherwise.
FORWARD-SCAN: none of turns 35–37 adds an interception. REGISTER: row 57 added (Part D).

THE SYSTEM (G0) — the second concern, row 56 continued (turn K2's report).
CONCERN: no code gains a TypeScript non-null assertion — in any position the mark takes.
MECHANISM: scripts/conformance/non-null.test.ts `nonNullCensus` — now also a VariableDeclaration or PropertyDeclaration with an `exclamationToken` (`isDefiniteAssignment`).
CONSUMERS (the census's own reading of BASE): 13 definite-assignment assertions — src/features/posting/use-draft.test.tsx 10 (its line 24 → 34), src/lib/refresh-after-write.test.ts 1 (5 → 6), e2e/post-wizard-bundle2.spec.ts 2 (a new line at 2).
COVERED HERE: the census and the three lines. LEFT: the assertions themselves, file by file (INC-932's ratchet).
CONFORMANCE GUARD: CF-NN-1 (it names the three files' new counts on BASE as stale lines); CF-NN-2 (its planted file gains a `let later!: number`).
EXCEPTIONS: as row 56. FIVE LENSES — security: none · performance: none · failure modes: none · consistency: one census for the one mark · future growth: a new place for the mark is one more node kind. FORWARD-SCAN: none. REGISTER: row 56's exceptions cell.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34d.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md: on line 3, the text after "The brief in force: " up to and including `(Foundations turn 34c-5: every session read in the browser through the door — INC-933)` becomes `docs/governance/briefs/foundations-turn-34d.md (Foundations turn 34d: a test's interception ends with its page — INC-934)` (everything after it stays, as it is); and these edits (turn 34c-5 ticked with its closing run; the session clocks' storage-key line ticked — turn 34c-2 did it; this turn's own line):
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] The session clocks' storage key (src/features/session/session-policy.ts :64-:132) onto the door's storedSessionKey, with the census of the e2e session helpers that name the same key (e2e/helpers/session.ts :61, e2e/auth-signout.spec.ts :211) — DEC-261's K2 (Foundations turn 34).
OLD-END
NEW-BEGIN
  - [x] The session clocks' storage key (src/features/session/session-policy.ts :64-:132) onto the door's storedSessionKey, with the census of the e2e session helpers that name the same key (e2e/helpers/session.ts :61, e2e/auth-signout.spec.ts :211) — DEC-261's K2 (Foundations turn 34). Done in turn 34c-2 (SPK-1/2/3); the browser tests' side is turn 34c-4's line.
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Turn 34c-5 (docs/governance/briefs/foundations-turn-34c-5.md; no migration; Lovable) — INC-933: every session read in the browser through the door's `currentSession()` and its `failed` — the posting service's own-row reads (`signedInSellerId`, a failed read a reader failure), the price prefills, the step-up freshness, Account's and Settings' member-since (the session's own `created_at`, no `getUser()` round trip), the auth service's commit poll, mount read, verification landing (`unavailable`) and reset (try again, never a dead link; ASC-8/9); the census of reads around the door (CF-SESSION-3/4), its one allowlist line the password proof's server read of the e-mail (DEC-274).
OLD-END
NEW-BEGIN
  - [x] Turn 34c-5 (docs/governance/briefs/foundations-turn-34c-5.md; no migration; Lovable) — INC-933: every session read in the browser through the door's `currentSession()` and its `failed` — the posting service's own-row reads (`signedInSellerId`, a failed read a reader failure), the price prefills, the step-up freshness, Account's and Settings' member-since (the session's own `created_at`, no `getUser()` round trip), the auth service's commit poll, mount read, verification landing (`unavailable`) and reset (try again, never a dead link; ASC-8/9); the census of reads around the door (CF-SESSION-3/4), its one allowlist line the password proof's server read of the e-mail (DEC-274). Final HEAD a9f033a9; CI run 40406394089: SUCCESS (every lane green, 0 flaky; main promoted to a9f033a9).
  - [ ] Turn 34d (docs/governance/briefs/foundations-turn-34d.md; no migration; Lovable) — INC-934: a test's interception ends with its page — e2e/helpers/route-guard.ts `whilePageLives` (a handler whose page has gone ends; every other error throws), the on-demand helper's script refusal through it (ODE-1's flake); CF-RG-1/2 hold e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2) and e2e/post-wizard-specs.spec.ts (1) at their counts until each is next run whole; RG-1/2.
NEW-END
Commit `turn 34d: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`, its Bash call with a timeout of 1800000 ms); END THE TURN when it prints `LANDED <sha>`. Do not stop anywhere else. A STOP (a rule conflict, a file outside SCOPE, a census hit this brief did not anticipate, an environment limit) is landed as 00-executor-protocol.md says: commit what is green, write docs/governance/reports/foundations-turn-34d.stop-<n>.md, commit it, land, end the turn; the supervisor answers in this session with "continue" or a numbered ruling.
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. e2e/helpers/route-guard.ts (new) and e2e/helpers/on-demand.ts are the only e2e/ files that change; no spec file changes.
- EXACT TEXT (INC-907): every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text — apply it with your file-editing tool, in the order given; copy each block from the saved brief (docs/governance/briefs/foundations-turn-34d.md), never retyped and never from memory or a summary of it: if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW or FILE block carries a non-null assertion (CF-NN-1 counts them).
- THE FILES: the SCOPE block above (AGENTS.md included), plus from the standing allowance only docs/governance/briefs/foundations-turn-34d.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34d.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit, `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Parts B and C together (`turn 34d parts B–C: the route guard and the definite-assignment census`); Part D (`turn 34d part D: docs`); the report (`turn 34d: report`).
- RED FIRST (G38): Part B shows CF-RG-1 failing on BASE (it names the on-demand helper's handler) and CF-NN-1 failing (the census now sees the definite-assignment marks the allowlist does not hold) before Part C's edits; B's red is shown and pasted, never committed (B and C land as one green commit). RG-1/2 test a new module (no red run owed — G38: a test for new behaviour).
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 have timed out in sandboxes, and EXH-4 and EXH-21 under a full run's load, passing alone (INC-890); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under a full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under Limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; THE END-TO-END CHECK through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, each Bash call with a timeout of 1800000 ms; stop any preview server a killed run left on port 4173 before the next run; no local repeat runs (DEC-184); a run that is killed or cut short is reported as such and never re-run in the background (S407).
- Behaviour contract: no product behaviour changes. The on-demand helper refuses and serves scripts exactly as at BASE; a script request whose page has gone ends instead of failing the test. Nothing else changes.
- Knowledge K: K1 the census above; K2 the report lists (file:line) any interception in e2e/ that reads the real answer by another path the census does not see (a handler passed by name, `route.fetch` on a renamed route, a `context.route` set elsewhere) — listed, not changed; K3 the guard lands with the fix; K4–K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; CF-RG-1/2 and RG-1/2 are new; CF-NN-2's planted file gains one mark; ODE-1 unchanged; every other test unchanged.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI FIRST.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says (fetch; local dev brought level as a fast-forward — the session setup did it at startup; git switch dev); paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE is a STOP. Read CI with the two-step check (.claude/rules/40-ci-evidence.md): `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, then e2e-last-failure.md and guards-last-failure.md the same way; paste the first six lines of the first and every failing job's evidence lines (expected: run 40406394089 on BASE (turn 34c-5's landing) — SUCCESS, every lane green, 0 flaky, main promoted to BASE; a red on any later commit is read and named). A red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The route-guard census — BLOCK 1 (scripts/conformance/route-guard.test.ts) and its allowlist — BLOCK 2 (scripts/conformance/route-guard-allowlist.txt).
B2. The non-null census sees the definite-assignment mark:
EDIT scripts/conformance/non-null.test.ts #1
OLD-BEGIN
 * and a file that gains one is named. The kit holds none (turn K2 took out its 22).
OLD-END
NEW-BEGIN
 * and a file that gains one is named. The kit holds none (turn K2 took out its 22). Turn 34d
 * (K2's report): a definite-assignment assertion (a `let` or a class field marked `!` before its
 * type) is the same mark in another place and counts too.
NEW-END
EDIT scripts/conformance/non-null.test.ts #2
OLD-BEGIN
/** Each file's non-null assertions, by line. */
OLD-END
NEW-BEGIN
/** A definite-assignment assertion: a `let` or a class field marked `!` before its type. */
function isDefiniteAssignment(node: ts.Node): boolean {
  return (
    (ts.isVariableDeclaration(node) || ts.isPropertyDeclaration(node)) &&
    node.exclamationToken !== undefined
  );
}

/** Each file's non-null and definite-assignment assertions, by line. */
NEW-END
EDIT scripts/conformance/non-null.test.ts #3
OLD-BEGIN
      if (!ts.isNonNullExpression(node) || isEnvRead(node.expression)) return;
OLD-END
NEW-BEGIN
      const asserted =
        (ts.isNonNullExpression(node) && !isEnvRead(node.expression)) || isDefiniteAssignment(node);
      if (!asserted) return;
NEW-END
EDIT scripts/conformance/non-null.test.ts #4
OLD-BEGIN
        `export function f(a: { b?: string }, list: string[]) {\n  const head = list[0]${bang};\n  return a.b${bang}.length + head.length;\n}\n`,
OLD-END
NEW-BEGIN
        `export function f(a: { b?: string }, list: string[]) {\n  const head = list[0]${bang};\n  let later${bang}: number;\n  later = 1;\n  return a.b${bang}.length + head.length + later;\n}\n`,
NEW-END
EDIT scripts/conformance/non-null.test.ts #5
OLD-BEGIN
      expect([...sites]).toEqual([[bad, [2, 3]]]);
      expect(nonNullKeys(sites)).toEqual([`${bad} (2)`]);
OLD-END
NEW-BEGIN
      expect([...sites]).toEqual([[bad, [2, 3, 5]]]);
      expect(nonNullKeys(sites)).toEqual([`${bad} (3)`]);
NEW-END
B3. Run `bunx vitest run scripts/conformance/route-guard.test.ts scripts/conformance/non-null.test.ts` — the supervisor's run on BASE: `Tests  2 failed | 2 passed (4)`: CF-RG-1 (`expected 'e2e/helpers/on-demand.ts:19 a route h…' to be ''` — the on-demand helper's script refusal fetches the real answer outside whilePageLives) and CF-NN-1 (`scripts/conformance/non-null-allowlist.txt:117 stale allowance: src/features/posting/use-draft.test.tsx (24)` — the census now counts its ten definite-assignment marks) — paste the failure lines and the totals.

PART C — THE GUARD.
C1. The guard — BLOCK 3 (e2e/helpers/route-guard.ts) and its tests — BLOCK 4 (src/test/e2e-route-guard.test.ts).
C2. The on-demand helper through it:
EDIT e2e/helpers/on-demand.ts #1
OLD-BEGIN
import { STALE_CHUNK_KEY } from "../../src/lib/stale-chunk";
import { waitForHydration } from "./ui";
OLD-END
NEW-BEGIN
import { STALE_CHUNK_KEY } from "../../src/lib/stale-chunk";
import { whilePageLives } from "./route-guard";
import { waitForHydration } from "./ui";
NEW-END
EDIT e2e/helpers/on-demand.ts #2
OLD-BEGIN

/** Every script `refuse` names (by its address and its text) is refused, as a dropped download. */
export async function refuseScripts(
OLD-END
NEW-BEGIN

/**
 * Every script `refuse` names (by its address and its text) is refused, as a dropped download.
 * INC-934 — the refused chunk makes the app reload once, so a script fetched for the page being
 * left can still be in this handler when that page goes: it ends there (whilePageLives).
 */
export async function refuseScripts(
NEW-END
EDIT e2e/helpers/on-demand.ts #3
OLD-BEGIN
): Promise<void> {
  await page.route("**/*.js", async (route) => {
    const response = await route.fetch();
    if (refuse(route.request().url(), await response.text())) await route.abort("failed");
    else await route.fulfill({ response });
  });
}
OLD-END
NEW-BEGIN
): Promise<void> {
  await page.route(
    "**/*.js",
    whilePageLives(async (route) => {
      const response = await route.fetch();
      if (refuse(route.request().url(), await response.text())) await route.abort("failed");
      else await route.fulfill({ response });
    }),
  );
}
NEW-END
C3. The non-null allowlist's three lines (the census's counts):
EDIT scripts/conformance/non-null-allowlist.txt #1
OLD-BEGIN
e2e/photo-pipeline.spec.ts (84) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-category.spec.ts (15) | non-null assertions written before the platform rule was enforced | INC-932
OLD-END
NEW-BEGIN
e2e/photo-pipeline.spec.ts (84) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-bundle2.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-category.spec.ts (15) | non-null assertions written before the platform rule was enforced | INC-932
NEW-END
EDIT scripts/conformance/non-null-allowlist.txt #2
OLD-BEGIN
src/features/posting/step-where.tsx (9) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/use-draft.test.tsx (24) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/where-seed.test.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
OLD-END
NEW-BEGIN
src/features/posting/step-where.tsx (9) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/use-draft.test.tsx (34) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/where-seed.test.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
NEW-END
EDIT scripts/conformance/non-null-allowlist.txt #3
OLD-BEGIN
src/i18n/locales/am-script.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/lib/refresh-after-write.test.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
src/lib/route-client.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
OLD-END
NEW-BEGIN
src/i18n/locales/am-script.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/lib/refresh-after-write.test.ts (6) | non-null assertions written before the platform rule was enforced | INC-932
src/lib/route-client.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
NEW-END
C4. `bun run typecheck`; `bunx vitest run scripts/conformance src/test` — every test passes (paste the totals; the known limits above excepted). Commit Parts B and C.

PART D — DOCS.
D1. These edits (AGENTS.md's browser-tests line; the register's rows 56 (its exceptions cell) and 57; the changelog), then commit Part D:
EDIT AGENTS.md #1
OLD-BEGIN
- Browser tests start only with `bun run e2e:local` / `e2e:changed`, never plain `playwright test`; targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`); never supabase/config.toml.
OLD-END
NEW-BEGIN
- Browser tests start only with `bun run e2e:local` / `e2e:changed`, never plain `playwright test`; targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`); never supabase/config.toml; a route handler that fetches the real answer goes through whilePageLives (e2e/helpers/route-guard.ts, CF-RG-1).
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 56 | No code gains a TypeScript non-null assertion — the executor's platform rule: narrow with a guard or optional chaining (a `process.env` read excepted) | `scripts/conformance/non-null.test.ts` (`nonNullCensus`: every non-null assertion in src/ but src/integrations/, scripts/, e2e/ and .claude/hooks/) with its ratchet, `scripts/conformance/non-null-allowlist.txt` — one line per file, keyed `<file> (<count>)`, so a file that sheds one lowers its line (the old line goes stale and fails) and a file that gains one is named | CF-NN-1, CF-NN-2 | 143 files hold the 979 assertions written before the rule was enforced (INC-932), each at its count | a new file starts at zero; a refactor lowers its file's count | the kit (.claude/hooks) at zero since turn K2; Foundations turn K2 |
OLD-END
NEW-BEGIN
| 56 | No code gains a TypeScript non-null assertion — the executor's platform rule: narrow with a guard or optional chaining (a `process.env` read excepted) | `scripts/conformance/non-null.test.ts` (`nonNullCensus`: every non-null assertion in src/ but src/integrations/, scripts/, e2e/ and .claude/hooks/) with its ratchet, `scripts/conformance/non-null-allowlist.txt` — one line per file, keyed `<file> (<count>)`, so a file that sheds one lowers its line (the old line goes stale and fails) and a file that gains one is named | CF-NN-1, CF-NN-2 | 144 files hold the 979 non-null and 13 definite-assignment assertions (a `let` or a class field marked `!` before its type, counted since turn 34d) written before the rule was enforced (INC-932), each at its count | a new file starts at zero; a refactor lowers its file's count | the kit (.claude/hooks) at zero since turn K2; Foundations turn K2 |
| 57 | A test's interception ends with its page: a route handler that fetches the real answer can outlive the page it serves (the app's one reload for a failed chunk, a navigation, the test's end), and Playwright then throws inside the handler — a test failed in its helper, not on the product (INC-934) | `e2e/helpers/route-guard.ts` — `whilePageLives(handler)` (a closed page or a disposed response ends the request; every other error throws) and `pageWentAway(error)` | `scripts/conformance/route-guard.test.ts` (CF-RG-1: every e2e `page.route` handler that calls its route's `fetch()` goes through whilePageLives, or its file's allowlist line holds it at its count; CF-RG-2: planted); RG-1/2 (`src/test/e2e-route-guard.test.ts`); ODE-1 | `scripts/conformance/route-guard-allowlist.txt` — e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2), e2e/post-wizard-specs.spec.ts (1), until INC-934: each moves when its file is next run whole (G37) | a new interception that reads the real answer wraps its handler once | the on-demand helper (refuseScripts) since turn 34d; Foundations turn 34d |
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34c-5 (2026-10-26; INC-933) — every session read in the browser goes through the door's `currentSession()` and reads its `failed`: the posting service's own-row reads (a failed read is a typed reader failure, never "nobody signed in"), the price prefills, the step-up freshness, Account and Settings (member since from the session's own `created_at` — no server round trip; nor for the seller's identity read in the wizard and on the seller's own ad page, which asked the server for the user's id), and the auth service's own flows — a reset whose recovery session could not be read answers "try again", not "the link is invalid" (ASC-8); a verification landing answers "unavailable", not a failed link (ASC-9). The census CF-SESSION-3/4 names any `.auth.getSession()` or `.auth.getUser()` around the door; its one allowlist line is the password proof's server read of the e-mail (DEC-274). Settings leaves the vendor-seams allowlist (INC-877): it reaches Supabase only through the door.
OLD-END
NEW-BEGIN
- Foundations turn 34c-5 (2026-10-26; INC-933) — every session read in the browser goes through the door's `currentSession()` and reads its `failed`: the posting service's own-row reads (a failed read is a typed reader failure, never "nobody signed in"), the price prefills, the step-up freshness, Account and Settings (member since from the session's own `created_at` — no server round trip; nor for the seller's identity read in the wizard and on the seller's own ad page, which asked the server for the user's id), and the auth service's own flows — a reset whose recovery session could not be read answers "try again", not "the link is invalid" (ASC-8); a verification landing answers "unavailable", not a failed link (ASC-9). The census CF-SESSION-3/4 names any `.auth.getSession()` or `.auth.getUser()` around the door; its one allowlist line is the password proof's server read of the e-mail (DEC-274). Settings leaves the vendor-seams allowlist (INC-877): it reaches Supabase only through the door.

- Foundations turn 34d (2026-10-26; INC-934) — a test's interception ends with its page: e2e/helpers/route-guard.ts's `whilePageLives` ends a route handler whose page has gone (the app's one reload for a failed chunk closed it mid-fetch — ODE-1's "Target page, context or browser has been closed" and "Response has been disposed") and throws every other error; the on-demand helper's script refusal goes through it. CF-RG-1/2 name every e2e handler that fetches the real answer outside it — three spec files held at their counts until each is next run whole; RG-1/2 pin the helper. And K2's report: the non-null census counts a definite-assignment assertion (a `let` or a class field marked `!` before its type) as the same mark — 13 in three files, their allowlist counts raised to match (e2e/post-wizard-bundle2.spec.ts joins at 2); CF-NN-2 plants one.
NEW-END

THE CHECKS (in this order; `bun .claude/hooks/land.ts` runs them again before it pushes): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34d.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/features src/routes src/lib src/components src/integrations supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals — the supervisor's run: 326 files, 1996 tests, every one passed); `bun run i18n:usage` (no change to either map); `bun run build`; `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
a79255e6543ff4b9d2239332416d92445c5d7fdf8a429072f08857f3304d6984  AGENTS.md
32a9191dc7e6a140dd1524351f77d38b1a5fe745020f9656bcca51f0e1131491  docs/_changelog.md
6fd99f4655003705727f1dd926a93fa233e2e80301cd7ec75114397aca968bce  docs/governance/mechanisms.md
7b45f6403165ec033bc520104017e7be8aa8a7b5cfc6f5d98b84850b3de46d73  e2e/helpers/on-demand.ts
7b649b6e00070527f46b16960da44e3dcf7e422fcbcee174ac780d4c50692178  e2e/helpers/route-guard.ts
6d7938d75d14110e5beb87e1c52b9ac6210cc49ac0c4f45afadcde6fc5b91c4b  scripts/conformance/non-null-allowlist.txt
8a4323b8e7156829567d66340cb6c924d0b043206b04b14b1066b6e59ff05b34  scripts/conformance/non-null.test.ts
a582a93436746d1f7c488629a538cbd66ab9c43cfcb13f2cd3045bd46f564850  scripts/conformance/route-guard-allowlist.txt
6738e93efd718a0ebac68f0d5ff5bb29a7e3e848713047f6992803e249778c76  scripts/conformance/route-guard.test.ts
92ad5c0af1978c782dcbb07b3e71bbdba295f70ad2e42355be5b5b96a89cb83a  src/test/e2e-route-guard.test.ts

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>`; both projects, 0 retries, fake mode; G37: the changed helper's specs — the on-demand helper is used by e2e/on-demand-failure.spec.ts alone; CI runs every test on every commit): e2e/on-demand-failure.spec.ts whole; paste every count line and the server log's `[ssr-error]` count by path.

THE INDEPENDENT REVIEW: after THE END-TO-END CHECK the `reviewer` subagent runs on the last code commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR is fixed inside SCOPE when this brief's text allows it, otherwise listed under Departures for a ruling. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34d.report.md, with the twelve headings of .claude/rules/60-report.md, carrying: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract — the on-demand helper before → after (3); the consumer census with file:line, re-located at <START> (4); the red-first lines, the unit totals and the E2E count lines (5); the K2 list, file:line (6); CF-RG-1/2, CF-NN-1/2 and RG-1/2 lines (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12); the reviewer's last line. Commit it (`turn 34d: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): a definite-assignment assertion counts in the non-null ratchet as the non-null rule's same mark (raising three lines to the census's counts, never lowering a check); the three spec files' handlers are held by a ratchet line rather than moved here (each file is long and a touched spec file runs whole — G37); a request whose page has gone ends without a log line (it is the expected end of a reload, and a failure that matters still throws).

BLOCK 1 — FILE-BEGIN scripts/conformance/route-guard.test.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-934 (Foundations turn 34d) — A TEST'S INTERCEPTION ENDS WITH ITS PAGE. A route handler in
 * e2e/ that fetches the real answer (`route.fetch()`) can outlive its page — a reload, a
 * navigation, the test's end — and then throws from inside Playwright, failing the test in its
 * helper. Every such handler goes through `whilePageLives` (e2e/helpers/route-guard.ts); a file
 * whose handlers do not yet is held at its count by its allowlist line, which only falls.
 */

type Finding = { file: string; line: number; what: string };

/** The handler's own name for its route (its first parameter), when it has one. */
function routeName(handler: ts.ArrowFunction | ts.FunctionExpression): string | null {
  const first = handler.parameters[0];
  return first !== undefined && ts.isIdentifier(first.name) ? first.name.text : null;
}

/** Whether a handler's body calls `<its route>.fetch(…)`. */
function fetchesTheAnswer(handler: ts.ArrowFunction | ts.FunctionExpression): boolean {
  const name = routeName(handler);
  if (name === null) return false;
  let found = false;
  const look = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "fetch" &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === name
    )
      found = true;
    if (!found) ts.forEachChild(node, look);
  };
  look(handler.body);
  return found;
}

/** Each file's route handlers that fetch the real answer outside `whilePageLives`, by line. */
export function unguardedHandlers(files: string[]): Map<string, number[]> {
  const sites = new Map<string, number[]>();
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isPropertyAccessExpression(node.expression) ||
        node.expression.name.text !== "route"
      )
        return;
      const handler = node.arguments[1];
      if (handler === undefined) return;
      if (!ts.isArrowFunction(handler) && !ts.isFunctionExpression(handler)) return;
      if (!fetchesTheAnswer(handler)) return;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      sites.set(file, [...(sites.get(file) ?? []), line]);
    });
  }
  return sites;
}

const ALLOWLIST = "scripts/conformance/route-guard-allowlist.txt";

const domain = walkFiles(["e2e"], { ext: ["ts"] });

describe("a test's interception ends with its page (INC-934)", () => {
  it(
    "CF-RG-1 every e2e route handler that fetches the real answer goes through whilePageLives, or its file's line holds it",
    () => {
      const sites = unguardedHandlers(domain);
      const keys = [...sites].map(([file, lines]) => `${file} (${lines.length})`);
      const allowed = readAllowlist(ALLOWLIST, keys);
      const findings: Finding[] = [];
      for (const [file, lines] of sites) {
        if (allowed.has(`${file} (${lines.length})`)) continue;
        for (const line of lines)
          findings.push({
            file,
            line,
            what: "a route handler fetches the real answer outside whilePageLives (e2e/helpers/route-guard.ts)",
          });
      }
      console.log(`[route-guard] files read: ${domain.length}; unguarded handlers: ${keys.length}`);
      expect(domain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-RG-2 the census names a planted unguarded handler and passes a guarded one and one that never fetches", () => {
    const dir = "node_modules/.cache/route-guard";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/rg-planted.ts`;
    try {
      writeFileSync(
        file,
        [
          'import type { Page } from "@playwright/test";',
          'import { whilePageLives } from "../../../e2e/helpers/route-guard";',
          "export async function a(page: Page) {",
          '  await page.route("**/*.js", async (route) => {',
          "    const response = await route.fetch();",
          "    await route.fulfill({ response });",
          "  });",
          "  await page.route(",
          '    "**/*.css",',
          "    whilePageLives(async (route) => {",
          "      const response = await route.fetch();",
          "      await route.fulfill({ response });",
          "    }),",
          "  );",
          '  await page.route("**/*.png", (route) => route.abort("failed"));',
          "}",
          "",
        ].join("\n"),
      );
      expect([...unguardedHandlers([file])]).toEqual([[file, [4]]]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/route-guard.test.ts

BLOCK 2 — FILE-BEGIN scripts/conformance/route-guard-allowlist.txt
# The route-guard census (scripts/conformance/route-guard.test.ts, turn 34d — INC-934): one line per e2e file whose
# route handlers still fetch the real answer outside whilePageLives — key "<file> (<count>)" | reason | until.
# A file that moves a handler onto whilePageLives lowers its count here (the old line goes stale and fails).
e2e/post-wizard-bundle2.spec.ts (2) | handlers written before whilePageLives; they move when the file is next run whole (G37) | INC-934
e2e/post-wizard-specs.spec.ts (1) | handlers written before whilePageLives; they move when the file is next run whole (G37) | INC-934
e2e/shell.spec.ts (2) | handlers written before whilePageLives; they move when the file is next run whole (G37) | INC-934
FILE-END scripts/conformance/route-guard-allowlist.txt

BLOCK 3 — FILE-BEGIN e2e/helpers/route-guard.ts
import type { Route } from "@playwright/test";

/**
 * INC-934 (Foundations turn 34d) — A REQUEST THAT OUTLIVES ITS PAGE. A route handler that fetches
 * or reads the real answer can still be running when its page goes away (the app's one reload for
 * a failed chunk, a navigation, the test's end); Playwright then throws from `route.fetch()`,
 * `response.text()` or `route.fulfill()`. That page has no one left to answer, so the request ends
 * there. Any other error is the test's own and throws.
 */

/** The two errors Playwright gives a handler whose page has gone. */
export function pageWentAway(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /Target page, context or browser has been closed|Response has been disposed/.test(message);
}

/** A route handler that ends when its page has gone (INC-934); every other error throws. */
export function whilePageLives(
  handler: (route: Route) => Promise<void>,
): (route: Route) => Promise<void> {
  return async (route) => {
    try {
      await handler(route);
    } catch (error) {
      if (pageWentAway(error)) return;
      throw error;
    }
  };
}
FILE-END e2e/helpers/route-guard.ts

BLOCK 4 — FILE-BEGIN src/test/e2e-route-guard.test.ts
/**
 * INC-934 — a test's interception ends with its page (e2e/helpers/route-guard.ts): a route handler
 * whose page has gone ends quietly; every other error is the test's own and throws.
 */
import type { Route } from "@playwright/test";
import { describe, expect, it } from "vitest";

import { pageWentAway, whilePageLives } from "../../e2e/helpers/route-guard";

const route = {} as unknown as Route;

describe("a test's interception ends with its page (INC-934)", () => {
  it("RG-1 the two errors Playwright gives a handler whose page has gone are named, and no other", () => {
    expect(
      pageWentAway(
        new Error(
          "route.fetch: Target page, context or browser has been closed while running route callback.",
        ),
      ),
    ).toBe(true);
    expect(pageWentAway(new Error("apiResponse.text: Response has been disposed"))).toBe(true);
    expect(pageWentAway(new Error("route.fulfill: Route is already handled!"))).toBe(false);
    expect(pageWentAway(new Error("expect(received).toBe(expected)"))).toBe(false);
    expect(pageWentAway("Target page, context or browser has been closed")).toBe(true);
  });

  it("RG-2 a handler whose page has gone ends; any other failure throws; a handler that answers is untouched", async () => {
    const calls: string[] = [];
    await expect(
      whilePageLives(async () => {
        calls.push("gone");
        throw new Error("apiResponse.text: Response has been disposed");
      })(route),
    ).resolves.toBeUndefined();
    await expect(
      whilePageLives(async () => {
        throw new Error("the test's own failure");
      })(route),
    ).rejects.toThrow("the test's own failure");
    await whilePageLives(async (given) => {
      calls.push(given === route ? "answered" : "another route");
    })(route);
    expect(calls).toEqual(["gone", "answered"]);
  });
});
FILE-END src/test/e2e-route-guard.test.ts
```
