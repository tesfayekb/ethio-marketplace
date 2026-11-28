CURSOR BUNDLE 8c-3a — the failure census sees every failure branch (INC-1349, INC-1347's guard); an action's failure keeps what failed (INC-1351); the route boundary's shape refusal carries a code (INC-1352). Base: dev f61239565

Stem: `cursor-bundle-8c-3a` (brief `docs/governance/briefs/cursor-bundle-8c-3a.md` (new); report `docs/governance/reports/cursor-bundle-8c-3a.report.md` (new)). Tier A (the route boundary answers every route's malformed input; the failure notice draws every failed read). FLAGS: no-migration, no-new-string, no-package-change, no-agents-change. NO PLANNING STOP (DEC-492 (4)): the supervisor ran the census on its own clone of f61239565 and it is written into STEP 1 below. You check the facts STEP 1 names, write what you find into the report's §2, and build straight on. You stop only when one of STEP 1's premises is wrong.

**MODEL — Claude Sonnet 5.5, in a NEW Cursor chat.**

THE ORDER (DEC-502, the supervisor's, G17, overridable; it amends DEC-494 and DEC-500): Cursor 8c-3 is three lanes, because a Cursor lane carries at most three fixes. This lane, 8c-3a, finishes "a failure or a refusal as the screen reads it". 8c-3b carries the permission read and the gates on screens: INC-1345 with INC-1310's class guard, INC-1346, and INC-1353. 8c-3c carries the browser tests for the list's remaining rows (re-split by DEC-498 and DEC-501), WebKit (INC-1328, DEC-483), and the harness's small debts (INC-1336's remainder, INC-1335, INC-1337). Lovable's lane UF-2 (component tests for the staff screens) is open on `lovable/next`: it adds new `*-states.test.tsx` files in the staff folders and removes A-row lines from `scripts/conformance/user-facing-allowlist.txt` (read by `scripts/conformance/user-facing.test.ts`). This lane edits none of those files.

PREVENTION (G70 — three classes recurred):
- (1) A guard's census narrower than its concern (INC-1349: FNC-4 reads `x.error` and `.failed`, not a bare `error` or a renamed flag; INC-1347: a boolean handed to the notice).
- (2) An action's failure dropped before the screen can draw it (INC-1351, after 8c-2b's `savePin`).
- (3) A route refusal with no code (INC-1352, after INC-1340).
- Repository: Part A lands FNC-5 and FNC-6 and empties the census's dated lines; Part B lands RT-23 and RCL-27.
- Instructions: changed, in force now. A census I write into a GO names the forms its concern takes in the tree (a member flag, a bare flag, a renamed flag, a word), each with a plant. 8c-2b's GO named only the first.
- Cursor rules: not needed.
- Knowledge: not needed (no Lovable path).

THE SYSTEM (G0) — fix A: the failure census sees every failure branch
CONCERN: every branch that draws a failed read or action draws it through the shared notice, or through its family's words when the failure is a refusal, and the census sees each such branch whatever its condition is called.
MECHANISM: the failure-notice census `src/components/shell/failure-notice.census.test.ts` (`FAILURE_BRANCH` at line 27, `branchHits`, `BRANCH_ALLOW` at line 169), over `FailureNotice` (`src/components/shell/failure-notice.tsx`).
CONSUMERS:
  - INC-1349, three branches the census does not see, each drawing its own alert with no Retry, in a file that may draw the notice elsewhere:
    - `src/features/admin/roles/role-detail.tsx` lines 38 to 45: `if (error) {` on a destructured `error` (line 27).
    - `src/features/admin/users/user-detail.tsx` lines 98 to 103: `) : error ? (` on a destructured `error`.
    - `src/features/admin-screening/job-line.tsx` lines 97 to 100: `{line === null ? (`, a renamed flag (`line` is null when `health.error` is set, line 88).
  - INC-1347's class: a table handed `true` as its failure loses the failure's class. Lovable UF-2 fixed both instances on its branch; no guard keeps the class out.
  - INC-1351, the seven dated lines in `BRANCH_ALLOW` (until 2026-12-31), each found at f61239565:
    - `src/features/admin-listings/listings-page.tsx` line 555 (`mayReview && reportsQuery.error`): one failed read drawn once per row.
    - `src/features/posting/map/map-pin-dropper.tsx` line 587 (`state === "failed"`): the pin door's refusal in the posting family's words (Cursor 8c-2b).
    - `src/features/posting/step-photos.tsx` line 719: a failed upload's Retry control.
    - `src/features/posting/step-specifications.tsx` line 1764 (`held.state === "failed"`): a held options read with a state and a rate flag, no error.
    - `src/features/posting/step-where.tsx` lines 1959, 2160 and 2262: the pin, directions and location-details actions' failures, saved as a state with no error.
COVERED HERE:
  - The census sees a branch on a bare or destructured flag (`if (error)`, `error ?`, `error &&`, `isError`, `failed`), and a branch whose span draws a failure word (a catalogue key whose last segment is `error` or ends in `Error`, `Failed` or `failed`) and no outlet, whatever its condition. The exact rule is yours (DECIDE-AND-NAME); it must catch the three INC-1349 branches as they stand at f61239565 and stay quiet on FNC-4's quiet cases.
  - The census refuses a literal boolean handed to an outlet's `error` (`error={x ? true : undefined}`, `error={true}`).
  - The three INC-1349 branches move onto `FailureNotice` with their read's error and a Retry that reads again, each with a unit test beside the file. The rows A10.1, A4.2 and A8.11 stay in `scripts/conformance/user-facing-allowlist.txt` for Lovable's next task; this lane removes no line from that file.
  - Each of the seven dated lines is ended by the cause:
    - The failure keeps what failed (the error or the refusal), and its branch draws it through the notice. A refusal is drawn through its family's words. A rate dial is drawn through the family's dial words.
    - The reports read draws one notice for the table, not one per row.
    - A branch whose span draws only a control and no sentence is not a failure branch; the census learns that by a rule, not by a line.
    - Where a line must stay, it becomes a permanent line whose reason names the decision that makes it right (for example the pin sheet's family words, from Cursor 8c-2b). Its words, state and test ids are unchanged.
    - No dated line remains.
  - Every new hit the widened census finds moves onto the notice in this lane. A hit that needs more than that is a STOP, named with file and line.
CONFORMANCE GUARD: `src/components/shell/failure-notice.census.test.ts` — FNC-5 (new): the three INC-1349 branches as they stand at f61239565 are hits; FNC-4's quiet cases stay quiet. FNC-6 (new): a literal boolean handed to an outlet's `error` is a hit; planted, `src/features/admin/roles/roles-list.tsx` line 239 as it stands at b355cbe00 (`git show b355cbe00:src/features/admin/roles/roles-list.tsx`). The census already runs in the component tests (`scripts/conformance/wired.test.ts` names it).
EXCEPTIONS: permanent `BRANCH_ALLOW` lines, each with the decision it rests on; none dated.
FIVE LENSES — security: a failure's detail travels as data, never a sentence or HTML · performance: the notice is already in the entry; a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number · failure modes: an action that fails keeps its failure, never a bare state · consistency: one notice for every failed read and action · future growth: a new screen's failure branch is seen by the census whatever its flag is called.
FORWARD-SCAN: Stage 2's queue screens draw their failures through the notice. REGISTER: the failure notice's row, amended (FNC-5, FNC-6; the census reads bare and renamed flags and failure words).

THE SYSTEM (G0) — fix B: the route boundary's shape refusal carries a code
CONCERN: every route refusal carries a code, so the screen reads it as a refusal and offers no Retry that cannot succeed (INC-1340's class).
MECHANISM: the route boundary `defineRoute` (`src/server/route.ts`), answering through `clientError` (`src/server/answer.ts` line 104); read on the client by `routeFailure` (`src/lib/route-client.ts`) and `classify` (`src/lib/reader-failure.ts`), which reads a code-shaped body code below 500 from a route as a refusal (8c-2b, RCL-26).
CONSUMERS:
  - `src/server/route.ts` lines 173, 186 and 344: `clientError("bad request", 400)`, a sentence where a code belongs, for a route declared `badShape: "clientError"`.
  - The routes declared so: `src/routes/api/listings/view.ts`, `src/routes/api/listings/share.ts`, `src/routes/api/error-reports.ts`. COUNT: 3 := rg -l -e 'badShape: "clientError"' src/routes | rg -c -e ts
  - `src/routes/api/catalog.find.ts` line 47: `clientError("bad query", 400)`.
  - The tests that assert the sentences: `src/server/route.test.ts` line 605, `src/routes/api/listings/view.test.ts` line 48, `src/routes/api/listings/share.test.ts` line 47, `src/routes/api/catalog.find.test.ts` line 28, `src/server/ad-view.test.ts` line 49, `src/server/ad-share.test.ts` line 65.
COVERED HERE:
  - The four answers carry a code-shaped word: `badShape` for the boundary's three (the reason its verdict form already uses), and one code-shaped word for the catalog finder's. Each status stays 400.
  - The six assertions follow the new body. This is the only change to the behaviour contract, and §3 shows each route's answer before and after.
  - The client reads each as a refusal, with no Retry, through the mechanism 8c-2b built; no client file changes for it.
CONFORMANCE GUARD: `src/server/route.test.ts` — RT-23 (new): no route answers a 4xx whose `error` is not code-shaped; it enumerates every `clientError(` call under `src/` and refuses a first argument with a space. Planted: the base's line 173. `src/lib/route-client.test.ts` — RCL-27 (new): a 400 `{ error: "badShape" }` from a route reads as a refusal, with no Retry.
EXCEPTIONS: none.
FIVE LENSES — security: the body says what kind of input was refused, never which field held what · performance: none · failure modes: a client that meets an old sentence body reads it as malformed, as today · consistency: every route refusal has a code · future growth: a new route's shape refusal is coded by the boundary.
FORWARD-SCAN: every later route. REGISTER: the route boundary's row, amended (RT-23).

SCOPE, by area (each source file's own tests included):
- Fix A: `src/components/shell/` (`failure-notice.census.test.ts`, `failure-notice.tsx` and its tests if the notice needs a size it lacks); `src/features/admin/roles/` (`role-detail.tsx` with its test, new beside it); `src/features/admin/users/` (`user-detail.tsx` with its test, new beside it); `src/features/admin-screening/` (`job-line.tsx` with its test, new beside it); `src/features/admin-listings/` (`listings-page.tsx` with its tests); `src/features/posting/` (`map/map-pin-dropper.tsx`, `step-photos.tsx`, `step-specifications.tsx`, `step-where.tsx`, `posting-service.ts`, `refusal-text.ts`, and their tests); every file the widened census finds, for the move onto the notice only.
- Fix B: `src/server/` (`route.ts`, `answer.ts`, and their tests); `src/routes/api/` (`catalog.find.ts` and the three routes named above, with their tests); `src/server/ad-view.test.ts`, `src/server/ad-share.test.ts`; `src/lib/route-client.test.ts`.
- `docs/features/` (`route-client.md`, `failure-notice.md` if it exists, `ci-guards.md`); the records files.
- Never: any `*-states.test.tsx` file, `scripts/conformance/user-facing-allowlist.txt` or `scripts/conformance/user-facing-manifest.txt` (both read by `scripts/conformance/user-facing.test.ts`; Lovable UF-2's open lane); the locale files, `supabase/`, `.github/`, `AGENTS.md`, package files.

THE TURN, IN THIS ORDER
STEP 0 — on the lane:
- Fetch, then `git switch -c cursor/bundle-8c-3a origin/dev` with origin/dev at `f61239565`. If dev has moved, say so in the report and build on the new dev, unless the move touches a file in SCOPE: that is a STOP.
- `git status --short` must be empty.
- Save this brief byte for byte as `docs/governance/briefs/cursor-bundle-8c-3a.md` (new; scripted copy, saved bare; sha256 equal to the carrier's). Write roadmap line 3 as rule 00 writes it.
- Remove from `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`) every line keyed to a brief other than this one.
- Run `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-3a.md --root .` and paste its output into the report.
- Commit `cursor-bundle-8c-3a: task saved`; it is not pushed alone.
STEP 1 — THE CENSUS, run by the supervisor on f61239565. Check each fact a line names, and write what you find into the report's §2. A wrong premise is the turn's one STOP:
- CENSUS-ITEM consumers: covered — the consumer lists in THE SYSTEM A and B, by `rg -n "BRANCH_ALLOW|FAILURE_BRANCH" src/components/shell`, `rg -n -e 'clientError\("[^"]* [^"]*"' src` and the COUNT line.
- CENSUS-ITEM definition: covered — fix A is defined by what a branch draws (a failure), not by how its flag is named; fix B by every `clientError(` call under `src/`.
- CENSUS-ITEM tests:
  - Fix A: FNC-1 to FNC-4 (with FNC-4b and FNC-4c), and every test of the touched screens: the posting place step's, photos', specifications' and pin sheet's tests, the All listings page's tests; their assertions keep their words and test ids.
  - Fix B: RT-1 to RT-22 and the unnamed route tests in `src/server/route.test.ts`, the four route test files and the two server test files named in THE SYSTEM B, RCL-1 to RCL-26.
- CENSUS-ITEM lists: covered — `scripts/conformance/wired.test.ts` (it names the census's runner); `BRANCH_ALLOW` (read by `src/components/shell/failure-notice.census.test.ts` itself); the guards' register `docs/features/ci-guards.md`.
- CENSUS-ITEM old-file-readers: not applicable — no file moves or is deleted.
- CENSUS-ITEM second-readers: covered — the readers of the four sentence bodies: the six assertions in THE SYSTEM B, and `rg -n -e '"bad request"' -e '"bad query"' src e2e scripts` for any other (`src/server/ai/gateway.test.ts`'s matches are a provider's body, not ours).
- CENSUS-ITEM chunk-graph: covered — the notice and the failure reader are already in the entry and on demand respectively (`dist/.chunk-modules.json` after the build); a drop-in adds no module to a page's first download unless the page lacked the notice.
- CENSUS-ITEM environments: covered — the boundary answers in SSR server routes; the notice draws in the browser and in SSR.
- CENSUS-ITEM mechanisms: covered — `FailureNotice` and its census (fix A); `defineRoute`, `clientError`, `routeFailure`, `classify`, `refusalCode` (fix B); the posting family's words (`src/features/posting/refusal-text.ts`) and dial words (`draftRateText`).
- CENSUS-ITEM first-download: covered — a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number.
- CENSUS-ITEM premises:
  - INC-1349 — SOURCE: `src/components/shell/failure-notice.census.test.ts` line 27 (`FAILURE_BRANCH` needs a member `.error`), and the three branches in THE SYSTEM A. RED-FIRST: FNC-5 on their base text.
  - INC-1347 — SOURCE: `git show b355cbe00:src/features/admin/roles/roles-list.tsx` line 239. RED-FIRST: FNC-6 on that line.
  - INC-1351 — SOURCE: the seven `BRANCH_ALLOW` lines (until 2026-12-31) and the lines named in THE SYSTEM A. CONTROL: each branch's words, state and test ids before and after, in §3; the place step's, photos', specifications' and pin sheet's tests unchanged and green.
  - INC-1352 — SOURCE: `src/server/route.ts` lines 173, 186 and 344, and `src/routes/api/catalog.find.ts` line 47. RED-FIRST: RT-23 on the base's line 173, and RCL-27 against the base's body.
- CENSUS-ITEM callee-codes: not applicable — no door changes.
- CENSUS-ITEM whole-app-calls: covered — the boundary change reaches every route declared `badShape: "clientError"` (three) and the catalog finder; each route's other answers are unchanged.
- CENSUS-ITEM findings: write what you find beyond the task, with file and line, in §13. A security hole is a STOP at once, described in the chat only.
- CENSUS-ITEM gate-reach: not applicable — no gate changes.
- CENSUS-ITEM user-cases: covered — the cases this turn changes, each with the line that answers it:
  - A role whose read fails shows the shared notice with Retry. SOURCE: `src/features/admin/roles/role-detail.tsx` line 38 (today its own alert).
  - A person whose read fails shows the shared notice with Retry. SOURCE: `src/features/admin/users/user-detail.tsx` line 98.
  - The screening job line's failed read shows the shared notice with Retry. SOURCE: `src/features/admin-screening/job-line.tsx` line 97.
  - A route's malformed input is refused with no Retry. SOURCE: `src/server/route.ts` line 173.
  - The place step's pin, directions and details failures say what failed. OPEN: the census of each action's answer decides the words, from the notice or the posting family.
- CENSUS-ITEM queued: covered — `rg -n "8c-3|INC-1347|INC-1349|INC-1351|INC-1352"` across `docs/governance/briefs`, `docs/governance/reports`, `docs/features` and `roadmap.md`.
  - Built here: INC-1349, INC-1347's guard, INC-1351, INC-1352.
  - Left: INC-1345, INC-1310's guard, INC-1346, INC-1353 (Cursor 8c-3b); the list's rows, WebKit, INC-1336's remainder, INC-1335, INC-1337 (Cursor 8c-3c); the rows A10.1, A4.2, A8.11 and INC-1350 (Lovable UF-3).
STEP 2 — PART A: FNC-5 and FNC-6 (red first on their plants); the three drop-ins with their tests; the seven dated lines ended at their causes; every new hit moved onto the notice. Commit per piece if it helps; the last commit of the part is `cursor-bundle-8c-3a part A: the census sees every failure branch`.
STEP 3 — PART B: RT-23 and RCL-27 (red first); the four coded answers; the six assertions. Commit `cursor-bundle-8c-3a part B: a shape refusal carries its code`.
STEP 4 — the docs lines: `docs/features/route-client.md`, the failure notice's feature doc, `docs/features/ci-guards.md`. Commit.
STEP 5 — the checks:
- `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; `bun run checks`.
- Each test file the turn changed, run alone (INC-1306).
- Browser runs (`bun run e2e:local`): the specs that drive the place step's pin, directions and details, and the All listings page, by their ids; both Chromium projects, 0 retries.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-3a.md --at <the commit STEP 0 began from>`, its output pasted.
- Then the self-review (rule 80), before the push. List every MINOR and MAJOR it counts in §10, each fixed or with its reason.
STEP 6 — ONE push; `gh pr ready <number>`; `gh pr checks <number> --watch --interval 60`; green on the last code commit → the comment per rule 00.
STEP 7 — the report, written while CI runs:
- Rule 60's fourteen headings, with the census in §2.
- §3: each touched screen's and route's answer before and after.
- §14 Records, word for word.
- Its push changes records only.

DECIDE-AND-NAME: the census's rule for bare and renamed flags and for failure words; how each of the seven branches keeps what failed; the catalog finder's code word; whether a permanent `BRANCH_ALLOW` line or a census rule ends a branch that draws only a control. A mechanical edit a standing guard demands as a consequence of your own change is in scope wherever it falls, byte for byte, named under §10, unless the file is on SCOPE's never-list (then it is a STOP).

RECORDS (§14), word for word:
- "DEC-502 (the supervisor's, G17; it amends DEC-494 and DEC-500) — Cursor 8c-3 is three lanes. 8c-3a finishes a failure or a refusal as the screen reads it (INC-1349 with INC-1347's guard, INC-1351, INC-1352). 8c-3b carries the permission read and the gates on screens (INC-1345 with INC-1310's guard, INC-1346, INC-1353). 8c-3c carries the browser tests for the list's remaining rows, WebKit (INC-1328, DEC-483) and the harness's small debts (INC-1336's remainder, INC-1335, INC-1337). Why: a Cursor lane carries at most three fixes."
- INC-1349, INC-1351, INC-1352: fixed (what was built), each with its cause as found; INC-1347's guard landed (FNC-6).
- The register rows named in THE SYSTEM blocks; one changelog line.

TOLERANCES (G60), by defect:
- A red whose failure or server log names a path this lane changed is a STOP; any other is named under §11 and CI judges.
- A local failure is fixed at its cause, never retried or loosened; no dial and no timeout is raised; no `retries` is added to a test.
- A test outside fix B's six assertions whose assertion would have to change is a STOP.
- A screen whose words or test ids change beyond the branches this GO names is a STOP.
- A hypothesis refuted by what you read is not a STOP: the cause you find decides, named under §10.

FINDINGS (G64): anything major beyond this task goes in §13 with file and line; a security hole is a STOP at once, described in the chat only.

LIMITS TO STATE: WebKit, the repeat lane's real time and the merged tree are CI's and the supervisor's.
