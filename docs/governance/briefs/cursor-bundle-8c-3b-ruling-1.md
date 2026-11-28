RULING — cursor-bundle-8c-3b, stop 1: the lane narrowed to the permission read, the switches and the route codes. Base: cursor/bundle-8c-3b 34d7e4886

**MODEL — Claude Sonnet 5.5, in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-bundle-8c-3b-ruling-1.md` (new), by scripted copy (sha256 in `expected.txt`).

PREVENTION (G70)
- Class (S843, mine): the GO put screen-only fixes (fixes B and C) in a Cursor lane, and an earlier ruling added a fourth Cursor lane without the operator's word.
  - Instructions: changed, in force now. Every queued item is routed by the files it touches before a lane is written. Screen-only work goes to Lovable. A new Cursor lane needs the operator's word.
  - Repository, Cursor rules, Knowledge: not needed.
- Class (S844, mine): the GO stated INC-1346's premise from its INC text without reading the Audit page as it stands; `audit-page.tsx` lines 376 to 382 and AUD-U3 already say the failure.
  - Instructions: unchanged. The rule (a premise is read in the code as built, G3) stands; this was its breach.
  - Repository, Cursor rules, Knowledge: not needed.

DECISIONS

1. THE LANE NOW (the operator's decision of 2026-11-28 05:31 New York, DEC-506).
   - Lovable UF-3 takes fixes B and C, with every finding your census made on them: the Audit notice and AUD-U3; the fourteen fixed-choice selects; the two extra passive reporters at `src/features/posting/wizard.tsx` line 531 and `src/features/posting/step-specifications.tsx` line 564. You build neither.
   - Cursor 8c-3d is withdrawn. Its fix, INC-1354 (the route refusals still written as sentences), joins this lane as fix D.
   - This lane is: fix A (the permission read and the switches), fix D, and the rows A1.3 and A4.2.
   - Row A11.4 goes with fix B to UF-3.

2. FIX A, THE PERMISSION READ: your design is confirmed.
   - `usePermissions` gains `retry` (the query's own `refetch`).
   - `AdminGate` draws `FailureNotice` (test id `admin-permissions-failed`, no new string) when the read failed and no grants are held, and navigates nowhere. With grants held, it keeps them and draws as today.
   - `src/routes/admin.test.tsx` (new) carries it with `uf:A1.3`. Show it failing first, then passing.
   - `scripts/conformance/permission-readers.test.ts` (new) skips `scripts/`, as your census says.

3. FIX A, THE SESSION'S TIER (INC-1358). `src/components/app-shell.tsx` joins SCOPE for one change.
   - When the permission read has failed and no grants are held, the session takes the strict tier (`staff`), as it does while the read loads.
   - A unit test proves it, failing first, then passing.
   - Your report names this INC by its number and the sentence above, nothing more, until the fix is live.
   - The Admin tab hidden on a failed read (`app-shell.tsx` line 934) stays as it is: hiding it is the safe side, and the gate says the failure on any staff page.

4. FIX A, THE SWITCHES (INC-1310).
   - The guard is your region rule (`scripts/conformance/switch-doors.test.ts`, new), as §3 states it: regions, aliases, props followed into the child, writing calls only.
   - Neither (a) the dialog trace nor (b) the structural pairing. The guard's file and `docs/features/ci-guards.md` name its blind spot: a control that only sets state, and a dialog drawn elsewhere that makes the call.
   - Fix every switch your census marks wrong, except the two word switches. Each control gets a switch naming its own door or route; one switch may become several.
   - The word switches (`listings-page.tsx` line 120, `screening-page.tsx` line 143) stay: they switch words, not a call, and the rule leaves them quiet.
   - The eight whose permission differs change who sees a control. That is in scope by this ruling (DEC-507), and §3 of your report lists each, before and after.
   - The places Export (`src/features/admin-locations/locations-page.tsx` line 394) gets its switch, as the countries Export has.
   - The permission-named switches of your K2 list are not changed here (INC-1359).

5. FILES SHARED WITH LOVABLE UF-3. These three files are now edited by both lanes, on different lines. Git merges hunks that are not next to each other. Touch only the switch lines and the controls they switch, nothing else:
   - `src/features/admin-listings/listing-page.tsx`: lines 139 to 146 and the regions at lines 518 to 547 and 875 to 890. UF-3 changes the level line near 760 and adds a notice near 597.
   - `src/features/admin-listings/listings-page.tsx`: lines 119 to 122 and the regions at lines 294 to 332 and 705 to 741. UF-3 changes the filter declarations at lines 179 to 206.
   - `src/features/admin-screening/screening-page.tsx`: lines 140 to 151 and the regions at lines 882 to 909. UF-3 changes the declarations at lines 232 to 246 and adds a notice near 993.
   - If a switch's control sits outside those ranges, name it at the stop of STEP 7 under §10. Do not move another lane's lines.

6. FIX D, THE ROUTE REFUSALS (INC-1354). Every sentence RT-23 found becomes a code. The code words:
   - `badShape` for a shape refusal: "invalid json body", "invalid categoryId", "probe=1 required", "invalid parentName", "invalid name", "invalid language code", "batch id required", "malformed body".
   - `badFile` for the two exports' "file must be definitions or links" and "file must be countries or locations".
   - `unknownCategory` for "category not found" (404). The attribute library's family already words it.
   - `unknownAttribute` for "unknown attribute" (404). The same family words it.
   - `languageNotAssigned` for "not assigned to this language" (403).
   - `noFile` for "no file".
   - `badMode` for `modeSentence`.
   - `issueWord`'s sentences in `src/lib/schemas/translate.ts`: one code-shaped word each, your choice, named in §3.
   - Each status stays as it is.
   - Every reader moves with its sentence: the unit tests of each route; `src/server/imports/route.ts`'s `IMPORT_WORDS`; `src/features/admin/translations/translations-service.ts` lines 473 and 474 and its test; the three browser specs (`e2e/category-image-routes.spec.ts` line 140, `e2e/import-security.spec.ts` line 369, `e2e/admin-translations-console.spec.ts` line 937), edited by hand; `docs/features/routes.md`, `imports.md` and `translations.md`.
   - A screen that drew a sentence's words still draws the same words.
   - RT-23's fifteen allowlist lines go.
   - RT-23 also judges a refusal passed by name: its value must be a literal it can read, or a name typed by a union of code literals (as `feed.ts`'s `ClientCode` is). How is your choice, named under §10. Show it failing first on `modeSentence` as it stands.

7. ROW A4.2: tag the tests that already prove it.
   - `uf:A4.2` goes into the titles of UD-F1 (`src/features/admin/users/user-detail-failure.test.tsx`) and UFA-7 (`src/features/admin/users/user-detail-states.test.tsx`). Change only those two titles.
   - UF-2 is merged, so that file is no longer another lane's.

8. SCOPE, as this ruling leaves it (each file's tests included):
   - Fix A: `src/routes/admin.tsx`; `src/features/permissions/`; `src/components/app-shell.tsx` (the tier only); every file your switch census marks wrong (the switch only; the three shared files in decision 5's ranges only).
   - Fix D: `src/server/` (`route.ts`, `imports/route.ts`); `src/routes/api/` (the routes RT-23 named); `src/lib/schemas/translate.ts`; `src/features/admin/translations/translations-service.ts`; the three browser specs.
   - `scripts/conformance/` (the two new censuses, `wired.test.ts`); `scripts/conformance/user-facing-allowlist.txt` (A1.3 and A4.2 only; read by `scripts/conformance/user-facing.test.ts`); `src/server/route.test.ts` (RT-23).
   - `docs/features/`; the records files.
   - Never: `src/components/shell/table-filters.ts`, `src/components/shell/filter-chips.tsx`, the four posting steps, `src/features/posting/wizard.tsx`, `src/features/posting/step-specifications.tsx`, `src/features/posting/attribute-options.ts` and every other file UF-3 holds; the locale files, `supabase/`, `.github/`, `AGENTS.md`, package files.

9. THE STEPS from here:
   - STEP 2: part A, commit `cursor-bundle-8c-3b part A: the permission read and the switches`.
   - STEP 3: part D, commit `cursor-bundle-8c-3b part D: every route refusal is a code`.
   - STEP 4: the two rows.
   - STEP 5: the docs.
   - STEP 7 onward as the GO says: the checks, each changed test file alone, the browser runs by id (the staff layout's, `rbac`'s, and the three specs fix D edits), the self-review, ONE push, the report.
   - The GO's STEP 3 and STEP 4 (fixes B and C) are void.

RECORDS (§14), word for word:
- "DEC-506 (the operator's choice, 2026-11-28 05:31 New York; it supersedes DEC-504 and DEC-505 where they differ) — Lovable takes every screen fix of 8c-3: INC-1346 with INC-1355 on All listings and Screening and row A11.4, INC-1353 with the two further passive reporters, and INC-1356, in its open task UF-3. Cursor keeps two lanes: 8c-3b — the staff permission gate (INC-1345, rows A1.3 and A4.2), INC-1310's switches with their census, the session tier on a failed permission read (INC-1358), and the route refusals still written as sentences (INC-1354); 8c-3c — the remaining browser tests, WebKit (INC-1328), the harness debts (INC-1335, INC-1336's remainder, INC-1337) and INC-1357. Cursor 8c-3d is withdrawn. Why: Lovable may do every screen-only fix, and Cursor's lanes cost more."
- "DEC-507 (the supervisor's, G17, overridable; Cursor 8c-3b ruling 1) — A control's switch names the door or route the control calls. Where that door asks another permission than the switch named, who sees the control changes with it; the server's permission check is unchanged and stays the authority. The two word switches (All listings' and Screening's seller filter words) stay, because they switch words, not a call."
- "INC-1359 — Five switches bypass `mayCall` by naming a permission instead of a door: `src/features/admin-listings/listing-page.tsx` lines 141 and 1002, `src/features/admin-screening/screening-page.tsx` line 147, `src/features/admin/legal/user-legal-card.tsx` line 25, `src/features/admin-overview/locations-overview.tsx` line 111 (found by Cursor 8c-3b's census). Class: each control's switch names the door it calls (mechanism `useMayCall`; guard `switch-doors.test.ts`, which reads `mayCall` only). Owner: the before-launch list. Status: open."
- INC-1345, INC-1310, INC-1354: fixed (what was built), each with its cause as found. INC-1358: fixed, named by number only.
- The register rows named in THE SYSTEM A and in this ruling (the route boundary's, amended); one changelog line.
