# App fixes — six defects in the site itself, each at its mechanism — brief (sha256 be9a46c29ff9f808404e45e8190e1acf642e7dc0f1838e481c1116c758022593)

````text
APP FIXES — the defects the last four turns found in the site itself, each fixed at its mechanism: the impersonation check runs for staff only (DEC-372), a download abandoned by leaving the page never reloads it whoever notices (INC-1128), every dialog gives the focus back to what opened it (INC-1130), a picture that cannot draw still says what it was (INC-1131), a view of an ad that is gone is a quiet typed absence (INC-1134), and the pseudo-translation generator reads its list by key, not by position (INC-1137). Base: dev 203907b3d (a NEW lane `cursor/app-fixes` from origin/dev AFTER PR #38 merges — its tip; its own pull request into dev, a draft from STEP 0, ready at the end).

Stem: `app-fixes` (brief `docs/governance/briefs/app-fixes.md` (new); report `docs/governance/reports/app-fixes.report.md` (new)). Tier A (the impersonation surface and the translation dashboard; no sign-in, permission door, migration or personal-data change). FLAGS: no-migration, no-package-change, new-string (at most two keys, concern 1's notice only; English and Amharic by script, listed key by key in §8), no-agents-change. PLAN FIRST (rule 00 step 3): STEP 1 is a census; it STOPS only when a premise below is wrong or a hit was not anticipated; otherwise you continue to Part A in the same turn.

PREVENTION (G70 — why this turn exists). Each item was found by a guard or a proof that a recent turn added, and each is a class:
(1) INC-1116 — a check every signed-in page runs for a state only a super admin can be in. Class: a cost paid by everyone for a few.
(2) INC-1128 — two reloaders for one concern; the pictures turn fixed ours, and the router library's still fires (the pictures report: 2 of 10 WebKit navigations after E6).
(3) INC-1130, INC-1131 — a shared primitive that handled one case of a rule (screen-sized dialogs; drawn pictures) and left the others.
(4) INC-1134 — a door that logs an error for an ordinary absence.
(5) INC-1137 — positional paging over a list the loop itself changes, against the data-API law, found when the `@global-state` tests first ran on a clean backend (the speed turn, INC-1135).
Repository: this turn. Instructions, Cursor rules, Knowledge: not needed; the classes are held by the guards below.

THE SYSTEM (G0) — concern 1 of 6
CONCERN: a signed-in person who can never hold an impersonation session pays nothing for it — no check, no code — and a person who can always sees a red notice with a way to end it while a session is active.
MECHANISM: `useActiveImpersonation` (`src/features/admin/impersonation/use-impersonation.ts` :23), shown by `ImpersonationBanner` (`src/features/admin/impersonation/impersonation-banner.tsx` :15), rendered for every signed-in person at `src/components/app-shell.tsx` :928 (`<ImpersonationBanner enabled />`). The staff signal is `ADMIN_PANEL_PERMISSION` (`src/components/app-shell.tsx` :49) in the shell's permissions state. On-demand code loads through `resilientLazy` (`src/lib/resilient-lazy.ts` :22).
CONSUMERS (grep of 203907b3d — `rg -n "ImpersonationBanner|useActiveImpersonation|getActiveImpersonation" src e2e`): the census lists every hit — uses | bypasses.
COVERED HERE: Part A (DEC-372, the operator's decision A of 2026-11-12). Laws:
- The check is enabled only for a signed-in person, not signing out, whose settled permissions hold `ADMIN_PANEL_PERMISSION`. While the permissions are loading it is off; when they settle for staff it turns on.
- If the permission read FAILED, the person is treated as staff and the check runs (fail toward showing).
- A page of a person without the permission makes no call to the active-session door, on load or on a route change, and its first download holds none of the banner's code. The first-download table lists each chunk that moved (DEC-355).
- Staff are never left without the notice. If the banner's code cannot load while a session is active, the shell's own code shows a plain red notice with the session's End now. The plan names how the check and the end call stay reachable without the on-demand chunk (DECIDE-AND-NAME).
- The server door and its answers are not changed.
LEFT: none.
CONFORMANCE GUARD: a unit census in the shell's own test file — off for a member; on for staff; on when the read failed; off while loading; the planted case is the old unconditional `enabled`. And a browser test IMP-6 (the family ends at IMP-5): a signed-in member's page makes no request to the active-session door across two route changes, and a staff page does. IMP-1 → IMP-5 run by id beside it.
EXCEPTIONS: none.
FIVE LENSES — security: fail toward showing; the door already answers only the caller's own sessions and expires them server-side · performance: one request fewer on every route change and every thirty seconds for every member; a smaller first download · failure modes: the read failed → the check runs; the chunk failed → the plain notice · consistency: one rule in the shell decides for every page · future growth: the view-as session (DEC-373) replaces the banner's content behind the same gate.
FORWARD-SCAN: DEC-373 (view as the user) adds a second consumer of the gate. REGISTER: a new row — "the impersonation notice: staff only, fail toward showing (DEC-372)" → the shell's gate → the unit census + IMP-6 → exceptions: none.

THE SYSTEM (G0) — concern 2 of 6
CONCERN: a failed download of the app's own code reloads the page at most once, and never while the page is leaving — whoever notices the failure.
MECHANISM: `reloadOnStaleChunk` (`src/lib/stale-chunk.ts` :94) with `hearLeaving` (`src/lib/stale-chunk.ts` :62), installed once at `src/routes/__root.tsx` :442 (`reloadOnStaleChunk(window)`).
CONSUMERS (grep of 203907b3d — `rg -n "location\.reload\(|reloadOnStaleChunk|hearLeaving" src`): the census lists every hit. The known bypass is not a repository file: the router library's lazy route component (`@tanstack/react-router` 1.170.41) reloads the page itself on a module-load error, once per error message, with its own session key, and does not know the page is leaving.
COVERED HERE: Part B, by rule. The census reads the library's lazy component and the router's options at `createRouter(` (`src/router.tsx` :8), and answers one question: is there a seam in the repository's own code through which a route module's load failure reaches the one mechanism before the library reloads?
- If yes: build it. Laws: a stale chunk still reloads once (INC-640, INC-922 and DEC-271 unchanged); a download abandoned by leaving reloads nothing, in every engine; no `unload` listener. Proof: unit tests for each branch, and the pictures turn's WebKit probe (ten immediate navigations away from "/") with no reload over a navigation; `STG-1`, `LY-3` and `LY-4` by id in WebKit.
- If the only ways are a package patch, a dependency change, or writing the library's private storage key: build nothing. §13 carries the reading (the library's lines, the options tried), and INC-1128 stays OPEN for a package turn of its own. This is not a stop.
LEFT: by the rule above.
CONFORMANCE GUARD: CF-STALE-1 (a new family; `rg -n "CF-STALE-" scripts src` finds none) — every `location.reload(` under `src/` is the one mechanism's or an allowlist line with its reason and expiry; planted: a new reload in a feature file. Wired in `scripts/conformance/wired.test.ts`.
EXCEPTIONS: the allowlist's lines (the census names today's sites: the error page's own button, the on-demand failure reader).
FIVE LENSES — security: none new · performance: none · failure modes: named above · consistency: one reloader · future growth: a new lazy surface reports to the same mechanism.
FORWARD-SCAN: none adds a consumer. REGISTER: the stale-chunk row gains CF-STALE-1 and, if built, the router's seam.

THE SYSTEM (G0) — concern 3 of 6
CONCERN: an overlay that closes gives the keyboard focus back to the control that opened it, in every engine, whatever its size and however it was opened (WCAG 2.4.3).
MECHANISM: `openerOf` (`src/components/ui/dialog.tsx` :106) and the panel's `onCloseAutoFocus` (`src/components/ui/dialog.tsx` :167). Today only a screen-sized panel restores its opener (`screenSized`, `src/components/ui/dialog.tsx` :141); a smaller panel opened from state has no trigger for the library to return to, so the focus falls to the page (the pictures report, §13).
CONSUMERS (grep of 203907b3d — `rg -n "DialogContent|SheetContent|AlertDialogContent|PopoverContent" src --glob '!*.test.*'`): the census lists every overlay by definition and marks each: returns the focus (how) | does not.
COVERED HERE: Part C. Laws:
- Every panel of the shared dialog returns the focus to its opener (the control that held the focus when it opened, or the control the opening press landed on — INC-1126's rule), unless the library returns it to a trigger of its own or the owner passes its own `onCloseAutoFocus`.
- The opener is used only if it is still in the page; otherwise the focus goes where it goes today.
- The sheet and the alert dialog follow the same rule through the same function when the census finds them without it; a popover or menu with a library trigger is not changed.
LEFT: an overlay the census finds outside the shared primitives, each with its file:line and a roadmap line.
CONFORMANCE GUARD: `src/components/ui/dialog-opener.test.tsx` gains the cases (a small panel opened from state returns the focus; a panel with a library trigger is left to the library; an owner's handler wins; an opener removed from the page), each red on the old code. A browser test DLG-E9 (the family ends at DLG-E8) for one small panel opened from state, in Chromium and tagged `@webkit`. CF-DIALOG-1 stays as it is.
EXCEPTIONS: an owner's own `onCloseAutoFocus` (by design).
FIVE LENSES — security: none · performance: none · failure modes: an opener that left the page · consistency: one function for every panel · future growth: a new overlay built on the primitive inherits it.
FORWARD-SCAN: none. REGISTER: the dialog row's behaviour widens — "every panel returns the focus to its opener" → `dialog.tsx` → `dialog-opener.test.tsx` + DLG-E9.

THE SYSTEM (G0) — concern 4 of 6
CONCERN: a picture that cannot draw still tells a screen reader what it was (WCAG 1.1.1).
MECHANISM: the `Picture` primitive's failed state (`failedSrc`, `src/components/ui/picture.tsx` :70). Its frame shows a hidden icon (`ImageOff`, `src/components/ui/picture.tsx` :103). The picture's text alternative is dropped.
CONSUMERS: every picture on the site draws through this primitive (CF-PICTURE-1 → 3), so the fix is one place.
COVERED HERE: Part D. Law: when the picture failed and its `alt` is not empty, the frame carries the image role and the `alt` as its label; with an empty `alt` (decorative) it stays hidden. The absent state (no source) follows the same rule where the caller passed an `alt`.
LEFT: none.
CONFORMANCE GUARD: the primitive's own unit test gains the cases (failed with text; failed and decorative; absent with text), red on the old code. CF-PICTURE-1 → 3 unchanged.
EXCEPTIONS: none.
FIVE LENSES — security: none · performance: none · failure modes: this is the failure mode · consistency: one primitive · future growth: none.
FORWARD-SCAN: none. REGISTER: the picture row gains "the failed frame keeps its text alternative".

THE SYSTEM (G0) — concern 5 of 6
CONCERN: a view of an ad that no longer exists is an ordinary absence: no counter is written, no error is logged, and the reader's page is not disturbed.
MECHANISM: `countAdView` calls the database door `count_listing_view` (`src/server/ad-view.ts` :40) and logs any error it returns (`logRouteError`, `src/server/ad-view.ts` :49). When the ad was removed between the page's load and the call, the door's write fails on the counter's link to the ad, and the route logs an error line (the pictures report §13: `[ssr-error]` in the local WebKit run).
CONSUMERS (grep of 203907b3d — `rg -n "count_listing_view|countAdView" src`): the census lists them.
COVERED HERE: Part E. Laws:
- The route answers its typed not-found for an ad that is gone, writes nothing, and logs a quiet line, never an error line. Every other error is handled as today.
- The absence is recognised by the door's own typed answer or the database's error code for a missing link, never by matching message text.
- No migration in this turn. If only a change to the SQL function can do it, build nothing; name it in §13 for the next migration turn. Not a stop.
LEFT: by the rule above.
CONFORMANCE GUARD: the route's own tests (`src/routes/api/listings/view.test.ts`, next id of its family) — gone ad → not-found, quiet, no write; another database error → as today.
EXCEPTIONS: none.
FIVE LENSES — security: the answer says no more than the page already knows · performance: none · failure modes: named · consistency: the route kit's envelopes · future growth: none.
FORWARD-SCAN: none. REGISTER: no new row; the route's guide gains the branch.

THE SYSTEM (G0) — concern 6 of 6
CONCERN: a loop that reads a list and writes into the same list reaches every row exactly once, and its summary names what it could not write.
MECHANISM: `readAllPages` (`src/lib/read-all-pages.ts` :15), the data-API law's reader. The bypass: `usePseudoGenerate` (`src/features/admin/translations/use-translations.ts` :324) pages `listTranslations` (`src/features/admin/translations/use-translations.ts` :340) by a growing offset while each write changes the list it reads, and counts a refused row without naming it (:357).
HYPOTHESIS (the speed report's Limits: read from code, not proven on a backend): rows that move between pages are skipped, so `TR-30` (`e2e/admin-translations-governance.spec.ts` :1251) found no pseudo text for its probe key in the serial lane of run 43457682073.
CONSUMERS (grep of 203907b3d — `rg -n "offset" src/features/admin/translations` and `rg -n "readAllPages" src`): the census lists every loop under `src/` that pages by position while it writes (by definition, not only this file) — uses | bypasses.
COVERED HERE: Part F. First the decisive proof: `TR-30` by id, alone, on the local proof stack or staging, red for the stated cause (its failure body in the report). If the cause is another, STOP with the body. Then laws:
- The generator reads its keys once, by key order through the one reader, then writes; a write never changes which rows it will reach.
- Its summary carries written, failed and total, and the keys it could not write (at most the first twenty), in the door's own refusal words through the one refusal reader.
- Any other positional write loop the census finds moves onto the reader here when it is one file with its test; otherwise it is LEFT with file:line and a roadmap line.
Then INC-1135's re-entry, by rule: the serial lane's command (`--grep "@a11y" --workers=1`, `.github/workflows/local-backend-proof.yml` :795) regains the `@global-state` tag and `scripts/conformance/lanes-allowlist.txt` loses its line (the speed turn's ruling 1, item 5; DEC-375 b). On this turn's first run: if those tests pass they stay and INC-1135 is FIXED; if one fails for a cause in one module, fix it in the one further commit; otherwise the lane and the allowlist go back in that commit and §13 holds the bodies. Not a stop.
LEFT: by the rules above.
CONFORMANCE GUARD: the generator's unit test (a list that reorders as rows are written still reaches every key once; a refused key is named), red on the old code. `TR-30` by id. CF-LANES-1 judges the serial lane's tags as it stands.
EXCEPTIONS: none.
FIVE LENSES — security: none new (the door's permission is unchanged) · performance: one keyed read in place of repeated offset reads · failure modes: a refused row is named, never only counted · consistency: the one reader · future growth: every enabled language's bulk tools read the same way.
FORWARD-SCAN: the AI bulk translation tools (`src/features/admin/translations/ai-bulk-bar.tsx`) are a consumer the census reads. REGISTER: the generator joins the data-API reader's row. The row of INC-1135 follows the first run.

SCOPE, by area (the plan narrows it to files; each source file with its own tests): `src/components/` (the shell and its tests; under `ui/` the dialog, sheet, alert-dialog and picture primitives and their tests); `src/features/admin/impersonation/`; `src/lib/` (stale-chunk, resilient-lazy and their tests, only as concerns 1 and 2 need); the router's creation file and the root route under `src/`, with their tests (concern 2's seam only); `src/server/` (the ad-view module and its tests) and `src/routes/api/listings/` (the view route and its test); `src/features/admin/translations/` (the generator, its service and tests); `src/i18n/locales/` (concern 1's keys only); `e2e/` (the specs that hold IMP-6, DLG-E9 and `TR-30`, and a helper only if a new test needs one); the first-download ceilings file under `scripts/` (ceilings only, by a named cause — DEC-355); `scripts/conformance/` (CF-STALE-1 and its allowlist, `lanes-allowlist.txt`, `wired.test.ts`); `.github/workflows/local-backend-proof.yml` (the serial lane's tag only); `docs/features/` (rule 10's allowance); `docs/governance/briefs/app-fixes.md` (new), `docs/governance/reports/app-fixes.report.md` (new), `roadmap.md` line 3. Nothing under `supabase/`, no dependency, no `.cursor/` rule.

THE TURN, IN THIS ORDER
STEP 0 — `git fetch origin && git switch -c cursor/app-fixes origin/dev` (print the head; it must contain PR #38's merge). `git status --short` is empty. Save this brief byte for byte as `docs/governance/briefs/app-fixes.md` (scripted copy, one fenced block, four backticks; sha256 equal to the value after END BRIEF). Roadmap line 3: `The brief in force: docs/governance/briefs/app-fixes.md (app fixes — the impersonation notice for staff only (DEC-372), one reloader, focus back to the opener, a failed picture's text, a gone ad's view, the pseudo generator by key). Previous: ` followed by the line as it stands after "The brief in force: ". Remove from `scripts/conformance/briefs-allowlist.txt` every line keyed to another brief. Run `bun scripts/brief/check-go.ts docs/governance/briefs/app-fixes.md` and paste its output; `bunx prettier --check roadmap.md`. Commit `app-fixes: task saved`; push; open the draft pull request into dev (`gh pr create --draft --base dev`, title `app-fixes: staff-only impersonation check, focus, pictures, paging`).
STEP 1 — THE CENSUS. Answer every item by its key word, or "CENSUS-ITEM <key>: not applicable — <why>". STOP only if a premise is wrong or a hit was not anticipated; otherwise write the census into `docs/governance/reports/app-fixes.stop-1.md` (new), commit it with Part A, and continue.
- consumers — every hit of the six greps (file:line), marked uses | bypasses.
- definition — each concern's consumers by definition against its grep; the difference listed.
- tests — each changed file's own tests by their real names; the next id of each family the turn adds to.
- lists — `wired.test.ts`, the allowlists, the first-download ceilings, the strings maps, the register.
- old-file-readers — docs and comments that describe the old behaviour of each concern.
- second-readers — anything else that reads the banner's test ids, the dialog's close handler, the generator's summary shape or the view route's answer.
- chunk-graph — where the banner's code sits today (which chunk, which pages download it) from this machine's build, and where it sits after.
- environments — how the shell learns that the permission read failed (the hook's shape); whether `TR-30` can run alone on the local proof stack; the engines the focus proof runs in.
- mechanisms — `usePermissions`, `resilientLazy`, `stale-chunk.ts`, `dialog.tsx`, `picture.tsx`, `read-all-pages.ts`, each read whole.
- first-download — the before table for the pages the shell's change touches.
- premises — every premise of this GO the census finds wrong.
- findings — beyond the task, file:line (rule 60 §13); a security hole is a STOP at once, described in the chat only (G51).
STEP 2 — Part A (concern 1). Commit `app-fixes part A: the impersonation notice for staff only`.
STEP 3 — Part B (concern 2, by its rule). Commit `app-fixes part B: one reloader for a failed download`.
STEP 4 — Parts C and D (concerns 3 and 4). Commit `app-fixes parts C, D: focus back to the opener, a failed picture's text`.
STEP 5 — Parts E and F (concerns 5 and 6, each by its rule). Commit `app-fixes parts E, F: a gone ad's view, the generator by key`.
STEP 6 — the gate (rule 00, DEC-374): `bun run typecheck`; `bun run lint`; the touched files' unit tests; `bun run checks` (paste its fast line and its last line); the browser tests this turn adds or changes, by id, in every project that runs them (IMP-6 and IMP-1 → IMP-5, DLG-E9, `TR-30`, and concern 2's ids if built); `bun scripts/brief/check-go.ts docs/governance/briefs/app-fixes.md --at <the commit STEP 0 began from>`.
STEP 7 — push ONCE; `gh pr checks <number> --watch --interval 60`; read the run under this lane's folder on ci-evidence. Whatever the first run shows is handled in ONE further code commit, without a stop: a red whose failure names a path this turn changed is fixed at its root; the `@global-state` tests by concern 6's rule; every other red is named under Limits, and CI judges. Green on the last code commit → the comment per rule 00; mark the pull request READY.
STEP 8 — the report, rule 60's fourteen headings; §8 lists each new string key with its English and Amharic; §14 Records word for word; the report push is docs-only.

DECIDE-AND-NAME (questions the laws answer; name each under §10): how the check and the end call stay reachable when the banner's code cannot load; the notice's two keys and their layer; whether concern 2 has a seam; which overlays join concern 3; how the view route recognises a gone ad; the generator's read (the reader's key and order).

RECORDS (word for word into §14; the executor fills the bracketed parts)
DEC-372 (for INC-1116; the operator's decision "A as recommended", 2026-11-12 16:40 his local time) — only a person who holds the admin-panel permission runs the active-impersonation check and downloads its notice; a failed permission read is treated as staff; if the notice's code cannot load while a session is active, the shell shows a plain red notice with End now. Frozen judge: adopted when a signed-in member's page makes no call to the active-session door and downloads none of the notice's code (IMP-6 and the first-download table) and IMP-1 → IMP-5 are green in the same run [run <id>].
INC-1116 — every signed-in page ran the active-impersonation check on load, on each route change and every thirty seconds, and downloaded the banner, though only a super admin can hold a session; fix: DEC-372; the app-fixes turn; FIXED [commit].
INC-1128 — the router library's own reload on a module-load error (once per message, its own session key) still interrupts a WebKit navigation during the first load after the pictures turn fixed the site's reloader; [FIXED <commit>: the seam / OPEN — no seam inside the repository's code; the reading in §13; a package turn].
INC-1130 — a dialog panel smaller than the screen, opened from state, returned the keyboard focus to the page when it closed, in every engine (WCAG 2.4.3); fix: every panel returns the focus to its opener; the app-fixes turn; FIXED [commit]; K2: [the census's list].
INC-1131 — a picture that failed to load showed a hidden icon and dropped its text alternative (WCAG 1.1.1); fix: the failed frame carries the image role and the text; the app-fixes turn; FIXED [commit].
INC-1134 — the view route logged an error line when asked to count a view for an ad removed a moment before; fix: [a typed not-found, quiet, no write / OPEN — the SQL function, the next migration turn]; the app-fixes turn.
INC-1137 — the pseudo-translation generator paged its list by position while its own writes changed the list, so rows could be skipped, and it counted a refused row without naming it; `TR-30` found no pseudo text for its probe key (run 43457682073); fix: one keyed read through the data-API reader, then the writes; the summary names the keys it could not write; the app-fixes turn; [FIXED <commit> / the proof's other cause].
INC-1135 — amendment line: [the `@global-state` tests run in the serial lane on every push since <commit>, n tests, n s — FIXED / still with the nightly — the bodies in §13].
register rows (unnumbered): "the impersonation notice: staff only, fail toward showing (DEC-372)" → the shell's gate → the unit census + IMP-6 → exceptions: none · the stale-chunk row gains CF-STALE-1 · the dialog row: "every panel returns the focus to its opener" · the picture row: "the failed frame keeps its text alternative" · the data-API reader's row gains the generator.
changelog — 2026-11-1x app fixes (Opus 5.5): the impersonation check and its notice for staff only (DEC-372); every dialog gives the focus back to its opener; a failed picture keeps its text; a gone ad's view is a quiet absence; the pseudo generator reads by key and names what it could not write; [one reloader for a failed download / INC-1128 open]; [the `@global-state` tests on every push / INC-1135 open].

TOLERANCES (G60), by defect. A red is a STOP only when its failure names a path this turn changed and its cause is not one this brief's rules already handle. A page's first download may grow only by a cause the report names chunk by chunk; an unexplained growth is a STOP. A local check that cannot run on this machine is NOT RUN with its reason, never a stand-in.

THE WALK (the supervisor writes its lines at the close): the impersonation notice as a super admin and its absence as a member; a small dialog's focus by keyboard in Safari.

FINDINGS (G64): anything major you meet beyond this task goes in §13 with file:line; a security hole is a STOP at once, described in the chat only, never in a committed file (G51).

LIMITS TO STATE. The supervisor read 203907b3d's `src/` with `rg` and git (the speed turn changed nothing under `src/`); concern 6's cause is a hypothesis until `TR-30`'s red is read; concern 2's seam is an open question the census answers.

````
