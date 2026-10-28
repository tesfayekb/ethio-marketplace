# Foundations — turn C2: the cleanup turn — one landing page for a sign-out, the code an offline sign-out needs fetched ahead (INC-960), a caught error's text read one way everywhere (INC-937), one "log only" line for a failure said in place, the allowlist reader's keys (INC-950), and turn C1-2's review: brief (saved unchanged, 2026-10-28)

```text
FOUNDATIONS — TURN C2 (2026-10-28; G0; INC-937, INC-950, INC-960, turn 34c-4's review, turn C1-2's review MINOR-1…11; anchors located at a05e5c9594b077ec41fb3ffecc129ea98195eb70). The Claude Code executor (DEC-257). SPEC-BUILT (G59: tests, tooling and screens; no sign-in, permission, migration or personal-data change): this brief states the behaviour, the constraints, the censuses and the tests; you write the code, except Part B's two constants, given exactly. Your reviewer, CI on your commit and the supervisor's full diff review judge it. Tier A for Part B and C (the sign-out path), Tier B for the rest.

BASE: a05e5c9594b077ec41fb3ffecc129ea98195eb70
CI ON BASE: the run on a05e5c95 (turn K4) had not completed when this brief was written — its code is CI tooling only; the last completed run, on 46586343 (all of turn C1-2's code), was SUCCESS, run 40680789056.

FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/lib/sign-out-landing.ts
src/lib/sign-out-landing.test.ts
src/components/app-shell.tsx
src/components/shell/app-header.tsx
src/components/ui/overlay-loader.ts
src/lib/on-demand-failure.ts
src/lib/resilient-lazy.ts
src/components/shell/date-field.tsx
src/lib/on-demand-failure.test.ts
src/lib/error-text.ts
src/lib/error-text.test.ts
src/features/posting/map/**
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/step-where.tsx
src/features/posting/step-where*.test.tsx
src/features/posting/step-who.tsx
src/routes/l.$slug.tsx
e2e/**
scripts/**
src/test/e2e-route-guard.test.ts
AGENTS.md
docs/features/**
docs/governance/mechanisms.md
docs/tracking/incidental-findings.md
docs/_changelog.md
docs/generated/i18n-usage.json
public/i18n-usage.json
SCOPE-END

THE SYSTEM (G0) — five concerns.
1 — CONCERN: a sign-out lands on one page, named once. MECHANISM: NONE YET — `SIGN_OUT_LANDING` in src/lib/sign-out-landing.ts (Part B). CONSUMERS (grep of a05e5c9594b077ec41fb3ffecc129ea98195eb70): app-shell.tsx :681 and :688 (`window.location.replace("/")`), :705 (`navigate({ to: "/", replace: true })` after the purge), :807 (a gated page's kick after the session went), :136 (`router.routesById["/"]` — the page fetched ahead); find any other with `grep -rn 'replace("/")\|to: "/", replace' src --include=*.ts --include=*.tsx`. GUARD: scripts/conformance/sign-out-landing.test.ts (CF-SOL-1: no literal "/" in a `location.replace(`/`location.assign(` call or a `navigate({ … replace: true })` call in src/ outside the allowlist — none expected; the page fetched ahead is `routesById[SIGN_OUT_LANDING]`; CF-SOL-2: planted, each form named).
2 — CONCERN: the code an offline sign-out needs is on the device before it is needed (register row 62; INC-960). MECHANISM: `createHomeAhead` (src/lib/sign-out-landing.ts) — it becomes the one fetch-ahead for a signed-in visitor of EVERY piece the sign-out path draws: the landing page's code and, on a phone, the account menu's (Part C). CENSUS FIRST (G21): read what the phone's account menu needs to open and when it arrives today (app-header.tsx :210 and the overlay facade it uses; overlay-loader.ts `warmOverlaysWhenIdle` :63, called from overlay-facade.tsx :117 and :445) and paste the answer with lines before changing anything: why SO-13's phone leg had to open the menu online. GUARD: SAH-1… (src/lib/sign-out-landing.test.ts — every piece's fetch starts once for a signed-in visitor online, none for a signed-out visitor, a failure logged and not retried, the state reported per piece); SO-13's phone leg opens the menu only offline.
3 — CONCERN: a caught error's text is read one way everywhere (rule 10 F4; INC-937). MECHANISM: `errorText` (src/lib/error-text.ts). CONSUMERS: the census src/lib/error-text.test.ts :113 (ERRT-6) reads server code only; it reads src/, e2e/ and scripts/ (G55: the whole tree). The 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files — the roadmap's count at 562db573; recount at a05e5c9594b077ec41fb3ffecc129ea98195eb70 and paste) move onto errorText; a read that cannot (a file run without the app's path alias, say) is an allowlist line `file | reason | until` in a new scripts/conformance/error-text-allowlist.txt read by readAllowlist. GUARD: ERRT-6 widened, red first on a05e5c9594b077ec41fb3ffecc129ea98195eb70; ERRT-7 planted per folder.
4 — CONCERN: a failure a piece says in its own place is logged by one line (turn C1-2's MINOR-3). MECHANISM: NONE YET — `logOnDemandFailure(label, error)` in src/lib/on-demand-failure.ts writes the `[client-error] <label> failed to load: <errorText>` line; `reportOnDemandFailure` calls it and then raises the notice. CONSUMERS: map-preview.tsx :125, map-large.tsx :80, listing-detail.tsx :444, map-pin-dropper.tsx :271, step-who.tsx :219, src/components/shell/date-field.tsx :93 (no errorText today), src/lib/resilient-lazy.ts :33 (its own format, before it reports — read whether it should call reportOnDemandFailure's log once instead of twice) — find any other `[client-error]` template outside on-demand-failure.ts in src/. GUARD: ODC (scripts/conformance/on-demand-failure.test.ts) gains ODC-7: no `console.error(` whose text starts `[client-error]` and ends `failed to load` outside on-demand-failure.ts; planted.
5 — CONCERN: an allowlist reader is handed its census's finding keys, so a stale line fails (G55; INC-950). MECHANISM: `readAllowlist` (scripts/conformance/kit.ts). CONSUMERS: HB-1 (scripts/conformance/holds-its-box.test.ts :134 hands it `consumers`) and every other caller (20 at a05e5c9594b077ec41fb3ffecc129ea98195eb70: `grep -rn "readAllowlist(" scripts src e2e --include=*.ts`) — each read, each that hands anything but its findings' keys fixed, red first on a planted stale line. GUARD: a census in scripts/conformance/kit.test.ts (or the file the kit's own tests live in) that every readAllowlist caller's second argument is derived from its findings — say how you prove it.
EXCEPTIONS: none known; each allowlist line carries its reason and expiry.
FIVE LENSES — security: the sign-out path keeps DEC-268/DEC-271 exactly (no session survives, no frame of the old account) — Part B changes a literal into a constant, nothing else · performance: Part C fetches after the page is idle and only for a signed-in visitor online; no page's FIRST download may grow — check-bundle-size after Parts B, C and E against the previous part's numbers (S465: only your lock-exact build measures this) · failure modes: a fetch ahead that fails is logged, not retried, and changes nothing seen · consistency: one landing, one fetch-ahead, one error reader, one log line, one allowlist rule · future growth: a new piece the sign-out path needs is one entry in the fetch-ahead list.
FORWARD-SCAN: INC-964's turn (first-download chunk count) may move these numbers; it re-measures. REGISTER: row 62 widened (Part C); new rows for concerns 1, 3 (if none exists — grep the register for errorText), 4 and 5 (Part G).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-c2.md by a scripted copy — the Bash guard refuses `python3 -c`; a script file, or the way you saved C1-2's brief, is fine — and paste its sha256sum and byte count (a difference from the carrying message's is a STOP). Then roadmap.md line 3, with your editing tool: the text after "The brief in force: " up to and including `docs/governance/briefs/foundations-turn-k4.md (Foundations turn K4: every changed browser test is repeated inside the normal CI run — DEC-283; the records of turn C1-2's review — INC-964, INC-965)` becomes `docs/governance/briefs/foundations-turn-c2.md (Foundations turn C2: the cleanup turn — one landing page for a sign-out; the offline sign-out's code fetched ahead, INC-960; errorText everywhere, INC-937; one log line for a failure said in place; the allowlist reader's keys, INC-950; turn C1-2's review)` (everything after it stays). Commit `turn C2: step 0 — brief saved`.

HOW TO WORK
- As .claude/rules/00-executor-protocol.md says; land with `bun .claude/hooks/land.ts`. Parts in order: A, STEP 0, B, C, D, E, F, G, THE CHECKS, THE END-TO-END CHECK, THE INDEPENDENT REVIEW, THE COMPLETION REPORT, the landing, END THE TURN.
- A STOP is only: a red you cannot explain at its root; a needed file outside SCOPE; a page's first download that grows (Parts B, C, E — paste the table); a rule of yours that conflicts with this text. An end-to-end red is a STOP only when its failure or its server log touches a path this turn changed; otherwise it is named under Limits with its server-log line and CI judges (ruling 3 of turn C1-2).
- RED FIRST (G38) for every guard and every test that reproduces a defect (shown on a05e5c9594b077ec41fb3ffecc129ea98195eb70's code, never committed); a test for new behaviour needs none.
- Local runs: each part's unit tests; THE END-TO-END CHECK as written below; no repeat runs (DEC-184 — CI's repeat lane, DEC-283, repeats every changed spec).
- Knowledge K1–K6: K1 every census above re-run at a05e5c9594b077ec41fb3ffecc129ea98195eb70 and pasted; K2 the report lists (file:line) every sibling of the five concerns outside this turn's changes; K3 each guard lands with its mechanism.
- Strings: none new (FLAGS); the i18n maps are regenerated if any src file changes (`bun run i18n:usage`) and their diff pasted.
- Records you write in your own words (changelog, docs, register rows) say what landed, with test ids; the supervisor reads them in its diff review.

PART A — orient and CI. As step 1 of the protocol; paste `git rev-parse HEAD origin/dev` (equal), the first six lines of ci-status.md from origin/ci-evidence, and the repeat lane's line in local-backend-proof.md (DEC-283, turn K4: its first run). A red other than none known is a STOP that names it.

PART B — ONE LANDING PAGE FOR A SIGN-OUT (Tier A; exact constant).
B1. src/lib/sign-out-landing.ts gains, after its imports and before `HomeAheadState`:
/** DEC-279 — the page every sign-out lands on (app-shell's hard reset, U0j); named once (turn C2). */
export const SIGN_OUT_LANDING = "/" as const;
B2. Every consumer of concern 1 uses it (no other change on those lines). The guard CF-SOL-1/2, red first on a05e5c9594b077ec41fb3ffecc129ea98195eb70.
B3. Turn 34c-4's review: SO-11, SO-12 and SO-13's "no session" checks read every project's stored session (`sessionsIn(page)` — one helper in e2e/helpers/session.ts beside `holdsStoredSession`; census its callers), the route guard's out-of-date sentences (docs/features/e2e-harness.md :573 names `routePageClosed` as the rule — the rule is `routeDocumentGone`; `routePageClosed` has no caller outside its test: remove it and its test lines, or say why it stays), docs/features/admin-shell.md's sign-out section gains DEC-279 (one sentence).
B4. `bunx vitest run src/lib scripts/conformance src/components`; `bun run build` and `node scripts/check-bundle-size.mjs` — paste the JS line and every page whose number differs from a05e5c9594b077ec41fb3ffecc129ea98195eb70's (expected: none). Commit Part B.

PART C — THE OFFLINE SIGN-OUT'S CODE FETCHED AHEAD (INC-960).
C1. The census of concern 2 (paste it). C2. Widen `createHomeAhead` to the pieces the sign-out path draws (the landing page's code; the account menu's code on every width where the sign-out sits in it) — one mechanism, one state per piece reported to the E2E build (`__ethioHomeAhead` stays for the landing; name the menu's), started only for a signed-in visitor while online, never retried; keep the module's name and doc comment true. C3. SAH-1… unit tests; SO-13's phone leg no longer opens the menu online (its comment says why). C4. `bunx vitest run src/lib src/components`; build and check-bundle-size — no page's first download grows (the fetch is after load); paste. Commit Part C.

PART D — A CAUGHT ERROR'S TEXT, ONE WAY (INC-937). The census of concern 3, red first (ERRT-6 widened to src/, e2e/ and scripts/ fails on a05e5c9594b077ec41fb3ffecc129ea98195eb70 with the count); every hand read moved onto errorText (e2e/ and scripts/ import it by relative path if the alias does not resolve there — say which); the allowlist only for a read that cannot move, each with reason and expiry. `bunx vitest run src/lib scripts`. Commit Part D.

PART E — ONE "LOG ONLY" LINE (turn C1-2's MINOR-3), AND THE MAPS' TEXTS (MINOR-1, -2, -4, -9, -11). E1. `logOnDemandFailure` and its consumers (concern 4); ODC-7, red first. E2. MINOR-1: the two id pairs in ONE place — `MAP_FAILED_IDS` moves to src/features/posting/map/still-map.ts (already imported by map-frame.tsx and map-preview.tsx at a05e5c9594b077ec41fb3ffecc129ea98195eb70), MapFailedHere and both maps read it; MINOR-9: MapFailedHere in its own file (src/features/posting/map/map-failed-here.tsx), imported only by the pages' fallbacks (listing-detail.tsx, step-where.tsx), never by a piece fetched on demand — the rule INC-964 records. E3. MINOR-2: the five texts that say MapFailedHere draws the Leaflet/tile-plan failures (map-frame.tsx :9–14, docs/_changelog.md :1155, docs/governance/mechanisms.md :62, docs/tracking/incidental-findings.md :5433 — as a dated later word, never an edit of the old entry — e2e/ad-page.spec.ts :1150). E4. MINOR-4: the links effect at listing-detail.tsx :449 keyed on the pin's lat, lng and precision, not its identity. E5. MINOR-11: a unit test draws the wizard's NoMap fallback (step-where.tsx :75–81) and finds `map-failed` and Refresh. E6. `bunx vitest run scripts/conformance src/features/posting src/lib`; build and check-bundle-size — no page's first download grows against Part C's numbers (paste the map pages' lines: /l/$slug, /admin/listings_/$listingId, its edit, /admin/screening, /my-listings_/$listingId, /post); a growth is a STOP with the table. Commit Part E.

PART F — THE ALLOWLIST READER'S KEYS (INC-950) AND CF-RLF-1's REACH (MINOR-5). F1. Concern 5's census and fixes, red first on a planted stale line. F2. MINOR-5: CF-RLF-1's `raisesNotice` follows the fetched module's own imports within src/ (one level is not enough: say how deep and why), with a planted case. `bunx vitest run scripts`. Commit Part F.

PART G — THE RECORDS. G1. AGENTS.md :34: the line "- Flake-fix proofs use the manual Flake check, never local browsers." becomes "- A changed spec's repeatability is proven by CI's repeat lane (DEC-283); the manual Flake check (DEC-184) is for investigations; never local browsers for repeats." — if turn K4's repeat lane did NOT run on its landing, STOP before this line. G2. docs/governance/mechanisms.md: row 62 widened; new rows for concerns 1, 4, 5 (and 3 if absent), each with mechanism, guard, allowlist and growth axes, in the register's format; the duplicate row 13 renumbered to the next free row and every reference updated (`grep -rn "row 13" docs`). G3. docs/tracking/incidental-findings.md: dated later words (FIXED in Foundations turn C2, with test ids) under INC-937, INC-950, INC-960; and register, before the line `Numbering: next free INC-966.` (which becomes INC-967), this entry, copied by script from the saved brief:

## INC-966 — a failed repetition's details reach only the lane report, not the merged E2E evidence (2026-10-28; Foundations turn K4's reviewer, MINOR)

Defect: ci.yml :590, the merged E2E report's expected sources, does not name the repeat lane (DEC-283), so a failed repetition turns `e2e` red but its body appears only in local-backend-last-failure.md, not in e2e-last-failure.md where every red is read first; and the lane's time-cap check matches Playwright's message text, unproven until a capped run happens. Fix: the merged report's sources name `repeat?`, and the cap's reading gets a self-test from a captured capped log (a Lovable turn: .github/workflows/** is closed to the Claude Code executor). Class: concern "every changed browser test is repeated inside the normal CI run"; mechanism the repeat lane (DEC-283). Status (2026-10-28): OPEN — the next Lovable turn.
 G4. roadmap.md: tick, each with " — Foundations turn C2 (<test ids>)." appended, the lines of INC-937, INC-950, INC-960 and turn 34c-4's review; the Foundations turns C1/C1-2 line ticked with " Landed `ebd91c10`; CI SUCCESS on its code (run 40680789056)."; never line 3 beyond STEP 0. G5. docs/_changelog.md: one line for the turn. G6. docs/features/nightly-e2e.md :23 gains INC-962's zone check (NH-6) (MINOR-8). Commit Part G.

THE CHECKS: `bun .claude/hooks/land.ts --checks` (paste its lines); `git diff <START> --stat -- supabase package.json bun.lock .claude .github` (empty); `node scripts/check-bundle-size.mjs` — `Bundle budget OK.`; `bunx vitest run` — paste the totals.

THE END-TO-END CHECK: `bun run e2e:local -- e2e/auth-signout.spec.ts e2e/ad-page.spec.ts` whole, both projects, 0 retries, fake mode; then every other spec file this turn changed, whole (at most three more; if more changed, run the three with the most changed lines and list the rest — CI's repeat lane runs every changed spec). Paste each count line and the server log's `[ssr-error]` lines by path. A red is handled as HOW TO WORK says.

THE INDEPENDENT REVIEW: as the protocol says, on the last code commit; a BLOCKER is fixed and reviewed again; MAJOR and MINOR listed for the supervisor.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-c2.report.md with the twelve headings of .claude/rules/60-report.md, each short; every census pasted; every red-first line; every bundle table; the K2 list; departures with reasons; the first six lines of ci-status.md for the last commit you can read. END THE TURN.
```
