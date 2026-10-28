# Foundations — turn 34c-4: the tests find the stored session by the app's own names; the page a sign-out lands on is fetched ahead of time (DEC-279, INC-930); the route guard reads a closed page: brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — TURN 34c-4 (2026-10-27; G0; DEC-279, INC-930, INC-934, INC-937; anchors located at 562db573165aec4e14e3f11e347cc9a21fceadfa). Three parts of roadmap :521 ("Turn 34c-4"), the operator's go of 2026-10-27 19:47 local. (1) The tests find the browser's stored session by the app's own names: the rule (`sb-<project ref>-auth-token`, and the session clocks' `sb-<ref>-<name>`) moves to src/lib/session-key.ts, read by the door (src/lib/supabase-door.ts) and by e2e/helpers/session.ts, whose stored-session helpers replace ten searches for "any sb-…-auth-token" (e2e/helpers/ui.ts :523, :569, :626; e2e/smoke-auth-i18n.spec.ts :58; e2e/auth-signout.spec.ts :143, :212, :230, :272, :520, :573; e2e/admin-categories-home.spec.ts :240, :380) and the clocks' hand-built names (e2e/auth-signout.spec.ts :305–:313); the census CF-PROJECT-1 gains e2e/ (CF-PROJECT-3/4). (2) DEC-279 — the operator's choice (b) for INC-930: for a signed-in visitor, online, the Home page's code is fetched once ahead of time (about 13.5 KB compressed, measured 2026-10-26), so a sign-out made offline from a page opened directly lands on a working Home page instead of the root's "This page didn't load" view (src/lib/sign-out-landing.ts, driven by src/components/app-shell.tsx); SO-13 proves it on the built page, red first. (3) Turn 34d's reviewer's points on the route guard (e2e/helpers/route-guard.ts): a request ends quietly only when its page is in fact closed (a disposed response on a live page is the test's own failure); the error's words are read through errorText (INC-937's rule); CF-RG-1 recognises `whilePageLives` by name only (a planted other wrapper is named) and its log line counts handlers, not files. LEFT, with its own roadmap line: the census of the e2e reads of the browser's client (`__ethioSupabase`, 91 mentions in 24 files) — INC-959, the mechanism and its guard in a later turn. Tier A (sessions and sign-out). No migration. No new string. No package change. AGENTS.md unchanged. No file deleted. Base: dev 562db573165aec4e14e3f11e347cc9a21fceadfa (records turn R6; CI SUCCESS on 562db573 (run 40590576844, completed 2026-10-27 22:13:14Z; 0 flaky; main promoted)). The executor is Claude Code (DEC-257). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0; B — the session's names, red first; C — SO-13 red on BASE's app; D — the page ahead, green; E — the route guard, red first; F — the records; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: 562db573165aec4e14e3f11e347cc9a21fceadfa
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
e2e/admin-categories-home.spec.ts
e2e/auth-signout.spec.ts
e2e/helpers/route-guard.ts
e2e/helpers/session.ts
e2e/helpers/ui.ts
e2e/smoke-auth-i18n.spec.ts
scripts/conformance/project-reads.test.ts
scripts/conformance/route-guard.test.ts
src/components/app-shell.tsx
src/lib/env-flags.test.ts
src/lib/session-key.ts
src/lib/sign-out-landing.test.ts
src/lib/sign-out-landing.ts
src/lib/supabase-door.ts
src/test/e2e-route-guard.test.ts
SCOPE-END

THE SYSTEM (G0) — three concerns.
1 — CONCERN: a test finds the browser's stored session by the name the app keeps it under (register row 55).
MECHANISM: src/lib/session-key.ts (new; pure — `authStorageKey(url)`, `keyBeside(storedKey, name)`, `SUPABASE_PREFIX`), read by src/lib/supabase-door.ts (`storedSessionKey()`, `besideStoredSession()`, unchanged behaviour) and by e2e/helpers/session.ts (`storageKey()` now from the rule; new `besideSessionKey(name)`, `waitForStoredSession`, `holdsStoredSession`, `readStoredSession`, `editStoredSession`, `forgetStoredSession`, `supabaseNamesIn`; `injectSession` clears this project's two names instead of every `sb-*-auth-token` and `sb-*-stepped-up-at`).
CONSUMERS (grep of 562db573165aec4e14e3f11e347cc9a21fceadfa: `grep -rn -e 'auth-token' -e '"sb-' -e "'sb-" -e '`sb-' e2e src --include=*.ts --include=*.tsx | grep -v test`, code lines): the twelve e2e sites listed above and auth-signout.spec.ts's policyKeys — bypasses, all covered here; src/lib/supabase-door.ts :95–:118 — uses (moves onto the rule); src/features/session/session-policy.ts :83 — a comment. scripts/e2e-failure-report.ts :117, :1798 redact ANY project's session name from evidence on purpose (another concern, secret redaction) — outside both census domains, said in the census's comment.
COVERED HERE: every consumer (Part B). LEFT: none.
CONFORMANCE GUARD: scripts/conformance/project-reads.test.ts — CF-PROJECT-3 reads every e2e file but e2e/helpers/session.ts for `auth-token` or a quoted `sb-`; CF-PROJECT-4 plants a key search and a hand-built clock name (named) and the helpers and a comment (passed); CF-PROJECT-1's pattern gains the quoted `sb-` and its domain skips src/lib/session-key.ts. Red first: CF-PROJECT-3 against BASE's e2e files (Part B1). No allowlist.
EXCEPTIONS: none.
FIVE LENSES — security: the injection clears exactly this project's session and step-up hint; no new storage is read · performance: tests only · failure modes: a page without a stored session fails `forgetStoredSession`/`editStoredSession` with a named error, as the old searches did · consistency: the app and its tests read one rule · future growth: a new name kept beside the session is `besideSessionKey(name)`.
2 — CONCERN: the page a sign-out lands on is on the device before it is needed (new register row 62).
MECHANISM: NONE YET — built in Part D as src/lib/sign-out-landing.ts `createHomeAhead(load, report)`: one fetch of the Home route's code (`router.loadRouteChunk(router.routesById["/"])`) per page life, for a signed-in visitor while online; a failure is logged once (`[home-ahead] …` through errorText) and not retried (INC-918: the browser answers a failed download from its memory until the page reloads); the shell (src/components/app-shell.tsx) gives it the visitor's reading and the `online` event; the E2E build shows its state as `window.__ethioHomeAhead` (isE2E only, as `__ethioSupabase`; HOOK-1's census of window instruments, src/lib/env-flags.test.ts, names it).
CONSUMERS (grep of 562db573165aec4e14e3f11e347cc9a21fceadfa: `grep -n 'navigate({ to: "/"' src/components/app-shell.tsx` and every sign-out path): hardReset (app-shell.tsx :631–:690) — its `navigate({ to: "/", replace: true })` at :682 is the sign-out's landing; the session policy's expiry (:705) and the deactivated sign-out reach the same hardReset; the live guard's evacuation of a gated page once the session this tab held is gone (:784) lands on the same "/"; :570 (a place chosen off a listings page) is not a sign-out. Covered: every landing on "/" — they share the one route's code.
CONFORMANCE GUARD: HA-1…4 (src/lib/sign-out-landing.test.ts: once per page life, only signed in and online, a failure logged once and not retried, a throwing or empty load settles); SO-13 (e2e/auth-signout.spec.ts: a tab opened on /settings never visits "/", signs out offline, and Home is drawn by its own code — red on BASE's app in Part C).
EXCEPTIONS: none.
FIVE LENSES — security: code only, no data; the Home route's own chunk, the same bytes any visitor downloads; nothing is fetched for a signed-out visitor · performance: about 13.5 KB compressed once per signed-in page life, after the shell knows the visitor, never on the first paint's path · failure modes: offline at first → fetched on the `online` event; a failed fetch is logged and the sign-out falls back to the root's view as before (INC-930's old behaviour, no worse); a stale page's failure is answered by stale-chunk.ts's one reload, as any download's is · consistency: every sign-out path lands through hardReset · future growth: another page a flow lands on offline is another `load` given to the same function.
3 — CONCERN: a test's interception ends with its page (register row 57) — the reviewer's points of turn 34d.
MECHANISM: e2e/helpers/route-guard.ts — `whilePageLives` now ends a request quietly only on one of Playwright's two "gone" errors AND a closed page (`routePageClosed(route)`: `route.request().frame().page().isClosed()`); `pageWentAway` reads the error's words through `errorText` (src/lib/error-text.ts).
CONSUMERS (grep of 562db573165aec4e14e3f11e347cc9a21fceadfa: `grep -rn "whilePageLives\|pageWentAway" e2e src scripts`): e2e/helpers/on-demand.ts :26, e2e/ad-page-layout.spec.ts :40 — use; the allowlisted handlers in e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2), e2e/post-wizard-specs.spec.ts (1) — unchanged (INC-934's own allowlist).
CONFORMANCE GUARD: scripts/conformance/route-guard.test.ts — CF-RG-1 recognises the guard by name only and logs handlers and files; CF-RG-2 plants a handler behind another wrapper (named at its line); RG-1…3 (src/test/e2e-route-guard.test.ts; RG-3: the same words on a page still open throw). Red first: RG-3 against BASE's guard (Part E2).
EXCEPTIONS: none.
FIVE LENSES — security: tests only · performance: none · failure modes: a disposed response on a live page now fails its test instead of passing quietly · consistency: one guard, one name · future growth: none.
FORWARD-SCAN: INC-959 (the e2e reads of the browser's client) builds its helper beside the stored-session helpers in e2e/helpers/session.ts. REGISTER: rows 55 and 57 updated, row 62 added (Part F).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34c-4.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `docs/governance/briefs/foundations-records-r6.md (Foundations records turn R6: the handover supplement, INC-949–INC-954, DEC-277–DEC-280, S457 and the owed roadmap lines — G41, G53)` becomes `docs/governance/briefs/foundations-turn-34c-4.md (Foundations turn 34c-4: the tests find the stored session by the app's own names, the page a sign-out lands on is fetched ahead of time — DEC-279, INC-930 — and the route guard reads a closed page)` (everything after it stays, as it is). The roadmap's other lines change in Part F, by the applier — none of its blocks touches line 3. Commit `turn 34c-4: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B, C, D, E, F; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: every block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34c-4.md <paths>` with the paths each part names — never retyped, never edited or reflowed by hand. Every file a block writes is already in Prettier's form. A refusal from the applier is a STOP that pastes its line. Before applying, check that no block's OLD or NEW text touches roadmap line 3 (S454). If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-turn-34c-4.md, roadmap.md, docs/_changelog.md, docs/features/e2e-harness.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34c-4.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Part B (`turn 34c-4 part B: the tests find the stored session by the app's own names`); Parts C and D together (`turn 34c-4 parts C-D: the Home page's code is fetched ahead of time for a signed-in visitor (DEC-279)`); Part E (`turn 34c-4 part E: the route guard reads a closed page`); Part F (`turn 34c-4 part F: the docs`); the report. Red first is shown, never committed.
- touching e2e/**: the authoring laws (docs/features/e2e-harness.md §Authoring laws, J1–J9) bind; the three spec files change by the applier only (G37: spec files are never edited by search-and-replace).
- Local runs: the touched unit tests as you go and the unit suite whole at THE CHECKS; browser tests at Part C (SO-13 red) and THE END-TO-END CHECK. CI runs every test on every commit.
- Behaviour contract: the product changes in one way — a signed-in visitor's page fetches the Home page's code once, ahead of time, while online; a sign-out made offline from a page opened directly then lands on Home drawn by its own code, signed out, and the page loads afresh when the connection returns (DEC-271, unchanged). The tests find the same session by its exact name instead of a pattern; the route guard throws where it passed quietly on a live page; nothing else changes.
- Knowledge K: K1 the censuses above are the supervisor's, at 562db573165aec4e14e3f11e347cc9a21fceadfa — re-run `grep -rn -e 'auth-token' -e '"sb-' -e "'sb-" -e '`sb-' e2e --include=*.ts | grep -v '^e2e/helpers/session.ts'` (expected before Part B: code lines at the twelve sites and policyKeys' four, plus comment lines in e2e/helpers/ui.ts :485 and :612 — 18 lines) and `grep -rn "whilePageLives\|pageWentAway" e2e --include=*.ts | grep -v helpers/route-guard.ts` (expected: on-demand.ts and ad-page-layout.spec.ts), and paste both. K2 the report lists every sibling your reading finds outside these lists (expected: none beyond INC-959's). K3–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE or named in a part is a STOP. CI on BASE: SUCCESS on 562db573 (run 40590576844, completed 2026-10-27 22:13:14Z; 0 flaky; main promoted). Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (the two-step check); a red on BASE is read first in e2e-last-failure.md and guards-last-failure.md, fixed first at its root (G21, G38) and named in the report.

PART B — THE SESSION'S NAMES, RED FIRST.
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34c-4.md scripts/conformance/project-reads.test.ts`; then `bunx vitest run scripts/conformance/project-reads.test.ts` — RED against BASE's e2e files, shown and not committed: paste the totals and CF-PROJECT-3's finding count (the supervisor's run: `Tests  1 failed | 3 passed (4)`, CF-PROJECT-3 naming the code lines of the twelve sites and policyKeys).
B2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34c-4.md src/lib/session-key.ts src/lib/supabase-door.ts e2e/helpers/session.ts e2e/helpers/ui.ts e2e/smoke-auth-i18n.spec.ts e2e/admin-categories-home.spec.ts e2e/auth-signout.spec.ts`; then `bunx vitest run scripts/conformance/project-reads.test.ts src/lib/supabase-door.test.ts src/features/session/session-policy.test.ts src/features/auth/auth-client.test.ts` — all passed (the supervisor's run: 4 files, all passed); `bun run typecheck`, `bun run lint`. Commit Part B.

PART C — SO-13 RED ON BASE'S APP (shown, not committed).
C1. SO-13 landed with Part B (e2e/auth-signout.spec.ts). Run it against BASE's app — Part D not yet applied: `bun run e2e:local -- e2e/auth-signout.spec.ts --grep "SO-13 "` — RED on both projects: paste the count line and the first failure line (expected: `__ethioHomeAhead` never reaches "ready" — no code is fetched ahead on BASE). When the environment cannot run browsers, say so with the reason and go on; CI on the landing is the proof.

PART D — THE PAGE AHEAD, GREEN.
D1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34c-4.md src/lib/sign-out-landing.ts src/lib/sign-out-landing.test.ts src/components/app-shell.tsx src/lib/env-flags.test.ts`; then `bunx vitest run src/lib/sign-out-landing.test.ts src/lib/env-flags.test.ts src/components` — all passed (the supervisor's run of sign-out-landing.test.ts: 4 tests; HOOK-1's census names `__ethioHomeAhead` in app-shell.tsx, which takes isE2E); `bun run typecheck`, `bun run lint`.
D2. `bun run e2e:local -- e2e/auth-signout.spec.ts --grep "SO-13 "` — GREEN on both projects; paste the count line. Commit Parts C and D.

PART E — THE ROUTE GUARD, RED FIRST.
E1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34c-4.md src/test/e2e-route-guard.test.ts`; then `bunx vitest run src/test/e2e-route-guard.test.ts` — RED against BASE's guard, shown and not committed: paste the totals (the supervisor's run: `Tests  2 failed | 1 passed (3)` — RG-1 fails on an object's message, which BASE read with `String()`, not errorText; RG-3 fails: `routePageClosed` is not a function).
E2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34c-4.md e2e/helpers/route-guard.ts scripts/conformance/route-guard.test.ts`; then `bunx vitest run src/test/e2e-route-guard.test.ts scripts/conformance/route-guard.test.ts scripts/conformance/wired.test.ts` — all passed; paste the totals and CF-RG-1's log line (`[route-guard] files read: …; unguarded handlers: 5 in 3 files`). Commit Part E.

PART F — THE RECORDS.
F1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34c-4.md --dry docs/governance/mechanisms.md docs/features/e2e-harness.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/governance/mechanisms.md #1` · `EDIT docs/governance/mechanisms.md #2` · `EDIT docs/features/e2e-harness.md #1` · `EDIT roadmap.md #1` · `EDIT docs/_changelog.md #1` · `applied 5 block(s) to 4 file(s)`). `sed -n 3p roadmap.md | cut -c1-80` — names foundations-turn-34c-4.md; `grep -c '^| 62 |' docs/governance/mechanisms.md` — 1; paste both. Commit Part F.

THE CHECKS (in this order; `bun .claude/hooks/land.ts` runs them again before it pushes): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34c-4.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- supabase package.json bun.lock AGENTS.md .claude .github` (empty); `bun run lint` (expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste the totals: BASE's plus one file and 7 tests — HA-1…4, RG-3, CF-PROJECT-3, CF-PROJECT-4 — expected 334 files, 2025 passed); `bun run i18n:usage` (no change to either map); `bun run build`; `node scripts/check-bundle-size.mjs` (paste its JS and CSS lines: the first paint grows about 0.2 KiB — the new module rides the shell's chunk; the supervisor's builds, not lock-exact (INC-420), read 208.3 KiB on BASE and 208.5 KiB after the turn against the 207 KiB ceiling in its own install, while CI's lock-exact build read 204.1 KiB at turn 34 — a JS line over 207 KiB in the executor's run is a STOP with both builds' lines); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn; roadmap.md is checked by Part F's line):
1713be775f3dfb9da15a5d82ede854555303fa533fc79b662469f55e1f857dc3  docs/_changelog.md
81c60e8bd2d42d3d41726a5f00245c9a887c3f20128bc117ef76e137511e6750  docs/features/e2e-harness.md
61d95f37f091b98d270025f8ec7bc95eb7d630a9cce1428899c1cbfabe89ed11  docs/governance/mechanisms.md
97c2ab796cad7cb4f810fc9475d3b3d844c0a7f403aae111bdcdba628d442cb4  e2e/admin-categories-home.spec.ts
e952856fd6a5d6a5527fb3ed0589c78195baf5294d36d17792a7962b98d7c1b0  e2e/auth-signout.spec.ts
8c8fa22077ff90c175326752da5e61967d2bd2c8d933323ecbd2371d05bb9e77  e2e/helpers/route-guard.ts
c7b0ffb10fc2a1a46a0a7d3d01afc07e6d2414f6cf7e6136af4257b8b9bab68c  e2e/helpers/session.ts
d41a80304b322673db0b682f398650a2c2db8bfd3f145332e70852124778ba01  e2e/helpers/ui.ts
143826ae6429622b4a428a2e066a95673ff037ae58f286210ffe8e97f1dd36c3  e2e/smoke-auth-i18n.spec.ts
7aedc6933a1ea619afbe040852fa81451277a478eaef0ad0ab78ecf777a3eb17  scripts/conformance/project-reads.test.ts
6cf4e6459a7540e9f74f82031e8e0818fb6d74af0afa0b6fe25b8eeae9c8a1e6  scripts/conformance/route-guard.test.ts
e3c5423f05fe6cfc5b4553e26418d343590582681a66e9c95a5ba32ae5ee4f0f  src/components/app-shell.tsx
285f5529486b26e3ab5b62fa1f41b48f4d654efc2578e794bcb6daa63ca18514  src/lib/env-flags.test.ts
092637d464dff898f79eb1065057b281f18ebf178aca858ec678b84c0e3caac1  src/lib/session-key.ts
653b8adca595896fda8930619bb2512f7ec92e91a329181ca155aee24e0d0bee  src/lib/sign-out-landing.test.ts
57cceb4f8ecc64eb7b5a06bc74fc6dacc5a55d2f23ec603fef19f6b2129a8e07  src/lib/sign-out-landing.ts
1c1b4de3bca90013451a3deebaffa103986f74560c62b24cb5d5c3f8da8a181b  src/lib/supabase-door.ts
90f19c5c4abfcbbf41cfb9e4d90ea32e6dbde305532be0ade00a65e5ad3ed0ce  src/test/e2e-route-guard.test.ts

THE END-TO-END CHECK: `bun run e2e:local -- e2e/auth-signout.spec.ts e2e/smoke-auth-i18n.spec.ts e2e/admin-categories-home.spec.ts` — the three changed spec files, whole, both projects, 0 retries, fake mode; then the shared helpers' other doors by id: `bun run e2e:local -- e2e/admin-users.spec.ts e2e/settings.spec.ts --grep "AU-1 |S-3 "` (the pool's injection and a password sign-in through the changed waits). Paste every count line and the server log's `[ssr-error]` count by path. Any red is a STOP with its body. When the environment cannot run browsers, say so with the reason; CI on the landing is the full proof.

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last code commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7; if the platform starts it in the background, wait for its own final line — "READY · … · on <commit>" — and say so in the report); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR inside SCOPE is fixed only when this brief's exact text allows it, otherwise listed under Departures for a ruling. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34c-4.report.md, with the twelve headings of .claude/rules/60-report.md, each kept short: (1) done or not done by part and step; (2) the file list from `git diff --name-only <START>`; (3) the behaviour contract; (4) the K1 lines; (5) every red-first and green line (B1, C1, D2, E1, E2), the unit totals and the browser count lines; (6) the K2 lines; (7) CF-PROJECT-1…4 and CF-RG-1's log lines; (8) "none" for strings with the check that proves it; (9) "none" for migrations; (10) every departure with its reason; (11) the first six lines of ci-status.md for the last commit you can read; (12) every limit. Commit it (`turn 34c-4: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): the names' rule moves to its own pure module so a Node test file can read it without the door's browser code; `supabaseNamesIn` keeps SO-8's and SO-9's check of every `sb-` name of any project (the assertion is not narrowed); the injection clears this project's two names only (a browser context holds one project's); the Home page's code is fetched once, after the shell knows the visitor, never on the first paint's path, and a failed fetch is logged and not retried; SO-13 reads the fetch's state through an E2E-only window value, as the client hand-off is read; the census of the e2e reads of the browser's client is left to its own turn (INC-959) because it reaches 24 files; a disposed response on a live page now fails its test.

THE BLOCKS (applied by the parts above; each part names its paths).

EDIT scripts/conformance/project-reads.test.ts #1
OLD-BEGIN
 * (src/integrations/) and the server's own environment reader (src/server/) are not browser code.
 */
OLD-END
NEW-BEGIN
 * (src/integrations/) and the server's own environment reader (src/server/) are not browser code.
 *
 * Turn 34c-4 — THE TESTS READ THE SESSION'S NAMES BY THE SAME RULE. The rule itself lives in
 * src/lib/session-key.ts (`authStorageKey`, `keyBeside`, `SUPABASE_PREFIX`), read by the door and
 * by e2e/helpers/session.ts; e2e/ looked for "any sb-…-auth-token" in ten places and built the
 * session clocks' names by hand, so a test could pass on a name the app does not use. CF-PROJECT-3
 * reads every e2e file but that helper for the session's names (the test's own project address,
 * E2E_SUPABASE_URL, is the harness's concern, not this one). scripts/e2e-failure-report.ts
 * redacts any project's session name from evidence on purpose and is outside both domains.
 */
NEW-END
EDIT scripts/conformance/project-reads.test.ts #2
OLD-BEGIN

const READS: Array<{ pattern: RegExp; what: string }> = [
  {
OLD-END
NEW-BEGIN

type Read = { pattern: RegExp; what: string };

const READS: Read[] = [
  {
NEW-END
EDIT scripts/conformance/project-reads.test.ts #3
OLD-BEGIN
  {
    pattern: /auth-token/,
    what: "names the session's storage itself — through storedSessionKey() or besideStoredSession() (src/lib/supabase-door.ts)",
OLD-END
NEW-BEGIN
  {
    pattern: /auth-token|["'`]sb-/,
    what: "names the session's storage itself — through storedSessionKey() or besideStoredSession() (src/lib/supabase-door.ts)",
NEW-END
EDIT scripts/conformance/project-reads.test.ts #4
OLD-BEGIN

export function projectReadCensus(files: string[]): Finding[] {
  const findings: Finding[] = [];
OLD-END
NEW-BEGIN

/** e2e/: the session's names only, read through the test helpers. */
const TEST_READS: Read[] = [
  {
    pattern: /auth-token|["'`]sb-/,
    what: "names the session's storage itself — through e2e/helpers/session.ts (storageKey(), besideSessionKey(), the stored-session helpers)",
  },
];

export function projectReadCensus(files: string[], reads: Read[] = READS): Finding[] {
  const findings: Finding[] = [];
NEW-END
EDIT scripts/conformance/project-reads.test.ts #5
OLD-BEGIN
    lines.forEach((text, index) => {
      for (const read of READS)
        if (read.pattern.test(text)) findings.push({ file, line: index + 1, what: read.what });
OLD-END
NEW-BEGIN
    lines.forEach((text, index) => {
      for (const read of reads)
        if (read.pattern.test(text)) findings.push({ file, line: index + 1, what: read.what });
NEW-END
EDIT scripts/conformance/project-reads.test.ts #6
OLD-BEGIN
  skip: /^src[\\/](?:integrations|server)(?:[\\/]|$)/,
}).filter((file) => file !== "src/lib/supabase-door.ts");

OLD-END
NEW-BEGIN
  skip: /^src[\\/](?:integrations|server)(?:[\\/]|$)/,
}).filter((file) => file !== "src/lib/supabase-door.ts" && file !== "src/lib/session-key.ts");

const testDomain = walkFiles(["e2e"], { ext: ["ts"] }).filter(
  (file) => file !== "e2e/helpers/session.ts",
);

NEW-END
EDIT scripts/conformance/project-reads.test.ts #7
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it(
    "CF-PROJECT-3 no e2e file but its session helper names the session's storage itself",
    () => {
      const findings = projectReadCensus(testDomain, TEST_READS);
      console.log(
        `[project-reads] e2e files read: ${testDomain.length}; findings: ${findings.length}`,
      );
      expect(testDomain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-PROJECT-4 the e2e census names a planted key search and a hand-built clock name, and passes the helpers and a comment", () => {
    const dir = "node_modules/.cache/project-reads-e2e";
    mkdirSync(dir, { recursive: true });
    const files = {
      search: `${dir}/pt-search.ts`,
      clock: `${dir}/pt-clock.ts`,
      good: `${dir}/pt-good.ts`,
    };
    try {
      writeFileSync(
        files.search,
        'export const held = (keys: string[]) =>\n  keys.some((k) => k.startsWith("sb-") && k.endsWith("auth-token"));\n',
      );
      writeFileSync(
        files.clock,
        "export const clock = (ref: string) => `sb-${ref}-last-activity-at`;\n",
      );
      writeFileSync(
        files.good,
        'import { besideSessionKey } from "../../../e2e/helpers/session";\n// the clock lives beside sb-<ref>-auth-token\nexport const clock = besideSessionKey("last-activity-at");\n',
      );
      const what =
        "names the session's storage itself — through e2e/helpers/session.ts (storageKey(), besideSessionKey(), the stored-session helpers)";
      expect(report(projectReadCensus(Object.values(files), TEST_READS))).toBe(
        [`${files.clock}:1 ${what}`, `${files.search}:2 ${what}`].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
NEW-END

FILE-BEGIN src/lib/session-key.ts
/**
 * Foundations turn 34c-4 — THE SESSION'S STORAGE NAMES, ONE RULE FOR THE APP AND ITS TESTS.
 * supabase-js keeps a session under `sb-<the project URL's first host label>-auth-token`, and the
 * app keeps its session clocks beside it under the same `sb-<ref>-` prefix (turn 34c-2). The app
 * reads the names through src/lib/supabase-door.ts (`storedSessionKey()`, `besideStoredSession()`),
 * the tests through e2e/helpers/session.ts — both from these functions, so a test can never look
 * for a session under a name the app does not use. Pure: it imports nothing, so a Node test file
 * can load it. The census CF-PROJECT-1 (scripts/conformance/project-reads.test.ts) refuses the
 * names anywhere else in src/ and e2e/.
 */

/** The prefix supabase-js gives every name it keeps in the browser's storage. */
export const SUPABASE_PREFIX = "sb-";

const SESSION_NAME = "auth-token";

/** supabase-js's default storage key: `sb-<the URL's first host label>-auth-token`. */
export function authStorageKey(url: string): string | null {
  try {
    return `${SUPABASE_PREFIX}${new URL(url).hostname.split(".")[0]}-${SESSION_NAME}`;
  } catch {
    return null;
  }
}

/** A name kept beside a stored session's key: its `sb-<ref>-` prefix and the name. */
export function keyBeside(storedKey: string, name: string): string {
  return `${storedKey.slice(0, -SESSION_NAME.length)}${name}`;
}
FILE-END src/lib/session-key.ts

EDIT src/lib/supabase-door.ts #1
OLD-BEGIN
import { loadOnce } from "@/lib/load-once";

OLD-END
NEW-BEGIN
import { loadOnce } from "@/lib/load-once";
import { authStorageKey, keyBeside } from "@/lib/session-key";

NEW-END
EDIT src/lib/supabase-door.ts #2
OLD-BEGIN

/** supabase-js's default storage key: `sb-<the URL's first host label>-auth-token`. */
export function authStorageKey(url: string): string | null {
  try {
    return `sb-${new URL(url).hostname.split(".")[0]}-auth-token`;
  } catch {
    return null;
  }
}

OLD-END
NEW-BEGIN

/** supabase-js's default storage key — the rule lives in src/lib/session-key.ts (turn 34c-4). */
export { authStorageKey };

NEW-END
EDIT src/lib/supabase-door.ts #3
OLD-BEGIN
  const key = storedSessionKey();
  return key === null ? null : `${key.slice(0, -"auth-token".length)}${name}`;
}
OLD-END
NEW-BEGIN
  const key = storedSessionKey();
  return key === null ? null : keyBeside(key, name);
}
NEW-END

EDIT e2e/helpers/session.ts #1
OLD-BEGIN

export type PersistedSession = {
OLD-END
NEW-BEGIN

import { authStorageKey, keyBeside, SUPABASE_PREFIX } from "../../src/lib/session-key";

export type PersistedSession = {
NEW-END
EDIT e2e/helpers/session.ts #2
OLD-BEGIN

/** The exact localStorage key supabase-js derives from the project URL. */
export function storageKey(): string {
  const host = new URL(supabaseUrl()).hostname;
  return `sb-${host.split(".")[0]}-auth-token`;
}
OLD-END
NEW-BEGIN

/**
 * The exact localStorage key supabase-js derives from the project URL — by the app's own rule
 * (src/lib/session-key.ts, turn 34c-4), so a test never looks for a session the app keeps elsewhere.
 */
export function storageKey(): string {
  const key = authStorageKey(supabaseUrl());
  if (key === null)
    throw new Error(`[e2e:session] E2E_SUPABASE_URL is not a URL: ${supabaseUrl()}`);
  return key;
}

/** A name the app keeps beside the stored session (`besideStoredSession`'s rule): `sb-<ref>-<name>`. */
export function besideSessionKey(name: string): string {
  return keyBeside(storageKey(), name);
}

/** Waits until the page's storage holds this project's session (a sign-in that persisted). */
export async function waitForStoredSession(page: Page): Promise<void> {
  await page.waitForFunction(
    (key: string) => window.localStorage.getItem(key) !== null,
    storageKey(),
    {
      timeout: 15000,
    },
  );
}

/** Whether the page's storage holds this project's session. */
export async function holdsStoredSession(page: Page): Promise<boolean> {
  return page.evaluate((key: string) => window.localStorage.getItem(key) !== null, storageKey());
}

/** The page's stored session as supabase-js keeps it, or null when it holds none. */
export async function readStoredSession(page: Page): Promise<PersistedSession | null> {
  const raw = await page.evaluate((key: string) => window.localStorage.getItem(key), storageKey());
  return raw === null ? null : (JSON.parse(raw) as PersistedSession);
}

/** Replaces the page's stored session with `edit(session)`; throws when the page holds none. */
export async function editStoredSession(
  page: Page,
  edit: (session: PersistedSession) => PersistedSession,
): Promise<void> {
  const session = await readStoredSession(page);
  if (session === null) throw new Error("[e2e:session] no persisted supabase session found");
  await page.evaluate(
    ({ key, value }: { key: string; value: string }) => window.localStorage.setItem(key, value),
    { key: storageKey(), value: JSON.stringify(edit(session)) },
  );
}

/** Removes the page's stored session; throws when the page holds none. */
export async function forgetStoredSession(page: Page): Promise<void> {
  const removed = await page.evaluate((key: string) => {
    if (window.localStorage.getItem(key) === null) return false;
    window.localStorage.removeItem(key);
    return true;
  }, storageKey());
  if (!removed) throw new Error("[e2e:session] no persisted supabase session found");
}

/** Every name supabase-js or the app keeps in the page's storage, of any project (`sb-…`). */
export async function supabaseNamesIn(page: Page): Promise<string[]> {
  return page.evaluate(
    (prefix: string) => Object.keys(window.localStorage).filter((k) => k.startsWith(prefix)),
    SUPABASE_PREFIX,
  );
}
NEW-END
EDIT e2e/helpers/session.ts #3
OLD-BEGIN
 * persona A's session and asserted persona B's permissions. The sentinel now
 * records the TARGET USER ID; a different user clears every
 * `sb-*-auth-token` AND every `sb-*-stepped-up-at` hint before writing the new
 * grant once, and the same user stays a no-op.
OLD-END
NEW-BEGIN
 * persona A's session and asserted persona B's permissions. The sentinel now
 * records the TARGET USER ID; a different user clears the stored session AND
 * its step-up hint (this project's names, turn 34c-4) before writing the new
 * grant once, and the same user stays a no-op.
NEW-END
EDIT e2e/helpers/session.ts #4
OLD-BEGIN
      key,
      value,
OLD-END
NEW-BEGIN
      key,
      steppedUp,
      value,
NEW-END
EDIT e2e/helpers/session.ts #5
OLD-BEGIN
      key: string;
      value: string;
OLD-END
NEW-BEGIN
      key: string;
      steppedUp: string;
      value: string;
NEW-END
EDIT e2e/helpers/session.ts #6
OLD-BEGIN
        // Switching personas: nothing of the previous identity may survive.
        for (const k of Object.keys(window.localStorage)) {
          if (k.startsWith("sb-") && (k.endsWith("-auth-token") || k.endsWith("-stepped-up-at"))) {
            window.localStorage.removeItem(k);
          }
        }
        window.localStorage.removeItem(sentinel);
OLD-END
NEW-BEGIN
        // Switching personas: nothing of the previous identity may survive.
        window.localStorage.removeItem(key);
        window.localStorage.removeItem(steppedUp);
        window.localStorage.removeItem(sentinel);
NEW-END
EDIT e2e/helpers/session.ts #7
OLD-BEGIN
      key: storageKey(),
      value: JSON.stringify(session),
OLD-END
NEW-BEGIN
      key: storageKey(),
      steppedUp: besideSessionKey("stepped-up-at"),
      value: JSON.stringify(session),
NEW-END

EDIT e2e/helpers/ui.ts #1
OLD-BEGIN
  passwordGrant,
  type PersistedSession,
OLD-END
NEW-BEGIN
  passwordGrant,
  supabaseNamesIn,
  waitForStoredSession,
  type PersistedSession,
NEW-END
EDIT e2e/helpers/ui.ts #2
OLD-BEGIN
    try {
      const facts = await page.evaluate(() => {
        const local: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key !== null && key.startsWith("sb-")) local.push(key);
        }
        const session: string[] = [];
OLD-END
NEW-BEGIN
    try {
      const local = await supabaseNamesIn(page);
      const facts = await page.evaluate(() => {
        const session: string[] = [];
NEW-END
EDIT e2e/helpers/ui.ts #3
OLD-BEGIN
          h1: document.querySelector("h1")?.textContent ?? null,
          localSb: local,
          sessionKeys: session,
OLD-END
NEW-BEGIN
          h1: document.querySelector("h1")?.textContent ?? null,
          sessionKeys: session,
NEW-END
EDIT e2e/helpers/ui.ts #4
OLD-BEGIN
      });
      dump = JSON.stringify({ url: page.url(), ...facts });
    } catch (dumpError) {
OLD-END
NEW-BEGIN
      });
      dump = JSON.stringify({ url: page.url(), ...facts, localSb: local });
    } catch (dumpError) {
NEW-END
EDIT e2e/helpers/ui.ts #5
OLD-BEGIN
  // 3. Belt: the session is persisted, so a full navigation rehydrates it.
  await page.waitForFunction(
    () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
    undefined,
    { timeout: 15000 },
  );
}
OLD-END
NEW-BEGIN
  // 3. Belt: the session is persisted, so a full navigation rehydrates it.
  await waitForStoredSession(page);
}
NEW-END
EDIT e2e/helpers/ui.ts #6
OLD-BEGIN
  await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
  await page.waitForFunction(
    () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
    undefined,
    { timeout: 15000 },
  );
}
OLD-END
NEW-BEGIN
  await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
  await waitForStoredSession(page);
}
NEW-END

EDIT e2e/smoke-auth-i18n.spec.ts #1
OLD-BEGIN
} from "./helpers/ui";
import { leaseUser } from "./helpers/users";
OLD-END
NEW-BEGIN
} from "./helpers/ui";
import { waitForStoredSession } from "./helpers/session";
import { leaseUser } from "./helpers/users";
NEW-END
EDIT e2e/smoke-auth-i18n.spec.ts #2
OLD-BEGIN
  await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
  await page.waitForFunction(
    () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
    undefined,
    { timeout: 15000 },
  );

OLD-END
NEW-BEGIN
  await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
  await waitForStoredSession(page);

NEW-END

EDIT e2e/admin-categories-home.spec.ts #1
OLD-BEGIN
import { destroyAttribute } from "./helpers/admin-attributes";

OLD-END
NEW-BEGIN
import { destroyAttribute } from "./helpers/admin-attributes";
import { readStoredSession } from "./helpers/session";

NEW-END
EDIT e2e/admin-categories-home.spec.ts #2
OLD-BEGIN
      // … and the admin's OWN token, sent straight to the data API, is refused.
      const token = await page.evaluate(() => {
        for (let i = 0; i < localStorage.length; i += 1) {
          const name = localStorage.key(i) ?? "";
          if (name.startsWith("sb-") && name.endsWith("-auth-token")) {
            return (JSON.parse(localStorage.getItem(name) ?? "{}") as { access_token?: string })
              .access_token;
          }
        }
        return undefined;
      });
      expect(token, "CT-41 the page holds the admin's session").toBeTruthy();
OLD-END
NEW-BEGIN
      // … and the admin's OWN token, sent straight to the data API, is refused.
      const token = (await readStoredSession(page))?.access_token;
      expect(token, "CT-41 the page holds the admin's session").toBeTruthy();
NEW-END
EDIT e2e/admin-categories-home.spec.ts #3
OLD-BEGIN

      const token = await page.evaluate(() => {
        for (let i = 0; i < localStorage.length; i += 1) {
          const name = localStorage.key(i) ?? "";
          if (name.startsWith("sb-") && name.endsWith("-auth-token")) {
            return (JSON.parse(localStorage.getItem(name) ?? "{}") as { access_token?: string })
              .access_token;
          }
        }
        return undefined;
      });
      expect(token, "CT-45 the page holds the admin's session").toBeTruthy();
OLD-END
NEW-BEGIN

      const token = (await readStoredSession(page))?.access_token;
      expect(token, "CT-45 the page holds the admin's session").toBeTruthy();
NEW-END

EDIT e2e/auth-signout.spec.ts #1
OLD-BEGIN
  waitForHydration,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

OLD-END
NEW-BEGIN
  waitForHydration,
} from "./helpers/ui";
import {
  besideSessionKey,
  editStoredSession,
  forgetStoredSession,
  holdsStoredSession,
  injectSession,
  passwordGrant,
  storageKey,
  supabaseNamesIn,
} from "./helpers/session";
import { adminClient, leaseUser } from "./helpers/users";

NEW-END
EDIT e2e/auth-signout.spec.ts #2
OLD-BEGIN
    // Distinct from SO-3: no live transition, the session is simply gone when
    // the gated route mounts again.
    await page.evaluate(() => {
      const key = Object.keys(localStorage).find(
        (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
      );
      if (!key) throw new Error("no persisted supabase session found");
      localStorage.removeItem(key);
    });
    await page.reload();

OLD-END
NEW-BEGIN
    // Distinct from SO-3: no live transition, the session is simply gone when
    // the gated route mounts again.
    await forgetStoredSession(page);
    await page.reload();

NEW-END
EDIT e2e/auth-signout.spec.ts #3
OLD-BEGIN
    // The access token has run out and the auth server cannot be reached.
    await page.route("**/auth/v1/**", (route) => route.abort("failed"));
    await page.evaluate(() => {
      const key = Object.keys(localStorage).find(
        (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
      );
      if (!key) throw new Error("no persisted supabase session found");
      const session = JSON.parse(localStorage.getItem(key) ?? "{}") as { expires_at?: number };
      session.expires_at = Math.floor(Date.now() / 1000) - 3600;
      localStorage.setItem(key, JSON.stringify(session));
    });
    if (isMobile(page)) {
      await page.getByTestId("account-menu").click();
OLD-END
NEW-BEGIN
    // The access token has run out and the auth server cannot be reached.
    await page.route("**/auth/v1/**", (route) => route.abort("failed"));
    await editStoredSession(page, (session) => ({
      ...session,
      expires_at: Math.floor(Date.now() / 1000) - 3600,
    }));
    if (isMobile(page)) {
      await page.getByTestId("account-menu").click();
NEW-END
EDIT e2e/auth-signout.spec.ts #4
OLD-BEGIN
    await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    expect(
      await page.evaluate(() =>
        Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("-auth-token")),
      ),
      "the stored session is gone from this device",
    ).toBe(false);
    // The network is back: a fresh load of the page is still signed out.
    await page.unrouteAll({ behavior: "ignoreErrors" });
OLD-END
NEW-BEGIN
    await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    expect(await holdsStoredSession(page), "the stored session is gone from this device").toBe(
      false,
    );
    // The network is back: a fresh load of the page is still signed out.
    await page.unrouteAll({ behavior: "ignoreErrors" });
NEW-END
EDIT e2e/auth-signout.spec.ts #5
OLD-BEGIN
    await expect(page).toHaveURL(/\/$/);
    expect(loads, "no load is tried while offline").toBe(0);
    expect(
      await page.evaluate(() =>
        Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("-auth-token")),
      ),
      "the stored session is gone from this device",
    ).toBe(false);
    // The connection returns: the page loads afresh, still signed out.
    await page.context().setOffline(false);
OLD-END
NEW-BEGIN
    await expect(page).toHaveURL(/\/$/);
    expect(loads, "no load is tried while offline").toBe(0);
    expect(await holdsStoredSession(page), "the stored session is gone from this device").toBe(
      false,
    );
    // The connection returns: the page loads afresh, still signed out.
    await page.context().setOffline(false);
NEW-END
EDIT e2e/auth-signout.spec.ts #6
OLD-BEGIN
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });
});

OLD-END
NEW-BEGIN
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });

  test("SO-13 an offline sign-out from a page opened directly lands on a working Home page (DEC-279, INC-930)", async ({
    page,
  }) => {
    // The tab opens on /settings and never visits "/": only the code fetched ahead of time for a
    // signed-in visitor (src/lib/sign-out-landing.ts) can draw the Home page once the device is
    // offline. Without it the root's "This page didn't load" view showed until the connection
    // returned (INC-930).
    const user = await leaseUser();
    await injectSession(page, await passwordGrant(user.email, user.password));
    await gotoReady(page, "/settings");
    await expect(
      isMobile(page)
        ? page.getByTestId("account-menu")
        : page.getByTestId("app-rail").getByTestId("rail-sign-out"),
    ).toBeVisible({ timeout: 15_000 });
    await expect
      .poll(
        () =>
          page.evaluate(
            () => (window as unknown as { __ethioHomeAhead?: string }).__ethioHomeAhead ?? "idle",
          ),
        { message: "the Home page's code is fetched ahead of time for a signed-in visitor" },
      )
      .toBe("ready");
    if (isMobile(page)) {
      // The account menu's code arrives on its first opening: open it once while online.
      await page.getByTestId("account-menu").click();
      await expect(page.getByTestId("account-menu-sign-out")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("account-menu-sign-out")).toHaveCount(0);
    }
    let loads = 0;
    page.on("load", () => {
      loads += 1;
    });
    await page.context().setOffline(true);
    if (isMobile(page)) {
      await page.getByTestId("account-menu").click();
      await page.getByTestId("account-menu-sign-out").click();
    } else {
      await page.getByTestId("app-rail").getByTestId("rail-sign-out").click();
    }
    // Home is drawn by its own code, signed out — not the root's "This page didn't load" view.
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
    await expect(page.getByTestId("feed-container")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("route-error-refresh")).toHaveCount(0);
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    expect(loads, "no load is tried while offline").toBe(0);
    expect(await holdsStoredSession(page), "the stored session is gone from this device").toBe(
      false,
    );
    // The connection returns: the page loads afresh, still signed out (DEC-271).
    await page.context().setOffline(false);
    await expect
      .poll(() => loads, { message: "the page loads afresh when the connection returns" })
      .toBe(1);
    await waitForHydration(page);
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });
});

NEW-END
EDIT e2e/auth-signout.spec.ts #7
OLD-BEGIN
 */
function policyKeys() {
  const ref = new URL(process.env["E2E_SUPABASE_URL"]!).hostname.split(".")[0];
  return {
    lastActivityAt: `sb-${ref}-last-activity-at`,
    sessionStartedAt: `sb-${ref}-session-started-at`,
    sessionRef: `sb-${ref}-session-ref`,
    authToken: `sb-${ref}-auth-token`,
  };
}
OLD-END
NEW-BEGIN
 */
function policyKeys() {
  return {
    lastActivityAt: besideSessionKey("last-activity-at"),
    sessionStartedAt: besideSessionKey("session-started-at"),
    sessionRef: besideSessionKey("session-ref"),
    authToken: storageKey(),
  };
}
NEW-END
EDIT e2e/auth-signout.spec.ts #8
OLD-BEGIN
      await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
      await expect(page.getByTestId("account-menu")).toHaveCount(0);
      const stored = await page.evaluate(() =>
        Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
      );
      expect(stored, "SO-8: the session survived the sign-out").toEqual([]);

OLD-END
NEW-BEGIN
      await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
      await expect(page.getByTestId("account-menu")).toHaveCount(0);
      const stored = await supabaseNamesIn(page);
      expect(stored, "SO-8: the session survived the sign-out").toEqual([]);

NEW-END
EDIT e2e/auth-signout.spec.ts #9
OLD-BEGIN

      // The session must be gone.
      const stored = await page.evaluate(() =>
        Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
      );
      expect(stored, "SO-9: the session survived the sign-out").toEqual([]);
    } finally {
OLD-END
NEW-BEGIN

      // The session must be gone.
      const stored = await supabaseNamesIn(page);
      expect(stored, "SO-9: the session survived the sign-out").toEqual([]);
    } finally {
NEW-END

FILE-BEGIN src/lib/sign-out-landing.ts
import { errorText } from "@/lib/error-text";

/**
 * DEC-279 (INC-930, the operator's choice (b), 2026-10-27; Foundations turn 34c-4) — THE PAGE A
 * SIGN-OUT LANDS ON IS ON THE DEVICE BEFORE IT IS NEEDED. Every sign-out ends on "/" (app-shell's
 * hardReset, U0j). A tab opened on another page (/settings, /post) never downloaded the Home
 * page's code, so a sign-out made offline had nothing to draw there: the root's "This page didn't
 * load" view stayed until the connection returned (DEC-271's fresh load). For a signed-in visitor,
 * while the device is online, the Home route's code is fetched once per page life — about
 * 13.5 KB compressed, measured 2026-10-26: the Home page's own code beyond what every page already
 * loads. Signed-out visitors never fetch it: their sign-out cannot happen.
 *
 * A failed fetch changes nothing the person sees and is not retried — the browser answers a failed
 * download from its memory of the failure until the page reloads (INC-918), so a second try could
 * not help; it is logged, and an offline sign-out then shows the root's view as before INC-930's
 * fix. A stale page's failure is answered by stale-chunk.ts's one reload, as any download's is.
 */

export type HomeAheadState = "idle" | "loading" | "ready" | "failed";

export interface HomeAhead {
  /** Where the one fetch stands. */
  state(): HomeAheadState;
  /** The shell's reading: starts the one fetch for a signed-in visitor while online. */
  consider(signedIn: boolean, online: boolean): void;
}

/**
 * `load` fetches the Home route's code (the router's `loadRouteChunk` for "/"); `report` hears
 * every change of state (the E2E build shows it to the tests, SO-13).
 */
export function createHomeAhead(
  load: () => Promise<void> | undefined,
  report: (state: HomeAheadState) => void = () => undefined,
): HomeAhead {
  let state: HomeAheadState = "idle";
  const set = (next: HomeAheadState) => {
    state = next;
    report(next);
  };
  return {
    state: () => state,
    consider(signedIn, online) {
      if (state !== "idle" || !signedIn || !online) return;
      set("loading");
      Promise.resolve()
        .then(load)
        .then(
          () => set("ready"),
          (error: unknown) => {
            console.warn(`[home-ahead] the Home page's code did not download: ${errorText(error)}`);
            set("failed");
          },
        );
    },
  };
}
FILE-END src/lib/sign-out-landing.ts

FILE-BEGIN src/lib/sign-out-landing.test.ts
import { afterEach, describe, expect, it, vi } from "vitest";

import { createHomeAhead, type HomeAheadState } from "./sign-out-landing";

afterEach(() => vi.restoreAllMocks());

describe("the page a sign-out lands on is fetched ahead of time (DEC-279, INC-930)", () => {
  it("HA-1 a signed-in visitor online fetches the Home page's code once, whatever the shell reads after", async () => {
    const load = vi.fn(() => Promise.resolve());
    const states: HomeAheadState[] = [];
    const ahead = createHomeAhead(load, (state) => states.push(state));
    ahead.consider(true, true);
    ahead.consider(true, true);
    await vi.waitFor(() => expect(ahead.state()).toBe("ready"));
    ahead.consider(true, true);
    expect(load).toHaveBeenCalledTimes(1);
    expect(states).toEqual(["loading", "ready"]);
  });

  it("HA-2 a signed-out visitor, or one offline, fetches nothing until both hold", async () => {
    const load = vi.fn(() => Promise.resolve());
    const ahead = createHomeAhead(load);
    ahead.consider(false, true);
    ahead.consider(true, false);
    expect(load).not.toHaveBeenCalled();
    expect(ahead.state()).toBe("idle");
    ahead.consider(true, true);
    await vi.waitFor(() => expect(ahead.state()).toBe("ready"));
    expect(load).toHaveBeenCalledTimes(1);
  });

  it("HA-3 a failed fetch is logged once, not retried, and says what failed", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const load = vi.fn(() =>
      Promise.reject(new Error("Failed to fetch dynamically imported module")),
    );
    const ahead = createHomeAhead(load);
    ahead.consider(true, true);
    await vi.waitFor(() => expect(ahead.state()).toBe("failed"));
    ahead.consider(true, true);
    expect(load).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toBe(
      "[home-ahead] the Home page's code did not download: Failed to fetch dynamically imported module",
    );
  });

  it("HA-4 a fetch that throws at once, or that has nothing to fetch, settles all the same", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const throwing = createHomeAhead(() => {
      throw new Error("no route");
    });
    throwing.consider(true, true);
    await vi.waitFor(() => expect(throwing.state()).toBe("failed"));
    const nothing = createHomeAhead(() => undefined);
    nothing.consider(true, true);
    await vi.waitFor(() => expect(nothing.state()).toBe("ready"));
  });
});
FILE-END src/lib/sign-out-landing.test.ts

EDIT src/components/app-shell.tsx #1
OLD-BEGIN
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

OLD-END
NEW-BEGIN
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";

NEW-END
EDIT src/components/app-shell.tsx #2
OLD-BEGIN
import { sendsToSignIn } from "@/lib/signed-in-pages";
import { useRailCollapsed, RAIL_INIT_SCRIPT } from "@/providers/rail-state";
OLD-END
NEW-BEGIN
import { sendsToSignIn } from "@/lib/signed-in-pages";
import { createHomeAhead } from "@/lib/sign-out-landing";
import { useRailCollapsed, RAIL_INIT_SCRIPT } from "@/providers/rail-state";
NEW-END
EDIT src/components/app-shell.tsx #3
OLD-BEGIN
  const { user, loading: authLoading, hadSession, signOut } = useAuth();
  const [panelChoice, setPanelChoice] = useState<PanelId>("marketplace");
OLD-END
NEW-BEGIN
  const { user, loading: authLoading, hadSession, signOut } = useAuth();
  const router = useRouter();
  /**
   * DEC-279 (INC-930; Foundations turn 34c-4) — the Home page's code is fetched ahead of time for a
   * signed-in visitor, so a sign-out made offline from a page opened directly lands on a working
   * Home page (src/lib/sign-out-landing.ts). The E2E build shows the fetch's state to SO-13.
   */
  const homeAhead = useMemo(
    () =>
      createHomeAhead(
        () => router.loadRouteChunk(router.routesById["/"]),
        (state) => {
          if (isE2E) (window as unknown as { __ethioHomeAhead?: string }).__ethioHomeAhead = state;
        },
      ),
    [router],
  );
  useEffect(() => {
    const consider = () => homeAhead.consider(user !== null, navigator.onLine);
    consider();
    window.addEventListener("online", consider);
    return () => window.removeEventListener("online", consider);
  }, [user, homeAhead]);
  const [panelChoice, setPanelChoice] = useState<PanelId>("marketplace");
NEW-END

EDIT src/lib/env-flags.test.ts #1
OLD-BEGIN
      "src/components/app-shell.tsx: __ethioClientOff, __ethioQueryClient, __ethioSupabase",
OLD-END
NEW-BEGIN
      "src/components/app-shell.tsx: __ethioClientOff, __ethioHomeAhead, __ethioQueryClient, __ethioSupabase",
NEW-END

EDIT src/test/e2e-route-guard.test.ts #1
OLD-BEGIN
 * INC-934 — a test's interception ends with its page (e2e/helpers/route-guard.ts): a route handler
 * whose page has gone ends quietly; every other error is the test's own and throws.
 */
OLD-END
NEW-BEGIN
 * INC-934 — a test's interception ends with its page (e2e/helpers/route-guard.ts): a route handler
 * whose page has gone ends quietly; every other error is the test's own and throws. Turn 34c-4:
 * "gone" is read from the page itself — the same words on a page still open throw.
 */
NEW-END
EDIT src/test/e2e-route-guard.test.ts #2
OLD-BEGIN

import { pageWentAway, whilePageLives } from "../../e2e/helpers/route-guard";

const route = {} as unknown as Route;

OLD-END
NEW-BEGIN

import { pageWentAway, routePageClosed, whilePageLives } from "../../e2e/helpers/route-guard";

/** A route whose request's page is closed, or not. */
function routeOn(closed: boolean): Route {
  return {
    request: () => ({ frame: () => ({ page: () => ({ isClosed: () => closed }) }) }),
  } as unknown as Route;
}

NEW-END
EDIT src/test/e2e-route-guard.test.ts #3
OLD-BEGIN
    expect(pageWentAway("Target page, context or browser has been closed")).toBe(true);
  });
OLD-END
NEW-BEGIN
    expect(pageWentAway("Target page, context or browser has been closed")).toBe(true);
    // INC-937 — the words come through errorText: an error with no message is never "undefined".
    expect(pageWentAway(new Error(""))).toBe(false);
    expect(pageWentAway({ message: "Response has been disposed" })).toBe(true);
  });
NEW-END
EDIT src/test/e2e-route-guard.test.ts #4
OLD-BEGIN
  it("RG-2 a handler whose page has gone ends; any other failure throws; a handler that answers is untouched", async () => {
    const calls: string[] = [];
OLD-END
NEW-BEGIN
  it("RG-2 a handler whose page has gone ends; any other failure throws; a handler that answers is untouched", async () => {
    const closed = routeOn(true);
    const calls: string[] = [];
NEW-END
EDIT src/test/e2e-route-guard.test.ts #5
OLD-BEGIN
        throw new Error("apiResponse.text: Response has been disposed");
      })(route),
    ).resolves.toBeUndefined();
OLD-END
NEW-BEGIN
        throw new Error("apiResponse.text: Response has been disposed");
      })(closed),
    ).resolves.toBeUndefined();
NEW-END
EDIT src/test/e2e-route-guard.test.ts #6
OLD-BEGIN
        throw new Error("the test's own failure");
      })(route),
    ).rejects.toThrow("the test's own failure");
    await whilePageLives(async (given) => {
      calls.push(given === route ? "answered" : "another route");
    })(route);
    expect(calls).toEqual(["gone", "answered"]);
  });
});
OLD-END
NEW-BEGIN
        throw new Error("the test's own failure");
      })(closed),
    ).rejects.toThrow("the test's own failure");
    await whilePageLives(async (given) => {
      calls.push(given === closed ? "answered" : "another route");
    })(closed);
    expect(calls).toEqual(["gone", "answered"]);
  });

  it("RG-3 the same words on a page that is still open are the test's own failure and throw", async () => {
    const open = routeOn(false);
    expect(routePageClosed(open)).toBe(false);
    expect(routePageClosed(routeOn(true))).toBe(true);
    await expect(
      whilePageLives(async () => {
        throw new Error("apiResponse.text: Response has been disposed");
      })(open),
    ).rejects.toThrow("Response has been disposed");
  });
});
NEW-END

EDIT e2e/helpers/route-guard.ts #1
OLD-BEGIN
import type { Route } from "@playwright/test";

/**
 * INC-934 (Foundations turn 34d) — A REQUEST THAT OUTLIVES ITS PAGE. A route handler that fetches
OLD-END
NEW-BEGIN
import type { Route } from "@playwright/test";

import { errorText } from "../../src/lib/error-text";

/**
 * INC-934 (Foundations turn 34d) — A REQUEST THAT OUTLIVES ITS PAGE. A route handler that fetches
NEW-END
EDIT e2e/helpers/route-guard.ts #2
OLD-BEGIN
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
OLD-END
NEW-BEGIN
 * `response.text()` or `route.fulfill()`. That page has no one left to answer, so the request ends
 * there. Any other error is the test's own and throws.
 *
 * Turn 34c-4 (turn 34d's reviewer) — the request ends quietly only when its page is in fact closed:
 * "Response has been disposed" on a page that is still open is the test's own failure and throws.
 * The error's words are read through `errorText` (src/lib/error-text.ts, INC-937's rule).
 */

/** The two errors Playwright gives a handler whose page has gone. */
export function pageWentAway(error: unknown): boolean {
  return /Target page, context or browser has been closed|Response has been disposed/.test(
    errorText(error),
  );
}

/** Whether the page that made the route's request is closed. */
export function routePageClosed(route: Route): boolean {
  return route.request().frame().page().isClosed();
}

/**
 * A route handler that ends when its page has gone (INC-934): one of the two errors, on a page that
 * is closed. Every other error throws.
 */
export function whilePageLives(
  handler: (route: Route) => Promise<void>,
NEW-END
EDIT e2e/helpers/route-guard.ts #3
OLD-BEGIN
      await handler(route);
    } catch (error) {
      if (pageWentAway(error)) return;
      throw error;
    }
OLD-END
NEW-BEGIN
      await handler(route);
    } catch (error) {
      if (pageWentAway(error) && routePageClosed(route)) return;
      throw error;
    }
NEW-END

EDIT scripts/conformance/route-guard.test.ts #1
OLD-BEGIN
 * whose handlers do not yet is held at its count by its allowlist line, which only falls.
 */
OLD-END
NEW-BEGIN
 * whose handlers do not yet is held at its count by its allowlist line, which only falls.
 * Turn 34c-4 (turn 34d's reviewer): only `whilePageLives` itself, by name, guards a handler — a
 * handler passed through any other wrapper is read as unguarded.
 */
NEW-END
EDIT scripts/conformance/route-guard.test.ts #2
OLD-BEGIN
        return;
      const handler = node.arguments[1];
      if (handler === undefined) return;
OLD-END
NEW-BEGIN
        return;
      let handler = node.arguments[1];
      if (handler !== undefined && ts.isCallExpression(handler)) {
        // The guard by name; any other wrapper's handler is read as written.
        if (ts.isIdentifier(handler.expression) && handler.expression.text === "whilePageLives")
          return;
        handler = handler.arguments[0];
      }
      if (handler === undefined) return;
NEW-END
EDIT scripts/conformance/route-guard.test.ts #3
OLD-BEGIN
      }
      console.log(`[route-guard] files read: ${domain.length}; unguarded handlers: ${keys.length}`);
      expect(domain.length).toBeGreaterThan(0);
OLD-END
NEW-BEGIN
      }
      const handlers = [...sites.values()].reduce((sum, lines) => sum + lines.length, 0);
      console.log(
        `[route-guard] files read: ${domain.length}; unguarded handlers: ${handlers} in ${keys.length} files`,
      );
      expect(domain.length).toBeGreaterThan(0);
NEW-END
EDIT scripts/conformance/route-guard.test.ts #4
OLD-BEGIN

  it("CF-RG-2 the census names a planted unguarded handler and passes a guarded one and one that never fetches", () => {
    const dir = "node_modules/.cache/route-guard";
OLD-END
NEW-BEGIN

  it("CF-RG-2 the census names a planted unguarded handler and one behind another wrapper, and passes a guarded one and one that never fetches", () => {
    const dir = "node_modules/.cache/route-guard";
NEW-END
EDIT scripts/conformance/route-guard.test.ts #5
OLD-BEGIN
          '  await page.route("**/*.png", (route) => route.abort("failed"));',
          "}",
OLD-END
NEW-BEGIN
          '  await page.route("**/*.png", (route) => route.abort("failed"));',
          "  await page.route(",
          '    "**/*.svg",',
          "    keepAlive(async (route) => {",
          "      const response = await route.fetch();",
          "      await route.fulfill({ response });",
          "    }),",
          "  );",
          "}",
          "function keepAlive<T>(handler: T): T {",
          "  return handler;",
          "}",
NEW-END
EDIT scripts/conformance/route-guard.test.ts #6
OLD-BEGIN
      );
      expect([...unguardedHandlers([file])]).toEqual([[file, [4]]]);
    } finally {
OLD-END
NEW-BEGIN
      );
      expect([...unguardedHandlers([file])]).toEqual([[file, [4, 16]]]);
    } finally {
NEW-END

EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 54 | A session the browser could not read is UNKNOWN, never signed out: no Sign in shown to a signed-in visitor, no sign-in page for a door-step page, no "dead link" on a good link; a server call made without the session says so (INC-914) | `src/lib/supabase-door.ts` — `currentSession()` answers `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`) — `failed` when the read did not happen (the client not downloaded, getSession() thrown, a refresh that never reached the server); a refresh the server refused is signed out, known; its readers: use-auth (unknown: loading kept, the shell's notice), requireSignedIn (the route error view, whose one cure is Refresh), the session's bearer (none, said), the preferred-language reads (a typed reason), the legal landing (lands, logged), route-client; the reset and confirmation screens keep a client that did not load apart from a dead link (`sessionRehydration`, `VerificationResult` `unavailable`); since turn 34c-5 (INC-933) also the signed-in services — the posting service's own-row reads (`signedInSellerId`: a failed read throws a ReaderError), the price prefills (no prefill), the step-up freshness (not fresh), Account and Settings' member-since (the session's own `created_at`, no server round trip), and the auth service's own flows (the grant's commit poll, `rehydrate`, the verification landing — `unavailable` —, the reset — the generic error, never a dead link) | `scripts/conformance/session-reads.test.ts` (CF-SESSION-1: every reader reads `failed`; CF-SESSION-2: planted session-only readers; CF-SESSION-3: no `.auth.getSession()` or `.auth.getUser()` around the door in the browser tree — src/ but src/server, src/routes/api and src/integrations; CF-SESSION-4: planted reads around it); UA-1/2, SIR-3, SBB-3, REV-1, SBD-11/15/20, ASC-6/7/8/9; `e2e/supabase-door.spec.ts` SBE-6 | `scripts/conformance/session-reads-allowlist.txt`: the password proof's `auth.getUser()` (the server's own answer of the e-mail; DEC-274) | a new reader is named by CF-SESSION-1 the day it lands, and a read around the door by CF-SESSION-3 | the root error view's Try again became Refresh (INC-918's class); Foundations turn 34c-1; turn 34c-2 — INC-931, DEC-273: the sign-in and reset screens' mount read (auth-service.ts `rehydrate`) keeps an expired session whose refresh never reached the server (`neverReachedTheServer`) and answers "unavailable", ASC-7; the eviction stays for a refresh the server refused; turn 34c-5 — every session read in the browser through the door (INC-933) |
| 55 | The project's public address, its publishable key and the session's storage names are read in one place, so every reader agrees: the client, the session clocks, the password check's second client, the language list, the root's loader and the photo origin (a second reading drifted — a local backend's address, a trailing slash, a browser pair without the server pair) | `src/lib/supabase-door.ts` — `projectEnv()` (the address and key as the client module reads them), `storedSessionKey()` (the client's own `sb-<ref>-auth-token`), `besideStoredSession(name)` (`sb-<ref>-<name>`: the session clocks), `neverReachedTheServer(error)` (auth-js's own test, by name) | `scripts/conformance/project-reads.test.ts` (CF-PROJECT-1: no browser or route file outside the door reads the address, the key or the storage name; CF-PROJECT-2: planted readers); SPK-1/2/3 (`src/features/session/session-policy.test.ts`) | `src/integrations/` (the generated client) and `src/server/` (the server's environment reader) are not browser code | a second project in the browser, a local backend, a new name kept beside the session | the session clocks read only this project's session — never any `sb-*-auth-token` in the browser; Foundations turn 34c-2 |
| 56 | No code gains a TypeScript non-null assertion — the executor's platform rule: narrow with a guard or optional chaining (a `process.env` read excepted) | `scripts/conformance/non-null.test.ts` (`nonNullCensus`: every non-null assertion in src/ but src/integrations/, scripts/, e2e/ and .claude/hooks/) with its ratchet, `scripts/conformance/non-null-allowlist.txt` — one line per file, keyed `<file> (<count>)`, so a file that sheds one lowers its line (the old line goes stale and fails) and a file that gains one is named | CF-NN-1, CF-NN-2 | 144 files hold the 979 non-null and 13 definite-assignment assertions (a `let` or a class field marked `!` before its type, counted since turn 34d) written before the rule was enforced (INC-932), each at its count | a new file starts at zero; a refactor lowers its file's count | the kit (.claude/hooks) at zero since turn K2; Foundations turn K2 |
| 57 | A test's interception ends with its page: a route handler that fetches the real answer can outlive the page it serves (the app's one reload for a failed chunk, a navigation, the test's end), and Playwright then throws inside the handler — a test failed in its helper, not on the product (INC-934) | `e2e/helpers/route-guard.ts` — `whilePageLives(handler)` (a closed page or a disposed response ends the request; every other error throws) and `pageWentAway(error)` | `scripts/conformance/route-guard.test.ts` (CF-RG-1: every e2e `page.route` handler that calls its route's `fetch()` goes through whilePageLives, or its file's allowlist line holds it at its count; CF-RG-2: planted); RG-1/2 (`src/test/e2e-route-guard.test.ts`); ODE-1 | `scripts/conformance/route-guard-allowlist.txt` — e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2), e2e/post-wizard-specs.spec.ts (1), until INC-934: each moves when its file is next run whole (G37) | a new interception that reads the real answer wraps its handler once | the on-demand helper (refuseScripts) since turn 34d; Foundations turn 34d |
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |
OLD-END
NEW-BEGIN
| 54 | A session the browser could not read is UNKNOWN, never signed out: no Sign in shown to a signed-in visitor, no sign-in page for a door-step page, no "dead link" on a good link; a server call made without the session says so (INC-914) | `src/lib/supabase-door.ts` — `currentSession()` answers `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`) — `failed` when the read did not happen (the client not downloaded, getSession() thrown, a refresh that never reached the server); a refresh the server refused is signed out, known; its readers: use-auth (unknown: loading kept, the shell's notice), requireSignedIn (the route error view, whose one cure is Refresh), the session's bearer (none, said), the preferred-language reads (a typed reason), the legal landing (lands, logged), route-client; the reset and confirmation screens keep a client that did not load apart from a dead link (`sessionRehydration`, `VerificationResult` `unavailable`); since turn 34c-5 (INC-933) also the signed-in services — the posting service's own-row reads (`signedInSellerId`: a failed read throws a ReaderError), the price prefills (no prefill), the step-up freshness (not fresh), Account and Settings' member-since (the session's own `created_at`, no server round trip), and the auth service's own flows (the grant's commit poll, `rehydrate`, the verification landing — `unavailable` —, the reset — the generic error, never a dead link) | `scripts/conformance/session-reads.test.ts` (CF-SESSION-1: every reader reads `failed`; CF-SESSION-2: planted session-only readers; CF-SESSION-3: no `.auth.getSession()` or `.auth.getUser()` around the door in the browser tree — src/ but src/server, src/routes/api and src/integrations; CF-SESSION-4: planted reads around it); UA-1/2, SIR-3, SBB-3, REV-1, SBD-11/15/20, ASC-6/7/8/9; `e2e/supabase-door.spec.ts` SBE-6 | `scripts/conformance/session-reads-allowlist.txt`: the password proof's `auth.getUser()` (the server's own answer of the e-mail; DEC-274) | a new reader is named by CF-SESSION-1 the day it lands, and a read around the door by CF-SESSION-3 | the root error view's Try again became Refresh (INC-918's class); Foundations turn 34c-1; turn 34c-2 — INC-931, DEC-273: the sign-in and reset screens' mount read (auth-service.ts `rehydrate`) keeps an expired session whose refresh never reached the server (`neverReachedTheServer`) and answers "unavailable", ASC-7; the eviction stays for a refresh the server refused; turn 34c-5 — every session read in the browser through the door (INC-933) |
| 55 | The project's public address, its publishable key and the session's storage names are read in one place, so every reader agrees: the client, the session clocks, the password check's second client, the language list, the root's loader and the photo origin (a second reading drifted — a local backend's address, a trailing slash, a browser pair without the server pair) | `src/lib/supabase-door.ts` — `projectEnv()` (the address and key as the client module reads them), `storedSessionKey()` (the client's own `sb-<ref>-auth-token`), `besideStoredSession(name)` (`sb-<ref>-<name>`: the session clocks), `neverReachedTheServer(error)` (auth-js's own test, by name); the names' rule itself in `src/lib/session-key.ts` (`authStorageKey`, `keyBeside`, `SUPABASE_PREFIX`), which the tests read too — `e2e/helpers/session.ts` (`storageKey()`, `besideSessionKey()`, the stored-session helpers; turn 34c-4) | `scripts/conformance/project-reads.test.ts` (CF-PROJECT-1: no browser or route file outside the door reads the address, the key or the storage name; CF-PROJECT-2: planted readers; CF-PROJECT-3: no e2e file but its session helper names the session's storage; CF-PROJECT-4: planted); SPK-1/2/3 (`src/features/session/session-policy.test.ts`) | `src/integrations/` (the generated client) and `src/server/` (the server's environment reader) are not browser code | a second project in the browser, a local backend, a new name kept beside the session | the session clocks read only this project's session — never any `sb-*-auth-token` in the browser; Foundations turn 34c-2 |
| 56 | No code gains a TypeScript non-null assertion — the executor's platform rule: narrow with a guard or optional chaining (a `process.env` read excepted) | `scripts/conformance/non-null.test.ts` (`nonNullCensus`: every non-null assertion in src/ but src/integrations/, scripts/, e2e/ and .claude/hooks/) with its ratchet, `scripts/conformance/non-null-allowlist.txt` — one line per file, keyed `<file> (<count>)`, so a file that sheds one lowers its line (the old line goes stale and fails) and a file that gains one is named | CF-NN-1, CF-NN-2 | 144 files hold the 979 non-null and 13 definite-assignment assertions (a `let` or a class field marked `!` before its type, counted since turn 34d) written before the rule was enforced (INC-932), each at its count | a new file starts at zero; a refactor lowers its file's count | the kit (.claude/hooks) at zero since turn K2; Foundations turn K2 |
| 57 | A test's interception ends with its page: a route handler that fetches the real answer can outlive the page it serves (the app's one reload for a failed chunk, a navigation, the test's end), and Playwright then throws inside the handler — a test failed in its helper, not on the product (INC-934) | `e2e/helpers/route-guard.ts` — `whilePageLives(handler)` (one of Playwright's two "gone" errors on a page that is closed ends the request; every other error throws — turn 34c-4), `pageWentAway(error)` (its words through `errorText`) and `routePageClosed(route)` | `scripts/conformance/route-guard.test.ts` (CF-RG-1: every e2e `page.route` handler that calls its route's `fetch()` goes through whilePageLives by name, or its file's allowlist line holds it at its count; CF-RG-2: planted, a handler behind another wrapper included); RG-1/2/3 (`src/test/e2e-route-guard.test.ts`); ODE-1 | `scripts/conformance/route-guard-allowlist.txt` — e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2), e2e/post-wizard-specs.spec.ts (1), until INC-934: each moves when its file is next run whole (G37) | a new interception that reads the real answer wraps its handler once | the on-demand helper (refuseScripts) since turn 34d; Foundations turn 34d |
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |
NEW-END
EDIT docs/governance/mechanisms.md #2
OLD-BEGIN
| 61 | A test reads a layout whole, once it has stopped moving: every box a test compares is read in one frame after `settled(page)`, and kept only when a read two frames later agrees, so boxes read one by one never straddle a change (INC-940; INC-384 is its animation half) | `e2e/helpers/ui.ts` `layoutBoxes(targets)` (Locators in, `LayoutBox`es out; one `page.evaluate` over every element; the poll names the boxes still moving or missing) | `scripts/conformance/layout-reads.test.ts` — BX-1 enumerates every `.boundingBox()` call under e2e/ keyed by its test id (or title) or its helper, BX-2 plants a read in a test, in a describe's helper and at the top level | `scripts/conformance/layout-reads-allowlist.txt` — 68 keys in 18 files (`until INC-946`); e2e/ad-page.spec.ts moved in turn 34f and stays off the list | one call per comparison, any number of boxes | turn 34f; the allowlist shrinks file by file (INC-946) |

OLD-END
NEW-BEGIN
| 61 | A test reads a layout whole, once it has stopped moving: every box a test compares is read in one frame after `settled(page)`, and kept only when a read two frames later agrees, so boxes read one by one never straddle a change (INC-940; INC-384 is its animation half) | `e2e/helpers/ui.ts` `layoutBoxes(targets)` (Locators in, `LayoutBox`es out; one `page.evaluate` over every element; the poll names the boxes still moving or missing) | `scripts/conformance/layout-reads.test.ts` — BX-1 enumerates every `.boundingBox()` call under e2e/ keyed by its test id (or title) or its helper, BX-2 plants a read in a test, in a describe's helper and at the top level | `scripts/conformance/layout-reads-allowlist.txt` — 68 keys in 18 files (`until INC-946`); e2e/ad-page.spec.ts moved in turn 34f and stays off the list | one call per comparison, any number of boxes | turn 34f; the allowlist shrinks file by file (INC-946) |
| 62 | The page a sign-out lands on is on the device before it is needed: every sign-out ends on "/", and a tab opened on another page never downloaded the Home page's code, so a sign-out made offline there showed the root's "This page didn't load" view until the connection returned (INC-930) | `src/lib/sign-out-landing.ts` `createHomeAhead(load, report)` — for a signed-in visitor, online, the Home route's code (`router.loadRouteChunk` for "/", about 13.5 KB compressed) is fetched once per page life; a failure is logged and not retried (INC-918) — driven by the shell (`src/components/app-shell.tsx`, the visitor's reading and the `online` event) | HA-1…4 (`src/lib/sign-out-landing.test.ts`); SO-13 (`e2e/auth-signout.spec.ts`: a tab opened on /settings signs out offline and Home draws by its own code) | none | another page a flow lands on offline is another `load` given to the same function | DEC-279 (the operator's choice (b), 2026-10-27); Foundations turn 34c-4 |

NEW-END

EDIT docs/features/e2e-harness.md #1
OLD-BEGIN
A route handler that fetches or reads the real answer goes through `whilePageLives` (e2e/helpers/route-guard.ts, INC-934): a request whose page has gone (a reload, a navigation, the test's end) ends there; every other error fails the test. CF-RG-1 (scripts/conformance/route-guard.test.ts) names a fetching handler outside it.
OLD-END
NEW-BEGIN
A route handler that fetches or reads the real answer goes through `whilePageLives` (e2e/helpers/route-guard.ts, INC-934): a request whose page has gone (a reload, a navigation, the test's end) ends there; every other error fails the test. CF-RG-1 (scripts/conformance/route-guard.test.ts) names a fetching handler outside it. Since turn 34c-4 "gone" is read from the page itself (`routePageClosed`): the same words on a page still open fail the test, and only `whilePageLives` by name guards a handler — one passed through any other wrapper is named.

The browser's stored session is found by the app's own names for it (turn 34c-4): `storageKey()` and `besideSessionKey(name)` in e2e/helpers/session.ts, built from src/lib/session-key.ts — the rule the app's door reads — and the stored-session helpers there (`waitForStoredSession`, `holdsStoredSession`, `readStoredSession`, `editStoredSession`, `forgetStoredSession`, `supabaseNamesIn`). A test never searches the storage for "any sb-…-auth-token" or builds a clock's name by hand: CF-PROJECT-3 (scripts/conformance/project-reads.test.ts) names an e2e file that does.
NEW-END

EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930: the operator chose (b) on 2026-10-27 (DEC-279) — for a signed-in visitor the Home page's code is fetched ahead of time (at most 13.5 KB compressed, once, measured 2026-10-26), so an offline sign-out lands on a working page. And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell. With it, turn 34d's reviewer's points on the route guard (e2e/helpers/route-guard.ts): it ends a request quietly only when the page is in fact closed (a disposed response on a live page is the test's own failure); it reads the error's text through errorText (INC-937); CF-RG-1 accepts `whilePageLives` by name only (a planted other wrapper is named) and its log line counts handlers, not files.
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
OLD-END
NEW-BEGIN
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930: the operator chose (b) on 2026-10-27 (DEC-279) — for a signed-in visitor the Home page's code is fetched ahead of time (at most 13.5 KB compressed, once, measured 2026-10-26), so an offline sign-out lands on a working page. And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell. With it, turn 34d's reviewer's points on the route guard (e2e/helpers/route-guard.ts): it ends a request quietly only when the page is in fact closed (a disposed response on a live page is the test's own failure); it reads the error's text through errorText (INC-937); CF-RG-1 accepts `whilePageLives` by name only (a planted other wrapper is named) and its log line counts handlers, not files.
  - [ ] INC-959 — the e2e reads of the browser's client (`window.__ethioSupabase`, 91 mentions in 24 files at `562db573`, grep-counted; the synchronous readers of turn 34c-1's K2: admin-users.spec.ts, admin-translations-data.spec.ts, admin-translations-console.spec.ts) go through one helper that waits for the client's hand-off (DEC-261), with its census and an allowlist that falls file by file (G0.4) — the part of turn 34c-4's line that turn left (its K2)
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
NEW-END

EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations records turn R6 (2026-10-27; G41, G53) — records only. The handover supplement of 2026-10-27 imported (its repository copy leaves out the tracker's address and ids, an e-mail address and the detail of two unfixed findings — G51); INC-949–INC-954 and INC-930's answer in the incident ledger; block S79 (DEC-277: the nightly at 11:30 New York; DEC-278: the reviewer keeps the executor's model, the checks once per code tree; DEC-279: INC-930 (b); DEC-280: an AI verdict about a person refused without its audit row; turn 34f-2's review rulings; the rules in force not yet installed); S457 and its pre-handoff checklist; ACT-021; the speed plan, the edge-caching and card-photo studies and the category-pictures spec in docs/governance/plans/; the owed roadmap lines.
OLD-END
NEW-BEGIN
- Foundations records turn R6 (2026-10-27; G41, G53) — records only. The handover supplement of 2026-10-27 imported (its repository copy leaves out the tracker's address and ids, an e-mail address and the detail of two unfixed findings — G51); INC-949–INC-954 and INC-930's answer in the incident ledger; block S79 (DEC-277: the nightly at 11:30 New York; DEC-278: the reviewer keeps the executor's model, the checks once per code tree; DEC-279: INC-930 (b); DEC-280: an AI verdict about a person refused without its audit row; turn 34f-2's review rulings; the rules in force not yet installed); S457 and its pre-handoff checklist; ACT-021; the speed plan, the edge-caching and card-photo studies and the category-pictures spec in docs/governance/plans/; the owed roadmap lines.

- Foundations turn 34c-4 (2026-10-27; DEC-279, INC-930; register rows 55, 57 and 62) — the tests find the browser's stored session by the app's own names: the rule moves to src/lib/session-key.ts, read by the door and by e2e/helpers/session.ts, whose stored-session helpers replace ten searches for "any sb-…-auth-token" and the session clocks' hand-built names (CF-PROJECT-3/4). For a signed-in visitor the Home page's code is fetched ahead of time (src/lib/sign-out-landing.ts, HA-1…4), so a sign-out made offline from a page opened directly lands on a working Home page (SO-13). The route guard ends a request quietly only when its page is in fact closed, reads the error's words through errorText, and is recognised by name only (RG-3, CF-RG-2).
NEW-END
```
