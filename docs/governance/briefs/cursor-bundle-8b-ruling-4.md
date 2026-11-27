RULING — cursor-bundle-8b, stop 4: the crawl leaves the reporter's own call alone and answers it itself; no dial is raised for a test; the browser sender drops zod. Base: cursor/bundle-8b ed69c2dbf

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-bundle-8b-ruling-4.md` (new), by scripted copy (sha256 in `expected.txt`).

PREVENTION (G70)

- Class (S820, mine): a GO that adds a call any page can make did not list the whole-app tests that enumerate every page's calls.
  - Those tests are the failure crawl's read recorder (`readOf` in `e2e/helpers/failure-crawl-judge.ts`) and the crawl's forced failures, which spend the new route's address dial.
  - The finder route already had this treatment: `readOf` skips `/api/catalog/find`, and fixture pages stub it. The reporter needed the same, and the GO did not say so.
  - Instructions, in force now: a GO that adds a call a page makes on its own (a report, a beacon, a prefetch) names, in its census, every whole-app test that enumerates calls, and what each does with the new one.
  - Repository: the GO template gains that census item (`whole-app-calls`) in Cursor's next turn that touches the template, beside S817's law.
  - Cursor rules: not needed. Knowledge: not needed.
- Class 2 (CI time): a push made while the lane's previous run is still running queues behind it. Run 45928742041 on `65dac93a6` ran in full, and `d12430121`'s run waited 27 minutes for it.
  - Your rules already say the self-review comes before the one push. Repository: CI's speed is being planned as its own Cursor turn: superseded pull-request runs cancel, and draft pushes skip the browser lanes. Instructions, Cursor rules, Knowledge: not needed now.

Your stop is accepted as written.

DECISIONS

1. (A) The crawl's reads leave out the reporter's route.
   - `readOf` in `e2e/helpers/failure-crawl-judge.ts` answers null for `ERROR_REPORTS_PATH`, imported from `src/lib/schemas/error-report.ts`, beside its `/api/catalog/find` line.
   - A unit case in `src/test/failure-crawl.test.ts` proves it, next to the finder's case.
   - Both files enter this lane's scope by this ruling.
2. (B) No dial is raised for a test (G38: "a rate dial is never raised for a test"), so option (a) is refused. Option (b), hiding the reporter's answers across the whole harness, is refused too. Instead, the crawl answers its own pages' reports itself:
   - `e2e/helpers/failure-crawl.ts` routes `ERROR_REPORTS_PATH` on every page it crawls and fulfils it with the route's success answer (`{ recorded: true }`, in the envelope the route's tests assert). The crawl then spends no dial, writes no row and draws no 429.
   - That file enters scope by this ruling. Its precedent is the finder stub every fixture page carries.
   - The reporter's real path stays proven by `e2e/error-reports.spec.ts`.
   - The sender's own refused-send line becomes a `console.warn` (in scope), as you propose: a report the dial refuses is not a failure of the page.
   - If any lane still meets the dial after this change, that is a STOP with the count. The dial is not raised.
3. (C) Leave it, option (c). Option (b) would fork the route boundary's optional caller for one route (G0.2).
   - The class lives in the mechanism: `src/server/supabase/user-client.ts` logs every bearer judged gone as `[ssr-error]`, on every route.
   - That is INC-1316 (below), on the before-launch list. Name the three census lines under §13.
4. (D) Accepted. The browser sender drops zod: its payload type comes from the schema by a type-only import, it keeps the cleaner and the field bounds, and the server's `.strict()` shape stays the authority.
   - ERSN-2 and ERSN-3 are re-pointed to the payload's keys; name them under §5 with the reason.
   - The sender's on-demand chunk size before and after goes in §3.
5. The pushes from here. Push once, after every fix above, `bun run checks` and your self-review.
   - Run 45935486979 (on `ed69c2dbf`, the same code tree as `d12430121`) was queued when I wrote this. The operator may cancel it. If it is not cancelled, your push's run queues behind it.
   - The judged commit is your final code commit (G67).

RECORDS (G66), for your report's §14, word for word:

- "INC-1316 (the supervisor's record) — a bearer the sign-in server judged gone is logged as a server error on every route: `src/server/supabase/user-client.ts` writes `[ssr-error] <path> not signed in …` for each `notSignedIn` answer, so an ordinary ended session writes incident-shaped lines, and the server-error census counts them (3 lines in run 45929211475, from the error-report route after a sign-out). Class: concern 'the server-error census counts server failures only'; mechanism the user client. Owner: the before-launch list."
- "INC-1317 (the supervisor's record) — a call whose own deadline expires is read as a network failure and is never reported, even while the browser is online (`src/lib/route-client.ts`, `src/lib/reader-failure.ts`; found by Cursor bundle 8b's census). Class: concern 'a failure is named by its cause and every server-side failure is reported'; mechanism the route client's failure reading. Owner: the before-launch list."
- "INC-1318 (the supervisor's record) — the error reporter's per-address dial (`errorReportAddress`, 60 an hour) counts every person behind one shared carrier address as one sender, so during an incident most reports from one carrier are refused and the error page under-counts it. Evidence: the dial's design; all of a CI lane's browsers share one address and met it in run 45929211475. Class: concern 'an address-keyed dial rations a person'; mechanism `src/lib/dials.ts`. Owner: the before-launch list (the dial's key and value)."

NUMBERS ASSIGNED (G66): S820 (the supervisor's); INC-1316, INC-1317, INC-1318.
