RULING — cursor-bundle-8b, final report: a page that has no failure still sends a report; the report moves to the notice that is drawn, then one more push. Base: cursor/bundle-8b bdc91aa3b

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-bundle-8b-ruling-5.md` (new), by scripted copy (sha256 in `expected.txt`).

PREVENTION (G70)

- Class (S821, mine): the GO put a side effect (the report) into a shared reading hook, and its census listed only the notice's callers of that hook, not every caller and what each one passes.
  - `useFailureKind` (`src/components/shell/failure-reason.ts`) has callers that only classify a mutation's error, and that error is null when nothing failed: the view-as bar (`src/features/admin/impersonation/impersonation-banner.tsx` line 28, mounted for staff on every page) and the view-as page (`src/features/admin/impersonation/impersonation-view.tsx` line 60).
  - Notices are also drawn with no error at all: `error={null}` in `src/features/seller/seller-page.tsx` (lines 75 and 139) and `src/features/legal/legal-document-page.tsx` (lines 53 and 144), and a given reading with no error in `src/features/posting/wizard.tsx` (line 885), `src/features/posting/step-photos.tsx` (line 694) and the translations console.
  - With the reader loaded, `useFailureKind(null)` and `useFailureKind(undefined)` both read `server` and report `{ kind: "notice", code: null, error: null }` (or `undefined`). I proved it with a throwaway test on `bdc91aa3b`, not committed.
  - ethio-staging holds three such rows from your local runs (2026-11-27 04:12–04:16 UTC): kind `notice`, code null, message `no message (null)`, signed in, path `/`. In production every staff visit would add one, and it would spend the reporter's dial.
  - S820 was the first occurrence of this class (a GO that adds behaviour to a shared piece without enumerating its callers by definition), so this second one gets a guard, not a note:
    - Instructions, in force now: a GO that adds a side effect to a shared hook or component lists in its census every caller of it, what each one passes (null and undefined included), and what the effect does for each.
    - Repository: the GO template's planned `whole-app-calls` item widens to cover that, with a check-go law, in Cursor 8c's first part beside S817's law.
  - Cursor rules: not needed. Knowledge: not needed.
- Class 2: no test asserted "no failure, no report". Neither CI, the gate nor the self-review could see it. The tests in decision 2 are the standing check.

DECISIONS

1. INC-1319: the fix goes in the mechanism.
   - (a) No failure, no report. A notice whose error is null or undefined reports nothing, whatever its reading.
   - (b) The report belongs to the notice that is drawn. It reads the reading the notice draws (a given reading included) and fires when that reading is `server`, after the reader has arrived, as today.
   - (c) `useFailureKind` returns its reading and sends nothing: reading a failure has no side effect. Its callers that only classify (the view-as bar and page) then send nothing.
   - (d) Where the code sits is yours to decide and name (DECIDE-AND-NAME). For example, `FailureNotice` (`src/components/shell/failure-notice.tsx`) calling a helper of `failure-reason.ts` that keeps `noticeReport` and `reportedCode` would do. There stays one trigger, `reportBrowserFailure`.
   - (e) The crash boundary and the two listeners keep their current behaviour.
   - Scope widened by this ruling: `src/components/shell/failure-notice.tsx` with `src/components/shell/failure-notice.test.tsx` and `src/components/shell/failure-notice.census.test.ts`, and `src/features/admin/impersonation/impersonation-banner.test.tsx` (tests only).
2. Tests. Each case below that fails on `5b0d275f8` is shown red first, by the method your rulings used: the old code written into place from `git show`, then put back from a copy.
   - `useFailureKind` sends nothing for a server error, for null and for undefined (`src/components/shell/failure-reason.test.ts`). FR-U18 and FR-U19 move to the notice; their assertions keep their meaning. Name them under §5 with the reason.
   - `FailureNotice`:
     - a server error sends one report after the reader arrives, with its code;
     - an error of null sends none;
     - a given `server` reading with no error sends none;
     - a given gone reading sends none;
     - a refusal sends none;
     - an offline reading sends none.
   - The view-as bar, mounted with no session and no failure, sends nothing (`src/features/admin/impersonation/impersonation-banner.test.tsx`).
   - New ids are grep-checked free first.
3. The reporter census (`scripts/conformance/error-reports.ts`) names every notice drawn with `error={null}`, and every given reading with no error, as a place the reporter does not see.
   - Use one place-key allowlist line each, with its reason and `until`. Your own `COUNT_UNREAD` and `PREVIEW_EMPTY` lines are the form.
   - Expected, by my reading: the seller page ×2, the legal document page ×2 and the photo step's carried reading. The wizard's gone reading is a refusal, so the census decides whether it counts; name what it decides. Owner of the lines left: INC-1319.
   - A planted case proves the census sees the class.
4. ER-1 and ER-2's two leftover rows on ethio-staging (§12). The hook reads its rows by tag, so the key was not the gap.
   - Read the cause and name it in §12. One possibility is that the report was written after the hook had read.
   - If a page can still send a report after the hook reads, the hook first stops the page (`stopPageBeforePurge`'s precedent, INC-323), then reads and removes by tag.
   - I cannot write on ethio-staging. The five rows there (two tagged, three from the defect) go with the scheduled 12-month erase, so no step is owed for them.
5. Pushes and runs.
   - Push once, after every fix above, `bun run checks` and your self-review. The judged commit is your final code commit (G67).
   - Update the report: §1, §2, §5, §10, §11, §12, and §14 with the records below. Its push is records only.

RECORDS (G66), for your report's §14, word for word:

- "INC-1319 (the supervisor's record) — a page with no failure sent an error report: the notice's report sat in the reading hook `useFailureKind`, which reads `server` for an error of null or undefined, so the view-as bar (mounted for staff on every page), the view-as page, and every notice drawn with `error={null}` or with a given reading reported `{ kind: notice, code: null }`. Evidence: three rows on ethio-staging (2026-11-27 04:12–04:16 UTC, message `no message (null)`, signed in, path `/`); a test on the lane's head. Fixed in Cursor bundle 8b before the merge: a notice reports only a present failure whose drawn reading is `server`, and the reading hook sends nothing. Left: the notices drawn without their error (the seller page, the legal document page, the photo step's carried reading) are never reported; they are named in the reporter census's allowlist. Class: concern 'a failure report is sent only for a failure that happened'; mechanism the notice's report (`src/components/shell/failure-reason.ts`, `reportBrowserFailure`). Owner of what is left: the before-launch list."
- "INC-1320 (the supervisor's record) — `src/test/provider-errors.ts` quotes each entry's source as `file:line`, and PEF-5 holds the line to its text, so moving code above a quoted line turns the law red with nothing wrong (Cursor bundle 8b, `8e8e9118a`). INC-1293's class in a fixture, outside the allowlists' grammar. Class: concern 'a key names its place by text, never by line'; mechanism `placeOf` (`scripts/conformance/kit.ts`). Owner: the before-launch list."
- "INC-1321 (the supervisor's record) — the server's own error reports record 'signed in' as 'the request carried a bearer' (`carriesBearer`, `src/server/error-reports.ts`); the bearer is not verified there, so an ended or forged bearer reads as signed in. The browser route's field comes from the verified caller. It names no person either way. Class: concern 'a report's fields are facts we verified'; mechanism the server's report. Owner: the before-launch list."
- "ACT-035 (the supervisor's record) — the lines Cursor bundle 8b's part 3 made stale (the word maps are built, never committed): `.cursor/rules/10-code-laws.mdc` (the line that says to run `bun run i18n:usage` and commit both maps), `.cursor/rules/00-protocol.mdc` (the standing allowance naming both map files), `docs/governance/lovable-knowledge.md` A6 and the live Lovable Knowledge's cheap-check line for the maps, `.prettierignore` (two files no longer in the tree), and the dormant kit (`CLAUDE.md`, `.claude/**`). Owner: the next rules turn and the next Knowledge update."

NUMBERS ASSIGNED (G66): S821 (the supervisor's); INC-1319, INC-1320, INC-1321, ACT-035. Decision 4 takes no number unless its cause is a defect; if it is, name it under §13 and I assign one.
