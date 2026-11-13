RULING — app-fixes, stop 1: the census — no admin code in the first download (BC-16), TR-30's real cause, the reloader's guard. Base: cursor/app-fixes 0bea41aae.

The census is accepted whole, and its corrections of the brief stand (premises 1 → 4). Both questions are answered below; Part A is ruled differently from the plan. Build Parts A → F against this ruling; the brief is not rebuilt. Save this ruling by scripted copy, BARE, as `docs/governance/briefs/app-fixes-ruling-1.md` (sha256 as the operator's line gives it) in Part A's commit, and name it in §10.

PREVENTION (G70). Root causes, as classes:
(1) Q2 — the GO named a cause for TR-30 without reading the database door the generator reads through. `admin_list_translations` lists only the target language's own rows, in key order, and the supervisor read only the client's loop (S602; G3's second addendum: a prediction about a door's outcome is made after its matching and ordering clause is read). The brief marked it HYPOTHESIS with a decisive proof and a STOP, and that guard worked in one stop. Template line, in this turn (item 6): a mechanism that reads through a database door cites the door's own matching and ordering line.
(2) Q1 — the GO's scope left out a guard that pins the very list the concern changes (BC-16's exact three, "until INC-1116"). Class: a fix of an INC whose allowlist lines name it. Template line, same sentence set: a GO that fixes an INC names every allowlist line and test keyed to that INC (`rg -n "<INC>" scripts`) in its scope.
(3) The brief let the plan choose where the check lives, and the plan kept two admin modules in every page's first download. The concern said "no code"; the ruling below holds it.
Repository: the two template lines; BC-16 ends empty. Instructions: v1.18 — G0.3's census names the guards keyed to the INC being fixed. Cursor rules, Knowledge: not needed. Stops this turn: 1.

1. Q1 — (a) YES: `scripts/bundle-closure.test.ts` joins the scope for BC-16's real-allowlist assertion. (b) NOT the plan's split. The law is the concern's: no admin code in the first download.
   - ONE on-demand module for staff holds the check, the two door calls and the banner's view (the three modules under `src/features/admin/impersonation/` leave the entry together). The shell loads it through `resilientLazy` only when the gate is on.
   - `scripts/conformance/entry-admin-allowlist.txt` ends with NO line. BC-16's real-allowlist assertion becomes "the real allowlist is empty"; its planted cases stay (an admin module in the entry fails by its path; a stale line fails).
   - If the build still finds a module of that folder in the entry for a reason the census did not see (a shared key, a type's runtime import), move the shared piece out of the admin folder when it is one small module. Otherwise it keeps one allowlist line with its reason, until DEC-373, named in §10. Not a stop.
   - The shell keeps only two things, both outside `src/features/admin/`: the gate (`src/components/shell/impersonation-gate.ts`, a pure function, with its census `impersonation-gate.test.ts`, ids IMPG-1 onward — as you proposed) and the plain notice.
   - The plain notice is `resilientLazy`'s failure fallback, for staff only. It cannot know whether a session is active, so it says so: a red line that a view-as session may be active, with End now. End now loads the service on demand, reads the caller's active session and ends it. If there is none it says so and leaves; if the load or the call fails it says so in the one refusal reader's words and offers the shared cure (`refreshPage`).
   - While the module is loading, nothing is shown (no red flash on every staff page).
   - Words: `impersonation.endNow` is reused. The line itself is one new key in the base layer (the brief's flag allows two), in English and Amharic by script, listed in §8; the supervisor reads the Amharic before the merge. The banner's own keys are not used for a state the notice cannot know.
   - Test ids: the notice is `impersonation-notice`; its button keeps `impersonation-banner-end`, so `scripts/check-identity-tags.sh` is not changed.
   - Tests: IMPG's census as the brief's guard says (member off; staff on; read failed on; loading off; the planted unconditional gate). A unit test of the notice: shown on a failed load; End now ends the active session; no session; a failed call. IMP-6 as the brief. The family's existing tests are IMP-1, IMP-2, IMP-3 and IMP-5 (IMP-4 is gone), run by id.
   - First download: the entry is expected to FALL (three modules leave; the gate and the notice join). The table lists it chunk by chunk. A page that grows by a cause you cannot name is the brief's STOP.

2. Q2 — your reading of the cause is accepted, and the brief's hypothesis is withdrawn.
   (a) YES. The generator reads the BASE language's keys once through `fetchAllTranslationRows` and `readAllPages`, then writes each. The writer creates the target's row, so a language with no rows yet is filled. The summary's total is the count of keys it read.
   (b) The base language's code comes from the languages roster's `isBase` row (`translations-service.ts` :31), which the dashboard already holds — the data's own truth — never the compiled constant and never a literal. No base row, or more than one: the generator refuses with the shared refusal words and writes nothing.
   (c) Orphans stay excluded: only rows with `orphaned === false` are written, as today.
   (d) YES: the summary names the keys it could not write (the first twenty) with `admin.translations.ai.failedList` ("Not translated: {keys}"). No new key for Part F. A row with an empty source stays counted as failed and is named.
   (e) YES: the proof is the generator's unit test, red on the old code (a target with no rows and a base with keys writes every key; a refused key is named), and then `TR-30` in CI's serial lane by the brief's re-entry rule. Run 43457682073's body is the recorded red for this cause.

3. Part B — as your census says: there is no seam in the repository's own code, so nothing is built for the router's reload, and INC-1128 stays OPEN for a package turn with §13's reading. CF-STALE-1 is built. Its allowlist holds three lines, each with its reason: the error page's button; `refreshPage`; and the feed's retry button (`feed.tsx` :206), until INC-1140 (item 7). The feed is not edited in this turn (its bundle guards).

4. Parts C, D, E — as planned, with your three decisions accepted:
   - The phone menu in `app-rail.tsx` already returns the focus and is not changed.
   - "A library trigger of its own" is recognised by the trigger's `aria-controls` naming the panel.
   - The failed picture's image role and label go on the empty-state box inside the frame, so a caller's ribbon or badge stays readable.
   - Part E recognises a gone ad by the door's typed answer or the database's error code, as the brief says.

5. SCOPE ADDITIONS (the approved list = the brief's plus):
   - `scripts/bundle-closure.test.ts` (BC-16's real-allowlist assertion and its comment);
   - `scripts/conformance/entry-admin-allowlist.txt`;
   - `src/components/shell/` (the gate, the plain notice, their tests);
   - the on-demand allowlist and its test only if the new `resilientLazy` caller needs a line;
   - `docs/governance/go-template.md` (item 6's two sentences).
   Not in scope: `scripts/check-identity-tags.sh`, `src/components/marketplace/feed.tsx`.

6. The template's two sentences (`docs/governance/go-template.md`, beside its premises line; Part F's commit):
   - "A mechanism that reads through a database door cites the door's own matching and ordering line (file:line)."
   - "A GO that fixes an INC names every allowlist line and test keyed to that INC."

7. Findings, filed by the supervisor (change nothing for them):
   - INC-1140 — the feed's retry button reloads the page by its own call (`feed.tsx` :206) beside the shared cure `refreshPage`; an app turn that may touch the feed's chunk.
   - INC-1141 — `ai-bulk-bar.tsx` :122 → :165 reads a list by position (the data-API law); not a write loop.
   - INC-1142 — `use-translations.ts` :385 fetches a static asset by a bare fetch outside the route mechanism.

8. RECORDS (word for word into §14, in place of the brief's DEC-372, INC-1116 and INC-1137; the brief's other records stand; the executor fills the brackets).
   DEC-372 (for INC-1116; the operator's decision "A as recommended", 2026-11-12 16:40 his local time; the form ruled in the app-fixes turn's ruling 1 and put to him in the reply that carried it) — only a person who holds the admin-panel permission loads and runs the active-impersonation check and its banner, as one on-demand module; a failed permission read is treated as staff; no admin module is in any page's first download (BC-16's allowlist is empty). If that module cannot load, the shell shows staff a plain red notice that a view-as session may be active, with End now, which loads the service on demand and ends the caller's active session. Frozen judge: adopted when a signed-in member's page makes no call to the active-session door and downloads none of the module (IMP-6, BC-16) and IMP-1, IMP-2, IMP-3 and IMP-5 are green in the same run [run <id>].
   INC-1116 — every signed-in page downloaded the impersonation banner, its hook and its service in the first download and ran the active-session check on load, on each route change and every thirty seconds, though only a super admin can hold a session; fix: DEC-372 — one on-demand module for staff, the gate in the shell, BC-16's allowlist empty; the app-fixes turn; FIXED [commit; the entry's bytes before → after].
   INC-1137 — the pseudo-translation generator listed only the rows the target language already owned (`admin_list_translations`), and a language's rows are made only by the key sync for languages that exist when it runs; a language the generator had just created had none, so it wrote nothing and reported 0 written and 0 failed (`TR-30`, run 43457682073: "Received: "missing""). The supervisor's first reading (rows skipped by offset paging) was wrong; the executor's census read the door. Fix: the generator reads the base language's keys once through the data-API reader and writes each, the writer creating the row; the summary names the keys it could not write; the app-fixes turn; FIXED [commit]. Class: a write loop driven by the target's rows, not the source's keys; an operation that did nothing reported as a result.
   INC-1140, INC-1141, INC-1142 — item 7's three lines, word for word.
   The brief's register rows and changelog line stand, with "the pseudo generator reads by key" reading "the pseudo generator fills from the base language's keys".

9. ORDER AND PUSHES as the brief: Parts A → F in its four commits, this ruling saved in Part A's commit, STEP 6, ONE push, then the first run handled by the brief's STEP 7 rules in one further commit. A stop is only for a security finding, an unexplained first-download growth, or a file neither the brief nor this ruling names.
