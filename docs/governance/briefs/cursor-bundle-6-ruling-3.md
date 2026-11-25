RULING — cursor-bundle-6, final report: CT-23's "no trace", and two changes the Lovable pull request #104 needs. Base: cursor/bundle-6 5dccb974e

**MODEL — Claude Sonnet 5.5, in the same Cursor chat that wrote the final report.**

PREVENTION (G70)
- Class 1 — a "nothing written" proof narrowed to the names it expects. CT-23 went from "no audit row and no meter row keyed to the importer" to "no `category%` audit row and no `import:%` meter row". A write by the refused preview under any other name would now pass unseen.
  - Repository — changed here (decision 1): the proof keeps its whole net and excludes exactly the rows a proven other writer leaves, each exclusion with its reason and `INC-1290 until bundle 7`.
  - Cursor rules — changed at the next rules turn, and in force now: a "nothing written" assertion is narrowed only by excluding exactly a proven other writer's rows, each exclusion with its reason and its expiry; never by including only the expected names.
  - Instructions and Knowledge — not needed: G38 already says it; this is its test form.
- Class 2 — a write that changes nothing still writes, audits and spends its dial (INC-1290). `user_set_preferred_language` updates, audits `profile.preferred_language` and spends `account_pref` even when the code equals the stored one. A fresh account's first session start can run the account rule twice (two page loads before the first save lands), which leaves two audit rows and two dial counts from one sign-in.
  - Repository — owner Cursor bundle 7, its SQL turn: the door locks its row, and answers ok with no update, no audit and no dial when nothing changes; with a census of every own-row setter that audits an unchanged value.
  - Not this lane's: named here so CT-23's exclusions expire with it.
- Class 3 — a change made in one lane whose readers belong to another. Lovable 10a's Sign in link now carries the page you were on (D11), and every browser test that finds the link by its exact address `/auth` fails. My ruling raised the entry's size limit on a Lovable branch, and the branch guard admits only the stylesheet's limit line (DEC-425).
  - Repository — changed here (decisions 2 and 3): the guard admits the entry's limit line on the same terms (DEC-468), and the tests find the sign-in link with or without its return page.
  - Instructions — changed (S781, S782, in force now): before a ruling gives Lovable an edit outside `src/`, the supervisor runs the branch guard over it. Before a ruling changes what a control renders or what a code reads, the supervisor searches `src` tests, `e2e/` and `scripts/` for every reader and names the lane that edits each.
  - Cursor rules and Knowledge — not needed.

STAGING: file 3 is applied on ethio-staging and read back by the supervisor before this ruling reached you: mark 20261125010000; `my_permission_answer` present; both view-as readers' md5 are the file's; the four storage rules are wrapped; scratch rows 0. Local runs no longer hold file 3 aside.

DECISIONS
1. CT-23's "no trace" (`e2e/admin-categories-lifecycle.spec.ts`):
   - The audit read keeps every row keyed to the importer (`actor_id = importer.id`) and excludes exactly the action `profile.preferred_language`.
   - The meter read keeps every row keyed to the importer and excludes exactly the dial `account_pref`.
   - Each exclusion carries a comment naming its writer (the sign-in's account-language rule, D239) and `INC-1290 until bundle 7`. The `like` filters go.
   - Run CT-23 by id on ethio-staging, both projects, 0 retries.
2. DEC-468 — the Lovable branch guard admits the entry's JS limit line of `scripts/check-bundle-size.mjs` on DEC-425's terms:
   - exactly one removed and one added `  js: <n>,` line;
   - at most one added DEC-296 comment line naming JS, in the form `<old> → <new> = ceilingFor(Local)?(<size>); was <old>.`, agreeing with the js lines;
   - a patch that changes both the css and the js lines is judged line by line by the same rule, and every other changed line in the file stays refused;
   - the header comment and the refusal sentences name DEC-468 beside DEC-425.
   - Self-test cases in `scripts/ci/lovable-branch-guard.test.ts`: an admitted js change with its comment; an admitted css and js change together; a refused second js line; a refused comment that disagrees with the js lines; a refused change to any other line of the block.
3. The sign-in link in the browser tests. Every place that finds the Sign in link by its address matches the sign-in page with or without its query, inside the same container as now:
   - `e2e/helpers/ui.ts` `signInMarker`: `header a[href="/auth"], header a[href^="/auth?"]`; the comment above `signOutViaUi` says why (D11, Lovable 10a, PR #104);
   - `e2e/sage-shell.spec.ts` (SGS-6): `a[href="/auth"], a[href^="/auth?"]` inside `topbar-controls`;
   - `e2e/shell.spec.ts` (the count-0 assertion in the topbar): both forms, each with `:visible`, so the absence stays proven when the address carries a query.
   - Search `e2e/` for any other locator of the sign-in address and change it the same way. Name each in the report.
   - Run by id on ethio-staging, both projects, 0 retries: SGS-6, the shell test that holds the count-0 line, SO-1, AT-1 and RP-1. These must pass on this tree, where the link's address is still `/auth`.
4. Accepted as reported, no change in this lane:
   - RP-1's sign-out through the UI;
   - LGA-21's 150 s limit, with its cause written beside it;
   - the four admin ceilings raised for the factor gate. The cause is named chunk by chunk (DEC-355). The lighter read of the session's level and factors, which would keep the client off those pages, is INC-1291, owned by Cursor bundle 7's client turn;
   - BR-3's extra `admin_listing_detail` read on the Edit page. INC-1292: the Edit page reads the ad once and fills the crumb from it, owned by Lovable 10b;
   - AL-31's one failure on desktop: a ledger line, with an INC at a second occurrence;
   - DLG-E12 on your Mac's WebKit: INC-1273 stays open, owned by Lovable 10b with your trace;
   - the line-keyed allowlists (finding 8): INC-1293, owned by Cursor bundle 8;
   - findings 6 and 7 go to Cursor bundle 7.

SCOPE WIDENED by this ruling, each path with its tests:
- `e2e/admin-categories-lifecycle.spec.ts`
- `scripts/ci/lovable-branch-guard.sh` with `scripts/ci/lovable-branch-guard.test.ts`
- `e2e/helpers/ui.ts`, `e2e/sage-shell.spec.ts`, `e2e/shell.spec.ts`, and any other spec decision 3's search finds
- `docs/governance/reports/cursor-bundle-6.report.md` (§10 item 15, §11, §14)

NUMBERS: DEC-468 (decision 2); INC-1290 (named in decision 1's comments); INC-1291, INC-1292 and INC-1293 (supervisor's records; name them in §14 by number with one line each, no other text).

THEN:
- Build decisions 1 to 3.
- Run `bun run checks` once on the final tree and the by-id runs above.
- Do the self-review, then make one push.
- Add §10 item 15, §11's new run and §14's lines to the report, in a report-only commit after the push.
- With file 3 on staging, every check should be green on this push. If one is not, read it and report it before you comment.
